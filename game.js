const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const radar = document.getElementById("radar");
const rctx = radar.getContext("2d");
const radarWrap = document.querySelector(".radar-wrap");

const scoreEl = document.getElementById("score");
const lengthEl = document.getElementById("length");
const boostEl = document.getElementById("boost");
const powerEl = document.getElementById("power");
const dashPowerEl = document.getElementById("dashPower");
const twinPowerEl = document.getElementById("twinPower");
const goldPowerEl = document.getElementById("goldPower");
const trapPowerEl = document.getElementById("trapPower");
const modeLabel = document.getElementById("modeLabel");
const topUserName = document.getElementById("topUserName");
const topUserTitle = document.getElementById("topUserTitle");
const menuProfileName = document.getElementById("menuProfileName");
const menuProfileTitle = document.getElementById("menuProfileTitle");
const profileButton = document.getElementById("profileButton");
const friendsButton = document.getElementById("friendsButton");
const shopButton = document.getElementById("shopButton");
const achievementsButton = document.getElementById("achievementsButton");
const questsButton = document.getElementById("questsButton");
const translateButton = document.getElementById("translateButton");
const languageCode = document.getElementById("languageCode");
const paletteButton = document.getElementById("paletteButton");
const settingsButton = document.getElementById("settingsButton");
const quickPanel = document.getElementById("quickPanel");
const quickTitle = document.getElementById("quickTitle");
const quickAuth = document.getElementById("quickAuth");
const quickProfile = document.getElementById("quickProfile");
const quickFriends = document.getElementById("quickFriends");
const quickShop = document.getElementById("quickShop");
const quickAchievements = document.getElementById("quickAchievements");
const quickQuests = document.getElementById("quickQuests");
const quickPalette = document.getElementById("quickPalette");
const quickSettings = document.getElementById("quickSettings");
const closeQuickPanel = document.getElementById("closeQuickPanel");
const leadersEl = document.getElementById("leaders");
const startPanel = document.getElementById("startPanel");
const deathPanel = document.getElementById("deathPanel");
const deathTitle = deathPanel ? deathPanel.querySelector("h2") : null;
const deathText = document.getElementById("deathText");
const playButton = document.getElementById("playButton");
const playButtonText = document.getElementById("playButtonText");
const retryButton = document.getElementById("retryButton");
const lobbyPanel = document.getElementById("lobbyPanel");
const lobbyCode = document.getElementById("lobbyCode");
const lobbyStatus = document.getElementById("lobbyStatus");
const lobbyPlayersEl = document.getElementById("lobbyPlayers");
const leaveLobbyButton = document.getElementById("leaveLobbyButton");
const copyRoomButton = document.getElementById("copyRoomButton");
const startRoomButton = document.getElementById("startRoomButton");
const profileName = document.getElementById("profileName");
const guestMode = document.getElementById("guestMode");
const profileAvatar = document.getElementById("profileAvatar");
const authStatus = document.getElementById("authStatus");
const authFriendCount = document.getElementById("authFriendCount");
const authOnlineCount = document.getElementById("authOnlineCount");
const accountName = document.getElementById("accountName");
const accountPassword = document.getElementById("accountPassword");
const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const logoutButton = document.getElementById("logoutButton");
const coinCount = document.getElementById("coinCount");
const bestScore = document.getElementById("bestScore");
const matchCount = document.getElementById("matchCount");
const profileRole = document.getElementById("profileRole");
const friendName = document.getElementById("friendName");
const addFriendButton = document.getElementById("addFriendButton");
const friendList = document.getElementById("friendList");
const serverStatus = document.getElementById("serverStatus");
const botCountInput = document.getElementById("botCount");
const botCountValue = document.getElementById("botCountValue");
const playerTwoName = document.getElementById("playerTwoName");
const p2Field = document.getElementById("p2Field");
const roomPanel = document.getElementById("roomPanel");
const roomCodeInput = document.getElementById("roomCodeInput");
const roomCodeLabel = document.getElementById("roomCodeLabel");
const roomCodeHintText = document.getElementById("roomCodeHintText");
const shopGrid = document.getElementById("shopGrid");
const exitGameButton = document.getElementById("exitGameButton");
const boostButton = document.getElementById("boostButton");
const touchStick = document.getElementById("touchStick");
const powerButtons = document.getElementById("powerButtons");
const powerButton = document.getElementById("powerButton");
const dashButton = document.getElementById("dashButton");
const twinButton = document.getElementById("twinButton");
const goldButton = document.getElementById("goldButton");
const trapButton = document.getElementById("trapButton");
const POWER_BINDING_DEFS = [
  { kind: "area", label: "Alan g\u00fcc\u00fc", desc: "Yak\u0131ndaki yemleri toplar", defaultCode: "KeyE" },
  { kind: "dash", label: "At\u0131l\u0131m", desc: "K\u0131sa mesafe ileri at\u0131l\u0131r", defaultCode: "KeyQ" },
  { kind: "twin", label: "Hologram", desc: "\u0130kili tak\u0131m ve yer de\u011fi\u015ftirme", defaultCode: "KeyR" },
  { kind: "gold", label: "Alt\u0131n h\u0131zlan\u0131\u015f", desc: "K\u0131sa s\u00fcre \u00e7ok h\u0131zl\u0131 gider", defaultCode: "KeyT" },
  { kind: "trap", label: "Tuzak", desc: "Kuyru\u011fa g\u00fc\u00e7 kilidi b\u0131rak\u0131r", defaultCode: "KeyF" },
];
const POWER_BUTTONS = { area: powerButton, dash: dashButton, twin: twinButton, gold: goldButton, trap: trapButton };
const RESERVED_POWER_KEY_CODES = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "ShiftLeft", "ShiftRight", "KeyI", "KeyJ", "KeyK", "KeyL", "KeyU", "Enter", "Escape", "Tab", "Backspace"]);

const WORLD = 4300;
const FOOD_COUNT = 540;
const FOOD_CELL = 220;
const FOOD_EXTRA_LIMIT = 180;
const MAX_EFFECTS = 54;
const HUD_INTERVAL = 90;
const LEADERBOARD_INTERVAL = 260;
const RADAR_INTERVAL = 140;
const SEGMENT_GAP = 10;
const BASE_SPEED = 2.45;
const BOOST_SPEED = 4.35;
const EPIC_SKIN_ID = "cowboy";
const EPIC_SKIN_IDS = ["cowboy", "storm", "nebula", "phantom", "solar"];
const EPIC_UNLOCK_MATCHES = 5;
const POWER_DURATION = 4200;
const POWER_PICKUP_BONUS = 62;
const POWER_RECHARGE_RATE = 0.033;
const DASH_COST = 100;
const DASH_DISTANCE = 245;
const DASH_FLASH_MS = 320;
const DASH_COOLDOWN_MS = 720;
const DASH_RECHARGE_RATE = 0.065;
const DASH_PICKUP_BONUS = 2.8;
const TWIN_DURATION_MS = 9000;
const TWIN_RECHARGE_RATE = 0.018;
const TWIN_PICKUP_BONUS = 1.6;
const TWIN_SEGMENT_LIMIT = 110;
const TWIN_SWAP_DELAY_MS = 3000;
const TWIN_FALLBACK_OFFSET = 320;
const TWIN_MIRROR_TARGET_RANGE = 980;
const VICTORY_COIN_REWARD = 400;
const GOLD_DURATION_MS = 2600;
const GOLD_SPEED_MULTIPLIER = 1.72;
const GOLD_RECHARGE_RATE = 0.042;
const GOLD_PICKUP_BONUS = 2.2;
const TRAP_RECHARGE_RATE = 0.074;
const TRAP_PICKUP_BONUS = 2.4;
const TRAP_DURATION_MS = 16000;
const TRAP_LOCK_MS = 15000;
const BOOST_RECHARGE_INNER = 0.38;
const BOOST_OUTER_THRESHOLD = 0.86;
const LEGACY_PROFILE_KEY = "snakeAeaProfile";
const LEGACY_SESSION_KEY = "snakeAeaSession";
const PROFILE_KEY = "snakeAreaProfile";
const SESSION_KEY = "snakeAreaSession";
const KEYBINDS_KEY = "snakeAreaKeybinds";
const TOUCH_CONTROLS_KEY = "snakeAreaTouchControls";
const TOUCH_CONTROL_DEFAULTS = { stickX: 22, stickY: 76, stickSize: 152, powerX: 86, powerY: 72, powerSize: 58 };
const TOUCH_CONTROL_DEFS = [
  { key: "stickX", label: "Joystick yatay", desc: "Sol/sa\u011f konum", min: 12, max: 46, unit: "%" },
  { key: "stickY", label: "Joystick dikey", desc: "Alt/\u00fcst konum", min: 52, max: 88, unit: "%" },
  { key: "stickSize", label: "Joystick boyutu", desc: "Halka ve merkez", min: 126, max: 198, unit: "px" },
  { key: "powerX", label: "G\u00fc\u00e7 paneli yatay", desc: "Buton grubu", min: 58, max: 92, unit: "%" },
  { key: "powerY", label: "G\u00fc\u00e7 paneli dikey", desc: "Buton grubu", min: 42, max: 84, unit: "%" },
  { key: "powerSize", label: "G\u00fc\u00e7 butonu boyutu", desc: "Yuvarlak tu\u015flar", min: 46, max: 74, unit: "px" },
];
const POWER_BUTTON_VISUALS = {
  area: { short: "A", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.6"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>' },
  dash: { short: "D", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 10-13h-7l1-7Z"/></svg>' },
  twin: { short: "H", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7c4-3 9-2 10 2 1 3-1 6-5 6H6"/><path d="M17 17c-4 3-9 2-10-2-1-3 1-6 5-6h6"/><circle cx="8" cy="15" r="1"/><circle cx="16" cy="9" r="1"/></svg>' },
  gold: { short: "G", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8L12 3Z"/></svg>' },
  trap: { short: "T", icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/><path d="m7 7 10 10M17 7 7 17"/><circle cx="12" cy="12" r="3"/></svg>' },
};

const SKINS = [
  { id: "cyan", name: "Area Basic", price: 0, colors: ["#4ff3ff", "#b8ff5d"] },
  { id: "lime", name: "Lime Rush", price: 120, colors: ["#b8ff5d", "#31e7a5"] },
  { id: "pink", name: "Pink Strike", price: 180, colors: ["#ff5db8", "#ffb347"] },
  { id: "amber", name: "Amber Coil", price: 240, colors: ["#ffb347", "#fff06a"] },
  { id: "violet", name: "Violet Edge", price: 320, colors: ["#a78bfa", "#4ff3ff"] },
  { id: "ruby", name: "Ruby Fang", price: 420, colors: ["#ff3d6e", "#ffd166"] },
  { id: "ice", name: "Ice Wave", price: 520, colors: ["#d8f3ff", "#5ee7ff"] },
  { id: "royal", name: "Royal Split", price: 700, colors: ["#8fd14f", "#f7f06d"] },
  { id: EPIC_SKIN_ID, name: "Epic Cowboy", price: 0, rarity: "epic", unlockMatches: 5, note: "Şapka + sakal", colors: ["#7c4a26", "#f4c86b"], hat: true, hand: true, beard: true },
  { id: "storm", name: "Epic Storm", price: 0, rarity: "epic", unlockMatches: 7, note: "Elektrik izli", colors: ["#e0f2fe", "#38bdf8"], aura: "storm" },
  { id: "nebula", name: "Epic Nebula", price: 0, rarity: "epic", unlockMatches: 10, note: "Galaksi parıltısı", colors: ["#c084fc", "#22d3ee"], aura: "nebula" },
  { id: "phantom", name: "Epic Phantom", price: 0, rarity: "epic", unlockMatches: 14, note: "Koyu enerji", colors: ["#111827", "#2dd4bf"], aura: "phantom" },
  { id: "solar", name: "Epic Solar", price: 0, rarity: "epic", unlockMatches: 18, note: "Güneş parıltısı", colors: ["#fff06a", "#ff7a1a"], aura: "solar" },
];
const BOT_NAMES = ["Byte", "Nova", "Orbit", "Kobra", "Pulse", "Vega", "Pixel", "Rift", "Glitch", "Turbo", "Echo", "Mango", "Quartz", "Laser", "Drift", "Iris", "Flux", "Comet"];

const TITLE_CATALOG = {
  rookie: "Çaylak",
  hunter: "Avcı",
  collector: "Koleksiyoncu",
  champion: "Şampiyon",
  speedster: "Hız Ustası",
  survivor: "Dayanıklı",
  admin: "Admin",
};

const AVATARS = [
  { id: "near", mark: "N", name: "Near" },
  { id: "area", mark: "S", name: "Area" },
  { id: "bolt", mark: "⚡", name: "Hız" },
  { id: "crown", mark: "★", name: "Yıldız" },
  { id: "coin", mark: "C", name: "Coin" },
  { id: "wave", mark: "~", name: "Dalga" },
];

const ACHIEVEMENTS = [
  { id: "first_match", name: "İlk Maç", desc: "Bir maç bitir.", check: () => profile.matches >= 1 },
  { id: "score_500", name: "500 Skor", desc: "Tek profilde 500 en iyi skora ulaş.", check: () => profile.bestScore >= 500 },
  { id: "skin_owner", name: "Koleksiyoncu", desc: "En az 3 kostüm aç.", check: () => profile.ownedSkins.length >= 3 },
];

const QUESTS = [
  { id: "play_one", name: "Arenaya Gir", desc: "Bir maç tamamla.", coin: 60, title: "rookie", check: () => profile.matches >= 1 },
  { id: "play_three", name: "Isınma Turu", desc: "3 maç tamamla.", coin: 90, title: "survivor", check: () => profile.matches >= 3 },
  { id: "reach_800", name: "Avcı Skoru", desc: "800 en iyi skora ulaş.", coin: 160, title: "hunter", check: () => profile.bestScore >= 800 },
  { id: "reach_1500", name: "Şampiyon Yolu", desc: "1500 en iyi skora ulaş.", coin: 260, title: "champion", check: () => profile.bestScore >= 1500 },
  { id: "own_four", name: "Renk Ustası", desc: "4 kostüme sahip ol.", coin: 220, title: "collector", check: () => profile.ownedSkins.length >= 4 },
  { id: "coin_1000", name: "Coin Kasası", desc: "1000 coin biriktir.", coin: 180, title: "speedster", check: () => profile.coins >= 1000 },
];

const PALETTES = [
  { id: "aurora", name: "Aurora", a: "#4ff3ff", b: "#b8ff5d" },
  { id: "ember", name: "Ember", a: "#ffb347", b: "#ff3d6e" },
  { id: "ice", name: "Ice", a: "#d8f3ff", b: "#5ee7ff" },
  { id: "forest", name: "Forest", a: "#b8ff5d", b: "#31e7a5" },
];

let width = 0;
let height = 0;
let scale = 1;
let foods = [];
let foodBuckets = new Map();
let effects = [];
let traps = [];
let snakes = [];
let player = null;
let localPlayers = [];
let focusPlayer = null;
let running = false;
let selectedSkin = "cyan";
let gameMode = "solo";
let currentRoom = "";
let botCountSetting = 9;
let matchFinalized = false;
let matchHadOpponents = false;
let lastTime = performance.now();
let animationStarted = false;
let pointer = { x: 0, y: 0, active: false };
let joystick = { active: false, pointerId: null, dx: 0, dy: 0, strength: 0, x: 0, y: 0, boostLocked: false };
let keys = new Set();
let camera = { x: WORLD / 2, y: WORLD / 2 };
let viewBounds = { left: 0, right: 0, top: 0, bottom: 0 };
let collectCursor = 0;
let vignetteGradient = null;
let lastHudUpdate = 0;
let lastLeaderboardUpdate = 0;
let lastLeaderboardHtml = "";
let lastRadarDraw = 0;
let lastIdleRender = 0;
let profile = loadLocalProfile();
let authToken = localStorage.getItem(SESSION_KEY) || localStorage.getItem(LEGACY_SESSION_KEY) || "";
if (!authToken) {
  profile = playerProfile();
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(LEGACY_PROFILE_KEY);
}
let onlineNames = [];
let ws = null;
let wsId = null;
let lastNetworkSend = 0;
let serverAvailable = false;
let listeningKeybind = "";
let settingsMessage = "";
let powerKeybinds = loadPowerKeybinds();
let touchControls = loadTouchControls();

function random(min, max) { return Math.random() * (max - min) + min; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function getSkin(id) { return SKINS.find((skin) => skin.id === id) || SKINS[0]; }
function getAvatar(id) { return AVATARS.find((avatar) => avatar.id === id) || AVATARS[0]; }
function isAdminUser() { return Boolean(authToken) && !(guestMode && guestMode.checked) && profile.isAdmin; }
function isEpicSkin(skin) { return skin.rarity === "epic"; }
function epicUnlockMatches(skin) { return Number(skin.unlockMatches || EPIC_UNLOCK_MATCHES); }
function isEpicSkinUnlocked(skin) { return !isEpicSkin(skin) || isAdminUser() || profile.matches >= epicUnlockMatches(skin) || (profile.ownedSkins || []).includes(skin.id); }
function canUseSkin(skin) { return skin.adminOnly ? isAdminUser() : !isEpicSkin(skin) || isEpicSkinUnlocked(skin); }
function getPlayableSkinId(skinId) {
  const skin = getSkin(skinId);
  return profile.ownedSkins.includes(skin.id) && canUseSkin(skin) ? skin.id : "cyan";
}
function syncEpicSkinUnlock() {
  if (profile.isAdmin) return;
  for (const skin of SKINS.filter(isEpicSkin)) {
    if (profile.matches >= epicUnlockMatches(skin) && !profile.ownedSkins.includes(skin.id)) profile.ownedSkins.push(skin.id);
    if (profile.matches < epicUnlockMatches(skin)) profile.ownedSkins = profile.ownedSkins.filter((id) => id !== skin.id);
  }
}
function titleText(id) { return TITLE_CATALOG[id] || id || ""; }
function currentProfileTitle() { return authToken && !(guestMode && guestMode.checked) ? titleText(profile.title) : ""; }
function defaultPowerKeybinds() {
  const defaults = {};
  for (const item of POWER_BINDING_DEFS) defaults[item.kind] = item.defaultCode;
  return defaults;
}

function isAllowedPowerKeyCode(code) {
  if (!code || RESERVED_POWER_KEY_CODES.has(code)) return false;
  return /^Key[A-Z]$/.test(code) || /^Digit[0-9]$/.test(code) || /^Numpad[0-9]$/.test(code);
}

function normalizePowerKeybinds(raw = {}) {
  const defaults = defaultPowerKeybinds();
  const used = new Set();
  const clean = {};
  for (const item of POWER_BINDING_DEFS) {
    let code = typeof raw[item.kind] === "string" ? raw[item.kind] : defaults[item.kind];
    if (!isAllowedPowerKeyCode(code) || used.has(code)) code = defaults[item.kind];
    clean[item.kind] = code;
    used.add(code);
  }
  return clean;
}

function loadPowerKeybinds() {
  try {
    return normalizePowerKeybinds(JSON.parse(localStorage.getItem(KEYBINDS_KEY) || "{}"));
  } catch {
    return defaultPowerKeybinds();
  }
}

function savePowerKeybinds() {
  localStorage.setItem(KEYBINDS_KEY, JSON.stringify(powerKeybinds));
  updatePowerKeyLabels();
  renderSettings();
}

function displayKeyCode(code) {
  if (/^Key[A-Z]$/.test(code)) return code.slice(3);
  if (/^Digit[0-9]$/.test(code)) return code.slice(5);
  if (/^Numpad[0-9]$/.test(code)) return `Num ${code.slice(6)}`;
  return code || "-";
}

function normalizeTouchControls(raw = {}) {
  const clean = { ...TOUCH_CONTROL_DEFAULTS };
  for (const item of TOUCH_CONTROL_DEFS) {
    const value = Number(raw[item.key]);
    clean[item.key] = Number.isFinite(value) ? Math.round(clamp(value, item.min, item.max)) : TOUCH_CONTROL_DEFAULTS[item.key];
  }
  return clean;
}

function loadTouchControls() {
  try {
    return normalizeTouchControls(JSON.parse(localStorage.getItem(TOUCH_CONTROLS_KEY) || "{}"));
  } catch {
    return { ...TOUCH_CONTROL_DEFAULTS };
  }
}

function saveTouchControls() {
  localStorage.setItem(TOUCH_CONTROLS_KEY, JSON.stringify(touchControls));
}

function touchControlLabel(key) {
  const item = TOUCH_CONTROL_DEFS.find((entry) => entry.key === key);
  const value = Math.round(touchControls[key] ?? TOUCH_CONTROL_DEFAULTS[key]);
  return item ? `${value}${item.unit}` : `${value}`;
}

function viewportControlPoint(xPercent, yPercent, size) {
  const margin = Math.max(10, size / 2 + 8);
  return {
    x: clamp(window.innerWidth * xPercent / 100, margin, window.innerWidth - margin),
    y: clamp(window.innerHeight * yPercent / 100, margin, window.innerHeight - margin),
  };
}

function positionPowerButtons() {
  if (!powerButtons) return;
  const clusterSize = touchControls.powerSize * 2 + 30;
  const point = viewportControlPoint(touchControls.powerX, touchControls.powerY, clusterSize);
  powerButtons.style.left = `${point.x}px`;
  powerButtons.style.top = `${point.y}px`;
}

function positionIdleJoystick() {
  if (!touchStick || joystick.active) return;
  const point = viewportControlPoint(touchControls.stickX, touchControls.stickY, touchControls.stickSize);
  joystick.x = point.x;
  joystick.y = point.y;
  syncJoystickVisual();
}

function applyTouchControls() {
  document.documentElement.style.setProperty("--touch-stick-size", `${touchControls.stickSize}px`);
  document.documentElement.style.setProperty("--touch-thumb-size", `${Math.round(touchControls.stickSize * 0.32)}px`);
  document.documentElement.style.setProperty("--power-button-size", `${touchControls.powerSize}px`);
  document.documentElement.style.setProperty("--power-button-icon-size", `${Math.round(touchControls.powerSize * 0.46)}px`);
  positionPowerButtons();
  positionIdleJoystick();
}

function setTouchControlValue(key, rawValue) {
  const item = TOUCH_CONTROL_DEFS.find((entry) => entry.key === key);
  if (!item) return;
  const value = Number(rawValue);
  touchControls[key] = Math.round(clamp(Number.isFinite(value) ? value : TOUCH_CONTROL_DEFAULTS[key], item.min, item.max));
  saveTouchControls();
  applyTouchControls();
}

function resetTouchControls() {
  touchControls = { ...TOUCH_CONTROL_DEFAULTS };
  saveTouchControls();
  applyTouchControls();
  settingsMessage = "Mobil kontrol d\u00fczeni varsay\u0131lana d\u00f6nd\u00fc.";
  renderSettings();
}

function powerKindForEvent(event) {
  return POWER_BINDING_DEFS.find((item) => powerKeybinds[item.kind] === event.code)?.kind || "";
}

function setPowerKeybind(kind, code) {
  const item = POWER_BINDING_DEFS.find((entry) => entry.kind === kind);
  if (!item) return false;
  if (!isAllowedPowerKeyCode(code)) {
    settingsMessage = "Hareket, boost ve sistem tu\u015flar\u0131 g\u00fc\u00e7 tu\u015fu olamaz.";
    renderSettings();
    return false;
  }
  const previous = powerKeybinds[kind] || item.defaultCode;
  const duplicate = POWER_BINDING_DEFS.find((entry) => entry.kind !== kind && powerKeybinds[entry.kind] === code);
  if (duplicate) powerKeybinds[duplicate.kind] = previous;
  powerKeybinds[kind] = code;
  listeningKeybind = "";
  settingsMessage = `${item.label} tu\u015fu ${displayKeyCode(code)} oldu.`;
  savePowerKeybinds();
  return true;
}

function resetPowerKeybinds() {
  powerKeybinds = defaultPowerKeybinds();
  listeningKeybind = "";
  settingsMessage = "Tu\u015flar varsay\u0131lana d\u00f6nd\u00fc.";
  localStorage.setItem(KEYBINDS_KEY, JSON.stringify(powerKeybinds));
  updatePowerKeyLabels();
  renderSettings();
}

function selectedSkinControlColors() {
  const skin = getSkin(getPlayableSkinId(selectedSkin));
  return skin.colors || SKINS[0].colors;
}

function updatePowerKeyLabels() {
  const colors = selectedSkinControlColors();
  for (const item of POWER_BINDING_DEFS) {
    const button = POWER_BUTTONS[item.kind];
    if (!button) continue;
    const label = displayKeyCode(powerKeybinds[item.kind]);
    const visual = POWER_BUTTON_VISUALS[item.kind] || { short: label, icon: "" };
    button.dataset.powerKind = item.kind;
    button.style.setProperty("--skin-a", colors[0]);
    button.style.setProperty("--skin-b", colors[1]);
    button.style.setProperty("--charge", button.style.getPropertyValue("--charge") || "100%");
    button.innerHTML = `<i class="skin-chip" aria-hidden="true"></i><b class="power-glyph">${visual.icon || visual.short}</b><span class="power-key">${label}</span><small class="power-state"></small>`;
    button.title = `${item.label} (${label})`;
    button.setAttribute("aria-label", `${item.label} ${label}`);
  }
}

function setPowerButtonState(button, ready, percent, stateText = "", locked = false) {
  if (!button) return;
  const amount = clamp(Number(percent) || 0, 0, 100);
  button.classList.toggle("is-ready", Boolean(ready));
  button.classList.toggle("is-locked", Boolean(locked));
  button.style.setProperty("--charge", `${Math.round(amount)}%`);
  const state = button.querySelector(".power-state");
  if (state) state.textContent = stateText;
}

function startKeybindCapture(kind) {
  listeningKeybind = kind;
  const item = POWER_BINDING_DEFS.find((entry) => entry.kind === kind);
  settingsMessage = item ? `${item.label} i\u00e7in yeni tu\u015fa bas.` : "Yeni tu\u015fa bas.";
  renderSettings();
}

function capturePowerKey(event) {
  event.preventDefault();
  event.stopPropagation();
  if (event.code === "Escape") {
    listeningKeybind = "";
    settingsMessage = "Tuş değiştirme iptal edildi.";
    renderSettings();
    return;
  }
  setPowerKeybind(listeningKeybind, event.code);
}
function isPowerActive(snake, now = performance.now()) { return Boolean(snake && (snake.powerActiveUntil || 0) > now); }
function isDashActive(snake, now = performance.now()) { return Boolean(snake && (snake.dashFlashUntil || 0) > now); }
function isTwinActive(snake, now = performance.now()) { return Boolean(snake && (snake.twinActiveUntil || 0) > now); }
function isGoldActive(snake, now = performance.now()) { return Boolean(snake && (snake.goldActiveUntil || 0) > now); }
function arePowersLocked(snake, now = performance.now()) { return Boolean(snake && (snake.powerLockUntil || 0) > now); }
function powerLockSeconds(snake, now = performance.now()) { return Math.max(0, Math.ceil(((snake?.powerLockUntil || 0) - now) / 1000)); }
function canTriggerPower(snake, now = performance.now()) {
  return Boolean(snake && snake.alive && snake.type !== "remote" && snake.type !== "hologram" && !arePowersLocked(snake, now));
}
function activatePower(snake, now = performance.now()) {
  if (!canTriggerPower(snake, now) || snake.power < 100 || isPowerActive(snake, now)) return false;
  snake.power = 0;
  snake.powerActiveUntil = now + POWER_DURATION;
  spawnEffectBurst(snake.x, snake.y, snake.colors?.[1] || "#b8ff5d", 14);
  return true;
}
function activateDash(snake, now = performance.now()) {
  if (!canTriggerPower(snake, now) || snake.dashPower < DASH_COST || now < (snake.dashCooldownUntil || 0)) return false;
  const fromX = snake.x;
  const fromY = snake.y;
  const distance = DASH_DISTANCE + Math.min(70, Math.max(0, snake.radius - 12) * 2.2);
  snake.dashPower = 0;
  snake.dashCooldownUntil = now + DASH_COOLDOWN_MS;
  snake.dashFlashUntil = now + DASH_FLASH_MS;
  snake.x = clamp(snake.x + Math.cos(snake.angle) * distance, 32, WORLD - 32);
  snake.y = clamp(snake.y + Math.sin(snake.angle) * distance, 32, WORLD - 32);
  const maxSegments = Math.max(8, Math.floor(snake.targetLength));
  snake.segments.unshift({ x: snake.x, y: snake.y });
  while (snake.segments.length > maxSegments) snake.segments.pop();
  refreshSnakeBounds(snake);
  snake.boundsRefreshAt = now + 120;
  spawnEffectBurst(fromX, fromY, "#4ff3ff", 8);
  spawnEffectBurst(snake.x, snake.y, snake.colors?.[1] || "#b8ff5d", 10);
  return true;
}
function activateTwin(snake, now = performance.now()) {
  if (!snake || !snake.alive || snake.type === "remote" || snake.type === "hologram") return false;
  if (arePowersLocked(snake, now)) return false;
  if (isTwinActive(snake, now)) return beginTwinSwap(snake, now);
  if (snake.twinPower < 100) return false;
  snake.twinPower = 0;
  snake.twinActiveUntil = now + TWIN_DURATION_MS;
  snake.twinSwapAt = 0;
  snake.twinSwapStartedAt = 0;
  snake.twinSwapUsed = false;
  snake.twinMirrorTargetId = "";
  snake.twinMirrorSide = snake.twinMirrorSide || (Math.random() < 0.5 ? -1 : 1);
  const twin = syncTwinHologram(snake, now);
  spawnEffectBurst(snake.x, snake.y, "#8feeff", 12);
  if (twin) spawnEffectBurst(twin.x, twin.y, "#4ff3ff", 12);
  return true;
}
function beginTwinSwap(snake, now = performance.now()) {
  if (!snake || !isTwinActive(snake, now) || snake.twinSwapAt || snake.twinSwapUsed) return false;
  const twin = syncTwinHologram(snake, now);
  if (!twin) return false;
  snake.twinSwapAt = now + TWIN_SWAP_DELAY_MS;
  snake.twinSwapStartedAt = now;
  snake.twinSwapUsed = true;
  twin.twinSwapAt = snake.twinSwapAt;
  twin.twinSwapStartedAt = snake.twinSwapStartedAt;
  spawnEffectBurst(twin.x, twin.y, "#8feeff", 14);
  return true;
}
function finishTwinSwap(snake, now = performance.now()) {
  if (!snake || !snake.twinSwapAt || snake.twinSwapAt > now) return false;
  const twin = snakes.find((item) => item.id === `holo-${snake.id}` && item.alive);
  if (twin) {
    const fromX = snake.x;
    const fromY = snake.y;
    const maxSegments = Math.max(8, Math.floor(snake.targetLength));
    const clone = twin.segments.slice(0, maxSegments).map((segment) => ({ x: segment.x, y: segment.y }));
    const last = clone[clone.length - 1] || { x: twin.x, y: twin.y };
    while (clone.length < maxSegments) clone.push({ x: last.x, y: last.y });
    snake.x = twin.x;
    snake.y = twin.y;
    snake.angle = twin.angle;
    snake.segments = clone;
    refreshSnakeBounds(snake);
    snake.boundsRefreshAt = now + 120;
    spawnEffectBurst(fromX, fromY, "#8feeff", 10);
    spawnEffectBurst(snake.x, snake.y, "#4ff3ff", 16);
  }
  snake.twinActiveUntil = now;
  snake.twinSwapAt = 0;
  snake.twinSwapStartedAt = 0;
  return Boolean(twin);
}
function activateGold(snake, now = performance.now()) {
  if (!canTriggerPower(snake, now) || (snake.goldPower ?? 100) < 100 || isGoldActive(snake, now)) return false;
  snake.goldPower = 0;
  snake.goldActiveUntil = now + GOLD_DURATION_MS;
  spawnEffectBurst(snake.x + Math.cos(snake.angle) * snake.radius * 2, snake.y + Math.sin(snake.angle) * snake.radius * 2, "#ffd166", 18);
  return true;
}
function activateTrap(snake, now = performance.now()) {
  if (!canTriggerPower(snake, now) || (snake.trapPower ?? 100) < 100) return false;
  const tail = snake.segments[snake.segments.length - 1] || snake;
  snake.trapPower = 0;
  traps.push({
    id: `${snake.id}-${Math.round(now)}`,
    ownerId: snake.id,
    x: tail.x,
    y: tail.y,
    r: Math.max(18, snake.radius + 7),
    createdAt: now,
    expiresAt: now + TRAP_DURATION_MS,
    color: snake.colors?.[1] || "#ff3d6e",
  });
  if (traps.length > 36) traps.splice(0, traps.length - 36);
  spawnEffectBurst(tail.x, tail.y, "#ff3d6e", 10);
  return true;
}
function nearestTwinTarget(source) {
  const maxDist = TWIN_MIRROR_TARGET_RANGE * TWIN_MIRROR_TARGET_RANGE;
  if (source.twinMirrorTargetId) {
    const locked = snakes.find((item) => item.id === source.twinMirrorTargetId && item.alive && item.type !== "hologram" && item.id !== source.id);
    if (locked) {
      const dx = locked.x - source.x;
      const dy = locked.y - source.y;
      if (dx * dx + dy * dy <= maxDist) return locked;
    }
  }
  let best = null;
  let bestDist = Infinity;
  for (const candidate of snakes) {
    if (!candidate.alive || candidate.type === "hologram" || candidate.id === source.id) continue;
    const dx = candidate.x - source.x;
    const dy = candidate.y - source.y;
    const dist = dx * dx + dy * dy;
    if (dist < bestDist) { bestDist = dist; best = candidate; }
  }
  return bestDist <= maxDist ? best : null;
}
function twinMirrorAnchor(source) {
  const target = nearestTwinTarget(source);
  if (target) {
    source.twinMirrorTargetId = target.id;
    return { x: target.x, y: target.y, targetId: target.id };
  }
  source.twinMirrorTargetId = "";
  source.twinMirrorSide = source.twinMirrorSide || (Math.random() < 0.5 ? -1 : 1);
  const sideAngle = source.angle + Math.PI / 2;
  const desiredX = clamp(source.x + Math.cos(sideAngle) * TWIN_FALLBACK_OFFSET * source.twinMirrorSide, 36, WORLD - 36);
  const desiredY = clamp(source.y + Math.sin(sideAngle) * TWIN_FALLBACK_OFFSET * source.twinMirrorSide, 36, WORLD - 36);
  return { x: (source.x + desiredX) / 2, y: (source.y + desiredY) / 2, targetId: "" };
}

function mirrorTwinPoint(point, anchor) {
  return {
    x: clamp(anchor.x * 2 - point.x, 36, WORLD - 36),
    y: clamp(anchor.y * 2 - point.y, 36, WORLD - 36),
  };
}
function syncTwinHologram(source, now = performance.now()) {
  if (!source || !source.alive || source.type === "hologram" || !isTwinActive(source, now)) return null;
  const anchor = twinMirrorAnchor(source);
  const mirroredHead = mirrorTwinPoint(source, anchor);
  const twinId = `holo-${source.id}`;
  let twin = snakes.find((item) => item.id === twinId);
  if (!twin) {
    twin = makeSnake("Hologram", source.skin, { type: "hologram", id: twinId, title: "İkili Takım", x: mirroredHead.x, y: mirroredHead.y, length: Math.min(TWIN_SEGMENT_LIMIT, source.segments.length || 18), ownerId: source.id });
    snakes.push(twin);
  }
  twin.ownerId = source.id;
  twin.alive = true;
  twin.name = "Hologram";
  twin.title = "İkili Takım";
  twin.skin = source.skin;
  twin.colors = source.colors;
  twin.x = mirroredHead.x;
  twin.y = mirroredHead.y;
  twin.angle = (source.angle + Math.PI) % (Math.PI * 2);
  twin.targetLength = source.targetLength;
  twin.score = source.score;
  twin.radius = source.radius;
  twin.powerActiveUntil = source.powerActiveUntil;
  twin.dashFlashUntil = source.dashFlashUntil;
  twin.twinActiveUntil = source.twinActiveUntil;
  twin.twinSwapAt = source.twinSwapAt || 0;
  twin.twinSwapStartedAt = source.twinSwapStartedAt || 0;
  twin.goldActiveUntil = source.goldActiveUntil || 0;
  twin.powerLockUntil = source.powerLockUntil || 0;
  const limit = Math.min(TWIN_SEGMENT_LIMIT, source.segments.length);
  twin.segments.length = limit;
  for (let i = 0; i < limit; i++) {
    const sourceSegment = source.segments[i] || source;
    const mirrored = mirrorTwinPoint(sourceSegment, anchor);
    const segment = twin.segments[i] || { x: 0, y: 0 };
    segment.x = mirrored.x;
    segment.y = mirrored.y;
    twin.segments[i] = segment;
  }
  refreshSnakeBounds(twin);
  twin.boundsRefreshAt = now + 180;
  return twin;
}
function syncTwinHolograms(now = performance.now()) {
  for (const source of snakes) {
    if (source.type !== "hologram" && source.twinSwapAt && source.twinSwapAt <= now) finishTwinSwap(source, now);
  }
  const activeOwners = new Set();
  let hasHologram = false;
  for (let i = 0; i < snakes.length; i++) {
    const source = snakes[i];
    if (source.type === "hologram") { hasHologram = true; continue; }
    if (!source.alive || !isTwinActive(source, now)) continue;
    activeOwners.add(source.id);
    syncTwinHologram(source, now);
  }
  if (hasHologram) snakes = snakes.filter((item) => item.type !== "hologram" || activeOwners.has(item.ownerId));
}
function currentPowerTarget() {
  const target = focusPlayer && focusPlayer.alive && focusPlayer.type !== "hologram" ? focusPlayer : player;
  return target && target.alive && target.type !== "remote" && target.type !== "hologram" ? target : null;
}
function triggerSpecialPower(kind) {
  if (!running) return false;
  const target = currentPowerTarget();
  if (!target || arePowersLocked(target)) return false;
  if (kind === "area") return activatePower(target);
  if (kind === "dash") return activateDash(target);
  if (kind === "twin") return activateTwin(target);
  if (kind === "gold") return activateGold(target);
  if (kind === "trap") return activateTrap(target);
  return false;
}function snakeRadiusForLength(length, isHuman = true) { return (isHuman ? 12.5 : 11.5) + Math.min(13, Math.max(0, length - 18) * 0.055); }
function cleanName(value, fallback) { return (value || "").trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 14) || fallback; }
function getCurrentPlayerName() { return authToken && !(guestMode && guestMode.checked) ? profile.name : cleanName(profileName ? profileName.value : "", "Guest"); }
function angleLerp(current, target, amount) {
  const diff = ((target - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return current + diff * amount;
}

function adminProfile(name = "Admin") {
  return { name: cleanName(name, "Admin"), coins: 5000, bestScore: 0, matches: 0, role: "admin", isAdmin: true, title: "admin", unlockedTitles: ["admin", "rookie", "hunter", "collector", "champion", "speedster", "survivor"], achievements: [], claimedQuests: [], avatar: "near", ownedSkins: SKINS.map((skin) => skin.id), activeSkin: "cyan", theme: "aurora", language: "tr", friends: [] };
}

function playerProfile(name = "Guest") {
  return { name: cleanName(name, "Guest"), coins: 120, bestScore: 0, matches: 0, role: "player", isAdmin: false, title: "rookie", unlockedTitles: ["rookie"], achievements: [], claimedQuests: [], avatar: "near", ownedSkins: ["cyan"], activeSkin: "cyan", theme: "aurora", language: "tr", friends: [], friendRequests: [], outgoingRequests: [], roomInvites: [] };
}

function loadLocalProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || localStorage.getItem(LEGACY_PROFILE_KEY));
    if (!saved || typeof saved !== "object") return playerProfile();
    return normalizeProfile(saved);
  } catch {
    return playerProfile();
  }
}

function normalizeProfile(raw) {
  const seed = raw;
  const base = seed.isAdmin ? adminProfile(seed.name || "Admin") : playerProfile(seed.name || "Guest");
  const merged = { ...base, ...seed };
  merged.name = cleanName(merged.name, base.name);
  merged.friends = Array.isArray(merged.friends) ? merged.friends.map((item) => typeof item === "string" ? { name: item, online: false } : item) : [];
  merged.friendRequests = Array.isArray(merged.friendRequests) ? merged.friendRequests : [];
  merged.outgoingRequests = Array.isArray(merged.outgoingRequests) ? merged.outgoingRequests : [];
  merged.roomInvites = Array.isArray(merged.roomInvites) ? merged.roomInvites : [];
  merged.avatar = AVATARS.some((avatar) => avatar.id === merged.avatar) ? merged.avatar : "near";
  merged.isAdmin = Boolean(merged.isAdmin && merged.role === "admin");
  merged.role = merged.isAdmin ? "admin" : "player";
  merged.unlockedTitles = Array.isArray(merged.unlockedTitles) && merged.unlockedTitles.length ? Array.from(new Set(merged.unlockedTitles)) : ["rookie"];
  if (merged.isAdmin) merged.unlockedTitles = adminProfile(merged.name).unlockedTitles;
  merged.title = merged.isAdmin ? "admin" : (merged.unlockedTitles.includes(merged.title) ? merged.title : merged.unlockedTitles[0]);
  const validSkinIds = new Set(SKINS.map((skin) => skin.id));
  merged.ownedSkins = merged.isAdmin ? SKINS.map((skin) => skin.id) : Array.from(new Set(["cyan", ...(merged.ownedSkins || [])])).filter((id) => validSkinIds.has(id));
  if (!merged.isAdmin) {
    for (const skin of SKINS.filter(isEpicSkin)) {
      if ((Number(merged.matches) || 0) >= epicUnlockMatches(skin) && !merged.ownedSkins.includes(skin.id)) merged.ownedSkins.push(skin.id);
      if ((Number(merged.matches) || 0) < epicUnlockMatches(skin)) merged.ownedSkins = merged.ownedSkins.filter((id) => id !== skin.id);
    }
  }
  if (!merged.ownedSkins.includes(merged.activeSkin)) merged.activeSkin = "cyan";
  return merged;
}
async function api(path, options = {}) {
  const response = await fetch(path, { headers: { "content-type": "application/json" }, cache: "no-store", ...options });
  if (!response.ok) throw new Error("server_error");
  return response.json();
}

async function loadServerProfile() {
  if (guestMode.checked || !authToken) {
    serverAvailable = false;
    if (serverStatus) serverStatus.textContent = "Yerel";
    renderProfile();
    return;
  }
  try {
    const result = await api(`/api/session?token=${encodeURIComponent(authToken)}`);
    profile = normalizeProfile(result.profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    serverAvailable = true;
    if (serverStatus) serverStatus.textContent = "Online";
  } catch {
    authToken = "";
    profile = playerProfile();
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LEGACY_SESSION_KEY);
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(LEGACY_PROFILE_KEY);
    serverAvailable = false;
    if (serverStatus) serverStatus.textContent = "Yerel";
  }
  renderProfile();
}

async function saveProfile() {
  if (guestMode.checked || !authToken) {
    serverAvailable = false;
    if (serverStatus) serverStatus.textContent = "Yerel";
    return;
  }
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  try {
    const result = await api("/api/profile", { method: "POST", body: JSON.stringify({ ...profile, token: authToken }) });
    profile = normalizeProfile(result.profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    serverAvailable = true;
    if (serverStatus) serverStatus.textContent = "Online";
    renderProfile();
  } catch {
    serverAvailable = false;
    if (serverStatus) serverStatus.textContent = "Oturum gerekli";
  }
}

async function addFriend() {
  const input = document.getElementById("friendSearchInput") || friendName;
  if (!input || guestMode.checked || !authToken) return;
  const friend = cleanName(input.value, "");
  if (!friend || friend === profile.name) return;
  await sendFriendRequest(friend);
  input.value = "";
}

function setAuthStatus(text) {
  if (authStatus) authStatus.textContent = text;
}

async function loginAccount(create = false) {
  const name = cleanName(accountName.value, "");
  const password = accountPassword.value || "";
  if (!name || password.length < 3) { setAuthStatus("Kullanıcı adı ve 3+ karakter şifre gerekli"); return; }
  try {
    const result = await api(create ? "/api/auth/register" : "/api/auth/login", { method: "POST", body: JSON.stringify({ name, password }) });
    authToken = result.token;
    localStorage.setItem(SESSION_KEY, authToken);
    profile = normalizeProfile(result.profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    guestMode.checked = false;
    accountPassword.value = "";
    setAuthStatus(create ? "Hesap oluşturuldu" : "Oturum açıldı");
    renderProfile();
  } catch {
    setAuthStatus(create ? "Bu ad kullanılıyor olabilir" : "Giriş başarısız");
  }
}

async function logoutAccount() {
  try { if (authToken) await api("/api/auth/logout", { method: "POST", body: JSON.stringify({ token: authToken }) }); } catch {}
  authToken = "";
  profile = playerProfile();
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(LEGACY_SESSION_KEY);
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(LEGACY_PROFILE_KEY);
  if (accountName) accountName.value = "";
  setAuthStatus("Oturum kapatıldı");
  renderProfile();
}

async function searchUsers() {
  const input = document.getElementById("friendSearchInput") || friendName;
  const results = document.getElementById("friendSearchResults");
  if (!input || !results || !authToken) return;
  const q = cleanName(input.value, "");
  if (q.length < 2) {
    results.innerHTML = `<article class="friend-row muted"><div><b>Arama hazır</b><small>En az 2 karakter yaz</small></div></article>`;
    return;
  }
  results.innerHTML = `<article class="friend-row muted"><div><b>Aranıyor</b><small>${q}</small></div></article>`;
  try {
    const data = await api(`/api/users/search?token=${encodeURIComponent(authToken)}&q=${encodeURIComponent(q)}`);
    results.innerHTML = data.users.length
      ? data.users.map((user) => {
        const relation = user.relation || (isFriendName(user.name) ? "friend" : "none");
        const status = user.online ? "Çevrim içi" : "Çevrim dışı";
        let action = `<button data-friend-request="${user.name}">İstek gönder</button>`;
        if (relation === "friend") action = `<button disabled>Arkadaş</button>`;
        if (relation === "outgoing") action = `<button disabled>Beklemede</button>`;
        if (relation === "incoming") action = `<button data-accept-friend="${user.name}">Kabul et</button>`;
        return `<article class="friend-row"><div><b>${user.name}</b><small>${status}</small></div>${action}</article>`;
      }).join("")
      : `<article class="friend-row muted"><div><b>Sonuç yok</b><small>Başka ad dene</small></div></article>`;
    results.querySelectorAll("[data-friend-request]").forEach((button) => button.addEventListener("click", () => sendFriendRequest(button.dataset.friendRequest)));
    results.querySelectorAll("[data-accept-friend]").forEach((button) => button.addEventListener("click", () => respondFriendRequest(button.dataset.acceptFriend, true)));
  } catch {
    results.innerHTML = `<article class="friend-row"><div><b>Arama başarısız</b><small>Sunucuya ulaşılamadı</small></div></article>`;
  }
}
async function sendFriendRequest(friend) {
  if (!authToken) { setAuthStatus("Arkadaş eklemek için giriş yap"); return; }
  try {
    const result = await api("/api/friends/request", { method: "POST", body: JSON.stringify({ token: authToken, friend }) });
    profile = normalizeProfile(result.profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setAuthStatus(result.accepted ? `${friend} artık arkadaşın` : `${friend} için istek gönderildi`);
    renderProfile();
    searchUsers();
  } catch {
    setAuthStatus("Arkadaş isteği gönderilemedi");
  }
}

async function respondFriendRequest(from, accept) {
  if (!authToken) return;
  try {
    const result = await api("/api/friends/respond", { method: "POST", body: JSON.stringify({ token: authToken, from, accept }) });
    profile = normalizeProfile(result.profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setAuthStatus(accept ? `${from} arkadaş listene eklendi` : `${from} isteği reddedildi`);
    renderProfile();
    searchUsers();
  } catch {
    setAuthStatus("Arkadaş isteği güncellenemedi");
  }
}

async function removeFriend(friend) {
  if (!authToken || !friend) return;
  try {
    const result = await api("/api/friends/remove", { method: "POST", body: JSON.stringify({ token: authToken, friend }) });
    profile = normalizeProfile(result.profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setAuthStatus(`${friend} arkadaşlıktan çıkarıldı`);
    renderProfile();
  } catch {
    setAuthStatus("Arkadaş kaldırılamadı");
  }
}
async function inviteFriend(friend) {
  if (!authToken) return;
  if (!currentRoom) {
    gameMode = "room-create";
    currentRoom = generateRoomCode();
    updateModeButtons();
  }
  try {
    await api("/api/friends/invite", { method: "POST", body: JSON.stringify({ token: authToken, friend, room: currentRoom }) });
    setAuthStatus(`${friend} oda daveti aldı: ${currentRoom}`);
  } catch {
    setAuthStatus("Oda daveti gönderilemedi");
  }
}

function useRoomInvite(room) {
  gameMode = "room-join";
  currentRoom = cleanName(room, "LOBBY").toUpperCase();
  roomCodeInput.value = currentRoom;
  updateModeButtons();
  hideQuickPanel();
}
function generateRoomCode() {
  return `AREA${Math.floor(1000 + Math.random() * 9000)}`;
}

function showQuickPanel(kind) {
  quickPanel.classList.remove("is-hidden");
  const titleMap = { profile: "Profil", friends: "Arkadaşlar", shop: "Dükkan", achievements: "Başarımlar", quests: "Görevler", palette: "Renk Kataloğu", settings: "Ayarlar" };
  quickTitle.textContent = titleMap[kind] || "Panel";
  if (quickAuth) quickAuth.classList.toggle("is-hidden", kind !== "profile");
  quickProfile.classList.toggle("is-hidden", kind !== "profile");
  quickFriends.classList.toggle("is-hidden", kind !== "friends");
  quickShop.classList.toggle("is-hidden", kind !== "shop");
  quickAchievements.classList.toggle("is-hidden", kind !== "achievements");
  quickQuests.classList.toggle("is-hidden", kind !== "quests");
  quickPalette.classList.toggle("is-hidden", kind !== "palette");
  if (quickSettings) quickSettings.classList.toggle("is-hidden", kind !== "settings");
  renderProfile();
}
function hideQuickPanel() {
  quickPanel.classList.add("is-hidden");
}

function renderProfile() {
  const isGuest = guestMode.checked;
  const isSignedIn = Boolean(authToken) && !isGuest;
  const shownName = isGuest ? cleanName(profileName.value, "Guest") : isSignedIn ? profile.name : "Misafir";
  const avatar = getAvatar(profile.avatar);
  const titleText = isGuest || !isSignedIn ? "Misafir" : TITLE_CATALOG[profile.title] || "Çaylak";
  if (profileName) profileName.value = isSignedIn ? profile.name : "Guest";
  if (profileAvatar) profileAvatar.textContent = isSignedIn ? avatar.mark : shownName.charAt(0).toUpperCase();
  if (topUserName) topUserName.textContent = shownName;
  if (topUserTitle) topUserTitle.textContent = titleText;
  const profileMark = document.querySelector(".profile-mark");
  if (profileMark) profileMark.textContent = isSignedIn ? avatar.mark : shownName.charAt(0).toUpperCase();
  if (menuProfileName) menuProfileName.textContent = shownName;
  if (menuProfileTitle) menuProfileTitle.textContent = titleText;
  if (coinCount) coinCount.textContent = isSignedIn ? Math.floor(profile.coins).toLocaleString("tr-TR") : "-";
  if (bestScore) bestScore.textContent = isSignedIn ? Math.floor(profile.bestScore).toLocaleString("tr-TR") : "-";
  if (matchCount) matchCount.textContent = isSignedIn ? Math.floor(profile.matches).toLocaleString("tr-TR") : "-";
  if (profileRole) profileRole.textContent = titleText;
  selectedSkin = getPlayableSkinId(profile.activeSkin);
  updatePowerKeyLabels();
  document.body.classList.remove(...PALETTES.map((palette) => `palette-${palette.id}`));
  document.body.classList.add(`palette-${profile.theme}`);
  if (languageCode) languageCode.textContent = profile.language === "tr" ? "TR" : "EN";
  if (accountName && authToken && !accountName.value) accountName.value = profile.name;
  const friendTotal = (profile.friends || []).length;
  const onlineTotal = (profile.friends || []).filter((friend) => onlineNames.includes(typeof friend === "string" ? friend : friend.name) || Boolean(friend.online)).length;
  if (authFriendCount) authFriendCount.textContent = `${friendTotal} arkadaş`;
  if (authOnlineCount) authOnlineCount.textContent = `${onlineTotal} çevrim içi`;
  setAuthStatus(isGuest ? "Misafir modu" : authToken ? `${profile.name} olarak giriş yapıldı` : "Giriş yap veya hesap oluştur");

  const avatarOptions = AVATARS.map((item) => `<button class="choice-card ${profile.avatar === item.id ? "is-selected" : ""}" data-profile-avatar="${item.id}"><b>${item.mark}</b><span>${item.name}</span></button>`).join("");
  const titleOptions = (profile.unlockedTitles || ["rookie"]).map((title) => `<button class="choice-card ${profile.title === title ? "is-selected" : ""}" data-profile-title="${title}"><b>${TITLE_CATALOG[title] || title}</b><span>Ünvan</span></button>`).join("");
  quickProfile.innerHTML = `
    <section class="profile-hero"><div class="profile-avatar-large">${isSignedIn ? avatar.mark : shownName.charAt(0).toUpperCase()}</div><div><span>Oyuncu profili</span><strong>@${shownName}</strong><small>${titleText}</small></div></section>
    <div><span>Coin</span><strong>${isSignedIn ? Math.floor(profile.coins).toLocaleString("tr-TR") : "-"}</strong></div>
    <div><span>En iyi</span><strong>${isSignedIn ? Math.floor(profile.bestScore).toLocaleString("tr-TR") : "-"}</strong></div>
    <section class="profile-choice"><h3>Profil resmini seç</h3><div class="choice-grid">${avatarOptions}</div></section>
    <section class="profile-choice"><h3>Ünvanını seç</h3><div class="choice-grid">${titleOptions}</div></section>`;
  document.querySelectorAll("[data-profile-avatar]").forEach((button) => button.addEventListener("click", () => setProfileAvatar(button.dataset.profileAvatar)));
  document.querySelectorAll("[data-profile-title]").forEach((button) => button.addEventListener("click", () => setProfileTitle(button.dataset.profileTitle)));
  renderFriends();
  renderShop();
  renderAchievements();
  renderQuests();
  renderPalette();
}

function friendNameOf(friend) {
  return typeof friend === "string" ? friend : friend.name;
}

function isFriendName(name) {
  return (profile.friends || []).some((friend) => friendNameOf(friend) === name);
}

function friendOnline(friend) {
  const name = friendNameOf(friend);
  return onlineNames.includes(name) || Boolean(friend && friend.online);
}
function renderFriends() {
  const friends = profile.friends || [];
  const requests = profile.friendRequests || [];
  const outgoing = profile.outgoingRequests || [];
  const invites = profile.roomInvites || [];
  const onlineCount = friends.filter(friendOnline).length;
  if (friendList) {
    friendList.innerHTML = friends.length
      ? friends.map((friend) => {
        const name = friendNameOf(friend);
        return `<li><span>${name}</span><small>${friendOnline(friend) ? "Online" : "Offline"}</small></li>`;
      }).join("")
      : `<li><span>Arkadaş yok</span><small>Ekle</small></li>`;
  }
  if (!quickFriends) return;
  if (guestMode.checked || !authToken) {
    quickFriends.innerHTML = `
      <section class="friend-card auth-required-card">
        <h3>Arkadaş servisi</h3>
        <p>Arkadaş aramak ve davet almak için profilinle giriş yap.</p>
        <button class="inline-action" data-open-profile-login="1">Girişe git</button>
      </section>`;
    quickFriends.querySelector("[data-open-profile-login]")?.addEventListener("click", () => showQuickPanel("profile"));
    return;
  }
  const requestHtml = requests.length
    ? requests.map((name) => `<article class="friend-row"><div><b>${name}</b><small>Arkadaşlık isteği gönderdi</small></div><div class="friend-actions"><button data-accept-friend="${name}">Kabul</button><button class="is-muted" data-reject-friend="${name}">Reddet</button></div></article>`).join("")
    : `<article class="friend-row muted"><div><b>Gelen istek yok</b><small>Yeni istekler burada görünür</small></div></article>`;
  const outgoingHtml = outgoing.length
    ? outgoing.map((name) => `<article class="friend-row muted"><div><b>${name}</b><small>Yanıt bekleniyor</small></div><span class="request-chip">Beklemede</span></article>`).join("")
    : `<article class="friend-row muted"><div><b>Giden istek yok</b><small>Aramadan yeni istek gönderebilirsin</small></div></article>`;
  const inviteHtml = invites.length
    ? invites.map((invite) => `<article class="friend-row"><div><b>${invite.from}</b><small>${invite.room} odasına davet etti</small></div><button data-use-invite="${invite.room}">Lobiye gir</button></article>`).join("")
    : `<article class="friend-row muted"><div><b>Oda daveti yok</b><small>Davetler burada görünür</small></div></article>`;
  const friendsHtml = friends.length
    ? friends.map((friend) => {
      const name = friendNameOf(friend);
      const online = friendOnline(friend);
      return `<article class="friend-row"><div><b>${name}</b><small>${online ? "Çevrim içi" : "Çevrim dışı"}</small></div><div class="friend-actions"><button data-invite-friend="${name}">Davet</button><button class="is-muted" data-remove-friend="${name}">Çıkar</button></div></article>`;
    }).join("")
    : `<article class="friend-row muted"><div><b>Henüz arkadaş yok</b><small>Kullanıcı ara ve istek gönder</small></div></article>`;
  quickFriends.innerHTML = `
    <section class="friend-overview">
      <article><b>${friends.length}</b><span>Arkadaş</span></article>
      <article><b>${onlineCount}</b><span>Çevrim içi</span></article>
      <article><b>${requests.length}</b><span>İstek</span></article>
    </section>
    <section class="friend-card search-card">
      <h3>Kullanıcı ara</h3>
      <div class="friend-search"><input id="friendSearchInput" maxlength="14" placeholder="Kullanıcı adı" autocomplete="off" /><button id="friendSearchButton">Ara</button></div>
      <div id="friendSearchResults" class="friend-results"><article class="friend-row muted"><div><b>Arama hazır</b><small>En az 2 karakter yaz</small></div></article></div>
    </section>
    <section class="friend-card"><h3>Arkadaşların</h3>${friendsHtml}</section>
    <section class="friend-card"><h3>Gelen istekler</h3>${requestHtml}</section>
    <section class="friend-card"><h3>Giden istekler</h3>${outgoingHtml}</section>
    <section class="friend-card"><h3>Oda davetleri</h3>${inviteHtml}</section>`;
  const searchInput = document.getElementById("friendSearchInput");
  document.getElementById("friendSearchButton")?.addEventListener("click", searchUsers);
  searchInput?.addEventListener("input", () => {
    clearTimeout(searchInput.searchTimer);
    searchInput.searchTimer = setTimeout(searchUsers, 220);
  });
  searchInput?.addEventListener("keydown", (event) => { if (event.key === "Enter") searchUsers(); });
  quickFriends.querySelectorAll("[data-accept-friend]").forEach((button) => button.addEventListener("click", () => respondFriendRequest(button.dataset.acceptFriend, true)));
  quickFriends.querySelectorAll("[data-reject-friend]").forEach((button) => button.addEventListener("click", () => respondFriendRequest(button.dataset.rejectFriend, false)));
  quickFriends.querySelectorAll("[data-invite-friend]").forEach((button) => button.addEventListener("click", () => inviteFriend(button.dataset.inviteFriend)));
  quickFriends.querySelectorAll("[data-remove-friend]").forEach((button) => button.addEventListener("click", () => removeFriend(button.dataset.removeFriend)));
  quickFriends.querySelectorAll("[data-use-invite]").forEach((button) => button.addEventListener("click", () => useRoomInvite(button.dataset.useInvite)));
}
function renderShop() {
  const html = SKINS.map((skin) => {
    const adminLocked = skin.adminOnly && !canUseSkin(skin);
    const epicLocked = isEpicSkin(skin) && !canUseSkin(skin);
    const owned = profile.ownedSkins.includes(skin.id) || ((isEpicSkin(skin) || skin.adminOnly) && canUseSkin(skin));
    const unlockAt = epicUnlockMatches(skin);
    const selected = selectedSkin === skin.id;
    const lockedByGuest = (!authToken || guestMode.checked) && !owned;
    let label = selected ? "Seçili" : owned ? "Seç" : `${skin.price} coin`;
    if (adminLocked) label = "Admin özel";
    if (epicLocked) label = `${unlockAt} maç tamamla`;
    if (lockedByGuest) label = "Profil gerekli";
    const skinNote = skin.note || "";
    const detail = skinNote ? (epicLocked ? `${Math.max(0, unlockAt - (profile.matches || 0))} maç kaldı - ${skinNote}` : adminLocked ? `Sadece admin - ${skinNote}` : skinNote) : adminLocked ? "Sadece admin" : epicLocked ? `${Math.max(0, unlockAt - (profile.matches || 0))} maç kaldı` : owned ? (skin.rarity === "admin" ? "Admin özel" : skin.rarity === "epic" ? "Epic ödül" : "Açık") : `${skin.price} coin`;
    const previewClass = skin.hat ? ` skin-preview-cowboy${skin.beard ? " skin-preview-beard" : ""}` : "";
    const beardPreview = skin.beard ? "<strong></strong>" : "";
    const handPreview = skin.hand ? "<em></em>" : "";
    const starPreview = skin.stars ? "<u></u><u></u>" : "";
    return `<article class="shop-card ${skin.rarity === "epic" ? "is-epic" : ""} ${skin.rarity === "admin" ? "is-admin-skin" : ""}"><div class="skin-preview${previewClass}" style="--skin-a:${skin.colors[0]};--skin-b:${skin.colors[1]}"><span></span><span></span><span></span><i></i>${handPreview}${beardPreview}${starPreview}</div><b>${skin.name}</b><small>${detail}</small><button class="${selected ? "is-selected" : ""}" data-shop-skin="${skin.id}" ${lockedByGuest || epicLocked || adminLocked ? "disabled" : ""}>${label}</button></article>`;
  }).join("");
  if (shopGrid) shopGrid.innerHTML = html;
  quickShop.innerHTML = html;
  document.querySelectorAll("[data-shop-skin]").forEach((button) => button.addEventListener("click", () => handleShopClick(button.dataset.shopSkin)));
}

function renderSettings() {
  if (!quickSettings) return;
  const keyRows = POWER_BINDING_DEFS.map((item, index) => {
    const listening = listeningKeybind === item.kind;
    const key = displayKeyCode(powerKeybinds[item.kind]);
    return `<article class="keybind-row keybind-${item.kind}">
      <div class="keybind-meta"><span class="keybind-badge">${index + 1}</span><div><b>${item.label}</b><small>${item.desc}</small></div></div>
      <button class="key-capture ${listening ? "is-listening" : ""}" data-keybind-kind="${item.kind}" aria-label="${item.label} tu\u015funu de\u011fi\u015ftir"><kbd>${listening ? "..." : key}</kbd><span>${listening ? "Tu\u015fa bas" : "De\u011fi\u015ftir"}</span></button>
    </article>`;
  }).join("");
  const touchRows = TOUCH_CONTROL_DEFS.map((item) => `<label class="touch-control-row">
    <span><b>${item.label}</b><small>${item.desc}</small></span>
    <input type="range" min="${item.min}" max="${item.max}" value="${touchControls[item.key]}" data-touch-control="${item.key}" />
    <output data-touch-output="${item.key}">${touchControlLabel(item.key)}</output>
  </label>`).join("");
  quickSettings.innerHTML = `
    <section class="settings-card">
      <header class="settings-head"><div><span>KONTROLLER</span><h3>\u00d6zel g\u00fc\u00e7 tu\u015flar\u0131</h3></div><button class="inline-action is-muted" data-reset-keybinds="1">S\u0131f\u0131rla</button></header>
      <div class="keybind-list">${keyRows}</div>
      <p class="settings-message ${settingsMessage ? "is-active" : ""}">${settingsMessage || "Tu\u015f ve mobil kontrol d\u00fczeni bu cihazda saklan\u0131r."}</p>
    </section>
    <section class="settings-card mobile-control-card">
      <header class="settings-head control-head"><div><span>MOB\u0130L D\u00dcZEN</span><h3>Joystick ve butonlar</h3></div><button class="inline-action is-muted" data-reset-touch="1">S\u0131f\u0131rla</button></header>
      <div class="control-preview" aria-hidden="true"><span class="preview-stick"></span><span class="preview-buttons"><i></i><i></i><i></i><i></i></span></div>
      <div class="touch-control-list">${touchRows}</div>
    </section>`;
  quickSettings.querySelectorAll("[data-keybind-kind]").forEach((button) => button.addEventListener("click", () => startKeybindCapture(button.dataset.keybindKind)));
  quickSettings.querySelector("[data-reset-keybinds]")?.addEventListener("click", resetPowerKeybinds);
  quickSettings.querySelector("[data-reset-touch]")?.addEventListener("click", resetTouchControls);
  quickSettings.querySelectorAll("[data-touch-control]").forEach((input) => {
    input.addEventListener("input", () => {
      setTouchControlValue(input.dataset.touchControl, input.value);
      const output = quickSettings.querySelector(`[data-touch-output="${input.dataset.touchControl}"]`);
      if (output) output.textContent = touchControlLabel(input.dataset.touchControl);
    });
    input.addEventListener("change", () => {
      settingsMessage = "Mobil kontrol d\u00fczeni kaydedildi.";
      renderSettings();
    });
  });
}
function renderAchievements() {
  quickAchievements.innerHTML = ACHIEVEMENTS.map((achievement) => {
    const done = achievement.check();
    const unlocked = profile.achievements.includes(achievement.id);
    return `<article class="reward-card"><header><b>${achievement.name}</b><small>${unlocked || done ? "Tamam" : "Devam"}</small></header><p>${achievement.desc}</p></article>`;
  }).join("");
}

function renderQuests() {
  quickQuests.innerHTML = QUESTS.map((quest) => {
    const ready = quest.check();
    const claimed = profile.claimedQuests.includes(quest.id);
    const rewardTitle = TITLE_CATALOG[quest.title] || "Ünvan";
    return `<article class="reward-card"><header><b>${quest.name}</b><small>+${quest.coin} coin / ${rewardTitle}</small></header><p>${quest.desc}</p><button data-quest="${quest.id}" ${!ready || claimed || guestMode.checked || !authToken ? "disabled" : ""}>${claimed ? "Alındı" : ready ? "Ödülü Al" : "Kilitli"}</button></article>`;
  }).join("");
  document.querySelectorAll("[data-quest]").forEach((button) => button.addEventListener("click", () => claimQuest(button.dataset.quest)));
}

function renderPalette() {
  quickPalette.innerHTML = PALETTES.map((palette) => `<button class="palette-card" data-palette="${palette.id}"><span class="palette-swatch" style="--a:${palette.a};--b:${palette.b}"></span><strong>${palette.name}</strong></button>`).join("");
  document.querySelectorAll("[data-palette]").forEach((button) => button.addEventListener("click", () => setPalette(button.dataset.palette)));
}

function refreshAchievements() {
  for (const achievement of ACHIEVEMENTS) {
    if (achievement.check() && !profile.achievements.includes(achievement.id)) profile.achievements.push(achievement.id);
  }
}

function setProfileAvatar(id) {
  if (guestMode.checked || !authToken || !AVATARS.some((avatar) => avatar.id === id)) return;
  profile.avatar = id;
  saveProfile();
  renderProfile();
}

function setProfileTitle(id) {
  if (guestMode.checked || !authToken || !profile.unlockedTitles.includes(id)) return;
  profile.title = id;
  saveProfile();
  renderProfile();
}

function claimQuest(id) {
  const quest = QUESTS.find((item) => item.id === id);
  if (!quest || guestMode.checked || !authToken || profile.claimedQuests.includes(id) || !quest.check()) return;
  profile.claimedQuests.push(id);
  profile.coins += quest.coin;
  if (!profile.unlockedTitles.includes(quest.title)) profile.unlockedTitles.push(quest.title);
  profile.title = quest.title;
  saveProfile();
  renderProfile();
}

function setPalette(id) {
  if (!PALETTES.some((palette) => palette.id === id)) return;
  profile.theme = id;
  saveProfile();
  renderProfile();
}

function toggleLanguage() {
  profile.language = profile.language === "tr" ? "en" : "tr";
  const en = profile.language === "en";
  document.querySelector('[data-i18n="score"]').textContent = en ? "Score" : "Skor";
  document.querySelector('[data-i18n="length"]').textContent = en ? "Length" : "Uzunluk";
  document.getElementById("startHint").textContent = en ? "Play with bots, create a room, or join friends with a room code." : "Botlarla oyna, oda kur veya oda koduyla arkadaşlarınla gir.";
  if (playButtonText) playButtonText.textContent = gameMode.startsWith("room") ? (en ? "ENTER LOBBY" : "LOBİYE GİR") : (en ? "ENTER ARENA" : "OYUNA GİR");
  saveProfile();
  renderProfile();
}

function setGameHudVisible(visible) {
  document.querySelectorAll(".game-stat").forEach((item) => item.classList.toggle("is-hidden", !visible || item.classList.contains("charge-stat")));
  document.body.classList.toggle("is-playing", visible);
  if (visible) applyTouchControls();
  if (radarWrap) radarWrap.classList.toggle("is-hidden", !visible);
  if (!visible) {
    resetJoystick();
    if (player) player.boostHeld = false;
  }
}
function handleShopClick(skinId) {
  const skin = getSkin(skinId);
  const owned = profile.ownedSkins.includes(skin.id) || ((isEpicSkin(skin) || skin.adminOnly) && canUseSkin(skin));
  if (!owned) {
    if (guestMode.checked || !authToken || isEpicSkin(skin) || skin.adminOnly || profile.coins < skin.price) return;
    profile.coins -= skin.price;
    profile.ownedSkins.push(skin.id);
  }
  if (skin.adminOnly && !canUseSkin(skin)) return;
  if ((isEpicSkin(skin) || skin.adminOnly) && !profile.ownedSkins.includes(skin.id)) profile.ownedSkins.push(skin.id);
  selectedSkin = skin.id;
  profile.activeSkin = skin.id;
  saveProfile();
  renderProfile();
}

function updateModeButtons() {
  document.querySelectorAll(".mode-button").forEach((button) => button.classList.toggle("is-active", button.dataset.mode === gameMode));
  if (p2Field) p2Field.classList.toggle("is-visible", gameMode === "party");
  roomPanel.classList.toggle("is-hidden", !gameMode.startsWith("room"));
  if (gameMode === "room-create") {
    if (!currentRoom) currentRoom = generateRoomCode();
    roomCodeInput.value = currentRoom;
    roomCodeInput.placeholder = "Otomatik oda kodu";
    roomCodeInput.readOnly = true;
    roomCodeInput.classList.add("system-code");
    if (roomCodeHintText) roomCodeHintText.textContent = "Oda kodun:";
  } else if (gameMode === "room-join") {
    roomCodeInput.readOnly = false;
    roomCodeInput.placeholder = "Oda kodunu gir";
    roomCodeInput.classList.remove("system-code");
    if (currentRoom && roomCodeInput.value === currentRoom) roomCodeInput.value = "";
    if (roomCodeHintText) roomCodeHintText.textContent = "Katılacağın oda:";
  } else {
    roomCodeInput.readOnly = false;
    roomCodeInput.placeholder = "Oda kodu";
    roomCodeInput.classList.remove("system-code");
    if (roomCodeHintText) roomCodeHintText.textContent = "Oda kodu:";
  }
  roomCodeLabel.textContent = gameMode.startsWith("room") ? (roomCodeInput.value || currentRoom || "-") : "-";
  if (playButtonText) playButtonText.textContent = gameMode.startsWith("room") ? "LOBİYE GİR" : "OYUNA GİR";
}
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  const dpr = 1;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
  scale = width < 720 ? 0.82 : 1;
  vignetteGradient = null;
  applyTouchControls();
}

function targetFoodCount() {
  if (width < 720) return 340;
  if (width < 1100) return 450;
  return FOOD_COUNT;
}

function maxFoodCount() {
  return targetFoodCount() + FOOD_EXTRA_LIMIT;
}

function foodCell(value) {
  return Math.floor(value / FOOD_CELL);
}

function foodBucketKey(cx, cy) {
  return (cx + 64) * 128 + (cy + 64);
}

function addFoodToBucket(food) {
  const cx = foodCell(food.x);
  const cy = foodCell(food.y);
  food.bucket = foodBucketKey(cx, cy);
  let bucket = foodBuckets.get(food.bucket);
  if (!bucket) {
    bucket = [];
    foodBuckets.set(food.bucket, bucket);
  }
  bucket.push(food);
}

function removeFoodFromBucket(food) {
  const bucket = foodBuckets.get(food.bucket);
  if (!bucket) return;
  const index = bucket.indexOf(food);
  if (index >= 0) {
    const last = bucket.pop();
    if (index < bucket.length) bucket[index] = last;
  }
  if (!bucket.length) foodBuckets.delete(food.bucket);
}

function addFood(food) {
  food.index = foods.length;
  foods.push(food);
  addFoodToBucket(food);
}

function removeFood(food) {
  if (!food) return;
  removeFoodFromBucket(food);
  let index = food.index;
  if (!Number.isInteger(index) || foods[index] !== food) index = foods.indexOf(food);
  if (index < 0) return;
  const last = foods.pop();
  if (last && last !== food) {
    foods[index] = last;
    last.index = index;
  }
}

function clearFoods() {
  foods = [];
  foodBuckets.clear();
}

function spawnFood(count, burstX, burstY, value = 1) {
  const burst = Number.isFinite(burstX) && Number.isFinite(burstY);
  const cap = burst ? maxFoodCount() : targetFoodCount();
  for (let i = 0; i < count && foods.length < cap; i++) {
    const aroundBurst = burst && Math.random() < 0.85;
    const x = aroundBurst ? burstX + random(-90, 90) : random(100, WORLD - 100);
    const y = aroundBurst ? burstY + random(-90, 90) : random(100, WORLD - 100);
    const skin = SKINS[Math.floor(random(0, SKINS.length))];
    addFood({ x: clamp(x, 36, WORLD - 36), y: clamp(y, 36, WORLD - 36), r: random(3.2, 6.6) + value * 0.35, value, color: skin.colors[Math.floor(random(0, 2))], pulse: random(0, Math.PI * 2), index: 0, bucket: "" });
  }
}


function spawnEffectBurst(x, y, color = "#b8ff5d", count = 9) {
  const allowed = Math.max(0, Math.min(count, MAX_EFFECTS - effects.length));
  for (let i = 0; i < allowed; i++) {
    effects.push({
      x,
      y,
      vx: random(-2.1, 2.1),
      vy: random(-2.1, 2.1),
      life: random(18, 32),
      maxLife: 32,
      size: random(2.2, 5.6),
      color,
    });
  }
}

function updateEffects(dt) {
  let write = 0;
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    effect.life -= dt;
    if (effect.life <= 0) continue;
    effect.x += effect.vx * dt;
    effect.y += effect.vy * dt;
    effect.vx *= 0.985;
    effect.vy *= 0.985;
    effects[write++] = effect;
  }
  effects.length = write;
}

function drawEffects() {
  if (!effects.length) return;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < effects.length; i++) {
    const effect = effects[i];
    const alpha = clamp(effect.life / effect.maxLife, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = effect.color;
    ctx.beginPath();
    ctx.arc(effect.x, effect.y, effect.size * (1.2 - alpha * 0.2), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}
function makeSnake(name, skinId, options = {}) {
  const type = options.type || "human";
  const isHuman = type === "human";
  const x = Number.isFinite(options.x) ? options.x : random(420, WORLD - 420);
  const y = Number.isFinite(options.y) ? options.y : random(420, WORLD - 420);
  const length = Number.isFinite(options.length) ? Math.max(8, Math.floor(options.length)) : isHuman ? 18 : Math.floor(random(15, 34));
  const angle = random(0, Math.PI * 2);
  const segments = [];
  for (let i = 0; i < length; i++) segments.push({ x: x - Math.cos(angle) * i * SEGMENT_GAP, y: y - Math.sin(angle) * i * SEGMENT_GAP });
  const skin = getSkin(skinId);
  const snake = { id: options.id || `${Date.now()}-${Math.random()}`, name, title: options.title || "", skin: skin.id, colors: skin.colors, type, control: options.control || "bot", isPlayer: isHuman, alive: true, x, y, angle, turn: 0.09, segments, targetLength: length, score: Math.max(0, (length - 12) * 14), boost: 100, boostHeld: false, boostRechargeLocked: false, power: options.power ?? 100, powerActiveUntil: 0, dashPower: options.dashPower ?? 100, dashFlashUntil: 0, dashCooldownUntil: 0, twinPower: options.twinPower ?? 100, twinActiveUntil: 0, twinSwapAt: 0, twinSwapStartedAt: 0, twinSwapUsed: false, twinMirrorTargetId: options.twinMirrorTargetId || "", twinMirrorSide: options.twinMirrorSide || 0, goldPower: options.goldPower ?? 100, goldActiveUntil: 0, trapPower: options.trapPower ?? 100, powerLockUntil: 0, ownerId: options.ownerId || null, thinkAt: 0, aiAngle: angle, baseRadius: isHuman ? 12.5 : 11.5, radius: snakeRadiusForLength(length, isHuman), bounds: null, boundsRefreshAt: 0 };
  refreshSnakeBounds(snake);
  return snake;
}


function refreshSnakeBounds(snake) {
  let left = snake.x;
  let right = snake.x;
  let top = snake.y;
  let bottom = snake.y;
  for (const segment of snake.segments) {
    if (segment.x < left) left = segment.x;
    if (segment.x > right) right = segment.x;
    if (segment.y < top) top = segment.y;
    if (segment.y > bottom) bottom = segment.y;
  }
  const pad = snake.radius + 12;
  snake.bounds = { left: left - pad, right: right + pad, top: top - pad, bottom: bottom + pad };
}

function expandSnakeBounds(snake, x, y) {
  if (!snake.bounds) { refreshSnakeBounds(snake); return; }
  const pad = snake.radius + 12;
  if (x - pad < snake.bounds.left) snake.bounds.left = x - pad;
  if (x + pad > snake.bounds.right) snake.bounds.right = x + pad;
  if (y - pad < snake.bounds.top) snake.bounds.top = y - pad;
  if (y + pad > snake.bounds.bottom) snake.bounds.bottom = y + pad;
}

function boundsOutsideView(bounds, padding) {
  return bounds && (bounds.right < viewBounds.left - padding || bounds.left > viewBounds.right + padding || bounds.bottom < viewBounds.top - padding || bounds.top > viewBounds.bottom + padding);
}
function renderLobby() {
  if (!lobbyPanel) return;
  if (lobbyCode) lobbyCode.textContent = currentRoom || "-";
  const shownName = getCurrentPlayerName();
  const players = lobbyPlayers.length ? lobbyPlayers : [{ id: wsId || "local", name: shownName, host: isRoomHost }];
  if (lobbyPlayersEl) {
    lobbyPlayersEl.innerHTML = players.map((item) => `<article class="lobby-player"><span>${item.host ? "Kurucu" : "Oyuncu"}</span><strong>${item.name || "Guest"}</strong></article>`).join("");
  }
  if (startRoomButton) startRoomButton.classList.toggle("is-hidden", !isRoomHost);
  if (lobbyStatus) lobbyStatus.textContent = isRoomHost ? "Oda hazır. Arkadaşların katılınca oyunu sen başlatırsın." : "Oda kurucusunun oyunu başlatması bekleniyor.";
}

function enterLobby() {
  if (gameMode === "room-create") {
    if (!currentRoom) currentRoom = generateRoomCode();
    roomCodeInput.value = currentRoom;
    isRoomHost = true;
  } else if (gameMode === "room-join") {
    currentRoom = cleanName(roomCodeInput.value, "").toUpperCase();
    if (!currentRoom) {
      roomCodeInput.focus();
      roomCodeLabel.textContent = "Kod gerekli";
      return;
    }
    roomCodeInput.value = currentRoom;
    isRoomHost = false;
  } else {
    resetGame();
    return;
  }
  lobbyPlayers = [];
  lobbyHostId = "";
  roomCodeLabel.textContent = currentRoom;
  startPanel.classList.add("is-hidden");
  deathPanel.classList.add("is-hidden");
  lobbyPanel.classList.remove("is-hidden");
  setGameHudVisible(false);
  if (radarWrap) radarWrap.classList.add("is-hidden");
  hideQuickPanel();
  renderLobby();
  connectOnline(true);
}

function beginRoomGame() {
  if (lobbyPanel) lobbyPanel.classList.add("is-hidden");
  resetGame();
}

function startRoomFromLobby() {
  if (!isRoomHost) return;
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "start", botCount: botCountSetting }));
  } else {
    beginRoomGame();
  }
}

function copyRoomCode() {
  if (!currentRoom) return;
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(currentRoom).catch(() => {});
  if (lobbyStatus) lobbyStatus.textContent = `Oda kodu hazır: ${currentRoom}`;
}

function closeOnline() {
  if (ws && ws.readyState === WebSocket.OPEN) {
    try { ws.send(JSON.stringify({ type: "leave" })); } catch {}
    ws.close();
  } else if (ws) {
    try { ws.close(); } catch {}
  }
  ws = null;
  wsId = null;
  lobbyPlayers = [];
  lobbyHostId = "";
}

function exitToMenu() {
  running = false;
  matchFinalized = true;
  snakes = [];
  localPlayers = [];
  player = null;
  focusPlayer = null;
  effects = [];
  traps = [];
  clearFoods();
  closeOnline();
  setGameHudVisible(false);
  startPanel.classList.remove("is-hidden");
  if (lobbyPanel) lobbyPanel.classList.add("is-hidden");
  deathPanel.classList.add("is-hidden");
  if (radarWrap) radarWrap.classList.add("is-hidden");
  updateModeButtons();
  renderProfile();
}

function handlePlayButton() {
  if (gameMode.startsWith("room")) enterLobby();
  else resetGame();
}
function resetGame() {
  if (document.activeElement && typeof document.activeElement.blur === "function") document.activeElement.blur();
  clearFoods();
  effects = [];
  snakes = [];
  localPlayers = [];
  matchFinalized = false;
  matchHadOpponents = false;
  collectCursor = 0;
  const p1Name = getCurrentPlayerName();
  selectedSkin = getPlayableSkinId(selectedSkin);
  if (authToken && !guestMode.checked) {
    profile.activeSkin = selectedSkin;
    saveProfile();
  }
  player = makeSnake(p1Name, selectedSkin, { type: "human", control: "p1", title: currentProfileTitle(), x: WORLD / 2 - 70, y: WORLD / 2 });
  snakes.push(player);
  localPlayers.push(player);
  const botsToSpawn = botCountSetting;
  matchHadOpponents = botsToSpawn > 0;
  for (let i = 0; i < botsToSpawn; i++) {
    const skin = SKINS[Math.floor(random(0, SKINS.length))];
    snakes.push(makeSnake(BOT_NAMES[i % BOT_NAMES.length], skin.id, { type: "bot" }));
  }
  if (gameMode === "room-create") {
    if (!currentRoom) currentRoom = generateRoomCode();
    roomCodeInput.value = currentRoom;
  } else if (gameMode === "room-join") {
    currentRoom = cleanName(roomCodeInput.value, "LOBBY").toUpperCase();
    roomCodeInput.value = currentRoom;
  } else {
    currentRoom = "";
  }
  roomCodeLabel.textContent = currentRoom || "-";
  spawnFood(targetFoodCount());
  focusPlayer = player;
  camera.x = focusPlayer.x;
  camera.y = focusPlayer.y;
  running = true;
  setGameHudVisible(true);
  hideQuickPanel();
  modeLabel.textContent = gameMode.startsWith("room") ? "Oda" : "Bot";
  startPanel.classList.add("is-hidden");
  deathPanel.classList.add("is-hidden");
  if (lobbyPanel) lobbyPanel.classList.add("is-hidden");
  if (radarWrap) radarWrap.classList.remove("is-hidden");
  startLoop();
  if (gameMode.startsWith("room")) connectOnline();
}

function connectOnline(fromLobby = false) {
  if (!currentRoom) currentRoom = "LOBBY";
  roomCodeLabel.textContent = currentRoom;
  const joinMessage = () => JSON.stringify({ type: "join", token: authToken || "", name: getCurrentPlayerName(), skin: getPlayableSkinId(selectedSkin), room: currentRoom, host: isRoomHost });
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(joinMessage());
    if (fromLobby) renderLobby();
    return;
  }
  if (ws && ws.readyState === WebSocket.CONNECTING) return;
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  ws = new WebSocket(`${protocol}://${location.host}/ws`);
  if (serverStatus) serverStatus.textContent = "Bağlanıyor";
  ws.addEventListener("open", () => {
    if (serverStatus) serverStatus.textContent = "Online";
    ws.send(joinMessage());
    if (fromLobby) renderLobby();
  });
  ws.addEventListener("message", (event) => handleOnlineMessage(JSON.parse(event.data)));
  ws.addEventListener("close", () => { if (serverStatus) serverStatus.textContent = "Koptu"; ws = null; });
  ws.addEventListener("error", () => { if (serverStatus) serverStatus.textContent = "Hata"; });
}

function handleOnlineMessage(message) {
  if (message.type === "welcome") wsId = message.id;
  if (message.type === "room") { currentRoom = message.room; roomCodeLabel.textContent = currentRoom; renderProfile(); renderLobby(); }
  if (message.type === "lobby") {
    lobbyPlayers = message.players || [];
    lobbyHostId = message.hostId || "";
    isRoomHost = Boolean(wsId && lobbyHostId === wsId);
    renderLobby();
  }
  if (message.type === "start") {
    if (Number.isFinite(message.botCount)) {
      botCountSetting = clamp(Math.round(message.botCount), 0, 18);
      if (botCountInput) botCountInput.value = botCountSetting;
      if (botCountValue) botCountValue.textContent = botCountSetting.toString();
    }
    beginRoomGame();
  }
  if (message.type === "online") {
    onlineNames = message.names || [];
    renderFriends();
  }
  if (message.type === "players") (message.players || []).forEach(upsertRemoteSnake);
  if (message.type === "player") upsertRemoteSnake(message.player);
  if (message.type === "left") snakes = snakes.filter((snake) => snake.id !== message.id);
}

function upsertRemoteSnake(remote) {
  if (!remote || remote.id === wsId) return;
  const skin = getSkin(remote.skin);
  let snake = snakes.find((item) => item.id === remote.id);
  if (!snake) {
    snake = makeSnake(remote.name || "Online", skin.id, { type: "remote", id: remote.id, title: remote.title || "" });
    matchHadOpponents = true;
    snakes.push(snake);
  }
  snake.name = remote.name || snake.name;
  snake.title = remote.title || snake.title || "";
  snake.skin = skin.id;
  snake.colors = skin.colors;
  snake.type = "remote";
  snake.alive = true;
  snake.x = remote.x;
  snake.y = remote.y;
  snake.angle = remote.angle;
  snake.score = remote.score || 0;
  snake.targetLength = remote.targetLength || 18;
  snake.radius = snakeRadiusForLength(snake.targetLength, snake.isPlayer || snake.type === "human");
  snake.segments = Array.isArray(remote.segments) && remote.segments.length ? remote.segments : snake.segments;
  snake.powerActiveUntil = remote.powerActive ? performance.now() + 180 : 0;
  snake.dashFlashUntil = remote.dashActive ? performance.now() + 180 : snake.dashFlashUntil || 0;
  snake.twinActiveUntil = remote.twinActive ? performance.now() + 220 : snake.twinActiveUntil || 0;
  snake.goldActiveUntil = remote.goldActive ? performance.now() + 220 : 0;
  snake.powerLockUntil = remote.powerLocked ? performance.now() + 220 : 0;
}

function sendOnlineState(now) {
  if (!gameMode.startsWith("room") || !ws || ws.readyState !== WebSocket.OPEN || !player || !player.alive) return;
  if (now - lastNetworkSend < 70) return;
  lastNetworkSend = now;
  ws.send(JSON.stringify({ type: "state", skin: selectedSkin, title: player.title || currentProfileTitle(), powerActive: isPowerActive(player, now), dashActive: isDashActive(player, now), twinActive: isTwinActive(player, now), goldActive: isGoldActive(player, now), powerLocked: arePowersLocked(player, now), x: player.x, y: player.y, angle: player.angle, score: player.score, targetLength: player.targetLength, segments: player.segments.slice(0, 70) }));
}

function screenToWorld(x, y) { return { x: camera.x + (x - width / 2) / scale, y: camera.y + (y - height / 2) / scale }; }
function syncJoystickVisual() {
  if (!touchStick) return;
  const travel = Math.max(34, touchControls.stickSize * 0.28);
  touchStick.style.left = `${joystick.x}px`;
  touchStick.style.top = `${joystick.y}px`;
  touchStick.style.setProperty("--stick-x", `${joystick.dx * travel}px`);
  touchStick.style.setProperty("--stick-y", `${joystick.dy * travel}px`);
  touchStick.classList.toggle("is-active", joystick.active && joystick.strength > 0.12);
  touchStick.classList.toggle("is-idle", !joystick.active);
  touchStick.classList.toggle("is-boost-zone", joystick.active && joystick.strength >= BOOST_OUTER_THRESHOLD && !joystick.boostLocked);
}

function resetJoystick() {
  joystick.active = false;
  joystick.pointerId = null;
  joystick.dx = 0;
  joystick.dy = 0;
  joystick.strength = 0;
  joystick.boostLocked = false;
  positionIdleJoystick();
}

function updateJoystick(event) {
  if (!touchStick) return;
  const rect = touchStick.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const max = rect.width * 0.42;
  const rawX = event.clientX - centerX;
  const rawY = event.clientY - centerY;
  const distance = Math.hypot(rawX, rawY);
  const limited = Math.min(distance, max);
  const angle = distance ? Math.atan2(rawY, rawX) : 0;
  joystick.dx = Math.cos(angle) * (limited / max);
  joystick.dy = Math.sin(angle) * (limited / max);
  joystick.strength = Math.min(1, distance / max);
  if (joystick.strength <= BOOST_RECHARGE_INNER) joystick.boostLocked = false;
  syncJoystickVisual();
}

function startJoystick(event, captureTarget = touchStick) {
  if (event.pointerType !== "touch") return false;
  event.preventDefault();
  event.stopPropagation();
  joystick.active = true;
  joystick.pointerId = event.pointerId;
  joystick.x = event.clientX;
  joystick.y = event.clientY;
  captureTarget?.setPointerCapture?.(event.pointerId);
  updateJoystick(event);
  return true;
}

function endJoystick(event) {
  if (joystick.pointerId !== event.pointerId) return;
  event.preventDefault();
  resetJoystick();
}

function updatePointerAim(event) {
  if (event.pointerType === "touch") return;
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
}

function updateHumanIntent(snake) {
  if (!snake.alive || snake.type === "hologram") return;
  let dx = 0;
  let dy = 0;
  if (snake.control === "p2") {
    if (keys.has("j")) dx -= 1;
    if (keys.has("l")) dx += 1;
    if (keys.has("i")) dy -= 1;
    if (keys.has("k")) dy += 1;
    snake.boostHeld = keys.has("u") || keys.has("ShiftRight");
  } else {
    if (keys.has("ArrowLeft") || keys.has("a")) dx -= 1;
    if (keys.has("ArrowRight") || keys.has("d")) dx += 1;
    if (keys.has("ArrowUp") || keys.has("w")) dy -= 1;
    if (keys.has("ArrowDown") || keys.has("s")) dy += 1;
  }
  if (dx || dy) {
    snake.angle = angleLerp(snake.angle, Math.atan2(dy, dx), 0.14);
    return;
  }
  if (snake.control === "p1" && joystick.active && joystick.strength > 0.12) {
    snake.angle = angleLerp(snake.angle, Math.atan2(joystick.dy, joystick.dx), 0.22);
    snake.boostHeld = joystick.strength >= BOOST_OUTER_THRESHOLD && !joystick.boostLocked;
    return;
  }
  if (snake.control === "p1") snake.boostHeld = keys.has(" ") || keys.has("Space");
  if (snake.control === "p1" && pointer.active) {
    const target = screenToWorld(pointer.x, pointer.y);
    snake.angle = angleLerp(snake.angle, Math.atan2(target.y - snake.y, target.x - snake.x), 0.16);
  }
}

function thinkForBot(snake, now) {
  if (now < snake.thinkAt) return;
  snake.thinkAt = now + random(240, 560);
  let closestFood = null;
  let closestDist = Infinity;
  const start = Math.floor(random(0, 8));
  for (let i = start; i < foods.length; i += 8) {
    const dx = foods[i].x - snake.x;
    const dy = foods[i].y - snake.y;
    const d = dx * dx + dy * dy;
    if (d < closestDist) { closestDist = d; closestFood = foods[i]; }
  }
  let desired = closestFood ? Math.atan2(closestFood.y - snake.y, closestFood.x - snake.x) : snake.aiAngle + random(-0.8, 0.8);
  if (snake.x < 260) desired = 0;
  if (snake.x > WORLD - 260) desired = Math.PI;
  if (snake.y < 260) desired = Math.PI / 2;
  if (snake.y > WORLD - 260) desired = -Math.PI / 2;
  snake.aiAngle = desired;
  snake.boostHeld = closestDist > 67600 && snake.boost > 35 && Math.random() < 0.2;
}

function moveSnake(snake, dt, now) {
  if (!snake.alive || snake.type === "remote" || snake.type === "hologram") return;
  if (snake.type === "bot") { thinkForBot(snake, now); snake.angle = angleLerp(snake.angle, snake.aiAngle, snake.turn); }
  else updateHumanIntent(snake);
  const canBoost = snake.boostHeld && !snake.boostRechargeLocked && snake.boost > 4 && snake.targetLength > 12;
  const powered = isPowerActive(snake, now);
  const golden = isGoldActive(snake, now);
  const speed = (canBoost ? BOOST_SPEED : BASE_SPEED) * (powered ? 1.12 : 1) * (golden ? GOLD_SPEED_MULTIPLIER : 1) * dt;
  if (canBoost) {
    snake.boost = Math.max(0, snake.boost - 0.42 * dt);
    snake.targetLength = Math.max(12, snake.targetLength - 0.018 * dt);
    if (snake.boost <= 4) {
      snake.boostRechargeLocked = true;
      if (snake.control === "p1") joystick.boostLocked = true;
    }
    if (Math.random() < 0.045) spawnFood(1, snake.x - Math.cos(snake.angle) * 18, snake.y - Math.sin(snake.angle) * 18, 0.45);
  } else if (!snake.boostRechargeLocked) snake.boost = Math.min(100, snake.boost + 0.09 * dt);
  if (!powered) snake.power = Math.min(100, snake.power + POWER_RECHARGE_RATE * dt);
  if (!isDashActive(snake, now)) snake.dashPower = Math.min(100, (snake.dashPower ?? 100) + DASH_RECHARGE_RATE * dt);
  if (!isTwinActive(snake, now)) snake.twinPower = Math.min(100, (snake.twinPower ?? 100) + TWIN_RECHARGE_RATE * dt);
  if (!golden) snake.goldPower = Math.min(100, (snake.goldPower ?? 100) + GOLD_RECHARGE_RATE * dt);
  snake.trapPower = Math.min(100, (snake.trapPower ?? 100) + TRAP_RECHARGE_RATE * dt);
  if (golden && effects.length < MAX_EFFECTS && Math.random() < (snake.isPlayer ? 0.34 : 0.16)) {
    const fx = snake.x + Math.cos(snake.angle) * snake.radius * 2.2 + random(-5, 5);
    const fy = snake.y + Math.sin(snake.angle) * snake.radius * 2.2 + random(-5, 5);
    spawnEffectBurst(fx, fy, Math.random() < 0.5 ? "#ffd166" : "#fff06a", 1);
  }
  if (snake.control !== "p1" || !joystick.active || joystick.strength <= BOOST_RECHARGE_INNER) snake.boostRechargeLocked = false;
  snake.radius = snakeRadiusForLength(snake.targetLength, snake.isPlayer || snake.type === "human");
  snake.x += Math.cos(snake.angle) * speed;
  snake.y += Math.sin(snake.angle) * speed;
  const maxSegments = Math.max(8, Math.floor(snake.targetLength));
  while (snake.segments.length > maxSegments) snake.segments.pop();
  const segment = snake.segments.length >= maxSegments ? snake.segments.pop() : { x: snake.x, y: snake.y };
  segment.x = snake.x;
  segment.y = snake.y;
  snake.segments.unshift(segment);
  expandSnakeBounds(snake, snake.x, snake.y);
  if (now > snake.boundsRefreshAt) {
    refreshSnakeBounds(snake);
    snake.boundsRefreshAt = now + 280;
  }
}
function collectFood(snake, now = performance.now()) {
  if (snake.type === "remote" || snake.type === "hologram" || !foods.length) return;
  let collected = 0;
  const cx = foodCell(snake.x);
  const cy = foodCell(snake.y);
  const powered = isPowerActive(snake, now);
  const foodRange = powered ? 2 : 1;
  collectLoop:
  for (let gx = cx - foodRange; gx <= cx + foodRange; gx++) {
    for (let gy = cy - foodRange; gy <= cy + foodRange; gy++) {
      const bucket = foodBuckets.get(foodBucketKey(gx, gy));
      if (!bucket) continue;
      for (let i = bucket.length - 1; i >= 0; i--) {
        const food = bucket[i];
        const pickup = snake.radius + food.r + (powered ? POWER_PICKUP_BONUS : 3);
        const dx = food.x - snake.x;
        const dy = food.y - snake.y;
        if (dx * dx + dy * dy < pickup * pickup) {
          removeFood(food);
          snake.targetLength += 0.85 + food.value * 0.55;
          snake.score += Math.round(10 + food.value * 10);
          if (!snake.boostRechargeLocked) snake.boost = Math.min(100, snake.boost + 2.2);
          if (!powered) snake.power = Math.min(100, snake.power + 3.5);
          snake.dashPower = Math.min(100, (snake.dashPower ?? 100) + DASH_PICKUP_BONUS);
          snake.twinPower = Math.min(100, (snake.twinPower ?? 100) + TWIN_PICKUP_BONUS);
          snake.goldPower = Math.min(100, (snake.goldPower ?? 100) + GOLD_PICKUP_BONUS);
          snake.trapPower = Math.min(100, (snake.trapPower ?? 100) + TRAP_PICKUP_BONUS);
          if (snake.isPlayer && collected <= 2) spawnEffectBurst(food.x, food.y, food.color, 1);
          collected++;
          if (!snake.isPlayer || collected >= (powered ? 10 : 5)) break collectLoop;
        }
      }
    }
  }
  collectCursor = (collectCursor + 17) % Math.max(1, foods.length);
  const target = targetFoodCount();
  if (foods.length < target) spawnFood(Math.min(5, target - foods.length));
}

function killSnake(snake, killer) {
  if (!snake.alive || snake.type === "hologram") return;
  snake.alive = false;
  const corpseStep = Math.max(2, Math.ceil(snake.segments.length / 80));
  for (let i = 0; i < snake.segments.length; i += corpseStep) spawnFood(1, snake.segments[i].x, snake.segments[i].y, 1.5);
  if (killer && killer !== snake) killer.score += snake.isPlayer ? 0 : Math.round(snake.score * 0.16 + 60);
  if (snake.type === "bot") return;
  if (snake.type === "human") {
    const aliveHuman = localPlayers.find((item) => item.alive);
    if (aliveHuman) { focusPlayer = aliveHuman; return; }
    finishMatch();
  }
}

function maybeFinishVictory() {
  if (!running || matchFinalized || !matchHadOpponents) return;
  const aliveHumans = localPlayers.filter((item) => item.alive);
  if (!aliveHumans.length) return;
  const aliveOpponents = snakes.some((item) => item.alive && item.type !== "hologram" && !aliveHumans.includes(item));
  if (aliveOpponents) return;
  focusPlayer = aliveHumans[0];
  finishMatch({ victory: true });
}

function finishMatch(options = {}) {
  if (matchFinalized) return;
  const victory = Boolean(options.victory);
  matchFinalized = true;
  running = false;
  const bestHuman = localPlayers.reduce((best, item) => (item.score + item.targetLength * 8 > best.score + best.targetLength * 8 ? item : best), localPlayers[0]);
  const finalScore = Math.round(bestHuman.score + bestHuman.targetLength * 8);
  const earnedCoins = victory ? VICTORY_COIN_REWARD : Math.max(10, Math.floor(finalScore / 55));
  const canSaveMatch = authToken && !guestMode.checked;
  if (canSaveMatch) {
    profile.coins += earnedCoins;
    profile.bestScore = Math.max(profile.bestScore, finalScore);
    profile.matches += 1;
    syncEpicSkinUnlock();
    saveProfile();
  }
  if (deathTitle) deathTitle.textContent = victory ? "1. oldunuz!" : "Yılan dağıldı";
  if (victory) {
    deathText.textContent = canSaveMatch ? `${bestHuman.name} arenada son kaldı. +${earnedCoins} coin kazandın.` : `${bestHuman.name} arenada son kaldı. Misafir modunda 400 coin kaydedilmedi.`;
  } else {
    deathText.textContent = canSaveMatch ? `${bestHuman.name} skoru ${finalScore}. +${earnedCoins} coin kazandın.` : `${bestHuman.name} skoru ${finalScore}. Misafir modunda profil kaydedilmedi.`;
  }
  setGameHudVisible(false);
  deathPanel.classList.remove("is-hidden");
  renderProfile();
}

function resolveCollisions() {
  for (const snake of snakes) {
    if (!snake.alive || snake.type === "remote" || snake.type === "hologram") continue;
    if (snake.x < 18 || snake.x > WORLD - 18 || snake.y < 18 || snake.y > WORLD - 18) { killSnake(snake); continue; }
    for (const other of snakes) {
      if (!snake.alive) break;
      if (!other.alive || other.type === "remote" || other.type === "hologram" || snake.id === other.id) continue;
      const snakePowered = isPowerActive(snake);
      const otherPowered = isPowerActive(other);
      const headLimit = snake.radius + other.radius - 5;
      const headDx = snake.x - other.x;
      const headDy = snake.y - other.y;
      if (headDx * headDx + headDy * headDy < headLimit * headLimit) {
        if (snake.targetLength * (snakePowered ? 1.18 : 1) >= other.targetLength * (otherPowered ? 1.18 : 1)) killSnake(other, snake); else killSnake(snake, other);
        continue;
      }
      const detailed = snake.isPlayer || other.isPlayer || snake.type === "human" || other.type === "human";
      if (!detailed) continue;
      const hitLimit = snake.radius + 3;
      if (other.bounds && (snake.x < other.bounds.left - hitLimit || snake.x > other.bounds.right + hitLimit || snake.y < other.bounds.top - hitLimit || snake.y > other.bounds.bottom + hitLimit)) continue;
      const hitLimitSq = hitLimit * hitLimit;
      const stride = snake.isPlayer || other.isPlayer ? 2 : 4;
      for (let i = 7; i < other.segments.length; i += stride) {
        const seg = other.segments[i];
        const dx = snake.x - seg.x;
        if (dx > hitLimit || dx < -hitLimit) continue;
        const dy = snake.y - seg.y;
        if (dy > hitLimit || dy < -hitLimit) continue;
        if (dx * dx + dy * dy < hitLimitSq) { if (!snakePowered) killSnake(snake, other); break; }
      }
    }
  }
}

function updateTraps(now) {
  if (!traps.length) return;
  let write = 0;
  for (let i = 0; i < traps.length; i++) {
    const trap = traps[i];
    if (trap.expiresAt <= now) continue;
    traps[write++] = trap;
  }
  traps.length = write;
}

function resolveTrapHits(now) {
  if (!traps.length) return;
  for (const snake of snakes) {
    if (!snake.alive || snake.type === "remote" || snake.type === "hologram") continue;
    for (let i = traps.length - 1; i >= 0; i--) {
      const trap = traps[i];
      if (trap.ownerId === snake.id) continue;
      const dx = snake.x - trap.x;
      const dy = snake.y - trap.y;
      const limit = snake.radius + trap.r;
      if (dx * dx + dy * dy >= limit * limit) continue;
      snake.powerLockUntil = Math.max(snake.powerLockUntil || 0, now + TRAP_LOCK_MS);
      snake.powerActiveUntil = Math.min(snake.powerActiveUntil || 0, now);
      snake.goldActiveUntil = Math.min(snake.goldActiveUntil || 0, now);
      snake.twinActiveUntil = Math.min(snake.twinActiveUntil || 0, now);
      snake.twinSwapAt = 0;
      snake.twinSwapStartedAt = 0;
      traps.splice(i, 1);
      spawnEffectBurst(snake.x, snake.y, "#ff3d6e", 14);
      break;
    }
  }
}

function drawTraps(now) {
  if (!traps.length) return;
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const trap of traps) {
    if (trap.x < viewBounds.left - 90 || trap.x > viewBounds.right + 90 || trap.y < viewBounds.top - 90 || trap.y > viewBounds.bottom + 90) continue;
    const life = clamp((trap.expiresAt - now) / TRAP_DURATION_MS, 0, 1);
    const pulse = 1 + Math.sin((now - trap.createdAt) * 0.012) * 0.09;
    ctx.globalAlpha = 0.3 + life * 0.45;
    ctx.strokeStyle = "#ff3d6e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(trap.x, trap.y, trap.r * pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 0.78;
    ctx.fillStyle = trap.color || "#ff3d6e";
    ctx.beginPath();
    ctx.arc(trap.x, trap.y, 5 + 3 * pulse, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
  ctx.globalAlpha = 1;
}
function update(dt, now) {
  if (running) {
    for (const snake of snakes) { if (!snake.alive) continue; moveSnake(snake, dt, now); collectFood(snake, now); }
    syncTwinHolograms(now);
    resolveCollisions();
    maybeFinishVictory();
    sendOnlineState(now);
  }
  updateEffects(dt);
  focusPlayer = localPlayers.find((item) => item.alive) || focusPlayer || player;
  if (focusPlayer) {
    camera.x += (focusPlayer.x - camera.x) * 0.08;
    camera.y += (focusPlayer.y - camera.y) * 0.08;
    if (now - lastHudUpdate > HUD_INTERVAL) {
      scoreEl.textContent = Math.round(focusPlayer.score).toLocaleString("tr-TR");
      lengthEl.textContent = Math.floor(focusPlayer.targetLength).toString();
      boostEl.textContent = `${Math.round(focusPlayer.boost)}%`;
      const locked = arePowersLocked(focusPlayer, now);
      const lockLabel = locked ? `KİLİT ${powerLockSeconds(focusPlayer, now)}` : "";
      if (powerEl) powerEl.textContent = locked ? lockLabel : isPowerActive(focusPlayer, now) ? "AKTİF" : `${Math.round(focusPlayer.power || 0)}%`;
      if (dashPowerEl) dashPowerEl.textContent = locked ? lockLabel : isDashActive(focusPlayer, now) ? "ATILDI" : `${Math.round(focusPlayer.dashPower ?? 100)}%`;
      if (twinPowerEl) twinPowerEl.textContent = locked ? lockLabel : focusPlayer.twinSwapAt && focusPlayer.twinSwapAt > now ? `GEÇ ${Math.ceil((focusPlayer.twinSwapAt - now) / 1000)}` : isTwinActive(focusPlayer, now) ? "2. BAS" : `${Math.round(focusPlayer.twinPower ?? 100)}%`;
      if (goldPowerEl) goldPowerEl.textContent = locked ? lockLabel : isGoldActive(focusPlayer, now) ? "ALTIN" : `${Math.round(focusPlayer.goldPower ?? 100)}%`;
      if (trapPowerEl) trapPowerEl.textContent = locked ? lockLabel : `${Math.round(focusPlayer.trapPower ?? 100)}%`;
      setPowerButtonState(powerButton, !locked && (focusPlayer.power || 0) >= 100 && !isPowerActive(focusPlayer, now), locked ? 0 : (focusPlayer.power || 0), locked ? `${powerLockSeconds(focusPlayer, now)}sn` : isPowerActive(focusPlayer, now) ? "ON" : "", locked);
      setPowerButtonState(dashButton, !locked && (focusPlayer.dashPower ?? 100) >= 100 && !isDashActive(focusPlayer, now), locked ? 0 : (focusPlayer.dashPower ?? 100), locked ? `${powerLockSeconds(focusPlayer, now)}sn` : isDashActive(focusPlayer, now) ? "GO" : "", locked);
      setPowerButtonState(twinButton, !locked && (((focusPlayer.twinPower ?? 100) >= 100 && !isTwinActive(focusPlayer, now)) || (isTwinActive(focusPlayer, now) && !focusPlayer.twinSwapAt && !focusPlayer.twinSwapUsed)), locked ? 0 : (focusPlayer.twinPower ?? 100), locked ? `${powerLockSeconds(focusPlayer, now)}sn` : focusPlayer.twinSwapAt && focusPlayer.twinSwapAt > now ? `${Math.ceil((focusPlayer.twinSwapAt - now) / 1000)}sn` : isTwinActive(focusPlayer, now) ? "SW" : "", locked);
      setPowerButtonState(goldButton, !locked && (focusPlayer.goldPower ?? 100) >= 100 && !isGoldActive(focusPlayer, now), locked ? 0 : (focusPlayer.goldPower ?? 100), locked ? `${powerLockSeconds(focusPlayer, now)}sn` : isGoldActive(focusPlayer, now) ? "MAX" : "", locked);
      setPowerButtonState(trapButton, !locked && (focusPlayer.trapPower ?? 100) >= 100, locked ? 0 : (focusPlayer.trapPower ?? 100), locked ? `${powerLockSeconds(focusPlayer, now)}sn` : "", locked);
      lastHudUpdate = now;
    }
  }
  if (now - lastLeaderboardUpdate > LEADERBOARD_INTERVAL) {
    updateLeaderboard();
    lastLeaderboardUpdate = now;
  }
}

function drawGrid() {
  const left = viewBounds.left;
  const top = viewBounds.top;
  const grid = 120;
  ctx.strokeStyle = "rgba(196, 255, 231, 0.055)";
  ctx.lineWidth = 1 / scale;
  ctx.beginPath();
  for (let x = Math.floor(left / grid) * grid; x < left + width / scale; x += grid) { ctx.moveTo(x, top); ctx.lineTo(x, top + height / scale); }
  for (let y = Math.floor(top / grid) * grid; y < top + height / scale; y += grid) { ctx.moveTo(left, y); ctx.lineTo(left + width / scale, y); }
  ctx.stroke();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, WORLD, WORLD);
}

function drawFood(now) {
  const padding = 90;
  const minX = foodCell(viewBounds.left - padding);
  const maxX = foodCell(viewBounds.right + padding);
  const minY = foodCell(viewBounds.top - padding);
  const maxY = foodCell(viewBounds.bottom + padding);
  ctx.save();
  ctx.globalAlpha = 0.94;
  let lastColor = "";
  for (let gx = minX; gx <= maxX; gx++) {
    for (let gy = minY; gy <= maxY; gy++) {
      const bucket = foodBuckets.get(foodBucketKey(gx, gy));
      if (!bucket) continue;
      for (let i = 0; i < bucket.length; i++) {
        const food = bucket[i];
        if (food.color !== lastColor) {
          ctx.fillStyle = food.color;
          lastColor = food.color;
        }
        ctx.beginPath();
        ctx.arc(food.x, food.y, food.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.restore();
}

function drawStar(cx, cy, outer, color) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const radius = i % 2 ? outer * 0.42 : outer;
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawCowboyGear(snake, now = performance.now()) {
  const skin = getSkin(snake.skin);
  if (!skin.hat) return;
  const size = snake.radius;
  const forwardX = Math.cos(snake.angle);
  const forwardY = Math.sin(snake.angle);
  const sideX = Math.cos(snake.angle + Math.PI / 2);
  const sideY = Math.sin(snake.angle + Math.PI / 2);
  const hatSign = skin.invertedHat ? 1 : -1;
  const hatX = snake.x + forwardX * size * 0.38;
  const hatY = snake.y + forwardY * size * 0.38;

  if (skin.stars) {
    ctx.save();
    ctx.globalAlpha = 0.86;
    const pulse = Math.sin(now * 0.007) * size * 0.12;
    for (const side of [-1, 1]) {
      const starX = snake.x + sideX * side * (size * 1.75 + pulse) - forwardX * size * 0.1;
      const starY = snake.y + sideY * side * (size * 1.75 + pulse) - forwardY * size * 0.1;
      drawStar(starX, starY, Math.max(4, size * 0.32), side < 0 ? "#f4c86b" : "#fff06a");
    }
    ctx.restore();
  }



  ctx.save();
  ctx.translate(hatX, hatY);
  ctx.rotate(snake.angle);
  ctx.strokeStyle = "#2b160d";
  ctx.lineWidth = Math.max(1.2, size * 0.12);
  ctx.fillStyle = skin.invertedHat ? "#2b160d" : "#5a351f";
  ctx.beginPath();
  ctx.ellipse(0, hatSign * size * 0.34, size * 1.02, size * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = skin.invertedHat ? "#6d3f20" : "#8a552c";
  const crownBase = hatSign * size * 0.43;
  const crownTip = hatSign * size * 0.96;
  ctx.beginPath();
  ctx.moveTo(-size * 0.5, crownBase);
  ctx.lineTo(size * 0.5, crownBase);
  ctx.lineTo(size * 0.36, crownTip);
  ctx.quadraticCurveTo(0, crownTip + hatSign * size * 0.08, -size * 0.36, crownTip);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#2b160d";
  const bandStart = hatSign * size * 0.55;
  const bandEnd = hatSign * size * 0.67;
  ctx.fillRect(-size * 0.46, Math.min(bandStart, bandEnd), size * 0.92, Math.abs(bandEnd - bandStart));
  if (skin.beard) {
    const beardSign = skin.invertedHat ? hatSign : -hatSign;
    ctx.beginPath();
    ctx.moveTo(-size * 0.54, beardSign * size * 0.48);
    ctx.quadraticCurveTo(-size * 0.28, beardSign * size * 0.98, 0, beardSign * size * 1.1);
    ctx.quadraticCurveTo(size * 0.28, beardSign * size * 0.98, size * 0.54, beardSign * size * 0.48);
    ctx.quadraticCurveTo(0, beardSign * size * 0.72, -size * 0.54, beardSign * size * 0.48);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.24)";
    for (const stripeX of [-0.16, 0.13]) {
      const stripeStart = beardSign * size * 0.62;
      const stripeEnd = beardSign * size * (stripeX < 0 ? 0.92 : 0.86);
      ctx.fillRect(size * stripeX, Math.min(stripeStart, stripeEnd), size * 0.07, Math.abs(stripeEnd - stripeStart));
    }
  }
  ctx.restore();

  if (!skin.hand) return;
  const armScale = Math.min(1.5, 0.85 + (snake.targetLength - 18) * 0.004);
  const hands = skin.detachedHands ? [-1, 1] : [1];
  for (const side of hands) {
    const gap = skin.detachedHands ? size * 0.34 : 0;
    const shoulderX = snake.x + sideX * side * (size * 1.02 + gap) - forwardX * size * 0.12;
    const shoulderY = snake.y + sideY * side * (size * 1.02 + gap) - forwardY * size * 0.12;
    const handX = shoulderX + sideX * side * size * 0.62 * armScale + forwardX * size * 0.22;
    const handY = shoulderY + sideY * side * size * 0.62 * armScale + forwardY * size * 0.22;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = skin.beard ? "#d08b42" : "#f4c86b";
    ctx.lineWidth = Math.max(3, size * 0.24);
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    ctx.lineTo(handX, handY);
    ctx.stroke();
    if (side > 0) {
      ctx.strokeStyle = "#202321";
      ctx.lineWidth = Math.max(2, size * 0.16);
      ctx.beginPath();
      ctx.moveTo(handX, handY);
      ctx.lineTo(handX + forwardX * size * 0.78 * armScale, handY + forwardY * size * 0.78 * armScale);
      ctx.stroke();
    }
    ctx.fillStyle = skin.beard ? "#d08b42" : "#f4c86b";
    ctx.beginPath();
    ctx.arc(handX, handY, Math.max(2.4, size * 0.19), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
function drawSnake(snake, now = performance.now()) {
  if (!snake.alive) return;
  const padding = 190;
  if (boundsOutsideView(snake.bounds, padding)) return;
  const [primary, secondary] = snake.colors;
  const skin = getSkin(snake.skin);
  const powered = isPowerActive(snake, now);
  const dashing = isDashActive(snake, now);
  const golden = isGoldActive(snake, now);
  const locked = arePowersLocked(snake, now);
  const hologram = snake.type === "hologram";
  const headVisible = snake.x > viewBounds.left - padding && snake.x < viewBounds.right + padding && snake.y > viewBounds.top - padding && snake.y < viewBounds.bottom + padding;
  let drewAny = false;
  const segmentCount = snake.segments.length;
  const drawStep = hologram ? (segmentCount > 80 ? 3 : 2) : !snake.isPlayer ? (segmentCount > 120 ? 4 : segmentCount > 70 ? 3 : segmentCount > 36 ? 2 : 1) : 1;
  for (let i = segmentCount - 1; i >= 0; i -= drawStep) {
    const seg = snake.segments[i];
    if (seg.x < viewBounds.left - padding || seg.x > viewBounds.right + padding || seg.y < viewBounds.top - padding || seg.y > viewBounds.bottom + padding) continue;
    drewAny = true;
    const t = i / Math.max(1, segmentCount - 1);
    const radius = Math.max(5, snake.radius * (1 - t * 0.42));
    ctx.beginPath();
    ctx.fillStyle = hologram ? (i % 2 ? "rgba(79,243,255,0.34)" : "rgba(216,243,255,0.28)") : i % 2 ? secondary : primary;
    ctx.globalAlpha = hologram ? 0.62 - t * 0.28 : snake.type === "remote" ? 0.78 : 1 - t * 0.12;
    ctx.arc(seg.x, seg.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  if (!drewAny || !headVisible) { ctx.globalAlpha = 1; return; }
  ctx.globalAlpha = 1;
  if (hologram || powered || dashing || golden || locked || skin.aura) {
    ctx.save();
    ctx.globalAlpha = hologram ? 0.32 : golden ? 0.46 : dashing ? 0.42 : locked ? 0.34 : powered ? 0.34 : 0.18;
    ctx.strokeStyle = hologram ? "#8feeff" : golden ? "#ffd166" : dashing ? "#4ff3ff" : locked ? "#ff3d6e" : skin.aura === "solar" ? "#ffb347" : skin.aura === "phantom" ? "#2dd4bf" : skin.aura === "nebula" ? "#c084fc" : "#b8ff5d";
    ctx.lineWidth = hologram ? 3 : golden ? 6 : dashing ? 5 : locked ? 4 : powered ? 4 : 2;
    if (hologram) ctx.setLineDash([10, 9]);
    ctx.beginPath();
    ctx.arc(snake.x, snake.y, snake.radius + (golden ? 28 : dashing ? 24 : locked ? 20 : powered ? 18 : 9), 0, Math.PI * 2);
    ctx.stroke();
    if (hologram) ctx.setLineDash([]);
    ctx.restore();
  }
  ctx.fillStyle = hologram ? "rgba(216,243,255,0.9)" : "#06110f";
  const eyeA = snake.angle + 0.55; const eyeB = snake.angle - 0.55;
  ctx.beginPath(); ctx.arc(snake.x + Math.cos(eyeA) * 8, snake.y + Math.sin(eyeA) * 8, 2.6, 0, Math.PI * 2); ctx.arc(snake.x + Math.cos(eyeB) * 8, snake.y + Math.sin(eyeB) * 8, 2.6, 0, Math.PI * 2); ctx.fill();
  if (!hologram) drawCowboyGear(snake, now);
  if (snake.twinSwapAt && snake.twinSwapAt > now) {
    const remaining = snake.twinSwapAt - now;
    const digit = Math.max(1, Math.ceil(remaining / 1000));
    const phase = 1 - ((remaining % 1000) / 1000);
    ctx.save();
    ctx.globalAlpha = 0.9 - phase * 0.55;
    ctx.fillStyle = hologram ? "#8feeff" : "#d8f3ff";
    ctx.font = "900 34px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(digit.toString(), snake.x, snake.y - snake.radius - 44 - phase * 8);
    ctx.restore();
  }
  ctx.fillStyle = hologram ? "rgba(143,238,255,0.74)" : snake.type === "remote" ? "#d8f3ff" : snake.control === "p2" ? "#fff06a" : "rgba(255,255,255,0.88)";
  ctx.font = "700 13px Inter, system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillText(snake.name, snake.x, snake.y - snake.radius - 24);
  if (snake.title) {
    ctx.font = "800 10px Inter, system-ui, sans-serif";
    ctx.fillStyle = "rgba(184,255,93,0.92)";
    ctx.fillText(snake.title, snake.x, snake.y - snake.radius - 11);
  }
}

function render(now) {
  ctx.clearRect(0, 0, width, height);
  viewBounds.left = camera.x - width / (2 * scale);
  viewBounds.right = camera.x + width / (2 * scale);
  viewBounds.top = camera.y - height / (2 * scale);
  viewBounds.bottom = camera.y + height / (2 * scale);
  ctx.save();
  ctx.translate(width / 2, height / 2);
  ctx.scale(scale, scale);
  ctx.translate(-camera.x, -camera.y);
  drawGrid();
  drawFood(now);
  drawTraps(now);
  drawEffects();
  for (const snake of snakes) drawSnake(snake, now);
  ctx.restore();
  drawVignette();
  drawRadar(now);
}

function drawVignette() {
  if (!vignetteGradient) {
    vignetteGradient = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.28, width / 2, height / 2, Math.max(width, height) * 0.72);
    vignetteGradient.addColorStop(0, "rgba(7,17,15,0)");
    vignetteGradient.addColorStop(1, "rgba(7,17,15,0.5)");
  }
  ctx.fillStyle = vignetteGradient;
  ctx.fillRect(0, 0, width, height);
}

function drawRadar(now) {
  if (!radarWrap || radarWrap.classList.contains("is-hidden")) return;
  if (now - lastRadarDraw < RADAR_INTERVAL) return;
  lastRadarDraw = now;
  const rw = radar.width; const rh = radar.height;
  if (!player) { rctx.clearRect(0, 0, rw, rh); return; }
  rctx.clearRect(0, 0, rw, rh); rctx.fillStyle = "rgba(255,255,255,0.04)"; rctx.fillRect(0, 0, rw, rh); rctx.strokeStyle = "rgba(196,255,231,0.16)"; rctx.strokeRect(7, 7, rw - 14, rh - 14);
  for (const snake of snakes) { if (!snake.alive) continue; const x = (snake.x / WORLD) * (rw - 16) + 8; const y = (snake.y / WORLD) * (rh - 16) + 8; rctx.fillStyle = snake.type === "hologram" ? "#4ff3ff" : snake.type === "remote" ? "#d8f3ff" : snake.isPlayer ? "#ffffff" : snake.colors[0]; rctx.beginPath(); rctx.arc(x, y, snake.isPlayer ? 4 : 2.6, 0, Math.PI * 2); rctx.fill(); }
}

function updateLeaderboard() {
  if (!leadersEl) return;
  const leaders = snakes.filter((snake) => snake.alive && snake.type !== "hologram").sort((a, b) => b.score + b.targetLength * 8 - (a.score + a.targetLength * 8)).slice(0, 7);
  const html = leaders.map((snake, index) => `<li><span>${index + 1}</span><b>${snake.name}</b><strong>${Math.round(snake.score + snake.targetLength * 8)}</strong></li>`).join("");
  if (html !== lastLeaderboardHtml) {
    leadersEl.innerHTML = html;
    lastLeaderboardHtml = html;
  }
}

function frame(now) {
  if (!running && now - lastIdleRender < 120) { requestAnimationFrame(frame); return; }
  if (!running) lastIdleRender = now;
  const dt = Math.min(2.2, (now - lastTime) / 16.67);
  lastTime = now;
  update(dt, now);
  render(now);
  requestAnimationFrame(frame);
}

function startLoop() {
  if (animationStarted) return;
  animationStarted = true;
  lastTime = performance.now();
  requestAnimationFrame(frame);
}

function bindControls() {
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => {
    if (listeningKeybind) { capturePowerKey(event); return; }
    const typing = !running && event.target && ["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName);
    if (!typing) {
      keys.add(event.key.length === 1 ? event.key.toLowerCase() : event.key);
      keys.add(event.code);
    }
    if (event.code === "Space" && !typing) { event.preventDefault(); if (player) player.boostHeld = true; }
    const powerKind = powerKindForEvent(event);
    if (powerKind && running && !typing) { event.preventDefault(); triggerSpecialPower(powerKind); }
    if (event.key === "Enter" && !running && !typing) handlePlayButton();
  });
  window.addEventListener("keyup", (event) => { keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key); keys.delete(event.code); if (event.code === "Space" && player) player.boostHeld = false; });
  canvas.addEventListener("pointermove", updatePointerAim);
  canvas.addEventListener("pointerdown", (event) => { if (!running || !startJoystick(event, canvas)) updatePointerAim(event); });
  canvas.addEventListener("pointerleave", () => { pointer.active = false; });
  window.addEventListener("pointermove", (event) => { if (joystick.active && joystick.pointerId === event.pointerId) { event.preventDefault(); updateJoystick(event); } });
  window.addEventListener("pointerup", endJoystick);
  window.addEventListener("pointercancel", endJoystick);
  if (boostButton) {
    const setBoost = (active) => { if (player) player.boostHeld = active; boostButton.classList.toggle("is-active", active); };
    boostButton.addEventListener("pointerdown", (event) => { event.preventDefault(); event.stopPropagation(); setBoost(true); });
    boostButton.addEventListener("pointerup", () => setBoost(false));
    boostButton.addEventListener("pointercancel", () => setBoost(false));
    boostButton.addEventListener("pointerleave", () => setBoost(false));
  }
  if (touchStick) {
    touchStick.addEventListener("pointerdown", (event) => { startJoystick(event, touchStick); });
    touchStick.addEventListener("pointermove", (event) => {
      if (!joystick.active || joystick.pointerId !== event.pointerId) return;
      event.preventDefault();
      updateJoystick(event);
    });
    touchStick.addEventListener("pointerup", endJoystick);
    touchStick.addEventListener("pointercancel", endJoystick);
  }
  const bindPowerButton = (button, kind) => {
    if (!button) return;
    button.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      triggerSpecialPower(kind);
    });
  };
  bindPowerButton(powerButton, "area");
  bindPowerButton(dashButton, "dash");
  bindPowerButton(twinButton, "twin");
  bindPowerButton(goldButton, "gold");
  bindPowerButton(trapButton, "trap");
  profileButton.addEventListener("click", () => showQuickPanel("profile"));
  if (friendsButton) friendsButton.addEventListener("click", () => showQuickPanel("friends"));
  shopButton.addEventListener("click", () => showQuickPanel("shop"));
  if (achievementsButton) achievementsButton.addEventListener("click", () => showQuickPanel("achievements"));
  questsButton.addEventListener("click", () => showQuickPanel("quests"));
  paletteButton.addEventListener("click", () => showQuickPanel("palette"));
  if (settingsButton) settingsButton.addEventListener("click", () => showQuickPanel("settings"));
  translateButton.addEventListener("click", toggleLanguage);
  closeQuickPanel.addEventListener("click", hideQuickPanel);
  document.querySelectorAll(".mode-button").forEach((button) => button.addEventListener("click", () => { gameMode = button.dataset.mode; updateModeButtons(); }));
  if (roomCodeInput) roomCodeInput.addEventListener("input", () => { if (gameMode === "room-join") roomCodeLabel.textContent = cleanName(roomCodeInput.value, "").toUpperCase() || "-"; });
  botCountInput.addEventListener("input", () => { botCountSetting = Number(botCountInput.value); botCountValue.textContent = botCountSetting.toString(); });
  if (profileName) profileName.addEventListener("change", () => renderProfile());
  if (guestMode) guestMode.addEventListener("change", () => { renderProfile(); });
  if (loginButton) loginButton.addEventListener("click", () => loginAccount(false));
  if (registerButton) registerButton.addEventListener("click", () => loginAccount(true));
  if (logoutButton) logoutButton.addEventListener("click", logoutAccount);
  if (accountPassword) accountPassword.addEventListener("keydown", (event) => { if (event.key === "Enter") loginAccount(false); });
  if (addFriendButton) addFriendButton.addEventListener("click", addFriend);
  if (friendName) friendName.addEventListener("keydown", (event) => { if (event.key === "Enter") addFriend(); });
  playButton.addEventListener("click", handlePlayButton);
  retryButton.addEventListener("click", resetGame);
  if (leaveLobbyButton) leaveLobbyButton.addEventListener("click", exitToMenu);
  if (copyRoomButton) copyRoomButton.addEventListener("click", copyRoomCode);
  if (startRoomButton) startRoomButton.addEventListener("click", startRoomFromLobby);
  if (exitGameButton) exitGameButton.addEventListener("click", exitToMenu);
}

resize();
bindControls();
renderProfile();
updatePowerKeyLabels();
applyTouchControls();
updateModeButtons();
botCountValue.textContent = botCountSetting.toString();
loadServerProfile();
setGameHudVisible(false);
startPanel.classList.remove("is-hidden");
if (radarWrap) radarWrap.classList.add("is-hidden");
