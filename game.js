const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const radar = document.getElementById("radar");
const rctx = radar.getContext("2d");
const radarWrap = document.querySelector(".radar-wrap");

const scoreEl = document.getElementById("score");
const lengthEl = document.getElementById("length");
const boostEl = document.getElementById("boost");
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
const paletteButton = document.getElementById("paletteButton");
const quickPanel = document.getElementById("quickPanel");
const quickTitle = document.getElementById("quickTitle");
const quickProfile = document.getElementById("quickProfile");
const quickFriends = document.getElementById("quickFriends");
const quickShop = document.getElementById("quickShop");
const quickAchievements = document.getElementById("quickAchievements");
const quickQuests = document.getElementById("quickQuests");
const quickPalette = document.getElementById("quickPalette");
const closeQuickPanel = document.getElementById("closeQuickPanel");
const leadersEl = document.getElementById("leaders");
const startPanel = document.getElementById("startPanel");
const deathPanel = document.getElementById("deathPanel");
const deathText = document.getElementById("deathText");
const playButton = document.getElementById("playButton");
const retryButton = document.getElementById("retryButton");
const profileName = document.getElementById("profileName");
const guestMode = document.getElementById("guestMode");
const profileAvatar = document.getElementById("profileAvatar");
const authStatus = document.getElementById("authStatus");
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
const shopGrid = document.getElementById("shopGrid");
const boostButton = document.getElementById("boostButton");
const touchStick = document.getElementById("touchStick");

const WORLD = 4300;
const FOOD_COUNT = 900;
const SEGMENT_GAP = 10;
const BASE_SPEED = 2.45;
const BOOST_SPEED = 4.35;
const LEGACY_PROFILE_KEY = "snakeAeaProfile";
const LEGACY_SESSION_KEY = "snakeAeaSession";
const PROFILE_KEY = "snakeAreaProfile";
const SESSION_KEY = "snakeAreaSession";

const SKINS = [
  { id: "cyan", name: "Area Basic", price: 0, colors: ["#4ff3ff", "#b8ff5d"] },
  { id: "lime", name: "Lime Rush", price: 120, colors: ["#b8ff5d", "#31e7a5"] },
  { id: "pink", name: "Pink Strike", price: 180, colors: ["#ff5db8", "#ffb347"] },
  { id: "amber", name: "Amber Coil", price: 240, colors: ["#ffb347", "#fff06a"] },
  { id: "violet", name: "Violet Edge", price: 320, colors: ["#a78bfa", "#4ff3ff"] },
  { id: "ruby", name: "Ruby Fang", price: 420, colors: ["#ff3d6e", "#ffd166"] },
  { id: "ice", name: "Ice Wave", price: 520, colors: ["#d8f3ff", "#5ee7ff"] },
  { id: "royal", name: "Royal Split", price: 700, colors: ["#8fd14f", "#f7f06d"] },
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
let effects = [];
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
let lastTime = performance.now();
let animationStarted = false;
let pointer = { x: 0, y: 0, active: false };
let keys = new Set();
let camera = { x: WORLD / 2, y: WORLD / 2 };
let viewBounds = { left: 0, right: 0, top: 0, bottom: 0 };
let collectCursor = 0;
let profile = loadLocalProfile();
let authToken = localStorage.getItem(SESSION_KEY) || localStorage.getItem(LEGACY_SESSION_KEY) || "";
let onlineNames = [];
let ws = null;
let wsId = null;
let lastNetworkSend = 0;
let serverAvailable = false;

function random(min, max) { return Math.random() * (max - min) + min; }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function getSkin(id) { return SKINS.find((skin) => skin.id === id) || SKINS[0]; }
function getAvatar(id) { return AVATARS.find((avatar) => avatar.id === id) || AVATARS[0]; }
function cleanName(value, fallback) { return (value || "").trim().replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 14) || fallback; }
function angleLerp(current, target, amount) {
  const diff = ((target - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
  return current + diff * amount;
}

function adminProfile() {
  return { name: "NearBacon", coins: 5000, bestScore: 0, matches: 0, role: "admin", isAdmin: true, title: "admin", unlockedTitles: ["admin", "rookie", "hunter", "collector", "champion", "speedster", "survivor"], achievements: [], claimedQuests: [], avatar: "near", ownedSkins: SKINS.map((skin) => skin.id), activeSkin: "cyan", theme: "aurora", language: "tr", friends: [] };
}

function loadLocalProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || localStorage.getItem(LEGACY_PROFILE_KEY));
    if (!saved || typeof saved !== "object") return adminProfile();
    return normalizeProfile(saved);
  } catch {
    return adminProfile();
  }
}

function normalizeProfile(raw) {
  const base = raw.name === "NearBacon" || raw.isAdmin ? adminProfile() : { name: "Player", coins: 120, bestScore: 0, matches: 0, role: "player", isAdmin: false, title: "rookie", unlockedTitles: ["rookie"], achievements: [], claimedQuests: [], ownedSkins: ["cyan"], activeSkin: "cyan", theme: "aurora", language: "tr", friends: [] };
  const merged = { ...base, ...raw };
  merged.name = cleanName(merged.name, base.name);
  merged.friends = Array.isArray(merged.friends) ? merged.friends.map((item) => typeof item === "string" ? { name: item, online: false } : item) : [];
  merged.friendRequests = Array.isArray(merged.friendRequests) ? merged.friendRequests : [];
  merged.outgoingRequests = Array.isArray(merged.outgoingRequests) ? merged.outgoingRequests : [];
  merged.roomInvites = Array.isArray(merged.roomInvites) ? merged.roomInvites : [];
  merged.avatar = AVATARS.some((avatar) => avatar.id === merged.avatar) ? merged.avatar : "near";
  merged.unlockedTitles = Array.isArray(merged.unlockedTitles) && merged.unlockedTitles.length ? Array.from(new Set(merged.unlockedTitles)) : ["rookie"];
  if (merged.isAdmin || merged.name === "NearBacon") merged.unlockedTitles = adminProfile().unlockedTitles;
  merged.title = merged.isAdmin || merged.name === "NearBacon" ? "admin" : (merged.unlockedTitles.includes(merged.title) ? merged.title : merged.unlockedTitles[0]);
  merged.ownedSkins = merged.isAdmin || merged.name === "NearBacon" ? SKINS.map((skin) => skin.id) : Array.from(new Set(["cyan", ...(merged.ownedSkins || [])]));
  merged.role = merged.isAdmin || merged.name === "NearBacon" ? "admin" : "player";
  merged.isAdmin = merged.role === "admin";
  return merged;
}

async function api(path, options = {}) {
  const response = await fetch(path, { headers: { "content-type": "application/json" }, cache: "no-store", ...options });
  if (!response.ok) throw new Error("server_error");
  return response.json();
}

async function loadServerProfile() {
  if (guestMode.checked) return;
  try {
    const result = authToken
      ? await api(`/api/session?token=${encodeURIComponent(authToken)}`)
      : await api(`/api/profile?name=${encodeURIComponent(cleanName(profileName.value || profile.name, "NearBacon"))}`);
    profile = normalizeProfile(result.profile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    serverAvailable = true;
    if (serverStatus) serverStatus.textContent = "Online";
  } catch {
    authToken = "";
    localStorage.removeItem(SESSION_KEY);
    serverAvailable = false;
    if (serverStatus) serverStatus.textContent = "Yerel";
  }
  renderProfile();
}

async function saveProfile() {
  if (guestMode.checked) return;
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
    if (serverStatus) serverStatus.textContent = authToken ? "Oturum gerekli" : "Yerel";
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
  const name = cleanName(accountName.value || profile.name, "");
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
  localStorage.removeItem(SESSION_KEY);
  setAuthStatus("Oturum kapatıldı");
  renderProfile();
}

async function searchUsers() {
  const input = document.getElementById("friendSearchInput");
  const results = document.getElementById("friendSearchResults");
  if (!input || !results || !authToken) return;
  const q = cleanName(input.value, "");
  if (!q) { results.innerHTML = ""; return; }
  try {
    const data = await api(`/api/users/search?token=${encodeURIComponent(authToken)}&q=${encodeURIComponent(q)}`);
    results.innerHTML = data.users.length
      ? data.users.map((user) => `<article class="friend-row"><div><b>${user.name}</b><small>${user.online ? "Çevrim içi" : "Çevrim dışı"}</small></div><button data-friend-request="${user.name}">İstek gönder</button></article>`).join("")
      : `<article class="friend-row"><div><b>Sonuç yok</b><small>Başka ad dene</small></div></article>`;
    results.querySelectorAll("[data-friend-request]").forEach((button) => button.addEventListener("click", () => sendFriendRequest(button.dataset.friendRequest)));
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
    renderProfile();
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
    renderProfile();
  } catch {
    setAuthStatus("Arkadaş isteği güncellenemedi");
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
  const titleMap = { profile: "Profil", friends: "Arkadaşlar", shop: "Dükkan", achievements: "Başarımlar", quests: "Görevler", palette: "Renk Kataloğu" };
  quickTitle.textContent = titleMap[kind] || "Panel";
  quickProfile.classList.toggle("is-hidden", kind !== "profile");
  quickFriends.classList.toggle("is-hidden", kind !== "friends");
  quickShop.classList.toggle("is-hidden", kind !== "shop");
  quickAchievements.classList.toggle("is-hidden", kind !== "achievements");
  quickQuests.classList.toggle("is-hidden", kind !== "quests");
  quickPalette.classList.toggle("is-hidden", kind !== "palette");
  renderProfile();
}

function hideQuickPanel() {
  quickPanel.classList.add("is-hidden");
}

function renderProfile() {
  const shownName = guestMode.checked ? cleanName(profileName.value, "Guest") : profile.name;
  const avatar = getAvatar(profile.avatar);
  const titleText = guestMode.checked ? "Misafir" : TITLE_CATALOG[profile.title] || "Çaylak";
  if (profileName) profileName.value = shownName;
  if (profileAvatar) profileAvatar.textContent = guestMode.checked ? shownName.charAt(0).toUpperCase() : avatar.mark;
  if (topUserName) topUserName.textContent = shownName;
  if (topUserTitle) topUserTitle.textContent = titleText;
  const profileMark = document.querySelector(".profile-mark");
  if (profileMark) profileMark.textContent = guestMode.checked ? "P" : avatar.mark;
  if (menuProfileName) menuProfileName.textContent = shownName;
  if (menuProfileTitle) menuProfileTitle.textContent = titleText;
  if (coinCount) coinCount.textContent = guestMode.checked ? "-" : Math.floor(profile.coins).toLocaleString("tr-TR");
  if (bestScore) bestScore.textContent = Math.floor(profile.bestScore).toLocaleString("tr-TR");
  if (matchCount) matchCount.textContent = Math.floor(profile.matches).toLocaleString("tr-TR");
  if (profileRole) profileRole.textContent = titleText;
  selectedSkin = profile.ownedSkins.includes(profile.activeSkin) ? profile.activeSkin : "cyan";
  document.body.classList.remove(...PALETTES.map((palette) => `palette-${palette.id}`));
  document.body.classList.add(`palette-${profile.theme}`);
  if (translateButton) translateButton.textContent = profile.language === "tr" ? "TR" : "EN";
  if (accountName && !accountName.value) accountName.value = shownName;
  setAuthStatus(guestMode.checked ? "Misafir modundasın" : authToken ? `Oturum açık: ${shownName}` : "Oturum açmadan da oynayabilirsin");

  const avatarOptions = AVATARS.map((item) => `<button class="choice-card ${profile.avatar === item.id ? "is-selected" : ""}" data-profile-avatar="${item.id}"><b>${item.mark}</b><span>${item.name}</span></button>`).join("");
  const titleOptions = (profile.unlockedTitles || ["rookie"]).map((title) => `<button class="choice-card ${profile.title === title ? "is-selected" : ""}" data-profile-title="${title}"><b>${TITLE_CATALOG[title] || title}</b><span>Ünvan</span></button>`).join("");
  quickProfile.innerHTML = `
    <section class="profile-hero"><div class="profile-avatar-large">${guestMode.checked ? shownName.charAt(0).toUpperCase() : avatar.mark}</div><div><span>Oyuncu profili</span><strong>@${shownName}</strong><small>${titleText}</small></div></section>
    <div><span>Coin</span><strong>${guestMode.checked ? "-" : Math.floor(profile.coins).toLocaleString("tr-TR")}</strong></div>
    <div><span>En iyi</span><strong>${Math.floor(profile.bestScore).toLocaleString("tr-TR")}</strong></div>
    <div><span>Aktif oda</span><strong>${currentRoom || "-"}</strong></div>
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

function renderFriends() {
  const friends = profile.friends || [];
  const requests = profile.friendRequests || [];
  const outgoing = profile.outgoingRequests || [];
  const invites = profile.roomInvites || [];
  if (friendList) {
    friendList.innerHTML = friends.length
      ? friends.map((friend) => {
        const name = typeof friend === "string" ? friend : friend.name;
        const online = onlineNames.includes(name) || Boolean(friend.online);
        return `<li><span>${name}</span><small>${online ? "Online" : "Offline"}</small></li>`;
      }).join("")
      : `<li><span>Arkadaş yok</span><small>Ekle</small></li>`;
  }
  if (!quickFriends) return;
  if (guestMode.checked || !authToken) {
    quickFriends.innerHTML = `<section class="friend-card"><h3>Arkadaş servisi</h3><p>Arkadaş aramak, istek göndermek ve oda daveti almak için hesapla giriş yap.</p></section>`;
    return;
  }
  const requestHtml = requests.length
    ? requests.map((name) => `<article class="friend-row"><div><b>${name}</b><small>Arkadaşlık isteği gönderdi</small></div><button data-accept-friend="${name}">Kabul</button><button data-reject-friend="${name}">Reddet</button></article>`).join("")
    : `<article class="friend-row muted"><div><b>Gelen istek yok</b><small>Yeni istekler burada görünür</small></div></article>`;
  const outgoingHtml = outgoing.length
    ? outgoing.map((name) => `<span class="request-chip">${name}</span>`).join("")
    : `<span class="request-chip">Bekleyen yok</span>`;
  const inviteHtml = invites.length
    ? invites.map((invite) => `<article class="friend-row"><div><b>${invite.from}</b><small>${invite.room} odasına davet etti</small></div><button data-use-invite="${invite.room}">Kodu al</button></article>`).join("")
    : `<article class="friend-row muted"><div><b>Oda daveti yok</b><small>Arkadaşların davet gönderince burada çıkar</small></div></article>`;
  const friendsHtml = friends.length
    ? friends.map((friend) => {
      const name = typeof friend === "string" ? friend : friend.name;
      const online = onlineNames.includes(name) || Boolean(friend.online);
      return `<article class="friend-row"><div><b>${name}</b><small>${online ? "Çevrim içi" : "Çevrim dışı"}</small></div><button data-invite-friend="${name}" ${currentRoom ? "" : ""}>Odaya davet</button></article>`;
    }).join("")
    : `<article class="friend-row muted"><div><b>Henüz arkadaş yok</b><small>Kullanıcı ara ve istek gönder</small></div></article>`;
  quickFriends.innerHTML = `
    <section class="friend-card search-card">
      <h3>Kullanıcı ara</h3>
      <div class="friend-search"><input id="friendSearchInput" maxlength="14" placeholder="Kullanıcı adı" /><button id="friendSearchButton">Ara</button></div>
      <div id="friendSearchResults" class="friend-results"></div>
    </section>
    <section class="friend-card"><h3>Gelen istekler</h3>${requestHtml}</section>
    <section class="friend-card"><h3>Giden istekler</h3><div class="request-list">${outgoingHtml}</div></section>
    <section class="friend-card"><h3>Oda davetleri</h3>${inviteHtml}</section>
    <section class="friend-card"><h3>Arkadaşların</h3>${friendsHtml}</section>`;
  document.getElementById("friendSearchButton")?.addEventListener("click", searchUsers);
  document.getElementById("friendSearchInput")?.addEventListener("keydown", (event) => { if (event.key === "Enter") searchUsers(); });
  quickFriends.querySelectorAll("[data-accept-friend]").forEach((button) => button.addEventListener("click", () => respondFriendRequest(button.dataset.acceptFriend, true)));
  quickFriends.querySelectorAll("[data-reject-friend]").forEach((button) => button.addEventListener("click", () => respondFriendRequest(button.dataset.rejectFriend, false)));
  quickFriends.querySelectorAll("[data-invite-friend]").forEach((button) => button.addEventListener("click", () => inviteFriend(button.dataset.inviteFriend)));
  quickFriends.querySelectorAll("[data-use-invite]").forEach((button) => button.addEventListener("click", () => useRoomInvite(button.dataset.useInvite)));
}
function renderShop() {
  const html = SKINS.map((skin) => {
    const owned = profile.ownedSkins.includes(skin.id);
    const selected = selectedSkin === skin.id;
    const lockedByGuest = guestMode.checked && !owned;
    let label = selected ? "Seçili" : owned ? "Seç" : `${skin.price} coin`;
    if (lockedByGuest) label = "Profil gerekli";
    return `<article class="shop-card"><div class="skin-preview" style="--skin-a:${skin.colors[0]};--skin-b:${skin.colors[1]}"></div><b>${skin.name}</b><small>${owned ? "Açık" : `${skin.price} coin`}</small><button class="${selected ? "is-selected" : ""}" data-shop-skin="${skin.id}" ${lockedByGuest ? "disabled" : ""}>${label}</button></article>`;
  }).join("");
  if (shopGrid) shopGrid.innerHTML = html;
  quickShop.innerHTML = html;
  document.querySelectorAll("[data-shop-skin]").forEach((button) => button.addEventListener("click", () => handleShopClick(button.dataset.shopSkin)));
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
    return `<article class="reward-card"><header><b>${quest.name}</b><small>+${quest.coin} coin / ${rewardTitle}</small></header><p>${quest.desc}</p><button data-quest="${quest.id}" ${!ready || claimed || guestMode.checked ? "disabled" : ""}>${claimed ? "Alındı" : ready ? "Ödülü Al" : "Kilitli"}</button></article>`;
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
  if (guestMode.checked || !AVATARS.some((avatar) => avatar.id === id)) return;
  profile.avatar = id;
  saveProfile();
  renderProfile();
}

function setProfileTitle(id) {
  if (guestMode.checked || !profile.unlockedTitles.includes(id)) return;
  profile.title = id;
  saveProfile();
  renderProfile();
}

function claimQuest(id) {
  const quest = QUESTS.find((item) => item.id === id);
  if (!quest || guestMode.checked || profile.claimedQuests.includes(id) || !quest.check()) return;
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
  playButton.textContent = en ? "Enter Arena" : "Arenaya Gir";
  saveProfile();
  renderProfile();
}

function setGameHudVisible(visible) {
  document.querySelectorAll(".game-stat").forEach((item) => item.classList.toggle("is-hidden", !visible));
}
function handleShopClick(skinId) {
  const skin = getSkin(skinId);
  const owned = profile.ownedSkins.includes(skin.id);
  if (!owned) {
    if (guestMode.checked || profile.coins < skin.price) return;
    profile.coins -= skin.price;
    profile.ownedSkins.push(skin.id);
  }
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
    roomCodeInput.readOnly = true;
    roomCodeInput.classList.add("system-code");
  } else if (gameMode === "room-join") {
    roomCodeInput.readOnly = false;
    roomCodeInput.classList.remove("system-code");
    if (currentRoom && roomCodeInput.value === currentRoom) roomCodeInput.value = "";
  } else {
    roomCodeInput.readOnly = false;
    roomCodeInput.classList.remove("system-code");
  }
  roomCodeLabel.textContent = gameMode.startsWith("room") ? (roomCodeInput.value || currentRoom || "-") : "-";
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
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
    const skin = SKINS[Math.floor(random(0, SKINS.length))];
    foods.push({ x: clamp(x, 36, WORLD - 36), y: clamp(y, 36, WORLD - 36), r: random(3.2, 6.6) + value * 0.35, value, color: skin.colors[Math.floor(random(0, 2))], pulse: random(0, Math.PI * 2) });
  }
}


function spawnEffectBurst(x, y, color = "#b8ff5d", count = 9) {
  for (let i = 0; i < count; i++) {
    effects.push({
      x,
      y,
      vx: random(-2.1, 2.1),
      vy: random(-2.1, 2.1),
      life: random(22, 42),
      maxLife: 42,
      size: random(2.2, 6.4),
      color,
    });
  }
  if (effects.length > 260) effects.splice(0, effects.length - 260);
}

function updateEffects(dt) {
  for (let i = effects.length - 1; i >= 0; i--) {
    const effect = effects[i];
    effect.life -= dt;
    effect.x += effect.vx * dt;
    effect.y += effect.vy * dt;
    effect.vx *= 0.985;
    effect.vy *= 0.985;
    if (effect.life <= 0) effects.splice(i, 1);
  }
}

function drawEffects() {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (const effect of effects) {
    const alpha = clamp(effect.life / effect.maxLife, 0, 1);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = effect.color;
    ctx.shadowBlur = 16 * alpha;
    ctx.shadowColor = effect.color;
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
  const length = isHuman ? 18 : Math.floor(random(15, 34));
  const angle = random(0, Math.PI * 2);
  const segments = [];
  for (let i = 0; i < length; i++) segments.push({ x: x - Math.cos(angle) * i * SEGMENT_GAP, y: y - Math.sin(angle) * i * SEGMENT_GAP });
  const skin = getSkin(skinId);
  return { id: options.id || `${Date.now()}-${Math.random()}`, name, skin: skin.id, colors: skin.colors, type, control: options.control || "bot", isPlayer: isHuman, alive: true, x, y, angle, turn: 0.09, segments, targetLength: length, score: Math.max(0, (length - 12) * 14), boost: 100, boostHeld: false, thinkAt: 0, aiAngle: angle, radius: isHuman ? 13 : 12 };
}

function resetGame() {
  foods = [];
  effects = [];
  snakes = [];
  localPlayers = [];
  matchFinalized = false;
  collectCursor = 0;
  const p1Name = guestMode.checked ? cleanName(profileName.value, "Guest") : profile.name;
  if (!guestMode.checked) {
    profile.activeSkin = selectedSkin;
    saveProfile();
  }
  player = makeSnake(p1Name, selectedSkin, { type: "human", control: "p1", x: WORLD / 2 - 70, y: WORLD / 2 });
  snakes.push(player);
  localPlayers.push(player);
  for (let i = 0; i < botCountSetting; i++) {
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
  spawnFood(FOOD_COUNT);
  focusPlayer = player;
  camera.x = focusPlayer.x;
  camera.y = focusPlayer.y;
  running = true;
  setGameHudVisible(true);
  hideQuickPanel();
  modeLabel.textContent = gameMode.startsWith("room") ? "Oda" : "Bot";
  startPanel.classList.add("is-hidden");
  deathPanel.classList.add("is-hidden");
  if (radarWrap) radarWrap.classList.remove("is-hidden");
  startLoop();
  if (gameMode.startsWith("room")) connectOnline();
}

function connectOnline() {
  if (!currentRoom) currentRoom = "LOBBY";
  roomCodeLabel.textContent = currentRoom;
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "join", name: player.name, skin: selectedSkin, room: currentRoom }));
    return;
  }
  if (ws && ws.readyState === WebSocket.CONNECTING) return;
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  ws = new WebSocket(`${protocol}://${location.host}/ws`);
  if (serverStatus) serverStatus.textContent = "Bağlanıyor";
  ws.addEventListener("open", () => {
    if (serverStatus) serverStatus.textContent = "Online";
    ws.send(JSON.stringify({ type: "join", name: player.name, skin: selectedSkin, room: currentRoom }));
  });
  ws.addEventListener("message", (event) => handleOnlineMessage(JSON.parse(event.data)));
  ws.addEventListener("close", () => { if (serverStatus) serverStatus.textContent = "Koptu"; ws = null; });
  ws.addEventListener("error", () => { if (serverStatus) serverStatus.textContent = "Hata"; });
}

function handleOnlineMessage(message) {
  if (message.type === "welcome") wsId = message.id;
  if (message.type === "room") { currentRoom = message.room; roomCodeLabel.textContent = currentRoom; renderProfile(); }
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
    snake = makeSnake(remote.name || "Online", skin.id, { type: "remote", id: remote.id });
    snakes.push(snake);
  }
  snake.name = remote.name || snake.name;
  snake.skin = skin.id;
  snake.colors = skin.colors;
  snake.type = "remote";
  snake.alive = true;
  snake.x = remote.x;
  snake.y = remote.y;
  snake.angle = remote.angle;
  snake.score = remote.score || 0;
  snake.targetLength = remote.targetLength || 18;
  snake.segments = Array.isArray(remote.segments) && remote.segments.length ? remote.segments : snake.segments;
}

function sendOnlineState(now) {
  if (!gameMode.startsWith("room") || !ws || ws.readyState !== WebSocket.OPEN || !player || !player.alive) return;
  if (now - lastNetworkSend < 70) return;
  lastNetworkSend = now;
  ws.send(JSON.stringify({ type: "state", skin: selectedSkin, x: player.x, y: player.y, angle: player.angle, score: player.score, targetLength: player.targetLength, segments: player.segments.slice(0, 70) }));
}

function screenToWorld(x, y) { return { x: camera.x + (x - width / 2) / scale, y: camera.y + (y - height / 2) / scale }; }

function updateHumanIntent(snake) {
  if (!snake.alive) return;
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
  if (!snake.alive || snake.type === "remote") return;
  if (snake.type === "bot") { thinkForBot(snake, now); snake.angle = angleLerp(snake.angle, snake.aiAngle, snake.turn); }
  else updateHumanIntent(snake);
  const canBoost = snake.boostHeld && snake.boost > 4 && snake.targetLength > 12;
  const speed = (canBoost ? BOOST_SPEED : BASE_SPEED) * dt;
  if (canBoost) {
    snake.boost = Math.max(0, snake.boost - 0.42 * dt);
    snake.targetLength = Math.max(12, snake.targetLength - 0.018 * dt);
    if (Math.random() < 0.18) spawnFood(1, snake.x - Math.cos(snake.angle) * 18, snake.y - Math.sin(snake.angle) * 18, 0.45);
  } else snake.boost = Math.min(100, snake.boost + 0.09 * dt);
  snake.x += Math.cos(snake.angle) * speed;
  snake.y += Math.sin(snake.angle) * speed;
  snake.segments.unshift({ x: snake.x, y: snake.y });
  while (snake.segments.length > Math.max(8, Math.floor(snake.targetLength))) snake.segments.pop();
}

function collectFood(snake) {
  if (snake.type === "remote") return;
  const scanAll = snake.isPlayer;
  const checks = scanAll ? foods.length : Math.min(110, foods.length);
  for (let step = 0; step < checks; step++) {
    const i = scanAll ? foods.length - 1 - step : (collectCursor + step * 5) % foods.length;
    const food = foods[i];
    if (!food) continue;
    const pickup = snake.radius + food.r + 3;
    const dx = food.x - snake.x;
    const dy = food.y - snake.y;
    if (dx * dx + dy * dy < pickup * pickup) {
      foods.splice(i, 1);
      snake.targetLength += 0.85 + food.value * 0.55;
      snake.score += Math.round(10 + food.value * 10);
      snake.boost = Math.min(100, snake.boost + 2.2);
      spawnEffectBurst(food.x, food.y, food.color, snake.isPlayer ? 10 : 4);
      if (!scanAll) break;
    }
  }
  collectCursor = (collectCursor + 17) % Math.max(1, foods.length);
  if (foods.length < FOOD_COUNT) spawnFood(Math.min(5, FOOD_COUNT - foods.length));
}

function killSnake(snake, killer) {
  if (!snake.alive) return;
  snake.alive = false;
  for (let i = 0; i < snake.segments.length; i += 2) spawnFood(1, snake.segments[i].x, snake.segments[i].y, 1.5);
  if (killer && killer !== snake) killer.score += snake.isPlayer ? 0 : Math.round(snake.score * 0.16 + 60);
  if (snake.type === "bot") {
    setTimeout(() => { if (!running) return; const skin = SKINS[Math.floor(random(0, SKINS.length))]; const fresh = makeSnake(BOT_NAMES[Math.floor(random(0, BOT_NAMES.length))], skin.id, { type: "bot" }); const index = snakes.findIndex((item) => item.id === snake.id); if (index >= 0) snakes[index] = fresh; }, 900);
    return;
  }
  if (snake.type === "human") {
    const aliveHuman = localPlayers.find((item) => item.alive);
    if (aliveHuman) { focusPlayer = aliveHuman; return; }
    finishMatch();
  }
}

function finishMatch() {
  if (matchFinalized) return;
  matchFinalized = true;
  running = false;
  const bestHuman = localPlayers.reduce((best, item) => (item.score + item.targetLength * 8 > best.score + best.targetLength * 8 ? item : best), localPlayers[0]);
  const finalScore = Math.round(bestHuman.score + bestHuman.targetLength * 8);
  const earnedCoins = Math.max(10, Math.floor(finalScore / 55));
  if (!guestMode.checked) {
    profile.coins += earnedCoins;
    profile.bestScore = Math.max(profile.bestScore, finalScore);
    profile.matches += 1;
    saveProfile();
  }
  deathText.textContent = guestMode.checked ? `${bestHuman.name} skoru ${finalScore}. Misafir modunda profil kaydedilmedi.` : `${bestHuman.name} skoru ${finalScore}. +${earnedCoins} coin kazandın.`;
  deathPanel.classList.remove("is-hidden");
  renderProfile();
}

function resolveCollisions() {
  for (const snake of snakes) {
    if (!snake.alive || snake.type === "remote") continue;
    if (snake.x < 18 || snake.x > WORLD - 18 || snake.y < 18 || snake.y > WORLD - 18) { killSnake(snake); continue; }
    for (const other of snakes) {
      if (!snake.alive) break;
      if (!other.alive || other.type === "remote" || snake.id === other.id) continue;
      const headLimit = snake.radius + other.radius - 5;
      const headDx = snake.x - other.x;
      const headDy = snake.y - other.y;
      if (headDx * headDx + headDy * headDy < headLimit * headLimit) {
        if (snake.targetLength >= other.targetLength) killSnake(other, snake); else killSnake(snake, other);
      }
      const stride = snake.isPlayer || other.isPlayer ? 2 : 4;
      const hitLimit = snake.radius + 3;
      const hitLimitSq = hitLimit * hitLimit;
      for (let i = 7; i < other.segments.length; i += stride) {
        const seg = other.segments[i];
        const dx = snake.x - seg.x;
        if (dx > hitLimit || dx < -hitLimit) continue;
        const dy = snake.y - seg.y;
        if (dy > hitLimit || dy < -hitLimit) continue;
        if (dx * dx + dy * dy < hitLimitSq) { killSnake(snake, other); break; }
      }
    }
  }
}

function update(dt, now) {
  if (running) {
    for (const snake of snakes) { if (!snake.alive) continue; moveSnake(snake, dt, now); collectFood(snake); }
    resolveCollisions();
    sendOnlineState(now);
  }
  updateEffects(dt);
  focusPlayer = localPlayers.find((item) => item.alive) || focusPlayer || player;
  if (focusPlayer) {
    camera.x += (focusPlayer.x - camera.x) * 0.08;
    camera.y += (focusPlayer.y - camera.y) * 0.08;
    scoreEl.textContent = Math.round(focusPlayer.score).toLocaleString("tr-TR");
    lengthEl.textContent = Math.floor(focusPlayer.targetLength).toString();
    boostEl.textContent = `${Math.round(focusPlayer.boost)}%`;
  }
  updateLeaderboard();
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
  for (const food of foods) {
    if (food.x < viewBounds.left - padding || food.x > viewBounds.right + padding || food.y < viewBounds.top - padding || food.y > viewBounds.bottom + padding) continue;
    const pulse = Math.sin(now * 0.006 + food.pulse) * 0.22 + 1;
    ctx.save(); ctx.shadowBlur = 12; ctx.shadowColor = food.color; ctx.beginPath(); ctx.fillStyle = food.color; ctx.arc(food.x, food.y, food.r * pulse, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
}

function drawSnake(snake) {
  if (!snake.alive) return;
  const [primary, secondary] = snake.colors;
  const padding = 190;
  const headVisible = snake.x > viewBounds.left - padding && snake.x < viewBounds.right + padding && snake.y > viewBounds.top - padding && snake.y < viewBounds.bottom + padding;
  let drewAny = false;
  for (let i = snake.segments.length - 1; i >= 0; i--) {
    const seg = snake.segments[i];
    if (seg.x < viewBounds.left - padding || seg.x > viewBounds.right + padding || seg.y < viewBounds.top - padding || seg.y > viewBounds.bottom + padding) continue;
    drewAny = true;
    const t = i / Math.max(1, snake.segments.length - 1);
    const radius = Math.max(5, snake.radius * (1 - t * 0.42));
    ctx.beginPath(); ctx.fillStyle = i % 2 ? secondary : primary; ctx.globalAlpha = snake.type === "remote" ? 0.78 : 1 - t * 0.12; ctx.shadowBlur = snake.isPlayer && i < 8 ? 10 : 0; ctx.shadowColor = primary; ctx.arc(seg.x, seg.y, radius, 0, Math.PI * 2); ctx.fill();
  }
  if (!drewAny || !headVisible) { ctx.globalAlpha = 1; ctx.shadowBlur = 0; return; }
  ctx.globalAlpha = 1; ctx.shadowBlur = 0; ctx.fillStyle = "#06110f";
  const eyeA = snake.angle + 0.55; const eyeB = snake.angle - 0.55;
  ctx.beginPath(); ctx.arc(snake.x + Math.cos(eyeA) * 8, snake.y + Math.sin(eyeA) * 8, 2.6, 0, Math.PI * 2); ctx.arc(snake.x + Math.cos(eyeB) * 8, snake.y + Math.sin(eyeB) * 8, 2.6, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = snake.type === "remote" ? "#d8f3ff" : snake.control === "p2" ? "#fff06a" : "rgba(255,255,255,0.88)";
  ctx.font = "700 13px Inter, system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillText(snake.name, snake.x, snake.y - snake.radius - 16);
}

function render(now) {
  ctx.clearRect(0, 0, width, height);
  viewBounds = { left: camera.x - width / (2 * scale), right: camera.x + width / (2 * scale), top: camera.y - height / (2 * scale), bottom: camera.y + height / (2 * scale) };
  ctx.save(); ctx.translate(width / 2, height / 2); ctx.scale(scale, scale); ctx.translate(-camera.x, -camera.y); drawGrid(); drawFood(now); drawEffects(); for (const snake of snakes) drawSnake(snake); ctx.restore(); drawVignette(); drawRadar();
}

function drawVignette() {
  const gradient = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.28, width / 2, height / 2, Math.max(width, height) * 0.72);
  gradient.addColorStop(0, "rgba(7,17,15,0)"); gradient.addColorStop(1, "rgba(7,17,15,0.5)"); ctx.fillStyle = gradient; ctx.fillRect(0, 0, width, height);
}

function drawRadar() {
  const rw = radar.width; const rh = radar.height;
  if (!player) { rctx.clearRect(0, 0, rw, rh); return; }
  rctx.clearRect(0, 0, rw, rh); rctx.fillStyle = "rgba(255,255,255,0.04)"; rctx.fillRect(0, 0, rw, rh); rctx.strokeStyle = "rgba(196,255,231,0.16)"; rctx.strokeRect(7, 7, rw - 14, rh - 14);
  for (const snake of snakes) { if (!snake.alive) continue; const x = (snake.x / WORLD) * (rw - 16) + 8; const y = (snake.y / WORLD) * (rh - 16) + 8; rctx.fillStyle = snake.type === "remote" ? "#d8f3ff" : snake.isPlayer ? "#ffffff" : snake.colors[0]; rctx.beginPath(); rctx.arc(x, y, snake.isPlayer ? 4 : 2.6, 0, Math.PI * 2); rctx.fill(); }
}

function updateLeaderboard() {
  const leaders = snakes.filter((snake) => snake.alive).sort((a, b) => b.score + b.targetLength * 8 - (a.score + a.targetLength * 8)).slice(0, 7);
  if (!leadersEl) return;
  leadersEl.innerHTML = leaders.map((snake, index) => `<li><span>${index + 1}</span><b>${snake.name}</b><strong>${Math.round(snake.score + snake.targetLength * 8)}</strong></li>`).join("");
}

function frame(now) {
  const dt = Math.min(2.2, (now - lastTime) / 16.67);
  lastTime = now; update(dt, now); render(now); requestAnimationFrame(frame);
}

function startLoop() {
  if (animationStarted) return;
  animationStarted = true;
  lastTime = performance.now();
  requestAnimationFrame(frame);
}

function bindControls() {
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", (event) => { keys.add(event.key.length === 1 ? event.key.toLowerCase() : event.key); keys.add(event.code); if (event.code === "Space") { event.preventDefault(); if (player) player.boostHeld = true; } if (event.key === "Enter" && !running) resetGame(); });
  window.addEventListener("keyup", (event) => { keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key); keys.delete(event.code); if (event.code === "Space" && player) player.boostHeld = false; });
  canvas.addEventListener("pointermove", (event) => { pointer = { x: event.clientX, y: event.clientY, active: true }; });
  canvas.addEventListener("pointerdown", (event) => { pointer = { x: event.clientX, y: event.clientY, active: true }; if (player) player.boostHeld = true; });
  window.addEventListener("pointerup", () => { if (player) player.boostHeld = false; });
  boostButton.addEventListener("pointerdown", (event) => { event.preventDefault(); if (player) player.boostHeld = true; });
  boostButton.addEventListener("pointerup", () => { if (player) player.boostHeld = false; });
  boostButton.addEventListener("pointerleave", () => { if (player) player.boostHeld = false; });
  touchStick.addEventListener("pointermove", (event) => { pointer = { x: event.clientX, y: event.clientY, active: true }; });
  profileButton.addEventListener("click", () => showQuickPanel("profile"));
  if (friendsButton) friendsButton.addEventListener("click", () => showQuickPanel("friends"));
  shopButton.addEventListener("click", () => showQuickPanel("shop"));
  if (achievementsButton) achievementsButton.addEventListener("click", () => showQuickPanel("achievements"));
  questsButton.addEventListener("click", () => showQuickPanel("quests"));
  paletteButton.addEventListener("click", () => showQuickPanel("palette"));
  translateButton.addEventListener("click", toggleLanguage);
  closeQuickPanel.addEventListener("click", hideQuickPanel);
  document.querySelectorAll(".mode-button").forEach((button) => button.addEventListener("click", () => { gameMode = button.dataset.mode; updateModeButtons(); }));
  botCountInput.addEventListener("input", () => { botCountSetting = Number(botCountInput.value); botCountValue.textContent = botCountSetting.toString(); });
  if (profileName) profileName.addEventListener("change", () => renderProfile());
  guestMode.addEventListener("change", () => { renderProfile(); });
  if (loginButton) loginButton.addEventListener("click", () => loginAccount(false));
  if (registerButton) registerButton.addEventListener("click", () => loginAccount(true));
  if (logoutButton) logoutButton.addEventListener("click", logoutAccount);
  if (accountPassword) accountPassword.addEventListener("keydown", (event) => { if (event.key === "Enter") loginAccount(false); });
  if (addFriendButton) addFriendButton.addEventListener("click", addFriend);
  if (friendName) friendName.addEventListener("keydown", (event) => { if (event.key === "Enter") addFriend(); });
  playButton.addEventListener("click", resetGame);
  retryButton.addEventListener("click", resetGame);
}

resize();
bindControls();
renderProfile();
updateModeButtons();
botCountValue.textContent = botCountSetting.toString();
loadServerProfile();
setGameHudVisible(false);
startPanel.classList.remove("is-hidden");
if (radarWrap) radarWrap.classList.add("is-hidden");



















