const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 8765);
const ROOT = __dirname;
const DEFAULT_DATA_FILE = path.join(ROOT, "data.json");
const FALLBACK_DATA_DIR = path.join(ROOT, "storage");
const DATA_DIR = process.env.DATA_DIR || (process.env.RENDER ? FALLBACK_DATA_DIR : "");
let DATA_FILE = process.env.DATA_FILE || process.env.DATA_PATH || (DATA_DIR ? path.join(DATA_DIR, "data.json") : DEFAULT_DATA_FILE);
const FALLBACK_DATA_FILE = path.join(FALLBACK_DATA_DIR, "data.json");
const PUBLIC_FILES = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/styles.css", "styles.css"],
  ["/game.js", "game.js"],
  ["/logo.svg", "logo.svg"],
  ["/ekmekstr-theme.wav", "ekmekstr-theme.wav"],
]);

const epicSkins = [
  { id: "cowboy", matches: 5 },
  { id: "storm", matches: 7 },
  { id: "nebula", matches: 10 },
  { id: "phantom", matches: 14 },
  { id: "solar", matches: 18 },
];
const epicSkinIds = epicSkins.map((skin) => skin.id);
const defaultSkins = ["cyan", "lime", "pink", "amber", "violet", "ruby", "ice", "royal", ...epicSkinIds];
const baseTitles = ["rookie", "hunter", "collector", "champion", "speedster", "survivor"];
const specialTitles = ["ekmekstr"];
const defaultTitles = ["rookie"];
const adminTitles = Array.from(new Set(["admin", ...baseTitles, ...specialTitles]));
const playerTitles = Array.from(new Set([...baseTitles, ...specialTitles]));
const allowedTitles = new Set(adminTitles);
const allowedAvatars = new Set(["near", "area", "bolt", "crown", "coin", "wave"]);
const allowedThemes = new Set(["aurora", "ember", "ice", "forest"]);
let data = loadData();
let clients = new Map();
let rooms = new Map();

function loadData() {
  try {
    ensureDataFile();
    const loaded = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    loaded.profiles ||= {};
    loaded.sessions ||= {};
    return loaded;
  } catch {
    return { profiles: {}, sessions: {} };
  }
}

function uniqueDataFileCandidates() {
  return Array.from(new Set([DATA_FILE, FALLBACK_DATA_FILE, DEFAULT_DATA_FILE].filter(Boolean)));
}

function prepareDataFile(file) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file)) return;
  if (file !== DEFAULT_DATA_FILE && fs.existsSync(DEFAULT_DATA_FILE)) {
    fs.copyFileSync(DEFAULT_DATA_FILE, file);
    return;
  }
  fs.writeFileSync(file, JSON.stringify({ profiles: {}, sessions: {} }, null, 2));
}

function ensureDataFile() {
  let lastError;
  for (const file of uniqueDataFileCandidates()) {
    try {
      prepareDataFile(file);
      DATA_FILE = file;
      return file;
    } catch (error) {
      lastError = error;
      console.warn(`[data] ${file} is not writable: ${error.message}`);
    }
  }
  throw lastError;
}

function saveData() {
  data.sessions ||= {};
  const payload = JSON.stringify(data, null, 2);
  let lastError;
  for (const file of uniqueDataFileCandidates()) {
    try {
      prepareDataFile(file);
      const tempFile = `${file}.tmp`;
      fs.writeFileSync(tempFile, payload);
      fs.renameSync(tempFile, file);
      DATA_FILE = file;
      return;
    } catch (error) {
      lastError = error;
      console.warn(`[data] ${file} could not be saved: ${error.message}`);
    }
  }
  throw lastError;
}

function sanitizeName(name, fallback = "Guest") {
  return String(name || "").trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 14) || fallback;
}

function sanitizeSkin(skin) {
  const id = String(skin || "cyan");
  return defaultSkins.includes(id) ? id : "cyan";
}

function sanitizeRoom(room) {
  return String(room || "LOBBY").trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || "LOBBY";
}



const reservedNames = new Set(["admin", "administrator", "moderator", "snakearea", "snake_area", "guest", "misafir", "nearbacon", "ekmekstr", "ekmekstar", "ekmekmst"]);
const blockedNameTerms = [
  "amk", "aq", "mk", "sik", "siker", "siktir", "orospu", "pic", "pezevenk", "yarrak", "yarak", "got", "bok", "ibne",
  "fuck", "shit", "bitch", "asshole", "bastard", "dick", "pussy", "cunt", "porn", "sex", "nazi", "hitler",
];
const nameConsonants = "bcdfghjklmnprstvyz";
const nameVowels = "aeiou";
const nameEndings = ["", "x", "n", "r", "s", "z", "io"];
const passwordGroups = [
  "ABCDEFGHJKLMNPQRSTUVWXYZ",
  "abcdefghijkmnopqrstuvwxyz",
  "23456789",
  "!@#$%&*?",
];
const commonPasswords = new Set(["123", "1234", "12345", "123456", "password", "qwerty", "abc123", "111111", "snake", "snakearea"]);
const protectedAccountAliases = new Set(["nearbacon", "ekmekstr", "ekmekstar", "ekmekmst"]);

function findProfileKey(name) {
  const clean = sanitizeName(name, "");
  if (!clean || !data.profiles) return "";
  if (data.profiles[clean]) return clean;
  const lower = clean.toLowerCase();
  return Object.keys(data.profiles).find((key) => key.toLowerCase() === lower) || "";
}

function accountFingerprint(name) {
  return normalizedNameForSafety(sanitizeName(name, ""));
}

function isProtectedAccountAlias(name) {
  return protectedAccountAliases.has(accountFingerprint(name));
}

function findRegisteredProfileKey(name) {
  const clean = sanitizeName(name, "");
  if (!clean || !data.profiles) return "";
  const exactKey = findProfileKey(clean);
  if (exactKey && data.profiles[exactKey]?.passwordHash) return exactKey;
  const fingerprint = accountFingerprint(clean);
  return Object.keys(data.profiles).find((key) => {
    const profile = data.profiles[key] || {};
    if (!profile.passwordHash && !profile.seededAccount) return false;
    return accountFingerprint(profile.name || key) === fingerprint;
  }) || "";
}

function hasRegisteredProfile(name) {
  return Boolean(findRegisteredProfileKey(name));
}

function isAccountNameTaken(name) {
  return isProtectedAccountAlias(name) || hasRegisteredProfile(name);
}

function stripSafetyVowels(value) {
  return String(value || "").replace(/[aeiou]/g, "");
}

function normalizedNameForSafety(name) {
  return String(name || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ıİ]/g, "i")
    .replace(/[şŞ]/g, "s")
    .replace(/[ğĞ]/g, "g")
    .replace(/[çÇ]/g, "c")
    .replace(/[öÖ]/g, "o")
    .replace(/[üÜ]/g, "u")
    .replace(/[@]/g, "a")
    .replace(/[!|]/g, "i")
    .replace(/[$]/g, "s")
    .replace(/[^a-z0-9_-]/g, "")
    .replace(/[0134578]/g, (char) => ({ "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "8": "b" }[char] || char))
    .replace(/[_-]/g, "");
}

function safetyNameVariants(name) {
  const compact = normalizedNameForSafety(name);
  const squeezed = compact.replace(/(.)\1+/g, "$1");
  return {
    direct: Array.from(new Set([compact, squeezed].filter(Boolean))),
    loose: stripSafetyVowels(squeezed),
  };
}

function hasBlockedNameTerm(name) {
  const variants = safetyNameVariants(name);
  const directTerms = blockedNameTerms.map((term) => normalizedNameForSafety(term));
  const looseTerms = directTerms.filter((term) => term.length >= 4).map(stripSafetyVowels).filter((term) => term.length >= 3);
  return directTerms.some((term) => variants.direct.some((variant) => variant.includes(term)))
    || looseTerms.some((term) => variants.loose.includes(term));
}

function validateAccountName(name) {
  const clean = sanitizeName(name, "");
  if (!clean || clean.length < 3) return { ok: false, error: "short_name" };
  if (clean.length > 14) return { ok: false, error: "long_name" };
  if (!/^[a-zA-Z0-9_-]+$/.test(clean)) return { ok: false, error: "bad_name" };
  if (reservedNames.has(clean.toLowerCase()) || isProtectedAccountAlias(clean)) return { ok: false, error: "reserved_name" };
  if (hasBlockedNameTerm(clean)) return { ok: false, error: "blocked_name" };
  return { ok: true, name: clean };
}

function randomInt(max) {
  return crypto.randomInt ? crypto.randomInt(max) : Math.floor(Math.random() * max);
}

function pick(list) {
  return list[randomInt(list.length)];
}

function titleCaseName(value) {
  const clean = sanitizeName(value, "").toLowerCase();
  return clean ? `${clean.charAt(0).toUpperCase()}${clean.slice(1)}` : "";
}

function randomSyllable(index = 0) {
  const c = pick(nameConsonants);
  const v = pick(nameVowels);
  const extra = randomInt(100) < 22 ? pick(nameConsonants.replace(c, "") || nameConsonants) : "";
  return index === 0 ? `${c}${v}${extra}` : `${c}${v}${extra}`;
}

function generateRandomName() {
  const syllableCount = randomInt(3) + 2;
  let core = "";
  for (let i = 0; i < syllableCount; i += 1) core += randomSyllable(i);
  if (randomInt(100) < 45) core += pick(nameEndings);
  const suffixRoll = randomInt(100);
  const suffix = suffixRoll < 28 ? String(randomInt(90) + 10) : suffixRoll < 36 ? String(randomInt(900) + 100) : "";
  const maxCore = Math.max(3, 14 - suffix.length);
  return titleCaseName(`${core.slice(0, maxCore)}${suffix}`);
}

function buildNameSuggestions() {
  const suggestions = [];
  const add = (value) => {
    const name = sanitizeName(value, "");
    if (!validateAccountName(name).ok || isAccountNameTaken(name) || suggestions.includes(name)) return;
    suggestions.push(name);
  };
  for (let attempt = 0; suggestions.length < 6 && attempt < 240; attempt += 1) add(generateRandomName());
  return suggestions;
}

function passwordStrength(password) {
  const value = String(password || "");
  const lower = value.toLowerCase();
  const checks = {
    length: value.length >= 8,
    long: value.length >= 12,
    lower: /[a-z]/.test(value),
    upper: /[A-Z]/.test(value),
    digit: /\d/.test(value),
    symbol: /[^A-Za-z0-9]/.test(value),
  };
  const common = commonPasswords.has(lower);
  let score = [checks.length, checks.lower, checks.upper, checks.digit, checks.symbol].filter(Boolean).length;
  if (checks.long) score += 1;
  if (common) score -= 2;
  score = Math.max(0, Math.min(5, score));
  const ok = checks.length && score >= 4 && !common;
  const feedback = !value ? "password_required" : common ? "common_password" : !checks.length ? "password_too_short" : score < 4 ? "password_needs_mix" : "strong_password";
  return { ok, score, feedback };
}

function generatePassword(length = 14) {
  const all = passwordGroups.join("");
  const chars = passwordGroups.map((group) => pick(group));
  while (chars.length < length) chars.push(pick(all));
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}
function syncOwnedSkins(profile, name) {
  profile.ownedSkins = Array.from(new Set(["cyan", ...(Array.isArray(profile.ownedSkins) ? profile.ownedSkins : [])])).filter((skin) => defaultSkins.includes(skin));
  if (profile.isAdmin || profile.role === "admin") {
    profile.ownedSkins = defaultSkins.slice();
  } else {
    const matches = Number(profile.matches) || 0;
    for (const skin of epicSkins) {
      if (matches >= skin.matches && !profile.ownedSkins.includes(skin.id)) profile.ownedSkins.push(skin.id);
      if (matches < skin.matches) profile.ownedSkins = profile.ownedSkins.filter((id) => id !== skin.id);
    }
  }
  if (!profile.ownedSkins.includes(profile.activeSkin)) profile.activeSkin = "cyan";
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

function specialNameKey(name) {
  return sanitizeName(name, "").toLowerCase();
}

function applySpecialEntitlements(profile, name) {
  const key = specialNameKey(name || profile.name);
  if (key === "nearbacon") {
    profile.name = "NearBacon";
    profile.role = "admin";
    profile.isAdmin = true;
    profile.coins = Math.max(Number(profile.coins) || 0, 999999);
    profile.ownedSkins = defaultSkins.slice();
    profile.unlockedTitles = adminTitles.slice();
    profile.title = "admin";
    profile.specialMusic = "";
    return profile;
  }
  if (key === "ekmekstr") {
    profile.name = "Ekmekstr";
    profile.role = "player";
    profile.isAdmin = false;
    profile.coins = Math.max(Number(profile.coins) || 0, 25000);
    profile.unlockedTitles = playerTitles.filter((title) => title !== "admin");
    profile.title = profile.unlockedTitles.includes(profile.title) && profile.title !== "admin" ? profile.title : "ekmekstr";
    profile.specialMusic = "ekmekstr";
    return profile;
  }
  profile.specialMusic = "";
  profile.unlockedTitles = (Array.isArray(profile.unlockedTitles) ? profile.unlockedTitles : defaultTitles).filter((title) => title !== "ekmekstr");
  if (profile.title === "ekmekstr") profile.title = profile.unlockedTitles[0] || "rookie";
  return profile;
}

const specialAccountSeeds = [
  { name: "Ekmekstr", salt: "seed-ekmekstr-2026", hash: "2a512b08f98311b298dcfebd98fae198f6e519a02171c9bd8e1d38dfbb73c7ca" },
  { name: "NearBacon", salt: "seed-nearbacon-2026", hash: "c9f10d99572d4296927853e9e39dcb55b15d64db97cdc4c959ecf43409b663fd" },
];

function ensureSeedAccounts() {
  for (const account of specialAccountSeeds) {
    const existingKey = findProfileKey(account.name);
    const key = existingKey || account.name;
    const profile = getProfile(key);
    profile.passwordSalt = account.salt;
    profile.passwordHash = account.hash;
    profile.createdAt ||= Date.now();
    profile.seededAccount = true;
    applySpecialEntitlements(profile, account.name);
  }
  saveData();
}
function publicProfile(profile) {
  const { passwordHash, passwordSalt, ...safe } = profile;
  return safe;
}
function getProfile(name) {
  const requested = sanitizeName(name, "Guest");
  const clean = findProfileKey(requested) || requested;
  if (!data.profiles[clean]) {
    data.profiles[clean] = {
      name: clean,
      coins: 120,
      bestScore: 0,
      matches: 0,
      role: "player",
      isAdmin: false,
      ownedSkins: ["cyan"],
      activeSkin: "cyan",
      title: "rookie",
      unlockedTitles: defaultTitles,
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
  if (profile.isAdmin || profile.role === "admin") {
    profile.role = "admin";
    profile.isAdmin = true;
    profile.coins = Math.max(profile.coins || 0, 5000);
    profile.ownedSkins = defaultSkins.slice();
    profile.title = "admin";
    profile.unlockedTitles = adminTitles;
  } else {
    profile.role = "player";
    profile.isAdmin = false;
  }
  profile.friends = cleanArray(profile.friends);
  profile.friendRequests = cleanArray(profile.friendRequests);
  profile.outgoingRequests = cleanArray(profile.outgoingRequests);
  profile.roomInvites = Array.isArray(profile.roomInvites) ? profile.roomInvites.map((invite) => ({ from: sanitizeName(invite.from, ""), room: sanitizeRoom(invite.room) })).filter((invite) => invite.from && invite.room) : [];
  profile.ownedSkins ||= ["cyan"];
  syncOwnedSkins(profile, clean);
  profile.unlockedTitles = Array.isArray(profile.unlockedTitles) && profile.unlockedTitles.length ? profile.unlockedTitles.filter((title) => allowedTitles.has(title)) : defaultTitles;
  if (!profile.unlockedTitles.length) profile.unlockedTitles = defaultTitles;
  profile.title = allowedTitles.has(profile.title) && profile.unlockedTitles.includes(profile.title) ? profile.title : profile.unlockedTitles[0];
  profile.achievements = Array.isArray(profile.achievements) ? profile.achievements : [];
  profile.claimedQuests = Array.isArray(profile.claimedQuests) ? profile.claimedQuests : [];
  profile.avatar = allowedAvatars.has(profile.avatar) ? profile.avatar : "near";
  profile.theme = allowedThemes.has(profile.theme) ? profile.theme : "aurora";
  profile.language = profile.language === "en" ? "en" : "tr";
  applySpecialEntitlements(profile, clean);
  return profile;
}

ensureSeedAccounts();

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
    const type = ext === ".css" ? "text/css" : ext === ".js" ? "application/javascript" : ext === ".svg" ? "image/svg+xml" : ext === ".wav" ? "audio/wav" : "text/html";
    res.writeHead(200, { "content-type": `${type}; charset=utf-8`, "cache-control": "no-store" });
    fs.createReadStream(file).pipe(res);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/auth/suggest-name") {
    sendJson(res, 200, { suggestions: buildNameSuggestions(url.searchParams.get("seed") || "") });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/auth/password") {
    const password = generatePassword();
    sendJson(res, 200, { password, strength: passwordStrength(password) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/register") {
    const body = await readBody(req);
    const name = sanitizeName(body.name, "");
    const password = String(body.password || "");
    const nameCheck = validateAccountName(name);
    if (!nameCheck.ok) {
      sendJson(res, 400, { error: nameCheck.error, suggestions: buildNameSuggestions(name) });
      return;
    }
    const strength = passwordStrength(password);
    if (!strength.ok) {
      sendJson(res, 400, { error: "weak_password", strength });
      return;
    }
    if (isAccountNameTaken(name)) {
      sendJson(res, 409, { error: "name_taken", suggestions: buildNameSuggestions(name) });
      return;
    }
    const profile = getProfile(name);
    setPassword(profile, password);
    profile.createdAt ||= Date.now();
    profile.lastLoginAt = Date.now();
    const token = makeSession(profile.name);
    saveData();
    sendJson(res, 200, { token, profile: withFriendStatus(profile) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/auth/login") {
    const body = await readBody(req);
    const name = sanitizeName(body.name, "");
    const key = findProfileKey(name);
    const profile = key ? data.profiles[key] : null;
    if (!profile || !validPassword(profile, body.password)) {
      sendJson(res, 401, { error: "login_failed" });
      return;
    }
    const activeProfile = getProfile(key);
    activeProfile.lastLoginAt = Date.now();
    const token = makeSession(activeProfile.name);
    saveData();
    sendJson(res, 200, { token, profile: withFriendStatus(activeProfile) });
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
    if (!requester || q.length < 2) {
      sendJson(res, 200, { users: [] });
      return;
    }
    const requesterProfile = getProfile(requester);
    const online = new Set([...clients.values()].map((client) => client.name).filter(Boolean));
    const relationFor = (name) => {
      if ((requesterProfile.friends || []).includes(name)) return "friend";
      if ((requesterProfile.outgoingRequests || []).includes(name)) return "outgoing";
      if ((requesterProfile.friendRequests || []).includes(name)) return "incoming";
      return "none";
    };
    const users = Object.keys(data.profiles || {})
      .filter((name) => data.profiles[name]?.passwordHash && name.toLowerCase().includes(q) && name !== requester)
      .sort((a, b) => Number(!b.toLowerCase().startsWith(q)) - Number(!a.toLowerCase().startsWith(q)) || a.localeCompare(b))
      .slice(0, 8)
      .map((name) => ({ name, online: online.has(name), relation: relationFor(name) }));
    sendJson(res, 200, { users });
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/friends/request") {
    const body = await readBody(req);
    const name = sessionName(body.token);
    let friend = sanitizeName(body.friend, "");
    const friendKey = findProfileKey(friend);
    if (!name || !friendKey || friendKey === name || !data.profiles[friendKey]?.passwordHash) {
      sendJson(res, 400, { error: "bad_friend" });
      return;
    }
    friend = friendKey;
    const profile = getProfile(name);
    const target = getProfile(friend);
    if (profile.friends.includes(friend)) {
      sendJson(res, 409, { error: "already_friends", profile: withFriendStatus(profile) });
      return;
    }
    let accepted = false;
    if (profile.friendRequests.includes(friend)) {
      profile.friendRequests = profile.friendRequests.filter((item) => item !== friend);
      target.outgoingRequests = target.outgoingRequests.filter((item) => item !== name);
      if (!profile.friends.includes(friend)) profile.friends.push(friend);
      if (!target.friends.includes(name)) target.friends.push(name);
      accepted = true;
    } else {
      if (!target.friendRequests.includes(name)) target.friendRequests.push(name);
      if (!profile.outgoingRequests.includes(friend)) profile.outgoingRequests.push(friend);
    }
    saveData();
    sendJson(res, 200, { accepted, profile: withFriendStatus(profile) });
    return;
  }
  if (req.method === "POST" && url.pathname === "/api/friends/remove") {
    const body = await readBody(req);
    const name = sessionName(body.token);
    const friend = sanitizeName(body.friend, "");
    if (!name || !friend) {
      sendJson(res, 400, { error: "bad_friend" });
      return;
    }
    const profile = getProfile(name);
    const other = getProfile(friend);
    profile.friends = profile.friends.filter((item) => item !== friend);
    other.friends = other.friends.filter((item) => item !== name);
    profile.outgoingRequests = profile.outgoingRequests.filter((item) => item !== friend);
    profile.friendRequests = profile.friendRequests.filter((item) => item !== friend);
    other.outgoingRequests = other.outgoingRequests.filter((item) => item !== name);
    other.friendRequests = other.friendRequests.filter((item) => item !== name);
    profile.roomInvites = (profile.roomInvites || []).filter((invite) => invite.from !== friend);
    other.roomInvites = (other.roomInvites || []).filter((invite) => invite.from !== name);
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
    const name = sanitizeName(body.name, "Guest");
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
    syncOwnedSkins(profile, name);
    profile.unlockedTitles = Array.from(new Set([...(Array.isArray(profile.unlockedTitles) ? profile.unlockedTitles : defaultTitles), ...(Array.isArray(body.unlockedTitles) ? body.unlockedTitles : [])])).filter((title) => allowedTitles.has(title));
    profile.title = allowedTitles.has(body.title) && profile.unlockedTitles.includes(body.title) ? body.title : profile.title;
    profile.achievements = Array.isArray(body.achievements) ? body.achievements.slice(0, 30).map(String) : profile.achievements || [];
    profile.claimedQuests = Array.isArray(body.claimedQuests) ? body.claimedQuests.slice(0, 30).map(String) : profile.claimedQuests || [];
    profile.avatar = allowedAvatars.has(body.avatar) ? body.avatar : profile.avatar || "near";
    profile.theme = allowedThemes.has(body.theme) ? body.theme : profile.theme || "aurora";
    profile.language = body.language === "en" ? "en" : "tr";
    if (profile.isAdmin) {
      profile.role = "admin";
      profile.ownedSkins = defaultSkins.slice();
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

function roomMembers(room) {
  return [...clients.values()].filter((client) => client.room === room);
}

function roomState(room) {
  const clean = sanitizeRoom(room);
  if (!rooms.has(clean)) rooms.set(clean, { hostId: "", started: false, botCount: 0 });
  return rooms.get(clean);
}

function broadcastLobby(room) {
  const state = rooms.get(room);
  if (!state) return;
  const players = roomMembers(room).map((client) => ({ id: client.id, name: client.name, skin: sanitizeSkin(client.skin || "cyan"), host: client.id === state.hostId }));
  broadcastToRoom({ type: "lobby", room, hostId: state.hostId, started: state.started, botCount: state.botCount || 0, players }, room);
}

function leaveRoom(client) {
  const room = client.room;
  if (!room) return;
  client.room = null;
  client.lastState = null;
  broadcastToRoom({ type: "left", id: client.id }, room);
  const state = rooms.get(room);
  if (!state) return;
  if (state.hostId === client.id) {
    const nextHost = roomMembers(room)[0];
    if (nextHost) state.hostId = nextHost.id;
    else rooms.delete(room);
  }
  if (rooms.has(room)) broadcastLobby(room);
}
function removeClient(id) {
  const client = clients.get(id);
  if (!client) return;
  leaveRoom(client);
  clients.delete(id);
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
    const nextRoom = sanitizeRoom(message.room);
    if (client.room && client.room !== nextRoom) leaveRoom(client);
    const tokenName = sessionName(message.token);
    client.name = tokenName || sanitizeName(message.name, "Guest");
    client.isAdmin = Boolean(tokenName && getProfile(tokenName).isAdmin);
    client.skin = sanitizeSkin(message.skin);
    client.room = nextRoom;
    if (tokenName) getProfile(client.name);
    const state = roomState(client.room);
    const members = roomMembers(client.room);
    if (!state.hostId || !members.some((item) => item.id === state.hostId)) state.hostId = client.id;
    if (message.host && members.length === 1) state.hostId = client.id;
    sendWs(client, { type: "room", room: client.room });
    sendWs(client, {
      type: "players",
      players: [...clients.values()]
        .filter((item) => item.room === client.room && item.id !== client.id && item.lastState)
        .map((item) => item.lastState),
    });
    broadcastLobby(client.room);
    broadcastOnline();
    return;
  }


  if (message.type === "start") {
    if (!client.room) return;
    const state = roomState(client.room);
    if (state.hostId !== client.id) return;
    state.started = true;
    state.botCount = Math.max(0, Math.min(18, Math.round(Number(message.botCount) || 0)));
    broadcastToRoom({ type: "start", room: client.room, botCount: state.botCount }, client.room);
    broadcastLobby(client.room);
    return;
  }

  if (message.type === "leave") {
    leaveRoom(client);
    broadcastOnline();
    return;
  }
  if (message.type === "state") {
    client.lastState = {
      type: "remote",
      id: client.id,
      name: client.name,
      title: String(message.title || "").slice(0, 24),
      skin: sanitizeSkin(message.skin || client.skin || "cyan"),
      powerActive: Boolean(message.powerActive),
      dashActive: Boolean(message.dashActive),
      twinActive: Boolean(message.twinActive),
      goldActive: Boolean(message.goldActive),
      shieldActive: Boolean(message.shieldActive),
      slowed: Boolean(message.slowed),
      powerLocked: Boolean(message.powerLocked),
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
