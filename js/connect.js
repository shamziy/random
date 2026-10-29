// connect.js: finds the backend and sends every /api call to it.
// If NO backend can be found it switches to DEMO mode: a small fake server runs inside this page
// (16 pretend people, everything saved only in this browser) so the website still works.
(() => {
const KEY = "lil_preview_db", now = () => Date.now(), pick = a => a[Math.floor(Math.random() * a.length)];
const hnum = s => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 256; };
let D = null; try { D = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
const BOTS = [["amara",25,"Woman","Yaba","Colour nerd. I sketch danfo conductors and chase the best puff-puff in town.",["art","food","music"],"#c9507c","#f2cadb"],["tunde",28,"Man","Yaba","Dev in Yaba who debugs better with jollof. Looking for good gist and better company.",["tech","food","football"],"#4b7a5d","#d6e3d3"],["zainab",26,"Woman","Surulere","I run a small kitchen in Surulere. Ask me about my pepper soup secret.",["food","business","travel"],"#8f74b8","#e4d6f0"],["damilola",29,"Man","Lagos Island","I design homes by day and walk the Marina by night. Slow walks, big ideas.",["art","fitness","music"],"#d79a46","#f3dfb8"],["chioma",27,"Woman","Lekki","Kind heart, loud laugh. Beach days are my reset button.",["beach","dance","fitness"],"#2f9aa8","#cdeaee"],["seun",30,"Man","Lekki","I'll race you to the water. Coach by day, storyteller at sunset.",["fitness","beach","football"],"#e07a3f","#f8dcc4"],["fatima",26,"Woman","Ikoyi","Lawyer, secret poet. I argue well but listen better.",["poetry","books","coffee"],"#6a8f3c","#e1ecc8"],["emeka",31,"Man","Victoria Island","I catch golden hour for a living. Suya connoisseur on the side.",["photography","suya","travel"],"#3d6fb0","#d3e1f5"],["ngozi",24,"Woman","Yaba","Latte art and late-night verses. I remember how you take your coffee.",["coffee","poetry","books"],"#b45a5a","#f1d3d3"],["dayo",28,"Man","Ikeja","Gentle giant and great listener. Yes, I read the menu twice.",["business","books","coffee"],"#5a7d9a","#d6e4ee"],["amaka",27,"Woman","Surulere","Sketchbook always open. Salsa on Sundays, if you can keep up.",["art","dance","fashion"],"#cf7a4a","#f5dcc8"],["kelechi",29,"Man","Maryland","I sing in the shower, on the bus and sometimes on stage.",["music","movies","games"],"#7a5aa8","#e2d8f1"],["bisi",26,"Woman","Victoria Island","Afrobeats on repeat. I'll play your song if you ask nicely.",["music","dance","nightlife"],"#d6407a","#f6cade"],["bayo",30,"Man","Lekki","I mix drinks and good conversations. Zero wahala energy.",["nightlife","music","suya"],"#2f8f83","#cdeae5"],["tolu",25,"Woman","Ajah","I plan the party, then dance at it. Ask me about my playlists.",["dance","food","fashion"],"#c8892f","#f4e1bd"],["kunle",28,"Man","Gbagada","Studio rat who finally came outside. Let's find a good rooftop.",["music","coffee","games"],"#4a5fb0","#d7dcf3"]];
const BR = ["Haha you made me smile 😄","Omo, tell me more!","Lagos traffic nearly stopped me from replying 🚌","Abeg, what's your favourite food?","I like how you talk 💚","Let's meet for coffee this weekend ☕","Wahala! You're funny o"];
const BA = ["Hmm, honestly it depends on the day 😄","Easy! Yes, and I'm not sorry 😂","That's a tricky one. Ask me again after jollof 🍛","I'd say yes, but only if you buy the suya 🍢","Ha! You're bold. I like it 😏","Mine is probably the same as yours, honestly 💛","Can I answer that over coffee? ☕"];
const DAILY = [["Freedom Park Sunday","How many players are on a 5-a-side team?",["7","5","11"],1],["Rainy Monday","Which yellow bus is the icon of Lagos roads?",["Danfo","Gondola","Tuk-tuk"],0],["Tech Tuesday","Which Lagos area is nicknamed Yabacon Valley?",["Ikoyi","Surulere","Yaba"],2],["Waka Wednesday","Which snack pairs with roasted corn?",["Pear (ube)","Chocolate","Popcorn"],0],["Throwback Thursday","Which famous market is on Lagos Island?",["Wuse","Balogun","Onitsha"],1],["Detty Friday","Which dance craze is a Lagos favourite?",["Polka","Shoki","Tango"],1],["Beach Saturday","Which beach is a Lekki favourite?",["Waikiki","Bondi","Elegushi"],2]];
if (!D || !D.users) { D = { users: [], req: [], msg: [], games: [], ans: [], used: [], views: [], act: [], daily: [], blocks: [], id: 100 };
  BOTS.forEach((b, i) => D.users.push({ id: i + 1, email: b[0] + "@demo.local", username: b[0], name: b[0], age: b[1], gender: b[2], bio: b[4], area: b[3], fav: "", look: [], interests: b[5], photo: "", game: {}, pw: "", loc: i % 9, seen: 0, bot: 1,
    avatar: { sk: ["#a8714f","#8d5a3b","#c08a62","#7a4a30"][i % 4], sh: b[6], bg: b[7], hs: b[2] === "Woman" ? (i % 2 ? 1 : 3) : [0, 2, 4][i % 3] } })); }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(D)); } catch (e) {} }, nid = () => ++D.id;
const U = id => D.users.find(u => u.id === id), online = u => u.bot || u.seen > now() - 90000;
const pub = u => ({ id: u.id, username: u.username, name: u.name, bio: u.bio, look: u.look, fav: u.fav, area: u.area, interests: u.interests, avatar: u.avatar, online: !!online(u), loc: u.loc });
const full = u => ({ ...pub(u), email: u.email, photo: u.photo, fav: u.fav, look: u.look, game: u.game, xp: u.xp || 0, boost: u.boost || 0 });
const blocked = (a, b) => D.blocks.some(x => (x[0] === a && x[1] === b) || (x[0] === b && x[1] === a));
const STOP=new Set("this that with have from your about just like love lagos and the for are but you not who what when where been into than then them they their there here very much more some also".split(" ")),wordsOf=t=>new Set((String(t||"").toLowerCase().match(/[a-z]{4,}/g)||[]).filter(w=>!STOP.has(w)));
const compat=(a,b)=>{const ia=a.interests||[],ib=b.interests||[],la=a.look||[],lb=b.look||[],wb=wordsOf(b.bio),si=ia.filter(x=>ib.includes(x)),sl=la.filter(x=>lb.includes(x)),sw=[...wordsOf(a.bio)].filter(w=>wb.has(w)),ra=(n,x,y)=>n/Math.max(1,Math.min(x,y)),sa=!!a.area&&a.area===b.area,sf=!!a.fav&&a.fav===b.fav;return{pct:Math.round(Math.min(100,12+hnum([a.id,b.id].sort((x,y)=>x-y).join("|"))%41+32*ra(si.length,ia.length,ib.length)+20*Math.min(1,sw.length/3)+(sa?5:0)+(sf?3:0))),why:[...si,...sw.slice(0,2),...(sa?["both in "+a.area]:[])].slice(0,5)}};
const rel = (a, b) => D.req.find(r => (r.from === a && r.to === b) || (r.from === b && r.to === a));
const friends = (a, b) => { const r = rel(a, b); return !!r && r.status === "accepted"; };
const between = (a, b) => D.msg.filter(m => (m.from === a && m.to === b) || (m.from === b && m.to === a));
const log = (u, kind, text) => D.act.push({ u, kind, text: String(text).slice(0, 120), at: now() });
const day = (off = 0) => new Date(now() + 3600000 - off * 864e5).toISOString().slice(0, 10);
const award = (uid, n, why, cap = 0) => { const x = U(uid); if (!x) return 0; D.xpe = D.xpe || []; if (cap) n = Math.min(n, cap - D.xpe.filter(e => e.u === uid && e.day === day() && e.why === why).reduce((s, e) => s + e.amt, 0)); if (n <= 0) return 0; D.xpe.push({ u: uid, day: day(), amt: n, why }); x.xp = (x.xp || 0) + n; return n; };
const xpInfo = u => { D.xpe = D.xpe || []; const e = D.xpe.filter(x => x.u === u.id && x.day === day()); return { total: u.xp || 0, today: e.filter(x => x.why !== "boost").reduce((s, x) => s + x.amt, 0), goal: 200, boostUntil: u.boost || 0, claimed: e.some(x => x.why === "boost") }; };
const streak3 = (a, b) => { const c = {}; between(a, b).forEach(m => { const d = new Date(m.at + 3600000).toISOString().slice(0, 10); c[d] = (c[d] || 0) + 1; }); const ds = Object.keys(c).filter(d => c[d] >= 10).sort().map(Date.parse); let r = 1; for (let i = 1; i < ds.length; i++) { r = ds[i] - ds[i - 1] === 864e5 ? r + 1 : 1; if (r >= 3) return true; } return false; };
function startGame(g) { let used = new Set(D.used.filter(x => x[0] === g.a || x[0] === g.b).map(x => x[1])); if (500 - used.size < 20) { D.used = D.used.filter(x => x[0] !== g.a && x[0] !== g.b); used = new Set(); }
  const qs = [...Array(500).keys()].filter(i => !used.has(i)).sort(() => Math.random() - .5).slice(0, 20); qs.forEach(q => D.used.push([g.a, q], [g.b, q]));
  Object.assign(g, { status: "playing", qs, i: 0, asked: 0 }); log(g.a, "game", "🎲 Started 20 Questions"); log(g.b, "game", "🎲 Started 20 Questions"); }
function answer(g, uid, text) { D.ans.push({ g: g.id, qi: g.i, u: uid, text, at: now() });
  if (g.i + 1 >= 20) { Object.assign(g, { status: "done", i: 20, asked: 0 }); award(g.a, 40, "game"); award(g.b, 40, "game"); log(g.a, "game", "🎲 Finished 20 Questions"); log(g.b, "game", "🎲 Finished 20 Questions"); } else { g.i++; g.asked = 0; } }
const gameWith = (a, b) => D.games.filter(g => (g.a === a && g.b === b) || (g.a === b && g.b === a)).pop();
function route(m, path, q, b, tok) {
  const E = (c, t) => [c, { error: t }], O = [200, { ok: true }];
  if (path === "/health") return O;
  if (path === "/username") { const x = String(q.get("u") || "").toLowerCase(); return [200, { available: /^[a-z0-9_.]{3,20}$/.test(x) && !D.users.some(u => u.username === x) }]; }
  if (path === "/signup" && m === "POST") { const un = String(b.username || "").trim().toLowerCase(), em = String(b.email || "").trim().toLowerCase(), pw = String(b.password || "");
    if (!/^[a-z0-9_.]{3,20}$/.test(un)) return E(400, "Username: 3-20 letters, numbers, _ or ."); if (!/^\S+@\S+\.\S+$/.test(em)) return E(400, "Enter a valid email"); if (pw.length < 8) return E(400, "Password must be at least 8 characters"); 
    if (D.users.some(x => x.email === em)) return E(409, "That email already has an account"); if (D.users.some(x => x.username === un)) return E(409, "That username is already taken");
    const nu = { id: nid(), email: em, username: un, name: un, age: 0, gender: "", bio: String(b.bio || "").slice(0, 160), area: "", fav: "", look: [], interests: [], avatar: b.avatar || {}, photo: /^data:image\/(jpeg|png|webp);base64,/.test(b.photo || "") ? b.photo : "", game: {}, pw, loc: -1, seen: 0, bot: 0 }; D.users.push(nu); return [201, { token: "demo-" + nu.id + ".0", user: full(nu) }]; }
  if (path === "/login" && m === "POST") { const idf = String(b.identifier || b.email || "").trim().toLowerCase(), x = D.users.find(u => !u.bot && (u.email === idf || u.username === idf)); if (!x || x.pw !== String(b.password || "")) return E(401, "Incorrect email/username or password"); return [200, { token: "demo-" + x.id + "." + (x.tv || 0), user: full(x) }]; }
  if (path === "/forgot" && m === "POST") { const id = String(b.identifier || "").trim().toLowerCase(), x = D.users.find(u => !u.bot && (u.email === id || u.username === id)); let code; if (x) { code = String(Math.floor(Math.random() * 1e6)).padStart(6, "0"); x.rc = code; x.rx = now() + 9e5; } return [200, { ok: true, message: "If that account exists, a 6-digit code was sent to its email.", devCode: code }]; }
  if (path === "/reset" && m === "POST") { const id = String(b.identifier || "").trim().toLowerCase(), x = D.users.find(u => !u.bot && (u.email === id || u.username === id)); if (String(b.password || "").length < 8) return E(400, "Password must be at least 8 characters"); if (!x || !x.rc || x.rx < now() || String(b.code || "").trim() !== x.rc) return E(400, "That code is wrong or expired. Ask for a new one."); x.pw = String(b.password); x.rc = null; x.tv = (x.tv || 0) + 1; return [200, { ok: true, token: "demo-" + x.id + "." + x.tv, user: full(x) }]; }
  const tp = String(tok || "").replace("demo-", "").split("."), u = U(+tp[0]); if (!u || (u.tv || 0) !== +(tp[1] || 0)) return E(401, "Please log in");
  if (path === "/me" && m === "GET") return [200, full(u)];
  if (path === "/me" && m === "PUT") {
    if (b.username !== undefined) { const un = String(b.username).trim().toLowerCase(); if (!/^[a-z0-9_.]{3,20}$/.test(un)) return E(400, "Username: 3-20 letters, numbers, _ or ."); if (D.users.some(x => x.username === un && x.id !== u.id)) return E(409, "That username is already taken"); u.username = un; u.name = un; }
    if (b.bio !== undefined) u.bio = String(b.bio).slice(0, 160); if (b.area !== undefined) u.area = String(b.area).slice(0, 30); if (b.fav !== undefined) u.fav = String(b.fav).slice(0, 30);
    if (Array.isArray(b.look)) u.look = b.look.slice(0, 4); if (Array.isArray(b.interests)) u.interests = b.interests.slice(0, 5); if (b.avatar) u.avatar = b.avatar; if (b.photo !== undefined) u.photo = b.photo || ""; if (b.game) u.game = b.game; return [200, full(u)]; }
  if (path === "/presence" && m === "POST") { const l = Math.trunc(+b.loc); if (!(l >= -1 && l <= 8)) return E(400, "Bad location"); u.loc = l; u.seen = now(); return O; }
  if (path === "/people") { const L = q.get("loc"), list = D.users.filter(x => x.id !== u.id && !blocked(u.id, x.id));
    if (L !== null) return [200, list.filter(x => x.loc === +L && online(x)).map(pub)]; const s = (q.get("q") || "").toLowerCase(); return [200, list.filter(x => x.username.includes(s)).slice(0, 50).map(pub)]; }
  if (path === "/matches" && m === "POST") { const to = +b.to, o = U(to); if (!o || to === u.id || blocked(u.id, to)) return E(400, "Cannot match"); const ex = rel(u.id, to);
    if (ex && ex.status === "pending" && ex.to === u.id) { ex.status = "accepted"; award(u.id, 25, "match"); award(to, 25, "match"); return [200, { pct: ex.pct, status: "matched" }]; }
    if (ex && ex.status !== "accepted" && (u.boost || 0) > now()) { ex.status = "accepted"; award(u.id, 25, "match"); award(to, 25, "match"); return [200, { pct: ex.pct, status: "matched", boost: true }]; }
    if (ex) return [200, { pct: ex.pct, status: ex.status === "accepted" ? "matched" : ex.status === "declined" ? "declined" : "sent" }];
    const { pct, why } = compat(u, o), boost = (u.boost || 0) > now(); if (pct <= 20 && !boost) { log(u.id, "match", "💔 Match with @" + o.username + " didn't work out (" + pct + "%)"); return [200, { pct, why, status: "low" }]; }
    const auto = pct >= 95 || boost; if (auto) { award(u.id, 25, "match"); award(to, 25, "match"); } else award(u.id, 5, "sent", 25); D.req.push({ id: nid(), from: u.id, to, status: auto ? "accepted" : "pending", pct, at: now() }); log(u.id, "match", (auto ? "💘 Instantly matched with @" : "💘 Sent a match to @") + o.username + " (" + pct + "%)"); return [200, { pct, why, status: auto ? "matched" : "sent" }]; }
  if (path === "/matches" && m === "GET") { const mine = D.req.filter(r => r.from === u.id || r.to === u.id);
    return [200, { incoming: mine.filter(r => r.to === u.id && r.status === "pending").sort((a, c) => c.at - a.at).map(r => ({ requestId: r.id, pct: r.pct, user: pub(U(r.from)) })),
      matches: mine.filter(r => r.status === "accepted").map(r => { const o = U(r.from === u.id ? r.to : r.from), ms = between(u.id, o.id), l = ms[ms.length - 1]; return { pct: r.pct, user: pub(o), talking: r.pct >= 90 || streak3(u.id, o.id), photoUnlocked: ms.length >= 100, count: ms.length, last: l ? { from_id: l.from, text: l.text, created: l.at } : null }; }),
      sent: mine.filter(r => r.from === u.id && r.status === "pending").map(r => ({ pct: r.pct, user: pub(U(r.to)) })) }]; }
  let mm = path.match(/^\/matches\/(\d+)\/respond$/);
  if (mm && m === "POST") { const r = D.req.find(x => x.id === +mm[1] && x.to === u.id && x.status === "pending"); if (!r) return E(404, "Match request not found"); r.status = b.accept ? "accepted" : "declined"; if (b.accept) { award(u.id, 25, "match"); award(r.from, 25, "match"); log(u.id, "match", "🎉 You accepted a match"); log(r.from, "match", "🎉 Someone accepted your match"); } return O; }
  mm = path.match(/^\/messages\/(\d+)$/);
  if (mm) { const o = +mm[1]; if (!friends(u.id, o) || blocked(u.id, o)) return E(403, "You can only chat with friends");
    if (m === "GET") return [200, between(u.id, o).filter(x => x.id > (+q.get("after") || 0)).slice(0, 100).map(x => ({ id: x.id, from_id: x.from, text: x.text, created: x.at }))];
    const t = String(b.text || "").trim().slice(0, 500); if (!t) return E(400, "Empty message"); D.msg.push({ id: nid(), from: u.id, to: o, text: t, at: now() }); award(u.id, 2, "msg", 40); return [201, { ok: true }]; }
  if (path === "/games/invite" && m === "POST") { const o = +b.userId; if (!friends(u.id, o) || blocked(u.id, o)) return E(403, "You can only play with your matches");
    if (D.games.some(g => ["invited", "playing"].includes(g.status) && ((g.a === u.id && g.b === o) || (g.a === o && g.b === u.id)))) return E(409, "A game is already open");
    const g = { id: nid(), a: u.id, b: o, status: "invited", qs: [], i: 0, asked: 0, at: now() }; D.games.push(g); return [201, { id: g.id }]; }
  mm = path.match(/^\/games\/(\d+)\/(respond|ask|answer)$/);
  if (mm && m === "POST") { const g = D.games.find(x => x.id === +mm[1] && (x.a === u.id || x.b === u.id)); if (!g) return E(404, "Game not found");
    if (mm[2] === "respond") { if (g.b !== u.id || g.status !== "invited") return E(403, "Only the invited player can answer"); if (!b.accept) g.status = "declined"; else startGame(g); return O; }
    if (g.status !== "playing") return E(400, "Game is not running"); const asker = g.i % 2 === 0 ? g.a : g.b;
    if (mm[2] === "ask") { if (u.id !== asker || g.asked) return E(403, "Not your turn to ask"); g.asked = 1; return O; }
    if (u.id === asker || !g.asked) return E(403, "Not your turn to answer"); const t = String(b.text || "").trim().slice(0, 300); if (!t) return E(400, "Write an answer"); answer(g, u.id, t); return O; }
  mm = path.match(/^\/games\/with\/(\d+)$/);
  if (mm && m === "GET") { const g = gameWith(u.id, +mm[1]); if (!g) return [200, null]; const asker = g.i % 2 === 0 ? g.a : g.b;
    return [200, { id: g.id, status: g.status, inviter: g.a, i: g.i, history: g.qs.slice(0, g.i).map((q2, k) => ({ q: q2, asker: k % 2 === 0 ? g.a : g.b, answer: (D.ans.find(x => x.g === g.id && x.qi === k) || {}).text })),
      cur: g.status === "playing" ? { q: u.id === asker || g.asked ? g.qs[g.i] : null, asker, yourTurnToAsk: u.id === asker && !g.asked, yourTurnToAnswer: u.id !== asker && !!g.asked } : null }]; }
  if (path === "/qa" && m === "GET") return [200, D.ans.filter(a => { const g = D.games.find(x => x.id === a.g); return g && (g.a === u.id || g.b === u.id); }).sort((x, y) => y.at - x.at).slice(0, 30).map(a => { const g = D.games.find(x => x.id === a.g); return { questionId: g.qs[a.qi], answer: a.text, answeredBy: a.u === u.id ? "you" : "them", with: U(g.a === u.id ? g.b : g.a).username, at: a.at }; })];
  const d = DAILY[new Date(now() + 3600000).getUTCDay()], mine = D.daily.filter(x => x.u === u.id);
  if (path === "/daily" && m === "GET") { const a = mine.find(x => x.day === day()), days = new Set(mine.map(x => x.day)); let streak = 0; for (let o = a ? 0 : 1; days.has(day(o)); o++) streak++;
    return [200, { title: d[0], question: d[1], options: d[2], streak, answered: a ? { answer: a.answer, correct: a.correct, ok: a.ok } : null, history: mine.slice().sort((x, y) => (y.day > x.day ? 1 : -1)).slice(0, 7).map(x => ({ day: x.day, q: x.q, answer: x.answer, correct: x.correct, ok: x.ok })) }]; }
  if (path === "/daily/answer" && m === "POST") { const opt = Math.trunc(+b.option); if (!(opt >= 0 && opt < d[2].length)) return E(400, "Pick one of the options"); if (mine.some(x => x.day === day())) return E(409, "Already answered today");
    const ok = opt === d[3]; award(u.id, ok ? 30 : 10, "daily"); D.daily.push({ u: u.id, day: day(), q: d[1], answer: d[2][opt], correct: d[2][d[3]], ok }); log(u.id, "daily", "🗓️ Answered the daily question: " + d[2][opt] + (ok ? " ✅" : " ❌")); return [200, { ok, correct: d[2][d[3]] }]; }
  if (path === "/xp" && m === "GET") return [200, xpInfo(u)];
  if (path === "/xp/boost" && m === "POST") { const i = xpInfo(u); if (i.today < 200) return E(400, "Earn 200 XP today first"); if (i.claimed) return E(409, "You already used today’s Lagos Charm"); D.xpe.push({ u: u.id, day: day(), amt: 0, why: "boost" }); u.boost = now() + 36e5; log(u.id, "daily", "⚡ Lagos Charm on for 1 hour"); return [200, xpInfo(u)]; }
  if (path === "/activity" && m === "POST") { if (!["act", "rest"].includes(b.kind)) return E(400, "Bad kind"); log(u.id, b.kind, b.text || ""); if (b.kind === "act") award(u.id, 10, "act", 100); return O; }
  if (path === "/activity" && m === "GET") { const dq = q.get("day") || day(), st = Date.parse(dq + "T00:00:00Z") - 3600000; return [200, D.act.filter(x => x.u === u.id && x.at >= st && x.at < st + 864e5).map(x => ({ kind: x.kind, text: x.text, created: x.at }))]; }
  if (path === "/profile-views" && m === "POST") { const to = +b.userId; if (to && to !== u.id && U(to) && !blocked(u.id, to)) { D.views = D.views.filter(v => !(v.v === u.id && v.to === to)); D.views.push({ v: u.id, to, at: now() }); } return O; }
  if (path === "/visitors" && m === "GET") return [200, D.views.filter(v => v.to === u.id && !blocked(u.id, v.v)).sort((x, y) => y.at - x.at).slice(0, 50).map(v => ({ user: pub(U(v.v)), at: v.at }))];
  mm = path.match(/^\/photo\/(\d+)$/);
  if (mm && m === "GET") { const o = +mm[1]; if (!friends(u.id, o) || blocked(u.id, o) || between(u.id, o).length < 100) return E(403, "Photos unlock after 100 messages"); return [200, { photo: (U(o) || {}).photo || "" }]; }
  if (path === "/block" && m === "POST") { D.blocks.push([u.id, +b.userId]); return O; }
  if (path === "/report" && m === "POST") return O;
  return E(404, "Not found");
}
function tick() { try { const t = now(), bots = D.users.filter(x => x.bot), humans = D.users.filter(x => !x.bot && x.seen > t - 90000);
  bots.forEach(x => x.seen = t); if (Math.random() < 0.08) pick(bots).loc = Math.floor(Math.random() * 9);
  D.req.filter(r => r.status === "pending" && U(r.to).bot && r.at < t - 3500).forEach(r => { r.status = hnum(r.id) % 100 < (r.pct >= 50 ? 85 : 55) ? "accepted" : "declined"; if (r.status === "accepted") { award(r.from, 25, "match"); award(r.to, 25, "match"); } });
  D.users.filter(x => !x.bot).forEach(h => bots.forEach(bt => { const ms = between(h.id, bt.id), l = ms[ms.length - 1]; if (l && l.from === h.id && l.at < t - 1500 && friends(h.id, bt.id)) D.msg.push({ id: nid(), from: bt.id, to: h.id, text: pick(BR), at: t }); }));
  D.games.forEach(g => { const bB = U(g.b); if (g.status === "invited" && bB.bot && g.at < t - 2500) { if (hnum(g.id) % 100 < 75) startGame(g); else g.status = "declined"; }
    else if (g.status === "playing" && Math.random() < 0.5) { const asker = g.i % 2 === 0 ? g.a : g.b, ans = asker === g.a ? g.b : g.a; if (U(asker).bot && !g.asked) g.asked = 1; else if (U(ans).bot && g.asked) answer(g, ans, pick(BA)); } });
  if (humans.length && Math.random() < 0.02) { const h = pick(humans), bt = pick(bots), pct = compat(bt, h).pct; if (pct > 20 && !rel(bt.id, h.id) && !blocked(bt.id, h.id)) D.req.push({ id: nid(), from: bt.id, to: h.id, status: "pending", pct, at: t }); }
  if (humans.length && Math.random() < 0.03) { const h = pick(humans), bt = pick(bots); D.views = D.views.filter(v => !(v.v === bt.id && v.to === h.id)); D.views.push({ v: bt.id, to: h.id, at: t }); }
  save(); } catch (e) {} }
const demoFetch = async (url, o = {}) => { const [p, qs] = String(url).slice(4).split("?"); let b = {}; try { b = o.body ? JSON.parse(o.body) : {}; } catch (e) {}
  const [c, j] = route(o.method || "GET", p, new URLSearchParams(qs || ""), b, ((o.headers || {}).Authorization || "").replace("Bearer ", "")); save();
  return new Response(JSON.stringify(j), { status: c, headers: { "Content-Type": "application/json" } }); };
const real = globalThis.fetch.bind(globalThis);
const alive = async b => { try { const r = await real(b + "/health"); const j = await r.json(); return r.ok && !!j && j.ok === true; } catch (e) { return false; } };
async function decide() { // returns the backend address ("" = same address) or null = no backend, use demo mode
  if (globalThis.LIL_DEMO) return null;
  const cfg = globalThis.LIL_API;
  const local = location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]", ""].includes(location.hostname); // only hunt for a backend on this computer when the page is on this computer
  for (const b of typeof cfg === "string" ? [cfg.replace(/\/$/, "")] : location.protocol === "file:" ? ["http://localhost:3000"] : local ? ["", "http://localhost:3000"] : [""]) if (await alive(b)) return b;
  return null; }
function demoOn() { setInterval(tick, 1500); const e = document.createElement("div"); e.textContent = globalThis.LIL_DEMO ? "Preview · demo people" : "Demo mode · no server found"; e.style.cssText = "position:fixed;left:8px;bottom:76px;z-index:40;background:#3b2a3a;color:#fff;font:700 11px system-ui,sans-serif;border-radius:99px;padding:4px 12px;opacity:.9;cursor:pointer";
  e.onclick = () => globalThis.LIL_DEMO ? alert("This is a preview with pretend people. Everything is saved only in this browser.") : alert("No backend server was found, so this is running in DEMO mode: pretend people, and everything is saved only in this browser.\n\nTo run the real app, start the backend (open the backend folder, run: node server.mjs) and reload this page."); document.body.appendChild(e); }
let ready = null;
globalThis.fetch = async (url, o) => { if (!String(url).startsWith("/api")) return real(url, o);
  if (!ready) ready = decide().then(b => { if (b === null) demoOn(); return b; });
  const base = await ready; return base === null ? demoFetch(url, o) : real(base + url, o); };
})();
