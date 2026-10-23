'use strict';
// =====================================================================
//  SARCHITECT — Level 4: Through the Ages (world history, ~9600 BC → AD 476)
//  Loaded after index.html, california.js and zug.js; shares their globals.
//  A time portal in the Höllgrotten (Baar) leads through five eras, one map each:
//  Neolithic · Mesopotamia · Egypt · Greece · Rome. C-Real plays a historical figure in every era.
//  Edit FINAL_MESSAGE_4 below for the Level 4 ending (en / de / gsw).
// =====================================================================
const FINAL_MESSAGE_4 = {
  en: "Sarah,\n" +
    "we raised pillars with hunters, wrestled with Gilgamesh, out-built Imhotep, outran the Persians and Vesuvius, and sneaked into the Pantheon at night.\n" +
    "Ten thousand years of people building, writing, dreaming. And in all of history, my favourite chapter is still the one I write with you.\n" +
    "I love you. — C-Real ♥",
  de: "Sarah,\n" +
    "wir haben mit Jägern Pfeiler aufgerichtet, mit Gilgamesch gerungen, Imhotep übertrumpft, die Perser und den Vesuv abgehängt und uns nachts ins Pantheon geschlichen.\n" +
    "Zehntausend Jahre, in denen Menschen bauen, schreiben, träumen. Und von der ganzen Geschichte ist mein Lieblingskapitel immer noch das, das ich mit dir schreibe.\n" +
    "Ich liebe dich. — C-Real ♥",
  gsw: "Sarah,\n" +
    "mir händ mit Jäger Pfiler ufgstellt, mit em Gilgamesch grunge, de Imhotep übertrumpft, d Perser und de Vesuv abghängt und üs znacht is Pantheon gschliche.\n" +
    "Zähtuusig Jahr, wo Mänsche baued, schriibed, träumed. Und vo de ganze Gschicht isch mis Lieblingskapitel immer no das, won ich mit dir schriibe.\n" +
    "Ich ha di mega gern. — C-Real ♥",
};
const L4 = () => ST.l4;
const st4 = (k, n = 1) => { L4().stats[k] = (L4().stats[k] || 0) + n; };
const q4 = id => !!L4().quests[id];
const at4 = (tx, ty) => ({ x: tx * 16 + 8, y: ty * 16 + 10 });

// ---------------------------------------------------------------- tiles
Object.assign(T, { DUNE: 40, FIELD: 41, MARBLE: 42, PALM: 43, CEDAR: 44, OLIVE: 45, REED: 46, STEPPE: 47, CYPRESS: 48 });
for (const id of [T.PALM, T.CEDAR, T.OLIVE, T.CYPRESS]) SOLID.add(id);
TILE_HOOKS.push(({ r, speck, cdot }) => {
  const four = fn => [0, 1, 2, 3].map(() => mk(fn));
  GROUND[T.DUNE] = four(x => { speck(x, '#e2c47e', ['#d4b46c', '#ecd294', '#c8a860'], 18); x.fillStyle = 'rgba(160,120,60,.25)'; x.fillRect(0, (r() * 14) | 0, 16, 1); });
  GROUND[T.STEPPE] = four(x => speck(x, '#b8a868', ['#a89858', '#c8b878', '#8a9a50'], 26));
  GROUND[T.FIELD] = four(x => { x.fillStyle = '#d8b850'; x.fillRect(0, 0, 16, 16); for (let i = 0; i < 16; i += 3) { x.fillStyle = '#b89838'; x.fillRect(i, 0, 1, 16); x.fillStyle = '#f0d070'; x.fillRect(i + 1, (r() * 12) | 0, 1, 3); } });
  GROUND[T.MARBLE] = four(x => { x.fillStyle = '#e6e2d8'; x.fillRect(0, 0, 16, 16); x.fillStyle = '#d2cec2'; x.fillRect(0, 0, 16, 1); x.fillRect(0, 0, 1, 16); x.fillRect(0, 8, 16, 1); x.fillStyle = '#c8c4d0'; x.fillRect((r() * 12) | 0, (r() * 12) | 0, 3, 1); });
  const tree = (trunk, leaves) => four(x => {
    x.fillStyle = 'rgba(0,0,0,.22)'; x.beginPath(); x.ellipse(8, 14, 6, 2, 0, 0, 7); x.fill();
    x.fillStyle = trunk; x.fillRect(7, 9, 2, 6); leaves(x);
  });
  OVER[T.PALM] = tree('#8a6a3a', x => { x.fillStyle = '#8a6a3a'; x.fillRect(7, 3, 2, 8); for (const [dx, dy] of [[-6, 1], [6, 1], [-5, -2], [5, -2], [0, -3]]) { x.fillStyle = '#3f8a3a'; x.beginPath(); x.moveTo(8, 3); x.lineTo(8 + dx, 3 + dy); x.lineTo(8 + dx * .6, 5 + dy); x.fill(); } cdot(x, 8, 4, 1.5, '#7a4a20'); });
  OVER[T.CEDAR] = tree('#4a3020', x => { for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? '#1f4a2c' : '#2a5a36'; x.fillRect(2 + i, 2 + i * 3, 12 - i * 2, 3); } x.fillStyle = '#1a3a24'; x.fillRect(4, 13, 8, 1); });
  OVER[T.OLIVE] = tree('#6a5a4a', x => { cdot(x, 8, 7, 5.5, '#7a9a6a'); cdot(x, 6, 6, 3, '#94b080'); cdot(x, 10, 8, 2, '#5a7a4a'); x.fillStyle = '#3a3a2a'; x.fillRect(5, 8, 1, 1); x.fillRect(10, 5, 1, 1); });
  OVER[T.CYPRESS] = tree('#4a3a2a', x => { x.fillStyle = '#1f4a2a'; x.beginPath(); x.ellipse(8, 7, 3, 7, 0, 0, 7); x.fill(); x.fillStyle = '#2f6a3a'; x.fillRect(7, 2, 1, 9); });
  OVER[T.REED] = four(x => { for (let i = 0; i < 5; i++) { const fx = 2 + ((r() * 12) | 0); x.fillStyle = '#5a8a3a'; x.fillRect(fx, 5 + ((r() * 4) | 0), 1, 9); x.fillStyle = '#8aa84a'; x.fillRect(fx - 1, 4 + ((r() * 3) | 0), 3, 2); } });
});

// ---------------------------------------------------------------- music (one tune per era + the time warp)
Object.assign(MUSIC, {
  stone: { step: .3, n: [69, 0, 72, 74, 0, 72, 69, 0, 67, 0, 69, 0, 64, 0, 0, 0, 69, 0, 72, 76, 74, 0, 72, 69, 67, 0, 64, 0, 62, 0, 0, 0], bass: [45, 45, 40, 43], type: 'triangle', v: .035 },
  meso: { step: .26, n: [62, 63, 66, 67, 0, 66, 63, 62, 0, 62, 63, 0, 66, 67, 69, 0, 70, 69, 67, 66, 0, 63, 62, 0, 58, 0, 62, 0, 0, 0, 0, 0], bass: [50, 50, 48, 50], type: 'triangle', v: .033 },
  nile: { step: .24, n: [64, 65, 68, 69, 71, 0, 69, 68, 65, 64, 0, 0, 65, 64, 62, 64, 0, 64, 65, 68, 72, 71, 69, 68, 69, 0, 65, 0, 64, 0, 0, 0], bass: [52, 52, 53, 52], type: 'triangle', v: .033 },
  hellas: { step: .25, n: [62, 64, 65, 67, 69, 0, 67, 65, 64, 0, 62, 0, 60, 62, 0, 0, 69, 0, 71, 72, 71, 69, 67, 0, 65, 64, 62, 0, 62, 0, 0, 0], bass: [50, 48, 46, 48], type: 'sine', v: .045 },
  roma: { step: .22, n: [67, 67, 72, 0, 72, 74, 76, 0, 74, 72, 71, 0, 67, 0, 0, 0, 69, 69, 72, 0, 74, 72, 71, 69, 67, 0, 71, 0, 72, 0, 0, 0], bass: [48, 43, 48, 43], type: 'square', v: .02 },
  warp: { step: .09, n: [60, 64, 67, 72, 76, 79, 84, 79, 76, 72, 67, 64], bass: [36, 41, 43, 36], type: 'sine', v: .04 },
});

// ---------------------------------------------------------------- the chronicle: event cards
// y = year (negative = BC), a = approximate, nt = not used on the exam timeline (legend / undatable)
const CARDS4 = {
  // era 0: the Neolithic revolution
  gobekli: { e: 0, y: -9600, a: 1, i: '🗿', title: 'Göbekli Tepe', text: 'Hunter-gatherers raised huge T-shaped stone pillars carved with foxes, boars and vultures. Monumental architecture BEFORE farming!' },
  farming: { e: 0, y: -9500, a: 1, i: '🌾', title: 'The first farmers', text: 'In the Fertile Crescent people began to sow wild einkorn and emmer wheat and to keep goats and sheep: the Neolithic Revolution.' },
  catal: { e: 0, y: -7400, a: 1, i: '🪜', title: 'Çatalhöyük', text: 'A huge town without streets: houses stood wall to wall, and you climbed in through a hole in the roof, by ladder.' },
  pottery: { e: 0, y: -7000, a: 1, i: '🏺', title: 'Pottery', text: 'Clay pots to store grain and to cook. At first shaped by hand: the potter\'s wheel came much later, in Mesopotamia.' },
  pfahl: { e: 0, y: -4300, a: 1, i: '🛶', title: 'Pile dwellings', text: 'Farmers built villages on stilts along Alpine lakes, even at the Zugersee. Since 2011 they are a UNESCO World Heritage Site.' },
  otzi: { e: 0, y: -3300, a: 1, i: '🧊', title: 'Ötzi the Iceman', text: 'He died in the Ötztal Alps and was found in the ice in 1991, with his copper axe, bow, bearskin cap and grass cloak.' },
  // era 1: Mesopotamia
  wheel: { e: 1, y: -3500, a: 1, i: '🛞', title: 'The wheel', text: 'First potter\'s wheels, then wheeled carts. The wheel came thousands of years after farming!' },
  writing: { e: 1, y: -3200, a: 1, i: '✍️', title: 'Cuneiform writing', text: 'In Uruk, scribes pressed wedge-shaped marks into wet clay with a reed: the first writing. At first mostly to count grain, sheep and beer.' },
  uruk: { e: 1, y: -2900, a: 1, i: '🏙️', title: 'Uruk, the first big city', text: 'With maybe 40,000 people, temples, workshops and walls 9 km long, Uruk was one of the first real cities in the world.' },
  gilgamesh: { e: 1, y: -2700, a: 1, i: '👑', title: 'Gilgamesh', text: 'Probably a real king of Uruk who became a legend. The Epic of Gilgamesh is one of the oldest great stories of humankind.' },
  epic: { e: 1, y: -2100, a: 1, i: '🌲', title: 'The Epic of Gilgamesh', text: 'The first Gilgamesh poems were written down around 2100 BC. Gilgamesh and his wild friend Enkidu travel to the Cedar Forest and defeat its guardian, Humbaba.' },
  flood: { e: 1, y: -2000, nt: 1, i: '🌊', title: 'Utnapishtim and the flood', text: 'In the epic, Utnapishtim survives a great flood in a boat full of animals. Gilgamesh searches for eternal life and learns: no one lives forever.' },
  sargon: { e: 1, y: -2334, a: 1, i: '🏹', title: 'Sargon of Akkad', text: 'He united the cities of Mesopotamia into the first empire in history.' },
  ziggurat: { e: 1, y: -2100, a: 1, i: '🧱', title: 'The Ziggurat of Ur', text: 'King Ur-Nammu built a giant stepped temple for the moon god Nanna: a core of mud bricks, faced with baked bricks set in bitumen.' },
  hammurabi: { e: 1, y: -1754, a: 1, i: '⚖️', title: 'The Code of Hammurabi', text: 'King Hammurabi of Babylon had 282 laws carved into a stone stele: "an eye for an eye", rules for builders, and even for beer sellers.' },
  // era 2: Egypt
  hiero: { e: 2, y: -3200, a: 1, i: '👁️', title: 'Hieroglyphs', text: 'Egyptian writing with hundreds of signs: some stand for sounds, others for whole words. Written on papyrus, stone and temple walls.' },
  unify: { e: 2, y: -3100, a: 1, i: '👑', title: 'Egypt unites', text: 'King Narmer united Upper and Lower Egypt. Pharaohs then ruled for about 3,000 years.' },
  steppyr: { e: 2, y: -2650, a: 1, i: '🏗️', title: 'The Step Pyramid', text: 'Designed by Imhotep, the first architect we know by name: six stacked mastabas, the oldest large stone building in the world.' },
  giza: { e: 2, y: -2560, a: 1, i: '🏜️', title: 'The Great Pyramid of Giza', text: 'Built for Pharaoh Khufu from about 2.3 million blocks. At 146 m it was the tallest building on Earth for about 3,800 years.' },
  mummy: { e: 2, y: -2600, nt: 1, i: '🐈', title: 'Mummies', text: 'Embalmers removed the organs (but left the heart), dried the body in natron salt for 40 days and wrapped it in linen: about 70 days in all. Cats were mummified too!' },
  hatshepsut: { e: 2, y: -1479, a: 1, i: '🌴', title: 'Hatshepsut', text: 'One of the most successful pharaohs, and a woman. She is often shown with the pharaoh\'s false beard. Her terraced temple is stunning architecture.' },
  tut: { e: 2, y: -1323, a: 1, i: '🎭', title: 'Tutankhamun', text: 'A young pharaoh who died at about 19. In 1922 Howard Carter found his almost untouched tomb, with the famous golden mask.' },
  kadesh: { e: 2, y: -1259, i: '🕊️', title: 'The first peace treaty', text: 'After the battle of Kadesh, Ramesses II and the Hittites signed one of the oldest known peace treaties. A copy hangs at the United Nations.' },
  rosetta: { e: 2, y: -196, i: '🪨', title: 'The Rosetta Stone', text: 'The same decree in hieroglyphs, demotic and Greek. With it, Jean-François Champollion deciphered the hieroglyphs in 1822.' },
  cleopatra: { e: 2, y: -30, i: '🐍', title: 'Cleopatra', text: 'The last ruler of Ptolemaic Egypt. She lived closer in time to the Moon landing than to the building of the Great Pyramid!' },
  // era 3: Greece
  olympia: { e: 3, y: -776, i: '🏃‍♀️', title: 'The first Olympic Games', text: 'Athletes raced the stadion, about 192 m, at Olympia in honour of Zeus. Women were not allowed to compete.' },
  homer: { e: 3, y: -750, a: 1, i: '🎶', title: 'Homer', text: 'The Iliad (the Trojan War) and the Odyssey (Odysseus\' long trip home) were sung by bards and later written down.' },
  democracy: { e: 3, y: -508, i: '🗳️', title: 'Democracy in Athens', text: 'Cleisthenes gave power to the assembly of citizens. But only free adult men were citizens: no women, no slaves, no foreigners.' },
  marathon: { e: 3, y: -490, i: '🏛️', title: 'Marathon', text: 'Athens beat the Persians at Marathon. Legend says a messenger ran about 40 km to Athens to announce the victory.' },
  thermo: { e: 3, y: -480, i: '🛡️', title: 'Thermopylae and Salamis', text: 'King Leonidas and his 300 Spartans (with a few thousand other Greeks) held the pass; then Athens\' fleet beat the Persians at Salamis.' },
  parthenon: { e: 3, y: -447, i: '🏛️', title: 'The Parthenon', text: 'Built under Pericles by Ictinus and Callicrates, with sculptures by Phidias. Its columns swell slightly (entasis) and almost nothing is straight, so it LOOKS perfectly straight.' },
  socrates: { e: 3, y: -399, i: '🤔', title: 'Socrates', text: 'He asked questions until people noticed what they did not know. Athens sentenced him to death. His student Plato founded the Academy; Plato\'s student was Aristotle.' },
  delphi: { e: 3, y: -600, nt: 1, i: '🔮', title: 'The Oracle of Delphi', text: 'The Pythia, a priestess, gave mysterious prophecies. Carved at the temple: "Know thyself" and "Nothing in excess".' },
  alexander: { e: 3, y: -333, i: '⚔️', title: 'Alexander the Great', text: 'Aristotle\'s student became king at 20 and built an empire from Greece to India. At Gordion he simply cut the famous knot.' },
  archimedes: { e: 3, y: -250, a: 1, i: '🛁', title: 'Archimedes', text: 'A genius from Syracuse: levers, pulleys, π... and "Eureka!" in the bathtub, when he understood why things float.' },
  // era 4: Rome
  romulus: { e: 4, y: -753, i: '🐺', title: 'The founding of Rome', text: 'Legend says the twins Romulus and Remus, raised by a she-wolf, founded Rome on the Tiber. Archaeologists do find villages there from that time.' },
  republic: { e: 4, y: -509, i: '🦅', title: 'The Roman Republic', text: 'The Romans chased away their last king. Two consuls, elected every year, and the Senate ruled instead. SPQR: the Senate and People of Rome.' },
  geese: { e: 4, y: -390, nt: 1, i: '🪿', title: 'The geese of Juno', text: 'Legend: when Gauls sneaked up the Capitol at night, the sacred geese honked and woke the defenders.' },
  hannibal: { e: 4, y: -218, i: '🐘', title: 'Hannibal crosses the Alps', text: 'Carthage\'s general marched an army with about 37 elephants over the Alps to attack Rome. Rome still won, and destroyed Carthage in 146 BC.' },
  helvetii: { e: 4, y: -58, i: '🏔️', title: 'The Helvetii', text: 'The Celtic Helvetii from today\'s Switzerland tried to move to Gaul. Julius Caesar stopped them at Bibracte and sent them home.' },
  caesar: { e: 4, y: -44, i: '🗡️', title: 'The Ides of March', text: 'Julius Caesar was stabbed in the Senate on 15 March 44 BC. His Julian calendar is almost the one we still use today.' },
  augustus: { e: 4, y: -27, i: '🏺', title: 'Augustus, the first emperor', text: 'Caesar\'s adopted son Octavian became Augustus, the first emperor. About 200 years of relative peace followed: the Pax Romana.' },
  pompeii: { e: 4, y: 79, i: '🌋', title: 'Vesuvius buries Pompeii', text: 'The volcano buried Pompeii and Herculaneum under ash. Pliny the Younger watched from across the bay and described it in his letters.' },
  colosseum: { e: 4, y: 80, i: '🏟️', title: 'The Colosseum', text: 'The amphitheatre held about 50,000 spectators, with a giant sun awning and lifts that brought animals up from underground.' },
  pantheon: { e: 4, y: 125, a: 1, i: '🌕', title: 'The Pantheon', text: 'Hadrian\'s temple has a 43.3 m concrete dome with an open oculus. It is still the largest unreinforced concrete dome in the world.' },
  constantine: { e: 4, y: 313, i: '✝️', title: 'Constantine', text: 'With the Edict of Milan, Christians could worship freely. In 330 Constantine made Byzantium his new capital: Constantinople.' },
  split: { e: 4, y: 395, i: '↔️', title: 'East and West', text: 'After Emperor Theodosius died, the empire was split for good into a Western and an Eastern half.' },
  alaric: { e: 4, y: 410, i: '🔥', title: 'The sack of Rome', text: 'The Visigoths under Alaric plundered Rome: the first enemy to take the city in 800 years.' },
  fall: { e: 4, y: 476, i: '👑', title: 'The end of the Western Roman Empire', text: 'Odoacer deposed the boy emperor Romulus Augustulus and sent the imperial insignia to Constantinople. The Eastern Roman Empire lasted until 1453.' },
  middle: { e: 4, y: 529, a: 1, i: '📖', title: 'The Middle Ages begin', text: 'Monasteries like Monte Cassino (founded around 529) and later St. Gallen kept knowledge alive: monks copied the old books by hand for centuries.' },
};
const CARD_IDS4 = Object.keys(CARDS4).sort((a, b) => CARDS4[a].e - CARDS4[b].e || CARDS4[a].y - CARDS4[b].y);
const cardCount4 = () => CARD_IDS4.filter(k => L4().cards[k]).length;
function yearLabel4(y, a) { return y < 0 ? t(a ? '~{0} BC' : '{0} BC', -y) : t(a ? '~AD {0}' : 'AD {0}', y); }
function card4(id, quiet) {
  if (L4().cards[id]) return;
  L4().cards[id] = 1; sfx.ding(); saveGame();
  if (!quiet) toast(t('📜 New chronicle card: {0}', t(CARDS4[id].title)));
}

// ---------------------------------------------------------------- the five era maps
const sign4 = (tx, ty, text, extra) => ({ x: tx * 16 + 8, y: ty * 16 + 4, act: () => say([['Sign', text]], extra) });
const trail4 = pts => Object.assign(pts, { trail: true });
// ----- era 0: from the Fertile Crescent (east) to the Alps (west), ~9600–3300 BC
const e0Zone = (tx, ty) => tx < 16 ? 'e0alps' : tx < 34 ? 'e0lake' : tx < 54 ? 'e0catal' : 'e0tepe';
const e0Lake = (tx, ty) => ((tx - 25) / 9.5) ** 2 + ((ty - 33) / 6) ** 2 < 1;
const e0River = ty => 46 + 2 * Math.sin(ty * .3);
function e0Base(tx, ty) { const z = e0Zone(tx, ty); return z === 'e0alps' ? (ty < 9 || ty > 33 ? T.SNOW : T.ALP) : z === 'e0lake' ? T.G : T.STEPPE; }
function e0Terrain(tx, ty, r) {
  const z = e0Zone(tx, ty); let t = e0Base(tx, ty); const k = r();
  if (z === 'e0alps') { if (k < .1) t = T.ROCK; else if (k < .2) t = T.PINE; }
  else if (z === 'e0lake') { if (k < .07) t = T.TREE; else if (k < .1) t = T.FLOW; if (e0Lake(tx, ty)) t = T.WATER; }
  else if (z === 'e0catal') { if (k < .03) t = T.TREE; else if (k < .05) t = T.ROCK; if (tx >= e0River(ty) && tx < e0River(ty) + 2) t = T.WATER; }
  else { if (k < .06) t = T.ROCK; else if (k < .08) t = T.TREE; }
  if (tx === 0 || ty === 0 || tx === 75 || ty === 39) t = T.ROCK;
  return t;
}
const ERA0 = {
  key: 'neo', name: 'The Neolithic', years: '~9600–3300 BC', pose: 'otzi', music: 'stone', W: 76, H: 40, seed: 9600, from: -9600,
  zoneOf: e0Zone, baseTile: e0Base, terrain: e0Terrain,
  paths: [trail4([[71, 22], [60, 22], [50, 22], [40, 22], [30, 19], [16, 20], [6, 20]]), trail4([[63, 22], [63, 18]]), trail4([[42, 22], [42, 16]]), trail4([[24, 20], [24, 26]]), trail4([[40, 22], [40, 26]])],
  buildings: [
    { id: 'gobekli', x: 60, y: 12, w: 7, h: 5, kind: 'tepe', label: 'Pillars' },
    { id: 'catal', x: 38, y: 10, w: 9, h: 5, kind: 'catal', label: 'Roof ladder' },
    { id: 'pfahl', x: 20, y: 23, w: 8, h: 3, kind: 'pfahl', label: 'Village' },
    { id: 'tent1', x: 66, y: 27, w: 3, h: 2, kind: 'tent' }, { id: 'tent2', x: 70, y: 13, w: 3, h: 2, kind: 'tent' },
    { id: 'portal', x: 5, y: 18, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { e0tepe: { ...at4(66, 20) }, e0catal: { ...at4(36, 19) }, e0lake: { ...at4(30, 17) }, e0alps: { ...at4(10, 22) } },
  start: at4(71, 22),
  signs: [
    sign4(69, 19, 'GÖBEKLI TEPE, ~9600 BC. Hunter-gatherers are building something HUGE up on the hill.'),
    sign4(52, 20, 'ÇATALHÖYÜK, ~7400 BC. Thousands of people, zero streets. Mind the roofs.'),
    sign4(32, 21, 'PILE DWELLINGS, ~4300 BC. Farming has reached the Alpine lakes: even the Zugersee!'),
    sign4(13, 18, 'ÖTZTAL ALPS, ~3300 BC. Cold. Very cold. Someone left a copper axe here.'),
  ],
  zoneNames: { e0tepe: 'Göbekli Tepe ~9600 BC', e0catal: 'Çatalhöyük ~7400 BC', e0lake: 'Alpine lakes ~4300 BC', e0alps: 'Ötztal Alps ~3300 BC' },
  zoneTexts: { e0catal: 'Çatalhöyük! A whole town where you walk on the roofs. 🪜', e0lake: 'Houses on stilts! The ancestors of every Swiss lake village. 🛶', e0alps: 'The Alps. This is where I belong. Well, in 3300 BC. 🧊' },
  crTexts: ['Fun fact: dogs were tamed long before anyone farmed. Good boys came first. 🐕', 'No wheel, no metal, no writing... and they still built Göbekli Tepe. Respect.', 'Farming spread from here all the way to the Alps. Slowly. Like, 5,000 years slowly.', 'Careful with the wild boars. They don\'t care which millennium it is. 🐗'],
};
// ----- era 1: Mesopotamia, the land between the rivers, ~3500–1750 BC
const euX = ty => 12 + ty * .7 + 1.5 * Math.sin(ty * .35), tiX = ty => 46 + ty * .55 + 1.5 * Math.sin(ty * .3);
const e1Gulf = (tx, ty) => tx > 52 && ty > 38 - (tx - 52) * .3;
const e1Zone = (tx, ty) => tx < 11 && ty < 22 ? 'e1cedar' : tx < euX(ty) ? 'e1steppe' : tx > tiX(ty) + 1 ? 'e1zagros' : ty < 13 ? 'e1babylon' : ty > 29 ? 'e1ur' : 'e1uruk';
function e1Base(tx, ty) { const z = e1Zone(tx, ty); return z === 'e1cedar' ? T.F : z === 'e1steppe' ? T.STEPPE : z === 'e1zagros' ? T.DUNE : T.G; }
function e1Terrain(tx, ty, r) {
  const z = e1Zone(tx, ty); let t = e1Base(tx, ty); const k = r();
  if (z === 'e1cedar') { if (k < .32) t = T.CEDAR; }
  else if (z === 'e1steppe') { if (k < .03) t = T.ROCK; else if (k < .05) t = T.TREE; }
  else if (z === 'e1zagros') { if (k < .05) t = T.ROCK; }
  else { if (k < .06) t = T.PALM; else if (k < .2) t = T.FIELD; }
  if (Math.abs(tx - euX(ty)) < 1.2 || Math.abs(tx - tiX(ty)) < 1.1 || e1Gulf(tx, ty)) t = T.WATER;
  if (tx === 0 || ty === 0 || tx === 75 || ty === 43) t = e1Gulf(tx, ty) ? T.WATER : z === 'e1cedar' ? T.CEDAR : T.ROCK;
  return t;
}
const ERA1 = {
  key: 'meso', name: 'Mesopotamia', years: '~3500–1750 BC', pose: 'enkidu', music: 'meso', W: 76, H: 44, seed: 3200, from: -3200,
  zoneOf: e1Zone, baseTile: e1Base, terrain: e1Terrain,
  paths: [[[34, 23], [33, 20], [33, 12], [30, 8], [30, 7]], [[30, 8], [41, 8], [41, 6]], [[34, 23], [40, 25], [42, 30], [42, 38], [48, 38], [48, 37]], [[48, 38], [55, 35]],
    [[33, 20], [24, 20], [18, 24], [10, 30]], trail4([[18, 24], [13, 16]]), [[40, 25], [40, 24]]],
  buildings: [
    { id: 'urukgate', x: 30, y: 15, w: 7, h: 4, kind: 'gate', label: 'Uruk gate' },
    { id: 'eduba', x: 38, y: 21, w: 5, h: 3, kind: 'mudhouse', label: 'Tablet house' },
    { id: 'mh1', x: 27, y: 23, w: 4, h: 3, kind: 'mudhouse' }, { id: 'mh2', x: 44, y: 16, w: 4, h: 3, kind: 'mudhouse' }, { id: 'mh3', x: 36, y: 27, w: 3, h: 2, kind: 'mudhouse' },
    { id: 'ziggurat', x: 44, y: 31, w: 9, h: 6, kind: 'ziggurat', label: 'Sneak in' },
    { id: 'ishtar', x: 26, y: 3, w: 7, h: 4, kind: 'ishtar' },
    { id: 'portal', x: 40, y: 4, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { e1steppe: { ...at4(8, 30) }, e1uruk: { ...at4(31, 21) }, e1ur: { ...at4(40, 36) }, e1bab: { ...at4(35, 10) } },
  start: at4(34, 23),
  signs: [
    sign4(36, 23, 'URUK, ~3200 BC. Biggest city in the world: maybe 40,000 people. Writing was just invented here!'),
    sign4(16, 28, 'THE STEPPE. Wild animals, wild lions, and (rumour has it) a wild man.'),
    sign4(52, 39, 'UR. Home of the moon god Nanna and his brand-new ziggurat.'),
    { x: 35 * 16 + 8, y: 7 * 16 + 4, label: 'Read the stele', act: () => hammurabiStele(), draw: s => drawStele(s) },
  ],
  zoneNames: { e1steppe: 'The steppe', e1cedar: 'The Cedar Forest', e1uruk: 'Uruk ~3200 BC', e1ur: 'Ur ~2100 BC', e1babylon: 'Babylon ~1754 BC', e1zagros: 'The Zagros desert' },
  zoneTexts: { e1cedar: 'The Cedar Forest... Humbaba\'s home. Let\'s be brave. And quick. 🌲', e1ur: 'Ur! That ziggurat is basically a mountain made of mud bricks. 🧱', e1babylon: 'Babylon! The Ishtar Gate is glazed blue. Very fancy. 💙' },
  crTexts: ['Sumerians loved beer so much they had a goddess for it: Ninkasi. Elio would approve. 🍺', 'Mud bricks: mud + straw + sun. Cheap, and it worked for thousands of years.', 'Writing was invented to count sheep. Literature came later. Priorities.', 'Lions in the steppe again. And yes... their poop. Some things never change. 🦁'],
};
// ----- era 2: Egypt along the Nile (north = delta at the top), ~3100–30 BC
const nileX = ty => 32 + 3 * Math.sin(ty * .11);
const e2Water = (tx, ty) => {
  if (ty < 3) return true;
  if (ty >= 10) return Math.abs(tx - nileX(ty)) < 1.6;
  const c = nileX(10); return Math.abs(tx - (c - (10 - ty) * 1.3)) < 1 || Math.abs(tx - (c + (10 - ty) * 1.3)) < 1;
};
const e2Zone = (tx, ty) => ty < 12 ? 'e2delta' : ty < 24 ? 'e2giza' : ty < 32 ? 'e2saqqara' : ty < 47 ? 'e2thebes' : 'e2valley';
function e2Base(tx, ty) { return Math.abs(tx - nileX(Math.max(ty, 10))) < (ty < 10 ? 12 : 6.5) ? T.G : T.DUNE; }
function e2Terrain(tx, ty, r) {
  let t = e2Base(tx, ty); const k = r(), d = Math.abs(tx - nileX(Math.max(ty, 10)));
  if (t === T.G) { if (d < 2.6 && k < .14) t = T.REED; else if (k < .06) t = T.PALM; else if (k < .2) t = T.FIELD; }
  else if (e2Zone(tx, ty) === 'e2valley' && tx < 28) { if (k < .12) t = T.ROCK; }
  else if (k < .02) t = T.ROCK;
  if (e2Water(tx, ty)) t = T.WATER;
  if (tx === 0 || tx === 63 || ty === 59) t = T.ROCK;
  return t;
}
const ERA2 = {
  key: 'egypt', name: 'Ancient Egypt', years: '~3100–30 BC', pose: 'imhotep', music: 'nile', W: 64, H: 60, seed: 2650, from: -2650,
  zoneOf: e2Zone, baseTile: e2Base, terrain: e2Terrain,
  paths: [[[25, 29], [24, 20], [24, 12], [20, 8], [17, 8], [17, 7]], [[25, 29], [24, 36], [22, 44], [18, 50], [16, 53]], [[24, 30], [19, 30], [19, 29]], [[24, 20], [18, 20], [18, 19]],
    [[22, 42], [20, 41]], [[24, 38], [36, 38], [42, 40]]],
  buildings: [
    { id: 'steppyr', x: 16, y: 25, w: 7, h: 4, kind: 'steppyr', label: 'Building site' },
    { id: 'pyramid', x: 14, y: 13, w: 9, h: 6, kind: 'pyramid', label: 'Sneak in' }, { id: 'pyr2', x: 6, y: 16, w: 5, h: 4, kind: 'pyramid2' },
    { id: 'sphinx', x: 20, y: 21, w: 4, h: 2, kind: 'sphinx' },
    { id: 'karnak', x: 38, y: 35, w: 9, h: 5, kind: 'temple', label: 'Temple school' },
    { id: 'deir', x: 15, y: 38, w: 7, h: 3, kind: 'terrace' },
    { id: 'tomb', x: 14, y: 50, w: 4, h: 3, kind: 'tomb', label: 'Tomb' },
    { id: 'pharos', x: 7, y: 3, w: 3, h: 4, kind: 'pharos' },
    { id: 'portal', x: 16, y: 5, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { e2saq: { ...at4(27, 28) }, e2giza: { ...at4(26, 17) }, e2thebes: { ...at4(25, 40) }, e2delta: { ...at4(21, 10) } },
  start: at4(25, 29),
  signs: [
    sign4(26, 26, 'SAQQARA. Pharaohs have ruled a united Egypt since King Narmer, around 3100 BC.', () => card4('unify')),
    sign4(25, 22, 'THE GREAT SPHINX, ~2500 BC. Lion body, pharaoh\'s head. The nose? Long gone.'),
    sign4(22, 8, 'A big black stone with three scripts on it... Hieroglyphs, demotic, Greek. 196 BC.', () => card4('rosetta')),
    sign4(20, 48, 'VALLEY OF THE KINGS. Pharaohs were buried in hidden rock tombs here. Hidden... mostly.'),
  ],
  zoneNames: { e2delta: 'The Nile delta', e2giza: 'Giza ~2560 BC', e2saqqara: 'Saqqara ~2650 BC', e2thebes: 'Thebes ~1450 BC', e2valley: 'Valley of the Kings' },
  zoneTexts: { e2giza: 'GIZA. Those pyramids... I\'m not jealous. I\'m inspired. 🔺', e2thebes: 'Thebes: temples, obelisks and the most beautiful terraced temple ever. 🌴', e2delta: 'The delta! Papyrus everywhere. And Alexandria, much later. 📜' },
  crTexts: ['The Nile floods every summer and leaves black, fertile mud. No Nile, no Egypt. 🌊', 'Egyptians loved cats. Hurting one was a serious crime. Sarah, you\'d have fit right in. 🐈', 'Pyramid builders were paid workers, not slaves. They even got beer rations. 🍺', 'Watch out for the crocodiles. The Nile is not a Bolleblu waterslide. 🐊'],
};
// ----- era 3: Ancient Greece, ~776–146 BC
const seaE3 = ty => 58 + 4 * Math.sin(ty * .2);
const e3Water = (tx, ty) => tx > seaE3(ty) || ty > 42 + 1.5 * Math.sin(tx * .3) || ((tx - 52) / 7) ** 2 + ((ty - 40) / 4) ** 2 < 1 || (ty >= 21 && ty <= 22 && tx >= 6 && tx <= 30);
const e3Zone = (tx, ty) => ty < 12 ? (tx < 26 ? 'e3delphi' : tx < 46 ? 'e3thermo' : 'e3pella') : ty > 22 && tx < 30 ? 'e3olympia' : tx > 44 && ty < 26 ? 'e3marathon' : 'e3athens';
function e3Base(tx, ty) { const z = e3Zone(tx, ty); return z === 'e3delphi' || z === 'e3thermo' ? T.ALP : z === 'e3athens' ? T.STEPPE : T.G; }
function e3Terrain(tx, ty, r) {
  const z = e3Zone(tx, ty); let t = e3Base(tx, ty); const k = r();
  if (z === 'e3delphi') { if (k < .12) t = T.ROCK; else if (k < .18) t = T.PINE; }
  else if (z === 'e3thermo') { if (k < .1) t = T.ROCK; else if (k < .13) t = T.PINE; }
  else if (z === 'e3olympia') { if (k < .08) t = T.OLIVE; else if (k < .11) t = T.CYPRESS; else if (k < .13) t = T.FLOW; }
  else if (z === 'e3athens') { if (k < .05) t = T.OLIVE; else if (k < .06) t = T.CYPRESS; }
  else { if (k < .05) t = T.OLIVE; }
  if (e3Water(tx, ty)) t = T.WATER;
  if (tx === 0 || ty === 0) t = T.ROCK;
  return t;
}
const ERA3 = {
  key: 'greece', name: 'Ancient Greece', years: '~776–146 BC', pose: 'homer', music: 'hellas', W: 76, H: 46, seed: 776, from: -776,
  zoneOf: e3Zone, baseTile: e3Base, terrain: e3Terrain,
  paths: [[[13, 33], [13, 30], [11, 30]], [[13, 33], [24, 30], [36, 30], [42, 30], [42, 29]], [[36, 30], [40, 34], [40, 35]], [[42, 30], [50, 22], [54, 16]],
    [[20, 28], [20, 14], [16, 9], [15, 8]], [[24, 30], [36, 24], [40, 12], [48, 7], [49, 6]], [[48, 7], [56, 8]], trail4([[42, 30], [48, 33]])],
  buildings: [
    { id: 'stadion', x: 6, y: 26, w: 9, h: 4, kind: 'stadium', label: 'Stadion' },
    { id: 'zeus', x: 17, y: 31, w: 6, h: 4, kind: 'gtemple' },
    { id: 'delphi', x: 12, y: 4, w: 6, h: 4, kind: 'gtemple', label: 'Oracle' },
    { id: 'parthenon', x: 38, y: 25, w: 8, h: 4, kind: 'parthenon', label: 'Sneak in' },
    { id: 'stoa', x: 36, y: 32, w: 8, h: 3, kind: 'stoa', label: 'Agora' },
    { id: 'pella', x: 46, y: 3, w: 6, h: 3, kind: 'palace', label: 'Palace' },
    { id: 'portal', x: 55, y: 6, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { e3oly: { ...at4(16, 29) }, e3del: { ...at4(19, 10) }, e3ath: { ...at4(34, 32) }, e3pel: { ...at4(52, 9) } },
  start: at4(13, 33),
  signs: [
    sign4(15, 31, 'OLYMPIA, 776 BC. The very first Olympic Games! Men only. (Says who?)'),
    sign4(37, 29, 'ATHENS. Democracy, philosophy, theatre... and a lot of arguing in the Agora.'),
    sign4(39, 13, 'THERMOPYLAE, 480 BC. A narrow pass between the mountains and the sea.'),
    sign4(47, 9, 'MACEDONIA. Home of King Philip and his very ambitious son.'),
  ],
  zoneNames: { e3olympia: 'Olympia 776 BC', e3delphi: 'Delphi', e3thermo: 'Thermopylae 480 BC', e3athens: 'Athens ~450 BC', e3marathon: 'Marathon 490 BC', e3pella: 'Macedonia 336 BC' },
  zoneTexts: { e3delphi: 'Delphi, the navel of the world. The oracle speaks in riddles. 🔮', e3athens: 'Athens! The Acropolis up there... Sarah, look at those proportions. 🏛️', e3marathon: 'Marathon. The Persians landed here in 490 BC. ⚔️', e3pella: 'Macedonia. A young prince here will conquer half the world. 🐎' },
  crTexts: ['Sing, O Muse... of Sarah, the sneakiest architect in all of Hellas. 🎶', 'The Greeks painted their temples in bright colours! The white marble look came later.', 'Theatre was invented here. Comedy AND tragedy. Like my love life before I met you.', 'Careful, wild boars in the mountains. Very Calydonian. 🐗'],
};
// ----- era 4: Rome, 753 BC – AD 476
const tiberX = ty => 24 + 2 * Math.sin(ty * .3);
const e4Bay = (tx, ty) => ((tx - 36) / 8) ** 2 + ((ty - 47) / 4) ** 2 < 1;
const e4Water = (tx, ty) => tx < 4 + 2 * Math.sin(ty * .25) || ty > 47 || e4Bay(tx, ty) || (ty >= 12 && ty <= 36 && Math.abs(tx - tiberX(ty)) < 1.1) || (ty > 35.5 && ty < 37.5 && tx < tiberX(36) + 1);
const e4Zone = (tx, ty) => ty < 11 ? 'e4alpes' : ty > 37 ? 'e4pompeii' : tx > 56 ? (ty < 25 ? 'e4ravenna' : 'e4oriens') : 'e4roma';
function e4Base(tx, ty) { const z = e4Zone(tx, ty); return z === 'e4alpes' ? (ty < 5 ? T.SNOW : T.ALP) : z === 'e4oriens' ? T.STEPPE : z === 'e4pompeii' && dist(tx, ty, 58, 41) < 8 ? T.VOLC : T.G; }
function e4Terrain(tx, ty, r) {
  const z = e4Zone(tx, ty); let t = e4Base(tx, ty); const k = r();
  if (z === 'e4alpes') { if (k < .1) t = T.ROCK; else if (k < .2) t = T.PINE; }
  else if (z === 'e4roma') { if (k < .04) t = T.CYPRESS; else if (k < .06) t = T.TREE; }
  else if (z === 'e4pompeii') { if (t === T.G && k < .05) t = T.OLIVE; }
  else if (z === 'e4ravenna') { if (k < .06) t = T.PINE; }
  else if (k < .03) t = T.ROCK;
  if (e4Water(tx, ty)) t = T.WATER;
  if (ty === 0 || tx === 79) t = T.ROCK;
  return t;
}
const ERA4 = {
  key: 'rome', name: 'Rome', years: '753 BC – AD 476', pose: 'odoacer', music: 'roma', W: 80, H: 50, seed: 753, from: -753,
  zoneOf: e4Zone, baseTile: e4Base, terrain: e4Terrain, snowyPine: (tx, ty) => ty < 7,
  paths: [[[29, 24], [34, 25], [34, 30]], [[34, 25], [31, 22], [31, 21]], [[34, 25], [44, 26]], [[34, 25], [34, 12], [34, 8], [40, 8]], [[34, 8], [11, 8], [11, 7]],
    [[34, 30], [38, 36], [44, 42], [47, 43]], [[44, 26], [56, 20], [65, 17], [65, 16]], [[65, 17], [71, 17], [71, 16]], [[56, 20], [62, 30], [66, 37]]],
  buildings: [
    { id: 'pantheon', x: 28, y: 16, w: 6, h: 5, kind: 'pantheon', label: 'Sneak in' },
    { id: 'colosseum', x: 40, y: 20, w: 8, h: 6, kind: 'colosseum', label: 'Colosseum' },
    { id: 'forum', x: 30, y: 27, w: 8, h: 3, kind: 'forum', label: 'Forum' },
    { id: 'circus', x: 40, y: 31, w: 10, h: 3, kind: 'circus' },
    { id: 'helv', x: 8, y: 4, w: 5, h: 3, kind: 'hut', label: 'Village' },
    { id: 'villa', x: 44, y: 40, w: 6, h: 3, kind: 'villa', label: 'Pompeii' },
    { id: 'vesuv', x: 54, y: 37, w: 9, h: 6, kind: 'vesuvius' },
    { id: 'ravenna', x: 62, y: 12, w: 7, h: 4, kind: 'palace', label: 'Palace' },
    { id: 'basilica', x: 66, y: 31, w: 6, h: 4, kind: 'basilica' },
    { id: 'portal', x: 70, y: 14, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { e4rom: { ...at4(36, 23) }, e4alp: { ...at4(30, 6) }, e4pom: { ...at4(40, 39) }, e4rav: { ...at4(60, 18) } },
  start: at4(29, 24),
  signs: [
    sign4(27, 22, 'A bronze she-wolf feeding two little boys. Romulus and Remus, 753 BC (legend).', () => card4('romulus')),
    sign4(37, 30, 'S·P·Q·R — Senatus Populusque Romanus. The Senate and People of Rome. A republic since 509 BC.', () => card4('republic')),
    sign4(52, 23, 'MILESTONE: AD 395. From here on, the empire has two halves: West and East.', () => card4('split')),
    sign4(30, 13, 'The walls are scorched... In AD 410 the Visigoths under Alaric sacked Rome.', () => card4('alaric')),
  ],
  zoneNames: { e4roma: 'Roma', e4alpes: 'The Alps 218 BC', e4pompeii: 'Pompeii AD 79', e4ravenna: 'Ravenna AD 476', e4oriens: 'The road to the East' },
  zoneTexts: { e4alpes: 'The Alps again! Hannibal is about to do something very ambitious with elephants. 🐘', e4pompeii: 'Pompeii. Pretty town. That mountain is... smoking? 🌋', e4ravenna: 'Ravenna, the last capital of the West. Mosaics everywhere! ✨', e4oriens: 'The road to Constantinople: the Roman Empire lives on in the East until 1453.' },
  crTexts: ['Roman concrete: lime, volcanic ash and seawater. Some of it is still getting STRONGER. 🧱', 'All roads lead to Rome. Literally: about 80,000 km of paved roads.', 'The Romans had public toilets, side by side, no walls. Very social. 🚽', 'Mind the geese near the Capitol. They take guard duty very seriously. 🪿'],
};
const ERAS4 = [ERA0, ERA1, ERA2, ERA3, ERA4];
const MAINS4 = [['pillar', 'farm', 'sk_gobekli'], ['wrestle', 'humbaba', 'eduba', 'sk_ziggurat'], ['steppyr', 'cartouche', 'sk_pyramid'], ['olympia', 'marathon', 'sk_parthenon'], ['hannibal', 'pompeii', 'sk_pantheon']];
const SKETCHES4 = [['gobekli', 'T-pillars of Göbekli Tepe', 'The oldest monumental pillars we know: T-shaped stone figures with arms and belts carved on their sides. Some are over 5 m tall.'],
  ['ziggurat', 'The Ziggurat of Ur', 'Three terraces of brick and a long central stairway. The walls lean slightly inward and gently curve, so it looks even taller.'],
  ['pyramid', 'The Grand Gallery', 'Inside the Great Pyramid: an 8.6 m high corbelled gallery, every stone layer stepping a little further in until they almost meet.'],
  ['parthenon', 'Doric columns with entasis', 'Each column swells slightly in the middle and leans a little inward. Optical corrections to make stone look alive and perfectly straight.'],
  ['pantheon', 'The Pantheon\'s oculus', 'A 43.3 m dome with an 8.2 m hole at the top. The concrete gets lighter towards the top, with pumice mixed in. The sunlight wanders across the coffers like a clock.']];
const eraDone4 = e => MAINS4[e].every(k => k.startsWith('sk_') ? L4().sk[k.slice(3)] : q4(k));
const ERA4OF = () => ERAS4[L4().era] || ERA0;
// ---------------------------------------------------------------- people of the past (NPCs with portraits)
const LOOKS4 = {
  'Hunter': { shirt: '#8a6a48', pants: '#6a4a30', hair: '#2a1a10', beard: '#2a1a10', extra: (x, y) => R(x + 5, y - 22, 1, 20, '#7a5a3a') },
  'Farmer': { shirt: '#b89a6a', pants: '#8a6a48', hair: '#5a3a1e', extra: (x, y) => { R(x - 4, y - 20, 8, 3, '#5a3a1e'); R(x - 5, y - 17, 2, 6, '#5a3a1e'); } },
  'Potter': { shirt: '#a8784a', pants: '#7a5a3a', hair: '#3a2a1e', extra: (x, y) => { ell(x + 6, y - 7, 3, 3, '#b86a3a'); R(x + 5, y - 11, 3, 1, '#9a5a2a'); } },
  'Fisher': { shirt: '#7a8a5a', pants: '#5a5a3a', hair: '#6a4a2a', beard: '#6a4a2a', extra: (x, y) => R(x + 5, y - 24, 1, 22, '#8a6a3a') },
  'Gilgamesh': { shirt: '#b8302a', pants: '#e8d8b0', hair: '#1a1210', beard: '#1a1210', extra: (x, y) => { R(x - 3, y - 21, 6, 2, '#ffd34d'); R(x - 3, y - 22, 1, 1, '#ffd34d'); R(x + 2, y - 22, 1, 1, '#ffd34d'); R(x - 3, y - 13, 6, 3, '#1a1210'); } },
  'Teacher': { shirt: '#e8dcc0', pants: '#c8b890', hair: '#1a1210', beard: '#1a1210', extra: (x, y) => { R(x - 3, y - 13, 6, 3, '#1a1210'); R(x + 5, y - 11, 4, 5, '#b8956a'); } },
  'Wheelwright': { shirt: '#c8a878', pants: '#7a6a4a', hair: '#2a1a10', beard: '#2a1a10', extra: (x, y) => { g.strokeStyle = '#6a4a2a'; g.lineWidth = 1.5; g.beginPath(); g.arc(x + 7, y - 7, 4, 0, 7); g.stroke(); } },
  'Sargon': { shirt: '#3a5ab8', pants: '#e8d8b0', hair: '#1a1210', beard: '#1a1210', extra: (x, y) => { R(x - 4, y - 22, 8, 4, '#c8a040'); R(x - 3, y - 13, 6, 3, '#1a1210'); } },
  'Utnapishtim': { shirt: '#d8d0c0', pants: '#b8b0a0', hair: '#f0f0f0', beard: '#f0f0f0', extra: (x, y) => { R(x - 3, y - 13, 6, 4, '#f0f0f0'); R(x - 4, y - 19, 8, 2, '#f0f0f0'); } },
  'Hammurabi': { shirt: '#6a3a8a', pants: '#e8d8b0', hair: '#1a1210', beard: '#1a1210', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#e8d8b0'); R(x - 3, y - 13, 6, 3, '#1a1210'); } },
  'Scribe': { shirt: '#f4f0e6', pants: '#f4f0e6', hair: '#1a1a1a', extra: (x, y) => { R(x - 4, y - 19, 8, 2, '#1a1a1a'); R(x + 5, y - 10, 4, 4, '#e8d8a0'); } },
  'Embalmer': { shirt: '#f4f0e6', pants: '#f4f0e6', extra: (x, y) => { R(x - 3, y - 19, 6, 7, '#1a1a1a'); R(x - 4, y - 23, 2, 5, '#1a1a1a'); R(x + 2, y - 23, 2, 5, '#1a1a1a'); R(x - 1, y - 16, 4, 2, '#1a1a1a'); R(x + 1, y - 17, 1, 1, '#ffd34d'); } },
  'Hatshepsut': { shirt: '#f4f0e6', pants: '#f4f0e6', skin: '#c8956a', extra: (x, y) => { R(x - 4, y - 20, 8, 4, '#3a6ad8'); for (let i = 0; i < 8; i += 2) R(x - 4 + i, y - 20, 1, 4, '#ffd34d'); R(x - 5, y - 17, 2, 7, '#3a6ad8'); R(x + 3, y - 17, 2, 7, '#3a6ad8'); R(x - 1, y - 12, 2, 3, '#3a2a1a'); R(x - 4, y - 12, 8, 2, '#d9a400'); } },
  'Ramesses II': { shirt: '#f4f0e6', pants: '#f4f0e6', skin: '#c8956a', extra: (x, y) => { R(x - 4, y - 22, 8, 5, '#e8e0d0'); R(x - 3, y - 23, 6, 2, '#d8302a'); R(x - 1, y - 12, 2, 3, '#3a2a1a'); R(x - 4, y - 12, 8, 2, '#3a7ad8'); } },
  'Cleopatra': { shirt: '#f4f0e6', pants: '#f4f0e6', skin: '#d8a878', hair: '#1a1a1a', extra: (x, y) => { R(x - 4, y - 19, 8, 3, '#1a1a1a'); R(x - 5, y - 17, 2, 8, '#1a1a1a'); R(x + 3, y - 17, 2, 8, '#1a1a1a'); R(x - 1, y - 21, 2, 2, '#ffd34d'); R(x - 4, y - 12, 8, 2, '#d9a400'); } },
  'Howard Carter': { shirt: '#c8b890', pants: '#8a7a5a', hair: '#3a2a1e', hat: 'ranger', hatCol: '#d8c8a0', beard: '#3a2a1e' },
  'Judge': { shirt: '#8a2a5a', pants: '#e8e0d0', hair: '#d8d0c0', beard: '#d8d0c0', extra: (x, y) => R(x - 4, y - 20, 8, 1, '#4a8a3a') },
  'Pythia': { shirt: '#f2f2ec', pants: '#f2f2ec', hair: '#3a2a1e', extra: (x, y) => { R(x - 4, y - 20, 8, 3, '#e8e0d0'); R(x - 5, y - 18, 2, 9, '#e8e0d0'); R(x + 3, y - 18, 2, 9, '#e8e0d0'); R(x - 4, y - 21, 8, 1, '#4a8a3a'); } },
  'Socrates': { shirt: '#e8e0d0', pants: '#e8e0d0', hair: '#e8b996', beard: '#d8d0c0', extra: (x, y) => { R(x - 3, y - 13, 6, 3, '#d8d0c0'); R(x - 4, y - 16, 1, 3, '#d8d0c0'); R(x + 3, y - 16, 1, 3, '#d8d0c0'); } },
  'Citizen': { shirt: '#f2f2ec', pants: '#f2f2ec', hair: '#3a2a1e', beard: '#3a2a1e', extra: (x, y) => R(x + 5, y - 9, 3, 3, '#c86a3a') },
  'Messenger': { shirt: '#c8302a', pants: '#e8b996', hair: '#2a1a10', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#c8a040'); R(x - 1, y - 24, 2, 3, '#d8302a'); } },
  'Leonidas': { shirt: '#b8302a', pants: '#e8b996', hair: '#2a1a10', beard: '#2a1a10', extra: (x, y) => { R(x - 4, y - 21, 8, 5, '#c8a040'); R(x - 1, y - 25, 2, 4, '#d8302a'); ell(x - 6, y - 8, 3, 4, '#c8a040'); } },
  'Archimedes': { shirt: '#9ac4e8', pants: '#9ac4e8', hair: '#d8d0c0', beard: '#d8d0c0', extra: (x, y) => { R(x - 3, y - 13, 6, 3, '#d8d0c0'); for (let i = 0; i < 3; i++) R(x - 5 + i * 4, y - 3 - (i % 2), 2, 2, '#bfe3ff'); } },
  'Alexander': { shirt: '#6a3a8a', pants: '#e8b996', hair: '#c8a040', extra: (x, y) => { R(x - 4, y - 19, 8, 3, '#c8a040'); R(x - 4, y - 20, 8, 1, '#4a8a3a'); R(x + 5, y - 16, 1, 12, '#c0c0c8'); } },
  'Caesar': { shirt: '#f2f2ec', pants: '#f2f2ec', hair: '#8a6a4a', extra: (x, y) => { R(x - 4, y - 19, 8, 1, '#4a8a3a'); R(x - 4, y - 18, 1, 1, '#4a8a3a'); R(x + 3, y - 18, 1, 1, '#4a8a3a'); R(x - 4, y - 12, 1, 9, '#8a2a5a'); } },
  'Hannibal': { shirt: '#8a2a2a', pants: '#3a2a1e', hair: '#1a1210', beard: '#1a1210', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#8a8a90'); R(x - 2, y - 16, 2, 1, '#111'); } },
  'Helvetian': { shirt: '#3a7a3a', pants: '#8a6a3a', hair: '#c8a040', beard: '#c8a040', extra: (x, y) => { R(x - 5, y - 18, 2, 9, '#c8a040'); R(x + 3, y - 18, 2, 9, '#c8a040'); } },
  'Pompeian': { shirt: '#c8a060', pants: '#8a6a4a', hair: '#2a1a10' },
  'Pliny': { shirt: '#f2f2ec', pants: '#f2f2ec', hair: '#3a2a1e', extra: (x, y) => R(x + 5, y - 10, 3, 5, '#e8d8a0') },
  'Constantine': { shirt: '#8a2a5a', pants: '#e8d8b0', hair: '#3a2a1e', extra: (x, y) => { R(x - 4, y - 20, 8, 2, '#ffd34d'); R(x - 1, y - 21, 2, 1, '#d8302a'); } },
  'Romulus Augustulus': { shirt: '#8a2a5a', pants: '#e8d8b0', hair: '#c8a040', extra: (x, y) => { R(x - 4, y - 20, 8, 1, '#ffd34d'); R(x - 2, y - 21, 1, 1, '#ffd34d'); R(x + 1, y - 21, 1, 1, '#ffd34d'); } },
  'Monk': { shirt: '#5a4a3a', pants: '#5a4a3a', hair: '#e8b996', extra: (x, y) => { R(x - 4, y - 18, 8, 1, '#5a4a3a'); R(x - 4, y - 18, 1, 4, '#5a4a3a'); R(x + 3, y - 18, 1, 4, '#5a4a3a'); R(x - 4, y - 8, 8, 1, '#c8a878'); } },
};
for (const n in LOOKS4) PORTRAITS[n] = () => drawPerson(0, 0, LOOKS4[n]);
PORTRAITS['Humbaba'] = () => drawHumbabaFace(0, -10, .35, time);
Object.assign(SPEAKER_COL, { 'Hunter': '#d9b07a', 'Farmer': '#e0c080', 'Potter': '#e09a6a', 'Fisher': '#9ac0e0', 'Gilgamesh': '#ffd34d', 'Teacher': '#e0d0a0', 'Wheelwright': '#d0b080', 'Sargon': '#8ab0ff',
  'Utnapishtim': '#e8e8e8', 'Hammurabi': '#c8a0ff', 'Scribe': '#f0e0b0', 'Embalmer': '#b0b0b0', 'Hatshepsut': '#8ab8ff', 'Ramesses II': '#ffd34d', 'Cleopatra': '#ffb070', 'Howard Carter': '#d8c8a0',
  'Judge': '#e08ac0', 'Pythia': '#c0f0c0', 'Socrates': '#e8e0d0', 'Citizen': '#d0d0d0', 'Messenger': '#ff9a8a', 'Leonidas': '#ff8a6a', 'Archimedes': '#9ad0ff', 'Alexander': '#d0a0ff',
  'Caesar': '#ffffff', 'Hannibal': '#ff9a9a', 'Helvetian': '#9fe09f', 'Pompeian': '#e0c080', 'Pliny': '#e0e0c0', 'Constantine': '#e0a0d0', 'Romulus Augustulus': '#ffd0a0', 'Monk': '#c8b090', 'Humbaba': '#9fd07a' });
// who stands where in each era (talking runs NPC_TALK4[name], defined with the quests below)
const NPCS4 = [
  [['Hunter', 59, 19], ['Farmer', 41, 24], ['Potter', 36, 16], ['Fisher', 29, 23]],
  [['Gilgamesh', 37, 20], ['Teacher', 43, 25], ['Wheelwright', 30, 26], ['Sargon', 31, 11], ['Utnapishtim', 55, 34]],
  [['Scribe', 45, 41], ['Hatshepsut', 22, 42], ['Ramesses II', 47, 38], ['Cleopatra', 19, 9], ['Embalmer', 19, 54], ['Howard Carter', 13, 54]],
  [['Judge', 14, 31], ['Pythia', 17, 9], ['Socrates', 41, 36], ['Citizen', 33, 30], ['Messenger', 53, 17], ['Leonidas', 38, 12], ['Archimedes', 47, 33], ['Alexander', 51, 7]],
  [['Hannibal', 40, 9], ['Helvetian', 13, 8], ['Pompeian', 48, 44], ['Pliny', 38, 42], ['Constantine', 66, 36], ['Caesar', 37, 29]],
];

// ---------------------------------------------------------------- entities: herds, hazards, critters
const PEN4 = { x0: 36 * 16, y0: 28 * 16, x1: 40 * 16, y1: 32 * 16 };
const TUFTS4 = [[57, 8], [68, 10], [72, 30], [58, 33], [50, 9], [51, 34]];
const HAZ4 = {
  boar: { sp: 62, range: 80, leash: 170, wsp: 14, hit: 11, msg: 'Boar!' },
  lion: { sp: 54, range: 90, leash: 220, wsp: 20, hit: 12, msg: 'ROAR!' },
  croc: { sp: 70, range: 40, leash: 46, wsp: 6, hit: 13, msg: 'SNAP!' },
  goose: { sp: 60, range: 70, leash: 140, wsp: 12, hit: 9, msg: 'HONK!' },
};
let G4 = { npcs: [], haz: [], goats: [], critters: [], tufts: [], poops: [] };
function l4Spawn() {
  const e = L4().era, at = (tx, ty) => { const [x, y] = nearReach(tx, ty); return { x: x * 16 + 8, y: y * 16 + 10 }; };
  const mob = (tx, ty, extra) => { const p = at(tx, ty); return { ...p, hx: p.x, hy: p.y, t: 0, vx: 0, vy: 0, face: 1, anim: 0, cool: 0, ...extra }; };
  G4 = { npcs: [], haz: [], goats: [], critters: [], tufts: [], poops: [] };
  G4.npcs = NPCS4[e].map(([name, tx, ty]) => ({ name, ...at(tx, ty) }));
  if (e === 0) {
    const penned = L4().flags.penned || 0;
    G4.goats = [[42, 33], [38, 36], [43, 30]].map(([a, b], i) => i < penned ? mob(38, 30, { penned: true, hx: 38 * 16, hy: 30 * 16 }) : mob(a, b));
    for (const g0 of G4.goats) if (g0.penned) { g0.x = 37 * 16 + rnd() * 40; g0.y = 29 * 16 + rnd() * 30; }
    G4.tufts = TUFTS4.map(([a, b], i) => ({ id: i, ...at(a, b) }));
    G4.haz = [[64, 31], [70, 8]].map(([a, b]) => mob(a, b, { kind: 'boar' }));
  } else if (e === 1) {
    G4.haz = [[14, 36], [20, 30], [6, 39]].map(([a, b]) => mob(a, b, { kind: 'lion', chasing: false, poopT: 5 }));
    G4.critters = [[10, 33], [5, 27], [14, 25]].map(([a, b]) => mob(a, b, { kind: 'gazelle' }));
    const r = mulberry32(1754); let k = 0, tries = 0;
    while (k < 8 && tries++ < 2000) { const tx = 2 + ((r() * 20) | 0), ty = 23 + ((r() * 19) | 0); if (reach[ty * W + tx] && map[ty * W + tx] !== T.PATH) { G4.poops.push({ x: tx * 16 + 8, y: ty * 16 + 8 }); k++; } }
  } else if (e === 2) {
    G4.haz = [[29, 16], [36, 21], [28, 34], [35, 30], [28, 46]].map(([a, b]) => mob(a, b, { kind: 'croc' }));
    G4.critters = [[22, 27], [21, 33], [40, 42], [18, 11]].map(([a, b], i) => mob(a, b, { kind: 'cat', col: ['#c8a060', '#2a2a2e', '#e0d0b0', '#a07040'][i], id: i }));
  } else if (e === 3) {
    G4.haz = [[8, 8], [24, 5]].map(([a, b]) => mob(a, b, { kind: 'boar' }));
    G4.critters = [[38, 23], [45, 31]].map(([a, b]) => mob(a, b, { kind: 'owl' }));
  } else {
    G4.haz = [[37, 17], [39, 28], [33, 34]].map(([a, b]) => mob(a, b, { kind: 'goose' }));
  }
}
function l4Update(dt) {
  const e = L4().era;
  for (const h of G4.haz) {
    const K = HAZ4[h.kind], d = dist(h.x, h.y, P.x, P.y);
    let vx = 0, vy = 0;
    if (h.cool > 0) { h.cool -= dt; const a = Math.atan2(h.y - P.y, h.x - P.x); vx = Math.cos(a) * 34; vy = Math.sin(a) * 34; h.chasing = false; }
    else if (d < K.range && dist(P.x, P.y, h.hx, h.hy) < K.leash) {
      if (!h.chasing) { h.chasing = true; popText(h.x, h.y - 18, K.msg, '#ffcf6b'); if (h.kind === 'lion') sfx.roar(); else if (h.kind === 'goose') { tone(520, .12, 'square', .06, -200); tone(500, .12, 'square', .06, -200, .16); } else sfx.bonk(); }
      const a = Math.atan2(P.y - h.y, P.x - h.x); vx = Math.cos(a) * K.sp; vy = Math.sin(a) * K.sp;
    } else { h.chasing = false; wander(h, dt, K.wsp, h.kind === 'croc' ? 20 : 60, 5); vx = 0; vy = 0; }
    if (vx || vy) { move(h, vx * dt, vy * dt, solidW, 5, 3); h.face = Math.sign(vx) || h.face; h.anim += dt; }
    if (h.kind === 'lion' && (vx || vy)) { h.poopT -= dt; if (h.poopT <= 0) { h.poopT = 8 + rnd() * 8; if (G4.poops.length < 24) G4.poops.push({ x: h.x - h.face * 9, y: h.y }); } }
    if (d < K.hit && h.cool <= 0) {
      if (P.jump > 0) continue;
      hurt(h); h.cool = 1.6;
      if (h.kind === 'goose' && !L4().cards.geese) setTimeout(() => { card4('geese'); crText('Those are the sacred geese of Juno! Legend says they once saved Rome. 🪿'); }, 800);
    }
  }
  for (let i = G4.poops.length - 1; i >= 0; i--) {
    const p = G4.poops[i];
    if (P.jump <= 0 && dist(P.x, P.y - 2, p.x, p.y) < 8) {
      G4.poops.splice(i, 1); ST.stats.poop++; P.slow = 2.2; sfx.eww(); shake = .15; popText(P.x, P.y - 26, 'EWW! 4,000-year-old lion poop!', '#c9a26b');
      if (!L4().flags.poop) { L4().flags.poop = 1; setTimeout(() => crText('Lion poop. In Mesopotamia. Some things never change, Sarah. 🤢'), 900); }
    }
  }
  for (const c of G4.critters) {
    if (c.kind === 'gazelle') { if (dist(c.x, c.y, P.x, P.y) < 40) { const a = Math.atan2(c.y - P.y, c.x - P.x); move(c, Math.cos(a) * 70 * dt, Math.sin(a) * 70 * dt, solidW, 3, 3); c.face = Math.sign(Math.cos(a)) || 1; c.anim += dt; } else wander(c, dt, 14, 40, 3); }
    else if (c.kind === 'owl') { c.anim += dt; }
    else wander(c, dt, 14, 30, 3);
  }
  if (e === 0) {
    for (const gt of G4.goats) {
      if (gt.penned) { wander(gt, dt, 8, 18, 3); gt.x = clamp(gt.x, PEN4.x0 + 6, PEN4.x1 - 6); gt.y = clamp(gt.y, PEN4.y0 + 8, PEN4.y1 - 2); continue; }
      const d = dist(gt.x, gt.y, P.x, P.y);
      if (d < 50) { const a = Math.atan2(gt.y - P.y, gt.x - P.x); move(gt, Math.cos(a) * 52 * dt, Math.sin(a) * 52 * dt, solidW, 3, 3); gt.hx = gt.x; gt.hy = gt.y; gt.face = Math.sign(Math.cos(a)) || 1; gt.anim += dt; }
      else wander(gt, dt, 10, 40, 3);
      if (gt.x > PEN4.x0 + 4 && gt.x < PEN4.x1 - 4 && gt.y > PEN4.y0 + 6 && gt.y < PEN4.y1) {
        gt.penned = true; gt.hx = (PEN4.x0 + PEN4.x1) / 2; gt.hy = (PEN4.y0 + PEN4.y1) / 2; L4().flags.penned = G4.goats.filter(q => q.penned).length;
        sfx.pick(); popText(gt.x, gt.y - 14, 'Baa! 🐐', '#fff'); saveGame();
        if (L4().flags.penned === 3) setTimeout(() => crText('All three goats in the pen! Milk, wool and cheese forever. Tell the farmer! 🐐'), 700);
      }
    }
    if (L4().flags.grow > 0) { L4().flags.grow = Math.max(0, L4().flags.grow - dt); if (L4().flags.grow === 0) setTimeout(() => crText('The einkorn is ripe! Golden and wobbly. Time to harvest. 🌾'), 400); }
  }
}

// ---------------------------------------------------------------- sprites: critters, Sarah's era costumes, C-Real's roles
function drawBoar(h) {
  const x = Math.round(h.x), y = Math.round(h.y), f = h.face || 1, st = Math.floor(h.anim * 8) % 2; shadow(x, y, 8);
  R(x - 6, y - 3, 2, 3 - st, '#3a2a1e'); R(x + 4, y - 3, 2, 2 + st, '#3a2a1e'); R(x - 7, y - 9, 14, 6, '#5a4232'); R(x - 7, y - 10, 14, 2, '#3a2a1e');
  const hx = f > 0 ? x + 5 : x - 10; R(hx, y - 9, 5, 5, '#5a4232'); R(hx + (f > 0 ? 4 : 0), y - 7, 2, 2, '#8a6a5a'); R(hx + (f > 0 ? 3 : 1), y - 5, 1, 2, '#f4f0e0'); R(hx + (f > 0 ? 2 : 2), y - 8, 1, 1, h.chasing ? '#ff3030' : '#111');
}
function drawCroc(h) {
  const x = Math.round(h.x), y = Math.round(h.y), f = h.face || 1, open = h.chasing && Math.floor(time * 6) % 2;
  ell(x, y - 2, 12, 3, 'rgba(0,0,0,.2)'); R(x - 10, y - 5, 18, 4, '#4a6a3a'); for (let i = -8; i < 8; i += 3) R(x + i, y - 6, 1, 1, '#3a5a2a');
  const hx = f > 0 ? x + 8 : x - 16; R(hx, y - 4, 8, 3, '#4a6a3a'); if (open) R(hx, y - 7, 8, 2, '#4a6a3a'); R(hx + (f > 0 ? 1 : 5), y - 6, 1, 1, '#ffd34d');
  R(f > 0 ? x - 16 : x + 8, y - 3, 7, 2, '#4a6a3a'); for (const lx of [-6, 4]) R(x + lx, y - 1, 2, 2, '#3a5a2a');
}
function drawGoose(h) {
  const x = Math.round(h.x), y = Math.round(h.y), f = h.face || 1, st = Math.floor(h.anim * 10) % 2; shadow(x, y, 4);
  R(x - 3, y - 2, 1, 2, '#f08a24'); R(x + 1, y - 2 + st, 1, 2 - st, '#f08a24'); ell(x, y - 5, 5, 3, '#f4f4f0'); R(x + (f > 0 ? 3 : -5), y - 12, 2, 7, '#f4f4f0');
  R(x + (f > 0 ? 5 : -7), y - 11, 2, 1, '#f08a24'); R(x + (f > 0 ? 4 : -5), y - 12, 1, 1, '#111');
}
function drawGoat(gt) {
  const x = Math.round(gt.x), y = Math.round(gt.y), f = gt.face || 1, st = Math.floor(gt.anim * 8) % 2; shadow(x, y, 5);
  R(x - 4, y - 3, 1, 3 - st, '#5a4a3a'); R(x + 3, y - 3, 1, 2 + st, '#5a4a3a'); R(x - 5, y - 8, 10, 5, '#e8e0d0'); R(x - 5, y - 8, 10, 1, '#f8f4ec');
  const hx = f > 0 ? x + 4 : x - 8; R(hx, y - 11, 4, 4, '#e8e0d0'); R(hx + (f > 0 ? 1 : 2), y - 13, 1, 2, '#8a7a6a'); R(hx + (f > 0 ? 2 : 1), y - 7, 1, 2, '#c8c0b0'); R(hx + (f > 0 ? 2 : 1), y - 10, 1, 1, '#111');
}
function drawGazelle(c) {
  const x = Math.round(c.x), y = Math.round(c.y), f = c.face || 1; shadow(x, y, 5);
  R(x - 4, y - 4, 1, 4, '#8a5a30'); R(x + 3, y - 4, 1, 4, '#8a5a30'); R(x - 5, y - 9, 10, 5, '#c8945a'); R(x - 5, y - 6, 10, 1, '#f4ecdc');
  const hx = f > 0 ? x + 4 : x - 7; R(hx, y - 13, 3, 4, '#c8945a'); R(hx + 1, y - 17, 1, 4, '#3a2a1a'); R(hx + (f > 0 ? 2 : 0), y - 16, 1, 3, '#3a2a1a');
}
function drawOwl(c) { const x = Math.round(c.x), y = Math.round(c.y), b = Math.floor(c.anim * .8) % 4 === 0; R(x - 1, y - 6, 2, 6, '#6a4a2a'); ell(x, y - 10, 4, 5, '#8a7a6a'); R(x - 3, y - 13, 2, 2, b ? '#8a7a6a' : '#ffd34d'); R(x + 1, y - 13, 2, 2, b ? '#8a7a6a' : '#ffd34d'); R(x - 3, y - 15, 1, 2, '#6a5a4a'); R(x + 2, y - 15, 1, 2, '#6a5a4a'); }
function drawTuft(t0) { const x = Math.round(t0.x), y = Math.round(t0.y); for (let i = -3; i <= 3; i += 2) { R(x + i, y - 9, 1, 9, '#a89838'); R(x + i - 1, y - 11 + (i & 1), 2, 3, '#d8c060'); } if (Math.floor(time * 2 + t0.id) % 3 === 0) R(x + 4, y - 13, 1, 1, '#fff'); }
// Sarah dresses for every era (an overlay on her usual black top and jeans)
const COSTUME4 = [{ top: '#8a6a48', skirt: '#7a5a3a', dots: '#5a4030' }, { top: '#e0d0a8', skirt: '#d0c098', fringe: '#b8a070' }, { top: '#f6f2e8', skirt: '#f6f2e8', collar: '#3a7ad8', gold: '#d9a400' }, { top: '#f4f4f0', skirt: '#f4f4f0', border: '#3a5ab8', gold: '#d9a400' }, { top: '#c87a8a', skirt: '#c87a8a', border: '#d9a400' }];
const _drawSarah4 = drawSarah;
drawSarah = function (x, y, dir, anim, jh, bike, moving) {
  _drawSarah4(x, y, dir, anim, jh, bike, moving);
  if (ST.level !== 4 || scene === 'title' || bike) return;
  const c = COSTUME4[L4().era] || COSTUME4[0], xx = Math.round(x), by = Math.round(y) - Math.round(jh || 0);
  R(xx - 4, by - 11, 8, 6, c.top); R(xx - 5, by - 10, 1, 3, c.top); R(xx + 4, by - 10, 1, 3, c.top); R(xx - 4, by - 5, 8, 3, c.skirt);
  if (c.dots) { R(xx - 2, by - 9, 1, 1, c.dots); R(xx + 2, by - 7, 1, 1, c.dots); R(xx - 1, by - 4, 1, 1, c.dots); }
  if (c.fringe) for (let i = -4; i < 4; i += 2) R(xx + i, by - 3, 1, 2, c.fringe);
  if (c.collar) { R(xx - 4, by - 11, 8, 2, c.collar); R(xx - 3, by - 10, 6, 1, c.gold); }
  if (c.border) { R(xx - 4, by - 3, 8, 1, c.border); if (c.gold) R(xx + 2, by - 11, 1, 1, c.gold); }
};
// C-Real's historical roles: Ötzi, Enkidu, Imhotep, Homer, Odoacer (overlays on his hippie look)
CR_POSE.otzi = {
  behind(x, y) { g.strokeStyle = '#7a5030'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + 6, y - 22); g.lineTo(x - 5, y - 2); g.stroke(); },
  front(x, y) { R(x - 5, y - 12, 10, 8, '#8a7a4a'); for (let i = -5; i < 5; i += 2) R(x + i, y - 9, 1, 6, '#6a5a32'); R(x - 4, y - 21, 8, 3, '#5a3a20'); R(x - 5, y - 19, 1, 2, '#5a3a20'); R(x + 5, y - 12, 1, 7, '#7a5030'); R(x + 5, y - 13, 3, 2, '#c87533'); },
};
CR_POSE.enkidu = {
  behind(x, y) { ell(x, y - 15, 9, 8, '#5a3a1e'); },
  front(x, y) { R(x - 4, y - 12, 8, 7, '#e9b892'); R(x - 4, y - 6, 8, 3, '#8a6a40'); R(x - 3, y - 4, 1, 1, '#4a8a3a'); R(x + 2, y - 4, 1, 1, '#4a8a3a'); R(x - 4, y - 11, 2, 6, '#7a5a30'); R(x - 3, y - 14, 6, 4, '#6b4526'); },
};
CR_POSE.imhotep = {
  front(x, y) { R(x - 4, y - 12, 8, 7, '#f6f2e8'); R(x - 4, y - 12, 8, 2, '#3a7ad8'); R(x - 3, y - 11, 1, 1, '#ffd34d'); R(x, y - 11, 1, 1, '#ffd34d'); R(x + 2, y - 11, 1, 1, '#ffd34d'); R(x - 4, y - 6, 8, 3, '#f6f2e8'); R(x + 5, y - 11, 3, 6, '#e8d8a0'); R(x + 5, y - 9, 3, 1, '#8a6a3a'); },
};
CR_POSE.homer = {
  front(x, y, tm) {
    R(x - 4, y - 12, 8, 9, '#f2f2ec'); R(x - 4, y - 4, 8, 1, '#3a5ab8'); R(x - 4, y - 21, 8, 1, '#4a8a3a');
    g.strokeStyle = '#c8a040'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + 2, y - 4); g.lineTo(x + 1, y - 13); g.moveTo(x + 8, y - 4); g.lineTo(x + 9, y - 13); g.moveTo(x + 1, y - 12); g.lineTo(x + 9, y - 12); g.stroke();
    for (let i = 3; i < 8; i += 2) R(x + i, y - 11, 1, 7, 'rgba(255,255,255,.7)'); R(x + 1, y - 5, 8, 2, '#8a5a2a');
    const p = (tm * .6) % 1; R(Math.round(x + 10 + Math.sin(p * 6) * 2), Math.round(y - 18 - p * 12), 1, 3, '#fff');
  },
};
CR_POSE.odoacer = {
  behind(x, y) { R(x - 6, y - 12, 12, 10, '#7a2a2a'); },
  front(x, y) { R(x - 4, y - 12, 8, 7, '#8a8a90'); for (let i = -3; i < 4; i += 2) R(x + i, y - 10, 1, 1, '#6a6a70'); R(x - 4, y - 6, 8, 1, '#5a3a1e'); ell(x - 7, y - 8, 4, 5, '#a0522d'); circ(x - 7, y - 8, 1.5, '#c8c8d0'); },
};
// in Level 4, C-Real's dialog portrait wears the costume of the current era
const _crPoseNear4 = crPoseNear;
crPoseNear = function () { return ST.level === 4 && scene !== 'title' ? ERA4OF().pose : _crPoseNear4(); };
// Göbekli Tepe's guardian of the sketch, and Humbaba's face (also his dialog portrait)
function drawHyena(x, y, look, tm) {
  x = Math.round(x); y = Math.round(y); shadow(x, y, 8);
  R(x - 7, y - 4, 2, 4, '#7a6040'); R(x + 4, y - 4, 2, 4, '#7a6040'); R(x - 7, y - 10, 13, 6, '#b89860'); R(x - 6, y - 12, 9, 2, '#8a6a40');
  for (let i = -5; i < 5; i += 3) R(x + i, y - 9, 1, 3, '#6a4a2a');
  const hx = look ? x + 3 : x + 5; R(hx, y - 14, 6, 6, '#b89860'); R(hx + (look ? 1 : 4), y - 16, 2, 3, '#6a4a2a'); R(hx + (look ? 4 : 5), y - 16, 1, 3, '#6a4a2a');
  if (look) { R(hx + 1, y - 12, 1, 1, '#ff3030'); R(hx + 4, y - 12, 1, 1, '#ff3030'); } else R(hx + 4, y - 12, 1, 1, '#111');
}
function drawHumbabaFace(x, y, s, tm, calm) {
  g.save(); g.translate(x, y); g.scale(s, s);
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + Math.sin(tm + i) * .05; poly([[Math.cos(a) * 30, Math.sin(a) * 30], [Math.cos(a + .2) * 52, Math.sin(a + .2) * 52], [Math.cos(a + .4) * 30, Math.sin(a + .4) * 30]], i % 2 ? '#2a5a2a' : '#3a7a34'); }
  circ(0, 0, 34, calm ? '#8ab06a' : '#7a9a4a'); ell(0, 6, 26, 22, calm ? '#9ac07a' : '#8aaa5a');
  g.strokeStyle = 'rgba(40,60,20,.6)'; g.lineWidth = 2; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(0, 4, 8 + i * 6, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
  R(-16, -12, 10, 6, '#fff'); R(6, -12, 10, 6, '#fff'); R(-12, -11, 4, 4, calm ? '#3a2a1a' : '#c81e1e'); R(10, -11, 4, 4, calm ? '#3a2a1a' : '#c81e1e');
  R(-18, -16, 14, 3, '#2a3a1a'); R(4, -16, 14, 3, '#2a3a1a');
  if (calm) { R(-8, 14, 16, 2, '#3a2a1a'); R(-10, 12, 2, 2, '#3a2a1a'); R(8, 12, 2, 2, '#3a2a1a'); }
  else { R(-12, 10, 24, 10, '#3a1a10'); for (let i = -10; i < 12; i += 5) poly([[i, 10], [i + 2, 15], [i + 4, 10]], '#f4f0e0'); }
  g.restore();
}
// ---------------------------------------------------------------- buildings through the ages
function drawPillarT(px, py, hgt, col = '#cfc7b4') { R(px - 2, py - hgt, 5, hgt, col); R(px - 5, py - hgt - 4, 11, 4, '#ddd5c2'); R(px - 1, py - hgt + 5, 1, 3, '#8a8270'); R(px + 1, py - hgt + 8, 2, 1, '#8a8270'); }
function drawColumns(x0, y0, n, gap, hgt, col = '#ece8de') { for (let i = 0; i < n; i++) { R(x0 + i * gap, y0, 5, hgt, col); R(x0 + i * gap + 1, y0, 1, hgt, 'rgba(255,255,255,.4)'); R(x0 + i * gap - 1, y0, 7, 2, '#d8d4c8'); } }
function drawPortalStone(x, y, w, h, on) {
  const cx = x + w / 2, by = y + h;
  ell(cx, by - 6, 22, 7, on ? 'rgba(160,120,255,.35)' : 'rgba(0,0,0,.2)');
  for (const [dx, hh] of [[-16, 18], [16, 18], [-9, 22], [9, 22]]) { R(cx + dx - 3, by - 6 - hh, 6, hh, '#8a8478'); R(cx + dx - 3, by - 6 - hh, 6, 2, '#a8a294'); }
  R(cx - 4, by - 36, 8, 30, '#9a9488'); R(cx - 4, by - 36, 8, 2, '#b8b2a6');
  const p = .5 + .5 * Math.sin(time * 3);
  g.strokeStyle = on ? `rgba(190,150,255,${.6 + p * .4})` : '#6a6458'; g.lineWidth = 1; g.beginPath();
  for (let a = 0; a < 12; a += .3) { const r = 1 + a * .25; g.lineTo(cx + Math.cos(a + (on ? time * 2 : 0)) * r, by - 22 + Math.sin(a + (on ? time * 2 : 0)) * r); } g.stroke();
  if (on) for (let i = 0; i < 4; i++) { const q = (time * .7 + i * .25) % 1; R(cx - 8 + hash(i, 7) % 16, by - 10 - q * 40, 1, 2, `rgba(220,200,255,${1 - q})`); }
}
function l4DrawBuilding(b, x, y, w, h) {
  const cx = x + w / 2, by = y + h, sh = () => R(x + 3, by - 1, w, 4, 'rgba(0,0,0,.3)');
  switch (b.kind) {
    case 'portal': drawPortalStone(x, y, w, h, portalActive4()); return true;
    case 'tepe': {   // Göbekli Tepe: a hill with a ring of T-pillars (one still lying until we help raise it)
      ell(cx, by - 14, w / 2 + 8, 30, '#a89060'); ell(cx, by - 16, w / 2, 24, '#c0a870');
      ell(cx, by - 22, 44, 15, '#a8946a'); ell(cx, by - 22, 38, 11, '#b8a47a');
      const ring = []; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; ring.push([cx + Math.cos(a) * 38, by - 22 + Math.sin(a) * 12]); }
      ring.sort((p, q) => p[1] - q[1]).forEach(([px, py]) => drawPillarT(px, py, 14));
      drawPillarT(cx - 8, by - 20, 26, '#d8d0bc');
      if (q4('pillar')) drawPillarT(cx + 8, by - 20, 26, '#d8d0bc');
      else { R(cx + 2, by - 24, 30, 6, '#d8d0bc'); R(cx + 28, by - 27, 4, 12, '#ddd5c2'); g.strokeStyle = '#8a6a3a'; g.lineWidth = 1; g.beginPath(); g.moveTo(cx + 20, by - 23); g.lineTo(cx + 34, by - 6); g.stroke(); }
      return true;
    }
    case 'tent': sh(); poly([[x, by], [cx, y - 6], [x + w, by]], '#8a6a48'); poly([[cx - 6, by], [cx, by - 14], [cx + 6, by]], '#3a2a1a'); R(cx - 1, y - 10, 2, 6, '#5a3a20'); for (let i = 4; i < w; i += 8) R(x + i, by - 8, 2, 1, '#6a4a30'); return true;
    case 'catal': {   // packed mud-brick houses, no doors: you enter through the roof
      for (let j = 0; j < 2; j++) for (let i = 0; i < 5; i++) {
        const hx = x + i * 28 + (j ? 6 : 0), hy = y + 10 + j * 26 - (i % 2) * 5;
        R(hx, hy + 8, 28, 26, '#b88a58'); R(hx, hy, 28, 9, '#d8b080'); R(hx, hy + 8, 28, 1, '#9a7448');
        if ((i + j) % 2 === 0) { R(hx + 10, hy + 2, 7, 4, '#3a2a1a'); R(hx + 11, hy - 8, 1, 14, '#6a4a2a'); R(hx + 15, hy - 8, 1, 14, '#6a4a2a'); for (let k = -6; k < 6; k += 3) R(hx + 11, hy + k, 5, 1, '#6a4a2a'); }
      }
      return true;
    }
    case 'pfahl': {   // pile dwellings on the lake shore
      ell(cx, by + 2, w / 2 + 10, 12, '#3f86c8'); for (let i = 0; i < 4; i++) R(x + 6 + i * 30 + Math.sin(time * 2 + i) * 2, by + 2, 8, 1, 'rgba(255,255,255,.35)');
      for (let i = 0; i < w; i += 9) R(x + 3 + i, y + 22, 2, h - 18, '#5a3a20');
      R(x - 2, y + 20, w + 4, 4, '#8a6a40');
      for (const hx of [x + 6, x + 46, x + 86]) { R(hx, y + 6, 30, 14, '#a8844f'); for (let k = 0; k < 30; k += 3) R(hx + k, y + 6, 1, 14, '#8a6a3a'); poly([[hx - 3, y + 7], [hx + 15, y - 8], [hx + 33, y + 7]], '#c8a860'); R(hx + 12, y + 11, 6, 9, '#3a2a1a'); }
      R(x + w + 2, by - 6, 18, 4, '#6a4a2a');   // dugout canoe
      return true;
    }
    case 'hut': for (const [hx, hy] of [[x + 4, y + 10], [x + w - 34, y + 4]]) { R(hx + 3, hy + 16, 30, 18, '#a8844f'); poly([[hx - 2, hy + 18], [hx + 18, hy - 8], [hx + 38, hy + 18]], '#c8a860'); R(hx + 14, hy + 22, 8, 12, '#3a2a1a'); } return true;
    case 'gate': {   // Uruk's city wall and gate
      sh(); R(x - 10, y + 12, w + 20, h - 12, '#c49a62'); for (let j = y + 16; j < by; j += 5) R(x - 10, j, w + 20, 1, '#a87e4c');
      for (let i = x - 10; i < x + w + 10; i += 8) R(i, y + 8, 5, 5, '#c49a62');
      for (const tx of [x - 4, x + w - 18]) { R(tx, y - 4, 22, h + 4, '#b88c56'); for (let i = 0; i < 22; i += 7) R(tx + i, y - 8, 5, 5, '#b88c56'); }
      R(cx - 12, by - 30, 24, 30, '#3a2a1a'); circ(cx, by - 30, 12, '#3a2a1a'); R(cx - 14, by - 44, 28, 3, '#2a5ab8');
      return true;
    }
    case 'mudhouse': sh(); R(x, y + 8, w, h - 8, '#c8a070'); R(x - 1, y + 5, w + 2, 4, '#b88a58'); R(x, y + 8, w, 1, '#a87e4c'); R(cx - 5, by - 16, 10, 16, '#5a3a20'); R(x + 6, y + 14, 6, 5, '#3a2a1a'); if (w > 64) R(x + w - 14, y + 14, 6, 5, '#3a2a1a'); return true;
    case 'ziggurat': {   // the Ziggurat of Ur: three terraces and a grand stairway
      sh(); const tier = (inset, top, hh, col) => { R(x + inset, by - top, w - inset * 2, hh, col); for (let j = 4; j < hh; j += 5) R(x + inset, by - top + j, w - inset * 2, 1, 'rgba(90,60,30,.35)'); R(x + inset, by - top, w - inset * 2, 2, 'rgba(255,255,255,.2)'); };
      tier(0, 30, 30, '#b8885a'); tier(20, 56, 26, '#c49a62'); tier(40, 78, 22, '#cfa870');
      R(cx - 12, by - 96, 24, 18, '#2a5ab8'); R(cx - 12, by - 96, 24, 2, '#ffd34d'); R(cx - 4, by - 88, 8, 10, '#1a1a2a');
      R(cx - 8, by - 78, 16, 78, '#a87a4a'); for (let j = 0; j < 78; j += 4) R(cx - 8, by - 78 + j, 16, 1, '#8a5e36');
      for (const s of [-1, 1]) { R(cx + s * 30 - 4, by - 30, 8, 30, '#a87a4a'); }
      return true;
    }
    case 'ishtar': {   // Babylon's blue-glazed Ishtar Gate with aurochs and dragons
      sh(); for (const tx of [x - 2, x + w - 30]) { R(tx, y - 14, 32, h + 14, '#2a5ab8'); for (let i = 0; i < 32; i += 6) R(tx + i, y - 18, 4, 4, '#2a5ab8'); }
      R(x + 28, y + 6, w - 56, h - 6, '#2a5ab8'); R(cx - 10, by - 30, 20, 30, '#1a1a2a'); circ(cx, by - 30, 10, '#1a1a2a');
      for (let r2 = 0; r2 < 3; r2++) for (let i = 0; i < 4; i++) { const ax = x + 4 + i * 30, ay = y - 6 + r2 * 18; R(ax, ay, 8, 4, r2 % 2 ? '#e8e0d0' : '#ffd34d'); R(ax + 7, ay - 2, 2, 3, r2 % 2 ? '#e8e0d0' : '#ffd34d'); }
      return true;
    }
    case 'steppyr': {   // Djoser's step pyramid at Saqqara (a building site until we help Imhotep)
      if (q4('steppyr')) { sh(); for (let i = 0; i < 6; i++) { const hw = w / 2 + 4 - i * 9, top = by - (i + 1) * 12; R(cx - hw, top, hw * 2, 12, i % 2 ? '#d8c49a' : '#e2cea4'); R(cx - hw, top, hw * 2, 1, 'rgba(255,255,255,.3)'); R(cx - hw, top + 11, hw * 2, 1, 'rgba(120,90,40,.4)'); } return true; }
      sh(); R(x + 10, by - 14, w - 20, 14, '#d8c49a'); R(x + 10, by - 14, w - 20, 2, '#e8d8b0');
      for (let i = 0; i < 5; i++) { R(x + 4 + i * 9, by - 22 - (i % 2) * 6, 8, 6, '#cdb88a'); R(x + w - 16 - i * 7, by - 20, 7, 5, '#cdb88a'); }
      g.strokeStyle = '#8a6a3a'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + 14, by - 14); g.lineTo(x + 24, by - 40); g.lineTo(x + 34, by - 14); g.moveTo(x + w - 30, by - 14); g.lineTo(x + w - 20, by - 40); g.lineTo(x + w - 10, by - 14); g.stroke();
      return true;
    }
    case 'pyramid': case 'pyramid2': {
      const big = b.kind === 'pyramid', top = big ? y - 56 : y - 14;
      poly([[x - 8, by], [cx, top], [x + w + 8, by]], '#e2cc98'); poly([[cx, top], [x + w + 8, by], [cx + 6, by]], '#c8b07a');
      for (let j = top + 8; j < by; j += 6) { const k = (j - top) / (by - top); R(cx - (w / 2 + 8) * k, j, (w / 2 + 8) * k * 2, 1, 'rgba(150,120,70,.3)'); }
      if (big) { poly([[cx - 5, top + 9], [cx, top], [cx + 5, top + 9]], '#ffd34d'); R(cx - 5, by - 34, 10, 8, '#3a2a1a'); }
      return true;
    }
    case 'sphinx': sh(); R(x, y + 14, w - 12, 14, '#d8bc80'); R(x + w - 18, y + 22, 18, 6, '#d8bc80'); R(x + w - 26, y - 2, 16, 18, '#d8bc80'); R(x + w - 28, y - 2, 4, 14, '#c8a060'); R(x + w - 12, y - 2, 4, 14, '#c8a060'); for (let j = 0; j < 14; j += 3) R(x + w - 28, y - 2 + j, 4, 1, '#3a5ab8'); R(x + w - 22, y + 4, 2, 2, '#3a2a1a'); R(x + w - 16, y + 4, 2, 2, '#3a2a1a'); R(x - 4, y + 18, 6, 2, '#d8bc80'); return true;
    case 'temple': {   // Karnak: pylons, obelisks, and a forest of columns behind
      sh(); for (const tx of [x, x + w - 50]) { poly([[tx, by], [tx + 6, y + 2], [tx + 44, y + 2], [tx + 50, by]], '#d8c49a'); R(tx + 10, y + 16, 30, 26, 'rgba(120,90,40,.25)'); R(tx + 16, y + 20, 8, 14, '#3a6ad8'); R(tx + 28, y + 22, 6, 12, '#c8302a'); }
      R(cx - 12, y + 18, 24, h - 18, '#c8b48a'); R(cx - 7, by - 26, 14, 26, '#3a2a1a');
      for (const ox of [x - 8, x + w + 4]) { poly([[ox, by], [ox + 2, y - 18], [ox + 4, by]], '#c8b080'); poly([[ox, y - 18], [ox + 2, y - 22], [ox + 4, y - 18]], '#ffd34d'); }
      return true;
    }
    case 'terrace': {   // Hatshepsut's temple at Deir el-Bahari, against the cliffs
      poly([[x - 16, by - 20], [x - 6, y - 30], [x + 20, y - 40], [x + w / 2, y - 34], [x + w - 10, y - 44], [x + w + 16, by - 20]], '#c8a070');
      R(x, by - 14, w, 14, '#ece2cc'); drawColumns(x + 4, by - 13, 14, 8, 11, '#f8f2e4'); R(x + 16, by - 30, w - 32, 16, '#e8dcc4'); drawColumns(x + 20, by - 29, 10, 8, 13, '#f8f2e4');
      R(cx - 8, by - 30, 16, 30, '#d8ccb0'); for (let j = 0; j < 30; j += 3) R(cx - 8, by - 30 + j, 16, 1, '#c8bca0');
      return true;
    }
    case 'tomb': poly([[x - 16, by], [x - 10, y - 10], [x + 10, y - 20], [x + w - 6, y - 14], [x + w + 16, by]], '#b8945a'); R(cx - 8, by - 22, 16, 22, '#2a1a10'); R(cx - 10, by - 24, 20, 3, '#d8c49a'); return true;
    case 'pharos': { sh(); R(cx - 12, y + 24, 24, h - 24, '#e8e4d8'); R(cx - 9, y + 4, 18, 22, '#e0dcd0'); R(cx - 6, y - 12, 12, 16, '#d8d4c8'); R(cx - 12, y + 24, 24, 2, '#c8c4b8'); const f = Math.sin(time * 12) * 1.5; circ(cx, y - 16, 5 + f, '#ffb030'); circ(cx, y - 17, 3, '#fff3b0'); return true; }
    case 'stadium': sh(); R(x, y + 8, w, 10, '#5d9a45'); R(x, by - 10, w, 10, '#5d9a45'); R(x, y + 18, w, h - 28, '#d2b07a'); R(x + 8, y + 18, 2, h - 28, '#ffffff'); R(x + w - 10, y + 18, 2, h - 28, '#ffffff'); for (let j = y + 24; j < by - 12; j += 8) R(x + 10, j, w - 20, 1, 'rgba(255,255,255,.3)'); return true;
    case 'gtemple': case 'parthenon': {   // painted Greek temples (they were colourful!)
      const big = b.kind === 'parthenon';
      if (big) { poly([[x - 22, by + 8], [x - 10, by - 6], [x + w + 10, by - 6], [x + w + 22, by + 8]], '#a89a84'); }
      sh(); R(x - 4, by - 8, w + 8, 8, '#d8d4c8'); R(x - 2, by - 4, w + 4, 1, '#c4c0b4');
      const n = big ? 8 : 6, gap = (w - 4) / (n - 1); drawColumns(x - 1, y + 16, n, gap, h - 24);
      R(x - 2, y + 8, w + 4, 9, '#d8d4c8'); for (let i = 0; i < w; i += 8) { R(x + i, y + 10, 3, 5, '#3a5ab8'); R(x + i + 4, y + 10, 4, 5, '#c8302a'); }
      poly([[x - 4, y + 8], [cx, y - 10], [x + w + 4, y + 8]], '#e4e0d4'); poly([[x + 6, y + 6], [cx, y - 4], [x + w - 6, y + 6]], '#3a5ab8');
      return true;
    }
    case 'stoa': sh(); R(x, y + 10, w, h - 10, '#c8bca8'); drawColumns(x + 2, y + 14, 12, (w - 8) / 11, h - 20); R(x - 3, y + 4, w + 6, 10, '#b8584a'); for (let i = 0; i < w + 6; i += 5) R(x - 3 + i, y + 4, 1, 10, '#9a4a3a'); R(x - 2, by - 4, w + 4, 4, '#d8d4c8'); return true;
    case 'palace': {
      const rav = b.id === 'ravenna'; sh(); R(x, y + 12, w, h - 12, rav ? '#b86a4a' : '#e8dcc8'); if (rav) for (let j = y + 14; j < by; j += 4) R(x, j, w, 1, '#a85a3a');
      R(x - 3, y + 4, w + 6, 10, rav ? '#8a3a2a' : '#b8584a'); poly([[x - 3, y + 4], [cx, y - 8], [x + w + 3, y + 4]], rav ? '#9a4a3a' : '#c86a5a');
      if (rav) { R(x + 6, y + 16, w - 12, 4, '#d9a400'); for (let i = 0; i < w - 12; i += 6) R(x + 6 + i, y + 16, 3, 4, '#3a8a6a'); }
      drawColumns(x + 6, y + 22, 6, (w - 18) / 5, h - 26, rav ? '#e8dcc8' : '#f4f0e8'); R(cx - 7, by - 18, 14, 18, '#5a3a20');
      return true;
    }
    case 'pantheon': {   // rotunda with dome and oculus, plus the columned porch
      sh(); R(x + 6, y + 18, w - 12, h - 18, '#cbbfa8'); g.save(); g.beginPath(); g.rect(x, y - 10, w, 30); g.clip(); ell(cx, y + 20, w / 2 - 6, 26, '#b8ac96'); ell(cx, y + 20, w / 2 - 12, 20, '#c4b8a2'); g.restore();
      ell(cx, y - 4, 6, 2, '#3a3430');
      R(x - 4, by - 38, w + 8, 38, '#d8cdb8'); drawColumns(x - 1, by - 30, 8, (w + 2) / 7, 28, '#e8e0d0'); R(x - 4, by - 38, w + 8, 8, '#cfc4ae'); R(cx - 18, by - 35, 36, 2, '#8a8070');
      poly([[x - 6, by - 38], [cx, by - 52], [x + w + 6, by - 38]], '#d8cdb8');
      return true;
    }
    case 'colosseum': {
      ell(cx, by - 30, w / 2 + 8, 36, '#c8b08a'); for (let k = 0; k < 3; k++) { const yy = by - 54 + k * 16; for (let i = -54; i <= 54; i += 12) { const dx = i, dy = Math.sqrt(Math.max(0, 1 - (dx / 62) ** 2)) * 30; R(cx + dx - 3, yy + dy - 6, 6, 8, '#5a4a3a'); } }
      ell(cx, by - 42, w / 2 - 14, 18, '#a8946e'); ell(cx, by - 42, w / 2 - 24, 12, '#d8c49a');
      poly([[cx + 30, by - 72], [cx + 60, by - 52], [cx + 64, by - 40]], '#b8a07a');
      return true;
    }
    case 'forum': sh(); R(x + 10, y + 6, w - 20, h - 6, '#e0d8c8'); drawColumns(x + 12, y + 12, 7, (w - 30) / 6, h - 16); R(x + 8, y + 4, w - 16, 8, '#d8d0c0'); poly([[x + 8, y + 4], [cx, y - 8], [x + w - 8, y + 4]], '#e4dccc'); for (const ox of [x - 6, x + w + 2]) R(ox, y + 4, 5, h - 4, '#ece8de'); return true;
    case 'circus': sh(); R(x, y + 6, w, h - 6, '#a87a4a'); R(x + 6, y + 12, w - 12, h - 18, '#d8b880'); R(x + 20, y + 22, w - 40, 4, '#e8e0d0'); poly([[cx - 2, y + 22], [cx, y + 2], [cx + 2, y + 22]], '#c8b890'); return true;
    case 'villa': sh(); R(x, y + 12, w, h - 12, '#ecdcb8'); R(x, y + 20, w, 4, '#b8302a'); poly([[x - 4, y + 14], [x + 10, y - 2], [x + w - 10, y - 2], [x + w + 4, y + 14]], '#b8584a'); R(cx - 6, by - 18, 12, 18, '#5a3a20'); for (const wx of [x + 10, x + w - 20]) R(wx, y + 28, 10, 8, '#3a2a1a'); return true;
    case 'vesuvius': {
      poly([[x - 24, by], [x + 48, y + 2], [x + w - 48, y + 2], [x + w + 24, by]], '#6a5a4a'); poly([[x + 48, y + 2], [x + 60, y + 20], [cx, y + 10], [x + w - 60, y + 22], [x + w - 48, y + 2]], '#4a3e34');
      const big = !q4('pompeii'); for (let i = 0; i < (big ? 6 : 3); i++) { const p = (time * .25 + i / 6) % 1; ell(cx + Math.sin(p * 5 + i) * 10 + p * 20, y - p * (big ? 70 : 40), 6 + p * (big ? 16 : 8), 4 + p * 8, `rgba(${big ? '90,80,75' : '200,200,200'},${.6 * (1 - p)})`); }
      return true;
    }
    case 'basilica': sh(); R(x, y + 14, w, h - 14, '#c88a5a'); for (let j = y + 16; j < by; j += 4) R(x, j, w, 1, '#b87a4a'); R(x - 2, y + 8, w + 4, 8, '#9a4a3a'); poly([[x - 2, y + 8], [cx, y - 6], [x + w + 2, y + 8]], '#a85a4a'); R(cx - 1, y - 16, 2, 10, '#ffd34d'); R(cx - 4, y - 13, 8, 2, '#ffd34d'); R(cx - 6, by - 16, 12, 16, '#3a2a1a'); return true;
  }
  return false;
}
function drawElephant(x, y, tm) {
  x = Math.round(x); y = Math.round(y); shadow(x, y, 12); const st = Math.floor(tm * 4) % 2;
  for (const lx of [-9, -3, 4, 9]) R(x + lx, y - 6, 4, 6 - (lx === -3 || lx === 9 ? st : 0), '#7a7470');
  ell(x, y - 12, 14, 9, '#8a8480'); ell(x + 12, y - 15, 7, 7, '#8a8480'); ell(x + 9, y - 16, 4, 6, '#9a948e');
  R(x + 17, y - 14, 3, 10, '#8a8480'); R(x + 18, y - 5, 3, 2, '#8a8480'); R(x + 15, y - 11, 4, 1, '#f4f0e0'); R(x + 13, y - 18, 1, 1, '#111'); R(x - 15, y - 14, 2, 6, '#7a7470');
  R(x - 8, y - 22, 14, 4, '#b8302a'); R(x - 8, y - 22, 14, 1, '#ffd34d');
}
// ---------------------------------------------------------------- world drawing hooks
function l4DrawGround(vis) {
  const e = L4().era;
  for (const p of G4.poops) if (vis(p.x, p.y)) drawPoop(p, time);
  if (e === 0) {
    const st = L4().quests.farmStage || 0, x0 = 40 * 16, y0 = 25 * 16;   // the einkorn field next to Çatalhöyük
    if (vis(x0 + 32, y0 + 24)) {
      R(x0, y0, 64, 48, '#8a6a42'); for (let j = 0; j < 48; j += 6) R(x0, y0 + j, 64, 1, '#6a4e30');
      if (st >= 2) { const ripe = q4('farm') || (L4().flags.grow || 0) <= 0, gr = ripe ? 1 : 1 - (L4().flags.grow || 0) / 40; for (let j = 3; j < 48; j += 6) for (let i = 3; i < 64; i += 5) { const hh = 2 + Math.round(gr * 6); R(x0 + i, y0 + j - hh, 1, hh, ripe ? '#d8b850' : '#6aa84f'); if (ripe) R(x0 + i - 1, y0 + j - hh - 1, 3, 2, '#f0d070'); } }
    }
  }
}
function l4Drawables(D, vis) {
  const add = (o, f) => { if (vis(o.x, o.y)) D.push({ y: o.y, f }); };
  for (const n of G4.npcs) add(n, () => drawPerson(n.x, n.y, LOOKS4[n.name]));
  for (const h of G4.haz) add(h, () => h.kind === 'lion' ? drawLion(h, time) : h.kind === 'croc' ? drawCroc(h) : h.kind === 'goose' ? drawGoose(h) : drawBoar(h));
  for (const c of G4.critters) add(c, () => c.kind === 'gazelle' ? drawGazelle(c) : c.kind === 'owl' ? drawOwl(c) : drawCat(c, time));
  const e = L4().era;
  if (e === 0) {
    for (const gt of G4.goats) add(gt, () => drawGoat(gt));
    if ((L4().quests.farmStage || 0) === 1) for (const tf of G4.tufts) if (!(L4().flags.tufts || []).includes(tf.id)) add(tf, () => drawTuft(tf));
    const { x0, y0, x1, y1 } = PEN4;   // the goat pen: a wattle fence with a gap on top
    if (vis(x0 + 32, y0 + 32)) {
      D.push({ y: y0, f: () => { for (let x = x0; x <= x1; x += 6) if (x < x0 + 20 || x > x1 - 20) R(x, y0 - 10, 2, 10, '#6a4a2a'); R(x0, y0 - 8, 20, 2, '#8a6a3a'); R(x1 - 20, y0 - 8, 20, 2, '#8a6a3a'); } });
      D.push({ y: y1, f: () => { for (let x = x0; x <= x1; x += 6) R(x, y1 - 10, 2, 10, '#6a4a2a'); R(x0, y1 - 8, x1 - x0, 2, '#8a6a3a'); for (let y = y0; y < y1; y += 6) { R(x0, y - 4, 2, 6, '#6a4a2a'); R(x1, y - 4, 2, 6, '#6a4a2a'); } } });
    }
  }
  if (e === 1) { const c = at4(12, 16); add(c, () => { for (const dx of [-12, 12]) { R(c.x + dx - 2, c.y - 24, 4, 24, '#4a3020'); for (let i = 0; i < 4; i++) R(c.x + dx - 9 + i * 2, c.y - 34 + i * 5, 18 - i * 4, 4, i % 2 ? '#1f4a2c' : '#2a5a36'); } if (!q4('humbaba')) { const p = .5 + .5 * Math.sin(time * 3); circ(c.x, c.y - 30, 4 + p * 2, `rgba(120,200,80,${.3 + p * .3})`); } }); }
  if (e === 4) { const hn = G4.npcs.find(n => n.name === 'Hannibal'); if (hn) add({ x: hn.x + 22, y: hn.y }, () => drawElephant(hn.x + 22, hn.y, 0)); }
}
function l4WorldLabels(ox, oy) {
  const near = (id, label, col = '#fff', dy = -8) => { const b = BMAP[id]; if (b && dist(b.doorX, b.doorY, P.x, P.y) < 180) txt(label, b.doorX + ox, b.y * 16 + oy + dy, 6.5, col, 'center', true); };
  const e = L4().era;
  if (e === 0) { near('gobekli', 'GÖBEKLI TEPE', '#ffe8b0', -10); near('catal', 'ÇATALHÖYÜK', '#ffe8b0'); }
  if (e === 1) { near('urukgate', 'URUK', '#ffe8b0', -14); near('ziggurat', 'UR', '#ffe8b0', -24); near('ishtar', 'BABYLON', '#bfe3ff', -24); }
  if (e === 2) { near('steppyr', 'SAQQARA', '#ffe8b0', -12); near('pyramid', 'GIZA', '#ffe8b0', -64); near('karnak', 'KARNAK', '#ffe8b0', -26); near('tomb', 'KV62', '#ffe8b0', -24); }
  if (e === 3) { near('stadion', 'OLYMPIA', '#ffe8b0'); near('parthenon', 'PARTHENON', '#ffffff', -14); near('delphi', 'DELPHI', '#ffe8b0', -14); }
  if (e === 4) { near('pantheon', 'PANTHEON', '#ffffff', -16); near('colosseum', 'COLOSSEUM', '#ffffff', -42); near('ravenna', 'RAVENNA', '#ffe8b0', -12); near('villa', 'POMPEII', '#ffe8b0'); }
}
function l4Overlay() {
  if (curZone === 'e1cedar') { g.fillStyle = 'rgba(10,30,10,.22)'; g.fillRect(0, 0, VW, VH); }
  if (curZone === 'e4pompeii' && !q4('pompeii')) { g.fillStyle = 'rgba(60,50,45,.12)'; g.fillRect(0, 0, VW, VH); }
}

// ---------------------------------------------------------------- the time portal
function portalActive4() { const e = L4().era; return e < 4 ? eraDone4(e) : !!L4().flags.fallen; }
const fmtYear4 = y => y < 0 ? t('{0} BC', Math.round(-y)) : t('AD {0}', Math.max(1, Math.round(y)));
function saveL4Pos() { if (ST.level === 4 && scene === 'world') { L4().pos[L4().era] = { x: P.x, y: P.y }; ST.pos[4] = L4().pos[L4().era]; } }
function enterEra4(e) {
  saveL4Pos(); L4().era = e; L4().unlocked = Math.max(L4().unlocked, e);
  ST.pos[4] = L4().pos[e] || null; enterLevel(4);
}
function goHome4() {
  saveL4Pos(); const b = (typeof L3_BUILDINGS !== 'undefined' && L3_BUILDINGS.find(q => q.id === 'hoell')) || { x: 62, y: 22, w: 5, h: 3 };
  ST.pos[3] = { x: (b.x + b.w / 2) * 16, y: (b.y + b.h) * 16 + 16 }; enterLevel(3);
  setTimeout(() => say([['Sarah', 'Home! AD 2026. Running water, cherries, and nobody wants to wrestle me.'], ['C-Real', 'The portal stone in the Höllgrotten will take us back whenever you like. ⏳']]), 900);
}
let TW4 = null;
function startTimewarp4(to, fromYear, home) { saveL4Pos(); saveGame(); transition(() => { scene = 'timewarp'; musI = 0; TW4 = { t: 0, to, from: fromYear, target: home ? 2026 : ERAS4[to].from, home: !!home }; }); }
function l4PortalFromBaar() {
  if (!L4().flags.arrived) say([['C-Real', 'Whoa. A ring of standing stones, deep inside the Höllgrotten... and it\'s humming.'], ['Sarah', 'They\'re carved. Foxes, boars, vultures... This looks like Göbekli Tepe. That\'s 11,000 years old!'],
    ['C-Real', 'Only one way to find out where it leads. Hold my hand? ⏳'], ['Sarah', 'Always.']], () => { L4().flags.arrived = 1; startTimewarp4(0, 2026); });
  else say([['C-Real', t('The stones are humming again. Back to {0}?', t(ERAS4[L4().era].name))]], () => startTimewarp4(L4().era, 2026));
}
SCENES.timewarp = {
  music: 'warp',
  update(dt) { const W4 = TW4; W4.t += dt; if (W4.t > 4.4 || (W4.t > 1.4 && inp.a)) { W4.t = -99; transition(() => W4.home ? goHome4() : enterEra4(W4.to)); } },
  draw() {
    const tm = Math.max(0, TW4.t); g.fillStyle = '#0a0618'; g.fillRect(0, 0, VW, VH);
    for (let i = 0; i < 16; i++) {
      const k = ((i / 16 + tm * .45) % 1), r = 4 + k * k * 260;
      g.strokeStyle = `hsla(${(i * 37 + tm * 120) % 360},80%,65%,${.15 + k * .5})`; g.lineWidth = 1 + k * 4; g.beginPath(); g.ellipse(VW / 2 + Math.sin(tm * 2 + i) * 10 * k, VH / 2, r, r * .62, 0, 0, 7); g.stroke();
    }
    for (let i = 0; i < 40; i++) { const a = hash(i, 3) / 4294967296 * 6.28, s = ((hash(i, 9) % 1000) / 1000 + tm * .8) % 1, rr = s * s * 240; R(VW / 2 + Math.cos(a) * rr, VH / 2 + Math.sin(a) * rr * .62, 1 + s * 2, 1 + s * 2, '#ffffff'); }
    bigSprite(() => { g.rotate(Math.sin(tm * 3) * .3); drawSarah(0, 8, 'down', 0, 0, false, false); }, VW / 2 - 14, VH / 2 + 10, 2);
    bigSprite(() => { g.rotate(-Math.sin(tm * 3) * .3); drawCReal(0, 8, tm); }, VW / 2 + 14, VH / 2 + 12, 2);
  },
  ui() {
    const k = Math.min(1, Math.max(0, TW4.t - .4) / 3), e = 1 - Math.pow(1 - k, 3), y = TW4.from + (TW4.target - TW4.from) * e;
    txt(fmtYear4(y), VW / 2, 18, 24, '#ffffff', 'center', true);
    if (TW4.t > 3.2) { const n = TW4.home ? 'Baar' : t(ERAS4[TW4.to].name); txt(n, VW / 2, 176, 14, '#ffe08a', 'center', true); if (!TW4.home) txt(t(ERAS4[TW4.to].years), VW / 2, 196, 8, '#d8c8ff', 'center', true); }
  },
};
// a small choice menu over the world (used by the portal stone)
let MN4 = null;
function menu4(title, opts) { MN4 = { title, opts, sel: 0, prev: scene }; scene = 'l4menu'; }
SCENES.l4menu = {
  update() {
    if (inp.b || inp.pause) { scene = MN4.prev; MN4 = null; return; }
    choiceInput(MN4, MN4.opts.length, i => { const o = MN4.opts[i]; scene = MN4.prev; MN4 = null; o.act(); });
  },
  draw() { drawWorld(); },
  ui() {
    const n = MN4.opts.length, h = 26 + n * 15, y0 = (VH - h) / 2;
    rrect(40, y0, VW - 80, h, 7, 'rgba(18,14,34,.94)', '#c8a0ff'); txt(t(MN4.title), VW / 2, y0 + 6, 9, '#d8c0ff', 'center', true, false);
    MN4.opts.forEach((o, i) => { const y = y0 + 20 + i * 15, sel = i === MN4.sel; rrect(50, y, VW - 100, 13, 5, sel ? '#ff6fa8' : 'rgba(255,255,255,.88)'); txt((sel ? '▶ ' : '') + o.label, 56, y + 3, 7, sel ? '#fff' : '#222', 'left', true, false); });
  },
};
const MAIN_NAMES4 = {
  pillar: 'Help the hunters raise the pillar at Göbekli Tepe', farm: 'Help the farmer at Çatalhöyük', sk_gobekli: 'Sketch the T-pillars of Göbekli Tepe',
  wrestle: 'Wrestle Gilgamesh at the gate of Uruk', humbaba: 'Face Humbaba in the Cedar Forest', eduba: 'Learn cuneiform in the tablet house', sk_ziggurat: 'Sneak into the Ziggurat of Ur and sketch',
  steppyr: 'Help Imhotep build the Step Pyramid', cartouche: 'Write your name in hieroglyphs at Karnak', sk_pyramid: 'Sneak into the Great Pyramid and sketch',
  olympia: 'Run the stadion race at Olympia', marathon: 'Run from Marathon to Athens', sk_parthenon: 'Sneak into the Parthenon and sketch',
  hannibal: 'Guide Hannibal\'s elephant over the Alps', pompeii: 'Escape from Pompeii', sk_pantheon: 'Sneak into the Pantheon and sketch',
};
const missing4 = e => MAINS4[e].filter(k => k.startsWith('sk_') ? !L4().sk[k.slice(3)] : !q4(k));
function portalAct4() {
  const e = L4().era, opts = [];
  if (e < 4 && eraDone4(e)) opts.push({ label: t('Onward to: {0} ({1})', t(ERAS4[e + 1].name), t(ERAS4[e + 1].years)), act: () => startTimewarp4(e + 1, ERAS4[e].from) });
  if (e === 4 && L4().flags.fallen) opts.push({ label: t('Onward to: the Middle Ages (AD 529)'), act: startScriptorium4 });
  for (let k = 0; k <= L4().unlocked; k++) if (k !== e && !(k === e + 1 && eraDone4(e))) opts.push({ label: t('Travel to: {0} ({1})', t(ERAS4[k].name), t(ERAS4[k].years)), act: () => startTimewarp4(k, ERAS4[e].from) });
  opts.push({ label: t('Home to Baar (AD 2026)'), act: () => startTimewarp4(0, ERAS4[e].from, true) }, { label: t('Stay here'), act: () => { } });
  if (!portalActive4()) {
    const todo = e < 4 ? missing4(e) : missing4(e).length ? missing4(e) : ['finale'];
    say([['C-Real', 'The portal stone is still cold. It wakes up once we understand this era. Still to do:']].concat(todo.map(k => ['C-Real', k === 'finale' ? 'Go to the palace in Ravenna. Something big happens there in 476.' : MAIN_NAMES4[k]])), () => menu4('THE PORTAL STONE', opts));
  } else menu4('THE PORTAL STONE', opts);
}
// ================================================================ MINIGAMES
const sky4 = (a, b, y1 = VH) => { const gr = g.createLinearGradient(0, 0, 0, y1); gr.addColorStop(0, a); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(0, 0, VW, y1); };
const tipUI4 = (s, y = 200) => txt(t(s), VW / 2, y, 7, '#fff', 'center', true);
function winPanel4(title, sub, col = '#ffd34d') { panelUI(50, 84); txt(t(title), VW / 2, 60, 13, col, 'center', true, false); if (sub) wrap(t(sub), VW - 150, 7.5).forEach((ln, i) => txt(ln, VW / 2, 82 + i * 10, 7.5, '#fff', 'center', false, false)); txt(t('[A]: continue'), VW / 2, 120, 8, '#ffd34d', 'center', true, false); }
function losePanel4(title) { panelUI(56, 70); txt(t(title), VW / 2, 66, 12, '#ff8a8a', 'center', true, false); txt(t('[A]: try again   ·   B: leave'), VW / 2, 100, 8, '#ffd34d', 'center', true, false); }

// ---------------------------------------------------------------- TIMING: raise the pillar · wrestle Gilgamesh · stadion sprint
const TIMING4 = {
  pillar: { title: 'RAISE THE PILLAR', goal: 6, speed: 1.6, zone: .26, music: 'stone', tip: 'Pull together! Press [A] when the marker is in the green zone.' },
  wrestle: { title: 'WRESTLE GILGAMESH', goal: 7, speed: 2.1, zone: .22, music: 'meso', tip: 'Push! [A] in the green zone. A miss lets Gilgamesh push back. 3 misses and you\'re down.' },
  sprint: { title: 'THE STADION RACE, 776 BC', goal: 10, speed: 2.7, zone: .22, music: 'hellas', tip: 'Sprint! Press [A] in the green zone with every stride. Beat the men to the line!' },
};
let TM4 = null;
function startTiming4(id, onWin) { transition(() => { scene = 'timing4'; musI = 0; TM4 = { id, d: TIMING4[id], onWin, p: 0, miss: 0, ph: 0, t: 0, flash: 0, mode: 'play', rivals: [0, 0, 0] }; }); }
SCENES.timing4 = {
  get music() { return TM4 ? TM4.d.music : 'stone'; },
  update(dt) {
    const M = TM4, D = M.d; M.t += dt; M.flash = Math.max(0, M.flash - dt);
    if (M.mode === 'win') { if (M.t > .6 && inp.a) backToWorld(M.onWin); return; }
    if (M.mode === 'lose') { if (inp.a) Object.assign(M, { p: 0, miss: 0, mode: 'play', t: 0, rivals: [0, 0, 0] }); else if (inp.b) backToWorld(); return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    M.ph += dt * D.speed * (1 + M.p * .03);
    if (M.id === 'sprint') { M.rivals = M.rivals.map((r, i) => r + dt * (.5 + i * .07)); if (M.t > 1 && Math.max(...M.rivals) >= D.goal) { M.mode = 'lose'; sfx.bonk(); return; } }
    if (inp.a) {
      const m = (Math.sin(M.ph) + 1) / 2;
      if (Math.abs(m - .5) < D.zone / 2) { M.p++; M.flash = .25; sfx.pick(); shake = .08; if (M.id === 'sprint') tone(300 + M.p * 30, .05, 'square', .04); if (M.p >= D.goal) { M.mode = 'win'; M.t = 0; sfx.ding(); } }
      else { M.miss++; sfx.bonk(); popText(VW / 2, 120, t('Miss!'), '#ffb070', 'screen'); if (M.id === 'wrestle') M.p = Math.max(0, M.p - 1); if (M.miss >= 3 && M.id !== 'sprint') M.mode = 'lose'; }
    }
  },
  draw() {
    const M = TM4, k = M.p / M.d.goal;
    if (M.id === 'pillar') {
      sky4('#f2a86a', '#f8e0b0', 140); R(0, 120, VW, 96, '#b8a068'); ell(VW / 2, 150, 200, 30, '#a89060');
      for (let i = 0; i < 7; i++) drawPillarT(40 + i * 50 + (i > 2 ? 40 : 0), 130, 22);
      g.save(); g.translate(VW / 2 - 6, 150); g.rotate(-Math.PI / 2 * (1 - k)); R(-6, -70, 12, 70, '#d8d0bc'); R(-14, -80, 28, 12, '#e4dccb');
      R(-3, -60, 6, 2, '#8a8270'); R(-4, -54, 1, 22, '#8a8270'); R(2, -54, 1, 22, '#8a8270'); for (let i = 0; i < 3; i++) R(-2, -48 + i * 8, 4, 3, '#a89a80'); g.restore();
      const top = { x: VW / 2 - 6 - Math.sin(Math.PI / 2 * (1 - k)) * 75, y: 150 - Math.cos(Math.PI / 2 * (1 - k)) * 75 };
      g.strokeStyle = '#8a6a3a'; g.lineWidth = 1; for (const px of [250, 280, 310, 340]) { g.beginPath(); g.moveTo(top.x, top.y); g.lineTo(px, 176); g.stroke(); }
      for (const [i, px] of [250, 280, 310].entries()) bigSprite(() => drawPerson(0, 0, LOOKS4.Hunter), px + (M.flash > 0 ? 3 : 0), 190 + (i % 2) * 4, 1.6);
      bigSprite(() => drawSarah(0, 0, 'left', 0, 0, false, false), 340 + (M.flash > 0 ? 3 : 0), 190, 1.6);
    } else if (M.id === 'wrestle') {
      sky4('#e8b878', '#f8e8c8', 120); R(0, 60, VW, 90, '#c49a62'); for (let j = 64; j < 150; j += 6) R(0, j, VW, 1, '#a87e4c'); for (let i = 0; i < VW; i += 12) R(i, 52, 7, 8, '#c49a62');
      R(VW / 2 - 24, 90, 48, 60, '#3a2a1a'); R(0, 150, VW, 66, '#d8b880');
      const off = (k - .5) * 60 + (M.flash > 0 ? 4 : 0);
      bigSprite(() => drawCReal(0, 0, time, 'enkidu'), VW / 2 - 18 + off, 196, 2.4);
      bigSprite(() => drawPerson(0, 0, LOOKS4.Gilgamesh), VW / 2 + 18 + off, 196, 2.4);
      bigSprite(() => drawSarah(0, 0, 'right', 0, 0, false, false), 50, 200, 1.8);
      for (let i = 0; i < 6; i++) bigSprite(() => drawPerson(0, 0, { shirt: ['#e8dcc0', '#c84a3a', '#3a5ab8'][i % 3], pants: '#e8d8b0' }), 250 + i * 22, 150, 1.2);
    } else {
      sky4('#7cc4ee', '#d8f0fa', 80); R(0, 70, VW, 30, '#5d9a45'); for (let i = 0; i < 40; i++) bigSprite(() => drawPerson(0, 0, { shirt: ['#f2f2ec', '#c84a3a', '#3a5ab8', '#d9a400'][i % 4], pants: '#e8b996' }), 8 + i * 9.5, 92, .8);
      R(0, 100, VW, VH - 100, '#d2b07a'); for (let j = 0; j < 4; j++) R(0, 112 + j * 22, VW, 1, 'rgba(255,255,255,.35)'); R(28, 100, 2, 100, '#fff'); R(352, 100, 2, 100, '#fff');
      const lane = j => 122 + j * 22;
      M.rivals.forEach((r, j) => bigSprite(() => drawPerson(0, 0, { shirt: '#e8b996', pants: '#f2f2ec', hair: '#2a1a10', beard: '#2a1a10', anim: M.t * (1.2 + j * .1) }), 30 + Math.min(1, r / M.d.goal) * 322, lane(j + 1), 1.4));
      bigSprite(() => drawSarah(0, 0, 'right', M.t * 1.6, M.flash > 0 ? 3 : 0, false, true), 30 + k * 322, lane(0), 1.4);
    }
  },
  ui() {
    const M = TM4, D = M.d, m = (Math.sin(M.ph) + 1) / 2;
    txt(t(D.title), VW / 2, 6, 11, '#fff', 'center', true);
    rrect(80, 24, 224, 10, 5, 'rgba(0,0,0,.45)'); rrect(80 + 224 * (.5 - D.zone / 2), 24, 224 * D.zone, 10, 5, '#7ee081'); rrect(78 + 224 * m, 21, 4, 16, 2, '#ffffff');
    let dots = ''; for (let i = 0; i < D.goal; i++) dots += i < M.p ? '●' : '○'; txt(dots, VW / 2, 40, 8, '#ffd34d', 'center', true);
    if (M.id !== 'sprint') txt('✗'.repeat(M.miss) + '·'.repeat(Math.max(0, 3 - M.miss)), VW - 30, 24, 10, '#ff8a8a', 'center', true);
    if (M.mode === 'play' && M.t < 5) tipUI4(D.tip, 204);
    if (M.mode === 'win') winPanel4(M.id === 'pillar' ? 'The pillar stands! 🗿' : M.id === 'wrestle' ? 'A draw! New best friends. 🤝' : 'FIRST! 🏅🫒');
    if (M.mode === 'lose') losePanel4(M.id === 'sprint' ? 'Beaten by a beard. Again!' : M.id === 'wrestle' ? 'Pinned! Try again.' : 'The pillar slipped back down!');
    screenParts();
  },
};

// ---------------------------------------------------------------- RUN: Marathon · Hannibal's elephant · escape from Pompeii
const RUNS4 = {
  marathon: { title: 'MARATHON → ATHENS, 490 BC', len: 4200, ground: '#cbb07c', edge: '#a8905c', side: '#8aa84a', deco: 'olive', music: 'hellas', item: '🫒', tip: '← → steer · [A] jump over rocks · dodge the goats!' },
  hannibal: { title: 'OVER THE ALPS, 218 BC', len: 4200, ground: '#eef3f8', edge: '#c8d4e2', side: '#8a8a92', deco: 'pine', music: 'roma', item: '🍎', tip: '← → steer Surus · [A] jump over rocks · avoid crevasses and snowballs!' },
  pompeii: { title: 'ESCAPE FROM POMPEII, AD 79', len: 4000, ground: '#9a948a', edge: '#7a7468', side: '#5a5048', deco: 'house', music: 'roma', item: '🏺', tip: '← → run · [A] jump over columns · stay out of the pumice shadows!' },
};
const runC4 = d => 192 + 55 * Math.sin(d / 330) + 22 * Math.sin(d / 120 + 1);
let RN4 = null;
function startRun4(id, onWin) {
  transition(() => {
    scene = 'run4'; musI = 0;
    const D = RUNS4[id], r = mulberry32(id.length * 97 + 7), obs = [];
    for (let d = 380; d < D.len - 180; d += 85 + r() * 70) {
      const k = r(), off = (r() * 2 - 1) * 52;
      if (id === 'marathon') obs.push({ d, off, kind: k < .55 ? 'low' : 'goat', ph: r() * 6 });
      else if (id === 'hannibal') obs.push({ d, off, kind: k < .4 ? 'low' : k < .75 ? 'crevasse' : 'snowball', ph: r() * 6 });
      else obs.push({ d, off, kind: k < .35 ? 'low' : k < .8 ? 'pumice' : 'cart', ph: r() * 6 });
      if (r() < .5) obs.push({ d: d + 40, off: (r() * 2 - 1) * 45, kind: 'item' });
    }
    RN4 = { id, D, onWin, d: 0, v: 90, x: runC4(0), hp: 3, jump: 0, tumble: 0, inv: 0, obs, score: 0, mode: 'play', t: 0 };
  });
}
const obsX4 = (o, d) => runC4(o.d) + o.off + (o.kind === 'goat' || o.kind === 'snowball' ? Math.sin(time * 1.6 + o.ph) * 30 : 0);
SCENES.run4 = {
  get music() { return RN4 ? RN4.D.music : 'roma'; },
  update(dt) {
    const S = RN4; S.t += dt;
    if (S.mode === 'win') { if (S.t > .6 && inp.a) backToWorld(S.onWin); return; }
    if (S.mode === 'lose') { if (inp.a) { const id = S.id, cb = S.onWin; scene = 'world'; startRun4(id, cb); } else if (inp.b) backToWorld(); return; }
    if (inp.pause) { backToWorld(); return; }
    S.tumble = Math.max(0, S.tumble - dt); S.inv = Math.max(0, S.inv - dt); S.jump = Math.max(0, S.jump - dt);
    S.v = Math.min(250, S.v + 60 * dt);
    if (S.tumble <= 0) S.x += inp.ax * 150 * dt;
    const c = runC4(S.d); S.x = clamp(S.x, c - 68, c + 68);
    if (inp.a && S.jump <= 0 && S.tumble <= 0) { S.jump = .55; sfx.jump(); }
    S.d += S.v * dt;
    for (const o of S.obs) {
      if (o.hit || Math.abs(o.d - S.d) > 9) continue;
      const ox = obsX4(o, S.d), near = Math.abs(ox - S.x) < (o.kind === 'crevasse' ? 16 : o.kind === 'cart' ? 14 : 10);
      if (!near) continue;
      if (o.kind === 'item') { o.hit = true; S.score++; sfx.pick(); popText(S.x, 70, '+1 ' + S.D.item, '#ffe08a', 'screen'); continue; }
      if (o.kind === 'low' && S.jump > 0) continue;
      if (S.inv > 0) continue;
      o.hit = true; S.hp--; S.tumble = .7; S.inv = 1.2; S.v *= .45; sfx.bonk(); shake = .3;
      popText(VW / 2, 90, t({ low: 'Ouch! Jump next time!', goat: 'A goat! Baa! 🐐', crevasse: 'Crevasse! Careful! ❄️', snowball: 'Snowball! ☃️', pumice: 'Pumice! Ow! 🌋', cart: 'Cart crash! 🛒' }[o.kind]), '#ff9a8a', 'screen');
      if (S.hp <= 0) { S.mode = 'lose'; S.t = 0; return; }
    }
    if (S.d >= S.D.len) { S.mode = 'win'; S.t = 0; sfx.ding(); st4('runs'); }
  },
  draw() {
    const S = RN4, D = S.D, py = 150;
    g.fillStyle = D.side; g.fillRect(0, 0, VW, VH);
    for (let sy = 0; sy < VH; sy += 2) {
      const d = S.d + (py - sy), c = runC4(d);
      R(c - 78, sy, 156, 2, D.ground); if (Math.floor(d / 18) % 2) R(c - 78, sy, 156, 2, 'rgba(0,0,0,.04)');
      R(c - 82, sy, 4, 2, D.edge); R(c + 78, sy, 4, 2, D.edge);
      if (sy % 24 === 0 && hash(Math.floor(d / 24), 5) % 3 === 0) {
        for (const sx of [c - 104, c + 92]) {
          if (D.deco === 'olive') g.drawImage(OVER[T.OLIVE][hash(Math.floor(d), 1) & 3], sx, sy - 8);
          else if (D.deco === 'pine') g.drawImage(OVER.PINE_SNOW[hash(Math.floor(d), 1) & 3], sx, sy - 8);
          else { R(sx, sy - 10, 14, 12, '#d8c8a8'); R(sx - 1, sy - 12, 16, 3, '#9a4a3a'); }
        }
      }
    }
    for (const o of S.obs) {
      if (o.hit) continue; const sy = py + (S.d - o.d); if (sy < -20 || sy > VH + 20) continue;
      const x = obsX4(o, S.d);
      if (o.kind === 'item') txt(D.item, x, sy - 10, 10, '#fff', 'center', false, false);
      else if (o.kind === 'low') { if (S.id === 'pompeii') { R(x - 12, sy - 4, 24, 6, '#d8d0c0'); R(x - 12, sy - 4, 24, 1, '#f0e8dc'); } else { circ(x, sy, 7, '#7a7470'); circ(x - 2, sy - 2, 3, '#9a948e'); } }
      else if (o.kind === 'goat') drawGoat({ x, y: sy + 4, face: Math.cos(time * 1.6 + o.ph) > 0 ? 1 : -1, anim: time });
      else if (o.kind === 'crevasse') { ell(x, sy, 16, 4, '#4a6a9a'); ell(x, sy - 1, 13, 2, '#2a3a5a'); }
      else if (o.kind === 'snowball') { circ(x, sy - 6, 8, '#ffffff'); circ(x - 2, sy - 8, 3, '#e8eef4'); }
      else if (o.kind === 'cart') { R(x - 12, sy - 12, 24, 10, '#8a5a2a'); circ(x - 8, sy - 2, 4, '#3a2a1a'); circ(x + 8, sy - 2, 4, '#3a2a1a'); }
      else if (o.kind === 'pumice') { const k = clamp(1 - (o.d - S.d) / 160, 0, 1); ell(x, sy, 4 + k * 8, 2 + k * 3, `rgba(0,0,0,${.2 + k * .3})`); if (k > .2) { const fy = sy - (1 - k) * 120; circ(x, fy - 6, 6, '#c8c0b0'); circ(x - 2, fy - 8, 2, '#e0d8c8'); } }
    }
    const jh = S.jump > 0 ? Math.sin(Math.PI * (1 - S.jump / .55)) * 12 : 0;
    g.save(); g.translate(Math.round(S.x), py); if (S.tumble > 0) g.rotate(Math.sin(S.t * 30) * .3);
    if (S.inv > 0 && Math.floor(S.inv * 12) % 2) g.globalAlpha = .5;
    if (S.id === 'hannibal') { g.translate(0, -jh); drawElephantBack4(0, 0, S.t); drawSarah(0, -14, 'up', S.t * 2, 0, false, true); }
    else drawSarah(0, 0, 'up', S.t * 2, jh, false, true);
    g.restore();
    if (S.id === 'pompeii') { for (let i = 0; i < 40; i++) R((hash(i, 2) % VW + time * 20 * (1 + i % 3)) % VW, (hash(i, 5) % VH + time * 60 * (1 + i % 2)) % VH, 1, 2, 'rgba(60,55,50,.6)'); g.fillStyle = 'rgba(200,60,20,.12)'; g.fillRect(0, 0, VW, 50); }
    if (S.id === 'hannibal') for (let i = 0; i < 30; i++) R((hash(i, 2) % VW + Math.sin(time + i) * 10) % VW, (hash(i, 5) % VH + time * 40 * (1 + i % 2)) % VH, 1, 1, '#ffffff');
  },
  ui() {
    const S = RN4; txt(t(S.D.title), VW / 2, 6, 10, '#fff', 'center', true);
    rrect(90, 22, 204, 5, 2, 'rgba(0,0,0,.35)'); rrect(90, 22, 204 * Math.min(1, S.d / S.D.len), 5, 2, '#ff6fa8');
    let s = ''; for (let i = 0; i < 3; i++) s += i < S.hp ? '❤' : '·'; txt(s, 10, 8, 9, '#ff9ab8', 'left', true); txt(`${S.D.item} ${S.score}`, VW - 10, 8, 9, '#fff', 'right', true);
    if (S.mode === 'play' && S.t < 5) tipUI4(S.D.tip, 204);
    if (S.mode === 'win') winPanel4(S.id === 'marathon' ? 'Athens! "We have won!" 🏛️' : S.id === 'hannibal' ? 'Italy! Surus made it! 🐘' : 'The harbour! Saved! ⛵', t('{0} collected: {1}', S.D.item, S.score));
    if (S.mode === 'lose') losePanel4(S.id === 'marathon' ? 'Out of breath!' : S.id === 'hannibal' ? 'Surus refuses to go on!' : 'Too much ash! Run!');
    screenParts();
  },
};
function drawElephantBack4(x, y, tm) {   // Surus, seen from behind, plodding up the pass
  const st = Math.floor(tm * 5) % 2; ell(x, y + 2, 14, 4, 'rgba(0,0,0,.25)');
  R(x - 10, y - 6 + st, 6, 8, '#7a7470'); R(x + 4, y - 6 - st, 6, 8, '#7a7470'); ell(x, y - 12, 13, 10, '#8a8480');
  ell(x - 13, y - 18, 6, 8, '#9a948e'); ell(x + 13, y - 18, 6, 8, '#9a948e'); R(x - 1, y - 6, 2, 6, '#6a6460'); R(x - 9, y - 22, 18, 4, '#b8302a'); R(x - 9, y - 22, 18, 1, '#ffd34d');
}

// ---------------------------------------------------------------- CUNEIFORM: bookkeeping in the tablet house (Eduba)
const CUNE_ORDERS4 = [{ n: 5, sign: 'udu', text: 'Write: 5 sheep' }, { n: 12, sign: 'kas', text: 'Write: 12 jars of beer' }, { n: 23, sign: 'se', text: 'Write: 23 sacks of barley' }];
const CUNE_SIGNS4 = { udu: 'sheep', kas: 'beer', se: 'barley' };
let CU4 = null;
function startCune4(onWin) { transition(() => { scene = 'cune4'; musI = 0; CU4 = { onWin, oi: 0, ones: 0, tens: 0, stage: 'num', sel: 0, mode: 'play', msg: '', t: 0, signs: shuffle(Object.keys(CUNE_SIGNS4)) }; }); }
function drawWedge4(x, y, kind) {   // a reed stylus pressed into clay: vertical wedge (1) or corner wedge (10)
  if (kind === 1) { poly([[x - 3, y], [x + 3, y], [x, y + 4]], '#6a4a2a'); R(x, y + 3, 1, 9, '#7a5a38'); }
  else { poly([[x + 6, y - 4], [x + 6, y + 4], [x, y]], '#6a4a2a'); g.strokeStyle = '#7a5a38'; g.lineWidth = 1; g.beginPath(); g.moveTo(x + 6, y - 4); g.lineTo(x + 12, y - 8); g.moveTo(x + 6, y + 4); g.lineTo(x + 12, y + 8); g.stroke(); }
}
function drawPictograph4(k, x, y, s = 1) {   // early pictographs: sheep (circle with a cross), beer (pointed jar), barley (an ear of grain)
  g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = '#5a3a1e'; g.lineWidth = 1.5;
  if (k === 'udu') { g.beginPath(); g.arc(0, 0, 8, 0, 7); g.moveTo(-8, 0); g.lineTo(8, 0); g.moveTo(0, -8); g.lineTo(0, 8); g.stroke(); }
  else if (k === 'kas') { g.beginPath(); g.moveTo(-5, -9); g.lineTo(5, -9); g.lineTo(7, 0); g.lineTo(0, 11); g.lineTo(-7, 0); g.closePath(); g.moveTo(-6, -3); g.lineTo(6, -3); g.moveTo(-4, 2); g.lineTo(4, 2); g.stroke(); }
  else { g.beginPath(); g.moveTo(0, 11); g.lineTo(0, -10); for (let i = -7; i < 6; i += 4) { g.moveTo(0, i); g.lineTo(-5, i - 4); g.moveTo(0, i); g.lineTo(5, i - 4); } g.stroke(); }
  g.restore();
}
SCENES.cune4 = {
  music: 'meso',
  update(dt) {
    const C = CU4; C.t += dt;
    if (C.mode === 'win') { if (C.t > .6 && inp.a) backToWorld(C.onWin); return; }
    if (C.mode === 'fb') { if (inp.a) C.mode = 'play'; return; }
    if (C.mode === 'ok') { if (inp.a) { C.oi++; Object.assign(C, { ones: 0, tens: 0, stage: 'num', sel: 0, mode: C.oi >= CUNE_ORDERS4.length ? 'win' : 'play', t: 0, signs: shuffle(Object.keys(CUNE_SIGNS4)) }); if (C.mode === 'win') sfx.ding(); } return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    const O = CUNE_ORDERS4[C.oi];
    if (C.stage === 'num') choiceInput(C, 4, i => {
      if (i === 0 && C.ones < 9) { C.ones++; tone(220, .05, 'square', .06); }
      else if (i === 1 && C.tens < 5) { C.tens++; tone(180, .06, 'square', .06); }
      else if (i === 2) { C.ones = C.tens = 0; noise(.15, .05, 800); }
      else if (i === 3) {
        const v = C.ones + C.tens * 10;
        if (v !== O.n) { C.mode = 'fb'; C.msg = t('That says {0}, not {1}. Each ▼ is 1, each ◀ is 10.', v, O.n); sfx.bonk(); st4('mistakes'); }
        else if (C.tens !== Math.floor(O.n / 10)) { C.mode = 'fb'; C.msg = 'Right number, but scribes write ten as ONE corner wedge ◀. Smooth the clay and try again.'; sfx.bonk(); }
        else { C.stage = 'sign'; C.sel = 0; sfx.pick(); }
      }
    });
    else { if (inp.left) { C.sel = (C.sel + 2) % 3; sfx.blip(); } if (inp.right) { C.sel = (C.sel + 1) % 3; sfx.blip(); }
      if (inp.a) { const k = C.signs[C.sel]; if (k === O.sign) { C.mode = 'ok'; sfx.ding(); } else { C.mode = 'fb'; C.msg = t('That sign means "{0}". Look again!', t(CUNE_SIGNS4[k])); sfx.bonk(); st4('mistakes'); } } }
  },
  draw() {
    const C = CU4; R(0, 0, VW, VH, '#8a6a48'); for (let y = 0; y < VH; y += 14) R(0, y, VW, 1, '#7a5a3a');
    ell(150, 108, 92, 70, '#5a3a20'); g.fillStyle = '#c8a070'; g.beginPath(); g.ellipse(150, 104, 88, 66, 0, 0, 7); g.fill(); g.fillStyle = '#d4ae7e'; g.beginPath(); g.ellipse(146, 98, 80, 56, 0, 0, 7); g.fill();
    for (let i = 0; i < C.tens; i++) drawWedge4(80 + i * 16, 100, 10);
    for (let i = 0; i < C.ones; i++) drawWedge4(80 + C.tens * 16 + 8 + (i % 5) * 9, 92 + Math.floor(i / 5) * 16, 1);
    if (C.stage === 'sign' || C.mode === 'ok') drawPictograph4(C.mode === 'ok' ? CUNE_ORDERS4[C.oi].sign : C.signs[C.sel], 200, 100, 1.3);
    bigSprite(() => drawPerson(0, 0, LOOKS4.Teacher), 330, 200, 2.2);
  },
  ui() {
    const C = CU4, O = CUNE_ORDERS4[Math.min(C.oi, CUNE_ORDERS4.length - 1)];
    txt(t('THE TABLET HOUSE (EDUBA)'), VW / 2, 6, 10, '#ffe8b0', 'center', true); txt(t('Tablet {0}/3', Math.min(3, C.oi + 1)), VW / 2, 20, 7.5, '#fff', 'center', true);
    rrect(250, 34, 126, 18, 5, 'rgba(18,16,28,.85)', '#ffd34d'); txt(t(O.text), 313, 39, 7.5, '#ffd34d', 'center', true, false);
    if (C.mode === 'play' && C.stage === 'num') {
      ['▼ Vertical wedge = 1', '◀ Corner wedge = 10', '⌫ Smooth the clay', '✓ Done: now the sign'].forEach((o, i) => { const y = 150 + i * 14, sel = i === C.sel; rrect(16, y, 200, 12, 5, sel ? '#ff6fa8' : 'rgba(255,255,255,.88)'); txt((sel ? '▶ ' : '') + t(o), 22, y + 2.5, 7, sel ? '#fff' : '#222', 'left', true, false); });
    }
    if (C.mode === 'play' && C.stage === 'sign') { rrect(16, 170, 230, 34, 6, 'rgba(18,16,28,.85)', '#ffd34d'); txt(t('Which sign means "{0}"? ◀ ▶ + [A]', t(CUNE_SIGNS4[O.sign])), 24, 176, 7.5, '#fff', 'left', true, false); txt(t('Sign {0}/3', C.sel + 1), 24, 190, 7, '#ffd34d', 'left', false, false); }
    if (C.mode === 'fb') { const ls = wrap(t(C.msg), 300, 7.5); rrect(30, 150, VW - 60, 20 + ls.length * 10, 6, 'rgba(110,20,20,.95)', '#ff8a8a'); ls.forEach((ln, i) => txt(ln, 40, 156 + i * 10, 7.5, '#fff', 'left', true, false)); txt(t('[A]: try again'), VW / 2, 158 + ls.length * 10, 7, '#ffd34d', 'center', true, false); }
    if (C.mode === 'ok') { rrect(30, 150, VW - 60, 40, 6, 'rgba(20,80,40,.95)', '#7ee081'); txt(t('✓ Perfect bookkeeping! The temple storehouse thanks you.'), VW / 2, 158, 8, '#fff', 'center', true, false); txt(t('[A]: next tablet'), VW / 2, 174, 7, '#ffd34d', 'center', true, false); }
    if (C.mode === 'win') winPanel4('Scribe of Uruk! ✍️', 'Writing began as bookkeeping: grain, sheep and beer. Stories and laws came later.');
  },
};

// ---------------------------------------------------------------- HIEROGLYPHS: spell names in a cartouche
const GLYPHS4 = [{ k: 'a', snd: 'A', name: 'vulture' }, { k: 'i', snd: 'I', name: 'reed' }, { k: 'k', snd: 'K', name: 'basket' }, { k: 'r', snd: 'R', name: 'mouth' }, { k: 's', snd: 'S', name: 'folded cloth' },
  { k: 'h', snd: 'H', name: 'twisted flax' }, { k: 'l', snd: 'L', name: 'lion' }, { k: 'n', snd: 'N', name: 'water' }, { k: 'm', snd: 'M', name: 'owl' }, { k: 't', snd: 'T', name: 'bread' }];
const WORDS4 = [{ name: 'SARAH', seq: ['s', 'a', 'r', 'a', 'h'] }, { name: 'C-REAL', seq: ['k', 'r', 'i', 'a', 'l'] }];
function drawGlyph4(k, x, y, s = 1, col = '#1a1a1a') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; g.strokeStyle = col; g.lineWidth = 1.4;
  const P2 = (pts) => { g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (const p of pts) g.lineTo(p[0], p[1]); g.closePath(); g.fill(); };
  if (k === 'a') { P2([[-6, 6], [-3, -2], [2, -4], [5, -1], [3, 6]]); P2([[2, -4], [3, -8], [6, -8], [7, -5], [5, -4]]); g.fillRect(-2, 6, 1, 3); g.fillRect(2, 6, 1, 3); }
  else if (k === 'i') { P2([[-1, 8], [-2, -2], [0, -9], [2, -2], [1, 8]]); g.fillRect(-1, 8, 3, 1); }
  else if (k === 'k') { g.beginPath(); g.arc(0, -1, 7, 0, Math.PI); g.closePath(); g.fill(); g.fillRect(5, -3, 3, 2); }
  else if (k === 'r') { g.beginPath(); g.ellipse(0, 0, 8, 3, 0, 0, 7); g.fill(); }
  else if (k === 's') { g.fillRect(-2, -8, 4, 16); g.fillRect(2, -8, 3, 5); }
  else if (k === 'h') { for (let i = -7; i < 8; i += 5) { g.beginPath(); g.arc(0, i, 3, 0, 7); g.stroke(); } }
  else if (k === 'l') { P2([[-8, 5], [-7, 0], [-3, -1], [3, -2], [5, -6], [8, -4], [8, 1], [6, 5]]); g.fillRect(-9, 1, 2, 1); }
  else if (k === 'n') { g.beginPath(); for (let i = -8; i <= 8; i += 2) g.lineTo(i, i % 4 === 0 ? -2 : 2); g.stroke(); }
  else if (k === 'm') { g.beginPath(); g.ellipse(0, 1, 4, 7, 0, 0, 7); g.fill(); g.fillRect(-4, -7, 8, 3); g.fillStyle = '#f4e8c0'; g.fillRect(-3, -5, 2, 2); g.fillRect(1, -5, 2, 2); g.fillStyle = col; g.fillRect(-1, 8, 3, 1); }
  else if (k === 't') { g.beginPath(); g.arc(0, 3, 7, Math.PI, 0); g.closePath(); g.fill(); }
  g.restore();
}
let HG4 = null;
function startHiero4(onWin) { transition(() => { scene = 'hiero4'; musI = 0; HG4 = { onWin, wi: 0, placed: [], sel: 0, mode: 'play', msg: '', t: 0 }; }); }
SCENES.hiero4 = {
  music: 'nile',
  update(dt) {
    const H4 = HG4; H4.t += dt;
    if (H4.mode === 'win') { if (H4.t > .6 && inp.a) backToWorld(H4.onWin); return; }
    if (H4.mode === 'fb') { if (inp.a) H4.mode = 'play'; return; }
    if (H4.mode === 'word') { if (inp.a) { H4.wi++; H4.placed = []; H4.mode = H4.wi >= WORDS4.length ? 'win' : 'play'; H4.t = 0; if (H4.mode === 'win') sfx.ding(); } return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    if (inp.left) { H4.sel = (H4.sel + 9) % 10; sfx.blip(); } if (inp.right) { H4.sel = (H4.sel + 1) % 10; sfx.blip(); }
    if (inp.up || inp.down) { H4.sel = (H4.sel + 5) % 10; sfx.blip(); }
    if (inp.a) {
      const w = WORDS4[H4.wi], need = w.seq[H4.placed.length], gsel = GLYPHS4[H4.sel], gneed = GLYPHS4.find(q => q.k === need);
      if (gsel.k === need) { H4.placed.push(need); sfx.pick(); if (H4.placed.length === w.seq.length) { H4.mode = 'word'; sfx.ding(); } }
      else { H4.mode = 'fb'; H4.msg = t('That\'s the {0} = {1}. We need the sound {2}.', t(gsel.name), gsel.snd, gneed.snd); sfx.bonk(); st4('mistakes'); }
    }
  },
  draw() {
    R(0, 0, VW, VH, '#e8d8a8'); for (let y = 0; y < VH; y += 3) R(0, y, VW, 1, 'rgba(160,130,70,.18)'); for (let x = 0; x < VW; x += 9) R(x, 0, 1, VH, 'rgba(160,130,70,.1)');
    const H4 = HG4, w = WORDS4[Math.min(H4.wi, WORDS4.length - 1)], n = w.seq.length;
    g.strokeStyle = '#3a2a1a'; g.lineWidth = 2; g.beginPath(); g.roundRect ? g.roundRect(VW / 2 - n * 13 - 10, 34, n * 26 + 20, 40, 18) : g.rect(VW / 2 - n * 13 - 10, 34, n * 26 + 20, 40); g.stroke(); R(VW / 2 + n * 13 + 10, 44, 3, 20, '#3a2a1a');
    H4.placed.forEach((k, i) => drawGlyph4(k, VW / 2 - n * 13 + 13 + i * 26, 54, 1.3));
    GLYPHS4.forEach((gl, i) => { const gx = 72 + (i % 5) * 60, gy = 110 + Math.floor(i / 5) * 46, sel = i === H4.sel; R(gx - 20, gy - 18, 40, 38, sel ? '#ffb0cc' : '#f4ead0'); R(gx - 20, gy - 18, 40, 1, '#c8b080'); drawGlyph4(gl.k, gx, gy - 2, 1.3); });
  },
  ui() {
    const H4 = HG4, w = WORDS4[Math.min(H4.wi, WORDS4.length - 1)];
    txt(t('WRITE IN A CARTOUCHE'), VW / 2, 4, 10, '#5a3a1a', 'center', true, false); txt(t('Spell: {0}', w.name), VW / 2, 20, 8, '#3a2a1a', 'center', true, false);
    GLYPHS4.forEach((gl, i) => { const gx = 72 + (i % 5) * 60, gy = 110 + Math.floor(i / 5) * 46; txt(gl.snd, gx, gy + 10, 7, '#5a3a1a', 'center', true, false); });
    if (H4.mode === 'play') { const need = w.seq[H4.placed.length]; txt(t('Next sound: {0}   ·   arrows + [A]', GLYPHS4.find(q => q.k === need).snd), VW / 2, 82, 8, '#8a2a2a', 'center', true, false); if (H4.wi === 1) txt(t('No C or E in Egyptian: K-R-I-A-L. The lion stands for L, as in CLEOPATRA.'), VW / 2, 92, 6.5, '#5a3a1a', 'center', false, false); }
    if (H4.mode === 'fb') { rrect(40, 186, VW - 80, 24, 6, 'rgba(110,20,20,.95)', '#ff8a8a'); txt(H4.msg, VW / 2, 190, 7, '#fff', 'center', true, false); txt(t('[A]: try again'), VW / 2, 200, 6.5, '#ffd34d', 'center', true, false); }
    if (H4.mode === 'word') { rrect(60, 186, VW - 120, 24, 6, 'rgba(20,80,40,.95)', '#7ee081'); txt(t('✓ {0}, written for eternity!', w.name), VW / 2, 190, 7.5, '#fff', 'center', true, false); txt(t('[A]: continue'), VW / 2, 200, 6.5, '#ffd34d', 'center', true, false); }
    if (H4.mode === 'win') winPanel4('Scribe of Karnak! 👁️', 'Hieroglyphs mix sound signs and word signs. A ring around a name, the cartouche, marks it as royal.');
  },
};

// ---------------------------------------------------------------- QUIZ: talking with the people of the past
let QZ4 = null;
function startQuiz4(cfg) { transition(() => { scene = 'quiz4'; musI = 0; QZ4 = { ...cfg, si: 0, mode: 'step', msg: '', t: 0 }; quizStep4(); }); }
function quizStep4() { const st = QZ4.steps[QZ4.si], s = QZ4.sub = { sel: 0 }; if (st.seq) { s.pool = shuffle(st.seq.slice()); s.done = []; } else s.opts = shuffle(st.opts); QZ4.mode = 'step'; }
SCENES.quiz4 = {
  get music() { return QZ4 && QZ4.music || 'interior'; },
  update(dt) {
    const Q = QZ4, st = Q.steps[Q.si], s = Q.sub; Q.t += dt;
    if (Q.mode === 'ok') { if (inp.a) { Q.si++; if (Q.si >= Q.steps.length) { Q.mode = 'done'; sfx.ding(); } else quizStep4(); } return; }
    if (Q.mode === 'wrong') { if (inp.a) quizStep4(); return; }
    if (Q.mode === 'done') { if (inp.a) backToWorld(Q.onWin); return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    if (st.seq) choiceInput(s, s.pool.length, i => {
      const it = s.pool[i];
      if (it === st.seq[s.done.length]) { s.done.push(it); s.pool.splice(i, 1); s.sel = 0; sfx.pick(); if (!s.pool.length) { Q.mode = 'ok'; Q.msg = st.ok || '✓'; sfx.ding(); } }
      else { Q.mode = 'wrong'; Q.msg = t('Not yet. Step {0} is: "{1}"', s.done.length + 1, t(st.seq[s.done.length])); sfx.bonk(); st4('mistakes'); }
    });
    else choiceInput(s, s.opts.length, i => { const o = s.opts[i]; if (o[1] === true) { Q.mode = 'ok'; Q.msg = st.ok || '✓'; sfx.ding(); } else { Q.mode = 'wrong'; Q.msg = o[1]; sfx.bonk(); st4('mistakes'); } });
  },
  draw() {
    const Q = QZ4, B = Q.bg || {}; sky4(B.sky || '#7cc4ee', B.sky2 || '#e8f4fa', 130); R(0, 120, VW, 96, B.ground || '#c8b080');
    if (B.deco) B.deco();
    bigSprite(() => drawPerson(0, 0, LOOKS4[Q.who] || {}), 250, 122, 3);
    bigSprite(() => drawSarah(0, 0, 'right', 0, 0, false, false), 110, 122, 3);
  },
  ui() {
    const Q = QZ4, st = Q.steps[Math.min(Q.si, Q.steps.length - 1)], s = Q.sub || {};
    rrect(4, 4, 180, 16, 5, 'rgba(10,10,20,.6)'); txt(t(Q.title), 10, 7.5, 8, '#fff', 'left', true, false); txt(`${Math.min(Q.si + 1, Q.steps.length)}/${Q.steps.length}`, 178, 7.5, 7, '#ffd34d', 'right', true, false);
    const box = (y, h) => rrect(12, y, VW - 24, h, 6, 'rgba(18,16,28,.92)', '#c8a0ff');
    if (Q.mode === 'step') {
      if (st.seq) {
        const h = 30 + st.seq.length * 12; box(VH - h - 6, h); txt(t(st.q), 20, VH - h - 2, 7.5, '#fff', 'left', true, false);
        s.done.forEach((it, i) => txt(`✓ ${i + 1}. ` + t(it), 22, VH - h + 12 + i * 12, 6.5, '#9fe0a0', 'left', false, false));
        s.pool.forEach((it, i) => { const y = VH - h + 12 + (s.done.length + i) * 12, sel = i === s.sel; rrect(20, y - 1, VW - 40, 11, 4, sel ? '#ff6fa8' : 'rgba(255,255,255,.88)'); txt((sel ? '▶ ' : '') + t(it), 24, y + 1, 6.5, sel ? '#fff' : '#222', 'left', true, false); });
      } else {
        const ql = wrap(t(st.q), VW - 50, 7.5), h = 14 + ql.length * 10 + s.opts.length * 15; box(VH - h - 6, h);
        ql.forEach((ln, i) => txt(ln, 20, VH - h - 2 + i * 10, 7.5, '#fff', 'left', true, false));
        s.opts.forEach((o, i) => { const y = VH - h + 6 + ql.length * 10 + i * 15, sel = i === s.sel; rrect(20, y, VW - 40, 13, 5, sel ? '#ff6fa8' : 'rgba(255,255,255,.88)'); txt((sel ? '▶ ' : '') + t(o[0]), 26, y + 3, 7, sel ? '#fff' : '#222', 'left', true, false); });
      }
    }
    if (Q.mode === 'ok' || Q.mode === 'wrong') {
      const ok = Q.mode === 'ok', lines = wrap(t(Q.msg), VW - 70, 8), h = 26 + lines.length * 10;
      rrect(24, 96, VW - 48, h, 7, ok ? 'rgba(20,80,40,.95)' : 'rgba(110,20,20,.95)', ok ? '#7ee081' : '#ff8a8a');
      lines.forEach((ln, i) => txt((i === 0 ? (ok ? '✓ ' : '✗ ') : '') + ln, 34, 102 + i * 10, 8, '#fff', 'left', true, false));
      txt(t(ok ? '[A]: continue' : '[A]: try again'), VW / 2, 96 + h - 12, 7, '#ffd34d', 'center', true, false);
    }
    if (Q.mode === 'done') winPanel4(Q.winTitle || 'Well done! ✓');
  },
};

// ---------------------------------------------------------------- STACK: Imhotep's step pyramid (six mastabas)
let PY4 = null;
function startPyramid4(onWin) { transition(() => { scene = 'pyr4'; musI = 0; PY4 = { onWin, stack: [], w: 170, x: 192, t: 0, layer: 0, mode: 'play', fall: null }; }); }
const pyrTop4 = () => 186 - PY4.stack.length * 15;
SCENES.pyr4 = {
  music: 'nile',
  update(dt) {
    const S = PY4; S.t += dt;
    if (S.fall) { S.fall.y += 200 * dt; if (S.fall.y > VH + 20) S.fall = null; }
    if (S.mode === 'win') { if (S.t > .6 && inp.a) backToWorld(S.onWin); return; }
    if (S.mode === 'lose') { if (inp.a) Object.assign(S, { stack: [], w: 170, layer: 0, mode: 'play', t: 0 }); else if (inp.b) backToWorld(); return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    const sp = 1.4 + S.layer * .35; S.x = 192 + Math.sin(S.t * sp) * 100;
    if (inp.a) {
      const top = S.stack.length ? S.stack[S.stack.length - 1] : { x: 192, w: 180 };
      const l = Math.max(S.x - S.w / 2, top.x - top.w / 2), r = Math.min(S.x + S.w / 2, top.x + top.w / 2), ov = r - l;
      if (ov < 14) { S.fall = { x: S.x, y: pyrTop4() - 15, w: S.w }; S.mode = 'lose'; S.t = 0; sfx.bonk(); shake = .3; return; }
      const cut = S.w - ov; if (cut > 2) S.fall = { x: S.x < top.x ? l - cut / 2 : r + cut / 2, y: pyrTop4() - 15, w: cut };
      S.stack.push({ x: (l + r) / 2, w: ov }); S.layer++; S.w = Math.max(16, ov * .82); tone(140 + S.layer * 30, .12, 'triangle', .1); shake = .1;
      if (ov / top.w > .9 && S.stack.length > 1) popText(192, 50, t('Perfect fit! ✨'), '#fff59a', 'screen');
      if (S.layer >= 6) { S.mode = 'win'; S.t = 0; sfx.ding(); }
    }
  },
  draw() {
    const S = PY4; sky4('#8ac4ee', '#f4e4b8', 200); R(0, 186, VW, 30, '#e2c47e'); drawMountains(186, '#d8bc80', false, 31);
    R(0, 186, VW, 30, '#e2c47e');
    S.stack.forEach((s, i) => { const y = 186 - (i + 1) * 15; R(s.x - s.w / 2, y, s.w, 15, i % 2 ? '#d8c49a' : '#e2cea4'); R(s.x - s.w / 2, y, s.w, 1, 'rgba(255,255,255,.4)'); for (let k = 0; k < s.w; k += 10) R(s.x - s.w / 2 + k, y + 7, 1, 8, 'rgba(120,90,40,.25)'); });
    if (S.mode === 'play') { const y = pyrTop4() - 15 - 20; R(S.x - S.w / 2, y, S.w, 15, '#ecd8ae'); R(S.x - S.w / 2, y, S.w, 1, '#fff'); g.strokeStyle = '#8a6a3a'; g.lineWidth = 1; g.beginPath(); g.moveTo(S.x, 0); g.lineTo(S.x, y); g.stroke(); }
    if (S.fall) R(S.fall.x - S.fall.w / 2, S.fall.y, S.fall.w, 15, '#d8c49a');
    bigSprite(() => drawCReal(0, 0, time, 'imhotep'), 40, 200, 2); bigSprite(() => drawSarah(0, 0, 'left', 0, 0, false, false), 352, 200, 2);
  },
  ui() {
    const S = PY4; txt(t('THE STEP PYRAMID OF DJOSER, ~2650 BC'), VW / 2, 6, 10, '#3a2a1a', 'center', true, false); txt(t('Mastaba {0}/6', Math.min(6, S.layer + 1)), VW / 2, 20, 8, '#5a3a1a', 'center', true, false);
    if (S.mode === 'play' && S.t < 5) txt(t('[A]: lower the block. Stack 6 mastabas, each a bit smaller!'), VW / 2, 34, 7.5, '#3a2a1a', 'center', true, false);
    if (S.mode === 'win') winPanel4('Six steps to the sky! 🏗️', 'The first pyramid, and the oldest big stone building in the world. Imhotep was later worshipped as a god of wisdom.');
    if (S.mode === 'lose') losePanel4('CRASH! Back to the quarry.');
    screenParts();
  },
};

// ---------------------------------------------------------------- BOSS: Humbaba, guardian of the Cedar Forest (seven auras)
let HB4 = null;
const HB_GROUND = 176;
function startHumbaba4(onWin) { transition(() => { scene = 'boss4'; musI = 0; HB4 = { onWin, x: 192, vy: 0, jy: 0, hp: 3, auras: 7, inv: 0, t: 0, phase: 'intro', pt: 0, waves: [], cones: [], orb: null, mode: 'play', atk: 0 }; }); }
function hbNextAttack() {
  const H4 = HB4, k = H4.atk++ % 3;
  if (k === 0) { H4.waves.push({ x: VW / 2 - 20, dir: -1, sp: 150, delay: .8 }, { x: VW / 2 + 20, dir: 1, sp: 150, delay: .8 }); }
  else if (k === 1) { for (let i = 0; i < 4 + Math.min(3, H4.atk / 3 | 0); i++) H4.cones.push({ x: 40 + rnd() * 304, y: -10, warn: .9 + i * .25, vy: 0 }); }
  else { const fromL = rnd() < .5; H4.waves.push({ x: fromL ? -10 : VW + 10, dir: fromL ? 1 : -1, sp: 185, delay: .5 }); }
  H4.phase = 'attack'; H4.pt = 0; sfx.roar();
}
SCENES.boss4 = {
  music: 'meso',
  update(dt) {
    const H4 = HB4; H4.t += dt; H4.inv = Math.max(0, H4.inv - dt);
    if (H4.mode === 'win') { if (H4.t > 1 && inp.a) backToWorld(H4.onWin); return; }
    if (H4.mode === 'lose') { if (inp.a) { const cb = H4.onWin; scene = 'world'; startHumbaba4(cb); } else if (inp.b) backToWorld(); return; }
    if (inp.pause) { backToWorld(); return; }
    H4.x = clamp(H4.x + inp.ax * 120 * dt, 40, VW - 40);
    if (inp.a && H4.jy <= 0) { H4.vy = 230; sfx.jump(); }
    H4.vy -= 620 * dt; H4.jy = Math.max(0, H4.jy + H4.vy * dt); if (H4.jy <= 0) H4.vy = Math.max(0, H4.vy);
    const hit = () => { if (H4.inv > 0) return; H4.hp--; H4.inv = 1.4; sfx.hurt(); shake = .3; if (H4.hp <= 0) { H4.mode = 'lose'; H4.t = 0; } };
    H4.pt += dt;
    if (H4.phase === 'intro' && H4.pt > 1.6) hbNextAttack();
    for (const w of H4.waves) { if (w.delay > 0) { w.delay -= dt; continue; } w.x += w.dir * w.sp * dt; if (!w.hit && Math.abs(w.x - H4.x) < 9 && H4.jy < 7) { w.hit = true; hit(); } }
    H4.waves = H4.waves.filter(w => w.x > -30 && w.x < VW + 30);
    for (const c of H4.cones) { if (c.warn > 0) { c.warn -= dt; continue; } c.vy += 500 * dt; c.y += c.vy * dt; if (!c.hit && c.y > HB_GROUND - 22 && c.y < HB_GROUND + 4 && Math.abs(c.x - H4.x) < 10) { c.hit = true; hit(); } }
    H4.cones = H4.cones.filter(c => c.y < HB_GROUND + 10);
    if (H4.phase === 'attack' && !H4.waves.length && !H4.cones.length && H4.pt > 1) { H4.phase = 'orb'; H4.orb = { x: 50 + rnd() * 284, y: 60 }; }
    if (H4.phase === 'orb' && H4.orb) {
      const o = H4.orb; o.y = Math.min(HB_GROUND - 8, o.y + 40 * dt);
      if (Math.abs(o.x - H4.x) < 13 && Math.abs((HB_GROUND - H4.jy - 10) - o.y) < 18) {
        H4.orb = null; H4.auras--; sfx.ding(); popText(H4.x, 120, t('An aura fades! ✨'), '#c8ff9a', 'screen');
        if (H4.auras <= 0) { H4.mode = 'win'; H4.t = 0; return; }
        H4.phase = 'rest'; H4.pt = 0;
      }
    }
    if (H4.phase === 'rest' && H4.pt > .9) hbNextAttack();
  },
  draw() {
    const H4 = HB4; sky4('#1a3a24', '#3a5a34', VH);
    for (let i = 0; i < 9; i++) { const x = i * 46 - 10; R(x + 18, 40, 8, 140, '#3a2a1a'); for (let k = 0; k < 5; k++) R(x + 6 + k * 3, 30 + k * 18, 32 - k * 6, 8, k % 2 ? '#1f4a2c' : '#2a5a36'); }
    R(0, HB_GROUND, VW, VH - HB_GROUND, '#3a2a1a'); R(0, HB_GROUND, VW, 2, '#5a4a2a');
    const calm = H4.mode === 'win', bob = Math.sin(H4.t * 2) * 4;
    drawHumbabaFace(VW / 2, 70 + bob, 1, H4.t, calm);
    for (let i = 0; i < H4.auras; i++) { const a = H4.t * 1.5 + i / 7 * Math.PI * 2; circ(VW / 2 + Math.cos(a) * 64, 70 + bob + Math.sin(a) * 34, 5, 'rgba(200,255,140,.8)'); circ(VW / 2 + Math.cos(a) * 64, 70 + bob + Math.sin(a) * 34, 2.5, '#ffffff'); }
    for (const w of H4.waves) { if (w.delay > 0) { if (Math.floor(H4.t * 10) % 2) R(w.x - 6, HB_GROUND - 3, 12, 3, '#ffcf6b'); continue; } poly([[w.x - 10, HB_GROUND], [w.x, HB_GROUND - 12], [w.x + 10, HB_GROUND]], '#c8ff9a'); poly([[w.x - 6, HB_GROUND], [w.x, HB_GROUND - 7], [w.x + 6, HB_GROUND]], '#ffffff'); }
    for (const c of H4.cones) { if (c.warn > 0) ell(c.x, HB_GROUND, 8 - c.warn * 4, 2, 'rgba(0,0,0,.5)'); else { ell(c.x, c.y, 5, 8, '#6a4a2a'); for (let k = -6; k < 7; k += 3) R(c.x - 4, c.y + k, 8, 1, '#4a3020'); } }
    if (H4.orb) { const p = .5 + .5 * Math.sin(H4.t * 8); circ(H4.orb.x, H4.orb.y, 6 + p * 2, 'rgba(200,255,140,.5)'); circ(H4.orb.x, H4.orb.y, 4, '#eaffd0'); }
    bigSprite(() => drawCReal(0, 0, H4.t, 'enkidu'), 22, HB_GROUND + 22, 1.6); bigSprite(() => drawPerson(0, 0, LOOKS4.Gilgamesh), VW - 22, HB_GROUND + 22, 1.6);
    if (!(H4.inv > 0 && Math.floor(H4.inv * 12) % 2)) bigSprite(() => drawSarah(0, 0, 'up', 0, 0, false, false), H4.x, HB_GROUND + 1 - H4.jy, 1.4);
  },
  ui() {
    const H4 = HB4; txt(t('HUMBABA, GUARDIAN OF THE CEDAR FOREST'), VW / 2, 4, 9, '#c8ff9a', 'center', true);
    let s = ''; for (let i = 0; i < 3; i++) s += i < H4.hp ? '❤' : '·'; txt(s, 10, 6, 9, '#ff9ab8', 'left', true); txt(t('Auras: {0}', H4.auras), VW - 10, 6, 8, '#c8ff9a', 'right', true);
    if (H4.mode === 'play' && H4.t < 6) tipUI4('← → move · [A] rope-skip over shockwaves · dodge the cones · catch the fading auras!', 204);
    if (H4.mode === 'win') winPanel4('Humbaba is calm. 🌲', 'In the epic, Gilgamesh and Enkidu slay Humbaba and cut the cedars: a story about ambition and its price. Sarah prefers a calmer ending.', '#c8ff9a');
    if (H4.mode === 'lose') losePanel4('Humbaba roars you out of the forest!');
    screenParts();
  },
};

// ---------------------------------------------------------------- GAZE: sketching Göbekli Tepe while a hyena keeps checking on you
let GZ4 = null;
function startGaze4(onWin) { transition(() => { scene = 'gaze4'; musI = 0; GZ4 = { onWin, p: 0, t: 0, st: 'away', st_t: 2.5, hx: 60, hd: 1, caught: 0, mode: 'play', scribT: 0 }; }); }
SCENES.gaze4 = {
  music: 'stone',
  update(dt) {
    const Z = GZ4; Z.t += dt;
    if (Z.mode === 'win') { if (Z.t > .6 && inp.a) backToWorld(Z.onWin); return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    Z.st_t -= dt;
    if (Z.st === 'away') { Z.hx += Z.hd * 30 * dt; if (Z.hx < 30 || Z.hx > 150) Z.hd *= -1; if (Z.st_t <= 0) { Z.st = 'turn'; Z.st_t = .6; } }
    else if (Z.st === 'turn') { if (Z.st_t <= 0) { Z.st = 'look'; Z.st_t = 1.2 + rnd() * 1.2; } }
    else if (Z.st === 'look') { if (inp.aHeld) { Z.p = Math.max(0, Z.p - .3); Z.caught++; Z.st = 'away'; Z.st_t = 2 + rnd() * 2; sfx.eww(); popText(Z.hx, 120, t('Hee hee hee! 🐾'), '#ffcf6b', 'screen'); shake = .2; } else if (Z.st_t <= 0) { Z.st = 'away'; Z.st_t = 1.5 + rnd() * 2.5; } }
    if (inp.aHeld && Z.st !== 'look') { Z.p += dt / 6; Z.scribT -= dt; if (Z.scribT <= 0) { sfx.scribble(); Z.scribT = .12; } if (Z.p >= 1) { Z.p = 1; Z.mode = 'win'; Z.t = 0; sfx.ding(); } }
  },
  draw() {
    const Z = GZ4; sky4('#e89a5a', '#f8dca8', 130); R(0, 120, VW, 96, '#b8a068');
    g.save(); g.translate(0, 40);   // a T-pillar with arms, a belt, a fox and a boar
    R(196, 30, 30, 100, '#d8d0bc'); R(176, 14, 70, 18, '#e4dccb'); R(200, 70, 22, 3, '#9a9280');
    g.strokeStyle = '#8a8270'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(203, 40); g.lineTo(203, 66); g.moveTo(219, 40); g.lineTo(219, 66); g.moveTo(203, 66); g.lineTo(212, 68); g.moveTo(219, 66); g.lineTo(212, 68); g.stroke();
    R(204, 82, 14, 6, '#a89a80'); R(216, 78, 3, 5, '#a89a80'); R(205, 88, 2, 3, '#a89a80'); R(214, 88, 2, 3, '#a89a80'); R(202, 84, 3, 1, '#a89a80');
    R(205, 100, 13, 8, '#a89a80'); R(216, 102, 4, 3, '#a89a80'); R(218, 103, 2, 1, '#e4dccb'); R(206, 108, 2, 3, '#a89a80'); R(214, 108, 2, 3, '#a89a80');
    g.restore();
    drawHyena(Z.hx, 160, Z.st !== 'away', Z.t);
    if (Z.st === 'turn' || Z.st === 'look') txt(Z.st === 'turn' ? '?' : '!', Z.hx + 4, 130, 12, Z.st === 'look' ? '#ff4040' : '#ffd34d', 'center', true);
    bigSprite(() => drawSarah(0, 0, 'up', 0, 0, false, false), 300, 196, 2);
    R(320, 150, 54, 40, '#fff7d6'); R(320, 150, 54, 1, '#c9b98a');
    const n = Math.floor(Z.p * 12); g.strokeStyle = '#4a4a5a'; g.lineWidth = 1; g.beginPath();
    const L = [[340, 186, 340, 160], [354, 186, 354, 160], [332, 160, 362, 160], [332, 154, 362, 154], [332, 154, 332, 160], [362, 154, 362, 160], [343, 170, 351, 170], [342, 176, 348, 176], [344, 164, 344, 168], [350, 164, 350, 168], [336, 188, 358, 188], [326, 182, 330, 176]];
    for (let i = 0; i < n; i++) { g.moveTo(L[i][0], L[i][1]); g.lineTo(L[i][2], L[i][3]); } g.stroke();
  },
  ui() {
    const Z = GZ4; txt(t('SKETCHING GÖBEKLI TEPE'), VW / 2, 6, 10, '#3a2a1a', 'center', true, false);
    rrect(110, 22, 164, 6, 3, 'rgba(0,0,0,.35)'); rrect(110, 22, 164 * Z.p, 6, 3, '#ffd34d');
    if (Z.mode === 'play' && Z.t < 6) txt(t('Hold [A] to sketch. When the hyena turns around, let go and freeze!'), VW / 2, 34, 7.5, '#3a2a1a', 'center', true, false);
    if (Z.mode === 'win') winPanel4('Sketched! ✏️', 'T-shaped pillars, 11,600 years old, with arms, hands and belts carved on them: maybe ancestors, maybe spirits.');
    screenParts();
  },
};
// ================================================================ BREAK-INS: sketching the great monuments (Level 1's stealth engine)
Object.assign(STYLE, {
  zig: { floor: '#c9a46a', line: '#b8925a', face: '#a8804a', faceL: '#96703e', top: '#4a3218' },
  pyr: { floor: '#cdb88a', line: '#b8a274', face: '#a8946a', faceL: '#968258', top: '#2a2218' },
  parth: { floor: '#e6e2d8', line: '#d2cec2', face: '#d8d2c4', faceL: '#c8c2b4', top: '#5a5a64' },
  panth: { floor: '#c8b8a0', line: '#a89880', face: '#bcae96', faceL: '#a89a84', top: '#3a3430' },
});
function sketchDone4(id) {
  L4().sk[id] = 1; st4('sketches'); saveGame();
  const s = SKETCHES4.find(q => q[0] === id);
  setTimeout(() => { toast(t('✏️ Sketched: {0}', t(s[1]))); if (eraDone4(L4().era)) setTimeout(() => crText(L4().era < 4 ? 'Do you hear that humming? The portal stone is awake! ⏳' : 'All done in Rome! Now to Ravenna: AD 476. I have an appointment there. 😇'), 1800); }, 600);
}
const breakIn4 = (id, name, style, map, guards, decor, lines, cardId) => {
  INTERIORS[id] = {
    name, style, music: 'interior', map, guards, decor, isDone: () => !!L4().sk[id],
    onDone() { sfx.ding(); say(lines, () => { exitInterior(); setTimeout(() => { card4(cardId); sketchDone4(id); }, 900); }); },
  };
};
breakIn4('ziggurat', 'The Ziggurat of Ur, the shrine of Nanna', 'zig',
  ['####################', '#...b....D.....b...#', '#..................#', '#.o..o........o..o.#', '#..................#', '#...bb........bb...#', '#..................#', '#.o..o...ww...o..o.#', '#........ww........#', '#..................#', '#.........P........#', '#########E##########'],
  [{ name: 'Priest', col: '#efe7d2', hat: '#1a1210', path: [[3, 2], [16, 2]], speed: 22, line: 'Halt! Only priests may enter the house of the moon god Nanna!' },
    { name: 'Priest', col: '#efe7d2', hat: '#1a1210', path: [[16, 8], [3, 8]], speed: 20, line: 'Halt! Only priests may enter the house of the moon god Nanna!' }],
  () => { R(140, 2, 40, 12, '#2a5ab8'); g.strokeStyle = '#ffd34d'; g.lineWidth = 2; g.beginPath(); g.arc(160, 8, 4, Math.PI * .3, Math.PI * 1.7); g.stroke(); for (const tx of [52, 268]) { R(tx, 4, 3, 10, '#5a3a20'); circ(tx + 1, 3, 3 + Math.sin(time * 9 + tx) * .8, '#ffb030'); } },
  [['Sarah', 'Got it! The ziggurat, sketched. ✏️'], ['Sketchbook', 'The terraces lean slightly inward and the walls bulge gently: the builders of Ur already used optical tricks.'], ['Sarah', 'Now out, before Nanna notices...']], 'ziggurat');
breakIn4('pyramid', 'The Great Pyramid of Giza', 'pyr',
  ['####################', '#######..D..########', '#######.....########', '#######.....########', '#######..o..########', '#######.....########', '#####.........######', '#####..b...b..######', '###.............####', '###.............####', '###.......P.....####', '##########E#########'],
  [{ name: 'Priest', col: '#f6f2e8', hat: '#c8956a', path: [[8, 2], [11, 2], [11, 5], [8, 5]], speed: 18, line: 'Intruder! The resting place of Khufu is sacred!' },
    { name: 'Priest', col: '#f6f2e8', hat: '#c8956a', path: [[4, 8], [15, 8]], speed: 26, line: 'Intruder! The resting place of Khufu is sacred!' }],
  () => { for (let j = 0; j < 5; j++) { R(112 - j * 2, 16 + j * 14, 2, 14, '#8a7650'); R(194 + j * 2, 16 + j * 14, 2, 14, '#8a7650'); } R(140, 0, 40, 4, '#2a2218'); g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(0, 0, 320, 192); },
  [['Sarah', 'The Grand Gallery! 8.6 metres high, built 4,500 years ago. ✏️'], ['Sketchbook', 'Corbelling: every layer of stone sticks out a little further, until the two walls almost meet. No arch needed.'], ['Sarah', 'Quietly now... back into the sun.']], 'giza');
breakIn4('parthenon', 'The Parthenon, by night', 'parth',
  ['####################', '#o.o.o.o.o.o.o.o.o.#', '#..................#', '#o..############..o#', '#...#....D.....#...#', '#o..#..o....o..#..o#', '#...#..........#...#', '#o..#..o....o..#..o#', '#...####....####...#', '#o................o#', '#........P.........#', '#########E##########'],
  [{ name: 'Night guard', col: '#b8302a', hat: '#c8a040', path: [[2, 2], [17, 2], [17, 9], [2, 9]], speed: 30, line: 'Stop! The temple of Athena is closed at night. By order of Pericles!' },
    { name: 'Night guard', col: '#b8302a', hat: '#c8a040', path: [[6, 6], [13, 6]], speed: 16, line: 'Stop! The temple of Athena is closed at night. By order of Pericles!' }],
  () => { const x = 168, y = 70; R(x - 8, y - 4, 16, 40, '#d9a400'); R(x - 6, y - 14, 12, 12, '#f4e8d0'); R(x - 8, y - 18, 16, 5, '#d9a400'); R(x - 2, y - 26, 4, 8, '#d9a400'); ell(x + 14, y + 16, 7, 10, '#d9a400'); circ(x + 14, y + 16, 3, '#f4e8d0'); R(x - 16, y + 4, 6, 8, '#f4e8d0'); R(x - 15, y + 1, 4, 3, '#d9a400'); g.fillStyle = 'rgba(10,20,60,.28)'; g.fillRect(0, 0, 320, 192); },
  [['Sarah', 'Doric columns with entasis: they swell just a little in the middle. ✏️'], ['Sketchbook', 'Phidias\' 12 m Athena Parthenos stood here, made of gold and ivory. The temple floor even curves upward by a few centimetres.'], ['Sarah', 'Goodnight, Athena. Thanks for the inspiration.']], 'parthenon');
breakIn4('pantheon', 'The Pantheon, by night', 'panth',
  ['####################', '######........######', '####.b........b.####', '###..............###', '##................##', '##..o....D.....o..##', '##................##', '###..............###', '####.b........b.####', '######.o....o.######', '#######...P..#######', '#########E##########'],
  [{ name: 'Vigil', col: '#8a2a2a', hat: '#8a8a90', path: [[4, 3], [15, 3], [16, 6], [15, 8], [4, 8], [3, 6]], speed: 26, line: 'Halt! Vigiles of Rome! No sightseeing at night!' },
    { name: 'Vigil', col: '#8a2a2a', hat: '#8a8a90', path: [[5, 6], [14, 6]], speed: 15, line: 'Halt! Vigiles of Rome! No sightseeing at night!' }],
  () => { g.fillStyle = 'rgba(10,15,40,.35)'; g.fillRect(0, 0, 320, 192); const lx = 160 + Math.sin(time * .2) * 40; g.fillStyle = 'rgba(220,230,255,.18)'; g.beginPath(); g.ellipse(lx, 84, 24, 12, 0, 0, 7); g.fill(); for (let i = 0; i < 6; i++) for (let k = 0; k < 2; k++) R(60 + i * 36, 22 + k * 10, 8, 6, 'rgba(0,0,0,.15)'); },
  [['Sarah', 'The oculus... 8.2 metres wide, open to the sky. Moonlight on the coffers. ✏️'], ['Sketchbook', 'The dome gets thinner and lighter towards the top: heavy stone below, light pumice concrete above. When it rains, tiny holes in the floor drain the water.'], ['Sarah', 'Nineteen centuries old and still standing. Architects, take note.']], 'pantheon');

// ================================================================ QUESTS & CONVERSATIONS
const QZBG4 = {
  steppe: { sky: '#e8b878', sky2: '#f8e8c8', ground: '#b8a868' },
  babylon: { sky: '#7cb8e8', sky2: '#f0e8d0', ground: '#d8c090', deco: () => { R(0, 50, VW, 70, '#2a5ab8'); for (let i = 0; i < 8; i++) { R(14 + i * 48, 70, 14, 7, '#ffd34d'); R(26 + i * 48, 66, 3, 5, '#ffd34d'); } } },
  agora: { sky: '#7cc4ee', sky2: '#e8f4fa', ground: '#e6e2d8', deco: () => { R(0, 60, VW, 60, '#d8d2c4'); drawColumns(8, 64, 14, 27, 56); R(0, 56, VW, 8, '#b8584a'); } },
  valley: { sky: '#f0b060', sky2: '#f8e8c0', ground: '#e2c47e', deco: () => { poly([[0, 120], [60, 40], [140, 70], [240, 30], [330, 60], [VW, 50], [VW, 120]], '#c8a070'); R(170, 80, 22, 40, '#2a1a10'); } },
};
const QUIZ4 = {
  catal: { title: 'ÇATALHÖYÜK, ~7400 BC', who: 'Potter', music: 'stone', bg: QZBG4.steppe, card: 'catal', winTitle: 'Welcome home! 🪜',
    steps: [{ q: 'Potter: "Welcome to Çatalhöyük! How do you think you get into my house?"', opts: [['Climb onto the roof and down a ladder through the hole', true], ['Through the front door, like everyone', 'There are no front doors! The houses stand wall to wall, with no streets in between.'], ['Through a secret tunnel', 'Nice idea, but no: everyone walks across the roofs and climbs in from above.']] }] },
  hammurabi: { title: 'THE STELE OF HAMMURABI', who: 'Hammurabi', music: 'meso', bg: QZBG4.babylon, card: 'hammurabi', winTitle: 'You know your ancient law! ⚖️',
    steps: [
      { q: '"If a builder builds a house badly and it collapses and kills the owner, the builder shall be put to death." Real or made up?', opts: [['Real law (law 229)', true], ['Made up', 'It\'s real! Law 229. Architects and builders, take note... 😬']], ok: 'Real! Law 229. Sarah: "Gulp. I\'ll double-check my structural calculations."' },
      { q: '"An eye for an eye." Real or made up?', opts: [['Real law (law 196)', true], ['Made up', 'It\'s real: law 196. The punishment should match the crime (at least between equals).']] },
      { q: '"It is forbidden to fall asleep in a tavern." Real or made up?', opts: [['Made up', true], ['Real law', 'Made up! That one is from the weird laws of California, remember? 😄']], ok: 'Made up! That sounds like California, not Babylon. 😄' },
      { q: '"A tavern keeper who cheats on the price of beer shall be thrown into the water." Real or made up?', opts: [['Real law (law 108)', true], ['Made up', 'Real! Law 108. Babylon took its beer prices very seriously. 🍺']], ok: 'Real! Law 108. Elio, please keep fair prices. 🍺' },
    ] },
  socrates: { title: 'THE AGORA OF ATHENS', who: 'Socrates', music: 'hellas', bg: QZBG4.agora, card: 'socrates', winTitle: 'A true philosopher! 🤔',
    steps: [
      { q: 'Socrates: "Tell me, Sarah: what do you know for certain?"', opts: [['That I know that I know nothing', true], ['Everything about architecture', '"Then tell me: what IS a building? ...You see? Not so easy." (Socrates loved to show that people knew less than they thought.)'], ['My Wi-Fi password', '"Your what-fi?"']], ok: 'Socrates: "Then you are wiser than most people in Athens!"' },
      { q: 'How did Socrates teach?', opts: [['By asking questions', true], ['By writing many books', 'Socrates wrote nothing at all! We know him from his student Plato.'], ['By giving long lectures', 'No lectures: he asked question after question. It\'s called the Socratic method.']] },
      { q: 'Socrates: "The unexamined life is not worth...?"', opts: [['...living', true], ['...posting about', '"Posting"? I do not know this word. (He said: not worth living.)'], ['...the taxes', 'Ha! No: "...not worth living." Plato wrote it down in the Apology.']] },
    ] },
  democracy: { title: 'THE PNYX, ATHENS', who: 'Citizen', music: 'hellas', bg: QZBG4.agora, card: 'democracy', winTitle: 'Democracy, Athenian style! 🗳️',
    steps: [
      { q: 'Citizen: "Who may vote in our assembly?"', opts: [['Free adult men who are citizens', true], ['Everyone who lives in Athens', 'No: women, slaves and foreigners could not vote. Athens\' democracy was for male citizens only.'], ['Only the rich', 'Since Cleisthenes all male citizens could join the assembly, rich or poor.']] },
      { q: '"And how do we send a dangerous politician away for 10 years?"', opts: [['We scratch his name on a pottery shard (ostrakon)', true], ['We throw him to the lions', 'That\'s more of a Roman thing, and not how it worked. Ostracism used pottery shards.'], ['We write a mean review', 'No: ostracism! At least 6,000 votes on pottery shards, and the "winner" had to leave for 10 years.']] },
    ] },
  mummy: { title: 'MUMMIFY A CAT FOR BASTET', who: 'Embalmer', music: 'nile', bg: QZBG4.valley, card: 'mummy', winTitle: 'Bastet is pleased. 🐈',
    steps: [{ q: 'Put the embalming steps in the right order:', seq: ['Wash the body with palm wine and Nile water', 'Remove the organs into canopic jars (but leave the heart!)', 'Cover it in natron salt for 40 days to dry', 'Wrap it in linen bandages with amulets', 'Add a painted mask and place it in a coffin'] }] },
};
function quiz4(id) { const Q = QUIZ4[id]; startQuiz4({ ...Q, onWin: () => { card4(Q.card); if (id === 'mummy') st4('mummies'); } }); }
// era intros: the first chat with C-Real in each era
const INTRO4 = [
  [['C-Real', 'Sarah! It\'s me! Well... today I\'m Ötzi, the Iceman. Bearskin cap, grass cloak, copper axe.'], ['Sarah', 'Ötzi?! Where... WHEN are we?'],
    ['C-Real', 'Around 9600 BC, in the Fertile Crescent. Small problem: Ötzi lives around 3300 BC in the Alps. I\'m 6,000 years early and 3,000 km off. 😅'],
    ['C-Real', 'This map is the whole Neolithic: from Göbekli Tepe here in the east, past Çatalhöyük, to the lake villages and the Alps in the west.'],
    ['C-Real', 'The portal stone in the Alps takes us onward. It wakes up once we understand this era: help the hunters raise their pillar, help the farmer, and sketch Göbekli Tepe.']],
  [['C-Real', 'Grrr... Sarah! It\'s me. ENKIDU! The gods made me from clay to be Gilgamesh\'s equal.'], ['Sarah', 'You look... wilder than usual. Is that grass in your beard?'],
    ['C-Real', 'I lived with the gazelles, ate grass, drank at the waterholes. Honestly not that different from my hippie years. 🌿'],
    ['C-Real', 'Gilgamesh, king of Uruk, is too proud. Let\'s wrestle some humility into him, then go on an adventure to the Cedar Forest. Also: writing was just invented here!']],
  [['C-Real', 'Sarah! Welcome to Saqqara. I am Imhotep, royal architect of Pharaoh Djoser. The first architect in history whose name we know. Colleague! 🤝'],
    ['Sarah', 'Imhotep! The step pyramid guy! I wrote a paper on you in my first semester!'],
    ['C-Real', 'Kings are buried under flat mud-brick benches called mastabas. My idea: stack six of them. In STONE. Help me at the building site?']],
  [['C-Real', 'Sing, O Muse, of Sarah the architect! ...It\'s me, Homer. The bard. I sing the Iliad and the Odyssey, sometimes for three nights in a row. 🎶'],
    ['Sarah', 'Homer! Did Troy really exist?'], ['C-Real', 'Archaeologists think there really was a city, at Hisarlik in Turkey. The wooden horse? Poetic license. 😉', () => card4('homer')],
    ['C-Real', 'It\'s 776 BC: the very first Olympic Games, right here! One problem: women may not compete.'], ['Sarah', 'Says who?'], ['C-Real', 'Exactly. I happen to have a spare tunic. And a fake beard. 😏']],
  [['C-Real', 'Salve, Sarah! I am Odoacer, a Germanic warrior in the Roman army. Long hair, beard... the Romans call us barbarians. Rude.'],
    ['Sarah', 'Odoacer? Isn\'t he the one who...'], ['C-Real', 'Shh! No spoilers. Rome has 1,200 years of history: the she-wolf, Hannibal, Caesar, Pompeii... and the Pantheon, your dome dream.'],
    ['C-Real', 'Do the big three: Hannibal in the Alps, Pompeii in the south, and the Pantheon. Then meet me in Ravenna. Something happens there in AD 476. 😇']],
];
const HINTS4 = {
  pillar: 'The hunters up at Göbekli Tepe need help raising their last pillar. On the hill in the east!', farm: 'The farmer near Çatalhöyük wants to show us something new: planting seeds. 🌾',
  sk_gobekli: 'Those T-pillars at Göbekli Tepe are begging to be sketched, Sarah!',
  wrestle: 'Gilgamesh is showing off at the gate of Uruk. Let\'s wrestle some humility into him.', humbaba: 'Now: the Cedar Forest, north-west, across the Euphrates. Humbaba awaits. 🌲',
  eduba: 'The tablet house (Eduba) in Uruk teaches the newest invention: writing! ✍️', sk_ziggurat: 'The Ziggurat of Ur, down south. Priests only... so, sneak in.',
  steppyr: 'My building site at Saqqara! Help me stack the mastabas. 🏗️', cartouche: 'The scribes at Karnak can teach you hieroglyphs. Take the ferry across the Nile at Thebes.',
  sk_pyramid: 'The Great Pyramid at Giza, to the north. The Grand Gallery inside is a masterpiece.',
  olympia: 'The stadion at Olympia. The race is about to start! 🏃‍♀️', marathon: 'A messenger at Marathon, north-east of Athens, needs a fast runner.',
  sk_parthenon: 'The Parthenon on the Acropolis. Night guards, but oh, those columns...',
  hannibal: 'Hannibal is camping in the Alps, up north. His elephant needs a guide. 🐘', pompeii: 'Pompeii, south by the bay. That volcano doesn\'t look friendly. 🌋', sk_pantheon: 'The Pantheon, right here in Rome. That dome! Sneak in at night.',
};
const PORTAL_AT4 = ['The portal stone is awake! It\'s in the Alps, far to the west. ⏳', 'The portal stone is awake! It stands near Babylon, in the north. ⏳', 'The portal stone is awake! It\'s in the delta, near Alexandria. ⏳', 'The portal stone is awake! It\'s in Macedonia, in the north-east. ⏳'];
function hint4() {
  const e = L4().era, m = missing4(e);
  if (m.length) return HINTS4[m[0]];
  if (e < 4) return PORTAL_AT4[e];
  if (!L4().flags.fallen) return 'Everything done in Rome! Now to the palace in Ravenna, AD 476. I have an appointment there. 😇';
  if (!L4().flags.finished) return 'The portal stone east of Ravenna leads into the Middle Ages. A monk is waiting with a test. 📖';
  return 'Ten thousand years, one beautiful chronicle. Want to keep exploring? ⏳';
}
function l4Talk(spot) {
  const e = L4().era; L4().cp = spot;
  const lines = [];
  if (!L4().met['intro' + e]) { L4().met['intro' + e] = 1; lines.push(...INTRO4[e]); }
  else lines.push(['C-Real', hint4()]);
  if (spot === 'e0alps' && !L4().cards.otzi) lines.push(['C-Real', 'Welcome to MY time: about 3300 BC. Copper is the hot new technology. I\'ll die up here, by the way, and they\'ll find me in 1991. Very glamorous.', () => card4('otzi')]);
  if (ST.hearts < ST.maxHearts) lines.push(['C-Real', ['Have some wild figs. 🌿', 'Have some dates. 🌴', 'Have some dates and bread. 🍞', 'Have some olives and cheese. 🫒', 'Have some bread and olives. 🫒'][e], () => { ST.hearts = ST.maxHearts; sfx.pick(); }]);
  lines.push(['C-Real', 'I\'ll keep this spot as your checkpoint. ❤']);
  say(lines, saveGame);
}
const quickCard4 = (lines, id) => say(lines, () => card4(id));
const NPC_TALK4 = {
  // era 0
  Hunter() { if (!q4('pillar')) say([['Hunter', 'We hunt gazelles and gather wild grain. And up on the hill, we are building THIS. One pillar is still lying down. Help us at the enclosure!']]); else quickCard4([['Hunter', 'No farms, no metal, no writing. Just us, our stories and these stones. Our grandchildren\'s grandchildren will tell of them.']], 'gobekli'); },
  Farmer() { farmTalk4(); },
  Potter() { quickCard4([['Potter', 'Look: a pot! Clay rolled into long coils, smoothed, then fired. Perfect for grain and porridge.'], ['Sarah', 'No potter\'s wheel?'], ['Potter', 'A wheel? What would a wheel be good for?']], 'pottery'); },
  Fisher() { quickCard4([['Fisher', 'Grüezi! We build our houses on stilts by the lake. Fish, fields, forest: everything is close.'], ['Sarah', 'Grüezi?! ...wait, this is basically the Zugersee in 4300 BC!'], ['Fisher', 'In 2011 our villages become a UNESCO World Heritage Site. Don\'t ask me how I know.']], 'pfahl'); },
  // era 1
  Gilgamesh() { if (!q4('wrestle')) say([['Gilgamesh', 'I am Gilgamesh, king of Uruk! Two-thirds god, one-third human. Nobody can match me!'], ['C-Real', '*growls* Wrestle me at the gate, then!']]); else if (!q4('humbaba')) say([['Gilgamesh', 'Enkidu, my friend! Let\'s go to the Cedar Forest and make our names eternal! North-west, across the Euphrates!']]); else quickCard4([['Gilgamesh', 'Humbaba is calm, the cedars stand... I still want to live forever, though. Maybe old Utnapishtim at the river mouth knows how.']], 'gilgamesh'); },
  Teacher() { if (!q4('eduba')) say([['Teacher', 'Welcome to the tablet house, the Eduba! Our scribes learn for years. Come inside, today we do bookkeeping!']]); else quickCard4([['Teacher', 'Our sons and daughters learn here. Yes, there were female scribes, too!'], ['Teacher', 'Uruk has temples, workshops, 40,000 people and walls 9 km long. And all of it needs bookkeeping.']], 'uruk'); },
  Wheelwright() { quickCard4([['Wheelwright', 'First we used the wheel to make pots. Now I put two of them on a cart! The donkeys are not amused.'], ['Sarah', 'The wheel came thousands of years after farming. Who knew?']], 'wheel'); },
  Sargon() { quickCard4([['Sargon', 'I am Sargon of Akkad. They say I was found as a baby in a basket on the river. Now I rule all of these cities: the first empire!']], 'sargon'); },
  Utnapishtim() { quickCard4([['Utnapishtim', 'Long ago the gods sent a great flood. I built a boat, took my family and every kind of animal, and survived.'], ['Utnapishtim', 'Gilgamesh came here looking for eternal life. He found a plant of youth... and a snake ate it while he was bathing.'], ['Sarah', 'So nobody lives forever.'], ['Utnapishtim', 'No. But what you build, and the stories people tell about you, can last a very long time.']], 'flood'); },
  // era 2
  Scribe() { if (!q4('cartouche')) say([['Scribe', 'Come into the temple school! I\'ll show you how to write your name the royal way: in a cartouche.']]); else say([['Scribe', 'Remember: some signs are sounds, some are whole words, and some only tell you what kind of word it is.']]); },
  Hatshepsut() { quickCard4([['Hatshepsut', 'I am Hatshepsut, pharaoh of Egypt. Yes, a woman. Yes, the beard is fake. It comes with the job.'], ['Hatshepsut', 'My temple at Deir el-Bahari: terraces and colonnades against the cliffs. My architect Senenmut and I are rather proud.']], 'hatshepsut'); },
  'Ramesses II'() { quickCard4([['Ramesses II', 'I am Ramesses the Great! At Kadesh I fought the Hittites... and then we made peace and wrote it down.'], ['Sarah', 'One of the oldest peace treaties in the world. Better than any battle.']], 'kadesh'); },
  Cleopatra() { quickCard4([['Cleopatra', 'I am Cleopatra, the last of the Ptolemies. I speak nine languages, including Egyptian. My family didn\'t bother for 300 years.'], ['Sarah', 'Fun fact: you live closer in time to the Moon landing than to the building of the Great Pyramid.'], ['Cleopatra', 'The what landing?']], 'cleopatra'); },
  Embalmer() { if (!L4().cards.mummy) say([['Embalmer', 'A temple cat of Bastet has died. We will prepare her for the afterlife, the proper way. Will you help me?'], ['Sarah', 'A cat mummy?! ...okay. For Bastet.']], () => quiz4('mummy')); else say([['Embalmer', 'Millions of animal mummies were made: cats, ibises, crocodiles... Bastet thanks you.']]); },
  'Howard Carter'() { quickCard4([['Howard Carter', 'Howard Carter, archaeologist. I\'m looking for the tomb of a young pharaoh called Tutankhamun.'], ['Sarah', 'Mr Carter... you\'re about 3,200 years early. Come back in 1922. Trust me.'], ['Howard Carter', '"Wonderful things"... I shall remember that phrase.']], 'tut'); },
  // era 3
  Judge() { if (!q4('olympia')) say([['Judge', 'The stadion race is about to start! One length of the stadium. Men only, of course.'], ['Sarah', '*in a tunic and fake beard* Of course. I\'m... Sarakles.']]); else say([['Judge', 'An olive wreath for the winner, Sarakles. ...Your beard is slipping.']]); },
  Pythia() { quickCard4([['Pythia', 'Mmmh... The oracle sees... an architect... from far, far away in time...'], ['Pythia', 'The god says: "Know thyself." And: "Nothing in excess."'], ['Sarah', 'Nothing in excess... does that include sketchbooks?']], 'delphi'); },
  Socrates() { if (!L4().cards.socrates) say([['Socrates', 'Ah, a stranger! Let me ask you a few questions...']], () => quiz4('socrates')); else say([['Socrates', 'I know that I know nothing. But I know you\'re a good student.']]); },
  Citizen() { if (!L4().cards.democracy) say([['Citizen', 'Welcome to the assembly! Today we vote. Do you know how our democracy works?']], () => quiz4('democracy')); else say([['Citizen', 'Demokratia: the power of the people. Well, of some of the people.']]); },
  Messenger() { if (!q4('marathon')) say([['Messenger', 'We beat the Persians here at Marathon! Athens must hear the news before the Persian fleet gets there.'], ['Messenger', 'Someone has to run about 40 km... and my feet are destroyed.'], ['Sarah', 'Running? I\'m more of a rope skipper. ...Fine! Let\'s go!']], () => startRun4('marathon', winMarathon4)); else say([['Messenger', 'Legend says Pheidippides ran this and collapsed. You arrived and asked for a snack. Impressive.']]); },
  Leonidas() { quickCard4([['Leonidas', 'I am Leonidas, king of Sparta. Here at Thermopylae we hold the pass against the Persian army. "Come and take them!"'], ['Leonidas', 'Spartan mothers say: come back with your shield, or on it.'], ['Sarah', 'And then Athens\' ships win at Salamis, the same year. I\'ll write that down.']], 'thermo'); },
  Archimedes() { quickCard4([['Archimedes', 'EUREKA! Oh. Sorry. I\'m wet. I just understood why things float!'], ['Archimedes', 'Give me a lever long enough and a place to stand, and I will move the world.'], ['Sarah', 'Can you also move my deadline?']], 'archimedes'); },
  Alexander() { quickCard4([['Alexander', 'I am Alexander of Macedon, student of Aristotle. At 20 I became king. Now I go east: Persia, Egypt, India!'], ['Alexander', 'At Gordion there is a knot nobody can untie. Watch this. *SLASH* ⚔️'], ['Sarah', 'That\'s... one way to solve a problem.'], ['Alexander', 'I will found many cities. Most of them called Alexandria. Modest, I know.']], 'alexander'); },
  // era 4
  Hannibal() { if (!q4('hannibal')) say([['Hannibal', 'I am Hannibal Barca of Carthage. 218 BC: I am crossing the Alps to surprise Rome!'], ['Hannibal', 'But my elephant Surus is scared of the snow. Will you guide him over the pass?'], ['Sarah', 'An elephant in the Alps. Sure. Why not.']], () => startRun4('hannibal', winHannibal4)); else say([['Hannibal', 'We made it to Italy! But Rome won the war in the end. In 146 BC the Romans destroyed Carthage.']]); },
  Helvetian() { helvTalk4(); },
  Pompeian() { if (!q4('pompeii')) say([['Pompeian', 'The ground is shaking... and the mountain is smoking. Do you think we should worry?'], ['Sarah', 'It\'s AD 79. YES. Everybody, to the harbour!']], () => startRun4('pompeii', winPompeii4)); else say([['Pompeian', 'Thank you! Pompeii is buried... but we are alive.']]); },
  Pliny() { say([['Pliny', 'I am Pliny the Younger. From across the bay I saw a cloud shaped like a giant umbrella pine rising from the mountain.'], ['Pliny', 'My uncle, Pliny the Elder, sailed over to help people and never came back. I wrote everything down in two letters.']]); },
  Constantine() { quickCard4([['Constantine', 'I am Constantine. In 313 I allowed Christians to worship freely: the Edict of Milan.'], ['Constantine', 'And in 330 I made a new capital in the East: Constantinople. Today you call it Istanbul.']], 'constantine'); },
  Caesar() { caesarScene4(); },
};
function hammurabiStele() {
  if (L4().cards.hammurabi) { say([['Sign', 'The Code of Hammurabi: 282 laws, carved in stone around 1754 BC. Today the original is in the Louvre in Paris.']]); return; }
  say([['Sign', 'A black stone stele, over 2 m tall. At the top, King Hammurabi stands before the sun god Shamash. Below: 282 laws.'], ['Hammurabi', 'I am Hammurabi, king of Babylon. Let\'s see if you can tell my real laws from fake ones!']], () => quiz4('hammurabi'));
}
function drawStele(s) { const x = Math.round(s.x), y = Math.round(s.y); shadow(x, y, 6); R(x - 5, y - 26, 10, 26, '#2a2a30'); ell(x, y - 26, 5, 3, '#2a2a30'); R(x - 3, y - 26, 6, 6, '#3a3a44'); for (let j = y - 18; j < y - 2; j += 2) R(x - 4, j, 8, 1, '#4a4a54'); }
function npcTalk4(name) { if (NPC_TALK4[name]) NPC_TALK4[name](); }
function helvTalk4() { quickCard4([['Helvetian', 'Grüezi! We are the Helvetii. In 58 BC we packed everything and tried to move west, into Gaul.'], ['Helvetian', 'Julius Caesar stopped us at Bibracte and sent us back to the Swiss plateau. Rude. But here we are: still Swiss!'], ['Sarah', 'Helvetia! That\'s where the Latin name of Switzerland comes from.']], 'helvetii'); }
function caesarScene4() {
  if (L4().cards.caesar) { say([['Caesar', 'Veni, vidi, vici. I came, I saw, I conquered.']]); return; }
  say([['Caesar', 'I am Gaius Julius Caesar, dictator for life. I even gave you a new calendar: 365 days, with a leap year!'], ['Sarah', 'Caesar! Beware the Ides of March! Don\'t go to the Senate on the 15th!'],
    ['Caesar', 'Bah. A soothsayer told me the same thing. The Ides of March have come, and I am fine.'], ['Sarah', '...They have come, but they have not gone.'],
    ['C-Real', 'History can\'t be changed, Sarah. On 15 March 44 BC, senators stabbed him. Brutus was one of them.', () => card4('caesar')],
    ['C-Real', 'His adopted son Octavian wins the civil war and becomes Augustus, the first emperor, in 27 BC. Then: about 200 years of Pax Romana.', () => card4('augustus')]]);
}
function farmTalk4() {
  const st = L4().quests.farmStage || 0, F = L4().flags;
  if (st === 0) say([['Farmer', 'Hello, stranger! You hunt and gather? Me too. But I have an idea...'], ['Farmer', 'The wild grass on the hills: einkorn. What if we PLANT its seeds, right here next to our homes?'],
    ['Farmer', 'Bring me 6 handfuls of wild einkorn from the eastern hills. Look for the golden tufts!']], () => { L4().quests.farmStage = 1; F.tufts = F.tufts || []; saveGame(); });
  else if (st === 1) { const n = (F.tufts || []).length; if (n < 6) say([['Farmer', t('{0}/6 handfuls. The wild einkorn grows on the hills in the east.', n)]]); else say([['Farmer', 'Wonderful! Now we sow them in the field and wait.'], ['Farmer', 'While the grain grows: those wild goats behind my house! Drive them into the pen. Milk, cheese and wool all year round!']], () => { L4().quests.farmStage = 2; F.grow = 40; saveGame(); }); }
  else if (st === 2) {
    const goats = F.penned || 0, ripe = (F.grow || 0) <= 0;
    if (ripe && goats >= 3) say([['Farmer', 'The einkorn is ripe and the goats are home! Bread, porridge... maybe even beer!'], ['Sarah', 'You just invented farming.'], ['Farmer', 'We just... what?'],
      ['C-Real', 'Farming means food in one place. Villages, then towns, then cities, kings, writing... everything starts here.']], () => { L4().quests.farmStage = 3; L4().quests.farm = 1; card4('farming'); checkEra4(); });
    else say([['Farmer', t('Goats in the pen: {0}/3. The goats run away from you, so walk behind them and push them into the pen!', goats)], ['Farmer', ripe ? 'The einkorn is ripe!' : 'The einkorn is still growing...']]);
  } else say([['Farmer', 'We stay here now. Villages, then towns... I wonder where this will lead.']]);
}
function checkEra4() { saveGame(); if (eraDone4(L4().era)) setTimeout(() => crText(L4().era < 4 ? 'Do you hear that humming? The portal stone is awake! ⏳' : 'All done in Rome! Now to Ravenna: AD 476. I have an appointment there. 😇'), 1500); }
const won4 = (id, lines, cardId) => () => { L4().quests[id] = 1; st4('quests'); say(lines, () => { if (cardId) card4(cardId); checkEra4(); }); };
const winPillar4 = won4('pillar', [['Hunter', 'It stands! Hunters from all over the hills will come to feast here.'], ['C-Real', 'This is about 9600 BC. Monumental architecture... built by hunter-gatherers. Before farming!']], 'gobekli');
const winGaze4 = () => { L4().sk.gobekli = 1; st4('sketches'); say([['Sarah', 'Got it! The T-pillars of Göbekli Tepe. ✏️'], ['Sketchbook', 'T-shaped pillars with carved arms, hands and belts: maybe ancestors, maybe spirits. Foxes, boars and vultures run across them.']], () => { toast(t('✏️ Sketched: {0}', t(SKETCHES4[0][1]))); checkEra4(); }); };
const winWrestle4 = won4('wrestle', [['Gilgamesh', 'Nobody has ever matched me! ...Enkidu, my friend! Let\'s be brothers.'], ['C-Real', 'Next stop: the Cedar Forest, north-west across the Euphrates. Humbaba guards it. Bring your rope! 🌲']], 'uruk');
const winHumbaba4 = won4('humbaba', [['Humbaba', '...Grrr... mmh. Nobody has ever just... calmed me down.'], ['C-Real', 'In the epic, things end worse for Humbaba. And later, the gods punish the heroes for it.'], ['Sarah', 'Then let\'s leave the cedars standing.']], 'epic');
const winCune4 = won4('eduba', [['Teacher', 'Excellent! Five sheep, twelve jars of beer, twenty-three sacks of barley. Perfect accounts.'], ['C-Real', 'Writing was invented here around 3200 BC: first to count things, much later for poems like the Epic of Gilgamesh.']], 'writing');
const winPyr4 = won4('steppyr', [['C-Real', 'Six steps to the sky! Pharaoh Djoser will climb them to the stars.'], ['Sarah', 'The oldest large stone building in the world. And I helped. ❤']], 'steppyr');
const winHiero4 = won4('cartouche', [['Scribe', 'SARAH and C-REAL, written in cartouches like pharaohs!'], ['Scribe', 'Hieroglyphs mean "sacred carvings". Thousands of years later they were forgotten, until the Rosetta Stone.']], 'hiero');
const winSprint4 = won4('olympia', [['Judge', 'First place: Sarakles of... Baar? The olive wreath is yours!'], ['Sarah', '*pulls off the beard* Surprise! 🧔‍♀️'], ['Judge', 'A WOMAN?! ...Well. Rules are rules. Nobody saw anything. Keep the wreath.'], ['C-Real', 'Fun fact: in 392 BC a Spartan princess, Kyniska, did win at Olympia: as the owner of the winning chariot horses!']], 'olympia');
const winMarathon4 = won4('marathon', [['Sarah', '*bursts into Athens* NENIKĒKAMEN! We have won!'], ['C-Real', 'Legend says the messenger collapsed after this. You look like you could do another lap. ❤'], ['C-Real', 'The modern marathon is 42.195 km, inspired by this very legend.']], 'marathon');
const winHannibal4 = won4('hannibal', [['Hannibal', 'Italy! Surus made it! Rome will tremble.'], ['C-Real', 'Many of his men and most of the elephants did not survive the crossing. And Rome won in the end, and destroyed Carthage in 146 BC.']], 'hannibal');
const winPompeii4 = won4('pompeii', [['Sarah', 'We made it to the boats!'], ['C-Real', 'Pompeii lay buried under ash for 1,700 years. Excavations show the town frozen in time: bread in ovens, graffiti on walls.']], 'pompeii');
function l4BuildingAct(b) {
  const e = L4().era;
  switch (b.id) {
    case 'portal': portalAct4(); return;
    case 'gobekli':
      if (!q4('pillar')) say([['Hunter', 'Help us! We pull the last pillar up with ropes. Everyone pull at the same time!']], () => startTiming4('pillar', winPillar4));
      else if (!L4().sk.gobekli) say([['Sarah', 'Time to sketch these pillars... Is that hyena watching me?'], ['C-Real', 'Hyenas are curious. Freeze when it looks!']], () => startGaze4(winGaze4));
      else say([['Sarah', 'Göbekli Tepe. People came here to feast and build, long before anyone farmed.']]);
      return;
    case 'catal': if (!L4().cards.catal) quiz4('catal'); else say([['Sarah', 'Çatalhöyük: a whole town of roofs. Paths, terraces and front doors all in one. Very modern, actually.']]); return;
    case 'pfahl': NPC_TALK4.Fisher(); return;
    case 'urukgate':
      if (!q4('wrestle')) say([['Gilgamesh', 'Who dares to block the gate of Uruk?'], ['C-Real', 'Enkidu! Made from clay to be your equal! Wrestle me!'], ['Gilgamesh', 'HA! Come on then!']], () => startTiming4('wrestle', winWrestle4));
      else NPC_TALK4.Gilgamesh();
      return;
    case 'eduba': if (!q4('eduba')) say([['Teacher', 'Welcome to the Eduba, the tablet house! Today: bookkeeping for the temple storehouse. Take a reed and some wet clay.']], () => startCune4(winCune4)); else NPC_TALK4.Teacher(); return;
    case 'ziggurat': case 'pyramid': case 'parthenon': case 'pantheon':
      if (L4().sk[b.id]) say([['Sarah', 'Already sketched. Sneaking in twice is just showing off.']]);
      else enterInterior(b.id, b.doorX, b.doorY + 10);
      return;
    case 'steppyr': if (!q4('steppyr')) say([['C-Real', 'My building site! Six mastabas of stone, each one smaller than the one below. Lower the blocks carefully!']], () => startPyramid4(winPyr4)); else say([['C-Real', 'The Step Pyramid of Djoser. My masterpiece. OUR masterpiece. 🏗️']]); return;
    case 'karnak': if (!q4('cartouche')) say([['Scribe', 'Welcome to the temple school of Karnak! Let\'s write your names in hieroglyphs.']], () => startHiero4(winHiero4)); else NPC_TALK4.Scribe(); return;
    case 'tomb': quickCard4([['Sarah', 'Tomb KV62... the tomb of Tutankhamun. Almost untouched for 3,000 years.'], ['C-Real', 'Most royal tombs were robbed in antiquity. This small one was forgotten. Lucky for us.']], 'tut'); return;
    case 'stadion': if (!q4('olympia')) say([['Judge', 'Runners, to the line! One stadion: about 192 metres!'], ['Sarah', '*adjusts fake beard* Ready.']], () => startTiming4('sprint', winSprint4)); else NPC_TALK4.Judge(); return;
    case 'delphi': NPC_TALK4.Pythia(); return;
    case 'stoa': NPC_TALK4.Socrates(); return;
    case 'pella': NPC_TALK4.Alexander(); return;
    case 'colosseum': quickCard4([['Sarah', 'The Colosseum! Opened in AD 80. About 50,000 spectators.'], ['C-Real', 'Sailors from the fleet stretched a giant awning over it, and lifts brought animals up from the tunnels below the arena.']], 'colosseum'); return;
    case 'forum': caesarScene4(); return;
    case 'helv': helvTalk4(); return;
    case 'villa': NPC_TALK4.Pompeian(); return;
    case 'ravenna': ravennaAct4(); return;
  }
}
function ravennaAct4() {
  if (L4().flags.fallen) { say([['Romulus Augustulus', 'I\'m packing for my villa near Naples! Retirement at sixteen. Not bad.']]); return; }
  if (!eraDone4(4)) { say([['Romulus Augustulus', 'I am the Emperor of the West! The guards say I may not receive visitors.'], ['C-Real', t('Not yet, Sarah. Still to do: {0}', missing4(4).map(k => t(MAIN_NAMES4[k])).join(' · '))]]); return; }
  say([['Romulus Augustulus', 'I am Romulus Augustulus, Emperor of the West! ...I\'m sixteen. Please be nice.'],
    ['C-Real', 'Odoacer here. Your soldiers just made ME king of Italy. So: you retire to a lovely villa near Naples, with a pension.'], ['Romulus Augustulus', 'A villa by the sea? ...Honestly, deal.'],
    ['C-Real', 'And the imperial insignia, I\'ll send them to the emperor in Constantinople. One emperor is enough for this world.'],
    ['Sarah', 'So that\'s it? The Western Roman Empire just... ends? With a pension?'],
    ['C-Real', 'Historians pick AD 476 as the end of the West. The Eastern Roman Empire continues for almost 1,000 years, until 1453.', () => card4('fall')],
    ['C-Real', 'Roads, Latin, law, concrete, arches... Rome lives on. The portal stone east of here leads into the Middle Ages. Shall we? ⏳']], () => { L4().flags.fallen = 1; st4('quests'); saveGame(); });
}
function l4Interactables(L) {
  for (const n of G4.npcs) L.push({ x: n.x, y: n.y - 6, label: 'Talk', act: () => npcTalk4(n.name) });
  const e = L4().era;
  if (e === 0 && (L4().quests.farmStage || 0) === 1) for (const tf of G4.tufts) if (!(L4().flags.tufts || []).includes(tf.id)) L.push({ x: tf.x, y: tf.y - 6, label: 'Gather', act: () => { L4().flags.tufts.push(tf.id); sfx.pick(); popText(tf.x, tf.y - 16, t('+1 einkorn 🌾 ({0}/6)', L4().flags.tufts.length), '#ffe08a'); if (L4().flags.tufts.length === 6) setTimeout(() => crText('Six handfuls of einkorn! Back to the farmer near Çatalhöyük. 🌾'), 600); saveGame(); } });
  if (e === 1) { const c = at4(12, 16); L.push({ x: c.x, y: c.y - 8, r: 30, label: 'Cedar Forest', act: () => {
    if (!q4('wrestle')) say([['C-Real', 'The Cedar Forest... not yet. First we need Gilgamesh on our side. To the gate of Uruk!']]);
    else if (!q4('humbaba')) say([['Gilgamesh', 'Humbaba! Guardian of the cedars! His seven auras protect him!'], ['C-Real', 'Dodge his attacks, Sarah. When an aura fades and falls, grab it!']], () => startHumbaba4(winHumbaba4));
    else say([['Sarah', 'The cedars rustle peacefully. Humbaba is snoring. 🌲']]);
  } }); }
  if (e === 2) for (const c of G4.critters) if (c.kind === 'cat') L.push({ x: c.x, y: c.y - 4, label: 'Pet', act: () => { ST.hearts = ST.maxHearts; sfx.pick(); spawnHearts(c.x, c.y - 12, 4); popText(c.x, c.y - 18, 'Purr... Bastet approves! ❤', '#ffd6e0'); if (!L4().flags.cat) { L4().flags.cat = 1; setTimeout(() => crText('In Egypt, cats were sacred to the goddess Bastet. You\'re basically a priestess now. 🐈'), 800); } } });
}
const ARRIVE4 = ['Where... WHEN are we? Grassy hills, stone tools... and nobody has a phone.', 'Two huge rivers, palm trees, mud-brick everything. Mesopotamia!', 'The Nile! And... is that a pyramid under construction?!', 'Olive trees, the sea, white temples... Greece!', 'Cypresses, cobblestones, and everyone in togas. ROME!'];
function l4OnEnter(first) {
  const e = L4().era; L4().flags.arrived = 1;
  if (first) setTimeout(() => say([['Sarah', ARRIVE4[e]]], () => crText('Over here! Come and talk to me. ❄️')), 700);
}
function l4Respawn() {
  const s = CR_SPOTS[L4().cp] || Object.values(CR_SPOTS)[0]; P.x = s.x; P.y = s.y + 18;
  say([['C-Real', ['Careful! A boar doesn\'t care that you\'re from the future. 🐗', 'Lions AND their poop, 4,000 years ago. I\'m sorry, Sarah. 🦁', 'The crocodiles of the Nile: very sacred, very bitey. 🐊', 'Even the boars here are legendary. Rest a little. 🐗', 'Defeated by geese. That\'s very Roman of you. 🪿'][L4().era]]]);
}

// ================================================================ THE MIDDLE AGES: the scriptorium exam ("Keeper of Time")
const EXAM4 = [
  ['What was Göbekli Tepe?', 'Huge stone pillars raised by hunter-gatherers', 'A Roman fortress', 'An Egyptian tomb'],
  ['What is the "Neolithic Revolution"?', 'People began farming and keeping animals', 'The invention of iron', 'A rebellion against a king'],
  ['How did people enter their houses in Çatalhöyük?', 'Through the roof, by ladder', 'Through revolving doors', 'By boat'],
  ['Where was Ötzi the Iceman found?', 'In the Ötztal Alps', 'In a pyramid', 'In Babylon'],
  ['Where was writing invented around 3200 BC?', 'In Mesopotamia (Uruk)', 'In Greece', 'In Rome'],
  ['What were the first written texts mostly about?', 'Counting goods like grain, sheep and beer', 'Love poems', 'Football results'],
  ['Who was Enkidu?', 'Gilgamesh\'s wild friend, made from clay', 'A pharaoh', 'A Greek philosopher'],
  ['Who guarded the Cedar Forest?', 'Humbaba', 'Medusa', 'The Sphinx'],
  ['What is Hammurabi known for?', 'One of the oldest written law codes', 'The first pyramid', 'The Olympic Games'],
  ['Who designed the first pyramid, the Step Pyramid of Djoser?', 'Imhotep', 'Pericles', 'Hadrian'],
  ['How tall was the Great Pyramid of Giza when it was built?', 'About 146 m', 'About 46 m', 'About 1,000 m'],
  ['How did embalmers dry a mummy?', 'With natron salt, for about 40 days', 'In the sun, for a year', 'With a fan'],
  ['What helped Champollion decipher hieroglyphs?', 'The Rosetta Stone', 'The Code of Hammurabi', 'Ötzi\'s diary'],
  ['Which female pharaoh built a famous terraced temple?', 'Hatshepsut', 'Athena', 'Penelope'],
  ['When were the first Olympic Games?', '776 BC', 'AD 776', '1896 BC'],
  ['Who was not allowed to compete in the ancient Olympic Games?', 'Women', 'Runners from Athens', 'Anyone with a beard'],
  ['What happened at Marathon in 490 BC?', 'Athens defeated the Persians', 'Rome was founded', 'Troy fell'],
  ['What is entasis?', 'The slight swelling of a column', 'A Greek dance', 'A kind of olive'],
  ['Who was Socrates\' famous student?', 'Plato', 'Caesar', 'Hannibal'],
  ['How did Alexander the Great solve the Gordian knot?', 'He cut it with his sword', 'He untied it slowly', 'He gave up'],
  ['Who could vote in Athens\' democracy?', 'Free adult male citizens', 'Everyone, including slaves', 'Only the king'],
  ['According to legend, who founded Rome?', 'Romulus (and Remus)', 'Julius Caesar', 'Odoacer'],
  ['What did Hannibal take over the Alps?', 'War elephants', 'Camels', 'Chariots with sails'],
  ['What happened on the Ides of March, 44 BC?', 'Julius Caesar was murdered', 'Pompeii was buried', 'Rome was founded'],
  ['Who was the first Roman emperor?', 'Augustus', 'Nero', 'Romulus Augustulus'],
  ['Which town did Vesuvius bury in AD 79?', 'Pompeii', 'Athens', 'Babylon'],
  ['What is special about the Pantheon?', 'A huge concrete dome with an open oculus', 'It is made of gold', 'It floats on the Tiber'],
  ['What did the Edict of Milan (313) allow?', 'Christians could worship freely', 'Women could vote', 'Elephants in the city'],
  ['Who deposed the last Western Roman emperor in 476?', 'Odoacer', 'Hannibal', 'Alexander the Great'],
  ['How long did the Eastern Roman Empire last?', 'Until 1453', 'Until AD 500', 'It still exists'],
];
let XM4 = null;
function startScriptorium4() {
  say([['Monk', 'Pax vobiscum! Welcome to our scriptorium. We copy the old books by hand, so that nothing is forgotten.', () => card4('middle')],
    ['Monk', 'Ten thousand years of travel? Then let\'s see your chronicle. First, put the events in the right order. Then answer my questions.'], ['C-Real', 'You need 12 of 16. I believe in you! ❤']], () => transition(() => {
    scene = 'chrono4'; musI = 0;
    const pool = shuffle(CARD_IDS4.filter(k => !CARDS4[k].nt && L4().cards[k])), pick = [], years = new Set();
    for (const k of pool.concat(shuffle(CARD_IDS4.filter(k => !CARDS4[k].nt && !L4().cards[k])))) { if (pick.length >= 9) break; if (!years.has(CARDS4[k].y)) { years.add(CARDS4[k].y); pick.push(k); } }
    XM4 = { part: 1, placed: [pick[0]], queue: pick.slice(1), slot: 0, right: 0, wrong: [], fb: null, qs: shuffle(EXAM4.slice()).slice(0, 8), qi: 0, sel: 0, mode: 'place', t: 0 };
  }));
}
function xmShuffle4() { const q = XM4.qs[XM4.qi]; XM4.opts = shuffle([[q[1], true], [q[2], false], [q[3], false]]); XM4.sel = 0; }
SCENES.chrono4 = {
  music: 'interior',
  update(dt) {
    const X = XM4; X.t += dt;
    if (X.part === 1) {
      if (X.mode === 'fb') { if (inp.a) { if (!X.queue.length) { X.part = 2; X.mode = 'q'; xmShuffle4(); } else { X.mode = 'place'; X.slot = 0; } } return; }
      if (inp.left) { X.slot = Math.max(0, X.slot - 1); sfx.blip(); } if (inp.right) { X.slot = Math.min(X.placed.length, X.slot + 1); sfx.blip(); }
      if (inp.a) {
        const k = X.queue.shift(), y = CARDS4[k].y, ok = (X.slot === 0 || CARDS4[X.placed[X.slot - 1]].y <= y) && (X.slot === X.placed.length || y <= CARDS4[X.placed[X.slot]].y);
        let at = X.placed.findIndex(q => CARDS4[q].y > y); if (at < 0) at = X.placed.length; X.placed.splice(at, 0, k);
        if (ok) { X.right++; sfx.ding(); } else { X.wrong.push(k); sfx.bonk(); }
        X.fb = { k, ok }; X.mode = 'fb';
      }
      return;
    }
    if (X.mode === 'q') choiceInput(X, 3, i => { const ok = X.opts[i][1]; if (ok) { X.right++; sfx.ding(); } else sfx.bonk(); X.mode = 'qfb'; X.ok = ok; });
    else if (X.mode === 'qfb' && inp.a) { X.qi++; if (X.qi >= X.qs.length) X.mode = 'result'; else { X.mode = 'q'; xmShuffle4(); } }
    else if (X.mode === 'result' && inp.a) {
      L4().stats.exam = Math.max(L4().stats.exam || 0, X.right);
      if (X.right >= 12) { L4().flags.exam = 1; saveGame(); transition(startEnding4); }
      else backToWorld(() => say([['Monk', t('{0}/16. A good start! Read your chronicle (TAB) and come back through the portal stone.', X.right)]]));
    }
  },
  draw() {
    R(0, 0, VW, VH, '#3a2a1e'); for (let x = 0; x < VW; x += 24) R(x, 0, 2, VH, '#2a1e14'); R(0, 150, VW, 66, '#5a4030');
    for (const wx of [40, 300]) { R(wx, 20, 40, 60, '#1a1420'); R(wx + 2, 22, 36, 56, '#4a5a8a'); R(wx + 19, 22, 2, 56, '#1a1420'); circ(wx + 20, 22, 18, '#1a1420'); circ(wx + 20, 22, 16, '#4a5a8a'); }
    bigSprite(() => drawPerson(0, 0, LOOKS4.Monk), 330, 200, 2); bigSprite(() => drawSarah(0, 0, 'up', 0, 0, false, false), 52, 204, 2);
    R(150, 160, 84, 30, '#7a5a3a'); R(158, 156, 68, 8, '#f4ead0');
  },
  ui() {
    const X = XM4; txt(t('THE KEEPER OF TIME'), VW / 2, 4, 11, '#ffe8b0', 'center', true); txt(t('Score: {0}/16', X.right), VW / 2, 18, 7.5, '#fff', 'center', true);
    if (X.part === 1) {
      const n = X.placed.length, cw = Math.min(40, (VW - 20) / (n + 1)), x0 = VW / 2 - (n * cw) / 2;
      R(10, 128, VW - 20, 2, '#d8c8a0');
      X.placed.forEach((k, i) => { const C = CARDS4[k], x = x0 + i * cw, bad = X.wrong.includes(k); rrect(x + 1, 100, cw - 2, 26, 4, bad ? '#ffd0d0' : '#f4ead0', bad ? '#c83a3a' : '#a8946a'); txt(C.i, x + cw / 2, 102, 10, '#fff', 'center', false, false); txt(yearLabel4(C.y, C.a), x + cw / 2, 132 + (i % 2) * 8, 5.5, '#ffe8b0', 'center', false, false); });
      if (X.mode === 'place') {
        const ax = x0 + X.slot * cw; txt('▼', ax, 88, 10, '#ff6fa8', 'center', true); R(ax - 1, 98, 2, 30, '#ff6fa8');
        const k = X.queue[0], C = CARDS4[k]; rrect(70, 34, VW - 140, 46, 7, 'rgba(18,16,28,.92)', '#ffd34d'); txt(C.i + '  ' + t(C.title), VW / 2, 40, 9, '#ffd34d', 'center', true, false);
        txt(t('Where does this event belong? ◀ ▶ choose a gap · [A] place it'), VW / 2, 56, 7, '#fff', 'center', false, false); txt(t('Card {0}/8', 9 - X.queue.length), VW / 2, 67, 6.5, '#c8b890', 'center', false, false);
      } else if (X.mode === 'fb') {
        const C = CARDS4[X.fb.k]; rrect(60, 34, VW - 120, 46, 7, X.fb.ok ? 'rgba(20,80,40,.95)' : 'rgba(110,20,20,.95)', X.fb.ok ? '#7ee081' : '#ff8a8a');
        txt((X.fb.ok ? '✓ ' : '✗ ') + t(C.title) + ': ' + yearLabel4(C.y, C.a), VW / 2, 42, 8, '#fff', 'center', true, false); txt(t(X.fb.ok ? 'Right place!' : 'Not quite: it goes here.'), VW / 2, 56, 7.5, '#fff', 'center', false, false); txt(t('[A]: continue'), VW / 2, 68, 7, '#ffd34d', 'center', true, false);
      }
      return;
    }
    if (X.mode !== 'result') {
      const q = X.qs[X.qi]; rrect(20, 36, VW - 40, 20, 6, 'rgba(18,16,28,.9)', '#ffd34d'); txt(t(q[0]), VW / 2, 42, 7.5, '#fff', 'center', true, false); txt(t('Question {0}/8', X.qi + 1), VW / 2, 28, 7, '#c8b890', 'center', false, false);
      X.opts.forEach((o, i) => { const y = 62 + i * 18, sel = i === X.sel, fb = X.mode === 'qfb'; rrect(30, y, VW - 60, 15, 6, fb ? (o[1] ? '#7ee081' : sel ? '#ff8a8a' : 'rgba(255,255,255,.8)') : sel ? '#ff6fa8' : 'rgba(255,255,255,.9)'); txt((sel && !fb ? '▶ ' : '') + t(o[0]), 38, y + 4, 7.5, sel && !fb ? '#fff' : '#222', 'left', true, false); });
      if (X.mode === 'qfb') txt(X.ok ? t('Correct! ✓') : t('Correct answer: {0}', t(q[1])), VW / 2, 122, 8, X.ok ? '#9fe0a0' : '#ff9a9a', 'center', true);
    } else { panelUI(46, 84); txt(t('{0}/16', X.right), VW / 2, 56, 16, X.right >= 12 ? '#7ee081' : '#ff8a8a', 'center', true, false); txt(X.right >= 12 ? t('Keeper of Time! 🎉') : t('Not quite: 12 needed.'), VW / 2, 82, 10, '#fff', 'center', true, false); txt(t('[A]: continue'), VW / 2, 108, 8, '#ffd34d', 'center', true, false); }
  },
};

// ---------------------------------------------------------------- the ending: a chronicle of the ages
let EN4 = null;
const finalMsg4 = () => FINAL_MESSAGE_4[LANG] || FINAL_MESSAGE_4.en;
function startEnding4() { scene = 'ending4'; musI = 0; L4().flags.finished = 1; saveGame(); EN4 = { t: 0, shown: 0, phase: 0, conf: [] }; for (let i = 0; i < 90; i++) EN4.conf.push({ x: rnd() * VW, y: -rnd() * VH, vy: 18 + rnd() * 36, c: ['#ffd34d', '#c8a0ff', '#ffffff', '#ff6fa8', '#7ee081'][(rnd() * 5) | 0], r: rnd() * 6 }); }
SCENES.ending4 = {
  music: 'ending',
  update(dt) {
    EN4.t += dt; for (const c of EN4.conf) { c.y += c.vy * dt; if (c.y > VH) { c.y = -5; c.x = rnd() * VW; } }
    const msg = finalMsg4(); if (EN4.t > 1.5) EN4.shown = Math.min(msg.length, EN4.shown + dt * 30);
    if (inp.a) { if (EN4.phase === 1 && EN4.shown < msg.length) EN4.shown = msg.length; else if (EN4.phase < 2) { EN4.phase++; sfx.ding(); } else transition(goHome4); }
  },
  draw() {
    R(0, 0, VW, VH, '#2a1e3a'); for (let i = 0; i < 60; i++) R(hash(i, 1) % VW, hash(i, 2) % VH, 1, 1, i % 3 ? '#8a7aaa' : '#ffffff');
    if (EN4.phase === 0) {
      R(54, 30, 276, 160, '#f4ead0'); R(54, 30, 276, 20, '#6a3a8a'); R(58, 34, 268, 152, 'rgba(0,0,0,0)');
      bigSprite(() => drawSarah(0, 0, 'down', 0, 0, false, false), 96, 120, 2);
      SKETCHES4.forEach((s, i) => { const sx = 150 + i * 34, have = L4().sk[s[0]]; R(sx - 13, 128, 26, 26, have ? '#fff7d6' : '#d8d0c0'); R(sx - 13, 128, 26, 1, '#c9b98a'); });
    }
  },
  ui() {
    for (const c of EN4.conf) { ctx.fillStyle = c.c; ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(EN4.t * 3 + c.r); ctx.fillRect(-2, -1, 4, 2); ctx.restore(); }
    if (EN4.phase === 0) {
      txt(t('CHRONICLE OF THE AGES'), 192, 34, 10, '#ffffff', 'center', true, false);
      txt('Sarah', 150, 62, 12, '#3a2a4a', 'left', true, false); txt(t('Time traveller, architect, Keeper of Time'), 150, 78, 7.5, '#4a3a5a', 'left', false, false);
      txt(t('{0}/{1} chronicle cards · exam {2}/16', cardCount4(), CARD_IDS4.length, L4().stats.exam || 0), 150, 90, 7, '#6a5a7a', 'left', false, false);
      SKETCHES4.forEach((s, i) => txt(['🗿', '🧱', '🏜️', '🏛️', '🌕'][i], 150 + i * 34, 134, 13, '#fff', 'center', false, false));
      txt(t('[A]: continue'), VW / 2, 196, 8, '#ffd34d', 'center', true);
    } else if (EN4.phase === 1) {
      rrect(30, 34, VW - 60, 140, 8, 'rgba(18,16,28,.9)', '#c8a0ff'); txt('C-Real', 44, 40, 9, '#ffd34d', 'left', true, false);
      const lines = wrap(finalMsg4(), VW - 90, 8.5); let left = Math.floor(EN4.shown);
      lines.slice(0, 11).forEach((ln, i) => { if (left <= 0) return; txt(ln.slice(0, left), 44, 53 + i * 10.5, 8.5, '#fff'); left -= ln.length + 1; });
    } else {
      const S = L4().stats; rrect(60, 26, VW - 120, 160, 8, 'rgba(18,16,28,.92)', '#c8a0ff');
      txt('SARCHITECT 4: THROUGH THE AGES', VW / 2, 32, 11, '#fff', 'center', true, false);
      [t('Eras visited: {0}/5', L4().unlocked + 1), t('Chronicle cards: {0}/{1}', cardCount4(), CARD_IDS4.length), t('Monuments sketched: {0}/5', SKETCHES4.filter(s => L4().sk[s[0]]).length), t('Runs survived: {0}', S.runs || 0), t('Exam: {0}/16', S.exam || 0), t('Lion poop stepped in: {0}', ST.stats.poop || 0)].forEach((r, i) => txt(r, VW / 2, 52 + i * 11, 8, '#eee', 'center', false, false));
      wrap(t('History is full of stories and legends. The dates here follow today\'s scholarly consensus; many are approximate.'), VW - 150, 7).forEach((ln, i) => txt(ln, VW / 2, 124 + i * 9, 7, '#c8b0ff', 'center', false, false));
      txt(t('[A]: home to Baar'), VW / 2, 168, 7.5, '#ffd34d', 'center', true, false);
    }
  },
};

// ---------------------------------------------------------------- the chronicle (book)
function l4Pages() { const p = ['overview']; for (let e = 0; e < 5; e++) { for (const k of CARD_IDS4) if (CARDS4[k].e === e) p.push(k); p.push('sk:' + e); } return p; }
const pageEra4 = id => id === 'overview' ? -1 : id.startsWith('sk:') ? +id.slice(3) : CARDS4[id].e;
function l4BookInput() {
  const P4 = l4Pages(), n = P4.length;
  if (inp.left) { book.sel = (book.sel + n - 1) % n; sfx.blip(); } if (inp.right) { book.sel = (book.sel + 1) % n; sfx.blip(); }
  if (inp.up || inp.down) { const cur = pageEra4(P4[book.sel]), to = clamp(cur + (inp.down ? 1 : -1), -1, 4); book.sel = to < 0 ? 0 : P4.findIndex(k => pageEra4(k) === to); sfx.blip(); }
}
function l4DrawBook() {
  const pages = l4Pages(); book.sel = Math.min(book.sel, pages.length - 1);
  ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, 0, VW, VH);
  const bx = 30, by = 12, bw = VW - 60, bh = VH - 24, id = pages[book.sel], e = pageEra4(id);
  rrect(bx - 4, by - 4, bw + 8, bh + 8, 8, '#6a3a8a'); rrect(bx, by, bw, bh, 5, '#f8f2e4');
  txt(t('Chronicle of the Ages — page {0}/{1}', book.sel + 1, pages.length) + (e >= 0 ? '   ·   ' + t(ERAS4[e].name) : ''), bx + 10, by + 6, 7, '#6a3a8a', 'left', true, false);
  if (id === 'overview') {
    txt(t('Ten thousand years in five eras'), bx + 12, by + 22, 11, '#3a2a4a', 'left', true, false);
    ERAS4.forEach((E, i) => {
      const y = by + 42 + i * 24, open = i <= L4().unlocked, done = eraDone4(i), n = CARD_IDS4.filter(k => CARDS4[k].e === i).length, got = CARD_IDS4.filter(k => CARDS4[k].e === i && L4().cards[k]).length;
      rrect(bx + 12, y, bw - 24, 20, 5, open ? '#efe4f8' : '#e4e0d8'); txt((done ? '✓ ' : open ? '⏳ ' : '🔒 ') + (open ? t(E.name) : '???'), bx + 20, y + 3, 8, '#3a2a4a', 'left', true, false);
      txt(t(E.years), bx + 20, y + 12, 6, '#6a5a7a', 'left', false, false); txt(`📜 ${got}/${n}   ✏️ ${L4().sk[SKETCHES4[i][0]] ? 1 : 0}/1`, bx + bw - 20, y + 6, 7.5, '#3a2a4a', 'right', true, false);
    });
  } else if (id.startsWith('sk:')) {
    const s = SKETCHES4[e], have = L4().sk[s[0]];
    rrect(bx + 12, by + 22, 90, 90, 6, have ? '#fff7d6' : '#e4e0d8'); txt(have ? ['🗿', '🧱', '🏜️', '🏛️', '🌕'][e] : '✏️', bx + 57, by + 50, 30, '#fff', 'center', false, false);
    txt(t('Sketchbook'), bx + 112, by + 22, 7, '#9a7a3a', 'left', true, false); txt(have ? t(s[1]) : '???', bx + 112, by + 32, 11, '#3a2a1a', 'left', true, false);
    wrap(have ? t(s[2]) : t('Not sketched yet. Find this monument in {0}!', t(ERAS4[e].name)), bw - 126, 7.5).forEach((ln, i) => txt(ln, bx + 112, by + 52 + i * 10, 7.5, '#2a2a2a', 'left', false, false));
  } else {
    const C = CARDS4[id], have = L4().cards[id];
    rrect(bx + 12, by + 22, 70, 70, 8, have ? '#6a3a8a' : '#d8d4cc'); if (have) { rrect(bx + 20, by + 30, 54, 54, 27, 'rgba(255,255,255,.9)'); txt(C.i, bx + 47, by + 43, 24, '#fff', 'center', false, false); } else txt('?', bx + 47, by + 42, 26, '#fff', 'center', true, false);
    txt(have ? yearLabel4(C.y, C.a) : '???', bx + 47, by + 98, 8, '#6a3a8a', 'center', true, false);
    txt(have ? t(C.title) : '???', bx + 92, by + 22, 11, '#3a2a4a', 'left', true, false);
    wrap(have ? t(C.text) : t('Keep exploring {0} to find this card.', t(ERAS4[C.e].name)), bw - 106, 7.5).forEach((ln, i) => txt(ln, bx + 92, by + 40 + i * 10, 7.5, '#2a2a2a', 'left', false, false));
    if (have && C.nt) txt(t('(a legend or story, not on the exam timeline)'), bx + 92, by + bh - 44, 6.5, '#8a7a9a', 'left', false, false);
  }
  txt(t('◀ ▶ flip pages   ·   ▲ ▼ jump between eras   ·   [A] / Tab: close'), VW / 2, by + bh - 14, 6.5, '#6a3a8a', 'center', false, false);
}

// ================================================================ Level 4 definition
const LEVEL4 = {
  W: ERA0.W, H: ERA0.H,
  prepare() {
    const E = ERA4OF();
    Object.assign(LEVEL4, { W: E.W, H: E.H, seed: E.seed, buildings: E.buildings, paths: E.paths, crSpots: E.crSpots, start: E.start, signs: E.signs, zoneOf: E.zoneOf, baseTile: E.baseTile, terrain: E.terrain,
      zoneNames: E.zoneNames, zoneTexts: E.zoneTexts, crTexts: E.crTexts, music: E.music, snowyPine: E.snowyPine || (() => false) });
    for (const k in E.crSpots) E.crSpots[k].pose = E.pose;
  },
  pathTile: (tx, ty, p) => p.trail ? T.PATH : L4().era === 4 ? T.COB : L4().era === 3 && e3Zone(tx, ty) === 'e3athens' ? T.MARBLE : T.PATH,
  clearSpots: () => {
    const e = L4().era, s = NPCS4[e].map(([, a, b]) => [a, b]);
    if (e === 0) { for (let y = 25; y <= 32; y += 2) for (let x = 36; x <= 43; x += 2) s.push([x, y]); s.push(...TUFTS4); }
    if (e === 1) s.push([12, 16], [12, 17]);
    return s;
  },
  spawn: l4Spawn, update: l4Update, onB: () => popText(P.x, P.y - 26, 'No bikes before the 19th century!', '#cfe'),
  interactables: l4Interactables, drawGround: l4DrawGround, drawables: l4Drawables, drawBuilding: l4DrawBuilding, overlay: l4Overlay,
  talk: l4Talk, buildingAct: l4BuildingAct, respawn: l4Respawn, worldLabels: l4WorldLabels, onEnter: l4OnEnter,
  hud: () => `⏳ ${t(ERA4OF().name)}   📜 ${cardCount4()}/${CARD_IDS4.length}   ✏️ ${SKETCHES4.filter(s => L4().sk[s[0]]).length}/5`,
  bookInput: l4BookInput, drawBook: l4DrawBook, music: 'stone',
  pauseLines: ['Move: Arrow keys / WASD / stick', '[A]: talk · act · rope skip', 'Book (Tab, Q): your chronicle of the ages', 'M: mute · Esc / P: pause', '', 'Solve each era\'s quests to wake the portal stone.', 'C-Real plays a different historical figure in every era.', 'Watch out: boars, lions, crocodiles... and geese.'],
  zoneNames: {}, zoneTexts: {}, crTexts: [],
  debug() { ST.l3.flags.finished = 1; ST.l2.flags.finished = 1; ST.flags.finished = true; ST.l4.flags.arrived = 1; },
};
LEVELS[4] = LEVEL4;
// ================================================================ translations [English, Deutsch, Schwiizerdütsch]
addTR([
  // chronicle cards
  ["Göbekli Tepe", "Göbekli Tepe", "Göbekli Tepe"], ["Hunter-gatherers raised huge T-shaped stone pillars carved with foxes, boars and vultures. Monumental architecture BEFORE farming!", "Jäger und Sammler stellten riesige T-förmige Steinpfeiler mit Füchsen, Wildschweinen und Geiern auf. Monumentale Architektur VOR der Landwirtschaft!", "Jäger und Sammler händ riisigi T-förmigi Steipfiler mit Füchs, Wildsäu und Geier ufgstellt. Monumentali Architektur VOR de Landwirtschaft!"],
  ["The first farmers", "Die ersten Bauern", "Di erschte Puure"], ["In the Fertile Crescent people began to sow wild einkorn and emmer wheat and to keep goats and sheep: the Neolithic Revolution.", "Im Fruchtbaren Halbmond begannen die Menschen, wildes Einkorn und Emmer zu säen und Ziegen und Schafe zu halten: die Neolithische Revolution.", "Im Fruchtbare Halbmond händ d Mänsche aagfange, wilds Einkorn und Emmer z säie und Geisse und Schaf z halte: d Neolithischi Revolution."],
  ["Çatalhöyük", "Çatalhöyük", "Çatalhöyük"], ["A huge town without streets: houses stood wall to wall, and you climbed in through a hole in the roof, by ladder.", "Eine riesige Siedlung ohne Strassen: Die Häuser standen Wand an Wand, und man stieg über eine Leiter durch ein Loch im Dach hinein.", "E riisigi Siedlig ohni Strasse: D Hüser sind Wand a Wand gstande, und me isch über e Leitere dur es Loch im Dach ine gstige."],
  ["Pottery", "Töpferei", "Töpferei"], ["Clay pots to store grain and to cook. At first shaped by hand: the potter's wheel came much later, in Mesopotamia.", "Tontöpfe, um Getreide aufzubewahren und zu kochen. Zuerst von Hand geformt: Die Töpferscheibe kam viel später, in Mesopotamien.", "Tontöpf, zum Getreid ufbewahre und zum Choche. Zerscht vo Hand gformt: D Töpferschiibe isch vill spöter cho, z Mesopotamie."],
  ["Pile dwellings", "Pfahlbauten", "Pfahlbaute"], ["Farmers built villages on stilts along Alpine lakes, even at the Zugersee. Since 2011 they are a UNESCO World Heritage Site.", "Bauern bauten Dörfer auf Pfählen an den Alpenseen, sogar am Zugersee. Seit 2011 sind sie UNESCO-Welterbe.", "Puure händ Dörfer uf Pfähl a de Alpeseen baut, sogar am Zugersee. Sit 2011 sind si UNESCO-Wälterbe."],
  ["Ötzi the Iceman", "Ötzi, der Mann aus dem Eis", "Ötzi, de Maa us em Iis"], ["He died in the Ötztal Alps and was found in the ice in 1991, with his copper axe, bow, bearskin cap and grass cloak.", "Er starb in den Ötztaler Alpen und wurde 1991 im Eis gefunden, mit Kupferbeil, Bogen, Bärenfellmütze und Grasmantel.", "Er isch i de Ötztaler Alpe gstorbe und 1991 im Iis gfunde worde, mit Chupferbiil, Boge, Bärefellchappe und Grasmantel."],
  ["The wheel", "Das Rad", "S Rad"], ["First potter's wheels, then wheeled carts. The wheel came thousands of years after farming!", "Zuerst Töpferscheiben, dann Wagen mit Rädern. Das Rad kam Tausende Jahre nach der Landwirtschaft!", "Zerscht Töpferschiibe, denn Wäge mit Räder. S Rad isch Tuusigi vo Jahr nach de Landwirtschaft cho!"],
  ["Cuneiform writing", "Die Keilschrift", "D Keilschrift"], ["In Uruk, scribes pressed wedge-shaped marks into wet clay with a reed: the first writing. At first mostly to count grain, sheep and beer.", "In Uruk drückten Schreiber mit einem Schilfrohr keilförmige Zeichen in feuchten Ton: die erste Schrift. Zuerst vor allem, um Getreide, Schafe und Bier zu zählen.", "Z Uruk händ Schriiber mit emne Schilfrohr keilförmigi Zeiche in füechte Ton drückt: di erscht Schrift. Zerscht vor allem zum Getreid, Schaf und Bier zelle."],
  ["Uruk, the first big city", "Uruk, die erste Grossstadt", "Uruk, di erscht Grossstadt"], ["With maybe 40,000 people, temples, workshops and walls 9 km long, Uruk was one of the first real cities in the world.", "Mit vielleicht 40'000 Menschen, Tempeln, Werkstätten und 9 km langen Mauern war Uruk eine der ersten echten Städte der Welt.", "Mit vilicht 40'000 Mänsche, Tämpel, Wärchstätte und 9 km lange Muure isch Uruk eini vo de erschte ächte Städt vo de Wält gsi."],
  ["Gilgamesh", "Gilgamesch", "Gilgamesch"], ["Probably a real king of Uruk who became a legend. The Epic of Gilgamesh is one of the oldest great stories of humankind.", "Wahrscheinlich ein echter König von Uruk, der zur Legende wurde. Das Gilgamesch-Epos ist eine der ältesten grossen Geschichten der Menschheit.", "Wahrschiinlich en ächte König vo Uruk, wo zur Legände worde isch. S Gilgamesch-Epos isch eini vo de eltischte grosse Gschichte vo de Menschheit."],
  ["The Epic of Gilgamesh", "Das Gilgamesch-Epos", "S Gilgamesch-Epos"], ["The first Gilgamesh poems were written down around 2100 BC. Gilgamesh and his wild friend Enkidu travel to the Cedar Forest and defeat its guardian, Humbaba.", "Die ersten Gilgamesch-Gedichte wurden um 2100 v. Chr. aufgeschrieben. Gilgamesch und sein wilder Freund Enkidu ziehen zum Zedernwald und besiegen seinen Wächter Humbaba.", "Di erschte Gilgamesch-Gedicht sind um 2100 v. Chr. ufgschribe worde. De Gilgamesch und sin wilde Fründ Enkidu zieched zum Zederewald und besiegged sin Wächter Humbaba."],
  ["Utnapishtim and the flood", "Utnapischtim und die Sintflut", "Utnapischtim und d Sintflut"], ["In the epic, Utnapishtim survives a great flood in a boat full of animals. Gilgamesh searches for eternal life and learns: no one lives forever.", "Im Epos überlebt Utnapischtim eine grosse Flut in einem Boot voller Tiere. Gilgamesch sucht das ewige Leben und lernt: Niemand lebt für immer.", "Im Epos überläbt de Utnapischtim e grossi Flut imene Boot voll Tier. De Gilgamesch suecht s ewig Läbe und lernt: Niemer läbt für immer."],
  ["Sargon of Akkad", "Sargon von Akkad", "Sargon vo Akkad"], ["He united the cities of Mesopotamia into the first empire in history.", "Er vereinte die Städte Mesopotamiens zum ersten Grossreich der Geschichte.", "Er het d Städt vo Mesopotamie zum erschte Grossriich vo de Gschicht vereint."],
  ["The Ziggurat of Ur", "Die Zikkurat von Ur", "D Zikkurat vo Ur"], ["King Ur-Nammu built a giant stepped temple for the moon god Nanna: a core of mud bricks, faced with baked bricks set in bitumen.", "König Ur-Nammu baute dem Mondgott Nanna einen riesigen Stufentempel: ein Kern aus Lehmziegeln, verkleidet mit gebrannten Ziegeln in Bitumen.", "König Ur-Nammu het em Mondgott Nanna en riisige Stufetämpel baut: en Chern us Lehmziegel, verchleidet mit brönnte Ziegel in Bitumen."],
  ["The Code of Hammurabi", "Der Codex Hammurapi", "De Codex Hammurapi"], ["King Hammurabi of Babylon had 282 laws carved into a stone stele: \"an eye for an eye\", rules for builders, and even for beer sellers.", "König Hammurapi von Babylon liess 282 Gesetze in eine Steinstele meisseln: \"Auge um Auge\", Regeln für Baumeister und sogar für Bierverkäuferinnen.", "König Hammurapi vo Babylon het 282 Gsetz in e Steistele meissle lah: \"Aug um Aug\", Regle für Baumeischter und sogar für Bierverchäuferinne."],
  ["Hieroglyphs", "Hieroglyphen", "Hieroglyphe"], ["Egyptian writing with hundreds of signs: some stand for sounds, others for whole words. Written on papyrus, stone and temple walls.", "Ägyptische Schrift mit Hunderten Zeichen: Manche stehen für Laute, andere für ganze Wörter. Geschrieben auf Papyrus, Stein und Tempelwände.", "Ägyptischi Schrift mit Hundert Zeiche: Paar stönd für Lüt, anderi für ganzi Wörter. Gschribe uf Papyrus, Stei und Tämpelwänd."],
  ["Egypt unites", "Ägypten wird vereint", "Ägypte wird vereint"], ["King Narmer united Upper and Lower Egypt. Pharaohs then ruled for about 3,000 years.", "König Narmer vereinte Ober- und Unterägypten. Danach herrschten Pharaonen rund 3000 Jahre lang.", "König Narmer het Ober- und Underägypte vereint. Denn händ Pharaone öppe 3000 Jahr lang regiert."],
  ["The Step Pyramid", "Die Stufenpyramide", "D Stufepyramide"], ["Designed by Imhotep, the first architect we know by name: six stacked mastabas, the oldest large stone building in the world.", "Entworfen von Imhotep, dem ersten Architekten, dessen Namen wir kennen: sechs gestapelte Mastabas, der älteste grosse Steinbau der Welt.", "Entworfe vom Imhotep, em erschte Architekt, wo mer de Name kenned: sächs gstaplete Mastabas, de eltischt gross Steibau vo de Wält."],
  ["The Great Pyramid of Giza", "Die Cheops-Pyramide von Gizeh", "D Cheops-Pyramide vo Gizeh"], ["Built for Pharaoh Khufu from about 2.3 million blocks. At 146 m it was the tallest building on Earth for about 3,800 years.", "Für Pharao Cheops aus rund 2,3 Millionen Blöcken gebaut. Mit 146 m war sie rund 3800 Jahre lang das höchste Bauwerk der Erde.", "Für de Pharao Cheops us öppe 2,3 Millione Blöck baut. Mit 146 m isch si öppe 3800 Jahr lang s höchschte Bauwärch vo de Wält gsi."],
  ["Mummies", "Mumien", "Mumie"], ["Embalmers removed the organs (but left the heart), dried the body in natron salt for 40 days and wrapped it in linen: about 70 days in all. Cats were mummified too!", "Einbalsamierer entfernten die Organe (aber nicht das Herz), trockneten den Körper 40 Tage in Natronsalz und wickelten ihn in Leinen: insgesamt etwa 70 Tage. Auch Katzen wurden mumifiziert!", "Iibalsamierer händ d Organ usegnoh (aber nöd s Härz), de Körper 40 Täg in Natronsalz tröchnet und in Liine iigwicklet: insgesamt öppe 70 Täg. Au Chatze sind mumifiziert worde!"],
  ["Hatshepsut", "Hatschepsut", "Hatschepsut"], ["One of the most successful pharaohs, and a woman. She is often shown with the pharaoh's false beard. Her terraced temple is stunning architecture.", "Eine der erfolgreichsten Pharaonen, und eine Frau. Sie wird oft mit dem falschen Pharaonenbart dargestellt. Ihr Terrassentempel ist atemberaubende Architektur.", "Eini vo de erfolgriichschte Pharaone, und e Frau. Si wird oft mit em falsche Pharaonebart darstellt. Ihre Terrassetämpel isch atemberaubendi Architektur."],
  ["Tutankhamun", "Tutanchamun", "Tutanchamun"], ["A young pharaoh who died at about 19. In 1922 Howard Carter found his almost untouched tomb, with the famous golden mask.", "Ein junger Pharao, der mit etwa 19 Jahren starb. 1922 fand Howard Carter sein fast unberührtes Grab mit der berühmten goldenen Maske.", "En junge Pharao, wo mit öppe 19 gstorbe isch. 1922 het de Howard Carter sis fascht unberüehrts Grab mit de berüehmte guldige Maske gfunde."],
  ["The first peace treaty", "Der erste Friedensvertrag", "De erscht Friedesvertrag"], ["After the battle of Kadesh, Ramesses II and the Hittites signed one of the oldest known peace treaties. A copy hangs at the United Nations.", "Nach der Schlacht bei Kadesch schlossen Ramses II. und die Hethiter einen der ältesten bekannten Friedensverträge. Eine Kopie hängt bei der UNO.", "Nach de Schlacht bi Kadesch händ de Ramses II. und d Hethiter eine vo de eltischte bekannte Friedesverträg gschlosse. E Kopie hanget bi de UNO."],
  ["The Rosetta Stone", "Der Stein von Rosette", "De Stei vo Rosette"], ["The same decree in hieroglyphs, demotic and Greek. With it, Jean-François Champollion deciphered the hieroglyphs in 1822.", "Derselbe Erlass in Hieroglyphen, Demotisch und Griechisch. Damit entzifferte Jean-François Champollion 1822 die Hieroglyphen.", "De glich Erlass i Hieroglyphe, Demotisch und Griechisch. Demit het de Jean-François Champollion 1822 d Hieroglyphe entzifferet."],
  ["Cleopatra", "Kleopatra", "Kleopatra"], ["The last ruler of Ptolemaic Egypt. She lived closer in time to the Moon landing than to the building of the Great Pyramid!", "Die letzte Herrscherin des ptolemäischen Ägypten. Sie lebte zeitlich näher an der Mondlandung als am Bau der Cheops-Pyramide!", "Di letscht Herrscherin vom ptolemäische Ägypte. Si het ziitlich nöcher a de Mondlandig gläbt als am Bau vo de Cheops-Pyramide!"],
  ["The first Olympic Games", "Die ersten Olympischen Spiele", "Di erschte Olympische Spiel"], ["Athletes raced the stadion, about 192 m, at Olympia in honour of Zeus. Women were not allowed to compete.", "Athleten liefen in Olympia zu Ehren des Zeus das Stadion, etwa 192 m. Frauen durften nicht teilnehmen.", "Athlete sind z Olympia zu Ehre vom Zeus s Stadion grennt, öppe 192 m. Fraue händ nöd dörfe mitmache."],
  ["Homer", "Homer", "Homer"], ["The Iliad (the Trojan War) and the Odyssey (Odysseus' long trip home) were sung by bards and later written down.", "Die Ilias (der Trojanische Krieg) und die Odyssee (die lange Heimreise des Odysseus) wurden von Sängern vorgetragen und später aufgeschrieben.", "D Ilias (de Trojanisch Chrieg) und d Odyssee (em Odysseus sini langi Heireis) sind vo Sänger vortreit und spöter ufgschribe worde."],
  ["Democracy in Athens", "Demokratie in Athen", "Demokratie z Athen"], ["Cleisthenes gave power to the assembly of citizens. But only free adult men were citizens: no women, no slaves, no foreigners.", "Kleisthenes gab der Volksversammlung die Macht. Aber Bürger waren nur freie erwachsene Männer: keine Frauen, keine Sklaven, keine Fremden.", "De Kleisthenes het de Volksversammlig d Macht gä. Aber Bürger sind nur frei erwachseni Manne gsi: kei Fraue, kei Sklave, kei Frömdi."],
  ["Marathon", "Marathon", "Marathon"], ["Athens beat the Persians at Marathon. Legend says a messenger ran about 40 km to Athens to announce the victory.", "Athen besiegte die Perser bei Marathon. Der Legende nach lief ein Bote etwa 40 km nach Athen, um den Sieg zu verkünden.", "Athen het d Perser bi Marathon besiegt. D Legände seit, en Bote seig öppe 40 km uf Athen grennt, zum de Sieg verchünde."],
  ["Thermopylae and Salamis", "Thermopylen und Salamis", "Thermopyle und Salamis"], ["King Leonidas and his 300 Spartans (with a few thousand other Greeks) held the pass; then Athens' fleet beat the Persians at Salamis.", "König Leonidas und seine 300 Spartaner (mit einigen tausend anderen Griechen) hielten den Pass; dann besiegte Athens Flotte die Perser bei Salamis.", "König Leonidas und sini 300 Spartaner (mit es paar tuusig andere Grieche) händ de Pass ghebt; denn het d Flotte vo Athen d Perser bi Salamis besiegt."],
  ["The Parthenon", "Der Parthenon", "De Parthenon"], ["Built under Pericles by Ictinus and Callicrates, with sculptures by Phidias. Its columns swell slightly (entasis) and almost nothing is straight, so it LOOKS perfectly straight.", "Unter Perikles von Iktinos und Kallikrates gebaut, mit Skulpturen von Phidias. Die Säulen schwellen leicht an (Entasis) und fast nichts ist gerade, damit er perfekt gerade AUSSIEHT.", "Under em Perikles vom Iktinos und Kallikrates baut, mit Skulpture vom Phidias. D Süüle schwelled liecht aa (Entasis) und fascht nüt isch grad, damit er perfekt grad USGSEHT."],
  ["Socrates", "Sokrates", "Sokrates"], ["He asked questions until people noticed what they did not know. Athens sentenced him to death. His student Plato founded the Academy; Plato's student was Aristotle.", "Er stellte Fragen, bis die Leute merkten, was sie nicht wussten. Athen verurteilte ihn zum Tod. Sein Schüler Platon gründete die Akademie; Platons Schüler war Aristoteles.", "Er het Frage gstellt, bis d Lüt gmerkt händ, was si nöd wüssed. Athen het ne zum Tod verurteilt. Sin Schüeler Platon het d Akademie gründet; em Platon sin Schüeler isch de Aristoteles gsi."],
  ["The Oracle of Delphi", "Das Orakel von Delphi", "S Orakel vo Delphi"], ["The Pythia, a priestess, gave mysterious prophecies. Carved at the temple: \"Know thyself\" and \"Nothing in excess\".", "Die Pythia, eine Priesterin, gab rätselhafte Weissagungen. Am Tempel eingemeisselt: \"Erkenne dich selbst\" und \"Nichts im Übermass\".", "D Pythia, e Prieschterin, het rätselhafti Wiissagige gä. Am Tämpel iigmeisslet: \"Erkenn di sälber\" und \"Nüt im Übermass\"."],
  ["Alexander the Great", "Alexander der Grosse", "Alexander de Gross"], ["Aristotle's student became king at 20 and built an empire from Greece to India. At Gordion he simply cut the famous knot.", "Der Schüler des Aristoteles wurde mit 20 König und schuf ein Reich von Griechenland bis Indien. In Gordion zerschlug er einfach den berühmten Knoten.", "Em Aristoteles sin Schüeler isch mit 20 König worde und het es Riich vo Griecheland bis Indie gschaffe. Z Gordion het er de berüehmt Chnopf eifach verhaue."],
  ["Archimedes", "Archimedes", "Archimedes"], ["A genius from Syracuse: levers, pulleys, π... and \"Eureka!\" in the bathtub, when he understood why things float.", "Ein Genie aus Syrakus: Hebel, Flaschenzüge, π... und \"Heureka!\" in der Badewanne, als er verstand, warum Dinge schwimmen.", "Es Genie us Syrakus: Hebel, Flaschezüg, π... und \"Heureka!\" i de Badwanne, won er verstande het, werum Sache schwümmed."],
  ["The founding of Rome", "Die Gründung Roms", "D Gründig vo Rom"], ["Legend says the twins Romulus and Remus, raised by a she-wolf, founded Rome on the Tiber. Archaeologists do find villages there from that time.", "Der Legende nach gründeten die Zwillinge Romulus und Remus, von einer Wölfin aufgezogen, Rom am Tiber. Archäologen finden dort tatsächlich Dörfer aus jener Zeit.", "D Legände seit, d Zwilling Romulus und Remus, vonere Wölfin ufzoge, heiged Rom am Tiber gründet. Archäologe finded det tatsächlich Dörfer us dere Ziit."],
  ["The Roman Republic", "Die Römische Republik", "D Römischi Republik"], ["The Romans chased away their last king. Two consuls, elected every year, and the Senate ruled instead. SPQR: the Senate and People of Rome.", "Die Römer verjagten ihren letzten König. Stattdessen regierten zwei jährlich gewählte Konsuln und der Senat. SPQR: Senat und Volk von Rom.", "D Römer händ ihre letscht König verjagt. Statt dem händ zwei jedes Jahr gwählti Konsuln und de Senat regiert. SPQR: Senat und Volk vo Rom."],
  ["The geese of Juno", "Die Gänse der Juno", "D Gäns vo de Juno"], ["Legend: when Gauls sneaked up the Capitol at night, the sacred geese honked and woke the defenders.", "Legende: Als Gallier nachts das Kapitol hinaufschlichen, schnatterten die heiligen Gänse und weckten die Verteidiger.", "Legände: Wo Gallier znacht s Kapitol ufegschliche sind, händ di heilige Gäns gschnaderet und d Verteidiger gweckt."],
  ["Hannibal crosses the Alps", "Hannibal überquert die Alpen", "Hannibal überquert d Alpe"], ["Carthage's general marched an army with about 37 elephants over the Alps to attack Rome. Rome still won, and destroyed Carthage in 146 BC.", "Karthagos Feldherr führte ein Heer mit etwa 37 Elefanten über die Alpen, um Rom anzugreifen. Rom gewann trotzdem und zerstörte Karthago 146 v. Chr.", "De Feldherr vo Karthago het es Heer mit öppe 37 Elefante über d Alpe gfüehrt, zum Rom aagriife. Rom het trotzdem gwunne und Karthago 146 v. Chr. zerstört."],
  ["The Helvetii", "Die Helvetier", "D Helvetier"], ["The Celtic Helvetii from today's Switzerland tried to move to Gaul. Julius Caesar stopped them at Bibracte and sent them home.", "Die keltischen Helvetier aus der heutigen Schweiz wollten nach Gallien ziehen. Julius Caesar hielt sie bei Bibracte auf und schickte sie heim.", "Di keltische Helvetier us de hüttige Schwiiz händ uf Gallie wele zieh. De Julius Caesar het si bi Bibracte ufghalte und hei gschickt."],
  ["The Ides of March", "Die Iden des März", "D Iden vom März"], ["Julius Caesar was stabbed in the Senate on 15 March 44 BC. His Julian calendar is almost the one we still use today.", "Julius Caesar wurde am 15. März 44 v. Chr. im Senat erstochen. Sein julianischer Kalender ist fast derselbe, den wir heute noch benutzen.", "De Julius Caesar isch am 15. März 44 v. Chr. im Senat erstoche worde. Sin julianische Kaländer isch fascht dä, wo mer hüt no bruuched."],
  ["Augustus, the first emperor", "Augustus, der erste Kaiser", "Augustus, de erscht Kaiser"], ["Caesar's adopted son Octavian became Augustus, the first emperor. About 200 years of relative peace followed: the Pax Romana.", "Caesars Adoptivsohn Octavian wurde zu Augustus, dem ersten Kaiser. Es folgten rund 200 Jahre relativer Frieden: die Pax Romana.", "Em Caesar sin Adoptivsohn Octavian isch zum Augustus worde, em erschte Kaiser. Denn sind öppe 200 Jahr relative Fride cho: d Pax Romana."],
  ["Vesuvius buries Pompeii", "Der Vesuv begräbt Pompeji", "De Vesuv vergrabt Pompeji"], ["The volcano buried Pompeii and Herculaneum under ash. Pliny the Younger watched from across the bay and described it in his letters.", "Der Vulkan begrub Pompeji und Herculaneum unter Asche. Plinius der Jüngere sah von der anderen Seite der Bucht zu und beschrieb es in seinen Briefen.", "De Vulkan het Pompeji und Herculaneum under Äsche vergrabe. De Plinius de Jüngeri het vo de andere Siite vo de Bucht zuegluegt und s i sine Brief beschribe."],
  ["The Colosseum", "Das Kolosseum", "S Kolosseum"], ["The amphitheatre held about 50,000 spectators, with a giant sun awning and lifts that brought animals up from underground.", "Das Amphitheater fasste etwa 50'000 Zuschauer, mit einem riesigen Sonnensegel und Aufzügen, die Tiere aus dem Untergrund hinaufbrachten.", "S Amphitheater het öppe 50'000 Zueschauer gfasst, mit emne riisige Sunnesegel und Lift, wo Tier us em Undergrund ufebracht händ."],
  ["The Pantheon", "Das Pantheon", "S Pantheon"], ["Hadrian's temple has a 43.3 m concrete dome with an open oculus. It is still the largest unreinforced concrete dome in the world.", "Hadrians Tempel hat eine Betonkuppel von 43,3 m mit einem offenen Opaion. Sie ist noch immer die grösste unbewehrte Betonkuppel der Welt.", "Em Hadrian sin Tämpel het e Betonkupple vo 43,3 m mit emne offne Opaion. Si isch immer no di gröscht unarmiert Betonkupple vo de Wält."],
  ["Constantine", "Konstantin", "Konstantin"], ["With the Edict of Milan, Christians could worship freely. In 330 Constantine made Byzantium his new capital: Constantinople.", "Mit dem Mailänder Edikt durften Christen ihren Glauben frei ausüben. 330 machte Konstantin Byzanz zu seiner neuen Hauptstadt: Konstantinopel.", "Mit em Mailänder Edikt händ Christe ihre Glaube frei dörfe usüebe. 330 het de Konstantin Byzanz zu sinere neue Hauptstadt gmacht: Konstantinopel."],
  ["East and West", "Ost und West", "Oscht und Wescht"], ["After Emperor Theodosius died, the empire was split for good into a Western and an Eastern half.", "Nach dem Tod von Kaiser Theodosius wurde das Reich endgültig in eine westliche und eine östliche Hälfte geteilt.", "Nach em Tod vom Kaiser Theodosius isch s Riich endgültig in e westlichi und e östlichi Hälfti teilt worde."],
  ["The sack of Rome", "Die Plünderung Roms", "D Plünderig vo Rom"], ["The Visigoths under Alaric plundered Rome: the first enemy to take the city in 800 years.", "Die Westgoten unter Alarich plünderten Rom: der erste Feind seit 800 Jahren, der die Stadt einnahm.", "D Weschtgote under em Alarich händ Rom plünderet: de erscht Feind sit 800 Jahr, wo d Stadt iignoh het."],
  ["The end of the Western Roman Empire", "Das Ende des Weströmischen Reiches", "S Änd vom Weschtrömische Riich"], ["Odoacer deposed the boy emperor Romulus Augustulus and sent the imperial insignia to Constantinople. The Eastern Roman Empire lasted until 1453.", "Odoaker setzte den Kinderkaiser Romulus Augustulus ab und schickte die kaiserlichen Insignien nach Konstantinopel. Das Oströmische Reich bestand bis 1453.", "De Odoaker het de Chinderkaiser Romulus Augustulus abgsetzt und di kaiserliche Insignie uf Konstantinopel gschickt. S Oschtrömisch Riich het bis 1453 bestande."],
  ["The Middle Ages begin", "Das Mittelalter beginnt", "S Mittelalter fangt aa"], ["Monasteries like Monte Cassino (founded around 529) and later St. Gallen kept knowledge alive: monks copied the old books by hand for centuries.", "Klöster wie Monte Cassino (gegründet um 529) und später St. Gallen bewahrten das Wissen: Mönche schrieben die alten Bücher jahrhundertelang von Hand ab.", "Chlöschter wie Monte Cassino (gründet um 529) und spöter St. Galle händ s Wüsse bewahrt: Mönch händ di alte Büecher Jahrhundertelang vo Hand abgschribe."],
  ["~{0} BC", "um {0} v. Chr.", "um {0} v. Chr."], ["{0} BC", "{0} v. Chr.", "{0} v. Chr."], ["~AD {0}", "um {0} n. Chr.", "um {0} n. Chr."], ["AD {0}", "{0} n. Chr.", "{0} n. Chr."],
  ["📜 New chronicle card: {0}", "📜 Neue Chronik-Karte: {0}", "📜 Neui Chronik-Charte: {0}"],
  // eras, places, signs
  ["The Neolithic", "Die Jungsteinzeit", "D Jungsteiziit"], ["~9600–3300 BC", "um 9600–3300 v. Chr.", "um 9600–3300 v. Chr."], ["Mesopotamia", "Mesopotamien", "Mesopotamie"], ["~3500–1750 BC", "um 3500–1750 v. Chr.", "um 3500–1750 v. Chr."],
  ["Ancient Egypt", "Das alte Ägypten", "S alte Ägypte"], ["~3100–30 BC", "um 3100–30 v. Chr.", "um 3100–30 v. Chr."], ["Ancient Greece", "Das antike Griechenland", "S antike Griecheland"], ["~776–146 BC", "um 776–146 v. Chr.", "um 776–146 v. Chr."],
  ["Rome", "Rom", "Rom"], ["753 BC – AD 476", "753 v. Chr. – 476 n. Chr.", "753 v. Chr. – 476 n. Chr."],
  ["Pillars", "Pfeiler", "Pfiler"], ["Roof ladder", "Dachleiter", "Dachleitere"], ["Village", "Dorf", "Dorf"], ["Portal stone", "Portalstein", "Portalstei"], ["Uruk gate", "Tor von Uruk", "Tor vo Uruk"], ["Tablet house", "Tafelhaus", "Tafelhuus"],
  ["Building site", "Baustelle", "Baustell"], ["Temple school", "Tempelschule", "Tämpelschuel"], ["Tomb", "Grab", "Grab"], ["Stadion", "Stadion", "Stadion"], ["Oracle", "Orakel", "Orakel"],
  ["Agora", "Agora", "Agora"], ["Palace", "Palast", "Palascht"], ["Colosseum", "Kolosseum", "Kolosseum"], ["Forum", "Forum", "Forum"], ["Pompeii", "Pompeji", "Pompeji"], ["Gather", "Sammeln", "Sammle"], ["Read the stele", "Stele lesen", "Stele läse"], ["Cedar Forest", "Zedernwald", "Zederewald"],
  ["GÖBEKLI TEPE, ~9600 BC. Hunter-gatherers are building something HUGE up on the hill.", "GÖBEKLI TEPE, um 9600 v. Chr. Jäger und Sammler bauen oben auf dem Hügel etwas RIESIGES.", "GÖBEKLI TEPE, um 9600 v. Chr. Jäger und Sammler baued obe uf em Hügel öppis RIISIGS."],
  ["ÇATALHÖYÜK, ~7400 BC. Thousands of people, zero streets. Mind the roofs.", "ÇATALHÖYÜK, um 7400 v. Chr. Tausende Menschen, null Strassen. Achtung auf den Dächern.", "ÇATALHÖYÜK, um 7400 v. Chr. Tuusigi Mänsche, null Strasse. Obacht uf de Dächer."],
  ["PILE DWELLINGS, ~4300 BC. Farming has reached the Alpine lakes: even the Zugersee!", "PFAHLBAUTEN, um 4300 v. Chr. Die Landwirtschaft hat die Alpenseen erreicht: sogar den Zugersee!", "PFAHLBAUTE, um 4300 v. Chr. D Landwirtschaft isch bi de Alpeseen aacho: sogar am Zugersee!"],
  ["ÖTZTAL ALPS, ~3300 BC. Cold. Very cold. Someone left a copper axe here.", "ÖTZTALER ALPEN, um 3300 v. Chr. Kalt. Sehr kalt. Jemand hat hier ein Kupferbeil liegen lassen.", "ÖTZTALER ALPE, um 3300 v. Chr. Chalt. Sehr chalt. Öpper het da es Chupferbiil ligge lah."],
  ["Göbekli Tepe ~9600 BC", "Göbekli Tepe um 9600 v. Chr.", "Göbekli Tepe um 9600 v. Chr."], ["Çatalhöyük ~7400 BC", "Çatalhöyük um 7400 v. Chr.", "Çatalhöyük um 7400 v. Chr."], ["Alpine lakes ~4300 BC", "Alpenseen um 4300 v. Chr.", "Alpeseen um 4300 v. Chr."], ["Ötztal Alps ~3300 BC", "Ötztaler Alpen um 3300 v. Chr.", "Ötztaler Alpe um 3300 v. Chr."],
  ["Çatalhöyük! A whole town where you walk on the roofs. 🪜", "Çatalhöyük! Eine ganze Stadt, in der man auf den Dächern läuft. 🪜", "Çatalhöyük! E ganzi Stadt, wo me uf de Dächer lauft. 🪜"],
  ["Houses on stilts! The ancestors of every Swiss lake village. 🛶", "Häuser auf Pfählen! Die Vorfahren jedes Schweizer Seedorfs. 🛶", "Hüser uf Pfähl! D Vorfahre vo jedem Schwiizer Seedorf. 🛶"],
  ["The Alps. This is where I belong. Well, in 3300 BC. 🧊", "Die Alpen. Hier gehöre ich hin. Na ja, im Jahr 3300 v. Chr. 🧊", "D Alpe. Da ghör ich hi. Naja, im Jahr 3300 v. Chr. 🧊"],
  ["Fun fact: dogs were tamed long before anyone farmed. Good boys came first. 🐕", "Fun Fact: Hunde wurden lange vor der Landwirtschaft gezähmt. Die Guten kamen zuerst. 🐕", "Fun Fact: Hünd sind lang vor de Landwirtschaft zähmt worde. Di Guete sind zerscht cho. 🐕"],
  ["No wheel, no metal, no writing... and they still built Göbekli Tepe. Respect.", "Kein Rad, kein Metall, keine Schrift... und trotzdem bauten sie Göbekli Tepe. Respekt.", "Kei Rad, kei Metall, kei Schrift... und trotzdem händ si Göbekli Tepe baut. Respäkt."],
  ["Farming spread from here all the way to the Alps. Slowly. Like, 5,000 years slowly.", "Die Landwirtschaft breitete sich von hier bis in die Alpen aus. Langsam. So 5000-Jahre-langsam.", "D Landwirtschaft het sich vo da bis i d Alpe usbreitet. Langsam. So 5000-Jahr-langsam."],
  ["Careful with the wild boars. They don't care which millennium it is. 🐗", "Vorsicht vor den Wildschweinen. Denen ist egal, welches Jahrtausend wir haben. 🐗", "Obacht vor de Wildsäu. Dene isch glich, weles Jahrtuusig mer händ. 🐗"],
  ["URUK, ~3200 BC. Biggest city in the world: maybe 40,000 people. Writing was just invented here!", "URUK, um 3200 v. Chr. Grösste Stadt der Welt: vielleicht 40'000 Menschen. Hier wurde gerade die Schrift erfunden!", "URUK, um 3200 v. Chr. Gröscht Stadt vo de Wält: vilicht 40'000 Mänsche. Da isch grad d Schrift erfunde worde!"],
  ["THE STEPPE. Wild animals, wild lions, and (rumour has it) a wild man.", "DIE STEPPE. Wilde Tiere, wilde Löwen und (so heisst es) ein wilder Mann.", "D STEPPE. Wildi Tier, wildi Löie und (so seit me) en wilde Maa."],
  ["UR. Home of the moon god Nanna and his brand-new ziggurat.", "UR. Heimat des Mondgottes Nanna und seiner brandneuen Zikkurat.", "UR. Dihei vom Mondgott Nanna und sinere nigelnagelneue Zikkurat."],
  ["The steppe", "Die Steppe", "D Steppe"], ["The Cedar Forest", "Der Zedernwald", "De Zederewald"], ["Uruk ~3200 BC", "Uruk um 3200 v. Chr.", "Uruk um 3200 v. Chr."], ["Ur ~2100 BC", "Ur um 2100 v. Chr.", "Ur um 2100 v. Chr."], ["Babylon ~1754 BC", "Babylon um 1754 v. Chr.", "Babylon um 1754 v. Chr."], ["The Zagros desert", "Die Zagros-Wüste", "D Zagros-Wüeschti"],
  ["The Cedar Forest... Humbaba's home. Let's be brave. And quick. 🌲", "Der Zedernwald... Humbabas Zuhause. Seien wir mutig. Und schnell. 🌲", "De Zederewald... em Humbaba sis Dihei. Mer sind muetig. Und schnell. 🌲"],
  ["Ur! That ziggurat is basically a mountain made of mud bricks. 🧱", "Ur! Diese Zikkurat ist im Grunde ein Berg aus Lehmziegeln. 🧱", "Ur! Die Zikkurat isch eigentlich en Bärg us Lehmziegel. 🧱"],
  ["Babylon! The Ishtar Gate is glazed blue. Very fancy. 💙", "Babylon! Das Ischtar-Tor ist blau glasiert. Sehr schick. 💙", "Babylon! S Ischtar-Tor isch blau glasiert. Sehr schick. 💙"],
  ["Sumerians loved beer so much they had a goddess for it: Ninkasi. Elio would approve. 🍺", "Die Sumerer liebten Bier so sehr, dass sie eine Göttin dafür hatten: Ninkasi. Elio wäre einverstanden. 🍺", "D Sumerer händ Bier so gern gha, dass si e Göttin defür gha händ: Ninkasi. De Elio wär iiverstande. 🍺"],
  ["Mud bricks: mud + straw + sun. Cheap, and it worked for thousands of years.", "Lehmziegel: Lehm + Stroh + Sonne. Billig, und es funktionierte Tausende Jahre lang.", "Lehmziegel: Lehm + Strau + Sunne. Billig, und es het Tuusigi vo Jahr funktioniert."],
  ["Writing was invented to count sheep. Literature came later. Priorities.", "Die Schrift wurde erfunden, um Schafe zu zählen. Literatur kam später. Prioritäten.", "D Schrift isch erfunde worde zum Schaf zelle. Literatur isch spöter cho. Prioritäte."],
  ["Lions in the steppe again. And yes... their poop. Some things never change. 🦁", "Wieder Löwen in der Steppe. Und ja... ihr Kot. Manche Dinge ändern sich nie. 🦁", "Scho wieder Löie i de Steppe. Und ja... ihres Gaggi. Paar Sache ändered sich nie. 🦁"],
  ["SAQQARA. Pharaohs have ruled a united Egypt since King Narmer, around 3100 BC.", "SAKKARA. Seit König Narmer, um 3100 v. Chr., regieren Pharaonen ein vereintes Ägypten.", "SAKKARA. Sit em König Narmer, um 3100 v. Chr., regiered Pharaone es vereints Ägypte."],
  ["THE GREAT SPHINX, ~2500 BC. Lion body, pharaoh's head. The nose? Long gone.", "DIE GROSSE SPHINX, um 2500 v. Chr. Löwenkörper, Pharaonenkopf. Die Nase? Längst weg.", "D GROSS SPHINX, um 2500 v. Chr. Löiechörper, Pharaonechopf. D Nase? Scho lang wäg."],
  ["A big black stone with three scripts on it... Hieroglyphs, demotic, Greek. 196 BC.", "Ein grosser schwarzer Stein mit drei Schriften... Hieroglyphen, Demotisch, Griechisch. 196 v. Chr.", "En grosse schwarze Stei mit drü Schrifte... Hieroglyphe, Demotisch, Griechisch. 196 v. Chr."],
  ["VALLEY OF THE KINGS. Pharaohs were buried in hidden rock tombs here. Hidden... mostly.", "TAL DER KÖNIGE. Hier wurden Pharaonen in versteckten Felsgräbern bestattet. Versteckt... meistens.", "TAL VO DE KÖNIG. Da sind Pharaone in versteckte Felsgräber begrabe worde. Versteckt... meischtens."],
  ["The Nile delta", "Das Nildelta", "S Nildelta"], ["Giza ~2560 BC", "Gizeh um 2560 v. Chr.", "Gizeh um 2560 v. Chr."], ["Saqqara ~2650 BC", "Sakkara um 2650 v. Chr.", "Sakkara um 2650 v. Chr."], ["Thebes ~1450 BC", "Theben um 1450 v. Chr.", "Theben um 1450 v. Chr."], ["Valley of the Kings", "Tal der Könige", "Tal vo de König"],
  ["GIZA. Those pyramids... I'm not jealous. I'm inspired. 🔺", "GIZEH. Diese Pyramiden... Ich bin nicht neidisch. Ich bin inspiriert. 🔺", "GIZEH. Die Pyramide... Ich bi nöd niidisch. Ich bi inspiriert. 🔺"],
  ["Thebes: temples, obelisks and the most beautiful terraced temple ever. 🌴", "Theben: Tempel, Obelisken und der schönste Terrassentempel überhaupt. 🌴", "Theben: Tämpel, Obelische und de schönscht Terrassetämpel überhaupt. 🌴"],
  ["The delta! Papyrus everywhere. And Alexandria, much later. 📜", "Das Delta! Überall Papyrus. Und Alexandria, viel später. 📜", "S Delta! Überall Papyrus. Und Alexandria, vill spöter. 📜"],
  ["The Nile floods every summer and leaves black, fertile mud. No Nile, no Egypt. 🌊", "Der Nil tritt jeden Sommer über die Ufer und hinterlässt schwarzen, fruchtbaren Schlamm. Kein Nil, kein Ägypten. 🌊", "De Nil gaht jede Summer über d Ufer und lat schwarze, fruchtbare Schlamm zrugg. Kei Nil, kei Ägypte. 🌊"],
  ["Egyptians loved cats. Hurting one was a serious crime. Sarah, you'd have fit right in. 🐈", "Die Ägypter liebten Katzen. Einer wehzutun war ein schweres Verbrechen. Sarah, du hättest perfekt hierher gepasst. 🐈", "D Ägypter händ Chatze gliebt. Eine weh tue isch es schwers Verbreche gsi. Sarah, du hettsch perfekt da ane passt. 🐈"],
  ["Pyramid builders were paid workers, not slaves. They even got beer rations. 🍺", "Die Pyramidenbauer waren bezahlte Arbeiter, keine Sklaven. Sie bekamen sogar Bierrationen. 🍺", "D Pyramidebauer sind zahlti Arbeiter gsi, kei Sklave. Si händ sogar Bierratione übercho. 🍺"],
  ["Watch out for the crocodiles. The Nile is not a Bolleblu waterslide. 🐊", "Achtung, Krokodile. Der Nil ist keine Bolleblu-Wasserrutsche. 🐊", "Obacht, Krokodil. De Nil isch kei Bolleblu-Rutschbahn. 🐊"],
  ["OLYMPIA, 776 BC. The very first Olympic Games! Men only. (Says who?)", "OLYMPIA, 776 v. Chr. Die allerersten Olympischen Spiele! Nur Männer. (Sagt wer?)", "OLYMPIA, 776 v. Chr. Di allererschte Olympische Spiel! Nur Manne. (Seit wer?)"],
  ["ATHENS. Democracy, philosophy, theatre... and a lot of arguing in the Agora.", "ATHEN. Demokratie, Philosophie, Theater... und viel Streit auf der Agora.", "ATHEN. Demokratie, Philosophie, Theater... und vill Gstriit uf de Agora."],
  ["THERMOPYLAE, 480 BC. A narrow pass between the mountains and the sea.", "THERMOPYLEN, 480 v. Chr. Ein schmaler Pass zwischen den Bergen und dem Meer.", "THERMOPYLE, 480 v. Chr. En schmale Pass zwüsche de Bärge und em Meer."],
  ["MACEDONIA. Home of King Philip and his very ambitious son.", "MAKEDONIEN. Heimat von König Philipp und seinem sehr ehrgeizigen Sohn.", "MAKEDONIE. Dihei vom König Philipp und sim sehr ehrgiizige Sohn."],
  ["Olympia 776 BC", "Olympia 776 v. Chr.", "Olympia 776 v. Chr."], ["Delphi", "Delphi", "Delphi"], ["Thermopylae 480 BC", "Thermopylen 480 v. Chr.", "Thermopyle 480 v. Chr."], ["Athens ~450 BC", "Athen um 450 v. Chr.", "Athen um 450 v. Chr."], ["Marathon 490 BC", "Marathon 490 v. Chr.", "Marathon 490 v. Chr."], ["Macedonia 336 BC", "Makedonien 336 v. Chr.", "Makedonie 336 v. Chr."],
  ["Delphi, the navel of the world. The oracle speaks in riddles. 🔮", "Delphi, der Nabel der Welt. Das Orakel spricht in Rätseln. 🔮", "Delphi, de Buchnabel vo de Wält. S Orakel redt in Rätsel. 🔮"],
  ["Athens! The Acropolis up there... Sarah, look at those proportions. 🏛️", "Athen! Die Akropolis da oben... Sarah, schau dir diese Proportionen an. 🏛️", "Athen! D Akropolis det obe... Sarah, lueg dir die Proportione aa. 🏛️"],
  ["Marathon. The Persians landed here in 490 BC. ⚔️", "Marathon. Hier landeten 490 v. Chr. die Perser. ⚔️", "Marathon. Da sind 490 v. Chr. d Perser glandet. ⚔️"],
  ["Macedonia. A young prince here will conquer half the world. 🐎", "Makedonien. Ein junger Prinz von hier wird die halbe Welt erobern. 🐎", "Makedonie. En junge Prinz vo da wird di halb Wält erobere. 🐎"],
  ["Sing, O Muse... of Sarah, the sneakiest architect in all of Hellas. 🎶", "Singe, o Muse... von Sarah, der schlausten Architektin in ganz Hellas. 🎶", "Sing, o Muse... vo de Sarah, de schlauschte Architektin i ganz Hellas. 🎶"],
  ["The Greeks painted their temples in bright colours! The white marble look came later.", "Die Griechen bemalten ihre Tempel knallbunt! Der weisse Marmor-Look kam später.", "D Grieche händ ihri Tämpel knallbunt aagmalt! De wiiss Marmor-Look isch spöter cho."],
  ["Theatre was invented here. Comedy AND tragedy. Like my love life before I met you.", "Hier wurde das Theater erfunden. Komödie UND Tragödie. Wie mein Liebesleben, bevor ich dich traf.", "Da isch s Theater erfunde worde. Komödie UND Tragödie. Wie mis Liebesläbe, bevor ich di troffe ha."],
  ["Careful, wild boars in the mountains. Very Calydonian. 🐗", "Vorsicht, Wildschweine in den Bergen. Sehr kalydonisch. 🐗", "Obacht, Wildsäu i de Bärge. Sehr kalydonisch. 🐗"],
  ["Roma", "Roma", "Roma"],
  ["A bronze she-wolf feeding two little boys. Romulus and Remus, 753 BC (legend).", "Eine bronzene Wölfin säugt zwei kleine Jungen. Romulus und Remus, 753 v. Chr. (Legende).", "E bronzigi Wölfin sügt zwei chliini Buebe. Romulus und Remus, 753 v. Chr. (Legände)."],
  ["S·P·Q·R — Senatus Populusque Romanus. The Senate and People of Rome. A republic since 509 BC.", "S·P·Q·R — Senatus Populusque Romanus. Senat und Volk von Rom. Eine Republik seit 509 v. Chr.", "S·P·Q·R — Senatus Populusque Romanus. Senat und Volk vo Rom. E Republik sit 509 v. Chr."],
  ["MILESTONE: AD 395. From here on, the empire has two halves: West and East.", "MEILENSTEIN: 395 n. Chr. Ab hier hat das Reich zwei Hälften: West und Ost.", "MEILESTEI: 395 n. Chr. Ab da het s Riich zwei Hälfte: Wescht und Oscht."],
  ["The walls are scorched... In AD 410 the Visigoths under Alaric sacked Rome.", "Die Mauern sind verkohlt... 410 n. Chr. plünderten die Westgoten unter Alarich Rom.", "D Muure sind verchohlt... 410 n. Chr. händ d Weschtgote under em Alarich Rom plünderet."],
  ["The Alps 218 BC", "Die Alpen 218 v. Chr.", "D Alpe 218 v. Chr."], ["Pompeii AD 79", "Pompeji 79 n. Chr.", "Pompeji 79 n. Chr."], ["Ravenna AD 476", "Ravenna 476 n. Chr.", "Ravenna 476 n. Chr."], ["The road to the East", "Die Strasse nach Osten", "D Strass in Oschte"],
  ["The Alps again! Hannibal is about to do something very ambitious with elephants. 🐘", "Wieder die Alpen! Hannibal hat gleich etwas sehr Ehrgeiziges mit Elefanten vor. 🐘", "Scho wieder d Alpe! De Hannibal het grad öppis sehr Ehrgiizigs mit Elefante vor. 🐘"],
  ["Pompeii. Pretty town. That mountain is... smoking? 🌋", "Pompeji. Hübsche Stadt. Dieser Berg... raucht? 🌋", "Pompeji. Herzigi Stadt. Dä Bärg... rauchet? 🌋"],
  ["Ravenna, the last capital of the West. Mosaics everywhere! ✨", "Ravenna, die letzte Hauptstadt des Westens. Überall Mosaike! ✨", "Ravenna, di letscht Hauptstadt vom Weschte. Überall Mosaik! ✨"],
  ["The road to Constantinople: the Roman Empire lives on in the East until 1453.", "Die Strasse nach Konstantinopel: Im Osten lebt das Römische Reich bis 1453 weiter.", "D Strass uf Konstantinopel: Im Oschte läbt s Römisch Riich bis 1453 wiiter."],
  ["Roman concrete: lime, volcanic ash and seawater. Some of it is still getting STRONGER. 🧱", "Römischer Beton: Kalk, Vulkanasche und Meerwasser. Manches davon wird immer noch FESTER. 🧱", "Römische Beton: Chalch, Vulkanäsche und Meerwasser. Paar devo wird immer no FESCHTER. 🧱"],
  ["All roads lead to Rome. Literally: about 80,000 km of paved roads.", "Alle Wege führen nach Rom. Wörtlich: etwa 80'000 km gepflasterte Strassen.", "Alli Wäg füehred uf Rom. Wörtlich: öppe 80'000 km pflaschteret Strasse."],
  ["The Romans had public toilets, side by side, no walls. Very social. 🚽", "Die Römer hatten öffentliche Toiletten, Seite an Seite, ohne Wände. Sehr gesellig. 🚽", "D Römer händ öffentlichi Toilette gha, Siite a Siite, ohni Wänd. Sehr gsellig. 🚽"],
  ["Mind the geese near the Capitol. They take guard duty very seriously. 🪿", "Achtung vor den Gänsen beim Kapitol. Die nehmen ihren Wachdienst sehr ernst. 🪿", "Obacht vor de Gäns bim Kapitol. Die nämed ihre Wachdienscht sehr ernscht. 🪿"],
  // sketches
  ["T-pillars of Göbekli Tepe", "T-Pfeiler von Göbekli Tepe", "T-Pfiler vo Göbekli Tepe"], ["The oldest monumental pillars we know: T-shaped stone figures with arms and belts carved on their sides. Some are over 5 m tall.", "Die ältesten bekannten Monumentalpfeiler: T-förmige Steinfiguren mit eingemeisselten Armen und Gürteln an den Seiten. Manche sind über 5 m hoch.", "Di eltischte bekannte Monumentalpfiler: T-förmigi Steifigure mit iigmeisslete Ärm und Gürtel a de Siite. Paar sind über 5 m höch."],
  ["Three terraces of brick and a long central stairway. The walls lean slightly inward and gently curve, so it looks even taller.", "Drei Terrassen aus Ziegeln und eine lange Mitteltreppe. Die Wände neigen sich leicht nach innen und wölben sich sanft, damit sie noch höher wirkt.", "Drü Terrasse us Ziegel und e langi Mittelstäge. D Wänd neiged sich liecht nach inne und wölbed sich sanft, damit si no höcher würkt."],
  ["The Grand Gallery", "Die Grosse Galerie", "D Gross Galerie"], ["Inside the Great Pyramid: an 8.6 m high corbelled gallery, every stone layer stepping a little further in until they almost meet.", "Im Inneren der Cheops-Pyramide: eine 8,6 m hohe Kraggewölbe-Galerie, jede Steinschicht ragt etwas weiter vor, bis sie sich fast treffen.", "Im Innere vo de Cheops-Pyramide: e 8,6 m höchi Kraggwölb-Galerie, jedi Steischicht ragt chli wiiter vor, bis si sich fascht träffed."],
  ["Doric columns with entasis", "Dorische Säulen mit Entasis", "Dorischi Süüle mit Entasis"], ["Each column swells slightly in the middle and leans a little inward. Optical corrections to make stone look alive and perfectly straight.", "Jede Säule schwillt in der Mitte leicht an und neigt sich etwas nach innen. Optische Korrekturen, damit der Stein lebendig und perfekt gerade wirkt.", "Jedi Süüle schwillt i de Mitti liecht aa und neigt sich chli nach inne. Optischi Korrekture, damit de Stei läbig und perfekt grad würkt."],
  ["The Pantheon's oculus", "Das Opaion des Pantheons", "S Opaion vom Pantheon"], ["A 43.3 m dome with an 8.2 m hole at the top. The concrete gets lighter towards the top, with pumice mixed in. The sunlight wanders across the coffers like a clock.", "Eine 43,3-m-Kuppel mit einem 8,2 m grossen Loch oben. Der Beton wird nach oben leichter, mit beigemischtem Bimsstein. Das Sonnenlicht wandert wie eine Uhr über die Kassetten.", "E 43,3-m-Kupple mit emne 8,2 m grosse Loch obe. De Beton wird nach obe liechter, mit biigmischtem Bimsstei. S Sunneliecht wanderet wie e Uhr über d Kassette."],
  // speakers
  ["Hunter", "Jäger", "Jäger"], ["Farmer", "Bäuerin", "Püürin"], ["Potter", "Töpfer", "Töpfer"], ["Fisher", "Fischer", "Fischer"], ["Teacher", "Lehrer", "Lehrer"], ["Wheelwright", "Wagner", "Wagner"], ["Sargon", "Sargon", "Sargon"], ["Utnapishtim", "Utnapischtim", "Utnapischtim"], ["Hammurabi", "Hammurapi", "Hammurapi"],
  ["Scribe", "Schreiber", "Schriiber"], ["Embalmer", "Einbalsamierer", "Iibalsamierer"], ["Ramesses II", "Ramses II.", "Ramses II."], ["Howard Carter", "Howard Carter", "Howard Carter"], ["Judge", "Kampfrichter", "Kampfrichter"], ["Pythia", "Pythia", "Pythia"], ["Citizen", "Bürger", "Bürger"], ["Messenger", "Bote", "Bote"],
  ["Leonidas", "Leonidas", "Leonidas"], ["Alexander", "Alexander", "Alexander"], ["Caesar", "Caesar", "Caesar"], ["Hannibal", "Hannibal", "Hannibal"], ["Helvetian", "Helvetier", "Helvetier"], ["Pompeian", "Pompejaner", "Pompejaner"], ["Pliny", "Plinius", "Plinius"], ["Romulus Augustulus", "Romulus Augustulus", "Romulus Augustulus"],
  ["Monk", "Mönch", "Mönch"], ["Humbaba", "Humbaba", "Humbaba"], ["Priest", "Priester", "Priester"], ["Vigil", "Vigil", "Vigil"],
  // world texts
  ["Those are the sacred geese of Juno! Legend says they once saved Rome. 🪿", "Das sind die heiligen Gänse der Juno! Der Legende nach haben sie einst Rom gerettet. 🪿", "Das sind di heilige Gäns vo de Juno! D Legände seit, si heiged mal Rom grettet. 🪿"],
  ["EWW! 4,000-year-old lion poop!", "IGITT! 4000 Jahre alter Löwenkot!", "GRUUSIG! 4000 Jahr alts Löiegaggi!"], ["Lion poop. In Mesopotamia. Some things never change, Sarah. 🤢", "Löwenkot. In Mesopotamien. Manche Dinge ändern sich nie, Sarah. 🤢", "Löiegaggi. Z Mesopotamie. Paar Sache ändered sich nie, Sarah. 🤢"],
  ["Baa! 🐐", "Mäh! 🐐", "Mäh! 🐐"], ["Boar!", "Wildschwein!", "Wildsau!"], ["ROAR!", "ROAR!", "ROAR!"], ["SNAP!", "SCHNAPP!", "SCHNAPP!"], ["HONK!", "SCHNATTER!", "SCHNADER!"],
  ["All three goats in the pen! Milk, wool and cheese forever. Tell the farmer! 🐐", "Alle drei Ziegen im Gehege! Milch, Wolle und Käse für immer. Sag es der Bäuerin! 🐐", "Alli drü Geisse im Gheg! Milch, Wulle und Chäs für immer. Säg s de Püürin! 🐐"],
  ["The einkorn is ripe! Golden and wobbly. Time to harvest. 🌾", "Das Einkorn ist reif! Golden und wackelig. Zeit für die Ernte. 🌾", "S Einkorn isch riif! Guldig und waggelig. Ziit für d Ernte. 🌾"],
  ["Home! AD 2026. Running water, cherries, and nobody wants to wrestle me.", "Zuhause! 2026 n. Chr. Fliessendes Wasser, Kirschen, und niemand will mit mir ringen.", "Dihei! 2026 n. Chr. Fliessends Wasser, Chriesi, und niemer wott mit mir ringe."],
  ["The portal stone in the Höllgrotten will take us back whenever you like. ⏳", "Der Portalstein in den Höllgrotten bringt uns zurück, wann immer du willst. ⏳", "De Portalstei i de Höllgrotte bringt üs zrugg, wänn immer du wottsch. ⏳"],
  ["Whoa. A ring of standing stones, deep inside the Höllgrotten... and it's humming.", "Wow. Ein Steinkreis, tief in den Höllgrotten... und er summt.", "Wow. En Steichreis, tüüf i de Höllgrotte... und er summet."],
  ["They're carved. Foxes, boars, vultures... This looks like Göbekli Tepe. That's 11,000 years old!", "Sie sind verziert. Füchse, Wildschweine, Geier... Das sieht aus wie Göbekli Tepe. Das ist 11'000 Jahre alt!", "Si sind verziert. Füchs, Wildsäu, Geier... Das gseht us wie Göbekli Tepe. Das isch 11'000 Jahr alt!"],
  ["Only one way to find out where it leads. Hold my hand? ⏳", "Nur ein Weg, um herauszufinden, wohin er führt. Nimmst du meine Hand? ⏳", "Nur ei Wäg zum usefinde, wo s ane gaht. Nimmsch mini Hand? ⏳"], ["Always.", "Immer.", "Immer."],
  ["The stones are humming again. Back to {0}?", "Die Steine summen wieder. Zurück nach: {0}?", "D Stei summed wieder. Zrugg is: {0}?"],
  // quests & portal
  ["Help the hunters raise the pillar at Göbekli Tepe", "Hilf den Jägern, den Pfeiler in Göbekli Tepe aufzurichten", "Hilf de Jäger, de Pfiler z Göbekli Tepe ufzstelle"], ["Help the farmer at Çatalhöyük", "Hilf der Bäuerin bei Çatalhöyük", "Hilf de Püürin bi Çatalhöyük"],
  ["Sketch the T-pillars of Göbekli Tepe", "Skizziere die T-Pfeiler von Göbekli Tepe", "Skizzier d T-Pfiler vo Göbekli Tepe"], ["Wrestle Gilgamesh at the gate of Uruk", "Ringe mit Gilgamesch am Tor von Uruk", "Ring mit em Gilgamesch am Tor vo Uruk"],
  ["Face Humbaba in the Cedar Forest", "Stelle dich Humbaba im Zedernwald", "Stell di em Humbaba im Zederewald"], ["Learn cuneiform in the tablet house", "Lerne Keilschrift im Tafelhaus", "Lern Keilschrift im Tafelhuus"],
  ["Sneak into the Ziggurat of Ur and sketch", "Schleich dich in die Zikkurat von Ur und skizziere", "Schliich di i d Zikkurat vo Ur und skizzier"], ["Help Imhotep build the Step Pyramid", "Hilf Imhotep, die Stufenpyramide zu bauen", "Hilf em Imhotep, d Stufepyramide z baue"],
  ["Write your name in hieroglyphs at Karnak", "Schreib deinen Namen in Hieroglyphen in Karnak", "Schriib din Name i Hieroglyphe z Karnak"], ["Sneak into the Great Pyramid and sketch", "Schleich dich in die Cheops-Pyramide und skizziere", "Schliich di i d Cheops-Pyramide und skizzier"],
  ["Run the stadion race at Olympia", "Lauf das Stadionrennen in Olympia", "Renn s Stadionrenne z Olympia"], ["Run from Marathon to Athens", "Lauf von Marathon nach Athen", "Renn vo Marathon uf Athen"], ["Sneak into the Parthenon and sketch", "Schleich dich in den Parthenon und skizziere", "Schliich di in Parthenon und skizzier"],
  ["Guide Hannibal's elephant over the Alps", "Führe Hannibals Elefanten über die Alpen", "Füehr em Hannibal sin Elefant über d Alpe"], ["Escape from Pompeii", "Flucht aus Pompeji", "Flucht us Pompeji"], ["Sneak into the Pantheon and sketch", "Schleich dich ins Pantheon und skizziere", "Schliich di is Pantheon und skizzier"],
  ["Onward to: {0} ({1})", "Weiter nach: {0} ({1})", "Wiiter zu: {0} ({1})"], ["Onward to: the Middle Ages (AD 529)", "Weiter ins Mittelalter (529 n. Chr.)", "Wiiter is Mittelalter (529 n. Chr.)"], ["Travel to: {0} ({1})", "Reise nach: {0} ({1})", "Reis zu: {0} ({1})"],
  ["Home to Baar (AD 2026)", "Heim nach Baar (2026 n. Chr.)", "Hei uf Baar (2026 n. Chr.)"], ["Stay here", "Hierbleiben", "Dabliibe"], ["THE PORTAL STONE", "DER PORTALSTEIN", "DE PORTALSTEI"],
  ["The portal stone is still cold. It wakes up once we understand this era. Still to do:", "Der Portalstein ist noch kalt. Er erwacht, sobald wir diese Epoche verstehen. Noch zu tun:", "De Portalstei isch no chalt. Er verwachet, sobald mer die Epoche verstönd. No z tue:"],
  ["Go to the palace in Ravenna. Something big happens there in 476.", "Geh zum Palast in Ravenna. Dort passiert 476 etwas Grosses.", "Gang zum Palascht z Ravenna. Det passiert 476 öppis Grosses."],
  // minigames
  ["[A]: try again   ·   B: leave", "[A]: nochmal   ·   B: aufhören", "[A]: nomal   ·   B: ufhöre"], ["Miss!", "Daneben!", "Dänäbe!"],
  ["RAISE THE PILLAR", "RICHTE DEN PFEILER AUF", "STELL DE PFILER UF"], ["Pull together! Press [A] when the marker is in the green zone.", "Alle zusammen ziehen! Drück [A], wenn die Markierung im grünen Bereich ist.", "Alli zäme zieh! Drück [A], wenn d Markierig im grüene Bereich isch."],
  ["WRESTLE GILGAMESH", "RINGE MIT GILGAMESCH", "RING MIT EM GILGAMESCH"], ["Push! [A] in the green zone. A miss lets Gilgamesh push back. 3 misses and you're down.", "Drück! [A] im grünen Bereich. Bei einem Fehler drückt Gilgamesch zurück. 3 Fehler und du liegst.", "Drück! [A] im grüene Bereich. Bimne Fehler drückt de Gilgamesch zrugg. 3 Fehler und du liisch am Bode."],
  ["THE STADION RACE, 776 BC", "DAS STADIONRENNEN, 776 V. CHR.", "S STADIONRENNE, 776 V. CHR."], ["Sprint! Press [A] in the green zone with every stride. Beat the men to the line!", "Sprint! Drück [A] bei jedem Schritt im grünen Bereich. Schlag die Männer bis zur Ziellinie!", "Sprint! Drück [A] bi jedem Schritt im grüene Bereich. Schlah d Manne bis is Ziel!"],
  ["The pillar stands! 🗿", "Der Pfeiler steht! 🗿", "De Pfiler staht! 🗿"], ["A draw! New best friends. 🤝", "Unentschieden! Neue beste Freunde. 🤝", "Unentschide! Neui beschti Fründ. 🤝"], ["FIRST! 🏅🫒", "ERSTE! 🏅🫒", "ERSCHTI! 🏅🫒"],
  ["Beaten by a beard. Again!", "Um eine Bartlänge geschlagen. Nochmal!", "Um e Bartlängi gschlage. Nomal!"], ["Pinned! Try again.", "Auf die Matte gedrückt! Nochmal.", "Uf d Matte drückt! Nomal."], ["The pillar slipped back down!", "Der Pfeiler ist zurückgerutscht!", "De Pfiler isch zruggrutscht!"],
  ["MARATHON → ATHENS, 490 BC", "MARATHON → ATHEN, 490 V. CHR.", "MARATHON → ATHEN, 490 V. CHR."], ["← → steer · [A] jump over rocks · dodge the goats!", "← → lenken · [A] über Steine springen · den Ziegen ausweichen!", "← → stüüre · [A] über Stei gumpe · de Geisse uswiiche!"],
  ["OVER THE ALPS, 218 BC", "ÜBER DIE ALPEN, 218 V. CHR.", "ÜBER D ALPE, 218 V. CHR."], ["← → steer Surus · [A] jump over rocks · avoid crevasses and snowballs!", "← → Surus lenken · [A] über Steine springen · Spalten und Schneebällen ausweichen!", "← → de Surus stüüre · [A] über Stei gumpe · Spalte und Schneebälle uswiiche!"],
  ["ESCAPE FROM POMPEII, AD 79", "FLUCHT AUS POMPEJI, 79 N. CHR.", "FLUCHT US POMPEJI, 79 N. CHR."], ["← → run · [A] jump over columns · stay out of the pumice shadows!", "← → rennen · [A] über Säulen springen · weg von den Bimsstein-Schatten!", "← → renne · [A] über Süüle gumpe · wäg vo de Bimsstei-Schatte!"],
  ["Ouch! Jump next time!", "Autsch! Nächstes Mal springen!", "Au! S nächscht Mal gumpe!"], ["A goat! Baa! 🐐", "Eine Ziege! Mäh! 🐐", "E Geiss! Mäh! 🐐"], ["Crevasse! Careful! ❄️", "Gletscherspalte! Vorsicht! ❄️", "Gletscherspalte! Obacht! ❄️"], ["Snowball! ☃️", "Schneeball! ☃️", "Schneeball! ☃️"],
  ["Pumice! Ow! 🌋", "Bimsstein! Aua! 🌋", "Bimsstei! Au! 🌋"], ["Cart crash! 🛒", "Karrenunfall! 🛒", "Charreunfall! 🛒"], ["Athens! \"We have won!\" 🏛️", "Athen! \"Wir haben gesiegt!\" 🏛️", "Athen! \"Mir händ gwunne!\" 🏛️"],
  ["Italy! Surus made it! 🐘", "Italien! Surus hat es geschafft! 🐘", "Italie! De Surus hets gschafft! 🐘"], ["The harbour! Saved! ⛵", "Der Hafen! Gerettet! ⛵", "De Hafe! Grettet! ⛵"], ["{0} collected: {1}", "{0} gesammelt: {1}", "{0} gsammlet: {1}"],
  ["Out of breath!", "Ausser Atem!", "Kei Schnuuf meh!"], ["Surus refuses to go on!", "Surus weigert sich weiterzugehen!", "De Surus wott nümme wiiter!"], ["Too much ash! Run!", "Zu viel Asche! Renn!", "Z vill Äsche! Renn!"],
  ["Write: 5 sheep", "Schreibe: 5 Schafe", "Schriib: 5 Schaf"], ["Write: 12 jars of beer", "Schreibe: 12 Krüge Bier", "Schriib: 12 Chrüeg Bier"], ["Write: 23 sacks of barley", "Schreibe: 23 Säcke Gerste", "Schriib: 23 Säck Gerschte"],
  ["sheep", "Schaf", "Schaf"], ["beer", "Bier", "Bier"], ["barley", "Gerste", "Gerschte"],
  ["That says {0}, not {1}. Each ▼ is 1, each ◀ is 10.", "Da steht {0}, nicht {1}. Jedes ▼ ist 1, jedes ◀ ist 10.", "Da staht {0}, nöd {1}. Jedes ▼ isch 1, jedes ◀ isch 10."],
  ["Right number, but scribes write ten as ONE corner wedge ◀. Smooth the clay and try again.", "Richtige Zahl, aber Schreiber schreiben zehn als EINEN Winkelhaken ◀. Glätte den Ton und versuch es nochmal.", "Richtigi Zahl, aber Schriiber schriibed zäh als EIS Winkelhäkli ◀. Glätt de Ton und probiers nomal."],
  ["That sign means \"{0}\". Look again!", "Dieses Zeichen bedeutet \"{0}\". Schau nochmal!", "Das Zeiche heisst \"{0}\". Lueg nomal!"], ["THE TABLET HOUSE (EDUBA)", "DAS TAFELHAUS (EDUBA)", "S TAFELHUUS (EDUBA)"], ["Tablet {0}/3", "Tafel {0}/3", "Tafele {0}/3"],
  ["▼ Vertical wedge = 1", "▼ Senkrechter Keil = 1", "▼ Senkrächte Keil = 1"], ["◀ Corner wedge = 10", "◀ Winkelhaken = 10", "◀ Winkelhäkli = 10"], ["⌫ Smooth the clay", "⌫ Ton glätten", "⌫ Ton glätte"], ["✓ Done: now the sign", "✓ Fertig: jetzt das Zeichen", "✓ Fertig: jetzt s Zeiche"],
  ["Which sign means \"{0}\"? ◀ ▶ + [A]", "Welches Zeichen bedeutet \"{0}\"? ◀ ▶ + [A]", "Weles Zeiche heisst \"{0}\"? ◀ ▶ + [A]"], ["Sign {0}/3", "Zeichen {0}/3", "Zeiche {0}/3"],
  ["✓ Perfect bookkeeping! The temple storehouse thanks you.", "✓ Perfekte Buchhaltung! Das Tempellager dankt dir.", "✓ Perfekti Buechhaltig! S Tämpellager dankt dir."], ["[A]: next tablet", "[A]: nächste Tafel", "[A]: nächschti Tafele"],
  ["Scribe of Uruk! ✍️", "Schreiberin von Uruk! ✍️", "Schriiberin vo Uruk! ✍️"], ["Writing began as bookkeeping: grain, sheep and beer. Stories and laws came later.", "Die Schrift begann als Buchhaltung: Getreide, Schafe und Bier. Geschichten und Gesetze kamen später.", "D Schrift het als Buechhaltig aagfange: Getreid, Schaf und Bier. Gschichte und Gsetz sind spöter cho."],
  ["vulture", "Geier", "Geier"], ["reed", "Schilfblatt", "Schilfblatt"], ["basket", "Korb", "Chorb"], ["mouth", "Mund", "Muul"], ["folded cloth", "gefaltetes Tuch", "gfaltets Tuech"], ["twisted flax", "gedrehter Flachs", "drülltä Flachs"], ["lion", "Löwe", "Löi"], ["water", "Wasser", "Wasser"], ["owl", "Eule", "Üüle"], ["bread", "Brot", "Brot"],
  ["That's the {0} = {1}. We need the sound {2}.", "Das ist {0} = {1}. Wir brauchen den Laut {2}.", "Das isch {0} = {1}. Mer bruuched de Luut {2}."], ["WRITE IN A CARTOUCHE", "SCHREIB IN EINE KARTUSCHE", "SCHRIIB IN E KARTUSCHE"], ["Spell: {0}", "Schreibe: {0}", "Schriib: {0}"],
  ["Next sound: {0}   ·   arrows + [A]", "Nächster Laut: {0}   ·   Pfeile + [A]", "Nächschte Luut: {0}   ·   Pfiil + [A]"], ["No C or E in Egyptian: K-R-I-A-L. The lion stands for L, as in CLEOPATRA.", "Kein C und kein E im Ägyptischen: K-R-I-A-L. Der Löwe steht für L, wie in KLEOPATRA.", "Kei C und kei E im Ägyptische: K-R-I-A-L. De Löi staht für L, wie i KLEOPATRA."],
  ["✓ {0}, written for eternity!", "✓ {0}, für die Ewigkeit geschrieben!", "✓ {0}, für d Ewigkeit gschribe!"], ["Scribe of Karnak! 👁️", "Schreiberin von Karnak! 👁️", "Schriiberin vo Karnak! 👁️"],
  ["Hieroglyphs mix sound signs and word signs. A ring around a name, the cartouche, marks it as royal.", "Hieroglyphen mischen Lautzeichen und Wortzeichen. Ein Ring um einen Namen, die Kartusche, kennzeichnet ihn als königlich.", "Hieroglyphe mischled Luutzeiche und Wortzeiche. En Ring um en Name, d Kartusche, zeichnet ne als königlich."],
  ["Well done! ✓", "Gut gemacht! ✓", "Guet gmacht! ✓"], ["Perfect fit! ✨", "Passt perfekt! ✨", "Passt perfekt! ✨"], ["THE STEP PYRAMID OF DJOSER, ~2650 BC", "DIE STUFENPYRAMIDE DES DJOSER, UM 2650 V. CHR.", "D STUFEPYRAMIDE VOM DJOSER, UM 2650 V. CHR."], ["Mastaba {0}/6", "Mastaba {0}/6", "Mastaba {0}/6"],
  ["[A]: lower the block. Stack 6 mastabas, each a bit smaller!", "[A]: Block absenken. Staple 6 Mastabas, jede etwas kleiner!", "[A]: Block abela. Stapl 6 Mastabas, jedi chli chliiner!"], ["Six steps to the sky! 🏗️", "Sechs Stufen zum Himmel! 🏗️", "Sächs Stufe zum Himmel! 🏗️"],
  ["The first pyramid, and the oldest big stone building in the world. Imhotep was later worshipped as a god of wisdom.", "Die erste Pyramide und der älteste grosse Steinbau der Welt. Imhotep wurde später als Gott der Weisheit verehrt.", "Di erscht Pyramide und de eltischt gross Steibau vo de Wält. De Imhotep isch spöter als Gott vo de Wiisheit verehrt worde."],
  ["CRASH! Back to the quarry.", "KRACH! Zurück in den Steinbruch.", "CHRACH! Zrugg in Steibruch."], ["An aura fades! ✨", "Eine Aura erlischt! ✨", "E Aura verlöscht! ✨"], ["HUMBABA, GUARDIAN OF THE CEDAR FOREST", "HUMBABA, WÄCHTER DES ZEDERNWALDS", "HUMBABA, WÄCHTER VOM ZEDEREWALD"], ["Auras: {0}", "Auren: {0}", "Aure: {0}"],
  ["← → move · [A] rope-skip over shockwaves · dodge the cones · catch the fading auras!", "← → bewegen · [A] über Schockwellen seilspringen · Zapfen ausweichen · erlöschende Auren fangen!", "← → bewege · [A] über Schockwälle seilgumpe · Zäpfe uswiiche · verlöschendi Aure fange!"],
  ["Humbaba is calm. 🌲", "Humbaba ist ruhig. 🌲", "De Humbaba isch ruehig. 🌲"], ["In the epic, Gilgamesh and Enkidu slay Humbaba and cut the cedars: a story about ambition and its price. Sarah prefers a calmer ending.", "Im Epos töten Gilgamesch und Enkidu Humbaba und fällen die Zedern: eine Geschichte über Ehrgeiz und seinen Preis. Sarah bevorzugt ein ruhigeres Ende.", "Im Epos töded de Gilgamesch und de Enkidu de Humbaba und fälled d Zedere: e Gschicht über Ehrgiiz und sin Priis. D Sarah het lieber es ruehigers Änd."],
  ["Humbaba roars you out of the forest!", "Humbaba brüllt dich aus dem Wald!", "De Humbaba brüelet di us em Wald!"], ["Hee hee hee! 🐾", "Hi hi hi! 🐾", "Hi hi hi! 🐾"], ["SKETCHING GÖBEKLI TEPE", "GÖBEKLI TEPE SKIZZIEREN", "GÖBEKLI TEPE SKIZZIERE"],
  ["Hold [A] to sketch. When the hyena turns around, let go and freeze!", "Halte [A] zum Skizzieren. Wenn sich die Hyäne umdreht: loslassen und erstarren!", "Heb [A] zum Skizziere. Wenn d Hyäne sich umdrüllt: loslah und versteinere!"], ["Sketched! ✏️", "Skizziert! ✏️", "Skizziert! ✏️"],
  ["T-shaped pillars, 11,600 years old, with arms, hands and belts carved on them: maybe ancestors, maybe spirits.", "T-förmige Pfeiler, 11'600 Jahre alt, mit eingemeisselten Armen, Händen und Gürteln: vielleicht Ahnen, vielleicht Geister.", "T-förmigi Pfiler, 11'600 Jahr alt, mit iigmeisslete Ärm, Händ und Gürtel: vilicht Ahne, vilicht Geischter."],
  ["✏️ Sketched: {0}", "✏️ Skizziert: {0}", "✏️ Skizziert: {0}"], ["Do you hear that humming? The portal stone is awake! ⏳", "Hörst du das Summen? Der Portalstein ist erwacht! ⏳", "Ghörsch das Summe? De Portalstei isch verwachet! ⏳"],
  ["All done in Rome! Now to Ravenna: AD 476. I have an appointment there. 😇", "Alles erledigt in Rom! Jetzt nach Ravenna: 476 n. Chr. Ich habe dort einen Termin. 😇", "Alles erledigt z Rom! Jetzt uf Ravenna: 476 n. Chr. Ich ha det en Termin. 😇"],
  // break-ins
  ["The Ziggurat of Ur, the shrine of Nanna", "Die Zikkurat von Ur, das Heiligtum des Nanna", "D Zikkurat vo Ur, s Heiligtum vom Nanna"], ["Halt! Only priests may enter the house of the moon god Nanna!", "Halt! Nur Priester dürfen das Haus des Mondgottes Nanna betreten!", "Halt! Nur Priester dörfed is Huus vom Mondgott Nanna!"],
  ["Got it! The ziggurat, sketched. ✏️", "Geschafft! Die Zikkurat, skizziert. ✏️", "Gschafft! D Zikkurat, skizziert. ✏️"], ["The terraces lean slightly inward and the walls bulge gently: the builders of Ur already used optical tricks.", "Die Terrassen neigen sich leicht nach innen und die Wände wölben sich sanft: Die Baumeister von Ur nutzten schon optische Tricks.", "D Terrasse neiged sich liecht nach inne und d Wänd wölbed sich sanft: D Baumeischter vo Ur händ scho optischi Tricks bruucht."],
  ["Now out, before Nanna notices...", "Jetzt raus, bevor Nanna etwas merkt...", "Jetzt use, bevor de Nanna öppis merkt..."], ["Intruder! The resting place of Khufu is sacred!", "Eindringling! Die Ruhestätte des Cheops ist heilig!", "Iidringling! D Ruehestätt vom Cheops isch heilig!"],
  ["The Grand Gallery! 8.6 metres high, built 4,500 years ago. ✏️", "Die Grosse Galerie! 8,6 Meter hoch, vor 4500 Jahren gebaut. ✏️", "D Gross Galerie! 8,6 Meter höch, vor 4500 Jahr baut. ✏️"],
  ["Corbelling: every layer of stone sticks out a little further, until the two walls almost meet. No arch needed.", "Kraggewölbe: Jede Steinschicht ragt etwas weiter vor, bis sich die beiden Wände fast berühren. Kein Bogen nötig.", "Kraggwölb: Jedi Steischicht ragt chli wiiter vor, bis sich di beide Wänd fascht berüehred. Kei Boge nötig."],
  ["Quietly now... back into the sun.", "Jetzt leise... zurück in die Sonne.", "Jetzt liislig... zrugg a d Sunne."], ["The Parthenon, by night", "Der Parthenon bei Nacht", "De Parthenon znacht"],
  ["Stop! The temple of Athena is closed at night. By order of Pericles!", "Halt! Der Tempel der Athene ist nachts geschlossen. Auf Befehl des Perikles!", "Halt! De Tämpel vo de Athene isch znacht zue. Uf Befehl vom Perikles!"],
  ["Doric columns with entasis: they swell just a little in the middle. ✏️", "Dorische Säulen mit Entasis: Sie schwellen in der Mitte nur ein klein wenig an. ✏️", "Dorischi Süüle mit Entasis: Si schwelled i de Mitti nur es chliises bitzeli aa. ✏️"],
  ["Phidias' 12 m Athena Parthenos stood here, made of gold and ivory. The temple floor even curves upward by a few centimetres.", "Hier stand die 12 m hohe Athena Parthenos des Phidias, aus Gold und Elfenbein. Sogar der Tempelboden wölbt sich um einige Zentimeter nach oben.", "Da isch em Phidias sini 12 m höchi Athena Parthenos gstande, us Gold und Elfebei. Sogar de Tämpelbode wölbt sich es paar Zentimeter nach obe."],
  ["Goodnight, Athena. Thanks for the inspiration.", "Gute Nacht, Athene. Danke für die Inspiration.", "Guet Nacht, Athene. Merci für d Inspiration."], ["The Pantheon, by night", "Das Pantheon bei Nacht", "S Pantheon znacht"],
  ["Halt! Vigiles of Rome! No sightseeing at night!", "Halt! Vigiles von Rom! Keine Besichtigungen bei Nacht!", "Halt! Vigiles vo Rom! Kei Bsichtigunge znacht!"],
  ["The oculus... 8.2 metres wide, open to the sky. Moonlight on the coffers. ✏️", "Das Opaion... 8,2 Meter breit, offen zum Himmel. Mondlicht auf den Kassetten. ✏️", "S Opaion... 8,2 Meter breit, offe zum Himmel. Mondliecht uf de Kassette. ✏️"],
  ["The dome gets thinner and lighter towards the top: heavy stone below, light pumice concrete above. When it rains, tiny holes in the floor drain the water.", "Die Kuppel wird nach oben dünner und leichter: unten schwerer Stein, oben leichter Bimsbeton. Wenn es regnet, leiten kleine Löcher im Boden das Wasser ab.", "D Kupple wird nach obe dünner und liechter: unde schwäre Stei, obe liechte Bimsbeton. Wenns rägnet, leited chliini Löcher im Bode s Wasser ab."],
  ["Nineteen centuries old and still standing. Architects, take note.", "Neunzehn Jahrhunderte alt und steht immer noch. Architekten, aufgepasst.", "Nüünzäh Jahrhundert alt und staht immer no. Architekte, ufpasse."],
  // quizzes
  ["ÇATALHÖYÜK, ~7400 BC", "ÇATALHÖYÜK, UM 7400 V. CHR.", "ÇATALHÖYÜK, UM 7400 V. CHR."], ["Welcome home! 🪜", "Willkommen daheim! 🪜", "Willkomme dihei! 🪜"],
  ["Potter: \"Welcome to Çatalhöyük! How do you think you get into my house?\"", "Töpfer: \"Willkommen in Çatalhöyük! Was meinst du, wie man in mein Haus kommt?\"", "Töpfer: \"Willkomme z Çatalhöyük! Was meinsch, wie chunnt me i mis Huus?\""],
  ["Climb onto the roof and down a ladder through the hole", "Aufs Dach klettern und über eine Leiter durchs Loch hinunter", "Ufs Dach chlättere und über e Leitere dur s Loch abe"], ["Through the front door, like everyone", "Durch die Haustür, wie alle", "Dur d Huustüre, wie alli"],
  ["There are no front doors! The houses stand wall to wall, with no streets in between.", "Es gibt keine Haustüren! Die Häuser stehen Wand an Wand, ohne Strassen dazwischen.", "Es git kei Huustüre! D Hüser stönd Wand a Wand, ohni Strasse dezwüsche."], ["Through a secret tunnel", "Durch einen Geheimtunnel", "Dur en Gheimtunnel"],
  ["Nice idea, but no: everyone walks across the roofs and climbs in from above.", "Nette Idee, aber nein: Alle laufen über die Dächer und steigen von oben ein.", "Gueti Idee, aber nei: Alli laufed über d Dächer und stiiged vo obe ii."],
  ["THE STELE OF HAMMURABI", "DIE STELE DES HAMMURAPI", "D STELE VOM HAMMURAPI"], ["You know your ancient law! ⚖️", "Du kennst dich im antiken Recht aus! ⚖️", "Du kännsch di im antike Rächt us! ⚖️"],
  ["\"If a builder builds a house badly and it collapses and kills the owner, the builder shall be put to death.\" Real or made up?", "\"Wenn ein Baumeister ein Haus schlecht baut und es einstürzt und den Besitzer tötet, soll der Baumeister getötet werden.\" Echt oder erfunden?", "\"Wenn en Baumeischter es Huus schlächt baut und s iistürzt und de Bsitzer tödet, söll de Baumeischter tödet wärde.\" Echt oder erfunde?"],
  ["Real law (law 229)", "Echtes Gesetz (Gesetz 229)", "Echts Gsetz (Gsetz 229)"], ["Made up", "Erfunden", "Erfunde"], ["It's real! Law 229. Architects and builders, take note... 😬", "Es ist echt! Gesetz 229. Architekten und Baumeister, aufgepasst... 😬", "Es isch echt! Gsetz 229. Architekte und Baumeischter, ufpasse... 😬"],
  ["Real! Law 229. Sarah: \"Gulp. I'll double-check my structural calculations.\"", "Echt! Gesetz 229. Sarah: \"Schluck. Ich prüfe meine Statik doppelt.\"", "Echt! Gsetz 229. Sarah: \"Schluck. Ich prüef mini Statik doppelt.\""],
  ["\"An eye for an eye.\" Real or made up?", "\"Auge um Auge.\" Echt oder erfunden?", "\"Aug um Aug.\" Echt oder erfunde?"], ["Real law (law 196)", "Echtes Gesetz (Gesetz 196)", "Echts Gsetz (Gsetz 196)"],
  ["It's real: law 196. The punishment should match the crime (at least between equals).", "Es ist echt: Gesetz 196. Die Strafe soll der Tat entsprechen (zumindest unter Gleichgestellten).", "Es isch echt: Gsetz 196. D Strof söll de Tat entspreche (zmindescht under Glichgstellte)."],
  ["\"It is forbidden to fall asleep in a tavern.\" Real or made up?", "\"Es ist verboten, in einer Taverne einzuschlafen.\" Echt oder erfunden?", "\"Es isch verbote, inere Taverne iizschlafe.\" Echt oder erfunde?"], ["Real law", "Echtes Gesetz", "Echts Gsetz"],
  ["Made up! That one is from the weird laws of California, remember? 😄", "Erfunden! Das stammt von den verrückten Gesetzen Kaliforniens, weisst du noch? 😄", "Erfunde! Das isch vo de verruckte Gsetz vo Kalifornie, weisch no? 😄"], ["Made up! That sounds like California, not Babylon. 😄", "Erfunden! Das klingt nach Kalifornien, nicht nach Babylon. 😄", "Erfunde! Das tönt nach Kalifornie, nöd nach Babylon. 😄"],
  ["\"A tavern keeper who cheats on the price of beer shall be thrown into the water.\" Real or made up?", "\"Eine Schankwirtin, die beim Bierpreis betrügt, soll ins Wasser geworfen werden.\" Echt oder erfunden?", "\"E Wirtin, wo bim Bierpriis bschisst, söll is Wasser gworfe wärde.\" Echt oder erfunde?"],
  ["Real law (law 108)", "Echtes Gesetz (Gesetz 108)", "Echts Gsetz (Gsetz 108)"], ["Real! Law 108. Babylon took its beer prices very seriously. 🍺", "Echt! Gesetz 108. Babylon nahm seine Bierpreise sehr ernst. 🍺", "Echt! Gsetz 108. Babylon het sini Bierpriis sehr ernscht gnoh. 🍺"], ["Real! Law 108. Elio, please keep fair prices. 🍺", "Echt! Gesetz 108. Elio, bitte faire Preise. 🍺", "Echt! Gsetz 108. Elio, bitte faireri Priis. 🍺"],
  ["THE AGORA OF ATHENS", "DIE AGORA VON ATHEN", "D AGORA VO ATHEN"], ["A true philosopher! 🤔", "Eine wahre Philosophin! 🤔", "E wahri Philosophin! 🤔"], ["Socrates: \"Tell me, Sarah: what do you know for certain?\"", "Sokrates: \"Sag mir, Sarah: Was weisst du mit Sicherheit?\"", "Sokrates: \"Säg mer, Sarah: Was weisch sicher?\""],
  ["That I know that I know nothing", "Dass ich weiss, dass ich nichts weiss", "Dass ich weiss, dass ich nüt weiss"], ["Everything about architecture", "Alles über Architektur", "Alles über Architektur"],
  ["\"Then tell me: what IS a building? ...You see? Not so easy.\" (Socrates loved to show that people knew less than they thought.)", "\"Dann sag mir: Was IST ein Gebäude? ...Siehst du? Nicht so einfach.\" (Sokrates zeigte gern, dass die Leute weniger wussten, als sie dachten.)", "\"Denn säg mer: Was ISCH es Gebäud? ...Gsehsch? Nöd so eifach.\" (De Sokrates het gern zeigt, dass d Lüt weniger wüssed, als si meined.)"],
  ["My Wi-Fi password", "Mein WLAN-Passwort", "Mis WLAN-Passwort"], ["\"Your what-fi?\"", "\"Dein W-was?\"", "\"Dis W-was?\""], ["Socrates: \"Then you are wiser than most people in Athens!\"", "Sokrates: \"Dann bist du weiser als die meisten in Athen!\"", "Sokrates: \"Denn bisch du wiiser als di meischte z Athen!\""],
  ["How did Socrates teach?", "Wie lehrte Sokrates?", "Wie het de Sokrates glehrt?"], ["By asking questions", "Indem er Fragen stellte", "Indem er Frage gstellt het"], ["By writing many books", "Indem er viele Bücher schrieb", "Indem er vill Büecher gschribe het"],
  ["Socrates wrote nothing at all! We know him from his student Plato.", "Sokrates schrieb überhaupt nichts! Wir kennen ihn durch seinen Schüler Platon.", "De Sokrates het überhaupt nüt gschribe! Mer kenned ne dur sin Schüeler Platon."], ["By giving long lectures", "Mit langen Vorträgen", "Mit lange Vorträg"],
  ["No lectures: he asked question after question. It's called the Socratic method.", "Keine Vorträge: Er stellte Frage um Frage. Das nennt man die sokratische Methode.", "Kei Vorträg: Er het Frog um Frog gstellt. Das nennt me d sokratischi Methode."],
  ["Socrates: \"The unexamined life is not worth...?\"", "Sokrates: \"Ein ungeprüftes Leben ist nicht wert...?\"", "Sokrates: \"Es unprüefts Läbe isch nöd wert...?\""], ["...living", "...gelebt zu werden", "...gläbt z wärde"], ["...posting about", "...gepostet zu werden", "...postet z wärde"],
  ["\"Posting\"? I do not know this word. (He said: not worth living.)", "\"Posten\"? Dieses Wort kenne ich nicht. (Er sagte: nicht wert, gelebt zu werden.)", "\"Poste\"? Das Wort kenn ich nöd. (Er het gseit: nöd wert, gläbt z wärde.)"], ["...the taxes", "...die Steuern", "...d Stüüre"],
  ["Ha! No: \"...not worth living.\" Plato wrote it down in the Apology.", "Ha! Nein: \"...nicht wert, gelebt zu werden.\" Platon schrieb es in der Apologie auf.", "Ha! Nei: \"...nöd wert, gläbt z wärde.\" De Platon hets i de Apologie ufgschribe."],
  ["THE PNYX, ATHENS", "DIE PNYX, ATHEN", "D PNYX, ATHEN"], ["Democracy, Athenian style! 🗳️", "Demokratie auf athenische Art! 🗳️", "Demokratie uf athenischi Art! 🗳️"], ["Citizen: \"Who may vote in our assembly?\"", "Bürger: \"Wer darf in unserer Versammlung abstimmen?\"", "Bürger: \"Wer darf i üsere Versammlig abstimme?\""],
  ["Free adult men who are citizens", "Freie erwachsene Männer mit Bürgerrecht", "Frei erwachseni Manne mit Bürgerrächt"], ["Everyone who lives in Athens", "Alle, die in Athen wohnen", "Alli, wo z Athen wohned"],
  ["No: women, slaves and foreigners could not vote. Athens' democracy was for male citizens only.", "Nein: Frauen, Sklaven und Fremde durften nicht abstimmen. Athens Demokratie war nur für männliche Bürger.", "Nei: Fraue, Sklave und Frömdi händ nöd dörfe abstimme. D Demokratie vo Athen isch nur für männlichi Bürger gsi."], ["Only the rich", "Nur die Reichen", "Nur di Riiche"],
  ["Since Cleisthenes all male citizens could join the assembly, rich or poor.", "Seit Kleisthenes durften alle männlichen Bürger an der Versammlung teilnehmen, arm oder reich.", "Sit em Kleisthenes händ alli männliche Bürger a de Versammlig dörfe mitmache, arm oder riich."],
  ["\"And how do we send a dangerous politician away for 10 years?\"", "\"Und wie schicken wir einen gefährlichen Politiker für 10 Jahre fort?\"", "\"Und wie schicked mer en gfährliche Politiker für 10 Jahr furt?\""], ["We scratch his name on a pottery shard (ostrakon)", "Wir ritzen seinen Namen auf eine Tonscherbe (Ostrakon)", "Mer ritzed sin Name uf e Tonschärbe (Ostrakon)"],
  ["We throw him to the lions", "Wir werfen ihn den Löwen vor", "Mer rüered ne de Löie vor"], ["That's more of a Roman thing, and not how it worked. Ostracism used pottery shards.", "Das ist eher eine römische Sache und lief so nicht. Beim Scherbengericht nahm man Tonscherben.", "Das isch eher e römischi Sach und isch nöd so gloffe. Bim Schärbegricht het me Tonschärbe gno."],
  ["We write a mean review", "Wir schreiben eine gemeine Bewertung", "Mer schriibed e gmeini Bewärtig"], ["No: ostracism! At least 6,000 votes on pottery shards, and the \"winner\" had to leave for 10 years.", "Nein: das Scherbengericht! Mindestens 6000 Stimmen auf Tonscherben, und der \"Gewinner\" musste für 10 Jahre fort.", "Nei: s Schärbegricht! Mindeschtens 6000 Stimme uf Tonschärbe, und de \"Gwinner\" het für 10 Jahr müesse gah."],
  ["MUMMIFY A CAT FOR BASTET", "MUMIFIZIERE EINE KATZE FÜR BASTET", "MUMIFIZIER E CHATZ FÜR D BASTET"], ["Bastet is pleased. 🐈", "Bastet ist zufrieden. 🐈", "D Bastet isch zfriede. 🐈"], ["Put the embalming steps in the right order:", "Bring die Schritte der Einbalsamierung in die richtige Reihenfolge:", "Bring d Schritt vo de Iibalsamierig i di richtig Reihefolg:"],
  ["Wash the body with palm wine and Nile water", "Den Körper mit Palmwein und Nilwasser waschen", "De Körper mit Palmewii und Nilwasser wäsche"], ["Remove the organs into canopic jars (but leave the heart!)", "Die Organe in Kanopenkrüge legen (aber das Herz bleibt!)", "D Organ i Kanopechrüeg lege (aber s Härz blibt!)"],
  ["Cover it in natron salt for 40 days to dry", "40 Tage in Natronsalz trocknen", "40 Täg in Natronsalz tröchne"], ["Wrap it in linen bandages with amulets", "In Leinenbinden mit Amuletten wickeln", "I Liinebinde mit Amulett iiwickle"], ["Add a painted mask and place it in a coffin", "Eine bemalte Maske aufsetzen und in einen Sarg legen", "E bemaleti Maske ufsetze und in e Sarg lege"],
  // C-Real's roles
  ["Sarah! It's me! Well... today I'm Ötzi, the Iceman. Bearskin cap, grass cloak, copper axe.", "Sarah! Ich bin's! Na ja... heute bin ich Ötzi, der Mann aus dem Eis. Bärenfellmütze, Grasmantel, Kupferbeil.", "Sarah! Ich bis! Naja... hüt bin ich de Ötzi, de Maa us em Iis. Bärefellchappe, Grasmantel, Chupferbiil."],
  ["Ötzi?! Where... WHEN are we?", "Ötzi?! Wo... WANN sind wir?", "Ötzi?! Wo... WÄNN sind mer?"],
  ["Around 9600 BC, in the Fertile Crescent. Small problem: Ötzi lives around 3300 BC in the Alps. I'm 6,000 years early and 3,000 km off. 😅", "Um 9600 v. Chr., im Fruchtbaren Halbmond. Kleines Problem: Ötzi lebt um 3300 v. Chr. in den Alpen. Ich bin 6000 Jahre zu früh und 3000 km daneben. 😅", "Um 9600 v. Chr., im Fruchtbare Halbmond. Chliises Problem: De Ötzi läbt um 3300 v. Chr. i de Alpe. Ich bi 6000 Jahr z früeh und 3000 km dänäbe. 😅"],
  ["This map is the whole Neolithic: from Göbekli Tepe here in the east, past Çatalhöyük, to the lake villages and the Alps in the west.", "Diese Karte ist die ganze Jungsteinzeit: von Göbekli Tepe hier im Osten über Çatalhöyük bis zu den Seedörfern und den Alpen im Westen.", "Die Charte isch di ganz Jungsteiziit: vo Göbekli Tepe da im Oschte über Çatalhöyük bis zu de Seedörfer und de Alpe im Weschte."],
  ["The portal stone in the Alps takes us onward. It wakes up once we understand this era: help the hunters raise their pillar, help the farmer, and sketch Göbekli Tepe.", "Der Portalstein in den Alpen bringt uns weiter. Er erwacht, sobald wir diese Epoche verstehen: Hilf den Jägern mit ihrem Pfeiler, hilf der Bäuerin und skizziere Göbekli Tepe.", "De Portalstei i de Alpe bringt üs wiiter. Er verwachet, sobald mer die Epoche verstönd: Hilf de Jäger mit ihrem Pfiler, hilf de Püürin und skizzier Göbekli Tepe."],
  ["Grrr... Sarah! It's me. ENKIDU! The gods made me from clay to be Gilgamesh's equal.", "Grrr... Sarah! Ich bin's. ENKIDU! Die Götter formten mich aus Lehm, damit ich Gilgamesch ebenbürtig bin.", "Grrr... Sarah! Ich bis. ENKIDU! D Götter händ mi us Lehm gformt, damit ich em Gilgamesch ebebürtig bi."],
  ["You look... wilder than usual. Is that grass in your beard?", "Du siehst... wilder aus als sonst. Ist das Gras in deinem Bart?", "Du gsehsch... wilder us als süscht. Isch das Gras i dim Bart?"],
  ["I lived with the gazelles, ate grass, drank at the waterholes. Honestly not that different from my hippie years. 🌿", "Ich lebte mit den Gazellen, ass Gras, trank an den Wasserlöchern. Ehrlich gesagt nicht so anders als meine Hippie-Jahre. 🌿", "Ich ha mit de Gazelle gläbt, Gras gässe, a de Wasserlöcher trunke. Ehrlich gseit nöd so anders als mini Hippie-Jahr. 🌿"],
  ["Gilgamesh, king of Uruk, is too proud. Let's wrestle some humility into him, then go on an adventure to the Cedar Forest. Also: writing was just invented here!", "Gilgamesch, der König von Uruk, ist zu stolz. Ringen wir ihm etwas Demut ein, dann auf ins Abenteuer zum Zedernwald. Und: Hier wurde gerade die Schrift erfunden!", "De Gilgamesch, König vo Uruk, isch z stolz. Mer ringed em chli Demuet ii, denn ab is Abentüür zum Zederewald. Und: Da isch grad d Schrift erfunde worde!"],
  ["Sarah! Welcome to Saqqara. I am Imhotep, royal architect of Pharaoh Djoser. The first architect in history whose name we know. Colleague! 🤝", "Sarah! Willkommen in Sakkara. Ich bin Imhotep, königlicher Architekt von Pharao Djoser. Der erste Architekt der Geschichte, dessen Namen wir kennen. Kollegin! 🤝", "Sarah! Willkomme z Sakkara. Ich bi de Imhotep, königliche Architekt vom Pharao Djoser. De erscht Architekt vo de Gschicht, wo mer de Name kenned. Kollegin! 🤝"],
  ["Imhotep! The step pyramid guy! I wrote a paper on you in my first semester!", "Imhotep! Der Stufenpyramiden-Typ! Ich habe im ersten Semester eine Arbeit über dich geschrieben!", "Imhotep! De Stufepyramide-Typ! Ich ha im erschte Semester e Arbet über di gschribe!"],
  ["Kings are buried under flat mud-brick benches called mastabas. My idea: stack six of them. In STONE. Help me at the building site?", "Könige werden unter flachen Lehmziegelbänken begraben, den Mastabas. Meine Idee: sechs davon stapeln. Aus STEIN. Hilfst du mir auf der Baustelle?", "König wärded under flache Lehmziegelbänk begrabe, de Mastabas. Mini Idee: sächs devo staple. Us STEI. Hilfsch mer uf de Baustell?"],
  ["Sing, O Muse, of Sarah the architect! ...It's me, Homer. The bard. I sing the Iliad and the Odyssey, sometimes for three nights in a row. 🎶", "Singe, o Muse, von Sarah der Architektin! ...Ich bin's, Homer. Der Sänger. Ich singe die Ilias und die Odyssee, manchmal drei Nächte am Stück. 🎶", "Sing, o Muse, vo de Sarah, de Architektin! ...Ich bis, de Homer. De Sänger. Ich sing d Ilias und d Odyssee, mängisch drü Nächt am Stück. 🎶"],
  ["Homer! Did Troy really exist?", "Homer! Gab es Troja wirklich?", "Homer! Hets Troja würklich gä?"], ["Archaeologists think there really was a city, at Hisarlik in Turkey. The wooden horse? Poetic license. 😉", "Archäologen glauben, dass es wirklich eine Stadt gab, bei Hisarlik in der Türkei. Das hölzerne Pferd? Dichterische Freiheit. 😉", "Archäologe glaubed, dass es würklich e Stadt gä het, bi Hisarlik i de Türkei. S hölzig Ross? Dichterischi Freiheit. 😉"],
  ["It's 776 BC: the very first Olympic Games, right here! One problem: women may not compete.", "Es ist 776 v. Chr.: die allerersten Olympischen Spiele, genau hier! Ein Problem: Frauen dürfen nicht teilnehmen.", "Es isch 776 v. Chr.: di allererschte Olympische Spiel, grad da! Eis Problem: Fraue dörfed nöd mitmache."],  ["Exactly. I happen to have a spare tunic. And a fake beard. 😏", "Genau. Ich habe zufällig eine Ersatz-Tunika dabei. Und einen falschen Bart. 😏", "Genau. Ich ha zuefällig e Ersatz-Tunika debii. Und en falsche Bart. 😏"],
  ["Salve, Sarah! I am Odoacer, a Germanic warrior in the Roman army. Long hair, beard... the Romans call us barbarians. Rude.", "Salve, Sarah! Ich bin Odoaker, ein germanischer Krieger im römischen Heer. Lange Haare, Bart... die Römer nennen uns Barbaren. Frech.", "Salve, Sarah! Ich bi de Odoaker, en germanische Chrieger im römische Heer. Langi Haar, Bart... d Römer säged üs Barbare. Frech."],
  ["Odoacer? Isn't he the one who...", "Odoaker? Ist das nicht der, der...", "Odoaker? Isch das nöd dä, wo..."], ["Shh! No spoilers. Rome has 1,200 years of history: the she-wolf, Hannibal, Caesar, Pompeii... and the Pantheon, your dome dream.", "Pssst! Keine Spoiler. Rom hat 1200 Jahre Geschichte: die Wölfin, Hannibal, Caesar, Pompeji... und das Pantheon, dein Kuppeltraum.", "Pssst! Kei Spoiler. Rom het 1200 Jahr Gschicht: d Wölfin, Hannibal, Caesar, Pompeji... und s Pantheon, din Kuppletraum."],
  ["Do the big three: Hannibal in the Alps, Pompeii in the south, and the Pantheon. Then meet me in Ravenna. Something happens there in AD 476. 😇", "Erledige die grossen drei: Hannibal in den Alpen, Pompeji im Süden und das Pantheon. Dann triff mich in Ravenna. Dort passiert 476 n. Chr. etwas. 😇", "Erledig di grosse drü: Hannibal i de Alpe, Pompeji im Süde und s Pantheon. Denn triff mi z Ravenna. Det passiert 476 n. Chr. öppis. 😇"],
  ["The hunters up at Göbekli Tepe need help raising their last pillar. On the hill in the east!", "Die Jäger oben bei Göbekli Tepe brauchen Hilfe mit ihrem letzten Pfeiler. Auf dem Hügel im Osten!", "D Jäger obe bi Göbekli Tepe bruuched Hilf mit ihrem letschte Pfiler. Uf em Hügel im Oschte!"],
  ["The farmer near Çatalhöyük wants to show us something new: planting seeds. 🌾", "Die Bäuerin bei Çatalhöyük will uns etwas Neues zeigen: Samen pflanzen. 🌾", "D Püürin bi Çatalhöyük wott üs öppis Neus zeige: Some aapflanze. 🌾"],
  ["Those T-pillars at Göbekli Tepe are begging to be sketched, Sarah!", "Die T-Pfeiler von Göbekli Tepe wollen unbedingt skizziert werden, Sarah!", "Die T-Pfiler vo Göbekli Tepe wänd unbedingt skizziert wärde, Sarah!"],
  ["Gilgamesh is showing off at the gate of Uruk. Let's wrestle some humility into him.", "Gilgamesch gibt am Tor von Uruk an. Ringen wir ihm etwas Demut ein.", "De Gilgamesch plagiert am Tor vo Uruk. Mer ringed em chli Demuet ii."],
  ["Now: the Cedar Forest, north-west, across the Euphrates. Humbaba awaits. 🌲", "Jetzt: der Zedernwald, im Nordwesten, jenseits des Euphrat. Humbaba wartet. 🌲", "Jetzt: de Zederewald, im Nordweschte, änet em Euphrat. De Humbaba wartet. 🌲"],
  ["The tablet house (Eduba) in Uruk teaches the newest invention: writing! ✍️", "Das Tafelhaus (Eduba) in Uruk lehrt die neueste Erfindung: die Schrift! ✍️", "S Tafelhuus (Eduba) z Uruk lehrt di neuscht Erfindig: d Schrift! ✍️"],
  ["The Ziggurat of Ur, down south. Priests only... so, sneak in.", "Die Zikkurat von Ur, unten im Süden. Nur für Priester... also: reinschleichen.", "D Zikkurat vo Ur, dunne im Süde. Nur für Priester... also: ineschliiche."],
  ["My building site at Saqqara! Help me stack the mastabas. 🏗️", "Meine Baustelle in Sakkara! Hilf mir, die Mastabas zu stapeln. 🏗️", "Mini Baustell z Sakkara! Hilf mer, d Mastabas z staple. 🏗️"],
  ["The scribes at Karnak can teach you hieroglyphs. Take the ferry across the Nile at Thebes.", "Die Schreiber in Karnak können dir Hieroglyphen beibringen. Nimm die Fähre über den Nil bei Theben.", "D Schriiber z Karnak chönd dir Hieroglyphe biibringe. Nimm d Fähri über de Nil bi Theben."],
  ["The Great Pyramid at Giza, to the north. The Grand Gallery inside is a masterpiece.", "Die Cheops-Pyramide in Gizeh, im Norden. Die Grosse Galerie darin ist ein Meisterwerk.", "D Cheops-Pyramide z Gizeh, im Norde. D Gross Galerie drin isch es Meischterwärch."],
  ["The stadion at Olympia. The race is about to start! 🏃‍♀️", "Das Stadion in Olympia. Das Rennen beginnt gleich! 🏃‍♀️", "S Stadion z Olympia. S Renne fangt grad aa! 🏃‍♀️"], ["A messenger at Marathon, north-east of Athens, needs a fast runner.", "Ein Bote in Marathon, nordöstlich von Athen, braucht eine schnelle Läuferin.", "En Bote z Marathon, nordöstlich vo Athen, bruucht e schnälli Läuferin."],
  ["The Parthenon on the Acropolis. Night guards, but oh, those columns...", "Der Parthenon auf der Akropolis. Nachtwächter, aber oh, diese Säulen...", "De Parthenon uf de Akropolis. Nachtwächter, aber oh, die Süüle..."],
  ["Hannibal is camping in the Alps, up north. His elephant needs a guide. 🐘", "Hannibal lagert oben im Norden in den Alpen. Sein Elefant braucht eine Führerin. 🐘", "De Hannibal lageret obe im Norde i de Alpe. Sin Elefant bruucht e Füehrerin. 🐘"],
  ["Pompeii, south by the bay. That volcano doesn't look friendly. 🌋", "Pompeji, im Süden an der Bucht. Dieser Vulkan sieht nicht freundlich aus. 🌋", "Pompeji, im Süde a de Bucht. Dä Vulkan gseht nöd fründlich us. 🌋"],
  ["The Pantheon, right here in Rome. That dome! Sneak in at night.", "Das Pantheon, gleich hier in Rom. Diese Kuppel! Schleich dich nachts hinein.", "S Pantheon, grad da z Rom. Die Kupple! Schliich di znacht ine."],
  ["The portal stone is awake! It's in the Alps, far to the west. ⏳", "Der Portalstein ist erwacht! Er steht in den Alpen, weit im Westen. ⏳", "De Portalstei isch verwachet! Er staht i de Alpe, wiit im Weschte. ⏳"],
  ["The portal stone is awake! It stands near Babylon, in the north. ⏳", "Der Portalstein ist erwacht! Er steht bei Babylon, im Norden. ⏳", "De Portalstei isch verwachet! Er staht bi Babylon, im Norde. ⏳"],
  ["The portal stone is awake! It's in the delta, near Alexandria. ⏳", "Der Portalstein ist erwacht! Er steht im Delta, bei Alexandria. ⏳", "De Portalstei isch verwachet! Er staht im Delta, bi Alexandria. ⏳"],
  ["The portal stone is awake! It's in Macedonia, in the north-east. ⏳", "Der Portalstein ist erwacht! Er steht in Makedonien, im Nordosten. ⏳", "De Portalstei isch verwachet! Er staht z Makedonie, im Nordoschte. ⏳"],
  ["Everything done in Rome! Now to the palace in Ravenna, AD 476. I have an appointment there. 😇", "Alles erledigt in Rom! Jetzt zum Palast in Ravenna, 476 n. Chr. Ich habe dort einen Termin. 😇", "Alles erledigt z Rom! Jetzt zum Palascht z Ravenna, 476 n. Chr. Ich ha det en Termin. 😇"],
  ["The portal stone east of Ravenna leads into the Middle Ages. A monk is waiting with a test. 📖", "Der Portalstein östlich von Ravenna führt ins Mittelalter. Ein Mönch wartet mit einer Prüfung. 📖", "De Portalstei östlich vo Ravenna füehrt is Mittelalter. En Mönch wartet mit ere Prüefig. 📖"],
  ["Ten thousand years, one beautiful chronicle. Want to keep exploring? ⏳", "Zehntausend Jahre, eine wunderschöne Chronik. Willst du weiter erkunden? ⏳", "Zähtuusig Jahr, e wunderschöni Chronik. Wottsch wiiter erkunde? ⏳"],
  ["Welcome to MY time: about 3300 BC. Copper is the hot new technology. I'll die up here, by the way, and they'll find me in 1991. Very glamorous.", "Willkommen in MEINER Zeit: um 3300 v. Chr. Kupfer ist die heisse neue Technologie. Ich sterbe übrigens hier oben, und man findet mich 1991. Sehr glamourös.", "Willkomme i MINERE Ziit: um 3300 v. Chr. Chupfer isch di heiss neu Technologie. Ich stirb übrigens da obe, und me findet mi 1991. Sehr glamourös."],
  ["Have some wild figs. 🌿", "Nimm ein paar wilde Feigen. 🌿", "Nimm es paar wildi Fiige. 🌿"], ["Have some dates. 🌴", "Nimm ein paar Datteln. 🌴", "Nimm es paar Dattle. 🌴"], ["Have some dates and bread. 🍞", "Nimm Datteln und Brot. 🍞", "Nimm Dattle und Brot. 🍞"], ["Have some olives and cheese. 🫒", "Nimm Oliven und Käse. 🫒", "Nimm Olive und Chäs. 🫒"], ["Have some bread and olives. 🫒", "Nimm Brot und Oliven. 🫒", "Nimm Brot und Olive. 🫒"],
  // people of the past
  ["We hunt gazelles and gather wild grain. And up on the hill, we are building THIS. One pillar is still lying down. Help us at the enclosure!", "Wir jagen Gazellen und sammeln wildes Getreide. Und oben auf dem Hügel bauen wir DAS. Ein Pfeiler liegt noch. Hilf uns bei der Anlage!", "Mer jaged Gazelle und sammled wilds Getreid. Und obe uf em Hügel baued mer DAS. En Pfiler liit no. Hilf üs bi de Aalag!"],
  ["No farms, no metal, no writing. Just us, our stories and these stones. Our grandchildren's grandchildren will tell of them.", "Keine Höfe, kein Metall, keine Schrift. Nur wir, unsere Geschichten und diese Steine. Die Enkel unserer Enkel werden davon erzählen.", "Kei Höf, kei Metall, kei Schrift. Nur mir, üsi Gschichte und die Stei. D Änkel vo üsne Änkel wärded devo verzelle."],
  ["Look: a pot! Clay rolled into long coils, smoothed, then fired. Perfect for grain and porridge.", "Schau: ein Topf! Ton zu langen Würsten gerollt, geglättet, dann gebrannt. Perfekt für Getreide und Brei.", "Lueg: en Topf! Ton zu lange Würscht grollt, glättet, denn brönnt. Perfekt für Getreid und Brei."],
  ["No potter's wheel?", "Keine Töpferscheibe?", "Kei Töpferschiibe?"], ["A wheel? What would a wheel be good for?", "Ein Rad? Wozu soll ein Rad denn gut sein?", "Es Rad? Für was söll es Rad dänn guet si?"],
  ["Grüezi! We build our houses on stilts by the lake. Fish, fields, forest: everything is close.", "Grüezi! Wir bauen unsere Häuser auf Pfählen am See. Fisch, Felder, Wald: alles ist nah.", "Grüezi! Mer baued üsi Hüser uf Pfähl am See. Fisch, Fälder, Wald: alles isch nöch."],
  ["Grüezi?! ...wait, this is basically the Zugersee in 4300 BC!", "Grüezi?! ...Moment, das ist ja quasi der Zugersee um 4300 v. Chr.!", "Grüezi?! ...Momänt, das isch ja quasi de Zugersee um 4300 v. Chr.!"],
  ["In 2011 our villages become a UNESCO World Heritage Site. Don't ask me how I know.", "2011 werden unsere Dörfer UNESCO-Welterbe. Frag nicht, woher ich das weiss.", "2011 wärded üsi Dörfer UNESCO-Wälterbe. Frog nöd, woher ich das weiss."],
  ["I am Gilgamesh, king of Uruk! Two-thirds god, one-third human. Nobody can match me!", "Ich bin Gilgamesch, König von Uruk! Zwei Drittel Gott, ein Drittel Mensch. Niemand kommt mir gleich!", "Ich bi de Gilgamesch, König vo Uruk! Zwei Drittel Gott, eis Drittel Mänsch. Niemer chunnt mer glich!"],
  ["*growls* Wrestle me at the gate, then!", "*knurrt* Dann ring mit mir am Tor!", "*chnurret* Denn ring mit mir am Tor!"],
  ["Enkidu, my friend! Let's go to the Cedar Forest and make our names eternal! North-west, across the Euphrates!", "Enkidu, mein Freund! Lass uns zum Zedernwald gehen und unsere Namen unsterblich machen! Nach Nordwesten, über den Euphrat!", "Enkidu, min Fründ! Mer gönd zum Zederewald und mached üsi Näme unsterblich! Nach Nordweschte, über de Euphrat!"],
  ["Humbaba is calm, the cedars stand... I still want to live forever, though. Maybe old Utnapishtim at the river mouth knows how.", "Humbaba ist ruhig, die Zedern stehen... Trotzdem will ich ewig leben. Vielleicht weiss der alte Utnapischtim an der Flussmündung, wie.", "De Humbaba isch ruehig, d Zedere stönd... Trotzdem wott ich ewig läbe. Vilicht weiss de alt Utnapischtim a de Flussmündig, wie."],
  ["Welcome to the tablet house, the Eduba! Our scribes learn for years. Come inside, today we do bookkeeping!", "Willkommen im Tafelhaus, der Eduba! Unsere Schreiber lernen jahrelang. Komm herein, heute machen wir Buchhaltung!", "Willkomme im Tafelhuus, de Eduba! Üsi Schriiber lerned jahrelang. Chumm ine, hüt mached mer Buechhaltig!"],
  ["Our sons and daughters learn here. Yes, there were female scribes, too!", "Hier lernen unsere Söhne und Töchter. Ja, es gab auch Schreiberinnen!", "Da lerned üsi Söhn und Töchtere. Ja, es het au Schriiberinne gä!"],
  ["Uruk has temples, workshops, 40,000 people and walls 9 km long. And all of it needs bookkeeping.", "Uruk hat Tempel, Werkstätten, 40'000 Menschen und 9 km lange Mauern. Und alles braucht Buchhaltung.", "Uruk het Tämpel, Wärchstätte, 40'000 Mänsche und 9 km langi Muure. Und alles bruucht Buechhaltig."],
  ["First we used the wheel to make pots. Now I put two of them on a cart! The donkeys are not amused.", "Zuerst nutzten wir das Rad, um Töpfe zu machen. Jetzt baue ich zwei an einen Wagen! Die Esel sind nicht begeistert.", "Zerscht händ mer s Rad für Töpf bruucht. Jetzt bau ich zwei a en Wage! D Esel sind nöd begeischteret."],
  ["The wheel came thousands of years after farming. Who knew?", "Das Rad kam Tausende Jahre nach der Landwirtschaft. Wer hätte das gedacht?", "S Rad isch Tuusigi vo Jahr nach de Landwirtschaft cho. Wer hetti das dänkt?"],
  ["I am Sargon of Akkad. They say I was found as a baby in a basket on the river. Now I rule all of these cities: the first empire!", "Ich bin Sargon von Akkad. Man sagt, ich wurde als Baby in einem Korb auf dem Fluss gefunden. Jetzt herrsche ich über all diese Städte: das erste Grossreich!", "Ich bi de Sargon vo Akkad. Me seit, ich sig als Baby imene Chorb uf em Fluss gfunde worde. Jetzt regier ich über all die Städt: s erscht Grossriich!"],
  ["Long ago the gods sent a great flood. I built a boat, took my family and every kind of animal, and survived.", "Vor langer Zeit schickten die Götter eine grosse Flut. Ich baute ein Boot, nahm meine Familie und jede Art von Tier mit und überlebte.", "Vor langer Ziit händ d Götter e grossi Flut gschickt. Ich ha es Boot baut, mini Familie und jedi Art vo Tier mitgno und überläbt."],
  ["Gilgamesh came here looking for eternal life. He found a plant of youth... and a snake ate it while he was bathing.", "Gilgamesch kam hierher auf der Suche nach dem ewigen Leben. Er fand ein Kraut der Jugend... und eine Schlange frass es, während er badete.", "De Gilgamesch isch da ane cho, uf de Suechi nach em ewige Läbe. Er het es Chrut vo de Jugend gfunde... und e Schlange hets gfrässe, won er badet het."],
  ["So nobody lives forever.", "Also lebt niemand ewig.", "Also läbt niemer ewig."], ["No. But what you build, and the stories people tell about you, can last a very long time.", "Nein. Aber was du baust und die Geschichten, die man über dich erzählt, können sehr lange bleiben.", "Nei. Aber was du bausch und d Gschichte, wo me über di verzellt, chönd sehr lang blibe."],
  ["Come into the temple school! I'll show you how to write your name the royal way: in a cartouche.", "Komm in die Tempelschule! Ich zeige dir, wie man seinen Namen königlich schreibt: in einer Kartusche.", "Chumm i d Tämpelschuel! Ich zeig dir, wie me sin Name königlich schriibt: inere Kartusche."],
  ["Remember: some signs are sounds, some are whole words, and some only tell you what kind of word it is.", "Merke: Manche Zeichen sind Laute, manche ganze Wörter, und manche zeigen nur, was für ein Wort es ist.", "Merk dr: Paar Zeiche sind Lüt, paar ganzi Wörter, und paar zeiged nur, was für es Wort es isch."],
  ["I am Hatshepsut, pharaoh of Egypt. Yes, a woman. Yes, the beard is fake. It comes with the job.", "Ich bin Hatschepsut, Pharao von Ägypten. Ja, eine Frau. Ja, der Bart ist falsch. Der gehört zum Job.", "Ich bi d Hatschepsut, Pharao vo Ägypte. Ja, e Frau. Ja, de Bart isch falsch. Dä ghört zum Job."],
  ["My temple at Deir el-Bahari: terraces and colonnades against the cliffs. My architect Senenmut and I are rather proud.", "Mein Tempel in Deir el-Bahari: Terrassen und Säulengänge vor den Felsen. Mein Architekt Senenmut und ich sind ziemlich stolz.", "Min Tämpel z Deir el-Bahari: Terrasse und Süülegäng vor de Felse. Min Architekt Senenmut und ich sind ziemli stolz."],
  ["I am Ramesses the Great! At Kadesh I fought the Hittites... and then we made peace and wrote it down.", "Ich bin Ramses der Grosse! Bei Kadesch kämpfte ich gegen die Hethiter... und dann schlossen wir Frieden und schrieben ihn auf.", "Ich bi de Ramses de Gross! Bi Kadesch han ich gäge d Hethiter kämpft... und denn händ mer Fride gschlosse und ne ufgschribe."],
  ["One of the oldest peace treaties in the world. Better than any battle.", "Einer der ältesten Friedensverträge der Welt. Besser als jede Schlacht.", "Eine vo de eltischte Friedesverträg vo de Wält. Besser als jedi Schlacht."],
  ["I am Cleopatra, the last of the Ptolemies. I speak nine languages, including Egyptian. My family didn't bother for 300 years.", "Ich bin Kleopatra, die letzte der Ptolemäer. Ich spreche neun Sprachen, auch Ägyptisch. Meine Familie hatte sich 300 Jahre lang nicht darum bemüht.", "Ich bi d Kleopatra, di letscht vo de Ptolemäer. Ich red nüün Sprache, au Ägyptisch. Mini Familie het sich 300 Jahr lang nöd drum bemüeht."],
  ["Fun fact: you live closer in time to the Moon landing than to the building of the Great Pyramid.", "Fun Fact: Du lebst zeitlich näher an der Mondlandung als am Bau der Cheops-Pyramide.", "Fun Fact: Du läbsch ziitlich nöcher a de Mondlandig als am Bau vo de Cheops-Pyramide."], ["The what landing?", "Die was-Landung?", "Di was-Landig?"],
  ["A temple cat of Bastet has died. We will prepare her for the afterlife, the proper way. Will you help me?", "Eine Tempelkatze der Bastet ist gestorben. Wir bereiten sie richtig auf das Jenseits vor. Hilfst du mir?", "E Tämpelchatz vo de Bastet isch gstorbe. Mer bereited si richtig ufs Jensiits vor. Hilfsch mer?"],
  ["A cat mummy?! ...okay. For Bastet.", "Eine Katzenmumie?! ...okay. Für Bastet.", "E Chatzemumie?! ...okay. Für d Bastet."], ["Millions of animal mummies were made: cats, ibises, crocodiles... Bastet thanks you.", "Es wurden Millionen Tiermumien gemacht: Katzen, Ibisse, Krokodile... Bastet dankt dir.", "Es sind Millione Tiermumie gmacht worde: Chatze, Ibisse, Krokodil... D Bastet dankt dir."],
  ["Howard Carter, archaeologist. I'm looking for the tomb of a young pharaoh called Tutankhamun.", "Howard Carter, Archäologe. Ich suche das Grab eines jungen Pharaos namens Tutanchamun.", "Howard Carter, Archäolog. Ich sueche s Grab vomne junge Pharao, wo Tutanchamun heisst."],
  ["Mr Carter... you're about 3,200 years early. Come back in 1922. Trust me.", "Mr Carter... Sie sind etwa 3200 Jahre zu früh. Kommen Sie 1922 wieder. Vertrauen Sie mir.", "Mr Carter... Si sind öppe 3200 Jahr z früeh. Chömed Si 1922 wieder. Vertraued Si mir."],
  ["\"Wonderful things\"... I shall remember that phrase.", "\"Wunderbare Dinge\"... Diesen Satz werde ich mir merken.", "\"Wunderbari Sache\"... Dä Satz merk ich mir."],
  ["The stadion race is about to start! One length of the stadium. Men only, of course.", "Das Stadionrennen beginnt gleich! Eine Stadionlänge. Nur Männer, natürlich.", "S Stadionrenne fangt grad aa! E Stadionlängi. Nur Manne, natürli."], ["*in a tunic and fake beard* Of course. I'm... Sarakles.", "*in Tunika und mit falschem Bart* Natürlich. Ich bin... Sarakles.", "*i de Tunika und mit falschem Bart* Natürli. Ich bi... de Sarakles."],
  ["An olive wreath for the winner, Sarakles. ...Your beard is slipping.", "Ein Olivenkranz für den Sieger, Sarakles. ...Dein Bart verrutscht.", "En Olivechranz für de Sieger, Sarakles. ...Din Bart verrutscht."],
  ["Mmmh... The oracle sees... an architect... from far, far away in time...", "Mmmh... Das Orakel sieht... eine Architektin... aus weiter, weiter Ferne der Zeit...", "Mmmh... S Orakel gseht... e Architektin... us wiiter, wiiter Färni vo de Ziit..."], ["The god says: \"Know thyself.\" And: \"Nothing in excess.\"", "Der Gott spricht: \"Erkenne dich selbst.\" Und: \"Nichts im Übermass.\"", "De Gott seit: \"Erkenn di sälber.\" Und: \"Nüt im Übermass.\""],
  ["Nothing in excess... does that include sketchbooks?", "Nichts im Übermass... gilt das auch für Skizzenbücher?", "Nüt im Übermass... gilt das au für Skizzebüecher?"], ["Ah, a stranger! Let me ask you a few questions...", "Ah, eine Fremde! Lass mich dir ein paar Fragen stellen...", "Ah, e Frömdi! Lah mi dir es paar Frage stelle..."],
  ["I know that I know nothing. But I know you're a good student.", "Ich weiss, dass ich nichts weiss. Aber ich weiss, dass du eine gute Schülerin bist.", "Ich weiss, dass ich nüt weiss. Aber ich weiss, dass du e gueti Schüelerin bisch."],
  ["Welcome to the assembly! Today we vote. Do you know how our democracy works?", "Willkommen in der Versammlung! Heute stimmen wir ab. Weisst du, wie unsere Demokratie funktioniert?", "Willkomme i de Versammlig! Hüt stimmed mer ab. Weisch, wie üsi Demokratie funktioniert?"],
  ["Demokratia: the power of the people. Well, of some of the people.", "Demokratia: die Macht des Volkes. Na ja, eines Teils des Volkes.", "Demokratia: d Macht vom Volk. Naja, vomne Teil vom Volk."],
  ["We beat the Persians here at Marathon! Athens must hear the news before the Persian fleet gets there.", "Wir haben die Perser hier bei Marathon geschlagen! Athen muss es erfahren, bevor die persische Flotte dort ist.", "Mer händ d Perser da bi Marathon gschlage! Athen mues es erfahre, bevor di persisch Flotte det isch."],
  ["Someone has to run about 40 km... and my feet are destroyed.", "Jemand muss etwa 40 km laufen... und meine Füsse sind kaputt.", "Öpper mues öppe 40 km renne... und mini Füess sind kaputt."], ["Running? I'm more of a rope skipper. ...Fine! Let's go!", "Rennen? Ich bin eher Seilspringerin. ...Na gut! Los geht's!", "Renne? Ich bi eher Seilgumperin. ...Also guet! Los gahts!"],
  ["Legend says Pheidippides ran this and collapsed. You arrived and asked for a snack. Impressive.", "Der Legende nach lief Pheidippides das und brach zusammen. Du bist angekommen und hast nach einem Snack gefragt. Beeindruckend.", "D Legände seit, de Pheidippides seig das grennt und zämebroche. Du bisch aacho und hesch nach emne Snack gfrogt. Beidruckend."],
  ["I am Leonidas, king of Sparta. Here at Thermopylae we hold the pass against the Persian army. \"Come and take them!\"", "Ich bin Leonidas, König von Sparta. Hier an den Thermopylen halten wir den Pass gegen das persische Heer. \"Komm und hol sie dir!\"", "Ich bi de Leonidas, König vo Sparta. Da a de Thermopyle hebed mer de Pass gäge s persisch Heer. \"Chumm und hol si dir!\""],
  ["Spartan mothers say: come back with your shield, or on it.", "Spartanische Mütter sagen: Komm mit deinem Schild zurück, oder auf ihm.", "Spartanischi Müettere säged: Chumm mit dim Schild zrugg, oder druf."],
  ["And then Athens' ships win at Salamis, the same year. I'll write that down.", "Und dann siegen Athens Schiffe bei Salamis, im selben Jahr. Das schreibe ich mir auf.", "Und denn gwünned d Schiff vo Athen bi Salamis, im glichä Jahr. Das schriib ich mer uf."],
  ["EUREKA! Oh. Sorry. I'm wet. I just understood why things float!", "HEUREKA! Oh. Entschuldigung. Ich bin nass. Ich habe gerade verstanden, warum Dinge schwimmen!", "HEUREKA! Oh. Sorry. Ich bi nass. Ich ha grad verstande, werum Sache schwümmed!"],
  ["Give me a lever long enough and a place to stand, and I will move the world.", "Gib mir einen Hebel, der lang genug ist, und einen festen Punkt, und ich bewege die Welt.", "Gib mer en Hebel, wo lang gnueg isch, und en feschte Punkt, und ich beweg d Wält."], ["Can you also move my deadline?", "Kannst du auch meine Deadline verschieben?", "Chasch au mini Deadline verschiebe?"],
  ["I am Alexander of Macedon, student of Aristotle. At 20 I became king. Now I go east: Persia, Egypt, India!", "Ich bin Alexander von Makedonien, Schüler des Aristoteles. Mit 20 wurde ich König. Jetzt geht's nach Osten: Persien, Ägypten, Indien!", "Ich bi de Alexander vo Makedonie, Schüeler vom Aristoteles. Mit 20 bin ich König worde. Jetzt gahts in Oschte: Persie, Ägypte, Indie!"],
  ["At Gordion there is a knot nobody can untie. Watch this. *SLASH* ⚔️", "In Gordion gibt es einen Knoten, den niemand lösen kann. Pass auf. *ZACK* ⚔️", "Z Gordion gits en Chnopf, wo niemer cha löse. Pass uf. *ZACK* ⚔️"], ["That's... one way to solve a problem.", "Das ist... eine Art, ein Problem zu lösen.", "Das isch... e Art, es Problem z löse."],
  ["I will found many cities. Most of them called Alexandria. Modest, I know.", "Ich werde viele Städte gründen. Die meisten heissen Alexandria. Bescheiden, ich weiss.", "Ich wird vill Städt gründe. Di meischte heissed Alexandria. Bescheide, ich weiss."],
  ["I am Hannibal Barca of Carthage. 218 BC: I am crossing the Alps to surprise Rome!", "Ich bin Hannibal Barkas aus Karthago. 218 v. Chr.: Ich überquere die Alpen, um Rom zu überraschen!", "Ich bi de Hannibal Barkas us Karthago. 218 v. Chr.: Ich überquer d Alpe, zum Rom überrasche!"],
  ["But my elephant Surus is scared of the snow. Will you guide him over the pass?", "Aber mein Elefant Surus hat Angst vor dem Schnee. Führst du ihn über den Pass?", "Aber min Elefant Surus het Angscht vor em Schnee. Füehrsch du ne über de Pass?"], ["An elephant in the Alps. Sure. Why not.", "Ein Elefant in den Alpen. Klar. Warum nicht.", "En Elefant i de Alpe. Klar. Werum nöd."],
  ["We made it to Italy! But Rome won the war in the end. In 146 BC the Romans destroyed Carthage.", "Wir haben es nach Italien geschafft! Aber Rom gewann am Ende den Krieg. 146 v. Chr. zerstörten die Römer Karthago.", "Mer händs uf Italie gschafft! Aber Rom het am Änd de Chrieg gwunne. 146 v. Chr. händ d Römer Karthago zerstört."],
  ["The ground is shaking... and the mountain is smoking. Do you think we should worry?", "Der Boden bebt... und der Berg raucht. Meinst du, wir sollten uns Sorgen machen?", "De Bode bebt... und de Bärg rauchet. Meinsch, mer söttet üs Sorge mache?"], ["It's AD 79. YES. Everybody, to the harbour!", "Es ist 79 n. Chr. JA. Alle zum Hafen!", "Es isch 79 n. Chr. JA. Alli zum Hafe!"],
  ["Thank you! Pompeii is buried... but we are alive.", "Danke! Pompeji ist begraben... aber wir leben.", "Merci! Pompeji isch vergrabe... aber mer läbed."],
  ["I am Pliny the Younger. From across the bay I saw a cloud shaped like a giant umbrella pine rising from the mountain.", "Ich bin Plinius der Jüngere. Von der anderen Seite der Bucht sah ich eine Wolke wie eine riesige Schirmpinie aus dem Berg aufsteigen.", "Ich bi de Plinius de Jüngeri. Vo de andere Siite vo de Bucht han ich e Wolke wie e riisigi Schirmpinie us em Bärg ufstiige gseh."],
  ["My uncle, Pliny the Elder, sailed over to help people and never came back. I wrote everything down in two letters.", "Mein Onkel, Plinius der Ältere, segelte hinüber, um Menschen zu helfen, und kam nie zurück. Ich schrieb alles in zwei Briefen auf.", "Min Onkel, de Plinius de Elteri, isch übere gseglet, zum de Lüt hälfe, und isch nie zrugg cho. Ich ha alles i zwei Brief ufgschribe."],
  ["I am Constantine. In 313 I allowed Christians to worship freely: the Edict of Milan.", "Ich bin Konstantin. 313 erlaubte ich den Christen, ihren Glauben frei auszuüben: das Mailänder Edikt.", "Ich bi de Konstantin. 313 han ich de Christe erlaubt, ihre Glaube frei usüebe: s Mailänder Edikt."],
  ["And in 330 I made a new capital in the East: Constantinople. Today you call it Istanbul.", "Und 330 machte ich eine neue Hauptstadt im Osten: Konstantinopel. Heute nennt ihr es Istanbul.", "Und 330 han ich e neui Hauptstadt im Oschte gmacht: Konstantinopel. Hüt säged ihr Istanbul."],
  ["The Code of Hammurabi: 282 laws, carved in stone around 1754 BC. Today the original is in the Louvre in Paris.", "Der Codex Hammurapi: 282 Gesetze, um 1754 v. Chr. in Stein gemeisselt. Heute steht das Original im Louvre in Paris.", "De Codex Hammurapi: 282 Gsetz, um 1754 v. Chr. in Stei gmeisslet. Hüt staht s Original im Louvre z Paris."],
  ["A black stone stele, over 2 m tall. At the top, King Hammurabi stands before the sun god Shamash. Below: 282 laws.", "Eine schwarze Steinstele, über 2 m hoch. Oben steht König Hammurapi vor dem Sonnengott Schamasch. Darunter: 282 Gesetze.", "E schwarzi Steistele, über 2 m höch. Obe staht König Hammurapi vor em Sunnegott Schamasch. Drunder: 282 Gsetz."],
  ["I am Hammurabi, king of Babylon. Let's see if you can tell my real laws from fake ones!", "Ich bin Hammurapi, König von Babylon. Mal sehen, ob du meine echten Gesetze von erfundenen unterscheiden kannst!", "Ich bi de Hammurapi, König vo Babylon. Mal luege, öb du mini ächte Gsetz vo erfundne chasch unterscheide!"],
  ["Grüezi! We are the Helvetii. In 58 BC we packed everything and tried to move west, into Gaul.", "Grüezi! Wir sind die Helvetier. 58 v. Chr. packten wir alles und wollten nach Westen ziehen, nach Gallien.", "Grüezi! Mir sind d Helvetier. 58 v. Chr. händ mer alles packt und händ in Weschte wele zieh, uf Gallie."],
  ["Julius Caesar stopped us at Bibracte and sent us back to the Swiss plateau. Rude. But here we are: still Swiss!", "Julius Caesar hielt uns bei Bibracte auf und schickte uns zurück ins Mittelland. Frech. Aber hier sind wir: immer noch Schweizer!", "De Julius Caesar het üs bi Bibracte ufghalte und is Mittelland zruggschickt. Frech. Aber da sind mer: immer no Schwiizer!"],
  ["Helvetia! That's where the Latin name of Switzerland comes from.", "Helvetia! Daher kommt der lateinische Name der Schweiz.", "Helvetia! Dehär chunnt de lateinisch Name vo de Schwiiz."], ["Veni, vidi, vici. I came, I saw, I conquered.", "Veni, vidi, vici. Ich kam, sah und siegte.", "Veni, vidi, vici. Ich bi cho, ha gseh und ha gsiegt."],
  ["I am Gaius Julius Caesar, dictator for life. I even gave you a new calendar: 365 days, with a leap year!", "Ich bin Gaius Julius Caesar, Diktator auf Lebenszeit. Ich habe euch sogar einen neuen Kalender gegeben: 365 Tage, mit Schaltjahr!", "Ich bi de Gaius Julius Caesar, Diktator uf Läbziit. Ich ha eu sogar en neue Kaländer gä: 365 Täg, mit Schaltjahr!"],
  ["Caesar! Beware the Ides of March! Don't go to the Senate on the 15th!", "Caesar! Hüte dich vor den Iden des März! Geh am 15. nicht in den Senat!", "Caesar! Pass uf vor de Iden vom März! Gang am 15. nöd in Senat!"],
  ["Bah. A soothsayer told me the same thing. The Ides of March have come, and I am fine.", "Pah. Ein Wahrsager hat mir dasselbe gesagt. Die Iden des März sind gekommen, und mir geht es gut.", "Pah. En Wahrsager het mer s Glich gseit. D Iden vom März sind cho, und mir gahts guet."], ["...They have come, but they have not gone.", "...Sie sind gekommen, aber noch nicht vorbei.", "...Si sind cho, aber no nöd verbii."],
  ["History can't be changed, Sarah. On 15 March 44 BC, senators stabbed him. Brutus was one of them.", "Die Geschichte lässt sich nicht ändern, Sarah. Am 15. März 44 v. Chr. erstachen ihn Senatoren. Brutus war einer von ihnen.", "D Gschicht lat sich nöd ändere, Sarah. Am 15. März 44 v. Chr. händ ne Senatore erstoche. De Brutus isch eine vo ihne gsi."],
  ["His adopted son Octavian wins the civil war and becomes Augustus, the first emperor, in 27 BC. Then: about 200 years of Pax Romana.", "Sein Adoptivsohn Octavian gewinnt den Bürgerkrieg und wird 27 v. Chr. Augustus, der erste Kaiser. Danach: rund 200 Jahre Pax Romana.", "Sin Adoptivsohn Octavian gwünnt de Bürgerchrieg und wird 27 v. Chr. zum Augustus, em erschte Kaiser. Denn: öppe 200 Jahr Pax Romana."],
  ["Hello, stranger! You hunt and gather? Me too. But I have an idea...", "Hallo, Fremde! Du jagst und sammelst? Ich auch. Aber ich habe eine Idee...", "Hoi, Frömdi! Du jagsch und sammlisch? Ich au. Aber ich ha e Idee..."],
  ["The wild grass on the hills: einkorn. What if we PLANT its seeds, right here next to our homes?", "Das wilde Gras auf den Hügeln: Einkorn. Was, wenn wir seine Samen PFLANZEN, gleich hier neben unseren Häusern?", "S wild Gras uf de Hügel: Einkorn. Was, wenn mer sini Some AAPFLANZED, grad da näb üsne Hüser?"],
  ["Bring me 6 handfuls of wild einkorn from the eastern hills. Look for the golden tufts!", "Bring mir 6 Handvoll wildes Einkorn von den östlichen Hügeln. Such nach den goldenen Büscheln!", "Bring mer 6 Handvoll wilds Einkorn vo de östliche Hügel. Suech nach de guldige Büschel!"],
  ["{0}/6 handfuls. The wild einkorn grows on the hills in the east.", "{0}/6 Handvoll. Das wilde Einkorn wächst auf den Hügeln im Osten.", "{0}/6 Handvoll. S wild Einkorn wachst uf de Hügel im Oschte."], ["Wonderful! Now we sow them in the field and wait.", "Wunderbar! Jetzt säen wir sie auf dem Feld aus und warten.", "Wunderbar! Jetzt säied mer s uf em Fäld und warted."],
  ["While the grain grows: those wild goats behind my house! Drive them into the pen. Milk, cheese and wool all year round!", "Während das Getreide wächst: diese wilden Ziegen hinter meinem Haus! Treib sie ins Gehege. Milch, Käse und Wolle das ganze Jahr!", "Während s Getreid wachst: die wilde Geisse hinder mim Huus! Tribs is Gheg. Milch, Chäs und Wulle s ganz Jahr!"],
  ["The einkorn is ripe and the goats are home! Bread, porridge... maybe even beer!", "Das Einkorn ist reif und die Ziegen sind zu Hause! Brot, Brei... vielleicht sogar Bier!", "S Einkorn isch riif und d Geisse sind dihei! Brot, Brei... vilicht sogar Bier!"], ["You just invented farming.", "Du hast gerade die Landwirtschaft erfunden.", "Du hesch grad d Landwirtschaft erfunde."], ["We just... what?", "Wir haben... was?", "Mer händ... was?"],
  ["Farming means food in one place. Villages, then towns, then cities, kings, writing... everything starts here.", "Landwirtschaft heisst: Essen an einem Ort. Dörfer, dann Städtchen, dann Städte, Könige, Schrift... alles beginnt hier.", "Landwirtschaft heisst: Ässe amne Ort. Dörfer, denn Städtli, denn Städt, König, Schrift... alles fangt da aa."],
  ["Goats in the pen: {0}/3. The goats run away from you, so walk behind them and push them into the pen!", "Ziegen im Gehege: {0}/3. Die Ziegen laufen vor dir weg, also geh hinter sie und treib sie ins Gehege!", "Geisse im Gheg: {0}/3. D Geisse laufed vor dir dävo, also gang hinder si und trib si is Gheg!"],
  ["The einkorn is ripe!", "Das Einkorn ist reif!", "S Einkorn isch riif!"], ["The einkorn is still growing...", "Das Einkorn wächst noch...", "S Einkorn wachst no..."], ["We stay here now. Villages, then towns... I wonder where this will lead.", "Wir bleiben jetzt hier. Dörfer, dann Städtchen... ich frage mich, wohin das führt.", "Mer blibed jetzt da. Dörfer, denn Städtli... ich frog mi, wo das ane füehrt."],
  ["It stands! Hunters from all over the hills will come to feast here.", "Er steht! Jäger von allen Hügeln werden hier zum Festmahl kommen.", "Er staht! Jäger vo allne Hügel wärded da zum Feschtässe cho."], ["This is about 9600 BC. Monumental architecture... built by hunter-gatherers. Before farming!", "Das ist um 9600 v. Chr. Monumentale Architektur... gebaut von Jägern und Sammlern. Vor der Landwirtschaft!", "Das isch um 9600 v. Chr. Monumentali Architektur... baut vo Jäger und Sammler. Vor de Landwirtschaft!"],
  ["Got it! The T-pillars of Göbekli Tepe. ✏️", "Geschafft! Die T-Pfeiler von Göbekli Tepe. ✏️", "Gschafft! D T-Pfiler vo Göbekli Tepe. ✏️"], ["T-shaped pillars with carved arms, hands and belts: maybe ancestors, maybe spirits. Foxes, boars and vultures run across them.", "T-förmige Pfeiler mit eingemeisselten Armen, Händen und Gürteln: vielleicht Ahnen, vielleicht Geister. Füchse, Wildschweine und Geier laufen darüber.", "T-förmigi Pfiler mit iigmeisslete Ärm, Händ und Gürtel: vilicht Ahne, vilicht Geischter. Füchs, Wildsäu und Geier laufed drüber."],
  ["Nobody has ever matched me! ...Enkidu, my friend! Let's be brothers.", "Niemand war mir je gewachsen! ...Enkidu, mein Freund! Lass uns Brüder sein.", "Niemer isch mer je gwachse gsi! ...Enkidu, min Fründ! Mer sind Brüeder."], ["Next stop: the Cedar Forest, north-west across the Euphrates. Humbaba guards it. Bring your rope! 🌲", "Nächster Halt: der Zedernwald, im Nordwesten jenseits des Euphrat. Humbaba bewacht ihn. Nimm dein Seil mit! 🌲", "Nächschte Halt: de Zederewald, im Nordweschte änet em Euphrat. De Humbaba bewacht ne. Nimm dis Seil mit! 🌲"],
  ["...Grrr... mmh. Nobody has ever just... calmed me down.", "...Grrr... mmh. Mich hat noch nie jemand einfach... beruhigt.", "...Grrr... mmh. Mi het no nie öpper eifach... beruhiget."], ["In the epic, things end worse for Humbaba. And later, the gods punish the heroes for it.", "Im Epos endet es für Humbaba schlimmer. Und später bestrafen die Götter die Helden dafür.", "Im Epos ändets für de Humbaba schlimmer. Und spöter bestrafed d Götter d Helde defür."], ["Then let's leave the cedars standing.", "Dann lassen wir die Zedern stehen.", "Denn lönd mer d Zedere stah."],
  ["Excellent! Five sheep, twelve jars of beer, twenty-three sacks of barley. Perfect accounts.", "Ausgezeichnet! Fünf Schafe, zwölf Krüge Bier, dreiundzwanzig Säcke Gerste. Perfekte Buchführung.", "Usgezeichnet! Föif Schaf, zwölf Chrüeg Bier, drüezwänzg Säck Gerschte. Perfekti Buechhaltig."],
  ["Writing was invented here around 3200 BC: first to count things, much later for poems like the Epic of Gilgamesh.", "Hier wurde um 3200 v. Chr. die Schrift erfunden: zuerst zum Zählen, viel später für Dichtung wie das Gilgamesch-Epos.", "Da isch um 3200 v. Chr. d Schrift erfunde worde: zerscht zum Zelle, vill spöter für Dichtig wie s Gilgamesch-Epos."],
  ["Six steps to the sky! Pharaoh Djoser will climb them to the stars.", "Sechs Stufen zum Himmel! Pharao Djoser wird sie zu den Sternen hinaufsteigen.", "Sächs Stufe zum Himmel! De Pharao Djoser wird si zu de Stärne ufstiige."], ["The oldest large stone building in the world. And I helped. ❤", "Der älteste grosse Steinbau der Welt. Und ich habe geholfen. ❤", "De eltischt gross Steibau vo de Wält. Und ich ha ghulfe. ❤"],
  ["SARAH and C-REAL, written in cartouches like pharaohs!", "SARAH und C-REAL, in Kartuschen geschrieben wie Pharaonen!", "SARAH und C-REAL, i Kartusche gschribe wie Pharaone!"], ["Hieroglyphs mean \"sacred carvings\". Thousands of years later they were forgotten, until the Rosetta Stone.", "Hieroglyphen heisst \"heilige Einritzungen\". Tausende Jahre später waren sie vergessen, bis zum Stein von Rosette.", "Hieroglyphe heisst \"heiligi Iiritzige\". Tuusigi vo Jahr spöter sind si vergässe gsi, bis zum Stei vo Rosette."],
  ["First place: Sarakles of... Baar? The olive wreath is yours!", "Erster Platz: Sarakles aus... Baar? Der Olivenkranz gehört dir!", "Erschte Platz: Sarakles us... Baar? De Olivechranz ghört dir!"], ["*pulls off the beard* Surprise! 🧔‍♀️", "*reisst den Bart ab* Überraschung! 🧔‍♀️", "*riisst de Bart ab* Überraschig! 🧔‍♀️"],
  ["A WOMAN?! ...Well. Rules are rules. Nobody saw anything. Keep the wreath.", "Eine FRAU?! ...Nun ja. Regeln sind Regeln. Niemand hat etwas gesehen. Behalt den Kranz.", "E FRAU?! ...Naja. Regle sind Regle. Niemer het öppis gseh. Bhalt de Chranz."],
  ["Fun fact: in 392 BC a Spartan princess, Kyniska, did win at Olympia: as the owner of the winning chariot horses!", "Fun Fact: 392 v. Chr. gewann tatsächlich eine spartanische Prinzessin, Kyniska, in Olympia: als Besitzerin der siegreichen Wagenpferde!", "Fun Fact: 392 v. Chr. het tatsächlich e spartanischi Prinzessin, d Kyniska, z Olympia gwunne: als Bsitzerin vo de Siegerross vom Wagerenne!"],
  ["*bursts into Athens* NENIKĒKAMEN! We have won!", "*stürmt nach Athen* NENIKĒKAMEN! Wir haben gesiegt!", "*stürmt uf Athen* NENIKĒKAMEN! Mir händ gwunne!"], ["Legend says the messenger collapsed after this. You look like you could do another lap. ❤", "Der Legende nach brach der Bote danach zusammen. Du siehst aus, als könntest du noch eine Runde laufen. ❤", "D Legände seit, de Bote seig nachher zämebroche. Du gsehsch us, wie wenn no e Rundi chöntsch renne. ❤"],
  ["The modern marathon is 42.195 km, inspired by this very legend.", "Der moderne Marathon ist 42,195 km lang, inspiriert von genau dieser Legende.", "De moderni Marathon isch 42,195 km lang, inspiriert vo genau dere Legände."],
  ["Italy! Surus made it! Rome will tremble.", "Italien! Surus hat es geschafft! Rom wird zittern.", "Italie! De Surus hets gschafft! Rom wird zittere."], ["Many of his men and most of the elephants did not survive the crossing. And Rome won in the end, and destroyed Carthage in 146 BC.", "Viele seiner Männer und die meisten Elefanten überlebten die Überquerung nicht. Und Rom gewann am Ende und zerstörte Karthago 146 v. Chr.", "Vill vo sine Manne und di meischte Elefante händ d Überquerig nöd überläbt. Und Rom het am Änd gwunne und Karthago 146 v. Chr. zerstört."],
  ["We made it to the boats!", "Wir haben es zu den Booten geschafft!", "Mer händs zu de Boot gschafft!"], ["Pompeii lay buried under ash for 1,700 years. Excavations show the town frozen in time: bread in ovens, graffiti on walls.", "Pompeji lag 1700 Jahre unter Asche begraben. Ausgrabungen zeigen die Stadt wie eingefroren: Brot in den Öfen, Graffiti an den Wänden.", "Pompeji isch 1700 Jahr under Äsche vergrabe gläge. Usgrabige zeiged d Stadt wie iigfrore: Brot i de Öfe, Graffiti a de Wänd."],
  ["Help us! We pull the last pillar up with ropes. Everyone pull at the same time!", "Hilf uns! Wir ziehen den letzten Pfeiler mit Seilen hoch. Alle gleichzeitig ziehen!", "Hilf üs! Mer zieched de letscht Pfiler mit Seil ufe. Alli glichziitig zieh!"], ["Time to sketch these pillars... Is that hyena watching me?", "Zeit, diese Pfeiler zu skizzieren... Beobachtet mich diese Hyäne?", "Ziit, die Pfiler z skizziere... Luegt mi die Hyäne aa?"],
  ["Hyenas are curious. Freeze when it looks!", "Hyänen sind neugierig. Erstarre, wenn sie hinschaut!", "Hyäne sind gwundrig. Versteinere, wenn si aneluegt!"], ["Göbekli Tepe. People came here to feast and build, long before anyone farmed.", "Göbekli Tepe. Menschen kamen hierher, um zu feiern und zu bauen, lange bevor jemand Landwirtschaft betrieb.", "Göbekli Tepe. Mänsche sind da ane cho zum Fiire und Baue, lang bevor öpper Landwirtschaft betribe het."],
  ["Çatalhöyük: a whole town of roofs. Paths, terraces and front doors all in one. Very modern, actually.", "Çatalhöyük: eine ganze Stadt aus Dächern. Wege, Terrassen und Haustüren in einem. Eigentlich sehr modern.", "Çatalhöyük: e ganzi Stadt us Dächer. Wäg, Terrasse und Huustüre in eim. Eigentlich sehr modern."],
  ["Who dares to block the gate of Uruk?", "Wer wagt es, das Tor von Uruk zu versperren?", "Wer wagt s, s Tor vo Uruk z versperre?"], ["Enkidu! Made from clay to be your equal! Wrestle me!", "Enkidu! Aus Lehm geformt, um dir ebenbürtig zu sein! Ring mit mir!", "Enkidu! Us Lehm gformt, zum dir ebebürtig z si! Ring mit mir!"], ["HA! Come on then!", "HA! Dann komm!", "HA! Denn chumm!"],
  ["Welcome to the Eduba, the tablet house! Today: bookkeeping for the temple storehouse. Take a reed and some wet clay.", "Willkommen in der Eduba, dem Tafelhaus! Heute: Buchhaltung für das Tempellager. Nimm ein Schilfrohr und feuchten Ton.", "Willkomme i de Eduba, im Tafelhuus! Hüt: Buechhaltig für s Tämpellager. Nimm es Schilfrohr und füechte Ton."],
  ["Already sketched. Sneaking in twice is just showing off.", "Schon skizziert. Zweimal reinschleichen wäre Angeberei.", "Scho skizziert. Zweimal ineschliiche wär Plagiererei."], ["My building site! Six mastabas of stone, each one smaller than the one below. Lower the blocks carefully!", "Meine Baustelle! Sechs Mastabas aus Stein, jede kleiner als die darunter. Senk die Blöcke vorsichtig ab!", "Mini Baustell! Sächs Mastabas us Stei, jedi chliiner als di drunder. Lah d Blöck vorsichtig abe!"],
  ["The Step Pyramid of Djoser. My masterpiece. OUR masterpiece. 🏗️", "Die Stufenpyramide des Djoser. Mein Meisterwerk. UNSER Meisterwerk. 🏗️", "D Stufepyramide vom Djoser. Mis Meischterwärch. ÜSES Meischterwärch. 🏗️"], ["Welcome to the temple school of Karnak! Let's write your names in hieroglyphs.", "Willkommen in der Tempelschule von Karnak! Schreiben wir eure Namen in Hieroglyphen.", "Willkomme i de Tämpelschuel vo Karnak! Mer schriibed eui Näme i Hieroglyphe."],
  ["Tomb KV62... the tomb of Tutankhamun. Almost untouched for 3,000 years.", "Grab KV62... das Grab des Tutanchamun. Fast 3000 Jahre lang unberührt.", "Grab KV62... s Grab vom Tutanchamun. Fascht 3000 Jahr lang unberüehrt."], ["Most royal tombs were robbed in antiquity. This small one was forgotten. Lucky for us.", "Die meisten Königsgräber wurden schon in der Antike geplündert. Dieses kleine wurde vergessen. Glück für uns.", "Di meischte Königsgräber sind scho i de Antike plünderet worde. Das chliine isch vergässe gange. Glück für üs."],
  ["Runners, to the line! One stadion: about 192 metres!", "Läufer, an die Linie! Ein Stadion: etwa 192 Meter!", "Läufer, a d Linie! Es Stadion: öppe 192 Meter!"], ["*adjusts fake beard* Ready.", "*rückt den falschen Bart zurecht* Bereit.", "*rückt de falsch Bart zrächt* Parat."],
  ["The Colosseum! Opened in AD 80. About 50,000 spectators.", "Das Kolosseum! Eröffnet 80 n. Chr. Etwa 50'000 Zuschauer.", "S Kolosseum! Eröffnet 80 n. Chr. Öppe 50'000 Zueschauer."], ["Sailors from the fleet stretched a giant awning over it, and lifts brought animals up from the tunnels below the arena.", "Matrosen der Flotte spannten ein riesiges Sonnensegel darüber, und Aufzüge brachten Tiere aus den Tunneln unter der Arena herauf.", "Matrose vo de Flotte händ es riisigs Sunnesegel drüber gspannt, und Lift händ Tier us de Tunnel under de Arena ufebracht."],
  ["I'm packing for my villa near Naples! Retirement at sixteen. Not bad.", "Ich packe für meine Villa bei Neapel! Ruhestand mit sechzehn. Nicht schlecht.", "Ich pack für mini Villa bi Neapel! Pension mit sächzäh. Nöd schlächt."], ["I am the Emperor of the West! The guards say I may not receive visitors.", "Ich bin der Kaiser des Westens! Die Wachen sagen, ich darf keinen Besuch empfangen.", "Ich bi de Kaiser vom Weschte! D Wache säged, ich dörf kei Bsuech empfange."],
  ["Not yet, Sarah. Still to do: {0}", "Noch nicht, Sarah. Noch zu tun: {0}", "No nöd, Sarah. No z tue: {0}"], ["I am Romulus Augustulus, Emperor of the West! ...I'm sixteen. Please be nice.", "Ich bin Romulus Augustulus, Kaiser des Westens! ...Ich bin sechzehn. Bitte seid nett.", "Ich bi de Romulus Augustulus, Kaiser vom Weschte! ...Ich bi sächzäh. Bitte sind nätt."],
  ["Odoacer here. Your soldiers just made ME king of Italy. So: you retire to a lovely villa near Naples, with a pension.", "Odoaker hier. Deine Soldaten haben gerade MICH zum König von Italien gemacht. Also: Du ziehst dich in eine hübsche Villa bei Neapel zurück, mit Rente.", "Odoaker da. Dini Soldate händ grad MI zum König vo Italie gmacht. Also: Du ziehsch di in e herzigi Villa bi Neapel zrugg, mit Rente."],
  ["A villa by the sea? ...Honestly, deal.", "Eine Villa am Meer? ...Ehrlich gesagt: abgemacht.", "E Villa am Meer? ...Ehrlich gseit: abgmacht."], ["And the imperial insignia, I'll send them to the emperor in Constantinople. One emperor is enough for this world.", "Und die kaiserlichen Insignien schicke ich dem Kaiser in Konstantinopel. Ein Kaiser reicht für diese Welt.", "Und di kaiserliche Insignie schick ich em Kaiser z Konstantinopel. Ein Kaiser längt für die Wält."],
  ["So that's it? The Western Roman Empire just... ends? With a pension?", "Das war's? Das Weströmische Reich endet einfach... mit einer Rente?", "Das wärs? S Weschtrömisch Riich hört eifach uf... mit ere Rente?"], ["Historians pick AD 476 as the end of the West. The Eastern Roman Empire continues for almost 1,000 years, until 1453.", "Historiker wählen 476 n. Chr. als Ende des Westens. Das Oströmische Reich besteht noch fast 1000 Jahre weiter, bis 1453.", "Historiker wähled 476 n. Chr. als Änd vom Weschte. S Oschtrömisch Riich bestaht no fascht 1000 Jahr wiiter, bis 1453."],
  ["Roads, Latin, law, concrete, arches... Rome lives on. The portal stone east of here leads into the Middle Ages. Shall we? ⏳", "Strassen, Latein, Recht, Beton, Bögen... Rom lebt weiter. Der Portalstein östlich von hier führt ins Mittelalter. Wollen wir? ⏳", "Strasse, Latein, Rächt, Beton, Böge... Rom läbt wiiter. De Portalstei östlich vo da füehrt is Mittelalter. Wämmer? ⏳"],
  ["+1 einkorn 🌾 ({0}/6)", "+1 Einkorn 🌾 ({0}/6)", "+1 Einkorn 🌾 ({0}/6)"], ["Six handfuls of einkorn! Back to the farmer near Çatalhöyük. 🌾", "Sechs Handvoll Einkorn! Zurück zur Bäuerin bei Çatalhöyük. 🌾", "Sächs Handvoll Einkorn! Zrugg zur Püürin bi Çatalhöyük. 🌾"],
  ["The Cedar Forest... not yet. First we need Gilgamesh on our side. To the gate of Uruk!", "Der Zedernwald... noch nicht. Zuerst brauchen wir Gilgamesch auf unserer Seite. Zum Tor von Uruk!", "De Zederewald... no nöd. Zerscht bruuched mer de Gilgamesch uf üsere Siite. Zum Tor vo Uruk!"],
  ["Humbaba! Guardian of the cedars! His seven auras protect him!", "Humbaba! Wächter der Zedern! Seine sieben Auren schützen ihn!", "Humbaba! Wächter vo de Zedere! Sini sibe Aure schützed ne!"], ["Dodge his attacks, Sarah. When an aura fades and falls, grab it!", "Weich seinen Angriffen aus, Sarah. Wenn eine Aura erlischt und fällt, schnapp sie dir!", "Wiich sine Aagriff us, Sarah. Wenn e Aura verlöscht und abegheit, schnapp si dir!"],
  ["The cedars rustle peacefully. Humbaba is snoring. 🌲", "Die Zedern rauschen friedlich. Humbaba schnarcht. 🌲", "D Zedere ruusched friedlich. De Humbaba schnarchlet. 🌲"], ["Purr... Bastet approves! ❤", "Schnurr... Bastet ist einverstanden! ❤", "Schnurr... D Bastet isch iiverstande! ❤"],
  ["In Egypt, cats were sacred to the goddess Bastet. You're basically a priestess now. 🐈", "In Ägypten waren Katzen der Göttin Bastet heilig. Du bist jetzt quasi Priesterin. 🐈", "Z Ägypte sind Chatze de Göttin Bastet heilig gsi. Du bisch jetzt quasi Prieschterin. 🐈"],
  ["Where... WHEN are we? Grassy hills, stone tools... and nobody has a phone.", "Wo... WANN sind wir? Grasige Hügel, Steinwerkzeuge... und niemand hat ein Handy.", "Wo... WÄNN sind mer? Grasigi Hügel, Steiwärchzüüg... und niemer het es Handy."], ["Two huge rivers, palm trees, mud-brick everything. Mesopotamia!", "Zwei riesige Flüsse, Palmen, alles aus Lehmziegeln. Mesopotamien!", "Zwei riisigi Flüss, Palme, alles us Lehmziegel. Mesopotamie!"],
  ["The Nile! And... is that a pyramid under construction?!", "Der Nil! Und... ist das eine Pyramide im Bau?!", "De Nil! Und... isch das e Pyramide im Bau?!"], ["Olive trees, the sea, white temples... Greece!", "Olivenbäume, das Meer, weisse Tempel... Griechenland!", "Olivebäum, s Meer, wiissi Tämpel... Griecheland!"], ["Cypresses, cobblestones, and everyone in togas. ROME!", "Zypressen, Kopfsteinpflaster und alle in Togen. ROM!", "Zypresse, Pflaschter und alli i Toge. ROM!"],
  ["Over here! Come and talk to me. ❄️", "Hier drüben! Komm und rede mit mir. ❄️", "Da äne! Chumm cho rede. ❄️"],
  ["Careful! A boar doesn't care that you're from the future. 🐗", "Vorsicht! Einem Wildschwein ist egal, dass du aus der Zukunft kommst. 🐗", "Obacht! Ere Wildsau isch glich, dass du us de Zuekunft chunnsch. 🐗"], ["Lions AND their poop, 4,000 years ago. I'm sorry, Sarah. 🦁", "Löwen UND ihr Kot, vor 4000 Jahren. Tut mir leid, Sarah. 🦁", "Löie UND ihres Gaggi, vor 4000 Jahr. Tuet mer leid, Sarah. 🦁"],
  ["The crocodiles of the Nile: very sacred, very bitey. 🐊", "Die Krokodile des Nils: sehr heilig, sehr bissig. 🐊", "D Krokodil vom Nil: sehr heilig, sehr bissig. 🐊"], ["Even the boars here are legendary. Rest a little. 🐗", "Sogar die Wildschweine hier sind legendär. Ruh dich etwas aus. 🐗", "Sogar d Wildsäu da sind legendär. Rueh di chli us. 🐗"], ["Defeated by geese. That's very Roman of you. 🪿", "Von Gänsen besiegt. Sehr römisch von dir. 🪿", "Vo Gäns besiegt. Sehr römisch vo dir. 🪿"],
  // exam
  ["What was Göbekli Tepe?", "Was war Göbekli Tepe?", "Was isch Göbekli Tepe gsi?"], ["Huge stone pillars raised by hunter-gatherers", "Riesige Steinpfeiler, aufgestellt von Jägern und Sammlern", "Riisigi Steipfiler, ufgstellt vo Jäger und Sammler"], ["A Roman fortress", "Eine römische Festung", "E römischi Feschtig"], ["An Egyptian tomb", "Ein ägyptisches Grab", "Es ägyptischs Grab"],
  ["What is the \"Neolithic Revolution\"?", "Was ist die \"Neolithische Revolution\"?", "Was isch d \"Neolithischi Revolution\"?"], ["People began farming and keeping animals", "Die Menschen begannen mit Ackerbau und Viehzucht", "D Mänsche händ mit Ackerbau und Veezucht aagfange"], ["The invention of iron", "Die Erfindung des Eisens", "D Erfindig vom Iise"], ["A rebellion against a king", "Ein Aufstand gegen einen König", "En Ufstand gäge en König"],
  ["How did people enter their houses in Çatalhöyük?", "Wie betraten die Menschen in Çatalhöyük ihre Häuser?", "Wie sind d Mänsche z Çatalhöyük i ihri Hüser ine?"], ["Through the roof, by ladder", "Durchs Dach, über eine Leiter", "Dur s Dach, über e Leitere"], ["Through revolving doors", "Durch Drehtüren", "Dur Drehtüre"], ["By boat", "Mit dem Boot", "Mit em Boot"],
  ["Where was Ötzi the Iceman found?", "Wo wurde Ötzi, der Mann aus dem Eis, gefunden?", "Wo isch de Ötzi, de Maa us em Iis, gfunde worde?"], ["In the Ötztal Alps", "In den Ötztaler Alpen", "I de Ötztaler Alpe"], ["In a pyramid", "In einer Pyramide", "Inere Pyramide"], ["In Babylon", "In Babylon", "Z Babylon"],
  ["Where was writing invented around 3200 BC?", "Wo wurde um 3200 v. Chr. die Schrift erfunden?", "Wo isch um 3200 v. Chr. d Schrift erfunde worde?"], ["In Mesopotamia (Uruk)", "In Mesopotamien (Uruk)", "Z Mesopotamie (Uruk)"], ["In Greece", "In Griechenland", "Z Griecheland"], ["In Rome", "In Rom", "Z Rom"],
  ["What were the first written texts mostly about?", "Worum ging es in den ersten Texten meistens?", "Um was isch es i de erschte Täxt meischtens gange?"], ["Counting goods like grain, sheep and beer", "Ums Zählen von Gütern wie Getreide, Schafen und Bier", "Ums Zelle vo Wahre wie Getreid, Schaf und Bier"], ["Love poems", "Liebesgedichte", "Liebesgedicht"], ["Football results", "Fussballresultate", "Fuessballresultat"],
  ["Who was Enkidu?", "Wer war Enkidu?", "Wer isch de Enkidu gsi?"], ["Gilgamesh's wild friend, made from clay", "Gilgameschs wilder Freund, aus Lehm geformt", "Em Gilgamesch sin wilde Fründ, us Lehm gformt"], ["A pharaoh", "Ein Pharao", "En Pharao"], ["A Greek philosopher", "Ein griechischer Philosoph", "En griechische Philosoph"],
  ["Who guarded the Cedar Forest?", "Wer bewachte den Zedernwald?", "Wer het de Zederewald bewacht?"], ["Medusa", "Medusa", "Medusa"], ["The Sphinx", "Die Sphinx", "D Sphinx"],
  ["What is Hammurabi known for?", "Wofür ist Hammurapi bekannt?", "Für was isch de Hammurapi bekannt?"], ["One of the oldest written law codes", "Eine der ältesten schriftlichen Gesetzessammlungen", "Eini vo de eltischte gschribne Gsetzessammlige"], ["The first pyramid", "Die erste Pyramide", "Di erscht Pyramide"], ["The Olympic Games", "Die Olympischen Spiele", "D Olympische Spiel"],
  ["Who designed the first pyramid, the Step Pyramid of Djoser?", "Wer entwarf die erste Pyramide, die Stufenpyramide des Djoser?", "Wer het di erscht Pyramide entworfe, d Stufepyramide vom Djoser?"], ["Imhotep", "Imhotep", "Imhotep"], ["Pericles", "Perikles", "Perikles"], ["Hadrian", "Hadrian", "Hadrian"],
  ["How tall was the Great Pyramid of Giza when it was built?", "Wie hoch war die Cheops-Pyramide, als sie gebaut wurde?", "Wie höch isch d Cheops-Pyramide gsi, wo si baut worde isch?"], ["About 146 m", "Etwa 146 m", "Öppe 146 m"], ["About 46 m", "Etwa 46 m", "Öppe 46 m"], ["About 1,000 m", "Etwa 1000 m", "Öppe 1000 m"],
  ["How did embalmers dry a mummy?", "Wie trockneten Einbalsamierer eine Mumie?", "Wie händ Iibalsamierer e Mumie tröchnet?"], ["With natron salt, for about 40 days", "Mit Natronsalz, etwa 40 Tage lang", "Mit Natronsalz, öppe 40 Täg lang"], ["In the sun, for a year", "In der Sonne, ein Jahr lang", "I de Sunne, es Jahr lang"], ["With a fan", "Mit einem Ventilator", "Mit emne Ventilator"],
  ["What helped Champollion decipher hieroglyphs?", "Was half Champollion, die Hieroglyphen zu entziffern?", "Was het em Champollion ghulfe, d Hieroglyphe z entziffere?"], ["Ötzi's diary", "Ötzis Tagebuch", "Em Ötzi sis Tagebuech"],
  ["Which female pharaoh built a famous terraced temple?", "Welche Pharaonin baute einen berühmten Terrassentempel?", "Weli Pharaonin het en berüehmte Terrassetämpel baut?"], ["Athena", "Athene", "Athene"], ["Penelope", "Penelope", "Penelope"],
  ["When were the first Olympic Games?", "Wann fanden die ersten Olympischen Spiele statt?", "Wänn sind di erschte Olympische Spiel gsi?"], ["776 BC", "776 v. Chr.", "776 v. Chr."], ["AD 776", "776 n. Chr.", "776 n. Chr."], ["1896 BC", "1896 v. Chr.", "1896 v. Chr."],
  ["Who was not allowed to compete in the ancient Olympic Games?", "Wer durfte bei den antiken Olympischen Spielen nicht teilnehmen?", "Wer het a de antike Olympische Spiel nöd dörfe mitmache?"], ["Women", "Frauen", "Fraue"], ["Runners from Athens", "Läufer aus Athen", "Läufer us Athen"], ["Anyone with a beard", "Alle mit Bart", "Alli mit Bart"],
  ["What happened at Marathon in 490 BC?", "Was geschah 490 v. Chr. bei Marathon?", "Was isch 490 v. Chr. bi Marathon passiert?"], ["Athens defeated the Persians", "Athen besiegte die Perser", "Athen het d Perser besiegt"], ["Rome was founded", "Rom wurde gegründet", "Rom isch gründet worde"], ["Troy fell", "Troja fiel", "Troja isch gfalle"],
  ["What is entasis?", "Was ist Entasis?", "Was isch Entasis?"], ["The slight swelling of a column", "Die leichte Schwellung einer Säule", "D liechti Schwellig vonere Süüle"], ["A Greek dance", "Ein griechischer Tanz", "En griechische Tanz"], ["A kind of olive", "Eine Olivensorte", "E Olivesorte"],
  ["Who was Socrates' famous student?", "Wer war der berühmte Schüler des Sokrates?", "Wer isch de berüehmt Schüeler vom Sokrates gsi?"], ["Plato", "Platon", "Platon"],
  ["How did Alexander the Great solve the Gordian knot?", "Wie löste Alexander der Grosse den Gordischen Knoten?", "Wie het de Alexander de Gross de Gordisch Chnopf glöst?"], ["He cut it with his sword", "Er zerschlug ihn mit dem Schwert", "Er hett ne mit em Schwert verhaue"], ["He untied it slowly", "Er löste ihn langsam auf", "Er het ne langsam ufglöst"], ["He gave up", "Er gab auf", "Er het ufgä"],
  ["Who could vote in Athens' democracy?", "Wer durfte in Athens Demokratie abstimmen?", "Wer het i de Demokratie vo Athen dörfe abstimme?"], ["Free adult male citizens", "Freie erwachsene männliche Bürger", "Frei erwachseni männlichi Bürger"], ["Everyone, including slaves", "Alle, auch Sklaven", "Alli, au Sklave"], ["Only the king", "Nur der König", "Nur de König"],
  ["According to legend, who founded Rome?", "Wer gründete der Legende nach Rom?", "Wer het nach de Legände Rom gründet?"], ["Romulus (and Remus)", "Romulus (und Remus)", "Romulus (und Remus)"], ["Julius Caesar", "Julius Caesar", "Julius Caesar"], ["Odoacer", "Odoaker", "Odoaker"],
  ["What did Hannibal take over the Alps?", "Was nahm Hannibal mit über die Alpen?", "Was het de Hannibal über d Alpe mitgno?"], ["War elephants", "Kriegselefanten", "Chriegselefante"], ["Camels", "Kamele", "Kamel"], ["Chariots with sails", "Streitwagen mit Segeln", "Strittwäge mit Segel"],
  ["What happened on the Ides of March, 44 BC?", "Was geschah an den Iden des März 44 v. Chr.?", "Was isch a de Iden vom März 44 v. Chr. passiert?"], ["Julius Caesar was murdered", "Julius Caesar wurde ermordet", "De Julius Caesar isch ermordet worde"], ["Pompeii was buried", "Pompeji wurde verschüttet", "Pompeji isch verschüttet worde"],
  ["Who was the first Roman emperor?", "Wer war der erste römische Kaiser?", "Wer isch de erscht römisch Kaiser gsi?"], ["Augustus", "Augustus", "Augustus"], ["Nero", "Nero", "Nero"],
  ["Which town did Vesuvius bury in AD 79?", "Welche Stadt begrub der Vesuv 79 n. Chr.?", "Weli Stadt het de Vesuv 79 n. Chr. vergrabe?"], ["Athens", "Athen", "Athen"], ["Babylon", "Babylon", "Babylon"],
  ["What is special about the Pantheon?", "Was ist besonders am Pantheon?", "Was isch bsunders am Pantheon?"], ["A huge concrete dome with an open oculus", "Eine riesige Betonkuppel mit offenem Opaion", "E riisigi Betonkupple mit offnem Opaion"], ["It is made of gold", "Es ist aus Gold", "Es isch us Gold"], ["It floats on the Tiber", "Es schwimmt auf dem Tiber", "Es schwümmt uf em Tiber"],
  ["What did the Edict of Milan (313) allow?", "Was erlaubte das Mailänder Edikt (313)?", "Was het s Mailänder Edikt (313) erlaubt?"], ["Christians could worship freely", "Christen durften ihren Glauben frei ausüben", "Christe händ ihre Glaube frei dörfe usüebe"], ["Women could vote", "Frauen durften wählen", "Fraue händ dörfe wähle"], ["Elephants in the city", "Elefanten in der Stadt", "Elefante i de Stadt"],
  ["Who deposed the last Western Roman emperor in 476?", "Wer setzte 476 den letzten weströmischen Kaiser ab?", "Wer het 476 de letscht weschtrömisch Kaiser abgsetzt?"],
  ["How long did the Eastern Roman Empire last?", "Wie lange bestand das Oströmische Reich?", "Wie lang het s Oschtrömisch Riich bestande?"], ["Until 1453", "Bis 1453", "Bis 1453"], ["Until AD 500", "Bis 500 n. Chr.", "Bis 500 n. Chr."], ["It still exists", "Es existiert noch", "Es existiert no"],
  ["Pax vobiscum! Welcome to our scriptorium. We copy the old books by hand, so that nothing is forgotten.", "Pax vobiscum! Willkommen in unserem Skriptorium. Wir schreiben die alten Bücher von Hand ab, damit nichts vergessen wird.", "Pax vobiscum! Willkomme i üsem Skriptorium. Mer schriibed di alte Büecher vo Hand ab, damit nüt vergässe gaht."],
  ["Ten thousand years of travel? Then let's see your chronicle. First, put the events in the right order. Then answer my questions.", "Zehntausend Jahre Reise? Dann sehen wir uns deine Chronik an. Zuerst bringst du die Ereignisse in die richtige Reihenfolge. Dann beantwortest du meine Fragen.", "Zähtuusig Jahr Reis? Denn lueged mer dini Chronik aa. Zerscht bringsch d Ereignis i di richtig Reihefolg. Denn beantwortisch mini Frage."],
  ["You need 12 of 16. I believe in you! ❤", "Du brauchst 12 von 16. Ich glaube an dich! ❤", "Du bruuchsch 12 vo 16. Ich glaub a di! ❤"], ["{0}/16. A good start! Read your chronicle (TAB) and come back through the portal stone.", "{0}/16. Ein guter Anfang! Lies deine Chronik (TAB) und komm durch den Portalstein zurück.", "{0}/16. En guete Aafang! Lis dini Chronik (TAB) und chumm dur de Portalstei zrugg."],
  ["THE KEEPER OF TIME", "DIE HÜTERIN DER ZEIT", "D HÜETERIN VO DE ZIIT"], ["Score: {0}/16", "Punkte: {0}/16", "Pünkt: {0}/16"], ["Where does this event belong? ◀ ▶ choose a gap · [A] place it", "Wohin gehört dieses Ereignis? ◀ ▶ Lücke wählen · [A] einordnen", "Wo ghört das Ereignis ane? ◀ ▶ Lücke wähle · [A] iiordne"],
  ["Card {0}/8", "Karte {0}/8", "Charte {0}/8"], ["Right place!", "Richtiger Platz!", "Richtige Platz!"], ["Not quite: it goes here.", "Nicht ganz: Es gehört hierhin.", "Nöd ganz: Es ghört da ane."], ["Question {0}/8", "Frage {0}/8", "Frog {0}/8"], ["Keeper of Time! 🎉", "Hüterin der Zeit! 🎉", "Hüeterin vo de Ziit! 🎉"], ["Not quite: 12 needed.", "Knapp nicht: 12 nötig.", "Chnapp nöd: 12 nötig."], ["{0}/16", "{0}/16", "{0}/16"],
  // ending & book
  ["CHRONICLE OF THE AGES", "CHRONIK DER ZEITALTER", "CHRONIK VO DE ZIITALTER"], ["Time traveller, architect, Keeper of Time", "Zeitreisende, Architektin, Hüterin der Zeit", "Ziitreisendi, Architektin, Hüeterin vo de Ziit"], ["{0}/{1} chronicle cards · exam {2}/16", "{0}/{1} Chronik-Karten · Prüfung {2}/16", "{0}/{1} Chronik-Charte · Prüefig {2}/16"],
  ["Eras visited: {0}/5", "Besuchte Epochen: {0}/5", "Bsuechti Epoche: {0}/5"], ["Chronicle cards: {0}/{1}", "Chronik-Karten: {0}/{1}", "Chronik-Charte: {0}/{1}"], ["Monuments sketched: {0}/5", "Skizzierte Monumente: {0}/5", "Skizzierti Monumänt: {0}/5"], ["Runs survived: {0}", "Überstandene Läufe: {0}", "Überstandeni Läuf: {0}"], ["Exam: {0}/16", "Prüfung: {0}/16", "Prüefig: {0}/16"], ["Lion poop stepped in: {0}", "In Löwenkot getreten: {0}", "Is Löiegaggi tschalpet: {0}"],
  ["History is full of stories and legends. The dates here follow today's scholarly consensus; many are approximate.", "Die Geschichte ist voller Erzählungen und Legenden. Die Daten hier folgen dem heutigen Forschungsstand; viele sind ungefähr.", "D Gschicht isch voll Verzellige und Legände. D Date da folged em hüttige Forschigsstand; vill sind ungfähr."],
  ["[A]: home to Baar", "[A]: heim nach Baar", "[A]: hei uf Baar"], ["Chronicle of the Ages — page {0}/{1}", "Chronik der Zeitalter — Seite {0}/{1}", "Chronik vo de Ziitalter — Siite {0}/{1}"], ["Ten thousand years in five eras", "Zehntausend Jahre in fünf Epochen", "Zähtuusig Jahr i föif Epoche"],  ["Not sketched yet. Find this monument in {0}!", "Noch nicht skizziert. Finde dieses Monument in: {0}!", "No nöd skizziert. Find das Monumänt i: {0}!"], ["Keep exploring {0} to find this card.", "Erkunde weiter: {0}, um diese Karte zu finden.", "Erkund wiiter: {0}, zum die Charte finde."], ["(a legend or story, not on the exam timeline)", "(eine Legende oder Erzählung, nicht auf dem Prüfungs-Zeitstrahl)", "(e Legände oder Verzellig, nöd uf em Prüefigs-Ziitstrahl)"],
  ["◀ ▶ flip pages   ·   ▲ ▼ jump between eras   ·   [A] / Tab: close", "◀ ▶ blättern   ·   ▲ ▼ zwischen Epochen springen   ·   [A] / Tab: schliessen", "◀ ▶ blättere   ·   ▲ ▼ zwüsche Epoche gumpe   ·   [A] / Tab: zuemache"],
  ["No bikes before the 19th century!", "Keine Velos vor dem 19. Jahrhundert!", "Kei Velos vor em 19. Jahrhundert!"], ["[A]: talk · act · rope skip", "[A]: reden · handeln · seilspringen", "[A]: rede · handle · seilgumpe"], ["Book (Tab, Q): your chronicle of the ages", "Buch (Tab, Q): deine Chronik der Zeitalter", "Buech (Tab, Q): dini Chronik vo de Ziitalter"],
  ["Solve each era's quests to wake the portal stone.", "Löse die Aufgaben jeder Epoche, um den Portalstein zu wecken.", "Lös d Ufgabe vo jedere Epoche, zum de Portalstei wecke."], ["C-Real plays a different historical figure in every era.", "C-Real spielt in jeder Epoche eine andere historische Figur.", "De C-Real spielt i jedere Epoche e anderi historischi Figur."],
  ["Watch out: boars, lions, crocodiles... and geese.", "Achtung: Wildschweine, Löwen, Krokodile... und Gänse.", "Obacht: Wildsäu, Löie, Krokodil... und Gäns."],
  ["⏳ Level 4: Through the Ages", "⏳ Level 4: Durch die Zeitalter", "⏳ Level 4: Dur d Ziitalter"], ["Did you see that? Something is glowing deep inside the Höllgrotten... ⏳", "Hast du das gesehen? Tief in den Höllgrotten leuchtet etwas... ⏳", "Hesch das gseh? Tüüf i de Höllgrotte lüchtet öppis... ⏳"],
  ["Something is glowing deep inside the Höllgrotten. Shall we take a look? ⏳", "Tief in den Höllgrotten leuchtet etwas. Sollen wir nachschauen? ⏳", "Tüüf i de Höllgrotte lüchtet öppis. Sölled mer go luege? ⏳"],
]);
