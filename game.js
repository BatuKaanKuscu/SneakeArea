const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const radar = document.getElementById("radar");
const rctx = radar.getContext("2d");

const scoreEl = document.getElementById("score");
const lengthEl = document.getElementById("length");
const boostEl = document.getElementById("boost");
const leadersEl = document.getElementById("leaders");
const startPanel = document.getElementById("startPanel");
const deathPanel = document.getElementById("deathPanel");
const deathText = document.getElementById("deathText");
const playButton = document.getElementById("playButton");
const retryButton = document.getElementById("retryButton");
const playerName = document.getElementById("playerName");
const boostButton = document.getElementById("boostButton");
const touchStick = document.getElementById("touchStick");

const WORLD = 4300;
const FOOD_COUNT = 680;
const BOT_COUNT = 17;
const SEGMENT_GAP = 10;
const BASE_SPEED = 2.45;
const BOOST_SPEED = 4.35;
const COLORS = {
  cyan: ["#4ff3ff", "#b8ff5d"],
  lime: ["#b8ff5d", "#31e7a5"],
  pink: ["#ff5db8", "#ffb347"],
  amber: ["#ffb347", "#fff06a"],
};
const BOT_NAMES = [
  "Byte",
  "Nova",
  "Orbit",
  "Kobra",
  "Pulse",
  "Vega",
  "Pixel",
  "Rift",
  "Glitch",
  "Turbo",
  "Echo",
  "Mango",
  "Quartz",
  "Laser",
  "Drift",
  "Iris",
  "Flux",
  "Comet",
];

let width = 0;
let height = 0;
let scale = 1;
let foods = [];
let snakes = [];
let player = null;
let running = false;
let selectedSkin = "cyan";
let lastTime = performance.now();
let pointer = { x: 0, y: 0, active: false };
let keys = new Set();
let camera = { x: WORLD / 2, y: WORLD / 2 };

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angleLerp(current, target, amount) {
  let diff = ((target - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return current + diff * amount;
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  scale = width < 720 ? 0.82 : 1;
}

function spawnFood(count, burstX, burstY, value = 1) {
  for (let i = 0; i < count; i++) {
    const aroundBurst = Number.isFinite(burstX) && Math.random() < 0.85;
    const x = aroundBurst ? burstX + random(-90, 90) : random(100, WORLD - 100);
    const y = aroundBurst ? burstY + random(-90, 90) : random(100, WORLD - 100);
    const palette = Object.values(COLORS)[Math.floor(random(0, 4))];
    foods.push({
      x: clamp(x, 36, WORLD - 36),
      y: clamp(y, 36, WORLD - 36),
      r: random(3.2, 6.6) + value * 0.35,
      value,
      color: palette[Math.floor(random(0, 2))],
      pulse: random(0, Math.PI * 2),
    });
  }
}

function makeSnake(name, skin, isPlayer, x = random(420, WORLD - 420), y = random(420, WORLD - 420)) {
  const length = isPlayer ? 18 : Math.floor(random(15, 34));
  const angle = random(0, Math.PI * 2);
  const hasRandomId = globalThis.crypto && typeof globalThis.crypto.randomUUID === "function";
  const segments = [];
  for (let i = 0; i < length; i++) {
    segments.push({
      x: x - Math.cos(angle) * i * SEGMENT_GAP,
      y: y - Math.sin(angle) * i * SEGMENT_GAP,
    });
  }
  return {
    id: hasRandomId ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    name,
    skin,
    colors: COLORS[skin],
    isPlayer,
    alive: true,
    x,
    y,
    angle,
    turn: 0.09,
    segments,
    targetLength: length,
    score: Math.max(0, (length - 12) * 14),
    boost: 100,
    boostHeld: false,
    thinkAt: 0,
    aiAngle: angle,
    radius: isPlayer ? 13 : random(11, 15),
  };
}

function resetGame() {
  foods = [];
  snakes = [];
  const cleanName = playerName.value.trim().slice(0, 14) || "Neon";
  player = makeSnake(cleanName, selectedSkin, true, WORLD / 2, WORLD / 2);
  snakes.push(player);

  for (let i = 0; i < BOT_COUNT; i++) {
    const skin = Object.keys(COLORS)[Math.floor(random(0, 4))];
    const name = BOT_NAMES[i % BOT_NAMES.length];
    snakes.push(makeSnake(name, skin, false));
  }

  spawnFood(FOOD_COUNT);
  camera.x = player.x;
  camera.y = player.y;
  running = true;
  startPanel.classList.add("is-hidden");
  deathPanel.classList.add("is-hidden");
}

function screenToWorld(x, y) {
  return {
    x: camera.x + (x - width / 2) / scale,
    y: camera.y + (y - height / 2) / scale,
  };
}

function updatePlayerIntent() {
  if (!player || !player.alive) return;
  let dx = 0;
  let dy = 0;

  if (keys.has("ArrowLeft") || keys.has("a")) dx -= 1;
  if (keys.has("ArrowRight") || keys.has("d")) dx += 1;
  if (keys.has("ArrowUp") || keys.has("w")) dy -= 1;
  if (keys.has("ArrowDown") || keys.has("s")) dy += 1;

  if (dx || dy) {
    player.angle = angleLerp(player.angle, Math.atan2(dy, dx), 0.14);
    return;
  }

  if (pointer.active) {
    const target = screenToWorld(pointer.x, pointer.y);
    player.angle = angleLerp(player.angle, Math.atan2(target.y - player.y, target.x - player.x), 0.16);
  }
}

function thinkForBot(snake, now) {
  if (now < snake.thinkAt) return;
  snake.thinkAt = now + random(220, 520);

  let closestFood = null;
  let closestDist = Infinity;
  for (let i = 0; i < foods.length; i += 8) {
    const d = Math.hypot(foods[i].x - snake.x, foods[i].y - snake.y);
    if (d < closestDist) {
      closestDist = d;
      closestFood = foods[i];
    }
  }

  let desired = closestFood
    ? Math.atan2(closestFood.y - snake.y, closestFood.x - snake.x)
    : snake.aiAngle + random(-0.8, 0.8);

  for (const other of snakes) {
    if (!other.alive || other.id === snake.id) continue;
    for (let i = 4; i < other.segments.length; i += 4) {
      const seg = other.segments[i];
      const d = Math.hypot(seg.x - snake.x, seg.y - snake.y);
      if (d < 105) {
        desired = Math.atan2(snake.y - seg.y, snake.x - seg.x);
        snake.boostHeld = false;
        break;
      }
    }
  }

  if (snake.x < 260) desired = 0;
  if (snake.x > WORLD - 260) desired = Math.PI;
  if (snake.y < 260) desired = Math.PI / 2;
  if (snake.y > WORLD - 260) desired = -Math.PI / 2;

  snake.aiAngle = desired;
  snake.boostHeld = closestDist > 260 && snake.boost > 35 && Math.random() < 0.25;
}

function moveSnake(snake, dt, now) {
  if (!snake.alive) return;
  if (!snake.isPlayer) {
    thinkForBot(snake, now);
    snake.angle = angleLerp(snake.angle, snake.aiAngle, snake.turn);
  }

  const canBoost = snake.boostHeld && snake.boost > 4 && snake.targetLength > 12;
  const speed = (canBoost ? BOOST_SPEED : BASE_SPEED) * dt;
  if (canBoost) {
    snake.boost = Math.max(0, snake.boost - 0.42 * dt);
    snake.targetLength = Math.max(12, snake.targetLength - 0.018 * dt);
    if (Math.random() < 0.22) {
      spawnFood(1, snake.x - Math.cos(snake.angle) * 18, snake.y - Math.sin(snake.angle) * 18, 0.45);
    }
  } else {
    snake.boost = Math.min(100, snake.boost + 0.09 * dt);
  }

  snake.x += Math.cos(snake.angle) * speed;
  snake.y += Math.sin(snake.angle) * speed;
  snake.segments.unshift({ x: snake.x, y: snake.y });

  const maxSegments = Math.max(8, Math.floor(snake.targetLength));
  while (snake.segments.length > maxSegments) snake.segments.pop();
}

function collectFood(snake) {
  for (let i = foods.length - 1; i >= 0; i--) {
    const food = foods[i];
    const pickup = snake.radius + food.r + 3;
    if (Math.hypot(food.x - snake.x, food.y - snake.y) < pickup) {
      foods.splice(i, 1);
      snake.targetLength += 0.85 + food.value * 0.55;
      snake.score += Math.round(10 + food.value * 10);
      snake.boost = Math.min(100, snake.boost + 2.2);
    }
  }
  if (foods.length < FOOD_COUNT) {
    spawnFood(Math.min(6, FOOD_COUNT - foods.length));
  }
}

function killSnake(snake, killer) {
  if (!snake.alive) return;
  snake.alive = false;
  const payout = Math.min(120, Math.floor(snake.segments.length * 0.72));
  for (let i = 0; i < snake.segments.length; i += 2) {
    const seg = snake.segments[i];
    spawnFood(i < payout ? 1 : 0, seg.x, seg.y, 1.5);
  }
  if (killer && killer !== snake) {
    killer.score += snake.isPlayer ? 0 : Math.round(snake.score * 0.16 + 60);
  }
  if (snake.isPlayer) {
    running = false;
    deathText.textContent = `Skorun ${Math.round(snake.score)}. Uzunluk ${Math.floor(snake.targetLength)}.`;
    deathPanel.classList.remove("is-hidden");
  } else {
    setTimeout(() => {
      const skin = Object.keys(COLORS)[Math.floor(random(0, 4))];
      const name = BOT_NAMES[Math.floor(random(0, BOT_NAMES.length))];
      const fresh = makeSnake(name, skin, false);
      const index = snakes.findIndex((item) => item.id === snake.id);
      if (index >= 0) snakes[index] = fresh;
    }, 900);
  }
}

function resolveCollisions() {
  for (const snake of snakes) {
    if (!snake.alive) continue;
    if (snake.x < 18 || snake.x > WORLD - 18 || snake.y < 18 || snake.y > WORLD - 18) {
      killSnake(snake);
      continue;
    }

    for (const other of snakes) {
      if (!other.alive || snake.id === other.id) continue;
      const headDistance = Math.hypot(snake.x - other.x, snake.y - other.y);
      if (headDistance < snake.radius + other.radius - 5) {
        if (snake.targetLength >= other.targetLength) killSnake(other, snake);
        else killSnake(snake, other);
      }

      for (let i = 7; i < other.segments.length; i++) {
        const seg = other.segments[i];
        if (Math.hypot(snake.x - seg.x, snake.y - seg.y) < snake.radius + 3) {
          killSnake(snake, other);
          break;
        }
      }
    }
  }
}

function update(dt, now) {
  if (running) {
    updatePlayerIntent();
    for (const snake of snakes) {
      if (!snake.alive) continue;
      moveSnake(snake, dt, now);
      collectFood(snake);
    }
    resolveCollisions();
  }

  if (player) {
    camera.x += (player.x - camera.x) * 0.08;
    camera.y += (player.y - camera.y) * 0.08;
    scoreEl.textContent = Math.round(player.score).toLocaleString("tr-TR");
    lengthEl.textContent = Math.floor(player.targetLength).toString();
    boostEl.textContent = `${Math.round(player.boost)}%`;
  }

  updateLeaderboard();
}

function drawGrid() {
  const left = camera.x - width / (2 * scale);
  const top = camera.y - height / (2 * scale);
  const grid = 120;
  ctx.strokeStyle = "rgba(196, 255, 231, 0.055)";
  ctx.lineWidth = 1 / scale;
  ctx.beginPath();
  for (let x = Math.floor(left / grid) * grid; x < left + width / scale; x += grid) {
    ctx.moveTo(x, top);
    ctx.lineTo(x, top + height / scale);
  }
  for (let y = Math.floor(top / grid) * grid; y < top + height / scale; y += grid) {
    ctx.moveTo(left, y);
    ctx.lineTo(left + width / scale, y);
  }
  ctx.stroke();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, WORLD, WORLD);
}

function drawFood(now) {
  for (const food of foods) {
    const pulse = Math.sin(now * 0.006 + food.pulse) * 0.22 + 1;
    ctx.beginPath();
    ctx.fillStyle = food.color;
    ctx.shadowBlur = 14;
    ctx.shadowColor = food.color;
    ctx.arc(food.x, food.y, food.r * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

function drawSnake(snake) {
  if (!snake.alive) return;
  const [primary, secondary] = snake.colors;

  for (let i = snake.segments.length - 1; i >= 0; i--) {
    const seg = snake.segments[i];
    const t = i / Math.max(1, snake.segments.length - 1);
    const radius = Math.max(5, snake.radius * (1 - t * 0.42));
    ctx.beginPath();
    ctx.fillStyle = i % 2 ? secondary : primary;
    ctx.globalAlpha = 1 - t * 0.12;
    ctx.shadowBlur = snake.isPlayer ? 18 : 10;
    ctx.shadowColor = primary;
    ctx.arc(seg.x, seg.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#06110f";
  const eyeA = snake.angle + 0.55;
  const eyeB = snake.angle - 0.55;
  ctx.beginPath();
  ctx.arc(snake.x + Math.cos(eyeA) * 8, snake.y + Math.sin(eyeA) * 8, 2.6, 0, Math.PI * 2);
  ctx.arc(snake.x + Math.cos(eyeB) * 8, snake.y + Math.sin(eyeB) * 8, 2.6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = "700 13px Inter, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(snake.name, snake.x, snake.y - snake.radius - 16);
}

function render(now) {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, scale);
  ctx.translate(-camera.x, -camera.y);

  drawGrid();
  drawFood(now);
  for (const snake of snakes) drawSnake(snake);

  ctx.restore();
  drawVignette();
  drawRadar();
}

function drawVignette() {
  const gradient = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.28, width / 2, height / 2, Math.max(width, height) * 0.72);
  gradient.addColorStop(0, "rgba(7,17,15,0)");
  gradient.addColorStop(1, "rgba(7,17,15,0.5)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function drawRadar() {
  const rw = radar.width;
  const rh = radar.height;
  rctx.clearRect(0, 0, rw, rh);
  rctx.fillStyle = "rgba(255,255,255,0.04)";
  rctx.fillRect(0, 0, rw, rh);
  rctx.strokeStyle = "rgba(196,255,231,0.16)";
  rctx.strokeRect(7, 7, rw - 14, rh - 14);

  for (const snake of snakes) {
    if (!snake.alive) continue;
    const x = (snake.x / WORLD) * (rw - 16) + 8;
    const y = (snake.y / WORLD) * (rh - 16) + 8;
    rctx.fillStyle = snake.isPlayer ? "#ffffff" : snake.colors[0];
    rctx.beginPath();
    rctx.arc(x, y, snake.isPlayer ? 4 : 2.6, 0, Math.PI * 2);
    rctx.fill();
  }
}

function updateLeaderboard() {
  const leaders = snakes
    .filter((snake) => snake.alive)
    .sort((a, b) => b.score + b.targetLength * 8 - (a.score + a.targetLength * 8))
    .slice(0, 7);

  leadersEl.innerHTML = leaders
    .map((snake, index) => {
      const place = index + 1;
      const score = Math.round(snake.score + snake.targetLength * 8);
      return `<li><span>${place}</span><b>${snake.name}</b><strong>${score}</strong></li>`;
    })
    .join("");
}

function frame(now) {
  const dt = Math.min(2.2, (now - lastTime) / 16.67);
  lastTime = now;
  update(dt, now);
  render(now);
  requestAnimationFrame(frame);
}

function bindControls() {
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    keys.add(event.key.length === 1 ? event.key.toLowerCase() : event.key);
    if (event.code === "Space") {
      event.preventDefault();
      if (player) player.boostHeld = true;
    }
    if (event.key === "Enter" && !running) resetGame();
  });
  window.addEventListener("keyup", (event) => {
    keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
    if (event.code === "Space" && player) player.boostHeld = false;
  });

  canvas.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY, active: true };
  });
  canvas.addEventListener("pointerdown", (event) => {
    pointer = { x: event.clientX, y: event.clientY, active: true };
    if (player) player.boostHeld = true;
  });
  window.addEventListener("pointerup", () => {
    if (player) player.boostHeld = false;
  });

  boostButton.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    if (player) player.boostHeld = true;
  });
  boostButton.addEventListener("pointerup", () => {
    if (player) player.boostHeld = false;
  });
  boostButton.addEventListener("pointerleave", () => {
    if (player) player.boostHeld = false;
  });

  touchStick.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY, active: true };
  });

  playButton.addEventListener("click", resetGame);
  retryButton.addEventListener("click", resetGame);

  document.querySelectorAll(".skin").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(".skin.is-active").classList.remove("is-active");
      button.classList.add("is-active");
      selectedSkin = button.dataset.skin;
    });
  });
}

resize();
bindControls();
resetGame();
running = false;
startPanel.classList.remove("is-hidden");
requestAnimationFrame(frame);
