'use strict';
// =====================================================================
//  SARCHITECT — Level 3: Nothelfer Zug (first aid in Kanton Zug)
//  Loaded after index.html and california.js; shares their globals.
//  A refresher of the Swiss Nothelferkurs basics. It does NOT replace a real course!
//  Edit FINAL_MESSAGE_3 below for the Level 3 ending (en / de / gsw).
// =====================================================================
const FINAL_MESSAGE_3 = {
  en: "Sarah,\n" +
    "you broke into buildings, survived lions, wildfires and Mt Shasta, and now you can save lives too.\n" +
    "You've always been the person everyone feels safe with. Now it's official.\n" +
    "I love you. — C-Real ♥",
  de: "Sarah,\n" +
    "du bist in Gebäude eingebrochen, hast Löwen, Waldbrände und den Mt Shasta überlebt, und jetzt kannst du auch Leben retten.\n" +
    "Bei dir haben sich alle schon immer sicher gefühlt. Jetzt ist es offiziell.\n" +
    "Ich liebe dich. — C-Real ♥",
  gsw: "Sarah,\n" +
    "du bisch i Gebäud iibroche, hesch Löie, Waldbränd und de Mt Shasta überläbt, und jetzt chasch au Läbe rette.\n" +
    "Bi dir händ sich alli scho immer sicher gfühlt. Jetzt isch es offiziell.\n" +
    "Ich ha di mega gern. — C-Real ♥",
};
const L3 = () => ST.l3;
const st3 = (k, n = 1) => { L3().stats[k] = (L3().stats[k] || 0) + n; };

// ---------------------------------------------------------------- world layout (100 x 70 tiles)
const L3_W = 100, L3_H = 70;
const l3Zone = (tx, ty) => tx < 30 ? 'lake' : tx >= 80 ? 'aegeri' : ty < 30 ? (tx < 62 ? 'baar' : 'tobel') : (tx < 56 ? 'zug' : 'berg');
const zugerseeEdge = ty => 22 + 3 * Math.sin(ty * .2);
const aegeriEdge = ty => 86 + 2 * Math.sin(ty * .25);
const lorzeX = ty => 70 + 3 * Math.sin(ty * .35);
const oldTown = (tx, ty) => tx >= 30 && tx <= 44 && ty >= 34 && ty <= 50;
function l3Base(tx, ty) {
  const z = l3Zone(tx, ty);
  if (z === 'lake') return ty > 6 && tx < zugerseeEdge(ty) + 2.5 ? T.SAND : T.G;
  if (z === 'tobel') return T.F;
  if (z === 'berg') return T.ALP;
  if (z === 'aegeri') return tx > aegeriEdge(ty) - 2.5 && ty > 16 && ty < 62 ? T.SAND : T.G;
  if (z === 'zug' && oldTown(tx, ty)) return T.COB;
  return T.G;
}
function l3Terrain(tx, ty, r) {
  const z = l3Zone(tx, ty); let t = l3Base(tx, ty); const k = r();
  if (z === 'baar') { if (k < .03) t = T.TREE; else if (k < .06) t = T.FLOW; }
  else if (z === 'tobel') { if (k < .14) t = T.TREE; else if (k < .24) t = T.PINE; }
  else if (z === 'berg') { if (k < .1) t = T.PINE; else if (k < .13) t = T.TREE; }
  else if (z === 'aegeri') { if (k < .04) t = T.TREE; }
  else if (z === 'zug' && !oldTown(tx, ty)) { if (k < .025) t = T.TREE; else if (k < .04) t = T.FLOW; }
  else if (z === 'lake' && t === T.G) { if (k < .03) t = T.TREE; }
  if (ty > 6 && tx < zugerseeEdge(ty)) t = T.WATER;
  if (ty > 16 && ty < 62 && tx > aegeriEdge(ty)) t = T.WATER;
  if (ty < 30 && tx >= lorzeX(ty) && tx < lorzeX(ty) + 2) t = T.WATER;   // the Lorze in its gorge
  if (tx === 0 || ty === 0 || tx === L3_W - 1 || ty === L3_H - 1) t = tx < 25 && ty > 6 ? T.WATER : T.PINE;
  return t;
}
const road = pts => pts, path3 = pts => Object.assign(pts, { trail: true });
const L3_PATHS = [
  path3([[49, 57], [53, 58]]), path3([[65, 49], [70, 58], [73, 63]]), path3([[60, 15], [64, 25]]),
  road([[45, 3], [45, 66]]),                                         // Baarerstrasse, Baar - Zug
  road([[45, 14], [60, 14], [72, 16], [82, 20], [81, 26]]),          // Baar - Lorzentobel - Ägeri
  road([[81, 26], [81, 60]]),                                        // along the Ägerisee
  road([[45, 32], [31, 32], [31, 64]]),                              // to the lake promenade
  road([[31, 44], [45, 44]]),                                        // old town
  road([[45, 8], [24, 8]]),                                          // towards Cham
];
const L3_BUILDINGS = [
  { id: 'bahnhof', x: 48, y: 16, w: 6, h: 3, kind: 'bahnhof' },
  { id: 'samariter', x: 36, y: 10, w: 6, h: 4, kind: 'samariter', label: 'Course' },
  { id: 'hoell', x: 62, y: 22, w: 5, h: 3, kind: 'cave', label: 'Höllgrotten' },
  { id: 'pharmacy', x: 40, y: 36, w: 4, h: 3, kind: 'pharmacy' },
  { id: 'zytturm', x: 36, y: 36, w: 3, h: 4, kind: 'zytturm' },
  { id: 'cafe', x: 36, y: 46, w: 5, h: 3, kind: 'cafe', label: 'Confiserie' },
  { id: 'funi', x: 48, y: 54, w: 3, h: 3, kind: 'funi', label: 'Zugerbergbahn' },
  { id: 'funitop', x: 64, y: 46, w: 3, h: 3, kind: 'funi', label: 'Zugerbergbahn' },
  { id: 'zh1', x: 52, y: 6, w: 4, h: 3, kind: 'house', wall: '#f3efe6', roof: '#a8432f' },
  { id: 'zh2', x: 36, y: 20, w: 4, h: 3, kind: 'house', wall: '#efe7d4', roof: '#5b5b66' },
  { id: 'zh3', x: 48, y: 40, w: 4, h: 3, kind: 'house', wall: '#f5f0e0', roof: '#7a4b2a' },
  { id: 'zh4', x: 84, y: 8, w: 4, h: 3, kind: 'house', wall: '#f3efe6', roof: '#3d6fb5' },
];
const L3_CR_SPOTS = {
  baar3: { x: 56 * 16 + 8, y: 21 * 16 + 10, pose: 'kit' }, zug3: { x: 33 * 16 + 8, y: 40 * 16 + 10, pose: 'busk' },
  aegeri3: { x: 82 * 16 + 8, y: 33 * 16 + 10, pose: 'baar' }, berg3: { x: 67 * 16 + 8, y: 52 * 16 + 10, pose: 'mount' },
};
const L3_START = { x: 51 * 16 + 8, y: 20 * 16 + 10 };
const at16 = (tx, ty) => ({ x: tx * 16 + 8, y: ty * 16 + 10 });
// where the emergencies happen (cases with a building use the building door)
const CASE_SPOTS = { cpr: at16(38, 42), seefest: at16(27, 52), burn: at16(83, 40), tobel: at16(66, 15), hiker: at16(73, 63) };
const CHERRY_TREES = [[50, 26], [40, 28], [33, 58], [52, 47], [78, 8], [58, 9], [86, 66]];
const L3_SIGNS = [
  { x: 43 * 16 + 8, y: 15 * 16 + 4, act: () => say([['Sign', 'BAAR. Home of the Höllgrotten caves, the Lorze and the best cherries in the canton.']]) },
  { x: 34 * 16 + 8, y: 33 * 16 + 4, act: () => say([['Sign', 'ZUG. Lake, old town, Zytturm and Zuger Kirschtorte. Population: very relaxed.']]) },
  { x: 62 * 16 + 8, y: 12 * 16 + 4, act: () => say([['Sign', 'LORZENTOBEL. Winding road, narrow bridges. Drive carefully!']]) },
  { x: 41 * 16 + 8, y: 39 * 16 + 4, act: () => say([['Sign', 'AED (defibrillator) available here 24/7. Green sign with a heart and a lightning bolt.']]) },
];

// ---------------------------------------------------------------- entities
let swans = [], cows = [], cherryTrees = [], strollers = [];
function l3Spawn() {
  const at = (tx, ty) => { const [x, y] = nearReach(tx, ty); return { x: x * 16 + 8, y: y * 16 + 10 }; };
  swans = [[14, 30], [18, 44], [12, 56], [92, 30], [94, 50]].map(([a, b]) => ({ x: a * 16, y: b * 16, hx: a * 16, hy: b * 16, ph: rnd() * 6 }));
  cows = [[62, 58], [68, 60], [74, 52], [60, 64]].map(([a, b]) => { const p = at(a, b); return { ...p, hx: p.x, hy: p.y, t: 0, vx: 0, vy: 0, face: 1 }; });
  cherryTrees = CHERRY_TREES.map(([a, b], i) => ({ ...at(a, b), id: i, picked: 0 }));
  strollers = [[40, 42], [33, 50], [48, 24], [84, 44]].map(([a, b], i) => { const p = at(a, b); return { ...p, hx: p.x, hy: p.y, t: 0, vx: 0, vy: 0, face: 1, anim: 0, col: ['#3a7bd5', '#d9a400', '#8a5ad0', '#5aa05a'][i] }; });
}
function l3Update(dt) {
  for (const s of swans) { s.ph += dt * .3; s.x = s.hx + Math.sin(s.ph) * 30; s.y = s.hy + Math.cos(s.ph * .7) * 18; }
  for (const c of cows) wander(c, dt, 8, 40, 6);
  for (const w of strollers) { wander(w, dt, 18, 60, 3); if (w.vx || w.vy) w.anim += dt; }
  for (const c of cherryTrees) c.picked = Math.max(0, c.picked - dt);
}
function drawSwan(s) { const x = Math.round(s.x), y = Math.round(s.y); ell(x, y, 7, 3, '#ffffff'); R(x + 4, y - 7, 2, 6, '#ffffff'); R(x + 5, y - 8, 3, 2, '#ffffff'); R(x + 7, y - 7, 2, 1, '#f08a24'); R(x + 6, y - 7, 1, 1, '#111'); R(x - 8, y + 2, 16, 1, 'rgba(255,255,255,.4)'); }
function drawCow(c) {
  const x = Math.round(c.x), y = Math.round(c.y), f = c.face || 1; shadow(x, y, 9);
  R(x - 8, y - 10, 16, 8, '#8a5a3a'); R(x - 8, y - 10, 16, 2, '#a06c48'); R(x - 7, y - 3, 2, 3, '#5a3a22'); R(x + 5, y - 3, 2, 3, '#5a3a22');
  const hx = f > 0 ? x + 7 : x - 12; R(hx, y - 13, 5, 6, '#8a5a3a'); R(hx + (f > 0 ? 2 : 0), y - 9, 3, 2, '#e6cdb0'); R(hx, y - 14, 1, 2, '#eee'); R(hx + 4, y - 14, 1, 2, '#eee');
  R(x + (f > 0 ? 5 : -7), y - 5, 3, 3, '#d9a400');
}
function drawCherryTree(c) {
  const x = Math.round(c.x), y = Math.round(c.y); shadow(x, y, 10);
  R(x - 2, y - 12, 4, 12, '#6a3a22'); circ(x, y - 18, 11, '#3a7a34'); circ(x - 5, y - 21, 6, '#4a9a40');
  if (c.picked <= 0) for (let i = 0; i < 6; i++) { const cx = x - 8 + hash(i, c.id) % 16, cy = y - 24 + hash(i + 5, c.id) % 12; circ(cx, cy, 1.6, '#c8102e'); R(cx, cy - 3, 1, 2, '#2a5a2a'); }
}
function drawStroller(w) { drawPerson(w.x, w.y, { shirt: w.col, pants: '#3a3a4a', anim: w.vx || w.vy ? w.anim : 0 }); }
// a little casualty marker: a person lying on the ground with a pulsing alert
function drawIncident(id, x, y) {
  const done = !!L3().cases[id];
  if (done) { R(x - 1, y - 14, 1, 14, '#ddd'); R(x, y - 14, 7, 5, '#2a9a4a'); R(x + 2, y - 13, 3, 1, '#fff'); R(x + 3, y - 14, 1, 3, '#fff'); return; }
  if (!L3().cases.course) return;
  g.save(); g.translate(x, y); g.rotate(-Math.PI / 2); drawPerson(0, 0, { shirt: '#4a6aa0', pants: '#3a3a4a' }); g.restore();
  const p = .5 + .5 * Math.sin(time * 6); circ(x, y - 26, 6 + p * 2, `rgba(220,40,40,${.35 + p * .3})`); R(x - 1, y - 30, 2, 6, '#fff'); R(x - 1, y - 23, 2, 2, '#fff');
}
// C-Real carrying the first aid kit (green cross, not the protected red cross emblem)
CR_POSE.kit = { front(x, y) { R(x + 4, y - 9, 8, 6, '#2a9a4a'); R(x + 7, y - 8, 2, 4, '#ffffff'); R(x + 6, y - 7, 4, 2, '#ffffff'); R(x + 6, y - 10, 4, 1, '#1a6a2a'); } };

// ---------------------------------------------------------------- buildings
function l3DrawBuilding(b, x, y, w, h) {
  const cx = x + w / 2, sh = () => R(x + 3, y + h - 1, w, 4, 'rgba(0,0,0,.3)');
  switch (b.kind) {
    case 'bahnhof':
      sh(); R(x, y + 6, w, h - 6, '#e8e0d0'); R(x - 4, y, w + 8, 8, '#c8102e'); R(x - 4, y + 2, w + 8, 1, '#ffffff');
      for (let i = 0; i < 5; i++) R(x + 6 + i * 18, y + 14, 10, 12, '#8ab0d0');
      R(x + w - 16, y - 14, 12, 12, '#ffffff'); circ(x + w - 10, y - 8, 5, '#222'); circ(x + w - 10, y - 8, 4, '#fff'); R(x + w - 10, y - 11, 1, 3, '#111'); R(x + w - 10, y - 8, 3, 1, '#c8102e');
      return true;
    case 'samariter':   // course room with the green first-aid cross
      sh(); R(x, y + 8, w, h - 8, '#f2ece0'); R(x - 3, y - 2, w + 6, 12, '#5b5b66'); for (let i = 0; i < 4; i++) R(x + 8 + i * 22, y + 22, 12, 12, '#cfe0ff');
      R(cx - 9, y + 10, 18, 10, '#2a9a4a'); R(cx - 2, y + 11, 4, 8, '#fff'); R(cx - 6, y + 13, 12, 4, '#fff'); R(cx - 7, y + h - 18, 14, 18, '#5a3a22');
      return true;
    case 'cave':   // entrance to the Höllgrotten
      ell(cx, y + h - 6, w / 2 + 6, h - 2, '#6a625a'); ell(cx, y + h - 2, w / 2 - 6, h - 14, '#1a1410');
      for (let i = 0; i < 5; i++) poly([[cx - 22 + i * 11, y + 16], [cx - 19 + i * 11, y + 26 + (i % 2) * 6], [cx - 16 + i * 11, y + 16]], '#8a827a');
      return true;
    case 'pharmacy':
      sh(); R(x, y + 6, w, h - 6, '#f4f4f0'); R(x - 2, y, w + 4, 8, '#2a9a4a'); R(x + 6, y + 14, 14, 14, '#cfe0ff'); R(cx + 6, y + h - 18, 12, 18, '#4a6a5a');
      R(x + w - 18, y + 16, 12, 12, '#2a9a4a'); poly([[x + w - 13, y + 18], [x + w - 15, y + 23], [x + w - 12, y + 23], [x + w - 14, y + 27]], '#ffffff');   // AED box
      return true;
    case 'zytturm':   // Zug's clock tower with its blue-and-white roof
      sh(); R(x + 6, y - 34, w - 12, h + 34, '#e8dcc0'); for (let j = 0; j < h + 34; j += 6) R(x + 6, y - 34 + j, w - 12, 1, '#d8ccb0');
      for (let i = 0; i < 6; i++) poly([[x + 2 + i * 6, y - 34], [x + 5 + i * 6, y - 54], [x + 8 + i * 6, y - 34]], i % 2 ? '#3d6fb5' : '#ffffff');
      circ(cx, y - 18, 8, '#1a2a4a'); circ(cx, y - 18, 6, '#d9b47a'); R(cx, y - 23, 1, 5, '#111'); R(cx, y - 18, 4, 1, '#111');
      R(cx - 6, y + h - 16, 12, 16, '#4a3a2a');
      return true;
    case 'cafe':   // Confiserie with a giant Zuger Kirschtorte in the window
      sh(); R(x, y + 6, w, h - 6, '#fbeee0'); R(x - 3, y, w + 6, 8, '#e86fa8'); for (let i = 0; i < w + 6; i += 8) R(x - 3 + i, y, 4, 8, '#ffffff');
      R(x + 6, y + 16, 26, 16, '#cfe0ff'); ell(x + 19, y + 28, 10, 3, '#f4e4c8'); R(x + 10, y + 22, 18, 6, '#f8d8a0'); R(x + 10, y + 21, 18, 2, '#f4c4d0');
      R(cx + 10, y + h - 18, 12, 18, '#7a4a3a');
      return true;
    case 'funi':   // Zugerbergbahn station with its little red car
      sh(); R(x, y + 8, w, h - 8, '#c8c0b0'); R(x - 3, y + 2, w + 6, 8, '#4a5a6a');
      R(cx - 12, y + 18, 24, 14, '#c8102e'); R(cx - 9, y + 21, 7, 5, '#cfe0ff'); R(cx + 2, y + 21, 7, 5, '#cfe0ff'); R(cx - 12, y + 31, 24, 2, '#333');
      return true;
  }
  return false;
}
function l3DrawGround() { }
function l3Drawables(D, vis) {
  const add = (o, f) => { if (vis(o.x, o.y)) D.push({ y: o.y, f }); };
  for (const s of swans) add(s, () => drawSwan(s));
  for (const c of cows) add(c, () => drawCow(c));
  for (const c of cherryTrees) add(c, () => drawCherryTree(c));
  for (const w of strollers) add(w, () => drawStroller(w));
  for (const k in CASE_SPOTS) { const s = CASE_SPOTS[k]; add(s, () => drawIncident(k, s.x, s.y)); }
}
function l3WorldLabels(ox, oy) {
  const near = (b, label, col = '#fff', dy = 0) => { if (dist(b.doorX, b.doorY, P.x, P.y) < 170) txt(label, b.doorX + ox, b.y * 16 + oy + dy, 6.5, col, 'center', true); };
  near(BMAP.samariter, 'SAMARITERVEREIN BAAR', '#9fe0a0', -6); near(BMAP.cafe, 'CONFISERIE', '#ffd0e0', -8); near(BMAP.bahnhof, 'BAAR', '#ffffff', -8);
  near(BMAP.pharmacy, 'APOTHEKE · AED', '#9fe0a0', -6); near(BMAP.zytturm, 'ZYTTURM', '#ffffff', -62);
}
function l3Overlay() { if (curZone === 'tobel') { g.fillStyle = 'rgba(10,30,15,.15)'; g.fillRect(0, 0, VW, VH); } }

// ---------------------------------------------------------------- flight home (from California)
let FL3 = null;
function startFlight3() { saveGame(); transition(() => { scene = 'flight3'; FL3 = { t: 0 }; musI = 0; }); }
SCENES.flight3 = {
  music: 'ending',
  update(dt) { FL3.t += dt; if (FL3.t > 5.5 || (FL3.t > 1 && inp.a)) { FL3.t = -99; transition(() => { EN = null; SL = null; enterLevel(3); }); } },
  draw() {
    const gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, '#7cc4ee'); gr.addColorStop(.62, '#d8f0fa'); gr.addColorStop(.62, '#6aa84f'); gr.addColorStop(1, '#4a8a3a'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    drawMountains(134, '#8aa3c2', true, 21);
    R(0, 130, VW, VH - 130, '#6aa84f'); for (let i = 0; i < 8; i++) R(i * 52 - 10, 150 + (i % 3) * 14, 40, 8, i % 2 ? '#7ab85a' : '#5a9a42');   // Swiss fields
    R(0, 136, 110, 14, '#3f86c8'); R(0, 136, 110, 2, '#7ab8e8');   // Zürichsee
    for (let i = 0; i < 6; i++) { const cx2 = ((i * 80 - FL3.t * 30) % (VW + 80) + VW + 80) % (VW + 80) - 40; ell(cx2, 24 + i * 8, 22, 5, 'rgba(255,255,255,.75)'); }
    const px = -40 + Math.min(1, FL3.t / 5) * (VW + 80), py = 60 + FL3.t * 6;
    R(px - 20, py - 3, 40, 7, '#ffffff'); R(px + 14, py - 2, 8, 5, '#e8eef4'); poly([[px - 4, py], [px - 14, py + 16], [px - 6, py + 16], [px + 6, py]], '#d8e0e8');
    poly([[px - 18, py - 3], [px - 22, py - 12], [px - 16, py - 12], [px - 12, py - 3]], '#d52b1e'); R(px - 18, py - 10, 3, 1, '#fff'); R(px - 17, py - 11, 1, 3, '#fff');
    for (let i = 0; i < 6; i++) R(px - 10 + i * 4, py - 1, 2, 2, '#4a6a8a');
  },
  ui() { txt(t('San Francisco ✈ Zürich → Baar'), VW / 2, 176, 14, '#ffffff', 'center', true); txt(t('Level 3: Nothelfer Zug'), VW / 2, 196, 9, '#ffe08a', 'center', true); },
};
// ================================================================ FIRST AID CASES
// Content follows the Swiss Nothelferkurs / ERC basic life support. Choice options: [text, true] or [text, 'why it is wrong'].
const CASES = {
  course: {
    title: 'Samariter course', place: 'Samariterverein Baar', bg: 'course', building: 'samariter', amb: null,
    pat: { who: 'dummy', cons: '-', breath: '-', bleed: '-' },
    intro: [['Instructor', 'Grüezi and welcome to the Samariterverein Baar! Today: the Nothelferkurs refresher.'], ['C-Real', 'I\'m just here for the free coffee. And moral support. ☕']],
    steps: [
      { type: 'choice', ph: 0, q: 'In every emergency, first aiders follow three steps. Which order?', opts: [['Look – Think – Act', true], ['Act – Look – Think', 'Acting first can put you in danger. First LOOK: what happened, any dangers?'], ['Think – Act – Look', 'You can only think once you have looked. Look – Think – Act.']], ok: 'Schauen – Denken – Handeln: look at the scene, think about what\'s needed, then act.' },
      { type: 'choice', ph: 1, q: 'What is ALWAYS your first priority?', opts: [['My own safety', true], ['Speed: get to the patient as fast as possible', 'A second casualty helps nobody. Self-protection comes first.'], ['Taking a photo for the report', 'Please don\'t. Self-protection first, then help.']], ok: 'Exactly: protect yourself, secure the scene, then help.' },
      { type: 'choice', ph: 1, q: 'Which number calls the ambulance in Switzerland?', opts: [['144', true], ['117', '117 is the police.'], ['118', '118 is the fire brigade.'], ['1414', '1414 is Rega, the air rescue (great in the mountains).']], ok: '144: ambulance and medical emergencies.' },
      { type: 'choice', ph: 1, q: 'Somebody swallowed a cleaning product. Who gives advice?', opts: [['145, Tox Info Suisse', true], ['118', '118 is the fire brigade.'], ['1414', '1414 is Rega, the air rescue.']], ok: '145: Tox Info Suisse for poisoning questions. In an acute emergency: always 144.' },
      { type: 'choice', ph: 2, q: 'Before touching a bleeding wound you put on...', opts: [['Disposable gloves', true], ['Sunscreen', 'Nice for the beach, useless here. Gloves protect you from infections.'], ['Your nicest ring', 'Rings get in the way. Gloves protect you and the patient.']], ok: 'Gloves! There are some in every car first aid kit.' },
    ],
    done: [['Instructor', 'Great start! Now go out there: Kanton Zug needs you. 🩹']],
    card: { title: 'Look – Think – Act', text: 'LOOK: what happened, any dangers? THINK: what is needed, who can help? ACT: protect yourself, alert, help. Emergency numbers: 144 ambulance · 117 police · 118 fire · 1414 Rega · 145 Tox Info · 112 EU emergency.' },
  },
  cpr: {
    title: 'Cardiac arrest', place: 'Zytturm, Zug old town', bg: 'oldtown', spot: 'cpr', amb: 'ambulance',
    pat: { who: 'man', cons: '?', breath: '?', bleed: '-' },
    intro: [['Sarah', 'Someone just collapsed next to the Zytturm!'], ['C-Real', 'I\'m with you. Tell me what to do!']],
    steps: [
      { type: 'choice', ph: 0, q: 'A man lies on the cobblestones. First you...', opts: [['Check the scene for dangers (traffic, bikes)', true], ['Run straight across the road to him', 'Look first! A bus would make two patients.'], ['Wait until someone else helps', 'Every second counts. You ARE the someone.']], ok: 'The square is safe. You kneel down next to him.' },
      { type: 'choice', ph: 0, q: 'How do you check if he is conscious?', opts: [['Speak loudly and tap his shoulders: "Hello, can you hear me?"', true], ['Pour cold water on his face', 'No. Talk to him loudly and tap his shoulders.'], ['Look for his name in his wallet', 'Not now! Check consciousness: speak loudly, tap the shoulders.']], set: { cons: 'unresponsive' }, ok: 'No reaction. He is unresponsive.' },
      { type: 'choice', ph: 1, q: 'He doesn\'t respond. Now you check his breathing:', opts: [['Tilt the head back, lift the chin, look, listen and feel for up to 10 seconds', true], ['Listen for one whole minute', 'Too long! Check for no more than 10 seconds.'], ['Feel for a pulse at the wrist', 'Pulse checks are unreliable for first aiders. Check breathing, max. 10 seconds.']], set: { breath: 'none' }, ok: 'Only rare gasps... That is NOT normal breathing!' },
      { type: 'choice', ph: 1, q: 'Unresponsive and not breathing normally. What now?', opts: [['C-Real: get the AED from the pharmacy! I call 144.', true], ['Wait and see if he starts breathing again', 'No time to wait: alarm 144, get an AED, start CPR.'], ['Put him in the recovery position', 'The recovery position is only for people who ARE breathing normally.']], ok: 'C-Real sprints off. You call on speaker.' },
      { type: 'call', nums: ['144', '112'], qs: [
        ['Dispatcher 144', 'Ambulance emergency line. Where exactly is the emergency?', [['Zug old town, at the Zytturm on the Kolinplatz side', true], ['Somewhere in Switzerland', 'The dispatcher needs the exact place: town, street, landmark.'], ['Next to a cobblestone', 'Be precise: Zug, at the Zytturm.']]],
        ['Dispatcher 144', 'What happened?', [['A man collapsed. He is unresponsive and not breathing normally.', true], ['Something bad', 'Be specific: unresponsive, not breathing normally.'], ['He might just be tired', 'Describe what you see: unresponsive, not breathing normally.']]],
        ['Dispatcher 144', 'The ambulance is on its way. Start chest compressions now. Can you do that?', [['Yes. Phone on speaker, I\'m starting.', true], ['I\'ll hang up and call back later', 'Never hang up first. Keep the line open, the dispatcher can guide you.']]]] },
      { type: 'cpr', aed: true },
    ],
    done: [['Paramedic', 'Rettungsdienst Zug, we take over! Great CPR, and thanks to the AED his heart is beating again.'], ['C-Real', 'You just saved a life. Next to the Zytturm. Casual. 🥹']],
    card: { title: 'CPR & AED', text: 'Unresponsive and not breathing normally → call 144, get an AED. Push hard (5–6 cm) and fast (100–120/min) in the centre of the chest. 30 compressions : 2 breaths. Switch on the AED and follow its voice. Never stop until help takes over.' },
  },
  seefest: {
    title: 'Unconscious, breathing', place: 'Zug lake promenade, Seefest', bg: 'lake', spot: 'seefest', amb: 'ambulance',
    pat: { who: 'woman', cons: '?', breath: '?', bleed: '-' },
    intro: [['Sarah', 'The Seefest! Music, lights... and someone lying on the promenade.'], ['C-Real', 'Too much Kirsch, maybe?']],
    steps: [
      { type: 'choice', ph: 0, q: 'Before you go to her, you...', opts: [['Check for dangers: broken glass, the lake, bikes', true], ['Jump over the railing', 'Careful! Look first: broken glass, water, traffic.'], ['Film it for Instagram', 'No. Look for dangers, then help.']], ok: 'Some glass shards. You push them away with your shoe.' },
      { type: 'choice', ph: 0, q: 'You speak loudly and tap her shoulders. No reaction. Next?', opts: [['Check her breathing for up to 10 seconds', true], ['Give her water to drink', 'Never give anything to drink to an unresponsive person: she could choke.'], ['Let her sleep it off', 'Unresponsive people can choke on their tongue or vomit. Check breathing!']], set: { cons: 'unresponsive', breath: 'normal' }, ok: 'She is breathing normally. 🫁' },
      { type: 'choice', ph: 1, q: 'Unresponsive but breathing normally. The right position?', opts: [['Recovery position (on her side)', true], ['On her back, legs raised', 'On her back, the tongue or vomit can block the airway. Recovery position!'], ['Sitting up against the railing', 'She can\'t hold herself up. The recovery position keeps the airway open.']], ok: 'Recovery position! C-Real calls 144.' },
      { type: 'seq', q: 'Recovery position: pick the steps in the right order.', items: ['Kneel beside her, place the near arm at a right angle, palm up', 'Bring the far arm across her chest, back of the hand against her cheek', 'Bend the far leg up at the knee', 'Pull the far knee towards you to roll her onto her side', 'Tilt the head back, mouth pointing down, so the airway stays open'], ok: 'Perfect recovery position!' },
      { type: 'choice', ph: 2, q: 'While you wait for the ambulance...', opts: [['Cover her with a rescue blanket and keep checking her breathing', true], ['Go back to the party, she\'s fine now', 'Never leave her alone. Keep checking her breathing.'], ['Give her a coffee to wake her up', 'Nothing by mouth! Keep her warm and check breathing regularly.']], ok: 'If she stops breathing normally: turn her on her back, 144, CPR.' },
    ],
    done: [['Paramedic', 'Good recovery position! We\'ll take her to the hospital to be sure.'], ['C-Real', 'Seefest hero. They should name a firework after you. 🎆']],
    card: { title: 'Recovery position', text: 'Unresponsive but breathing normally → recovery position: near arm at a right angle, far hand to the cheek, bend the far knee, roll towards you, tilt the head back. Call 144, keep warm, check breathing regularly. No breathing → CPR.' },
  },
  cafe: {
    title: 'Choking', place: 'Confiserie, Zug', bg: 'cafe', building: 'cafe', amb: null,
    pat: { who: 'tourist', cons: 'awake', breath: 'choking', bleed: '-' },
    intro: [['Sarah', 'Mmh, Zuger Kirschtorte... wait, that tourist is grabbing his throat!'], ['Tourist', '*cough* *COUGH*']],
    steps: [
      { type: 'choice', ph: 0, q: 'He is coughing hard and can still speak a little. You...', opts: [['Encourage him to keep coughing', true], ['Slap his back right away', 'While he can cough effectively, coughing is the best help. Encourage it.'], ['Give him water to wash it down', 'Drinking can make it worse. Encourage coughing.']], ok: '...but the cough gets weak. He can\'t breathe anymore!' },
      { type: 'choice', ph: 1, q: 'His cough is now ineffective. Next step?', opts: [['Up to 5 firm blows between the shoulder blades', true], ['Reach into his throat with your fingers', 'Blind finger sweeps can push it deeper. Back blows!'], ['Lay him down and wait', 'No waiting: back blows, then abdominal thrusts.']], ok: 'You lean him forward and support his chest with one hand...' },
      { type: 'blows', kind: 'back', n: 5, q: 'Back blows: press [A] when the circle hits the ring!' },
      { type: 'choice', ph: 1, q: 'It\'s still stuck. Now:', opts: [['Up to 5 abdominal thrusts (Heimlich)', true], ['Five more cups of coffee', '...no. Abdominal thrusts: fist above the belly button, pull in and up.'], ['Turn him upside down and shake', 'Abdominal thrusts: stand behind him, fist above the belly button, pull in and up.']], ok: 'You stand behind him, fist between belly button and breastbone...' },
      { type: 'blows', kind: 'thrust', n: 5, q: 'Abdominal thrusts: press [A] when the circle hits the ring!' },
      { type: 'choice', ph: 2, q: 'A piece of Kirschtorte flies across the café! 🍒 He can breathe again. What now?', opts: [['He should see a doctor: abdominal thrusts can cause internal injuries', true], ['Offer him another slice', 'Maybe later! After abdominal thrusts he must be checked by a doctor.'], ['Nothing, all good', 'Abdominal thrusts can injure internal organs. He needs a medical check.']], set: { breath: 'normal' }, ok: 'And if he had become unresponsive: 144 and CPR.' },
    ],
    done: [['Tourist', 'Thank you!! Best... and worst... Kirschtorte of my life.'], ['C-Real', 'I\'ll just have a coffee. Without anything to choke on.']],
    card: { title: 'Choking', text: 'Can still cough → encourage coughing. Cough gets weak → up to 5 back blows between the shoulder blades, then up to 5 abdominal thrusts. Alternate. Becomes unresponsive → 144 and CPR. See a doctor after abdominal thrusts.' },
  },
  cave: {
    title: 'Severe bleeding', place: 'Höllgrotten, Baar', bg: 'cave', building: 'hoell', amb: 'ambulance',
    pat: { who: 'visitor', cons: 'awake', breath: 'normal', bleed: 'severe' },
    intro: [['Guide', 'Help! A visitor slipped on the wet stairs and cut his arm on the rock!'], ['Sarah', 'In the Höllgrotten, of all places! 🦇']],
    steps: [
      { type: 'choice', ph: 0, q: 'It is bleeding heavily. The very first thing:', opts: [['Put on gloves (self-protection)', true], ['Grab the wound with bare hands', 'Protect yourself from infections: gloves first. They\'re in the first aid kit.'], ['Search for the guide\'s phone charger', 'Focus! Gloves, then direct pressure.']], ok: 'C-Real hands you the first aid kit. Gloves on. 🧤' },
      { type: 'hold', secs: 3, q: 'Press directly on the wound: hold [A]!' },
      { type: 'choice', ph: 1, q: 'Next, the patient should...', opts: [['Sit or lie down with the arm raised', true], ['Quickly walk out of the cave', 'Moving makes the bleeding worse and he could faint. Lie down, raise the arm.'], ['Do jumping jacks to warm up', 'Please no. Lie down, raise the arm.']], ok: 'You keep pressing while he lies down.' },
      { type: 'wrap', n: 6, q: 'Pressure bandage: pad on the wound, then wrap firmly. Tap [A] in the green zone!' },
      { type: 'choice', ph: 2, q: 'Blood soaks through the bandage!', opts: [['Put a second pressure bandage on top', true], ['Take the first bandage off and start over', 'Never remove it: you would tear the wound open. Second bandage on top.'], ['Ignore it', 'Soaked through = not enough pressure. Second bandage on top!']], set: { bleed: 'controlled' }, ok: 'The bleeding stops. 🩸✓' },
      { type: 'choice', ph: 1, q: 'He is pale, sweaty and restless. That is probably...', opts: [['Shock: lay him flat, raise his legs, keep him warm, call 144', true], ['Excitement about the stalactites', 'Pale, sweaty, restless, fast pulse = signs of shock. Shock position and 144!'], ['Hunger: give him a sandwich', 'Nothing to eat or drink in shock. Legs up, keep warm, 144.']], ok: 'Shock position, rescue blanket, 144. 🦵⬆️' },
    ],
    done: [['Paramedic', 'Perfect pressure bandage. We\'ll take it from here.'], ['Guide', 'You\'re welcome to a free cave tour. Any time. Just... watch the stairs.']],
    card: { title: 'Bleeding & shock', text: 'Protect yourself (gloves). Press directly on the wound, apply a pressure bandage; if blood soaks through, add a second one on top. Lie down, raise the limb. Shock signs (pale, sweaty, fast pulse, restless) → lie flat, legs up, keep warm, nothing to eat or drink, call 144.' },
  },
  burn: {
    title: 'Burn', place: 'Ägerisee barbecue', bg: 'beach', spot: 'burn', amb: null,
    pat: { who: 'griller', cons: 'awake', breath: 'normal', bleed: '-' },
    intro: [['Sarah', 'A barbecue at the Ägerisee! It smells like cervelat. 🌭'], ['Grill fan', 'AUA! I grabbed the hot grill!']],
    steps: [
      { type: 'choice', ph: 0, q: 'His forearm is burned. First:', opts: [['Cool it with lukewarm running water', true], ['Ice cubes from the cooler', 'Ice damages the tissue even more. Lukewarm, not ice-cold, water.'], ['Butter on it', 'Butter traps the heat and can infect the wound. Water!']], ok: 'You hold his arm under the tap at the beach.' },
      { type: 'choice', ph: 1, q: 'While cooling, what should come off quickly?', opts: [['Rings, watch and bracelets (before it swells)', true], ['His shirt, stuck to the burn', 'Never pull off clothing stuck to a burn. Remove rings and watches early.'], ['The blisters', 'Never pop blisters: infection risk.']], ok: 'Watch off. Good: the arm will swell.' },
      { type: 'cool', q: 'Keep the arm under the water: hold [A] for 15–20 minutes (time runs fast)!' },
      { type: 'choice', ph: 2, q: 'After cooling, you...', opts: [['Cover the burn loosely with a sterile dressing', true], ['Put toothpaste on it', 'Home remedies like toothpaste or flour do more harm. Sterile cover.'], ['Pop the blisters to let air in', 'Never pop blisters. Cover sterile.']], ok: 'Sterile, loose dressing. ✓' },
      { type: 'choice', ph: 1, q: 'When do burns need a doctor or 144?', opts: [['Large burns, face, hands, genitals, children, or if unsure', true], ['Never, burns heal by themselves', 'Large burns or burns on the face, hands or in children need professional care.'], ['Only if it doesn\'t hurt', 'Painless burns can be the deepest! Large, face, hands, children → doctor or 144.']], ok: 'This one is palm-sized: he should see a doctor today.' },
    ],
    done: [['Grill fan', 'Thank you! I\'ll use grill gloves from now on. Promise.'], ['C-Real', 'I saved the cervelats. Priorities. 🌭']],
    card: { title: 'Burns', text: 'Cool with lukewarm running water for 15–20 minutes. Remove rings and watches early. No ice, no butter, no home remedies, don\'t pop blisters. Cover loosely and sterile. Doctor or 144 for large burns, face, hands, genitals, children.' },
  },
  tobel: {
    title: 'Road accident', place: 'Lorzentobel road', bg: 'road', spot: 'tobel', amb: 'ambulance',
    pat: { who: 'biker', cons: '?', breath: '?', bleed: '-' },
    intro: [['Sarah', 'A motorbike is lying in the bend of the Lorzentobel road! The rider is sitting at the roadside.'], ['C-Real', '*stops the car behind the bend* What first?']],
    steps: [
      { type: 'choice', ph: 0, q: 'Your car has stopped. Before getting out:', opts: [['Hazard lights on, safety vest on', true], ['Run onto the road right away', 'Be seen first: hazard lights and safety vest, then get out.'], ['Honk so he knows you are there', 'Hazard lights and a safety vest make you visible. Then get out.']], ok: 'Blinking and glowing. 🦺' },
      { type: 'choice', ph: 1, q: 'Where does the warning triangle go?', opts: [['At least 50 m before the accident (100 m on motorways), before the bend', true], ['Right next to the motorbike', 'Too late for drivers coming round the bend! At least 50 m before.'], ['Stays in the trunk', 'The triangle warns the traffic. At least 50 m before the scene.']], ok: 'Triangle placed before the bend. ⚠️' },
      { type: 'choice', ph: 0, q: 'The rider is awake. You...', opts: [['Approach from the front, talk to him and ask what hurts', true], ['Pull off his helmet immediately', 'He\'s awake and talking: no need to remove the helmet now. Talk to him.'], ['Push the motorbike off the road first', 'People before property. Talk to him and check him.']], set: { cons: 'awake', breath: 'normal' }, ok: '"My leg hurts... I feel cold and dizzy."' },
      { type: 'call', nums: ['144', '112'], qs: [
        ['Dispatcher 144', 'Ambulance emergency line. Where are you?', [['Lorzentobel road between Baar and Ägeri, in the bend before the bridge', true], ['On some road in a forest', 'Give road, towns and landmarks: Lorzentobel, between Baar and Ägeri.']]],
        ['Dispatcher 144', 'How many injured, and what injuries?', [['One motorcyclist, awake, injured leg, pale', true], ['Probably fine', 'Tell how many and what: one rider, awake, leg injury.']]],
        ['Dispatcher 144', 'Any further dangers?', [['Fuel is leaking. Traffic is warned with the triangle.', true], ['No idea, I didn\'t look', 'Always report dangers: fuel, traffic, fire.']]]] },
      { type: 'choice', ph: 2, q: 'He is pale and sweaty, his pulse is fast: signs of shock! What helps?', opts: [['Lay him flat, keep him warm, reassure him, don\'t move the injured leg', true], ['Give him a schnapps to warm up', 'Nothing to eat or drink in shock! Lay flat, keep warm, reassure.'], ['Sit him back on his motorbike', 'Lay him flat. Keep warm with a rescue blanket and reassure him.']], ok: 'Rescue blanket on. You talk calmly until the ambulance arrives.' },
    ],
    done: [['Paramedic', 'Scene secured, triangle placed, good report. Textbook!'], ['C-Real', 'I directed traffic. In a safety vest. I\'ve never felt so powerful. 🦺']],
    card: { title: 'Road accident', text: 'Hazard lights, safety vest, warning triangle at least 50 m before the scene (100 m on motorways). Call 144: where, what, how many injured, further dangers. Talk to the injured. Helmet off only if unresponsive. Shock: lay flat, keep warm, reassure.' },
  },
  hiker: {
    title: 'Mountain accident', place: 'Zugerberg', bg: 'mountain', spot: 'hiker', amb: 'rega',
    pat: { who: 'hiker', cons: 'awake', breath: 'normal', bleed: '-' },
    intro: [['Hiker', 'Ouch! I slipped on the path... my ankle! I can\'t walk.'], ['Sarah', 'We\'re high up on the Zugerberg. There\'s no road here.']],
    steps: [
      { type: 'choice', ph: 0, q: 'The ankle looks deformed. What do you do with it?', opts: [['Don\'t move it: support it in the position you found it', true], ['Pull it straight back into place', 'Never try to set a fracture. Support it as found.'], ['Let him walk it off', 'Walking can make it much worse. Support it as found.']], ok: 'You pad it with jackets so it can\'t move.' },
      { type: 'choice', ph: 1, q: 'Remote terrain, no road. Who do you call?', opts: [['Rega 1414 (or 144)', true], ['117, the police', '117 is for police matters. In the mountains: Rega 1414 or 144.'], ['A taxi', 'A taxi won\'t make it up here. Rega 1414!']], ok: 'Rega: the Swiss air rescue. 🚁' },
      { type: 'call', nums: ['1414', '144', '112'], qs: [
        ['Rega 1414', 'Rega emergency centre. Where are you?', [['On the Zugerberg, on the hiking path south of the Zugerbergbahn top station', true], ['In the mountains', 'Be precise: Zugerberg, which path, a landmark. GPS coordinates help too.']]],
        ['Rega 1414', 'What happened?', [['A hiker fell. Probably a broken ankle, he is awake.', true], ['He is sad', 'Describe the injury: fall, ankle, awake.']]]] },
      { type: 'choice', ph: 2, q: 'While you wait for the helicopter:', opts: [['Keep him warm with a rescue blanket and stay with him', true], ['Leave him to look for a better signal', 'Stay with him and keep him warm.'], ['Give him painkillers from your bag', 'Don\'t hand out medication. Keep him warm, stay with him.']], ok: 'You hear rotor blades over the Zugersee...' },
      { type: 'choice', ph: 2, q: 'The helicopter is searching. How do you signal "Yes, we need help"?', opts: [['Both arms raised in a Y', true], ['One arm up, one arm down', 'That means "No, we don\'t need help". Both arms up in a Y = YES.'], ['Wave a cervelat', '...creative. The signal is: both arms raised in a Y.']], ok: 'Y = Yes! The Rega lands on the meadow. 🚁' },
    ],
    done: [['Paramedic', 'Rega here. Great job keeping him still and warm. Off to the hospital!'], ['C-Real', 'I waved too. Like a Y. A very excited Y.']],
    card: { title: 'Mountain emergency', text: 'Don\'t move injured limbs, support them as found. Keep warm with a rescue blanket and stay with the injured. Call Rega 1414 (or 144) with an exact location. Helicopter signal: both arms up in a Y = "Yes, we need help".' },
  },
};
const CASE_ORDER = ['course', 'cpr', 'seefest', 'cafe', 'cave', 'burn', 'tobel', 'hiker'];
const casesDone = () => CASE_ORDER.filter(k => L3().cases[k] !== undefined).length;
const totalStars = () => CASE_ORDER.reduce((s, k) => s + (L3().cases[k] || 0), 0);
const PHASES = ['Look', 'Think', 'Act'];
const WRONG_NUMBER = { '117': '117 is the police. For a medical emergency: 144.', '118': '118 is the fire brigade. Medical emergency: 144.', '145': '145 is Tox Info Suisse (poisoning advice). Here you need 144.', '1414': '1414 is Rega, the air rescue. In town: 144.' };

// ---------------------------------------------------------------- the scenario scene
let CS = null;
const shuffle = a => a.map(v => [rnd(), v]).sort((p, q) => p[0] - q[0]).map(p => p[1]);
function startCase(id) {
  const def = CASES[id];
  say(def.intro, () => transition(() => { scene = 'case'; musI = 0; CS = { id, def, si: 0, stars: 3, pat: { ...def.pat }, mode: 'step', msg: '', t: 0, rateWarned: false, arrive: 0 }; enterStep(); }));
}
function curStep() { return CS.def.steps[CS.si]; }
function enterStep() {
  const st = curStep(); CS.mode = 'step'; CS.t = 0;
  const s = CS.sub = { t: 0, sel: 0 };
  if (st.type === 'choice') s.opts = shuffle(st.opts);
  if (st.type === 'call') { s.stage = 'dial'; s.num = ''; s.kx = 0; s.ky = 0; s.qi = 0; }
  if (st.type === 'cpr') Object.assign(s, { stage: 'push', n: 0, cycle: 0, br: 0, times: [], rates: [], press: 0, padSel: 0, pads: [], tick: 0 });
  if (st.type === 'seq') { s.pool = shuffle(st.items.slice()); s.done = []; }
  if (st.type === 'hold') s.p = 0;
  if (st.type === 'wrap') { s.n = 0; s.ph = 0; }
  if (st.type === 'blows') { s.n = 0; s.ring = 1; s.hit = 0; }
  if (st.type === 'cool') { s.min = s.min || 0; s.held = false; }
}
function stepOk(msg) { const st = curStep(); if (st.set) Object.assign(CS.pat, st.set); CS.mode = 'ok'; CS.msg = msg || st.ok || '✓'; sfx.ding(); }
function stepWrong(fb) { CS.stars = Math.max(0, CS.stars - 1); CS.mode = 'wrong'; CS.msg = fb; sfx.bonk(); st3('mistakes'); }
function nextStep() { CS.si++; if (CS.si >= CS.def.steps.length) { CS.mode = CS.def.amb ? 'arrive' : 'done'; CS.arrive = 0; if (CS.def.amb) { tone(960, .3, 'square', .05); tone(720, .3, 'square', .05, 0, .35); } } else enterStep(); }
function finishCase() {
  const id = CS.id, prev = L3().cases[id], stars = CS.stars, def = CS.def;
  L3().cases[id] = Math.max(prev || 0, stars); if (prev === undefined) st3('solved');
  backToWorld(() => say(def.done, () => {
    saveGame();
    const n = casesDone();
    if (prev === undefined) setTimeout(() => crText(n >= CASE_ORDER.length ? 'All cases done!! Time for the final exam at the Samariterverein Baar. 📝' : t('{0}/8 first aid cases! New card in your handbook (TAB). 📖', n)), 1000);
  }));
}
// choice helper shared by choice steps, the call's dispatcher questions and the exam
function choiceInput(s, count, pick) {
  if (inp.up) { s.sel = (s.sel + count - 1) % count; sfx.blip(); }
  if (inp.down) { s.sel = (s.sel + 1) % count; sfx.blip(); }
  if (inp.a) pick(s.sel);
}
const KEYPAD = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['⌫', '0', '📞']];
SCENES.case = {
  music: 'interior',
  update(dt) {
    const C = CS, st = curStep(); C.t += dt;
    if (C.mode === 'ok') { if (inp.a) nextStep(); return; }
    if (C.mode === 'wrong') {   // retry the same step, keeping progress where it makes sense
      if (inp.a) {
        const keep = C.sub; enterStep();
        if (st.type === 'cool') C.sub.min = keep.min;
        if (st.type === 'cpr') C.sub = keep;
        if (st.type === 'call' && keep.stage === 'talk') { Object.assign(C.sub, { stage: 'talk', qi: keep.qi }); C.sub.opts = shuffle(st.qs[keep.qi][2]); }
      }
      return;
    }
    if (C.mode === 'arrive') { C.arrive += dt; if (C.arrive > 2.6 || (C.arrive > .6 && inp.a)) C.mode = 'done'; return; }
    if (C.mode === 'done') { if (inp.a) finishCase(); return; }
    if (inp.pause) { backToWorld(); return; }
    const s = C.sub; s.t += dt;
    if (st.type === 'choice') choiceInput(s, s.opts.length, i => { const o = s.opts[i]; if (o[1] === true) stepOk(); else stepWrong(o[1]); });
    else if (st.type === 'call') {
      if (s.stage === 'dial') {
        if (inp.left) s.kx = (s.kx + 2) % 3; if (inp.right) s.kx = (s.kx + 1) % 3; if (inp.up) s.ky = (s.ky + 3) % 4; if (inp.down) s.ky = (s.ky + 1) % 4;
        if (inp.a) {
          const k = KEYPAD[s.ky][s.kx]; sfx.blip();
          if (k === '⌫') s.num = s.num.slice(0, -1);
          else if (k === '📞') {
            if (st.nums.includes(s.num)) { if (s.num === '112') toast('112 works in Switzerland too. 144 is the direct line to the ambulance.'); s.stage = 'talk'; s.qi = 0; s.sel = 0; s.opts = shuffle(st.qs[0][2]); tone(440, .4, 'sine', .08); tone(440, .4, 'sine', .08, 0, .8); }
            else stepWrong(WRONG_NUMBER[s.num] || 'That isn\'t the right number. Medical emergency: 144!');
          } else if (s.num.length < 5) { s.num += k; tone(700 + +k * 40, .08, 'sine', .06); }
        }
      } else choiceInput(s, s.opts.length, i => {
        const o = s.opts[i];
        if (o[1] !== true) { stepWrong(o[1]); return; }
        sfx.pick(); s.qi++; s.sel = 0;
        if (s.qi >= st.qs.length) stepOk(st.ok || 'Help is on the way. 🚑'); else s.opts = shuffle(st.qs[s.qi][2]);
      });
    }
    else if (st.type === 'cpr') cprUpdate(s, dt, st);
    else if (st.type === 'seq') choiceInput(s, s.pool.length, i => {
      const it = s.pool[i];
      if (it === st.items[s.done.length]) { s.done.push(it); s.pool.splice(i, 1); s.sel = 0; sfx.pick(); if (!s.pool.length) stepOk(); }
      else stepWrong(t('Not yet. Step {0} is: "{1}"', s.done.length + 1, t(st.items[s.done.length])));
    });
    else if (st.type === 'hold') {
      if (inp.aHeld) s.p += dt; else s.p = Math.max(0, s.p - dt * 1.5);
      if (s.p >= st.secs) stepOk('The bleeding slows down.');
    }
    else if (st.type === 'wrap') {
      s.ph += dt * 2.4;
      if (inp.a) { const m = (Math.sin(s.ph) + 1) / 2; if (Math.abs(m - .5) < .14) { s.n++; sfx.pick(); if (s.n >= st.n) stepOk('Pressure bandage done.'); } else { popText(VW / 2, 150, t('Too loose! Again.'), '#ffb070', 'screen'); sfx.bonk(); } }
    }
    else if (st.type === 'blows') {
      s.ring -= dt * 1.1; s.hit = Math.max(0, s.hit - dt);
      if (s.ring <= 0) s.ring = 1;
      if (inp.a) {
        if (Math.abs(s.ring - .35) < .12) { s.n++; s.hit = .25; s.ring = 1; tone(120, .1, 'square', .15); shake = .1; if (s.n >= st.n) stepOk(st.kind === 'back' ? 'Five back blows... it\'s still stuck!' : 'POP! 🍒'); }
        else { popText(VW / 2, 150, t('Wrong timing!'), '#ffb070', 'screen'); s.ring = 1; }
      }
    }
    else if (st.type === 'cool') {
      if (inp.aHeld) { s.held = true; s.min = Math.min(20, s.min + dt * 4); if (Math.floor(s.t * 6) % 2) noise(.05, .02, 2500); if (s.min >= 20) stepOk('Cooled for 20 minutes. 💧'); }
      else if (s.held) { s.held = false; if (s.min >= 15) stepOk(t('Cooled for {0} minutes. 💧', Math.floor(s.min))); else stepWrong(t('Only {0} minutes! Burns need 15–20 minutes of cooling.', Math.floor(s.min))); }
    }
  },
  draw() { drawCaseScene(); },
  ui() { caseUI(); },
};
// ---------------------------------------------------------------- CPR + AED minigame
const AED_SPOTS = [{ k: 'Upper right chest, below the collarbone', x: -9, y: -10, ok: true }, { k: 'Left side, below the armpit', x: 16, y: 6, ok: true }, { k: 'On the belly button', x: 0, y: 14 }, { k: 'On the neck', x: 0, y: -20 }];
function cprUpdate(s, dt, st) {
  s.press = Math.max(0, s.press - dt * 6);
  if (s.stage === 'push') {
    s.tick -= dt; if (s.tick <= 0) { s.tick = 60 / 110; tone(1500, .02, 'square', .015); }   // soft 110 bpm metronome
    if (inp.b) popText(VW / 2, 150, t('First 30 compressions, then 2 breaths!'), '#ffb070', 'screen');
    if (inp.a) {
      s.press = 1; s.n++; st3('compressions'); tone(90, .06, 'sine', .12);
      s.times.push(s.t); if (s.times.length > 6) s.times.shift();
      if (s.times.length >= 3) { const iv = (s.times[s.times.length - 1] - s.times[0]) / (s.times.length - 1); s.rate = 60 / iv; s.rates.push(s.rate); }
      if (s.n >= 30) {
        const avg = s.rates.length ? s.rates.reduce((a, b) => a + b, 0) / s.rates.length : 110;
        if ((avg < 95 || avg > 130) && !CS.rateWarned) { CS.rateWarned = true; CS.stars = Math.max(0, CS.stars - 1); popText(VW / 2, 60, t(avg < 95 ? 'Too slow! Aim for 100–120 per minute.' : 'Too fast! Aim for 100–120 per minute.'), '#ff9a9a', 'screen'); }
        s.stage = 'breath'; s.br = 0; s.rates = [];
      }
    }
  } else if (s.stage === 'breath') {
    if (inp.a) popText(VW / 2, 150, t('Now 2 breaths: press B twice!'), '#ffb070', 'screen');
    if (inp.b) {
      s.br++; noise(.4, .05, 600);
      if (s.br >= 2) {
        s.cycle++; s.n = 0; s.times = [];
        if (st.aed && s.cycle === 1) { s.stage = 'pads'; s.pads = []; s.padSel = 0; popText(VW / 2, 50, t('C-Real is back with the AED! Switch it on. ⚡'), '#9fe0a0', 'screen'); }
        else if (s.cycle >= 2) stepOk('Paramedics arrive and take over. 🚑');
        else s.stage = 'push';
      }
    }
  } else if (s.stage === 'pads') {
    if (inp.left || inp.up) { s.padSel = (s.padSel + 3) % 4; sfx.blip(); }
    if (inp.right || inp.down) { s.padSel = (s.padSel + 1) % 4; sfx.blip(); }
    if (inp.a) {
      const p = AED_SPOTS[s.padSel];
      if (s.pads.includes(s.padSel)) return;
      if (!p.ok) { stepWrong(t('Not there! One pad below the right collarbone, the other on the left side below the armpit.')); return; }
      s.pads.push(s.padSel); sfx.pick();
      if (s.pads.length === 2) { s.stage = 'analyse'; s.at = 0; s.touched = false; }
    }
  } else if (s.stage === 'analyse') {
    s.at += dt;
    if (inp.a && !s.touched) { s.touched = true; CS.stars = Math.max(0, CS.stars - 1); popText(VW / 2, 60, t('Don\'t touch the patient while the AED analyses!'), '#ff9a9a', 'screen'); sfx.bonk(); }
    if (s.at > 2.2) { s.stage = 'clear'; s.sel = 0; s.opts = shuffle([['Shout "Stand clear!", check nobody touches him, press SHOCK', true], ['Keep doing compressions during the shock', 'Nobody may touch the patient during the shock!'], ['Remove the pads to be safe', 'The pads must stay on. Stand clear and shock.']]); }
  } else if (s.stage === 'clear') {
    choiceInput(s, 3, i => { const o = s.opts[i]; if (o[1] === true) { s.stage = 'zap'; s.zt = 0; noise(.3, .3, 3000); tone(80, .3, 'sawtooth', .2); shake = .3; } else { CS.stars = Math.max(0, CS.stars - 1); popText(VW / 2, 60, t(o[1]), '#ff9a9a', 'screen'); sfx.bonk(); } });
  } else if (s.stage === 'zap') {
    s.zt += dt; if (s.zt > 1.2) { s.stage = 'push'; popText(VW / 2, 50, t('Shock delivered. Continue CPR immediately!'), '#9fe0a0', 'screen'); }
  }
}
// ---------------------------------------------------------------- scenario visuals
function drawCaseBg(bg, tm) {
  const sky = (a, b) => { const gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(0, 0, VW, VH); };
  if (bg === 'course') { R(0, 0, VW, VH, '#efe6d6'); R(0, 120, VW, 96, '#b8875a'); for (let x = 0; x < VW; x += 24) R(x, 120, 1, 96, '#a07450'); R(120, 18, 150, 70, '#ffffff'); R(118, 16, 154, 2, '#8a8a8a'); R(180, 30, 30, 30, '#2a9a4a'); R(192, 34, 6, 22, '#fff'); R(184, 42, 22, 6, '#fff'); R(60, 132, 260, 50, '#3a6ad8'); }
  else if (bg === 'oldtown') { sky('#8ac4ee', '#d8f0fa'); for (let i = 0; i < 6; i++) { R(i * 70 - 10, 30 + (i % 2) * 12, 62, 100, ['#f2e6c8', '#e8d0b0', '#f4ecd8'][i % 3]); for (let j = 0; j < 3; j++) R(i * 70 + j * 18, 50 + (i % 2) * 12, 10, 14, '#5a7a9a'); } R(300, 0, 46, 130, '#e8dcc0'); circ(323, 40, 12, '#1a2a4a'); circ(323, 40, 9, '#d9b47a'); R(0, 128, VW, 88, '#a8a29a'); for (let y = 128; y < VH; y += 6) for (let x = (y / 6 % 2) * 6; x < VW; x += 12) R(x, y, 11, 5, '#b8b2a8'); }
  else if (bg === 'lake') { sky('#2a2a5a', '#e88a6a'); R(0, 80, VW, 50, '#3a5a8a'); for (let i = 0; i < 20; i++) R(hash(i, 1) % VW, 82 + hash(i, 2) % 44, 8, 1, 'rgba(255,220,150,.5)'); for (let i = 0; i < 12; i++) circ(16 + i * 32, 30 + Math.sin(tm + i) * 3, 2, ['#ffd34d', '#ff6fa8', '#4fc3f7'][i % 3]); R(0, 128, VW, 88, '#8a7a6a'); R(0, 126, VW, 3, '#5a4a3a'); }
  else if (bg === 'cafe') { R(0, 0, VW, VH, '#fbe8e8'); for (let x = 0; x < VW; x += 20) R(x, 0, 10, 120, '#f8d8dc'); R(0, 120, VW, 96, '#c8a07a'); R(20, 60, 120, 40, '#ffffff'); for (let i = 0; i < 4; i++) { ell(40 + i * 28, 86, 11, 4, '#f4e4c8'); R(30 + i * 28, 78, 20, 8, '#f8d8a0'); R(30 + i * 28, 77, 20, 2, '#f4c4d0'); } }
  else if (bg === 'cave') { R(0, 0, VW, VH, '#1a1612'); for (let i = 0; i < 16; i++) poly([[i * 26, 0], [i * 26 + 10, 30 + hash(i, 3) % 40], [i * 26 + 20, 0]], i % 2 ? '#3a322a' : '#4a4038'); for (let i = 0; i < 4; i++) ell(40 + i * 100, 50, 30, 30, 'rgba(255,200,120,.08)'); R(0, 130, VW, 86, '#3a322a'); for (let i = 0; i < 4; i++) circ(40 + i * 100, 40, 3, '#ffd38a'); }
  else if (bg === 'beach') { sky('#7cc4ee', '#d8f0fa'); drawMountains(90, '#7a9a6a', false, 17); R(0, 88, VW, 40, '#3f86c8'); R(0, 128, VW, 88, '#e6d39f'); R(280, 110, 40, 20, '#3a3a3a'); R(284, 104, 32, 6, '#555'); for (let i = 0; i < 3; i++) ell(290 + i * 10, 96 - ((tm * 20 + i * 7) % 20), 4, 3, 'rgba(200,200,200,.5)'); }
  else if (bg === 'road') { sky('#9ac4e8', '#dce8f0'); for (let i = 0; i < 14; i++) g.drawImage(OVER[T.PINE][i % 4], i * 28, 70 + (i % 2) * 10); R(0, 110, VW, 106, '#5a8a4a'); poly([[0, 150], [VW, 120], [VW, 170], [0, 200]], '#4a4a4f'); for (let x = 0; x < VW; x += 30) R(x, 160 - x * .08, 14, 2, '#ffffff');
    circ(254, 142, 7, '#1a1a1a'); circ(286, 140, 7, '#1a1a1a'); circ(254, 142, 3, '#888'); circ(286, 140, 3, '#888'); poly([[256, 136], [284, 133], [280, 126], [262, 128]], '#d9302a'); R(268, 124, 10, 3, '#2a2a2e');   // the fallen motorbike
    poly([[366, 113], [357, 128], [375, 128]], '#e8432a'); poly([[366, 118], [361, 126], [371, 126]], '#ffffff'); }   // warning triangle down the road
  else if (bg === 'mountain') { sky('#8ac4ee', '#e8f4fa'); drawMountains(80, '#9ab0c8', true, 23); R(0, 90, VW, 20, '#3f86c8'); R(0, 108, VW, 108, '#7aaa4a'); for (let i = 0; i < 20; i++) R(hash(i, 1) % VW, 112 + hash(i, 2) % 100, 2, 1, '#ffffff'); }
}
function drawPatient(who, x, y, lying) {
  const looks = { man: { shirt: '#4a6aa0', beard: '#3a2a1e' }, woman: { shirt: '#c84a8a', hair: '#8a5a2a' }, tourist: { shirt: '#f2c230', hat: 'cap', hatCol: '#d94b4b' }, visitor: { shirt: '#5aa05a' }, griller: { shirt: '#e86a3a', beard: '#6a4a2a' }, biker: { shirt: '#2a2a2e', pants: '#2a2a2e', hat: 'beanie', hatCol: '#d9302a' }, hiker: { shirt: '#3a7ad8', hat: 'cap', hatCol: '#2a9a4a' }, dummy: { shirt: '#e0e0e0', pants: '#e0e0e0', skin: '#f0d8c8' } };
  const o = Object.assign({ pants: '#3a3a4a' }, looks[who] || {});
  g.save(); g.translate(x, y); if (lying) g.rotate(-Math.PI / 2); g.scale(2.2, 2.2); drawPerson(0, 0, o); g.restore();
}
function drawCaseScene() {
  const C = CS, st = curStep(), s = C.sub || {};
  drawCaseBg(C.def.bg, time);
  const lying = !['cafe', 'burn'].includes(C.id);   // choking & burn patients stand, everyone else lies on the ground
  const cpr = st && st.type === 'cpr';
  const kneel = cpr && C.mode === 'step';   // during CPR Sarah kneels behind the patient (the patient hides her legs)
  if (kneel) bigSprite(() => drawSarah(0, 0, 'down', 0, 0, false, false), 192, 127, 2.2);
  if (lying) drawPatient(C.def.pat.who, 210, 132, true); else drawPatient(C.def.pat.who, 210, 150, false);
  if (kneel && s.stage === 'push') {   // straight arms, stacked hands on the centre of the chest
    const p = (s.press || 0) * 3; g.strokeStyle = '#f1c6a5'; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.moveTo(184, 104); g.lineTo(191, 120 + p); g.moveTo(200, 104); g.lineTo(193, 120 + p); g.stroke(); R(187, 119 + p, 10, 5, '#e8b896');
  }
  if (!kneel) bigSprite(() => drawSarah(0, 0, 'right', 0, 0, false, false), lying ? 128 : 170, 160, 2.2);
  const crAway = cpr && s.stage === 'push' && (s.cycle || 0) === 0;
  if (!crAway) bigSprite(() => drawCReal(0, 0, time, 'kit'), 318, 160, 2);
  if (cpr && ['pads', 'analyse', 'clear', 'zap'].includes(s.stage)) { R(236, 128, 26, 18, '#ffd34d'); R(240, 132, 18, 8, '#2a2a2a'); R(244, 134, 10, 4, s.stage === 'zap' ? '#ffffff' : '#7ee081'); }
  if (cpr && s.stage === 'zap' && s.zt < .3) { g.fillStyle = 'rgba(255,255,255,.6)'; g.fillRect(0, 0, VW, VH); }
  if (C.mode === 'arrive' || C.mode === 'done') {
    const k = Math.min(1, C.arrive / 2);
    if (C.def.amb === 'rega') {   // Rega helicopter coming in
      const hx = 420 - k * 170, hy = 30 + k * 60;
      ell(hx, hy, 26, 11, '#d52b1e'); R(hx + 10, hy - 3, 34, 5, '#d52b1e'); R(hx - 16, hy - 6, 12, 8, '#cfe0ff'); R(hx - 30, hy - 15, 60, 2, '#333'); R(hx - 30 + (time * 200) % 60, hy - 16, 14, 1, '#888');
      R(hx - 6, hy + 10, 2, 6, '#333'); R(hx + 8, hy + 10, 2, 6, '#333'); R(hx - 12, hy + 15, 26, 2, '#333');
    } else if (C.def.amb) {   // Rettungsdienst ambulance
      const ax = 420 - k * 150, ay = 176;
      R(ax - 30, ay - 30, 60, 26, '#ffffff'); for (let i = 0; i < 60; i += 10) R(ax - 30 + i, ay - 14, 5, 5, '#2a9a4a'), R(ax - 25 + i, ay - 14, 5, 5, '#ffd34d');
      R(ax - 30, ay - 30, 18, 12, '#9ac4e8'); circ(ax - 18, ay - 3, 5, '#1a1a1a'); circ(ax + 18, ay - 3, 5, '#1a1a1a');
      const bl = Math.floor(time * 6) % 2; R(ax - 8, ay - 34, 6, 4, bl ? '#3a6aff' : '#9ab0ff'); R(ax + 2, ay - 34, 6, 4, bl ? '#9ab0ff' : '#3a6aff');
    }
  }
}
function caseUI() {
  const C = CS, st = curStep(), s = C.sub || {};
  rrect(4, 4, 200, 26, 5, 'rgba(10,10,20,.6)');
  txt(t(C.def.title), 10, 7, 9, '#fff', 'left', true); txt(t(C.def.place), 10, 19, 6.5, '#cfe', 'left', false);
  txt('⭐'.repeat(C.stars) + '☆'.repeat(3 - C.stars), 200, 8, 9, '#ffd34d', 'right', false);
  const ph = st ? (st.ph !== undefined ? st.ph : 2) : 2;
  PHASES.forEach((p, i) => { rrect(212 + i * 57, 5, 54, 12, 6, i === ph ? '#2a9a4a' : 'rgba(255,255,255,.55)'); txt(t(p), 239 + i * 57, 7.5, 7, i === ph ? '#fff' : '#3a3a4a', 'center', true, false); });
  // patient status
  const P2 = C.pat, val = v => t({ '?': '?', '-': '–', unresponsive: 'unresponsive', awake: 'awake', normal: 'normal', none: 'not normal!', choking: 'choking!', severe: 'severe!', controlled: 'controlled' }[v] || v);
  rrect(282, 20, 98, 34, 4, '#f7f9f7', '#2a9a4a');
  txt('👁 ' + val(P2.cons), 286, 22, 6.5, '#222', 'left', false, false); txt('🫁 ' + val(P2.breath), 286, 32, 6.5, P2.breath === 'none' || P2.breath === 'choking' ? '#c83a3a' : '#222', 'left', false, false); txt('🩸 ' + val(P2.bleed), 286, 42, 6.5, P2.bleed === 'severe' ? '#c83a3a' : '#222', 'left', false, false);
  const box = (y, h) => rrect(12, y, VW - 24, h, 6, 'rgba(18,16,28,.9)', '#2a9a4a');
  const optList = (opts, y0, getText) => opts.forEach((o, i) => { const y = y0 + i * 15, sel = i === s.sel; rrect(20, y, VW - 40, 13, 5, sel ? '#ff6fa8' : 'rgba(255,255,255,.88)'); txt((sel ? '▶ ' : '') + t(getText(o)), 26, y + 3, 7, sel ? '#fff' : '#222', 'left', true, false); });
  if (C.mode === 'step' && st) {
    if (st.type === 'choice') { const h = 22 + s.opts.length * 15; box(VH - h - 6, h); txt(t(st.q), 20, VH - h - 2, 7.5, '#fff', 'left', true, false); optList(s.opts, VH - h + 12, o => o[0]); }
    if (st.type === 'call') {
      if (s.stage === 'dial') {
        rrect(250, 60, 120, 150, 10, '#1a1a22', '#9fe0a0'); rrect(258, 68, 104, 18, 4, '#cfe8d0'); txt(s.num || '…', 310, 71, 11, '#1a3a1a', 'center', true, false);
        KEYPAD.forEach((row, y) => row.forEach((k, x) => { const sel = x === s.kx && y === s.ky; rrect(262 + x * 33, 92 + y * 28, 28, 23, 6, sel ? '#ff6fa8' : k === '📞' ? '#2a9a4a' : '#3a3a4a'); txt(k, 276 + x * 33, 97 + y * 28, 10, '#fff', 'center', true, false); }));
        rrect(12, 150, 228, 56, 6, 'rgba(18,16,28,.9)', '#2a9a4a'); wrap(t('Dial the right emergency number on the keypad, then press 📞 (arrows + [A]).'), 210, 7.5).forEach((ln, i) => txt(ln, 20, 158 + i * 10, 7.5, '#fff', 'left', false, false));
      } else { const q = st.qs[s.qi], h = 34 + s.opts.length * 15; box(VH - h - 6, h); txt('📞 ' + t(q[0]), 20, VH - h - 2, 7, '#9fe0a0', 'left', true, false); txt(t(q[1]), 20, VH - h + 9, 7.5, '#fff', 'left', true, false); optList(s.opts, VH - h + 24, o => o[0]); }
    }
    if (st.type === 'cpr') cprUI(s);
    if (st.type === 'seq') {
      const h = 34 + (s.done.length + s.pool.length) * 12 + 4; box(VH - h - 6, h); txt(t(st.q), 20, VH - h - 2, 7.5, '#fff', 'left', true, false);
      s.done.forEach((it, i) => txt(`✓ ${i + 1}. ` + t(it), 22, VH - h + 12 + i * 12, 6.5, '#9fe0a0', 'left', false, false));
      s.pool.forEach((it, i) => { const y = VH - h + 12 + (s.done.length + i) * 12, sel = i === s.sel; rrect(20, y - 1, VW - 40, 11, 4, sel ? '#ff6fa8' : 'rgba(255,255,255,.88)'); txt((sel ? '▶ ' : '') + t(it), 24, y + 1, 6.5, sel ? '#fff' : '#222', 'left', true, false); });
    }
    if (st.type === 'hold') { box(160, 46); txt(t(st.q), 20, 166, 8, '#fff', 'left', true, false); rrect(20, 184, 200, 8, 4, 'rgba(255,255,255,.2)'); rrect(20, 184, 200 * Math.min(1, s.p / st.secs), 8, 4, '#7ee081'); txt('🩸', 230, 180, 12, '#fff', 'left'); }
    if (st.type === 'wrap') { box(150, 56); txt(t(st.q), 20, 156, 7.5, '#fff', 'left', true, false); rrect(20, 176, 240, 10, 5, 'rgba(255,255,255,.2)'); rrect(20 + 240 * .36, 176, 240 * .28, 10, 5, '#7ee081'); rrect(18 + 240 * (Math.sin(s.ph) + 1) / 2, 172, 4, 18, 2, '#ffffff'); txt(t('Wraps: {0}/{1}', s.n, st.n), 280, 175, 8, '#ffd34d', 'left', true, false); }
    if (st.type === 'blows') {
      box(150, 56); txt(t(st.q), 20, 156, 7.5, '#fff', 'left', true, false); txt(`${s.n}/${st.n}`, 300, 174, 14, '#ffd34d', 'center', true, false);
      ctx.strokeStyle = '#7ee081'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(80, 186, 8, 0, 7); ctx.stroke();
      ctx.strokeStyle = s.hit > 0 ? '#ffd34d' : '#ffffff'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(80, 186, 4 + s.ring * 23, 0, 7); ctx.stroke();
    }
    if (st.type === 'cool') { box(150, 56); txt(t(st.q), 20, 156, 7.5, '#fff', 'left', true, false); rrect(20, 180, 260, 8, 4, 'rgba(255,255,255,.2)'); rrect(20 + 260 * .75, 180, 260 * .25, 8, 4, '#7ee081'); rrect(20, 180, 260 * s.min / 20, 8, 4, '#4fc3f7'); txt(t('{0} min', Math.floor(s.min)), 300, 177, 10, '#4fc3f7', 'left', true, false); }
  }
  if (C.mode === 'ok' || C.mode === 'wrong') {
    const ok = C.mode === 'ok', lines = wrap(t(C.msg), VW - 70, 8), h = 26 + lines.length * 10;
    rrect(24, 96, VW - 48, h, 7, ok ? 'rgba(20,80,40,.95)' : 'rgba(110,20,20,.95)', ok ? '#7ee081' : '#ff8a8a');
    lines.forEach((ln, i) => txt((i === 0 ? (ok ? '✓ ' : '✗ ') : '') + ln, 34, 102 + i * 10, 8, '#fff', 'left', true, false));
    txt(t(ok ? '[A]: continue' : '[A]: try again'), VW / 2, 96 + h - 12, 7, '#ffd34d', 'center', true, false);
  }
  if (C.mode === 'arrive') txt(t(C.def.amb === 'rega' ? 'Rega is coming! 🚁' : 'Rettungsdienst Zug is coming! 🚑'), VW / 2, 70, 12, '#ffffff', 'center', true);
  if (C.mode === 'done') {
    panelUI(60, 84); txt(t('Case solved!'), VW / 2, 66, 12, '#7ee081', 'center', true, false); txt('⭐'.repeat(C.stars) + '☆'.repeat(3 - C.stars), VW / 2, 82, 14, '#ffd34d', 'center', false, false);
    txt(t('New handbook card: {0}', t(C.def.card.title)), VW / 2, 104, 8, '#fff', 'center', false, false); txt(t('[A]: continue'), VW / 2, 126, 8, '#ffd34d', 'center', true, false);
  }
  screenParts();
}
function cprUI(s) {
  if (s.stage === 'push' || s.stage === 'breath') {
    rrect(12, 150, VW - 24, 60, 6, 'rgba(18,16,28,.9)', '#2a9a4a');
    if (s.stage === 'push') {
      txt(t('Chest compressions: tap [A] to the beat (100–120/min)'), 20, 155, 7.5, '#fff', 'left', true, false);
      txt(`${s.n} / 30`, 330, 154, 11, '#ffd34d', 'center', true, false);
      const r = s.rate || 0, m = clamp((r - 60) / 100, 0, 1);
      rrect(20, 172, 280, 10, 5, 'rgba(255,255,255,.2)'); rrect(20 + 280 * .4, 172, 280 * .2, 10, 5, '#7ee081'); rrect(18 + 280 * m, 168, 4, 18, 2, r >= 100 && r <= 120 ? '#ffffff' : '#ff8a8a');
      txt(r ? t('{0}/min', Math.round(r)) : '–', 320, 172, 8, r >= 100 && r <= 120 ? '#7ee081' : '#ff8a8a', 'left', true, false);
      txt(t('Push hard (5–6 cm), let the chest come back up fully.'), 20, 192, 6.5, '#cfe', 'left', false, false);
    } else {
      txt(t('2 rescue breaths: tilt the head back, lift the chin. Press B twice!'), 20, 158, 7.5, '#fff', 'left', true, false);
      txt('🫁 '.repeat(s.br) + '○ '.repeat(2 - s.br), 20, 178, 12, '#9fe0a0', 'left', false, false);
    }
  } else if (s.stage === 'pads') {
    rrect(120, 40, 144, 116, 8, 'rgba(255,255,255,.95)', '#2a9a4a'); txt(t('Place the AED pads (◀ ▶ + [A])'), VW / 2, 44, 7.5, '#222', 'center', true, false);
    const cx = VW / 2, cy = 104;   // torso seen from above (UI layer, so it sits on the panel)
    rrect(cx - 10, cy - 50, 20, 12, 4, '#f1c6a5'); rrect(cx - 34, cy - 40, 68, 84, 22, '#f1c6a5'); rrect(cx - 26, cy - 31, 22, 2, 1, '#d9a888'); rrect(cx + 4, cy - 31, 22, 2, 1, '#d9a888');
    rrect(cx - 14, cy - 12, 4, 4, 2, '#c89a7a'); rrect(cx + 10, cy - 12, 4, 4, 2, '#c89a7a'); rrect(cx - 2, cy + 22, 4, 4, 2, '#c89a7a');
    txt('R', cx - 42, cy - 30, 7, '#888', 'center', true, false); txt('L', cx + 42, cy - 30, 7, '#888', 'center', true, false);   // the patient's right/left (same letters in German)
    AED_SPOTS.forEach((p, i) => { const placed = s.pads.includes(i), sel = i === s.padSel; rrect(cx + p.x * 1.6 - 7, cy + p.y * 1.6 - 5, 14, 10, 2, placed ? '#7ee081' : sel ? '#ff6fa8' : 'rgba(0,0,0,.15)'); });
    rrect(12, 170, VW - 24, 30, 6, 'rgba(18,16,28,.9)', '#2a9a4a'); txt('▶ ' + t(AED_SPOTS[s.padSel].k), 20, 180, 8, '#fff', 'left', true, false);
  } else if (s.stage === 'analyse') { rrect(60, 150, VW - 120, 40, 6, 'rgba(18,16,28,.92)', '#ffd34d'); txt(t('AED: "Analysing heart rhythm. Do not touch the patient."'), VW / 2, 160, 8, '#ffd34d', 'center', true, false); txt('🤖 …', VW / 2, 174, 9, '#fff', 'center', false, false); }
  else if (s.stage === 'clear') { const h = 22 + s.opts.length * 15; rrect(12, VH - h - 6, VW - 24, h, 6, 'rgba(18,16,28,.9)', '#ffd34d'); txt(t('AED: "Shock advised." What do you do?'), 20, VH - h - 2, 7.5, '#ffd34d', 'left', true, false); s.opts.forEach((o, i) => { const y = VH - h + 12 + i * 15, sel = i === s.sel; rrect(20, y, VW - 40, 13, 5, sel ? '#ff6fa8' : 'rgba(255,255,255,.88)'); txt((sel ? '▶ ' : '') + t(o[0]), 26, y + 3, 7, sel ? '#fff' : '#222', 'left', true, false); }); }
  else if (s.stage === 'zap') txt('⚡ ' + t('SHOCK!') + ' ⚡', VW / 2, 80, 18, '#ffd34d', 'center', true);
}

// ---------------------------------------------------------------- final exam at the Samariterverein
const EXAM_POOL = [
  ['What is the order of the three first aid steps?', 'Look – Think – Act', 'Act – Think – Look', 'Think – Look – Act'],
  ['Swiss emergency number for an ambulance?', '144', '117', '118'],
  ['Swiss air rescue (Rega)?', '1414', '145', '117'],
  ['How fast do you push during CPR?', '100–120 per minute', '60 per minute', '200 per minute'],
  ['Compression to breath ratio in CPR?', '30 : 2', '15 : 1', '5 : 5'],
  ['Unresponsive but breathing normally. Which position?', 'Recovery position', 'Sitting up', 'Standing'],
  ['Where do the AED pads go?', 'Below the right collarbone and on the left side below the armpit', 'Both on the belly', 'On the back of the neck'],
  ['How do you cool a burn?', 'Lukewarm running water for 15–20 minutes', 'Ice cubes', 'Butter'],
  ['Blood soaks through the pressure bandage. You...', 'Add a second bandage on top', 'Remove the first one', 'Wait and see'],
  ['Choking and the cough gets weak. You give...', '5 back blows, then 5 abdominal thrusts', 'Something to drink', 'A finger sweep'],
  ['Typical signs of shock?', 'Pale, cold sweat, fast pulse, restless', 'Red face and laughing', 'Hiccups'],
  ['Where does the warning triangle go on a normal road?', 'At least 50 m before the scene', 'Right next to the car', 'Behind the scene'],
  ['Helicopter signal for "Yes, we need help"?', 'Both arms raised in a Y', 'One arm raised', 'Lying flat on the ground'],
  ['Who gives advice on poisoning?', '145, Tox Info Suisse', '1414', '118'],
];
let EX = null;
function startExam() {
  say([['Instructor', 'All cases solved? Then: final exam! 10 questions, you need 8 right. 📝'], ['C-Real', 'You got this. I\'ll hold your coffee.']], () => transition(() => {
    scene = 'exam'; musI = 0;
    EX = { qs: shuffle(EXAM_POOL.slice()).slice(0, 10), i: 0, right: 0, sel: 0, mode: 'q', fb: '' }; examShuffle();
  }));
}
function examShuffle() { const q = EX.qs[EX.i]; EX.opts = shuffle([[q[1], true], [q[2], false], [q[3], false]]); EX.sel = 0; }
SCENES.exam = {
  music: 'interior',
  update() {
    if (EX.mode === 'q') choiceInput(EX, 3, i => { const ok = EX.opts[i][1]; if (ok) { EX.right++; sfx.ding(); } else sfx.bonk(); EX.mode = 'fb'; EX.ok = ok; EX.fb = EX.qs[EX.i][1]; });
    else if (EX.mode === 'fb' && inp.a) { EX.i++; if (EX.i >= EX.qs.length) EX.mode = 'result'; else { EX.mode = 'q'; examShuffle(); } }
    else if (EX.mode === 'result' && inp.a) {
      if (EX.right >= 8) { L3().flags.exam = 1; L3().stats.exam = EX.right; saveGame(); transition(startEnding3); }
      else backToWorld(() => say([['Instructor', t('{0}/10. Close! Read your handbook (TAB) and try again.', EX.right)]]));
    }
  },
  draw() { drawCaseBg('course', time); bigSprite(() => drawSarah(0, 0, 'up', 0, 0, false, false), 192, 200, 2.2); bigSprite(() => drawCReal(0, 0, time, 'kit'), 330, 190, 1.8); },
  ui() {
    txt(t('NOTHELFER EXAM'), VW / 2, 6, 12, '#2a3a2a', 'center', true, false); txt(t('Question {0}/10   ·   ✓ {1}', Math.min(10, EX.i + 1), EX.right), VW / 2, 22, 8, '#3a4a3a', 'center', true, false);
    if (EX.mode !== 'result') {
      const q = EX.qs[EX.i]; rrect(20, 40, VW - 40, 20, 6, 'rgba(18,16,28,.9)', '#2a9a4a'); txt(t(q[0]), VW / 2, 46, 8, '#fff', 'center', true, false);
      EX.opts.forEach((o, i) => { const y = 66 + i * 18, sel = i === EX.sel, fb = EX.mode === 'fb'; rrect(30, y, VW - 60, 15, 6, fb ? (o[1] ? '#7ee081' : sel ? '#ff8a8a' : 'rgba(255,255,255,.8)') : sel ? '#ff6fa8' : 'rgba(255,255,255,.9)'); txt((sel && !fb ? '▶ ' : '') + t(o[0]), 38, y + 4, 7.5, sel && !fb ? '#fff' : '#222', 'left', true, false); });
      if (EX.mode === 'fb') txt(EX.ok ? t('Correct! ✓') : t('Correct answer: {0}', t(EX.fb)), VW / 2, 124, 8, EX.ok ? '#1a7a3a' : '#a82a2a', 'center', true, false);
    } else { panelUI(50, 80); txt(t('{0}/10 correct', EX.right), VW / 2, 62, 14, EX.right >= 8 ? '#7ee081' : '#ff8a8a', 'center', true, false); txt(EX.right >= 8 ? t('PASSED! 🎉') : t('Not quite: 8 needed.'), VW / 2, 84, 10, '#fff', 'center', true, false); txt(t('[A]: continue'), VW / 2, 110, 8, '#ffd34d', 'center', true, false); }
  },
};

// ---------------------------------------------------------------- the Nothelfer-Ausweis ending
let EN3 = null;
const finalMsg3 = () => FINAL_MESSAGE_3[LANG] || FINAL_MESSAGE_3.en;
function startEnding3() { scene = 'ending3'; musI = 0; L3().flags.finished = 1; saveGame(); EN3 = { t: 0, shown: 0, phase: 0, conf: [] }; for (let i = 0; i < 90; i++) EN3.conf.push({ x: rnd() * VW, y: -rnd() * VH, vy: 20 + rnd() * 40, c: ['#2a9a4a', '#ffffff', '#ffd34d', '#ff6fa8'][(rnd() * 4) | 0], r: rnd() * 6 }); }
SCENES.ending3 = {
  music: 'ending',
  update(dt) {
    EN3.t += dt; for (const c of EN3.conf) { c.y += c.vy * dt; if (c.y > VH) { c.y = -5; c.x = rnd() * VW; } }
    const msg = finalMsg3(); if (EN3.t > 1.5) EN3.shown = Math.min(msg.length, EN3.shown + dt * 30);
    if (inp.a) { if (EN3.phase === 0 && EN3.shown < msg.length) EN3.shown = msg.length; else if (EN3.phase < 2) { EN3.phase++; sfx.ding(); } else backToWorld(() => { const b = BMAP.samariter; P.x = b.doorX; P.y = b.doorY + 10; if (LEVELS[4] && !ST.l4.flags.arrived) setTimeout(() => crText('Did you see that? Something is glowing deep inside the Höllgrotten... ⏳'), 2500); }); }
  },
  draw() {
    R(0, 0, VW, VH, '#8a5a32'); for (let y = 0; y < VH; y += 12) R(0, y, VW, 1, '#7a4e2a');
    if (EN3.phase === 0) {   // the certificate card on the table
      R(70, 40, 244, 140, '#fbf8ee'); R(70, 40, 244, 22, '#2a9a4a'); R(80, 46, 10, 10, '#ffffff'); R(83, 43, 4, 16, '#ffffff');
      bigSprite(() => drawSarah(0, 0, 'down', 0, 0, false, false), 110, 130, 2);
      for (let i = 0; i < 8; i++) { const sx = 160 + (i % 4) * 34, sy = 112 + Math.floor(i / 4) * 26; circ(sx, sy, 11, 'rgba(42,154,74,.25)'); circ(sx, sy, 9, 'rgba(42,154,74,.5)'); R(sx - 1, sy - 5, 2, 10, '#ffffff'); R(sx - 5, sy - 1, 10, 2, '#ffffff'); }
    }
  },
  ui() {
    for (const c of EN3.conf) { ctx.fillStyle = c.c; ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(EN3.t * 3 + c.r); ctx.fillRect(-2, -1, 4, 2); ctx.restore(); }
    if (EN3.phase === 0) {
      txt(t('NOTHELFER-AUSWEIS'), 96, 46, 10, '#ffffff', 'left', true, false);
      txt('Sarah', 150, 70, 12, '#2a3a2a', 'left', true, false); txt(t('Basic first aid: passed with {0}/24 ⭐', totalStars()), 150, 86, 7.5, '#3a4a3a', 'left', false, false);
      txt(t('Samariterverein Baar · Kanton Zug'), 150, 96, 6.5, '#6a7a6a', 'left', false, false);
      txt(t('[A]: continue'), VW / 2, 190, 8, '#ffd34d', 'center', true);
    } else if (EN3.phase === 1) {
      rrect(30, 40, VW - 60, 120, 8, 'rgba(18,16,28,.9)', '#7ee081'); txt('C-Real', 44, 46, 9, '#ffd34d', 'left', true, false);
      const lines = wrap(finalMsg3(), VW - 90, 8.5); let left = Math.floor(EN3.shown);
      lines.slice(0, 9).forEach((ln, i) => { if (left <= 0) return; txt(ln.slice(0, left), 44, 59 + i * 10.5, 8.5, '#fff'); left -= ln.length + 1; });
    } else {
      const S = L3().stats; rrect(60, 26, VW - 120, 156, 8, 'rgba(18,16,28,.92)', '#7ee081');
      txt('SARCHITECT 3: NOTHELFER ZUG', VW / 2, 32, 12, '#fff', 'center', true, false);
      [t('Cases solved: {0}/8', casesDone()), t('Stars: {0}/24', totalStars()), t('Chest compressions given: {0}', S.compressions || 0), t('Exam: {0}/10', S.exam || 0), t('Zuger cherries eaten: {0}', L3().cherries || 0)].forEach((r, i) => txt(r, VW / 2, 54 + i * 11, 8, '#eee', 'center', false, false));
      wrap(t('This was a refresher. Please book a real first aid course (e.g. Samariter or SRK) and refresh it every few years!'), VW - 150, 7).forEach((ln, i) => txt(ln, VW / 2, 118 + i * 9, 7, '#9fe0a0', 'center', false, false));
      txt(t('[A]: keep exploring'), VW / 2, 166, 7.5, '#ffd34d', 'center', true, false);
    }
  },
};

// ---------------------------------------------------------------- handbook (book)
function l3Pages() { return ['numbers'].concat(CASE_ORDER.slice(1)).concat(L3().flags.exam ? ['ausweis'] : []); }
function l3BookInput() { const n = l3Pages().length; if (inp.left) { book.sel = (book.sel + n - 1) % n; sfx.blip(); } if (inp.right) { book.sel = (book.sel + 1) % n; sfx.blip(); } }
function l3DrawBook() {
  const pages = l3Pages(); book.sel = Math.min(book.sel, pages.length - 1);
  ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, 0, VW, VH);
  const bx = 34, by = 14, bw = VW - 68, bh = VH - 28;
  rrect(bx - 4, by - 4, bw + 8, bh + 8, 8, '#2a7a3a'); rrect(bx, by, bw, bh, 5, '#f8fbf4');
  txt(t('Nothelfer handbook — page {0}/{1}', book.sel + 1, pages.length), bx + 10, by + 6, 7, '#2a7a3a', 'left', true, false);
  const id = pages[book.sel];
  let title, text, have = true;
  if (id === 'numbers') { title = CASES.course.card.title; text = CASES.course.card.text; have = true; }
  else if (id === 'ausweis') { title = 'Nothelfer-Ausweis'; text = t('Passed! Basic first aid, Samariterverein Baar. Refresh your knowledge in a real course every few years.'); }
  else { have = L3().cases[id] !== undefined; title = CASES[id].card.title; text = have ? CASES[id].card.text : t('Solve the case "{0}" to unlock this card.', t(CASES[id].title)); }
  rrect(bx + 12, by + 22, 64, 64, 8, have ? '#2a9a4a' : '#d8dcd0');
  const icon = { numbers: '', cpr: '❤️', seefest: '🛌', cafe: '🍒', cave: '🩸', burn: '🔥', tobel: '⚠️', hiker: '🚁', ausweis: '🎓' }[id];
  if (have && icon) { rrect(bx + 20, by + 30, 48, 48, 24, 'rgba(255,255,255,.9)'); txt(icon, bx + 44, by + 42, 22, '#fff', 'center', false, false); }
  else { rrect(bx + 39, by + 32, 10, 44, 2, '#ffffff'); rrect(bx + 22, by + 49, 44, 10, 2, '#ffffff'); }
  txt(have ? t(title) : '???', bx + 86, by + 24, 11, '#1a3a1a', 'left', true, false);
  if (id !== 'numbers' && id !== 'ausweis' && have) txt('⭐'.repeat(L3().cases[id]) + '☆'.repeat(3 - L3().cases[id]), bx + 86, by + 40, 9, '#d9a400', 'left', false, false);
  wrap(have ? t(text) : text, bw - 100, 7.5).forEach((ln, i) => txt(ln, bx + 86, by + 56 + i * 10, 7.5, '#2a2a2a', 'left', false, false));
  txt(t('This game is a refresher, not a replacement for a real first aid course.'), VW / 2, by + bh - 30, 6.5, '#7a8a7a', 'center', false, false);
  for (let i = 0; i < pages.length; i++) { ctx.fillStyle = i === book.sel ? '#ff6fa8' : '#9fc89f'; ctx.beginPath(); ctx.arc(VW / 2 - (pages.length - 1) * 6 + i * 12, by + bh - 12, 3, 0, 7); ctx.fill(); }
  txt(t('◀ ▶ flip pages   ·   [A] / Tab: close'), VW / 2, by + bh - 22, 6.5, '#2a7a3a', 'center', false, false);
}

// ---------------------------------------------------------------- world interactions
const CASE_HINTS = {
  cpr: 'Something happened at the Zytturm in Zug old town! Follow the red alert. 🚨', seefest: 'It\'s Seefest on the Zug lake promenade. Keep your eyes open!',
  cafe: 'The Confiserie in Zug: famous Kirschtorte... and someone coughing a lot.', cave: 'The Höllgrotten in Baar called: a visitor got hurt!',
  burn: 'Barbecue at the Ägerisee: what could possibly go wrong? 🌭', tobel: 'Something happened on the Lorzentobel road. Drive carefully!',
  hiker: 'Up on the Zugerberg (take the Zugerbergbahn) a hiker needs help.',
};
function l3Hint() {
  if (L3().cases.course === undefined) return 'The Samariterverein Baar is right next to the station. Let\'s refresh our first aid!';
  const next = CASE_ORDER.find(k => L3().cases[k] === undefined);
  if (next) return CASE_HINTS[next];
  if (!L3().flags.exam) return 'All cases done! Final exam at the Samariterverein Baar. 📝';
  if (LEVELS[4]) return 'Something is glowing deep inside the Höllgrotten. Shall we take a look? ⏳';
  return 'Official Nothelferin! I feel very safe. And a bit hungry. Kirschtorte? 🍒';
}
function l3Talk(spot) {
  L3().cp = spot;
  const lines = [];
  if (!L3().met[spot]) {
    if (spot === 'zug3') lines.push(['C-Real', 'Busking at the lake promenade. Zug pays in Kirschtorte. 🍒']);
    if (spot === 'aegeri3') lines.push(['C-Real', 'Picnic at the Ägerisee! Swimming, barbecue... I brought the first aid kit, just in case.']);
    if (spot === 'berg3') lines.push(['C-Real', 'Zugerberg! I brought the skis again. Still not winter.']);
  }
  lines.push(['C-Real', l3Hint()]);
  if (ST.hearts < ST.maxHearts) lines.push(['C-Real', 'Have some Zuger cherries. 🍒', () => { ST.hearts = ST.maxHearts; sfx.pick(); }]);
  lines.push(['C-Real', 'I\'ll keep this spot as your checkpoint. ❤']);
  L3().met[spot] = 1;
  say(lines, saveGame);
}
function l3BuildingAct(b) {
  P.bike = false;
  const course = L3().cases.course !== undefined;
  switch (b.id) {
    case 'samariter':
      if (!course) startCase('course');
      else if (casesDone() >= CASE_ORDER.length && !L3().flags.exam) startExam();
      else if (L3().flags.exam) say([['Instructor', 'Our proudest graduate! Remember to refresh your course every few years.']]);
      else say([['Instructor', t('Solved {0}/8 cases. Come back for the exam when all are done!', casesDone())]]);
      break;
    case 'cafe':
      if (course && L3().cases.cafe === undefined) startCase('cafe');
      else say([['Sarah', 'One slice of Zuger Kirschtorte, please. Small bites. 🍒', () => { ST.hearts = ST.maxHearts; }]]);
      break;
    case 'hoell':
      if (course && L3().cases.cave === undefined) startCase('cave');
      else if (L3().flags.finished && LEVELS[4]) l4PortalFromBaar();   // the time portal deep in the caves (history.js)
      else say([['Sarah', 'The Höllgrotten: stalactites like a Zumthor bath. Mind the wet stairs!']]);
      break;
    case 'funi': case 'funitop': {
      const up = b.id === 'funi', to = BMAP[up ? 'funitop' : 'funi'];
      say([['Sarah', up ? 'Zugerbergbahn up the mountain! 🚠' : 'Back down to Zug! 🚠']], () => transition(() => { P.x = to.doorX; P.y = to.doorY + 10; tone(523, .2, 'triangle', .08); tone(659, .2, 'triangle', .08, 0, .2); }));
      break;
    }
  }
}
function l3Interactables(L) {
  if (L3().cases.course !== undefined) for (const k in CASE_SPOTS) if (L3().cases[k] === undefined) L.push({ x: CASE_SPOTS[k].x, y: CASE_SPOTS[k].y - 10, r: 30, label: 'Help!', act: () => startCase(k) });
  for (const c of cherryTrees) if (c.picked <= 0) L.push({ x: c.x, y: c.y - 8, r: 22, label: 'Cherries', act: () => { c.picked = 60; L3().cherries++; ST.hearts = Math.min(ST.maxHearts, ST.hearts + 1); sfx.pick(); spawnHearts(c.x, c.y - 20, 3); popText(c.x, c.y - 30, 'Zuger cherries! 🍒', '#ff8a9a'); } });
}
function l3OnEnter(first) {
  L3().flags.arrived = 1; ST.items.bike = true;   // her black bike is waiting at home in Baar
  if (!first) return;
  setTimeout(() => say([['Sarah', 'Home sweet Baar! After California... Kanton Zug feels so peaceful.'], ['C-Real', 'Peaceful? After everything we survived, let\'s refresh our first aid. The Samariterverein Baar has a course today!'],
    ['Note', 'This level is a refresher of basic first aid as taught in Swiss first aid courses. It does not replace a real course (e.g. Samariter or SRK). Book one!']]), 800);
}
function l3Respawn() { const s = CR_SPOTS[L3().cp] || CR_SPOTS.baar3; P.x = s.x; P.y = s.y + 18; say([['C-Real', 'Careful! Even first aiders need first aid sometimes. 🩹']]); }
Object.assign(PORTRAITS, {
  'Instructor': () => drawPerson(0, 0, { shirt: '#2a9a4a', pants: '#3a3a4a', hair: '#8a5a2a' }),
  'Dispatcher 144': () => drawPerson(0, 0, { shirt: '#3a6ad8', extra: (x, y) => { R(x - 4, y - 17, 1, 4, '#222'); R(x - 4, y - 13, 3, 1, '#222'); } }),
  'Rega 1414': () => drawPerson(0, 0, { shirt: '#d52b1e', extra: (x, y) => { R(x - 4, y - 17, 1, 4, '#222'); R(x - 4, y - 13, 3, 1, '#222'); } }),
  'Paramedic': () => drawPerson(0, 0, { shirt: '#ffd34d', pants: '#2a9a4a' }),
  'Tourist': () => drawPerson(0, 0, { shirt: '#f2c230', hat: 'cap', hatCol: '#d94b4b' }), 'Guide': () => drawPerson(0, 0, { shirt: '#6a5a4a', hat: 'beanie', hatCol: '#ffd34d' }),
  'Grill fan': () => drawPerson(0, 0, { shirt: '#e86a3a', beard: '#6a4a2a' }), 'Hiker': () => drawPerson(0, 0, { shirt: '#3a7ad8', hat: 'cap', hatCol: '#2a9a4a' }),
  'Note': () => { R(-7, -18, 14, 16, '#2a9a4a'); R(-1, -16, 2, 12, '#fff'); R(-5, -11, 10, 2, '#fff'); },
});
Object.assign(SPEAKER_COL, { 'Instructor': '#7ee081', 'Dispatcher 144': '#6fb8ff', 'Rega 1414': '#ff8a8a', 'Paramedic': '#ffd34d', 'Tourist': '#ffd34d', 'Guide': '#e0c080', 'Grill fan': '#ff9a6a', 'Hiker': '#8ac0ff', 'Note': '#9fe0a0' });

// ---------------------------------------------------------------- Level 3 definition
const LEVEL3 = {
  W: L3_W, H: L3_H, seed: 6340, buildings: L3_BUILDINGS, paths: L3_PATHS, crSpots: L3_CR_SPOTS, start: L3_START, signs: L3_SIGNS,
  zoneOf: l3Zone, baseTile: l3Base, terrain: l3Terrain, pathTile: (tx, ty, p) => p.trail ? T.PATH : oldTown(tx, ty) ? T.COB : T.ASPH,
  clearSpots: () => CHERRY_TREES.concat(Object.values(CASE_SPOTS).map(s => [Math.floor(s.x / 16), Math.floor(s.y / 16)])),
  snowyPine: () => false,
  spawn: l3Spawn, update: l3Update, onB: l1OnB, interactables: l3Interactables, drawGround: l3DrawGround, drawables: l3Drawables, drawBuilding: l3DrawBuilding, overlay: l3Overlay,
  talk: l3Talk, buildingAct: l3BuildingAct, respawn: l3Respawn, worldLabels: l3WorldLabels, onEnter: l3OnEnter,
  hud: () => `✚ ${casesDone()}/8   ⭐ ${totalStars()}/24   🍒 ${L3().cherries}` + (P.bike ? '  🚲!' : '  🚲'),
  bookInput: l3BookInput, drawBook: l3DrawBook, music: 'world',
  pauseLines: ['Move: Arrow keys / WASD / stick', '[A]: talk · help · rope skip', 'B (B, Shift): hop on / off the black bike', 'Book (Tab, Q): your first aid handbook', 'M: mute · Esc / P: pause', '', 'Solve 8 first aid cases, then pass the exam.', 'Look – Think – Act. Protect yourself first!', 'Emergency: 144 · Rega 1414 · Tox 145'],
  zoneNames: { baar: 'Baar', zug: 'Zug', lake: 'Zugersee', berg: 'Zugerberg', tobel: 'Lorzentobel', aegeri: 'Ägerisee' },
  zoneTexts: { lake: 'The Zugersee! Famous for its sunsets and the Seefest. 🌅', berg: 'Zugerberg: cows, forest and a great view over the lake. 🐄', tobel: 'Lorzentobel: careful on that winding road! 🏍️', aegeri: 'Ägerisee! Barbecue weather. 🌭', zug: 'Zug! Old town, Zytturm and Kirschtorte. 🍒' },
  crTexts: ['Fun fact: the Zytturm clock also shows the moon phases. Very architect.', 'Kirschtorte count today: 2. It\'s for research.', 'Remember: 144 for the ambulance, 1414 for Rega. I made a song about it. 🎸', 'Saw a swan on the Zugersee. It looked at me like Ranger Jay.', 'Always look at the ceiling. Also: always check for dangers first. 🩹'],
  debug() { ST.items.bike = true; },
};
LEVELS[3] = LEVEL3;
// ================================================================ translations [English, Deutsch, Schwiizerdütsch]
addTR([
  // world
  ["BAAR. Home of the Höllgrotten caves, the Lorze and the best cherries in the canton.", "BAAR. Heimat der Höllgrotten, der Lorze und der besten Kirschen im Kanton.", "BAAR. Dihei vo de Höllgrotte, de Lorze und de beschte Chriesi im Kanton."],
  ["ZUG. Lake, old town, Zytturm and Zuger Kirschtorte. Population: very relaxed.", "ZUG. See, Altstadt, Zytturm und Zuger Kirschtorte. Bevölkerung: sehr entspannt.", "ZUG. See, Altstadt, Zytturm und Zuger Chriesitorte. Bevölkerig: sehr entspannt."],
  ["LORZENTOBEL. Winding road, narrow bridges. Drive carefully!", "LORZENTOBEL. Kurvige Strasse, schmale Brücken. Vorsichtig fahren!", "LORZETOBEL. Kurvigi Strass, schmali Brugge. Vorsichtig fahre!"],
  ["AED (defibrillator) available here 24/7. Green sign with a heart and a lightning bolt.", "AED (Defibrillator) hier rund um die Uhr verfügbar. Grünes Schild mit Herz und Blitz.", "AED (Defibrillator) da rund um d Uhr verfüegbar. Grüens Schild mit Härz und Blitz."],
  ["Course", "Kurs", "Kurs"], ["Help!", "Helfen!", "Hälfe!"], ["Cherries", "Kirschen", "Chriesi"], ["Zuger cherries! 🍒", "Zuger Kirschen! 🍒", "Zuger Chriesi! 🍒"],
  ["San Francisco ✈ Zürich → Baar", "San Francisco ✈ Zürich → Baar", "San Francisco ✈ Züri → Baar"], ["Level 3: Nothelfer Zug", "Level 3: Nothelfer Zug", "Level 3: Nothelfer Zug"],
  ["✚ Level 3: Kanton Zug", "✚ Level 3: Kanton Zug", "✚ Level 3: Kanton Zug"],
  ["Shasta slides, wildfires, rockfall... Time to fly home. And maybe refresh our first aid. 🩹", "Rutschpartien am Shasta, Waldbrände, Steinschlag... Zeit, heimzufliegen. Und vielleicht unsere Erste Hilfe aufzufrischen. 🩹", "Rutschpartie am Shasta, Waldbränd, Steischlag... Ziit, hei z flüge. Und vilicht üsi Erschti Hilf ufzfrische. 🩹"],
  ["Home to Baar! ✈️", "Heim nach Baar! ✈️", "Hei uf Baar! ✈️"],
  ["The Zugersee! Famous for its sunsets and the Seefest. 🌅", "Der Zugersee! Berühmt für seine Sonnenuntergänge und das Seefest. 🌅", "De Zugersee! Berüehmt für sini Sunneundergäng und s Seefescht. 🌅"],
  ["Zugerberg: cows, forest and a great view over the lake. 🐄", "Zugerberg: Kühe, Wald und eine tolle Aussicht über den See. 🐄", "Zugerberg: Chüe, Wald und e mega Ussicht über de See. 🐄"],
  ["Lorzentobel: careful on that winding road! 🏍️", "Lorzentobel: Vorsicht auf dieser kurvigen Strasse! 🏍️", "Lorzetobel: Obacht uf dere kurvige Strass! 🏍️"],
  ["Ägerisee! Barbecue weather. 🌭", "Ägerisee! Grillwetter. 🌭", "Ägerisee! Grillwätter. 🌭"], ["Zug! Old town, Zytturm and Kirschtorte. 🍒", "Zug! Altstadt, Zytturm und Kirschtorte. 🍒", "Zug! Altstadt, Zytturm und Chriesitorte. 🍒"],
  ["Fun fact: the Zytturm clock also shows the moon phases. Very architect.", "Fun Fact: Die Zytturm-Uhr zeigt auch die Mondphasen. Sehr Architektin.", "Fun Fact: D Zytturm-Uhr zeigt au d Mondphase. Sehr Architektin."],
  ["Kirschtorte count today: 2. It's for research.", "Kirschtorten heute: 2. Zu Forschungszwecken.", "Chriesitorte hüt: 2. Für d Forschig."],
  ["Remember: 144 for the ambulance, 1414 for Rega. I made a song about it. 🎸", "Merke: 144 für die Ambulanz, 1414 für die Rega. Ich hab ein Lied darüber gemacht. 🎸", "Merk dr: 144 für d Ambulanz, 1414 für d Rega. Ich ha es Lied drüber gmacht. 🎸"],
  ["Saw a swan on the Zugersee. It looked at me like Ranger Jay.", "Hab einen Schwan auf dem Zugersee gesehen. Er hat mich angeschaut wie Ranger Jay.", "Han en Schwan uf em Zugersee gseh. Er het mi aagluegt wie de Ranger Jay."],
  ["Always look at the ceiling. Also: always check for dangers first. 🩹", "Immer an die Decke schauen. Und: immer zuerst auf Gefahren achten. 🩹", "Immer a d Decki luege. Und: immer zerscht uf Gfahre achte. 🩹"],
  ["[A]: talk · help · rope skip", "[A]: reden · helfen · seilspringen", "[A]: rede · hälfe · seilgumpe"], ["Book (Tab, Q): your first aid handbook", "Buch (Tab, Q): dein Erste-Hilfe-Handbuch", "Buech (Tab, Q): dis Erschti-Hilf-Handbuech"],
  ["Solve 8 first aid cases, then pass the exam.", "Löse 8 Erste-Hilfe-Fälle, dann besteh die Prüfung.", "Lös 8 Erschti-Hilf-Fäll, denn bestand d Prüefig."], ["Look – Think – Act. Protect yourself first!", "Schauen – Denken – Handeln. Zuerst dich selbst schützen!", "Schaue – Dänke – Handle. Zerscht di sälber schütze!"],
  ["Emergency: 144 · Rega 1414 · Tox 145", "Notruf: 144 · Rega 1414 · Tox 145", "Notruef: 144 · Rega 1414 · Tox 145"],
  // C-Real & hints
  ["The Samariterverein Baar is right next to the station. Let's refresh our first aid!", "Der Samariterverein Baar ist gleich neben dem Bahnhof. Frischen wir unsere Erste Hilfe auf!", "De Samariterverein Baar isch grad näbem Bahnhof. Mer frisched üsi Erschti Hilf uf!"],
  ["All cases done! Final exam at the Samariterverein Baar. 📝", "Alle Fälle gelöst! Abschlussprüfung beim Samariterverein Baar. 📝", "Alli Fäll glöst! Abschlussprüefig bim Samariterverein Baar. 📝"],
  ["Official Nothelferin! I feel very safe. And a bit hungry. Kirschtorte? 🍒", "Offizielle Nothelferin! Ich fühle mich sehr sicher. Und ein bisschen hungrig. Kirschtorte? 🍒", "Offizielli Nothelferin! Ich fühl mi sehr sicher. Und chli hungrig. Chriesitorte? 🍒"],
  ["Something happened at the Zytturm in Zug old town! Follow the red alert. 🚨", "Beim Zytturm in der Zuger Altstadt ist etwas passiert! Folge dem roten Alarm. 🚨", "Bim Zytturm in de Zuger Altstadt isch öppis passiert! Folg em rote Alarm. 🚨"],
  ["It's Seefest on the Zug lake promenade. Keep your eyes open!", "Seefest an der Zuger Seepromenade. Halt die Augen offen!", "Seefescht a de Zuger Seepromenade. Heb d Auge offe!"],
  ["The Confiserie in Zug: famous Kirschtorte... and someone coughing a lot.", "Die Confiserie in Zug: berühmte Kirschtorte... und jemand hustet sehr.", "D Confiserie z Zug: berüehmti Chriesitorte... und öpper hueschtet mega."],
  ["The Höllgrotten in Baar called: a visitor got hurt!", "Die Höllgrotten in Baar haben angerufen: Ein Besucher hat sich verletzt!", "D Höllgrotte z Baar händ aagrüeft: En Bsuecher het sich verletzt!"],
  ["Barbecue at the Ägerisee: what could possibly go wrong? 🌭", "Grillieren am Ägerisee: Was kann da schon schiefgehen? 🌭", "Grilliere am Ägerisee: Was cha da scho schiefgah? 🌭"],
  ["Something happened on the Lorzentobel road. Drive carefully!", "Auf der Lorzentobelstrasse ist etwas passiert. Fahr vorsichtig!", "Uf de Lorzetobelstrass isch öppis passiert. Fahr vorsichtig!"],
  ["Up on the Zugerberg (take the Zugerbergbahn) a hiker needs help.", "Oben auf dem Zugerberg (nimm die Zugerbergbahn) braucht ein Wanderer Hilfe.", "Obe uf em Zugerberg (nimm d Zugerbergbahn) bruucht en Wanderer Hilf."],
  ["Busking at the lake promenade. Zug pays in Kirschtorte. 🍒", "Strassenmusik an der Seepromenade. Zug bezahlt in Kirschtorte. 🍒", "Strassemusig a de Seepromenade. Zug zahlt mit Chriesitorte. 🍒"],
  ["Picnic at the Ägerisee! Swimming, barbecue... I brought the first aid kit, just in case.", "Picknick am Ägerisee! Baden, grillieren... Ich hab die Erste-Hilfe-Tasche dabei, nur für alle Fälle.", "Picknick am Ägerisee! Bade, grilliere... Ich ha d Erschti-Hilf-Täsche debii, nur für all Fäll."],
  ["Zugerberg! I brought the skis again. Still not winter.", "Zugerberg! Ich hab wieder die Skis dabei. Immer noch kein Winter.", "Zugerberg! Ich ha wieder d Ski debii. Immer no kei Winter."],
  ["Have some Zuger cherries. 🍒", "Nimm ein paar Zuger Kirschen. 🍒", "Nimm es paar Zuger Chriesi. 🍒"],
  ["Our proudest graduate! Remember to refresh your course every few years.", "Unsere stolzeste Absolventin! Denk daran, den Kurs alle paar Jahre aufzufrischen.", "Üsi stolzischti Absolventin! Dänk dra, de Kurs alli paar Jahr ufzfrische."],
  ["Solved {0}/8 cases. Come back for the exam when all are done!", "{0}/8 Fälle gelöst. Komm zur Prüfung, wenn alle erledigt sind!", "{0}/8 Fäll glöst. Chumm zur Prüefig, wenn alli erledigt sind!"],
  ["One slice of Zuger Kirschtorte, please. Small bites. 🍒", "Ein Stück Zuger Kirschtorte, bitte. Kleine Bissen. 🍒", "Es Stück Zuger Chriesitorte, bitte. Chliini Bisse. 🍒"],
  ["The Höllgrotten: stalactites like a Zumthor bath. Mind the wet stairs!", "Die Höllgrotten: Tropfsteine wie in einem Zumthor-Bad. Vorsicht auf der nassen Treppe!", "D Höllgrotte: Tropfstei wie imene Zumthor-Bad. Obacht uf de nasse Stäge!"],
  ["Zugerbergbahn up the mountain! 🚠", "Mit der Zugerbergbahn auf den Berg! 🚠", "Mit de Zugerbergbahn uf de Berg! 🚠"], ["Back down to Zug! 🚠", "Zurück runter nach Zug! 🚠", "Zrugg abe uf Zug! 🚠"],
  ["Home sweet Baar! After California... Kanton Zug feels so peaceful.", "Home sweet Baar! Nach Kalifornien... fühlt sich der Kanton Zug so friedlich an.", "Home sweet Baar! Nach Kalifornie... fühlt sich de Kanton Zug so friedlich aa."],
  ["Peaceful? After everything we survived, let's refresh our first aid. The Samariterverein Baar has a course today!", "Friedlich? Nach allem, was wir überlebt haben, frischen wir unsere Erste Hilfe auf. Der Samariterverein Baar hat heute einen Kurs!", "Friedlich? Nach allem, wo mer überläbt händ, frisched mer üsi Erschti Hilf uf. De Samariterverein Baar het hüt en Kurs!"],
  ["This level is a refresher of basic first aid as taught in Swiss first aid courses. It does not replace a real course (e.g. Samariter or SRK). Book one!", "Dieses Level ist eine Auffrischung der Erste-Hilfe-Grundlagen aus Schweizer Kursen. Es ersetzt keinen echten Kurs (z. B. Samariter oder SRK). Buch einen!", "Das Level isch e Uffrischig vo de Erschti-Hilf-Grundlage us Schwiizer Kürs. Es ersetzt kei ächte Kurs (z. B. Samariter oder SRK). Buech eine!"],
  ["Careful! Even first aiders need first aid sometimes. 🩹", "Vorsicht! Auch Nothelfer brauchen manchmal Erste Hilfe. 🩹", "Obacht! Au Nothelfer bruuched mängisch Erschti Hilf. 🩹"],
  // speakers
  ["Instructor", "Kursleiterin", "Kursleiterin"], ["Dispatcher 144", "Notrufzentrale 144", "Notrufzentrale 144"], ["Paramedic", "Rettungssanitäter", "Rettigssanitäter"], ["Guide", "Führer", "Füehrer"],
  ["Grill fan", "Grillfan", "Grillfan"], ["Hiker", "Wanderer", "Wanderer"], ["Note", "Hinweis", "Hiwiis"],
  // case engine & UI
  ["Look", "Schauen", "Schaue"], ["Think", "Denken", "Dänke"], ["Act", "Handeln", "Handle"],
  ["unresponsive", "bewusstlos", "bewusstlos"], ["awake", "wach", "wach"], ["normal", "normal", "normal"], ["not normal!", "nicht normal!", "nöd normal!"], ["choking!", "erstickt!", "verstickt!"], ["severe!", "stark!", "starch!"], ["controlled", "gestillt", "gstillt"],
  ["Dial the right emergency number on the keypad, then press 📞 (arrows + [A]).", "Wähle die richtige Notrufnummer auf der Tastatur, dann drück 📞 (Pfeile + [A]).", "Wähl di richtig Notruefnummere uf de Taschtatur, denn drück 📞 (Pfiil + [A])."],
  ["Not yet. Step {0} is: \"{1}\"", "Noch nicht. Schritt {0} ist: \"{1}\"", "No nöd. Schritt {0} isch: \"{1}\""], ["Too loose! Again.", "Zu locker! Nochmal.", "Z lugg! Nomal."], ["Wrong timing!", "Falsches Timing!", "Falsches Timing!"],
  ["Wraps: {0}/{1}", "Windungen: {0}/{1}", "Wicklige: {0}/{1}"], ["{0} min", "{0} Min.", "{0} Min."], ["Cooled for {0} minutes. 💧", "{0} Minuten gekühlt. 💧", "{0} Minute kühlt. 💧"],
  ["Only {0} minutes! Burns need 15–20 minutes of cooling.", "Nur {0} Minuten! Verbrennungen brauchen 15–20 Minuten Kühlung.", "Nur {0} Minute! Verbrännige bruuched 15–20 Minute Chüehlig."],
  ["The bleeding slows down.", "Die Blutung lässt nach.", "D Bluetig lat noh."], ["Pressure bandage done.", "Druckverband angelegt.", "Druckverband aagleit."], ["Five back blows... it's still stuck!", "Fünf Rückenschläge... es steckt immer noch fest!", "Föif Ruggeschläg... es steckt immer no fescht!"], ["POP! 🍒", "PLOPP! 🍒", "PLOPP! 🍒"],
  ["Cooled for 20 minutes. 💧", "20 Minuten gekühlt. 💧", "20 Minute kühlt. 💧"], ["Help is on the way. 🚑", "Hilfe ist unterwegs. 🚑", "Hilf isch unterwägs. 🚑"], ["Paramedics arrive and take over. 🚑", "Der Rettungsdienst trifft ein und übernimmt. 🚑", "De Rettigsdienscht chunnt und übernimmt. 🚑"],
  ["112 works in Switzerland too. 144 is the direct line to the ambulance.", "112 funktioniert auch in der Schweiz. 144 ist die direkte Linie zur Ambulanz.", "112 gaht au i de Schwiiz. 144 isch di diräkt Linie zur Ambulanz."],
  ["117 is the police. For a medical emergency: 144.", "117 ist die Polizei. Für einen medizinischen Notfall: 144.", "117 isch d Polizei. Für en medizinische Notfall: 144."], ["118 is the fire brigade. Medical emergency: 144.", "118 ist die Feuerwehr. Medizinischer Notfall: 144.", "118 isch d Füürwehr. Medizinische Notfall: 144."],
  ["145 is Tox Info Suisse (poisoning advice). Here you need 144.", "145 ist Tox Info Suisse (Beratung bei Vergiftungen). Hier brauchst du 144.", "145 isch Tox Info Suisse (Berootig bi Vergiftige). Da bruuchsch 144."], ["1414 is Rega, the air rescue. In town: 144.", "1414 ist die Rega, die Luftrettung. In der Stadt: 144.", "1414 isch d Rega, d Luftrettig. I de Stadt: 144."],
  ["That isn't the right number. Medical emergency: 144!", "Das ist nicht die richtige Nummer. Medizinischer Notfall: 144!", "Das isch nöd di richtig Nummere. Medizinische Notfall: 144!"],
  ["First 30 compressions, then 2 breaths!", "Zuerst 30 Kompressionen, dann 2 Beatmungen!", "Zerscht 30 Kompressione, denn 2 Beatmige!"], ["Too slow! Aim for 100–120 per minute.", "Zu langsam! Ziel: 100–120 pro Minute.", "Z langsam! Ziel: 100–120 pro Minute."], ["Too fast! Aim for 100–120 per minute.", "Zu schnell! Ziel: 100–120 pro Minute.", "Z schnäll! Ziel: 100–120 pro Minute."],
  ["Now 2 breaths: press B twice!", "Jetzt 2 Beatmungen: drück zweimal B!", "Jetzt 2 Beatmige: drück zweimal B!"], ["C-Real is back with the AED! Switch it on. ⚡", "C-Real ist mit dem AED zurück! Einschalten. ⚡", "De C-Real isch mit em AED zrugg! Iischalte. ⚡"],
  ["Not there! One pad below the right collarbone, the other on the left side below the armpit.", "Nicht dort! Eine Elektrode unter das rechte Schlüsselbein, die andere links seitlich unter die Achsel.", "Nöd det! Ei Elektrode unders rächte Schlüsselbei, di ander links siitlich under d Achsle."],
  ["Don't touch the patient while the AED analyses!", "Patient nicht berühren, während der AED analysiert!", "De Patient nöd aalänge, solang de AED analysiert!"],
  ["Shout \"Stand clear!\", check nobody touches him, press SHOCK", "\"Weg vom Patienten!\" rufen, prüfen, dass ihn niemand berührt, SCHOCK drücken", "\"Wäg vom Patient!\" rüefe, luege, dass ne niemer aalangt, SCHOCK drücke"],
  ["Keep doing compressions during the shock", "Während des Schocks weiter drücken", "Während em Schock wiiter drücke"], ["Nobody may touch the patient during the shock!", "Während des Schocks darf niemand den Patienten berühren!", "Während em Schock darf niemer de Patient aalänge!"],
  ["Remove the pads to be safe", "Die Elektroden sicherheitshalber entfernen", "D Elektrode sicherheitshalber ewägneh"], ["The pads must stay on. Stand clear and shock.", "Die Elektroden bleiben drauf. Weg vom Patienten und schocken.", "D Elektrode blibed druf. Wäg vom Patient und schocke."],
  ["Shock delivered. Continue CPR immediately!", "Schock abgegeben. Sofort mit der Herzdruckmassage weitermachen!", "Schock abgä. Sofort mit de Herzdruckmassage wiitermache!"],
  ["Upper right chest, below the collarbone", "Rechts oben auf der Brust, unter dem Schlüsselbein", "Rächts obe uf de Brust, underem Schlüsselbei"], ["Left side, below the armpit", "Links seitlich, unter der Achsel", "Links siitlich, under de Achsle"], ["On the belly button", "Auf dem Bauchnabel", "Uf em Buchnabel"], ["On the neck", "Am Hals", "Am Hals"],
  ["Chest compressions: tap [A] to the beat (100–120/min)", "Herzdruckmassage: drück [A] im Takt (100–120/Min.)", "Herzdruckmassage: drück [A] im Takt (100–120/Min.)"], ["{0}/min", "{0}/Min.", "{0}/Min."],
  ["Push hard (5–6 cm), let the chest come back up fully.", "Kräftig drücken (5–6 cm), den Brustkorb vollständig entlasten.", "Fescht drücke (5–6 cm), de Bruschtchorb ganz entlaschte."],
  ["2 rescue breaths: tilt the head back, lift the chin. Press B twice!", "2 Beatmungen: Kopf nach hinten neigen, Kinn anheben. Drück zweimal B!", "2 Beatmige: Chopf nach hine neige, Chinn aalüpfe. Drück zweimal B!"],
  ["Place the AED pads (◀ ▶ + [A])", "AED-Elektroden aufkleben (◀ ▶ + [A])", "AED-Elektrode ufchläbe (◀ ▶ + [A])"],
  ["AED: \"Analysing heart rhythm. Do not touch the patient.\"", "AED: \"Herzrhythmus wird analysiert. Patient nicht berühren.\"", "AED: \"Herzrhythmus wird analysiert. Patient nöd aalänge.\""],
  ["AED: \"Shock advised.\" What do you do?", "AED: \"Schock empfohlen.\" Was tust du?", "AED: \"Schock empfohle.\" Was machsch?"], ["SHOCK!", "SCHOCK!", "SCHOCK!"],
  ["Rega is coming! 🚁", "Die Rega kommt! 🚁", "D Rega chunnt! 🚁"], ["Rettungsdienst Zug is coming! 🚑", "Der Rettungsdienst Zug kommt! 🚑", "De Rettigsdienscht Zug chunnt! 🚑"], ["Case solved!", "Fall gelöst!", "Fall glöst!"], ["New handbook card: {0}", "Neue Handbuch-Karte: {0}", "Neui Handbuech-Charte: {0}"],
  ["All cases done!! Time for the final exam at the Samariterverein Baar. 📝", "Alle Fälle gelöst!! Zeit für die Abschlussprüfung beim Samariterverein Baar. 📝", "Alli Fäll glöst!! Ziit für d Abschlussprüefig bim Samariterverein Baar. 📝"],
  ["{0}/8 first aid cases! New card in your handbook (TAB). 📖", "{0}/8 Erste-Hilfe-Fälle! Neue Karte in deinem Handbuch (TAB). 📖", "{0}/8 Erschti-Hilf-Fäll! Neui Charte i dim Handbuech (TAB). 📖"],
  // case titles & places
  ["Samariter course", "Samariterkurs", "Samariterkurs"], ["Cardiac arrest", "Herz-Kreislauf-Stillstand", "Herz-Kreislauf-Stillstand"], ["Zytturm, Zug old town", "Zytturm, Altstadt Zug", "Zytturm, Altstadt Zug"],
  ["Unconscious, breathing", "Bewusstlos, atmet", "Bewusstlos, schnuufet"], ["Zug lake promenade, Seefest", "Seepromenade Zug, Seefest", "Seepromenade Zug, Seefescht"], ["Choking", "Fremdkörper in den Atemwegen", "Verschluckt (Fremdkörper)"],
  ["Severe bleeding", "Starke Blutung", "Starchi Bluetig"], ["Burn", "Verbrennung", "Verbrännig"], ["Ägerisee barbecue", "Grillieren am Ägerisee", "Grilliere am Ägerisee"], ["Road accident", "Verkehrsunfall", "Verchehrsunfall"],
  ["Lorzentobel road", "Lorzentobelstrasse", "Lorzetobelstrass"], ["Mountain accident", "Bergunfall", "Bergunfall"],
  // course
  ["Grüezi and welcome to the Samariterverein Baar! Today: the Nothelferkurs refresher.", "Grüezi und willkommen beim Samariterverein Baar! Heute: Auffrischung des Nothelferkurses.", "Grüezi und willkomme bim Samariterverein Baar! Hüt: Uffrischig vom Nothelferkurs."],
  ["I'm just here for the free coffee. And moral support. ☕", "Ich bin nur wegen des Gratiskaffees hier. Und als moralische Unterstützung. ☕", "Ich bi nur wäg em Gratis-Kafi da. Und als moralischi Unterstützig. ☕"],
  ["In every emergency, first aiders follow three steps. Which order?", "In jedem Notfall folgen Nothelfer drei Schritten. In welcher Reihenfolge?", "I jedem Notfall folged Nothelfer drü Schritt. I welere Reihefolg?"],
  ["Look – Think – Act", "Schauen – Denken – Handeln", "Schaue – Dänke – Handle"], ["Act – Look – Think", "Handeln – Schauen – Denken", "Handle – Schaue – Dänke"], ["Think – Act – Look", "Denken – Handeln – Schauen", "Dänke – Handle – Schaue"],
  ["Acting first can put you in danger. First LOOK: what happened, any dangers?", "Wer zuerst handelt, bringt sich in Gefahr. Zuerst SCHAUEN: Was ist passiert, gibt es Gefahren?", "Wer zerscht handlet, bringt sich i Gfahr. Zerscht LUEGE: Was isch passiert, gits Gfahre?"],
  ["You can only think once you have looked. Look – Think – Act.", "Denken kann man erst, wenn man geschaut hat. Schauen – Denken – Handeln.", "Dänke chasch erscht, wenn gluegt hesch. Schaue – Dänke – Handle."],
  ["Schauen – Denken – Handeln: look at the scene, think about what's needed, then act.", "Schauen – Denken – Handeln: die Situation anschauen, überlegen, was nötig ist, dann handeln.", "Schaue – Dänke – Handle: d Situation aaluege, überlegge, was nötig isch, denn handle."],
  ["What is ALWAYS your first priority?", "Was hat IMMER oberste Priorität?", "Was het IMMER oberschti Priorität?"], ["My own safety", "Meine eigene Sicherheit", "Mini eigeti Sicherheit"],
  ["Speed: get to the patient as fast as possible", "Tempo: so schnell wie möglich zum Patienten", "Tempo: so schnell wie möglich zum Patient"], ["A second casualty helps nobody. Self-protection comes first.", "Ein zweites Opfer hilft niemandem. Selbstschutz kommt zuerst.", "Es zweits Opfer hilft niemertem. Sälbschtschutz chunnt zerscht."],
  ["Taking a photo for the report", "Ein Foto für den Bericht machen", "Es Foti für de Bricht mache"], ["Please don't. Self-protection first, then help.", "Bitte nicht. Zuerst Selbstschutz, dann helfen.", "Bitte nöd. Zerscht Sälbschtschutz, denn hälfe."],
  ["Exactly: protect yourself, secure the scene, then help.", "Genau: dich schützen, die Unfallstelle sichern, dann helfen.", "Genau: di schütze, d Unfallstell sichere, denn hälfe."],
  ["Which number calls the ambulance in Switzerland?", "Welche Nummer ruft in der Schweiz die Ambulanz?", "Weli Nummere rüeft i de Schwiiz d Ambulanz?"], ["117 is the police.", "117 ist die Polizei.", "117 isch d Polizei."], ["118 is the fire brigade.", "118 ist die Feuerwehr.", "118 isch d Füürwehr."],
  ["1414 is Rega, the air rescue (great in the mountains).", "1414 ist die Rega, die Luftrettung (super in den Bergen).", "1414 isch d Rega, d Luftrettig (super i de Berge)."], ["144: ambulance and medical emergencies.", "144: Ambulanz und medizinische Notfälle.", "144: Ambulanz und medizinischi Notfäll."],
  ["Somebody swallowed a cleaning product. Who gives advice?", "Jemand hat ein Putzmittel geschluckt. Wer berät?", "Öpper het es Putzmittel gschluckt. Wer berootet?"], ["145, Tox Info Suisse", "145, Tox Info Suisse", "145, Tox Info Suisse"], ["1414 is Rega, the air rescue.", "1414 ist die Rega, die Luftrettung.", "1414 isch d Rega, d Luftrettig."],
  ["145: Tox Info Suisse for poisoning questions. In an acute emergency: always 144.", "145: Tox Info Suisse bei Fragen zu Vergiftungen. Im akuten Notfall: immer 144.", "145: Tox Info Suisse bi Frage zu Vergiftige. Im akute Notfall: immer 144."],
  ["Before touching a bleeding wound you put on...", "Bevor du eine blutende Wunde berührst, ziehst du an...", "Bevor du e bluetendi Wunde aalangsch, leisch aa..."], ["Disposable gloves", "Einweghandschuhe", "Iiweghändsche"], ["Sunscreen", "Sonnencreme", "Sunnecreme"],
  ["Nice for the beach, useless here. Gloves protect you from infections.", "Schön für den Strand, hier nutzlos. Handschuhe schützen dich vor Infektionen.", "Schön für de Strand, da nutzlos. Händsche schützed di vor Infektione."], ["Your nicest ring", "Deinen schönsten Ring", "Din schönschte Ring"],
  ["Rings get in the way. Gloves protect you and the patient.", "Ringe stören. Handschuhe schützen dich und den Patienten.", "Ring störed. Händsche schützed di und de Patient."], ["Gloves! There are some in every car first aid kit.", "Handschuhe! In jeder Autoapotheke hat es welche.", "Händsche! I jedere Autoapotheek hets."],
  ["Great start! Now go out there: Kanton Zug needs you. 🩹", "Toller Start! Jetzt raus mit dir: Der Kanton Zug braucht dich. 🩹", "Super Start! Jetzt use mit dir: De Kanton Zug bruucht di. 🩹"],
  ["LOOK: what happened, any dangers? THINK: what is needed, who can help? ACT: protect yourself, alert, help. Emergency numbers: 144 ambulance · 117 police · 118 fire · 1414 Rega · 145 Tox Info · 112 EU emergency.", "SCHAUEN: Was ist passiert, gibt es Gefahren? DENKEN: Was ist nötig, wer kann helfen? HANDELN: Selbstschutz, alarmieren, helfen. Notrufnummern: 144 Ambulanz · 117 Polizei · 118 Feuerwehr · 1414 Rega · 145 Tox Info · 112 EU-Notruf.", "SCHAUE: Was isch passiert, gits Gfahre? DÄNKE: Was isch nötig, wer cha hälfe? HANDLE: Sälbschtschutz, alarmiere, hälfe. Notruefnummere: 144 Ambulanz · 117 Polizei · 118 Füürwehr · 1414 Rega · 145 Tox Info · 112 EU-Notruef."],
  // CPR case
  ["Someone just collapsed next to the Zytturm!", "Gerade ist jemand neben dem Zytturm zusammengebrochen!", "Grad isch öpper näbem Zytturm zämebroche!"], ["I'm with you. Tell me what to do!", "Ich bin bei dir. Sag mir, was ich tun soll!", "Ich bi bi dir. Säg mer, was ich söll mache!"],
  ["A man lies on the cobblestones. First you...", "Ein Mann liegt auf dem Kopfsteinpflaster. Zuerst...", "En Maa liit uf em Pflaschter. Zerscht..."], ["Check the scene for dangers (traffic, bikes)", "prüfst du die Umgebung auf Gefahren (Verkehr, Velos)", "luegsch, öb s Gfahre git (Verchehr, Velos)"],
  ["Run straight across the road to him", "rennst du direkt über die Strasse zu ihm", "rennsch diräkt über d Strass zu ihm"], ["Look first! A bus would make two patients.", "Zuerst schauen! Ein Bus würde zwei Patienten machen.", "Zerscht luege! En Bus würd zwei Patiente mache."],
  ["Wait until someone else helps", "wartest du, bis jemand anderes hilft", "wartisch, bis öpper anders hilft"], ["Every second counts. You ARE the someone.", "Jede Sekunde zählt. Du BIST dieser Jemand.", "Jedi Sekunde zellt. Du BISCH dä Öpper."],
  ["The square is safe. You kneel down next to him.", "Der Platz ist sicher. Du kniest dich neben ihn.", "De Platz isch sicher. Du chniisch di näb ihn."], ["How do you check if he is conscious?", "Wie prüfst du, ob er bei Bewusstsein ist?", "Wie prüefsch, öb er bi Bewusstsii isch?"],
  ["Speak loudly and tap his shoulders: \"Hello, can you hear me?\"", "Laut ansprechen und an den Schultern berühren: \"Hallo, hören Sie mich?\"", "Lut aarede und a de Schultere aalänge: \"Hallo, ghöred Si mi?\""], ["Pour cold water on his face", "Kaltes Wasser ins Gesicht schütten", "Chalts Wasser is Gsicht schütte"],
  ["No. Talk to him loudly and tap his shoulders.", "Nein. Sprich ihn laut an und berühre seine Schultern.", "Nei. Red ne lut aa und läng a sini Schultere."], ["Look for his name in his wallet", "Im Portemonnaie nach seinem Namen suchen", "Im Portmonee nach sim Name sueche"],
  ["Not now! Check consciousness: speak loudly, tap the shoulders.", "Nicht jetzt! Bewusstsein prüfen: laut ansprechen, Schultern berühren.", "Nöd jetzt! Bewusstsii prüefe: lut aarede, Schultere aalänge."], ["No reaction. He is unresponsive.", "Keine Reaktion. Er ist bewusstlos.", "Kei Reaktion. Er isch bewusstlos."],
  ["He doesn't respond. Now you check his breathing:", "Er reagiert nicht. Jetzt prüfst du die Atmung:", "Er reagiert nöd. Jetzt prüefsch d Atmig:"],
  ["Tilt the head back, lift the chin, look, listen and feel for up to 10 seconds", "Kopf nach hinten neigen, Kinn anheben, sehen, hören, fühlen, maximal 10 Sekunden", "Chopf nach hine neige, Chinn aalüpfe, luege, lose, fühle, maximal 10 Sekunde"],
  ["Listen for one whole minute", "Eine ganze Minute lang lauschen", "E ganzi Minute lang lose"], ["Too long! Check for no more than 10 seconds.", "Zu lange! Höchstens 10 Sekunden prüfen.", "Z lang! Höchschtens 10 Sekunde prüefe."], ["Feel for a pulse at the wrist", "Puls am Handgelenk fühlen", "De Puls am Handgläich fühle"],
  ["Pulse checks are unreliable for first aiders. Check breathing, max. 10 seconds.", "Pulskontrollen sind für Laien unzuverlässig. Atmung prüfen, max. 10 Sekunden.", "Pulskontrolle sind für Laie unzueverlässig. D Atmig prüefe, max. 10 Sekunde."],
  ["Only rare gasps... That is NOT normal breathing!", "Nur seltene Schnappatmung... Das ist KEINE normale Atmung!", "Nur sältes Schnappe... Das isch KEI normali Atmig!"], ["Unresponsive and not breathing normally. What now?", "Bewusstlos und keine normale Atmung. Was jetzt?", "Bewusstlos und kei normali Atmig. Was jetzt?"],
  ["C-Real: get the AED from the pharmacy! I call 144.", "C-Real: Hol den AED aus der Apotheke! Ich rufe 144 an.", "C-Real: Hol de AED us de Apotheek! Ich rüef 144 aa."], ["Wait and see if he starts breathing again", "Abwarten, ob er wieder zu atmen beginnt", "Abwarte, öb er wieder aafangt schnuufe"],
  ["No time to wait: alarm 144, get an AED, start CPR.", "Keine Zeit zum Warten: 144 alarmieren, AED holen, Herzdruckmassage beginnen.", "Kei Ziit zum Warte: 144 alarmiere, AED hole, Herzdruckmassage aafange."], ["Put him in the recovery position", "Ihn in die Seitenlage bringen", "Ne i d Siitelag bringe"],
  ["The recovery position is only for people who ARE breathing normally.", "Die Seitenlage ist nur für Menschen, die normal atmen.", "D Siitelag isch nur für Lüt, wo normal schnuufed."], ["C-Real sprints off. You call on speaker.", "C-Real rennt los. Du rufst mit Lautsprecher an.", "De C-Real rennt los. Du rüefsch mit Lutsprächer aa."],
  ["Ambulance emergency line. Where exactly is the emergency?", "Sanitätsnotruf. Wo genau ist der Notfall?", "Sanitätsnotruef. Wo genau isch de Notfall?"], ["Zug old town, at the Zytturm on the Kolinplatz side", "Altstadt Zug, beim Zytturm auf der Seite Kolinplatz", "Altstadt Zug, bim Zytturm uf de Siite Kolinplatz"],
  ["Somewhere in Switzerland", "Irgendwo in der Schweiz", "Irgendwo i de Schwiiz"], ["The dispatcher needs the exact place: town, street, landmark.", "Die Zentrale braucht den genauen Ort: Ortschaft, Strasse, Orientierungspunkt.", "D Zentrale bruucht de genau Ort: Ortschaft, Strass, Orientierigspunkt."],
  ["Next to a cobblestone", "Neben einem Pflasterstein", "Näbeme Pflaschterstei"], ["Be precise: Zug, at the Zytturm.", "Sei genau: Zug, beim Zytturm.", "Bis genau: Zug, bim Zytturm."], ["What happened?", "Was ist passiert?", "Was isch passiert?"],
  ["A man collapsed. He is unresponsive and not breathing normally.", "Ein Mann ist zusammengebrochen. Er ist bewusstlos und atmet nicht normal.", "En Maa isch zämebroche. Er isch bewusstlos und schnuufet nöd normal."], ["Something bad", "Etwas Schlimmes", "Öppis Schlimms"],
  ["Be specific: unresponsive, not breathing normally.", "Sei konkret: bewusstlos, keine normale Atmung.", "Bis konkret: bewusstlos, kei normali Atmig."], ["He might just be tired", "Vielleicht ist er nur müde", "Vilicht isch er nur müed"], ["Describe what you see: unresponsive, not breathing normally.", "Beschreibe, was du siehst: bewusstlos, keine normale Atmung.", "Beschriib, was gsehsch: bewusstlos, kei normali Atmig."],
  ["The ambulance is on its way. Start chest compressions now. Can you do that?", "Die Ambulanz ist unterwegs. Beginnen Sie jetzt mit der Herzdruckmassage. Können Sie das?", "D Ambulanz isch unterwägs. Fanged Si jetzt mit de Herzdruckmassage aa. Chönd Si das?"],
  ["Yes. Phone on speaker, I'm starting.", "Ja. Telefon auf Lautsprecher, ich beginne.", "Ja. Telefon uf Lutsprächer, ich fang aa."], ["I'll hang up and call back later", "Ich lege auf und rufe später zurück", "Ich leg uf und rüef spöter zrugg"],
  ["Never hang up first. Keep the line open, the dispatcher can guide you.", "Nie zuerst auflegen. Leitung offen lassen, die Zentrale kann dich anleiten.", "Nie zerscht uflege. D Linie offe lah, d Zentrale cha di aaleite."],
  ["Rettungsdienst Zug, we take over! Great CPR, and thanks to the AED his heart is beating again.", "Rettungsdienst Zug, wir übernehmen! Super Herzdruckmassage, und dank dem AED schlägt sein Herz wieder.", "Rettigsdienscht Zug, mir übernämed! Super Herzdruckmassage, und dank em AED schlaht sis Härz wieder."],
  ["You just saved a life. Next to the Zytturm. Casual. 🥹", "Du hast gerade ein Leben gerettet. Neben dem Zytturm. Einfach so. 🥹", "Du hesch grad es Läbe grettet. Näbem Zytturm. Eifach so. 🥹"],
  ["CPR & AED", "Herzdruckmassage & AED", "Herzdruckmassage & AED"],
  ["Unresponsive and not breathing normally → call 144, get an AED. Push hard (5–6 cm) and fast (100–120/min) in the centre of the chest. 30 compressions : 2 breaths. Switch on the AED and follow its voice. Never stop until help takes over.", "Bewusstlos und keine normale Atmung → 144 anrufen, AED holen. Kräftig (5–6 cm) und schnell (100–120/Min.) in der Brustmitte drücken. 30 Kompressionen : 2 Beatmungen. AED einschalten und den Anweisungen folgen. Nicht aufhören, bis Hilfe übernimmt.", "Bewusstlos und kei normali Atmig → 144 aalüte, AED hole. Fescht (5–6 cm) und schnäll (100–120/Min.) i de Bruschtmitti drücke. 30 Kompressione : 2 Beatmige. AED iischalte und de Aawiisige folge. Nöd ufhöre, bis Hilf übernimmt."],
  // Seefest case
  ["The Seefest! Music, lights... and someone lying on the promenade.", "Das Seefest! Musik, Lichter... und jemand liegt auf der Promenade.", "S Seefescht! Musig, Liechter... und öpper liit uf de Promenade."], ["Too much Kirsch, maybe?", "Zu viel Kirsch, vielleicht?", "Z vill Chriesiwasser, vilicht?"],
  ["Before you go to her, you...", "Bevor du zu ihr gehst, ...", "Bevor du zu ihre gahsch, ..."], ["Check for dangers: broken glass, the lake, bikes", "prüfst du auf Gefahren: Glasscherben, der See, Velos", "luegsch uf Gfahre: Glasschärbe, de See, Velos"],
  ["Jump over the railing", "springst du über das Geländer", "gumpsch übers Gländer"], ["Careful! Look first: broken glass, water, traffic.", "Vorsicht! Zuerst schauen: Glasscherben, Wasser, Verkehr.", "Obacht! Zerscht luege: Glasschärbe, Wasser, Verchehr."], ["Film it for Instagram", "filmst du es für Instagram", "filmsch es für Instagram"],
  ["No. Look for dangers, then help.", "Nein. Auf Gefahren achten, dann helfen.", "Nei. Uf Gfahre achte, denn hälfe."], ["Some glass shards. You push them away with your shoe.", "Ein paar Glasscherben. Du schiebst sie mit dem Schuh weg.", "Es paar Glasschärbe. Du schiebsch si mit em Schue wäg."],
  ["You speak loudly and tap her shoulders. No reaction. Next?", "Du sprichst sie laut an und berührst ihre Schultern. Keine Reaktion. Was nun?", "Du redsch si lut aa und langsch a ihri Schultere. Kei Reaktion. Was jetzt?"], ["Check her breathing for up to 10 seconds", "Atmung maximal 10 Sekunden prüfen", "D Atmig maximal 10 Sekunde prüefe"],
  ["Give her water to drink", "Ihr Wasser zu trinken geben", "Ihre Wasser z trinke gä"], ["Never give anything to drink to an unresponsive person: she could choke.", "Bewusstlosen nie etwas zu trinken geben: Sie könnte ersticken.", "Bewusstlose nie öppis z trinke gä: Si chönnt verstickt."],
  ["Let her sleep it off", "Sie ausschlafen lassen", "Si la usschlafe"], ["Unresponsive people can choke on their tongue or vomit. Check breathing!", "Bewusstlose können an der Zunge oder Erbrochenem ersticken. Atmung prüfen!", "Bewusstlosi chönd a de Zunge oder Erbrochnigem versticke. D Atmig prüefe!"],
  ["She is breathing normally. 🫁", "Sie atmet normal. 🫁", "Si schnuufet normal. 🫁"], ["Unresponsive but breathing normally. The right position?", "Bewusstlos, aber normale Atmung. Die richtige Lagerung?", "Bewusstlos, aber normali Atmig. Di richtig Lagerig?"],
  ["Recovery position (on her side)", "Seitenlage", "Siitelag"], ["On her back, legs raised", "Auf dem Rücken, Beine hoch", "Uf em Rugge, Bei ufe"], ["On her back, the tongue or vomit can block the airway. Recovery position!", "Auf dem Rücken können Zunge oder Erbrochenes die Atemwege blockieren. Seitenlage!", "Uf em Rugge chönd d Zunge oder Erbrochnigs d Atemwäg blockiere. Siitelag!"],
  ["Sitting up against the railing", "Sitzend ans Geländer gelehnt", "Sitzend as Gländer aaglehnt"], ["She can't hold herself up. The recovery position keeps the airway open.", "Sie kann sich nicht halten. Die Seitenlage hält die Atemwege frei.", "Si cha sich nöd hebe. D Siitelag hebt d Atemwäg frei."], ["Recovery position! C-Real calls 144.", "Seitenlage! C-Real ruft 144 an.", "Siitelag! De C-Real lüütet 144 aa."],
  ["Recovery position: pick the steps in the right order.", "Seitenlage: Wähle die Schritte in der richtigen Reihenfolge.", "Siitelag: Wähl d Schritt i de richtige Reihefolg."],
  ["Kneel beside her, place the near arm at a right angle, palm up", "Neben ihr knien, den nahen Arm rechtwinklig ablegen, Handfläche nach oben", "Näb ihre chnüüle, de nöch Arm rächtwinklig ablegge, Handflächi nach obe"],
  ["Bring the far arm across her chest, back of the hand against her cheek", "Den fernen Arm über die Brust führen, Handrücken an ihre Wange", "De wiit Arm über d Brust füehre, Handrugge a ihri Bagge"],
  ["Bend the far leg up at the knee", "Das ferne Bein im Knie anwinkeln", "S wiite Bei im Chnü aawinkle"], ["Pull the far knee towards you to roll her onto her side", "Am fernen Knie ziehen und sie auf die Seite rollen", "Am wiite Chnü zieh und si uf d Siite rolle"],
  ["Tilt the head back, mouth pointing down, so the airway stays open", "Kopf nach hinten neigen, Mund nach unten, damit die Atemwege frei bleiben", "Chopf nach hine neige, Muul nach unde, dass d Atemwäg frei blibed"],
  ["Perfect recovery position!", "Perfekte Seitenlage!", "Perfekti Siitelag!"], ["While you wait for the ambulance...", "Während du auf die Ambulanz wartest...", "Während du uf d Ambulanz wartisch..."],
  ["Cover her with a rescue blanket and keep checking her breathing", "Mit einer Rettungsdecke zudecken und die Atmung weiter kontrollieren", "Mit ere Rettigsdecki zuedecke und d Atmig wiiter kontrolliere"], ["Go back to the party, she's fine now", "Zurück zur Party, ihr geht's jetzt gut", "Zrugg a d Party, ihre gahts jetzt guet"],
  ["Never leave her alone. Keep checking her breathing.", "Lass sie nie allein. Kontrolliere weiter ihre Atmung.", "Lah si nie elei. Kontrollier wiiter ihri Atmig."], ["Give her a coffee to wake her up", "Ihr einen Kaffee geben, damit sie aufwacht", "Ihre en Kafi gä, dass si verwachet"],
  ["Nothing by mouth! Keep her warm and check breathing regularly.", "Nichts über den Mund! Warm halten und Atmung regelmässig kontrollieren.", "Nüt über s Muul! Warm hebe und d Atmig regelmässig kontrolliere."],
  ["If she stops breathing normally: turn her on her back, 144, CPR.", "Wenn sie nicht mehr normal atmet: auf den Rücken drehen, 144, Herzdruckmassage.", "Wenn si nümm normal schnuufet: uf de Rugge drülle, 144, Herzdruckmassage."],
  ["Good recovery position! We'll take her to the hospital to be sure.", "Gute Seitenlage! Wir bringen sie zur Sicherheit ins Spital.", "Gueti Siitelag! Mir bringed si sicherheitshalber is Spital."], ["Seefest hero. They should name a firework after you. 🎆", "Seefest-Heldin. Man sollte ein Feuerwerk nach dir benennen. 🎆", "Seefescht-Heldin. Me söt es Füürwerch nach dir benänne. 🎆"],
  ["Recovery position", "Seitenlage", "Siitelag"],
  ["Unresponsive but breathing normally → recovery position: near arm at a right angle, far hand to the cheek, bend the far knee, roll towards you, tilt the head back. Call 144, keep warm, check breathing regularly. No breathing → CPR.", "Bewusstlos, aber normale Atmung → Seitenlage: nahen Arm rechtwinklig, ferne Hand an die Wange, fernes Knie anwinkeln, zu dir rollen, Kopf nach hinten neigen. 144 anrufen, warm halten, Atmung regelmässig prüfen. Keine Atmung → Herzdruckmassage.", "Bewusstlos, aber normali Atmig → Siitelag: nöch Arm rächtwinklig, wiiti Hand a d Bagge, wiits Chnü aawinkle, zu dir rolle, Chopf nach hine neige. 144 aalüte, warm hebe, Atmig regelmässig prüefe. Kei Atmig → Herzdruckmassage."],
  // choking case
  ["Mmh, Zuger Kirschtorte... wait, that tourist is grabbing his throat!", "Mmh, Zuger Kirschtorte... Moment, der Tourist greift sich an den Hals!", "Mmh, Zuger Chriesitorte... Momänt, dä Tourist längt sich a de Hals!"], ["*cough* *COUGH*", "*hust* *HUST*", "*hueschte* *HUESCHTE*"],
  ["He is coughing hard and can still speak a little. You...", "Er hustet stark und kann noch etwas sprechen. Du...", "Er hueschtet starch und cha no chli rede. Du..."], ["Encourage him to keep coughing", "ermunterst ihn, weiter zu husten", "motiviersch ne, wiiter z hueschte"],
  ["Slap his back right away", "schlägst ihm sofort auf den Rücken", "schlahsch em sofort uf de Rugge"], ["While he can cough effectively, coughing is the best help. Encourage it.", "Solange er wirksam husten kann, ist Husten die beste Hilfe. Ermuntere ihn.", "Solang er wirksam cha hueschte, isch Hueschte di bescht Hilf. Motivier ne."],
  ["Give him water to wash it down", "gibst ihm Wasser zum Runterspülen", "gisch em Wasser zum Abespüele"], ["Drinking can make it worse. Encourage coughing.", "Trinken kann es verschlimmern. Zum Husten ermuntern.", "Trinke chas verschlimmere. Zum Hueschte motiviere."],
  ["...but the cough gets weak. He can't breathe anymore!", "...aber der Husten wird schwach. Er bekommt keine Luft mehr!", "...aber de Hueschte wird schwach. Er überchunnt kei Luft meh!"], ["His cough is now ineffective. Next step?", "Sein Husten ist jetzt unwirksam. Nächster Schritt?", "Sin Hueschte isch jetzt unwirksam. Nächschte Schritt?"],
  ["Up to 5 firm blows between the shoulder blades", "Bis zu 5 kräftige Schläge zwischen die Schulterblätter", "Bis 5 feschti Schläg zwüsche d Schulterblätter"], ["Reach into his throat with your fingers", "Mit den Fingern in seinen Hals greifen", "Mit de Finger in sin Hals länge"],
  ["Blind finger sweeps can push it deeper. Back blows!", "Blindes Herausfischen kann es tiefer schieben. Rückenschläge!", "Blinds Usefischle chas tüüfer schiebe. Ruggeschläg!"], ["Lay him down and wait", "Ihn hinlegen und warten", "Ne aneligge und warte"], ["No waiting: back blows, then abdominal thrusts.", "Kein Warten: Rückenschläge, dann Oberbauchkompressionen.", "Kei Warte: Ruggeschläg, denn Oberbuchkompressione."],
  ["You lean him forward and support his chest with one hand...", "Du beugst ihn nach vorne und stützt seine Brust mit einer Hand...", "Du bügsch ne nach vorne und stützisch sini Brust mit ere Hand..."], ["Back blows: press [A] when the circle hits the ring!", "Rückenschläge: drück [A], wenn der Kreis den Ring trifft!", "Ruggeschläg: drück [A], wenn de Chreis de Ring trifft!"],
  ["It's still stuck. Now:", "Es steckt immer noch fest. Jetzt:", "Es steckt immer no fescht. Jetzt:"], ["Up to 5 abdominal thrusts (Heimlich)", "Bis zu 5 Oberbauchkompressionen (Heimlich)", "Bis 5 Oberbuchkompressione (Heimlich)"],
  ["Five more cups of coffee", "Fünf weitere Tassen Kaffee", "Föif wiiteri Tasse Kafi"], ["...no. Abdominal thrusts: fist above the belly button, pull in and up.", "...nein. Oberbauchkompressionen: Faust über den Bauchnabel, nach innen und oben ziehen.", "...nei. Oberbuchkompressione: Fuscht über de Buchnabel, nach inne und obe zieh."],
  ["Turn him upside down and shake", "Ihn auf den Kopf stellen und schütteln", "Ne uf de Chopf stelle und schüttle"], ["Abdominal thrusts: stand behind him, fist above the belly button, pull in and up.", "Oberbauchkompressionen: hinter ihn stellen, Faust über den Bauchnabel, nach innen und oben ziehen.", "Oberbuchkompressione: hinder ihn stah, Fuscht über de Buchnabel, nach inne und obe zieh."],
  ["You stand behind him, fist between belly button and breastbone...", "Du stellst dich hinter ihn, Faust zwischen Bauchnabel und Brustbein...", "Du stahsch hinder ihn, Fuscht zwüsche Buchnabel und Bruschtbei..."], ["Abdominal thrusts: press [A] when the circle hits the ring!", "Oberbauchkompressionen: drück [A], wenn der Kreis den Ring trifft!", "Oberbuchkompressione: drück [A], wenn de Chreis de Ring trifft!"],
  ["A piece of Kirschtorte flies across the café! 🍒 He can breathe again. What now?", "Ein Stück Kirschtorte fliegt durchs Café! 🍒 Er kann wieder atmen. Was jetzt?", "Es Stück Chriesitorte flügt dur s Café! 🍒 Er cha wieder schnuufe. Was jetzt?"],
  ["He should see a doctor: abdominal thrusts can cause internal injuries", "Er sollte zum Arzt: Oberbauchkompressionen können innere Verletzungen verursachen", "Er söt zum Dokter: Oberbuchkompressione chönd inneri Verletzige verursache"], ["Offer him another slice", "Ihm noch ein Stück anbieten", "Ihm no es Stück aabüte"],
  ["Maybe later! After abdominal thrusts he must be checked by a doctor.", "Vielleicht später! Nach Oberbauchkompressionen muss ihn ein Arzt untersuchen.", "Vilicht spöter! Nach Oberbuchkompressione mues ne en Dokter undersueche."], ["Nothing, all good", "Nichts, alles gut", "Nüt, alles guet"],
  ["Abdominal thrusts can injure internal organs. He needs a medical check.", "Oberbauchkompressionen können innere Organe verletzen. Er muss ärztlich untersucht werden.", "Oberbuchkompressione chönd inneri Organ verletze. Er mues vom Dokter undersuecht wärde."],
  ["And if he had become unresponsive: 144 and CPR.", "Und wäre er bewusstlos geworden: 144 und Herzdruckmassage.", "Und wär er bewusstlos worde: 144 und Herzdruckmassage."],
  ["Thank you!! Best... and worst... Kirschtorte of my life.", "Danke!! Die beste... und schlimmste... Kirschtorte meines Lebens.", "Merci!! Di bescht... und schlimmscht... Chriesitorte vo mim Läbe."], ["I'll just have a coffee. Without anything to choke on.", "Ich nehme nur einen Kaffee. Ohne etwas zum Verschlucken.", "Ich nimm nur en Kafi. Ohni öppis zum Verschlucke."],
  ["Can still cough → encourage coughing. Cough gets weak → up to 5 back blows between the shoulder blades, then up to 5 abdominal thrusts. Alternate. Becomes unresponsive → 144 and CPR. See a doctor after abdominal thrusts.", "Kann noch husten → zum Husten ermuntern. Husten wird schwach → bis zu 5 Rückenschläge zwischen die Schulterblätter, dann bis zu 5 Oberbauchkompressionen. Abwechseln. Wird bewusstlos → 144 und Herzdruckmassage. Nach Oberbauchkompressionen zum Arzt.", "Cha no hueschte → zum Hueschte motiviere. Hueschte wird schwach → bis 5 Ruggeschläg zwüsche d Schulterblätter, denn bis 5 Oberbuchkompressione. Abwächsle. Wird bewusstlos → 144 und Herzdruckmassage. Nach Oberbuchkompressione zum Dokter."],
  // bleeding case
  ["Help! A visitor slipped on the wet stairs and cut his arm on the rock!", "Hilfe! Ein Besucher ist auf der nassen Treppe ausgerutscht und hat sich am Fels den Arm aufgeschnitten!", "Hilfe! En Bsuecher isch uf de nasse Stäge usgrutscht und het sich am Fels de Arm ufgschnitte!"],
  ["In the Höllgrotten, of all places! 🦇", "Ausgerechnet in den Höllgrotten! 🦇", "Usgrächnet i de Höllgrotte! 🦇"], ["It is bleeding heavily. The very first thing:", "Es blutet stark. Das Allererste:", "Es bluetet starch. S Allererscht:"],
  ["Put on gloves (self-protection)", "Handschuhe anziehen (Selbstschutz)", "Händsche aalegge (Sälbschtschutz)"], ["Grab the wound with bare hands", "Mit blossen Händen auf die Wunde greifen", "Mit blutte Händ uf d Wunde länge"],
  ["Protect yourself from infections: gloves first. They're in the first aid kit.", "Schütz dich vor Infektionen: zuerst Handschuhe. Sie sind in der Erste-Hilfe-Tasche.", "Schütz di vor Infektione: zerscht Händsche. Si sind i de Erschti-Hilf-Täsche."], ["Search for the guide's phone charger", "Das Ladekabel des Führers suchen", "Em Füehrer sis Ladekabel sueche"],
  ["Focus! Gloves, then direct pressure.", "Konzentration! Handschuhe, dann direkter Druck.", "Konzentration! Händsche, denn diräkte Druck."], ["C-Real hands you the first aid kit. Gloves on. 🧤", "C-Real reicht dir die Erste-Hilfe-Tasche. Handschuhe an. 🧤", "De C-Real git dir d Erschti-Hilf-Täsche. Händsche aa. 🧤"],
  ["Press directly on the wound: hold [A]!", "Direkt auf die Wunde drücken: halte [A]!", "Diräkt uf d Wunde drücke: heb [A]!"], ["Next, the patient should...", "Als Nächstes sollte der Patient...", "Als Nächschts söt de Patient..."],
  ["Sit or lie down with the arm raised", "sich setzen oder hinlegen, den Arm hochgelagert", "sich setze oder aneligge, de Arm ufeghebe"], ["Quickly walk out of the cave", "schnell aus der Höhle laufen", "schnell us de Höhli laufe"],
  ["Moving makes the bleeding worse and he could faint. Lie down, raise the arm.", "Bewegung verstärkt die Blutung und er könnte ohnmächtig werden. Hinlegen, Arm hochlagern.", "Bewegig verstärcht d Bluetig und er chönnt umkippe. Aneligge, Arm ufehebe."], ["Do jumping jacks to warm up", "Hampelmänner zum Aufwärmen machen", "Hampelmänner zum Ufwärme mache"],
  ["Please no. Lie down, raise the arm.", "Bitte nicht. Hinlegen, Arm hochlagern.", "Bitte nöd. Aneligge, Arm ufehebe."], ["You keep pressing while he lies down.", "Du drückst weiter, während er sich hinlegt.", "Du drücksch wiiter, während er sich aneleit."],
  ["Pressure bandage: pad on the wound, then wrap firmly. Tap [A] in the green zone!", "Druckverband: Polster auf die Wunde, dann fest einwickeln. Drück [A] im grünen Bereich!", "Druckverband: Polschter uf d Wunde, denn fescht iiwickle. Drück [A] im grüene Bereich!"],
  ["Blood soaks through the bandage!", "Blut sickert durch den Verband!", "Bluet sickeret dur de Verband!"], ["Put a second pressure bandage on top", "Einen zweiten Druckverband darüber anlegen", "En zweite Druckverband drüber aalegge"],
  ["Take the first bandage off and start over", "Den ersten Verband abnehmen und neu beginnen", "De erscht Verband abneh und neu aafange"], ["Never remove it: you would tear the wound open. Second bandage on top.", "Nie abnehmen: Du würdest die Wunde aufreissen. Zweiter Verband darüber.", "Nie abneh: Du würdsch d Wunde ufrisse. Zweite Verband drüber."],
  ["Ignore it", "Ignorieren", "Ignoriere"], ["Soaked through = not enough pressure. Second bandage on top!", "Durchgeblutet = zu wenig Druck. Zweiter Verband darüber!", "Durebluetet = z wenig Druck. Zweite Verband drüber!"], ["The bleeding stops. 🩸✓", "Die Blutung stoppt. 🩸✓", "D Bluetig hört uf. 🩸✓"],
  ["He is pale, sweaty and restless. That is probably...", "Er ist blass, verschwitzt und unruhig. Das ist wahrscheinlich...", "Er isch bleich, verschwitzt und unrueig. Das isch wahrschiinlich..."],
  ["Shock: lay him flat, raise his legs, keep him warm, call 144", "ein Schock: flach hinlegen, Beine hochlagern, warm halten, 144 anrufen", "en Schock: flach aneligge, Bei ufehebe, warm hebe, 144 aalüte"], ["Excitement about the stalactites", "Begeisterung über die Tropfsteine", "Begeischterig über d Tropfstei"],
  ["Pale, sweaty, restless, fast pulse = signs of shock. Shock position and 144!", "Blass, verschwitzt, unruhig, schneller Puls = Schockzeichen. Schocklage und 144!", "Bleich, verschwitzt, unrueig, schnälle Puls = Schockzeiche. Schocklag und 144!"], ["Hunger: give him a sandwich", "Hunger: ihm ein Sandwich geben", "Hunger: ihm es Sandwich gä"],
  ["Nothing to eat or drink in shock. Legs up, keep warm, 144.", "Im Schock nichts essen oder trinken. Beine hoch, warm halten, 144.", "Im Schock nüt ässe oder trinke. Bei ufe, warm hebe, 144."], ["Shock position, rescue blanket, 144. 🦵⬆️", "Schocklage, Rettungsdecke, 144. 🦵⬆️", "Schocklag, Rettigsdecki, 144. 🦵⬆️"],
  ["Perfect pressure bandage. We'll take it from here.", "Perfekter Druckverband. Wir übernehmen ab hier.", "Perfekte Druckverband. Mir übernämed vo da aa."], ["You're welcome to a free cave tour. Any time. Just... watch the stairs.", "Du bekommst jederzeit eine Gratis-Höhlenführung. Nur... Vorsicht auf der Treppe.", "Du chasch jederziit e Gratis-Höhlefüehrig ha. Nur... Obacht uf de Stäge."],
  ["Bleeding & shock", "Blutung & Schock", "Bluetig & Schock"],
  ["Protect yourself (gloves). Press directly on the wound, apply a pressure bandage; if blood soaks through, add a second one on top. Lie down, raise the limb. Shock signs (pale, sweaty, fast pulse, restless) → lie flat, legs up, keep warm, nothing to eat or drink, call 144.", "Selbstschutz (Handschuhe). Direkt auf die Wunde drücken, Druckverband anlegen; sickert Blut durch, einen zweiten darüber. Hinlegen, Glied hochlagern. Schockzeichen (blass, verschwitzt, schneller Puls, unruhig) → flach lagern, Beine hoch, warm halten, nichts essen oder trinken, 144 anrufen.", "Sälbschtschutz (Händsche). Diräkt uf d Wunde drücke, Druckverband aalegge; sickeret Bluet dure, en zweite drüber. Aneligge, Glied ufehebe. Schockzeiche (bleich, verschwitzt, schnälle Puls, unrueig) → flach lagere, Bei ufe, warm hebe, nüt ässe oder trinke, 144 aalüte."],
  // burn case
  ["A barbecue at the Ägerisee! It smells like cervelat. 🌭", "Grillieren am Ägerisee! Es riecht nach Cervelat. 🌭", "Grilliere am Ägerisee! Es schmöckt nach Cervelat. 🌭"], ["AUA! I grabbed the hot grill!", "AUA! Ich habe den heissen Grill angefasst!", "AUA! Ich ha de heiss Grill aagläng!"],
  ["His forearm is burned. First:", "Sein Unterarm ist verbrannt. Zuerst:", "Sin Underarm isch verbrännt. Zerscht:"], ["Cool it with lukewarm running water", "Mit lauwarmem fliessendem Wasser kühlen", "Mit lauwarmem fliessendem Wasser chüehle"],
  ["Ice cubes from the cooler", "Eiswürfel aus der Kühlbox", "Iiswürfel us de Chüehlbox"], ["Ice damages the tissue even more. Lukewarm, not ice-cold, water.", "Eis schädigt das Gewebe noch mehr. Lauwarmes, nicht eiskaltes Wasser.", "Iis schädiget s Gwäb no meh. Lauwarms, nöd iischalts Wasser."],
  ["Butter on it", "Butter darauf", "Anke druf"], ["Butter traps the heat and can infect the wound. Water!", "Butter staut die Hitze und kann die Wunde infizieren. Wasser!", "Anke staut d Hitz und cha d Wunde infiziere. Wasser!"], ["You hold his arm under the tap at the beach.", "Du hältst seinen Arm unter den Wasserhahn am Strand.", "Du hebsch sin Arm under de Wasserhahne am Strand."],
  ["While cooling, what should come off quickly?", "Was sollte beim Kühlen schnell weg?", "Was söt bim Chüehle schnell wäg?"], ["Rings, watch and bracelets (before it swells)", "Ringe, Uhr und Armbänder (bevor es anschwillt)", "Ring, Uhr und Armbänder (bevor s aaschwillt)"],
  ["His shirt, stuck to the burn", "Sein T-Shirt, das an der Verbrennung klebt", "Sis T-Shirt, wo a de Verbrännig chläbt"], ["Never pull off clothing stuck to a burn. Remove rings and watches early.", "Nie Kleidung abziehen, die an einer Verbrennung klebt. Ringe und Uhren früh entfernen.", "Nie Chleider abzieh, wo a de Verbrännig chläbed. Ring und Uhre früeh ewägneh."],
  ["The blisters", "Die Blasen", "D Blootere"], ["Never pop blisters: infection risk.", "Blasen nie aufstechen: Infektionsgefahr.", "Blootere nie ufstäche: Infektionsgfahr."], ["Watch off. Good: the arm will swell.", "Uhr ab. Gut so: Der Arm wird anschwellen.", "Uhr ab. Guet so: De Arm wird aaschwelle."],
  ["Keep the arm under the water: hold [A] for 15–20 minutes (time runs fast)!", "Arm unter dem Wasser lassen: halte [A] 15–20 Minuten (die Zeit läuft schnell)!", "Arm underem Wasser la: heb [A] 15–20 Minute (d Ziit lauft schnell)!"],
  ["After cooling, you...", "Nach dem Kühlen...", "Nach em Chüehle..."], ["Cover the burn loosely with a sterile dressing", "deckst du die Verbrennung locker und steril ab", "decksch d Verbrännig lugg und steril ab"],
  ["Put toothpaste on it", "streichst du Zahnpasta darauf", "strichsch Zahnpasta druf"], ["Home remedies like toothpaste or flour do more harm. Sterile cover.", "Hausmittel wie Zahnpasta oder Mehl schaden mehr. Steril abdecken.", "Huusmittel wie Zahnpasta oder Mehl schadet meh. Steril abdecke."],
  ["Pop the blisters to let air in", "stichst du die Blasen auf, damit Luft dran kommt", "stichsch d Blootere uf, dass Luft draa chunnt"], ["Never pop blisters. Cover sterile.", "Blasen nie aufstechen. Steril abdecken.", "Blootere nie ufstäche. Steril abdecke."], ["Sterile, loose dressing. ✓", "Steriler, lockerer Verband. ✓", "Sterile, lugge Verband. ✓"],
  ["When do burns need a doctor or 144?", "Wann braucht es bei Verbrennungen einen Arzt oder 144?", "Wänn bruuchts bi Verbrännige en Dokter oder 144?"], ["Large burns, face, hands, genitals, children, or if unsure", "Grossflächige Verbrennungen, Gesicht, Hände, Genitalien, Kinder oder wenn unsicher", "Grossflächigi Verbrännige, Gsicht, Händ, Genitalie, Chind oder wenn unsicher"],
  ["Never, burns heal by themselves", "Nie, Verbrennungen heilen von selbst", "Nie, Verbrännige heiled vo sälber"], ["Large burns or burns on the face, hands or in children need professional care.", "Grosse Verbrennungen oder solche an Gesicht, Händen oder bei Kindern brauchen professionelle Hilfe.", "Grossi Verbrännige oder settigi a Gsicht, Händ oder bi Chind bruuched professionelli Hilf."],
  ["Only if it doesn't hurt", "Nur wenn es nicht weh tut", "Nur wenns nöd weh tuet"], ["Painless burns can be the deepest! Large, face, hands, children → doctor or 144.", "Schmerzlose Verbrennungen können die tiefsten sein! Gross, Gesicht, Hände, Kinder → Arzt oder 144.", "Schmärzlosi Verbrännige chönd di tüüfschte si! Gross, Gsicht, Händ, Chind → Dokter oder 144."],
  ["This one is palm-sized: he should see a doctor today.", "Diese ist handtellergross: Er sollte heute noch zum Arzt.", "Die isch handtällergross: Er söt hüt no zum Dokter."], ["Thank you! I'll use grill gloves from now on. Promise.", "Danke! Ab jetzt benutze ich Grillhandschuhe. Versprochen.", "Merci! Ab jetzt bruuch ich Grillhändsche. Versproche."], ["I saved the cervelats. Priorities. 🌭", "Ich habe die Cervelats gerettet. Prioritäten. 🌭", "Ich ha d Cervelats grettet. Prioritäte. 🌭"],
  ["Burns", "Verbrennungen", "Verbrännige"],
  ["Cool with lukewarm running water for 15–20 minutes. Remove rings and watches early. No ice, no butter, no home remedies, don't pop blisters. Cover loosely and sterile. Doctor or 144 for large burns, face, hands, genitals, children.", "Mit lauwarmem fliessendem Wasser 15–20 Minuten kühlen. Ringe und Uhren früh entfernen. Kein Eis, keine Butter, keine Hausmittel, Blasen nicht aufstechen. Locker und steril abdecken. Arzt oder 144 bei grossen Verbrennungen, Gesicht, Händen, Genitalien, Kindern.", "Mit lauwarmem fliessendem Wasser 15–20 Minute chüehle. Ring und Uhre früeh ewägneh. Kei Iis, kei Anke, kei Huusmittel, Blootere nöd ufstäche. Lugg und steril abdecke. Dokter oder 144 bi grosse Verbrännige, Gsicht, Händ, Genitalie, Chind."],
  // road accident case
  ["A motorbike is lying in the bend of the Lorzentobel road! The rider is sitting at the roadside.", "Ein Motorrad liegt in der Kurve der Lorzentobelstrasse! Der Fahrer sitzt am Strassenrand.", "Es Töff liit i de Kurve vo de Lorzetobelstrass! De Fahrer sitzt am Strasserand."],
  ["*stops the car behind the bend* What first?", "*hält das Auto hinter der Kurve an* Was zuerst?", "*haltet s Auto hinder de Kurve aa* Was zerscht?"], ["Your car has stopped. Before getting out:", "Dein Auto steht. Bevor du aussteigst:", "Dis Auto staht. Bevor usstiigsch:"],
  ["Hazard lights on, safety vest on", "Warnblinker an, Leuchtweste an", "Warnblinker aa, Lüchtweste aa"], ["Run onto the road right away", "Sofort auf die Strasse rennen", "Sofort uf d Strass renne"], ["Be seen first: hazard lights and safety vest, then get out.", "Zuerst gesehen werden: Warnblinker und Leuchtweste, dann aussteigen.", "Zerscht gseh wärde: Warnblinker und Lüchtweste, denn usstiige."],
  ["Honk so he knows you are there", "Hupen, damit er weiss, dass du da bist", "Hupe, dass er weiss, dass du da bisch"], ["Hazard lights and a safety vest make you visible. Then get out.", "Warnblinker und Leuchtweste machen dich sichtbar. Dann aussteigen.", "Warnblinker und Lüchtweste mached di sichtbar. Denn usstiige."], ["Blinking and glowing. 🦺", "Blinkend und leuchtend. 🦺", "Blinkend und lüchtend. 🦺"],
  ["Where does the warning triangle go?", "Wohin kommt das Pannendreieck?", "Wo chunnt s Pannedreieck hi?"], ["At least 50 m before the accident (100 m on motorways), before the bend", "Mindestens 50 m vor die Unfallstelle (100 m auf Autobahnen), vor die Kurve", "Mindeschtens 50 m vor d Unfallstell (100 m uf de Autobahn), vor d Kurve"],
  ["Right next to the motorbike", "Direkt neben das Motorrad", "Diräkt näbs Töff"], ["Too late for drivers coming round the bend! At least 50 m before.", "Zu spät für Fahrer, die um die Kurve kommen! Mindestens 50 m davor.", "Z spot für Fahrer, wo um d Kurve chömed! Mindeschtens 50 m vorher."],
  ["Stays in the trunk", "Bleibt im Kofferraum", "Blibt im Kofferruum"], ["The triangle warns the traffic. At least 50 m before the scene.", "Das Dreieck warnt den Verkehr. Mindestens 50 m vor der Unfallstelle.", "S Dreieck warnt de Verchehr. Mindeschtens 50 m vor de Unfallstell."], ["Triangle placed before the bend. ⚠️", "Dreieck vor der Kurve aufgestellt. ⚠️", "Dreieck vor de Kurve ufgstellt. ⚠️"],
  ["The rider is awake. You...", "Der Fahrer ist wach. Du...", "De Fahrer isch wach. Du..."], ["Approach from the front, talk to him and ask what hurts", "näherst dich von vorne, sprichst ihn an und fragst, was weh tut", "chunnsch vo vorne, redsch ne aa und fragsch, was weh tuet"],
  ["Pull off his helmet immediately", "ziehst ihm sofort den Helm ab", "ziehsch em sofort de Helm ab"], ["He's awake and talking: no need to remove the helmet now. Talk to him.", "Er ist wach und spricht: Der Helm muss jetzt nicht ab. Sprich mit ihm.", "Er isch wach und redt: De Helm mues jetzt nöd ab. Red mit ihm."],
  ["Push the motorbike off the road first", "schiebst zuerst das Motorrad von der Strasse", "schiebsch zerscht s Töff vo de Strass"], ["People before property. Talk to him and check him.", "Menschen vor Sachen. Sprich mit ihm und prüfe ihn.", "Mänsche vor Sache. Red mit ihm und prüef ne."],
  ["\"My leg hurts... I feel cold and dizzy.\"", "\"Mein Bein tut weh... mir ist kalt und schwindlig.\"", "\"Mis Bei tuet weh... mir isch chalt und trümmlig.\""], ["Ambulance emergency line. Where are you?", "Sanitätsnotruf. Wo sind Sie?", "Sanitätsnotruef. Wo sind Si?"],
  ["Lorzentobel road between Baar and Ägeri, in the bend before the bridge", "Lorzentobelstrasse zwischen Baar und Ägeri, in der Kurve vor der Brücke", "Lorzetobelstrass zwüsche Baar und Ägeri, i de Kurve vor de Brugg"], ["On some road in a forest", "Auf irgendeiner Strasse im Wald", "Uf irgendere Strass im Wald"],
  ["Give road, towns and landmarks: Lorzentobel, between Baar and Ägeri.", "Strasse, Ortschaften und Orientierungspunkte angeben: Lorzentobel, zwischen Baar und Ägeri.", "Strass, Ortschafte und Orientierigspünkt aagä: Lorzetobel, zwüsche Baar und Ägeri."], ["How many injured, and what injuries?", "Wie viele Verletzte, und welche Verletzungen?", "Wie vill Verletzti, und weli Verletzige?"],
  ["One motorcyclist, awake, injured leg, pale", "Ein Motorradfahrer, wach, verletztes Bein, blass", "En Töfffahrer, wach, verletzts Bei, bleich"], ["Probably fine", "Wahrscheinlich nichts Schlimmes", "Wahrschiinlich nüt Schlimms"], ["Tell how many and what: one rider, awake, leg injury.", "Sag wie viele und was: ein Fahrer, wach, Beinverletzung.", "Säg wie vill und was: en Fahrer, wach, Beiverletzig."],
  ["Any further dangers?", "Gibt es weitere Gefahren?", "Gits wiiteri Gfahre?"], ["Fuel is leaking. Traffic is warned with the triangle.", "Benzin läuft aus. Der Verkehr ist mit dem Dreieck gewarnt.", "Benzin lauft us. De Verchehr isch mit em Dreieck gwarnt."], ["No idea, I didn't look", "Keine Ahnung, ich habe nicht geschaut", "Kei Ahnig, ich ha nöd gluegt"],
  ["Always report dangers: fuel, traffic, fire.", "Gefahren immer melden: Benzin, Verkehr, Feuer.", "Gfahre immer melde: Benzin, Verchehr, Füür."], ["He is pale and sweaty, his pulse is fast: signs of shock! What helps?", "Er ist blass und verschwitzt, sein Puls ist schnell: Schockzeichen! Was hilft?", "Er isch bleich und verschwitzt, sin Puls isch schnäll: Schockzeiche! Was hilft?"],
  ["Lay him flat, keep him warm, reassure him, don't move the injured leg", "Flach hinlegen, warm halten, beruhigen, das verletzte Bein nicht bewegen", "Flach aneligge, warm hebe, beruhige, s verletzt Bei nöd bewege"], ["Give him a schnapps to warm up", "Ihm einen Schnaps zum Aufwärmen geben", "Ihm es Schnäpsli zum Ufwärme gä"],
  ["Nothing to eat or drink in shock! Lay flat, keep warm, reassure.", "Im Schock nichts essen oder trinken! Flach lagern, warm halten, beruhigen.", "Im Schock nüt ässe oder trinke! Flach lagere, warm hebe, beruhige."], ["Sit him back on his motorbike", "Ihn wieder aufs Motorrad setzen", "Ne wieder ufs Töff setze"],
  ["Lay him flat. Keep warm with a rescue blanket and reassure him.", "Flach hinlegen. Mit einer Rettungsdecke warm halten und beruhigen.", "Flach aneligge. Mit ere Rettigsdecki warm hebe und beruhige."], ["Rescue blanket on. You talk calmly until the ambulance arrives.", "Rettungsdecke drauf. Du sprichst ruhig mit ihm, bis die Ambulanz kommt.", "Rettigsdecki druf. Du redsch ruehig mit ihm, bis d Ambulanz chunnt."],
  ["Scene secured, triangle placed, good report. Textbook!", "Unfallstelle gesichert, Dreieck aufgestellt, gute Meldung. Wie im Lehrbuch!", "Unfallstell gsicheret, Dreieck ufgstellt, gueti Meldig. Wie im Lehrbuech!"], ["I directed traffic. In a safety vest. I've never felt so powerful. 🦺", "Ich habe den Verkehr geregelt. In einer Leuchtweste. Ich habe mich noch nie so mächtig gefühlt. 🦺", "Ich ha de Verchehr greglet. Inere Lüchtweste. Ich ha mi no nie so mächtig gfühlt. 🦺"],
  ["Hazard lights, safety vest, warning triangle at least 50 m before the scene (100 m on motorways). Call 144: where, what, how many injured, further dangers. Talk to the injured. Helmet off only if unresponsive. Shock: lay flat, keep warm, reassure.", "Warnblinker, Leuchtweste, Pannendreieck mindestens 50 m vor der Unfallstelle (100 m auf Autobahnen). 144 anrufen: wo, was, wie viele Verletzte, weitere Gefahren. Mit Verletzten sprechen. Helm nur bei Bewusstlosen abnehmen. Schock: flach lagern, warm halten, beruhigen.", "Warnblinker, Lüchtweste, Pannedreieck mindeschtens 50 m vor de Unfallstell (100 m uf de Autobahn). 144 aalüte: wo, was, wie vill Verletzti, wiiteri Gfahre. Mit Verletzte rede. Helm nur bi Bewusstlose abneh. Schock: flach lagere, warm hebe, beruhige."],
  // mountain case
  ["Ouch! I slipped on the path... my ankle! I can't walk.", "Autsch! Ich bin auf dem Weg ausgerutscht... mein Knöchel! Ich kann nicht gehen.", "Au! Ich bi uf em Wäg usgrutscht... min Chnöchel! Ich cha nöd laufe."], ["We're high up on the Zugerberg. There's no road here.", "Wir sind hoch oben auf dem Zugerberg. Hier gibt es keine Strasse.", "Mir sind höch obe uf em Zugerberg. Da hets kei Strass."],
  ["The ankle looks deformed. What do you do with it?", "Der Knöchel sieht verformt aus. Was machst du damit?", "De Chnöchel gseht verformt us. Was machsch demit?"], ["Don't move it: support it in the position you found it", "Nicht bewegen: in der vorgefundenen Lage stützen", "Nöd bewege: i de Lag stütze, wo ne gfunde hesch"],
  ["Pull it straight back into place", "Ihn wieder gerade ziehen", "Ne wieder grad zieh"], ["Never try to set a fracture. Support it as found.", "Nie versuchen, einen Bruch einzurenken. So stützen, wie vorgefunden.", "Nie probiere, en Bruch iizränke. So stütze, wie vorgfunde."], ["Let him walk it off", "Ihn das weglaufen lassen", "Ne das la weglaufe"],
  ["Walking can make it much worse. Support it as found.", "Gehen kann es viel schlimmer machen. So stützen, wie vorgefunden.", "Laufe chas vill schlimmer mache. So stütze, wie vorgfunde."], ["You pad it with jackets so it can't move.", "Du polsterst ihn mit Jacken, damit er sich nicht bewegen kann.", "Du polschterisch ne mit Jagge, dass er sich nöd cha bewege."],
  ["Remote terrain, no road. Who do you call?", "Abgelegenes Gelände, keine Strasse. Wen rufst du an?", "Abglägnigs Gländ, kei Strass. Wem lüütisch aa?"], ["Rega 1414 (or 144)", "Rega 1414 (oder 144)", "Rega 1414 (oder 144)"], ["117, the police", "117, die Polizei", "117, d Polizei"],
  ["117 is for police matters. In the mountains: Rega 1414 or 144.", "117 ist für Polizeiangelegenheiten. In den Bergen: Rega 1414 oder 144.", "117 isch für Polizeisache. I de Berge: Rega 1414 oder 144."], ["A taxi", "Ein Taxi", "Es Taxi"], ["A taxi won't make it up here. Rega 1414!", "Ein Taxi kommt hier nicht hoch. Rega 1414!", "Es Taxi chunnt da nöd ufe. Rega 1414!"], ["Rega: the Swiss air rescue. 🚁", "Rega: die Schweizer Luftrettung. 🚁", "Rega: d Schwiizer Luftrettig. 🚁"],
  ["Rega emergency centre. Where are you?", "Rega-Einsatzzentrale. Wo sind Sie?", "Rega-Iisatzzentrale. Wo sind Si?"], ["On the Zugerberg, on the hiking path south of the Zugerbergbahn top station", "Auf dem Zugerberg, auf dem Wanderweg südlich der Bergstation der Zugerbergbahn", "Uf em Zugerberg, uf em Wanderwäg südlich vo de Bergstation vo de Zugerbergbahn"],
  ["In the mountains", "In den Bergen", "I de Berge"], ["Be precise: Zugerberg, which path, a landmark. GPS coordinates help too.", "Sei genau: Zugerberg, welcher Weg, ein Orientierungspunkt. GPS-Koordinaten helfen auch.", "Bis genau: Zugerberg, wele Wäg, en Orientierigspunkt. GPS-Koordinate hälfed au."],
  ["A hiker fell. Probably a broken ankle, he is awake.", "Ein Wanderer ist gestürzt. Wahrscheinlich ein gebrochener Knöchel, er ist wach.", "En Wanderer isch gstürzt. Wahrschiinlich en broche Chnöchel, er isch wach."], ["He is sad", "Er ist traurig", "Er isch truurig"], ["Describe the injury: fall, ankle, awake.", "Beschreibe die Verletzung: Sturz, Knöchel, wach.", "Beschriib d Verletzig: Sturz, Chnöchel, wach."],
  ["While you wait for the helicopter:", "Während du auf den Helikopter wartest:", "Während du uf de Heli wartisch:"], ["Keep him warm with a rescue blanket and stay with him", "Mit einer Rettungsdecke warm halten und bei ihm bleiben", "Mit ere Rettigsdecki warm hebe und bi ihm blibe"],
  ["Leave him to look for a better signal", "Ihn verlassen, um besseren Empfang zu suchen", "Ne verlah, zum bessere Empfang sueche"], ["Stay with him and keep him warm.", "Bleib bei ihm und halte ihn warm.", "Blib bi ihm und heb ne warm."], ["Give him painkillers from your bag", "Ihm Schmerzmittel aus deiner Tasche geben", "Ihm Schmärzmittel us dinere Täsche gä"],
  ["Don't hand out medication. Keep him warm, stay with him.", "Keine Medikamente abgeben. Warm halten, bei ihm bleiben.", "Kei Medikament abgä. Warm hebe, bi ihm blibe."], ["You hear rotor blades over the Zugersee...", "Du hörst Rotorblätter über dem Zugersee...", "Du ghörsch Rotorblätter über em Zugersee..."],
  ["The helicopter is searching. How do you signal \"Yes, we need help\"?", "Der Helikopter sucht. Wie signalisierst du \"Ja, wir brauchen Hilfe\"?", "De Heli suecht. Wie signalisiersch \"Ja, mir bruuched Hilf\"?"], ["Both arms raised in a Y", "Beide Arme in einem Y hochgestreckt", "Beidi Arm imene Y ufegstreckt"],
  ["One arm up, one arm down", "Ein Arm hoch, ein Arm runter", "En Arm ufe, en Arm abe"], ["That means \"No, we don't need help\". Both arms up in a Y = YES.", "Das heisst \"Nein, wir brauchen keine Hilfe\". Beide Arme hoch im Y = JA.", "Das heisst \"Nei, mir bruuched kei Hilf\". Beidi Arm ufe im Y = JA."],
  ["Wave a cervelat", "Mit einem Cervelat winken", "Mit emne Cervelat winke"], ["...creative. The signal is: both arms raised in a Y.", "...kreativ. Das Signal ist: beide Arme in einem Y hochgestreckt.", "...kreativ. S Signal isch: beidi Arm imene Y ufegstreckt."], ["Y = Yes! The Rega lands on the meadow. 🚁", "Y = Ja! Die Rega landet auf der Wiese. 🚁", "Y = Ja! D Rega landet uf de Wise. 🚁"],
  ["Rega here. Great job keeping him still and warm. Off to the hospital!", "Rega hier. Super, dass du ihn ruhig und warm gehalten hast. Ab ins Spital!", "Rega da. Super, dass du ne ruehig und warm ghebt hesch. Ab is Spital!"], ["I waved too. Like a Y. A very excited Y.", "Ich habe auch gewinkt. Wie ein Y. Ein sehr aufgeregtes Y.", "Ich ha au gwunke. Wie es Y. Es sehr ufgregts Y."],
  ["Mountain emergency", "Notfall in den Bergen", "Notfall i de Berge"],
  ["Don't move injured limbs, support them as found. Keep warm with a rescue blanket and stay with the injured. Call Rega 1414 (or 144) with an exact location. Helicopter signal: both arms up in a Y = \"Yes, we need help\".", "Verletzte Gliedmassen nicht bewegen, in vorgefundener Lage stützen. Mit Rettungsdecke warm halten und beim Verletzten bleiben. Rega 1414 (oder 144) mit genauem Standort anrufen. Helikoptersignal: beide Arme im Y hoch = \"Ja, wir brauchen Hilfe\".", "Verletzti Glidmasse nöd bewege, i vorgfundener Lag stütze. Mit Rettigsdecki warm hebe und bim Verletzte blibe. Rega 1414 (oder 144) mit genauem Standort aalüte. Helisignal: beidi Arm im Y ufe = \"Ja, mir bruuched Hilf\"."],
  // exam
  ["All cases solved? Then: final exam! 10 questions, you need 8 right. 📝", "Alle Fälle gelöst? Dann: Abschlussprüfung! 10 Fragen, du brauchst 8 richtige. 📝", "Alli Fäll glöst? Denn: Abschlussprüefig! 10 Frage, du bruuchsch 8 richtigi. 📝"], ["You got this. I'll hold your coffee.", "Du schaffst das. Ich halte deinen Kaffee.", "Du schaffsch das. Ich heb din Kafi."],
  ["What is the order of the three first aid steps?", "Wie lautet die Reihenfolge der drei Erste-Hilfe-Schritte?", "Wie isch d Reihefolg vo de drü Erschti-Hilf-Schritt?"], ["Act – Think – Look", "Handeln – Denken – Schauen", "Handle – Dänke – Schaue"], ["Think – Look – Act", "Denken – Schauen – Handeln", "Dänke – Schaue – Handle"],
  ["Swiss emergency number for an ambulance?", "Schweizer Notrufnummer für die Ambulanz?", "Schwiizer Notruefnummere für d Ambulanz?"], ["Swiss air rescue (Rega)?", "Schweizer Luftrettung (Rega)?", "Schwiizer Luftrettig (Rega)?"], ["How fast do you push during CPR?", "Wie schnell drückst du bei der Herzdruckmassage?", "Wie schnäll drücksch bi de Herzdruckmassage?"],
  ["100–120 per minute", "100–120 pro Minute", "100–120 pro Minute"], ["60 per minute", "60 pro Minute", "60 pro Minute"], ["200 per minute", "200 pro Minute", "200 pro Minute"], ["Compression to breath ratio in CPR?", "Verhältnis Kompressionen zu Beatmungen?", "Verhältnis Kompressione zu Beatmige?"],
  ["Unresponsive but breathing normally. Which position?", "Bewusstlos, aber normale Atmung. Welche Lagerung?", "Bewusstlos, aber normali Atmig. Weli Lagerig?"], ["Sitting up", "Sitzend", "Sitzend"], ["Standing", "Stehend", "Stehend"],
  ["Where do the AED pads go?", "Wohin kommen die AED-Elektroden?", "Wo chömed d AED-Elektrode hi?"], ["Below the right collarbone and on the left side below the armpit", "Unter das rechte Schlüsselbein und links seitlich unter die Achsel", "Unders rächte Schlüsselbei und links siitlich under d Achsle"], ["Both on the belly", "Beide auf den Bauch", "Beidi uf de Buch"], ["On the back of the neck", "In den Nacken", "In Nacke"],
  ["How do you cool a burn?", "Wie kühlst du eine Verbrennung?", "Wie chüehlsch e Verbrännig?"], ["Lukewarm running water for 15–20 minutes", "Lauwarmes fliessendes Wasser, 15–20 Minuten", "Lauwarms fliessends Wasser, 15–20 Minute"], ["Ice cubes", "Eiswürfel", "Iiswürfel"], ["Butter", "Butter", "Anke"],
  ["Blood soaks through the pressure bandage. You...", "Blut sickert durch den Druckverband. Du...", "Bluet sickeret dur de Druckverband. Du..."], ["Add a second bandage on top", "legst einen zweiten Verband darüber", "leisch en zweite Verband drüber"], ["Remove the first one", "entfernst den ersten", "nimmsch de erscht ab"], ["Wait and see", "wartest ab", "wartisch ab"],
  ["Choking and the cough gets weak. You give...", "Verschluckt und der Husten wird schwach. Du gibst...", "Verschluckt und de Hueschte wird schwach. Du gisch..."], ["5 back blows, then 5 abdominal thrusts", "5 Rückenschläge, dann 5 Oberbauchkompressionen", "5 Ruggeschläg, denn 5 Oberbuchkompressione"], ["Something to drink", "etwas zu trinken", "öppis z trinke"], ["A finger sweep", "einen Fingergriff in den Mund", "en Fingergriff is Muul"],
  ["Typical signs of shock?", "Typische Schockzeichen?", "Typischi Schockzeiche?"], ["Pale, cold sweat, fast pulse, restless", "Blass, kalter Schweiss, schneller Puls, unruhig", "Bleich, chalte Schweiss, schnälle Puls, unrueig"], ["Red face and laughing", "Rotes Gesicht und Lachen", "Rots Gsicht und Lache"], ["Hiccups", "Schluckauf", "Hitzgi"],
  ["Where does the warning triangle go on a normal road?", "Wohin kommt das Pannendreieck auf einer normalen Strasse?", "Wo chunnt s Pannedreieck uf ere normale Strass hi?"], ["At least 50 m before the scene", "Mindestens 50 m vor die Unfallstelle", "Mindeschtens 50 m vor d Unfallstell"], ["Right next to the car", "Direkt neben das Auto", "Diräkt näbs Auto"], ["Behind the scene", "Hinter die Unfallstelle", "Hinder d Unfallstell"],
  ["Helicopter signal for \"Yes, we need help\"?", "Helikoptersignal für \"Ja, wir brauchen Hilfe\"?", "Helisignal für \"Ja, mir bruuched Hilf\"?"], ["One arm raised", "Ein Arm hoch", "En Arm ufe"], ["Lying flat on the ground", "Flach auf dem Boden liegen", "Flach uf em Bode ligge"],
  ["Who gives advice on poisoning?", "Wer berät bei Vergiftungen?", "Wer berootet bi Vergiftige?"],
  ["NOTHELFER EXAM", "NOTHELFER-PRÜFUNG", "NOTHELFER-PRÜEFIG"], ["Question {0}/10   ·   ✓ {1}", "Frage {0}/10   ·   ✓ {1}", "Frog {0}/10   ·   ✓ {1}"], ["Correct! ✓", "Richtig! ✓", "Richtig! ✓"], ["Correct answer: {0}", "Richtige Antwort: {0}", "Richtigi Antwort: {0}"],
  ["{0}/10 correct", "{0}/10 richtig", "{0}/10 richtig"], ["PASSED! 🎉", "BESTANDEN! 🎉", "BESTANDE! 🎉"], ["Not quite: 8 needed.", "Knapp nicht: 8 nötig.", "Chnapp nöd: 8 nötig."], ["{0}/10. Close! Read your handbook (TAB) and try again.", "{0}/10. Knapp! Lies dein Handbuch (TAB) und versuch es nochmal.", "{0}/10. Chnapp! Lis dis Handbuech (TAB) und probiers nomal."],
  // ending & book
  ["NOTHELFER-AUSWEIS", "NOTHELFER-AUSWEIS", "NOTHELFER-USWIIS"], ["Basic first aid: passed with {0}/24 ⭐", "Erste Hilfe Grundkurs: bestanden mit {0}/24 ⭐", "Erschti Hilf Grundkurs: bestande mit {0}/24 ⭐"], ["Samariterverein Baar · Kanton Zug", "Samariterverein Baar · Kanton Zug", "Samariterverein Baar · Kanton Zug"],
  ["Cases solved: {0}/8", "Gelöste Fälle: {0}/8", "Glösti Fäll: {0}/8"], ["Stars: {0}/24", "Sterne: {0}/24", "Stärn: {0}/24"], ["Chest compressions given: {0}", "Herzdruckmassagen-Kompressionen: {0}", "Herzdruckmassage-Kompressione: {0}"], ["Exam: {0}/10", "Prüfung: {0}/10", "Prüefig: {0}/10"], ["Zuger cherries eaten: {0}", "Gegessene Zuger Kirschen: {0}", "Ggässni Zuger Chriesi: {0}"],
  ["This was a refresher. Please book a real first aid course (e.g. Samariter or SRK) and refresh it every few years!", "Das war eine Auffrischung. Bitte buche einen echten Erste-Hilfe-Kurs (z. B. Samariter oder SRK) und frische ihn alle paar Jahre auf!", "Das isch e Uffrischig gsi. Bitte buech en ächte Erschti-Hilf-Kurs (z. B. Samariter oder SRK) und frisch ne alli paar Jahr uf!"],
  ["Nothelfer handbook — page {0}/{1}", "Nothelfer-Handbuch — Seite {0}/{1}", "Nothelfer-Handbuech — Siite {0}/{1}"], ["Nothelfer-Ausweis", "Nothelfer-Ausweis", "Nothelfer-Uswiis"],
  ["Passed! Basic first aid, Samariterverein Baar. Refresh your knowledge in a real course every few years.", "Bestanden! Erste Hilfe Grundkurs, Samariterverein Baar. Frische dein Wissen alle paar Jahre in einem echten Kurs auf.", "Bestande! Erschti Hilf Grundkurs, Samariterverein Baar. Frisch dis Wüsse alli paar Jahr imene ächte Kurs uf."],
  ["Solve the case \"{0}\" to unlock this card.", "Löse den Fall \"{0}\", um diese Karte freizuschalten.", "Lös de Fall \"{0}\", zum die Charte freischalte."], ["This game is a refresher, not a replacement for a real first aid course.", "Dieses Spiel ist eine Auffrischung, kein Ersatz für einen echten Erste-Hilfe-Kurs.", "Das Spiel isch e Uffrischig, kei Ersatz für en ächte Erschti-Hilf-Kurs."],
]);