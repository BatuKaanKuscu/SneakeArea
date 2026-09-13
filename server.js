const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 8765);
const ROOT = __dirname;
const DATA_FILE = path.join(ROOT, "data.json");
const PUBLIC_FILES = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/styles.css", "styles.css"],
  ["/game.js", "game.js"],
]);

const defaultSkins = ["cyan", "lime", "pink", "amber", "violet", "ruby", "ice", "royal"];
const defaultTitles = ["rookie"];
const adminTitles = ["admin", "rookie", "hunter", "collector", "champion", "speedster", "survivor"];
const allowedTitles = new Set(adminTitles);
const allowedAvatars = new Set(["near", "area", "bolt", "crown", "coin", "wave"]);
const allowedThemes = new Set(["aurora", "ember", "ice", "forest"]);
let data = loadData();
let clients = new Map();

function loadData() {
  try {
    const loaded = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    loaded.profiles ||= {};
    loaded.sessions ||= {};
    return loaded;
  } catch {
    return { profiles: {}, sessions: {} };
  }
}

function saveData() {
  data.sessions ||= {};
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function sanitizeName(name, fallback = "Guest") {
  return String(name || "").trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 14) || fallback;
}

function sanitizeRoom(room) {
  return String(room || "LOBBY").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "LOBBY";
}


function cleanArray(value) {
  return Array.isArray(value) ? value.map((item) => sanitizeName(typeof item === "string" ? item : item.name, "")).filter(Boolean) : [];
}

function makeSalt() {
  return crypto.randomBytes(12).toString("hex");
}

function hashPassword(password, salt) {
  return crypto.createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

function setPassword(profile, password) {
  profile.passwordSalt = makeSalt();
  profile.passwordHash = hashPassword(String(password || ""), profile.passwordSalt);
}

function validPassword(profile, password) {
  return Boolean(profile.passwordHash && profile.passwordSalt && profile.passwordHash === hashPassword(String(password || ""), profile.passwordSalt));
}

function makeSession(name) {
  data.sessions ||= {};
  const token = crypto.randomBytes(24).toString("hex");
  data.sessions[token] = { name, createdAt: Date.now() };
  return token;
}

function sessionName(token) {
  return data.sessions?.[String(token || "")]?.name || "";
}

function publicProfile(profile) {
  const { passwordHash, passwordSalt, ...safe } = profile;
  return safe;
}
function getProfile(name) {
  const clean = sanitizeName(name, "NearBacon");
  if (!data.profiles[clean]) {
    data.profiles[clean] = {
      name: clean,
      coins: clean === "NearBacon" ? 5000 : 120,
      bestScore: 0,
      matches: 0,
      role: clean === "NearBacon" ? "admin" : "player",
      isAdmin: clean === "NearBacon",
      ownedSkins: clean === "NearBacon" ? defaultSkins : ["cyan"],
      activeSkin: "cyan",
      title: clean === "NearBacon" ? "admin" : "rookie",
      unlockedTitles: clean === "NearBacon" ? adminTitles : defaultTitles,
      achievements: [],
      claimedQuests: [],
      avatar: "near",
      theme: "aurora",
      language: "tr",
      friends: [],
      friendRequests: [],
      outgoingRequests: [],
      roomInvites: [],
    };
    saveData();
  }
  const profile = data.profiles[clean];
  if (clean === "NearBacon") {
    profile.role = "admin";
    profile.isAdmin = true;
    profile.coins = Math.max(profile.coins || 0, 5000);
    profile.ownedSkins = defaultSkins;
    profile.title = "admin";
    profile.unlockedTitles = adminTitles;
  }
  profile.friends = cleanArray(profile.friends);
  profile.friendRequests = cleanArray(profile.friendRequests);
  profile.outgoingRequests = cleanArray(profile.outgoingRequests);
  profile.roomInvites = Array.isArray(profile.roomInvites) ? profile.roomInvites.map((invite) => ({ from: sanitizeName(invite.from, ""), room: sanitizeRoom(invite.room) })).filter((invite) => invite.from && invite.room) : [];
  profile.ownedSkins ||= ["cyan"];
  profile.unlockedTitles = Array.isArray(profile.unlockedTitles) && profile.unlockedTitles.length ? profile.unlockedTitles.filter((title) => allowedTitles.has(title)) : defaultTitles;
  if (!profile.unlockedTitles.length) profile.unlockedTitles = defaultTitles;
  profile.title = allowedTitles.has(profile.title) && profile.unlockedTitles.includes(profile.title) ? profile.title : profile.unlockedTitles[0];
  profile.achievements = Array.isArray(profile.achievements) ? profile.achievements : [];
  profile.claimedQuests = Array.isArray(profile.claimedQuests) ? profile.claimedQuests : [];
  profile.avatar = allowedAvatars.has(profile.avatar) ? profile.avatar : "near";
  profile.theme = allowedThemes.has(profile.theme) ? profile.theme : "aurora";
  profile.language = profile.language === "en" ? "en" : "tr";
  return profile;
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 100000) req.destroy();
    });
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); }
      catch { resolve({}); }
    });
  });
}

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  res.end(JSON.stringify(body));
}

function withFriendStatus(profile) {
  const online = new Set([...clients.values()].map((client) => client.name).filter(Boolean));
  const safe = publicProfile(profile);
  return {
    ...safe,
    friends: (profile.friends || []).map((name) => ({ name, online: online.has(name) })),
    friendRequests: cleanArray(profile.friendRequests),
    outgoingRequests: cleanArray(profile.outgoingRequests),
    roomInvites: profile.roomInvites || [],
  };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET" && PUBLIC_FILES.has(url.pathname)) {
    const file = path.join(ROOT, PUBLIC_FILES.get(url.pathname));
    const ext = path.extname(file);
    const type = ext === ".css" ? "text/css" : ext === ".js" ? "application/javascript" : "text/html";
    res.writeHead(200, { "content-type": `${type}; charset=utf-8`, "cache-control": "no-store" });
    fs.createReadStream(file).pipe(res);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    const body = await readBody(req);
    const name = sanitizeName(body.name, "");
    const password = String(body.password || "");
    if (!name || password.length < 3) {
      sendJson(res, 400, { error: "bad_credentials" });
      return;
    }
    const profile = getProfile(name);
    if (profile.passwordHash) {
      sendJson(res, 409, { error: "name_taken" });
      return;
    }
    setPassword(profile, password);
    const token = makeSession(profile.name);
    saveData();
    sendJson(res, 200, { token, profile: withFriendStatus(profile) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    const body = await readBody(req);
    const name = sanitizeName(body.name, "");
    const profile = name ? data.profiles[name] : null;
    if (!profile || !validPassword(profile, body.password)) {
      sendJson(res, 401, { error: "login_failed" });
      return;
    }
    getProfile(name);
    const token = makeSession(name);
    saveData();
    sendJson(res, 200, { token, profile: withFriendStatus(getProfile(name)) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/logout") {
    const body = await readBody(req);
    if (body.token && data.sessions) delete data.sessions[String(body.token)];
    saveData();
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/session") {
    const name = sessionName(url.searchParams.get("token"));
    if (!name) {
      sendJson(res, 401, { error: "no_session" });
      return;
    }
    sendJson(res, 200, { profile: withFriendStatus(getProfile(name)) });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/users/search") {
    const requester = sessionName(url.searchParams.get("token"));
    const q = sanitizeName(url.searchParams.get("q"), "").toLowerCase();
    if (!requester || !q) {
      sendJson(res, 200, { users: [] });
      return;
    }
    const online = new Set([...clients.values()].map((client) => client.name).filter(Boolean));
    const users = Object.keys(data.profiles || {})
      .filter((name) => name.toLowerCase().includes(q) && name !== requester)
      .slice(0, 8)
      .map((name) => ({ name, online: online.has(name) }));
    sendJson(res, 200, { users });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/friends/request") {
    const body = await readBody(req);
    const name = sessionName(body.token);
    const friend = sanitizeName(body.friend, "");
    if (!name || !friend || friend === name || !data.profiles[friend]) {
      sendJson(res, 400, { error: "bad_friend" });
      return;
    }
    const profile = getProfile(name);
    const target = getProfile(friend);
    if (!profile.friends.includes(friend) && !target.friendRequests.includes(name)) target.friendRequests.push(name);
    if (!profile.outgoingRequests.includes(friend) && !profile.friends.includes(friend)) profile.outgoingRequests.push(friend);
    saveData();
    sendJson(res, 200, { profile: withFriendStatus(profile) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/friends/respond") {
    const body = await readBody(req);
    const name = sessionName(body.token);
    const from = sanitizeName(body.from, "");
    if (!name || !from) {
      sendJson(res, 400, { error: "bad_request" });
      return;
    }
    const profile = getProfile(name);
    const other = getProfile(from);
    profile.friendRequests = profile.friendRequests.filter((item) => item !== from);
    other.outgoingRequests = other.outgoingRequests.filter((item) => item !== name);
    if (body.accept) {
      if (!profile.friends.includes(from)) profile.friends.push(from);
      if (!other.friends.includes(name)) other.friends.push(name);
    }
    saveData();
    sendJson(res, 200, { profile: withFriendStatus(profile) });
    return;
  }
  if (req.method === "GET" && url.pathname === "/api/profile") {
    const profile = getProfile(url.searchParams.get("name"));
    sendJson(res, 200, { profile: withFriendStatus(profile) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/profile") {
    const body = await readBody(req);
    const name = sanitizeName(body.name, "NearBacon");
    const profile = getProfile(name);
    const tokenName = sessionName(body.token);
    if (profile.passwordHash && tokenName !== name) {
      sendJson(res, 401, { error: "auth_required" });
      return;
    }
    profile.coins = Math.max(0, Number(body.coins ?? profile.coins) || 0);
    profile.bestScore = Math.max(Number(profile.bestScore) || 0, Number(body.bestScore) || 0);
    profile.matches = Math.max(Number(profile.matches) || 0, Number(body.matches) || 0);
    profile.activeSkin = String(body.activeSkin || profile.activeSkin || "cyan");
    profile.ownedSkins = Array.from(new Set(["cyan", ...(Array.isArray(body.ownedSkins) ? body.ownedSkins : profile.ownedSkins || [])]));
    profile.unlockedTitles = Array.from(new Set([...(Array.isArray(profile.unlockedTitles) ? profile.unlockedTitles : defaultTitles), ...(Array.isArray(body.unlockedTitles) ? body.unlockedTitles : [])])).filter((title) => allowedTitles.has(title));
    profile.title = allowedTitles.has(body.title) && profile.unlockedTitles.includes(body.title) ? body.title : profile.title;
    profile.achievements = Array.isArray(body.achievements) ? body.achievements.slice(0, 30).map(String) : profile.achievements || [];
    profile.claimedQuests = Array.isArray(body.claimedQuests) ? body.claimedQuests.slice(0, 30).map(String) : profile.claimedQuests || [];
    profile.avatar = allowedAvatars.has(body.avatar) ? body.avatar : profile.avatar || "near";
    profile.theme = allowedThemes.has(body.theme) ? body.theme : profile.theme || "aurora";
    profile.language = body.language === "en" ? "en" : "tr";
    if (name === "NearBacon") {
      profile.role = "admin";
      profile.isAdmin = true;
      profile.ownedSkins = defaultSkins;
      profile.title = "admin";
      profile.unlockedTitles = adminTitles;
    }
    saveData();
    sendJson(res, 200, { profile: withFriendStatus(profile) });
    return;
  }


  if (req.method === "POST" && url.pathname === "/api/friends/invite") {
    const body = await readBody(req);
    const name = sessionName(body.token);
    const friend = sanitizeName(body.friend, "");
    const room = sanitizeRoom(body.room);
    if (!name || !friend || !room || !data.profiles[friend]) {
      sendJson(res, 400, { error: "bad_invite" });
      return;
    }
    const profile = getProfile(name);
    const target = getProfile(friend);
    if (!profile.friends.includes(friend)) {
      sendJson(res, 403, { error: "not_friends" });
      return;
    }
    target.roomInvites = (target.roomInvites || []).filter((invite) => !(invite.from === name && invite.room === room));
    target.roomInvites.unshift({ from: name, room, createdAt: Date.now() });
    target.roomInvites = target.roomInvites.slice(0, 8);
    saveData();
    sendJson(res, 200, { ok: true, profile: withFriendStatus(profile) });
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/friends") {
    const body = await readBody(req);
    const name = sessionName(body.token) || sanitizeName(body.name, "");
    const profile = getProfile(name);
    const friend = sanitizeName(body.friend, "");
    if (friend && friend !== profile.name && data.profiles[friend]) {
      const target = getProfile(friend);
      if (!target.friendRequests.includes(profile.name)) target.friendRequests.push(profile.name);
      if (!profile.outgoingRequests.includes(friend)) profile.outgoingRequests.push(friend);
      saveData();
    }
    sendJson(res, 200, { profile: withFriendStatus(profile) });
    return;
  }

  sendJson(res, 404, { error: "not_found" });
});

server.on("upgrade", (req, socket) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname !== "/ws") {
    socket.destroy();
    return;
  }

  const key = req.headers["sec-websocket-key"];
  if (!key) {
    socket.destroy();
    return;
  }

  const accept = crypto
    .createHash("sha1")
    .update(key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11")
    .digest("base64");

  socket.write([
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${accept}`,
    "",
    "",
  ].join("\r\n"));

  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  const client = { id, socket, name: "Guest", room: null, lastState: null };
  clients.set(id, client);
  socket.on("data", (buffer) => handleFrame(client, buffer));
  socket.on("close", () => removeClient(id));
  socket.on("error", () => removeClient(id));
  sendWs(client, { type: "welcome", id });
});

function removeClient(id) {
  const client = clients.get(id);
  if (!client) return;
  clients.delete(id);
  if (client.room) broadcastToRoom({ type: "left", id }, client.room);
  broadcastOnline();
}

function handleFrame(client, buffer) {
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const byte1 = buffer[offset++];
    const byte2 = buffer[offset++];
    const opcode = byte1 & 0x0f;
    let length = byte2 & 0x7f;
    if (length === 126) {
      if (offset + 2 > buffer.length) return;
      length = buffer.readUInt16BE(offset);
      offset += 2;
    } else if (length === 127) {
      socketSafeClose(client.socket);
      return;
    }
    const masked = (byte2 & 0x80) !== 0;
    if (!masked || offset + 4 + length > buffer.length) return;
    const mask = buffer.subarray(offset, offset + 4);
    offset += 4;
    const payload = Buffer.alloc(length);
    for (let i = 0; i < length; i++) payload[i] = buffer[offset + i] ^ mask[i % 4];
    offset += length;

    if (opcode === 8) {
      socketSafeClose(client.socket);
      return;
    }
    if (opcode !== 1) continue;
    try { handleMessage(client, JSON.parse(payload.toString("utf8"))); }
    catch {}
  }
}

function handleMessage(client, message) {
  if (message.type === "join") {
    client.name = sanitizeName(message.name, "Guest");
    client.skin = message.skin || "cyan";
    client.room = sanitizeRoom(message.room);
    getProfile(client.name);
    sendWs(client, { type: "room", room: client.room });
    sendWs(client, {
      type: "players",
      players: [...clients.values()]
        .filter((item) => item.room === client.room && item.id !== client.id && item.lastState)
        .map((item) => item.lastState),
    });
    broadcastOnline();
    return;
  }

  if (message.type === "state") {
    client.lastState = {
      type: "remote",
      id: client.id,
      name: client.name,
      skin: message.skin || client.skin || "cyan",
      x: Number(message.x) || 0,
      y: Number(message.y) || 0,
      angle: Number(message.angle) || 0,
      score: Number(message.score) || 0,
      targetLength: Number(message.targetLength) || 0,
      segments: Array.isArray(message.segments) ? message.segments.slice(0, 80) : [],
    };
    if (client.room) broadcastToRoom({ type: "player", player: client.lastState }, client.room, client.id);
  }
}

function sendWs(client, object) {
  if (client.socket.destroyed) return;
  const payload = Buffer.from(JSON.stringify(object));
  let header;
  if (payload.length < 126) {
    header = Buffer.from([0x81, payload.length]);
  } else {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(payload.length, 2);
  }
  client.socket.write(Buffer.concat([header, payload]));
}

function broadcast(object, exceptId = null) {
  for (const client of clients.values()) {
    if (client.id !== exceptId) sendWs(client, object);
  }
}

function broadcastToRoom(object, room, exceptId = null) {
  for (const client of clients.values()) {
    if (client.room === room && client.id !== exceptId) sendWs(client, object);
  }
}

function broadcastOnline() {
  const names = [...new Set([...clients.values()].map((client) => client.name).filter(Boolean))];
  broadcast({ type: "online", names });
}

function socketSafeClose(socket) {
  try { socket.end(); } catch {}
}

server.listen(PORT, () => {
  console.log(`Snake Area server: http://localhost:${PORT}`);
});





