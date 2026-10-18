'use strict';
// =====================================================================
//  SARCHITECT — Level 2: California
//  Loaded after index.html's main script; shares its globals (engine, sprites, i18n).
//  Edit FINAL_MESSAGE_2 below for the Level 2 ending (en / de / gsw).
// =====================================================================
const FINAL_MESSAGE_2 = {
  en: "Sarah,\n" +
    "sequoias, redwoods, a shrimp in a tree, deer at the drive-through and 8 weird laws later, here we are on top of Mt Shasta.\n" +
    "Every road trip with you is my favourite song. Let's keep looping it forever.\n" +
    "I love you. — C-Real ♥",
  de: "Sarah,\n" +
    "Mammutbäume, Redwoods, eine Crevette auf einem Baum, Rehe im Drive-through und 8 verrückte Gesetze später stehen wir auf dem Mt Shasta.\n" +
    "Jeder Roadtrip mit dir ist mein Lieblingslied. Lass ihn uns für immer loopen.\n" +
    "Ich liebe dich. — C-Real ♥",
  gsw: "Sarah,\n" +
    "Mammutbäum, Redwoods, e Crevette uf emne Baum, Reh im Drive-through und 8 verruckti Gsetz spöter stönd mir uf em Mt Shasta.\n" +
    "Jede Roadtrip mit dir isch mis Lieblingslied. Lass ne üs für immer loope.\n" +
    "Ich ha di mega gern. — C-Real ♥",
};
const L2_MONEY = { park: 35, summit: 25, donuts: 8, campsite: 20 };

// ---------------------------------------------------------------- tiles
Object.assign(T, { ASPH: 20, FERN: 21, REDW: 22, SEQ: 23, DRYG: 24, VOLC: 25, GATE: 26, FIRE: 27, ASH: 28, PLAZA: 29, FERNO: 30 });
for (const id of [T.REDW, T.SEQ, T.GATE]) SOLID.add(id);
TILE_HOOKS.push(({ r, speck, cdot }) => {
  const four = fn => [0, 1, 2, 3].map(() => mk(fn));
  GROUND[T.ASPH] = four(x => { speck(x, '#4a4a4f', ['#55555a', '#3f3f44', '#5c5c60'], 18); });
  GROUND[T.FERN] = four(x => speck(x, '#2f4f2a', ['#3b6232', '#263f22', '#4a5a2a'], 28));
  GROUND[T.DRYG] = four(x => { speck(x, '#c8a85a', ['#b8984a', '#d8b86a', '#a88a44'], 26); });
  GROUND[T.VOLC] = four(x => speck(x, '#8a7a6e', ['#7a6a5e', '#9a8a7c', '#6e6054'], 22));
  GROUND[T.ASH] = four(x => speck(x, '#3a3532', ['#2a2624', '#4a4440', '#5a3a2a'], 26));
  GROUND[T.PLAZA] = four(x => { x.fillStyle = '#d8d2c4'; x.fillRect(0, 0, 16, 16); x.fillStyle = '#c4beb0'; x.fillRect(0, 0, 16, 1); x.fillRect(0, 0, 1, 16); x.fillRect(8, 8, 8, 1); x.fillRect(8, 8, 1, 8); });
  GROUND[T.FIRE] = GROUND[T.ASH];
  OVER[T.REDW] = four(x => {
    x.fillStyle = 'rgba(0,0,0,.3)'; x.beginPath(); x.ellipse(8, 14, 7, 2, 0, 0, 7); x.fill();
    x.fillStyle = '#7a3a22'; x.fillRect(5, 6, 6, 10); x.fillStyle = '#9a4a2c'; x.fillRect(6, 6, 2, 10); x.fillStyle = '#5a2a18'; x.fillRect(10, 8, 1, 7);
    cdot(x, 8, 4, 6, '#1f4a2a'); cdot(x, 6, 3, 3.5, '#2a5e34'); cdot(x, 11, 5, 3, '#183e22');
  });
  OVER[T.SEQ] = four(x => {
    x.fillStyle = 'rgba(0,0,0,.3)'; x.beginPath(); x.ellipse(8, 14, 8, 2.5, 0, 0, 7); x.fill();
    x.fillStyle = '#a0522d'; x.fillRect(3, 3, 10, 13); x.fillStyle = '#c0683a'; x.fillRect(4, 3, 3, 13); x.fillStyle = '#7a3a1e'; x.fillRect(11, 4, 1, 12); x.fillRect(8, 6, 1, 8);
    cdot(x, 8, 2, 5, '#2e5a2a'); cdot(x, 4, 2, 3, '#3a6a34');
  });
  OVER[T.GATE] = four(x => {
    x.fillStyle = '#6b4a2a'; x.fillRect(1, 4, 2, 12); x.fillRect(13, 4, 2, 12);
    for (let i = 0; i < 16; i += 4) { x.fillStyle = (i / 4) % 2 ? '#ffffff' : '#d94b2a'; x.fillRect(i, 6, 4, 3); }
  });
  OVER[T.FERNO] = four(x => { for (let i = 0; i < 3; i++) { const fx = 3 + (r() * 10) | 0, fy = 4 + (r() * 8) | 0; x.fillStyle = '#3f7a34'; x.fillRect(fx - 2, fy, 5, 1); x.fillRect(fx - 1, fy - 1, 3, 1); x.fillRect(fx, fy - 2, 1, 4); x.fillStyle = '#5a9a44'; x.fillRect(fx, fy - 1, 1, 1); } });
});

// ---------------------------------------------------------------- world layout (112 x 80 tiles)
const L2_W = 112, L2_H = 80;
const SHASTA = { x: 92, y: 7 };
const l2Zone = (tx, ty) => ty < 26 ? (tx < 56 ? 'redwoods' : 'shasta') : ty < 52 ? (tx < 56 ? 'sf' : 'valley') : (tx < 56 ? 'bigsur' : 'sequoia');
const oceanEdge = ty => 5 + 1.5 * Math.sin(ty * .3);
function l2Base(tx, ty) {
  const z = l2Zone(tx, ty);
  if (z === 'redwoods') return T.FERN;
  if (z === 'shasta') { const d = dist(tx, ty, SHASTA.x, SHASTA.y); return d < 7 ? T.SNOW : d < 12 ? T.VOLC : T.ALP; }
  if (z === 'sf') return tx < oceanEdge(ty) + 3 ? T.SAND : T.G;
  if (z === 'bigsur') return tx < oceanEdge(ty) + 3 ? T.SAND : T.DRYG;
  if (z === 'valley') return T.DRYG;
  return T.F;
}
function l2Terrain(tx, ty, r) {
  const z = l2Zone(tx, ty); let t = l2Base(tx, ty); const k = r();
  if (z === 'redwoods') { if (k < .2) t = T.REDW; else if (k < .27) t = T.FERNO; }
  else if (z === 'shasta') { if (k < .06) t = T.ROCK; else if (k < .11) t = T.PINE; }
  else if (z === 'sf') { if (k < .02) t = T.TREE; }
  else if (z === 'valley') { if (k < .025) t = T.TREE; }
  else if (z === 'bigsur') { if (k < .05) t = T.PINE; else if (k < .08) t = T.ROCK; }
  else { if (k < .1) t = T.SEQ; else if (k < .15) t = T.PINE; }
  if (tx < oceanEdge(ty)) t = T.WATER;
  if (z === 'redwoods' && tx >= oceanEdge(ty) && tx < oceanEdge(ty) + 2) t = T.ROCK;
  // the sequoia park is walled in by giant trees; Mt Shasta's summit by a ring of rock
  if ((z === 'sequoia') && (tx === 56 || tx === 57 || ty === 52 || ty === 53)) t = T.SEQ;
  const sd = dist(tx, ty, SHASTA.x, SHASTA.y); if (sd >= 10 && sd < 11.2) t = T.ROCK;
  if (tx === 0 || ty === 0 || tx === L2_W - 1 || ty === L2_H - 1) t = tx < 30 ? T.WATER : T.ROCK;
  return t;
}
const asph = pts => pts;
const trail = pts => Object.assign(pts, { trail: true });
const L2_PATHS = [
  // dirt trails first, so the roads carved after them stay asphalt where they cross
  trail([[90, 64], [90, 72]]), trail([[31, 14], [31, 11]]), trail([[42, 14], [44, 18]]), trail([[9, 74], [12, 74]]),
  asph([[9, 2], [9, 77]]),                                   // Highway 1
  asph([[9, 30], [45, 30]]), asph([[9, 46], [45, 46]]), asph([[22, 30], [22, 46]]), asph([[36, 30], [36, 46]]), asph([[45, 30], [45, 46]]),
  asph([[45, 38], [104, 38]]),                               // I-80 east
  asph([[62, 38], [62, 20], [82, 20]]),                      // north to Mt Shasta
  asph([[9, 14], [42, 14]]),                                 // redwoods road
  asph([[62, 38], [62, 64], [104, 64]]),                     // south into Sequoia
  asph([[9, 60], [32, 60]]),                                 // Big Sur campground road
  asph([[80, 39], [80, 46]]),                                // drive-through lane
  trail([[82, 20], [86, 15], [91, 9]]),                      // Shasta summit trail
];
const L2_BUILDINGS = [
  { id: 'hilton', x: 11, y: 32, w: 8, h: 6, kind: 'hilton', label: 'Breakfast' },
  { id: 'google', x: 24, y: 32, w: 10, h: 6, kind: 'google', label: 'Sneak in' },
  { id: 'bar', x: 39, y: 32, w: 5, h: 5, kind: 'bar', label: 'Enter' },
  { id: 'donut', x: 11, y: 40, w: 5, h: 4, kind: 'donut', label: 'Buy donuts' },
  { id: 'tw1', x: 38, y: 40, w: 5, h: 4, kind: 'tower', col: '#b9c4cc' },
  { id: 'tw2', x: 12, y: 48, w: 6, h: 3, kind: 'tower', col: '#d8c8a8' },
  { id: 'tw3', x: 26, y: 48, w: 8, h: 3, kind: 'tower', col: '#c8b8d0' },
  { id: 'tw4', x: 38, y: 48, w: 5, h: 3, kind: 'tower', col: '#a8b8a8' },
  { id: 'bk', x: 72, y: 40, w: 6, h: 4, kind: 'bk', label: 'Order' },
  { id: 'ranger', x: 64, y: 44, w: 5, h: 4, kind: 'ranger' },
  { id: 'trailhead', x: 76, y: 21, w: 4, h: 3, kind: 'ranger' },
  { id: 'bigred', x: 30, y: 8, w: 3, h: 3, kind: 'bigred', label: 'Climb up' },
  { id: 'surf', x: 12, y: 56, w: 5, h: 3, kind: 'surfshack', label: 'Surf!' },
  { id: 'camp', x: 24, y: 55, w: 5, h: 3, kind: 'camp', label: 'Campsite' },
  { id: 'sherman', x: 88, y: 68, w: 4, h: 4, kind: 'sherman', label: 'Climb' },
  { id: 'gear', x: 66, y: 22, w: 5, h: 3, kind: 'gearshop', label: 'Gear shop' },
];
const L2_CR_SPOTS = {
  busk: { x: 30 * 16 + 8, y: 42 * 16 + 8, pose: 'busk' }, forest2: { x: 24 * 16 + 8, y: 18 * 16 + 10, pose: 'forest' },
  shasta: { x: 72 * 16 + 8, y: 24 * 16 + 10, pose: 'mount' }, camp2: { x: 31 * 16 + 8, y: 57 * 16 + 10, pose: 'wine' },
};
const L2_START = { x: 15 * 16 + 8, y: 39 * 16 + 10 };
const JAY_SPOTS = { station: { x: 70 * 16 + 8, y: 46 * 16 + 10 }, trailhead: { x: 82 * 16 + 8, y: 23 * 16 + 10 }, fire: { x: 18 * 16 + 8, y: 62 * 16 + 10 } };
const CAR_START = { x: 19 * 16 + 8, y: 40 * 16 + 12 };
const DRIVE_THRU = { x: 80 * 16 + 8, y: 47 * 16 + 6 };
const UNOFFICIAL_CAMP = { x: 45 * 16 + 8, y: 19 * 16 + 8 };
const BEACH_TABLE = { x: 7 * 16 + 8, y: 66 * 16 + 8 };
const GROVE = { x: 34 * 16 + 8, y: 53 * 16 + 8 };
const PIGEON_SPOT = { x: 27 * 16 + 8, y: 43 * 16 + 8 };
const FROG_STAND = { x: 86 * 16 + 8, y: 44 * 16 + 10 };
const SUMMIT = { x: SHASTA.x * 16 + 8, y: SHASTA.y * 16 + 8 };
const L2_SIGNS = [
  { x: 11 * 16 + 8, y: 53 * 16 + 8, act: () => say([['Sign', 'CARMEL-BY-THE-SEA. Charming. Very charming. Suspiciously charming.']]) },
  { x: 34 * 16 + 8, y: 56 * 16 + 4, act: () => say([['Sign', 'PACIFIC GROVE — "Butterfly Town, USA". Please do not disturb the monarch butterflies.'], ['Sarah', 'I would never. ...unless I accidentally rope skip.']]) },
  { x: 12 * 16 + 8, y: 75 * 16 + 4, act: () => say([['Sign', 'ELEPHANT SEAL VISTA. Do not approach. They are 2 tons of attitude.']]) },
  { x: FROG_STAND.x, y: FROG_STAND.y, label: 'Frog contest', draw: s => drawFrogStand(s), act: () => frogStand() },
  { x: 60 * 16 + 8, y: 50 * 16 + 8, act: () => say([['Sign', 'SEQUOIA NATIONAL PARK — entrance permit required. Ask Ranger Jay at the station.']]) },
  { x: 47 * 16 + 8, y: 15 * 16 + 8, act: () => say([['Sign', 'REDWOODS — Keep it crumb clean! Steller\'s jays raid the nests of the endangered marbled murrelet.']]) },
];
const L2_CR_TEXTS = [
  'Did you know the Chev has 8 cupholders? I counted. Twice. 🚙', 'Union Square crowd is great today! Come get some busking money. 🎸',
  'Ranger Jay says hi. He also says "don\'t feed the squirrels". He says it a lot.', 'Craving eggs benedict. NOT from the Hilton. 🍳',
  'Fun fact: redwoods are the tallest trees on Earth. Sequoias are the biggest. Shrimp: unknown.', 'Remember to say "awesome" at least 40 times a day here.',
  'I looped your laugh into a song. It\'s my best track. ❤', 'Saw deer at the Burger King drive-through again. They never order anything.',
];

// ---------------------------------------------------------------- state helpers
const L2 = () => ST.l2;
const postcardCount = () => POSTCARDS.filter(p => L2().postcards[p.id]).length;
const lawCount = () => LAWS.filter(l => L2().laws[l.id]).length;
function addMoney(n) { L2().money = Math.max(0, L2().money + n); }
function l2UpdateGates() {
  const park = !!L2().permits.park, shasta = !!L2().flags.finished;   // the summit is climbed in the expedition minigame
  for (let ty = 52; ty <= 53; ty++) for (let tx = 61; tx <= 63; tx++) map[ty * W + tx] = park ? T.ASPH : T.GATE;
  for (let ty = 0; ty < 26; ty++) for (let tx = 56; tx < W; tx++) {
    const sd = dist(tx, ty, SHASTA.x, SHASTA.y), i = ty * W + tx;
    if (sd >= 10 && sd < 11.2 && (map[i] === T.PATH || map[i] === T.GATE)) map[i] = shasta ? T.PATH : T.GATE;
  }
}
// runs before the reachability flood fill, so gates are still open here (spawns inside the parks stay inside);
// l2Spawn() closes them afterwards via l2UpdateGates()
function l2PostGen() {
  for (let ty = 40; ty <= 44; ty++) for (let tx = 25; tx <= 34; tx++) map[ty * W + tx] = T.PLAZA;   // Union Square
  if (L2().flags.fireDone) burnBigSur();
}
function burnBigSur() {
  for (let ty = 63; ty < H - 1; ty++) for (let tx = 6; tx < 55; tx++) {
    const i = ty * W + tx; if (map[i] === T.ASPH || map[i] === T.WATER || map[i] === T.BLD || map[i] === T.SAND) continue;
    if ((hash(tx, ty) & 7) < 5) map[i] = T.ASH;
  }
}

// ---------------------------------------------------------------- entities
let pigeons = [], squirrels = [], slugs = [], deer = [], seals = [], birds = [], butterflies = [], walkers = [];
const FIRE = { active: false, front: 0, t: 0, spotT: 0, burning: new Set() };
function l2Spawn() {
  const at = (tx, ty) => { const [x, y] = nearReach(tx, ty); return { x: x * 16 + 8, y: y * 16 + 10 }; };
  const r = mulberry32(31);
  pigeons = []; for (let i = 0; i < 7; i++) pigeons.push({ ...at(26 + (i % 4) * 2, 41 + (i % 3)), hx: 0, hy: 0, t: 0, vx: 0, vy: 0, fly: 0, face: 1 });
  for (const p of pigeons) { p.hx = p.x; p.hy = p.y; }
  squirrels = [[20, 20], [36, 6], [14, 10], [70, 60], [96, 70], [84, 74], [100, 58]].map(([a, b]) => { const p = at(a, b); return { ...p, hx: p.x, hy: p.y, t: 0, vx: 0, vy: 0, face: 1, steal: 0 }; });
  slugs = []; for (let i = 0; i < 12; i++) { const p = at(12 + ((r() * 40) | 0), 3 + ((r() * 20) | 0)); slugs.push({ ...p, dir: r() * 6.28, t: 0 }); }
  deer = [[80, 41], [80, 43], [80, 45]].map(([a, b], i) => ({ x: a * 16 + 8, y: b * 16 + 10, queue: true, face: 1, t: i, vx: 0, vy: 0 }));
  if (L2().flags.deerDone) for (const d of deer) { d.queue = false; d.x += 60; }
  deer.push({ ...at(96, 46), queue: false, face: -1, t: 0, vx: 0, vy: 0 }, { ...at(90, 32), queue: false, face: 1, t: 2, vx: 0, vy: 0 });
  seals = [[6, 71], [7, 73], [6, 75], [7, 77]].map(([a, b]) => ({ x: a * 16 + 8, y: b * 16 + 10, t: rnd() * 5, bark: 0 }));
  birds = [[18, 8], [40, 10], [26, 22], [74, 58], [94, 62]].map(([a, b]) => { const p = at(a, b); return { ...p, hx: p.x, hy: p.y, t: 0, vx: 0, vy: 0, hop: 0, face: 1 }; });
  butterflies = []; for (let i = 0; i < 9; i++) butterflies.push({ x: GROVE.x + (r() - .5) * 60, y: GROVE.y + (r() - .5) * 40, ph: r() * 6, hx: GROVE.x, hy: GROVE.y });
  walkers = [[26, 38], [40, 45], [18, 46]].map(([a, b], i) => { const p = at(a, b); return { ...p, hx: p.x, hy: p.y, t: 0, vx: 0, vy: 0, face: 1, col: ['#3a7bd5', '#e05a5a', '#5aa05a'][i], anim: 0, talked: false }; });
  FIRE.active = false; FIRE.burning.clear();
  if (!L2().car) L2().car = { ...CAR_START };
  l2UpdateGates();
}
// generic wander for critters
function wander(e, dt, sp, radius, hw = 3) {
  e.t -= dt;
  if (e.t <= 0) {
    e.t = 1 + rnd() * 2.5;
    if (rnd() < .4) e.vx = e.vy = 0; else { const a = rnd() * 6.28; e.vx = Math.cos(a) * sp; e.vy = Math.sin(a) * sp; }
    if (dist(e.x, e.y, e.hx, e.hy) > radius) { const a = Math.atan2(e.hy - e.y, e.hx - e.x); e.vx = Math.cos(a) * sp; e.vy = Math.sin(a) * sp; }
  }
  move(e, e.vx * dt, e.vy * dt, solidW, hw, 3); if (e.vx) e.face = Math.sign(e.vx);
}
function l2Update(dt) {
  if (P.bike) { L2().car.x = P.x; L2().car.y = P.y; }
  for (const p of pigeons) {
    const d = dist(p.x, p.y, P.x, P.y);
    if (d < 26 && (P.moving || P.bike)) { p.fly = .8; const a = Math.atan2(p.y - P.y, p.x - P.x); p.vx = Math.cos(a) * 70; p.vy = Math.sin(a) * 70; }
    if (p.fly > 0) { p.fly -= dt; p.x += p.vx * dt; p.y += p.vy * dt; } else wander(p, dt, 10, 30, 2);
  }
  for (const s of squirrels) {
    const d = dist(s.x, s.y, P.x, P.y);
    if (L2().donuts > 0 && d < 90 && !P.bike) {
      const a = Math.atan2(P.y - s.y, P.x - s.x); move(s, Math.cos(a) * 50 * dt, Math.sin(a) * 50 * dt, solidW, 3, 3); s.face = Math.cos(a) < 0 ? -1 : 1;
      s.steal -= dt;
      if (d < 10 && s.steal <= 0) { s.steal = 4; L2().donuts--; sfx.eww(); popText(P.x, P.y - 26, 'A squirrel stole a donut! 🐿️', '#ffcf6b'); }
    } else wander(s, dt, 26, 50);
  }
  for (const s of slugs) {
    s.t -= dt; if (s.t <= 0) { s.t = 2 + rnd() * 3; s.dir += (rnd() - .5) * 2; }
    move(s, Math.cos(s.dir) * 3 * dt, Math.sin(s.dir) * 3 * dt, solidW, 3, 2);
    if (!P.bike && P.jump <= 0 && P.slow <= 0 && dist(P.x, P.y - 2, s.x, s.y) < 8) {
      P.slow = 2; sfx.eww(); L2().stats.slugs = (L2().stats.slugs || 0) + 1;
      popText(P.x, P.y - 26, 'Eww! A banana slug! So slimy...', '#f2d94a');
      if (L2().stats.slugs === 1) setTimeout(() => crText('Banana slugs! 🐌 They\'re the UC Santa Cruz mascot. Jump ([A]) over them!'), 900);
    }
  }
  for (const d of deer) { if (!d.queue) { d.hx = d.hx || d.x; d.hy = d.hy || d.y; wander(d, dt, 16, 60, 4); } }
  for (const s of seals) {
    s.t -= dt; if (s.t <= 0) { s.t = 3 + rnd() * 5; s.bark = .6; if (dist(s.x, s.y, P.x, P.y) < 160) sfx.roar(); }
    s.bark = Math.max(0, s.bark - dt);
    if (dist(s.x, s.y, P.x, P.y) < 16) { const a = Math.atan2(P.y - s.y, P.x - s.x); P.kx = Math.cos(a) * 200; P.ky = Math.sin(a) * 200; s.bark = .6; popText(s.x, s.y - 20, 'BWAAARP!', '#c9a26b'); sfx.roar(); }
  }
  for (const b of birds) {
    b.hop -= dt; if (b.hop <= 0) { b.hop = .4 + rnd(); if (dist(b.x, b.y, P.x, P.y) < 60 && rnd() < .3) { sfx.blip(); popText(b.x, b.y - 14, 'SKREEK!', '#6fa8ff'); } }
    wander(b, dt, 22, 50, 2);
  }
  for (const b of butterflies) { b.ph += dt * 3; b.x = b.hx + Math.cos(b.ph * .4 + b.hy) * 40 + Math.sin(b.ph) * 4; b.y = b.hy + Math.sin(b.ph * .3) * 22; }
  if (P.jump > 0 && dist(P.x, P.y, GROVE.x, GROVE.y) < 70 && !L2().laws.butterflies) breakLaw('butterflies');
  for (const w of walkers) { if (!dlg.cur) wander(w, dt, 20, 70, 3); if (w.vx || w.vy) w.anim += dt; }
  // Carmel: the high-heel permit
  const ptx = P.x / 16, pty = P.y / 16;
  if (!L2().laws.heels && ptx > 10 && ptx < 22 && pty > 52 && pty < 55) breakLaw('heels');
  updateFire(dt);
  guitarNear(CR_SPOTS.busk, dt);
}
// ---------------------------------------------------------------- the black Chev
function enterCar() { P.bike = true; P.x = L2().car.x; P.y = L2().car.y; sfx.blip(); popText(P.x, P.y - 26, 'Vroom! 🚙', '#cfe'); }
function exitCar() {
  if (!P.bike) return;
  L2().car = { x: P.x, y: P.y }; P.bike = false;
  for (const [dx, dy] of [[0, 14], [16, 0], [-16, 0], [0, -14]]) if (!boxHit(P.x + dx, P.y + dy, 4, 4, solidW)) { P.x += dx; P.y += dy; break; }
}
function l2OnB() {
  if (P.bike) { exitCar(); sfx.blip(); return; }
  if (!L2().flags.keys) { popText(P.x, P.y - 26, 'No car keys yet!', '#fcc'); return; }
  if (dist(P.x, P.y, L2().car.x, L2().car.y) < 34) enterCar();
  else popText(P.x, P.y - 26, 'The Chev is parked somewhere else.', '#fcc');
}
function l2VehicleSpeed() {
  const i = Math.floor(P.y / 16) * W + Math.floor(P.x / 16);
  return map[i] === T.ASPH ? 185 : 125;
}
function drawChev(x, y, dir, jh = 0, driver = false) {
  x = Math.round(x); y = Math.round(y);
  ell(x, y, 15, 4, 'rgba(0,0,0,.3)'); y -= Math.round(jh);
  const K = '#141418', K2 = '#24242a', GL = '#4f6f8f', CH = '#9a9aa4';
  if (dir === 'left' || dir === 'right') {
    const f = dir === 'right' ? 1 : -1;
    R(x - 14, y - 12, 28, 9, K); R(x - 12 + (f < 0 ? 2 : 0), y - 18, 22, 7, K2); R(x - 11, y - 19, 20, 1, CH);
    R(x - 10 + (f < 0 ? 2 : 0), y - 17, 6, 5, GL); R(x - 2 + (f < 0 ? 2 : 0), y - 17, 6, 5, GL); R(x + 6 * f + (f < 0 ? -2 : 0), y - 17, 4, 5, GL);
    if (driver) { R(x + 2 * f, y - 16, 3, 3, '#6b4226'); }
    R(x - 14, y - 7, 28, 1, '#3a3a44');
    R(f > 0 ? x + 13 : x - 14, y - 11, 1, 2, '#ffe9a0'); R(f > 0 ? x - 14 : x + 13, y - 11, 1, 2, '#d9302a');
    for (const wx of [x - 9, x + 9]) { circ(wx, y - 3, 3.4, '#0a0a0a'); circ(wx, y - 3, 1.3, CH); }
  } else {
    R(x - 9, y - 22, 18, 21, K); R(x - 8, y - 18, 16, 10, K2); R(x - 9, y - 23, 18, 1, CH);
    R(x - 6, dir === 'down' ? y - 9 : y - 19, 12, 4, GL); R(x - 7, dir === 'down' ? y - 18 : y - 9, 14, 2, GL);
    if (driver) R(x - 3, dir === 'down' ? y - 9 : y - 19, 3, 2, '#6b4226');
    for (const wy of [y - 19, y - 6]) { R(x - 11, wy, 2, 5, '#0a0a0a'); R(x + 9, wy, 2, 5, '#0a0a0a'); }
    if (dir === 'down') { R(x - 7, y - 2, 3, 1, '#ffe9a0'); R(x + 4, y - 2, 3, 1, '#ffe9a0'); } else { R(x - 7, y - 2, 3, 1, '#d9302a'); R(x + 4, y - 2, 3, 1, '#d9302a'); }
  }
}

// ---------------------------------------------------------------- sprites
function drawPerson(x, y, o) {   // o: { shirt, pants, skin, hair, hat, hatCol, anim, beard, extra }
  x = Math.round(x); y = Math.round(y); shadow(x, y);
  const st = o.anim ? Math.floor(o.anim * 8) % 2 : 0, SK = o.skin || '#e8b996';
  R(x - 3, y - 5, 2, 5 - st, o.pants || '#2a2a30'); R(x + 1, y - 5, 2, 4 + st, o.pants || '#2a2a30');
  R(x - 4, y - 12, 8, 7, o.shirt); R(x - 5, y - 11, 1, 5, o.shirt); R(x + 4, y - 11, 1, 5, o.shirt); R(x - 5, y - 6, 1, 1, SK); R(x + 4, y - 6, 1, 1, SK);
  R(x - 3, y - 18, 6, 6, SK); R(x - 3, y - 18, 6, 1, o.hair || '#3a2a1e');
  R(x - 2, y - 15, 1, 1, '#222'); R(x + 1, y - 15, 1, 1, '#222');
  if (o.beard) R(x - 2, y - 13, 4, 1, o.beard); else R(x - 1, y - 13, 2, 1, '#9a5a4a');
  if (o.hat === 'ranger') { R(x - 6, y - 19, 12, 1, o.hatCol); R(x - 3, y - 22, 6, 3, o.hatCol); R(x - 1, y - 23, 2, 1, o.hatCol); }
  else if (o.hat === 'cap') { R(x - 4, y - 20, 8, 3, o.hatCol); R(x - 4, y - 17, 9, 1, o.hatCol); }
  else if (o.hat === 'beanie') R(x - 4, y - 21, 8, 3, o.hatCol);
  if (o.extra) o.extra(x, y);
}
const drawRangerJay = (x, y, tm) => drawPerson(x, y, { shirt: '#c8b07a', pants: '#4a5a3a', hat: 'ranger', hatCol: '#8a6a3a', beard: '#3a2a1e', extra: (x, y) => { R(x - 3, y - 10, 2, 2, '#ffd34d'); R(x + 1, y - 11, 2, 1, '#6b8a4a'); } });
const drawOfficer = (x, y) => drawPerson(x, y, { shirt: '#2a3a6a', pants: '#1a2440', hat: 'cap', hatCol: '#1a2440', extra: (x, y) => R(x - 3, y - 10, 2, 2, '#ffd34d') });
const drawGoogler = (x, y, col, anim) => drawPerson(x, y, { shirt: col, pants: '#3a4a6a', anim, extra: (x, y) => { R(x, y - 12, 1, 4, '#e0e0e0'); R(x - 1, y - 8, 3, 2, '#ffffff'); } });
function drawPigeon(p) { const x = Math.round(p.x), y = Math.round(p.y - (p.fly > 0 ? 8 : 0)), f = p.face || 1; shadow(p.x, p.y, 3); R(x - 3, y - 5, 6, 4, '#8a8f99'); R(x + (f > 0 ? 2 : -4), y - 7, 3, 3, '#6a6f7a'); R(x + (f > 0 ? 4 : -5), y - 6, 1, 1, '#d9a400'); R(x - 2, y - 4, 3, 1, '#7a9a8a'); if (p.fly > 0) { R(x - 6, y - 6 + Math.round(Math.sin(time * 30) * 2), 3, 1, '#9aa0aa'); R(x + 3, y - 6 - Math.round(Math.sin(time * 30) * 2), 3, 1, '#9aa0aa'); } }
function drawSquirrel(s) { const x = Math.round(s.x), y = Math.round(s.y), f = s.face || 1; shadow(x, y, 3); R(x - 3, y - 5, 5, 4, '#8a5a3a'); R(x + (f > 0 ? 1 : -4), y - 8, 3, 3, '#8a5a3a'); R(x + (f > 0 ? 3 : -4), y - 7, 1, 1, '#111'); R(x + (f > 0 ? -5 : 3), y - 10 + Math.round(Math.sin(time * 6 + s.hx) * 1), 3, 6, '#a06a48'); R(x - 1, y - 4, 2, 2, '#d8b896'); }
function drawSlug(s) { const x = Math.round(s.x), y = Math.round(s.y), f = Math.cos(s.dir) > 0 ? 1 : -1; R(x - 4, y - 3, 8, 3, '#f2d94a'); R(x - 3, y - 4, 6, 1, '#f8e878'); R(x + (f > 0 ? 3 : -4), y - 5, 1, 2, '#c8b030'); R(x - 4, y - 1, 8, 1, 'rgba(255,255,255,.35)'); }
function drawDeer(d) {
  const x = Math.round(d.x), y = Math.round(d.y), f = d.face || 1; shadow(x, y, 7);
  const C = '#a8744a'; R(x - 6, y - 4, 2, 4, '#7a5030'); R(x + 4, y - 4, 2, 4, '#7a5030'); R(x - 7, y - 10, 14, 6, C); R(x - 7, y - 10, 14, 1, '#c48a5a');
  const hx = f > 0 ? x + 5 : x - 9; R(hx, y - 15, 4, 6, C); R(hx + (f > 0 ? 3 : 0), y - 13, 1, 1, '#111'); R(hx, y - 17, 1, 2, '#6a4a2a'); R(hx + 3, y - 17, 1, 2, '#6a4a2a');
  R(f > 0 ? x - 8 : x + 7, y - 9, 1, 2, '#f4f0e8');
}
function drawSeal(s) {
  const x = Math.round(s.x), y = Math.round(s.y); shadow(x, y, 12);
  ell(x, y - 5, 12, 5, '#6a5a4a'); ell(x + 8, y - 8, 5, 4, '#7a6a5a'); R(x + 10, y - 9, 4, 3, '#5a4a3a'); R(x + 9, y - 10, 1, 1, '#111');
  if (s.bark > 0) { R(x + 13, y - 11, 2, 2, '#c94a4a'); }
}
function drawJayBird(b) { const x = Math.round(b.x), y = Math.round(b.y - (b.hop > 1 ? 2 : 0)), f = b.face || 1; shadow(x, y, 3); R(x - 3, y - 6, 6, 4, '#2a5ab8'); R(x + (f > 0 ? 1 : -4), y - 9, 3, 3, '#1a1a2a'); R(x + (f > 0 ? 2 : -3), y - 11, 2, 2, '#1a1a2a'); R(x + (f > 0 ? 4 : -5), y - 8, 1, 1, '#333'); R(x + (f > 0 ? -5 : 3), y - 5, 3, 1, '#2a5ab8'); }
function drawButterfly(b) { const x = Math.round(b.x), y = Math.round(b.y), w = Math.abs(Math.sin(b.ph * 4)) * 3 + 1; R(x - w, y - 1, w, 3, '#f08a24'); R(x + 1, y - 1, w, 3, '#f08a24'); R(x, y - 1, 1, 3, '#1a1a1a'); }
function drawWalker(w) { drawPerson(w.x, w.y, { shirt: w.col, pants: '#3a3a4a', anim: w.vx || w.vy ? w.anim : 0, extra: (x, y) => R(x - 3, y - 16, 6, 1, '#111') }); }
function drawFrogStand(s) {
  const x = Math.round(s.x), y = Math.round(s.y); shadow(x, y, 10);
  R(x - 10, y - 12, 20, 12, '#c8843e'); R(x - 10, y - 12, 20, 2, '#e8a45e'); R(x - 11, y - 20, 22, 7, '#3a8a3a'); R(x - 9, y - 18, 18, 3, '#5aaa4a');
  R(x - 3, y - 8, 6, 4, '#4a9a3a'); R(x - 2, y - 9, 1, 1, '#ffffff'); R(x + 1, y - 9, 1, 1, '#ffffff');
}
function drawCampSpot() {
  const x = UNOFFICIAL_CAMP.x, y = UNOFFICIAL_CAMP.y;
  poly([[x - 16, y], [x - 8, y - 12], [x, y]], '#d8743a'); R(x - 9, y - 6, 2, 6, '#8a4a22');
  for (let i = 0; i < 6; i++) circ(x + 10 + Math.cos(i) * 5, y - 2 + Math.sin(i) * 2, 1.4, '#7d7d80');
  if (L2().laws.campfire) { ell(x + 10, y - 4, 3, 4 + Math.sin(time * 9), '#f08a24'); ell(x + 10, y - 3, 2, 2, '#ffd34d'); }
}
function drawBeachTable() { const x = BEACH_TABLE.x, y = BEACH_TABLE.y; R(x - 8, y - 8, 16, 3, '#a87a4a'); R(x - 7, y - 5, 2, 5, '#7a5a3a'); R(x + 5, y - 5, 2, 5, '#7a5a3a'); R(x - 2, y - 13, 2, 5, '#5a1a2a'); R(x - 2, y - 14, 2, 1, '#d9b47a'); }

// C-Real poses in California
CR_POSE.busk = {   // looper pedal + amp + open guitar case full of tips
  behind(x, y, tm) {
    R(x + 8, y - 10, 9, 10, '#1a1a1e'); R(x + 9, y - 9, 7, 5, '#3a3a40'); for (let i = 0; i < 3; i++) R(x + 9 + i * 2, y - 3, 1, 1, '#d9b47a');
    R(x - 12, y - 1, 6, 3, '#3a8a4a'); R(x - 10, y - 1, 2, 1, Math.floor(tm * 3) % 2 ? '#ff3030' : '#30ff60');
    R(x - 18, y + 1, 10, 4, '#2a1a12'); R(x - 17, y + 2, 8, 2, '#8a2a3a'); R(x - 15, y + 2, 1, 1, '#ffd34d'); R(x - 12, y + 3, 1, 1, '#ffd34d');
  },
  front(x, y, tm) {
    for (let i = 0; i < 8; i++) R(x + 1 + i, y - 8 - (i >> 1), 1, 1, '#6b4526');
    R(x + 9, y - 13, 2, 2, '#4a2f18'); ell(x - 2, y - 7, 4, 3, '#2a2a2e'); ell(x - 2, y - 7, 1.4, 1.4, '#555');
    R(x - 1, y - 10 + Math.floor(tm * 6) % 2, 1, 1, '#e9b892');
    for (let k = 0; k < 3; k++) { const p = (tm * .6 + k * .33) % 1, nx = Math.round(x + 6 + k * 4 + Math.sin(p * 6) * 2), ny = Math.round(y - 18 - p * 14); R(nx, ny, 1, 3, '#fff'); R(nx - 1, ny + 2, 2, 1, '#fff'); R(nx + 1, ny, 1, 1, '#fff'); }
  },
};
CR_POSE.wine = {   // campfire + wine glass
  behind(x, y, tm) {
    for (let i = 0; i < 6; i++) circ(x + 14 + Math.cos(i) * 5, y - 1 + Math.sin(i) * 2, 1.4, '#7d7d80');
    ell(x + 14, y - 4, 3, 4 + Math.sin(tm * 9), '#f08a24'); ell(x + 14, y - 3, 2, 2, '#ffd34d');
    R(x - 12, y - 7, 2, 7, '#3a1a2a'); R(x - 12, y - 8, 2, 1, '#d9b47a');
  },
  front(x, y) { R(x + 4, y - 11, 3, 2, '#8a1a3a'); R(x + 5, y - 9, 1, 3, '#dddddd'); R(x + 4, y - 6, 3, 1, '#dddddd'); },
};
Object.assign(PORTRAITS, {
  'Ranger Jay': () => drawRangerJay(0, 0, time), 'Officer': () => drawOfficer(0, 0), 'Googler': () => drawGoogler(0, 0, '#3a7bd5', 0),
  'Bartender': () => drawPerson(0, 0, { shirt: '#1a1a1a', pants: '#2a2a2a', beard: '#2a1a12', extra: (x, y) => R(x - 3, y - 10, 6, 1, '#d94b4b') }),
  'Drive-thru': () => drawPerson(0, 0, { shirt: '#d9442e', hat: 'cap', hatCol: '#f2c230' }),
  'Deer': () => drawDeer({ x: 0, y: 0, face: -1 }), 'Local': () => drawPerson(0, 0, { shirt: '#e05a5a', extra: (x, y) => R(x - 3, y - 16, 6, 1, '#111') }),
  'Frog guy': () => drawPerson(0, 0, { shirt: '#3a8a3a', hat: 'cap', hatCol: '#e8e0c8', beard: '#6a4a2a' }),
  'Shrimp': () => drawShrimp(0, -6, 2),
  'Shop clerk': () => drawPerson(0, 0, { shirt: '#c8502a', pants: '#3a4a3a', hat: 'beanie', hatCol: '#3a6ad8', beard: '#8a5a2a' }),
});
Object.assign(SPEAKER_COL, { 'Shop clerk': '#ff9a6a' });
Object.assign(SPEAKER_COL, { 'Ranger Jay': '#9ccf6a', 'Officer': '#7a9ae0', 'Googler': '#6fb8ff', 'Bartender': '#e09a6a', 'Drive-thru': '#ffb347', 'Deer': '#c8a07a', 'Local': '#ff9a9a', 'Frog guy': '#8ad06a', 'Shrimp': '#ff8a7a', 'Postcard': '#9fe0a0' });
function drawShrimp(x, y, s = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  for (let i = 0; i < 5; i++) R(-6 + i * 2, -2 - Math.round(Math.sin(i * .7) * 2), 3, 4, i % 2 ? '#ff8a6a' : '#ff6a4a');
  R(3, -4, 3, 3, '#ff6a4a'); R(-8, 0, 3, 2, '#ff9a7a'); R(4, -6, 4, 1, '#ff9a7a'); R(5, -8, 1, 3, '#ff9a7a');
  R(2, -4, 4, 2, '#111'); R(2, -4, 1, 1, '#4a6aff');   // sunglasses 😎
  g.restore();
}

// ---------------------------------------------------------------- buildings
function l2DrawBuilding(b, x, y, w, h) {
  const cx = x + w / 2, shadowB = () => R(x + 3, y + h - 1, w, 4, 'rgba(0,0,0,.3)');
  const windows = (col, rows, cols, wy0, gap = 12, lit = '#ffe9a0') => { for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) R(x + 6 + c * gap, y + wy0 + r * 10, 6, 6, (hash(c + b.x, r + b.y) % 5) ? col : lit); };
  switch (b.kind) {
    case 'hilton':
      shadowB(); R(x, y - 30, w, h + 30, '#d8d2c4'); R(x, y - 30, w, 3, '#b8b2a4'); windows('#7a9ab8', 7, 10, -24);
      R(cx - 30, y + h - 34, 60, 10, '#1a3a6a'); R(cx - 10, y + h - 14, 20, 14, '#2a2a30'); R(cx - 14, y + h - 16, 28, 3, '#c8a85a');
      return true;
    case 'google':
      shadowB(); R(x, y - 8, w, h + 8, '#e8eef4'); for (let i = 0; i < w; i += 10) R(x + i, y - 8, 1, h + 8, '#c8d4e0');
      [['#4285f4', 0], ['#ea4335', 1], ['#fbbc05', 2], ['#34a853', 3]].forEach(([c, i]) => R(x, y - 8 + i * 3, w, 3, c));
      windows('#9ac4f0', 3, 13, 8, 12, '#d8f0ff');
      R(cx - 8, y + h - 16, 16, 16, '#3a4a5a'); R(cx - 6, y + h - 14, 12, 12, '#7ab0e0');
      g.strokeStyle = '#ea4335'; g.lineWidth = 3; g.beginPath(); g.moveTo(x + w - 14, y + 2); g.quadraticCurveTo(x + w + 10, y + 30, x + w - 6, y + h - 2); g.stroke();
      return true;
    case 'bar':
      shadowB(); R(x, y + 4, w, h - 4, '#6a3a22'); for (let i = 0; i < w; i += 4) R(x + i, y + 4, 1, h - 4, '#5a2e1a'); R(x - 3, y - 4, w + 6, 10, '#3a1e12');
      R(cx - 22, y + 10, 44, 9, '#1a0e08'); R(cx - 20, y + 12, 40, 5, Math.floor(time * 2) % 2 ? '#ff4fa0' : '#ff7fbf');
      R(cx - 7, y + h - 18, 14, 18, '#2a1a10'); R(x + 6, y + 26, 10, 8, '#ffcf6b'); R(x + w - 16, y + 26, 10, 8, '#ffcf6b');
      return true;
    case 'donut':
      shadowB(); R(x, y + 6, w, h - 6, '#f4d8e4'); R(x - 2, y + 4, w + 4, 6, '#e86fa8');
      ell(cx, y - 6, 16, 12, '#c8843e'); ell(cx, y - 8, 15, 10, '#ff8ac4'); ell(cx, y - 7, 5, 4, '#f4d8e4');
      for (let i = 0; i < 8; i++) R(cx - 10 + hash(i, 3) % 20, y - 14 + hash(i, 5) % 10, 2, 1, ['#fff', '#4fc3f7', '#ffd34d', '#7ee081'][i % 4]);
      R(cx - 6, y + h - 14, 12, 14, '#7a4a3a'); R(x + 4, y + 16, 12, 10, '#ffe0f0');
      return true;
    case 'tower':
      shadowB(); R(x, y - 40, w, h + 40, b.col); windows('#6a8aa8', 8, Math.floor((w - 6) / 12) + 1, -34); R(x, y - 40, w, 2, '#ffffff');
      return true;
    case 'bk':
      shadowB(); R(x, y + 8, w, h - 8, '#f2e4c8'); R(x - 2, y, w + 4, 10, '#d9442e'); R(x - 2, y, w + 4, 2, '#f2a03a');
      ell(cx, y - 4, 22, 9, '#f2a03a'); ell(cx, y - 4, 20, 7, '#d9442e'); ell(cx, y - 10, 18, 5, '#f2a03a');
      R(x + 4, y + 16, w - 8, 10, '#8ac0e0'); R(cx - 6, y + h - 14, 12, 14, '#5a3a2a'); R(x + w - 2, y + 18, 6, 10, '#ffd34d');
      return true;
    case 'ranger':
      shadowB(); R(x, y + 8, w, h - 8, '#7a5a3a'); for (let j = y + 8; j < y + h; j += 4) R(x, j, w, 1, '#5e442a');
      poly([[x - 4, y + 10], [cx, y - 8], [x + w + 4, y + 10]], '#3a5a2a'); R(cx - 5, y + h - 14, 10, 14, '#3a2a1a');
      R(x + 4, y + 14, 8, 6, '#cfe0ff'); R(x + w - 1, y - 14, 1, 22, '#ddd'); R(x + w, y - 14, 8, 5, '#2a5aa8'); R(x + w, y - 14, 3, 3, '#ffffff');
      return true;
    case 'bigred':   // the giant old-growth redwood with the murrelet nest
      ell(cx, y + h, 22, 6, 'rgba(0,0,0,.35)'); R(cx - 12, y - 40, 24, h + 40, '#7a3a22'); R(cx - 9, y - 40, 5, h + 40, '#9a4a2c');
      for (let i = 0; i < 6; i++) R(cx - 10 + i * 4, y - 40, 1, h + 40, '#5a2a18');
      circ(cx, y - 48, 26, '#1f4a2a'); circ(cx - 14, y - 40, 14, '#2a5e34'); circ(cx + 14, y - 44, 13, '#183e22');
      R(cx + 10, y - 20, 14, 2, '#5a2a18'); ell(cx + 20, y - 22, 4, 2, '#8a6a4a'); R(cx + 19, y - 24, 2, 2, '#e8dcc0');
      return true;
    case 'surfshack':
      shadowB(); R(x, y + 6, w, h - 6, '#4ab0c8'); for (let i = 0; i < w; i += 6) R(x + i, y + 6, 2, h - 6, '#3a9ab0'); R(x - 3, y, w + 6, 8, '#f2d06b');
      for (let i = 0; i < 3; i++) { ell(x + 10 + i * 22, y + 20, 3, 12, ['#ff6fa8', '#ffd34d', '#7ee081'][i]); }
      return true;
    case 'camp':
      shadowB(); R(x + 6, y + 10, 24, h - 10, '#7a5a3a'); poly([[x + 2, y + 12], [x + 18, y], [x + 34, y + 12]], '#3a5a2a');
      poly([[x + 44, y + h], [x + 58, y + 14], [x + 72, y + h]], '#e8743a'); R(x + 57, y + 26, 2, 22, '#8a4a22');
      R(x + 10, y + 18, 16, 8, '#f2e4c8');
      return true;
    case 'gearshop':   // Shasta Mountain Shop: wooden alpine shop with crossed ice axes
      shadowB(); R(x, y + 8, w, h - 8, '#8a5a32'); for (let j = y + 8; j < y + h; j += 4) R(x, j, w, 1, '#6e4626');
      poly([[x - 4, y + 10], [x + 10, y - 10], [x + w - 10, y - 10], [x + w + 4, y + 10]], '#3a4a5a'); R(x + 8, y - 10, w - 16, 3, '#eef3f8');
      R(cx - 22, y + 12, 44, 9, '#f2e4c8'); g.strokeStyle = '#555'; g.lineWidth = 2; g.beginPath(); g.moveTo(cx - 8, y + 13); g.lineTo(cx + 8, y + 21); g.moveTo(cx + 8, y + 13); g.lineTo(cx - 8, y + 21); g.stroke();
      R(cx - 6, y + h - 14, 12, 14, '#3a2414'); R(x + 4, y + 26, 10, 8, '#cfe0ff'); R(x + w - 14, y + 26, 10, 8, '#cfe0ff');
      return true;
    case 'sherman':   // General Sherman, the biggest tree on Earth
      ell(cx, y + h, 30, 8, 'rgba(0,0,0,.35)'); R(cx - 22, y - 50, 44, h + 50, '#a0522d'); R(cx - 18, y - 50, 8, h + 50, '#c0683a');
      for (let i = 0; i < 8; i++) R(cx - 20 + i * 6, y - 50, 1, h + 50, '#7a3a1e');
      circ(cx, y - 62, 30, '#2e5a2a'); circ(cx - 20, y - 52, 16, '#3a6a34'); circ(cx + 18, y - 56, 16, '#24502a');
      if (!L2().postcards.shrimp) { const bob = Math.round(Math.sin(time * 3) * 2); g.save(); g.translate(cx, y - 92 + bob); drawShrimp(0, 0, 1); g.restore(); }
      return true;
  }
  return false;
}
function l2DrawGround(vis) {
  for (const s of slugs) if (vis(s.x, s.y)) drawSlug(s);
}
function l2Drawables(D, vis) {
  const add = (o, f) => { if (vis(o.x, o.y)) D.push({ y: o.y, f }); };
  if (!P.bike) add(L2().car, () => drawChev(L2().car.x, L2().car.y, 'right'));
  for (const p of pigeons) add(p, () => drawPigeon(p));
  for (const s of squirrels) add(s, () => drawSquirrel(s));
  for (const d of deer) add(d, () => drawDeer(d));
  for (const s of seals) add(s, () => drawSeal(s));
  for (const b of birds) add(b, () => drawJayBird(b));
  for (const b of butterflies) add(b, () => drawButterfly(b));
  for (const w of walkers) add(w, () => drawWalker(w));
  for (const k in JAY_SPOTS) { const s = JAY_SPOTS[k]; add(s, () => drawRangerJay(s.x, s.y, time)); }
  add(UNOFFICIAL_CAMP, drawCampSpot); add(BEACH_TABLE, drawBeachTable);
  add(SUMMIT, () => { R(SUMMIT.x - 1, SUMMIT.y - 18, 2, 18, '#ddd'); R(SUMMIT.x + 1, SUMMIT.y - 18, 9, 6, '#d52b1e'); R(SUMMIT.x + 4, SUMMIT.y - 17, 2, 4, '#fff'); R(SUMMIT.x + 3, SUMMIT.y - 16, 4, 2, '#fff'); });
}
function l2TileFx(id, tx, ty, sx, sy) {
  if (id === T.ASPH) { const z = zoneOf(tx, ty); if (((tx + ty) & 3) === 0 && z !== 'sf') R(sx + 6, sy + 7, 4, 1, '#d9c24a'); }
  if (FIRE.active && FIRE.burning.has(ty * W + tx)) {
    const f = Math.sin(time * 12 + tx * 3 + ty) * 2;
    ell(sx + 8, sy + 10, 6, 6 + f, 'rgba(240,120,30,.9)'); ell(sx + 8, sy + 11, 4, 3 + f * .5, '#ffd34d');
  }
}
function l2Overlay() {
  if (curZone === 'redwoods') { g.fillStyle = 'rgba(10,30,15,.18)'; g.fillRect(0, 0, VW, VH); }
  if (FIRE.active) { g.fillStyle = `rgba(90,40,20,${.18 + .1 * Math.sin(time * 2)})`; g.fillRect(0, 0, VW, VH); }
  if (curZone === 'shasta' && P.y < 20 * 16) { g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(0, 0, VW, VH); for (let i = 0; i < 30; i++) R((hash(i, 1) + time * 60 * (1 + i % 3)) % VW, (hash(i, 2) + time * 40) % VH, 1, 1, '#ffffff'); }
}
function l2WorldLabels(ox, oy) {
  for (const k in JAY_SPOTS) { const s = JAY_SPOTS[k]; if (dist(s.x, s.y, P.x, P.y) < 110) txt('Ranger Jay', s.x + ox, s.y + oy - 34, 7, '#9ccf6a', 'center', true); }
  const near = (x, y, label, col = '#fff') => { if (dist(x, y, P.x, P.y) < 160) txt(label, x + ox, y + oy, 6.5, col, 'center', true); };
  near(BMAP.bar.doorX, BMAP.bar.y * 16 + 13, 'THE TIPSY SEQUOIA', '#ff9ad0');
  near(BMAP.bk.doorX, BMAP.bk.y * 16 - 22, 'BURGER KING', '#ffe08a');
  near(BMAP.hilton.doorX, BMAP.hilton.y * 16 + BMAP.hilton.h * 16 - 32, 'HILTON SAN FRANCISCO', '#ffffff');
  near(BMAP.donut.doorX, BMAP.donut.y * 16 + 6, 'DONUTS', '#ffffff');
}

// ---------------------------------------------------------------- postcards & weird laws
const POSTCARDS = [
  { id: 'breakfast', title: 'Eggs Benedict', sub: 'Hilton San Francisco (sort of)', where: 'in San Francisco', fact: 'Toasted English muffin, ham, a poached egg and hollandaise. Sarah\'s version: architecturally sound. The hotel\'s: structurally questionable.' },
  { id: 'google', title: 'The Office Slide', sub: 'Google office', where: 'in San Francisco', fact: 'Tech offices love slides between floors. Finally, a building that truly understands Sarah.' },
  { id: 'murrelet', title: 'Marbled Murrelet', sub: 'Redwood Forest', where: 'in the Redwood Forest', fact: 'This little seabird nests high up in old-growth redwoods. Steller\'s jays raid its nests, so keep your campsite crumb clean!' },
  { id: 'surf', title: 'Surf\'s Up', sub: 'Big Sur coast', where: 'in Big Sur', fact: 'Cold Pacific water, kelp forests, and elephant seals who do NOT share their waves.' },
  { id: 'shrimp', title: 'Shrimp in a Sequoia', sub: 'Sequoia National Park', where: 'in Sequoia National Park', fact: 'Giant sequoias are the largest trees on Earth by volume. Why a shrimp in sunglasses lives at the top is a question for science.' },
  { id: 'fire', title: 'Big Sur Wildfire', sub: 'Highway 1 evacuation', where: 'south of Big Sur', fact: 'Wildfires are part of California life. Follow the rangers, keep the tank full, and never stop for selfies.' },
  { id: 'shasta', title: 'Mount Shasta', sub: '14,179 ft volcano', where: 'on Mount Shasta', fact: 'A lonely giant volcano you can see from 100 miles away. Climbers start at 2 AM, camp at Helen Lake, dodge rocks on the Red Banks and curse Misery Hill. Bring an ice axe. Hold on to it.' },
];
const LAWS = [
  { id: 'bar', title: 'No sleeping in bars', text: 'California weird law: it\'s illegal to sleep in a bar.', fine: 25, lines: [['Bartender', 'What can I get you?'], ['Sarah', 'Honestly? Just a little nap. Jetlag...'], ['Sarah', '*zzz*'], ['Officer', 'Ma\'am! WAKE UP. Sleeping in a bar is against the law!']] },
  { id: 'pigeons', title: 'Don\'t feed the pigeons', text: 'San Francisco: feeding pigeons on the street is prohibited.', fine: 10, lines: [['Sarah', 'Here you go, little guys! 🍩'], ['Officer', 'Ma\'am, feeding pigeons is illegal in San Francisco.'], ['Sarah', '...even the cute one?'], ['Officer', 'ESPECIALLY the cute one.']] },
  { id: 'heels', title: 'High heel permit', text: 'Carmel-by-the-Sea: heels over 2 inches require a (free) permit.', fine: 0, lines: [['Officer', 'Ma\'am! Are those heels over two inches?'], ['Sarah', 'These are hiking boots.'], ['Officer', '...They have a heel. Here\'s your free high-heel permit. Welcome to Carmel!']] },
  { id: 'butterflies', title: 'Leave the monarchs alone', text: 'Pacific Grove: harassing monarch butterflies can cost $1,000.', fine: 0, lines: [['Officer', 'MA\'AM. Did you just rope skip at the monarch butterflies?!'], ['Sarah', 'I was skipping NEAR them. Respectfully.'], ['Officer', 'That\'s up to a $1,000 fine in Pacific Grove!'], ['Officer', '...first offence. Warning. Please skip elsewhere.']] },
  { id: 'frogs', title: 'Contest frogs are not food', text: 'California: a frog that dies in a frog-jumping contest may not be eaten.', fine: 0, lines: [['Frog guy', 'Welcome to the frog-jumping contest! This is Kermit Jr., retired champion.'], ['Sarah', 'He looks... very relaxed. Can I eat him? Asking for a Frenchman.'], ['Frog guy', 'MA\'AM. It is literally illegal to eat a contest frog!']] },
  { id: 'wildlife', title: 'Don\'t feed the wildlife', text: 'National parks: feeding wildlife is illegal. Yes, even cute squirrels.', jay: true, lines: [['Sarah', 'Who wants a donut? 🍩🐿️'], ['Ranger Jay', '*appears from behind a sequoia* Ma\'am, feeding wildlife is against park rules.']] },
  { id: 'campfire', title: 'Campfire permit', text: 'You need a campfire permit to light a fire outside official campgrounds.', jay: true, lines: [['Sarah', 'Free camping AND a cozy campfire. 🔥'], ['Ranger Jay', 'Evening! Free camping\'s fine here... but no campfire without a permit. It\'s fire season.']] },
  { id: 'container', title: 'No wine on the beach', text: 'Many California beaches ban open alcohol containers.', jay: true, lines: [['Sarah', 'Sunset, the Pacific and a nice red. Perfect. 🍷'], ['Ranger Jay', 'Ma\'am! No open containers on this beach.']] },
];
function breakLaw(id) {
  const L = LAWS.find(l => l.id === id);
  if (!L || L2().laws[id]) return;
  L2().laws[id] = 1; sfx.alarm(); exitCar();
  const lines = L.lines.slice();
  if (L.jay) lines.push(['Ranger Jay', 'I\'ll let it slide this time. Leave no trace! 😉']);
  else if (L.fine > 0) {
    lines.push(['Officer', t('That\'s a ${0} fine, ma\'am.', L.fine)]);
    if (L2().money >= L.fine) lines.push(['Sarah', '*pays* ...worth it.', () => addMoney(-L.fine)]);
    else lines.push(['Sarah', 'I only have Swiss chocolate.'], ['Officer', '...deal. 🍫']);
  }
  say(lines, () => { toast(t('⚖️ Weird law {0}/8: {1}', lawCount(), t(L.title))); saveGame(); if (lawCount() === LAWS.length) setTimeout(() => crText('ALL 8 weird laws?! You\'re a legend. A slightly criminal legend. ⚖️'), 1200); });
}
function givePostcard(id) {
  if (L2().postcards[id]) return;
  const p = POSTCARDS.find(q => q.id === id);
  L2().postcards[id] = 1; sfx.ding(); spawnHearts(P.x, P.y - 18, 6);
  say([['Postcard', t('New postcard: "{0}"! 📮', t(p.title))], ['Postcard', p.fact]], () => {
    const n = postcardCount(); l2UpdateGates(); saveGame();
    if (id !== 'shasta') setTimeout(() => crText(n >= 6 ? '6 postcards! Ranger Jay can open the Mt Shasta trail for you now. 🏔' : t('{0}/7 postcards! California is yours. 📮', n)), 1300);
  });
}

// ---------------------------------------------------------------- C-Real, Ranger Jay & friends
function l2Talk(spot) {
  L2().cp = spot;
  const lines = [];
  if (spot === 'busk' && !L2().flags.keys) {
    lines.push(['C-Real', 'Sarah! Welcome to California! 🇺🇸 How was the Hilton breakfast?'], ['Sarah', 'The eggs benedict were... a structural failure.'],
      ['C-Real', 'Then let\'s make this trip better. Here are the keys to our black Chev! 🚙', () => { L2().flags.keys = 1; sfx.ding(); toast('🔑 Got: Chev keys'); }],
      ['C-Real', 'Walk up to the Chev and press B to drive. It flies on asphalt.'],
      ['C-Real', 'The plan: collect 7 California postcards. And try not to break too many weird American laws.'], ['Sarah', 'Weird laws?'],
      ['C-Real', 'This country has a law for EVERYTHING. Check your book (TAB).'],
      ['C-Real', 'I\'m busking here with my looper. Jam with me any time to earn some dollars! 🎸'],
      ['C-Real', 'And Ranger Jay at the station east of the city sells park permits. Nicest man in America.']);
  } else if (!L2().met[spot]) {
    if (spot === 'forest2') lines.push(['C-Real', 'The redwoods! The tallest trees on the planet. I feel tiny.'], ['C-Real', 'Watch out for banana slugs. And the jays: they raid the murrelet nest up in the giant redwood.']);
    if (spot === 'shasta') lines.push(['C-Real', 'Mt Shasta! I brought my skis. Nobody told me it\'s summer.'], ['C-Real', 'Ranger Jay at the trailhead checks summit passes. Rules are rules.']);
    if (spot === 'camp2') lines.push(['C-Real', 'Big Sur! I set up camp. Wine? I just... forgot the corkscrew. 🍷'], ['C-Real', 'The official campground is right here. $20 a night, real toilets!']);
    if (spot === 'busk') lines.push(['C-Real', l2Hint()]);
  } else lines.push(['C-Real', l2Hint()]);
  if (spot === 'shasta' && L2().permits.summit && !gear().pack) lines.push(['C-Real', 'Climbing Shasta? I packed you a backpack: water, sunscreen and three donuts. 🎒', () => { gear().pack = 1; sfx.ding(); toast('🎒 Got: Backpack'); }], ['C-Real', 'Press B on the mountain to eat a snack when you\'re out of breath.']);
  if (ST.hearts < ST.maxHearts && L2().donuts > 0) lines.push(['C-Real', 'You look tired. Donut break? 🍩', () => { L2().donuts--; ST.hearts = ST.maxHearts; sfx.ding(); spawnHearts(P.x, P.y - 16, 5); }]);
  lines.push(['C-Real', 'I\'ll keep this spot as your checkpoint. ❤']);
  L2().met[spot] = 1;
  say(lines, saveGame);
}
function l2Hint() {
  const pc = L2().postcards, pm = L2().permits;
  if (!pc.breakfast) return 'Let\'s show the Hilton kitchen how eggs benedict are REALLY stacked. 🍳';
  if (!pc.google) return 'The Google office has a SLIDE inside. You know what to do. 👀 If they catch you, just small talk!';
  if (L2().money < L2_MONEY.park && !pm.park) return 'We need cash for park permits. Jam with me at Union Square: looper time! 🎸';
  if (!pc.murrelet) return 'Up north in the redwoods, a marbled murrelet needs a bodyguard. Climb the giant redwood!';
  if (!pc.surf) return 'Big Sur has waves! The surf shack lends boards. Watch out for elephant seals.';
  if (!pm.park) return 'Ranger Jay sells the Sequoia park permit ($35). His station is east of the city.';
  if (!pc.shrimp) return 'There is... a shrimp. At the top of General Sherman. In Sequoia. Don\'t ask. Go!';
  if (!pc.fire) return 'Drive south on Highway 1 to the elephant seal beach. Careful, it\'s fire season. 🔥';
  if (!pm.summit) return 'Last stop: Mt Shasta! Buy a summit pass from Ranger Jay ($25).';
  if (gearCount() < GEAR.length) return t('Gear up for Shasta: {0}. Mountain Shop next to the trailhead, backpack from me, headlamp from Jay.', gearList());
  return 'Everything\'s ready. Meet me on top of Mt Shasta! 🏔';
}
const JAY_TIPS = ['Never feed the squirrels. They unionized.', 'Bears can smell a donut box from two miles away. So can I.', 'Leave no trace. Except good memories.',
  'The marbled murrelet flies up to 50 miles inland to nest. Respect.', 'Banana slugs are hermaphrodites. Fun fact for your next dinner party.'];
function buyPermit(kind, cost, lines) {
  if (L2().money >= cost) {
    lines.push(['Sarah', kind === 'park' ? 'One park permit, please!' : 'One summit pass, please!', () => { addMoney(-cost); L2().permits[kind] = 1; sfx.ding(); toast(kind === 'park' ? '🎫 Got: Sequoia park permit' : '🏔 Got: Mt Shasta summit pass'); l2UpdateGates(); }],
      ['Ranger Jay', kind === 'park' ? 'Here you go! The Sequoia gate is open for you. Say hi to General Sherman.' : 'Summit pass! Bring layers. And maybe a friend with a guitar.']);
  } else lines.push(['Ranger Jay', t('That\'s ${0}. You\'ve got ${1}.', cost, L2().money)], ['Ranger Jay', 'I hear the buskers at Union Square make good money.']);
}
function jayTalk(k) {
  const lines = [];
  if (!L2().flags.jay) {
    L2().flags.jay = 1;
    lines.push(['Ranger Jay', 'Howdy! I\'m Ranger Jay. Welcome to the wild side of California. 🌲'],
      ['Ranger Jay', 'Sequoia park permit: $35. Mt Shasta summit pass: $25. Cash only, the card reader got eaten by a squirrel.']);
  }
  if (k === 'fire') lines.push(['Ranger Jay', L2().flags.fireDone ? 'Glad you made it out. Big Sur will grow back. It always does.' : 'Fire season\'s no joke. If you head south on Highway 1, keep your tank full.']);
  else if (k === 'station' && !L2().permits.park) buyPermit('park', L2_MONEY.park, lines);
  else if (!L2().permits.summit) buyPermit('summit', L2_MONEY.summit, lines);
  else if (k === 'trailhead') { trailheadCheck(lines); return; }
  else lines.push(['Ranger Jay', JAY_TIPS[(rnd() * JAY_TIPS.length) | 0]]);
  say(lines, saveGame);
}
// ---------------------------------------------------------------- Mt Shasta gear
const GEAR = [
  { id: 'helmet', icon: '⛑️', name: 'Helmet', cost: 20 }, { id: 'crampons', icon: '🥾', name: 'Crampons', cost: 30 }, { id: 'axe', icon: '⛏️', name: 'Ice axe', cost: 25 },
  { id: 'pack', icon: '🎒', name: 'Backpack' }, { id: 'lamp', icon: '🔦', name: 'Headlamp' },
];
const gear = () => (L2().gear = L2().gear || {});
const gearCount = () => GEAR.filter(q => gear()[q.id]).length;
const gearList = () => GEAR.map(q => (gear()[q.id] ? '✓ ' : '✗ ') + t(q.name)).join('  ·  ');
function trailheadCheck(lines) {
  if (L2().flags.finished) lines.push(['Ranger Jay', 'Back for more? Avalanche Gulch is waiting. Same rules: helmet on, axe ready.']);
  if (!gear().lamp) lines.push(['Ranger Jay', 'Climbers start at 2 AM, when the snow is still frozen. Here, take my spare headlamp. 🔦', () => { gear().lamp = 1; sfx.ding(); toast('🔦 Got: Headlamp'); }]);
  if (postcardCount() < 6) { lines.push(['Ranger Jay', t('The summit trail opens once you\'ve seen the rest of California. Postcards: {0}/6.', postcardCount())]); say(lines, saveGame); return; }
  const missing = GEAR.filter(q => !gear()[q.id] && q.id !== 'lamp');
  if (missing.length) {
    lines.push(['Ranger Jay', 'Hold on. Nobody goes up Avalanche Gulch without the right gear.'], ['Ranger Jay', gearList()]);
    if (missing.some(q => q.cost)) lines.push(['Ranger Jay', 'The Mountain Shop next door has helmets, crampons and ice axes.']);
    if (!gear().pack) lines.push(['Ranger Jay', 'And a backpack with snacks. Your friend with the skis looked prepared.']);
    say(lines, saveGame); return;
  }
  lines.push(['Ranger Jay', 'Helmet, crampons, ice axe, pack, headlamp. You\'re ready.'], ['Ranger Jay', 'If you slip, roll onto the axe and dig it in. Mash [A]! Don\'t let go of it.'],
    ['Ranger Jay', 'Avalanche Gulch, Red Banks, Misery Hill, summit. Good luck! 🏔']);
  say(lines, startShasta);
}
function gearShop() {
  const next = GEAR.find(q => q.cost && !gear()[q.id]);
  if (!next) { say([['Shop clerk', 'You\'ve got everything we sell! Go climb that mountain. 🏔']]); return; }
  if (L2().money < next.cost) { say([['Shop clerk', t('{0} for {1}. You have ${2}.', t(next.name), '$' + next.cost, L2().money)], ['Sarah', 'Back to busking, then. 🎸']]); return; }
  say([['Shop clerk', t('One {0}, coming up! That\'s ${1}.', t(next.name), next.cost), () => { addMoney(-next.cost); gear()[next.id] = 1; sfx.ding(); toast(t('{0} Got: {1}', next.icon, t(next.name))); }],
    ['Shop clerk', { helmet: 'Helmets: because the Red Banks throw rocks.', crampons: 'Our crampons have climbed Shasta 400 times. Without anyone in them.', axe: 'Pointy end down. Always. And don\'t let go of it.' }[next.id]]], saveGame);
}
function l2BuildingAct(b) {
  if (b.id !== 'bk') exitCar();
  const pc = L2().postcards;
  switch (b.id) {
    case 'hilton':
      if (pc.breakfast) say([['Sarah', 'The Hilton breakfast buffet. Never again. (Unless I\'m cooking.)']], startStack);
      else say([['Sarah', 'The Hilton breakfast: soggy muffins, cold hollandaise... a crime against eggs.'], ['Sarah', '*sneaks into the hotel kitchen* Let me show them how it\'s done. 🍳']], startStack);
      break;
    case 'google':
      if (pc.google) say([['Sarah', 'Still thinking about that slide. Best office in the world.']]);
      else say([['Sarah', 'The Google office. Rumor says there\'s a SLIDE inside.'], ['Sarah', 'Badge readers... tailgating... I\'ve got this.']], () => enterInterior('google', b.doorX, b.doorY + 8));
      break;
    case 'bar':
      if (!L2().laws.bar) breakLaw('bar');
      else say([['Bartender', 'Coffee? You look like you need it. Napping is still illegal, though.']]);
      break;
    case 'donut':
      if (L2().money >= L2_MONEY.donuts) say([['Sarah', 'One box of donuts, please! 🍩', () => { addMoney(-L2_MONEY.donuts); L2().donuts += 6; sfx.pick(); toast('🍩 +6 donuts'); }], ['Sarah', 'Six donuts. For emergencies. And squirrels. (No, not squirrels.)']], saveGame);
      else say([['Sarah', t('A box is ${0}. I have ${1}.', L2_MONEY.donuts, L2().money)]]);
      break;
    case 'bk':
      if (P.bike) driveThru();
      else say([['Drive-thru', 'Sorry ma\'am, this window is for cars only. And... deer, apparently.']]);
      break;
    case 'surf':
      say(pc.surf ? [['Sarah', 'One more ride? The seals are giving me looks...']] : [['Sarah', 'Surf shack! "Boards for architects: free." ...is that real?'], ['Sarah', 'Let\'s ride! 🏄‍♀️']], startSurf);
      break;
    case 'camp':
      if (L2().flags.campPaid || L2().money >= L2_MONEY.campsite) say([['Sarah', 'Campsite for tonight, please.', () => { if (!L2().flags.campPaid) { addMoney(-L2_MONEY.campsite); L2().flags.campPaid = 1; } }], ['Sarah', 'Now the wine... C-Real forgot the corkscrew. Shoe method it is. 👟🍷']], () => startWine());
      else say([['Sarah', t('A campsite is ${0} a night. I have ${1}.', L2_MONEY.campsite, L2().money)]]);
      break;
    case 'bigred':
      say([['Sarah', 'The giant redwood. A marbled murrelet nests up there, and the jays are circling...'], ['Sarah', 'Time to be a bodyguard. 🐦']], startJayGame);
      break;
    case 'sherman':
      say([['Sarah', 'General Sherman: the biggest tree on Earth. And at the very top... is that a SHRIMP? 🦐'], ['Sarah', 'I have to know.']], startClimb);
      break;
    case 'gear': gearShop(); break;
  }
}
function driveThru() {
  if (L2().flags.deerDone) { say([['Drive-thru', 'Welcome back! Fries are on the house. 🍟', () => { ST.hearts = ST.maxHearts; sfx.pick(); }]]); return; }
  say([['Drive-thru', 'Welcome to Burger King, can I take your order?'], ['Sarah', 'Um... there are three deer in front of me.'],
    ['Drive-thru', 'Yeah, they come every day. They never order. They just... vibe.'], ['Deer', '*chews thoughtfully*'],
    ['Sarah', '*honks politely* 📯', () => { tone(330, .3, 'square', .12); tone(415, .3, 'square', .1, 0, .05); }],
    ['Deer', '*leaves, deeply offended*', () => { L2().flags.deerDone = 1; for (const d of deer) if (d.queue) { d.queue = false; d.hx = d.x + 70; d.hy = d.y; d.vx = 40; d.t = 2; } }],
    ['Drive-thru', 'Thanks for your patience! Free fries for you. 🍟', () => { ST.hearts = ST.maxHearts; sfx.ding(); }]], saveGame);
}
function frogStand() { if (!L2().laws.frogs) breakLaw('frogs'); else say([['Frog guy', 'Kermit Jr. is napping. Please respect his retirement.']]); }
function l2Interactables(L) {
  const c = L2().car;
  if (!P.bike && L2().flags.keys) L.push({ x: c.x, y: c.y - 8, label: 'Drive', act: enterCar, r: 28 });
  const bs = CR_SPOTS.busk; L.push({ x: bs.x + 24, y: bs.y - 4, label: 'Jam! 🎸', act: startBuskIntro, r: 20 });
  for (const k in JAY_SPOTS) L.push({ x: JAY_SPOTS[k].x, y: JAY_SPOTS[k].y - 6, label: 'Talk', act: () => jayTalk(k) });
  L.push({ x: PIGEON_SPOT.x, y: PIGEON_SPOT.y, r: 34, label: 'Feed pigeons', act: () => L2().laws.pigeons ? say([['Sarah', 'They\'re judging me. I can feel it.']]) : breakLaw('pigeons') });
  if (L2().donuts > 0) for (const s of squirrels) L.push({ x: s.x, y: s.y - 4, label: 'Feed', act: () => L2().laws.wildlife ? say([['Sarah', 'No. Ranger Jay is watching. I can feel it.']]) : breakLaw('wildlife') });
  for (const w of walkers) if (!w.talked) L.push({ x: w.x, y: w.y - 6, label: 'Small talk', act: () => startSmallTalk(null, w) });
  L.push({ x: UNOFFICIAL_CAMP.x, y: UNOFFICIAL_CAMP.y - 6, label: 'Campfire', act: () => L2().laws.campfire ? say([['Sarah', 'Free camping, no fire. Ranger Jay would be proud.']]) : breakLaw('campfire') });
  L.push({ x: BEACH_TABLE.x, y: BEACH_TABLE.y - 6, label: 'Open wine', act: () => L2().laws.container ? say([['Sarah', 'Sunset, the Pacific and... sparkling water. Legal and sad.']]) : breakLaw('container') });
  if (P.bike) L.push({ x: DRIVE_THRU.x, y: DRIVE_THRU.y, r: 30, label: 'Order', act: driveThru });
  L.push({ x: SUMMIT.x, y: SUMMIT.y - 6, r: 30, label: 'Summit!', act: summitAct });
}
function summitAct() { exitCar(); say([['Sarah', 'The summit of Mount Shasta again. Still worth every step.']]); }
function givePostcardSilent(id) { L2().postcards[id] = 1; saveGame(); }

// ---------------------------------------------------------------- Big Sur wildfire (world event)
function isBurning(tx, ty) {
  if (!FIRE.active) return false;
  const i = ty * W + tx, m = map[i];
  if (m === T.WATER || m === T.BLD || m === T.SAND) return false;
  return FIRE.burning.has(i) || (ty >= FIRE.front + 2 && tx < 56 && (hash(tx, ty) & 7) < 4);
}
function startFire() {
  FIRE.active = true; FIRE.front = 79; FIRE.t = 0; FIRE.spotT = 0; FIRE.burning.clear(); sfx.alarm();
  say([['Sarah', 'Is that... smoke?'], ['Ranger Jay', '📻 EVACUATION ORDER for Big Sur! Wildfire moving north fast. Head north on Highway 1 to my checkpoint!'], ['Sarah', 'GO GO GO! 🔥']]);
}
function updateFire(dt) {
  if (!FIRE.active) { if (!L2().postcards.fire && zoneOf(Math.floor(P.x / 16), Math.floor(P.y / 16)) === 'bigsur' && P.y > 71 * 16) startFire(); return; }
  FIRE.t += dt; FIRE.front = Math.max(62.5, 79 - FIRE.t * 1.25);
  FIRE.spotT -= dt;
  if (FIRE.spotT <= 0) {   // spot fires jump ahead of the front
    FIRE.spotT = .45;
    const tx = 6 + ((rnd() * 36) | 0), ty = Math.max(63, Math.floor(FIRE.front - 1 - rnd() * 6));
    for (let y = ty; y < ty + 2; y++) for (let x = tx; x < tx + 2; x++) FIRE.burning.add(y * W + x);
  }
  const ptx = Math.floor(P.x / 16), pty = Math.floor((P.y - 2) / 16);
  if (isBurning(ptx, pty) && P.inv <= 0) { popText(P.x, P.y - 30, 'HOT HOT HOT! 🔥', '#ff8a3a'); hurt({ x: P.x, y: P.y + 20 }); }
  if (dist(P.x, P.y, JAY_SPOTS.fire.x, JAY_SPOTS.fire.y) < 50) {
    FIRE.active = false; L2().flags.fireDone = 1; burnBigSur(); exitCar();
    say([['Ranger Jay', 'You made it! Good job, ma\'am. Everybody\'s out safe.'], ['Sarah', '*coughs* ...the Chev smells like a barbecue now.'], ['Ranger Jay', 'Every evacuee gets one of these. 📮']], () => givePostcard('fire'));
  }
}
function l2Respawn() {
  const s = CR_SPOTS[L2().cp] || CR_SPOTS.busk; P.x = s.x; P.y = s.y + 18;
  FIRE.active = false; FIRE.burning.clear();
  say([['C-Real', 'Whoa, easy! Sit down, I\'ll get you some gas station coffee. ☕'], ['Sarah', 'California is intense.']]);
}

// ---------------------------------------------------------------- HUD & book
function l2Hud() {
  const pm = L2().permits;
  let s = `💵 $${L2().money}   📮 ${postcardCount()}/7   ⚖️ ${lawCount()}/8   🍩 ${L2().donuts}`;
  if (pm.park) s += '  🎫'; if (pm.summit) s += `  🏔 🧗${gearCount()}/${GEAR.length}`;
  if (L2().flags.keys) s += P.bike ? '  🚙!' : '  🚙';
  return s;
}
function l2BookInput() {
  if (inp.up || inp.down) { book.tab = book.tab ? 0 : 1; sfx.blip(); }
  if (!book.tab) {
    if (inp.left) { book.sel = (book.sel + POSTCARDS.length - 1) % POSTCARDS.length; sfx.blip(); }
    if (inp.right) { book.sel = (book.sel + 1) % POSTCARDS.length; sfx.blip(); }
  }
}
function l2DrawBook() {
  ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, 0, VW, VH);
  const bx = 34, by = 14, bw = VW - 68, bh = VH - 28;
  rrect(bx - 4, by - 4, bw + 8, bh + 8, 8, '#2a4a6a'); rrect(bx, by, bw, bh, 5, '#fbf5e4');
  [['📮 ' + t('Postcards'), 0], ['⚖️ ' + t('Weird laws'), 1]].forEach(([s, i]) => { rrect(bx + 8 + i * 90, by - 12, 84, 13, 4, (book.tab || 0) === i ? '#ff6fa8' : '#d8ccb0'); txt(s, bx + 50 + i * 90, by - 10, 7.5, '#fff', 'center', true, false); });
  if (!book.tab) {
    const p = POSTCARDS[book.sel], have = !!L2().postcards[p.id];
    txt(t('California Postcards — {0}/{1}', book.sel + 1, POSTCARDS.length), bx + 10, by + 6, 7, '#5a6a8a', 'left', true, false);
    rrect(bx + 12, by + 22, bw / 2 - 24, bh - 54, 3, '#ffffff', '#c8d4e0');
    if (have) drawPostcard(p.id, bx + 14, by + 24, bw / 2 - 28, bh - 58); else txt('?', bx + bw / 4, by + 60, 30, '#d8ccb0', 'center', true, false);
    const rx = bx + bw / 2 + 10, rw = bw / 2 - 22;
    txt(t(have ? p.title : '??? (no postcard yet)'), rx, by + 22, 10, '#2a3a5a', 'left', true, false);
    txt(have ? t(p.sub) : t('Somewhere {0}...', t(p.where)), rx, by + 36, 7, '#5a6a8a', 'left', false, false);
    if (have) wrap(t(p.fact), rw, 7.5).forEach((ln, i) => txt(ln, rx, by + 50 + i * 10, 7.5, '#3a3a3a', 'left', false, false));
    for (let i = 0; i < POSTCARDS.length; i++) { ctx.fillStyle = i === book.sel ? '#ff6fa8' : L2().postcards[POSTCARDS[i].id] ? '#7ec850' : '#d8ccb0'; ctx.beginPath(); ctx.arc(VW / 2 - (POSTCARDS.length - 1) * 6 + i * 12, by + bh - 12, 3.2, 0, 7); ctx.fill(); }
    txt(t('◀ ▶ flip · ▲ ▼ weird laws · [A]: close'), VW / 2, by + bh - 26, 7, '#5a6a8a', 'center', false, false);
  } else {
    txt(t('California\'s weirdest laws (mostly real!) — {0}/8', lawCount()), bx + 10, by + 6, 7, '#8a3a3a', 'left', true, false);
    LAWS.forEach((l, i) => {
      const have = !!L2().laws[l.id], y = by + 20 + i * 17;
      txt((have ? '⚖️ ' : '❔ ') + (have ? t(l.title) : '???'), bx + 12, y, 7.5, have ? '#3a2a1a' : '#a89a80', 'left', true, false);
      if (have) txt(t(l.text), bx + 24, y + 8, 6.3, '#5a5a5a', 'left', false, false);
    });
    txt(t('▲ ▼ postcards · [A]: close'), VW / 2, by + bh - 10, 7, '#8a3a3a', 'center', false, false);
  }
}
// colourful postcard illustrations (UI context)
function drawPostcard(id, x, y, w, h) {
  const c = ctx, cx = x + w / 2;
  const rect = (a, b, cw, ch, col) => { c.fillStyle = col; c.fillRect(a, b, cw, ch); };
  const circle = (a, b, r, col) => { c.fillStyle = col; c.beginPath(); c.arc(a, b, r, 0, 7); c.fill(); };
  const sky = (top, bot) => { const gr = c.createLinearGradient(0, y, 0, y + h); gr.addColorStop(0, top); gr.addColorStop(1, bot); c.fillStyle = gr; c.fillRect(x, y, w, h); };
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  if (id === 'breakfast') {
    sky('#fde8c8', '#f8d0a0'); circle(cx, y + h * .62, w * .36, '#ffffff'); circle(cx, y + h * .62, w * .3, '#f4f0e8');
    rect(cx - 22, y + h * .55, 44, 8, '#d9a35e'); rect(cx - 20, y + h * .5, 40, 5, '#e8828a'); rect(cx - 18, y + h * .42, 36, 8, '#f8f4ea'); circle(cx, y + h * .43, 6, '#f2b632');
    c.fillStyle = '#f5d36a'; c.beginPath(); c.ellipse(cx, y + h * .4, 20, 4, 0, 0, 7); c.fill(); rect(cx - 12, y + h * .4, 3, 8, '#f5d36a'); rect(cx + 8, y + h * .4, 3, 6, '#f5d36a');
  } else if (id === 'google') {
    sky('#e8f0ff', '#c8dcff'); ['#4285f4', '#ea4335', '#fbbc05', '#34a853'].forEach((col, i) => rect(x, y + i * 4, w, 4, col));
    c.strokeStyle = '#ea4335'; c.lineWidth = 8; c.lineCap = 'round'; c.beginPath(); c.moveTo(x + 16, y + 26); c.bezierCurveTo(x + w, y + 30, x, y + h - 10, x + w - 16, y + h - 14); c.stroke();
    c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 2; c.stroke();
  } else if (id === 'murrelet') {
    sky('#9cc8a8', '#2a4a2a'); rect(cx - 12, y, 24, h, '#7a3a22'); rect(x, y + h * .6, w, 4, '#5a2a18');
    c.fillStyle = '#8a7a6a'; c.beginPath(); c.ellipse(cx + 20, y + h * .55, 10, 6, 0, 0, 7); c.fill(); rect(cx + 26, y + h * .52, 5, 3, '#f4f0e8');
    c.fillStyle = '#2a5ab8'; c.beginPath(); c.ellipse(x + 20, y + 22, 8, 5, 0, 0, 7); c.fill(); rect(x + 24, y + 14, 4, 6, '#1a1a2a');
    c.fillStyle = '#d9302a'; c.font = font(14, true); c.fillText('✗', x + 34, y + 16);
  } else if (id === 'surf') {
    sky('#ffcf9a', '#ff8a6a'); circle(x + w - 22, y + 24, 12, '#fff3b0'); rect(x, y + h * .55, w, h, '#2f7fbf');
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(x, y + h * .55); c.quadraticCurveTo(cx, y + h * .2, x + w, y + h * .55); c.fill(); c.fillStyle = '#4fa8df'; c.beginPath(); c.moveTo(x, y + h * .6); c.quadraticCurveTo(cx, y + h * .28, x + w, y + h * .6); c.fill();
    c.fillStyle = '#ff6fa8'; c.beginPath(); c.ellipse(cx - 6, y + h * .5, 16, 3, -.3, 0, 7); c.fill(); rect(cx - 8, y + h * .3, 4, 12, '#1d1d22'); circle(cx - 6, y + h * .27, 3, '#6b4226');
  } else if (id === 'shrimp') {
    sky('#bfe0ff', '#7fbf7f'); rect(cx - 16, y + 20, 32, h, '#a0522d'); rect(cx - 12, y + 20, 6, h, '#c0683a'); circle(cx, y + 20, 30, '#2e5a2a');
    c.save(); c.translate(cx, y + 18); c.scale(2.2, 2.2); withCtx(c, () => drawShrimp(0, 0, 1)); c.restore();
  } else if (id === 'fire') {
    sky('#ff9a3a', '#5a2a1a'); for (let i = 0; i < 6; i++) { c.fillStyle = 'rgba(80,60,60,.5)'; c.beginPath(); c.arc(x + 10 + i * 18, y + 18 + (i % 2) * 8, 14, 0, 7); c.fill(); }
    c.fillStyle = '#2a1a12'; c.beginPath(); c.moveTo(x, y + h); c.lineTo(x + w * .3, y + h * .55); c.lineTo(x + w * .6, y + h * .75); c.lineTo(x + w, y + h * .5); c.lineTo(x + w, y + h); c.fill();
    rect(x, y + h - 10, w, 4, '#4a4a4f'); c.save(); c.translate(x + w * .7, y + h - 9); c.scale(1.4, 1.4); withCtx(c, () => drawChev(0, 0, 'right')); c.restore();
  } else if (id === 'shasta') {
    sky('#ff9ac0', '#ffd8a0'); circle(x + 24, y + h * .5, 14, '#fff3b0');
    c.fillStyle = '#6a7a9a'; c.beginPath(); c.moveTo(x, y + h); c.lineTo(cx, y + 18); c.lineTo(x + w, y + h); c.fill();
    c.fillStyle = '#ffffff'; c.beginPath(); c.moveTo(cx - 16, y + 34); c.lineTo(cx, y + 18); c.lineTo(cx + 16, y + 34); c.lineTo(cx + 6, y + 30); c.lineTo(cx, y + 36); c.lineTo(cx - 6, y + 30); c.fill();
  }
  c.restore();
  c.strokeStyle = '#c8d4e0'; c.lineWidth = 1; c.strokeRect(x, y, w, h);
}

// ---------------------------------------------------------------- flight Luzern -> San Francisco
let FL = null;
function startFlight() { saveGame(); transition(() => { scene = 'flight'; FL = { t: 0 }; musI = 0; }); }
SCENES.flight = {
  music: 'ending',
  update(dt) { FL.t += dt; if (FL.t > 5.5 || (FL.t > 1 && inp.a)) { FL.t = -99; transition(() => { EN = null; SL = null; enterLevel(2); }); } },
  draw() {
    const gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, '#ff9ac0'); gr.addColorStop(.6, '#ffd8a0'); gr.addColorStop(.6, '#2f6fb3'); gr.addColorStop(1, '#1a4a8a'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    circ(300, 120, 22, '#fff3b0');
    for (let i = 0; i < 8; i++) { const cx2 = ((i * 70 - FL.t * 40 * (1 + i % 3)) % (VW + 80) + VW + 80) % (VW + 80) - 40; ell(cx2, 30 + i * 9, 24, 6, 'rgba(255,255,255,.7)'); }
    for (let i = 0; i < 20; i++) R(((i * 41 - FL.t * 80) % VW + VW) % VW, 140 + i * 4, 10, 1, 'rgba(255,255,255,.35)');
    const px = -40 + Math.min(1, FL.t / 5) * (VW + 80), py = 80 - Math.sin(FL.t) * 6;
    R(px - 20, py - 3, 40, 7, '#ffffff'); R(px + 14, py - 2, 8, 5, '#e8eef4'); poly([[px - 4, py], [px - 14, py + 16], [px - 6, py + 16], [px + 6, py]], '#d8e0e8');
    poly([[px - 18, py - 3], [px - 22, py - 12], [px - 16, py - 12], [px - 12, py - 3]], '#d52b1e'); R(px - 18, py - 10, 3, 1, '#fff'); R(px - 17, py - 11, 1, 3, '#fff');
    for (let i = 0; i < 6; i++) R(px - 10 + i * 4, py - 1, 2, 2, '#4a6a8a');
  },
  ui() { txt(t('Luzern ✈ San Francisco'), VW / 2, 176, 14, '#ffffff', 'center', true); txt(t('Level 2: California'), VW / 2, 196, 9, '#ffe08a', 'center', true); },
};
function l2OnEnter(first) {
  if (!first) return;
  setTimeout(() => say([['Sarah', '*yawns* San Francisco... jetlag hits different.'], ['Sarah', 'And that Hilton breakfast... those eggs benedict were a crime. 🍳'], ['Sarah', 'C-Real said he\'d be busking at Union Square. Let\'s follow the music!']]), 800);
  setTimeout(() => crText('Welcome to California! 🇺🇸 I\'m at Union Square, just follow the music. 🎸'), 3000);
}
MUSIC.cali = { step: .2, n: [69, 0, 72, 74, 76, 0, 74, 72, 69, 0, 67, 69, 72, 0, 0, 0, 69, 0, 72, 74, 76, 79, 76, 74, 72, 0, 74, 72, 69, 0, 0, 0], bass: [45, 43, 41, 43], type: 'triangle', v: .035 };

// ---------------------------------------------------------------- Level 2 definition
const LEVEL2 = {
  W: L2_W, H: L2_H, seed: 777, buildings: L2_BUILDINGS, paths: L2_PATHS, crSpots: L2_CR_SPOTS, start: L2_START, signs: L2_SIGNS,
  zoneOf: l2Zone, baseTile: l2Base, terrain: l2Terrain, pathTile: (tx, ty, p) => p.trail ? T.PATH : T.ASPH,
  clearSpots: () => [[19, 40], [70, 46], [82, 23], [18, 62], [45, 19], [7, 66], [27, 43], [86, 44], [SHASTA.x, SHASTA.y], [34, 53], [80, 41], [80, 43], [80, 45], [6, 71], [7, 73], [6, 75], [7, 77]],
  snowyPine: (tx, ty) => dist(tx, ty, SHASTA.x, SHASTA.y) < 14,
  postGen: l2PostGen, spawn: l2Spawn, update: l2Update, onB: l2OnB, vehicleSpeed: l2VehicleSpeed,
  drawVehicle: jh => drawChev(P.x, P.y, P.dir, jh, true),
  interactables: l2Interactables, drawGround: l2DrawGround, drawables: l2Drawables, drawBuilding: l2DrawBuilding, tileFx: l2TileFx, overlay: l2Overlay,
  talk: l2Talk, buildingAct: l2BuildingAct, respawn: l2Respawn, hud: l2Hud, worldLabels: l2WorldLabels, onEnter: l2OnEnter,
  bookInput: l2BookInput, drawBook: l2DrawBook, music: 'cali',
  pauseLines: ['Move: Arrow keys / WASD / stick', '[A]: talk · interact · rope skip', 'B: get in / out of the black Chev', 'Book (Tab, Q): postcards & weird laws', 'M: mute · Esc / P: pause', '', 'Collect 7 postcards. Earn $ busking.', 'Dodge slugs, seals and wildfires.', 'Ranger Jay is your friend. 🌲'],
  zoneNames: { sf: 'San Francisco', redwoods: 'Redwood Forest', shasta: 'Mount Shasta', valley: 'Central Valley', bigsur: 'Big Sur', sequoia: 'Sequoia National Park' },
  zoneTexts: { redwoods: 'Redwoods! 🌲 Watch for banana slugs, and keep your camp crumb clean.', shasta: 'Mt Shasta! 🏔 You\'ll need a summit pass from Ranger Jay.', valley: 'Central Valley: cows, almonds and a Burger King with... deer? 🦌', bigsur: 'Big Sur! 🌊 Surf, elephant seals and the most beautiful road in the world.', sequoia: 'Sequoias! The biggest trees on Earth. Hold on to your donuts. 🐿️' },
  crTexts: L2_CR_TEXTS,
  debug() { L2().money = 120; L2().flags.keys = 1; L2().met.busk = 1; },
};
LEVELS[2] = LEVEL2;

// ================================================================ MINIGAMES
const backToWorld = after => transition(() => { scene = 'world'; parts.length = 0; if (after) after(); });
const statAdd = (k, n = 1) => { L2().stats[k] = (L2().stats[k] || 0) + n; };
function panelUI(y, h) { rrect(64, y, VW - 128, h, 7, 'rgba(18,16,28,.92)', '#ffd34d'); }
function screenParts() { for (const p of parts) { ctx.globalAlpha = Math.min(1, p.life / p.max * 2); txt(p.text || '', p.x, p.y, 8, p.col, 'center', true); ctx.globalAlpha = 1; } }
function bigSprite(fn, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); fn(); g.restore(); }

// ---------------------------------------------------------------- Eggs Benedict stacker (Hilton kitchen)
const BEN = [{ c: '#d9a35e', d: '#b8823e', h: 8 }, { c: '#e8828a', d: '#c8626a', h: 5 }, { c: '#f8f4ea', d: '#e0dccc', h: 8, egg: true }, { c: '#f5d36a', d: '#e0b84a', h: 4, sauce: true }];
let SK = null;
function startStack() { transition(() => { scene = 'stack'; SK = { plate: 0, results: [], fall: null }; newPlate(); }); }
function newPlate() { Object.assign(SK, { layer: 0, stack: [], w: 56, x: 192, phase: 'play', t: 0, msg: '' }); }
function drawBenLayer(i, x, y, w) {
  const L = BEN[i], h = L.h; x = Math.round(x - w / 2); y = Math.round(y);
  if (L.egg) { ell(x + w / 2, y + h / 2, w / 2, h / 2 + 1, L.c); ell(x + w / 2, y + h / 2, Math.min(6, w / 4), 3, '#f2b632'); return; }
  R(x, y, w, h, L.c); R(x, y + h - 1, w, 1, L.d); R(x, y, w, 1, 'rgba(255,255,255,.3)');
  if (L.sauce) for (let k = 3; k < w - 2; k += 7) R(x + k, y + h, 2, 2 + (k % 3), L.c);
  if (i === 0) for (let k = 2; k < w; k += 5) R(x + k, y + 3, 1, 1, '#8a5a2a');
}
SCENES.stack = {
  music: 'cali',
  update(dt) {
    SK.t += dt;
    if (inp.b && SK.phase !== 'done') { backToWorld(); return; }
    if (SK.fall) { SK.fall.y += 220 * dt; if (SK.fall.y > VH + 20) SK.fall = null; }
    if (SK.phase === 'play') {
      const sp = 1.7 + SK.layer * .5 + SK.plate * .35; SK.x = 192 + Math.sin(SK.t * sp) * 95;
      if (inp.a) {
        const top = SK.stack.length ? SK.stack[SK.stack.length - 1] : { x: 192, w: 60 };
        const l = Math.max(SK.x - SK.w / 2, top.x - top.w / 2), r = Math.min(SK.x + SK.w / 2, top.x + top.w / 2), ov = r - l;
        if (ov < 5) { SK.fall = { i: SK.layer, x: SK.x, y: stackTopY() - 30, w: SK.w }; SK.phase = 'fail'; SK.t = 0; SK.results.push(0); SK.msg = 'SPLAT! 🍳'; sfx.eww(); shake = .2; }
        else {
          const cut = SK.w - ov; if (cut > 2) SK.fall = { i: SK.layer, x: SK.x < top.x ? l - cut / 2 : r + cut / 2, y: stackTopY() - 30, w: cut };
          SK.stack.push({ x: (l + r) / 2, w: ov }); SK.w = ov; SK.layer++; sfx.pick();
          if (ov / top.w > .94) popText(192, 60, 'Perfect! ✨', '#fff59a', 'screen');
          if (SK.layer >= BEN.length) { const pct = Math.round(SK.w / 56 * 100); SK.results.push(pct); SK.phase = 'plated'; SK.t = 0; SK.msg = t('Plate {0}: {1}%', SK.plate + 1, pct); sfx.ding(); }
        }
      }
    } else if (SK.phase === 'fail' || SK.phase === 'plated') {
      if (SK.t > 1.6 || (SK.t > .4 && inp.a)) { SK.plate++; if (SK.plate >= 3) { SK.phase = 'done'; SK.t = 0; } else newPlate(); }
    } else if (SK.phase === 'done' && inp.a) {
      const avg = Math.round(SK.results.reduce((a, b) => a + b, 0) / 3);
      backToWorld(() => {
        if (avg >= 35) { statAdd('benedict', 3); say([['Sarah', t('{0}% structural integrity. Still better than the Hilton\'s.', avg)]], () => givePostcard('breakfast')); }
        else say([['Sarah', 'Hmm. Even I can\'t save these eggs today. Try again!']]);
      });
    }
  },
  draw() {
    g.fillStyle = '#eef0f2'; g.fillRect(0, 0, VW, VH);
    for (let y = 0; y < 150; y += 12) for (let x = (y / 12 % 2) * 6; x < VW; x += 12) R(x, y, 11, 11, '#e2e6ea');
    R(0, 150, VW, 66, '#b8b2a6'); R(0, 150, VW, 4, '#d8d2c6');
    ell(192, 176, 40, 7, '#d8d8d8'); ell(192, 174, 36, 5, '#ffffff');
    let y = 170;
    SK.stack.forEach((s, i) => { y -= BEN[i].h; drawBenLayer(i, s.x, y, s.w); });
    if (SK.phase === 'play') drawBenLayer(SK.layer, SK.x, stackTopY() - 30, SK.w);
    if (SK.fall) drawBenLayer(SK.fall.i, SK.fall.x, SK.fall.y, SK.fall.w);
    // the Hilton's version, for comparison
    ell(330, 178, 18, 3, '#d8d8d8'); R(320, 168, 18, 8, '#c8a06a'); ell(330, 166, 7, 3, '#eae4d0'); R(322, 170, 3, 6, '#e8d890');
    bigSprite(() => drawSarah(0, 0, 'down', 0, 0, false, false), 52, 200, 2.2);
  },
  ui() {
    txt('EGGS BENEDICT STACKER', VW / 2, 6, 11, '#3a3a4a', 'center', true, false);
    txt(t('Plate {0}/3', Math.min(3, SK.plate + 1)) + '   ' + SK.results.map(r => r + '%').join(' · '), VW / 2, 20, 8, '#5a5a6a', 'center', false, false);
    txt(t('Hilton: 23% 😬'), 330, 184, 7, '#8a5a5a', 'center', true, false);
    if (SK.phase === 'play') txt(t('[A]: drop the layer!  ·  B: leave'), VW / 2, 200, 8, '#3a3a4a', 'center', true, false);
    if (SK.msg && SK.phase !== 'play' && SK.phase !== 'done') txt(t(SK.msg), VW / 2, 80, 14, '#d9442e', 'center', true);
    if (SK.phase === 'done') {
      const avg = Math.round(SK.results.reduce((a, b) => a + b, 0) / 3);
      panelUI(60, 80); txt(t('Average: {0}%', avg), VW / 2, 72, 14, '#ffd34d', 'center', true, false);
      txt(t(avg >= 35 ? 'Michelin-star structural engineering.' : 'The hollandaise has collapsed.'), VW / 2, 96, 8, '#fff', 'center', false, false);
      txt(t('[A]: continue'), VW / 2, 120, 8, '#ffd34d', 'center', true, false);
    }
    screenParts();
  },
};
function stackTopY() { let y = 170; for (let i = 0; i < SK.stack.length; i++) y -= BEN[i].h; return y; }

// ---------------------------------------------------------------- Google office (stealth) + small talk
INTERIORS.google = {
  name: 'Google Office', style: 'google', music: 'interior', where: 'in San Francisco',
  map: ['####################', '#g.....bb....bb...D#', '#......bb....bb....#', '#..................#', '#.bb..o....o....bb.#', '#.bb.............bb#', '#........gg........#', '#.bb..o....o....bb.#', '#.bb...........bb..#', '#g................g#', '#........P.........#', '#########E##########'],
  guards: [
    { name: 'Googler', col: '#4285f4', hat: '#3a2a1e', path: [[3, 3], [16, 3]], speed: 24, line: 'Wait... you don\'t have a badge. Security!' },
    { name: 'Googler', col: '#ea4335', hat: '#6b4226', path: [[4, 9], [15, 9]], speed: 20, line: 'Wait... you don\'t have a badge. Security!' },
    { name: 'Googler', col: '#34a853', hat: '#2a2a2a', path: [[8, 4], [8, 8]], speed: 18, line: 'Wait... you don\'t have a badge. Security!' }],
  isDone: () => !!L2().postcards.google,
  decor() {   // the famous office slide: a red tube spiralling down from the upper floor
    g.strokeStyle = '#c8302a'; g.lineWidth = 9; g.lineCap = 'round';
    g.beginPath(); g.moveTo(300, 4); g.bezierCurveTo(330, 30, 250, 40, 280, 70); g.bezierCurveTo(300, 90, 260, 100, 250, 120); g.stroke();
    g.strokeStyle = '#ea4335'; g.lineWidth = 5; g.stroke();
    g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 1.5; g.stroke();
    ell(250, 124, 9, 4, '#4285f4');
  },
  onCaught(gd) { if (scene !== 'smalltalk') startSmallTalk(gd, null); return true; },
  onDone() { say([['Sarah', 'THE SLIDE. *wheeee* 🛝'], ['Sarah', 'Sketched it on the way down. Architecture AND fun.']], () => { exitInterior(); setTimeout(() => givePostcard('google'), 900); }); },
};
STYLE.google = { floor: '#e8e4dc', line: '#d8d4cc', face: '#f4f6f8', faceL: '#dbe4ee', top: '#3a4a5a' };
const SMALLTALK = [
  ['Hey! How\'s it going?', 'Good, you?', 'Let me tell you about my week in detail...', 'Why do you ask?'],
  ['Love your shoes! Where are they from?', 'Oh, thanks! Just some random store.', 'Switzerland. Everything good is.', 'Please don\'t look at my shoes.'],
  ['Crazy weather, huh?', 'I know, right?!', 'It is 21 degrees. That is average.', 'Weather is a social construct.'],
  ['We should totally grab coffee sometime!', 'Totally! Let\'s circle back.', 'When exactly? I\'ll book it now.', 'I don\'t drink coffee with strangers.'],
  ['How was your weekend?', 'Awesome! Super chill.', 'I broke into a chapel.', 'Long. Too long.'],
  ['Are you new on the team?', 'Yep! Super excited to be here!', 'No. I am an intruder.', 'Define "team".'],
  ['Have you tried the kombucha on tap?', 'Obsessed with it!', 'It tastes like a sock.', 'We have Rivella at home.'],
  ['Let\'s take this offline!', 'Sounds great, let\'s sync!', 'We are already offline. This is a hallway.', 'I am always offline.'],
];
let STK = null;
function startSmallTalk(gd, walker) {
  STK = { gd, walker, qs: [...SMALLTALK].sort(() => rnd() - .5).slice(0, 3), round: 0, ok: 0, sel: 0, phase: 'ask', t: 7, fb: 0, back: scene };
  stkShuffle(); scene = 'smalltalk'; sfx.blip();
}
function stkShuffle() { const q = STK.qs[STK.round]; STK.opts = [0, 1, 2].sort(() => rnd() - .5).map(i => ({ s: q[1 + i], ok: i === 0 })); STK.sel = 0; STK.t = 7; STK.phase = 'ask'; }
SCENES.smalltalk = {
  music: null,
  update(dt) {
    const S = STK;
    if (S.phase === 'ask') {
      S.t -= dt;
      if (inp.up) { S.sel = (S.sel + 2) % 3; sfx.blip(); }
      if (inp.down) { S.sel = (S.sel + 1) % 3; sfx.blip(); }
      if (inp.a || S.t <= 0) { S.right = S.t > 0 && S.opts[S.sel].ok; if (S.right) { S.ok++; sfx.ding(); } else sfx.bonk(); S.phase = 'fb'; S.fb = 1.3; }
    } else if (S.phase === 'fb') {
      S.fb -= dt;
      if (S.fb <= 0) { S.round++; if (S.round >= 3) S.phase = 'done'; else stkShuffle(); }
    } else if (S.phase === 'done' && inp.a) {
      const win = S.ok >= 2;
      if (win) statAdd('talk');
      if (S.gd) {
        scene = 'interior'; S.gd.alert = 0;
        if (win) { IN.guards = IN.guards.filter(q => q !== S.gd); say([['Googler', 'Love that for you! Anyway, gotta jump into a sync. 👋']]); }
        else { IN.caught = true; ST.stats.caught++; sfx.alarm(); say([['Googler', S.gd.line]], exitInterior); }
      } else {
        scene = 'world'; S.walker.talked = true;
        if (win) say([['Local', 'You\'re awesome! Here\'s five bucks for the good vibes. ✌️', () => { addMoney(5); statAdd('tips', 5); }]]);
        else say([['Local', '...okaaay. Have a good one!']]);
      }
    }
  },
  draw() {
    const office = !!STK.gd;
    g.fillStyle = office ? '#e8eef4' : '#9ac4e8'; g.fillRect(0, 0, VW, VH);
    if (office) ['#4285f4', '#ea4335', '#fbbc05', '#34a853'].forEach((c, i) => R(0, 150 + i * 3, VW, 3, c));
    else { for (let i = 0; i < 8; i++) R(i * 52, 60 + (i % 3) * 20, 44, 100, ['#c8c0d0', '#d8c8a8', '#b9c4cc'][i % 3]); R(0, 160, VW, 56, '#d8d2c4'); }
    R(0, 162, VW, 54, office ? '#d8d4cc' : '#c4beb0');
    bigSprite(() => drawSarah(0, 0, 'right', 0, 0, false, false), 70, 200, 3);
    bigSprite(() => STK.gd ? drawGoogler(0, 0, STK.gd.col, 0) : drawWalker({ x: 0, y: 0, col: STK.walker.col, vx: 0, vy: 0, anim: 0 }), 314, 200, 3);
  },
  ui() {
    const S = STK, q = S.qs[Math.min(S.round, 2)];
    txt(t('SMALL TALK'), VW / 2, 6, 11, '#2a3a5a', 'center', true, false);
    txt('✓ ' + S.ok + ' / 3', VW / 2, 20, 8, '#2a3a5a', 'center', true, false);
    if (S.phase !== 'done') {
      rrect(200, 34, 170, 34, 8, '#ffffff', '#6fb8ff'); wrap(t(q[0]), 156, 8).forEach((ln, i) => txt(ln, 285, 40 + i * 10, 8, '#222', 'center', true, false));
      S.opts.forEach((o, i) => {
        const y = 78 + i * 22, sel = i === S.sel, fb = S.phase === 'fb';
        const col = fb ? (o.ok ? '#7ee081' : sel ? '#ff8a8a' : 'rgba(255,255,255,.8)') : sel ? '#ff6fa8' : 'rgba(255,255,255,.85)';
        rrect(110, y, 200, 18, 6, col); txt((sel ? '▶ ' : '') + t(o.s), 116, y + 5, 7.5, sel && !fb ? '#fff' : '#222', 'left', true, false);
      });
      if (S.phase === 'ask') { rrect(110, 146, 200, 4, 2, 'rgba(0,0,0,.2)'); rrect(110, 146, 200 * Math.max(0, S.t / 7), 4, 2, '#ffd34d'); txt(t('▲ ▼ choose · [A]: say it'), VW / 2, 154, 7, '#2a3a5a', 'center', false, false); }
      if (S.phase === 'fb') txt(S.right ? t('Nailed it! 🙌') : t('...awkward. 😬'), VW / 2, 154, 9, S.right ? '#2a8a2a' : '#c83a3a', 'center', true, false);
    } else {
      panelUI(60, 70); txt(S.ok >= 2 ? t('Small talk survived! 🇺🇸') : t('Too European. 🇨🇭'), VW / 2, 74, 12, '#ffd34d', 'center', true, false);
      txt(t('[A]: continue'), VW / 2, 104, 8, '#ffd34d', 'center', true, false);
    }
  },
};

// ---------------------------------------------------------------- surfing (Big Sur)
let SU = null;
const SURF_TIME = 45, SURF_GOAL = 200;
function startSurf() { transition(() => { scene = 'surf'; musI = 0; SU = { t: 0, x: 192, score: 0, waves: [], obs: [], waveT: .5, obsT: 1.5, wipe: 0, combo: 1, trick: 0, done: false }; }); }
SCENES.surf = {
  music: 'slide',
  update(dt) {
    const S = SU;
    if (S.done) { if (inp.a) { const win = S.score >= SURF_GOAL; backToWorld(() => { if (win) givePostcard('surf'); else say([['Sarah', t('{0} points. The seals won this round. Again!', S.score)]]); }); } return; }
    if (inp.b) { backToWorld(); return; }
    S.t += dt; S.wipe = Math.max(0, S.wipe - dt); S.trick = Math.max(0, S.trick - dt);
    if (S.wipe <= 0) S.x = clamp(S.x + inp.ax * 160 * dt, 24, VW - 24);
    S.waveT -= dt; if (S.waveT <= 0) { S.waveT = 1.4; S.waves.push({ y: -10, tricked: false, missed: false }); }
    for (const w of S.waves) { w.y += 58 * dt; if (w.y > 176 && !w.tricked && !w.missed) { w.missed = true; S.combo = 1; } }
    S.waves = S.waves.filter(w => w.y < 240);
    S.obsT -= dt;
    if (S.obsT <= 0) { S.obsT = Math.max(.45, .95 - S.t / 90); const k = rnd(), type = k < .4 ? 'seal' : k < .75 ? 'kelp' : 'surfer'; S.obs.push({ type, x: 24 + rnd() * (VW - 48), y: -20, vy: 70 + rnd() * 35, w: type === 'seal' ? 18 : type === 'kelp' ? 13 : 10 }); }
    for (const o of S.obs) {
      o.y += o.vy * dt;
      if (!o.hit && S.wipe <= 0 && Math.abs(o.y - 160) < 10 && Math.abs(o.x - S.x) < o.w) {
        o.hit = true; S.wipe = 1.2; S.combo = 1; S.score = Math.max(0, S.score - 10); sfx.splash(); shake = .2;
        popText(S.x, 140, o.type === 'seal' ? 'BWAAARP! 🦭' : o.type === 'kelp' ? 'Kelp! 🌿' : 'Sorry dude!', '#ffffff', 'screen'); if (o.type === 'seal') sfx.roar();
      }
    }
    S.obs = S.obs.filter(o => o.y < 240);
    if (inp.a && S.wipe <= 0) {
      const w = S.waves.find(w => !w.tricked && Math.abs(w.y - 160) < 15);
      if (w) { w.tricked = true; const pts = 10 * S.combo; S.score += pts; S.combo = Math.min(5, S.combo + 1); S.trick = .5; sfx.ding(); popText(S.x, 136, `+${pts} 🤙`, '#fff59a', 'screen'); }
      else { S.combo = 1; sfx.bonk(); }
    }
    if (S.t >= SURF_TIME) { S.done = true; sfx.splash(); }
  },
  draw() {
    const S = SU, gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, '#1a5a9a'); gr.addColorStop(1, '#3a9ad0'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 30; i++) R((hash(i, 7) % VW), ((hash(i, 9) % VH) + S.t * 40) % VH, 8, 1, 'rgba(255,255,255,.18)');
    R(0, 196, VW, 20, '#e6d39f'); R(0, 194, VW, 3, '#ffffff');
    for (const w of S.waves) { R(0, w.y - 4, VW, 8, 'rgba(20,70,130,.35)'); R(0, w.y - 2, VW, 3, w.tricked ? '#fff59a' : '#ffffff'); for (let x = 0; x < VW; x += 12) R(x + ((w.y * 2) % 12), w.y - 4, 4, 2, '#e8f4ff'); }
    for (const o of S.obs) {
      if (o.type === 'seal') { ell(o.x, o.y, 16, 7, '#6a5a4a'); ell(o.x + 10, o.y - 3, 6, 5, '#7a6a5a'); R(o.x + 13, o.y - 4, 1, 1, '#111'); }
      else if (o.type === 'kelp') for (let i = -2; i <= 2; i++) R(o.x + i * 4 + Math.round(Math.sin(time * 4 + i) * 2), o.y - 6, 2, 12, '#3a7a2a');
      else { ell(o.x, o.y, 4, 12, '#ffd34d'); R(o.x - 2, o.y - 4, 4, 5, '#d9442e'); R(o.x - 2, o.y - 8, 4, 4, '#e8b996'); }
    }
    g.save(); g.translate(Math.round(S.x), 160); g.rotate(S.trick > 0 ? (1 - S.trick / .5) * Math.PI * 2 : S.wipe > 0 ? Math.sin(time * 20) * .5 : inp.ax * .2);
    ell(0, 0, 5, 15, '#ff6fa8'); R(-1, -14, 2, 28, '#ffffff'); R(-4, -6, 8, 6, '#1d1d22'); circ(0, -2, 3.5, '#6b4226'); R(-6, -4, 2, 1, '#f1c6a5'); R(4, -4, 2, 1, '#f1c6a5');
    g.restore();
    if (S.wipe > 0) for (let i = 0; i < 6; i++) R(S.x - 10 + hash(i, (time * 20) | 0) % 20, 150 + hash(i + 3, (time * 20) | 0) % 20, 2, 2, '#ffffff');
  },
  ui() {
    const S = SU; rrect(4, 4, 110, 26, 5, 'rgba(10,10,20,.5)'); txt(t('Score: {0}', S.score) + (S.combo > 1 ? `  x${S.combo}` : ''), 10, 7, 9, '#fff', 'left', true);
    rrect(10, 21, 96, 4, 2, 'rgba(255,255,255,.25)'); rrect(10, 21, 96 * Math.min(1, S.t / SURF_TIME), 4, 2, '#ff6fa8');
    txt(t('Goal: {0}', SURF_GOAL), VW - 8, 8, 8, '#fff', 'right', true);
    if (S.t < 4) txt(t('← → steer · [A] on a wave crest = trick! · dodge seals & kelp'), VW / 2, 202, 7.5, '#fff', 'center', true);
    if (S.done) { panelUI(60, 76); txt(t('Score: {0}', S.score), VW / 2, 72, 14, '#ffd34d', 'center', true, false); txt(S.score >= SURF_GOAL ? t('Totally tubular! 🤙') : t('Wiped out. The ocean wins.'), VW / 2, 96, 9, '#fff', 'center', true, false); txt(t('[A]: continue'), VW / 2, 116, 8, '#ffd34d', 'center', true, false); }
    screenParts();
  },
};

// ---------------------------------------------------------------- Marbled Murrelet vs Steller's Jay (redwood canopy)
let JG = null;
const JAY_TIME = 40, NEST = { x: 192, y: 140 };
function startJayGame() { transition(() => { scene = 'jaygame'; musI = 0; JG = { t: 0, x: 150, nest: 3, shoo: 0, jays: [], spawnT: 1.2, mur: null, murT: 7, swing: 0, done: false, win: false }; }); }
SCENES.jaygame = {
  music: 'interior',
  update(dt) {
    const J = JG;
    if (J.done) { if (inp.a) backToWorld(() => { if (J.win) say([['Sarah', t('{0} jays shooed. The murrelet chick is safe! 🐣', J.shoo)]], () => givePostcard('murrelet')); else say([['Sarah', 'The jays got the nest... Let\'s try again. Crumb clean!']]); }); return; }
    if (inp.b) { backToWorld(); return; }
    J.t += dt; J.swing = Math.max(0, J.swing - dt);
    J.x = clamp(J.x + inp.ax * 150 * dt, 30, VW - 30);
    J.spawnT -= dt;
    if (J.spawnT <= 0) { J.spawnT = Math.max(.75, 2 - J.t / 28); const side = rnd() < .5 ? -1 : 1; J.jays.push({ x: side < 0 ? -10 : VW + 10, y: 40 + rnd() * 80, sp: 40 + rnd() * 25 + J.t * .8, out: false, ph: rnd() * 6, vx: 0, vy: 0 }); }
    J.murT -= dt;
    if (J.murT <= 0 && !J.mur) { J.murT = 9; J.mur = { x: rnd() < .5 ? -10 : VW + 10, y: 50, state: 'in', sit: 0 }; }
    for (const j of J.jays) {
      if (j.out) { j.x += j.vx * dt; j.y += j.vy * dt; continue; }
      const a = Math.atan2(NEST.y - 6 - j.y, NEST.x - j.x); j.ph += dt * 5;
      j.x += Math.cos(a) * j.sp * dt; j.y += (Math.sin(a) * j.sp + Math.sin(j.ph) * 30) * dt;
      if (dist(j.x, j.y, NEST.x, NEST.y - 6) < 10) { J.nest--; j.out = true; j.vx = (j.x < NEST.x ? -1 : 1) * 90; j.vy = -110; sfx.eww(); shake = .2; popText(NEST.x, NEST.y - 30, t('Nest raided! 🥚'), '#ff8a8a', 'screen'); }
    }
    J.jays = J.jays.filter(j => j.x > -30 && j.x < VW + 30 && j.y > -30);
    const m = J.mur;
    if (m) {
      if (m.state === 'in') { const a = Math.atan2(NEST.y - 8 - m.y, NEST.x - m.x); m.x += Math.cos(a) * 60 * dt; m.y += Math.sin(a) * 60 * dt; if (dist(m.x, m.y, NEST.x, NEST.y - 8) < 4) { m.state = 'sit'; m.sit = 2.5; } }
      else if (m.state === 'sit') { m.sit -= dt; if (m.sit <= 0) m.state = 'out'; }
      else { m.x += 80 * dt; m.y -= 70 * dt; if (m.y < -20) J.mur = null; }
    }
    if (inp.a) {
      J.swing = .25; sfx.jump();
      for (const j of J.jays) if (!j.out && dist(j.x, j.y, J.x, 128) < 34) { j.out = true; j.vx = (j.x < J.x ? -1 : 1) * 120; j.vy = -140; J.shoo++; popText(j.x, j.y - 10, 'Shoo!', '#bfe3ff', 'screen'); sfx.blip(); }
      if (m && m.state !== 'out' && dist(m.x, m.y, J.x, 128) < 34) { m.state = 'out'; J.nest--; popText(m.x, m.y - 10, t('Not the murrelet!! 😱'), '#ff8a8a', 'screen'); sfx.eww(); }
    }
    if (J.nest <= 0) { J.done = true; J.win = false; }
    if (J.t >= JAY_TIME) { J.done = true; J.win = true; sfx.ding(); }
  },
  draw() {
    const J = JG, gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, '#5a8a6a'); gr.addColorStop(1, '#1a3a22'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 6; i++) R(i * 70 + 10, 0, 20, VH, 'rgba(60,30,20,.35)');
    for (let i = 0; i < 14; i++) circ(hash(i, 1) % VW, hash(i, 2) % 120, 18, 'rgba(20,60,30,.6)');
    R(166, 0, 52, VH, '#7a3a22'); R(172, 0, 10, VH, '#9a4a2c'); for (let i = 0; i < 6; i++) R(168 + i * 8, 0, 1, VH, '#5a2a18');
    R(10, 142, VW - 20, 7, '#6a3a22'); R(10, 142, VW - 20, 2, '#8a5a3a');
    ell(NEST.x, NEST.y, 13, 5, '#8a6a4a'); ell(NEST.x, NEST.y - 2, 10, 3, '#6a4a2a');
    for (let i = 0; i < J.nest; i++) ell(NEST.x - 5 + i * 5, NEST.y - 4, 2.4, 3, '#c8d8a8');
    if (J.mur) { const m = J.mur; ell(m.x, m.y, 7, 4, '#7a6a5a'); R(m.x - 3, m.y, 7, 2, '#f4f0e8'); R(m.x + 5, m.y - 3, 3, 2, '#3a3a3a'); }
    for (const j of J.jays) { const f = Math.sin(time * 25 + j.ph) * 3; ell(j.x, j.y, 7, 4, '#2a5ab8'); R(j.x - 2, j.y - 8, 4, 5, '#1a1a2a'); R(j.x - 1, j.y - 10, 2, 2, '#1a1a2a'); R(j.x - 9, j.y - 2 + f, 5, 2, '#3a6ad8'); R(j.x + 4, j.y - 2 - f, 5, 2, '#3a6ad8'); }
    bigSprite(() => drawSarah(0, 0, 'down', 0, 0, false, false), J.x, 142, 1.6);
    if (J.swing > 0) { g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 2; g.beginPath(); g.arc(J.x, 120, 26, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
  },
  ui() {
    const J = JG;
    txt(t('MURRELET BODYGUARD'), VW / 2, 6, 11, '#ffffff', 'center', true);
    txt('🥚'.repeat(Math.max(0, J.nest)) + '   ' + t('Shooed: {0}', J.shoo) + '   ' + Math.max(0, Math.ceil(JAY_TIME - J.t)) + 's', VW / 2, 20, 8, '#fff', 'center', true);
    if (J.t < 5) txt(t('← → move · [A]: shoo the blue jays · DON\'T shoo the brown murrelet!'), VW / 2, 200, 7.5, '#fff', 'center', true);
    if (J.done) { panelUI(60, 70); txt(J.win ? t('The chick is safe! 🐣') : t('The jays won... 😢'), VW / 2, 74, 12, '#ffd34d', 'center', true, false); txt(t('[A]: continue'), VW / 2, 104, 8, '#ffd34d', 'center', true, false); }
    screenParts();
  },
};

// ---------------------------------------------------------------- climbing General Sherman (to the shrimp)
let CL = null;
const CL_H = 1500, CL_TOP = 90;
function startClimb() {
  transition(() => {
    scene = 'climb'; musI = 0;
    const br = []; let side = 1;
    for (let y = CL_H - 60, i = 0; y > CL_TOP + 30; y -= 42, i++) {
      side = -side; const len = 64 + ((i * 37) % 44);
      br.push({ y, x0: side < 0 ? 178 - len : 206, x1: side < 0 ? 178 : 206 + len, sq: i > 3 && i % 4 === 2, side });
      if (i % 3 === 1) br.push({ y: y - 21, x0: 182, x1: 202 });
    }
    br.push({ y: CL_TOP, x0: 140, x1: 244, top: true });
    CL = { x: 192, y: CL_H - 20, vx: 0, vy: 0, gr: true, br, cones: [], coneT: 2, stun: 0, t: 0, done: false, face: 'right' };
  });
}
SCENES.climb = {
  music: 'world',
  update(dt) {
    const C = CL;
    if (C.done) { if (inp.a) backToWorld(() => say([['Shrimp', '*clicks claws coolly* 🦐😎'], ['Sarah', 'A shrimp. In sunglasses. On top of the biggest tree on Earth.'], ['Sarah', 'I have so many questions. I will ask none of them.']], () => givePostcard('shrimp'))); return; }
    if (inp.b) { backToWorld(); return; }
    C.t += dt; C.stun = Math.max(0, C.stun - dt);
    C.vx = C.stun > 0 ? 0 : inp.ax * 118; if (C.vx) C.face = C.vx < 0 ? 'left' : 'right';
    if (inp.a && C.gr && C.stun <= 0) { C.vy = -258; C.gr = false; sfx.jump(); }
    C.vy += 560 * dt;
    const py = C.y; C.x = clamp(C.x + C.vx * dt, 64, VW - 64); C.y += C.vy * dt;
    let landed = false;
    if (C.vy >= 0) for (const b of C.br) if (py <= b.y + .5 && C.y >= b.y && C.x >= b.x0 - 3 && C.x <= b.x1 + 3) { C.y = b.y; C.vy = 0; landed = true; break; }
    if (C.y >= CL_H - 20) { C.y = CL_H - 20; C.vy = 0; landed = true; }
    C.gr = landed;
    C.coneT -= dt;
    if (C.coneT <= 0) {
      C.coneT = 1.5;
      const sq = C.br.filter(b => b.sq && b.y < C.y - 30 && b.y > C.y - 260);
      if (sq.length) { const b = sq[(rnd() * sq.length) | 0], sx = b.side < 0 ? b.x0 + 6 : b.x1 - 6; C.cones.push({ x: sx, y: b.y - 10, vx: (C.x - sx) * .5, vy: -40 }); }
    }
    for (const c of C.cones) { c.vy += 300 * dt; c.x += c.vx * dt; c.y += c.vy * dt; if (!c.hit && Math.abs(c.x - C.x) < 8 && Math.abs(c.y - (C.y - 10)) < 12) { c.hit = true; C.stun = .7; C.vy = 90; C.gr = false; sfx.bonk(); popText(VW / 2, 70, t('Bonk! 🌰'), '#ffcf6b', 'screen'); } }
    C.cones = C.cones.filter(c => c.y < C.y + 300 && !c.hit);
    if (C.gr && C.y <= CL_TOP + 1 && Math.abs(C.x - 192) < 22) { C.done = true; sfx.ding(); }
  },
  draw() {
    const C = CL, camY = clamp(C.y - 140, 0, CL_H - VH), k = 1 - camY / CL_H;
    const gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, k > .7 ? '#bfe0ff' : '#8ac0e8'); gr.addColorStop(1, k > .7 ? '#e8f4ff' : '#4a7a5a'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    g.save(); g.translate(0, -camY);
    for (let i = 0; i < 6; i++) { const tx = 30 + i * 70; R(tx, CL_H * .5 + i * 40, 10, CL_H, '#7a4a2a'); }
    R(176, 0, 32, CL_H, '#a0522d'); R(180, 0, 7, CL_H, '#c0683a');
    for (let y = 0; y < CL_H; y += 24) R(178 + (y % 48 ? 0 : 20), y, 1, 14, '#7a3a1e');
    for (const b of C.br) {
      if (b.y < camY - 20 || b.y > camY + VH + 20) continue;
      R(b.x0, b.y, b.x1 - b.x0, 5, '#7a3a1e'); R(b.x0, b.y, b.x1 - b.x0, 1, '#9a5a2e');
      if (!b.top) for (let x = b.x0; x < b.x1; x += 10) circ(x + 5, b.y - 3, 5, '#2e5a2a');
      if (b.sq) { const sx = b.side < 0 ? b.x0 + 6 : b.x1 - 6; drawSquirrel({ x: sx, y: b.y, face: b.side < 0 ? 1 : -1, hx: 1 }); }
    }
    circ(192, CL_TOP - 20, 46, '#2e5a2a');
    R(140, CL_TOP, 104, 5, '#7a3a1e');
    const bob = Math.round(Math.sin(time * 3) * 2); drawShrimp(192, CL_TOP - 8 + bob, 1.4);
    if ((time * 2) % 1 < .5) R(204, CL_TOP - 20, 2, 2, '#ffffff');
    for (const c of C.cones) { ell(c.x, c.y, 3, 4, '#8a5a2a'); R(c.x - 2, c.y - 2, 4, 1, '#6a3a1a'); }
    const jh = 0; bigSprite(() => drawSarah(0, 0, C.face, C.t, jh, false, !!C.vx && C.gr), C.x, C.y, 1);
    if (C.stun > 0) for (let i = 0; i < 3; i++) R(C.x + Math.cos(time * 8 + i * 2) * 6, C.y - 22 + Math.sin(time * 8 + i * 2) * 2, 1, 1, '#ffd34d');
    g.restore();
  },
  ui() {
    const C = CL, h = Math.round((CL_H - 20 - C.y) / 8);
    txt(t('GENERAL SHERMAN'), VW / 2, 6, 11, '#ffffff', 'center', true);
    txt(t('Height: {0} ft', h), 8, 22, 8, '#fff', 'left', true);
    if (C.t < 5) txt(t('← → move · [A]: jump branch to branch · watch out for falling cones!'), VW / 2, 200, 7.5, '#fff', 'center', true);
    if (C.done) { panelUI(60, 70); txt(t('You found the shrimp! 🦐'), VW / 2, 74, 12, '#ffd34d', 'center', true, false); txt(t('[A]: continue'), VW / 2, 104, 8, '#ffd34d', 'center', true, false); }
    screenParts();
  },
};

// ---------------------------------------------------------------- C-Real's looper busking (Union Square)
let BU = null;
const BEAT = .6, LOOP_NAMES = ['🥁 Drums', '🎸 Bass', '🎹 Chords', '🎵 Melody'];
const PROG = [57, 53, 48, 55], MINOR = [true, false, false, false];
const MELODY = [[69, 72, 74, 76], [72, 69, 67, 69], [67, 64, 67, 72], [74, 72, 71, 67]];
function startBuskIntro() {
  const first = !L2().flags.busked;
  say(first ? [['C-Real', 'Welcome to my looper show! 🎸 I play, you record.'], ['C-Real', 'Press [A] on each of the 4 beats to record a loop layer: drums, bass, chords, melody.'], ['C-Real', 'The tighter we are, the better the crowd tips!']] : [['C-Real', 'Jam session! Hit [A] on the beat. 🎸']],
    () => { L2().flags.busked = 1; transition(() => { scene = 'busk'; BU = { t: -BEAT * 4, layers: 0, hitsByBar: {}, hitBeats: new Set(), lastBeat: -99, phase: 'rec', perfect: 0, jamBars: 0, tips: 0, coins: [] }; }); });
}
function playBeat(bi) {
  const b = ((bi % 4) + 4) % 4, bar = Math.floor(bi / 4), root = PROG[((bar % 4) + 4) % 4], L = BU.layers;
  if (BU.phase === 'rec' || bi < 0) tone(b === 0 ? 1320 : 990, .04, 'square', .03);
  if (bi < 0) return;
  if (L > 0) { if (b % 2 === 0) tone(110, .18, 'sine', .3, -70); else noise(.1, .16, 1800); noise(.03, .05, 7000); }
  if (L > 1) tone(midi(root - 12), BEAT * .9, 'sine', .16);
  if (L > 2 && b % 2 === 0) for (const iv of [0, MINOR[((bar % 4) + 4) % 4] ? 3 : 4, 7]) tone(midi(root + iv), BEAT * 1.6, 'triangle', .035);
  if (L > 3) tone(midi(MELODY[((bar % 4) + 4) % 4][b]), BEAT * .7, 'square', .045);
}
SCENES.busk = {
  music: null,
  update(dt) {
    const B = BU;
    if (B.phase === 'done') { if (inp.a) backToWorld(() => { addMoney(B.tips); statAdd('tips', B.tips); toast(t('🎸 The crowd tipped ${0}!', B.tips)); saveGame(); }); return; }
    if (inp.b) { backToWorld(); return; }
    B.t += dt;
    for (const c of B.coins) { c.vy += 300 * dt; c.x += c.vx * dt; c.y += c.vy * dt; } B.coins = B.coins.filter(c => c.y < 200);
    const bi = Math.floor(B.t / BEAT + 1e-6);
    if (bi !== B.lastBeat) {
      B.lastBeat = bi; playBeat(bi);
      if (bi > 0 && bi % 4 === 0) {   // a bar just ended
        const done = bi / 4 - 1;
        if (B.phase === 'rec') {
          if ((B.hitsByBar[done] || 0) >= 3) { B.layers++; sfx.ding(); popText(VW / 2, 60, t('{0} recorded!', t(LOOP_NAMES[B.layers - 1])), '#7ee081', 'screen'); for (let i = 0; i < 4; i++) B.coins.push({ x: 120 + rnd() * 140, y: 40, vx: (rnd() - .5) * 60, vy: -60 }); if (B.layers >= 4) B.phase = 'jam'; }
          else popText(VW / 2, 60, t('Again! 🔁'), '#ffb070', 'screen');
        } else if (B.phase === 'jam') { B.jamBars++; for (let i = 0; i < 6; i++) B.coins.push({ x: 60 + rnd() * 260, y: 30, vx: (rnd() - .5) * 60, vy: -40 }); if (B.jamBars >= 2) { B.phase = 'done'; B.tips = 10 + B.layers * 5 + B.perfect; sfx.ding(); } }
      }
    }
    if (inp.a && B.phase === 'rec') {
      const nb = Math.round(B.t / BEAT), d = Math.abs(B.t - nb * BEAT);
      if (nb >= 0 && d < .15 && !B.hitBeats.has(nb)) { B.hitBeats.add(nb); const bar = Math.floor(nb / 4); B.hitsByBar[bar] = (B.hitsByBar[bar] || 0) + 1; if (d < .06) { B.perfect++; popText(VW / 2, 150, 'Perfect! ✨', '#fff59a', 'screen'); } else popText(VW / 2, 150, 'Nice! 👍', '#bfe3ff', 'screen'); }
      else { popText(VW / 2, 150, t('Off beat'), '#ff9a9a', 'screen'); sfx.bonk(); }
    }
  },
  draw() {
    const B = BU, beatPh = (((B.t / BEAT) % 1) + 1) % 1, bounce = beatPh < .15 ? 2 : 0;
    const gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, '#ffb07a'); gr.addColorStop(1, '#ffe0b0'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 9; i++) R(i * 46 - 6, 40 + (i % 3) * 18, 40, 140, ['#c8c0d0', '#d8c8a8', '#b9c4cc'][i % 3]);
    R(0, 150, VW, 66, '#d8d2c4'); for (let x = 0; x < VW; x += 16) R(x, 150, 1, 66, '#c4beb0');
    for (const px of [30, 354]) { R(px, 70, 4, 82, '#8a6a3a'); for (let i = 0; i < 5; i++) poly([[px + 2, 70], [px - 16 + i * 8, 62 + (i % 2) * 6], [px - 12 + i * 8, 66]], '#3a8a3a'); }
    const crowd = 2 + B.layers * 2 + (B.phase !== 'rec' ? 2 : 0);
    for (let i = 0; i < crowd; i++) { const cx2 = 40 + (i * 61) % 300, cy2 = 196 + (i % 2) * 6; drawPerson(cx2 + (cx2 > 150 && cx2 < 240 ? 90 : 0), cy2 - (B.layers ? bounce : 0), { shirt: ['#3a7bd5', '#e05a5a', '#5aa05a', '#d9a400', '#8a5ad0'][i % 5], pants: '#3a3a4a' }); }
    bigSprite(() => drawCReal(0, 0, time, 'busk'), 192, 176 - bounce, 2.4);
    for (const c of B.coins) circ(c.x, c.y, 2, '#ffd34d');
  },
  ui() {
    const B = BU;
    txt(t('UNION SQUARE LOOPER JAM'), VW / 2, 6, 11, '#3a2a1a', 'center', true, false);
    LOOP_NAMES.forEach((n, i) => { const on = i < B.layers, cur = i === B.layers && B.phase === 'rec'; rrect(6, 24 + i * 15, 92, 13, 5, on ? '#7ee081' : cur ? '#ff6fa8' : 'rgba(255,255,255,.6)'); txt(t(n) + (on ? ' ✓' : cur ? ' ●REC' : ''), 11, 27 + i * 15, 7, on || cur ? '#fff' : '#555', 'left', true, false); });
    const beatIdx = ((Math.floor(B.t / BEAT) % 4) + 4) % 4;
    for (let i = 0; i < 4; i++) { ctx.fillStyle = i === beatIdx && B.t >= -BEAT * 4 ? (B.t < 0 ? '#ffd34d' : '#ff6fa8') : 'rgba(0,0,0,.25)'; ctx.beginPath(); ctx.arc(VW / 2 - 27 + i * 18, 32, 6, 0, 7); ctx.fill(); }
    if (B.t < 0) txt(t('Count-in... {0}', Math.ceil(-B.t / BEAT)), VW / 2, 44, 9, '#3a2a1a', 'center', true, false);
    else if (B.phase === 'rec') txt(t('Hit [A] on every beat! ({0}/4 in this bar)', B.hitsByBar[Math.floor(B.t / BEAT / 4)] || 0), VW / 2, 44, 8, '#3a2a1a', 'center', true, false);
    else if (B.phase === 'jam') txt(t('Full loop! The crowd goes wild! 🙌'), VW / 2, 44, 9, '#3a2a1a', 'center', true, false);
    txt(t('B: stop'), VW - 8, 8, 7, '#3a2a1a', 'right', false, false);
    if (B.phase === 'done') { panelUI(60, 70); txt(t('Tips: ${0} 💵', B.tips), VW / 2, 72, 14, '#ffd34d', 'center', true, false); txt(t('[A]: collect'), VW / 2, 104, 8, '#ffd34d', 'center', true, false); }
    screenParts();
  },
};

// ---------------------------------------------------------------- opening wine with a shoe (Big Sur campground)
let WN = null;
function startWine() { transition(() => { scene = 'wine'; WN = { t: 0, cork: 0, cracks: 0, hit: 0, done: false, ok: false }; }); }
SCENES.wine = {
  music: 'cali',
  update(dt) {
    const Wn = WN;
    if (Wn.done) { if (inp.a) backToWorld(() => { if (Wn.ok) { ST.hearts = ST.maxHearts; L2().cp = 'camp2'; statAdd('wine'); say([['C-Real', 'The shoe method! You\'re a genius. Cheers! 🍷'], ['Sarah', 'Hearts restored. Checkpoint set. Feet... slightly purple.']], saveGame); } else say([['C-Real', '...I\'ll buy a corkscrew tomorrow. Promise.']]); }); return; }
    if (inp.b) { backToWorld(); return; }
    Wn.t += dt; Wn.hit = Math.max(0, Wn.hit - dt);
    const m = (Math.sin(Wn.t * 3.2) + 1) / 2;
    if (inp.a) {
      Wn.hit = .2;
      if (Math.abs(m - .5) < .11) { Wn.cork += .14; tone(120, .08, 'square', .14); popText(140, 90, 'Thunk!', '#fff', 'screen'); }
      else { Wn.cracks++; tone(1900, .12, 'triangle', .08); shake = .15; popText(140, 90, t('Crack! 😬'), '#ff9a9a', 'screen'); }
      if (Wn.cork >= 1) { Wn.done = true; Wn.ok = true; noise(.15, .3, 900); tone(600, .15, 'sine', .15, 400); sfx.ding(); }
      if (Wn.cracks >= 3) { Wn.done = true; Wn.ok = false; noise(.4, .3, 3000); }
    }
  },
  draw() {
    const Wn = WN, gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, '#3a2a5a'); gr.addColorStop(.6, '#e8845a'); gr.addColorStop(1, '#3a2a1a'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 9; i++) poly([[i * 48, 160], [i * 48 + 24, 60 + (i % 3) * 14], [i * 48 + 48, 160]], '#1a2a1a');
    R(0, 160, VW, 56, '#3a2a1a');
    R(80, 40, 30, 130, '#6a3a22'); R(84, 40, 6, 130, '#8a4a2c');
    const push = Wn.hit > 0 ? -8 : 0, bx = 150 + push;
    R(bx - 2, 98, 30, 12, '#2a1a12'); R(bx - 4, 96, 10, 16, '#3a2a1a');
    R(bx + 8, 100, 60, 8, '#3a0a1a'); R(bx + 66, 101, 10, 6, '#3a0a1a'); R(bx + 76 + 0, 102, Math.round(4 + Wn.cork * 12), 4, '#d9b47a');
    for (let i = 0; i < Wn.cracks; i++) R(bx + 20 + i * 12, 100, 1, 8, '#ffffff');
    ell(300, 168, 10, 4, '#7d7d80'); ell(300, 160, 6, 9 + Math.sin(time * 9) * 2, '#f08a24'); ell(300, 163, 3, 4, '#ffd34d');
    bigSprite(() => drawCReal(0, 0, time, 'wine'), 330, 190, 1.6);
    bigSprite(() => drawSarah(0, 0, 'left', 0, 0, false, false), 250, 190, 1.6);
  },
  ui() {
    const Wn = WN, m = (Math.sin(Wn.t * 3.2) + 1) / 2;
    txt(t('THE SHOE METHOD 👟🍷'), VW / 2, 6, 11, '#ffffff', 'center', true);
    rrect(92, 24, 200, 10, 5, 'rgba(0,0,0,.4)'); rrect(92 + 200 * .39, 24, 200 * .22, 10, 4, '#7ee081'); rrect(90 + 200 * m, 21, 4, 16, 2, '#ffffff');
    txt(t('Cork: {0}%   ·   Cracks: {1}/3', Math.min(100, Math.round(Wn.cork * 100)), Wn.cracks), VW / 2, 40, 8, '#fff', 'center', true);
    if (Wn.t < 4) txt(t('Tap [A] when the marker is in the green zone!'), VW / 2, 200, 8, '#fff', 'center', true);
    if (Wn.done) { panelUI(60, 70); txt(Wn.ok ? t('POP! 🍾 Cheers!') : t('The bottle broke... 🍷💔'), VW / 2, 74, 12, '#ffd34d', 'center', true, false); txt(t('[A]: continue'), VW / 2, 104, 8, '#ffd34d', 'center', true, false); }
    screenParts();
  },
};

// ---------------------------------------------------------------- Level 2 ending on Mt Shasta
let EN2 = null;
const finalMsg2 = () => FINAL_MESSAGE_2[LANG] || FINAL_MESSAGE_2.en;
function startEnding2() { transition(() => { scene = 'ending2'; musI = 0; EN2 = { t: 0, shown: 0, phase: 0 }; L2().flags.finished = 1; saveGame(); }); }
SCENES.ending2 = {
  music: 'ending',
  update(dt) {
    EN2.t += dt; const msg = finalMsg2();
    if (EN2.t > 1.5) EN2.shown = Math.min(msg.length, EN2.shown + dt * 30);
    if (inp.a) {
      if (EN2.phase === 0 && EN2.shown < msg.length) EN2.shown = msg.length;
      else if (EN2.phase === 0) { EN2.phase = 1; sfx.ding(); }
      else startGlissade();
    }
  },
  draw() {
    const gr = g.createLinearGradient(0, 0, 0, VH); gr.addColorStop(0, '#3a2a6a'); gr.addColorStop(.45, '#ff8ab0'); gr.addColorStop(.75, '#ffc88a'); g.fillStyle = gr; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 40; i++) if ((hash(i, 3) % 100) / 100 < .6) R(hash(i, 1) % VW, hash(i, 2) % 70, 1, 1, `rgba(255,255,255,${.5 + .5 * Math.sin(time * 2 + i)})`);
    circ(300, 120, 26, '#fff3b0');
    drawMountains(150, '#8a7aa8', true, 11);
    poly([[60, VH], [192, 120], [324, VH]], '#eef3f8'); poly([[120, VH], [192, 130], [260, VH]], '#d8e2ee');
    R(190, 96, 2, 26, '#ddd'); R(192, 96, 12, 8, '#d52b1e'); R(196, 98, 3, 4, '#fff'); R(195, 99, 5, 2, '#fff');
    bigSprite(() => drawCReal(0, 0, time, 'busk'), 160, 184, 2);
    bigSprite(() => drawSarah(0, 0, 'left', 0, 0, false, false), 236, 184, 2);
    for (let k = 0; k < 4; k++) { const p = (time * .3 + k * .25) % 1; R(170 + Math.sin(p * 9) * 20, 150 - p * 120, 2, 5, `rgba(255,255,255,${1 - p})`); }
  },
  ui() {
    if (EN2.phase === 0) {
      rrect(30, 20, VW - 60, 104, 8, 'rgba(18,16,28,.88)', '#ffd34d');
      txt('C-Real', 44, 26, 9, '#ffd34d', 'left', true, false);
      const lines = wrap(finalMsg2(), VW - 90, 8.5); let left = Math.floor(EN2.shown);
      lines.slice(0, 8).forEach((ln, i) => { if (left <= 0) return; txt(ln.slice(0, left), 44, 39 + i * 10.5, 8.5, '#fff'); left -= ln.length + 1; });
      if (EN2.shown >= finalMsg2().length && Math.floor(time * 3) % 2) txt('▼', VW - 44, 112, 7, '#ffd34d');
    } else {
      const S = L2().stats;
      rrect(60, 14, VW - 120, 140, 8, 'rgba(18,16,28,.92)', '#ff8fb1');
      txt('SARCHITECT 2: CALIFORNIA', VW / 2, 20, 13, '#fff', 'center', true, false);
      txt(t('a road trip by C-Real & Sarah'), VW / 2, 37, 7.5, '#ff8fb1', 'center', false, false);
      [t('Postcards: {0}/7', postcardCount()), t('Weird laws broken: {0}/8', lawCount()), t('Busking tips earned: ${0}', S.tips || 0), t('Eggs benedict stacked: {0}', S.benedict || 0),
        t('Banana slugs stepped on: {0}', S.slugs || 0), t('Small talks survived: {0}', S.talk || 0), t('Bottles opened with a shoe: {0}', S.wine || 0), t('Slides down Mt Shasta: {0}  ·  Ice axes lost: {1}', S.falls || 0, S.axesLost || 0)]
        .forEach((r, i) => txt(r, VW / 2, 48 + i * 9.3, 7.5, '#eee', 'center', false, false));
      txt(t('Thanks to Ranger Jay. And the shrimp. 🦐'), VW / 2, 124, 7, '#aaa', 'center', false, false);
      txt(t('[A]: keep exploring'), VW / 2, 138, 7, '#ffd34d', 'center', true, false);
    }
  },
};
// ---------------------------------------------------------------- the Mt Shasta expedition (Avalanche Gulch)
// Vertical climb from Bunny Flat (6,950 ft) to the summit (14,179 ft). Stamina drops with altitude, blue ice
// makes you slip, the Red Banks throw rocks, Misery Hill throws wind. A slip = sliding down the snow until
// you self-arrest with the ice axe (mash A). Too fast and the axe can be ripped away; then go get it.
const SH_LEN = 3400, SH_CAMP = 2300, SH_RED = 1500, SH_MISERY = 650;
const shC = y => 192 + 34 * Math.sin(y / 380) + 14 * Math.sin(y / 150);
const shHW = y => y > SH_CAMP ? 140 : y > SH_RED ? 66 + 14 * Math.sin(y / 90) : y > SH_MISERY ? 118 : 100;
const shFt = y => Math.round(6950 + (1 - clamp(y, 0, SH_LEN) / SH_LEN) * (14179 - 6950));
const shSection = y => y > SH_CAMP ? 'Avalanche Gulch' : y > SH_RED ? 'Red Banks' : y > SH_MISERY ? 'Misery Hill' : 'Summit plateau';
let SH = null;
function startShasta() {
  transition(() => {
    scene = 'shasta'; musI = 0;
    const r = mulberry32(14179), ice = [], fum = [];
    for (let y = 250; y < SH_LEN - 220; y += 70 + r() * 50) if (r() < (y < SH_CAMP ? .7 : .45)) { const hw = shHW(y) - 30; ice.push({ x: shC(y) + (r() * 2 - 1) * hw, y, rx: 14 + r() * 16, ry: 6 + r() * 5 }); }
    for (let i = 0; i < 6; i++) fum.push({ x: shC(300) + (r() * 2 - 1) * 70, y: 260 + r() * 300, r: 18 + r() * 10 });
    SH = { x: 192, y: SH_LEN - 40, cp: SH_LEN - 40, stam: 100, slide: null, axe: true, axeItem: null, arrest: 0, rocks: [], rockT: 2, ice, fum, gustT: 4, gust: 0, warn: 0, gustDir: 1,
      t: 0, snacks: 3, camp: false, sec: 'Avalanche Gulch', done: false, rescue: false, falseSummit: false, dir: 'up', anim: 0, inv: 0 };
    banner = null; popText(VW / 2, 60, t('2:00 AM. Alpine start. 🔦'), '#ffe9a0', 'screen');
  });
}
function shSlip(v0, why) {
  if (SH.slide) return;
  SH.slide = { v: v0, t: 0, risk: false, slam: false }; SH.arrest = 0; statAdd('falls'); sfx.hurt(); shake = .2;
  popText(VW / 2, 70, t(why) + ' ' + t('SLIDING!'), '#ff8a8a', 'screen');
}
function shLoseAxe() {
  SH.axe = false; statAdd('axesLost'); sfx.eww();
  SH.axeItem = { x: shC(SH.y + 260) + (rnd() * 2 - 1) * (shHW(SH.y + 260) - 24), y: Math.min(SH_LEN - 30, SH.y + 160 + rnd() * 220) };
  popText(VW / 2, 90, t('The ice axe got ripped out of your hands! 🪓💨'), '#ffcf6b', 'screen');
}
function onIce(x, y) { return SH.ice.some(i => ((x - i.x) / i.rx) ** 2 + ((y - i.y) / i.ry) ** 2 < 1); }
SCENES.shasta = {
  music: 'interior',
  update(dt) {
    const S = SH;
    if (S.done) { if (inp.a) { S.done = false; say([['Sarah', 'The summit of Mount Shasta. 14,179 feet. I can see... everything.'], ['C-Real', 'You made it!! I came up the other side with the amp. Don\'t ask. 🎸'], ['C-Real', 'One last loop?']], () => { givePostcardSilent('shasta'); startEnding2(); }); } return; }
    if (S.rescue) {
      if (inp.a) { S.rescue = false; S.y = S.cp; S.x = shC(S.y); S.slide = null; S.rocks = []; S.stam = 100; ST.hearts = ST.maxHearts; if (!S.axe) { S.axe = true; S.axeItem = null; } }
      return;
    }
    if (inp.pause) { backToWorld(() => { const j = JAY_SPOTS.trailhead; P.x = j.x; P.y = j.y + 18; }); return; }
    S.t += dt; S.inv = Math.max(0, S.inv - dt);
    const c = shC(S.y), hw = shHW(S.y), minX = c - hw + 8, maxX = c + hw - 8;
    const sec = shSection(S.y);
    if (sec !== S.sec) { S.sec = sec; popText(VW / 2, 50, t(sec), '#ffffff', 'screen'); sfx.bell(); }
    if (!S.camp && S.y < SH_CAMP) { S.camp = true; S.cp = SH_CAMP; S.stam = 100; sfx.ding(); popText(VW / 2, 70, t('Helen Lake camp (10,443 ft): checkpoint ⛺'), '#9fe0a0', 'screen'); }
    if (!S.falseSummit && S.y < 900) { S.falseSummit = true; popText(VW / 2, 70, t('That was NOT the summit. Misery Hill strikes again. 😩'), '#ffffff', 'screen'); }
    if (S.slide) {   // sliding down the snow
      const s = S.slide; s.t += dt;
      if (S.axe) s.v = Math.min(320, s.v + 260 * dt); else s.v = s.t < 1.6 ? Math.min(320, s.v + 260 * dt) : Math.max(0, s.v - 380 * dt);
      S.y = Math.min(SH_LEN - 30, S.y + s.v * dt); S.x = clamp(S.x + inp.ax * 40 * dt + Math.sin(s.t * 7) * 30 * dt, minX, maxX);
      if ((S.x <= minX + .5 || S.x >= maxX - .5) && s.v > 200 && !s.slam) { s.slam = true; ST.hearts--; sfx.bonk(); popText(VW / 2, 110, t('Ouch! Rocks! 🪨'), '#ff8a8a', 'screen'); }
      if (S.axe && inp.a) {
        sfx.scribble();
        if (s.v > 240 && !s.risk) { s.risk = true; if (rnd() < .45) shLoseAxe(); else S.arrest += .2; }
        else S.arrest += .2;
      }
      S.arrest = Math.max(0, S.arrest - .35 * dt);
      if (S.axe && S.arrest >= 1) { S.slide = null; S.arrest = 0; sfx.ding(); popText(VW / 2, 70, t('Self-arrest! 🪓 Phew.'), '#9fe0a0', 'screen'); }
      else if (s.v <= 0 || S.y >= SH_LEN - 30) { S.slide = null; popText(VW / 2, 70, t('...finally stopped.'), '#ffffff', 'screen'); }
    } else {   // climbing
      let ax = inp.ax, ay = inp.ay;
      const thin = 1 + (1 - S.y / SH_LEN) * 1.2, steep = S.y <= SH_CAMP && S.y > SH_RED ? 1.6 : 1;
      if (ay < 0 && S.stam <= 0) ay = 0;
      const upSp = (steep > 1 ? 26 : 34) * (S.axe ? 1 : .55);
      let vx = ax * 46, vy = ay < 0 ? ay * upSp : ay * 58;
      if (S.gust > 0) { S.gust -= dt; if (!(S.axe && inp.aHeld)) vx += S.gustDir * 85; }   // holding A plants the axe
      S.x += vx * dt; S.y = Math.min(SH_LEN - 30, S.y + vy * dt);
      if (S.gust > 0 && (S.x <= minX || S.x >= maxX) && !(S.axe && inp.aHeld)) shSlip(140, 'Blown off your feet!');
      S.x = clamp(S.x, minX, maxX);
      const moving = Math.abs(vx) + Math.abs(vy) > 1;
      if (moving) { S.anim += dt; S.dir = Math.abs(vx) > Math.abs(vy) ? (vx < 0 ? 'left' : 'right') : vy < 0 ? 'up' : 'down'; }
      if (ay < 0) S.stam = Math.max(0, S.stam - dt * 6 * steep * thin); else S.stam = Math.min(100, S.stam + dt * 16 / thin);
      if (ay < 0 && S.stam <= 0 && Math.floor(S.t * 2) % 4 === 0) popText(VW / 2, 120, t('*gasping* ...need a break...'), '#cfe', 'screen');
      if (moving && onIce(S.x, S.y)) shSlip(100, 'Blue ice!');
      if (inp.b) {
        if (S.snacks > 0 && S.stam < 95) { S.snacks--; S.stam = Math.min(100, S.stam + 55); sfx.pick(); popText(VW / 2, 120, t('🍩 Snack break! +stamina'), '#ffe08a', 'screen'); }
        else if (!S.snacks) popText(VW / 2, 120, t('No snacks left! 🎒'), '#fcc', 'screen');
      }
      S.fumT = (S.fumT || 0) - dt;
      if (S.fum.some(f => dist(f.x, f.y, S.x, S.y) < f.r)) {   // sulfur fumaroles near the summit
        S.stam = Math.max(0, S.stam - dt * 14);
        if (S.fumT <= 0) { S.fumT = 4; popText(VW / 2, 130, t('Sulfur! Smells like Hilton eggs. 🥚'), '#e8e0a0', 'screen'); }
      }
      if (S.y <= SH_MISERY + 900) {   // wind on Misery Hill and the summit plateau
        S.gustT -= dt;
        if (S.gustT <= 0 && S.warn <= 0 && S.gust <= 0) { S.warn = 1; S.gustDir = rnd() < .5 ? -1 : 1; popText(VW / 2, 100, t('💨 GUST INCOMING! Hold [A] to plant your axe!'), '#bfe3ff', 'screen'); }
        if (S.warn > 0) { S.warn -= dt; if (S.warn <= 0) { S.gust = 1.3; S.gustT = 3.5 + rnd() * 3; noise(1.2, .15, 400); } }
      }
      if (S.axeItem && dist(S.x, S.y, S.axeItem.x, S.axeItem.y) < 16) { S.axe = true; S.axeItem = null; sfx.ding(); popText(VW / 2, 90, t('Got the ice axe back! 🪓 Leash it next time.'), '#9fe0a0', 'screen'); }
      if (S.y < 45) { S.done = true; sfx.ding(); }
    }
    // rockfall
    S.rockT -= dt;
    if (S.rockT <= 0) {
      S.rockT = S.y <= SH_CAMP + 250 && S.y > SH_RED - 150 ? .9 + rnd() * .5 : 3.5 + rnd() * 2;
      const top = clamp(S.y - 130, 0, SH_LEN - VH) - 20;
      S.rocks.push({ x: shC(top) + (rnd() * 2 - 1) * (shHW(top) - 12), y: top, vy: 150 + rnd() * 90, vx: (rnd() - .5) * 40, r: 4 + rnd() * 3, rot: 0 });
      if (rnd() < .5) popText(VW / 2, 30, t('ROCK! 🪨'), '#ffb070', 'screen');
    }
    for (const k of S.rocks) {
      k.y += k.vy * dt; k.x += k.vx * dt; k.rot += dt * 8;
      if (!k.hit && S.inv <= 0 && dist(k.x, k.y, S.x, S.y - 8) < k.r + 6) { k.hit = true; S.inv = 1; sfx.bonk(); popText(VW / 2, 110, t('CLONK! Good thing you wear a helmet. ⛑️'), '#ffcf6b', 'screen'); shSlip(130, ''); }
    }
    S.rocks = S.rocks.filter(k => k.y < S.y + 260 && !k.hit);
    if (ST.hearts <= 0) { S.rescue = true; S.slide = null; sfx.alarm(); }
  },
  draw() {
    const S = SH, camY = clamp(S.y - 130, 0, SH_LEN - VH);
    g.fillStyle = '#e8eef6'; g.fillRect(0, 0, VW, VH);
    for (let sy = 0; sy < VH; sy += 2) {
      const y = camY + sy, c = shC(y), hw = shHW(y), red = y <= SH_CAMP && y > SH_RED;
      const rock = red ? ((y >> 3) % 2 ? '#a0503a' : '#b25e44') : ((y >> 3) % 2 ? '#5a5048' : '#665a50');
      R(0, sy, c - hw, 2, rock); R(c + hw, sy, VW - c - hw, 2, rock);
      R(c - hw, sy, hw * 2, 2, (y >> 4) % 2 ? '#f4f8fc' : '#eef3f9');
      if (hash(y >> 1, 5) % 7 === 0) R(c - hw + hash(y, 9) % (hw * 2), sy, 4, 1, '#dde7f2');
    }
    g.save(); g.translate(0, -camY);
    for (const i of S.ice) if (i.y > camY - 30 && i.y < camY + VH + 30) { ell(i.x, i.y, i.rx, i.ry, '#bfe4ff'); ell(i.x - i.rx * .3, i.y - i.ry * .3, i.rx * .4, i.ry * .3, '#e8f6ff'); }
    for (const f of S.fum) { const a = .35 + .15 * Math.sin(time * 2 + f.x); ell(f.x, f.y - 6, f.r, f.r * .6, `rgba(232,224,150,${a})`); }
    if (SH_CAMP > camY - 40 && SH_CAMP < camY + VH + 40) { poly([[150, SH_CAMP + 6], [162, SH_CAMP - 8], [174, SH_CAMP + 6]], '#e8743a'); poly([[214, SH_CAMP + 6], [226, SH_CAMP - 8], [238, SH_CAMP + 6]], '#3a8ad8'); ell(192, SH_CAMP + 14, 22, 5, '#9ac8e8'); }
    if (900 > camY - 40 && 900 < camY + VH) { R(shC(900) + 40, 880, 2, 20, '#6b4a2a'); R(shC(900) + 30, 874, 24, 10, '#c4955a'); }
    if (camY < 80) { R(shC(30) - 1, 14, 2, 22, '#ddd'); R(shC(30) + 1, 14, 12, 8, '#d52b1e'); R(shC(30) + 5, 15, 3, 6, '#fff'); R(shC(30) + 3, 17, 7, 2, '#fff'); R(shC(30) - 10, 30, 8, 6, '#8a8a8a'); }
    if (S.axeItem) { const a = S.axeItem, bl = Math.floor(time * 4) % 2; R(a.x - 1, a.y - 10, 2, 12, '#8a5a2a'); R(a.x - 5, a.y - 11, 10, 2, '#b8b8c0'); if (bl) ell(a.x, a.y - 4, 10, 10, 'rgba(255,220,80,.25)'); }
    for (const k of S.rocks) { ell(k.x, k.y + 4, k.r, 2, 'rgba(0,0,0,.2)'); circ(k.x, k.y, k.r, '#6a625a'); circ(k.x - 1, k.y - 1, k.r * .5, '#8a827a'); }
    // Sarah with helmet & backpack (or sliding on her back)
    if (S.slide) {
      g.save(); g.translate(S.x, S.y - 6); g.rotate(Math.PI); drawSarah(0, 8, 'down', 0, 0, false, false); g.restore();
      for (let i = 0; i < 6; i++) R(S.x - 8 + hash(i, (time * 30) | 0) % 16, S.y - 18 - hash(i + 9, (time * 30) | 0) % 14, 2, 2, '#ffffff');
      if (S.axe) { R(S.x + 5, S.y - 4, 1, 9, '#8a5a2a'); R(S.x + 3, S.y + 4, 5, 1, '#b8b8c0'); }
    } else {
      if (S.inv > 0 && Math.floor(S.inv * 12) % 2) { /* blink */ } else {
        drawSarah(S.x, S.y, S.dir, S.anim, 0, false, inp.ax !== 0 || inp.ay !== 0);
        if (S.dir === 'up') R(S.x - 4, S.y - 12, 8, 7, '#3a6a3a'); else R(S.x + (S.dir === 'left' ? 2 : -6), S.y - 11, 3, 6, '#3a6a3a');
        R(S.x - 4, S.y - 20, 8, 3, '#f2b632'); R(S.x - 3, S.y - 21, 6, 1, '#f2b632');
        if (S.axe) { const hold = S.gust > 0 && inp.aHeld; R(S.x + 5, S.y - 10 + (hold ? 4 : 0), 1, 9, '#8a5a2a'); R(S.x + 3, S.y - 11 + (hold ? 4 : 0), 5, 1, '#b8b8c0'); }
        if (S.gust > 0) for (let i = 0; i < 8; i++) R(((hash(i, 3) + time * 300 * S.gustDir) % VW + VW) % VW, camY + 20 + hash(i, 4) % 180, 14, 1, 'rgba(255,255,255,.7)');
      }
    }
    g.restore();
    // pre-dawn darkness with a headlamp cone (the alpine start), brightening towards sunrise
    const dark = clamp((S.y - 1700) / 1700, 0, .8);
    if (dark > 0) { const sx = S.x, sy = S.y - camY - 10, gr = g.createRadialGradient(sx, sy - 20, 10, sx, sy - 20, 120); gr.addColorStop(0, 'rgba(10,15,40,0)'); gr.addColorStop(1, `rgba(10,15,40,${dark})`); g.fillStyle = gr; g.fillRect(0, 0, VW, VH); }
    else if (S.y < 1700) { g.fillStyle = `rgba(255,170,120,${clamp((S.y - 600) / 3000, 0, .12)})`; g.fillRect(0, 0, VW, VH); }
  },
  ui() {
    const S = SH;
    rrect(4, 4, 150, 46, 5, 'rgba(10,10,20,.55)');
    txt(t('{0} ft', shFt(S.y).toLocaleString('en-US')) + '  ·  ' + t(S.sec), 9, 7, 7.5, '#fff', 'left', true);
    rrect(9, 19, 100, 6, 3, 'rgba(255,255,255,.25)'); rrect(9, 19, S.stam, 6, 3, S.stam < 25 ? '#ff6a6a' : '#7ee081'); txt(t('stamina'), 112, 18, 6, '#ddd', 'left', false);
    let s = ''; for (let i = 0; i < ST.maxHearts; i++) s += i < ST.hearts ? '❤' : '·';
    txt(s + `   🍩 x${S.snacks}   ` + (S.axe ? '⛏️' : '⛏️❌'), 9, 30, 7.5, '#ffb3c8', 'left', true);
    if (S.t < 6 && !S.slide) txt(t('▲ climb · ◀ ▶ traverse · B: snack · avoid blue ice & rocks · Esc: retreat'), VW / 2, 202, 7, '#fff', 'center', true);
    if (S.slide) {
      txt(S.axe ? t('SLIDING! Mash [A] to self-arrest!') : t('No ice axe... just slide. 😱'), VW / 2, 150, 11, '#ff6a6a', 'center', true);
      if (S.axe) { rrect(VW / 2 - 50, 166, 100, 6, 3, 'rgba(0,0,0,.35)'); rrect(VW / 2 - 50, 166, 100 * Math.min(1, S.arrest), 6, 3, '#7ee081'); }
    } else if (!S.axe) txt(t('Your ice axe is somewhere below you ↓  (climbing is slow without it)'), VW / 2, 190, 7.5, '#ffcf6b', 'center', true);
    if (S.warn > 0) txt('💨 ' + t('GUST!'), VW / 2, 60, 14, '#bfe3ff', 'center', true);
    if (S.rescue) { panelUI(50, 90); txt(t('Rescued by Ranger Jay! 🚁'), VW / 2, 60, 12, '#ffd34d', 'center', true, false); txt(t('He found your ice axe, too. Back to your last camp.'), VW / 2, 84, 7.5, '#fff', 'center', false, false); txt(t('[A]: try again'), VW / 2, 118, 8, '#ffd34d', 'center', true, false); }
    if (S.done) { panelUI(50, 80); txt(t('SUMMIT! 14,179 ft 🏔'), VW / 2, 60, 14, '#ffd34d', 'center', true, false); txt(t('[A]: continue'), VW / 2, 104, 8, '#ffd34d', 'center', true, false); }
    screenParts();
  },
};

// ---------------------------------------------------------------- glissading down (the fun part)
const GL_LEN = 4200;
const glC = d => 192 + 60 * Math.sin(d / 300) + 25 * Math.sin(d / 110 + 2);
let GL = null;
function startGlissade() {
  transition(() => {
    scene = 'glissade'; musI = 0;
    const r = mulberry32(6950), rocks = [];
    for (let d = 400; d < GL_LEN - 200; d += 70 + r() * 90) rocks.push({ d, off: (r() * 2 - 1) * 55, r: 5 + r() * 4 });
    GL = { d: 0, v: 90, x: glC(0), t: 0, fast: 0, tumble: 0, rocks, axe: !SH || SH.axe, done: false, hits: 0 };
  });
}
SCENES.glissade = {
  music: 'slide',
  update(dt) {
    const G = GL;
    if (G.done) { if (inp.a) backToWorld(() => { const j = JAY_SPOTS.trailhead; P.x = j.x; P.y = j.y + 18; say([['C-Real', 'Glissading is the BEST part. Best day ever? Best day ever. ❤'], ['Sarah', G.axe ? 'And I still have my ice axe!' : 'We\'ll find the ice axe in spring. Probably.']], saveGame); }); return; }
    G.t += dt; G.tumble = Math.max(0, G.tumble - dt);
    G.v = Math.min(360, G.v + 150 * dt);
    if (inp.aHeld && G.axe && G.tumble <= 0) {
      G.v = Math.max(40, G.v - 330 * dt); if (Math.floor(G.t * 10) % 2) sfx.scribble();
      if (G.v > 270 && rnd() < dt * 1.4) { G.axe = false; statAdd('axesLost'); sfx.eww(); popText(VW / 2, 80, t('Your ice axe! 🪓💨 Bye bye...'), '#ffcf6b', 'screen'); }
    }
    G.fast = G.v > 330 ? G.fast + dt : 0;
    if (G.fast > 1.1) { G.fast = 0; G.tumble = 1; G.v = 110; G.hits++; sfx.bonk(); shake = .3; popText(VW / 2, 80, t('TOO FAST! Tumble! ❄️'), '#ff8a8a', 'screen'); }
    if (G.tumble <= 0) G.x += inp.ax * 150 * dt;
    const c = glC(G.d); G.x = clamp(G.x, c - 72, c + 72);
    G.d += G.v * dt;
    for (const k of G.rocks) if (!k.hit && Math.abs(k.d - G.d) < 8 && Math.abs(glC(k.d) + k.off - G.x) < k.r + 6) { k.hit = true; G.tumble = .8; G.v *= .5; G.hits++; sfx.bonk(); popText(VW / 2, 80, t('Rock! Ouch! 🪨'), '#ff8a8a', 'screen'); }
    if (G.d >= GL_LEN) { G.done = true; sfx.ding(); }
  },
  draw() {
    const G = GL, py = 60;
    g.fillStyle = '#5a5048'; g.fillRect(0, 0, VW, VH);
    for (let sy = 0; sy < VH; sy += 2) {
      const d = G.d + (sy - py), c = glC(d);
      R(c - 80, sy, 160, 2, (Math.floor(d / 16) % 2) ? '#f4f8fc' : '#eaf0f7');
      R(c - 84, sy, 4, 2, '#cfdcea'); R(c + 80, sy, 4, 2, '#cfdcea');
      if (d > GL_LEN * .75 && hash(Math.floor(d / 40), 2) % 3 === 0 && sy % 40 === 0) { g.drawImage(OVER[T.PINE][0], c - 110, sy - 8); g.drawImage(OVER[T.PINE][1], c + 94, sy - 8); }
    }
    for (const k of G.rocks) { if (k.hit) continue; const sy = py + (k.d - G.d); if (sy > -10 && sy < VH + 10) { const x = glC(k.d) + k.off; circ(x, sy, k.r, '#6a625a'); circ(x - 1, sy - 1, k.r * .5, '#8a827a'); } }
    g.save(); g.translate(Math.round(G.x), py); if (G.tumble > 0) g.rotate(G.t * 14);
    drawSarah(0, 6, 'down', 0, 0, false, false); R(-4, -14, 8, 3, '#f2b632');
    if (G.axe && inp.aHeld) { R(6, -2, 1, 9, '#8a5a2a'); R(4, 6, 5, 1, '#b8b8c0'); }
    g.restore();
    for (let i = 0; i < 5; i++) R(G.x - 8 + hash(i, (time * 25) | 0) % 16, py - 14 - hash(i + 4, (time * 25) | 0) % (6 + G.v / 30), 2, 2, '#ffffff');
  },
  ui() {
    const G = GL;
    rrect(4, 4, 150, 34, 5, 'rgba(10,10,20,.55)');
    txt(t('{0} ft', shFt((1 - G.d / GL_LEN) * SH_LEN).toLocaleString('en-US')) + '   ' + Math.round(G.v / 8) + ' mph', 9, 7, 8, '#fff', 'left', true);
    rrect(9, 21, 140, 5, 2, 'rgba(255,255,255,.25)'); rrect(9, 21, 140 * Math.min(1, G.d / GL_LEN), 5, 2, '#ff6fa8');
    txt(G.axe ? '⛏️' : '⛏️❌', VW - 10, 8, 10, '#fff', 'right');
    if (G.t < 4) txt(t('GLISSADE! ← → steer · hold [A] to brake with the axe (not too hard at full speed!)'), VW / 2, 200, 7, '#fff', 'center', true);
    if (G.fast > .3) txt(t('Too fast! Brake!'), VW / 2, 150, 11, '#ff6a6a', 'center', true);
    if (G.done) { panelUI(50, 80); txt(t('Bunny Flat! What a ride. ❄️'), VW / 2, 62, 12, '#ffd34d', 'center', true, false); txt(t('[A]: continue'), VW / 2, 104, 8, '#ffd34d', 'center', true, false); }
    screenParts();
  },
};

// ================================================================ translations [English, Deutsch, Schwiizerdütsch]
addTR([
  // signs & zones
  ["CARMEL-BY-THE-SEA. Charming. Very charming. Suspiciously charming.", "CARMEL-BY-THE-SEA. Charmant. Sehr charmant. Verdächtig charmant.", "CARMEL-BY-THE-SEA. Herzig. Sehr herzig. Verdächtig herzig."],
  ["PACIFIC GROVE — \"Butterfly Town, USA\". Please do not disturb the monarch butterflies.", "PACIFIC GROVE — \"Butterfly Town, USA\". Bitte die Monarchfalter nicht stören.", "PACIFIC GROVE — \"Butterfly Town, USA\". Bitte d Monarchfalter nöd störe."],
  ["I would never. ...unless I accidentally rope skip.", "Würde ich nie. ...ausser ich springe aus Versehen Seil.", "Würd ich nie. ...ussert ich gump us Versehe Seil."],
  ["ELEPHANT SEAL VISTA. Do not approach. They are 2 tons of attitude.", "SEE-ELEFANTEN-AUSSICHT. Nicht nähern. Das sind 2 Tonnen Attitüde.", "SEE-ELEFANTE-USSICHT. Nöd nöcher cho. Das sind 2 Tonne Attitüde."],
  ["Frog contest", "Froschwettbewerb", "Froschwettbewerb"],
  ["SEQUOIA NATIONAL PARK — entrance permit required. Ask Ranger Jay at the station.", "SEQUOIA NATIONAL PARK — Eintrittsbewilligung erforderlich. Frag Ranger Jay bei der Station.", "SEQUOIA NATIONAL PARK — Iitrittsbewilligung nötig. Frog de Ranger Jay bi de Station."],
  ["REDWOODS — Keep it crumb clean! Steller's jays raid the nests of the endangered marbled murrelet.", "REDWOODS — Keine Krümel liegen lassen! Diademhäher plündern die Nester des bedrohten Marmelalks.", "REDWOODS — Kei Brösmeli ligge lah! Diademhäher plündered d Näscht vom bedrohte Marmelalk."],
  ["San Francisco", "San Francisco", "San Francisco"], ["Redwood Forest", "Redwood-Wald", "Redwood-Wald"], ["Mount Shasta", "Mount Shasta", "Mount Shasta"], ["Central Valley", "Central Valley", "Central Valley"], ["Big Sur", "Big Sur", "Big Sur"], ["Sequoia National Park", "Sequoia-Nationalpark", "Sequoia-Nationalpark"],
  ["Redwoods! 🌲 Watch for banana slugs, and keep your camp crumb clean.", "Redwoods! 🌲 Achte auf Bananenschnecken und lass keine Krümel liegen.", "Redwoods! 🌲 Lueg uf d Bananeschnägge und lah kei Brösmeli ligge."],
  ["Mt Shasta! 🏔 You'll need a summit pass from Ranger Jay.", "Mt Shasta! 🏔 Du brauchst einen Gipfelpass von Ranger Jay.", "Mt Shasta! 🏔 Du bruuchsch en Gipfelpass vom Ranger Jay."],
  ["Central Valley: cows, almonds and a Burger King with... deer? 🦌", "Central Valley: Kühe, Mandeln und ein Burger King mit... Rehen? 🦌", "Central Valley: Chüe, Mandle und en Burger King mit... Reh? 🦌"],
  ["Big Sur! 🌊 Surf, elephant seals and the most beautiful road in the world.", "Big Sur! 🌊 Surfen, See-Elefanten und die schönste Strasse der Welt.", "Big Sur! 🌊 Surfe, See-Elefante und di schönscht Strass vo de Wält."],
  ["Sequoias! The biggest trees on Earth. Hold on to your donuts. 🐿️", "Mammutbäume! Die grössten Bäume der Erde. Halt deine Donuts fest. 🐿️", "Mammutbäum! Di gröschte Bäum vo de Wält. Heb dini Donuts guet fescht. 🐿️"],
  // C-Real texts
  ["Did you know the Chev has 8 cupholders? I counted. Twice. 🚙", "Wusstest du, dass der Chev 8 Becherhalter hat? Ich hab gezählt. Zweimal. 🚙", "Hesch gwüsst, dass de Chev 8 Becherhalter het? Ich ha zellt. Zweimal. 🚙"],
  ["Union Square crowd is great today! Come get some busking money. 🎸", "Das Publikum am Union Square ist heute super! Komm, verdien dir Strassenmusik-Geld. 🎸", "S Publikum am Union Square isch hüt super! Chumm go Strassemusig-Gäld verdiene. 🎸"],
  ["Ranger Jay says hi. He also says \"don't feed the squirrels\". He says it a lot.", "Ranger Jay lässt grüssen. Er sagt auch \"Eichhörnchen nicht füttern\". Er sagt das oft.", "De Ranger Jay lat grüesse. Er seit au \"Eichhörnli nöd füetere\". Er seit das vill."],
  ["Craving eggs benedict. NOT from the Hilton. 🍳", "Lust auf Eggs Benedict. NICHT vom Hilton. 🍳", "Lust uf Eggs Benedict. NÖD vom Hilton. 🍳"],
  ["Fun fact: redwoods are the tallest trees on Earth. Sequoias are the biggest. Shrimp: unknown.", "Fun Fact: Redwoods sind die höchsten Bäume der Erde. Mammutbäume die grössten. Crevetten: unbekannt.", "Fun Fact: Redwoods sind di höchschte Bäum vo de Wält. Mammutbäum di gröschte. Crevette: unbekannt."],
  ["Remember to say \"awesome\" at least 40 times a day here.", "Denk dran, hier mindestens 40 Mal am Tag \"awesome\" zu sagen.", "Dänk dra, da mindeschtens 40 Mal am Tag \"awesome\" z säge."],
  ["I looped your laugh into a song. It's my best track. ❤", "Ich habe dein Lachen in einen Song geloopt. Mein bester Track. ❤", "Ich ha dis Lache in en Song gloopt. Min beschte Track. ❤"],
  ["Saw deer at the Burger King drive-through again. They never order anything.", "Schon wieder Rehe im Burger-King-Drive-through gesehen. Die bestellen nie etwas.", "Scho wieder Reh im Burger-King-Drive-through gseh. Die bstelled nie öppis."],
  // world
  ["A squirrel stole a donut! 🐿️", "Ein Eichhörnchen hat einen Donut geklaut! 🐿️", "Es Eichhörnli het en Donut gchlaut! 🐿️"],
  ["Eww! A banana slug! So slimy...", "Igitt! Eine Bananenschnecke! So schleimig...", "Gruusig! E Bananeschnägg! So schliimig..."],
  ["Banana slugs! 🐌 They're the UC Santa Cruz mascot. Jump ([A]) over them!", "Bananenschnecken! 🐌 Sie sind das Maskottchen der UC Santa Cruz. Spring ([A]) drüber!", "Bananeschnägge! 🐌 Si sind s Maskottli vo de UC Santa Cruz. Gump ([A]) drüber!"],
  ["Vroom! 🚙", "Brumm! 🚙", "Brumm! 🚙"], ["No car keys yet!", "Noch keine Autoschlüssel!", "No kei Autoschlüssel!"], ["The Chev is parked somewhere else.", "Der Chev steht woanders.", "De Chev staht nöd da."],
  ["Drive", "Fahren", "Fahre"], ["Jam! 🎸", "Jammen! 🎸", "Jamme! 🎸"], ["Feed pigeons", "Tauben füttern", "Tube füetere"], ["Feed", "Füttern", "Füetere"], ["Small talk", "Smalltalk", "Smalltalk"],
  ["Campfire", "Lagerfeuer", "Lagerfüür"], ["Open wine", "Wein öffnen", "Wii uftue"], ["Order", "Bestellen", "Bstelle"], ["Summit!", "Gipfel!", "Gipfel!"],
  ["Breakfast", "Frühstück", "Zmorge"], ["Sneak in", "Reinschleichen", "Ineschliiche"], ["Buy donuts", "Donuts kaufen", "Donuts chaufe"], ["Climb up", "Hochklettern", "Uechechlättere"], ["Surf!", "Surfen!", "Surfe!"], ["Campsite", "Zeltplatz", "Zältplatz"], ["Climb", "Klettern", "Chlättere"],
  ["[A]: talk · interact · rope skip", "[A]: reden · interagieren · seilspringen", "[A]: rede · mache · seilgumpe"], ["B: get in / out of the black Chev", "B: ein- / aussteigen beim schwarzen Chev", "B: ii- / usstiige bim schwarze Chev"],
  ["Book (Tab, Q): postcards & weird laws", "Buch (Tab, Q): Postkarten & verrückte Gesetze", "Buech (Tab, Q): Poschtcharte & verruckti Gsetz"], ["Collect 7 postcards. Earn $ busking.", "Sammle 7 Postkarten. Verdien $ mit Strassenmusik.", "Sammle 7 Poschtcharte. Verdien $ mit Strassemusig."],
  ["Dodge slugs, seals and wildfires.", "Weich Schnecken, Robben und Waldbränden aus.", "Wiich Schnägge, Robbe und Waldbränd us."], ["Ranger Jay is your friend. 🌲", "Ranger Jay ist dein Freund. 🌲", "De Ranger Jay isch din Fründ. 🌲"],
  // postcards
  ["Hilton San Francisco (sort of)", "Hilton San Francisco (so ungefähr)", "Hilton San Francisco (so öppe)"], ["in San Francisco", "in San Francisco", "z San Francisco"],
  ["Toasted English muffin, ham, a poached egg and hollandaise. Sarah's version: architecturally sound. The hotel's: structurally questionable.", "Getoasteter English Muffin, Schinken, ein pochiertes Ei und Hollandaise. Sarahs Version: architektonisch solide. Die vom Hotel: statisch fragwürdig.", "Toaschtete English Muffin, Schinke, es pochierts Ei und Hollandaise. D Version vo de Sarah: architektonisch solid. Die vom Hotel: statisch fraglich."],
  ["The Office Slide", "Die Büro-Rutschbahn", "D Büro-Rutschbahn"], ["Google office", "Google-Büro", "Google-Büro"],
  ["Tech offices love slides between floors. Finally, a building that truly understands Sarah.", "Tech-Büros lieben Rutschbahnen zwischen den Stockwerken. Endlich ein Gebäude, das Sarah wirklich versteht.", "Tech-Büros liebed Rutschbahne zwüsche de Stöck. Ändlich es Gebäud, wo d Sarah würkli versteht."],
  ["Marbled Murrelet", "Marmelalk", "Marmelalk"], ["in the Redwood Forest", "im Redwood-Wald", "im Redwood-Wald"],
  ["This little seabird nests high up in old-growth redwoods. Steller's jays raid its nests, so keep your campsite crumb clean!", "Dieser kleine Seevogel nistet hoch oben in uralten Redwoods. Diademhäher plündern seine Nester, also lass am Zeltplatz keine Krümel liegen!", "Dä chlii Seevogel nischtet höch obe i uralte Redwoods. Diademhäher plündered sini Näscht, also lah am Zältplatz kei Brösmeli ligge!"],
  ["Surf's Up", "Surf's Up", "Surf's Up"], ["Big Sur coast", "Küste von Big Sur", "Chüschte vo Big Sur"], ["in Big Sur", "in Big Sur", "z Big Sur"],
  ["Cold Pacific water, kelp forests, and elephant seals who do NOT share their waves.", "Kaltes Pazifikwasser, Kelpwälder und See-Elefanten, die ihre Wellen NICHT teilen.", "Chalts Pazifikwasser, Kelpwälder und See-Elefante, wo ihri Wälle NÖD teiled."],
  ["Shrimp in a Sequoia", "Crevette im Mammutbaum", "Crevette im Mammutbaum"], ["in Sequoia National Park", "im Sequoia-Nationalpark", "im Sequoia-Nationalpark"],
  ["Giant sequoias are the largest trees on Earth by volume. Why a shrimp in sunglasses lives at the top is a question for science.", "Riesenmammutbäume sind die volumenmässig grössten Bäume der Erde. Warum eine Crevette mit Sonnenbrille oben wohnt, ist eine Frage für die Wissenschaft.", "Riesemammutbäum sind vom Volume her di gröschte Bäum vo de Wält. Wieso e Crevette mit Sunnebrülle obe wohnt, isch e Frog für d Wüsseschaft."],
  ["Big Sur Wildfire", "Waldbrand in Big Sur", "Waldbrand z Big Sur"], ["Highway 1 evacuation", "Evakuierung über den Highway 1", "Evakuierig über de Highway 1"], ["south of Big Sur", "südlich von Big Sur", "südlich vo Big Sur"],
  ["Wildfires are part of California life. Follow the rangers, keep the tank full, and never stop for selfies.", "Waldbrände gehören zu Kalifornien. Folge den Rangern, halte den Tank voll und halte nie für Selfies an.", "Waldbränd ghöred zu Kalifornie. Folg de Ranger, heb de Tank voll und halt nie für Selfies aa."],
  ["14,179 ft volcano", "4322 m hoher Vulkan", "4322 m höche Vulkan"], ["on Mount Shasta", "auf dem Mount Shasta", "uf em Mount Shasta"],
  ["A lonely giant volcano you can see from 100 miles away. Above 10,000 ft you need a summit pass. And a looper pedal, apparently.", "Ein einsamer Riesenvulkan, den man aus 160 km Entfernung sieht. Über 3000 m brauchst du einen Gipfelpass. Und offenbar ein Looper-Pedal.", "En einsame Riesevulkan, wo me us 160 km gseht. Über 3000 m bruuchsch en Gipfelpass. Und offebar es Looper-Pedal."],
  // weird laws
  ["No sleeping in bars", "Kein Schlafen in Bars", "Kei Schlafe i Bars"], ["California weird law: it's illegal to sleep in a bar.", "Verrücktes Gesetz in Kalifornien: Es ist verboten, in einer Bar zu schlafen.", "Verrückts Gsetz z Kalifornie: Es isch verbote, imene Bar z schlafe."],
  ["What can I get you?", "Was darf's sein?", "Was dörfs si?"], ["Honestly? Just a little nap. Jetlag...", "Ehrlich? Nur ein kleines Nickerchen. Jetlag...", "Ehrlich? Nur es chliises Nickerli. Jetlag..."],
  ["Ma'am! WAKE UP. Sleeping in a bar is against the law!", "Ma'am! AUFWACHEN. Schlafen in einer Bar ist verboten!", "Ma'am! UFWACHE. Schlafe imene Bar isch verbote!"],
  ["Don't feed the pigeons", "Tauben nicht füttern", "Tube nöd füetere"], ["San Francisco: feeding pigeons on the street is prohibited.", "San Francisco: Tauben auf der Strasse zu füttern ist verboten.", "San Francisco: Tube uf de Strass füetere isch verbote."],
  ["Here you go, little guys! 🍩", "Bitte schön, ihr Kleinen! 🍩", "Da händ er, ihr Chliine! 🍩"], ["Ma'am, feeding pigeons is illegal in San Francisco.", "Ma'am, Tauben füttern ist in San Francisco illegal.", "Ma'am, Tube füetere isch z San Francisco illegal."],
  ["...even the cute one?", "...auch die süsse?", "...au di herzig?"], ["ESPECIALLY the cute one.", "BESONDERS die süsse.", "BSUNDERS di herzig."],
  ["High heel permit", "High-Heel-Bewilligung", "High-Heel-Bewilligung"], ["Carmel-by-the-Sea: heels over 2 inches require a (free) permit.", "Carmel-by-the-Sea: Absätze über 5 cm brauchen eine (gratis) Bewilligung.", "Carmel-by-the-Sea: Absätz über 5 cm bruuched e (gratis) Bewilligung."],
  ["Ma'am! Are those heels over two inches?", "Ma'am! Sind diese Absätze höher als fünf Zentimeter?", "Ma'am! Sind die Absätz höcher als füf Zentimeter?"], ["These are hiking boots.", "Das sind Wanderschuhe.", "Das sind Wanderschue."],
  ["...They have a heel. Here's your free high-heel permit. Welcome to Carmel!", "...Sie haben einen Absatz. Hier ist Ihre kostenlose High-Heel-Bewilligung. Willkommen in Carmel!", "...Si händ en Absatz. Da isch Ihri gratis High-Heel-Bewilligung. Willkomme z Carmel!"],
  ["Leave the monarchs alone", "Lass die Monarchfalter in Ruhe", "Lah d Monarchfalter in Rueh"], ["Pacific Grove: harassing monarch butterflies can cost $1,000.", "Pacific Grove: Monarchfalter zu belästigen kann 1000 $ kosten.", "Pacific Grove: Monarchfalter plage chan 1000 $ choschte."],
  ["MA'AM. Did you just rope skip at the monarch butterflies?!", "MA'AM. Sind Sie gerade neben den Monarchfaltern seilgesprungen?!", "MA'AM. Sind Si grad näb de Monarchfalter Seil gumpet?!"], ["I was skipping NEAR them. Respectfully.", "Ich bin NEBEN ihnen gesprungen. Respektvoll.", "Ich bi NÄB ene gumpet. Respektvoll."],
  ["That's up to a $1,000 fine in Pacific Grove!", "Das kostet in Pacific Grove bis zu 1000 $ Busse!", "Das choschtet z Pacific Grove bis 1000 $ Buess!"], ["...first offence. Warning. Please skip elsewhere.", "...erstes Vergehen. Verwarnung. Bitte woanders springen.", "...s erscht Mal. Verwarnig. Bitte anderschwo gumpe."],
  ["Contest frogs are not food", "Wettkampffrösche sind kein Essen", "Wettkampffrösch sind kei Ässe"], ["California: a frog that dies in a frog-jumping contest may not be eaten.", "Kalifornien: Ein Frosch, der bei einem Froschsprung-Wettbewerb stirbt, darf nicht gegessen werden.", "Kalifornie: En Frosch, wo bimene Froschgump-Wettbewerb stirbt, darf me nöd ässe."],
  ["Welcome to the frog-jumping contest! This is Kermit Jr., retired champion.", "Willkommen beim Froschsprung-Wettbewerb! Das ist Kermit Jr., Champion im Ruhestand.", "Willkomme bim Froschgump-Wettbewerb! Das isch de Kermit Jr., pensionierte Champion."],
  ["He looks... very relaxed. Can I eat him? Asking for a Frenchman.", "Er sieht... sehr entspannt aus. Darf ich ihn essen? Frage für einen Franzosen.", "Er gseht... sehr entspannt us. Dörf ich ne ässe? Frog für en Franzos."],
  ["MA'AM. It is literally illegal to eat a contest frog!", "MA'AM. Es ist buchstäblich verboten, einen Wettkampffrosch zu essen!", "MA'AM. Es isch wörtlich verbote, en Wettkampffrosch z ässe!"],
  ["Don't feed the wildlife", "Wildtiere nicht füttern", "Wildtier nöd füetere"], ["National parks: feeding wildlife is illegal. Yes, even cute squirrels.", "Nationalparks: Wildtiere füttern ist verboten. Ja, auch süsse Eichhörnchen.", "Nationalpärk: Wildtier füetere isch verbote. Ja, au herzigi Eichhörnli."],
  ["Who wants a donut? 🍩🐿️", "Wer will einen Donut? 🍩🐿️", "Wer wott en Donut? 🍩🐿️"], ["*appears from behind a sequoia* Ma'am, feeding wildlife is against park rules.", "*taucht hinter einem Mammutbaum auf* Ma'am, Wildtiere füttern verstösst gegen die Parkregeln.", "*chunnt hinderemene Mammutbaum füre* Ma'am, Wildtier füetere isch gäge d Parkregle."],
  ["Campfire permit", "Lagerfeuer-Bewilligung", "Lagerfüür-Bewilligung"], ["You need a campfire permit to light a fire outside official campgrounds.", "Ausserhalb offizieller Zeltplätze brauchst du eine Bewilligung für ein Lagerfeuer.", "Usserhalb vo offizielle Zältplätz bruuchsch e Bewilligung fürs Lagerfüür."],
  ["Free camping AND a cozy campfire. 🔥", "Gratis campen UND ein gemütliches Lagerfeuer. 🔥", "Gratis campe UND es gmüetlichs Lagerfüür. 🔥"],
  ["Evening! Free camping's fine here... but no campfire without a permit. It's fire season.", "Guten Abend! Gratis campen ist hier okay... aber kein Lagerfeuer ohne Bewilligung. Es ist Waldbrandsaison.", "Guete Abig! Gratis campe isch da okay... aber kei Lagerfüür ohni Bewilligung. Es isch Waldbrandsaison."],
  ["No wine on the beach", "Kein Wein am Strand", "Kei Wii am Strand"], ["Many California beaches ban open alcohol containers.", "An vielen Stränden Kaliforniens sind offene Alkoholflaschen verboten.", "A vill Strände z Kalifornie sind offeni Alkoholflasche verbote."],
  ["Sunset, the Pacific and a nice red. Perfect. 🍷", "Sonnenuntergang, der Pazifik und ein schöner Roter. Perfekt. 🍷", "Sunneundergang, de Pazifik und en feine Rote. Perfekt. 🍷"], ["Ma'am! No open containers on this beach.", "Ma'am! Keine offenen Flaschen an diesem Strand.", "Ma'am! Kei offeni Flasche a dem Strand."],
  ["I'll let it slide this time. Leave no trace! 😉", "Dieses Mal drücke ich ein Auge zu. Hinterlass keine Spuren! 😉", "Das Mal drück ich es Aug zue. Hinderlah kei Spure! 😉"],
  ["That's a ${0} fine, ma'am.", "Das macht ${0} Busse, Ma'am.", "Das git ${0} Buess, Ma'am."], ["*pays* ...worth it.", "*zahlt* ...hat sich gelohnt.", "*zahlt* ...het sich glohnt."],
  ["I only have Swiss chocolate.", "Ich habe nur Schweizer Schokolade.", "Ich ha nur Schwiizer Schoggi."], ["...deal. 🍫", "...abgemacht. 🍫", "...abgmacht. 🍫"],
  ["⚖️ Weird law {0}/8: {1}", "⚖️ Verrücktes Gesetz {0}/8: {1}", "⚖️ Verrückts Gsetz {0}/8: {1}"],
  ["ALL 8 weird laws?! You're a legend. A slightly criminal legend. ⚖️", "ALLE 8 verrückten Gesetze?! Du bist eine Legende. Eine leicht kriminelle Legende. ⚖️", "ALLI 8 verruckte Gsetz?! Du bisch e Legände. E chli kriminelli Legände. ⚖️"],
  ["New postcard: \"{0}\"! 📮", "Neue Postkarte: \"{0}\"! 📮", "Neui Poschtcharte: \"{0}\"! 📮"],
  ["6 postcards! Ranger Jay can open the Mt Shasta trail for you now. 🏔", "6 Postkarten! Ranger Jay kann dir jetzt den Weg auf den Mt Shasta öffnen. 🏔", "6 Poschtcharte! De Ranger Jay cha dir jetzt de Wäg uf de Mt Shasta uftue. 🏔"],
  ["{0}/7 postcards! California is yours. 📮", "{0}/7 Postkarten! Kalifornien gehört dir. 📮", "{0}/7 Poschtcharte! Kalifornie ghört dir. 📮"],
  // C-Real
  ["Sarah! Welcome to California! 🇺🇸 How was the Hilton breakfast?", "Sarah! Willkommen in Kalifornien! 🇺🇸 Wie war das Frühstück im Hilton?", "Sarah! Willkomme z Kalifornie! 🇺🇸 Wie isch de Zmorge im Hilton gsi?"],
  ["The eggs benedict were... a structural failure.", "Die Eggs Benedict waren... ein statisches Versagen.", "D Eggs Benedict sind... es statischs Versage gsi."],
  ["Then let's make this trip better. Here are the keys to our black Chev! 🚙", "Dann machen wir diesen Trip besser. Hier sind die Schlüssel für unseren schwarzen Chev! 🚙", "Denn mached mer dä Trip besser. Da sind d Schlüssel für üse schwarz Chev! 🚙"],
  ["🔑 Got: Chev keys", "🔑 Erhalten: Chev-Schlüssel", "🔑 Übercho: Chev-Schlüssel"], ["Walk up to the Chev and press B to drive. It flies on asphalt.", "Geh zum Chev und drück B zum Fahren. Auf Asphalt fliegt er.", "Gang zum Chev und drück B zum Fahre. Uf Asphalt flügt er."],
  ["The plan: collect 7 California postcards. And try not to break too many weird American laws.", "Der Plan: Sammle 7 Postkarten aus Kalifornien. Und versuch, nicht zu viele verrückte amerikanische Gesetze zu brechen.", "De Plan: Sammle 7 Poschtcharte us Kalifornie. Und probier, nöd z vill verruckti amerikanischi Gsetz z bräche."],
  ["Weird laws?", "Verrückte Gesetze?", "Verruckti Gsetz?"], ["This country has a law for EVERYTHING. Check your book (TAB).", "Dieses Land hat für ALLES ein Gesetz. Schau in dein Buch (TAB).", "Das Land het für ALLES es Gsetz. Lueg i dis Buech (TAB)."],
  ["I'm busking here with my looper. Jam with me any time to earn some dollars! 🎸", "Ich mache hier Strassenmusik mit meinem Looper. Jamm jederzeit mit mir und verdien ein paar Dollar! 🎸", "Ich mach da Strassemusig mit mim Looper. Jamm jederziit mit mir und verdien es paar Dollar! 🎸"],
  ["And Ranger Jay at the station east of the city sells park permits. Nicest man in America.", "Und Ranger Jay bei der Station östlich der Stadt verkauft Parkbewilligungen. Der netteste Mann Amerikas.", "Und de Ranger Jay bi de Station öschtlich vo de Stadt verchauft Parkbewilligunge. De nettischt Maa vo Amerika."],
  ["The redwoods! The tallest trees on the planet. I feel tiny.", "Die Redwoods! Die höchsten Bäume des Planeten. Ich fühle mich winzig.", "D Redwoods! Di höchschte Bäum vom Planet. Ich fühl mi winzig."],
  ["Watch out for banana slugs. And the jays: they raid the murrelet nest up in the giant redwood.", "Pass auf die Bananenschnecken auf. Und auf die Häher: Sie plündern das Marmelalk-Nest oben im Riesen-Redwood.", "Pass uf d Bananeschnägge uf. Und uf d Häher: Si plündered s Marmelalk-Näscht obe im Riese-Redwood."],
  ["Mt Shasta! I brought my skis. Nobody told me it's summer.", "Mt Shasta! Ich habe meine Skis mitgebracht. Niemand hat mir gesagt, dass Sommer ist.", "Mt Shasta! Ich ha mini Ski mitbracht. Niemer het mer gseit, dass Summer isch."],
  ["Ranger Jay at the trailhead checks summit passes. Rules are rules.", "Ranger Jay am Wanderweg kontrolliert die Gipfelpässe. Regeln sind Regeln.", "De Ranger Jay am Wanderwäg kontrolliert d Gipfelpäss. Regle sind Regle."],
  ["Big Sur! I set up camp. Wine? I just... forgot the corkscrew. 🍷", "Big Sur! Ich habe das Lager aufgebaut. Wein? Ich habe nur... den Korkenzieher vergessen. 🍷", "Big Sur! Ich ha s Lager ufbaut. Wii? Ich ha nur... de Zapfezieher vergässe. 🍷"],
  ["The official campground is right here. $20 a night, real toilets!", "Der offizielle Zeltplatz ist gleich hier. 20 $ pro Nacht, echte Toiletten!", "De offiziell Zältplatz isch grad da. 20 $ pro Nacht, ächti Toilette!"],
  ["You look tired. Donut break? 🍩", "Du siehst müde aus. Donut-Pause? 🍩", "Du gsehsch müed us. Donut-Pause? 🍩"],
  ["Let's show the Hilton kitchen how eggs benedict are REALLY stacked. 🍳", "Zeigen wir der Hilton-Küche, wie man Eggs Benedict WIRKLICH stapelt. 🍳", "Zeiged mer de Hilton-Chuchi, wie me Eggs Benedict WÜRKLI staplet. 🍳"],
  ["The Google office has a SLIDE inside. You know what to do. 👀 If they catch you, just small talk!", "Im Google-Büro gibt es eine RUTSCHBAHN. Du weisst, was zu tun ist. 👀 Wenn sie dich erwischen: einfach Smalltalk!", "Im Google-Büro hets e RUTSCHBAHN. Du weisch, was z tue isch. 👀 Wenn s di verwütsched: eifach Smalltalk!"],
  ["We need cash for park permits. Jam with me at Union Square: looper time! 🎸", "Wir brauchen Geld für Parkbewilligungen. Jamm mit mir am Union Square: Looper-Zeit! 🎸", "Mir bruuched Gäld für Parkbewilligunge. Jamm mit mir am Union Square: Looper-Ziit! 🎸"],
  ["Up north in the redwoods, a marbled murrelet needs a bodyguard. Climb the giant redwood!", "Oben im Norden bei den Redwoods braucht ein Marmelalk einen Bodyguard. Kletter auf den Riesen-Redwood!", "Obe im Norde bi de Redwoods bruucht en Marmelalk en Bodyguard. Chlätter uf de Riese-Redwood!"],
  ["Big Sur has waves! The surf shack lends boards. Watch out for elephant seals.", "Big Sur hat Wellen! Die Surfhütte leiht Bretter aus. Pass auf die See-Elefanten auf.", "Big Sur het Wälle! D Surfhütte lehnt Brätter us. Pass uf d See-Elefante uf."],
  ["Ranger Jay sells the Sequoia park permit ($35). His station is east of the city.", "Ranger Jay verkauft die Sequoia-Parkbewilligung (35 $). Seine Station ist östlich der Stadt.", "De Ranger Jay verchauft d Sequoia-Parkbewilligung (35 $). Sini Station isch öschtlich vo de Stadt."],
  ["There is... a shrimp. At the top of General Sherman. In Sequoia. Don't ask. Go!", "Da ist... eine Crevette. Ganz oben auf General Sherman. In Sequoia. Frag nicht. Geh!", "Det isch... e Crevette. Zoberscht uf em General Sherman. Z Sequoia. Frog nöd. Gang!"],
  ["Drive south on Highway 1 to the elephant seal beach. Careful, it's fire season. 🔥", "Fahr auf dem Highway 1 nach Süden zum See-Elefanten-Strand. Vorsicht, Waldbrandsaison. 🔥", "Fahr uf em Highway 1 nach Süde zum See-Elefante-Strand. Obacht, Waldbrandsaison. 🔥"],
  ["Last stop: Mt Shasta! Buy a summit pass from Ranger Jay ($25).", "Letzter Halt: Mt Shasta! Kauf einen Gipfelpass bei Ranger Jay (25 $).", "Letschte Halt: Mt Shasta! Chauf en Gipfelpass bim Ranger Jay (25 $)."],
  ["Everything's ready. Meet me on top of Mt Shasta! 🏔", "Alles bereit. Wir treffen uns oben auf dem Mt Shasta! 🏔", "Alles parat. Mer träffed üs zoberscht uf em Mt Shasta! 🏔"],
  // Ranger Jay
  ["Never feed the squirrels. They unionized.", "Füttere nie die Eichhörnchen. Sie haben eine Gewerkschaft gegründet.", "Füeter nie d Eichhörnli. Si händ e Gwerkschaft gründet."],
  ["Bears can smell a donut box from two miles away. So can I.", "Bären riechen eine Donut-Schachtel aus drei Kilometern Entfernung. Ich auch.", "Bäre schmöcked e Donut-Schachtle us drü Kilometer. Ich au."],
  ["Leave no trace. Except good memories.", "Hinterlass keine Spuren. Ausser schöne Erinnerungen.", "Hinderlah kei Spure. Ussert schöni Erinnerige."],
  ["The marbled murrelet flies up to 50 miles inland to nest. Respect.", "Der Marmelalk fliegt bis zu 80 km landeinwärts, um zu nisten. Respekt.", "De Marmelalk flügt bis 80 km is Land ine zum Nischte. Respekt."],
  ["Banana slugs are hermaphrodites. Fun fact for your next dinner party.", "Bananenschnecken sind Zwitter. Fun Fact für deine nächste Dinnerparty.", "Bananeschnägge sind Zwitter. Fun Fact für dini nächscht Dinnerparty."],
  ["One park permit, please!", "Eine Parkbewilligung, bitte!", "E Parkbewilligung, bitte!"], ["One summit pass, please!", "Einen Gipfelpass, bitte!", "En Gipfelpass, bitte!"],
  ["🎫 Got: Sequoia park permit", "🎫 Erhalten: Sequoia-Parkbewilligung", "🎫 Übercho: Sequoia-Parkbewilligung"], ["🏔 Got: Mt Shasta summit pass", "🏔 Erhalten: Mt-Shasta-Gipfelpass", "🏔 Übercho: Mt-Shasta-Gipfelpass"],
  ["Here you go! The Sequoia gate is open for you. Say hi to General Sherman.", "Bitte sehr! Das Sequoia-Tor ist offen für dich. Grüss General Sherman von mir.", "Bitte schön! S Sequoia-Tor isch offe für di. Grüess mer de General Sherman."],
  ["Summit pass! Bring layers. And maybe a friend with a guitar.", "Gipfelpass! Nimm warme Kleider mit. Und vielleicht einen Freund mit Gitarre.", "Gipfelpass! Nimm warmi Chleider mit. Und vilicht en Fründ mit Gitarre."],
  ["That's ${0}. You've got ${1}.", "Das macht ${0}. Du hast ${1}.", "Das macht ${0}. Du hesch ${1}."], ["I hear the buskers at Union Square make good money.", "Ich habe gehört, die Strassenmusiker am Union Square verdienen gut.", "Ich ha ghört, d Strassemusiker am Union Square verdiened guet."],
  ["Howdy! I'm Ranger Jay. Welcome to the wild side of California. 🌲", "Howdy! Ich bin Ranger Jay. Willkommen auf der wilden Seite Kaliforniens. 🌲", "Howdy! Ich bi de Ranger Jay. Willkomme uf de wilde Siite vo Kalifornie. 🌲"],
  ["Sequoia park permit: $35. Mt Shasta summit pass: $25. Cash only, the card reader got eaten by a squirrel.", "Sequoia-Parkbewilligung: 35 $. Mt-Shasta-Gipfelpass: 25 $. Nur bar, das Kartenlesegerät hat ein Eichhörnchen gefressen.", "Sequoia-Parkbewilligung: 35 $. Mt-Shasta-Gipfelpass: 25 $. Nur bar, s Chartelesegrät het es Eichhörnli gfrässe."],
  ["Glad you made it out. Big Sur will grow back. It always does.", "Schön, dass du rausgekommen bist. Big Sur wächst nach. Das tut es immer.", "Schön, bisch use cho. Big Sur wachst wieder noche. Das tuets immer."],
  ["Fire season's no joke. If you head south on Highway 1, keep your tank full.", "Die Waldbrandsaison ist kein Witz. Wenn du auf dem Highway 1 nach Süden fährst, halt den Tank voll.", "D Waldbrandsaison isch kei Witz. Wenn uf em Highway 1 nach Süde fahrsch, heb de Tank voll."],
  ["The summit trail opens once you've seen the rest of California. Postcards: {0}/6.", "Der Gipfelweg öffnet, sobald du den Rest von Kalifornien gesehen hast. Postkarten: {0}/6.", "De Gipfelwäg gaht uf, sobald du de Rescht vo Kalifornie gseh hesch. Poschtcharte: {0}/6."],
  ["The trail to the summit is open. Go get that view! 🏔", "Der Weg zum Gipfel ist offen. Hol dir diese Aussicht! 🏔", "De Wäg zum Gipfel isch offe. Hol dir die Ussicht! 🏔"],
  // buildings & places
  ["The Hilton breakfast buffet. Never again. (Unless I'm cooking.)", "Das Frühstücksbuffet im Hilton. Nie wieder. (Ausser ich koche.)", "S Zmorgebuffet im Hilton. Nie meh. (Ussert ich choche.)"],
  ["The Hilton breakfast: soggy muffins, cold hollandaise... a crime against eggs.", "Das Hilton-Frühstück: matschige Muffins, kalte Hollandaise... ein Verbrechen an Eiern.", "De Hilton-Zmorge: pflotschigi Muffins, chalti Hollandaise... es Verbräche a de Eier."],
  ["*sneaks into the hotel kitchen* Let me show them how it's done. 🍳", "*schleicht in die Hotelküche* Ich zeig ihnen, wie das geht. 🍳", "*schliicht i d Hotelchuchi* Ich zeig ene, wies gaht. 🍳"],
  ["Still thinking about that slide. Best office in the world.", "Ich denke immer noch an diese Rutschbahn. Bestes Büro der Welt.", "Ich dänk immer no a die Rutschbahn. Bescht Büro vo de Wält."],
  ["The Google office. Rumor says there's a SLIDE inside.", "Das Google-Büro. Man munkelt, drinnen gibt es eine RUTSCHBAHN.", "S Google-Büro. Me seit, dinne hets e RUTSCHBAHN."], ["Badge readers... tailgating... I've got this.", "Badge-Leser... hinterherschlüpfen... das schaff ich.", "Badge-Läser... hindedri ineschlüüfe... das schaff ich."],
  ["Coffee? You look like you need it. Napping is still illegal, though.", "Kaffee? Siehst aus, als bräuchtest du einen. Schlafen ist aber immer noch verboten.", "Kafi? Du gsehsch us, wie wenn du eine bruuchsch. Schlafe isch aber immer no verbote."],
  ["One box of donuts, please! 🍩", "Eine Schachtel Donuts, bitte! 🍩", "E Schachtle Donuts, bitte! 🍩"], ["🍩 +6 donuts", "🍩 +6 Donuts", "🍩 +6 Donuts"],
  ["Six donuts. For emergencies. And squirrels. (No, not squirrels.)", "Sechs Donuts. Für Notfälle. Und Eichhörnchen. (Nein, nicht für Eichhörnchen.)", "Sächs Donuts. Für Notfäll. Und Eichhörnli. (Nei, nöd für Eichhörnli.)"],
  ["A box is ${0}. I have ${1}.", "Eine Schachtel kostet ${0}. Ich habe ${1}.", "E Schachtle choschtet ${0}. Ich ha ${1}."],
  ["Sorry ma'am, this window is for cars only. And... deer, apparently.", "Sorry Ma'am, dieser Schalter ist nur für Autos. Und... Rehe, offenbar.", "Sorry Ma'am, dä Schalter isch nur für Autos. Und... Reh, offebar."],
  ["One more ride? The seals are giving me looks...", "Noch eine Runde? Die Robben schauen mich so komisch an...", "No e Rundi? D Robbe lueged mi so komisch aa..."],
  ["Surf shack! \"Boards for architects: free.\" ...is that real?", "Surfhütte! \"Bretter für Architektinnen: gratis.\" ...ist das echt?", "Surfhütte! \"Brätter für Architektinne: gratis.\" ...isch das ächt?"], ["Let's ride! 🏄‍♀️", "Los geht's! 🏄‍♀️", "Los gahts! 🏄‍♀️"],
  ["Campsite for tonight, please.", "Einen Zeltplatz für heute Nacht, bitte.", "En Zältplatz für hüt znacht, bitte."],
  ["Now the wine... C-Real forgot the corkscrew. Shoe method it is. 👟🍷", "Jetzt der Wein... C-Real hat den Korkenzieher vergessen. Dann eben die Schuh-Methode. 👟🍷", "Jetzt de Wii... de C-Real het de Zapfezieher vergässe. Denn halt d Schue-Methode. 👟🍷"],
  ["A campsite is ${0} a night. I have ${1}.", "Ein Zeltplatz kostet ${0} pro Nacht. Ich habe ${1}.", "En Zältplatz choschtet ${0} pro Nacht. Ich ha ${1}."],
  ["The giant redwood. A marbled murrelet nests up there, and the jays are circling...", "Der Riesen-Redwood. Dort oben nistet ein Marmelalk, und die Häher kreisen schon...", "De Riese-Redwood. Det obe nischtet en Marmelalk, und d Häher chreised scho..."],
  ["Time to be a bodyguard. 🐦", "Zeit, Bodyguard zu sein. 🐦", "Ziit für de Bodyguard-Job. 🐦"],
  ["General Sherman: the biggest tree on Earth. And at the very top... is that a SHRIMP? 🦐", "General Sherman: der grösste Baum der Erde. Und ganz oben... ist das eine CREVETTE? 🦐", "General Sherman: de gröscht Baum vo de Wält. Und zoberscht... isch das e CREVETTE? 🦐"],
  ["I have to know.", "Ich muss es wissen.", "Ich mues es wüsse."],
  ["Welcome back! Fries are on the house. 🍟", "Willkommen zurück! Die Pommes gehen aufs Haus. 🍟", "Willkomme zrugg! D Pommes gönd ufs Huus. 🍟"],
  ["Welcome to Burger King, can I take your order?", "Willkommen bei Burger King, was darf's sein?", "Willkomme bi Burger King, was dörfs si?"], ["Um... there are three deer in front of me.", "Ähm... vor mir stehen drei Rehe.", "Ähm... vor mir stönd drü Reh."],
  ["Yeah, they come every day. They never order. They just... vibe.", "Ja, die kommen jeden Tag. Die bestellen nie. Die... chillen einfach.", "Ja, die chömed jede Tag. Die bstelled nie. Die... chilled eifach."],
  ["*chews thoughtfully*", "*kaut nachdenklich*", "*chätschet nachdänklich*"], ["*honks politely* 📯", "*hupt höflich* 📯", "*hupet höflich* 📯"], ["*leaves, deeply offended*", "*geht, zutiefst beleidigt*", "*gaht, zutüfscht beleidiget*"],
  ["Thanks for your patience! Free fries for you. 🍟", "Danke für die Geduld! Gratis-Pommes für dich. 🍟", "Merci für d Geduld! Gratis-Pommes für di. 🍟"],
  ["Kermit Jr. is napping. Please respect his retirement.", "Kermit Jr. macht ein Nickerchen. Bitte respektiere seinen Ruhestand.", "De Kermit Jr. macht es Nickerli. Bitte respektier sini Pension."],
  ["They're judging me. I can feel it.", "Sie verurteilen mich. Ich spüre es.", "Die verurteiled mi. Ich gspüres."], ["No. Ranger Jay is watching. I can feel it.", "Nein. Ranger Jay schaut zu. Ich spüre es.", "Nei. De Ranger Jay luegt zue. Ich gspüres."],
  ["Free camping, no fire. Ranger Jay would be proud.", "Gratis campen, kein Feuer. Ranger Jay wäre stolz.", "Gratis campe, kei Füür. De Ranger Jay wär stolz."],
  ["Sunset, the Pacific and... sparkling water. Legal and sad.", "Sonnenuntergang, der Pazifik und... Mineralwasser. Legal und traurig.", "Sunneundergang, de Pazifik und... Mineral. Legal und truurig."],
  ["The summit of Mount Shasta. 14,179 feet. I can see... everything.", "Der Gipfel des Mount Shasta. 4322 Meter. Ich sehe... alles.", "De Gipfel vom Mount Shasta. 4322 Meter. Ich gseh... alles."],
  ["And I brought the amp. 🎸 One last loop?", "Und ich habe den Verstärker mitgebracht. 🎸 Ein letzter Loop?", "Und ich ha de Verstärker mitbracht. 🎸 En letschte Loop?"],
  // wildfire
  ["Is that... smoke?", "Ist das... Rauch?", "Isch das... Rauch?"],
  ["📻 EVACUATION ORDER for Big Sur! Wildfire moving north fast. Head north on Highway 1 to my checkpoint!", "📻 EVAKUIERUNG für Big Sur! Der Waldbrand breitet sich schnell nach Norden aus. Fahr auf dem Highway 1 nach Norden zu meinem Checkpoint!", "📻 EVAKUIERIG für Big Sur! De Waldbrand chunnt schnell nach Norde. Fahr uf em Highway 1 nach Norde zu mim Checkpoint!"],
  ["GO GO GO! 🔥", "LOS LOS LOS! 🔥", "HOPP HOPP HOPP! 🔥"], ["HOT HOT HOT! 🔥", "HEISS HEISS HEISS! 🔥", "HEISS HEISS HEISS! 🔥"],
  ["You made it! Good job, ma'am. Everybody's out safe.", "Geschafft! Gute Arbeit, Ma'am. Alle sind in Sicherheit.", "Gschafft! Gueti Arbet, Ma'am. Alli sind in Sicherheit."],
  ["*coughs* ...the Chev smells like a barbecue now.", "*hustet* ...der Chev riecht jetzt nach Grillparty.", "*hueschtet* ...de Chev schmöckt jetzt nach Grillparty."], ["Every evacuee gets one of these. 📮", "Jeder Evakuierte bekommt so eine. 📮", "Jedi Evakuierti überchunnt eini. 📮"],
  ["Whoa, easy! Sit down, I'll get you some gas station coffee. ☕", "Hoppla, langsam! Setz dich, ich hol dir einen Tankstellenkaffee. ☕", "Hoppla, gmüetli! Hock ab, ich hol dir en Tankstelle-Kafi. ☕"], ["California is intense.", "Kalifornien ist intensiv.", "Kalifornie isch intensiv."],
  // book, flight
  ["Postcards", "Postkarten", "Poschtcharte"], ["Weird laws", "Verrückte Gesetze", "Verruckti Gsetz"], ["California Postcards — {0}/{1}", "Postkarten aus Kalifornien — {0}/{1}", "Poschtcharte us Kalifornie — {0}/{1}"],
  ["??? (no postcard yet)", "??? (noch keine Postkarte)", "??? (no kei Poschtcharte)"], ["◀ ▶ flip · ▲ ▼ weird laws · [A]: close", "◀ ▶ blättern · ▲ ▼ verrückte Gesetze · [A]: schliessen", "◀ ▶ blättere · ▲ ▼ verruckti Gsetz · [A]: zuetue"],
  ["California's weirdest laws (mostly real!) — {0}/8", "Kaliforniens verrückteste Gesetze (meistens echt!) — {0}/8", "Kaliforniens verrücktischti Gsetz (meischtens ächt!) — {0}/8"], ["▲ ▼ postcards · [A]: close", "▲ ▼ Postkarten · [A]: schliessen", "▲ ▼ Poschtcharte · [A]: zuetue"],
  ["Luzern ✈ San Francisco", "Luzern ✈ San Francisco", "Lozärn ✈ San Francisco"], ["Level 2: California", "Level 2: Kalifornien", "Level 2: Kalifornie"],
  ["*yawns* San Francisco... jetlag hits different.", "*gähnt* San Francisco... der Jetlag ist was anderes.", "*gähnt* San Francisco... de Jetlag isch öppis anders."],
  ["And that Hilton breakfast... those eggs benedict were a crime. 🍳", "Und dieses Hilton-Frühstück... diese Eggs Benedict waren ein Verbrechen. 🍳", "Und dä Hilton-Zmorge... die Eggs Benedict sind es Verbräche gsi. 🍳"],
  ["C-Real said he'd be busking at Union Square. Let's follow the music!", "C-Real hat gesagt, er macht Strassenmusik am Union Square. Folgen wir der Musik!", "De C-Real het gseit, er macht Strassemusig am Union Square. Mer folged de Musig!"],
  ["Welcome to California! 🇺🇸 I'm at Union Square, just follow the music. 🎸", "Willkommen in Kalifornien! 🇺🇸 Ich bin am Union Square, folg einfach der Musik. 🎸", "Willkomme z Kalifornie! 🇺🇸 Ich bi am Union Square, folg eifach de Musig. 🎸"],
  // minigames
  ["Plate {0}: {1}%", "Teller {0}: {1}%", "Täller {0}: {1}%"], ["Nice! 👍", "Gut! 👍", "Guet! 👍"], ["Shoo!", "Husch!", "Husch!"], ["Thunk!", "Tock!", "Tock!"], ["Perfect! ✨", "Perfekt! ✨", "Perfekt! ✨"], ["SPLAT! 🍳", "PLATSCH! 🍳", "PFLOTSCH! 🍳"],
  ["{0}% structural integrity. Still better than the Hilton's.", "{0}% statische Integrität. Immer noch besser als die vom Hilton.", "{0}% statischi Integrität. Immer no besser als die vom Hilton."],
  ["Hmm. Even I can't save these eggs today. Try again!", "Hmm. Nicht mal ich kann diese Eier heute retten. Nochmal!", "Hmm. Nöd mal ich cha die Eier hüt rette. Nomal!"],
  ["Plate {0}/3", "Teller {0}/3", "Täller {0}/3"], ["Hilton: 23% 😬", "Hilton: 23% 😬", "Hilton: 23% 😬"], ["[A]: drop the layer!  ·  B: leave", "[A]: Schicht fallen lassen!  ·  B: gehen", "[A]: Schicht la gheie!  ·  B: gah"],
  ["Average: {0}%", "Durchschnitt: {0}%", "Durchschnitt: {0}%"], ["Michelin-star structural engineering.", "Statik auf Michelin-Stern-Niveau.", "Statik uf Michelin-Stärn-Niveau."], ["The hollandaise has collapsed.", "Die Hollandaise ist eingestürzt.", "D Hollandaise isch iigstürzt."], ["[A]: continue", "[A]: weiter", "[A]: wiiter"],
  ["Google Office", "Google-Büro", "Google-Büro"], ["Wait... you don't have a badge. Security!", "Moment... du hast ja gar keinen Badge. Security!", "Momänt... du hesch ja gar kei Badge. Security!"],
  ["THE SLIDE. *wheeee* 🛝", "DIE RUTSCHBAHN. *juhuuu* 🛝", "D RUTSCHBAHN. *juhuuu* 🛝"], ["Sketched it on the way down. Architecture AND fun.", "Auf dem Weg nach unten skizziert. Architektur UND Spass.", "Uf em Wäg abe skizziert. Architektur UND Gspass."],
  ["SMALL TALK", "SMALLTALK", "SMALLTALK"], ["▲ ▼ choose · [A]: say it", "▲ ▼ wählen · [A]: sagen", "▲ ▼ wähle · [A]: säge"], ["Nailed it! 🙌", "Perfekt getroffen! 🙌", "Voll troffe! 🙌"], ["...awkward. 😬", "...peinlich. 😬", "...piinlich. 😬"],
  ["Small talk survived! 🇺🇸", "Smalltalk überlebt! 🇺🇸", "Smalltalk überläbt! 🇺🇸"], ["Too European. 🇨🇭", "Zu europäisch. 🇨🇭", "Z europäisch. 🇨🇭"],
  ["Love that for you! Anyway, gotta jump into a sync. 👋", "Love that for you! Egal, ich muss in ein Sync. 👋", "Love that for you! Egal, ich mues ines Sync. 👋"],
  ["You're awesome! Here's five bucks for the good vibes. ✌️", "Du bist awesome! Hier sind fünf Dollar für die guten Vibes. ✌️", "Du bisch awesome! Da sind füf Dollar für di guete Vibes. ✌️"], ["...okaaay. Have a good one!", "...okaaay. Schönen Tag noch!", "...okaaay. Schöne Tag no!"],
  ["Hey! How's it going?", "Hey! Wie läuft's?", "Hey! Wie gahts?"], ["Good, you?", "Gut, und dir?", "Guet, und dir?"], ["Let me tell you about my week in detail...", "Lass mich dir meine Woche im Detail erzählen...", "Lass mi dir mini Wuche im Detail verzelle..."], ["Why do you ask?", "Warum fragst du?", "Wieso fragsch?"],
  ["Love your shoes! Where are they from?", "Coole Schuhe! Woher sind die?", "Cooli Schue! Vo wo sind die?"], ["Oh, thanks! Just some random store.", "Oh, danke! Aus irgendeinem Laden.", "Oh, merci! Us irgendemene Lade."], ["Switzerland. Everything good is.", "Aus der Schweiz. Alles Gute ist das.", "Us de Schwiiz. Alles Guete isch das."], ["Please don't look at my shoes.", "Bitte schau nicht auf meine Schuhe.", "Bitte lueg nöd uf mini Schue."],
  ["Crazy weather, huh?", "Verrücktes Wetter, oder?", "Verrückts Wätter, gäll?"], ["I know, right?!", "Ja, oder?!", "Gäll, ja?!"], ["It is 21 degrees. That is average.", "Es ist 21 Grad. Das ist Durchschnitt.", "Es isch 21 Grad. Das isch Durchschnitt."], ["Weather is a social construct.", "Wetter ist ein soziales Konstrukt.", "Wätter isch es soziales Konstrukt."],
  ["We should totally grab coffee sometime!", "Wir sollten unbedingt mal einen Kaffee trinken!", "Mir sötted unbedingt mal en Kafi go trinke!"], ["Totally! Let's circle back.", "Unbedingt! Wir kommen darauf zurück.", "Unbedingt! Mer chömed druf zrugg."], ["When exactly? I'll book it now.", "Wann genau? Ich trage es gleich ein.", "Wänn genau? Ich träg das grad ii."], ["I don't drink coffee with strangers.", "Ich trinke keinen Kaffee mit Fremden.", "Ich trink kei Kafi mit Fremde."],
  ["How was your weekend?", "Wie war dein Wochenende?", "Wie isch dis Wuchenänd gsi?"], ["Awesome! Super chill.", "Mega! Super chillig.", "Mega! Super chillig."], ["I broke into a chapel.", "Ich bin in eine Kapelle eingebrochen.", "Ich bi imene Kapelle iibroche."], ["Long. Too long.", "Lang. Zu lang.", "Lang. Z lang."],
  ["Are you new on the team?", "Bist du neu im Team?", "Bisch neu im Team?"], ["Yep! Super excited to be here!", "Jep! Mega aufgeregt, hier zu sein!", "Jep! Mega ufgregt, da z si!"], ["No. I am an intruder.", "Nein. Ich bin eine Einbrecherin.", "Nei. Ich bi e Iibrächerin."], ["Define \"team\".", "Definiere \"Team\".", "Definier \"Team\"."],
  ["Have you tried the kombucha on tap?", "Hast du schon den Kombucha vom Fass probiert?", "Hesch scho de Kombucha vom Fass probiert?"], ["Obsessed with it!", "Ich bin süchtig danach!", "Ich bi süchtig dänach!"], ["It tastes like a sock.", "Er schmeckt wie eine Socke.", "Er schmöckt wie e Socke."], ["We have Rivella at home.", "Wir haben Rivella zu Hause.", "Mir händ Rivella dihei."],
  ["Let's take this offline!", "Lass uns das offline besprechen!", "Mer bespräched das offline!"], ["Sounds great, let's sync!", "Klingt super, lass uns syncen!", "Tönt super, mer synced!"], ["We are already offline. This is a hallway.", "Wir sind schon offline. Das ist ein Gang.", "Mir sind scho offline. Das isch en Gang."], ["I am always offline.", "Ich bin immer offline.", "Ich bi immer offline."],
  ["{0} points. The seals won this round. Again!", "{0} Punkte. Die Robben haben diese Runde gewonnen. Nochmal!", "{0} Pünkt. D Robbe händ die Rundi gwunne. Nomal!"], ["Sorry dude!", "Sorry, Alter!", "Sorry, Alte!"], ["Goal: {0}", "Ziel: {0}", "Ziel: {0}"],
  ["← → steer · [A] on a wave crest = trick! · dodge seals & kelp", "← → lenken · [A] auf dem Wellenkamm = Trick! · Robben & Kelp ausweichen", "← → stüüre · [A] uf em Wällekamm = Trick! · Robbe & Kelp uswiiche"],
  ["Totally tubular! 🤙", "Total tubular! 🤙", "Total tubular! 🤙"], ["Wiped out. The ocean wins.", "Abgeräumt. Der Ozean gewinnt.", "Abgruumt. De Ozean gwinnt."],
  ["{0} jays shooed. The murrelet chick is safe! 🐣", "{0} Häher verscheucht. Das Marmelalk-Küken ist in Sicherheit! 🐣", "{0} Häher verjagt. S Marmelalk-Bibeli isch in Sicherheit! 🐣"],
  ["The jays got the nest... Let's try again. Crumb clean!", "Die Häher haben das Nest erwischt... Nochmal. Keine Krümel!", "D Häher händ s Näscht verwütscht... Nomal. Kei Brösmeli!"],
  ["Nest raided! 🥚", "Nest geplündert! 🥚", "Näscht plünderet! 🥚"], ["Not the murrelet!! 😱", "Nicht den Marmelalk!! 😱", "Nöd de Marmelalk!! 😱"], ["MURRELET BODYGUARD", "MARMELALK-BODYGUARD", "MARMELALK-BODYGUARD"], ["Shooed: {0}", "Verscheucht: {0}", "Verjagt: {0}"],
  ["← → move · [A]: shoo the blue jays · DON'T shoo the brown murrelet!", "← → bewegen · [A]: blaue Häher verscheuchen · NICHT den braunen Marmelalk!", "← → bewege · [A]: blaui Häher verjage · NÖD de bruun Marmelalk!"],
  ["The chick is safe! 🐣", "Das Küken ist in Sicherheit! 🐣", "S Bibeli isch in Sicherheit! 🐣"], ["The jays won... 😢", "Die Häher haben gewonnen... 😢", "D Häher händ gwunne... 😢"],
  ["A shrimp. In sunglasses. On top of the biggest tree on Earth.", "Eine Crevette. Mit Sonnenbrille. Auf dem grössten Baum der Erde.", "E Crevette. Mit Sunnebrülle. Uf em gröschte Baum vo de Wält."],
  ["I have so many questions. I will ask none of them.", "Ich habe so viele Fragen. Ich werde keine davon stellen.", "Ich ha so vill Frage. Ich stell keini devo."], ["*clicks claws coolly* 🦐😎", "*klickt lässig mit den Scheren* 🦐😎", "*klickt lässig mit de Schäre* 🦐😎"],
  ["Bonk! 🌰", "Bonk! 🌰", "Bonk! 🌰"], ["GENERAL SHERMAN", "GENERAL SHERMAN", "GENERAL SHERMAN"], ["Height: {0} ft", "Höhe: {0} ft", "Höchi: {0} ft"],
  ["← → move · [A]: jump branch to branch · watch out for falling cones!", "← → bewegen · [A]: von Ast zu Ast springen · Vorsicht vor fallenden Zapfen!", "← → bewege · [A]: vo Ascht zu Ascht gumpe · Obacht vor gheiende Zapfe!"],
  ["You found the shrimp! 🦐", "Du hast die Crevette gefunden! 🦐", "Du hesch d Crevette gfunde! 🦐"],
  ["🥁 Drums", "🥁 Schlagzeug", "🥁 Schlagzüüg"], ["🎸 Bass", "🎸 Bass", "🎸 Bass"], ["🎹 Chords", "🎹 Akkorde", "🎹 Akkord"], ["🎵 Melody", "🎵 Melodie", "🎵 Melodie"],
  ["Welcome to my looper show! 🎸 I play, you record.", "Willkommen zu meiner Looper-Show! 🎸 Ich spiele, du nimmst auf.", "Willkomme zu minere Looper-Show! 🎸 Ich spiel, du nimmsch uf."],
  ["Press [A] on each of the 4 beats to record a loop layer: drums, bass, chords, melody.", "Drück [A] auf jeden der 4 Schläge, um eine Loop-Spur aufzunehmen: Schlagzeug, Bass, Akkorde, Melodie.", "Drück [A] uf jede vo de 4 Schläg, zum e Loop-Spur ufneh: Schlagzüüg, Bass, Akkord, Melodie."],
  ["The tighter we are, the better the crowd tips!", "Je tighter wir sind, desto besser gibt das Publikum Trinkgeld!", "Je tighter mer sind, desto besser git s Publikum Trinkgäld!"], ["Jam session! Hit [A] on the beat. 🎸", "Jam-Session! Drück [A] im Takt. 🎸", "Jam-Session! Drück [A] im Takt. 🎸"],
  ["🎸 The crowd tipped ${0}!", "🎸 Das Publikum gab ${0} Trinkgeld!", "🎸 S Publikum het ${0} Trinkgäld gä!"], ["{0} recorded!", "{0} aufgenommen!", "{0} ufgnoh!"], ["Again! 🔁", "Nochmal! 🔁", "Nomal! 🔁"], ["Off beat", "Neben dem Takt", "Näb em Takt"],
  ["UNION SQUARE LOOPER JAM", "UNION SQUARE LOOPER JAM", "UNION SQUARE LOOPER JAM"], ["Count-in... {0}", "Einzählen... {0}", "Iizelle... {0}"], ["Hit [A] on every beat! ({0}/4 in this bar)", "Drück [A] auf jeden Schlag! ({0}/4 in diesem Takt)", "Drück [A] uf jede Schlag! ({0}/4 i dem Takt)"],
  ["Full loop! The crowd goes wild! 🙌", "Voller Loop! Das Publikum tobt! 🙌", "Volle Loop! S Publikum flippt us! 🙌"], ["B: stop", "B: stopp", "B: stopp"], ["Tips: ${0} 💵", "Trinkgeld: ${0} 💵", "Trinkgäld: ${0} 💵"], ["[A]: collect", "[A]: einsammeln", "[A]: iisammle"],
  ["The shoe method! You're a genius. Cheers! 🍷", "Die Schuh-Methode! Du bist ein Genie. Prost! 🍷", "D Schue-Methode! Du bisch es Genie. Proscht! 🍷"],
  ["Hearts restored. Checkpoint set. Feet... slightly purple.", "Herzen aufgefüllt. Checkpoint gesetzt. Füsse... leicht violett.", "Härzli wieder volle. Checkpoint gsetzt. Füess... chli violett."],
  ["...I'll buy a corkscrew tomorrow. Promise.", "...ich kaufe morgen einen Korkenzieher. Versprochen.", "...ich chauf morn en Zapfezieher. Versproche."], ["Crack! 😬", "Krack! 😬", "Krack! 😬"],
  ["THE SHOE METHOD 👟🍷", "DIE SCHUH-METHODE 👟🍷", "D SCHUE-METHODE 👟🍷"], ["Cork: {0}%   ·   Cracks: {1}/3", "Korken: {0}%   ·   Risse: {1}/3", "Zapfe: {0}%   ·   Riss: {1}/3"],
  ["Tap [A] when the marker is in the green zone!", "Drück [A], wenn die Markierung im grünen Bereich ist!", "Drück [A], wenn d Markierig im grüene Bereich isch!"], ["POP! 🍾 Cheers!", "PLOPP! 🍾 Prost!", "PLOPP! 🍾 Proscht!"], ["The bottle broke... 🍷💔", "Die Flasche ist zerbrochen... 🍷💔", "D Flasche isch kaputt... 🍷💔"],
  ["a road trip by C-Real & Sarah", "ein Roadtrip von C-Real & Sarah", "en Roadtrip vom C-Real & de Sarah"], ["Postcards: {0}/7", "Postkarten: {0}/7", "Poschtcharte: {0}/7"], ["Weird laws broken: {0}/8", "Gebrochene verrückte Gesetze: {0}/8", "Broche verruckti Gsetz: {0}/8"],
  ["Busking tips earned: ${0}", "Strassenmusik-Trinkgeld: ${0}", "Strassemusig-Trinkgäld: ${0}"], ["Eggs benedict stacked: {0}", "Gestapelte Eggs Benedict: {0}", "Gstapleti Eggs Benedict: {0}"], ["Banana slugs stepped on: {0}", "Auf Bananenschnecken getreten: {0}", "Uf Bananeschnägge tschalpet: {0}"],
  ["Small talks survived: {0}", "Überlebte Smalltalks: {0}", "Überläbti Smalltalks: {0}"], ["Bottles opened with a shoe: {0}", "Mit dem Schuh geöffnete Flaschen: {0}", "Mit em Schue göffneti Flasche: {0}"], ["Thanks to Ranger Jay. And the shrimp. 🦐", "Danke an Ranger Jay. Und die Crevette. 🦐", "Merci am Ranger Jay. Und de Crevette. 🦐"],
  // Mt Shasta expedition: gear
  ["Gear shop", "Bergsportladen", "Bergsportlade"], ["Shop clerk", "Verkäufer", "Verchäufer"],
  ["Helmet", "Helm", "Helm"], ["Crampons", "Steigeisen", "Stiigiise"], ["Ice axe", "Pickel", "Pickel"], ["Backpack", "Rucksack", "Rucksack"], ["Headlamp", "Stirnlampe", "Stirnlampe"],
  ["Back for more? Avalanche Gulch is waiting. Same rules: helmet on, axe ready.", "Noch nicht genug? Avalanche Gulch wartet. Gleiche Regeln: Helm auf, Pickel bereit.", "No nöd gnueg? Avalanche Gulch wartet. Glychi Regle: Helm uf, Pickel parat."],
  ["Climbers start at 2 AM, when the snow is still frozen. Here, take my spare headlamp. 🔦", "Bergsteiger starten um 2 Uhr nachts, wenn der Schnee noch gefroren ist. Hier, nimm meine Ersatz-Stirnlampe. 🔦", "Bergsteiger started am 2i znacht, wenn de Schnee no gfrore isch. Da, nimm mini Ersatz-Stirnlampe. 🔦"],
  ["🔦 Got: Headlamp", "🔦 Erhalten: Stirnlampe", "🔦 Übercho: Stirnlampe"],
  ["Hold on. Nobody goes up Avalanche Gulch without the right gear.", "Moment. Niemand geht ohne die richtige Ausrüstung durch die Avalanche Gulch.", "Momänt. Niemer gaht ohni di richtig Usrüschtig dur d Avalanche Gulch."],
  ["The Mountain Shop next door has helmets, crampons and ice axes.", "Der Bergsportladen nebenan hat Helme, Steigeisen und Pickel.", "De Bergsportlade näbedra het Helm, Stiigiise und Pickel."],
  ["And a backpack with snacks. Your friend with the skis looked prepared.", "Und einen Rucksack mit Snacks. Dein Freund mit den Skis sah vorbereitet aus.", "Und en Rucksack mit Snacks. Din Fründ mit de Ski het parat usgseh."],
  ["Helmet, crampons, ice axe, pack, headlamp. You're ready.", "Helm, Steigeisen, Pickel, Rucksack, Stirnlampe. Du bist bereit.", "Helm, Stiigiise, Pickel, Rucksack, Stirnlampe. Du bisch parat."],
  ["If you slip, roll onto the axe and dig it in. Mash [A]! Don't let go of it.", "Wenn du ausrutschst: auf den Pickel rollen und reinrammen. Hämmer auf [A]! Und lass ihn nicht los.", "Wenn d usrutschsch: uf de Pickel rolle und ineramme. Hämmer uf [A]! Und lah ne nöd los."],
  ["Avalanche Gulch, Red Banks, Misery Hill, summit. Good luck! 🏔", "Avalanche Gulch, Red Banks, Misery Hill, Gipfel. Viel Glück! 🏔", "Avalanche Gulch, Red Banks, Misery Hill, Gipfel. Vill Glück! 🏔"],
  ["You've got everything we sell! Go climb that mountain. 🏔", "Du hast alles, was wir verkaufen! Ab auf den Berg. 🏔", "Du hesch alles, wo mir verchaufed! Ab uf de Berg. 🏔"],
  ["{0} for {1}. You have ${2}.", "{0} für {1}. Du hast ${2}.", "{0} für {1}. Du hesch ${2}."], ["Back to busking, then. 🎸", "Dann zurück zur Strassenmusik. 🎸", "Denn halt zrugg zur Strassemusig. 🎸"],
  ["One {0}, coming up! That's ${1}.", "Ein(e) {0}, kommt sofort! Das macht ${1}.", "Eis {0}, chunnt grad! Das macht ${1}."], ["{0} Got: {1}", "{0} Erhalten: {1}", "{0} Übercho: {1}"],
  ["Helmets: because the Red Banks throw rocks.", "Helme: weil die Red Banks mit Steinen werfen.", "Helm: will d Red Banks mit Stei schüssed."],
  ["Our crampons have climbed Shasta 400 times. Without anyone in them.", "Unsere Steigeisen waren schon 400 Mal auf dem Shasta. Ohne jemanden drin.", "Üsi Stiigiise sind scho 400 Mal uf em Shasta gsi. Ohni öpper drin."],
  ["Pointy end down. Always. And don't let go of it.", "Spitzes Ende nach unten. Immer. Und nicht loslassen.", "Spitzigs Änd nach unde. Immer. Und nöd loslah."],
  ["Climbing Shasta? I packed you a backpack: water, sunscreen and three donuts. 🎒", "Du willst auf den Shasta? Ich hab dir einen Rucksack gepackt: Wasser, Sonnencreme und drei Donuts. 🎒", "Du wotsch uf de Shasta? Ich ha dir en Rucksack packt: Wasser, Sunnecreme und drü Donuts. 🎒"],
  ["🎒 Got: Backpack", "🎒 Erhalten: Rucksack", "🎒 Übercho: Rucksack"],
  ["Press B on the mountain to eat a snack when you're out of breath.", "Drück am Berg B für einen Snack, wenn dir die Puste ausgeht.", "Drück am Berg B für en Snack, wenn dir de Schnuuf usgaht."],
  ["Gear up for Shasta: {0}. Mountain Shop next to the trailhead, backpack from me, headlamp from Jay.", "Ausrüstung für den Shasta: {0}. Bergsportladen beim Wanderweg, Rucksack von mir, Stirnlampe von Jay.", "Usrüschtig für de Shasta: {0}. Bergsportlade bim Wanderwäg, Rucksack vo mir, Stirnlampe vom Jay."],
  ["The summit of Mount Shasta again. Still worth every step.", "Wieder auf dem Gipfel des Mount Shasta. Jeder Schritt hat sich gelohnt.", "Wieder uf em Gipfel vom Mount Shasta. Jede Schritt het sich glohnt."],
  ["A lonely giant volcano you can see from 100 miles away. Climbers start at 2 AM, camp at Helen Lake, dodge rocks on the Red Banks and curse Misery Hill. Bring an ice axe. Hold on to it.", "Ein einsamer Riesenvulkan, den man aus 160 km sieht. Bergsteiger starten um 2 Uhr, zelten am Helen Lake, weichen Steinen an den Red Banks aus und verfluchen den Misery Hill. Nimm einen Pickel mit. Und halt ihn fest.", "En einsame Riesevulkan, wo me us 160 km gseht. Bergsteiger started am 2i, zälted am Helen Lake, wiiched de Stei a de Red Banks us und verfluechet de Misery Hill. Nimm en Pickel mit. Und heb ne fescht."],
  ["Slides down Mt Shasta: {0}  ·  Ice axes lost: {1}", "Rutschpartien am Mt Shasta: {0}  ·  Verlorene Pickel: {1}", "Rutschpartie am Mt Shasta: {0}  ·  Verloreni Pickel: {1}"],
  // Mt Shasta expedition: the climb
  ["2:00 AM. Alpine start. 🔦", "2 Uhr nachts. Alpinstart. 🔦", "2i znacht. Alpinstart. 🔦"], ["SLIDING!", "RUTSCHEN!", "RUTSCHE!"],
  ["The ice axe got ripped out of your hands! 🪓💨", "Der Pickel wurde dir aus den Händen gerissen! 🪓💨", "De Pickel isch dir us de Händ grisse worde! 🪓💨"],
  ["You made it!! I came up the other side with the amp. Don't ask. 🎸", "Du hast es geschafft!! Ich bin mit dem Verstärker auf der anderen Seite hoch. Frag nicht. 🎸", "Du hesch es gschafft!! Ich bi mit em Verstärker uf de andere Siite ufe. Frog nöd. 🎸"],
  ["One last loop?", "Ein letzter Loop?", "En letschte Loop?"], ["Summit plateau", "Gipfelplateau", "Gipfelplateau"],
  ["Helen Lake camp (10,443 ft): checkpoint ⛺", "Lager Helen Lake (3183 m): Checkpoint ⛺", "Lager Helen Lake (3183 m): Checkpoint ⛺"],
  ["That was NOT the summit. Misery Hill strikes again. 😩", "Das war NICHT der Gipfel. Misery Hill schlägt wieder zu. 😩", "Das isch NÖD de Gipfel gsi. De Misery Hill schlaht wieder zue. 😩"],
  ["Blown off your feet!", "Vom Wind umgeweht!", "Vom Wind umgheit!"], ["Ouch! Rocks! 🪨", "Autsch! Felsen! 🪨", "Au! Felse! 🪨"], ["Self-arrest! 🪓 Phew.", "Gestoppt! 🪓 Puh.", "Gstoppt! 🪓 Puh."], ["...finally stopped.", "...endlich gestoppt.", "...ändlich gstoppt."],
  ["*gasping* ...need a break...", "*keucht* ...brauche eine Pause...", "*schnuufet* ...bruuch e Pause..."], ["Blue ice!", "Blankes Eis!", "Blankis Iis!"],
  ["🍩 Snack break! +stamina", "🍩 Snackpause! +Ausdauer", "🍩 Snackpause! +Uusduur"], ["No snacks left! 🎒", "Keine Snacks mehr! 🎒", "Kei Snacks meh! 🎒"],
  ["Sulfur! Smells like Hilton eggs. 🥚", "Schwefel! Riecht wie Hilton-Eier. 🥚", "Schwefel! Schmöckt wie Hilton-Eier. 🥚"],
  ["💨 GUST INCOMING! Hold [A] to plant your axe!", "💨 WINDBÖE! Halte [A], um den Pickel einzurammen!", "💨 WINDBÖE! Heb [A], zum de Pickel iiramme!"],
  ["Got the ice axe back! 🪓 Leash it next time.", "Pickel wieder da! 🪓 Nächstes Mal mit Schlaufe.", "Pickel wieder da! 🪓 S nächscht Mal mit Schlaufe."],
  ["ROCK! 🪨", "STEIN! 🪨", "STEI! 🪨"], ["CLONK! Good thing you wear a helmet. ⛑️", "KLONK! Zum Glück trägst du einen Helm. ⛑️", "KLONK! Zum Glück treisch en Helm. ⛑️"],
  ["{0} ft", "{0} ft", "{0} ft"], ["stamina", "Ausdauer", "Uusduur"],
  ["▲ climb · ◀ ▶ traverse · B: snack · avoid blue ice & rocks · Esc: retreat", "▲ steigen · ◀ ▶ queren · B: Snack · Blankeis & Steine meiden · Esc: Rückzug", "▲ stiige · ◀ ▶ quere · B: Snack · Blankiis & Stei meide · Esc: Rückzug"],
  ["SLIDING! Mash [A] to self-arrest!", "RUTSCHEN! Hämmer auf [A] zum Bremsen!", "RUTSCHE! Hämmer uf [A] zum Bremse!"], ["No ice axe... just slide. 😱", "Kein Pickel... einfach rutschen. 😱", "Kei Pickel... eifach rutsche. 😱"],
  ["Your ice axe is somewhere below you ↓  (climbing is slow without it)", "Dein Pickel liegt irgendwo unter dir ↓  (ohne ihn kommst du nur langsam voran)", "Din Pickel liit irgendwo under dir ↓  (ohni ne gahts nur langsam)"],
  ["GUST!", "BÖE!", "BÖE!"], ["Rescued by Ranger Jay! 🚁", "Gerettet von Ranger Jay! 🚁", "Grettet vom Ranger Jay! 🚁"],
  ["He found your ice axe, too. Back to your last camp.", "Er hat auch deinen Pickel gefunden. Zurück zum letzten Lager.", "Er het au din Pickel gfunde. Zrugg zum letschte Lager."], ["[A]: try again", "[A]: nochmal", "[A]: nomal"],
  ["SUMMIT! 14,179 ft 🏔", "GIPFEL! 4322 m 🏔", "GIPFEL! 4322 m 🏔"],
  // glissade
  ["Glissading is the BEST part. Best day ever? Best day ever. ❤", "Abfahren auf dem Hosenboden ist das BESTE. Bester Tag überhaupt? Bester Tag überhaupt. ❤", "Uf em Füdli abe isch s BESCHTE. Beschte Tag überhaupt? Beschte Tag überhaupt. ❤"],
  ["And I still have my ice axe!", "Und ich hab meinen Pickel noch!", "Und ich ha min Pickel no!"], ["We'll find the ice axe in spring. Probably.", "Den Pickel finden wir im Frühling. Wahrscheinlich.", "De Pickel finde mer im Früehlig. Wahrschiinlich."],
  ["Your ice axe! 🪓💨 Bye bye...", "Dein Pickel! 🪓💨 Tschüss...", "Din Pickel! 🪓💨 Tschüss..."], ["TOO FAST! Tumble! ❄️", "ZU SCHNELL! Überschlag! ❄️", "Z SCHNÄLL! Überschlag! ❄️"], ["Rock! Ouch! 🪨", "Stein! Autsch! 🪨", "Stei! Au! 🪨"],
  ["GLISSADE! ← → steer · hold [A] to brake with the axe (not too hard at full speed!)", "ABFAHRT! ← → lenken · [A] halten = mit dem Pickel bremsen (bei Vollgas nicht zu fest!)", "ABFAHRT! ← → stüüre · [A] hebe = mit em Pickel bremse (bi Vollgas nöd z fescht!)"],
  ["Too fast! Brake!", "Zu schnell! Bremsen!", "Z schnäll! Bremse!"], ["Bunny Flat! What a ride. ❄️", "Bunny Flat! Was für eine Fahrt. ❄️", "Bunny Flat! Was für e Fahrt. ❄️"],
  // speakers
  ["Postcard", "Postkarte", "Poschtcharte"], ["Officer", "Polizist", "Polizischt"], ["Bartender", "Barkeeper", "Barkeeper"], ["Deer", "Reh", "Reh"], ["Local", "Einheimischer", "Iiheimische"], ["Frog guy", "Frosch-Typ", "Frosch-Typ"], ["Shrimp", "Crevette", "Crevette"],
]);
