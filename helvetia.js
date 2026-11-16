'use strict';
// =====================================================================
//  SARCHITECT — Level 5: Helvetia (Middle Ages & Renaissance in Central Europe, AD 612 → 1531)
//  Loaded after index.html, california.js, zug.js and history.js; shares their globals.
//  The portal stones continue where Level 4 ended: four eras, one map each:
//  Early Middle Ages · High Middle Ages · Late Middle Ages · Renaissance & Reformation.
//  C-Real plays a historical figure in every era. It reuses Level 4's minigames and era flow.
//  Edit FINAL_MESSAGE_5 below for the Level 5 ending (en / de / gsw).
// =====================================================================
const FINAL_MESSAGE_5 = {
  en: "Sarah,\n" +
    "we shared a bear's firewood, you shot an apple off my head (I'm still proud of you), we set type backwards with Gutenberg and stirred soup between two armies.\n" +
    "A thousand years of people building bridges, copying books and sharing meals. That's exactly what I want to keep building with you.\n" +
    "I love you. — C-Real ♥",
  de: "Sarah,\n" +
    "wir haben das Feuerholz eines Bären geteilt, du hast mir einen Apfel vom Kopf geschossen (ich bin immer noch stolz auf dich), wir haben mit Gutenberg Lettern rückwärts gesetzt und zwischen zwei Heeren Suppe gerührt.\n" +
    "Tausend Jahre, in denen Menschen Brücken bauen, Bücher abschreiben und Mahlzeiten teilen. Genau das möchte ich mit dir weiterbauen.\n" +
    "Ich liebe dich. — C-Real ♥",
  gsw: "Sarah,\n" +
    "mir händ s Füürholz vomene Bär teilt, du hesch mer en Öpfel vom Chopf gschosse (ich bi immer no stolz uf di), mir händ mit em Gutenberg Buechstabe verchehrt gsetzt und zwüsche zwei Heer Suppe grüehrt.\n" +
    "Tuusig Jahr, wo Mänsche Brugge baued, Büecher abschriibed und Mahlziite teiled. Genau das wott ich mit dir wiiterbaue.\n" +
    "Ich ha di mega gern. — C-Real ♥",
};
const L5 = () => ST.l5;
const st5 = (k, n = 1) => { L5().stats[k] = (L5().stats[k] || 0) + n; };
const q5 = id => !!L5().quests[id];
const cob5 = pts => Object.assign(pts, { cob: true });

// ---------------------------------------------------------------- tiles & music
Object.assign(T, { VINE: 49, BEECH: 50 });
SOLID.add(T.BEECH);
TILE_HOOKS.push(({ r, speck, cdot }) => {
  const four = fn => [0, 1, 2, 3].map(() => mk(fn));
  GROUND[T.VINE] = four(x => { speck(x, '#8a7a4a', ['#7a6a3a', '#9a8a5a'], 12); for (let j = 2; j < 16; j += 5) { x.fillStyle = '#4a8a3a'; x.fillRect(0, j, 16, 2); x.fillStyle = '#6a2a5a'; x.fillRect(2 + ((r() * 12) | 0), j, 2, 2); } });
  OVER[T.BEECH] = four(x => {
    x.fillStyle = 'rgba(0,0,0,.22)'; x.beginPath(); x.ellipse(8, 14, 6, 2, 0, 0, 7); x.fill();
    x.fillStyle = '#6a5a4a'; x.fillRect(7, 9, 2, 6); const hue = ['#c8832a', '#9a8a2a', '#b85a2a', '#4a8a3a'][(r() * 4) | 0];
    cdot(x, 8, 6, 6.5, '#4a7a34'); cdot(x, 7, 5, 4.5, hue); cdot(x, 10, 7, 2.5, '#6a9a44');
  });
});
Object.assign(MUSIC, {
  abbey: { step: .34, n: [62, 0, 65, 67, 0, 69, 67, 0, 65, 0, 62, 0, 60, 0, 62, 0, 65, 0, 67, 69, 72, 0, 69, 67, 65, 0, 62, 0, 0, 0, 0, 0], bass: [50, 50, 46, 48], type: 'sine', v: .045 },
  minne: { step: .26, n: [67, 0, 71, 74, 72, 0, 71, 69, 67, 0, 64, 0, 66, 67, 0, 0, 69, 0, 72, 76, 74, 72, 71, 0, 69, 67, 66, 0, 67, 0, 0, 0], bass: [43, 48, 50, 43], type: 'triangle', v: .035 },
  gothic: { step: .27, n: [64, 0, 67, 71, 0, 69, 67, 0, 64, 0, 62, 0, 59, 0, 0, 0, 60, 0, 64, 67, 69, 67, 64, 0, 62, 59, 0, 0, 64, 0, 0, 0], bass: [40, 45, 47, 40], type: 'triangle', v: .035 },
  renaiss: { step: .2, n: [72, 74, 76, 0, 79, 76, 74, 0, 72, 0, 71, 72, 74, 0, 0, 0, 76, 77, 79, 0, 81, 79, 77, 76, 74, 0, 72, 0, 74, 0, 72, 0], bass: [48, 43, 45, 43], type: 'triangle', v: .035 },
});

// ---------------------------------------------------------------- the chronicle: event cards (y = AD year, a = approximate, nt = legend/undatable)
const CARDS5 = {
  // era 0: early Middle Ages
  rule: { e: 0, y: 540, a: 1, i: '📖', title: 'The Rule of St. Benedict', text: 'Monks lived by one rule: "ora et labora", pray and work. Hundreds of monasteries copied it, and they became the farms, schools and libraries of the early Middle Ages.' },
  alemanni: { e: 0, y: 450, a: 1, i: '🧭', title: 'The Alemanni', text: 'After Rome\'s western empire fell, the Alemanni settled the Swiss plateau. That is why German-speaking Switzerland speaks a dialect that grew out of Alemannic.' },
  gallus: { e: 0, y: 612, a: 1, i: '🐻', title: 'Gallus and the bear', text: 'The Irish monk Gallus built a hermit\'s cell by the Steinach river. Legend says a bear brought him firewood. The Abbey of St. Gallen grew from his cell.' },
  othmar: { e: 0, y: 719, i: '⛪', title: 'The Abbey of St. Gallen', text: 'In 719 Othmar founded the monastery by Gallus\' cell. Over the centuries it became one of the greatest centres of learning in Europe, with a library that still exists.' },
  reichenau: { e: 0, y: 724, i: '🏝️', title: 'Reichenau Island', text: 'Pirmin founded the monastery on the island in Lake Constance in 724. Its scribes and painters were famous across Europe. UNESCO World Heritage since 2000.' },
  muestair: { e: 0, y: 800, a: 1, i: '🎨', title: 'The frescoes of Müstair', text: 'The convent of St. John in the Graubünden Alps keeps the largest cycle of Carolingian wall paintings still standing. It is a UNESCO World Heritage Site (1983).' },
  charlemagne: { e: 0, y: 800, i: '👑', title: 'Charlemagne is crowned', text: 'On Christmas Day 800 Pope Leo III crowned the Frankish king Charlemagne emperor in Rome. His empire stretched from the Pyrenees to the Elbe, including today\'s Switzerland.' },
  minuscule: { e: 0, y: 790, a: 1, i: '✍️', title: 'Carolingian minuscule', text: 'Charlemagne\'s scholars, led by Alcuin, introduced a clear, rounded script with lowercase letters and spaces between the words. It is the ancestor of the small letters you are reading now.' },
  aachen: { e: 0, y: 800, a: 1, i: '🕌', title: 'The Palatine Chapel at Aachen', text: 'Built around 800 as Charlemagne\'s court chapel: an octagon crowned by a dome, inspired by San Vitale in Ravenna. Charlemagne\'s throne still stands in the upper gallery.' },
  stgall: { e: 0, y: 820, a: 1, i: '📜', title: 'The Plan of St. Gall', text: 'Drawn around 820 on five pieces of parchment: an ideal monastery with a church, library, hospital, gardens and even a brewery. It is the only surviving architectural drawing from the early Middle Ages.' },
  // era 1: high Middle Ages
  habsburg: { e: 1, y: 1020, a: 1, i: '🏰', title: 'Habsburg Castle', text: 'Built around 1020 in what is now Aargau. The counts of Habsburg later became dukes of Austria (1282) and one of Europe\'s most powerful families.' },
  freedom: { e: 1, y: 1231, i: '📃', title: 'Letters of freedom', text: 'Uri (1231) and Schwyz (1240) received letters from the emperor: they answered directly to him, not to local lords. This self-rule shaped the Confederation.' },
  gotthard: { e: 1, y: 1230, a: 1, i: '⛰️', title: 'The Gotthard Pass', text: 'Once the Schöllenen gorge could be crossed, the Gotthard became the shortest trade route between Germany and Italy. Uri earned money from tolls and porters.' },
  teufel: { e: 1, y: 1230, nt: 1, i: '😈', title: 'The Devil\'s Bridge', text: 'Legend: the devil built the bridge across the gorge for the first soul to cross it. The clever Urners sent over a goat. The bridge you can see today is much newer than the legend.' },
  lausanne: { e: 1, y: 1275, i: '⛪', title: 'Lausanne Cathedral', text: 'Consecrated in 1275 in the presence of Pope Gregory X and Rudolf of Habsburg. One of the finest early Gothic cathedrals in Europe, with a famous rose window.' },
  chillon: { e: 1, y: 1250, a: 1, i: '🏰', title: 'Château de Chillon', text: 'On a rocky island in Lake Geneva, the Counts of Savoy expanded the castle in the 13th century. It guarded the road through the Rhône valley and collected tolls.' },
  charter: { e: 1, y: 1291, i: '📜', title: 'The Federal Charter', text: 'In early August 1291 Uri, Schwyz and Unterwalden promised each other mutual help. The Latin parchment is kept in Schwyz. 1 August became the Swiss National Day.' },
  tell: { e: 1, y: 1470, a: 1, nt: 1, i: '🏹', title: 'William Tell', text: 'The tale of Tell, the hat on the pole and the apple shot was first written down around 1470 in the White Book of Sarnen. It is a legend, not a historical record.' },
  morgarten: { e: 1, y: 1315, i: '🪨', title: 'The Battle of Morgarten', text: 'On 15 November 1315 the Confederates ambushed Duke Leopold\'s Habsburg army in the narrow pass at Morgarten near the Ägerisee, with rocks and logs, so tradition says.' },
  manesse: { e: 1, y: 1300, a: 1, i: '🎶', title: 'The Codex Manesse', text: 'A songbook made in Zürich around 1300 with songs by about 140 poets, most with a full-page painting. Johannes Hadlaub, who sang of courtly love, is one of them.' },
  // era 2: late Middle Ages
  kapell: { e: 2, y: 1333, a: 1, i: '🌉', title: 'The Kapellbrücke', text: 'The covered wooden bridge in Lucerne was built around 1333 as part of the city\'s defences. Its roof triangles were painted in the 17th century. Burnt in 1993 and rebuilt.' },
  zuerich: { e: 2, y: 1336, i: '⚔️', title: 'Zürich\'s guilds take power', text: 'In 1336 Rudolf Brun and the craft guilds took power from the old noble families. Zürich\'s constitution with guilds lasted for centuries.' },
  plague: { e: 2, y: 1348, i: '🐀', title: 'The Black Death', text: 'The plague reached Europe in 1347 and killed about a third of its people. Frightened people blamed others: Jewish communities in many cities, including Basel and Zürich, were attacked. In reality fleas on rats carried the bacterium.' },
  quake: { e: 2, y: 1356, i: '🌋', title: 'The Basel earthquake', text: 'On St. Luke\'s Day 1356 the strongest earthquake recorded in Central Europe destroyed Basel and many castles nearby. Fires followed. The city was rebuilt.' },
  sempach: { e: 2, y: 1386, i: '🛡️', title: 'The Battle of Sempach', text: 'In 1386 the Confederates defeated Duke Leopold III of Habsburg near Sempach. Later legends tell of Arnold Winkelried, who gathered enemy spears in his arms.' },
  winkelried: { e: 2, y: 1386, nt: 1, i: '🗡️', title: 'Winkelried\'s sacrifice', text: 'Legend: at Sempach, Arnold Winkelried gathered several enemy spears in his arms so that his comrades could break through. The story appears only 150 years after the battle.' },
  konstanz: { e: 2, y: 1414, i: '⚖️', title: 'The Council of Constance', text: 'From 1414 to 1418 church leaders gathered at Constance to end a split with three rival popes. The reformer Jan Hus was burned there in 1415.' },
  basel: { e: 2, y: 1460, i: '🎓', title: 'The University of Basel', text: 'Founded in 1460, it is Switzerland\'s oldest university. Humanists, printers and doctors made Basel a centre of learning.' },
  gutenberg: { e: 2, y: 1450, a: 1, i: '🔤', title: 'Gutenberg\'s printing press', text: 'In Mainz, around 1450, Johannes Gutenberg combined movable metal type, oil-based ink and a press: the first mass-produced books. His 42-line Bible appeared around 1455.' },
  murten: { e: 2, y: 1476, i: '🌳', title: 'The Battle of Murten', text: 'In 1476 the Confederates beat Charles the Bold of Burgundy at Grandson and Murten. Legend tells of a messenger who ran to Fribourg with the news; since 1933 a 17 km race recalls it.' },
  stans: { e: 2, y: 1481, i: '🕊️', title: 'The Stans agreement', text: 'In 1481 the Confederates were close to civil war between cities and rural cantons. The hermit Niklaus von Flüe (Brother Klaus) helped mediate, and Fribourg and Solothurn joined.' },
  saumer: { e: 2, y: 1300, a: 1, nt: 1, i: '🫏', title: 'The Säumer', text: 'Pack-animal drivers, the Säumer, carried goods on mules over the Alpine passes, with loads of about 100 kg each. Paths, hospices and villages grew along their routes.' },
  // era 3: Renaissance & Reformation
  durer: { e: 3, y: 1494, i: '🎨', title: 'Dürer crosses the Alps', text: 'In 1494 the painter Albrecht Dürer from Nuremberg travelled over the Alps to Venice. He brought Italian Renaissance ideas back north.' },
  leonardo: { e: 3, y: 1495, a: 1, i: '🖌️', title: 'Leonardo da Vinci', text: 'At the same time Leonardo painted the Last Supper in Milan: perspective, anatomy, engineering. The Renaissance means "rebirth" of ancient ideas.' },
  swissguard: { e: 3, y: 1506, i: '💂', title: 'The Swiss Guard', text: 'Since 1506 Swiss soldiers have guarded the Pope. Swiss pikemen were hired by kings and popes all over Europe.' },
  marignano: { e: 3, y: 1515, i: '💥', title: 'The Battle of Marignano', text: 'In 1515 the French king and his cannons defeated the Swiss in Italy after two days. The Confederation stopped expanding southwards, a root of Swiss neutrality.' },
  erasmus: { e: 3, y: 1516, i: '📚', title: 'Erasmus in Basel', text: 'The scholar Erasmus of Rotterdam had his Greek New Testament printed in Basel by Johann Froben in 1516. Printing spread new ideas faster than ever.' },
  holbein: { e: 3, y: 1523, a: 1, i: '🖼️', title: 'Holbein\'s portraits', text: 'Hans Holbein the Younger painted in Basel in the 1520s. His portrait of Erasmus is one of the most famous of its time.' },
  luther: { e: 3, y: 1517, i: '⛪', title: 'Luther\'s 95 theses', text: 'In 1517 Martin Luther criticised the sale of indulgences. The printing press carried his ideas across Europe within weeks: the Reformation had begun.' },
  fugger: { e: 3, y: 1521, i: '🏘️', title: 'The Fuggerei', text: 'Jakob Fugger founded the Fuggerei in Augsburg in 1521: the oldest social housing complex still in use. The yearly rent is still one Rhenish guilder (about 0.88 euro) and three daily prayers.' },
  wurst: { e: 3, y: 1522, i: '🌭', title: 'The sausage meal in Zürich', text: 'During Lent 1522 the printer Froschauer served sausages to his workers, against church rules. Zwingli defended them by arguing that only the Bible counts. The Reformation reached Zürich.' },
  paracelsus: { e: 3, y: 1527, i: '⚗️', title: 'Paracelsus', text: 'Born near Einsiedeln, the doctor Paracelsus taught that "the dose makes the poison". He became city physician in Basel in 1527 and challenged old medical books.' },
  zytglogge: { e: 3, y: 1530, i: '🕰️', title: 'The Zytglogge in Bern', text: 'The astronomical clock of Bern was built around 1530 in a tower from the 13th century. It shows the hours, the date, the moon phases and the zodiac.' },
  kappel: { e: 3, y: 1529, i: '🥣', title: 'The Kappeler milk soup', text: 'In 1529 the armies of Zürich and the Catholic cantons stood opposite each other at Kappel. Tradition says soldiers on both sides shared a pot of milk soup on the border, and the war was avoided.' },
  kappel2: { e: 3, y: 1531, i: '🕊️', title: 'The Second Kappel War', text: 'Two years later war did break out and Zwingli fell at Kappel in 1531. The peace that followed allowed each canton to keep its own faith: Switzerland learned to live with two confessions.' },
  vesalius: { e: 3, y: 1543, i: '🫀', title: 'Vesalius\' anatomy', text: 'Andreas Vesalius had his illustrated book on human anatomy printed in Basel in 1543, based on dissections instead of old texts. Medicine became a science.' },
};
const CARD_IDS5 = Object.keys(CARDS5).sort((a, b) => CARDS5[a].e - CARDS5[b].e || CARDS5[a].y - CARDS5[b].y);
const cardCount5 = () => CARD_IDS5.filter(k => L5().cards[k]).length;

// ---------------------------------------------------------------- the four era maps
// ----- era 0: Lake Constance, the Alps and Aachen, ~612–820
const m0Zone = (tx, ty) => tx < 26 ? (ty < 18 ? 'm0aachen' : 'm0steinach') : tx < 50 ? 'm0village' : 'm0muestair';
const m0Lake = (tx, ty) => ((tx - 38) / 15) ** 2 + ((ty - 1) / 4.5) ** 2 < 1;
function m0Base(tx, ty) { const z = m0Zone(tx, ty); return z === 'm0steinach' ? T.F : z === 'm0muestair' ? T.ALP : T.G; }
function m0Terrain(tx, ty, r) {
  const z = m0Zone(tx, ty); let t = m0Base(tx, ty); const k = r();
  if (z === 'm0aachen') { if (k < .05) t = T.BEECH; else if (k < .08) t = T.FLOW; }
  else if (z === 'm0steinach') { if (k < .2) t = T.TREE; else if (k < .3) t = T.PINE; }
  else if (z === 'm0village') { if (k < .12) t = T.FIELD; else if (k < .15) t = T.BEECH; }
  else { if (k < .08) t = T.ROCK; else if (k < .2) t = T.PINE; }
  if (m0Lake(tx, ty)) t = T.WATER;
  if (tx === 0 || ty === 0 || tx === 69 || ty === 43) t = m0Lake(tx, ty) ? T.WATER : T.PINE;
  return t;
}
const BEAR5 = at4(13, 31);
const E5_0 = {
  key: 'early', name: 'The Early Middle Ages', years: '~612–820', pose: 'gallus', music: 'abbey', W: 70, H: 44, seed: 612, from: 612,
  zoneOf: m0Zone, baseTile: m0Base, terrain: m0Terrain,
  paths: [[[36, 23], [34, 23], [34, 20]], [[36, 23], [44, 23], [56, 23], [59, 24]], [[36, 23], [28, 23], [20, 23], [12, 23], [10, 30]], [[20, 23], [18, 16], [15, 12], [15, 11]], [[18, 16], [9, 15], [7, 14]],
    [[44, 23], [44, 20]], [[36, 23], [36, 28], [31, 30]], [[44, 23], [44, 30]], [[56, 23], [60, 32], [64, 35]]],
  buildings: [
    { id: 'cell', x: 8, y: 27, w: 4, h: 3, kind: 'cell' },
    { id: 'scripto', x: 30, y: 15, w: 8, h: 5, kind: 'abbey', label: 'Scriptorium' },
    { id: 'library', x: 41, y: 16, w: 6, h: 4, kind: 'library', label: 'Library' },
    { id: 'hut1', x: 29, y: 27, w: 5, h: 3, kind: 'hut' }, { id: 'hut2', x: 42, y: 27, w: 5, h: 3, kind: 'hut' },
    { id: 'aachen', x: 12, y: 6, w: 6, h: 5, kind: 'palatine', label: 'Sneak in' },
    { id: 'pfalz', x: 4, y: 11, w: 6, h: 3, kind: 'hall', label: 'Throne hall' },
    { id: 'muestair', x: 56, y: 20, w: 7, h: 4, kind: 'convent', label: 'Frescoes' },
    { id: 'portal', x: 63, y: 33, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { m0a: at4(38, 24), m0b: at4(15, 31), m0c: at4(20, 14), m0d: at4(54, 26) },
  start: at4(36, 23),
  signs: [
    sign4(37, 21, 'ST. GALLEN, ~820. A monastery has grown where Gallus once lived as a hermit. The monks pray, farm... and copy books.'),
    sign4(14, 29, 'THE STEINACH FOREST, ~612. The Irish monk Gallus lives here as a hermit. Locals say a bear brings him firewood.'),
    sign4(21, 14, 'AACHEN, ~800. Charlemagne\'s palace. The chapel is brand new and very, very fancy.'),
    sign4(53, 24, 'MÜSTAIR, ~800. A convent high in the Alps with the biggest Carolingian wall paintings still standing.'),
  ],
  zoneNames: { m0aachen: 'Aachen ~800', m0steinach: 'Steinach forest ~612', m0village: 'St. Gallen ~820', m0muestair: 'Müstair ~800' },
  zoneTexts: { m0steinach: 'The Steinach forest... dark, wet, perfect for a hermit. And for bears. 🐻', m0village: 'St. Gallen! The monks here will copy anything you hand them. Slowly. 📜', m0aachen: 'Aachen: warm springs, a palace and a very powerful emperor. ♨️', m0muestair: 'Müstair! Colourful frescoes, high up in the Alps. 🎨' },
  crTexts: ['Monks wrote on parchment made from calf skin. One big Bible could take a whole herd. 🐄', 'Before Charlemagne, handwriting was a mess: words ran together and letters were all over the place.', 'Irish monks crossed the sea to teach Central Europe. The first wandering hippies. Respect. ☘️', 'Monasteries brewed beer. Elio would love this place. 🍺'],
};
// ----- era 1: Central Switzerland, Lake Geneva and Zürich, ~1230–1315
const m1Zone = (tx, ty) => tx < 20 ? 'm1chillon' : ty < 14 ? (tx < 50 ? 'm1habsburg' : 'm1zuerich') : tx >= 50 && ty < 34 ? 'm1morgarten' : ty >= 34 ? 'm1gotthard' : 'm1uri';
const m1Water = (tx, ty) => (tx < 8 + 1.5 * Math.sin(ty * .3) && ty > 14) || (ty >= 24 && ty <= 27 && tx >= 27 && tx <= 49) || (tx >= 35 && tx <= 38 && ty >= 17 && ty <= 33) || (((tx - 64) / 4) ** 2 + ((ty - 22) / 6) ** 2 < 1) || (ty > 33 && Math.abs(tx - (40 + Math.sin(ty * .4))) < 1);
function m1Base(tx, ty) { const z = m1Zone(tx, ty); return z === 'm1gotthard' ? (ty >= 42 ? T.SNOW : T.ALP) : T.G; }
function m1Terrain(tx, ty, r) {
  const z = m1Zone(tx, ty); let t = m1Base(tx, ty); const k = r();
  if (z === 'm1chillon') { if (tx > 9 && ty > 16 && ty < 40 && tx < 18 && k < .7) t = T.VINE; else if (k < .04) t = T.TREE; }
  else if (z === 'm1habsburg' || z === 'm1zuerich') { if (k < .06) t = T.BEECH; else if (k < .09) t = T.TREE; }
  else if (z === 'm1morgarten') { if (k < .12) t = T.PINE; else if (k < .2) t = T.ROCK; else if (k < .24) t = T.TREE; }
  else if (z === 'm1uri') { if (k < .05) t = T.TREE; else if (k < .11) t = T.PINE; }
  else { if (k < .12) t = T.ROCK; else if (k < .18) t = T.PINE; }
  if (m1Water(tx, ty)) t = T.WATER;
  if (tx === 0 || ty === 0 || tx === 75 || ty === 47) t = m1Water(tx, ty) ? T.WATER : T.PINE;
  return t;
}
const E5_1 = {
  key: 'high', name: 'The High Middle Ages', years: '~1230–1315', pose: 'hadlaub', music: 'minne', W: 76, H: 48, seed: 1291, from: 1230,
  zoneOf: m1Zone, baseTile: m1Base, terrain: m1Terrain, snowyPine: (tx, ty) => ty >= 38,
  paths: [[[33, 31], [29, 31], [29, 30]], [[33, 31], [33, 35], [43, 35], [43, 31]], [[43, 35], [43, 43]], [[33, 31], [26, 31], [26, 20], [26, 12], [38, 12], [38, 10]], [[38, 12], [59, 12], [59, 10]], [[59, 12], [58, 16], [58, 21]],
    [[58, 21], [58, 30], [71, 30]], [[26, 31], [20, 31], [15, 31], [15, 29]], [[15, 31], [15, 35], [14, 41]]],
  buildings: [
    { id: 'habsburg', x: 34, y: 4, w: 8, h: 6, kind: 'castle', label: 'Castle' },
    { id: 'manesse', x: 56, y: 6, w: 7, h: 4, kind: 'townhall', label: 'Codex Manesse' },
    { id: 'fach1', x: 62, y: 9, w: 4, h: 3, kind: 'fachwerk' }, { id: 'fach2', x: 68, y: 5, w: 4, h: 3, kind: 'fachwerk' },
    { id: 'chillon', x: 12, y: 24, w: 7, h: 5, kind: 'chillon', label: 'Sneak in' },
    { id: 'lausanne', x: 11, y: 36, w: 6, h: 5, kind: 'cathedral', label: 'Cathedral' },
    { id: 'ruetli', x: 28, y: 28, w: 3, h: 2, kind: 'oathstones', label: 'Oath' },
    { id: 'hatpole', x: 42, y: 29, w: 3, h: 2, kind: 'hatpole', label: 'Apple shot' },
    { id: 'devil', x: 41, y: 40, w: 5, h: 3, kind: 'devilsbridge', label: 'Bridge' },
    { id: 'ambush', x: 56, y: 18, w: 4, h: 3, kind: 'rockpile', label: 'Ambush' },
    { id: 'portal', x: 70, y: 28, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { m1a: at4(31, 32), m1b: at4(25, 22), m1c: at4(57, 14), m1d: at4(46, 38) },
  start: at4(33, 31),
  signs: [
    sign4(31, 30, 'RÜTLI MEADOW. By legend, three men swore an oath here in 1291. The real treaty is a piece of parchment.'),
    sign4(44, 33, 'ALTDORF, URI. A hat on a pole, and everyone must bow to it... (a legend, of course!)'),
    sign4(47, 41, 'SCHÖLLENEN GORGE. A roaring river, nothing but rock... and a famous bridge.'),
    sign4(37, 13, 'HABSBURG. A castle in Aargau, home of a family that will one day rule half of Europe.'),
    sign4(57, 11, 'ZÜRICH, ~1300. Guilds, mills, and a very famous songbook.'),
    sign4(55, 22, 'MORGARTEN, 1315. A narrow pass between the lake and the steep slope. Perfect for an ambush.'),
  ],
  zoneNames: { m1chillon: 'Lake Geneva ~1250', m1habsburg: 'Habsburg ~1230', m1zuerich: 'Zürich ~1300', m1morgarten: 'Morgarten 1315', m1gotthard: 'Gotthard ~1230', m1uri: 'Uri & Schwyz 1291' },
  zoneTexts: { m1uri: 'The heart of old Switzerland: Uri, Schwyz and Unterwalden. ⛰️', m1gotthard: 'The Gotthard. Everything north-south goes through here. 🫏', m1chillon: 'Lake Geneva! Vineyards, and a castle on a rock in the water. 🍇', m1morgarten: 'Morgarten. Very narrow. Very steep. Very suspicious. 🪨', m1zuerich: 'Zürich! Guilds, bridges, poets. And no banks. Yet. 🎶', m1habsburg: 'Habsburg territory. Smile and look harmless. 😬' },
  crTexts: ['Minnesang: songs about love, usually unrequited. My kind of poetry. 🎶', 'Castle windows were tiny and drafty. Nice for archers, terrible for architects.', 'The Gotthard route made Uri rich: tolls, mules and mountain cheese. 🧀', 'Everyone in this century says "the Emperor" like he is next door. He is in Italy. Mostly.'],
};
// ----- era 2: Luzern, Basel, Murten and Mainz, ~1333–1481
const m2Zone = (tx, ty) => tx < 18 ? 'm2murten' : ty < 14 ? (tx < 46 ? 'm2basel' : 'm2mainz') : tx >= 46 ? 'm2konstanz' : ty >= 34 ? 'm2gotthard' : 'm2luzern';
const m2Water = (tx, ty) => (((tx - 6) / 6) ** 2 + ((ty - 24) / 9) ** 2 < 1) || (((tx - 31) / 10) ** 2 + ((ty - 26) / 4.5) ** 2 < 1) || (((tx - 68) / 6) ** 2 + ((ty - 27) / 5) ** 2 < 1) || (ty >= 3 && ty <= 4 && tx >= 20 && tx < 45);
function m2Base(tx, ty) { return m2Zone(tx, ty) === 'm2gotthard' ? (ty >= 42 ? T.SNOW : T.ALP) : T.G; }
function m2Terrain(tx, ty, r) {
  const z = m2Zone(tx, ty); let t = m2Base(tx, ty); const k = r();
  if (z === 'm2gotthard') { if (k < .12) t = T.ROCK; else if (k < .2) t = T.PINE; }
  else if (z === 'm2luzern' || z === 'm2murten') { if (k < .06) t = T.BEECH; else if (k < .1) t = T.TREE; else if (k < .13) t = T.FLOW; }
  else { if (k < .07) t = T.BEECH; else if (k < .1) t = T.TREE; else if (k < .22 && z === 'm2konstanz') t = T.FIELD; }
  if (m2Water(tx, ty)) t = T.WATER;
  if (tx === 0 || ty === 0 || tx === 75 || ty === 45) t = m2Water(tx, ty) ? T.WATER : T.PINE;
  return t;
}
const E5_2 = {
  key: 'late', name: 'The Late Middle Ages', years: '~1333–1481', pose: 'gutenberg', music: 'gothic', W: 76, H: 46, seed: 1476, from: 1333,
  zoneOf: m2Zone, baseTile: m2Base, terrain: m2Terrain, snowyPine: (tx, ty) => ty >= 40,
  paths: [cob5([[31, 33], [19, 33], [19, 20], [31, 20]]), [[19, 20], [19, 12], [27, 12], [27, 10]], cob5([[27, 12], [37, 12], [37, 9]]), [[37, 12], [57, 12], [57, 9]], [[31, 33], [27, 33], [27, 39], [33, 39]],
    [[31, 33], [41, 33], [41, 31]], [[41, 33], [45, 33]], [[45, 33], [55, 33], [55, 22]], [[55, 33], [67, 33], [67, 40]], [[19, 33], [15, 33], [15, 39]]],
  buildings: [
    { id: 'kapell', x: 27, y: 17, w: 8, h: 3, kind: 'kapellbruecke', label: 'Sneak in' },
    { id: 'press', x: 54, y: 5, w: 6, h: 4, kind: 'pressshop', label: 'Printing press' },
    { id: 'stable', x: 30, y: 36, w: 6, h: 3, kind: 'stable', label: 'Mule train' },
    { id: 'hospital', x: 24, y: 6, w: 6, h: 4, kind: 'hospital', label: 'Doctor' },
    { id: 'muenster', x: 34, y: 4, w: 7, h: 5, kind: 'cathedral', label: 'University' },
    { id: 'wall', x: 12, y: 36, w: 6, h: 3, kind: 'townwall', label: 'Messenger' },
    { id: 'council', x: 52, y: 18, w: 7, h: 4, kind: 'townhall', label: 'Council' },
    { id: 'winkel', x: 40, y: 29, w: 2, h: 2, kind: 'monument', label: 'Memorial' },
    { id: 'ranft', x: 44, y: 30, w: 3, h: 3, kind: 'cell', label: 'Hermit' },
    { id: 'fach1', x: 20, y: 7, w: 4, h: 3, kind: 'fachwerk' }, { id: 'fach2', x: 42, y: 8, w: 4, h: 3, kind: 'fachwerk' },
    { id: 'portal', x: 66, y: 38, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { m2a: at4(29, 34), m2b: at4(30, 12), m2c: at4(50, 12), m2d: at4(36, 40) },
  start: at4(31, 33),
  signs: [
    sign4(32, 21, 'LUZERN, ~1333. A covered wooden bridge zigzags across the Reuss and doubles as part of the city wall.'),
    sign4(31, 11, 'BASEL, 1356. A great earthquake shook the city, and fires finished the job. Rebuilding has begun.'),
    sign4(56, 11, 'MAINZ, ~1450. It smells of ink and hot metal. Someone is up to something with little metal letters.'),
    sign4(18, 40, 'MURTEN, 1476. Charles the Bold of Burgundy is besieging the little town.'),
    sign4(42, 32, 'SEMPACH, 1386. Here the Confederates defeated the Habsburg knights.'),
    sign4(34, 34, 'THE GOTTHARD ROAD. Mules, merchants, monks and the occasional avalanche.'),
  ],
  zoneNames: { m2luzern: 'Luzern ~1333', m2murten: 'Murten 1476', m2basel: 'Basel ~1356', m2mainz: 'Mainz ~1450', m2konstanz: 'Constance ~1414', m2gotthard: 'The Gotthard road' },
  zoneTexts: { m2luzern: 'Luzern! Home town of... well, of Sarah, in a few centuries. 🌉', m2basel: 'Basel: the new university, the Rhine and a very nervous doctor. 🎓', m2mainz: 'Mainz. Listen: *clunk, clunk*. The sound of the future. 🔤', m2murten: 'Murten: city walls, a lake and an army outside. ⚔️', m2konstanz: 'Constance: a church council with more popes than rooms. ⚖️', m2gotthard: 'The mule track over the Gotthard. Watch your step. 🫏' },
  crTexts: ['Before printing, one book took a scribe a year. Gutenberg makes 200 copies in the same time. 🔤', 'Do not touch the rats. Do not touch ANYTHING. 🐀', 'Luzern\'s bridge has the plague paintings... in 300 years. Spoilers!', 'Swiss pikemen are the most feared soldiers in Europe. Politely stay out of their way.'],
};
// ----- era 3: Basel, Zürich, Bern, Augsburg and Kappel, ~1494–1531
const m3Zone = (tx, ty) => ty < 12 ? 'm3augsburg' : tx < 30 ? (ty < 34 ? 'm3basel' : 'm3bern') : (tx < 56 && ty < 30) ? 'm3zuerich' : 'm3kappel';
const m3Water = (tx, ty) => (((tx - 42) / 7) ** 2 + ((ty - 24) / 3.5) ** 2 < 1) || (Math.abs(tx - (8 + Math.sin(ty * .3))) < 1.1 && ty >= 14 && ty <= 33);
function m3Base(tx, ty) { return T.G; }
function m3Terrain(tx, ty, r) {
  const z = m3Zone(tx, ty); let t = T.G; const k = r();
  if (z === 'm3kappel') { if (k < .09) t = T.PINE; else if (k < .14) t = T.TREE; else if (k < .26) t = T.FIELD; }
  else if (z === 'm3bern' || z === 'm3basel') { if (k < .06) t = T.BEECH; else if (k < .09) t = T.TREE; else if (k < .12) t = T.FLOW; }
  else { if (k < .06) t = T.BEECH; else if (k < .09) t = T.TREE; else if (z === 'm3zuerich' && ty > 28 && k < .2) t = T.VINE; }
  if (m3Water(tx, ty)) t = T.WATER;
  if (tx === 0 || ty === 0 || tx === 79 || ty === 47) t = m3Water(tx, ty) ? T.WATER : T.PINE;
  return t;
}
const E5_3 = {
  key: 'renaissance', name: 'Renaissance & Reformation', years: '~1494–1531', pose: 'paracelsus', music: 'renaiss', W: 80, H: 48, seed: 1529, from: 1494,
  zoneOf: m3Zone, baseTile: m3Base, terrain: m3Terrain,
  paths: [cob5([[20, 31], [24, 31], [24, 29]]), cob5([[20, 31], [19, 31], [19, 22]]), [[24, 31], [33, 31], [33, 15], [39, 15], [39, 17]], [[39, 15], [49, 15], [49, 19]], [[33, 15], [33, 8], [34, 8]], cob5([[20, 31], [20, 38], [12, 38], [12, 44]]),
    [[24, 31], [46, 31], [46, 41]], [[46, 41], [62, 41]], [[46, 31], [71, 31], [71, 32]]],
  buildings: [
    { id: 'froben', x: 16, y: 18, w: 6, h: 4, kind: 'pressshop', label: 'Erasmus' },
    { id: 'apothecary', x: 22, y: 26, w: 5, h: 3, kind: 'apothecary', label: 'Paracelsus' },
    { id: 'froschauer', x: 36, y: 14, w: 6, h: 3, kind: 'fachwerk', label: 'Sausages' },
    { id: 'grossmuenster', x: 46, y: 14, w: 7, h: 5, kind: 'cathedral', label: 'Zwingli' },
    { id: 'zytglogge', x: 10, y: 38, w: 4, h: 6, kind: 'zytglogge', label: 'Clock' },
    { id: 'fugger', x: 30, y: 3, w: 9, h: 5, kind: 'fuggerei', label: 'Sneak in' },
    { id: 'camp', x: 60, y: 38, w: 4, h: 3, kind: 'tent', label: 'Marignano' },
    { id: 'cauldron', x: 44, y: 38, w: 4, h: 3, kind: 'cauldron', label: 'Soup' },
    { id: 'fach1', x: 26, y: 20, w: 4, h: 3, kind: 'fachwerk' }, { id: 'fach2', x: 58, y: 22, w: 4, h: 3, kind: 'fachwerk' },
    { id: 'portal', x: 70, y: 30, w: 2, h: 2, kind: 'portal', label: 'Portal stone' },
  ],
  crSpots: { m3a: at4(22, 33), m3b: at4(36, 18), m3c: at4(32, 10), m3d: at4(48, 36) },
  start: at4(20, 31),
  signs: [
    sign4(18, 24, 'BASEL, ~1520. Printing shops on every corner. Even the cobblestones seem to read.'),
    sign4(35, 17, 'ZÜRICH, 1522. A preacher named Zwingli is stirring up trouble. Sausage-shaped trouble.'),
    sign4(15, 41, 'BERN, 1530. The Zytglogge, the astronomical clock, is brand new.'),
    sign4(33, 9, 'AUGSBURG, 1521. Rich merchants, banking, and an unusual housing project.'),
    sign4(47, 36, 'KAPPEL, 1529. Two armies on a meadow, a milk pot in between.'),
    sign4(60, 41, 'MARIGNANO, 1515. The Swiss pikemen met French cannons. Cannons won.'),
  ],
  zoneNames: { m3basel: 'Basel ~1520', m3zuerich: 'Zürich 1522', m3bern: 'Bern 1530', m3augsburg: 'Augsburg 1521', m3kappel: 'Kappel 1529' },
  zoneTexts: { m3basel: 'Basel! Erasmus, Holbein, Froben: the smartest street in Europe. 📚', m3zuerich: 'Zürich: Zwingli\'s city. Strong opinions, excellent sausages. 🌭', m3bern: 'Bern: bears, arcades and a magnificent new clock. 🕰️', m3augsburg: 'Augsburg: the Fuggers are richer than most kings. 💰', m3kappel: 'Kappel: farmland on the border between two faiths. 🥣' },
  crTexts: ['"The dose makes the poison." Remember that at the next fondue. 🧀', 'Everyone has an opinion about religion this decade. Print shops make a fortune.', 'Perspective! Everything gets a vanishing point now. Architects, rejoice! 📐', 'Swiss mercenaries are in demand: popes, kings, emperors. Every war needs a pike.'],
};
const ERAS5 = [E5_0, E5_1, E5_2, E5_3];
const ERA5OF = () => ERAS5[L5().era] || E5_0;
// main quests per era ('sk_x' = a sketch); era done = all of them
const MAINS5 = [['firewood', 'scripto', 'sk_stgall', 'sk_aachen'], ['devil', 'apple', 'oath', 'ambush', 'sk_chillon'], ['press', 'saumer', 'plague', 'murten', 'sk_kapell'], ['dose', 'erasmus', 'wurst', 'marignano', 'soup', 'sk_fugger']];
const MAIN_NAMES5 = {
  firewood: 'Help Gallus and his bear with the firewood', scripto: 'Learn to copy books in the scriptorium of St. Gallen', sk_stgall: 'Sketch the Plan of St. Gall in the library', sk_aachen: 'Sneak into the Palatine Chapel at Aachen and sketch',
  devil: 'Outsmart the devil at the Devil\'s Bridge', apple: 'Take the apple shot at Altdorf', oath: 'Swear the oath at the Rütli meadow', ambush: 'Join the ambush at Morgarten', sk_chillon: 'Sneak into Château de Chillon and sketch',
  press: 'Set type in Gutenberg\'s printing shop', saumer: 'Lead a mule over the Gotthard', plague: 'Learn about the plague from the doctor', murten: 'Run the Murten messenger race', sk_kapell: 'Sneak onto the Kapellbrücke at night and sketch',
  dose: 'Help Paracelsus with the right dose', erasmus: 'Talk to Erasmus in Froben\'s printing shop', wurst: 'Join the sausage meal in Zürich', marignano: 'Meet the Swiss mercenaries at Marignano', soup: 'Stir the milk soup at Kappel', sk_fugger: 'Sneak into the Fuggerei in Augsburg and sketch',
};
const SKETCHES5 = [
  ['stgall', 0, 'The Plan of St. Gall', 'An ideal monastery on five sheets of parchment: church, library, infirmary, garden, brewery... It was never built exactly like this, but it shows how people imagined a perfect community around 820.'],
  ['aachen', 0, 'The Palatine Chapel', 'An octagon crowned by a dome, with a two-storey gallery. Built around 800, it copies San Vitale in Ravenna: Charlemagne wanted to be the new Roman emperor in stone.'],
  ['chillon', 1, 'Château de Chillon', 'A castle on a rock island with a Gothic hall, thick towers and a spiral stair. The Counts of Savoy built it to control the road along the lake.'],
  ['kapell', 2, 'The Kapellbrücke', 'A covered wooden bridge with an octagonal water tower. The roof beams carry painted triangular panels. Part bridge, part wall, part picture gallery.'],
  ['fugger', 3, 'The Fuggerei', 'Small terraced houses around lanes and a gate that closes at night. Built 1521 for poor citizens: the oldest social housing still in use, with a yearly rent of one guilder.'],
];
const SKETCH_ICON5 = { stgall: '📜', aachen: '⛪', chillon: '🏰', kapell: '🌉', fugger: '🏘️' };
const eraDone5 = e => MAINS5[e].every(k => k.startsWith('sk_') ? L5().sk[k.slice(3)] : q5(k));
const missing5 = e => MAINS5[e].filter(k => k.startsWith('sk_') ? !L5().sk[k.slice(3)] : !q5(k));
// ---------------------------------------------------------------- people of the Middle Ages (shared look table with Level 4)
const monk5 = (col, beard, more) => ({ shirt: col, pants: col, hair: '#6a4a2a', beard, extra: (x, y) => { R(x - 4, y - 19, 8, 2, col); R(x - 4, y - 17, 1, 5, col); R(x + 3, y - 17, 1, 5, col); R(x - 4, y - 7, 8, 1, '#e8dcc0'); if (more) more(x, y); } });
const LOOKS5 = {
  'Othmar': monk5('#5a4632', '#d8d0c0', (x, y) => R(x + 5, y - 24, 1, 22, '#8a6a3a')),
  'Librarian': monk5('#6a5a4a', null, (x, y) => { R(x + 5, y - 12, 4, 5, '#b8956a'); R(x - 3, y - 15, 6, 1, '#222'); }),
  'Alcuin': { shirt: '#3a4a7a', pants: '#2a3a5a', hair: '#6a5a4a', beard: '#6a5a4a', extra: (x, y) => { R(x + 5, y - 12, 4, 5, '#e8d8a0'); R(x - 4, y - 20, 8, 2, '#3a4a7a'); } },
  'Charlemagne': { shirt: '#6a2a8a', pants: '#8a6a3a', hair: '#c8a040', beard: '#c8a040', extra: (x, y) => { R(x - 4, y - 22, 8, 3, '#ffd34d'); R(x - 3, y - 23, 1, 1, '#ffd34d'); R(x, y - 23, 1, 1, '#ffd34d'); R(x + 3, y - 23, 1, 1, '#ffd34d'); R(x - 5, y - 11, 1, 9, '#c8302a'); } },
  'Alemann': { shirt: '#4a7a3a', pants: '#7a5a3a', hair: '#c8a040', beard: '#c8a040', extra: (x, y) => { R(x - 5, y - 18, 2, 8, '#c8a040'); R(x + 3, y - 18, 2, 8, '#c8a040'); R(x + 5, y - 24, 1, 22, '#8a6a3a'); } },
  'Nun': { shirt: '#f4f0e8', pants: '#2a2a2a', hair: '#2a2a2a', extra: (x, y) => { R(x - 4, y - 20, 8, 3, '#2a2a2a'); R(x - 5, y - 17, 2, 9, '#2a2a2a'); R(x + 3, y - 17, 2, 9, '#2a2a2a'); } },
  'Urner': { shirt: '#e8c02a', pants: '#3a3a3a', hair: '#3a2a1e', beard: '#3a2a1e', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#222'); R(x - 5, y - 19, 10, 1, '#222'); R(x + 5, y - 12, 3, 3, '#e8d8b0'); } },
  'Elder': { shirt: '#4a6a4a', pants: '#4a3a2a', hair: '#e8e8e8', beard: '#e8e8e8', extra: (x, y) => { R(x - 3, y - 14, 6, 5, '#e8e8e8'); R(x - 4, y - 20, 8, 2, '#4a6a4a'); R(x + 5, y - 22, 1, 20, '#6a4a2a'); } },
  'Gessler': { shirt: '#a82a2a', pants: '#2a2a2a', hair: '#3a2a1e', beard: '#3a2a1e', extra: (x, y) => { R(x - 5, y - 19, 10, 2, '#2a2a2a'); R(x - 3, y - 23, 6, 4, '#2a2a2a'); R(x + 2, y - 28, 1, 6, '#e8e0d0'); R(x - 4, y - 12, 8, 2, '#d9a400'); } },
  'Knight': { shirt: '#8a8a94', pants: '#6a6a74', hair: '#3a2a1e', extra: (x, y) => { R(x - 4, y - 21, 8, 5, '#9a9aa4'); R(x - 1, y - 24, 2, 3, '#c8302a'); R(x - 4, y - 12, 8, 5, '#f4f0e8'); R(x - 1, y - 12, 2, 5, '#c8302a'); R(x + 5, y - 22, 1, 20, '#8a8a94'); } },
  'Mason': { shirt: '#a89a7a', pants: '#6a5a4a', hair: '#4a3a2a', extra: (x, y) => { R(x - 4, y - 8, 8, 8, '#7a5a3a'); R(x - 4, y - 20, 8, 3, '#c8c0a8'); R(x + 5, y - 12, 3, 5, '#9a948a'); } },
  'Count Peter': { shirt: '#c82a2a', pants: '#e8e0d0', hair: '#4a3a2a', beard: '#4a3a2a', extra: (x, y) => { R(x - 1, y - 12, 2, 6, '#f4f0e8'); R(x - 3, y - 10, 6, 2, '#f4f0e8'); R(x - 4, y - 21, 8, 3, '#d9a400'); } },
  'Fust': { shirt: '#8a2a4a', pants: '#3a2a3a', hair: '#3a2a1e', beard: '#3a2a1e', extra: (x, y) => { R(x - 5, y - 20, 10, 3, '#c82a2a'); R(x - 4, y - 12, 8, 1, '#d9a400'); R(x + 5, y - 10, 4, 4, '#d9a400'); } },
  'Doctor': { shirt: '#2a2a2a', pants: '#2a2a2a', hair: '#222', extra: (x, y) => { R(x - 4, y - 21, 8, 4, '#2a2a2a'); R(x - 3, y - 18, 6, 6, '#2a2a2a'); R(x + 3, y - 15, 5, 2, '#d8d0c0'); R(x + 7, y - 14, 1, 1, '#d8d0c0'); R(x - 2, y - 16, 1, 1, '#ffd34d'); R(x + 1, y - 16, 1, 1, '#ffd34d'); R(x + 5, y - 24, 1, 22, '#6a4a2a'); } },
  'Säumer': { shirt: '#7a5a3a', pants: '#4a3a2a', hair: '#5a3a1e', beard: '#5a3a1e', extra: (x, y) => { R(x - 5, y - 19, 10, 2, '#5a4a3a'); R(x - 3, y - 22, 6, 3, '#5a4a3a'); R(x + 5, y - 12, 3, 6, '#8a6a3a'); } },
  'Runner': { shirt: '#e8e0d0', pants: '#6a4a2a', hair: '#4a3a2a', extra: (x, y) => { R(x - 4, y - 20, 8, 2, '#4a3a2a'); R(x + 4, y - 22, 5, 6, '#4a8a3a'); R(x + 5, y - 24, 3, 3, '#6aaa5a'); } },
  'Hus': { shirt: '#8a8a8a', pants: '#6a6a6a', hair: '#6a4a2a', beard: '#6a4a2a', extra: (x, y) => { R(x - 4, y - 19, 8, 2, '#8a8a8a'); R(x - 4, y - 17, 1, 5, '#8a8a8a'); R(x + 3, y - 17, 1, 5, '#8a8a8a'); R(x + 5, y - 12, 4, 5, '#e8d8a0'); } },
  'Brother Klaus': { shirt: '#7a7468', pants: '#6a645a', hair: '#c8c0b0', beard: '#c8c0b0', extra: (x, y) => { R(x - 3, y - 14, 6, 6, '#c8c0b0'); R(x - 5, y - 19, 10, 2, '#c8c0b0'); R(x + 5, y - 24, 1, 22, '#6a4a2a'); R(x - 4, y - 7, 8, 1, '#e8e0d0'); } },
  'Pikeman': { shirt: '#c8a040', pants: '#a83a3a', hair: '#4a3a2a', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#222'); R(x - 1, y - 25, 2, 4, '#c82a2a'); R(x + 5, y - 34, 1, 32, '#8a6a3a'); R(x + 4, y - 37, 3, 4, '#c8c8d0'); R(x - 4, y - 12, 8, 1, '#2a6ab8'); } },
  'Charles': { shirt: '#2a2a6a', pants: '#8a8a94', hair: '#2a1a10', beard: '#2a1a10', extra: (x, y) => { R(x - 4, y - 22, 8, 4, '#d9a400'); R(x - 3, y - 12, 6, 2, '#d9a400'); R(x - 5, y - 11, 1, 9, '#a82a2a'); } },
  'Erasmus': { shirt: '#2a2a2a', pants: '#2a2a2a', hair: '#c8b898', extra: (x, y) => { R(x - 5, y - 20, 10, 3, '#8a2a2a'); R(x - 4, y - 22, 8, 2, '#8a2a2a'); R(x + 5, y - 12, 4, 5, '#e8d8a0'); R(x - 4, y - 9, 8, 1, '#5a3a2a'); } },
  'Holbein': { shirt: '#4a6aa0', pants: '#3a3a4a', hair: '#5a3a1e', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#2a2a2a'); R(x + 5, y - 14, 1, 8, '#6a4a2a'); R(x + 5, y - 15, 2, 2, '#c82a2a'); R(x - 4, y - 11, 8, 1, '#d9a400'); } },
  'Froschauer': { shirt: '#e8e0d0', pants: '#5a4a3a', hair: '#4a3a2a', extra: (x, y) => { R(x - 4, y - 8, 8, 8, '#8a6a40'); R(x - 2, y - 6, 1, 1, '#222'); R(x + 1, y - 5, 2, 1, '#222'); R(x + 5, y - 10, 4, 3, '#c86a3a'); } },
  'Zwingli': { shirt: '#1a1a1a', pants: '#1a1a1a', hair: '#5a4a3a', beard: '#5a4a3a', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#1a1a1a'); R(x - 3, y - 12, 6, 1, '#e8e8e8'); R(x + 5, y - 12, 4, 5, '#e8d8a0'); } },
  'Reisläufer': { shirt: '#c82a2a', pants: '#e8c02a', hair: '#4a3a2a', extra: (x, y) => { R(x - 5, y - 20, 10, 2, '#2a2a2a'); R(x + 1, y - 27, 1, 8, '#e8e0d0'); R(x + 3, y - 25, 1, 6, '#c82a2a'); R(x - 4, y - 11, 8, 2, '#2a6ab8'); R(x + 5, y - 30, 1, 28, '#8a6a3a'); } },
  'Fugger': { shirt: '#1a1a1a', pants: '#1a1a1a', hair: '#8a7a5a', beard: '#8a7a5a', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#1a1a1a'); R(x - 4, y - 12, 8, 1, '#ffd34d'); R(x - 2, y - 10, 4, 1, '#ffd34d'); } },
  'Dürer': { shirt: '#8a5a3a', pants: '#3a2a1e', hair: '#7a5a2a', beard: '#7a5a2a', extra: (x, y) => { R(x - 5, y - 18, 2, 9, '#7a5a2a'); R(x + 3, y - 18, 2, 9, '#7a5a2a'); R(x - 4, y - 21, 8, 3, '#2a2a2a'); R(x + 5, y - 12, 4, 5, '#e8d8a0'); } },
  'Watchman': { shirt: '#5a5a6a', pants: '#3a3a4a', hair: '#3a2a1e', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#6a6a74'); R(x + 5, y - 12, 3, 4, '#d9a400'); R(x + 5, y - 9, 3, 1, '#222'); } },
  'Clockmaker': { shirt: '#3a5a7a', pants: '#4a3a2a', hair: '#5a4a3a', extra: (x, y) => { R(x - 4, y - 8, 8, 8, '#6a5a4a'); R(x + 5, y - 12, 4, 4, '#d9a400'); } },
  'Zürcher': { shirt: '#2a5ab8', pants: '#e8e0d0', hair: '#4a3a2a', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#222'); R(x + 5, y - 12, 1, 12, '#8a6a3a'); R(x + 4, y - 14, 3, 3, '#e8e0d0'); } },
  'Innerschweizer': { shirt: '#c8302a', pants: '#e8e0d0', hair: '#4a3a2a', extra: (x, y) => { R(x - 4, y - 21, 8, 3, '#222'); R(x + 5, y - 12, 1, 12, '#8a6a3a'); R(x + 4, y - 14, 3, 3, '#e8e0d0'); } },
  'Guildmaster': { shirt: '#3a5a8a', pants: '#4a3a2a', hair: '#5a4a3a', beard: '#5a4a3a', extra: (x, y) => { R(x - 5, y - 20, 10, 3, '#c8a040'); R(x - 4, y - 12, 8, 1, '#d9a400'); } },
};
Object.assign(LOOKS4, LOOKS5);
for (const n in LOOKS5) PORTRAITS[n] = () => drawPerson(0, 0, LOOKS5[n]);
PORTRAITS['Bear'] = () => drawBear5(0, 0, 1.4, time);
Object.assign(SPEAKER_COL, { 'Othmar': '#c8a878', 'Librarian': '#c8b090', 'Alcuin': '#8ab0ff', 'Charlemagne': '#d0a0ff', 'Alemann': '#9fe09f', 'Nun': '#f0f0e8', 'Bear': '#c8a070', 'Urner': '#ffd34d', 'Elder': '#c8e0c8', 'Gessler': '#ff8a8a', 'Knight': '#c8c8d8', 'Mason': '#d0c0a0',
  'Count Peter': '#ff9a9a', 'Fust': '#ff9ac0', 'Doctor': '#b8b8b8', 'Säumer': '#d0b080', 'Runner': '#9fe09f', 'Hus': '#c8c8c8', 'Brother Klaus': '#e0d8c8', 'Pikeman': '#ffd080', 'Charles': '#a0a0ff', 'Erasmus': '#ff9a9a', 'Holbein': '#8ab0ff', 'Froschauer': '#ffd0a0', 'Zwingli': '#d0d0d0',
  'Reisläufer': '#ff8a8a', 'Fugger': '#ffd34d', 'Dürer': '#d0a070', 'Watchman': '#a0a0b0', 'Clockmaker': '#a0c0e0', 'Zürcher': '#8ab0ff', 'Innerschweizer': '#ff8a8a', 'Guildmaster': '#8ab0ff' });
// who stands where in each era
const NPCS5 = [
  [['Othmar', 35, 21], ['Alemann', 31, 25], ['Librarian', 46, 21], ['Alcuin', 39, 21], ['Charlemagne', 9, 15], ['Nun', 58, 25]],
  [['Urner', 45, 42], ['Elder', 30, 31], ['Gessler', 44, 32], ['Knight', 40, 11], ['Mason', 16, 40], ['Count Peter', 17, 30]],
  [['Fust', 55, 10], ['Doctor', 28, 11], ['Säumer', 34, 40], ['Runner', 16, 40], ['Hus', 54, 23], ['Brother Klaus', 46, 34], ['Pikeman', 43, 32], ['Charles', 17, 35], ['Guildmaster', 36, 11]],
  [['Erasmus', 19, 23], ['Holbein', 21, 24], ['Froschauer', 40, 17], ['Zwingli', 48, 20], ['Reisläufer', 61, 42], ['Fugger', 35, 9], ['Dürer', 33, 12], ['Watchman', 28, 9], ['Clockmaker', 12, 43], ['Zürcher', 44, 40], ['Innerschweizer', 48, 40]],
];
const HAZ_SPAWN5 = [
  [['wolf', 8, 36], ['wolf', 18, 34], ['wolf', 5, 24], ['boar', 62, 28]],
  [['soldier', 36, 12], ['soldier', 46, 12], ['wolf', 55, 26], ['wolf', 46, 44], ['wolf', 22, 22]],
  [['rat', 24, 35], ['rat', 38, 32], ['rat', 20, 12], ['rat', 50, 28], ['soldier', 10, 40]],
  [['bull', 52, 34], ['bull', 60, 26], ['soldier', 66, 40]],
];
Object.assign(HAZ4, {
  wolf: { sp: 66, range: 100, leash: 220, wsp: 18, hit: 11, msg: 'AROOO!' }, soldier: { sp: 50, range: 70, leash: 160, wsp: 14, hit: 11, msg: 'Halt!' },
  rat: { sp: 76, range: 50, leash: 90, wsp: 20, hit: 8, msg: 'Squeak!' }, bull: { sp: 72, range: 70, leash: 130, wsp: 8, hit: 13, msg: 'MOO!' },
});
let G5 = { npcs: [], haz: [], bear: null };
function l5Spawn() {
  const e = L5().era, at = (tx, ty) => { const [x, y] = nearReach(tx, ty); return { x: x * 16 + 8, y: y * 16 + 10 }; };
  const mob = (tx, ty, extra) => { const p = at(tx, ty); return { ...p, hx: p.x, hy: p.y, t: 0, vx: 0, vy: 0, face: 1, anim: 0, cool: 0, ...extra }; };
  G5 = { npcs: NPCS5[e].map(([name, tx, ty]) => ({ name, ...at(tx, ty) })), haz: HAZ_SPAWN5[e].map(([kind, tx, ty]) => mob(tx, ty, { kind })), bear: e === 0 ? { x: BEAR5.x, y: BEAR5.y } : null };
}
function l5Update(dt) {
  for (const h of G5.haz) {
    const K = HAZ4[h.kind], d = dist(h.x, h.y, P.x, P.y);
    let vx = 0, vy = 0;
    if (h.cool > 0) { h.cool -= dt; const a = Math.atan2(h.y - P.y, h.x - P.x); vx = Math.cos(a) * 34; vy = Math.sin(a) * 34; h.chasing = false; }
    else if (d < K.range && dist(P.x, P.y, h.hx, h.hy) < K.leash) {
      if (!h.chasing) { h.chasing = true; popText(h.x, h.y - 18, K.msg, '#ffcf6b'); if (h.kind === 'wolf') sfx.roar(); else sfx.bonk(); }
      const a = Math.atan2(P.y - h.y, P.x - h.x); vx = Math.cos(a) * K.sp; vy = Math.sin(a) * K.sp;
    } else { h.chasing = false; wander(h, dt, K.wsp, 60, 5); }
    if (vx || vy) { move(h, vx * dt, vy * dt, solidW, 5, 3); h.face = Math.sign(vx) || h.face; h.anim += dt; }
    if (d < K.hit && h.cool <= 0 && P.jump <= 0) { hurt(h); h.cool = 1.6; }
  }
}

// ---------------------------------------------------------------- sprites: critters, Sarah's costumes, C-Real's roles
function drawBear5(x, y, s = 1, tm = 0) {
  x = Math.round(x); y = Math.round(y); shadow(x, y, 10 * s);
  const C = '#6a4a30', D = '#4a3220', b = Math.round(Math.sin(tm * 3));
  R(x - 9 * s, y - 4 * s, 4 * s, 4 * s, D); R(x + 5 * s, y - 4 * s, 4 * s, 4 * s, D);
  ell(x, y - 10 * s, 11 * s, 8 * s, C); ell(x + 10 * s, y - 14 * s + b, 6 * s, 5.5 * s, C);
  circ(x + 7 * s, y - 19 * s + b, 2 * s, C); circ(x + 13 * s, y - 19 * s + b, 2 * s, C);
  ell(x + 14 * s, y - 12 * s + b, 3 * s, 2 * s, '#c8a070'); R(x + 13 * s, y - 15 * s + b, 1.5 * s, 1.5 * s, '#111'); R(x + 16 * s, y - 13 * s + b, 1.5 * s, 1.5 * s, '#111');
}
function drawWolf(h) {
  const x = Math.round(h.x), y = Math.round(h.y), f = h.face || 1, st = Math.floor(h.anim * 8) % 2; shadow(x, y, 7);
  R(x - 6, y - 3, 2, 3 - st, '#4a4a50'); R(x + 3, y - 3, 2, 2 + st, '#4a4a50'); R(x - 6, y - 8, 13, 6, '#7a7a82'); R(x - 6, y - 8, 13, 1, '#9a9aa2');
  const hx = f > 0 ? x + 5 : x - 10; R(hx, y - 11, 6, 5, '#7a7a82'); R(hx + (f > 0 ? 4 : 0), y - 9, 2, 2, '#c8c8d0'); R(hx + 1, y - 13, 1, 2, '#6a6a72'); R(hx + 4, y - 13, 1, 2, '#6a6a72'); R(hx + (f > 0 ? 3 : 2), y - 10, 1, 1, h.chasing ? '#ff3030' : '#111');
  R(f > 0 ? x - 10 : x + 7, y - 8, 4, 2, '#6a6a72');
}
function drawRat(h) { const x = Math.round(h.x), y = Math.round(h.y), f = h.face || 1; shadow(x, y, 3); ell(x, y - 3, 4, 2.5, '#6a5a4a'); R(x + (f > 0 ? 3 : -6), y - 5, 3, 3, '#6a5a4a'); R(x + (f > 0 ? 5 : -6), y - 4, 1, 1, '#ff4040'); R(f > 0 ? x - 8 : x + 4, y - 2, 5, 1, '#c8a090'); }
function drawBull(h) {
  const x = Math.round(h.x), y = Math.round(h.y), f = h.face || 1, st = Math.floor(h.anim * 8) % 2; shadow(x, y, 9);
  R(x - 7, y - 4, 2, 4 - st, '#3a2a1e'); R(x + 5, y - 4, 2, 3 + st, '#3a2a1e'); R(x - 8, y - 12, 17, 8, '#5a3a22'); R(x - 8, y - 12, 17, 2, '#6a4a30');
  const hx = f > 0 ? x + 7 : x - 13; R(hx, y - 14, 6, 6, '#5a3a22'); R(hx + (f > 0 ? 5 : -1), y - 12, 2, 3, '#e6cdb0'); R(hx, y - 16, 1, 3, '#eee'); R(hx + 5, y - 16, 1, 3, '#eee'); R(hx + (f > 0 ? 3 : 2), y - 12, 1, 1, h.chasing ? '#ff3030' : '#111');
}
function drawSoldier5(h) { drawPerson(h.x, h.y, { shirt: '#a83a3a', pants: '#3a3a4a', hat: 'cap', hatCol: '#8a8a90', anim: h.anim, extra: (x, y) => R(x + 5, y - 26, 1, 24, '#8a6a3a') }); }
function drawMule5(x, y, tm, load = true) {
  x = Math.round(x); y = Math.round(y); shadow(x, y, 9); const st = Math.floor(tm * 6) % 2;
  R(x - 7, y - 5 + st, 2, 5 - st, '#5a4a3a'); R(x - 2, y - 5, 2, 5, '#6a5a4a'); R(x + 3, y - 5 - st, 2, 5 + st, '#5a4a3a'); R(x + 7, y - 5, 2, 5, '#6a5a4a');
  R(x - 9, y - 12, 19, 8, '#8a7a6a'); R(x - 9, y - 12, 19, 1, '#a89a8a'); R(x + 9, y - 16, 6, 6, '#8a7a6a'); R(x + 12, y - 12, 4, 3, '#c8b898'); R(x + 10, y - 19, 2, 4, '#7a6a5a'); R(x + 13, y - 19, 2, 4, '#7a6a5a'); R(x + 13, y - 14, 1, 1, '#111'); R(x - 11, y - 10, 2, 5, '#5a4a3a');
  if (load) { R(x - 7, y - 18, 14, 7, '#a8844f'); R(x - 7, y - 18, 14, 1, '#c8a46f'); R(x - 5, y - 21, 10, 4, '#c8a040'); }
}
const COSTUME5 = [{ top: '#e0d4b0', skirt: '#c8b88a', border: '#8a6a3a' }, { top: '#5a8a5a', skirt: '#4a7a4a', border: '#d9a400' }, { top: '#7a4a3a', skirt: '#6a3a2a', border: '#c8a040', hood: '#6a3a2a' }, { top: '#8a2a5a', skirt: '#6a1a4a', border: '#d9a400', slash: '#d9a400' }];
const _drawSarah5 = drawSarah;
drawSarah = function (x, y, dir, anim, jh, bike, moving) {
  _drawSarah5(x, y, dir, anim, jh, bike, moving);
  if (ST.level !== 5 || scene === 'title' || bike) return;
  const c = COSTUME5[L5().era] || COSTUME5[0], xx = Math.round(x), by = Math.round(y) - Math.round(jh || 0);
  R(xx - 4, by - 11, 8, 6, c.top); R(xx - 5, by - 10, 1, 3, c.top); R(xx + 4, by - 10, 1, 3, c.top); R(xx - 4, by - 5, 8, 3, c.skirt); R(xx - 4, by - 3, 8, 1, c.border);
  if (c.slash) { R(xx - 5, by - 10, 1, 1, c.slash); R(xx + 4, by - 9, 1, 1, c.slash); R(xx - 1, by - 10, 2, 1, c.slash); }
  if (c.hood) { R(xx - 4, by - 19, 8, 2, c.hood); R(xx - 5, by - 17, 1, 5, c.hood); R(xx + 4, by - 17, 1, 5, c.hood); }
};
const _crPoseNear5 = crPoseNear;
crPoseNear = function () { return ST.level === 5 && scene !== 'title' ? ERA5OF().pose : _crPoseNear5(); };
CR_POSE.gallus = {
  behind(x, y) { ell(x - 11, y - 3, 4, 3, '#6a4a30'); R(x - 15, y - 8, 4, 4, '#6a4a30'); R(x - 15, y - 9, 1, 2, '#6a4a30'); R(x - 12, y - 9, 1, 2, '#6a4a30'); },
  front(x, y) { R(x - 5, y - 9, 10, 8, '#6a4e30'); R(x - 5, y - 9, 10, 1, '#8a6a40'); R(x - 5, y - 6, 10, 1, '#e8dcc0'); R(x - 5, y - 20, 10, 2, '#6a4e30'); R(x - 5, y - 18, 1, 5, '#6a4e30'); R(x + 4, y - 18, 1, 5, '#6a4e30'); R(x + 6, y - 22, 1, 22, '#8a6a3a'); R(x + 5, y - 23, 3, 1, '#8a6a3a'); },
};
CR_POSE.hadlaub = {
  front(x, y, tm) {
    R(x - 4, y - 8, 8, 4, '#a83a3a'); R(x - 4, y - 7, 8, 1, '#e8c02a'); R(x - 5, y - 11, 1, 5, '#3a6a8a'); R(x + 4, y - 11, 1, 5, '#3a6a8a'); R(x - 4, y - 21, 8, 2, '#3a6a8a'); R(x + 2, y - 26, 1, 6, '#e8e0d0');
    ell(x + 7, y - 6, 4, 3, '#c8843e'); ell(x + 7, y - 6, 1.4, 1.4, '#3a2414'); R(x + 9, y - 12, 1, 7, '#6b4526'); R(x + 9, y - 13, 2, 2, '#4a2f18');
    const p = (tm * .6) % 1; R(Math.round(x + 10 + Math.sin(p * 6) * 2), Math.round(y - 18 - p * 12), 1, 3, '#fff'); R(Math.round(x + 9 + Math.sin(p * 6) * 2), Math.round(y - 16 - p * 12), 2, 1, '#fff');
  },
};
CR_POSE.gutenberg = {
  front(x, y) { R(x - 4, y - 8, 8, 7, '#8a6a40'); R(x - 4, y - 8, 8, 1, '#6a4a2a'); R(x - 2, y - 6, 1, 1, '#222'); R(x + 1, y - 5, 2, 1, '#222'); R(x - 4, y - 21, 8, 2, '#4a3a2a'); R(x + 5, y - 11, 4, 3, '#aab0b8'); R(x + 6, y - 12, 2, 1, '#222'); R(x + 5, y - 9, 4, 1, '#222'); },
};
CR_POSE.paracelsus = {
  front(x, y, tm) { R(x - 5, y - 9, 10, 8, '#8a1a1a'); R(x - 5, y - 9, 10, 1, '#c8a040'); R(x - 4, y - 21, 8, 3, '#222'); R(x + 5, y - 10, 3, 5, '#7ee0c0'); R(x + 5, y - 11, 3, 1, '#aaa'); R(x - 7, y - 8, 1, 5, '#c8c8d0'); R(x - 8, y - 9, 3, 1, '#d9a400'); if (Math.floor(tm * 3) % 2) R(x + 6, y - 13, 1, 1, '#aaffd8'); },
};
// ---------------------------------------------------------------- buildings through the Middle Ages
const portalActive5 = () => eraDone5(L5().era);
function l5DrawBuilding(b, x, y, w, h) {
  const cx = x + w / 2, by = y + h, sh = () => R(x + 3, by - 1, w, 4, 'rgba(0,0,0,.3)');
  const roof = (x0, x1, yb, top, col) => poly([[x0 - 3, yb], [(x0 + x1) / 2, top], [x1 + 3, yb]], col);
  const arch = (ax, ay, aw, ah, col) => { R(ax, ay + aw / 2, aw, ah - aw / 2, col); ell(ax + aw / 2, ay + aw / 2, aw / 2, aw / 2, col); };
  const stone = (sx, sy, sw, sh2, c1, c2) => { R(sx, sy, sw, sh2, c1); for (let j = 4; j < sh2; j += 6) R(sx, sy + j, sw, 1, c2); };
  switch (b.kind) {
    case 'portal': drawPortalStone(x, y, w, h, portalActive5()); return true;
    case 'hut': case 'tent': return l4DrawBuilding(b, x, y, w, h);
    case 'cell': sh(); R(x + 6, y + 18, 40, h - 18, '#8a6a40'); for (let j = y + 20; j < by; j += 4) R(x + 6, j, 40, 1, '#6a4a2a'); poly([[x, y + 20], [x + 26, y - 2], [x + 52, y + 20]], '#c8a860'); R(x + 22, by - 16, 10, 16, '#3a2a1a'); R(x + 46, by - 8, 16, 8, '#6a4a2a'); for (let i = 0; i < 4; i++) R(x + 47 + i * 4, by - 8, 3, 8, i % 2 ? '#8a6a3a' : '#7a5a2a'); return true;
    case 'abbey': {
      sh(); const bw = w - 34; stone(x, y + 24, bw, h - 24, '#d8cdb8', '#c4b8a2'); poly([[x - 4, y + 26], [x + bw / 2, y + 2], [x + bw + 4, y + 26]], '#a8543a');
      for (let i = 0; i < 4; i++) arch(x + 10 + i * 22, y + 38, 8, 14, '#4a3a2a');
      R(x + bw, y - 6, 26, h + 6, '#cfc4ae'); poly([[x + bw - 2, y - 6], [x + bw + 13, y - 30], [x + bw + 28, y - 6]], '#6a4a3a'); R(x + bw + 12, y - 38, 2, 9, '#d9a400'); R(x + bw + 9, y - 35, 8, 2, '#d9a400'); arch(x + bw + 8, y + 6, 10, 18, '#4a3a2a');
      arch(x + 38, by - 24, 14, 24, '#4a2f1a'); return true;
    }
    case 'library': sh(); stone(x, y + 16, w, h - 16, '#cfc4ae', '#bfb49e'); R(x - 3, y + 8, w + 6, 10, '#8a4a3a'); for (let i = 0; i < 4; i++) arch(x + 8 + i * 22, y + 26, 8, 14, '#4a3a2a'); R(cx - 6, y + 20, 12, 8, '#f4ead0'); R(cx - 1, y + 20, 1, 8, '#8a6a3a'); arch(cx - 6, by - 18, 12, 18, '#4a2f1a'); return true;
    case 'palatine': {
      sh(); R(x, y + 52, 16, h - 52, '#d8d0b8'); R(x + w - 16, y + 52, 16, h - 52, '#d8d0b8'); R(x + 14, y + 34, w - 28, h - 34, '#e8e0c8');
      for (let i = 0; i < 4; i++) arch(x + 22 + i * 17, y + 46, 8, 18, '#6a5a3a'); R(x + 14, y + 34, w - 28, 2, '#c8bc98');
      ell(cx, y + 36, w / 2 - 10, 24, '#6a8a72'); ell(cx, y + 34, w / 2 - 16, 18, '#7a9a82'); R(cx - 2, y - 6, 4, 14, '#d9a400'); circ(cx, y - 8, 3, '#ffd34d'); arch(cx - 12, by - 24, 24, 24, '#3a2a1a'); R(cx - 1, by - 32, 2, 8, '#d9a400'); return true;
    }
    case 'hall': sh(); stone(x, y + 14, w, h - 14, '#d8c8a8', '#c8b898'); roof(x, x + w, y + 16, y - 6, '#a8432f'); R(x + w - 10, y - 8, 2, 22, '#6a4a2a'); R(x + w - 8, y - 6, 10, 8, '#c8302a'); for (let i = 0; i < 3; i++) arch(x + 10 + i * 24, y + 26, 8, 12, '#4a3a2a'); arch(cx - 6, by - 18, 12, 18, '#4a2f1a'); return true;
    case 'convent': {
      sh(); stone(x, y + 16, w, h - 16, '#f2ece0', '#e2dccc'); roof(x, x + w - 26, y + 18, y - 4, '#a8543a'); R(x + w - 26, y - 10, 18, h + 10, '#f2ece0'); R(x + w - 28, y - 18, 22, 10, '#a8543a'); arch(x + w - 24, y + 4, 10, 12, '#4a3a2a');
      for (let i = 0; i < 5; i++) R(x + 8 + i * 14, y + 26, 10, 10, ['#c8302a', '#2a5ab8', '#d9a400', '#4a8a3a', '#a85a9a'][i]); arch(x + 40, by - 18, 12, 18, '#4a2f1a'); return true;
    }
    case 'castle': {
      sh(); stone(x + 30, y + 16, w - 60, h - 16, '#9a948a', '#8a847a'); for (let i = 0; i < 6; i++) R(x + 30 + i * 10, y + 8, 6, 8, '#9a948a');
      for (const tx of [x, x + w - 30]) { stone(tx, y + 32, 30, h - 32, '#8a847a', '#7a746a'); poly([[tx - 3, y + 32], [tx + 15, y + 6], [tx + 33, y + 32]], '#a8432f'); }
      R(cx - 1, y - 14, 2, 22, '#6a4a2a'); R(cx + 1, y - 14, 12, 8, '#c8302a'); R(cx - 8, y + 26, 2, 8, '#2a2a2a'); R(cx + 6, y + 26, 2, 8, '#2a2a2a'); arch(cx - 10, by - 30, 20, 30, '#2a1a10'); return true;
    }
    case 'townhall': sh(); stone(x, y + 16, w, h - 16, '#e0d4b8', '#d0c4a8'); roof(x, x + w, y + 18, y - 8, '#a8543a'); for (let i = 0; i < 3; i++) arch(x + 10 + i * 30, y + 26, 10, 14, '#4a5a7a'); arch(cx - 7, by - 20, 14, 20, '#4a2f1a'); return true;
    case 'fachwerk': {
      sh(); R(x, y + 14, w, h - 14, '#efe7d4'); for (let i = 0; i <= w; i += 14) R(x + i - 1, y + 14, 2, h - 14, '#5a3a22'); R(x, y + 14 + (h - 14) / 2, w, 2, '#5a3a22'); R(x, y + 14, w, 2, '#5a3a22');
      roof(x, x + w, y + 16, y - 6, '#a8432f'); R(x + 8, y + 24, 9, 9, '#8fc1e3'); R(x + w - 18, y + 24, 9, 9, '#8fc1e3'); R(cx - 5, by - 16, 10, 16, '#4a2f1a'); return true;
    }
    case 'chillon': {
      R(x - 10, by - 12, w + 20, 14, '#3f86c8'); for (let i = 0; i < 6; i++) R(x - 6 + i * 20 + Math.round(Math.sin(time * 2 + i) * 2), by - 8 + (i % 3) * 3, 8, 1, 'rgba(255,255,255,.5)');
      ell(cx, by - 12, w / 2 + 4, 8, '#7a746c'); stone(x + 4, y + 22, w - 8, h - 34, '#c8c0b0', '#b8b0a0');
      for (const tx of [x + 4, x + w - 26]) { stone(tx, y + 8, 22, h - 20, '#b8b0a0', '#a8a090'); poly([[tx - 3, y + 8], [tx + 11, y - 16], [tx + 25, y + 8]], '#6a7a90'); }
      stone(cx - 14, y, 28, h - 20, '#d0c8b8', '#c0b8a8'); poly([[cx - 17, y], [cx, y - 20], [cx + 17, y]], '#6a7a90'); for (let i = 0; i < 3; i++) R(cx - 8 + i * 8, y + 12, 2, 8, '#2a2a2a'); arch(cx - 6, by - 32, 12, 22, '#2a1a10'); return true;
    }
    case 'cathedral': {
      sh(); stone(x + 8, y + 28, w - 16, h - 28, '#cfc4ae', '#bfb49e'); for (const tx of [x, x + w - 22]) { stone(tx, y + 8, 22, h - 8, '#c4b8a2', '#b4a892'); poly([[tx - 2, y + 8], [tx + 11, y - 24], [tx + 24, y + 8]], '#7a8a9a'); arch(tx + 6, y + 20, 10, 18, '#3a3a4a'); }
      circ(cx, y + 44, 9, '#4a6ab8'); circ(cx, y + 44, 5, '#c8302a'); circ(cx, y + 44, 2, '#ffd34d'); poly([[cx - 9, by], [cx - 9, by - 18], [cx, by - 30], [cx + 9, by - 18], [cx + 9, by]], '#3a2a1a'); return true;
    }
    case 'oathstones': for (let i = 0; i < 3; i++) { R(x + 6 + i * 14, y + 6 + (i % 2) * 4, 7, 22 - (i % 2) * 4, '#8a847a'); R(x + 6 + i * 14, y + 6 + (i % 2) * 4, 7, 2, '#a8a298'); } for (let i = 0; i < 8; i++) R(x + 2 + hash(i, 9) % 44, by - 3 - hash(i, 4) % 4, 2, 2, ['#e86fa8', '#ffd34d', '#ffffff'][i % 3]); return true;
    case 'hatpole': R(x + 30, y + 12, 4, h - 12, '#5a3a1e'); circ(x + 32, y + 8, 12, '#3a7a34'); circ(x + 28, y + 5, 7, '#4a9a40'); R(x + 8, y - 8, 2, h + 8, '#6a4a2a'); R(x + 3, y - 12, 12, 4, '#c8302a'); R(x + 5, y - 17, 8, 5, '#c8302a'); R(x + 7, y - 19, 1, 3, '#e8e0d0'); return true;
    case 'devilsbridge': {
      R(x, y + 22, 18, h - 22, '#5a5a62'); R(x + w - 18, y + 22, 18, h - 22, '#5a5a62'); R(x + 18, y + 32, w - 36, h - 32, '#4a7ac0'); for (let i = 0; i < 3; i++) R(x + 22 + i * 10 + Math.round(Math.sin(time * 3 + i) * 2), y + 40 + i * 3, 6, 1, 'rgba(255,255,255,.6)');
      g.strokeStyle = '#9a948a'; g.lineWidth = 7; g.lineCap = 'butt'; g.beginPath(); g.arc(cx, y + 36, 24, Math.PI, 0); g.stroke(); R(x - 2, y + 28, 18, 5, '#9a948a'); R(x + w - 16, y + 28, 18, 5, '#9a948a');
      R(x + 4, y + 8, 6, 12, '#c8302a'); R(x + 3, y + 5, 2, 3, '#c8302a'); R(x + 9, y + 5, 2, 3, '#c8302a'); R(x + 5, y + 10, 1, 1, '#ffd34d'); return true;
    }
    case 'rockpile': poly([[x, by], [x + 10, y + 6], [x + 36, y], [x + w, by]], '#7a7470'); poly([[x + 10, y + 6], [x + 36, y], [x + 30, y + 14]], '#9a948a'); for (const [bx2, by2, r2] of [[14, 12, 6], [28, 8, 5], [44, 22, 6], [20, 28, 5]]) { circ(x + bx2, y + by2, r2, '#8a847a'); circ(x + bx2 - 1, y + by2 - 1, r2 / 2, '#aaa49a'); } for (let i = 0; i < 3; i++) R(x + 34, y + 12 + i * 4, 20, 3, '#6a4a2a'); return true;
    case 'kapellbruecke': {
      R(x - 6, y + 22, w + 12, 30, '#3f86c8'); for (let i = 0; i < 8; i++) R(x + i * 15 + Math.round(Math.sin(time * 2 + i) * 3), y + 34 + (i % 3) * 5, 9, 1, 'rgba(255,255,255,.45)');
      const bw = w - 48; R(x + 2, y + 10, bw, 14, '#8a5f3a'); R(x + 2, y + 24, bw, 4, '#5a3a1e'); for (let i = 0; i <= bw; i += 14) R(x + 4 + i, y + 24, 3, 18, '#5a3a1e'); R(x, y + 6, bw + 4, 6, '#b8432f'); for (let i = 0; i < bw - 10; i += 10) poly([[x + 6 + i, y + 12], [x + 11 + i, y + 20], [x + 16 + i, y + 12]], i % 20 ? '#e8c02a' : '#4a7ac0');
      stone(x + w - 44, y - 14, 34, 52, '#c8bca4', '#b8ac94'); poly([[x + w - 47, y - 14], [x + w - 27, y - 38], [x + w - 7, y - 14]], '#a8432f'); arch(x + w - 33, y + 8, 8, 14, '#3a2a1a'); return true;
    }
    case 'pressshop': {
      sh(); R(x, y + 14, w, h - 14, '#efe7d4'); for (let i = 0; i <= w; i += 16) R(x + i - 1, y + 14, 2, h - 14, '#5a3a22'); R(x, y + 14, w, 2, '#5a3a22'); roof(x, x + w, y + 16, y - 6, '#8a3a2a');
      R(x + 10, y + 26, 30, 24, '#3a3a44'); R(x + 24, y + 22, 3, 16, '#6a5a4a'); R(x + 16, y + 22, 18, 3, '#6a5a4a'); R(x + 14, y + 38, 22, 8, '#e8e0d0'); R(x + w - 26, y + 24, 14, 14, '#f4ead0'); R(x + w - 23, y + 27, 8, 1, '#222'); R(x + w - 23, y + 30, 8, 1, '#222'); R(x + w - 23, y + 33, 6, 1, '#222'); arch(cx + 12, by - 20, 12, 20, '#4a2f1a'); return true;
    }
    case 'stable': sh(); R(x, y + 16, w, h - 16, '#8a6a40'); for (let i = 0; i < w; i += 6) R(x + i, y + 16, 1, h - 16, '#6a4a2a'); roof(x, x + w, y + 18, y - 4, '#6a4a2a'); R(cx - 12, by - 22, 24, 22, '#4a3a22'); R(cx, by - 22, 1, 22, '#3a2a14'); R(x + 6, by - 12, 14, 12, '#d9b44a'); drawMule5(x + w - 16, by - 2, time, false); return true;
    case 'hospital': sh(); stone(x, y + 14, w, h - 14, '#efe9dc', '#dfd9cc'); roof(x, x + w, y + 16, y - 6, '#a8432f'); for (let i = 0; i < 3; i++) arch(x + 10 + i * 28, y + 26, 8, 12, '#4a5a7a'); ell(cx, y + 22, 5, 3, '#7a6a5a'); R(cx - 6, y + 22, 12, 2, '#7a6a5a'); arch(cx - 6, by - 18, 12, 18, '#4a2f1a'); return true;
    case 'townwall': sh(); stone(x, y + 16, w, h - 16, '#b8b0a0', '#a8a090'); for (let i = 0; i < 8; i++) R(x + i * 12, y + 8, 7, 8, '#b8b0a0'); stone(x + w - 30, y, 28, h, '#a8a090', '#989080'); poly([[x + w - 33, y], [x + w - 16, y - 18], [x + w + 1, y]], '#8a3a2a'); arch(x + 24, by - 26, 24, 26, '#2a1a10'); return true;
    case 'monument': R(x + 6, y + 16, 20, 16, '#9a948a'); R(x + 6, y + 16, 20, 2, '#b8b2a8'); R(x + 13, y + 3, 6, 13, '#7a746c'); circ(x + 16, y + 2, 3, '#8a847a'); R(x + 5, y + 6, 1, 10, '#8a6a3a'); R(x + 3, y + 5, 3, 2, '#c8c8d0'); R(x + 26, y + 6, 1, 10, '#8a6a3a'); R(x + 25, y + 5, 3, 2, '#c8c8d0'); return true;
    case 'apothecary': {
      sh(); R(x, y + 14, w, h - 14, '#efe7d4'); for (let i = 0; i <= w; i += 16) R(x + i - 1, y + 14, 2, h - 14, '#5a3a22'); roof(x, x + w, y + 16, y - 6, '#5a6a4a'); R(x + 8, y + 24, 30, 14, '#8fc1e3'); for (let i = 0; i < 4; i++) { R(x + 10 + i * 7, y + 28, 5, 9, ['#c8302a', '#4a8a3a', '#d9a400', '#7a4a9a'][i]); R(x + 11 + i * 7, y + 26, 3, 2, '#e8e0d0'); }
      ell(cx + 14, y + 24, 6, 3, '#7a6a5a'); R(cx + 8, y + 24, 12, 2, '#7a6a5a'); arch(x + w - 20, by - 18, 12, 18, '#4a2f1a'); return true;
    }
    case 'zytglogge': {
      sh(); stone(x + 6, y + 10, w - 12, h - 10, '#d8c8a8', '#c8b898'); poly([[x + 2, y + 10], [cx, y - 14], [x + w - 2, y + 10]], '#a8432f'); circ(cx, y + 40, 17, '#2a4a8a'); circ(cx, y + 40, 14, '#e8c040'); circ(cx, y + 40, 6, '#2a4a8a'); R(cx, y + 28, 1, 12, '#222'); R(cx, y + 40, 8, 1, '#222');
      circ(cx, y + 24, 5, '#e8e0d0'); circ(cx, y + 24, 3, '#2a4a8a'); arch(cx - 10, by - 24, 20, 24, '#2a1a10'); return true;
    }
    case 'fuggerei': {
      sh(); for (let i = 0; i < 4; i++) { const hx = x + 4 + i * 34; R(hx, y + 32, 30, h - 32, '#e8c868'); R(hx, y + 32, 30, 2, '#d8b858'); poly([[hx - 2, y + 34], [hx + 15, y + 16], [hx + 32, y + 34]], '#b8432f'); R(hx + 10, y + 42, 8, 8, '#8fc1e3'); R(hx + 22, y + 48, 6, h - 48, '#6a3a1e'); }
      R(x + 24, y + 6, 2, 12, '#6a4a2a'); R(x + 26, y + 6, 8, 6, '#c8302a'); return true;
    }
    case 'cauldron': {
      sh(); for (let i = 0; i < 3; i++) R(x + 18 + i * 10, by - 8, 8, 6, '#6a4a2a'); for (let i = 0; i < 3; i++) { const fh = 6 + (Math.floor(time * 8 + i * 2) % 3) * 2; R(x + 20 + i * 10, by - 10 - fh, 5, fh, i % 2 ? '#ff9a30' : '#ffd34d'); }
      ell(cx, by - 22, 20, 14, '#2a2a2a'); ell(cx, by - 28, 18, 8, '#f4f0e8'); ell(cx - 5, by - 29, 6, 2, '#ffffff'); for (let i = 0; i < 3; i++) { const p = (time * .5 + i / 3) % 1; ell(cx - 6 + i * 6 + Math.sin(time * 2 + i) * 3, by - 36 - p * 22, 3 + p * 3, 2 + p * 2, `rgba(255,255,255,${.5 * (1 - p)})`); } return true;
    }
  }
  return false;
}
function l5Drawables(D, vis) {
  const add = (o, f) => { if (vis(o.x, o.y)) D.push({ y: o.y, f }); };
  for (const n of G5.npcs) add(n, () => drawPerson(n.x, n.y, LOOKS4[n.name]));
  for (const h of G5.haz) add(h, () => ({ wolf: drawWolf, soldier: drawSoldier5, rat: drawRat, bull: drawBull })[h.kind] ? ({ wolf: drawWolf, soldier: drawSoldier5, rat: drawRat, bull: drawBull })[h.kind](h) : drawBoar(h));
  if (G5.bear) add(G5.bear, () => drawBear5(G5.bear.x, G5.bear.y, 1, time));
}
function l5WorldLabels(ox, oy) {
  const near = (id, label, col = '#fff', dy = -8) => { const b = BMAP[id]; if (b && dist(b.doorX, b.doorY, P.x, P.y) < 180) txt(label, b.doorX + ox, b.y * 16 + oy + dy, 6.5, col, 'center', true); };
  const e = L5().era;
  if (e === 0) { near('scripto', 'ST. GALLEN', '#ffe8b0', -34); near('aachen', 'AACHEN', '#ffe8b0', -10); near('muestair', 'MÜSTAIR', '#ffe8b0', -22); }
  if (e === 1) { near('habsburg', 'HABSBURG', '#ffe8b0', -34); near('chillon', 'CHILLON', '#ffe8b0', -22); near('lausanne', 'LAUSANNE', '#ffe8b0', -28); near('manesse', 'ZÜRICH', '#ffe8b0', -10); }
  if (e === 2) { near('kapell', 'LUZERN', '#ffe8b0', -14); near('press', 'MAINZ', '#ffe8b0', -10); near('muenster', 'BASEL', '#ffe8b0', -34); near('council', 'CONSTANCE', '#ffe8b0', -10); near('wall', 'MURTEN', '#ffe8b0', -22); }
  if (e === 3) { near('froben', 'BASEL', '#ffe8b0', -10); near('grossmuenster', 'ZÜRICH', '#ffe8b0', -34); near('zytglogge', 'BERN', '#ffe8b0', -38); near('fugger', 'AUGSBURG', '#ffe8b0', -10); near('cauldron', 'KAPPEL', '#ffe8b0', -10); }
}
function l5Overlay() {
  if (curZone === 'm0steinach') { g.fillStyle = 'rgba(10,30,15,.15)'; g.fillRect(0, 0, VW, VH); }
  if (curZone === 'm1gotthard' || curZone === 'm2gotthard') { g.fillStyle = 'rgba(220,230,240,.08)'; g.fillRect(0, 0, VW, VH); }
}
// ================================================================ MINIGAMES
// ---------------------------------------------------------------- TIMING scenes (reuse Level 4's rhythm engine, each with its own artwork)
const treeCol5 = (x, y0, y1, w = 8) => { R(x, y0, w, y1 - y0, '#4a3a22'); for (let k = 0; k < 5; k++) R(x - 12 + k * 3, y0 - 8 + k * 16, 32 - k * 6 + w - 8, 8, k % 2 ? '#1f4a2c' : '#2a5a36'); };
Object.assign(TIMING4, {
  firewood: {
    title: 'GALLUS AND THE BEAR', goal: 6, speed: 1.5, zone: .3, music: 'abbey', tip: 'The bear brings logs! Press [A] in the green zone to catch and stack each one.',
    win: 'A neat woodpile! 🐻', winSub: 'Legend says a bear fetched firewood for Gallus, and Gallus shared his bread with it.', lose: 'The logs rolled away!',
    draw(M, k) {
      sky4('#8ab87a', '#d8e8b0', 130); R(0, 120, VW, 96, '#5a7a3a'); for (let i = 0; i < 8; i++) treeCol5(i * 52 - 6, 36 + (i % 3) * 8, 126);
      for (let i = 0; i < M.p; i++) { const row = Math.floor(i / 3), col = i % 3, lx = 30 + col * 18 + row * 9, ly = 190 - row * 8; R(lx, ly, 16, 7, '#8a6a3a'); R(lx, ly, 16, 1, '#a88a5a'); circ(lx + 16, ly + 3, 3, '#c8a878'); }
      bigSprite(() => drawCReal(0, 0, time, 'gallus'), 150, 198, 2); bigSprite(() => drawSarah(0, 0, 'right', 0, 0, false, false), 212, 198, 2); bigSprite(() => drawBear5(0, 0, 1, time), 334, 198, 1.8);
      const tt = (M.ph * .3) % 1, lx = 312 - tt * 110, ly = 150 - Math.sin(tt * Math.PI) * 38; if (M.mode === 'play') { R(lx - 8, ly, 16, 5, '#8a6a3a'); R(lx - 8, ly, 16, 1, '#a88a5a'); }
    },
  },
  apple: {
    title: 'THE APPLE SHOT', goal: 1, speed: 3, zone: .15, music: 'minne', tip: 'Hold your breath... press [A] when the crosshair is on the apple (green zone)!',
    win: 'Bullseye! 🍎', winSub: 'In the legend, Tell shot the apple off his own son\'s head, and kept a second bolt for the tyrant. The story first appears in the 15th century.', lose: 'The bolt flew wide! (C-Real faints.)',
    draw(M, k) {
      sky4('#8ac4ee', '#e8f4fa', 120); drawMountains(110, '#8aa3c2', true, 19); R(0, 108, VW, 108, '#b8aa8a'); for (let y = 112; y < VH; y += 10) for (let x = (y / 10 % 2) * 7; x < VW; x += 14) R(x, y, 13, 1, '#a89a7a');
      R(34, 56, 10, 56, '#5a3a1e'); circ(40, 44, 34, '#3a7a34'); circ(26, 38, 20, '#4a9a40'); circ(56, 36, 18, '#4a9a40');
      R(130, 44, 3, 72, '#6a4a2a'); R(122, 36, 19, 5, '#c8302a'); R(126, 30, 11, 7, '#c8302a'); R(131, 27, 1, 3, '#e8e0d0');
      bigSprite(() => drawCReal(0, 0, time, 'hadlaub'), 310, 198, 2.2); bigSprite(() => drawSarah(0, 0, 'right', 0, 0, false, false), 90, 198, 2.2); R(104, 176, 24, 2, '#6a4a2a'); R(104, 172, 2, 8, '#6a4a2a'); R(124, 173, 3, 3, '#c8c8d0');
      const ax = 310, ay = 144, m = (Math.sin(M.ph) + 1) / 2, cxh = ax + (m - .5) * 120;
      if (M.mode === 'win') { const f = Math.min(1, M.t * 3); circ(ax - 6 - f * 14, ay + f * 40, 4, '#c82a2a'); circ(ax + 6 + f * 14, ay + f * 40, 4, '#e8e0d0'); } else { circ(ax, ay, 5, '#c82a2a'); R(ax, ay - 6, 1, 3, '#4a2a1a'); }
      if (M.mode === 'play') { g.strokeStyle = '#ff3030'; g.lineWidth = 1; g.beginPath(); g.arc(cxh, ay, 8, 0, 7); g.moveTo(cxh - 12, ay); g.lineTo(cxh + 12, ay); g.moveTo(cxh, ay - 12); g.lineTo(cxh, ay + 12); g.stroke(); }
    },
  },
  ambush: {
    title: 'AMBUSH AT MORGARTEN, 1315', goal: 6, speed: 2.2, zone: .24, music: 'minne', tip: 'The Habsburg column marches below! Press [A] in the green zone to send a rock tumbling down.',
    win: 'The column is in disarray! 🪨', winSub: 'On 15 November 1315 the Confederates attacked from the slope above the narrow pass, so tradition says with rocks and logs. The Habsburg knights could not turn around.', lose: 'The knights spotted you!',
    draw(M, k) {
      sky4('#8a9ab0', '#d8dce0', 120); drawMountains(100, '#6a7a8a', true, 21); R(0, 150, VW, 66, '#6a7a4a'); R(0, 156, VW, 34, '#a8946a'); for (let i = 0; i < VW; i += 18) R(i, 172, 9, 1, '#8a7a5a');
      poly([[0, 150], [0, 40], [90, 60], [190, 150]], '#5a6a3a'); poly([[0, 40], [90, 60], [60, 78], [0, 70]], '#7a7a6a');
      for (let i = 0; i < 5; i++) { circ(20 + i * 22, 66 + i * 10, 7, '#8a847a'); circ(18 + i * 22, 64 + i * 10, 3, '#aaa49a'); }
      for (let i = 0; i < 3; i++) R(130 + i * 6, 120 + i * 4, 26, 4, '#6a4a2a');
      R(260, 100, VW - 260, 50, '#3f86c8'); R(260, 98, VW - 260, 3, '#7ab8e8');
      const rem = Math.max(0, M.d.goal - M.p) + 2;
      for (let i = 0; i < 8; i++) { if (i >= rem) continue; const sx = ((time * 16 + i * 34) % (VW + 80)) - 40; bigSprite(() => drawPerson(0, 0, { shirt: '#c8302a', pants: '#3a3a4a', hat: 'cap', hatCol: '#8a8a90', anim: time * 1.4 + i, extra: (x, y) => R(x + 5, y - 26, 1, 24, '#8a6a3a') }), sx, 188, 1.1); }
      if (M.flash > 0) { const f = 1 - M.flash / .25, rx = 150 + (M.p % 5) * 26; circ(rx, 90 + f * 90, 9, '#8a847a'); circ(rx - 2, 88 + f * 90, 4, '#aaa49a'); }
      bigSprite(() => drawSarah(0, 0, 'down', 0, 0, false, false), 52, 112, 1.4); bigSprite(() => drawCReal(0, 0, time, 'hadlaub'), 80, 110, 1.4);
    },
  },
  soup: {
    title: 'THE MILK SOUP OF KAPPEL, 1529', goal: 8, speed: 1.8, zone: .32, music: 'renaiss', tip: 'Stir together with C-Real! Press [A] in the green zone to keep the soup from burning.',
    win: 'Two armies share a pot! 🥣', winSub: 'Tradition says that in 1529 the soldiers of Zürich and the Catholic cantons ate milk soup together on the border, and the war was called off.', lose: 'The soup burned!',
    draw(M, k) {
      sky4('#9ac4ee', '#e8f0d0', 100); drawMountains(100, '#8aa3c2', true, 7); R(0, 100, VW, 116, '#7aa850'); R(191, 100, 2, 116, '#f4f4f0');
      for (let i = 0; i < 9; i++) bigSprite(() => drawPerson(0, 0, LOOKS4['Zürcher'] ), 24 + (i % 3) * 22, 128 + Math.floor(i / 3) * 18, .9);
      for (let i = 0; i < 9; i++) bigSprite(() => drawPerson(0, 0, LOOKS4['Innerschweizer']), 300 + (i % 3) * 22, 128 + Math.floor(i / 3) * 18, .9);
      for (let i = 0; i < 2; i++) { R(86 + i * 2, 70 - i * 6, 2, 50, '#6a4a2a'); R(278 + i * 8, 70, 2, 50, '#6a4a2a'); } R(88, 70, 14, 9, '#2a5ab8'); R(88, 70, 14, 1, '#e8e0d0'); R(280, 70, 14, 9, '#c8302a'); R(286, 70, 2, 9, '#e8e0d0');
      for (let i = 0; i < 3; i++) R(170 + i * 12, 188, 10, 6, '#6a4a2a'); for (let i = 0; i < 3; i++) { const fh = 6 + (Math.floor(time * 8 + i * 2) % 3) * 2; R(172 + i * 12, 186 - fh, 6, fh, i % 2 ? '#ff9a30' : '#ffd34d'); }
      ell(192, 168, 30, 16, '#2a2a2a'); ell(192, 162, 27, 10, '#f4f0e8'); const lvl = 8 + k * 4; ell(192, 160 - lvl / 4, 24, 6, '#ffffff');
      const sa = M.ph * 2; R(192 + Math.cos(sa) * 12, 150 + Math.sin(sa) * 5, 2, 18, '#8a6a3a'); for (let i = 0; i < 4; i++) { const p = (time * .5 + i / 4) % 1; ell(184 + i * 8 + Math.sin(time * 2 + i) * 3, 140 - p * 36, 3 + p * 3, 2 + p * 2, `rgba(255,255,255,${.5 * (1 - p)})`); }
      bigSprite(() => drawSarah(0, 0, 'right', 0, 0, false, false), 148, 198, 2); bigSprite(() => drawCReal(0, 0, time, 'paracelsus'), 236, 198, 2);
      if (M.mode === 'win') for (let i = 0; i < 9; i++) txt('❤', 30 + (i % 3) * 22 + (i > 4 ? 0 : 0), 60 + Math.floor(i / 3) * 16, 9, '#ff9ab8', 'center', false, false);
    },
  },
});
// ---------------------------------------------------------------- RUNS (reuse Level 4's runner with level-specific obstacles)
Object.assign(RUNS4, {
  saumer: {
    title: 'OVER THE GOTTHARD, ~1300', len: 4200, ground: '#a8a09a', edge: '#7a746c', side: '#6a7a58', music: 'gothic', item: '🧀', tip: '← → steer · [A] jump over stones · dodge the rockfall! Keep the mule moving.',
    win: 'The hospice! Mule and cargo are safe. 🫏', lose: 'The mule refuses to go on!', hitMsg: { rockfall: 'Rockfall! 🪨' },
    gen(obs, d, k, off, r) { obs.push({ d, off, kind: k < .45 ? 'low' : 'rockfall', ph: r() * 6 }); if (r() < .5) obs.push({ d: d + 40, off: (r() * 2 - 1) * 45, kind: 'item' }); },
    drawObs(o, x, sy, S) { if (o.kind !== 'rockfall') return false; const k = clamp(1 - (o.d - S.d) / 160, 0, 1); ell(x, sy, 4 + k * 8, 2 + k * 3, `rgba(0,0,0,${.2 + k * .3})`); if (k > .2) { const fy = sy - (1 - k) * 120; circ(x, fy - 6, 6, '#8a847a'); circ(x - 2, fy - 8, 2, '#aaa49a'); } return true; },
    drawDeco(sx, sy, d) { g.drawImage(OVER.PINE_SNOW[hash(Math.floor(d), 1) & 3], sx, sy - 8); },
    player(S, jh) { drawMule5(18, 0, S.t * 1.2, true); drawSarah(0, 0, 'up', S.t * 2, jh, false, true); },
  },
  murten: {
    title: 'THE MURTEN RUN, 1476', len: 3800, ground: '#b8a880', edge: '#8a7a58', side: '#7aa05a', music: 'gothic', item: '🌿', tip: '← → steer · [A] jump over fences · bring the linden branch to Fribourg!',
    win: 'Fribourg! The victory is announced. 🌳', lose: 'Out of breath!',
    gen(obs, d, k, off, r) { obs.push({ d, off, kind: k < .5 ? 'low' : k < .8 ? 'cart' : 'goat', ph: r() * 6 }); if (r() < .5) obs.push({ d: d + 40, off: (r() * 2 - 1) * 45, kind: 'item' }); },
    drawObs(o, x, sy) { if (o.kind !== 'low') return false; R(x - 12, sy - 8, 2, 9, '#6a4a2a'); R(x + 10, sy - 8, 2, 9, '#6a4a2a'); R(x - 12, sy - 7, 24, 2, '#8a6a3a'); R(x - 12, sy - 3, 24, 2, '#8a6a3a'); return true; },
    drawDeco(sx, sy, d) { g.drawImage(OVER[T.BEECH][hash(Math.floor(d), 1) & 3], sx, sy - 8); },
    player(S, jh) { drawSarah(0, 0, 'up', S.t * 2, jh, false, true); R(5, -24 - jh, 7, 8, '#4a8a3a'); R(6, -26 - jh, 5, 3, '#6aaa5a'); },
  },
});
// ---------------------------------------------------------------- the scriptorium: put the spaces between the words (Carolingian reform)
const SCRIPTO5 = [{ raw: 'CAROLUSREXETSARAH', cuts: [7, 10, 12], words: 'carolus rex et sarah' }, { raw: 'GALLUSETURSUSAMICI', cuts: [6, 8, 13], words: 'gallus et ursus amici' }, { raw: 'ORAETLABORA', cuts: [3, 5], words: 'ora et labora' }];
let SC5 = null;
function startScripto5(onWin) { transition(() => { scene = 'scripto5'; musI = 0; SC5 = { onWin, li: 0, cur: 1, cuts: [], mode: 'play', msg: '', t: 0 }; }); }
SCENES.scripto5 = {
  music: 'abbey',
  update(dt) {
    const S = SC5; S.t += dt; const L = SCRIPTO5[Math.min(S.li, SCRIPTO5.length - 1)], n = L.raw.length;
    if (S.mode === 'win') { if (S.t > .6 && inp.a) backToWorld(S.onWin); return; }
    if (S.mode === 'fb') { if (inp.a) S.mode = 'play'; return; }
    if (S.mode === 'ok') { if (inp.a) { S.li++; S.cuts = []; S.cur = 1; S.mode = S.li >= SCRIPTO5.length ? 'win' : 'play'; S.t = 0; if (S.mode === 'win') sfx.ding(); } return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    if (inp.left) { S.cur = Math.max(1, S.cur - 1); sfx.blip(); } if (inp.right) { S.cur = Math.min(n - 1, S.cur + 1); sfx.blip(); }
    if (inp.a) { const i = S.cuts.indexOf(S.cur); if (i >= 0) S.cuts.splice(i, 1); else S.cuts.push(S.cur); S.cuts.sort((a, b) => a - b); tone(i >= 0 ? 200 : 420, .06, 'square', .06); }
    if (inp.down) {
      if (S.cuts.join() === L.cuts.join()) { S.mode = 'ok'; sfx.ding(); }
      else { S.mode = 'fb'; S.msg = S.cuts.length !== L.cuts.length ? t('This line has {0} words, so it needs {1} gaps.', L.cuts.length + 1, L.cuts.length) : 'Not quite. Read the line out loud in Latin: where does each word end?'; sfx.bonk(); st5('mistakes'); }
    }
  },
  draw() { R(0, 0, VW, VH, '#6a4a2a'); for (let y = 0; y < VH; y += 14) R(0, y, VW, 1, '#5a3a1e'); R(16, 28, VW - 32, 120, '#efe0b0'); R(16, 28, VW - 32, 2, '#d8c890'); for (let y = 46; y < 148; y += 18) R(26, y, VW - 52, 1, 'rgba(120,90,50,.18)'); bigSprite(() => drawPerson(0, 0, LOOKS4.Alcuin), 340, 204, 1.8); },
  ui() {
    const S = SC5, L = SCRIPTO5[Math.min(S.li, SCRIPTO5.length - 1)], n = L.raw.length;
    txt(t('THE SCRIPTORIUM OF ST. GALLEN'), VW / 2, 5, 10, '#ffe8b0', 'center', true); txt(t('Line {0}/3', Math.min(3, S.li + 1)), VW / 2, 18, 7.5, '#fff', 'center', true);
    const cw = 14, gap = 12, tw = n * cw + S.cuts.length * gap; let px = (VW - tw) / 2; const xs = [];
    for (let i = 0; i < n; i++) { if (i > 0 && S.cuts.includes(i)) px += gap; xs.push(px); txt(L.raw[i], px + cw / 2, 66, 14, '#3a2a1a', 'center', true, false); px += cw; }
    if (S.mode === 'play') { const cx2 = S.cur < n ? xs[S.cur] - (S.cuts.includes(S.cur) ? gap / 2 : 0) : 0; R(cx2 - 1, 56, 2, 26, '#c82a2a'); txt('▼', cx2, 44, 9, '#c82a2a', 'center', true, false); }
    if (S.mode === 'ok' || S.mode === 'win') txt(L.words, VW / 2, 104, 12, '#2a6a2a', 'center', true, false);
    if (S.mode === 'play') { rrect(20, 156, 300, 30, 6, 'rgba(18,16,28,.9)', '#ffd34d'); wrap(t('Scribes wrote without spaces. Mark the gaps between words: ◀ ▶ move · [A] set or remove a gap · ▼ done'), 288, 7).forEach((ln, i) => txt(ln, 28, 161 + i * 10, 7, '#fff', 'left', false, false)); }
    if (S.mode === 'fb') { const ls = wrap(t(S.msg), 300, 7.5); rrect(30, 150, VW - 60, 20 + ls.length * 10, 6, 'rgba(110,20,20,.95)', '#ff8a8a'); ls.forEach((ln, i) => txt(ln, 40, 156 + i * 10, 7.5, '#fff', 'left', true, false)); txt(t('[A]: try again'), VW / 2, 158 + ls.length * 10, 7, '#ffd34d', 'center', true, false); }
    if (S.mode === 'ok') { rrect(30, 150, VW - 60, 30, 6, 'rgba(20,80,40,.95)', '#7ee081'); txt(t('✓ Clear to read! Charlemagne would be proud.'), VW / 2, 156, 8, '#fff', 'center', true, false); txt(t('[A]: next line'), VW / 2, 168, 7, '#ffd34d', 'center', true, false); }
    if (S.mode === 'win') winPanel4('Scribe of St. Gallen! ✍️', 'The Carolingian scribes gave us lowercase letters, spaces between words and punctuation. Reading got much easier.');
  },
};
// ---------------------------------------------------------------- Gutenberg's shop: set the type (mirrored!) and print
const TYPE5 = ['S', 'A', 'R', 'H', 'B', 'I', 'L', 'N', 'M', 'T'], TYPEWORDS5 = ['SARAH', 'BIBLIA'];
const mir5 = (ch, x, y, size, col) => { ctx.save(); ctx.translate(x, y); ctx.scale(-1, 1); txt(ch, 0, 0, size, col, 'center', true, false); ctx.restore(); };
let TY5 = null;
function startType5(onWin) { transition(() => { scene = 'type5'; musI = 0; TY5 = { onWin, wi: 0, placed: [], sel: 0, mode: 'play', msg: '', t: 0, press: 0 }; }); }
SCENES.type5 = {
  music: 'gothic',
  update(dt) {
    const S = TY5; S.t += dt;
    if (S.mode === 'win') { if (S.t > .6 && inp.a) backToWorld(S.onWin); return; }
    if (S.mode === 'fb') { if (inp.a) S.mode = 'play'; return; }
    if (S.mode === 'press') { if (inp.aHeld) S.press = Math.min(1, S.press + dt * .7); else S.press = Math.max(0, S.press - dt * .4); if (inp.aHeld && Math.floor(S.t * 8) % 2) noise(.04, .02, 400); if (S.press >= 1) { S.mode = 'printed'; S.t = 0; sfx.ding(); shake = .3; } return; }
    if (S.mode === 'printed') { if (S.t > .5 && inp.a) { S.wi++; S.placed = []; S.press = 0; if (S.wi >= TYPEWORDS5.length) { S.mode = 'win'; S.t = 0; } else S.mode = 'play'; } return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    if (inp.left) { S.sel = (S.sel + 9) % 10; sfx.blip(); } if (inp.right) { S.sel = (S.sel + 1) % 10; sfx.blip(); } if (inp.up || inp.down) { S.sel = (S.sel + 5) % 10; sfx.blip(); }
    if (inp.a) {
      const w = TYPEWORDS5[S.wi], need = w[S.placed.length], got = TYPE5[S.sel];
      if (got === need) { S.placed.push(got); sfx.pick(); tone(180, .05, 'square', .08); if (S.placed.length === w.length) { S.mode = 'press'; S.press = 0; } }
      else { S.mode = 'fb'; S.msg = t('That is the mirrored {0}. We need the {1}.', got, need); sfx.bonk(); st5('mistakes'); }
    }
  },
  draw() {
    R(0, 0, VW, VH, '#3a2a1e'); for (let x = 0; x < VW; x += 24) R(x, 0, 2, VH, '#2a1e14'); R(0, 150, VW, 66, '#5a4030');
    TYPE5.forEach((c, i) => { const gx = 72 + (i % 5) * 60, gy = 112 + Math.floor(i / 5) * 44, sel = i === TY5.sel && TY5.mode === 'play'; R(gx - 20, gy - 16, 40, 36, sel ? '#ffb0cc' : '#8a909a'); R(gx - 20, gy - 16, 40, 2, sel ? '#fff' : '#b0b6c0'); R(gx - 20, gy + 18, 40, 2, '#5a606a'); });
    const S = TY5; if (S.mode === 'press' || S.mode === 'printed') { const py = 40 + S.press * 40; R(100, 20, 184, 4, '#6a5a4a'); R(188, 24, 8, py - 24, '#8a7a6a'); R(110, py, 164, 8, '#6a5a4a'); R(120, 100, 144, 6, '#e8e0d0'); }
  },
  ui() {
    const S = TY5, w = TYPEWORDS5[Math.min(S.wi, TYPEWORDS5.length - 1)];
    txt(t('GUTENBERG\'S PRINTING SHOP'), VW / 2, 4, 10, '#ffe8b0', 'center', true); txt(t('Set the word: {0}   ·   mirrored letters!', w), VW / 2, 18, 8, '#fff', 'center', true);
    if (S.mode === 'play' || S.mode === 'fb') {
      rrect(80, 34, 224, 30, 4, '#5a5a62', '#8a909a'); for (let i = 0; i < w.length; i++) { rrect(88 + i * 30, 38, 26, 22, 3, '#3a3f48'); if (S.placed[i]) mir5(S.placed[i], 101 + i * 30, 41, 14, '#ffffff'); }
      TYPE5.forEach((c, i) => mir5(c, 72 + (i % 5) * 60, 104 + Math.floor(i / 5) * 44, 16, '#2a2a30'));
      txt(t('Pick the next block: arrows + [A]. In the stick the letters stand backwards, so they print the right way round.'), VW / 2, 192, 6.5, '#d8c8a8', 'center', false, false);
    }
    if (S.mode === 'fb') { rrect(60, 176, VW - 120, 28, 6, 'rgba(110,20,20,.95)', '#ff8a8a'); txt(S.msg, VW / 2, 180, 7.5, '#fff', 'center', true, false); txt(t('[A]: try again'), VW / 2, 192, 6.5, '#ffd34d', 'center', true, false); }
    if (S.mode === 'press') { txt(t('Hold [A] to turn the screw!'), VW / 2, 150, 9, '#fff', 'center', true); rrect(110, 168, 164, 6, 3, 'rgba(255,255,255,.2)'); rrect(110, 168, 164 * S.press, 6, 3, '#ffd34d'); }
    if (S.mode === 'printed') { txt(w, VW / 2, 104, 22, '#2a2a30', 'center', true, false); txt(t('[A]: continue'), VW / 2, 190, 8, '#ffd34d', 'center', true); }
    if (S.mode === 'win') winPanel4('Printer\'s apprentice! 🔤', 'Before this, one book took a scribe a year. With movable type, one shop could print hundreds of copies. Ideas began to travel fast.');
  },
};
// ---------------------------------------------------------------- Paracelsus: the dose makes the poison
const DOSE5 = [{ n: 'Fever', plant: 'willow bark', icon: '🌿', zone: [.35, .7] }, { n: 'Pain', plant: 'poppy', icon: '🌺', zone: [.3, .5] }, { n: 'Weak heart', plant: 'foxglove', icon: '🌸', zone: [.17, .31] }];
let DS5 = null;
function startDose5(onWin) { transition(() => { scene = 'dose5'; musI = 0; DS5 = { onWin, pi: 0, lvl: 0, hold: false, mode: 'play', msg: '', t: 0 }; }); }
SCENES.dose5 = {
  music: 'renaiss',
  update(dt) {
    const S = DS5; S.t += dt;
    if (S.mode === 'win') { if (S.t > .6 && inp.a) backToWorld(S.onWin); return; }
    if (S.mode === 'fb') { if (inp.a) { S.mode = 'play'; S.lvl = 0; } return; }
    if (S.mode === 'ok') { if (inp.a) { S.pi++; S.lvl = 0; S.mode = S.pi >= DOSE5.length ? 'win' : 'play'; S.t = 0; if (S.mode === 'win') sfx.ding(); } return; }
    if (inp.b || inp.pause) { backToWorld(); return; }
    if (inp.aHeld) { S.hold = true; S.lvl = Math.min(1, S.lvl + dt * .55); if (Math.floor(S.t * 10) % 2) noise(.03, .02, 2000); }
    else if (S.hold) {
      S.hold = false; const P5 = DOSE5[S.pi];
      if (S.lvl < .03) return;
      if (S.lvl >= P5.zone[0] && S.lvl <= P5.zone[1]) { S.mode = 'ok'; sfx.ding(); }
      else { S.mode = 'fb'; S.msg = S.lvl < P5.zone[0] ? 'Too little: the medicine does nothing.' : 'Too much! Poison! "The dose makes the poison."'; sfx.bonk(); st5('mistakes'); }
    }
  },
  draw() { R(0, 0, VW, VH, '#4a3a2a'); for (let y = 0; y < VH; y += 12) R(0, y, VW, 1, '#3a2a1a'); R(0, 150, VW, 66, '#6a4a30'); for (const sx of [10, 286]) for (let r = 0; r < 3; r++) { R(sx, 60 + r * 36, 88, 5, '#5a3a22'); for (let k = 0; k < 6; k++) { R(sx + 4 + k * 14, 46 + r * 36, 8, 14, ['#c8302a', '#4a8a3a', '#d9a400', '#7a4a9a'][(r + k) % 4]); R(sx + 6 + k * 14, 44 + r * 36, 4, 3, '#e8e0d0'); } } bigSprite(() => drawCReal(0, 0, time, 'paracelsus'), 330, 204, 2); },
  ui() {
    const S = DS5, P5 = DOSE5[Math.min(S.pi, DOSE5.length - 1)];
    txt(t('THE DOSE MAKES THE POISON'), VW / 2, 5, 10, '#ffe8b0', 'center', true); txt(t('Patient {0}/3: {1}', Math.min(3, S.pi + 1), t(P5.n)), VW / 2, 18, 8, '#fff', 'center', true);
    txt(P5.icon + '  ' + t(P5.plant), VW / 2, 36, 10, '#c8ff9a', 'center', true, false);
    const fx = 150, fy = 56, fw = 84, fh = 96; rrect(fx, fy, fw, fh, 8, 'rgba(255,255,255,.15)', '#d8e8f0'); rrect(fx + 2, fy + fh - 2 - (fh - 4) * S.lvl, fw - 4, (fh - 4) * S.lvl, 6, S.lvl > P5.zone[1] ? '#c82a2a' : '#7ee0c0');
    const zy1 = fy + fh - 2 - (fh - 4) * P5.zone[1], zy2 = fy + fh - 2 - (fh - 4) * P5.zone[0]; ctx.strokeStyle = '#7ee081'; ctx.lineWidth = 2; ctx.strokeRect(fx - 4, zy1, fw + 8, zy2 - zy1);
    txt(t('right dose'), fx + fw + 10, (zy1 + zy2) / 2 - 4, 7, '#7ee081', 'left', true, false);
    if (S.mode === 'play') txt(t('Hold [A] to add drops, release to give the dose.'), VW / 2, 164, 8, '#fff', 'center', true);
    if (S.mode === 'fb') { rrect(50, 160, VW - 100, 34, 6, 'rgba(110,20,20,.95)', '#ff8a8a'); txt(t(S.msg), VW / 2, 166, 8, '#fff', 'center', true, false); txt(t('[A]: try again'), VW / 2, 180, 7, '#ffd34d', 'center', true, false); }
    if (S.mode === 'ok') { rrect(50, 160, VW - 100, 34, 6, 'rgba(20,80,40,.95)', '#7ee081'); txt(t('✓ The patient feels better!'), VW / 2, 166, 8.5, '#fff', 'center', true, false); txt(t('[A]: next patient'), VW / 2, 180, 7, '#ffd34d', 'center', true, false); }
    if (S.mode === 'win') winPanel4('Good doctor! ⚗️', 'Paracelsus wrote: "Everything is poison, and nothing is without poison; only the dose makes a thing not a poison."');
  },
};
// ---------------------------------------------------------------- the Plan of St. Gall: the librarian watches (reuses the Level 4 sketch-and-freeze engine)
const GAZE_STGALL = {
  title: 'SKETCHING THE PLAN OF ST. GALL', tip: 'Hold [A] to sketch. When the librarian turns around, let go and freeze!', caught: 'Ahem! 🤫', col: '#f4ead0', music: 'abbey',
  win: 'Sketched! ✏️', winSub: 'Drawn around 820: an ideal monastery with church, library, hospital, gardens and even a brewery. It is the only architectural drawing from the early Middle Ages that survives.',
  draw(Z) {
    R(0, 0, VW, VH, '#3a2a1e'); for (let x = 0; x < VW; x += 24) R(x, 0, 2, VH, '#2a1e14'); R(0, 150, VW, 66, '#5a4030');
    for (let i = 0; i < 6; i++) { R(14 + i * 62, 48, 50, 72, '#5a3a22'); for (let k = 0; k < 3; k++) { R(18 + i * 62, 74 + k * 22, 42, 3, '#3a2a14'); for (let j = 0; j < 7; j++) R(19 + i * 62 + j * 6, 62 + k * 22, 4, 10, ['#8a2a2a', '#2a5a8a', '#6a8a3a', '#d9a400'][(i + j + k) % 4]); } }
    bigSprite(() => drawPerson(0, 0, LOOKS4.Librarian), Z.hx + 60, 198, 2);
    if (Z.st === 'turn' || Z.st === 'look') txt(Z.st === 'turn' ? '?' : '!', Z.hx + 62, 124, 14, Z.st === 'look' ? '#ff4040' : '#ffd34d', 'center', true);
    R(254, 150, 118, 44, '#7a5a3a'); R(260, 152, 106, 34, '#efe0b0');
    bigSprite(() => drawSarah(0, 0, 'up', 0, 0, false, false), 226, 200, 2);
    const n = Math.floor(Z.p * 12); g.strokeStyle = '#4a3a2a'; g.lineWidth = 1; g.beginPath();
    const L = [[272, 168, 354, 168], [272, 158, 272, 180], [354, 158, 354, 180], [272, 158, 354, 158], [272, 180, 354, 180], [303, 158, 303, 180], [323, 158, 323, 180], [278, 163, 296, 163], [330, 163, 348, 163], [278, 175, 296, 175], [330, 175, 348, 175], [308, 163, 318, 175]];
    for (let i = 0; i < n; i++) { g.moveTo(L[i][0], L[i][1]); g.lineTo(L[i][2], L[i][3]); } g.stroke();
  },
};
// quiz backgrounds & definitions (reuse Level 4's choice scene)
const QZBG5 = {
  gorge: { sky: '#8a9ab0', sky2: '#d8dce0', ground: '#7a7470', deco: () => { poly([[0, 120], [60, 30], [120, 120]], '#5a5a62'); poly([[260, 120], [330, 20], [VW, 120]], '#5a5a62'); R(130, 70, 120, 50, '#4a7ac0'); g.strokeStyle = '#9a948a'; g.lineWidth = 7; g.beginPath(); g.arc(190, 92, 50, Math.PI, 0); g.stroke(); } },
  meadow: { sky: '#8ac4ee', sky2: '#e8f4fa', ground: '#6aa84f', deco: () => { drawMountains(100, '#8aa3c2', true, 11); R(0, 86, VW, 34, '#3f86c8'); } },
  plague: { sky: '#6a6a7a', sky2: '#a8a8b0', ground: '#5a4a3a', deco: () => { for (let i = 0; i < 6; i++) { R(10 + i * 64, 50, 40, 70, '#8a7a6a'); poly([[6 + i * 64, 50], [30 + i * 64, 30], [54 + i * 64, 50]], '#6a3a2a'); R(24 + i * 64, 80, 12, 14, '#2a2a2a'); } } },
  shop: { sky: '#6a4a2a', sky2: '#8a6a40', ground: '#5a4030', deco: () => { for (let i = 0; i < 6; i++) R(10 + i * 64, 30, 50, 70, '#3a2a1e'); for (let i = 0; i < 12; i++) R(18 + i * 30, 44 + (i % 2) * 24, 22, 6, ['#e8e0d0', '#c8302a', '#d9a400'][i % 3]); } },
  city: { sky: '#8ac4ee', sky2: '#e8f4fa', ground: '#b8aa8a', deco: () => { for (let i = 0; i < 6; i++) { R(i * 64, 60, 60, 60, ['#efe7d4', '#e0d4b8'][i % 2]); poly([[i * 64 - 2, 62], [i * 64 + 30, 40], [i * 64 + 62, 62]], '#a8432f'); } } },
  field: { sky: '#8ac4ee', sky2: '#e8f4fa', ground: '#7aa850', deco: () => { drawMountains(100, '#8aa3c2', true, 7); } },
};
const QUIZ5 = {
  devil: { title: 'THE DEVIL\'S BRIDGE', who: 'Urner', music: 'minne', bg: QZBG5.gorge, winTitle: 'You outsmarted the devil! 😈',
    steps: [
      { q: 'Urner: "We could not build a bridge across the gorge. So the devil offered: he builds it overnight, and gets the first soul to cross. What did we send over first?"', opts: [['A goat', true], ['The mayor', 'Nobody wanted to pay THAT price! The clever Urners sent a goat.'], ['Nobody: the bridge stayed empty', 'Then the devil would simply keep his bridge. Better to send a goat.']], ok: 'A goat! The devil was furious: he had hoped for a human soul.' },
      { q: 'Why was the Gotthard route so important?', opts: [['It was the shortest trade route over the Alps between Germany and Italy', true], ['It had the best ski slopes', 'Skiing came centuries later!'], ['It led to the sea', 'No sea here! But mules carried goods between north and south.']] },
      { q: 'The devil\'s bridge story is a...', opts: [['Legend', true], ['Eyewitness report', 'No: legends like this were told to explain the dangerous gorge.'], ['Roman law', 'No, it is a folk tale from the Alps.']] },
    ] },
  oath: { title: 'THE RÜTLI OATH', who: 'Elder', music: 'minne', bg: QZBG5.meadow, winTitle: 'A true Confederate! 🇨🇭',
    steps: [
      { q: 'Elder: "In 1291 three regions promised each other mutual help. Which?"', opts: [['Uri, Schwyz and Unterwalden', true], ['Zürich, Bern and Basel', 'Those joined later: Zürich 1351, Bern 1353, Basel 1501.'], ['Geneva, Vaud and Valais', 'Much later: Vaud 1803, Geneva and Valais 1815.']] },
      { q: 'What did they promise in the charter?', opts: [['To help each other against enemies and to accept no judges from outside', true], ['To found a state with a president', 'Not yet a state: it was an alliance between valleys.'], ['To build a tunnel under the Gotthard', 'The first Gotthard rail tunnel opened in 1882.']] },
      { q: 'The tale of the three men on the Rütli meadow is a...', opts: [['Legend, first written down in the 15th century', true], ['Report from 1291', 'The charter is real, but the Rütli oath story appears 150+ years later.'], ['Roman myth', 'No: it is a Swiss founding legend.']] },
      { q: 'When is the Swiss National Day?', opts: [['1 August', true], ['15 November (Morgarten)', 'Morgarten was fought on 15 November 1315.'], ['31 December', 'That is New Year\'s Eve!']] },
    ] },
  plague: { title: 'THE BLACK DEATH', who: 'Doctor', music: 'gothic', bg: QZBG5.plague, winTitle: 'You know your plague! 🐀',
    steps: [
      { q: 'Doctor: "People think it is bad air. My beak is full of herbs against it. What really caused the plague?"', opts: [['A bacterium spread by fleas on rats', true], ['Bad air (miasma)', 'That is what doctors believed then. The beak masks filled with herbs did not help.'], ['Witches\' curses', 'No. Frightened people blamed others, and innocent people were attacked. That was terribly unjust.']] },
      { q: 'Which measure actually helped?', opts: [['Quarantine: ships and travellers waited about 40 days', true], ['Bloodletting', 'It only weakened the sick.'], ['Eating more pepper', 'Spices were expensive, but did nothing against plague.']], ok: 'Right! "Quaranta" means forty: forty days of waiting.' },
      { q: 'How many Europeans died in the Black Death?', opts: [['About a third', true], ['Nearly everyone', 'It was terrible, but not everyone: about one in three.'], ['About one in a hundred', 'Many more than that: about a third of all people.']] },
    ] },
  erasmus: { title: 'FROBEN\'S PRINTING SHOP', who: 'Erasmus', music: 'renaiss', bg: QZBG5.shop, winTitle: 'A true humanist! 📚',
    steps: [
      { q: 'Erasmus: "In 1516 Froben printed my Greek New Testament in Basel. Why was printing so revolutionary?"', opts: [['Books became cheaper, so far more people could read the same ideas', true], ['Books became smaller', 'Size had nothing to do with it: price and copies did.'], ['Nobody had to read any more', 'The opposite: more people than ever learned to read.']] },
      { q: 'Who painted the famous portrait of Erasmus in Basel?', opts: [['Hans Holbein the Younger', true], ['Albrecht Dürer', 'Dürer did draw Erasmus once, but the famous Basel portrait is by Holbein.'], ['Leonardo da Vinci', 'Leonardo lived in Italy and France.']] },
      { q: 'What does "Renaissance" mean?', opts: [['Rebirth', true], ['Revolution', 'Close in sound, but it means "rebirth": the rebirth of ancient ideas.'], ['Reformation', 'That is a different movement, about the Church.']] },
    ] },
  wurst: { title: 'LENT IN ZÜRICH, 1522', who: 'Froschauer', music: 'renaiss', bg: QZBG5.city, winTitle: 'The Reformation in Zürich! 🌭',
    steps: [
      { q: 'Froschauer: "My workers were hungry, so I served sausages. What was the scandal?"', opts: [['It was Lent: the Church forbade eating meat', true], ['Sausages were illegal in Zürich', 'No law against sausages: it was about fasting in Lent.'], ['The sausages were stolen', 'Not stolen: they were simply eaten at the wrong time of year.']] },
      { q: 'How did Zwingli defend them?', opts: [['The Bible, not church rules, should decide', true], ['The Pope had allowed it', 'No: Zwingli argued with the Bible against the Pope\'s rules.'], ['Sausages are not meat', 'They are meat! The argument was about the authority of the Bible.']] },
      { q: 'Which monk started the Reformation in Germany in 1517?', opts: [['Martin Luther', true], ['Jan Hus', 'Hus was burned in 1415, a century earlier.'], ['Gallus', 'Gallus lived in the 7th century!']] },
    ] },
  marignano: { title: 'MARIGNANO, 1515', who: 'Reisläufer', music: 'renaiss', bg: QZBG5.field, winTitle: 'You understand the lesson! 💥',
    steps: [
      { q: 'Sarah warned the mercenaries in vain. After two days at Marignano, what happened?', opts: [['The Swiss lost against the French king\'s cannons', true], ['The Swiss won easily', 'No: pikemen in open fields were no match for cannons and cavalry.'], ['Nobody fought: it rained', 'There was a real battle: it lasted two days.']] },
      { q: 'What did the Confederation learn from Marignano?', opts: [['Stop expanding into Italy: a root of Swiss neutrality', true], ['Build more cannons', 'It stayed out of foreign wars instead.'], ['Hire French generals', 'Swiss troops still fought as mercenaries, but the state stopped expanding.']] },
      { q: 'Since 1506 Swiss soldiers have guarded...', opts: [['The Pope', true], ['The King of France', 'France hired Swiss troops, but the famous guard serves the Pope.'], ['The Emperor in Vienna', 'No: the famous guard serves the Pope in Rome.']] },
    ] },
};
// ================================================================ BREAK-INS: Aachen · Chillon · Kapellbrücke · Fuggerei
Object.assign(STYLE, {
  aachen: { floor: '#d8cfa8', line: '#c8bc90', face: '#b8a878', faceL: '#a89868', top: '#4a3c20' },
  chillon: { floor: '#a8a49a', line: '#8f8a80', face: '#78746c', faceL: '#68645c', top: '#2c2a26' },
  kapell: { floor: '#9a6a3c', line: '#8a5a30', face: '#5a3a1e', faceL: '#6a4a2a', top: '#2a1a0c' },
  fugger: { floor: '#c8a878', line: '#b89868', face: '#d8b868', faceL: '#c8a858', top: '#4a3a1c' },
});
function checkEra5() { saveGame(); if (eraDone5(L5().era)) setTimeout(() => crText(L5().era < 3 ? 'Do you hear that humming? The portal stone is awake! ⏳' : 'Everything done! The Chronicler\'s exam awaits in Froben\'s printing shop in Basel. 📝'), 1500); }
function sketchDone5(id) {
  L5().sk[id] = 1; st5('sketches'); saveGame(); const s = SKETCHES5.find(q => q[0] === id);
  setTimeout(() => { toast(t('✏️ Sketched: {0}', t(s[2]))); checkEra5(); }, 600);
}
const breakIn5 = (id, name, style, map, guards, decor, lines, cardId) => {
  INTERIORS[id] = { name, style, music: 'interior', map, guards, decor, isDone: () => !!L5().sk[id], onDone() { sfx.ding(); say(lines, () => { exitInterior(); setTimeout(() => { card4(cardId); sketchDone5(id); }, 900); }); } };
};
breakIn5('aachen', 'The Palatine Chapel, Aachen', 'aachen',
  ['####################', '#######.....D#######', '#####..........#####', '####..o......o..####', '###..............###', '###..b........b..###', '###..............###', '###..o........o..###', '####............####', '#####..........#####', '######...P....######', '#########E##########'],
  [{ name: 'Palace guard', col: '#2a3a7a', hat: '#8a8a90', path: [[6, 4], [13, 4], [13, 7], [6, 7]], speed: 26, line: 'Halt! Nobody enters the emperor\'s chapel without permission!' },
    { name: 'Palace guard', col: '#2a3a7a', hat: '#8a8a90', path: [[7, 2], [12, 2]], speed: 20, line: 'Halt! Nobody enters the emperor\'s chapel without permission!' }],
  () => { ell(160, 100, 66, 52, 'rgba(217,164,0,.12)'); ell(160, 100, 44, 34, 'rgba(217,164,0,.14)'); ell(160, 100, 22, 16, 'rgba(217,164,0,.16)'); R(190, 12, 18, 16, '#e8e0d0'); R(188, 28, 22, 3, '#c8bca0'); R(186, 31, 26, 3, '#b8ac90'); R(194, 14, 10, 8, '#d9a400'); },
  [['Sarah', 'The Palatine Chapel! An octagon with a dome, modelled on San Vitale in Ravenna. ✏️'], ['Sketchbook', 'Around 800 Charlemagne wanted a new Rome in the North. The chapel shows it: marble from Italy, a gold-covered dome, and his throne in the gallery.'], ['Sarah', 'Ravenna again! History does like to repeat itself. Now out of here...']], 'aachen');
breakIn5('chillon', 'Château de Chillon', 'chillon',
  ['####################', '#ww.......D.......b#', '#ww................#', '#.....o....o....o..#', '#..................#', '#.b..............b.#', '#..................#', '#.....o....o....o..#', '#..................#', '#.b..............b.#', '#.........P........#', '#########E##########'],
  [{ name: 'Savoyard guard', col: '#c82a2a', hat: '#8a8a90', path: [[2, 4], [17, 4], [17, 6], [2, 6]], speed: 26, line: 'Halt! Count Peter does not receive visitors at night!' },
    { name: 'Savoyard guard', col: '#c82a2a', hat: '#8a8a90', path: [[4, 8], [15, 8]], speed: 20, line: 'Halt! Count Peter does not receive visitors at night!' }],
  () => { for (const tx of [60, 130, 200, 270]) { R(tx, 6, 3, 10, '#5a3a20'); circ(tx + 1, 4, 3 + Math.sin(time * 9 + tx) * .8, '#ffb030'); } R(150, 2, 24, 14, '#c82a2a'); R(158, 2, 8, 14, '#f4f0e8'); R(152, 6, 20, 6, '#f4f0e8'); },
  [['Sarah', 'Chillon! A castle on a rock in Lake Geneva. ✏️'], ['Sketchbook', 'The Counts of Savoy built it to control the road along the lake. Thick towers, a Gothic hall and a rock foundation that you can still see inside.'], ['Sarah', 'Let us leave before the count wakes up...']], 'chillon');
breakIn5('kapell', 'The Kapellbrücke, by night', 'kapell',
  ['####################', 'wwwwwwwwwwwwwwwwwwww', 'wo..o...o...o...o..w', 'w..............D...w', 'w..................w', 'w..................w', 'wo..o...o...o...o..w', 'wwwwwww...wwwwwwwwww', 'wwwwwww...wwwwwwwwww', 'wwwwwww...wwwwwwwwww', 'wwwwwww.P.wwwwwwwwww', '########E###########'],
  [{ name: 'Night watchman', col: '#4a4a5a', hat: '#2a2a3a', path: [[2, 3], [13, 3]], speed: 22, line: 'Halt! The bridge is closed after dark! (And I have a lantern.)' },
    { name: 'Night watchman', col: '#4a4a5a', hat: '#2a2a3a', path: [[17, 5], [3, 5]], speed: 18, line: 'Halt! The bridge is closed after dark! (And I have a lantern.)' }],
  () => { for (let i = 0; i < 9; i++) poly([[8 + i * 34, 4], [24 + i * 34, 22], [40 + i * 34, 4]], ['#e8c02a', '#4a7ac0', '#c82a2a'][i % 3]); g.fillStyle = 'rgba(10,15,50,.32)'; g.fillRect(0, 0, 320, 192); },
  [['Sarah', 'The Kapellbrücke at night! A covered wooden bridge with a stone water tower. ✏️'], ['Sketchbook', 'Built around 1333 as part of the city defences, it zigzags across the Reuss. The painted triangles in the roof came 300 years later.'], ['Sarah', 'Part bridge, part wall, part picture gallery. Now to sneak off the bridge...']], 'kapell');
breakIn5('fugger', 'The Fuggerei, Augsburg', 'fugger',
  ['####################', '#hhh.hhh..D.hhh.hhh#', '#hhh.hhh....hhh.hhh#', '#..................#', '#.o..............o.#', '#..................#', '#hhh.hhh....hhh.hhh#', '#hhh.hhh....hhh.hhh#', '#..................#', '#.o..............o.#', '#.........P........#', '#########E##########'],
  [{ name: 'Fuggerei watchman', col: '#5a4a2a', hat: '#2a2a2a', path: [[2, 3], [17, 3], [17, 8], [2, 8]], speed: 24, line: 'Halt! The gates close at ten o\'clock! Residents only!' },
    { name: 'Fuggerei watchman', col: '#5a4a2a', hat: '#2a2a2a', path: [[10, 5], [10, 9]], speed: 16, line: 'Halt! The gates close at ten o\'clock! Residents only!' }],
  () => { for (const [lx, ly] of [[40, 70], [280, 70], [40, 150], [280, 150]]) { ell(lx, ly, 22, 14, 'rgba(255,200,100,.12)'); circ(lx, ly - 14, 2, '#ffd34d'); } g.fillStyle = 'rgba(20,20,50,.22)'; g.fillRect(0, 0, 320, 192); },
  [['Sarah', 'The Fuggerei: little houses around quiet lanes. ✏️'], ['Sketchbook', 'Founded in 1521 by Jakob Fugger for poor citizens: the oldest social housing complex still in use. The rent is still one Rhenish guilder per year, plus three prayers a day.'], ['Sarah', 'Social housing with a gate and prayers. Architecture AND a good deed. Out we go...']], 'fugger');

// ================================================================ QUESTS & CONVERSATIONS
const quickCard5 = (lines, cards) => say(lines, () => { for (const c of [].concat(cards || [])) card4(c); });
const won5 = (id, lines, cards) => () => { L5().quests[id] = 1; st5('quests'); say(lines, () => { for (const c of [].concat(cards || [])) card4(c); checkEra5(); }); };
const WIN5 = {
  firewood: won5('firewood', [['C-Real', 'A neat woodpile! The bear is very pleased. 🐻'], ['Sarah', 'Is it really true that a bear helped Gallus?'], ['C-Real', 'Legend says so. Gallus gave it bread in return. The real Gallus lived around 612, and his little cell grew into the Abbey of St. Gallen.']], 'gallus'),
  scripto: won5('scripto', [['Alcuin', 'Splendid! Clear words, clear letters. This is the new script of King Charles: the Carolingian minuscule.'], ['Alcuin', 'People will still write with those little letters in a thousand years.'], ['Sarah', 'Lowercase letters! Thank you, Alcuin.']], 'minuscule'),
  devil: won5('devil', [['Urner', 'The devil never got his soul, and the Gotthard stayed open for trade. Not bad for a goat!'], ['C-Real', 'Around 1230 the pass became the shortest route between Germany and Italy. Uri grew rich from tolls and porters.']], ['teufel', 'gotthard']),
  apple: won5('apple', [['Gessler', 'Hmpf! A fine shot... Guards, let them go. (This was NOT in the script.)'], ['C-Real', 'You shot an apple off my head. Never again, please.'], ['Sarah', 'Never again. Promise. And remember: Tell is a legend, first written down around 1470.']], 'tell'),
  oath: won5('oath', [['Elder', 'So it is sworn: help for each other, and no foreign judges!'], ['C-Real', 'The real charter dates from early August 1291, a Latin parchment kept in Schwyz. The tale of the Rütli is a later legend.']], ['charter', 'freedom']),
  ambush: won5('ambush', [['C-Real', 'The Habsburg knights could not turn around in the narrow pass. The Confederates won at Morgarten!'], ['Sarah', 'With rocks and logs?'], ['C-Real', 'So tradition says. A month later, in December 1315, they renewed their alliance at Brunnen.']], 'morgarten'),
  press: won5('press', [['C-Real', 'Our first page! Letter by letter, and all of it backwards. Johann Fust is going to love this.'], ['Fust', 'A hundred copies by Easter? I will bring the money.'], ['C-Real', 'Around 1455 my Bible will come off this press: 42 lines to the page.']], 'gutenberg'),
  saumer: won5('saumer', [['Säumer', 'You and the mule made it to the hospice! Welcome to the Gotthard club.'], ['Sarah', 'How much does a mule carry?'], ['Säumer', 'About a hundred kilos. And it complains far less than a human.']], 'saumer'),
  plague: won5('plague', [['Doctor', 'Remember: wash, wait and keep your distance. The old ways are not enough.'], ['C-Real', 'The plague returned again and again. And in 1356 an earthquake flattened Basel. This century was not easy.']], ['plague', 'quake']),
  murten: won5('murten', [['Runner', '*gasps* Victory at Murten! Charles the Bold is beaten!'], ['C-Real', 'Legend says the messenger carried a linden branch to Fribourg. Today a 17 km race remembers him.']], 'murten'),
  dose: won5('dose', [['C-Real', 'Everything is poison, and nothing is without poison. Only the dose makes it right.'], ['Sarah', 'That is why every medicine has a dosage on it!'], ['C-Real', 'And in 1543 a doctor from Brussels will print the first modern anatomy book right here in Basel: Vesalius.']], ['paracelsus', 'vesalius']),
  erasmus: won5('erasmus', [['Erasmus', 'Books are the best way to spread ideas. And printers are excellent company.'], ['Erasmus', 'My friend Holbein painted my portrait last year. He makes everyone look intelligent.']], 'erasmus'),
  wurst: won5('wurst', [['Zwingli', 'The Bible alone is the measure. Zürich will change.'], ['C-Real', 'A few months earlier, in Wittenberg, Luther had started the Reformation by criticising the sale of indulgences.']], ['wurst', 'luther']),
  marignano: won5('marignano', [['Reisläufer', 'We lost. Time to go home and keep out of foreign wars.'], ['C-Real', 'Swiss soldiers still served abroad for centuries. Since 1506 the Pope\'s own guard has been Swiss.']], ['marignano', 'swissguard']),
  soup: won5('soup', [['Innerschweizer', 'Cheers! I never thought I would eat with a Zürcher.'], ['Zürcher', 'This soup tastes better than war.'], ['C-Real', 'In 1531 war did break out and Zwingli fell. But for one afternoon in 1529, soup beat swords.']], ['kappel', 'kappel2']),
};
const winStGall5 = () => { L5().sk.stgall = 1; st5('sketches'); say([['Sarah', 'Got it! The Plan of St. Gall. ✏️'], ['Sketchbook', 'An ideal monastery on five sheets of parchment: church, library, hospital, gardens and even a brewery.']], () => { card4('stgall'); toast(t('✏️ Sketched: {0}', t(SKETCHES5[0][2]))); checkEra5(); }); };
const quiz5 = id => startQuiz4({ ...QUIZ5[id], onWin: WIN5[id] });
const INTRO5 = [
  [['C-Real', 'Sarah! Behold: Gallus, Irish monk. Brown cowl, walking staff... and a very polite bear.'], ['Sarah', 'Gallus? The founder of St. Gallen?'], ['C-Real', 'Exactly! It is the year 612, and I am about to settle in these woods. The monks here will one day keep one of the greatest libraries in Europe.'],
    ['C-Real', 'The portal stone in the south-east wakes up once we understand this era: help the bear, learn to copy books, and sketch the Plan of St. Gall and the Palatine Chapel at Aachen.']],
  [['C-Real', 'Sarah! Minstrel Johannes Hadlaub, at your service. Lute, feathered cap, tragic love songs.'], ['Sarah', 'You look very medieval. And slightly pleased with yourself.'], ['C-Real', 'The years 1230 to 1315: the Gotthard opens, the Habsburgs rise, three valleys swear an oath... and Switzerland begins. Legends included! I will tell you which are which.'],
    ['C-Real', 'To wake the portal stone in the east: outsmart the devil, take the apple shot, join the oath, join the ambush, and sketch Château de Chillon.']],
  [['C-Real', 'Sarah! Johannes Gutenberg, goldsmith from Mainz. My hands are full of ink and my pockets are full of debt.'], ['Sarah', 'The printing guy! Letters made of metal!'], ['C-Real', 'The years 1333 to 1481: the Black Death, war with Burgundy, the Council of Constance... and soon, books for everyone. Tour: Luzern, Basel, Mainz and the Gotthard road.'],
    ['C-Real', 'Quests: print, lead a mule over the Gotthard, learn about the plague, run the Murten messenger race, and sketch the Kapellbrücke at night.']],
  [['C-Real', 'Sarah! Theophrastus Bombastus von Hohenheim, called Paracelsus. Doctor, alchemist, big mouth.'], ['Sarah', 'Paracelsus, from Einsiedeln! The "dose makes the poison" man!'], ['C-Real', 'The years 1494 to 1531: Renaissance, Reformation and a lot of printed arguments. Dürer crosses the Alps, Zwingli changes Zürich, and Swiss pikemen meet cannons.'],
    ['C-Real', 'Last era! The dose, Erasmus, the sausages, Marignano, the milk soup, and the Fuggerei. Then the exam in Basel.']],
];
const HINTS5 = {
  firewood: 'A bear near Gallus\' cell needs help with firewood. Look in the Steinach forest in the west!', scripto: 'The scriptorium of St. Gallen: Alcuin will teach you the new script. ✍️', sk_stgall: 'The library next to the abbey keeps the Plan of St. Gall. Sketch it when the librarian is not looking!',
  sk_aachen: 'Charlemagne\'s Palatine Chapel at Aachen, in the north-west. Palace guards... sneak in!', devil: 'The Devil\'s Bridge in the Schöllenen gorge, in the south. 😈', apple: 'Altdorf: a hat on a pole and a very grumpy bailiff, near the lake. 🍎',
  oath: 'The Rütli meadow at the lake, south-west. Time to swear.', ambush: 'Morgarten, in the east, beside the Ägerisee. Bring a good throwing arm.', sk_chillon: 'Château de Chillon, on Lake Geneva in the west. Savoyard guards... sneak in!',
  press: 'Mainz, in the north-east: my printing shop!', saumer: 'The mule stable on the Gotthard road, south of Luzern. 🫏', plague: 'The doctor at the Basel hospital, in the north-west. Mask on.', murten: 'The runner at the wall of Murten, in the west, needs fast legs.',
  sk_kapell: 'The Kapellbrücke in Luzern at night. Watchmen... sneak in!', dose: 'Paracelsus\' apothecary in Basel. Bring a steady hand.', erasmus: 'Erasmus is at Froben\'s printing shop in Basel.', wurst: 'The printer Froschauer in Zürich has sausages and trouble.',
  marignano: 'The Swiss mercenary camp at Marignano, in the south-east.', soup: 'Kappel, in the south-east: two armies and a cauldron of milk soup. 🥣', sk_fugger: 'The Fuggerei in Augsburg, in the north. Mind the gate and the watchman.',
};
const PORTAL_AT5 = ['The portal stone is awake! It stands in the south-east, behind Müstair. ⏳', 'The portal stone is awake! It is in the east, beyond Morgarten. ⏳', 'The portal stone is awake! It is in the south-east, near Constance. ⏳'];
function hint5() {
  const e = L5().era, m = missing5(e);
  if (m.length) return HINTS5[m[0]];
  if (e < 3) return PORTAL_AT5[e];
  if (!L5().flags.exam) return 'Everything done! The Chronicler\'s exam awaits in Froben\'s printing shop in Basel. 📝';
  return 'A thousand years, one beautiful chronicle. Want to keep exploring? ⏳';
}
function l5Talk(spot) {
  const e = L5().era; L5().cp = spot; const lines = [];
  if (!L5().met['intro' + e]) { L5().met['intro' + e] = 1; lines.push(...INTRO5[e]); } else lines.push(['C-Real', hint5()]);
  if (ST.hearts < ST.maxHearts) lines.push(['C-Real', ['Have some apples. 🍎', 'Have some bread and cheese. 🧀', 'Have some bread and cheese. 🧀', 'Have some Zürich sausages. 🌭'][e], () => { ST.hearts = ST.maxHearts; sfx.pick(); }]);
  lines.push(['C-Real', 'I\'ll keep this spot as your checkpoint. ❤']); say(lines, saveGame);
}
const NPC_TALK5 = {
  'Othmar'() { quickCard5([['Othmar', 'I am Othmar, abbot. In 719 I founded this monastery next to the cell of Gallus.'], ['Othmar', 'We pray, farm, heal the sick, teach and copy books. The Rule of Benedict says it all: "ora et labora", pray and work.'], ['Sarah', 'And brew beer, according to the plan I saw.'], ['Othmar', 'Brewing is also work. And prayer. Mostly.']], ['othmar', 'rule']); },
  'Alemann'() { quickCard5([['Alemann', 'Grüezi! We Alemanni settled here when Rome\'s western empire crumbled. Fields, cows, long houses.'], ['Alemann', 'The Burgundians live further west and speak another tongue. One day this will be a language border!'], ['Sarah', 'The Röstigraben! It starts here.']], 'alemanni'); },
  'Librarian'() { if (!L5().sk.stgall) say([['Librarian', 'Shhh! This is a library. And that is the Plan of St. Gall: do NOT touch it.']]); else quickCard5([['Librarian', 'Our brothers on the island of Reichenau have an even bigger scriptorium. Founded 724. They illuminate books like angels.']], 'reichenau'); },
  'Alcuin'() { if (!q5('scripto')) say([['Alcuin', 'Welcome to the court school of King Charles! Would you like to learn the new script? Come into the scriptorium.']]); else say([['Alcuin', 'Clear letters, clear thoughts. That is my motto.']]); },
  'Charlemagne'() { quickCard5([['Charlemagne', 'I am Charles, king of the Franks. On Christmas Day 800 the Pope crowned me emperor in Rome.'], ['Sarah', 'Karl der Grosse! Your empire includes Switzerland.'], ['Charlemagne', 'Even the Alps. I like order: one law, one currency and one script.']], 'charlemagne'); },
  'Nun'() { quickCard5([['Nun', 'Welcome to Müstair! Look at the walls: a hundred scenes from the Bible, painted around 800.'], ['Nun', 'They were covered by whitewash for centuries, and found again in the 1900s. Now the whole world comes to look.']], 'muestair'); },
  'Urner'() { quiz5('devil'); },
  'Elder'() { quiz5('oath'); },
  'Gessler'() { if (!q5('apple')) say([['Gessler', 'I am Gessler, bailiff of the Habsburgs. See that hat on the pole? Everyone must bow to it!'], ['Sarah', 'To a hat? ...What if we do not?'], ['Gessler', 'Then you shoot an apple off your companion\'s head. With THAT crossbow.'], ['C-Real', 'Why do I always have to be the one with the apple...']], () => startTiming4('apple', WIN5.apple)); else say([['Gessler', 'I am watching you. Mostly the hat.']]); },
  'Knight'() { quickCard5([['Knight', 'I am a knight of Habsburg. Our castle in Aargau has stood since 1020.'], ['Knight', 'Our count is now King Rudolf, and next he will be Duke of Austria. We are going far.']], 'habsburg'); },
  'Mason'() { quickCard5([['Mason', 'I am a mason on Lausanne cathedral: pointed arches, a rose window, flying buttresses. Gothic! It was consecrated in 1275.'], ['Sarah', 'Light and height instead of thick walls. Oh, I love this.']], 'lausanne'); },
  'Count Peter'() { quickCard5([['Count Peter', 'I am Peter of Savoy. They call me the "little Charlemagne". I have rebuilt Chillon in stone.'], ['Count Peter', 'From the castle I control the road and collect the tolls. Do not sketch it without asking!']], 'chillon'); },
  'Fust'() { if (!q5('press')) say([['Fust', 'I am Johann Fust, a banker from Mainz. Gutenberg owes me money. He promises a machine that makes books.'], ['Fust', 'If it works, I am rich. If not... I am still in Mainz.']]); else say([['Fust', 'A hundred Bibles! Now to sell them.']]); },
  'Doctor'() { quiz5('plague'); },
  'Säumer'() { if (!q5('saumer')) say([['Säumer', 'I am a Säumer: I take mules with goods over the Gotthard. Wool, wine, salt, cheese.'], ['Säumer', 'My mule needs a guide today. Will you lead it? Rockfall is fine. It is the humans who are difficult.']], () => startRun4('saumer', WIN5.saumer)); else say([['Säumer', 'Hospices, bridges, inns: the whole route lives off us muleteers.']]); },
  'Runner'() { if (!q5('murten')) say([['Runner', 'Charles the Bold is beaten at Murten! Somebody has to carry the news to Fribourg, about 17 km, with this linden branch.'], ['Sarah', 'The famous Murten messenger! ...Hand me the branch.']], () => startRun4('murten', WIN5.murten)); else say([['Runner', 'Every year thousands run this race. Not all of them with a branch.']]); },
  'Hus'() { quickCard5([['Hus', 'I am Jan Hus from Prague. I came to the Council of Constance under a promise of safe conduct.'], ['Hus', 'I am afraid that promise is worth very little. The Council wants to end the split with three popes... and silence me.'], ['Sarah', 'They will burn you in 1415. I am so sorry.']], 'konstanz'); },
  'Brother Klaus'() { quickCard5([['Brother Klaus', 'I am Niklaus von Flüe. I left my family and my farm to live as a hermit in the Ranft gorge.'], ['Brother Klaus', 'In 1481 the Confederates quarrelled so much that war was near. I told them: be reasonable, stop meddling in everybody else\'s fights.'], ['C-Real', 'He was a mediator at Stans. Many Swiss think of him as an early voice for neutrality.']], 'stans'); },
  'Pikeman'() { quickCard5([['Pikeman', 'I carry the long pike. At Sempach in 1386 the knights of Habsburg met our halberds and pikes. We won.'], ['Pikeman', 'They tell of Winkelried who gathered the enemy spears in his arms. Nobody wrote it down for 150 years, though.']], ['sempach', 'winkelried']); },
  'Charles'() { say([['Charles', 'I am Charles the Bold, Duke of Burgundy. I will conquer Switzerland! Behold my cannons!'], ['Sarah', 'In 1476 you lose at Grandson and Murten. And in 1477 you die at Nancy.'], ['Charles', 'Do not spoil my war!']]); },
  'Guildmaster'() { quickCard5([['Guildmaster', 'Greetings from Zürich! In 1336 our guilds, led by Rudolf Brun, took power from the old noble families.'], ['Guildmaster', 'Butchers, bakers, weavers: now the craftsmen have a vote in the council. Very modern.']], 'zuerich'); },
  'Erasmus'() { quiz5('erasmus'); },
  'Holbein'() { quickCard5([['Holbein', 'I am Hans Holbein the Younger. I paint portraits: Erasmus, merchants, councillors. And now you, Sarah!'], ['Sarah', 'Do I need to hold still?'], ['Holbein', 'Yes. Three hours. Think of a very important building.'], ['Sarah', '...Done. How do I look?'], ['Holbein', 'Like a woman who has just sketched the Pantheon. Splendid.']], 'holbein'); },
  'Froschauer'() { quiz5('wurst'); },
  'Zwingli'() { if (!q5('wurst')) say([['Zwingli', 'I am Ulrich Zwingli, people\'s priest at the Grossmünster. I preach straight from the Bible.'], ['Zwingli', 'The printer Froschauer has made a delicious scandal with his sausages. Go and talk to him.']]); else say([['Zwingli', 'Zürich will be reformed: no images in churches, no fasting rules, no pilgrimages.']]); },
  'Reisläufer'() { quiz5('marignano'); },
  'Fugger'() { quickCard5([['Fugger', 'I am Jakob Fugger, called "the Rich". I lend money to emperors and popes.'], ['Fugger', 'I built the Fuggerei for the poor of Augsburg. A year\'s rent: one guilder and three prayers a day.'], ['Sarah', 'Social housing in the 1500s. I approve.']], 'fugger'); },
  'Dürer'() { quickCard5([['Dürer', 'I am Albrecht Dürer from Nuremberg. In 1494 I crossed the Alps to Venice to learn what the Italians know about painting.'], ['Dürer', 'In Milan, the master Leonardo is painting a dinner party. Everything has a vanishing point, Sarah. Everything!'], ['Sarah', 'Perspective! I knew I liked this century.']], ['durer', 'leonardo']); },
  'Watchman'() { say([['Watchman', 'The Fuggerei gates close at ten. Whoever is outside must pay the watchman.'], ['Sarah', 'Still true today. I read it in the brochure.']]); },
  'Clockmaker'() { quickCard5([['Clockmaker', 'This is the Zytglogge. Brand new astronomical clock: hours, date, moon phase, zodiac, even a procession of bears.'], ['Sarah', 'Bears again!']], 'zytglogge'); },
  'Zürcher'() { say([['Zürcher', 'We Zürcher stand on this side. They are on the other side. Neither of us wants to start the war.'], ['Zürcher', 'Hunger though. Hmm.']]); },
  'Innerschweizer'() { say([['Innerschweizer', 'We Catholic cantons camp on this side. The Zürcher are over there. We are both hungry.'], ['Innerschweizer', 'I have milk. They have bread. Maybe...']]); },
};
function npcTalk5(name) { if (NPC_TALK5[name]) NPC_TALK5[name](); }
function l5BuildingAct(b) {
  const interior = () => { if (L5().sk[b.id]) say([['Sarah', 'Already sketched. Sneaking in twice is just showing off.']]); else enterInterior(b.id, b.doorX, b.doorY + 10); };
  switch (b.id) {
    case 'portal': portalAct5(); return;
    case 'scripto': if (!q5('scripto')) say([['Alcuin', 'Welcome to the scriptorium! Parchment, quills and ink. Today: the new Carolingian script. First lesson: put spaces between the words!']], () => startScripto5(WIN5.scripto)); else NPC_TALK5.Alcuin(); return;
    case 'library': if (!L5().sk.stgall) say([['Sarah', 'The Plan of St. Gall, on five sheets of parchment... I have to sketch this. Is that librarian watching me?'], ['C-Real', 'Monks are curious. Freeze when he looks!']], () => startGaze4(winStGall5, GAZE_STGALL)); else NPC_TALK5.Librarian(); return;
    case 'aachen': case 'chillon': case 'kapell': case 'fugger': interior(); return;
    case 'pfalz': NPC_TALK5.Charlemagne(); return;
    case 'muestair': NPC_TALK5.Nun(); return;
    case 'habsburg': NPC_TALK5.Knight(); return;
    case 'manesse': quickCard5([['C-Real', 'The Codex Manesse! Zürich\'s great songbook: about 140 poets, each with a full-page portrait. I am in there, you know.'], ['Sarah', 'Hadlaub the Minnesinger. Of course you are.']], 'manesse'); return;
    case 'lausanne': NPC_TALK5.Mason(); return;
    case 'ruetli': quiz5('oath'); return;
    case 'hatpole': NPC_TALK5.Gessler(); return;
    case 'devil': quiz5('devil'); return;
    case 'ambush': if (!q5('ambush')) say([['Elder', 'The Habsburg army is marching into the pass below. We attack from the slope!'], ['C-Real', 'Time your rocks, Sarah. When they are in the green zone... let go!']], () => startTiming4('ambush', WIN5.ambush)); else say([['Sarah', 'Morgarten, the narrow pass. Legends say rocks and logs; historians say: a well-planned ambush.']]); return;
    case 'press': if (!q5('press')) say([['C-Real', 'My printing shop! Letters of metal, set backwards in a stick. Let us print a page!']], () => startType5(WIN5.press)); else NPC_TALK5.Fust(); return;
    case 'stable': NPC_TALK5['Säumer'](); return;
    case 'hospital': NPC_TALK5.Doctor(); return;
    case 'muenster': quickCard5([['Sarah', 'The Basel Münster, and next to it the new university: founded 1460, the oldest in Switzerland.'], ['C-Real', 'Humanists, printers and doctors: Basel is becoming a very clever city.']], 'basel'); return;
    case 'wall': NPC_TALK5.Runner(); return;
    case 'council': NPC_TALK5.Hus(); return;
    case 'winkel': quickCard5([['Sarah', 'A memorial for Winkelried at Sempach. The legend is much younger than the battle.'], ['C-Real', 'Legends grow, Sarah. That is why historians check them.']], ['sempach', 'winkelried']); return;
    case 'ranft': NPC_TALK5['Brother Klaus'](); return;
    case 'froben': if (!q5('erasmus')) quiz5('erasmus'); else if (eraDone5(3) && !L5().flags.exam) startExam5(); else say([['Erasmus', 'Books are the best way to spread ideas.']]); return;
    case 'apothecary': if (!q5('dose')) say([['C-Real', 'My apothecary in Basel! Every remedy has a poison inside. Today: the right dose.']], () => startDose5(WIN5.dose)); else say([['C-Real', 'Everything is poison. Only the dose decides.']]); return;
    case 'froschauer': quiz5('wurst'); return;
    case 'grossmuenster': NPC_TALK5.Zwingli(); return;
    case 'zytglogge': NPC_TALK5.Clockmaker(); return;
    case 'camp': quiz5('marignano'); return;
    case 'cauldron': if (!q5('soup')) say([['Zürcher', 'Our army is on this side of the border.'], ['Innerschweizer', 'Ours on that. Nobody wants a war... but everybody is hungry.'], ['C-Real', 'Let us stir! Time it with me, Sarah!']], () => startTiming4('soup', WIN5.soup)); else say([['Sarah', 'Kappel: the milk soup border. Two sides, one pot.']]); return;
  }
}
function l5Interactables(L) {
  for (const n of G5.npcs) L.push({ x: n.x, y: n.y - 6, label: 'Talk', act: () => npcTalk5(n.name) });
  if (G5.bear) L.push({ x: G5.bear.x, y: G5.bear.y - 8, r: 28, label: 'Bear', act: () => {
    if (!q5('firewood')) say([['Bear', '*growl* (The bear holds a log and looks at you expectantly.)'], ['C-Real', 'He wants us to catch the logs he tosses. Ready, Sarah?']], () => startTiming4('firewood', WIN5.firewood)); else say([['Bear', '*content growl*']]);
  } });
}
const ARRIVE5 = ['Where... WHEN are we? A forest, a bear and... that is a monk. The Middle Ages!', 'Mountains, castles and lakes: it looks like Switzerland. Barely!', 'Stone bridges, church bells and a smell of ink and plague. Late Middle Ages!', 'Beards, hats and fancy sleeves: the Renaissance!'];
function l5OnEnter(first) { const e = L5().era; L5().flags.arrived = 1; if (first) setTimeout(() => say([['Sarah', ARRIVE5[e]]], () => crText('Over here! Come and talk to me. ❄️')), 700); }
function l5Respawn() {
  const s = CR_SPOTS[L5().cp] || Object.values(CR_SPOTS)[0]; P.x = s.x; P.y = s.y + 18;
  say([['C-Real', ['Careful! Wolves do not respect time travellers. 🐺', 'Careful! A soldier does not care which century you are from. ⚔️', 'Do not touch the rats. Do not touch ANYTHING. 🐀', 'A bull does not care that you are an architect. 🐂'][L5().era]]]);
}
// ---------------------------------------------------------------- the portal stones
function saveL5Pos() { if (ST.level === 5 && scene === 'world') { L5().pos[L5().era] = { x: P.x, y: P.y }; ST.pos[5] = L5().pos[L5().era]; } }
function enterEra5(e) { saveL5Pos(); L5().era = e; L5().unlocked = Math.max(L5().unlocked, e); ST.pos[5] = L5().pos[e] || null; enterLevel(5); }
function startTimewarp5(e, fromYear, home) {
  saveL5Pos();
  if (home) { startTimewarp4(0, fromYear, true, { go: goHome4 }); return; }
  startTimewarp4(e, fromYear, false, { target: ERAS5[e].from, name: ERAS5[e].name, years: ERAS5[e].years, go: () => enterEra5(e) });
}
function l5PortalFromBaar() {
  menu4('WHICH TIME?', [{ label: t('Through the Ages (Level 4)'), act: () => startTimewarp4(L4().era, 2026) }, { label: t('Helvetia (Level 5)'), act: () => startTimewarp5(L5().era, 2026) }, { label: t('Stay here'), act: () => { } }]);
}
function portalAct5() {
  const e = L5().era, opts = [];
  if (e < 3 && eraDone5(e)) opts.push({ label: t('Onward to: {0} ({1})', t(ERAS5[e + 1].name), t(ERAS5[e + 1].years)), act: () => startTimewarp5(e + 1, ERAS5[e].from) });
  for (let k = 0; k <= L5().unlocked; k++) if (k !== e && !(k === e + 1 && eraDone5(e))) opts.push({ label: t('Travel to: {0} ({1})', t(ERAS5[k].name), t(ERAS5[k].years)), act: () => startTimewarp5(k, ERAS5[e].from) });
  opts.push({ label: t('Home to Baar (AD 2026)'), act: () => startTimewarp5(0, ERAS5[e].from, true) }, { label: t('Stay here'), act: () => { } });
  if (!portalActive5()) say([['C-Real', 'The portal stone is still cold. It wakes up once we understand this era. Still to do:']].concat(missing5(e).map(k => ['C-Real', MAIN_NAMES5[k]])), () => menu4('THE PORTAL STONE', opts));
  else menu4('THE PORTAL STONE', opts);
}
// ================================================================ THE CHRONICLER'S EXAM (in a Basel printing shop)
const EXAM5 = [
  ['Who was the Irish monk whose cell became the Abbey of St. Gallen?', 'Gallus', 'Benedict', 'Charlemagne'],
  ['What does "ora et labora" mean?', 'Pray and work', 'Eat and sleep', 'Read and write'],
  ['In what year was Charlemagne crowned emperor?', '800', '476', '1291'],
  ['What did Carolingian minuscule give us?', 'Lowercase letters and spaces between words', 'The printing press', 'The Gothic arch'],
  ['What is the Plan of St. Gall?', 'A drawing of an ideal monastery from around 820', 'A map of Switzerland', 'A battle plan'],
  ['Which building at Aachen was inspired by San Vitale in Ravenna?', 'The Palatine Chapel', 'The Colosseum', 'Chillon Castle'],
  ['Which three regions signed the Federal Charter of 1291?', 'Uri, Schwyz and Unterwalden', 'Bern, Zürich and Basel', 'Geneva, Vaud and Neuchâtel'],
  ['Is the story of William Tell a legend?', 'Yes, first written down around 1470', 'No, it is a document of 1291', 'No, Tell wrote it himself'],
  ['What happened at Morgarten in 1315?', 'The Confederates ambushed a Habsburg army', 'The Gotthard tunnel opened', 'An earthquake destroyed Basel'],
  ['Why did the Gotthard Pass matter?', 'It was the shortest trade route between Germany and Italy', 'Gold was found there', 'It led to the sea'],
  ['In the legend, what did the Urners send over the Devil\'s Bridge first?', 'A goat', 'A horse', 'A monk'],
  ['Which castle stands on a rock in Lake Geneva?', 'Chillon', 'Habsburg', 'Aachen'],
  ['What is the Codex Manesse?', 'A songbook made in Zürich around 1300', 'A law code', 'A map of the Alps'],
  ['Which invention made books cheap?', 'Gutenberg\'s printing press with movable type', 'The compass', 'The water mill'],
  ['In which city was Gutenberg\'s press?', 'Mainz', 'Rome', 'Zürich'],
  ['What caused the Black Death?', 'A bacterium spread by fleas on rats', 'Bad air', 'A curse'],
  ['What does "quarantine" originally mean?', 'Forty days', 'Forty ships', 'Forty doctors'],
  ['Which disaster destroyed Basel in 1356?', 'An earthquake', 'A flood', 'A dragon'],
  ['Who helped mediate the Stans agreement of 1481?', 'Niklaus von Flüe (Brother Klaus)', 'Charles the Bold', 'Jan Hus'],
  ['Whom did the Confederates beat at Murten in 1476?', 'Charles the Bold of Burgundy', 'Charlemagne', 'Napoleon'],
  ['Which Swiss university is the oldest?', 'Basel (1460)', 'Zürich (1833)', 'Bern (1834)'],
  ['What does "Renaissance" mean?', 'Rebirth', 'Revolution', 'Reformation'],
  ['Who printed Erasmus\' Greek New Testament in Basel in 1516?', 'Johann Froben', 'Johannes Gutenberg', 'Albrecht Dürer'],
  ['What did Paracelsus say about poison?', 'The dose makes the poison', 'All poison is magic', 'Poison needs no dose'],
  ['What started the Reformation in Zürich in 1522?', 'A sausage meal during Lent', 'A flood of the Limmat', 'A royal wedding'],
  ['Who led the Reformation in Zürich?', 'Ulrich Zwingli', 'Martin Luther', 'Jakob Fugger'],
  ['What is the Fuggerei?', 'The oldest social housing complex still in use', 'A fortress', 'A market hall'],
  ['What happened at Marignano in 1515?', 'The Swiss were defeated by French cannons', 'The Swiss beat the Pope', 'Basel was founded'],
  ['Whose guard has been Swiss since 1506?', 'The Pope\'s', 'The Emperor\'s', 'The King of France\'s'],
  ['What did soldiers share at Kappel in 1529, according to tradition?', 'A pot of milk soup', 'A barrel of wine', 'A map'],
  ['Which Bern landmark was built around 1530 with an astronomical clock?', 'The Zytglogge', 'The Kapellbrücke', 'The Devil\'s Bridge'],
  ['Who painted the famous portrait of Erasmus in Basel?', 'Hans Holbein the Younger', 'Albrecht Dürer', 'Leonardo da Vinci'],
  ['When is the Swiss National Day?', '1 August', '1 May', '25 December'],
  ['In which city is the covered wooden Kapellbrücke?', 'Luzern', 'Basel', 'Bern'],
];
let XM5 = null;
function startExam5() {
  say([['Erasmus', 'So you want to be Chronicler of Helvetia? First put the events in the right order. Then answer my questions.'], ['C-Real', 'You need 12 of 16. I believe in you! ❤']], () => transition(() => {
    scene = 'chrono5'; musI = 0;
    const pool = shuffle(CARD_IDS5.filter(k => !CARDS5[k].nt && L5().cards[k])), pick = [], years = new Set();
    for (const k of pool.concat(shuffle(CARD_IDS5.filter(k => !CARDS5[k].nt && !L5().cards[k])))) { if (pick.length >= 9) break; if (!years.has(CARDS5[k].y)) { years.add(CARDS5[k].y); pick.push(k); } }
    XM5 = { part: 1, placed: [pick[0]], queue: pick.slice(1), slot: 0, right: 0, wrong: [], fb: null, qs: shuffle(EXAM5.slice()).slice(0, 8), qi: 0, sel: 0, mode: 'place', t: 0 };
  }));
}
function xmShuffle5() { const q = XM5.qs[XM5.qi]; XM5.opts = shuffle([[q[1], true], [q[2], false], [q[3], false]]); XM5.sel = 0; }
SCENES.chrono5 = {
  music: 'renaiss',
  update(dt) {
    const X = XM5; X.t += dt;
    if (X.part === 1) {
      if (X.mode === 'fb') { if (inp.a) { if (!X.queue.length) { X.part = 2; X.mode = 'q'; xmShuffle5(); } else { X.mode = 'place'; X.slot = 0; } } return; }
      if (inp.left) { X.slot = Math.max(0, X.slot - 1); sfx.blip(); } if (inp.right) { X.slot = Math.min(X.placed.length, X.slot + 1); sfx.blip(); }
      if (inp.a) {
        const k = X.queue.shift(), y = CARDS5[k].y, ok = (X.slot === 0 || CARDS5[X.placed[X.slot - 1]].y <= y) && (X.slot === X.placed.length || y <= CARDS5[X.placed[X.slot]].y);
        let at = X.placed.findIndex(q => CARDS5[q].y > y); if (at < 0) at = X.placed.length; X.placed.splice(at, 0, k);
        if (ok) { X.right++; sfx.ding(); } else { X.wrong.push(k); sfx.bonk(); }
        X.fb = { k, ok }; X.mode = 'fb';
      }
      return;
    }
    if (X.mode === 'q') choiceInput(X, 3, i => { const ok = X.opts[i][1]; if (ok) { X.right++; sfx.ding(); } else sfx.bonk(); X.mode = 'qfb'; X.ok = ok; });
    else if (X.mode === 'qfb' && inp.a) { X.qi++; if (X.qi >= X.qs.length) X.mode = 'result'; else { X.mode = 'q'; xmShuffle5(); } }
    else if (X.mode === 'result' && inp.a) {
      L5().stats.exam = Math.max(L5().stats.exam || 0, X.right);
      if (X.right >= 12) { L5().flags.exam = 1; saveGame(); transition(startEnding5); }
      else backToWorld(() => say([['Erasmus', t('{0}/16. A good start! Read your chronicle (TAB) and come back to talk to me.', X.right)]]));
    }
  },
  draw() {
    R(0, 0, VW, VH, '#3a2a1e'); for (let x = 0; x < VW; x += 24) R(x, 0, 2, VH, '#2a1e14'); R(0, 150, VW, 66, '#5a4030');
    for (const wx of [40, 300]) { R(wx, 20, 40, 60, '#1a1420'); R(wx + 2, 22, 36, 56, '#4a5a8a'); R(wx + 19, 22, 2, 56, '#1a1420'); circ(wx + 20, 22, 18, '#1a1420'); circ(wx + 20, 22, 16, '#4a5a8a'); }
    bigSprite(() => drawPerson(0, 0, LOOKS4.Erasmus), 330, 200, 2); bigSprite(() => drawSarah(0, 0, 'up', 0, 0, false, false), 52, 204, 2);
    R(150, 160, 84, 30, '#7a5a3a'); R(158, 156, 68, 8, '#f4ead0');
  },
  ui() {
    const X = XM5; txt(t('THE CHRONICLER OF HELVETIA'), VW / 2, 4, 11, '#ffe8b0', 'center', true); txt(t('Score: {0}/16', X.right), VW / 2, 18, 7.5, '#fff', 'center', true);
    if (X.part === 1) {
      const n = X.placed.length, cw = Math.min(40, (VW - 20) / (n + 1)), x0 = VW / 2 - (n * cw) / 2;
      R(10, 128, VW - 20, 2, '#d8c8a0');
      X.placed.forEach((k, i) => { const C = CARDS5[k], x = x0 + i * cw, bad = X.wrong.includes(k); rrect(x + 1, 100, cw - 2, 26, 4, bad ? '#ffd0d0' : '#f4ead0', bad ? '#c83a3a' : '#a8946a'); txt(C.i, x + cw / 2, 102, 10, '#fff', 'center', false, false); txt(yearLabel4(C.y, C.a), x + cw / 2, 132 + (i % 2) * 8, 5.5, '#ffe8b0', 'center', false, false); });
      if (X.mode === 'place') {
        const ax = x0 + X.slot * cw; txt('▼', ax, 88, 10, '#ff6fa8', 'center', true); R(ax - 1, 98, 2, 30, '#ff6fa8');
        const k = X.queue[0], C = CARDS5[k]; rrect(70, 34, VW - 140, 46, 7, 'rgba(18,16,28,.92)', '#ffd34d'); txt(C.i + '  ' + t(C.title), VW / 2, 40, 9, '#ffd34d', 'center', true, false);
        txt(t('Where does this event belong? ◀ ▶ choose a gap · [A] place it'), VW / 2, 56, 7, '#fff', 'center', false, false); txt(t('Card {0}/8', 9 - X.queue.length), VW / 2, 67, 6.5, '#c8b890', 'center', false, false);
      } else if (X.mode === 'fb') {
        const C = CARDS5[X.fb.k]; rrect(60, 34, VW - 120, 46, 7, X.fb.ok ? 'rgba(20,80,40,.95)' : 'rgba(110,20,20,.95)', X.fb.ok ? '#7ee081' : '#ff8a8a');
        txt((X.fb.ok ? '✓ ' : '✗ ') + t(C.title) + ': ' + yearLabel4(C.y, C.a), VW / 2, 42, 8, '#fff', 'center', true, false); txt(t(X.fb.ok ? 'Right place!' : 'Not quite: it goes here.'), VW / 2, 56, 7.5, '#fff', 'center', false, false); txt(t('[A]: continue'), VW / 2, 68, 7, '#ffd34d', 'center', true, false);
      }
      return;
    }
    if (X.mode !== 'result') {
      const q = X.qs[X.qi]; rrect(20, 36, VW - 40, 20, 6, 'rgba(18,16,28,.9)', '#ffd34d'); txt(t(q[0]), VW / 2, 42, 7.5, '#fff', 'center', true, false); txt(t('Question {0}/8', X.qi + 1), VW / 2, 28, 7, '#c8b890', 'center', false, false);
      X.opts.forEach((o, i) => { const y = 62 + i * 18, sel = i === X.sel, fb = X.mode === 'qfb'; rrect(30, y, VW - 60, 15, 6, fb ? (o[1] ? '#7ee081' : sel ? '#ff8a8a' : 'rgba(255,255,255,.8)') : sel ? '#ff6fa8' : 'rgba(255,255,255,.9)'); txt((sel && !fb ? '▶ ' : '') + t(o[0]), 38, y + 4, 7.5, sel && !fb ? '#fff' : '#222', 'left', true, false); });
      if (X.mode === 'qfb') txt(X.ok ? t('Correct! ✓') : t('Correct answer: {0}', t(q[1])), VW / 2, 122, 8, X.ok ? '#9fe0a0' : '#ff9a9a', 'center', true);
    } else { panelUI(46, 84); txt(t('{0}/16', X.right), VW / 2, 56, 16, X.right >= 12 ? '#7ee081' : '#ff8a8a', 'center', true, false); txt(X.right >= 12 ? t('Chronicler of Helvetia! 🎉') : t('Not quite: 12 needed.'), VW / 2, 82, 10, '#fff', 'center', true, false); txt(t('[A]: continue'), VW / 2, 108, 8, '#ffd34d', 'center', true, false); }
  },
};
// ---------------------------------------------------------------- the ending
let EN5 = null;
const finalMsg5 = () => FINAL_MESSAGE_5[LANG] || FINAL_MESSAGE_5.en;
function startEnding5() { scene = 'ending5'; musI = 0; L5().flags.finished = 1; saveGame(); EN5 = { t: 0, shown: 0, phase: 0, conf: [] }; for (let i = 0; i < 90; i++) EN5.conf.push({ x: rnd() * VW, y: -rnd() * VH, vy: 18 + rnd() * 36, c: ['#ffd34d', '#c82a2a', '#ffffff', '#ff6fa8', '#7ee081'][(rnd() * 5) | 0], r: rnd() * 6 }); }
SCENES.ending5 = {
  music: 'ending',
  update(dt) {
    EN5.t += dt; for (const c of EN5.conf) { c.y += c.vy * dt; if (c.y > VH) { c.y = -5; c.x = rnd() * VW; } }
    const msg = finalMsg5(); if (EN5.t > 1.5) EN5.shown = Math.min(msg.length, EN5.shown + dt * 30);
    if (inp.a) { if (EN5.phase === 1 && EN5.shown < msg.length) EN5.shown = msg.length; else if (EN5.phase < 2) { EN5.phase++; sfx.ding(); } else transition(goHome4); }
  },
  draw() {
    R(0, 0, VW, VH, '#3a1e2a'); for (let i = 0; i < 60; i++) R(hash(i, 1) % VW, hash(i, 2) % VH, 1, 1, i % 3 ? '#aa7a8a' : '#ffffff');
    if (EN5.phase === 0) {
      R(54, 30, 276, 160, '#f4ead0'); R(54, 30, 276, 20, '#8a2a3a'); R(62, 36, 8, 8, '#f4f0e8'); R(64, 34, 4, 12, '#f4f0e8');
      bigSprite(() => drawSarah(0, 0, 'down', 0, 0, false, false), 96, 120, 2);
      SKETCHES5.forEach((s, i) => { const sx = 150 + i * 34, have = L5().sk[s[0]]; R(sx - 13, 128, 26, 26, have ? '#fff7d6' : '#d8d0c0'); R(sx - 13, 128, 26, 1, '#c9b98a'); });
    }
  },
  ui() {
    for (const c of EN5.conf) { ctx.fillStyle = c.c; ctx.save(); ctx.translate(c.x, c.y); ctx.rotate(EN5.t * 3 + c.r); ctx.fillRect(-2, -1, 4, 2); ctx.restore(); }
    if (EN5.phase === 0) {
      txt(t('CHRONICLE OF HELVETIA'), 192, 34, 10, '#ffffff', 'center', true, false);
      txt('Sarah', 150, 62, 12, '#3a2a4a', 'left', true, false); txt(t('Time traveller, architect, Chronicler of Helvetia'), 150, 78, 7.5, '#4a3a5a', 'left', false, false);
      txt(t('{0}/{1} chronicle cards · exam {2}/16', cardCount5(), CARD_IDS5.length, L5().stats.exam || 0), 150, 90, 7, '#6a5a7a', 'left', false, false);
      SKETCHES5.forEach((s, i) => txt(SKETCH_ICON5[s[0]], 150 + i * 34, 134, 13, '#fff', 'center', false, false));
      txt(t('[A]: continue'), VW / 2, 196, 8, '#ffd34d', 'center', true);
    } else if (EN5.phase === 1) {
      rrect(30, 34, VW - 60, 140, 8, 'rgba(18,16,28,.9)', '#ffb0b0'); txt('C-Real', 44, 40, 9, '#ffd34d', 'left', true, false);
      const lines = wrap(finalMsg5(), VW - 90, 8.5); let left = Math.floor(EN5.shown);
      lines.slice(0, 11).forEach((ln, i) => { if (left <= 0) return; txt(ln.slice(0, left), 44, 53 + i * 10.5, 8.5, '#fff'); left -= ln.length + 1; });
    } else {
      const S = L5().stats; rrect(60, 26, VW - 120, 160, 8, 'rgba(18,16,28,.92)', '#ffb0b0');
      txt('SARCHITECT 5: HELVETIA', VW / 2, 32, 11, '#fff', 'center', true, false);
      [t('Eras visited: {0}/4', L5().unlocked + 1), t('Chronicle cards: {0}/{1}', cardCount5(), CARD_IDS5.length), t('Monuments sketched: {0}/5', SKETCHES5.filter(s => L5().sk[s[0]]).length), t('Runs survived: {0}', S.runs || 0), t('Exam: {0}/16', S.exam || 0), t('Mistakes made on the way: {0}', S.mistakes || 0)].forEach((r, i) => txt(r, VW / 2, 52 + i * 11, 8, '#eee', 'center', false, false));
      wrap(t('History is full of stories and legends. The dates here follow today\'s scholarly consensus; many are approximate.'), VW - 150, 7).forEach((ln, i) => txt(ln, VW / 2, 124 + i * 9, 7, '#ffc8c8', 'center', false, false));
      txt(t('[A]: home to Baar'), VW / 2, 168, 7.5, '#ffd34d', 'center', true, false);
    }
  },
};
// ---------------------------------------------------------------- the chronicle (book)
function l5Pages() { const p = ['overview']; for (let e = 0; e < 4; e++) { for (const k of CARD_IDS5) if (CARDS5[k].e === e) p.push(k); for (const s of SKETCHES5) if (s[1] === e) p.push('sk:' + s[0]); } return p; }
const pageEra5 = id => id === 'overview' ? -1 : id.startsWith('sk:') ? SKETCHES5.find(s => s[0] === id.slice(3))[1] : CARDS5[id].e;
function l5BookInput() {
  const P5 = l5Pages(), n = P5.length;
  if (inp.left) { book.sel = (book.sel + n - 1) % n; sfx.blip(); } if (inp.right) { book.sel = (book.sel + 1) % n; sfx.blip(); }
  if (inp.up || inp.down) { const cur = pageEra5(P5[book.sel]), to = clamp(cur + (inp.down ? 1 : -1), -1, 3); book.sel = to < 0 ? 0 : P5.findIndex(k => pageEra5(k) === to); sfx.blip(); }
}
function l5DrawBook() {
  const pages = l5Pages(); book.sel = Math.min(book.sel, pages.length - 1);
  ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(0, 0, VW, VH);
  const bx = 30, by = 12, bw = VW - 60, bh = VH - 24, id = pages[book.sel], e = pageEra5(id);
  rrect(bx - 4, by - 4, bw + 8, bh + 8, 8, '#8a2a3a'); rrect(bx, by, bw, bh, 5, '#f8f2e4');
  txt(t('Chronicle of Helvetia — page {0}/{1}', book.sel + 1, pages.length) + (e >= 0 ? '   ·   ' + t(ERAS5[e].name) : ''), bx + 10, by + 6, 7, '#8a2a3a', 'left', true, false);
  if (id === 'overview') {
    txt(t('A thousand years in four eras'), bx + 12, by + 22, 11, '#3a2a4a', 'left', true, false);
    ERAS5.forEach((E, i) => {
      const y = by + 42 + i * 26, open = i <= L5().unlocked, done = eraDone5(i), n = CARD_IDS5.filter(k => CARDS5[k].e === i).length, got = CARD_IDS5.filter(k => CARDS5[k].e === i && L5().cards[k]).length, sk = SKETCHES5.filter(s => s[1] === i), skd = sk.filter(s => L5().sk[s[0]]).length;
      rrect(bx + 12, y, bw - 24, 22, 5, open ? '#f8e4e4' : '#e4e0d8'); txt((done ? '✓ ' : open ? '⏳ ' : '🔒 ') + (open ? t(E.name) : '???'), bx + 20, y + 3, 8, '#3a2a4a', 'left', true, false);
      txt(t(E.years), bx + 20, y + 13, 6, '#6a5a7a', 'left', false, false); txt(`📜 ${got}/${n}   ✏️ ${skd}/${sk.length}`, bx + bw - 20, y + 7, 7.5, '#3a2a4a', 'right', true, false);
    });
  } else if (id.startsWith('sk:')) {
    const s = SKETCHES5.find(q => q[0] === id.slice(3)), have = L5().sk[s[0]];
    rrect(bx + 12, by + 22, 90, 90, 6, have ? '#fff7d6' : '#e4e0d8'); txt(have ? SKETCH_ICON5[s[0]] : '✏️', bx + 57, by + 50, 30, '#fff', 'center', false, false);
    txt(t('Sketchbook'), bx + 112, by + 22, 7, '#9a7a3a', 'left', true, false); txt(have ? t(s[2]) : '???', bx + 112, by + 32, 11, '#3a2a1a', 'left', true, false);
    wrap(have ? t(s[3]) : t('Not sketched yet. Find this monument in {0}!', t(ERAS5[e].name)), bw - 126, 7.5).forEach((ln, i) => txt(ln, bx + 112, by + 52 + i * 10, 7.5, '#2a2a2a', 'left', false, false));
  } else {
    const C = CARDS5[id], have = L5().cards[id];
    rrect(bx + 12, by + 22, 70, 70, 8, have ? '#8a2a3a' : '#d8d4cc'); if (have) { rrect(bx + 20, by + 30, 54, 54, 27, 'rgba(255,255,255,.9)'); txt(C.i, bx + 47, by + 43, 24, '#fff', 'center', false, false); } else txt('?', bx + 47, by + 42, 26, '#fff', 'center', true, false);
    txt(have ? yearLabel4(C.y, C.a) : '???', bx + 47, by + 98, 8, '#8a2a3a', 'center', true, false);
    txt(have ? t(C.title) : '???', bx + 92, by + 22, 11, '#3a2a4a', 'left', true, false);
    wrap(have ? t(C.text) : t('Keep exploring {0} to find this card.', t(ERAS5[C.e].name)), bw - 106, 7.5).forEach((ln, i) => txt(ln, bx + 92, by + 40 + i * 10, 7.5, '#2a2a2a', 'left', false, false));
    if (have && C.nt) txt(t('(a legend or story, not on the exam timeline)'), bx + 92, by + bh - 44, 6.5, '#8a7a9a', 'left', false, false);
  }
  txt(t('◀ ▶ flip pages   ·   ▲ ▼ jump between eras   ·   [A] / Tab: close'), VW / 2, by + bh - 14, 6.5, '#8a2a3a', 'center', false, false);
}

// ================================================================ Level 5 definition
const LEVEL5 = {
  W: E5_0.W, H: E5_0.H,
  prepare() {
    const E = ERA5OF();
    Object.assign(LEVEL5, { W: E.W, H: E.H, seed: E.seed, buildings: E.buildings, paths: E.paths, crSpots: E.crSpots, start: E.start, signs: E.signs, zoneOf: E.zoneOf, baseTile: E.baseTile, terrain: E.terrain,
      zoneNames: E.zoneNames, zoneTexts: E.zoneTexts, crTexts: E.crTexts, music: E.music, snowyPine: E.snowyPine || (() => false) });
    for (const k in E.crSpots) E.crSpots[k].pose = E.pose;
  },
  pathTile: (tx, ty, p) => p.cob ? T.COB : T.PATH,
  clearSpots: () => { const e = L5().era, s = NPCS5[e].map(([, a, b]) => [a, b]); if (e === 0) s.push([13, 31]); return s; },
  spawn: l5Spawn, update: l5Update, onB: () => popText(P.x, P.y - 26, 'No bikes before the 19th century!', '#cfe'),
  interactables: l5Interactables, drawGround: () => { }, drawables: l5Drawables, drawBuilding: l5DrawBuilding, overlay: l5Overlay,
  talk: l5Talk, buildingAct: l5BuildingAct, respawn: l5Respawn, worldLabels: l5WorldLabels, onEnter: l5OnEnter,
  hud: () => `⏳ ${t(ERA5OF().name)}   📜 ${cardCount5()}/${CARD_IDS5.length}   ✏️ ${SKETCHES5.filter(s => L5().sk[s[0]]).length}/5`,
  bookInput: l5BookInput, drawBook: l5DrawBook, music: 'abbey',
  pauseLines: ['Move: Arrow keys / WASD / stick', '[A]: talk · act · rope skip', 'Book (Tab, Q): your chronicle of Helvetia', 'M: mute · Esc / P: pause', '', 'Solve each era\'s quests to wake the portal stone.', 'C-Real plays a different historical figure in every era.', 'Watch out: wolves, soldiers, rats... and bulls.'],
  zoneNames: {}, zoneTexts: {}, crTexts: [],
  debug() { ST.l3.flags.finished = 1; ST.l2.flags.finished = 1; ST.flags.finished = true; ST.l4.flags.finished = 1; ST.l4.flags.exam = 1; ST.l5.flags.arrived = 1; },
};
LEVELS[5] = LEVEL5;
// ================================================================ translations [English, Deutsch, Schwiizerdütsch]
addTR([
  // chronicle cards
  ["The Rule of St. Benedict", "Die Regel des heiligen Benedikt", "D Regle vom heilige Benedikt"], ["Monks lived by one rule: \"ora et labora\", pray and work. Hundreds of monasteries copied it, and they became the farms, schools and libraries of the early Middle Ages.", "Mönche lebten nach einer Regel: \"ora et labora\", bete und arbeite. Hunderte Klöster übernahmen sie und wurden zu den Bauernhöfen, Schulen und Bibliotheken des frühen Mittelalters.", "Mönch händ nach eire Regle gläbt: \"ora et labora\", bätte und schaffe. Hunderti Chlöschter händ si übernoh und sind zu de Buurehöf, Schuele und Bibliotheke vom früeche Mittelalter worde."],
  ["The Alemanni", "Die Alemannen", "D Alemanne"], ["After Rome's western empire fell, the Alemanni settled the Swiss plateau. That is why German-speaking Switzerland speaks a dialect that grew out of Alemannic.", "Nach dem Fall des Weströmischen Reiches besiedelten die Alemannen das Mittelland. Darum spricht die Deutschschweiz einen Dialekt, der aus dem Alemannischen entstand.", "Nach em Fall vom Weschtrömische Riich händ d Alemanne s Mittelland bsiedlet. Dorum redt d Dütschschwiiz en Dialäkt, wo us em Alemannische entstande isch."],
  ["Gallus and the bear", "Gallus und der Bär", "De Gallus und de Bär"], ["The Irish monk Gallus built a hermit's cell by the Steinach river. Legend says a bear brought him firewood. The Abbey of St. Gallen grew from his cell.", "Der irische Mönch Gallus baute sich an der Steinach eine Einsiedlerzelle. Der Legende nach brachte ihm ein Bär Feuerholz. Aus seiner Zelle wuchs das Kloster St. Gallen.", "De irisch Mönch Gallus het sich a de Steinach e Iisiedlerzälle baut. D Legände seit, en Bär heig em Füürholz bracht. Us sinere Zälle isch s Chloschter St. Galle gwachse."],
  ["The Abbey of St. Gallen", "Das Kloster St. Gallen", "S Chloschter St. Galle"], ["In 719 Othmar founded the monastery by Gallus' cell. Over the centuries it became one of the greatest centres of learning in Europe, with a library that still exists.", "719 gründete Othmar das Kloster bei der Zelle des Gallus. Im Lauf der Jahrhunderte wurde es zu einem der grössten Bildungszentren Europas, mit einer Bibliothek, die es noch heute gibt.", "719 het de Othmar s Chloschter bi de Zälle vom Gallus gründet. Im Lauf vo de Jahrhundert isch es zu eim vo de gröschte Bildigszentre vo Europa worde, mit ere Bibliothek, wo s hüt no git."],
  ["Reichenau Island", "Die Insel Reichenau", "D Insle Reichenau"], ["Pirmin founded the monastery on the island in Lake Constance in 724. Its scribes and painters were famous across Europe. UNESCO World Heritage since 2000.", "Pirmin gründete 724 das Kloster auf der Insel im Bodensee. Seine Schreiber und Maler waren in ganz Europa berühmt. Seit 2000 UNESCO-Welterbe.", "De Pirmin het 724 s Chloschter uf de Insle im Bodesee gründet. Sini Schriiber und Maler sind i ganz Europa berüehmt gsi. Sit 2000 UNESCO-Wälterbe."],
  ["The frescoes of Müstair", "Die Fresken von Müstair", "D Fresche vo Müstair"], ["The convent of St. John in the Graubünden Alps keeps the largest cycle of Carolingian wall paintings still standing. It is a UNESCO World Heritage Site (1983).", "Das Kloster St. Johann in den Bündner Alpen bewahrt den grössten erhaltenen Zyklus karolingischer Wandmalereien. Es ist UNESCO-Welterbe (1983).", "S Chloschter St. Johann i de Bündner Alpe het de gröscht erhaltni Zyklus vo karolingische Wandmalereie. Es isch UNESCO-Wälterbe (1983)."],
  ["Charlemagne is crowned", "Karl der Grosse wird gekrönt", "De Karl de Gross wird gchrönt"], ["On Christmas Day 800 Pope Leo III crowned the Frankish king Charlemagne emperor in Rome. His empire stretched from the Pyrenees to the Elbe, including today's Switzerland.", "Am Weihnachtstag 800 krönte Papst Leo III. den Frankenkönig Karl den Grossen in Rom zum Kaiser. Sein Reich reichte von den Pyrenäen bis zur Elbe, mit der heutigen Schweiz.", "Am Wiehnachtstag 800 het de Papscht Leo III. de Franke-König Karl de Gross z Rom zum Kaiser gchrönt. Sis Riich isch vo de Pyrenäe bis zur Elbe greicht, mit de hüttige Schwiiz."],
  ["Carolingian minuscule", "Die karolingische Minuskel", "D karolingisch Minuskel"], ["Charlemagne's scholars, led by Alcuin, introduced a clear, rounded script with lowercase letters and spaces between the words. It is the ancestor of the small letters you are reading now.", "Karls Gelehrte unter Alkuin führten eine klare, runde Schrift mit Kleinbuchstaben und Abständen zwischen den Wörtern ein. Sie ist die Vorfahrin der Kleinbuchstaben, die du jetzt liest.", "Em Karl sini Gleerte under em Alkuin händ e klari, runde Schrift mit Chliibuechstabe und Abständ zwüsche de Wörter iigfüehrt. Si isch d Vorfahrin vo de Chliibuechstabe, wo du jetzt lisch."],
  ["The Palatine Chapel at Aachen", "Die Pfalzkapelle in Aachen", "D Pfalzkapälle z Aache"], ["Built around 800 as Charlemagne's court chapel: an octagon crowned by a dome, inspired by San Vitale in Ravenna. Charlemagne's throne still stands in the upper gallery.", "Um 800 als Hofkapelle Karls des Grossen gebaut: ein Achteck mit Kuppel, inspiriert von San Vitale in Ravenna. Karls Thron steht noch heute auf der Empore.", "Um 800 als Hofchapälle vom Karl em Gross baut: es Achtegg mit Chupple, inspiriert vo San Vitale z Ravenna. Em Karl sin Thron staht hüt no uf de Empore."],
  ["The Plan of St. Gall", "Der St. Galler Klosterplan", "De St. Galler Chlosterplan"], ["Drawn around 820 on five pieces of parchment: an ideal monastery with a church, library, hospital, gardens and even a brewery. It is the only surviving architectural drawing from the early Middle Ages.", "Um 820 auf fünf Pergamentstücken gezeichnet: ein ideales Kloster mit Kirche, Bibliothek, Spital, Gärten und sogar einer Brauerei. Es ist die einzige erhaltene Architekturzeichnung aus dem frühen Mittelalter.", "Um 820 uf föif Pergamäntstück zeichnet: es ideals Chloschter mit Chile, Bibliothek, Spital, Gärte und sogar ere Bruerei. Es isch di einzig erhaltni Architekturzeichnig us em früeche Mittelalter."],
  ["Habsburg Castle", "Die Habsburg", "D Habsburg"], ["Built around 1020 in what is now Aargau. The counts of Habsburg later became dukes of Austria (1282) and one of Europe's most powerful families.", "Um 1020 im heutigen Aargau gebaut. Die Grafen von Habsburg wurden später Herzöge von Österreich (1282) und eine der mächtigsten Familien Europas.", "Um 1020 im hüttige Aargau baut. D Grafe vo Habsburg sind spöter Herzög vo Öschtriich (1282) und eini vo de mächtigschte Familie vo Europa worde."],
  ["Letters of freedom", "Die Freiheitsbriefe", "D Friiheitsbrief"], ["Uri (1231) and Schwyz (1240) received letters from the emperor: they answered directly to him, not to local lords. This self-rule shaped the Confederation.", "Uri (1231) und Schwyz (1240) erhielten Briefe vom Kaiser: Sie unterstanden direkt ihm, nicht örtlichen Herren. Diese Selbstverwaltung prägte die Eidgenossenschaft.", "Uri (1231) und Schwyz (1240) händ Brief vom Kaiser überchoo: Si sind diräkt ihm underschtande gsi, nöd de einheimische Herre. Die Selbschtverwaltig het d Eidgnosseschaft prägt."],
  ["The Gotthard Pass", "Der Gotthardpass", "De Gotthardpass"], ["Once the Schöllenen gorge could be crossed, the Gotthard became the shortest trade route between Germany and Italy. Uri earned money from tolls and porters.", "Seit die Schöllenenschlucht überwunden werden konnte, war der Gotthard der kürzeste Handelsweg zwischen Deutschland und Italien. Uri verdiente an Zöllen und Säumern.", "Sit d Schöllenenschlucht het chönne überwunde wärde, isch de Gotthard de chürzescht Handelswäg zwüsche Dütschland und Italie gsi. Uri het a Zöll und Säumer verdient."],
  ["The Devil's Bridge", "Die Teufelsbrücke", "D Tüfelsbrugg"], ["Legend: the devil built the bridge across the gorge for the first soul to cross it. The clever Urners sent over a goat. The bridge you can see today is much newer than the legend.", "Legende: Der Teufel baute die Brücke über die Schlucht für die erste Seele, die sie überquert. Die klugen Urner schickten eine Geiss hinüber. Die heutige Brücke ist viel jünger als die Legende.", "Legände: De Tüfel het d Brugg über d Schlucht baut für di erscht Seel, wo drüber gaht. Di gschiide Urner händ e Geiss übere gschickt. D hüttig Brugg isch vill jünger als d Legände."],
  ["Lausanne Cathedral", "Die Kathedrale von Lausanne", "D Kathedrale vo Lausanne"], ["Consecrated in 1275 in the presence of Pope Gregory X and Rudolf of Habsburg. One of the finest early Gothic cathedrals in Europe, with a famous rose window.", "1275 im Beisein von Papst Gregor X. und Rudolf von Habsburg geweiht. Eine der schönsten frühgotischen Kathedralen Europas, mit einem berühmten Rosenfenster.", "1275 im Bisii vom Papscht Gregor X. und em Rudolf vo Habsburg gweihet. Eini vo de schönschte frühgotische Kathedrale vo Europa, mit emne berüehmte Rosefänschter."],
  ["Château de Chillon", "Schloss Chillon", "Schloss Chillon"], ["On a rocky island in Lake Geneva, the Counts of Savoy expanded the castle in the 13th century. It guarded the road through the Rhône valley and collected tolls.", "Auf einer Felsinsel im Genfersee bauten die Grafen von Savoyen die Burg im 13. Jahrhundert aus. Sie bewachte die Strasse durchs Rhonetal und erhob Zölle.", "Uf ere Felsinsle im Gfersee händ d Grafe vo Savoye d Burg im 13. Jahrhundert usbaut. Si het d Strass dur s Rhonetal bewacht und Zöll ghole."],
  ["The Federal Charter", "Der Bundesbrief", "De Bundesbrief"], ["In early August 1291 Uri, Schwyz and Unterwalden promised each other mutual help. The Latin parchment is kept in Schwyz. 1 August became the Swiss National Day.", "Anfang August 1291 versprachen sich Uri, Schwyz und Unterwalden gegenseitige Hilfe. Das lateinische Pergament wird in Schwyz aufbewahrt. Der 1. August wurde zum Schweizer Nationalfeiertag.", "Aafang Auguscht 1291 händ sich Uri, Schwyz und Unterwalde gägesiitigi Hilf versproche. S latiinisch Pergamänt wird z Schwyz ufbewahrt. De 1. Auguscht isch zum Schwiizer Nationalfiirtag worde."],
  ["William Tell", "Wilhelm Tell", "De Wilhelm Täll"], ["The tale of Tell, the hat on the pole and the apple shot was first written down around 1470 in the White Book of Sarnen. It is a legend, not a historical record.", "Die Geschichte von Tell, dem Hut auf der Stange und dem Apfelschuss wurde um 1470 erstmals im Weissen Buch von Sarnen aufgeschrieben. Sie ist eine Legende, kein Geschichtsbericht.", "D Gschicht vom Täll, em Huet uf de Stange und em Öpfelschuss isch um 1470 zerscht im Wiisse Buech vo Sarne ufgschribe worde. Si isch e Legände, kei Gschichtsbricht."],
  ["The Battle of Morgarten", "Die Schlacht am Morgarten", "D Schlacht am Morgarte"], ["On 15 November 1315 the Confederates ambushed Duke Leopold's Habsburg army in the narrow pass at Morgarten near the Ägerisee, with rocks and logs, so tradition says.", "Am 15. November 1315 überfielen die Eidgenossen das Heer Herzog Leopolds von Habsburg im engen Pass am Morgarten beim Ägerisee, der Überlieferung nach mit Steinen und Baumstämmen.", "Am 15. November 1315 händ d Eidgnosse s Heer vom Herzog Leopold vo Habsburg im ängschte Pass am Morgarte bim Ägerisee überfalle, nach de Überlieferig mit Stei und Boumstämm."],
  ["The Codex Manesse", "Die Manessische Liederhandschrift", "D Manessisch Liederhandschrift"], ["A songbook made in Zürich around 1300 with songs by about 140 poets, most with a full-page painting. Johannes Hadlaub, who sang of courtly love, is one of them.", "Ein Liederbuch aus Zürich um 1300 mit Liedern von etwa 140 Dichtern, die meisten mit einem ganzseitigen Bild. Johannes Hadlaub, der von der höfischen Liebe sang, ist einer davon.", "Es Liederbuech us Züri um 1300 mit Lieder vo öppe 140 Dichter, di meischte mit emne ganzsiitige Bild. De Johannes Hadlaub, wo vo de höfische Liebi gsunge het, isch eine devo."],
  ["The Kapellbrücke", "Die Kapellbrücke", "D Chapällbrugg"], ["The covered wooden bridge in Lucerne was built around 1333 as part of the city's defences. Its roof triangles were painted in the 17th century. Burnt in 1993 and rebuilt.", "Die gedeckte Holzbrücke in Luzern wurde um 1333 als Teil der Stadtbefestigung gebaut. Die Dreiecksbilder im Dach wurden im 17. Jahrhundert gemalt. 1993 brannte sie ab und wurde wieder aufgebaut.", "D gedeckt Holzbrugg z Luzärn isch um 1333 als Teil vo de Stadtbefestigig baut worde. D Dreiecksbilder im Dach sind im 17. Jahrhundert gmalt worde. 1993 isch si abbrännt und wieder ufbaut worde."],
  ["Zürich's guilds take power", "Zürichs Zünfte übernehmen die Macht", "Zürichs Zünft übernämed d Macht"], ["In 1336 Rudolf Brun and the craft guilds took power from the old noble families. Zürich's constitution with guilds lasted for centuries.", "1336 nahmen Rudolf Brun und die Handwerkerzünfte den alten Adelsfamilien die Macht ab. Zürichs Zunftverfassung hielt Jahrhunderte.", "1336 händ de Rudolf Brun und d Handwärkerzünft de alte Adelsfamilie d Macht abgnoh. Zürichs Zunftverfassig het Jahrhundert ghebt."],
  ["The Black Death", "Der Schwarze Tod", "De Schwarz Tod"], ["The plague reached Europe in 1347 and killed about a third of its people. Frightened people blamed others: Jewish communities in many cities, including Basel and Zürich, were attacked. In reality fleas on rats carried the bacterium.", "Die Pest erreichte Europa 1347 und tötete etwa ein Drittel der Menschen. Verängstigte Menschen machten andere verantwortlich: In vielen Städten, auch in Basel und Zürich, wurden jüdische Gemeinden angegriffen. In Wahrheit übertrugen Flöhe auf Ratten das Bakterium.", "D Pescht het Europa 1347 erreicht und öppe es Drittel vo de Mänsche tödet. Verängschtigti Mänsche händ anderi verantwortlich gmacht: I vilne Städt, au z Basel und Züri, sind jüdischi Gmeinde aagriffe worde. I Würklichkeit händ Flöh uf Ratte s Bakterium überträge."],
  ["The Basel earthquake", "Das Basler Erdbeben", "S Basler Ärdbebe"], ["On St. Luke's Day 1356 the strongest earthquake recorded in Central Europe destroyed Basel and many castles nearby. Fires followed. The city was rebuilt.", "Am Lukastag 1356 zerstörte das stärkste je in Mitteleuropa verzeichnete Erdbeben Basel und viele Burgen in der Umgebung. Brände folgten. Die Stadt wurde wieder aufgebaut.", "Am Lukastag 1356 het s stärchscht je i Mitteleuropa verzeichnet Ärdbebe Basel und vill Burge i de Umgäbig zerstört. Brönd sind gfolgt. D Stadt isch wieder ufbaut worde."],
  ["The Battle of Sempach", "Die Schlacht bei Sempach", "D Schlacht bi Sempach"], ["In 1386 the Confederates defeated Duke Leopold III of Habsburg near Sempach. Later legends tell of Arnold Winkelried, who gathered enemy spears in his arms.", "1386 besiegten die Eidgenossen Herzog Leopold III. von Habsburg bei Sempach. Spätere Legenden erzählen von Arnold Winkelried, der feindliche Speere in seinen Armen sammelte.", "1386 händ d Eidgnosse de Herzog Leopold III. vo Habsburg bi Sempach bsiegt. Spöteri Legände verzelled vom Arnold Winkelried, wo gegnerischi Spiess i sine Ärme gsammlet het."],
  ["Winkelried's sacrifice", "Winkelrieds Opfer", "S Opfer vom Winkelried"], ["Legend: at Sempach, Arnold Winkelried gathered several enemy spears in his arms so that his comrades could break through. The story appears only 150 years after the battle.", "Legende: Bei Sempach sammelte Arnold Winkelried mehrere feindliche Speere in seinen Armen, damit seine Kameraden durchbrechen konnten. Die Geschichte taucht erst 150 Jahre nach der Schlacht auf.", "Legände: Bi Sempach het de Arnold Winkelried mehreri gegnerischi Spiess i sine Ärme gsammlet, dass sini Kamerade hend chönne durebräche. D Gschicht taucht erscht 150 Jahr nach de Schlacht uf."],
  ["The Council of Constance", "Das Konzil von Konstanz", "S Konzil vo Konschtanz"], ["From 1414 to 1418 church leaders gathered at Constance to end a split with three rival popes. The reformer Jan Hus was burned there in 1415.", "Von 1414 bis 1418 trafen sich Kirchenführer in Konstanz, um die Spaltung mit drei rivalisierenden Päpsten zu beenden. Der Reformer Jan Hus wurde dort 1415 verbrannt.", "Vo 1414 bis 1418 händ sich Chirchefüehrer z Konschtanz träffe, zum d Spaltig mit drü rivalisierende Päpscht z beände. De Reformer Jan Hus isch det 1415 verbrännt worde."],
  ["The University of Basel", "Die Universität Basel", "D Universität Basel"], ["Founded in 1460, it is Switzerland's oldest university. Humanists, printers and doctors made Basel a centre of learning.", "1460 gegründet, ist sie die älteste Universität der Schweiz. Humanisten, Drucker und Ärzte machten Basel zu einem Zentrum der Gelehrsamkeit.", "1460 gründet, isch si di eltischt Universität vo de Schwiiz. Humaniste, Drucker und Ärzt händ Basel zu eme Zentrum vo de Gleerte gmacht."],
  ["Gutenberg's printing press", "Gutenbergs Druckerpresse", "S Gutenberg sini Druckerpresse"], ["In Mainz, around 1450, Johannes Gutenberg combined movable metal type, oil-based ink and a press: the first mass-produced books. His 42-line Bible appeared around 1455.", "In Mainz verband Johannes Gutenberg um 1450 bewegliche Metalllettern, Ölfarbe und eine Presse: die ersten massenhaft hergestellten Bücher. Seine 42-zeilige Bibel erschien um 1455.", "Z Mainz het de Johannes Gutenberg um 1450 bewegligi Metallbuechstabe, Ölfarb und e Presse verbunde: di erschte massehaft härgstellte Büecher. Sini 42-zeilig Bible isch um 1455 erschine."],
  ["The Battle of Murten", "Die Schlacht bei Murten", "D Schlacht bi Murte"], ["In 1476 the Confederates beat Charles the Bold of Burgundy at Grandson and Murten. Legend tells of a messenger who ran to Fribourg with the news; since 1933 a 17 km race recalls it.", "1476 besiegten die Eidgenossen Karl den Kühnen von Burgund bei Grandson und Murten. Die Legende erzählt von einem Boten, der die Nachricht nach Freiburg trug; seit 1933 erinnert ein 17-km-Lauf daran.", "1476 händ d Eidgnosse de Karl de Chüen vo Burgund bi Grandson und Murte bsiegt. D Legände verzellt vomene Bote, wo d Nachricht uf Fribourg treit het; sit 1933 erinneret en 17-km-Lauf draa."],
  ["The Stans agreement", "Das Stanser Verkommnis", "S Stanser Verchomnis"], ["In 1481 the Confederates were close to civil war between cities and rural cantons. The hermit Niklaus von Flüe (Brother Klaus) helped mediate, and Fribourg and Solothurn joined.", "1481 standen die Eidgenossen kurz vor einem Bürgerkrieg zwischen Städten und Landorten. Der Einsiedler Niklaus von Flüe (Bruder Klaus) half zu vermitteln, und Freiburg und Solothurn traten bei.", "1481 sind d Eidgnosse churz vor emene Bürgerchrieg zwüsche Städt und Landort gschtande. De Iisiedler Niklaus von Flüe (Bruder Klaus) het ghulfe vermittle, und Fribourg und Solothurn sind bitreete."],
  ["The Säumer", "Die Säumer", "D Säumer"], ["Pack-animal drivers, the Säumer, carried goods on mules over the Alpine passes, with loads of about 100 kg each. Paths, hospices and villages grew along their routes.", "Die Säumer, Treiber von Lasttieren, trugen Waren auf Maultieren über die Alpenpässe, mit Lasten von etwa 100 kg pro Tier. Entlang ihrer Wege entstanden Pfade, Hospize und Dörfer.", "D Säumer, Triber vo Lasttier, händ Wäre uf Mulä über d Alpepäss treit, mit Laschte vo öppe 100 kg pro Tier. Entlang vo ihre Wäge sind Pfad, Hospize und Dörfer entstande."],
  ["Dürer crosses the Alps", "Dürer überquert die Alpen", "De Dürer überquert d Alpe"], ["In 1494 the painter Albrecht Dürer from Nuremberg travelled over the Alps to Venice. He brought Italian Renaissance ideas back north.", "1494 reiste der Maler Albrecht Dürer aus Nürnberg über die Alpen nach Venedig. Er brachte Ideen der italienischen Renaissance in den Norden.", "1494 isch de Maler Albrecht Dürer us Nürnberg über d Alpe uf Venedig greist. Er het Ideene vo de italienische Renaissance i Norde bracht."],
  ["Leonardo da Vinci", "Leonardo da Vinci", "Leonardo da Vinci"], ["At the same time Leonardo painted the Last Supper in Milan: perspective, anatomy, engineering. The Renaissance means \"rebirth\" of ancient ideas.", "Zur selben Zeit malte Leonardo in Mailand das Abendmahl: Perspektive, Anatomie, Technik. Renaissance bedeutet \"Wiedergeburt\" antiker Ideen.", "Zur glyche Ziit het de Leonardo z Mailand s Abendmahl gmalt: Perspektive, Anatomie, Technik. Renaissance heisst \"Widergburt\" vo antike Ideene."],
  ["The Swiss Guard", "Die Schweizergarde", "D Schwiizergarde"], ["Since 1506 Swiss soldiers have guarded the Pope. Swiss pikemen were hired by kings and popes all over Europe.", "Seit 1506 bewachen Schweizer Soldaten den Papst. Schweizer Pikeniere wurden von Königen und Päpsten in ganz Europa angeheuert.", "Sit 1506 bewached Schwiizer Soldate de Papscht. Schwiizer Pikeniere sind vo König und Päpscht i ganz Europa aagheuret worde."],
  ["The Battle of Marignano", "Die Schlacht bei Marignano", "D Schlacht bi Marignano"], ["In 1515 the French king and his cannons defeated the Swiss in Italy after two days. The Confederation stopped expanding southwards, a root of Swiss neutrality.", "1515 besiegte der französische König mit seinen Kanonen die Schweizer in Italien nach zwei Tagen. Die Eidgenossenschaft hörte auf, sich nach Süden auszudehnen: eine Wurzel der Schweizer Neutralität.", "1515 het de französisch König mit sine Kanone d Schwiizer i Italie nach zwei Täg bsiegt. D Eidgnosseschaft het ufghört, sich nach Süde uszdehne: e Wurzle vo de Schwiizer Neutralität."],
  ["Erasmus in Basel", "Erasmus in Basel", "De Erasmus z Basel"], ["The scholar Erasmus of Rotterdam had his Greek New Testament printed in Basel by Johann Froben in 1516. Printing spread new ideas faster than ever.", "Der Gelehrte Erasmus von Rotterdam liess sein griechisches Neues Testament 1516 in Basel bei Johann Froben drucken. Der Buchdruck verbreitete neue Ideen schneller als je zuvor.", "De Gleert Erasmus vo Rotterdam het sis griechische Nöi Testamänt 1516 z Basel bim Johann Froben lah drucke. De Buechdruck het neui Ideene schnäller verbreitet als je."],
  ["Holbein's portraits", "Holbeins Porträts", "D Porträt vom Holbein"], ["Hans Holbein the Younger painted in Basel in the 1520s. His portrait of Erasmus is one of the most famous of its time.", "Hans Holbein der Jüngere malte in den 1520er-Jahren in Basel. Sein Porträt des Erasmus gehört zu den berühmtesten seiner Zeit.", "De Hans Holbein de Jünger het i de 1520er-Jahr z Basel gmalt. Sis Porträt vom Erasmus ghört zu de berüehmtischte vo siner Ziit."],
  ["Luther's 95 theses", "Luthers 95 Thesen", "D 95 These vom Luther"], ["In 1517 Martin Luther criticised the sale of indulgences. The printing press carried his ideas across Europe within weeks: the Reformation had begun.", "1517 kritisierte Martin Luther den Ablasshandel. Der Buchdruck trug seine Ideen innert Wochen durch ganz Europa: Die Reformation hatte begonnen.", "1517 het de Martin Luther de Ablasshandel kritisiert. De Buechdruck het sini Ideene innert Wuche dur ganz Europa treit: D Reformation het aagfange."],
  ["The Fuggerei", "Die Fuggerei", "D Fuggerei"], ["Jakob Fugger founded the Fuggerei in Augsburg in 1521: the oldest social housing complex still in use. The yearly rent is still one Rhenish guilder (about 0.88 euro) and three daily prayers.", "Jakob Fugger gründete 1521 in Augsburg die Fuggerei: die älteste noch genutzte Sozialsiedlung. Die Jahresmiete beträgt noch immer einen Rheinischen Gulden (etwa 0,88 Euro) und drei tägliche Gebete.", "De Jakob Fugger het 1521 z Augsburg d Fuggerei gründet: di eltischt no gnutzti Sozialsiedlig. D Jahresmiet isch immer no en Rhiinische Gulde (öppe 0,88 Euro) und drü tägligi Gebätt."],
  ["The sausage meal in Zürich", "Das Wurstessen in Zürich", "S Wurstässe z Züri"], ["During Lent 1522 the printer Froschauer served sausages to his workers, against church rules. Zwingli defended them by arguing that only the Bible counts. The Reformation reached Zürich.", "In der Fastenzeit 1522 servierte der Drucker Froschauer seinen Arbeitern Würste, entgegen den Kirchenregeln. Zwingli verteidigte sie mit dem Argument, dass nur die Bibel zählt. Die Reformation erreichte Zürich.", "I de Fastezit 1522 het de Drucker Froschauer sine Arbeiter Würscht serviert, gäg d Chirchereglä. De Zwingli het si verteidigt mit em Argumänt, dass nume d Bible zellt. D Reformation isch z Züri aacho."],
  ["Paracelsus", "Paracelsus", "Paracelsus"], ["Born near Einsiedeln, the doctor Paracelsus taught that \"the dose makes the poison\". He became city physician in Basel in 1527 and challenged old medical books.", "Der bei Einsiedeln geborene Arzt Paracelsus lehrte, dass \"die Dosis das Gift macht\". 1527 wurde er Stadtarzt in Basel und stellte alte medizinische Bücher infrage.", "De bi Einsiedle gebornig Arzt Paracelsus het glehrt, dass \"d Dosis s Gift macht\". 1527 isch er Stadtarzt z Basel worde und het alti medizinischi Büecher i Frog gstellt."],
  ["The Zytglogge in Bern", "Der Zytglogge in Bern", "De Zytglogge z Bärn"], ["The astronomical clock of Bern was built around 1530 in a tower from the 13th century. It shows the hours, the date, the moon phases and the zodiac.", "Die astronomische Uhr von Bern wurde um 1530 in einem Turm aus dem 13. Jahrhundert gebaut. Sie zeigt die Stunden, das Datum, die Mondphasen und den Tierkreis.", "D astronomisch Uhr vo Bärn isch um 1530 inemne Turm us em 13. Jahrhundert baut worde. Si zeigt d Stunde, s Datum, d Mondphase und de Tierchreis."],
  ["The Kappeler milk soup", "Die Kappeler Milchsuppe", "D Kappeler Milchsuppe"], ["In 1529 the armies of Zürich and the Catholic cantons stood opposite each other at Kappel. Tradition says soldiers on both sides shared a pot of milk soup on the border, and the war was avoided.", "1529 standen sich die Heere Zürichs und der katholischen Orte bei Kappel gegenüber. Der Überlieferung nach teilten Soldaten beider Seiten einen Topf Milchsuppe an der Grenze, und der Krieg wurde vermieden.", "1529 sind sich d Heer vo Züri und de katholische Ort bi Kappel gägenüber gschtande. Nach de Überlieferig händ Soldate vo beidne Siite e Hafe Milchsuppe a de Gränze teilt, und de Chrieg isch vermiede worde."],
  ["The Second Kappel War", "Der Zweite Kappelerkrieg", "De Zweit Kappelerchrieg"], ["Two years later war did break out and Zwingli fell at Kappel in 1531. The peace that followed allowed each canton to keep its own faith: Switzerland learned to live with two confessions.", "Zwei Jahre später brach doch Krieg aus, und Zwingli fiel 1531 bei Kappel. Der folgende Friede erlaubte jedem Kanton seinen eigenen Glauben: Die Schweiz lernte, mit zwei Konfessionen zu leben.", "Zwei Jahr spöter isch dänn doch Chrieg usbroche, und de Zwingli isch 1531 bi Kappel gfalle. De Fride, wo gfolget isch, het jedem Kanton sin eigete Glaube erlaubt: D Schwiiz het glehrt, mit zwei Konfessione z läbe."],
  ["Vesalius' anatomy", "Vesalius' Anatomie", "D Anatomie vom Vesalius"], ["Andreas Vesalius had his illustrated book on human anatomy printed in Basel in 1543, based on dissections instead of old texts. Medicine became a science.", "Andreas Vesalius liess 1543 in Basel sein bebildertes Buch über die menschliche Anatomie drucken, gestützt auf Sektionen statt auf alte Texte. Die Medizin wurde zur Wissenschaft.", "De Andreas Vesalius het 1543 z Basel sis bebildert Buech über d menschlich Anatomie lah drucke, gstützt uf Sektione statt uf alti Täxt. D Medizin isch zur Wüssenschaft worde."],
  // eras, years and places
  ["The Early Middle Ages", "Das frühe Mittelalter", "S früeche Mittelalter"], ["The High Middle Ages", "Das Hochmittelalter", "S Hochmittelalter"], ["The Late Middle Ages", "Das Spätmittelalter", "S Spätmittelalter"], ["Renaissance & Reformation", "Renaissance & Reformation", "Renaissance & Reformation"],
  ["~612–820", "um 612–820", "um 612–820"], ["~1230–1315", "um 1230–1315", "um 1230–1315"], ["~1333–1481", "um 1333–1481", "um 1333–1481"], ["~1494–1531", "um 1494–1531", "um 1494–1531"],
  ["Scriptorium", "Skriptorium", "Skriptorium"], ["Library", "Bibliothek", "Bibliothek"], ["Throne hall", "Thronsaal", "Thronsaal"], ["Frescoes", "Fresken", "Fresche"], ["Castle", "Burg", "Burg"], ["Codex Manesse", "Manessische Handschrift", "Manessischi Handschrift"], ["Cathedral", "Kathedrale", "Kathedrale"],
  ["Oath", "Schwur", "Schwur"], ["Apple shot", "Apfelschuss", "Öpfelschuss"], ["Bridge", "Brücke", "Brugg"], ["Ambush", "Hinterhalt", "Hinderhalt"], ["Printing press", "Druckerpresse", "Druckerpresse"], ["Mule train", "Saumzug", "Saumzug"], ["Doctor", "Arzt", "Arzt"], ["University", "Universität", "Universität"],
  ["Council", "Konzil", "Konzil"], ["Memorial", "Denkmal", "Denkmal"], ["Hermit", "Einsiedler", "Iisiedler"], ["Erasmus", "Erasmus", "Erasmus"], ["Sausages", "Würste", "Würscht"], ["Zwingli", "Zwingli", "Zwingli"], ["Clock", "Uhr", "Uhr"], ["Marignano", "Marignano", "Marignano"], ["Soup", "Suppe", "Suppe"], ["Bear", "Bär", "Bär"],
  ["ST. GALLEN, ~820. A monastery has grown where Gallus once lived as a hermit. The monks pray, farm... and copy books.", "ST. GALLEN, um 820. Wo Gallus einst als Einsiedler lebte, ist ein Kloster gewachsen. Die Mönche beten, bauern... und schreiben Bücher ab.", "ST. GALLE, um 820. Wo de Gallus emal als Iisiedler gläbt het, isch es Chloschter gwachse. D Mönch bättet, buuret... und schriibed Büecher ab."],
  ["THE STEINACH FOREST, ~612. The Irish monk Gallus lives here as a hermit. Locals say a bear brings him firewood.", "DER STEINACHWALD, um 612. Der irische Mönch Gallus lebt hier als Einsiedler. Die Einheimischen sagen, ein Bär bringe ihm Feuerholz.", "DE STEINACHWALD, um 612. De irisch Mönch Gallus läbt da als Iisiedler. D Einheimische säged, en Bär bringi em Füürholz."],
  ["AACHEN, ~800. Charlemagne's palace. The chapel is brand new and very, very fancy.", "AACHEN, um 800. Karls Pfalz. Die Kapelle ist brandneu und sehr, sehr schick.", "AACHE, um 800. Em Karl sini Pfalz. D Chapälle isch nigelnagelneu und sehr, sehr schick."],
  ["MÜSTAIR, ~800. A convent high in the Alps with the biggest Carolingian wall paintings still standing.", "MÜSTAIR, um 800. Ein Kloster hoch in den Alpen mit den grössten erhaltenen karolingischen Wandmalereien.", "MÜSTAIR, um 800. E Chloschter höch i de Alpe mit de gröschte erhaltene karolingische Wandmalereie."],
  ["Aachen ~800", "Aachen um 800", "Aache um 800"], ["Steinach forest ~612", "Steinachwald um 612", "Steinachwald um 612"], ["St. Gallen ~820", "St. Gallen um 820", "St. Galle um 820"], ["Müstair ~800", "Müstair um 800", "Müstair um 800"],
  ["The Steinach forest... dark, wet, perfect for a hermit. And for bears. 🐻", "Der Steinachwald... dunkel, nass, perfekt für einen Einsiedler. Und für Bären. 🐻", "De Steinachwald... dunkel, nass, perfekt für en Iisiedler. Und für Bäre. 🐻"],
  ["St. Gallen! The monks here will copy anything you hand them. Slowly. 📜", "St. Gallen! Die Mönche hier schreiben alles ab, was du ihnen gibst. Langsam. 📜", "St. Galle! D Mönch da schriibed alles ab, was du ine gisch. Langsam. 📜"],
  ["Aachen: warm springs, a palace and a very powerful emperor. ♨️", "Aachen: warme Quellen, eine Pfalz und ein sehr mächtiger Kaiser. ♨️", "Aache: warmi Quelle, e Pfalz und en sehr mächtige Kaiser. ♨️"],
  ["Müstair! Colourful frescoes, high up in the Alps. 🎨", "Müstair! Farbenfrohe Fresken, hoch oben in den Alpen. 🎨", "Müstair! Farbigi Fresche, höch obe i de Alpe. 🎨"],
  ["Monks wrote on parchment made from calf skin. One big Bible could take a whole herd. 🐄", "Mönche schrieben auf Pergament aus Kalbshaut. Für eine grosse Bibel brauchte es eine ganze Herde. 🐄", "Mönch händ uf Pergamänt us Chalbshuut gschribe. Für e grossi Bible hets e ganzi Herde bruucht. 🐄"],
  ["Before Charlemagne, handwriting was a mess: words ran together and letters were all over the place.", "Vor Karl dem Grossen war die Handschrift ein Chaos: Wörter liefen zusammen und Buchstaben sahen überall anders aus.", "Vor em Karl em Gross isch d Handschrift es Chaos gsi: Wörter sind zämegloffe und Buechstabe händ überall anders usgseh."],
  ["Irish monks crossed the sea to teach Central Europe. The first wandering hippies. Respect. ☘️", "Irische Mönche überquerten das Meer, um Mitteleuropa zu unterrichten. Die ersten Wander-Hippies. Respekt. ☘️", "Irischi Mönch sind übers Meer, zum Mitteleuropa unterrichte. Di erschte Wander-Hippies. Respäkt. ☘️"],
  ["Monasteries brewed beer. Elio would love this place. 🍺", "Klöster brauten Bier. Elio würde diesen Ort lieben. 🍺", "Chlöschter händ Bier brüwt. De Elio würd dä Ort liebe. 🍺"],
  
  ["RÜTLI MEADOW. By legend, three men swore an oath here in 1291. The real treaty is a piece of parchment.", "RÜTLIWIESE. Der Legende nach schworen hier 1291 drei Männer einen Eid. Der echte Vertrag ist ein Stück Pergament.", "RÜTLIWISE. D Legände seit, da händ 1291 drü Manne en Eid gschwore. De ächt Vertrag isch es Stück Pergamänt."],
  ["ALTDORF, URI. A hat on a pole, and everyone must bow to it... (a legend, of course!)", "ALTDORF, URI. Ein Hut auf einer Stange, vor dem sich alle verbeugen müssen... (eine Legende, natürlich!)", "ALTDORF, URI. En Huet uf ere Stange, vor däm sich alli müend verbügge... (e Legände, natürli!)"],
  ["SCHÖLLENEN GORGE. A roaring river, nothing but rock... and a famous bridge.", "SCHÖLLENENSCHLUCHT. Ein tosender Fluss, nichts als Fels... und eine berühmte Brücke.", "SCHÖLLENENSCHLUCHT. En tosende Fluss, nüt als Fels... und e berüehmti Brugg."],
  ["HABSBURG. A castle in Aargau, home of a family that will one day rule half of Europe.", "HABSBURG. Eine Burg im Aargau, Heimat einer Familie, die einst halb Europa beherrschen wird.", "HABSBURG. E Burg im Aargau, Dihei vonere Familie, wo emal s halb Europa beherrscht."],
  ["ZÜRICH, ~1300. Guilds, mills, and a very famous songbook.", "ZÜRICH, um 1300. Zünfte, Mühlen und ein sehr berühmtes Liederbuch.", "ZÜRI, um 1300. Zünft, Mühle und es sehr berüehmts Liederbuech."],
  ["MORGARTEN, 1315. A narrow pass between the lake and the steep slope. Perfect for an ambush.", "MORGARTEN, 1315. Ein enger Pass zwischen See und steilem Hang. Perfekt für einen Hinterhalt.", "MORGARTE, 1315. En ängä Pass zwüsche See und stile Hang. Perfekt für en Hinderhalt."],
  ["Lake Geneva ~1250", "Genfersee um 1250", "Gfersee um 1250"], ["Habsburg ~1230", "Habsburg um 1230", "Habsburg um 1230"], ["Zürich ~1300", "Zürich um 1300", "Züri um 1300"], ["Morgarten 1315", "Morgarten 1315", "Morgarte 1315"], ["Gotthard ~1230", "Gotthard um 1230", "Gotthard um 1230"], ["Uri & Schwyz 1291", "Uri & Schwyz 1291", "Uri & Schwyz 1291"],
  ["The heart of old Switzerland: Uri, Schwyz and Unterwalden. ⛰️", "Das Herz der alten Schweiz: Uri, Schwyz und Unterwalden. ⛰️", "S Härz vo de alte Schwiiz: Uri, Schwyz und Unterwalde. ⛰️"],
  ["The Gotthard. Everything north-south goes through here. 🫏", "Der Gotthard. Alles, was von Nord nach Süd will, kommt hier durch. 🫏", "De Gotthard. Alles, wo vo Nord uf Süd wott, chunnt da dure. 🫏"],
  ["Lake Geneva! Vineyards, and a castle on a rock in the water. 🍇", "Der Genfersee! Weinberge und eine Burg auf einem Fels im Wasser. 🍇", "De Gfersee! Rebbärge und e Burg uf emne Fels im Wasser. 🍇"],
  ["Morgarten. Very narrow. Very steep. Very suspicious. 🪨", "Morgarten. Sehr eng. Sehr steil. Sehr verdächtig. 🪨", "Morgarte. Sehr äng. Sehr steil. Sehr verdächtig. 🪨"],
  ["Zürich! Guilds, bridges, poets. And no banks. Yet. 🎶", "Zürich! Zünfte, Brücken, Dichter. Und noch keine Banken. 🎶", "Züri! Zünft, Brugge, Dichter. Und no kei Banke. 🎶"],
  ["Habsburg territory. Smile and look harmless. 😬", "Habsburger Gebiet. Lächeln und harmlos aussehen. 😬", "Habsburger Gebiet. Lächle und harmlos usgseh. 😬"],
  ["Minnesang: songs about love, usually unrequited. My kind of poetry. 🎶", "Minnesang: Lieder über die Liebe, meist unerwidert. Meine Art Poesie. 🎶", "Minnesang: Lieder über d Liebi, meischtens unerwideret. Mini Art Poesie. 🎶"],
  ["Castle windows were tiny and drafty. Nice for archers, terrible for architects.", "Burgfenster waren winzig und zugig. Gut für Bogenschützen, schlecht für Architekten.", "Burgfänschter sind winzig und zugig gsi. Guet für Bogeschütze, schlächt für Architekte."],
  ["The Gotthard route made Uri rich: tolls, mules and mountain cheese. 🧀", "Die Gotthardroute machte Uri reich: Zölle, Maultiere und Bergkäse. 🧀", "D Gotthardroute het Uri riich gmacht: Zöll, Mulä und Bärgchäs. 🧀"],
  ["Everyone in this century says \"the Emperor\" like he is next door. He is in Italy. Mostly.", "In diesem Jahrhundert sagen alle \"der Kaiser\", als wohne er nebenan. Er ist in Italien. Meistens.", "I dem Jahrhundert säged alli \"de Kaiser\", als wohni er näbedra. Er isch i Italie. Meischtens."],
   
  ["LUZERN, ~1333. A covered wooden bridge zigzags across the Reuss and doubles as part of the city wall.", "LUZERN, um 1333. Eine gedeckte Holzbrücke führt im Zickzack über die Reuss und ist zugleich Teil der Stadtmauer.", "LUZÄRN, um 1333. E gedeckti Holzbrugg füehrt im Zickzack über d Reuss und isch zugliich Teil vo de Stadtmuur."],
  ["BASEL, 1356. A great earthquake shook the city, and fires finished the job. Rebuilding has begun.", "BASEL, 1356. Ein grosses Erdbeben erschütterte die Stadt, und Brände vollendeten das Werk. Der Wiederaufbau hat begonnen.", "BASEL, 1356. E grosses Ärdbebe het d Stadt gschüttlet, und Brönd händ s Wärch vollendet. De Wideraufbau het aagfange."],
  ["MAINZ, ~1450. It smells of ink and hot metal. Someone is up to something with little metal letters.", "MAINZ, um 1450. Es riecht nach Tinte und heissem Metall. Jemand tüftelt an etwas mit kleinen Metallbuchstaben.", "MAINZ, um 1450. Es schmöckt nach Tinte und heisse Metall. Öpper tüftlet a öppis mit chliine Metallbuechstabe."],
  ["MURTEN, 1476. Charles the Bold of Burgundy is besieging the little town.", "MURTEN, 1476. Karl der Kühne von Burgund belagert das Städtchen.", "MURTE, 1476. De Karl de Chüen vo Burgund belageret s Städtli."],
  ["SEMPACH, 1386. Here the Confederates defeated the Habsburg knights.", "SEMPACH, 1386. Hier besiegten die Eidgenossen die Habsburger Ritter.", "SEMPACH, 1386. Da händ d Eidgnosse d Habsburger Ritter bsiegt."],
  ["THE GOTTHARD ROAD. Mules, merchants, monks and the occasional avalanche.", "DIE GOTTHARDSTRASSE. Maultiere, Händler, Mönche und gelegentlich eine Lawine.", "D GOTTHARDSTRASS. Mulä, Händler, Mönch und gäng wieder e Lawine."],
  ["Luzern ~1333", "Luzern um 1333", "Luzärn um 1333"], ["Murten 1476", "Murten 1476", "Murte 1476"], ["Basel ~1356", "Basel um 1356", "Basel um 1356"], ["Mainz ~1450", "Mainz um 1450", "Mainz um 1450"], ["Constance ~1414", "Konstanz um 1414", "Konschtanz um 1414"], ["The Gotthard road", "Die Gotthardstrasse", "D Gotthardstrass"],
  ["Luzern! Home town of... well, of Sarah, in a few centuries. 🌉", "Luzern! Heimatstadt von... na ja, von Sarah, in ein paar Jahrhunderten. 🌉", "Luzärn! Heimatstadt vo... naja, vo de Sarah, i es paar Jahrhundert. 🌉"],
  ["Basel: the new university, the Rhine and a very nervous doctor. 🎓", "Basel: die neue Universität, der Rhein und ein sehr nervöser Arzt. 🎓", "Basel: di neu Universität, de Rhii und en sehr nervöse Arzt. 🎓"],
  ["Mainz. Listen: *clunk, clunk*. The sound of the future. 🔤", "Mainz. Hör zu: *klonk, klonk*. Das Geräusch der Zukunft. 🔤", "Mainz. Lose: *klonk, klonk*. S Gruusch vo de Zuekunft. 🔤"],
  ["Murten: city walls, a lake and an army outside. ⚔️", "Murten: Stadtmauern, ein See und ein Heer davor. ⚔️", "Murte: Stadtmuure, en See und es Heer dervor. ⚔️"],
  ["Constance: a church council with more popes than rooms. ⚖️", "Konstanz: ein Kirchenkonzil mit mehr Päpsten als Zimmern. ⚖️", "Konschtanz: es Chirchekonzil mit meh Päpscht als Zimmer. ⚖️"],
  ["The mule track over the Gotthard. Watch your step. 🫏", "Der Saumpfad über den Gotthard. Pass auf, wohin du trittst. 🫏", "De Saumpfad über de Gotthard. Pass uf, wo du häre trittsch. 🫏"],
  ["Before printing, one book took a scribe a year. Gutenberg makes 200 copies in the same time. 🔤", "Vor dem Buchdruck brauchte ein Schreiber ein Jahr für ein Buch. Gutenberg macht in derselben Zeit 200 Kopien. 🔤", "Vor em Buechdruck het en Schriiber es Jahr für es Buech bruucht. De Gutenberg macht i de glyche Ziit 200 Kopie. 🔤"],
  ["Do not touch the rats. Do not touch ANYTHING. 🐀", "Fass die Ratten nicht an. Fass NICHTS an. 🐀", "Lang d Ratte nöd aa. Lang NÜT aa. 🐀"],
  ["Luzern's bridge has the plague paintings... in 300 years. Spoilers!", "Luzerns Brücke bekommt die Pestbilder... in 300 Jahren. Spoiler!", "D Luzärner Brugg überchunnt d Pestbilder... i 300 Jahr. Spoiler!"],
  ["Swiss pikemen are the most feared soldiers in Europe. Politely stay out of their way.", "Schweizer Pikeniere sind die gefürchtetsten Soldaten Europas. Geh ihnen höflich aus dem Weg.", "Schwiizer Pikeniere sind di gfürchtetschte Soldate vo Europa. Gang ine höflich uus em Wäg."],
  ["BASEL, ~1520. Printing shops on every corner. Even the cobblestones seem to read.", "BASEL, um 1520. Druckereien an jeder Ecke. Sogar das Pflaster scheint zu lesen.", "BASEL, um 1520. Druckereie a jedere Egge. Sogar s Pflaschter schiint z läse."],
  ["ZÜRICH, 1522. A preacher named Zwingli is stirring up trouble. Sausage-shaped trouble.", "ZÜRICH, 1522. Ein Prediger namens Zwingli sorgt für Ärger. Wurstförmigen Ärger.", "ZÜRI, 1522. En Prediger namens Zwingli macht Ärger. Wurschtförmige Ärger."],
  ["BERN, 1530. The Zytglogge, the astronomical clock, is brand new.", "BERN, 1530. Der Zytglogge, die astronomische Uhr, ist brandneu.", "BÄRN, 1530. De Zytglogge, d astronomisch Uhr, isch nigelnagelneu."],
  ["AUGSBURG, 1521. Rich merchants, banking, and an unusual housing project.", "AUGSBURG, 1521. Reiche Kaufleute, Bankgeschäfte und eine ungewöhnliche Siedlung.", "AUGSBURG, 1521. Riichi Chaufmanne, Bankgschäft und e ungwöhnlichi Siedlig."],
  ["KAPPEL, 1529. Two armies on a meadow, a milk pot in between.", "KAPPEL, 1529. Zwei Heere auf einer Wiese, dazwischen ein Milchtopf.", "KAPPEL, 1529. Zwei Heer uf ere Wise, dezwüsche en Milchhafe."],
  ["MARIGNANO, 1515. The Swiss pikemen met French cannons. Cannons won.", "MARIGNANO, 1515. Die Schweizer Pikeniere trafen auf französische Kanonen. Die Kanonen gewannen.", "MARIGNANO, 1515. D Schwiizer Pikeniere sind uf französischi Kanone gschtosse. D Kanone händ gwunne."],
  ["Basel ~1520", "Basel um 1520", "Basel um 1520"], ["Zürich 1522", "Zürich 1522", "Züri 1522"], ["Bern 1530", "Bern 1530", "Bärn 1530"], ["Augsburg 1521", "Augsburg 1521", "Augsburg 1521"], ["Kappel 1529", "Kappel 1529", "Kappel 1529"],
  ["Basel! Erasmus, Holbein, Froben: the smartest street in Europe. 📚", "Basel! Erasmus, Holbein, Froben: die klügste Strasse Europas. 📚", "Basel! Erasmus, Holbein, Froben: di gschiidscht Strass vo Europa. 📚"],
  ["Zürich: Zwingli's city. Strong opinions, excellent sausages. 🌭", "Zürich: Zwinglis Stadt. Starke Meinungen, ausgezeichnete Würste. 🌭", "Züri: Em Zwingli sini Stadt. Starchi Meinige, usgezeichneti Würscht. 🌭"],
  ["Bern: bears, arcades and a magnificent new clock. 🕰️", "Bern: Bären, Lauben und eine prächtige neue Uhr. 🕰️", "Bärn: Bäre, Lauben und e prächtigi neui Uhr. 🕰️"],
  ["Augsburg: the Fuggers are richer than most kings. 💰", "Augsburg: Die Fugger sind reicher als die meisten Könige. 💰", "Augsburg: D Fugger sind riicher als di meischte König. 💰"],
  ["Kappel: farmland on the border between two faiths. 🥣", "Kappel: Ackerland an der Grenze zwischen zwei Glaubensrichtungen. 🥣", "Kappel: Ackerland a de Gränze zwüsche zwei Glaubensrichtige. 🥣"],
  ["\"The dose makes the poison.\" Remember that at the next fondue. 🧀", "\"Die Dosis macht das Gift.\" Denk daran beim nächsten Fondue. 🧀", "\"D Dosis macht s Gift.\" Dänk draa bim nächschte Fondue. 🧀"],
  ["Everyone has an opinion about religion this decade. Print shops make a fortune.", "In diesem Jahrzehnt hat jeder eine Meinung zur Religion. Druckereien verdienen ein Vermögen.", "I dem Jahrzähnt het jede e Meinig zur Religion. Druckereie verdiened es Vermöge."],
  ["Perspective! Everything gets a vanishing point now. Architects, rejoice! 📐", "Perspektive! Alles bekommt jetzt einen Fluchtpunkt. Architekten, freut euch! 📐", "Perspektive! Alles überchunnt jetzt en Flüchtpunkt. Architekte, fröit eu! 📐"],
  ["Swiss mercenaries are in demand: popes, kings, emperors. Every war needs a pike.", "Schweizer Söldner sind begehrt: Päpste, Könige, Kaiser. Jeder Krieg braucht eine Pike.", "Schwiizer Söldner sind gfrogt: Päpscht, König, Kaiser. Jede Chrieg bruucht e Pike."],
  // quest names
  ["Help Gallus and his bear with the firewood", "Hilf Gallus und seinem Bären mit dem Feuerholz", "Hilf em Gallus und sim Bär mit em Füürholz"], ["Learn to copy books in the scriptorium of St. Gallen", "Lerne im Skriptorium von St. Gallen Bücher abzuschreiben", "Lern im Skriptorium vo St. Galle Büecher abschriibe"],
  ["Sketch the Plan of St. Gall in the library", "Skizziere den St. Galler Klosterplan in der Bibliothek", "Skizzier de St. Galler Chlosterplan i de Bibliothek"], ["Sneak into the Palatine Chapel at Aachen and sketch", "Schleich dich in die Pfalzkapelle in Aachen und skizziere", "Schliich di i d Pfalzkapälle z Aache und skizzier"],
  ["Outsmart the devil at the Devil's Bridge", "Überliste den Teufel an der Teufelsbrücke", "Überlischte de Tüfel a de Tüfelsbrugg"], ["Take the apple shot at Altdorf", "Wage den Apfelschuss in Altdorf", "Wag de Öpfelschuss z Altdorf"], ["Swear the oath at the Rütli meadow", "Schwöre den Eid auf der Rütliwiese", "Schwör de Eid uf de Rütliwise"], ["Join the ambush at Morgarten", "Mach beim Hinterhalt am Morgarten mit", "Mach bim Hinderhalt am Morgarte mit"],
  ["Sneak into Château de Chillon and sketch", "Schleich dich ins Schloss Chillon und skizziere", "Schliich di is Schloss Chillon und skizzier"], ["Set type in Gutenberg's printing shop", "Setze Lettern in Gutenbergs Druckerei", "Setz Buechstabe i de Gutenberg sinere Druckerei"], ["Lead a mule over the Gotthard", "Führe ein Maultier über den Gotthard", "Füehr es Muli über de Gotthard"],
  ["Learn about the plague from the doctor", "Lerne beim Arzt etwas über die Pest", "Lern bim Arzt öppis über d Pescht"], ["Run the Murten messenger race", "Lauf den Murtener Botenlauf", "Lauf de Murtener Botelauf"], ["Sneak onto the Kapellbrücke at night and sketch", "Schleich dich nachts auf die Kapellbrücke und skizziere", "Schliich di znacht uf d Chapällbrugg und skizzier"],
  ["Help Paracelsus with the right dose", "Hilf Paracelsus mit der richtigen Dosis", "Hilf em Paracelsus mit de richtige Dosis"], ["Talk to Erasmus in Froben's printing shop", "Sprich mit Erasmus in Frobens Druckerei", "Red mit em Erasmus i de Froben sinere Druckerei"], ["Join the sausage meal in Zürich", "Nimm am Wurstessen in Zürich teil", "Nimm am Wurstässe z Züri teil"],
  ["Meet the Swiss mercenaries at Marignano", "Triff die Schweizer Söldner bei Marignano", "Triff d Schwiizer Söldner bi Marignano"], ["Stir the milk soup at Kappel", "Rühre die Milchsuppe in Kappel", "Rüehr d Milchsuppe z Kappel"], ["Sneak into the Fuggerei in Augsburg and sketch", "Schleich dich in die Fuggerei in Augsburg und skizziere", "Schliich di i d Fuggerei z Augsburg und skizzier"],
  // sketches
  ["An ideal monastery on five sheets of parchment: church, library, infirmary, garden, brewery... It was never built exactly like this, but it shows how people imagined a perfect community around 820.", "Ein ideales Kloster auf fünf Pergamentbögen: Kirche, Bibliothek, Krankenhaus, Garten, Brauerei... Es wurde nie genau so gebaut, zeigt aber, wie man sich um 820 eine perfekte Gemeinschaft vorstellte.", "Es ideals Chloschter uf föif Pergamäntböge: Chile, Bibliothek, Chrankehuus, Garte, Bruerei... Es isch nie genau so baut worde, zeigt aber, wie me sich um 820 e perfekti Gmeinschaft vorgstellt het."],
  ["The Palatine Chapel", "Die Pfalzkapelle", "D Pfalzkapälle"], ["An octagon crowned by a dome, with a two-storey gallery. Built around 800, it copies San Vitale in Ravenna: Charlemagne wanted to be the new Roman emperor in stone.", "Ein Achteck mit Kuppel und zweigeschossiger Empore. Um 800 gebaut, kopiert sie San Vitale in Ravenna: Karl wollte in Stein der neue römische Kaiser sein.", "Es Achtegg mit Chupple und zweigschossiger Empore. Um 800 baut, kopiert si San Vitale z Ravenna: De Karl het i Stei de nöi römisch Kaiser wele si."],
  ["A castle on a rock island with a Gothic hall, thick towers and a spiral stair. The Counts of Savoy built it to control the road along the lake.", "Eine Burg auf einer Felsinsel mit gotischem Saal, dicken Türmen und Wendeltreppe. Die Grafen von Savoyen bauten sie, um die Strasse am See zu kontrollieren.", "E Burg uf ere Felsinsle mit gotischem Saal, dicke Türm und Wändeltrepp. D Grafe vo Savoye händ si baut, zum d Strass am See z kontrolliere."],
  ["A covered wooden bridge with an octagonal water tower. The roof beams carry painted triangular panels. Part bridge, part wall, part picture gallery.", "Eine gedeckte Holzbrücke mit achteckigem Wasserturm. Die Dachbalken tragen bemalte Dreieckstafeln. Teils Brücke, teils Mauer, teils Bildergalerie.", "E gedeckti Holzbrugg mit achtecketem Wasserturm. D Dachbalke träge bemalti Dreieckstafle. Teils Brugg, teils Muur, teils Bildergalerie."],
  ["Small terraced houses around lanes and a gate that closes at night. Built 1521 for poor citizens: the oldest social housing still in use, with a yearly rent of one guilder.", "Kleine Reihenhäuser um Gassen und ein Tor, das nachts schliesst. 1521 für arme Bürger gebaut: die älteste noch genutzte Sozialsiedlung, mit einer Jahresmiete von einem Gulden.", "Chliini Riihehüser um Gasse und es Tor, wo znacht zuegaht. 1521 für armi Bürger baut: di eltischt no gnutzti Sozialsiedlig, mit ere Jahresmiet vo eim Gulde."],
  ["Count Peter", "Graf Peter", "Graf Peter"], ["Brother Klaus", "Bruder Klaus", "Bruder Klaus"],
  // minigames
  ["ST. GALLEN", "ST. GALLEN", "ST. GALLE"], ["GALLUS AND THE BEAR", "GALLUS UND DER BÄR", "GALLUS UND DE BÄR"],
  ["The bear brings logs! Press [A] in the green zone to catch and stack each one.", "Der Bär bringt Holzscheite! Drücke [A] in der grünen Zone, um jedes zu fangen und zu stapeln.", "De Bär bringt Holzschiit! Drück [A] i de grüene Zone, zum jedes fange und stapele."],
  ["A neat woodpile! 🐻", "Ein ordentlicher Holzstapel! 🐻", "En ordentliche Holzbygi! 🐻"],
  ["Legend says a bear fetched firewood for Gallus, and Gallus shared his bread with it.", "Der Legende nach holte ein Bär Feuerholz für Gallus, und Gallus teilte sein Brot mit ihm.", "D Legände seit, en Bär heig em Gallus Füürholz bracht, und de Gallus heig sis Brot mit ihm teilt."],
  ["The logs rolled away!", "Die Holzscheite sind weggerollt!", "D Holzschiit sind wägkugelet!"],
  ["THE APPLE SHOT", "DER APFELSCHUSS", "DE ÖPFELSCHUSS"],
  ["Hold your breath... press [A] when the crosshair is on the apple (green zone)!", "Halte den Atem an... drücke [A], wenn das Fadenkreuz auf dem Apfel ist (grüne Zone)!", "Halt de Ate aa... drück [A], wenn s Fadechrüüz uf em Öpfel isch (grüeni Zone)!"],
  ["Bullseye! 🍎", "Volltreffer! 🍎", "Volltreffer! 🍎"],
  ["In the legend, Tell shot the apple off his own son's head, and kept a second bolt for the tyrant. The story first appears in the 15th century.", "In der Legende schoss Tell seinem eigenen Sohn den Apfel vom Kopf und behielt einen zweiten Pfeil für den Tyrannen. Die Geschichte taucht erstmals im 15. Jahrhundert auf.", "I de Legände het de Täll sim eigete Sohn de Öpfel vom Chopf gschosse und en zweite Pfiil für de Tyrann bhalte. D Gschicht taucht zerscht im 15. Jahrhundert uf."],
  ["The bolt flew wide! (C-Real faints.)", "Der Bolzen flog daneben! (C-Real fällt in Ohnmacht.)", "De Bolze isch näbe düre! (C-Real gheit i Ohnmacht.)"],
  ["AMBUSH AT MORGARTEN, 1315", "HINTERHALT AM MORGARTEN, 1315", "HINDERHALT AM MORGARTE, 1315"],
  ["The Habsburg column marches below! Press [A] in the green zone to send a rock tumbling down.", "Die Habsburger Kolonne marschiert unten durch! Drücke [A] in der grünen Zone, um einen Felsen hinabzurollen.", "D Habsburger Kolonne marschiert une dure! Drück [A] i de grüene Zone, zum en Fels abe z rolle."],
  ["The column is in disarray! 🪨", "Die Kolonne ist in Auflösung! 🪨", "D Kolonne isch i Uflösig! 🪨"],
  ["On 15 November 1315 the Confederates attacked from the slope above the narrow pass, so tradition says with rocks and logs. The Habsburg knights could not turn around.", "Am 15. November 1315 griffen die Eidgenossen vom Hang über dem engen Pass an, der Überlieferung nach mit Steinen und Baumstämmen. Die Habsburger Ritter konnten nicht wenden.", "Am 15. November 1315 händ d Eidgnosse vom Hang über em ängä Pass aagriffe, nach de Überlieferig mit Stei und Boumstämm. D Habsburger Ritter hend nöd chönne wände."],
  ["The knights spotted you!", "Die Ritter haben dich entdeckt!", "D Ritter händ di entdeckt!"],
  ["THE MILK SOUP OF KAPPEL, 1529", "DIE MILCHSUPPE VON KAPPEL, 1529", "D MILCHSUPPE VO KAPPEL, 1529"],
  ["Stir together with C-Real! Press [A] in the green zone to keep the soup from burning.", "Rühre zusammen mit C-Real! Drücke [A] in der grünen Zone, damit die Suppe nicht anbrennt.", "Rüehr zäme mit C-Real! Drück [A] i de grüene Zone, dass d Suppe nöd aabrännt."],
  ["Two armies share a pot! 🥣", "Zwei Heere teilen sich einen Topf! 🥣", "Zwei Heer teiled sich en Hafe! 🥣"],
  ["Tradition says that in 1529 the soldiers of Zürich and the Catholic cantons ate milk soup together on the border, and the war was called off.", "Der Überlieferung nach assen 1529 die Soldaten Zürichs und der katholischen Orte an der Grenze gemeinsam Milchsuppe, und der Krieg wurde abgeblasen.", "Nach de Überlieferig händ 1529 d Soldate vo Züri und de katholische Ort a de Gränze zäme Milchsuppe gässe, und de Chrieg isch abgsait worde."],
  ["The soup burned!", "Die Suppe ist angebrannt!", "D Suppe isch aabrännt!"],
  ["OVER THE GOTTHARD, ~1300", "ÜBER DEN GOTTHARD, UM 1300", "ÜBER DE GOTTHARD, UM 1300"],
  ["← → steer · [A] jump over stones · dodge the rockfall! Keep the mule moving.", "← → lenken · [A] über Steine springen · weiche dem Steinschlag aus! Halte das Maultier in Bewegung.", "← → lenke · [A] über Stei springe · weich em Steischlag uus! Halt s Muli i Bewegig."],
  ["The hospice! Mule and cargo are safe. 🫏", "Das Hospiz! Maultier und Ladung sind in Sicherheit. 🫏", "S Hospiz! Muli und Ladig sind in Sicherheit. 🫏"],
  ["The mule refuses to go on!", "Das Maultier weigert sich weiterzugehen!", "S Muli weigeret sich wiiterzgah!"],
  ["Rockfall! 🪨", "Steinschlag! 🪨", "Steischlag! 🪨"],
  ["THE MURTEN RUN, 1476", "DER MURTENLAUF, 1476", "DE MURTELAUF, 1476"],
  ["← → steer · [A] jump over fences · bring the linden branch to Fribourg!", "← → lenken · [A] über Zäune springen · bring den Lindenzweig nach Freiburg!", "← → lenke · [A] über Zäun springe · bring de Lindezwiig uf Fribourg!"],
  ["Fribourg! The victory is announced. 🌳", "Freiburg! Der Sieg ist verkündet. 🌳", "Fribourg! De Sieg isch verchündet. 🌳"],
  ["carolus rex et sarah", "carolus rex et sarah", "carolus rex et sarah"], ["gallus et ursus amici", "gallus et ursus amici", "gallus et ursus amici"], ["ora et labora", "ora et labora", "ora et labora"],
  ["This line has {0} words, so it needs {1} gaps.", "Diese Zeile hat {0} Wörter, also braucht sie {1} Lücken.", "Die Zile het {0} Wörter, also bruucht si {1} Lücke."],
  ["Not quite. Read the line out loud in Latin: where does each word end?", "Nicht ganz. Lies die Zeile laut auf Latein: Wo endet jedes Wort?", "Nöd ganz. Lies d Zile luut uf Latiin: Wo ghört jedes Wort uf?"],
  ["THE SCRIPTORIUM OF ST. GALLEN", "DAS SKRIPTORIUM VON ST. GALLEN", "S SKRIPTORIUM VO ST. GALLE"],
  ["Line {0}/3", "Zeile {0}/3", "Zile {0}/3"],
  ["Scribes wrote without spaces. Mark the gaps between words: ◀ ▶ move · [A] set or remove a gap · ▼ done", "Schreiber schrieben ohne Abstände. Markiere die Lücken zwischen den Wörtern: ◀ ▶ bewegen · [A] Lücke setzen oder entfernen · ▼ fertig", "Schriiber händ ohni Abständ gschribe. Markier d Lücke zwüsche de Wörter: ◀ ▶ bewege · [A] Lücke setze oder wägneh · ▼ fertig"],
  ["✓ Clear to read! Charlemagne would be proud.", "✓ Gut lesbar! Karl der Grosse wäre stolz.", "✓ Guet läsbar! De Karl de Gross wär stolz."],
  ["[A]: next line", "[A]: nächste Zeile", "[A]: nächschti Zile"],
  ["Scribe of St. Gallen! ✍️", "Schreiber von St. Gallen! ✍️", "Schriiber vo St. Galle! ✍️"],
  ["The Carolingian scribes gave us lowercase letters, spaces between words and punctuation. Reading got much easier.", "Die karolingischen Schreiber schenkten uns Kleinbuchstaben, Abstände zwischen Wörtern und Satzzeichen. Lesen wurde viel einfacher.", "D karolingische Schriiber händ üs Chliibuechstabe, Abständ zwüsche Wörter und Satzzeiche gschänkt. S Läse isch vill eifacher worde."],
  ["That is the mirrored {0}. We need the {1}.", "Das ist das gespiegelte {0}. Wir brauchen das {1}.", "Das isch s gspiegleti {0}. Mir bruuched s {1}."],
  ["GUTENBERG'S PRINTING SHOP", "GUTENBERGS DRUCKEREI", "GUTENBERG SINI DRUCKEREI"],
  ["Set the word: {0}   ·   mirrored letters!", "Setze das Wort: {0}   ·   gespiegelte Buchstaben!", "Setz s Wort: {0}   ·   gspiegleti Buechstabe!"],
  ["Pick the next block: arrows + [A]. In the stick the letters stand backwards, so they print the right way round.", "Wähle den nächsten Block: Pfeiltasten + [A]. Im Winkelhaken stehen die Buchstaben verkehrt, so drucken sie richtig herum.", "Wähl de nächscht Block: Pfiiltaschte + [A]. Im Winkelhake stönd d Buechstabe verchehrt, so drucked si richtig ume."],
  ["Hold [A] to turn the screw!", "Halte [A], um die Spindel zu drehen!", "Halt [A], zum d Spindle drääje!"],
  ["Printer's apprentice! 🔤", "Druckerlehrling! 🔤", "Druckerlehrling! 🔤"],
  ["Before this, one book took a scribe a year. With movable type, one shop could print hundreds of copies. Ideas began to travel fast.", "Davor brauchte ein Schreiber ein Jahr für ein Buch. Mit beweglichen Lettern konnte eine Werkstatt Hunderte Kopien drucken. Ideen begannen, sich schnell zu verbreiten.", "Devor het en Schriiber es Jahr für es Buech bruucht. Mit bewegliche Buechstabe het e Wärkstatt Hunderti Kopie chöne drucke. Ideene händ aagfange, sich gschwind z verbreite."],
  ["willow bark", "Weidenrinde", "Weideriinde"], ["Weak heart", "Schwaches Herz", "Schwachs Härz"],
  ["Too little: the medicine does nothing.", "Zu wenig: Die Medizin bewirkt nichts.", "Z wenig: D Medizin macht nüt."],
  ["Too much! Poison! \"The dose makes the poison.\"", "Zu viel! Gift! \"Die Dosis macht das Gift.\"", "Z vill! Gift! \"D Dosis macht s Gift.\""],
  ["THE DOSE MAKES THE POISON", "DIE DOSIS MACHT DAS GIFT", "D DOSIS MACHT S GIFT"],
  ["Patient {0}/3: {1}", "Patient {0}/3: {1}", "Patient {0}/3: {1}"], ["right dose", "richtige Dosis", "richtigi Dosis"],
  ["Hold [A] to add drops, release to give the dose.", "Halte [A], um Tropfen hinzuzufügen, lass los, um die Dosis zu geben.", "Halt [A], zum Tropfe zuefüege, lah los, zum d Dosis gäh."],
  ["✓ The patient feels better!", "✓ Dem Patienten geht es besser!", "✓ Em Patient gahts besser!"],
  ["[A]: next patient", "[A]: nächster Patient", "[A]: nächschte Patient"],
  ["Good doctor! ⚗️", "Guter Arzt! ⚗️", "Guete Arzt! ⚗️"],
  ["Paracelsus wrote: \"Everything is poison, and nothing is without poison; only the dose makes a thing not a poison.\"", "Paracelsus schrieb: \"Alle Dinge sind Gift, und nichts ist ohne Gift; allein die Dosis macht, dass ein Ding kein Gift ist.\"", "De Paracelsus het gschribe: \"Alli Dinge sind Gift, und nüt isch ohni Gift; elei d Dosis macht, dass es Ding kei Gift isch.\""],
  ["SKETCHING THE PLAN OF ST. GALL", "DEN ST. GALLER KLOSTERPLAN SKIZZIEREN", "DE ST. GALLER CHLOSTERPLAN SKIZZIERE"],
  ["Hold [A] to sketch. When the librarian turns around, let go and freeze!", "Halte [A], um zu skizzieren. Wenn sich der Bibliothekar umdreht, lass los und erstarre!", "Halt [A], zum skizziere. Wenn sich de Bibliothekar umdrääjt, lah los und erstarr!"],
  ["Ahem! 🤫", "Ähem! 🤫", "Ähem! 🤫"],
  ["Drawn around 820: an ideal monastery with church, library, hospital, gardens and even a brewery. It is the only architectural drawing from the early Middle Ages that survives.", "Um 820 gezeichnet: ein ideales Kloster mit Kirche, Bibliothek, Spital, Gärten und sogar einer Brauerei. Es ist die einzige erhaltene Architekturzeichnung aus dem frühen Mittelalter.", "Um 820 zeichnet: es ideals Chloschter mit Chile, Bibliothek, Spital, Gärte und sogar ere Bruerei. Es isch di einzig erhaltni Architekturzeichnig us em früeche Mittelalter."],
  // quizzes
  ["THE DEVIL'S BRIDGE", "DIE TEUFELSBRÜCKE", "D TÜFELSBRUGG"], ["You outsmarted the devil! 😈", "Du hast den Teufel überlistet! 😈", "Du hesch de Tüfel überlischtet! 😈"],
  ["Urner: \"We could not build a bridge across the gorge. So the devil offered: he builds it overnight, and gets the first soul to cross. What did we send over first?\"", "Urner: \"Wir konnten keine Brücke über die Schlucht bauen. Da bot der Teufel an: Er baut sie über Nacht und bekommt die erste Seele, die hinüber geht. Was haben wir zuerst hinübergeschickt?\"", "Urner: \"Mir hend kei Brugg über d Schlucht chöne boue. Do het de Tüfel aabote: Er boued si über Nacht und überchunnt di erscht Seel, wo drüber gaht. Was hend mir zerscht übere gschickt?\""],
  ["A goat", "Eine Geiss", "E Geiss"], ["The mayor", "Den Bürgermeister", "De Bürgermeischter"],
  ["Nobody wanted to pay THAT price! The clever Urners sent a goat.", "Niemand wollte DEN Preis zahlen! Die klugen Urner schickten eine Geiss.", "Niemer het dä Priis welle zahle! Di gschiide Urner händ e Geiss gschickt."],
  ["Nobody: the bridge stayed empty", "Niemanden: Die Brücke blieb leer", "Niemer: D Brugg isch läär bliibe"],
  ["Then the devil would simply keep his bridge. Better to send a goat.", "Dann hätte der Teufel seine Brücke einfach behalten. Besser, man schickt eine Geiss.", "Dänn hett de Tüfel sini Brugg eifach bhalte. Besser, me schickt e Geiss."],
  ["A goat! The devil was furious: he had hoped for a human soul.", "Eine Geiss! Der Teufel war wütend: Er hatte auf eine Menschenseele gehofft.", "E Geiss! De Tüfel isch wüetig gsi: Er het uf e Mänscheseel ghofft."],
  ["Why was the Gotthard route so important?", "Warum war die Gotthardroute so wichtig?", "Werum isch d Gotthardroute so wichtig gsi?"],
  ["It was the shortest trade route over the Alps between Germany and Italy", "Sie war der kürzeste Handelsweg über die Alpen zwischen Deutschland und Italien", "Si isch de chürzescht Handelswäg über d Alpe zwüsche Dütschland und Italie gsi"],
  ["It had the best ski slopes", "Sie hatte die besten Skipisten", "Si het di beschte Skipischte gha"], ["Skiing came centuries later!", "Skifahren kam erst Jahrhunderte später!", "S Skifahre isch erscht Jahrhundert spöter cho!"],
  ["It led to the sea", "Sie führte zum Meer", "Si het is Meer gfüehrt"], ["No sea here! But mules carried goods between north and south.", "Hier gibt es kein Meer! Aber Maultiere trugen Waren zwischen Norden und Süden.", "Da het s kei Meer! Aber Mulä händ Wäre zwüsche Norde und Süde treit."],
  ["The devil's bridge story is a...", "Die Geschichte der Teufelsbrücke ist ein(e)...", "D Gschicht vo de Tüfelsbrugg isch en/e..."],
  ["Eyewitness report", "Augenzeugenbericht", "Ougenzügebricht"], ["No: legends like this were told to explain the dangerous gorge.", "Nein: Solche Legenden erklärten die gefährliche Schlucht.", "Nei: Settigi Legände händ d gföhrlich Schlucht erklärt."],
  ["Roman law", "Römisches Gesetz", "Römischs Gsetz"], ["No, it is a folk tale from the Alps.", "Nein, es ist ein Volksmärchen aus den Alpen.", "Nei, es isch es Volksmärli us de Alpe."],
  ["THE RÜTLI OATH", "DER RÜTLISCHWUR", "DE RÜTLISCHWUR"], ["A true Confederate! 🇨🇭", "Ein echter Eidgenosse! 🇨🇭", "En ächte Eidgnoss! 🇨🇭"],
  ["Elder: \"In 1291 three regions promised each other mutual help. Which?\"", "Ältester: \"1291 versprachen sich drei Talschaften gegenseitige Hilfe. Welche?\"", "Eltischte: \"1291 händ sich drü Talschafte gägesiitigi Hilf versproche. Welli?\""],
  ["Uri, Schwyz and Unterwalden", "Uri, Schwyz und Unterwalden", "Uri, Schwyz und Unterwalde"], ["Zürich, Bern and Basel", "Zürich, Bern und Basel", "Züri, Bärn und Basel"],
  ["Those joined later: Zürich 1351, Bern 1353, Basel 1501.", "Diese kamen später dazu: Zürich 1351, Bern 1353, Basel 1501.", "Die sind spöter dezuecho: Züri 1351, Bärn 1353, Basel 1501."],
  ["Geneva, Vaud and Valais", "Genf, Waadt und Wallis", "Gäf, Waadt und Wallis"], ["Much later: Vaud 1803, Geneva and Valais 1815.", "Viel später: Waadt 1803, Genf und Wallis 1815.", "Vill spöter: Waadt 1803, Gäf und Wallis 1815."],
  ["What did they promise in the charter?", "Was versprachen sie im Bundesbrief?", "Was händ si im Bundesbrief versproche?"],
  ["To help each other against enemies and to accept no judges from outside", "Einander gegen Feinde zu helfen und keine fremden Richter anzunehmen", "Enand gäge Fiind z hälfe und kei fremdi Richter aznäh"],
  ["To found a state with a president", "Einen Staat mit einem Präsidenten zu gründen", "En Staat mit emne Presidänt z gründe"], ["Not yet a state: it was an alliance between valleys.", "Noch kein Staat: Es war ein Bündnis zwischen Tälern.", "No kei Staat: Es isch es Bündnis zwüsche Täler gsi."],
  ["To build a tunnel under the Gotthard", "Einen Tunnel unter dem Gotthard zu bauen", "En Tunnel under em Gotthard z boue"], ["The first Gotthard rail tunnel opened in 1882.", "Der erste Gotthard-Eisenbahntunnel wurde 1882 eröffnet.", "De erscht Gotthard-Isebahntunnel isch 1882 eröffnet worde."],
  ["The tale of the three men on the Rütli meadow is a...", "Die Geschichte der drei Männer auf der Rütliwiese ist eine...", "D Gschicht vo de drü Manne uf de Rütliwise isch e..."],
  ["Legend, first written down in the 15th century", "Legende, erstmals im 15. Jahrhundert aufgeschrieben", "Legände, zerscht im 15. Jahrhundert ufgschribe"], ["Report from 1291", "Bericht von 1291", "Bricht vo 1291"],
  ["The charter is real, but the Rütli oath story appears 150+ years later.", "Der Bundesbrief ist echt, aber die Geschichte vom Rütlischwur taucht über 150 Jahre später auf.", "De Bundesbrief isch ächt, aber d Gschicht vom Rütlischwur taucht über 150 Jahr spöter uf."],
  ["Roman myth", "Römischer Mythos", "Römische Mythos"], ["No: it is a Swiss founding legend.", "Nein: Es ist eine Schweizer Gründungslegende.", "Nei: Es isch e Schwiizer Gründigslegände."],
  ["When is the Swiss National Day?", "Wann ist der Schweizer Nationalfeiertag?", "Wänn isch de Schwiizer Nationalfiirtag?"],
  ["Morgarten was fought on 15 November 1315.", "Die Schlacht am Morgarten fand am 15. November 1315 statt.", "D Schlacht am Morgarte isch am 15. November 1315 gsi."],
  ["That is New Year's Eve!", "Das ist Silvester!", "Das isch Silvester!"],
  ["THE BLACK DEATH", "DER SCHWARZE TOD", "DE SCHWARZ TOD"], ["You know your plague! 🐀", "Du kennst dich mit der Pest aus! 🐀", "Du kännsch di mit de Pescht uus! 🐀"],
  ["Doctor: \"People think it is bad air. My beak is full of herbs against it. What really caused the plague?\"", "Arzt: \"Die Leute glauben, es sei schlechte Luft. Mein Schnabel ist voller Kräuter dagegen. Was hat die Pest wirklich verursacht?\"", "Arzt: \"D Lüüt gloubed, es sig schlächti Luft. Min Schnabel isch voll Chrüüter dergäge. Was het d Pescht würkli verursacht?\""],
  ["A bacterium spread by fleas on rats", "Ein Bakterium, das Flöhe auf Ratten übertrugen", "E Bakterie, wo Flöh uf Ratte überträge händ"], ["Bad air (miasma)", "Schlechte Luft (Miasma)", "Schlächti Luft (Miasma)"],
  ["That is what doctors believed then. The beak masks filled with herbs did not help.", "Das glaubten die Ärzte damals. Die mit Kräutern gefüllten Schnabelmasken halfen nicht.", "Das händ d Ärzt dazumal gloubt. D Schnabelmaske mit Chrüüter drin händ nöd ghulfe."],
  ["Witches' curses", "Hexenflüche", "Hexefluech"], ["No. Frightened people blamed others, and innocent people were attacked. That was terribly unjust.", "Nein. Verängstigte Menschen machten andere verantwortlich, und Unschuldige wurden angegriffen. Das war schreckliches Unrecht.", "Nei. Verängschtigti Mänsche händ anderi verantwortlich gmacht, und Unschuldigi sind aagriffe worde. Das isch schlimms Unrecht gsi."],
  ["Which measure actually helped?", "Welche Massnahme half tatsächlich?", "Weli Massnahm het tatsächlich ghulfe?"],
  ["Quarantine: ships and travellers waited about 40 days", "Quarantäne: Schiffe und Reisende warteten etwa 40 Tage", "Quarantäne: Schiff und Reisendi hend öppe 40 Täg gwartet"],
  ["It only weakened the sick.", "Es schwächte nur die Kranken.", "Es het nume d Chranke gschwächt."], ["Eating more pepper", "Mehr Pfeffer essen", "Meh Pfeffer ässe"],
  ["Spices were expensive, but did nothing against plague.", "Gewürze waren teuer, nützten aber nichts gegen die Pest.", "Gwürz isch tüür gsi, het aber nüt gäge d Pescht gnützt."],
  ["Right! \"Quaranta\" means forty: forty days of waiting.", "Richtig! \"Quaranta\" heisst vierzig: vierzig Tage Warten.", "Richtig! \"Quaranta\" heisst vierzg: vierzg Täg Warte."],
  ["How many Europeans died in the Black Death?", "Wie viele Europäer starben am Schwarzen Tod?", "Wie vill Europäer sind am Schwarze Tod gstorbe?"],
  ["About a third", "Etwa ein Drittel", "Öppe es Drittel"], ["Nearly everyone", "Fast alle", "Fascht alli"],
  ["It was terrible, but not everyone: about one in three.", "Es war schrecklich, aber nicht alle: etwa jeder Dritte.", "Es isch schlimm gsi, aber nöd alli: öppe jede Dritt."],
  ["About one in a hundred", "Etwa einer von hundert", "Öppe eine vo hundert"], ["Many more than that: about a third of all people.", "Viel mehr: etwa ein Drittel aller Menschen.", "Vill meh: öppe es Drittel vo allne Mänsche."],
  ["FROBEN'S PRINTING SHOP", "FROBENS DRUCKEREI", "FROBEN SINI DRUCKEREI"], ["A true humanist! 📚", "Ein echter Humanist! 📚", "En ächte Humanischt! 📚"],
  ["Erasmus: \"In 1516 Froben printed my Greek New Testament in Basel. Why was printing so revolutionary?\"", "Erasmus: \"1516 druckte Froben in Basel mein griechisches Neues Testament. Warum war der Buchdruck so revolutionär?\"", "Erasmus: \"1516 het de Froben z Basel mis griechische Nöi Testamänt druckt. Werum isch de Buechdruck so revolutionär gsi?\""],
  ["Books became cheaper, so far more people could read the same ideas", "Bücher wurden billiger, sodass viel mehr Menschen dieselben Ideen lesen konnten", "Büecher sind billiger worde, so dass vill meh Mänsche di glychi Ideene händ chöne läse"],
  ["Books became smaller", "Bücher wurden kleiner", "Büecher sind chliiner worde"], ["Size had nothing to do with it: price and copies did.", "Die Grösse hatte nichts damit zu tun: Preis und Auflage schon.", "D Grössi het nüt dermit z tue gha: Priis und Uflag scho."],
  ["Nobody had to read any more", "Niemand musste mehr lesen", "Niemer het meh müese läse"], ["The opposite: more people than ever learned to read.", "Das Gegenteil: Mehr Menschen als je zuvor lernten lesen.", "S Gägeteil: Meh Mänsche als je händ glehrt läse."],
  ["Who painted the famous portrait of Erasmus in Basel?", "Wer malte das berühmte Porträt von Erasmus in Basel?", "Wer het s berüehmt Porträt vom Erasmus z Basel gmalt?"],
  ["Hans Holbein the Younger", "Hans Holbein der Jüngere", "De Hans Holbein de Jünger"], ["Albrecht Dürer", "Albrecht Dürer", "De Albrecht Dürer"],
  ["Dürer did draw Erasmus once, but the famous Basel portrait is by Holbein.", "Dürer zeichnete Erasmus einmal, aber das berühmte Basler Porträt stammt von Holbein.", "De Dürer het de Erasmus emal zeichnet, aber s berüehmt Basler Porträt isch vom Holbein."],
  ["Leonardo lived in Italy and France.", "Leonardo lebte in Italien und Frankreich.", "De Leonardo het i Italie und Frankriich gläbt."],
  ["What does \"Renaissance\" mean?", "Was bedeutet \"Renaissance\"?", "Was heisst \"Renaissance\"?"],
  ["Close in sound, but it means \"rebirth\": the rebirth of ancient ideas.", "Klingt ähnlich, bedeutet aber \"Wiedergeburt\": die Wiedergeburt antiker Ideen.", "Tönt ähnlich, heisst aber \"Widergburt\": d Widergburt vo antike Ideene."],
  ["That is a different movement, about the Church.", "Das ist eine andere Bewegung, die sich um die Kirche dreht.", "Das isch e anderi Bewegig, wo um d Chile gaht."],
  ["LENT IN ZÜRICH, 1522", "FASTENZEIT IN ZÜRICH, 1522", "FASTEZIIT Z ZÜRI, 1522"], ["The Reformation in Zürich! 🌭", "Die Reformation in Zürich! 🌭", "D Reformation z Züri! 🌭"],
  ["Froschauer: \"My workers were hungry, so I served sausages. What was the scandal?\"", "Froschauer: \"Meine Arbeiter hatten Hunger, also gab ich ihnen Würste. Was war der Skandal?\"", "Froschauer: \"Mini Arbeiter händ Hunger gha, also han i ine Würscht ggä. Was isch de Skandal gsi?\""],
  ["It was Lent: the Church forbade eating meat", "Es war Fastenzeit: Die Kirche verbot Fleischessen", "Es isch Fastezit gsi: D Chile het s Fleischässe verbotte"], ["Sausages were illegal in Zürich", "Würste waren in Zürich verboten", "Würscht sind z Züri verbotte gsi"],
  ["No law against sausages: it was about fasting in Lent.", "Kein Gesetz gegen Würste: Es ging ums Fasten in der Fastenzeit.", "Kei Gsetz gäge Würscht: Es isch ums Faschte i de Fastezit gange."],
  ["The sausages were stolen", "Die Würste waren gestohlen", "D Würscht sind gstohle gsi"], ["Not stolen: they were simply eaten at the wrong time of year.", "Nicht gestohlen: Sie wurden einfach zur falschen Zeit des Jahres gegessen.", "Nöd gstohle: Si sind eifach zur falsche Ziit im Jahr gässe worde."],
  ["How did Zwingli defend them?", "Wie verteidigte Zwingli sie?", "Wie het de Zwingli si verteidigt?"],
  ["The Bible, not church rules, should decide", "Die Bibel, nicht Kirchenregeln, sollte entscheiden", "D Bible, nöd d Chirchereglä, söll entscheide"], ["The Pope had allowed it", "Der Papst hatte es erlaubt", "De Papscht het s erlaubt gha"],
  ["No: Zwingli argued with the Bible against the Pope's rules.", "Nein: Zwingli argumentierte mit der Bibel gegen die Regeln des Papstes.", "Nei: De Zwingli het mit de Bible gäg d Regle vom Papscht argumentiert."],
  ["Sausages are not meat", "Würste sind kein Fleisch", "Würscht sind kei Fleisch"], ["They are meat! The argument was about the authority of the Bible.", "Sie sind Fleisch! Es ging im Streit um die Autorität der Bibel.", "Si sind Fleisch! Im Striit isch es um d Autorität vo de Bible gange."],
  ["Which monk started the Reformation in Germany in 1517?", "Welcher Mönch löste 1517 die Reformation in Deutschland aus?", "Weli Mönch het 1517 d Reformation i Dütschland usglöst?"],
  ["Martin Luther", "Martin Luther", "De Martin Luther"], ["Jan Hus", "Jan Hus", "De Jan Hus"], ["Hus was burned in 1415, a century earlier.", "Hus wurde 1415 verbrannt, ein Jahrhundert früher.", "De Hus isch 1415 verbrännt worde, es Jahrhundert früener."],
  ["Gallus lived in the 7th century!", "Gallus lebte im 7. Jahrhundert!", "De Gallus het im 7. Jahrhundert gläbt!"],
  ["MARIGNANO, 1515", "MARIGNANO, 1515", "MARIGNANO, 1515"], ["You understand the lesson! 💥", "Du hast die Lektion verstanden! 💥", "Du hesch d Lektion verstande! 💥"],
  ["Sarah warned the mercenaries in vain. After two days at Marignano, what happened?", "Sarah warnte die Söldner vergeblich. Was geschah nach zwei Tagen bei Marignano?", "D Sarah het d Söldner vergäbe gwarnet. Was isch nach zwei Täg bi Marignano passiert?"],
  ["The Swiss lost against the French king's cannons", "Die Schweizer verloren gegen die Kanonen des französischen Königs", "D Schwiizer händ gäge d Kanone vom französische König verlore"], ["The Swiss won easily", "Die Schweizer gewannen mühelos", "D Schwiizer händ ohni Müeh gwunne"],
  ["No: pikemen in open fields were no match for cannons and cavalry.", "Nein: Pikeniere auf offenem Feld waren Kanonen und Reiterei nicht gewachsen.", "Nei: Pikeniere uf offenem Fäld sind Kanone und Reiterei nöd gwachse gsi."],
  ["Nobody fought: it rained", "Niemand kämpfte: Es regnete", "Niemer het gchämpft: Es het gregnet"], ["There was a real battle: it lasted two days.", "Es gab eine echte Schlacht: Sie dauerte zwei Tage.", "Es het e ächti Schlacht ggä: Si het zwei Täg duuret."],
  ["What did the Confederation learn from Marignano?", "Was lernte die Eidgenossenschaft aus Marignano?", "Was het d Eidgnosseschaft us Marignano glehrt?"],
  ["Stop expanding into Italy: a root of Swiss neutrality", "Nicht mehr nach Italien auszudehnen: eine Wurzel der Schweizer Neutralität", "Nüme uf Italie uszdehne: e Wurzle vo de Schwiizer Neutralität"],
  ["Build more cannons", "Mehr Kanonen bauen", "Meh Kanone boue"], ["It stayed out of foreign wars instead.", "Sie hielt sich stattdessen aus fremden Kriegen heraus.", "Si het sich stattdesse us fremde Chriege useghalte."],
  ["Hire French generals", "Französische Generäle anheuern", "Französischi Generäl aaheure"], ["Swiss troops still fought as mercenaries, but the state stopped expanding.", "Schweizer Truppen kämpften weiter als Söldner, aber der Staat dehnte sich nicht mehr aus.", "Schwiizer Truppe händ wiiter als Söldner gchämpft, aber de Staat het sich nüme usdehnt."],
  ["Since 1506 Swiss soldiers have guarded...", "Seit 1506 bewachen Schweizer Soldaten...", "Sit 1506 bewached Schwiizer Soldate..."],
  ["The Pope", "Den Papst", "De Papscht"], ["The King of France", "Den König von Frankreich", "De König vo Frankriich"], ["France hired Swiss troops, but the famous guard serves the Pope.", "Frankreich heuerte Schweizer Truppen an, aber die berühmte Garde dient dem Papst.", "Frankriich het Schwiizer Truppe aaghüret, aber di berüehmt Garde dient em Papscht."],
  ["The Emperor in Vienna", "Den Kaiser in Wien", "De Kaiser z Wien"], ["No: the famous guard serves the Pope in Rome.", "Nein: Die berühmte Garde dient dem Papst in Rom.", "Nei: Di berüehmt Garde dient em Papscht z Rom."],
  ["Everything done! The Chronicler's exam awaits in Froben's printing shop in Basel. 📝", "Alles erledigt! Die Chronisten-Prüfung wartet in Frobens Druckerei in Basel. 📝", "Alles gmacht! D Chronischte-Prüefig wartet i de Froben sinere Druckerei z Basel. 📝"],
  // break-ins
  ["The Palatine Chapel, Aachen", "Die Pfalzkapelle, Aachen", "D Pfalzkapälle, Aache"], ["Palace guard", "Pfalzwache", "Pfalzwach"],
  ["Halt! Nobody enters the emperor's chapel without permission!", "Halt! Niemand betritt die Kapelle des Kaisers ohne Erlaubnis!", "Halt! Niemer betritt d Chapälle vom Kaiser ohni Erlaubnis!"],
  ["The Palatine Chapel! An octagon with a dome, modelled on San Vitale in Ravenna. ✏️", "Die Pfalzkapelle! Ein Achteck mit Kuppel, nach dem Vorbild von San Vitale in Ravenna. ✏️", "D Pfalzkapälle! Es Achtegg mit Chupple, nach em Vorbild vo San Vitale z Ravenna. ✏️"],
  ["Around 800 Charlemagne wanted a new Rome in the North. The chapel shows it: marble from Italy, a gold-covered dome, and his throne in the gallery.", "Um 800 wollte Karl der Grosse ein neues Rom im Norden. Die Kapelle zeigt es: Marmor aus Italien, eine goldverzierte Kuppel und sein Thron auf der Empore.", "Um 800 het de Karl de Gross es nöis Rom im Norde welle. D Chapälle zeigts: Marmor us Italie, e goldverzierti Chupple und sin Thron uf de Empore."],
  ["Ravenna again! History does like to repeat itself. Now out of here...", "Schon wieder Ravenna! Die Geschichte wiederholt sich gern. Jetzt nichts wie raus hier...", "Scho wieder Ravenna! D Gschicht wiederholt sich gärn. Jetzt nüt wie use da..."],
  ["Savoyard guard", "Savoyer Wache", "Savoyer Wach"], ["Halt! Count Peter does not receive visitors at night!", "Halt! Graf Peter empfängt nachts keine Besucher!", "Halt! De Graf Peter empfangt znacht kei Bsuecher!"],
  ["Chillon! A castle on a rock in Lake Geneva. ✏️", "Chillon! Eine Burg auf einem Fels im Genfersee. ✏️", "Chillon! E Burg uf emne Fels im Gfersee. ✏️"],
  ["The Counts of Savoy built it to control the road along the lake. Thick towers, a Gothic hall and a rock foundation that you can still see inside.", "Die Grafen von Savoyen bauten sie, um die Strasse am See zu kontrollieren. Dicke Türme, ein gotischer Saal und ein Felsfundament, das man innen noch sieht.", "D Grafe vo Savoye händ si baut, zum d Strass am See z kontrolliere. Dicki Türm, en gotische Saal und es Felsfundamänt, wo me inne no gseht."],
  ["Let us leave before the count wakes up...", "Gehen wir, bevor der Graf aufwacht...", "Gömmer, bevor de Graf verwachet..."],
  ["The Kapellbrücke, by night", "Die Kapellbrücke bei Nacht", "D Chapällbrugg znacht"], ["Night watchman", "Nachtwächter", "Nachtwächter"],
  ["Halt! The bridge is closed after dark! (And I have a lantern.)", "Halt! Die Brücke ist nach Einbruch der Dunkelheit gesperrt! (Und ich habe eine Laterne.)", "Halt! D Brugg isch nach em Ischnacht gsperrt! (Und ich ha e Laterne.)"],
  ["The Kapellbrücke at night! A covered wooden bridge with a stone water tower. ✏️", "Die Kapellbrücke bei Nacht! Eine gedeckte Holzbrücke mit steinernem Wasserturm. ✏️", "D Chapällbrugg znacht! E gedeckti Holzbrugg mit steinerem Wasserturm. ✏️"],
  ["Built around 1333 as part of the city defences, it zigzags across the Reuss. The painted triangles in the roof came 300 years later.", "Um 1333 als Teil der Stadtbefestigung gebaut, führt sie im Zickzack über die Reuss. Die bemalten Dreiecke im Dach kamen 300 Jahre später.", "Um 1333 als Teil vo de Stadtbefestigig baut, füehrt si im Zickzack über d Reuss. D bemalte Dreiegg im Dach sind 300 Jahr spöter cho."],
  ["Part bridge, part wall, part picture gallery. Now to sneak off the bridge...", "Teils Brücke, teils Mauer, teils Bildergalerie. Jetzt schnell von der Brücke schleichen...", "Teils Brugg, teils Muur, teils Bildergalerie. Jetzt schnäll vo de Brugg abeschliiche..."],
  ["The Fuggerei, Augsburg", "Die Fuggerei, Augsburg", "D Fuggerei, Augsburg"], ["Fuggerei watchman", "Fuggerei-Wächter", "Fuggerei-Wächter"],
  ["Halt! The gates close at ten o'clock! Residents only!", "Halt! Die Tore schliessen um zehn Uhr! Nur für Bewohner!", "Halt! D Tor gönd am zäh Uhr zue! Nume für Bewohner!"],
  ["The Fuggerei: little houses around quiet lanes. ✏️", "Die Fuggerei: kleine Häuser an ruhigen Gassen. ✏️", "D Fuggerei: chlini Hüser a ruhige Gasse. ✏️"],
  ["Founded in 1521 by Jakob Fugger for poor citizens: the oldest social housing complex still in use. The rent is still one Rhenish guilder per year, plus three prayers a day.", "1521 von Jakob Fugger für arme Bürger gegründet: die älteste noch genutzte Sozialsiedlung. Die Miete beträgt noch immer einen Rheinischen Gulden pro Jahr plus drei Gebete am Tag.", "1521 vom Jakob Fugger für armi Bürger gründet: di eltischt no gnutzti Sozialsiedlig. D Miet isch immer no en Rhiinische Gulde pro Jahr plus drü Gebätt am Tag."],
  ["Social housing with a gate and prayers. Architecture AND a good deed. Out we go...", "Sozialer Wohnbau mit Tor und Gebeten. Architektur UND eine gute Tat. Nichts wie raus...", "Sozialer Wohnbau mit Tor und Gebätt. Architektur UND e guet Tat. Nüt wie use..."],
  // talks and wins
  ["A neat woodpile! The bear is very pleased. 🐻", "Ein ordentlicher Holzstapel! Der Bär ist sehr zufrieden. 🐻", "En ordentliche Holzbygi! De Bär isch sehr zfriede. 🐻"],
  ["Is it really true that a bear helped Gallus?", "Stimmt es wirklich, dass ein Bär Gallus geholfen hat?", "Stimmt s würkli, dass en Bär em Gallus ghulfe het?"],
  ["Legend says so. Gallus gave it bread in return. The real Gallus lived around 612, and his little cell grew into the Abbey of St. Gallen.", "Die Legende sagt es. Gallus gab ihm dafür Brot. Der echte Gallus lebte um 612, und aus seiner kleinen Zelle wuchs das Kloster St. Gallen.", "D Legände seits. De Gallus het em derfür Brot ggä. De ächt Gallus het um 612 gläbt, und us siner chliine Zälle isch s Chloschter St. Galle gwachse."],
  ["Splendid! Clear words, clear letters. This is the new script of King Charles: the Carolingian minuscule.", "Prächtig! Klare Wörter, klare Buchstaben. Das ist die neue Schrift König Karls: die karolingische Minuskel.", "Prächtig! Klari Wörter, klari Buechstabe. Das isch di nöi Schrift vom König Karl: d karolingisch Minuskel."],
  ["People will still write with those little letters in a thousand years.", "Man wird noch in tausend Jahren mit diesen kleinen Buchstaben schreiben.", "Mä wird no i tuusig Jahr mit dene chliine Buechstabe schriibe."],
  ["Lowercase letters! Thank you, Alcuin.", "Kleinbuchstaben! Danke, Alkuin.", "Chliibuechstabe! Merci, Alkuin."],
  ["The devil never got his soul, and the Gotthard stayed open for trade. Not bad for a goat!", "Der Teufel bekam seine Seele nie, und der Gotthard blieb für den Handel offen. Nicht schlecht für eine Geiss!", "De Tüfel het sini Seel nie übercho, und de Gotthard isch für de Handel offe bliibe. Nöd schlächt für e Geiss!"],
  ["Around 1230 the pass became the shortest route between Germany and Italy. Uri grew rich from tolls and porters.", "Um 1230 wurde der Pass zur kürzesten Verbindung zwischen Deutschland und Italien. Uri wurde reich durch Zölle und Säumer.", "Um 1230 isch de Pass zur chürzeschte Verbindig zwüsche Dütschland und Italie worde. Uri isch riich worde dur Zöll und Säumer."],
  ["Hmpf! A fine shot... Guards, let them go. (This was NOT in the script.)", "Hmpf! Ein feiner Schuss... Wachen, lasst sie gehen. (Das stand NICHT im Drehbuch.)", "Hmpf! En fine Schuss... Wache, laht si gah. (Das isch NÖD im Drehbuech gschtande.)"],
  ["You shot an apple off my head. Never again, please.", "Du hast mir einen Apfel vom Kopf geschossen. Bitte nie wieder.", "Du hesch mer en Öpfel vom Chopf gschosse. Bitte nie meh."],
  ["Never again. Promise. And remember: Tell is a legend, first written down around 1470.", "Nie wieder. Versprochen. Und denk dran: Tell ist eine Legende, erstmals um 1470 aufgeschrieben.", "Nie meh. Versproche. Und dänk draa: De Täll isch e Legände, zerscht um 1470 ufgschribe."],
  ["So it is sworn: help for each other, and no foreign judges!", "So ist es geschworen: Hilfe füreinander und keine fremden Richter!", "So isch s gschwore: Hilf füreinand und kei fremdi Richter!"],
  ["The real charter dates from early August 1291, a Latin parchment kept in Schwyz. The tale of the Rütli is a later legend.", "Der echte Bundesbrief stammt von Anfang August 1291, ein lateinisches Pergament, das in Schwyz aufbewahrt wird. Die Geschichte vom Rütli ist eine spätere Legende.", "De ächt Bundesbrief stammt vo Aafang Auguscht 1291, es latiinisch Pergamänt, wo z Schwyz ufbewahrt wird. D Gschicht vom Rütli isch e spöteri Legände."],
  ["The Habsburg knights could not turn around in the narrow pass. The Confederates won at Morgarten!", "Die Habsburger Ritter konnten im engen Pass nicht wenden. Die Eidgenossen siegten am Morgarten!", "D Habsburger Ritter hend im ängä Pass nöd chönne wände. D Eidgnosse händ am Morgarte gsiegt!"],
  ["With rocks and logs?", "Mit Steinen und Baumstämmen?", "Mit Stei und Boumstämm?"],
  ["So tradition says. A month later, in December 1315, they renewed their alliance at Brunnen.", "So sagt es die Überlieferung. Einen Monat später, im Dezember 1315, erneuerten sie ihr Bündnis in Brunnen.", "So seit s d Überlieferig. En Monet spöter, im Dezämber 1315, händ si ires Bündnis z Brunne erneueret."],
  ["Our first page! Letter by letter, and all of it backwards. Johann Fust is going to love this.", "Unsere erste Seite! Buchstabe für Buchstabe, und alles verkehrt herum. Johann Fust wird das lieben.", "Üsi erscht Siite! Buechstabe für Buechstabe, und alles verchehrt ume. De Johann Fust wird das liebe."],
  ["A hundred copies by Easter? I will bring the money.", "Hundert Kopien bis Ostern? Ich bringe das Geld.", "Hundert Kopie bis Oschtere? Ich bringe s Gäld."],
  ["Around 1455 my Bible will come off this press: 42 lines to the page.", "Um 1455 wird meine Bibel von dieser Presse kommen: 42 Zeilen pro Seite.", "Um 1455 chunnt mini Bible vo dere Presse: 42 Ziile pro Siite."],
  ["You and the mule made it to the hospice! Welcome to the Gotthard club.", "Du und das Maultier habt es zum Hospiz geschafft! Willkommen im Gotthard-Club.", "Du und s Muli händ s zum Hospiz gschafft! Willkomme im Gotthard-Club."],
  ["How much does a mule carry?", "Wie viel trägt ein Maultier?", "Wie vill trait es Muli?"],
  ["About a hundred kilos. And it complains far less than a human.", "Etwa hundert Kilo. Und es beschwert sich viel weniger als ein Mensch.", "Öppe hundert Kilo. Und es beklagt sich vill weniger als en Mänsch."],
  ["Remember: wash, wait and keep your distance. The old ways are not enough.", "Denk daran: waschen, warten und Abstand halten. Die alten Wege reichen nicht.", "Dänk draa: wäsche, warte und Abstand ha. Di alte Wäg längid nöd."],
  ["The plague returned again and again. And in 1356 an earthquake flattened Basel. This century was not easy.", "Die Pest kehrte immer wieder zurück. Und 1356 legte ein Erdbeben Basel in Schutt. Dieses Jahrhundert war nicht einfach.", "D Pescht isch immer wieder cho. Und 1356 het es Ärdbebe Basel zerstört. Das Jahrhundert isch nöd eifach gsi."],
  ["*gasps* Victory at Murten! Charles the Bold is beaten!", "*keucht* Sieg bei Murten! Karl der Kühne ist geschlagen!", "*schnuufet* Sieg bi Murte! De Karl de Chüen isch gschlage!"],
  ["Legend says the messenger carried a linden branch to Fribourg. Today a 17 km race remembers him.", "Der Legende nach trug der Bote einen Lindenzweig nach Freiburg. Heute erinnert ein 17-km-Lauf an ihn.", "D Legände seit, de Bote heig en Lindezwiig uf Fribourg treit. Hüt erinneret en 17-km-Lauf a ihn."],
  ["Everything is poison, and nothing is without poison. Only the dose makes it right.", "Alles ist Gift, und nichts ist ohne Gift. Nur die Dosis macht es richtig.", "Alles isch Gift, und nüt isch ohni Gift. Nume d Dosis macht s richtig."],
  ["That is why every medicine has a dosage on it!", "Darum steht auf jeder Medizin eine Dosierung!", "Drum staht uf jedere Medizin e Dosierig!"],
  ["And in 1543 a doctor from Brussels will print the first modern anatomy book right here in Basel: Vesalius.", "Und 1543 wird ein Arzt aus Brüssel genau hier in Basel das erste moderne Anatomiebuch drucken: Vesalius.", "Und 1543 wird en Arzt us Brüssel grad da z Basel s erscht moderne Anatomiebuech drucke: de Vesalius."],
  ["Books are the best way to spread ideas. And printers are excellent company.", "Bücher sind der beste Weg, Ideen zu verbreiten. Und Drucker sind eine hervorragende Gesellschaft.", "Büecher sind de beschti Wäg, Ideene z verbreite. Und Drucker sind e prima Gsellschaft."],
  ["My friend Holbein painted my portrait last year. He makes everyone look intelligent.", "Mein Freund Holbein hat letztes Jahr mein Porträt gemalt. Er lässt jeden intelligent aussehen.", "Min Fründ Holbein het letscht Jahr mis Porträt gmalt. Er lat jede intelligänt usgseh."],
  ["The Bible alone is the measure. Zürich will change.", "Allein die Bibel ist das Mass. Zürich wird sich ändern.", "Elei d Bible isch s Mass. Züri wird sich ändere."],
  ["A few months earlier, in Wittenberg, Luther had started the Reformation by criticising the sale of indulgences.", "Wenige Monate zuvor hatte Luther in Wittenberg die Reformation begonnen, indem er den Ablasshandel kritisierte.", "Wenigi Monet vorhär het de Luther z Wittenberg d Reformation aagfange, indem er de Ablasshandel kritisiert het."],
  ["We lost. Time to go home and keep out of foreign wars.", "Wir haben verloren. Zeit, nach Hause zu gehen und sich aus fremden Kriegen herauszuhalten.", "Mir händ verlore. Ziit, hei z gah und sich us fremde Chriege useznäh."],
  ["Swiss soldiers still served abroad for centuries. Since 1506 the Pope's own guard has been Swiss.", "Schweizer Soldaten dienten noch Jahrhunderte im Ausland. Seit 1506 ist die Garde des Papstes schweizerisch.", "Schwiizer Soldate händ no Jahrhundert im Usland dient. Sit 1506 isch d Garde vom Papscht schwiizerisch."],
  ["Cheers! I never thought I would eat with a Zürcher.", "Zum Wohl! Ich hätte nie gedacht, dass ich mit einem Zürcher esse.", "Zum Wohl! Ich hett nie dänkt, dass ich mit emne Züri ässe."],
  ["This soup tastes better than war.", "Diese Suppe schmeckt besser als Krieg.", "Die Suppe schmöckt besser als Chrieg."],
  ["In 1531 war did break out and Zwingli fell. But for one afternoon in 1529, soup beat swords.", "1531 brach der Krieg doch aus, und Zwingli fiel. Aber für einen Nachmittag im Jahr 1529 schlug die Suppe die Schwerter.", "1531 isch dä Chrieg doch usbroche, und de Zwingli isch gfalle. Aber für en Namittag im Jahr 1529 het d Suppe d Schwärter gschlage."],
  ["Got it! The Plan of St. Gall. ✏️", "Geschafft! Der St. Galler Klosterplan. ✏️", "Gschafft! De St. Galler Chlosterplan. ✏️"],
  ["An ideal monastery on five sheets of parchment: church, library, hospital, gardens and even a brewery.", "Ein ideales Kloster auf fünf Pergamentbögen: Kirche, Bibliothek, Spital, Gärten und sogar eine Brauerei.", "Es ideals Chloschter uf föif Pergamäntböge: Chile, Bibliothek, Spital, Gärte und sogar e Bruerei."],
  ["Sarah! Behold: Gallus, Irish monk. Brown cowl, walking staff... and a very polite bear.", "Sarah! Sieh her: Gallus, irischer Mönch. Braune Kutte, Wanderstab... und ein sehr höflicher Bär.", "Sarah! Lueg: Gallus, irische Mönch. Brunni Chutte, Wanderstab... und en sehr höflichä Bär."],
  ["Gallus? The founder of St. Gallen?", "Gallus? Der Gründer von St. Gallen?", "Gallus? De Gründer vo St. Galle?"],
  ["Exactly! It is the year 612, and I am about to settle in these woods. The monks here will one day keep one of the greatest libraries in Europe.", "Genau! Es ist das Jahr 612, und ich werde mich bald in diesen Wäldern niederlassen. Die Mönche hier werden einst eine der grössten Bibliotheken Europas hüten.", "Genau! Es isch s Jahr 612, und ich lah mich bald i dene Wälder nider. D Mönch da wärded emal eini vo de gröschte Bibliotheke vo Europa hüete."],
  ["The portal stone in the south-east wakes up once we understand this era: help the bear, learn to copy books, and sketch the Plan of St. Gall and the Palatine Chapel at Aachen.", "Der Portalstein im Südosten erwacht, sobald wir diese Epoche verstanden haben: Hilf dem Bären, lerne Bücher abzuschreiben und skizziere den St. Galler Klosterplan und die Pfalzkapelle in Aachen.", "De Portalstei im Südoschte erwachet, sobald mir die Epoche verstande hend: Hilf em Bär, lern Büecher abschriibe und skizzier de St. Galler Chlosterplan und d Pfalzkapälle z Aache."],
  ["Sarah! Minstrel Johannes Hadlaub, at your service. Lute, feathered cap, tragic love songs.", "Sarah! Minnesänger Johannes Hadlaub, zu Diensten. Laute, Federhut, tragische Liebeslieder.", "Sarah! Minnesänger Johannes Hadlaub, zu Dienscht. Laute, Federhuet, tragischi Liebeslieder."],
  ["You look very medieval. And slightly pleased with yourself.", "Du siehst sehr mittelalterlich aus. Und etwas zufrieden mit dir selbst.", "Du gsehsch sehr mittelalterlich uus. Und es bitzeli zfriede mit dir säuber."],
  ["The years 1230 to 1315: the Gotthard opens, the Habsburgs rise, three valleys swear an oath... and Switzerland begins. Legends included! I will tell you which are which.", "Die Jahre 1230 bis 1315: Der Gotthard öffnet sich, die Habsburger steigen auf, drei Täler schwören einen Eid... und die Schweiz beginnt. Legenden inklusive! Ich sage dir, welche welche sind.", "D Jahr 1230 bis 1315: De Gotthard goht uf, d Habsburger stiged uf, drü Täler schwöred en Eid... und d Schwiiz fangt aa. Legände inklusiv! Ich säg dir, weli weli sind."],
  ["To wake the portal stone in the east: outsmart the devil, take the apple shot, join the oath, join the ambush, and sketch Château de Chillon.", "Um den Portalstein im Osten zu wecken: Überliste den Teufel, wage den Apfelschuss, schwöre den Eid, mach beim Hinterhalt mit und skizziere Schloss Chillon.", "Zum de Portalstei im Oschte z wecke: Überlischte de Tüfel, wag de Öpfelschuss, schwör de Eid, mach bim Hinderhalt mit und skizzier s Schloss Chillon."],
  ["Sarah! Johannes Gutenberg, goldsmith from Mainz. My hands are full of ink and my pockets are full of debt.", "Sarah! Johannes Gutenberg, Goldschmied aus Mainz. Meine Hände sind voller Tinte und meine Taschen voller Schulden.", "Sarah! Johannes Gutenberg, Goldschmied us Mainz. Mini Händ sind voll Tinte und mini Täsche voll Schulde."],
  ["The printing guy! Letters made of metal!", "Der Drucker-Typ! Buchstaben aus Metall!", "De Drucker-Typ! Buechstabe us Metall!"],
  ["The years 1333 to 1481: the Black Death, war with Burgundy, the Council of Constance... and soon, books for everyone. Tour: Luzern, Basel, Mainz and the Gotthard road.", "Die Jahre 1333 bis 1481: der Schwarze Tod, Krieg mit Burgund, das Konzil von Konstanz... und bald Bücher für alle. Route: Luzern, Basel, Mainz und die Gotthardstrasse.", "D Jahr 1333 bis 1481: De Schwarz Tod, Chrieg mit Burgund, s Konzil vo Konschtanz... und bald Büecher für alli. Route: Luzärn, Basel, Mainz und d Gotthardstrass."],
  ["Quests: print, lead a mule over the Gotthard, learn about the plague, run the Murten messenger race, and sketch the Kapellbrücke at night.", "Aufgaben: drucken, ein Maultier über den Gotthard führen, etwas über die Pest lernen, den Murtener Botenlauf laufen und die Kapellbrücke nachts skizzieren.", "Ufgabe: drucke, es Muli über de Gotthard füehre, öppis über d Pescht lerne, de Murtener Botelauf laufe und d Chapällbrugg znacht skizziere."],
  ["Sarah! Theophrastus Bombastus von Hohenheim, called Paracelsus. Doctor, alchemist, big mouth.", "Sarah! Theophrastus Bombastus von Hohenheim, genannt Paracelsus. Arzt, Alchemist, grosse Klappe.", "Sarah! Theophrastus Bombastus von Hohenheim, gnännt Paracelsus. Arzt, Alchemischt, grossi Gosche."],
  ["Paracelsus, from Einsiedeln! The \"dose makes the poison\" man!", "Paracelsus aus Einsiedeln! Der \"Dosis macht das Gift\"-Mann!", "Paracelsus us Einsidle! De \"Dosis macht s Gift\"-Maa!"],
  ["The years 1494 to 1531: Renaissance, Reformation and a lot of printed arguments. Dürer crosses the Alps, Zwingli changes Zürich, and Swiss pikemen meet cannons.", "Die Jahre 1494 bis 1531: Renaissance, Reformation und viele gedruckte Streitschriften. Dürer überquert die Alpen, Zwingli verändert Zürich, und Schweizer Pikeniere treffen auf Kanonen.", "D Jahr 1494 bis 1531: Renaissance, Reformation und vill druckti Striitschrifte. De Dürer überquert d Alpe, de Zwingli veränderet Züri, und Schwiizer Pikeniere träffed uf Kanone."],
  ["Last era! The dose, Erasmus, the sausages, Marignano, the milk soup, and the Fuggerei. Then the exam in Basel.", "Letzte Epoche! Die Dosis, Erasmus, die Würste, Marignano, die Milchsuppe und die Fuggerei. Dann die Prüfung in Basel.", "Letschti Epoche! D Dosis, de Erasmus, d Würscht, Marignano, d Milchsuppe und d Fuggerei. Dänn d Prüefig z Basel."],
  // quest hints
  ["A bear near Gallus' cell needs help with firewood. Look in the Steinach forest in the west!", "Ein Bär bei Gallus' Zelle braucht Hilfe mit dem Feuerholz. Such im Steinachwald im Westen!", "En Bär bi de Zälle vom Gallus bruucht Hilf mit em Füürholz. Suech im Steinachwald im Weschte!"],
  ["The scriptorium of St. Gallen: Alcuin will teach you the new script. ✍️", "Das Skriptorium von St. Gallen: Alkuin bringt dir die neue Schrift bei. ✍️", "S Skriptorium vo St. Galle: De Alkuin lehrt di di nöi Schrift. ✍️"],
  ["The library next to the abbey keeps the Plan of St. Gall. Sketch it when the librarian is not looking!", "Die Bibliothek neben dem Kloster bewahrt den St. Galler Klosterplan. Skizziere ihn, wenn der Bibliothekar nicht hinschaut!", "D Bibliothek näbed em Chloschter het de St. Galler Chlosterplan. Skizzier en, wenn de Bibliothekar nöd häre luegt!"],
  ["Charlemagne's Palatine Chapel at Aachen, in the north-west. Palace guards... sneak in!", "Karls Pfalzkapelle in Aachen, im Nordwesten. Pfalzwachen... schleich dich ein!", "Em Karl sini Pfalzkapälle z Aache, im Nordweschte. Pfalzwache... schliich di ii!"],
  ["The Devil's Bridge in the Schöllenen gorge, in the south. 😈", "Die Teufelsbrücke in der Schöllenenschlucht, im Süden. 😈", "D Tüfelsbrugg i de Schöllenenschlucht, im Süde. 😈"],
  ["Altdorf: a hat on a pole and a very grumpy bailiff, near the lake. 🍎", "Altdorf: ein Hut auf einer Stange und ein sehr mürrischer Vogt, nahe am See. 🍎", "Altdorf: en Huet uf ere Stange und en sehr mürrische Vogt, nach am See. 🍎"],
  ["The Rütli meadow at the lake, south-west. Time to swear.", "Die Rütliwiese am See, im Südwesten. Zeit zu schwören.", "D Rütliwise am See, im Südweschte. Ziit zum schwöre."],
  ["Morgarten, in the east, beside the Ägerisee. Bring a good throwing arm.", "Morgarten, im Osten, am Ägerisee. Bring einen guten Wurfarm mit.", "Morgarte, im Oschte, am Ägerisee. Bring en gueten Wurfarm mit."],
  ["Château de Chillon, on Lake Geneva in the west. Savoyard guards... sneak in!", "Schloss Chillon, am Genfersee im Westen. Savoyer Wachen... schleich dich ein!", "S Schloss Chillon, am Gfersee im Weschte. Savoyer Wache... schliich di ii!"],
  ["Mainz, in the north-east: my printing shop!", "Mainz, im Nordosten: meine Druckerei!", "Mainz, im Nordoschte: mini Druckerei!"],
  ["The mule stable on the Gotthard road, south of Luzern. 🫏", "Der Maultierstall an der Gotthardstrasse, südlich von Luzern. 🫏", "De Mulistall a de Gotthardstrass, südlich vo Luzärn. 🫏"],
  ["The doctor at the Basel hospital, in the north-west. Mask on.", "Der Arzt im Basler Spital, im Nordwesten. Maske auf.", "De Arzt im Basler Spital, im Nordweschte. Maske uf."],
  ["The runner at the wall of Murten, in the west, needs fast legs.", "Der Läufer an der Mauer von Murten, im Westen, braucht schnelle Beine.", "De Läufer a de Muur vo Murte, im Weschte, bruucht schnelli Bei."],
  ["The Kapellbrücke in Luzern at night. Watchmen... sneak in!", "Die Kapellbrücke in Luzern bei Nacht. Wächter... schleich dich ein!", "D Chapällbrugg z Luzärn znacht. Wächter... schliich di ii!"],
  ["Paracelsus' apothecary in Basel. Bring a steady hand.", "Paracelsus' Apotheke in Basel. Bring eine ruhige Hand mit.", "S Paracelsus siner Apothek z Basel. Bring e ruhigi Hand mit."],
  ["Erasmus is at Froben's printing shop in Basel.", "Erasmus ist in Frobens Druckerei in Basel.", "De Erasmus isch i de Froben sinere Druckerei z Basel."],
  ["The printer Froschauer in Zürich has sausages and trouble.", "Der Drucker Froschauer in Zürich hat Würste und Ärger.", "De Drucker Froschauer z Züri het Würscht und Ärger."],
  ["The Swiss mercenary camp at Marignano, in the south-east.", "Das Schweizer Söldnerlager bei Marignano, im Südosten.", "S Schwiizer Söldnerlager bi Marignano, im Südoschte."],
  ["Kappel, in the south-east: two armies and a cauldron of milk soup. 🥣", "Kappel, im Südosten: zwei Heere und ein Kessel Milchsuppe. 🥣", "Kappel, im Südoschte: zwei Heer und en Chessel Milchsuppe. 🥣"],
  ["The Fuggerei in Augsburg, in the north. Mind the gate and the watchman.", "Die Fuggerei in Augsburg, im Norden. Achte auf das Tor und den Wächter.", "D Fuggerei z Augsburg, im Norde. Pass uf s Tor und de Wächter uf."],
  ["The portal stone is awake! It stands in the south-east, behind Müstair. ⏳", "Der Portalstein ist erwacht! Er steht im Südosten, hinter Müstair. ⏳", "De Portalstei isch erwachet! Er staht im Südoschte, hinder Müstair. ⏳"],
  ["The portal stone is awake! It is in the east, beyond Morgarten. ⏳", "Der Portalstein ist erwacht! Er ist im Osten, jenseits von Morgarten. ⏳", "De Portalstei isch erwachet! Er isch im Oschte, hinder em Morgarte. ⏳"],
  ["The portal stone is awake! It is in the south-east, near Constance. ⏳", "Der Portalstein ist erwacht! Er ist im Südosten, nahe Konstanz. ⏳", "De Portalstei isch erwachet! Er isch im Südoschte, nöch bi Konschtanz. ⏳"],
  ["A thousand years, one beautiful chronicle. Want to keep exploring? ⏳", "Tausend Jahre, eine schöne Chronik. Willst du weiter erkunden? ⏳", "Tuusig Jahr, e schöni Chronik. Wotsch wiiter erkunde? ⏳"],
  ["Have some apples. 🍎", "Nimm ein paar Äpfel. 🍎", "Nimm es paar Öpfel. 🍎"], ["Have some bread and cheese. 🧀", "Nimm etwas Brot und Käse. 🧀", "Nimm es bitzli Brot und Chäs. 🧀"], ["Have some Zürich sausages. 🌭", "Nimm ein paar Zürcher Würste. 🌭", "Nimm es paar Züri-Würscht. 🌭"],
  // NPC dialogue
  ["I am Othmar, abbot. In 719 I founded this monastery next to the cell of Gallus.", "Ich bin Othmar, der Abt. Im Jahr 719 gründete ich dieses Kloster neben der Zelle des Gallus.", "Ich bin de Othmar, de Abt. Im Jahr 719 han ich däs Chloschter näbed de Zälle vom Gallus gründet."],
  ["We pray, farm, heal the sick, teach and copy books. The Rule of Benedict says it all: \"ora et labora\", pray and work.", "Wir beten, bauern, heilen Kranke, unterrichten und schreiben Bücher ab. Die Benediktsregel sagt alles: \"ora et labora\", bete und arbeite.", "Mir bätted, buured, heiled Chranki, underrichted und schriibed Büecher ab. D Benediktsregle seit alles: \"ora et labora\", bätte und schaffe."],
  ["And brew beer, according to the plan I saw.", "Und brauen Bier, laut dem Plan, den ich gesehen habe.", "Und brüüed Bier, laut em Plan, wo ich gseh ha."],
  ["Brewing is also work. And prayer. Mostly.", "Brauen ist auch Arbeit. Und Gebet. Meistens.", "Brüüe isch au Arbeit. Und Gebätt. Meischtens."],
  ["Grüezi! We Alemanni settled here when Rome's western empire crumbled. Fields, cows, long houses.", "Grüezi! Wir Alemannen liessen uns hier nieder, als das Weströmische Reich zerfiel. Felder, Kühe, Langhäuser.", "Grüezi! Mir Alemanne händ is da niderglah, wo s Weströmisch Riich zerfalle isch. Fälder, Chüe, Langhüser."],
  ["The Burgundians live further west and speak another tongue. One day this will be a language border!", "Die Burgunder leben weiter westlich und sprechen eine andere Sprache. Eines Tages wird das eine Sprachgrenze!", "D Burgunder läbed wiiter weschtlich und reded en anderi Sproch. Emal wird das e Sprochgränze!"],
  ["The Röstigraben! It starts here.", "Der Röstigraben! Er beginnt hier.", "De Röschtigrabe! Er fangt da aa."],
  ["Shhh! This is a library. And that is the Plan of St. Gall: do NOT touch it.", "Pssst! Das ist eine Bibliothek. Und das ist der St. Galler Klosterplan: Fass ihn NICHT an.", "Pssst! Das isch e Bibliothek. Und das isch de St. Galler Chlosterplan: Lang en NÖD aa."],
  ["Our brothers on the island of Reichenau have an even bigger scriptorium. Founded 724. They illuminate books like angels.", "Unsere Brüder auf der Insel Reichenau haben ein noch grösseres Skriptorium. Gegründet 724. Sie schmücken Bücher wie Engel.", "Üsi Brüedere uf de Insle Reichenau händ es no grösseres Skriptorium. Gründet 724. Si schmücked Büecher wie Ängel."],
  ["Welcome to the court school of King Charles! Would you like to learn the new script? Come into the scriptorium.", "Willkommen an der Hofschule König Karls! Möchtest du die neue Schrift lernen? Komm ins Skriptorium.", "Willkomme a de Hofschuel vom König Karl! Wotsch di nöi Schrift lerne? Chumm is Skriptorium."],
  ["Clear letters, clear thoughts. That is my motto.", "Klare Buchstaben, klare Gedanken. Das ist mein Motto.", "Klari Buechstabe, klari Gedanke. Das isch mis Motto."],
  ["I am Charles, king of the Franks. On Christmas Day 800 the Pope crowned me emperor in Rome.", "Ich bin Karl, König der Franken. Am Weihnachtstag 800 krönte mich der Papst in Rom zum Kaiser.", "Ich bi de Karl, König vo de Franke. Am Wiehnachtstag 800 het mi de Papscht z Rom zum Kaiser gchrönt."],
  ["Karl der Grosse! Your empire includes Switzerland.", "Karl der Grosse! Dein Reich umfasst die Schweiz.", "Karl de Gross! Din Riich umfasst d Schwiiz."],
  ["Even the Alps. I like order: one law, one currency and one script.", "Sogar die Alpen. Ich mag Ordnung: ein Gesetz, eine Währung und eine Schrift.", "Sogar d Alpe. Ich mag Ordnig: es Gsetz, e Wäärig und e Schrift."],
  ["Welcome to Müstair! Look at the walls: a hundred scenes from the Bible, painted around 800.", "Willkommen in Müstair! Schau dir die Wände an: hundert Szenen aus der Bibel, um 800 gemalt.", "Willkomme z Müstair! Lueg d Wänd aa: hundert Szene us de Bible, um 800 gmalt."],
  ["They were covered by whitewash for centuries, and found again in the 1900s. Now the whole world comes to look.", "Sie waren Jahrhunderte unter Tünche verborgen und wurden im 20. Jahrhundert wiederentdeckt. Jetzt kommt die ganze Welt, um sie zu sehen.", "Si sind Jahrhundert under Tünche verborge gsi und im 20. Jahrhundert wiederentdeckt worde. Jetzt chunnt d ganz Wält, zum si aaluege."],
  ["I am Gessler, bailiff of the Habsburgs. See that hat on the pole? Everyone must bow to it!", "Ich bin Gessler, Vogt der Habsburger. Siehst du den Hut auf der Stange? Alle müssen sich davor verbeugen!", "Ich bi de Gessler, Vogt vo de Habsburger. Gsehsch de Huet uf de Stange? Alli müend sich devor verbügge!"],
  ["To a hat? ...What if we do not?", "Vor einem Hut? ...Und wenn wir es nicht tun?", "Vor emene Huet? ...Und wenn mir s nöd mached?"],
  ["Then you shoot an apple off your companion's head. With THAT crossbow.", "Dann schiesst du deinem Begleiter einen Apfel vom Kopf. Mit DIESER Armbrust.", "Dänn schiessisch dim Begleiter en Öpfel vom Chopf. Mit DERE Armbrust."],
  ["Why do I always have to be the one with the apple...", "Warum muss immer ich der mit dem Apfel sein...", "Werum muess immer ich dä mit em Öpfel sii..."],
  ["I am watching you. Mostly the hat.", "Ich beobachte dich. Hauptsächlich den Hut.", "Ich beobachte di. Hauptsächlich de Huet."],
  ["I am a knight of Habsburg. Our castle in Aargau has stood since 1020.", "Ich bin ein Ritter von Habsburg. Unsere Burg im Aargau steht seit 1020.", "Ich bi en Ritter vo Habsburg. Üsi Burg im Aargau staht sit 1020."],
  ["Our count is now King Rudolf, and next he will be Duke of Austria. We are going far.", "Unser Graf ist nun König Rudolf, und bald wird er Herzog von Österreich. Wir kommen weit.", "Üse Graf isch jetzt König Rudolf, und bald isch er Herzog vo Öschtriich. Mir chömed wiit."],
  ["I am a mason on Lausanne cathedral: pointed arches, a rose window, flying buttresses. Gothic! It was consecrated in 1275.", "Ich bin Steinmetz an der Kathedrale von Lausanne: Spitzbögen, ein Rosenfenster, Strebebögen. Gotik! Sie wurde 1275 geweiht.", "Ich bi Steimetz a de Kathedrale vo Lausanne: Spitzböge, es Rosefänschter, Strebeböge. Gotik! Si isch 1275 gweihet worde."],
  ["Light and height instead of thick walls. Oh, I love this.", "Licht und Höhe statt dicker Mauern. Oh, ich liebe das.", "Liecht und Höchi statt dicki Mure. Oh, ich lieb das."],
  ["I am Peter of Savoy. They call me the \"little Charlemagne\". I have rebuilt Chillon in stone.", "Ich bin Peter von Savoyen. Man nennt mich den \"kleinen Karl den Grossen\". Ich habe Chillon in Stein neu gebaut.", "Ich bi de Peter vo Savoye. Mä nännt mich de \"chlii Karl de Gross\". Ich han s Chillon i Stei neu baut."],
  ["From the castle I control the road and collect the tolls. Do not sketch it without asking!", "Von der Burg aus kontrolliere ich die Strasse und erhebe die Zölle. Skizziere sie nicht, ohne zu fragen!", "Vo de Burg us kontrollier ich d Strass und erhebe d Zöll. Skizzier si nöd, ohni z frööge!"],
  ["I am Johann Fust, a banker from Mainz. Gutenberg owes me money. He promises a machine that makes books.", "Ich bin Johann Fust, ein Bankier aus Mainz. Gutenberg schuldet mir Geld. Er verspricht eine Maschine, die Bücher macht.", "Ich bi de Johann Fust, en Bankier us Mainz. De Gutenberg schuldet mir Gäld. Er verspricht e Maschine, wo Büecher macht."],
  ["If it works, I am rich. If not... I am still in Mainz.", "Wenn es klappt, bin ich reich. Wenn nicht... bin ich immer noch in Mainz.", "Wenns klappet, bin ich riich. Wenn nöd... bin ich immer no z Mainz."],
  ["A hundred Bibles! Now to sell them.", "Hundert Bibeln! Jetzt gilt es, sie zu verkaufen.", "Hundert Bible! Jetzt müemer si verchaufe."],
  ["I am a Säumer: I take mules with goods over the Gotthard. Wool, wine, salt, cheese.", "Ich bin Säumer: Ich bringe Maultiere mit Waren über den Gotthard. Wolle, Wein, Salz, Käse.", "Ich bi Säumer: Ich bring Mulä mit Wäre über de Gotthard. Wulle, Wy, Salz, Chäs."],
  ["My mule needs a guide today. Will you lead it? Rockfall is fine. It is the humans who are difficult.", "Mein Maultier braucht heute einen Führer. Führst du es? Steinschlag ist kein Problem. Schwierig sind die Menschen.", "Mis Muli bruucht hüt en Füehrer. Füehrsch es? Steischlag isch kei Problem. Schwierig sind d Mänsche."],
  ["Hospices, bridges, inns: the whole route lives off us muleteers.", "Hospize, Brücken, Gasthäuser: Die ganze Route lebt von uns Maultiertreibern.", "Hospize, Brugge, Gaschthüser: D ganz Route läbt vo üs Mulitribere."],
  ["Charles the Bold is beaten at Murten! Somebody has to carry the news to Fribourg, about 17 km, with this linden branch.", "Karl der Kühne ist bei Murten geschlagen! Jemand muss die Nachricht nach Freiburg tragen, etwa 17 km, mit diesem Lindenzweig.", "De Karl de Chüen isch bi Murte gschlage! Öpper muess d Nachricht uf Fribourg trage, öppe 17 km, mit dem Lindezwiig."],
  ["The famous Murten messenger! ...Hand me the branch.", "Der berühmte Murtener Bote! ...Gib mir den Zweig.", "De berüehmt Murtener Bote! ...Gib mer de Zwiig."],
  ["Every year thousands run this race. Not all of them with a branch.", "Jedes Jahr laufen Tausende dieses Rennen. Nicht alle mit einem Zweig.", "Jedes Jahr laufed Tuusigi das Rennä. Nöd alli mit emne Zwiig."],
  ["I am Jan Hus from Prague. I came to the Council of Constance under a promise of safe conduct.", "Ich bin Jan Hus aus Prag. Ich kam mit einem Geleitbrief zum Konzil von Konstanz.", "Ich bi de Jan Hus us Prag. Ich bi mit emne Gleitbrief is Konzil vo Konschtanz cho."],
  ["I am afraid that promise is worth very little. The Council wants to end the split with three popes... and silence me.", "Ich fürchte, dieses Versprechen ist sehr wenig wert. Das Konzil will die Spaltung mit drei Päpsten beenden... und mich zum Schweigen bringen.", "Ich fürchte, das Verspräche isch sehr wenig wert. S Konzil wott d Spaltig mit drü Päpscht beände... und mich zum Schwiige bringe."],
  ["They will burn you in 1415. I am so sorry.", "Man wird dich 1415 verbrennen. Es tut mir so leid.", "Mä wird di 1415 verbränne. Es tuet mer so leid."],
  ["I am Niklaus von Flüe. I left my family and my farm to live as a hermit in the Ranft gorge.", "Ich bin Niklaus von Flüe. Ich verliess meine Familie und meinen Hof, um als Einsiedler in der Ranftschlucht zu leben.", "Ich bi de Niklaus von Flüe. Ich ha mini Familie und min Hof verla, zum als Iisiedler i de Ranftschlucht z läbe."],
  ["In 1481 the Confederates quarrelled so much that war was near. I told them: be reasonable, stop meddling in everybody else's fights.", "1481 stritten die Eidgenossen so sehr, dass ein Krieg nahe war. Ich sagte ihnen: Seid vernünftig, mischt euch nicht in fremde Händel.", "1481 händ d Eidgnosse so fescht gstritte, dass de Chrieg nöch gsi isch. Ich ha ine gseit: Sit vernünftig, misched euch nöd i fremdi Händel."],
  ["He was a mediator at Stans. Many Swiss think of him as an early voice for neutrality.", "Er war Vermittler in Stans. Viele Schweizer sehen in ihm eine frühe Stimme für die Neutralität.", "Er isch Vermittler z Stans gsi. Vill Schwiizer gsehnd i ihm e früehi Stimm für d Neutralität."],
  ["I carry the long pike. At Sempach in 1386 the knights of Habsburg met our halberds and pikes. We won.", "Ich trage die lange Pike. Bei Sempach 1386 trafen die Habsburger Ritter auf unsere Hellebarden und Piken. Wir siegten.", "Ich trag di lang Pike. Bi Sempach 1386 sind d Habsburger Ritter uf üsi Hellebarde und Pike gschtosse. Mir händ gsiegt."],
  ["They tell of Winkelried who gathered the enemy spears in his arms. Nobody wrote it down for 150 years, though.", "Man erzählt von Winkelried, der die feindlichen Speere in seinen Armen sammelte. Aufgeschrieben hat es aber 150 Jahre lang niemand.", "Mä verzellt vom Winkelried, wo d gegnerische Spiess i sine Ärme gsammlet het. Ufgschribe het s aber 150 Jahr lang niemer."],
  ["I am Charles the Bold, Duke of Burgundy. I will conquer Switzerland! Behold my cannons!", "Ich bin Karl der Kühne, Herzog von Burgund. Ich werde die Schweiz erobern! Seht meine Kanonen!", "Ich bi de Karl de Chüen, Herzog vo Burgund. Ich wird d Schwiiz erobere! Gsehnd mini Kanone!"],
  ["In 1476 you lose at Grandson and Murten. And in 1477 you die at Nancy.", "1476 verlierst du bei Grandson und Murten. Und 1477 stirbst du bei Nancy.", "1476 verlüürsch bi Grandson und Murte. Und 1477 stirbsch bi Nancy."],
  ["Do not spoil my war!", "Verdirb mir nicht meinen Krieg!", "Verderb mer nöd min Chrieg!"],
  ["Greetings from Zürich! In 1336 our guilds, led by Rudolf Brun, took power from the old noble families.", "Grüsse aus Zürich! 1336 nahmen unsere Zünfte unter Rudolf Brun den alten Adelsfamilien die Macht ab.", "Grüess us Züri! 1336 händ üsi Zünft under em Rudolf Brun de alte Adelsfamilie d Macht abgnoh."],
  ["Butchers, bakers, weavers: now the craftsmen have a vote in the council. Very modern.", "Metzger, Bäcker, Weber: Jetzt haben die Handwerker eine Stimme im Rat. Sehr modern.", "Metzger, Becke, Weber: Jetzt händ d Handwärker e Stimm im Rat. Sehr modern."],
  ["I am Hans Holbein the Younger. I paint portraits: Erasmus, merchants, councillors. And now you, Sarah!", "Ich bin Hans Holbein der Jüngere. Ich male Porträts: Erasmus, Kaufleute, Ratsherren. Und jetzt dich, Sarah!", "Ich bi de Hans Holbein de Jünger. Ich mal Porträt: Erasmus, Chaufmanne, Ratsherre. Und jetzt dich, Sarah!"],
  ["Do I need to hold still?", "Muss ich stillhalten?", "Muess ich still ha?"],
  ["Yes. Three hours. Think of a very important building.", "Ja. Drei Stunden. Denk an ein sehr wichtiges Gebäude.", "Ja. Drü Stund. Dänk a es sehr wichtigs Gebäude."],
  ["...Done. How do I look?", "...Fertig. Wie sehe ich aus?", "...Fertig. Wie gsehn ich uus?"],
  ["Like a woman who has just sketched the Pantheon. Splendid.", "Wie eine Frau, die gerade das Pantheon skizziert hat. Prächtig.", "Wie e Frau, wo grad s Pantheon skizziert het. Prächtig."],
  ["I am Ulrich Zwingli, people's priest at the Grossmünster. I preach straight from the Bible.", "Ich bin Ulrich Zwingli, Leutpriester am Grossmünster. Ich predige direkt aus der Bibel.", "Ich bi de Ulrich Zwingli, Lütpriester am Grossmünschter. Ich predige diräkt us de Bible."],
  ["The printer Froschauer has made a delicious scandal with his sausages. Go and talk to him.", "Der Drucker Froschauer hat mit seinen Würsten einen köstlichen Skandal ausgelöst. Sprich mit ihm.", "De Drucker Froschauer het mit sine Würscht en köschtliche Skandal usglöst. Red mit ihm."],
  ["Zürich will be reformed: no images in churches, no fasting rules, no pilgrimages.", "Zürich wird reformiert werden: keine Bilder in Kirchen, keine Fastenregeln, keine Wallfahrten.", "Züri wird reformiert: kei Bilder i de Chilche, kei Fasteregle, kei Wallfahrte."],
  ["I am Jakob Fugger, called \"the Rich\". I lend money to emperors and popes.", "Ich bin Jakob Fugger, genannt \"der Reiche\". Ich verleihe Geld an Kaiser und Päpste.", "Ich bi de Jakob Fugger, gnännt \"de Riich\". Ich verlih Gäld a Kaiser und Päpscht."],
  ["I built the Fuggerei for the poor of Augsburg. A year's rent: one guilder and three prayers a day.", "Ich baute die Fuggerei für die Armen von Augsburg. Jahresmiete: ein Gulden und drei Gebete am Tag.", "Ich ha d Fuggerei für d Arme vo Augsburg baut. Jahresmiet: en Gulde und drü Gebätt am Tag."],
  ["Social housing in the 1500s. I approve.", "Sozialer Wohnbau im 16. Jahrhundert. Ich bin dafür.", "Sozialer Wohnbau im 16. Jahrhundert. Ich bi defür."],
  ["I am Albrecht Dürer from Nuremberg. In 1494 I crossed the Alps to Venice to learn what the Italians know about painting.", "Ich bin Albrecht Dürer aus Nürnberg. 1494 überquerte ich die Alpen nach Venedig, um zu lernen, was die Italiener über Malerei wissen.", "Ich bi de Albrecht Dürer us Nürnberg. 1494 bin ich über d Alpe uf Venedig, zum lerne, was d Italiener über s Mole wüssed."],
  ["In Milan, the master Leonardo is painting a dinner party. Everything has a vanishing point, Sarah. Everything!", "In Mailand malt der Meister Leonardo ein Abendessen. Alles hat einen Fluchtpunkt, Sarah. Alles!", "Z Mailand malt de Meischter Leonardo es Znacht. Alles het en Flüchtpunkt, Sarah. Alles!"],
  ["Perspective! I knew I liked this century.", "Perspektive! Ich wusste, dass mir dieses Jahrhundert gefällt.", "Perspektive! Ich ha gwüsst, dass mir das Jahrhundert gfallt."],
  ["The Fuggerei gates close at ten. Whoever is outside must pay the watchman.", "Die Tore der Fuggerei schliessen um zehn. Wer draussen ist, muss den Wächter bezahlen.", "D Tor vo de Fuggerei gönd am zäh zue. Wer dusse isch, muess de Wächter zahle."],
  ["Still true today. I read it in the brochure.", "Gilt noch heute. Ich habe es im Prospekt gelesen.", "Gilt hüt no. Ich ha s im Prospäkt gläse."],
  ["This is the Zytglogge. Brand new astronomical clock: hours, date, moon phase, zodiac, even a procession of bears.", "Das ist der Zytglogge. Brandneue astronomische Uhr: Stunden, Datum, Mondphase, Tierkreis, sogar ein Bärenumzug.", "Das isch de Zytglogge. Nigelnagelneui astronomischi Uhr: Stunde, Datum, Mondphase, Tierchreis, sogar en Bäreumzug."],
  ["Bears again!", "Schon wieder Bären!", "Scho wieder Bäre!"],
  ["We Zürcher stand on this side. They are on the other side. Neither of us wants to start the war.", "Wir Zürcher stehen auf dieser Seite. Sie auf der anderen. Keiner von uns will den Krieg beginnen.", "Mir Züri stönd uf dere Siite. Si uf de andere. Kei Siite wott de Chrieg aafange."],
  ["Hunger though. Hmm.", "Hunger allerdings. Hmm.", "Hunger aber. Hmm."],
  ["We Catholic cantons camp on this side. The Zürcher are over there. We are both hungry.", "Wir katholischen Orte lagern auf dieser Seite. Die Zürcher sind dort drüben. Wir haben beide Hunger.", "Mir katholische Ort lägered uf dere Siite. D Züri sind dört dübe. Mir händ beidi Hunger."],
  ["I have milk. They have bread. Maybe...", "Ich habe Milch. Sie haben Brot. Vielleicht...", "Ich ha Milch. Si händ Brot. Villicht..."],
  ["Welcome to the scriptorium! Parchment, quills and ink. Today: the new Carolingian script. First lesson: put spaces between the words!", "Willkommen im Skriptorium! Pergament, Federkiele und Tinte. Heute: die neue karolingische Schrift. Erste Lektion: Setze Abstände zwischen die Wörter!", "Willkomme im Skriptorium! Pergamänt, Fedrechiel und Tinte. Hüt: di nöi karolingisch Schrift. Erschti Lektion: Setz Abständ zwüsche d Wörter!"],
  ["The Plan of St. Gall, on five sheets of parchment... I have to sketch this. Is that librarian watching me?", "Der St. Galler Klosterplan, auf fünf Pergamentbögen... Das muss ich skizzieren. Beobachtet mich dieser Bibliothekar?", "De St. Galler Chlosterplan, uf föif Pergamäntböge... Das muess ich skizziere. Beobachtet mich dä Bibliothekar?"],
  ["Monks are curious. Freeze when he looks!", "Mönche sind neugierig. Erstarre, wenn er schaut!", "Mönch sind nögierig. Erstarr, wenn er luegt!"],
  ["The Codex Manesse! Zürich's great songbook: about 140 poets, each with a full-page portrait. I am in there, you know.", "Die Manessische Handschrift! Zürichs grosses Liederbuch: etwa 140 Dichter, jeder mit einem ganzseitigen Bild. Ich bin auch drin, weisst du.", "D Manessisch Handschrift! Zürichs grosses Liederbuech: öppe 140 Dichter, jede mit emne ganzsiitige Bild. Ich bi au drin, weisch."],
  ["Hadlaub the Minnesinger. Of course you are.", "Hadlaub, der Minnesänger. Natürlich bist du das.", "Hadlaub, de Minnesänger. Natürli bisch du das."],
  ["The Habsburg army is marching into the pass below. We attack from the slope!", "Das Habsburger Heer marschiert unten in den Pass. Wir greifen vom Hang aus an!", "S Habsburger Heer marschiert une i de Pass. Mir griifed vom Hang us aa!"],
  ["Time your rocks, Sarah. When they are in the green zone... let go!", "Timing deiner Felsen, Sarah. Wenn sie in der grünen Zone sind... lass los!", "Timing vo dine Fels, Sarah. Wenn si i de grüene Zone sind... lah los!"],
  ["Morgarten, the narrow pass. Legends say rocks and logs; historians say: a well-planned ambush.", "Morgarten, der enge Pass. Legenden sagen Steine und Baumstämme; Historiker sagen: ein gut geplanter Hinterhalt.", "Morgarte, de äng Pass. Legände säged Stei und Boumstämm; Historiker säged: en guet planete Hinderhalt."],
  ["My printing shop! Letters of metal, set backwards in a stick. Let us print a page!", "Meine Druckerei! Buchstaben aus Metall, verkehrt im Winkelhaken gesetzt. Lass uns eine Seite drucken!", "Mini Druckerei! Buechstabe us Metall, verchehrt im Winkelhake gsetzt. Lömmer e Siite drucke!"],
  ["The Basel Münster, and next to it the new university: founded 1460, the oldest in Switzerland.", "Das Basler Münster, und daneben die neue Universität: 1460 gegründet, die älteste der Schweiz.", "S Basler Münschter, und dernäbe di nöi Universität: 1460 gründet, di eltischt vo de Schwiiz."],
  ["Humanists, printers and doctors: Basel is becoming a very clever city.", "Humanisten, Drucker und Ärzte: Basel wird eine sehr kluge Stadt.", "Humaniste, Drucker und Ärzt: Basel wird e sehr gschiidi Stadt."],
  ["A memorial for Winkelried at Sempach. The legend is much younger than the battle.", "Ein Denkmal für Winkelried bei Sempach. Die Legende ist viel jünger als die Schlacht.", "E Denkmal für de Winkelried bi Sempach. D Legände isch vill jünger als d Schlacht."],
  ["Legends grow, Sarah. That is why historians check them.", "Legenden wachsen, Sarah. Darum prüfen Historiker sie.", "Legände wachsed, Sarah. Drum prüefed Historiker si."],
  ["Books are the best way to spread ideas.", "Bücher sind der beste Weg, Ideen zu verbreiten.", "Büecher sind de beschti Wäg, Ideene z verbreite."],
  ["My apothecary in Basel! Every remedy has a poison inside. Today: the right dose.", "Meine Apotheke in Basel! Jedes Heilmittel enthält ein Gift. Heute: die richtige Dosis.", "Mini Apothek z Basel! Jedes Heilmittel het es Gift drin. Hüt: di richtigi Dosis."],
  ["Everything is poison. Only the dose decides.", "Alles ist Gift. Nur die Dosis entscheidet.", "Alles isch Gift. Nume d Dosis entscheidet."],
  ["Our army is on this side of the border.", "Unser Heer steht auf dieser Seite der Grenze.", "Üses Heer staht uf dere Siite vo de Gränze."],
  ["Ours on that. Nobody wants a war... but everybody is hungry.", "Unseres auf jener. Niemand will Krieg... aber alle haben Hunger.", "Üses uf dere. Niemer wott Chrieg... aber alli händ Hunger."],
  ["Let us stir! Time it with me, Sarah!", "Rühren wir! Zusammen im Takt, Sarah!", "Rüehre mir! Zäme im Takt, Sarah!"],
  ["Kappel: the milk soup border. Two sides, one pot.", "Kappel: die Milchsuppen-Grenze. Zwei Seiten, ein Topf.", "Kappel: d Milchsuppe-Gränze. Zwei Siite, en Hafe."],
  ["*growl* (The bear holds a log and looks at you expectantly.)", "*Knurren* (Der Bär hält einen Holzscheit und schaut dich erwartungsvoll an.)", "*Grummle* (De Bär hät en Holzschiit und luegt di erwartigsvoll aa.)"],
  ["He wants us to catch the logs he tosses. Ready, Sarah?", "Er will, dass wir die Holzscheite fangen, die er wirft. Bereit, Sarah?", "Er wott, dass mir d Holzschiit fanged, wo er wirft. Parat, Sarah?"],
  ["*content growl*", "*zufriedenes Brummen*", "*zfriedes Brummle*"],
  ["Where... WHEN are we? A forest, a bear and... that is a monk. The Middle Ages!", "Wo... WANN sind wir? Ein Wald, ein Bär und... das ist ein Mönch. Das Mittelalter!", "Wo... WÄNN sind mir? En Wald, en Bär und... das isch en Mönch. S Mittelalter!"],
  ["Mountains, castles and lakes: it looks like Switzerland. Barely!", "Berge, Burgen und Seen: Es sieht aus wie die Schweiz. Fast!", "Bärge, Burge und Seeli: Es gseht uus wie d Schwiiz. Fascht!"],
  ["Stone bridges, church bells and a smell of ink and plague. Late Middle Ages!", "Steinbrücken, Kirchenglocken und ein Geruch nach Tinte und Pest. Spätmittelalter!", "Steibrugge, Chilleglogge und en Gruch nach Tinte und Pescht. Spätmittelalter!"],
  ["Beards, hats and fancy sleeves: the Renaissance!", "Bärte, Hüte und prächtige Ärmel: die Renaissance!", "Bärt, Hüet und prächtigi Ärmel: d Renaissance!"],
  ["Careful! Wolves do not respect time travellers. 🐺", "Vorsicht! Wölfe haben keinen Respekt vor Zeitreisenden. 🐺", "Vorsicht! Wölf händ kei Respäkt vor Ziitreisende. 🐺"],
  ["Careful! A soldier does not care which century you are from. ⚔️", "Vorsicht! Einem Soldaten ist egal, aus welchem Jahrhundert du kommst. ⚔️", "Vorsicht! Em Soldat isch es egal, us welem Jahrhundert du chunnsch. ⚔️"],
  ["A bull does not care that you are an architect. 🐂", "Einem Stier ist es egal, dass du Architektin bist. 🐂", "Em Stier isch s egal, dass du Architektin bisch. 🐂"],
  ["WHICH TIME?", "WELCHE ZEIT?", "WELI ZIIT?"], ["Through the Ages (Level 4)", "Durch die Zeiten (Level 4)", "Dur d Ziite (Level 4)"], ["Helvetia (Level 5)", "Helvetia (Level 5)", "Helvetia (Level 5)"],
  // exam
  ["Who was the Irish monk whose cell became the Abbey of St. Gallen?", "Wer war der irische Mönch, dessen Zelle zum Kloster St. Gallen wurde?", "Wer isch de irisch Mönch gsi, wo us siner Zälle s Chloschter St. Galle worde isch?"],
  ["What does \"ora et labora\" mean?", "Was bedeutet \"ora et labora\"?", "Was heisst \"ora et labora\"?"],
  ["Pray and work", "Bete und arbeite", "Bätte und schaffe"], ["Eat and sleep", "Iss und schlaf", "Ässe und schlafe"], ["Read and write", "Lies und schreib", "Läse und schriibe"],
  ["In what year was Charlemagne crowned emperor?", "In welchem Jahr wurde Karl der Grosse zum Kaiser gekrönt?", "I welem Jahr isch de Karl de Gross zum Kaiser gchrönt worde?"],
  ["What did Carolingian minuscule give us?", "Was hat uns die karolingische Minuskel gebracht?", "Was het üs d karolingisch Minuskel bracht?"],
  ["Lowercase letters and spaces between words", "Kleinbuchstaben und Abstände zwischen Wörtern", "Chliibuechstabe und Abständ zwüsche Wörter"], ["The printing press", "Die Druckerpresse", "D Druckerpresse"], ["The Gothic arch", "Den gotischen Spitzbogen", "De gotisch Spitzboge"],
  ["What is the Plan of St. Gall?", "Was ist der St. Galler Klosterplan?", "Was isch de St. Galler Chlosterplan?"],
  ["A drawing of an ideal monastery from around 820", "Die Zeichnung eines idealen Klosters von etwa 820", "D Zeichnig vomene ideale Chloschter vo öppe 820"], ["A map of Switzerland", "Eine Karte der Schweiz", "E Charte vo de Schwiiz"], ["A battle plan", "Ein Schlachtplan", "En Schlachtplan"],
  ["Which building at Aachen was inspired by San Vitale in Ravenna?", "Welches Gebäude in Aachen wurde von San Vitale in Ravenna inspiriert?", "Wels Gebäude z Aache isch vo San Vitale z Ravenna inspiriert gsi?"],
  ["Chillon Castle", "Schloss Chillon", "Schloss Chillon"],
  ["Which three regions signed the Federal Charter of 1291?", "Welche drei Talschaften schlossen den Bundesbrief von 1291?", "Weli drü Talschafte händ de Bundesbrief vo 1291 gschlosse?"],
  ["Bern, Zürich and Basel", "Bern, Zürich und Basel", "Bärn, Züri und Basel"], ["Geneva, Vaud and Neuchâtel", "Genf, Waadt und Neuenburg", "Gäf, Waadt und Neuchâtel"],
  ["Is the story of William Tell a legend?", "Ist die Geschichte von Wilhelm Tell eine Legende?", "Isch d Gschicht vom Wilhelm Täll e Legände?"],
  ["Yes, first written down around 1470", "Ja, um 1470 erstmals aufgeschrieben", "Ja, um 1470 zerscht ufgschribe"], ["No, it is a document of 1291", "Nein, es ist ein Dokument von 1291", "Nei, es isch es Dokumänt vo 1291"], ["No, Tell wrote it himself", "Nein, Tell hat es selbst geschrieben", "Nei, de Täll het s säuber gschribe"],
  ["What happened at Morgarten in 1315?", "Was geschah 1315 am Morgarten?", "Was isch 1315 am Morgarte passiert?"],
  ["The Confederates ambushed a Habsburg army", "Die Eidgenossen überfielen ein Habsburger Heer", "D Eidgnosse händ es Habsburger Heer überfalle"], ["The Gotthard tunnel opened", "Der Gotthardtunnel wurde eröffnet", "De Gotthardtunnel isch eröffnet worde"], ["An earthquake destroyed Basel", "Ein Erdbeben zerstörte Basel", "E Ärdbebe het Basel zerstört"],
  ["Why did the Gotthard Pass matter?", "Warum war der Gotthardpass wichtig?", "Werum isch de Gotthardpass wichtig gsi?"],
  ["It was the shortest trade route between Germany and Italy", "Er war der kürzeste Handelsweg zwischen Deutschland und Italien", "Er isch de chürzescht Handelswäg zwüsche Dütschland und Italie gsi"], ["Gold was found there", "Dort wurde Gold gefunden", "Det isch Gold gfunde worde"],
  ["In the legend, what did the Urners send over the Devil's Bridge first?", "Was schickten die Urner in der Legende zuerst über die Teufelsbrücke?", "Was händ d Urner i de Legände zerscht über d Tüfelsbrugg gschickt?"],
  ["A horse", "Ein Pferd", "En Gaul"], ["A monk", "Einen Mönch", "En Mönch"],
  ["Which castle stands on a rock in Lake Geneva?", "Welche Burg steht auf einem Fels im Genfersee?", "Weli Burg staht uf emne Fels im Gfersee?"],
  ["What is the Codex Manesse?", "Was ist die Manessische Liederhandschrift?", "Was isch d Manessisch Liederhandschrift?"],
  ["A songbook made in Zürich around 1300", "Ein Liederbuch, das um 1300 in Zürich entstand", "Es Liederbuech, wo um 1300 z Züri entstande isch"], ["A law code", "Ein Gesetzbuch", "S Gsetzbuech"], ["A map of the Alps", "Eine Karte der Alpen", "E Charte vo de Alpe"],
  ["Which invention made books cheap?", "Welche Erfindung machte Bücher billig?", "Weli Erfindig het Büecher billig gmacht?"],
  ["Gutenberg's printing press with movable type", "Gutenbergs Druckerpresse mit beweglichen Lettern", "S Gutenberg sini Druckerpresse mit bewegliche Buechstabe"], ["The compass", "Der Kompass", "De Kompass"], ["The water mill", "Die Wassermühle", "D Wassermüli"],
  ["In which city was Gutenberg's press?", "In welcher Stadt stand Gutenbergs Presse?", "I welere Stadt isch s Gutenberg sini Presse gschtande?"],
  ["What caused the Black Death?", "Was verursachte den Schwarzen Tod?", "Was het de Schwarz Tod verursacht?"],
  ["Bad air", "Schlechte Luft", "Schlächti Luft"], ["A curse", "Ein Fluch", "En Fluech"],
  ["What does \"quarantine\" originally mean?", "Was bedeutet \"Quarantäne\" ursprünglich?", "Was heisst \"Quarantäne\" ursprünglich?"],
  ["Forty days", "Vierzig Tage", "Vierzg Täg"], ["Forty ships", "Vierzig Schiffe", "Vierzg Schiff"], ["Forty doctors", "Vierzig Ärzte", "Vierzg Ärzt"],
  ["Which disaster destroyed Basel in 1356?", "Welche Katastrophe zerstörte 1356 Basel?", "Weli Katastrophe het 1356 Basel zerstört?"],
  ["An earthquake", "Ein Erdbeben", "E Ärdbebe"], ["A flood", "Eine Überschwemmung", "E Überschwemmig"], ["A dragon", "Ein Drache", "En Drache"],
  ["Who helped mediate the Stans agreement of 1481?", "Wer half beim Stanser Verkommnis von 1481 zu vermitteln?", "Wer het bim Stanser Verchomnis vo 1481 ghulfe vermittle?"],
  ["Niklaus von Flüe (Brother Klaus)", "Niklaus von Flüe (Bruder Klaus)", "Niklaus von Flüe (Bruder Klaus)"], ["Charles the Bold", "Karl der Kühne", "De Karl de Chüen"],
  ["Whom did the Confederates beat at Murten in 1476?", "Wen besiegten die Eidgenossen 1476 bei Murten?", "Wän händ d Eidgnosse 1476 bi Murte bsiegt?"],
  ["Charles the Bold of Burgundy", "Karl den Kühnen von Burgund", "De Karl de Chüen vo Burgund"],
  ["Which Swiss university is the oldest?", "Welche Schweizer Universität ist die älteste?", "Weli Schwiizer Universität isch di eltischt?"],
  ["Basel (1460)", "Basel (1460)", "Basel (1460)"], ["Zürich (1833)", "Zürich (1833)", "Züri (1833)"], ["Bern (1834)", "Bern (1834)", "Bärn (1834)"],
  ["Who printed Erasmus' Greek New Testament in Basel in 1516?", "Wer druckte 1516 in Basel das griechische Neue Testament des Erasmus?", "Wer het 1516 z Basel s griechisch Nöi Testamänt vom Erasmus druckt?"],
  ["Johann Froben", "Johann Froben", "De Johann Froben"], ["Johannes Gutenberg", "Johannes Gutenberg", "De Johannes Gutenberg"],
  ["What did Paracelsus say about poison?", "Was sagte Paracelsus über Gift?", "Was het de Paracelsus über s Gift gseit?"],
  ["The dose makes the poison", "Die Dosis macht das Gift", "D Dosis macht s Gift"], ["All poison is magic", "Jedes Gift ist Magie", "Jedes Gift isch Magie"], ["Poison needs no dose", "Gift braucht keine Dosis", "Gift bruucht kei Dosis"],
  ["What started the Reformation in Zürich in 1522?", "Was löste 1522 die Reformation in Zürich aus?", "Was het 1522 d Reformation z Züri usglöst?"],
  ["A sausage meal during Lent", "Ein Wurstessen in der Fastenzeit", "En Wurschtässe i de Fastezit"], ["A flood of the Limmat", "Ein Hochwasser der Limmat", "S Hochwasser vo de Limmat"], ["A royal wedding", "Eine königliche Hochzeit", "E königlichi Hochzit"],
  ["Who led the Reformation in Zürich?", "Wer führte die Reformation in Zürich an?", "Wer het d Reformation z Züri aagfüehrt?"],
  ["Ulrich Zwingli", "Ulrich Zwingli", "De Ulrich Zwingli"], ["Jakob Fugger", "Jakob Fugger", "De Jakob Fugger"],
  ["What is the Fuggerei?", "Was ist die Fuggerei?", "Was isch d Fuggerei?"],
  ["The oldest social housing complex still in use", "Die älteste noch genutzte Sozialsiedlung", "Di eltischt no gnutzti Sozialsiedlig"], ["A fortress", "Eine Festung", "E Festig"], ["A market hall", "Eine Markthalle", "E Markthalle"],
  ["What happened at Marignano in 1515?", "Was geschah 1515 bei Marignano?", "Was isch 1515 bi Marignano passiert?"],
  ["The Swiss were defeated by French cannons", "Die Schweizer wurden von französischen Kanonen besiegt", "D Schwiizer sind vo französische Kanone bsiegt worde"], ["The Swiss beat the Pope", "Die Schweizer besiegten den Papst", "D Schwiizer händ de Papscht bsiegt"], ["Basel was founded", "Basel wurde gegründet", "Basel isch gründet worde"],
  ["Whose guard has been Swiss since 1506?", "Wessen Garde ist seit 1506 schweizerisch?", "Wäm si Garde isch sit 1506 schwiizerisch?"],
  ["The Pope's", "Die des Papstes", "Die vom Papscht"], ["The Emperor's", "Die des Kaisers", "Die vom Kaiser"], ["The King of France's", "Die des Königs von Frankreich", "Die vom König vo Frankriich"],
  ["What did soldiers share at Kappel in 1529, according to tradition?", "Was teilten die Soldaten 1529 bei Kappel der Überlieferung nach?", "Was händ d Soldate 1529 bi Kappel nach de Überlieferig teilt?"],
  ["A pot of milk soup", "Einen Topf Milchsuppe", "En Hafe Milchsuppe"], ["A barrel of wine", "Ein Fass Wein", "S Fass Wy"], ["A map", "Eine Karte", "E Charte"],
  ["Which Bern landmark was built around 1530 with an astronomical clock?", "Welches Berner Wahrzeichen mit astronomischer Uhr wurde um 1530 gebaut?", "Weli Bärner Wahrzeiche mit astronomischer Uhr isch um 1530 baut worde?"],
  ["The Zytglogge", "Der Zytglogge", "De Zytglogge"],
  ["In which city is the covered wooden Kapellbrücke?", "In welcher Stadt steht die gedeckte Holzbrücke Kapellbrücke?", "I welere Stadt staht d gedeckt Holzbrugg Chapällbrugg?"],
  // chronicler, UI
  ["So you want to be Chronicler of Helvetia? First put the events in the right order. Then answer my questions.", "Du willst also Chronistin von Helvetia werden? Bring zuerst die Ereignisse in die richtige Reihenfolge. Dann beantworte meine Fragen.", "Du wotsch also Chronischtin vo Helvetia wärde? Bring zerscht d Ereignis i di richtig Reihefolg. Dänn beantwort mini Frage."],
  ["{0}/16. A good start! Read your chronicle (TAB) and come back to talk to me.", "{0}/16. Ein guter Anfang! Lies deine Chronik (TAB) und komm dann zurück zu mir.", "{0}/16. En guete Aafang! Lies dini Chronik (TAB) und chumm dänn wieder zu mir."],
  ["THE CHRONICLER OF HELVETIA", "DIE CHRONISTIN VON HELVETIA", "D CHRONISCHTIN VO HELVETIA"], ["Chronicler of Helvetia! 🎉", "Chronistin von Helvetia! 🎉", "Chronischtin vo Helvetia! 🎉"],
  ["CHRONICLE OF HELVETIA", "CHRONIK VON HELVETIA", "CHRONIK VO HELVETIA"],
  ["Time traveller, architect, Chronicler of Helvetia", "Zeitreisende, Architektin, Chronistin von Helvetia", "Ziitreisendi, Architektin, Chronischtin vo Helvetia"],
  ["SARCHITECT 5: HELVETIA", "SARCHITECT 5: HELVETIA", "SARCHITECT 5: HELVETIA"],
  ["Eras visited: {0}/4", "Besuchte Epochen: {0}/4", "Bsuechti Epoche: {0}/4"], ["Mistakes made on the way: {0}", "Fehler unterwegs: {0}", "Fähler underwägs: {0}"],
  ["Chronicle of Helvetia — page {0}/{1}", "Chronik von Helvetia — Seite {0}/{1}", "Chronik vo Helvetia — Siite {0}/{1}"],
  ["A thousand years in four eras", "Tausend Jahre in vier Epochen", "Tuusig Jahr i vier Epoche"],
  ["Book (Tab, Q): your chronicle of Helvetia", "Buch (Tab, Q): deine Chronik von Helvetia", "Buech (Tab, Q): dini Chronik vo Helvetia"],
  ["Watch out: wolves, soldiers, rats... and bulls.", "Pass auf: Wölfe, Soldaten, Ratten... und Stiere.", "Pass uf: Wölf, Soldate, Ratte... und Stier."],
  // speaker names and small labels
  ["[A]: onward into the Middle Ages   ·   B: home to Baar", "[A]: weiter ins Mittelalter   ·   B: heim nach Baar", "[A]: wiiter is Mittelalter   ·   B: hei uf Baar"],
  ["Alcuin", "Alkuin", "Alkuin"], ["Alemann", "Alemanne", "Alemanne"], ["Librarian", "Bibliothekar", "Bibliothekar"], ["Charlemagne", "Karl der Grosse", "Karl de Gross"], ["Nun", "Nonne", "Nonne"], ["Legend", "Legende", "Legände"],
  ["1 August", "1. August", "1. Auguscht"], ["31 December", "31. Dezember", "31. Dezämber"], ["15 November (Morgarten)", "15. November (Morgarten)", "15. November (Morgarte)"],
  ["Elder", "Ältester", "Eltischte"], ["Knight", "Ritter", "Ritter"], ["Mason", "Steinmetz", "Steimetz"], ["Bloodletting", "Aderlass", "Aderlass"], ["Runner", "Läufer", "Läufer"], ["Pikeman", "Pikenier", "Pikenier"], ["Charles", "Karl", "Karl"],
  ["Guildmaster", "Zunftmeister", "Zunftmeischter"], ["Fever", "Fieber", "Fieber"], ["Pain", "Schmerz", "Schmärz"], ["poppy", "Mohn", "Mohn"], ["foxglove", "Fingerhut", "Fingerhuet"],
  ["Revolution", "Revolution", "Revolution"], ["Rebirth", "Wiedergeburt", "Widergburt"], ["Reformation", "Reformation", "Reformation"], ["Clockmaker", "Uhrmacher", "Uhrmacher"], ["Watchman", "Wächter", "Wächter"],
  ["Zürich", "Zürich", "Züri"], ["Aachen", "Aachen", "Aache"], ["25 December", "25. Dezember", "25. Dezämber"], ["1 May", "1. Mai", "1. Mai"], ["Benedict", "Benedikt", "Benedikt"],
  // @@TR5E

]);
