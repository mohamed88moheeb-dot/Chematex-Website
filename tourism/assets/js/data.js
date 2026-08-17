/* Meridian — trip catalogue.
   Every route carries real coordinates and a day-by-day profile in metres.
   Departure dates are derived from each route's running season (see deriveDepartures). */

const TERRAIN = {
  alpine:   { label: 'Alpine',        tint: '#4C6B7A' },
  desert:   { label: 'Desert',        tint: '#C08A4A' },
  coast:    { label: 'Coast',         tint: '#2E7D8A' },
  forest:   { label: 'Forest',        tint: '#4A7C59' },
  ice:      { label: 'Ice',           tint: '#7E9BB5' },
  river:    { label: 'River',         tint: '#3F7A8C' },
  savanna:  { label: 'Savanna',       tint: '#B08542' },
  volcanic: { label: 'Volcanic',      tint: '#8A5A45' }
};

const GRADES = [
  null,
  { label: 'Easy going', note: 'Short days, good paths, nothing technical.' },
  { label: 'Moderate',   note: '4–5 hours moving most days, some rough ground.' },
  { label: 'Active',     note: '6–7 hour days, sustained ascent, exposure in places.' },
  { label: 'Demanding',  note: 'Long days at altitude or in remote terrain.' },
  { label: 'Expedition', note: 'Self-supported stretches, weather-dependent, no quick exit.' }
];

const TRIPS = [
  {
    slug: 'torres-del-paine-circuit',
    plate: '01',
    name: 'Torres del Paine Circuit',
    country: 'Chile',
    region: 'Americas',
    terrain: 'alpine',
    lat: -50.9423, lng: -73.4068,
    days: 9,
    priceFrom: 3480,
    grade: 4,
    groupMax: 10,
    months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    summary: 'The full loop behind the towers — nine days round the Paine massif, over the John Gardner Pass and down the length of Grey Glacier.',
    highlights: [
      'Sunrise at the Torres base lagoon before the day walkers arrive',
      'John Gardner Pass with the Southern Patagonian Icefield opening below',
      'Three nights on the quiet back side of the massif',
      'Grey Glacier from the suspension bridges above the lake'
    ],
    itinerary: [
      { title: 'Puerto Natales to Laguna Amarga', note: 'Transfer in, gear check, first night under the east face.', elev: 120 },
      { title: 'Serón', note: 'Open pampa along the Río Paine, condors overhead.', elev: 280 },
      { title: 'Dickson', note: 'Descent to the lake and its glacier at the head.', elev: 240 },
      { title: 'Los Perros', note: 'Lenga forest, then moraine and a hanging glacier.', elev: 610 },
      { title: 'John Gardner Pass to Grey', note: 'The big day — the icefield from the col.', elev: 1180 },
      { title: 'Paine Grande', note: 'Suspension bridges above Grey Glacier.', elev: 320 },
      { title: 'Valle del Francés', note: 'Up into the hanging valley between the horns.', elev: 760 },
      { title: 'Chileno', note: 'Traverse east under Cerro Paine.', elev: 540 },
      { title: 'Base de las Torres, out', note: 'Pre-dawn climb to the lagoon, then down and out.', elev: 880 }
    ],
    included: ['All refugio and camp bookings', 'Two guides on a group of ten', 'Park entry', 'Breakfast and dinner daily', 'Transfers from Puerto Natales'],
    excluded: ['Flights to Punta Arenas', 'Sleeping bag hire', 'Lunches on trail days', 'Travel insurance']
  },
  {
    slug: 'faroe-sea-cliffs',
    plate: '02',
    name: 'Faroe Islands Sea Cliffs',
    country: 'Faroe Islands',
    region: 'Arctic & North Atlantic',
    terrain: 'coast',
    lat: 62.0079, lng: -6.7908,
    days: 6,
    priceFrom: 2290,
    grade: 2,
    groupMax: 12,
    months: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    summary: 'Six days of grass-topped cliffs, ferries and village churches across four islands, timed for the long northern light.',
    highlights: [
      'The cliff walk to Kallur lighthouse on Kalsoy',
      'Boat under the bird cliffs at Vestmanna',
      'Sørvágsvatn, the lake that appears to hang above the sea',
      'A village dinner in Gjógv at the end of the road'
    ],
    itinerary: [
      { title: 'Tórshavn', note: 'Turf roofs in Tinganes, harbour walk, briefing.', elev: 20 },
      { title: 'Vágar', note: 'Sørvágsvatn to the Trælanípa headland and Bøsdalafossur.', elev: 140 },
      { title: 'Vestmanna', note: 'Bird cliffs by boat, then the Saksun valley.', elev: 60 },
      { title: 'Kalsoy', note: 'Ferry and the ridge walk out to Kallur.', elev: 220 },
      { title: 'Gjógv', note: 'The sea gorge, and Slættaratindur if the cloud lifts.', elev: 380 },
      { title: 'Tórshavn, out', note: 'Morning at Kirkjubøur, afternoon flights.', elev: 20 }
    ],
    included: ['Five nights guesthouse and one farm stay', 'All inter-island ferries and tunnels', 'Vestmanna boat charter', 'Breakfasts and three dinners', 'Local guide throughout'],
    excluded: ['Flights to Vágar', 'Lunches', 'Waterproofs', 'Travel insurance']
  },
  {
    slug: 'kyoto-nara-old-roads',
    plate: '03',
    name: 'Kyoto to Nara on the Old Roads',
    country: 'Japan',
    region: 'Asia',
    terrain: 'forest',
    lat: 34.9855, lng: 135.7588,
    days: 8,
    priceFrom: 3950,
    grade: 2,
    groupMax: 10,
    months: ['Mar', 'Apr', 'May', 'Oct', 'Nov'],
    summary: 'Walking the pilgrim paths and cedar hills between two old capitals, staying in temple lodgings and ryokan along the way.',
    highlights: [
      'A night in shukubo temple lodging on Mount Kōya',
      'The bamboo and cedar of the Kitayama hills above Kyoto',
      'Tea with a fifteenth-generation potter in Uji',
      'Dawn in the Kasuga deer park before Nara wakes'
    ],
    itinerary: [
      { title: 'Kyoto', note: 'Arrival, Higashiyama lanes at dusk, welcome dinner.', elev: 50 },
      { title: 'Kurama to Kibune', note: 'Cedar ridge path, then the river-terrace village.', elev: 480 },
      { title: 'Arashiyama and Takao', note: 'Upstream from the bamboo into the maple valleys.', elev: 320 },
      { title: 'Uji', note: 'Tea houses, the Byōdō-in phoenix hall, a potter\'s workshop.', elev: 40 },
      { title: 'Yoshino', note: 'Train south, then the cherry-terraced ridge.', elev: 610 },
      { title: 'Mount Kōya', note: 'Chōishi-michi pilgrim path and temple lodging.', elev: 850 },
      { title: 'Okunoin to Nara', note: 'Cedar cemetery at first light, then north to Nara.', elev: 100 },
      { title: 'Nara, out', note: 'Kasuga shrine paths at dawn, midday departure.', elev: 90 }
    ],
    included: ['Seven nights, including two temple lodgings', 'All rail and local transport', 'Breakfasts, four dinners, one tea ceremony', 'Bilingual guide', 'Luggage forwarding between towns'],
    excluded: ['International flights', 'Most lunches', 'Temple entry beyond those listed', 'Travel insurance']
  },
  {
    slug: 'wadi-rum-petra-traverse',
    plate: '04',
    name: 'Wadi Rum & Petra Traverse',
    country: 'Jordan',
    region: 'Africa & Middle East',
    terrain: 'desert',
    lat: 29.5765, lng: 35.4200,
    days: 7,
    priceFrom: 2680,
    grade: 3,
    groupMax: 12,
    months: ['Mar', 'Apr', 'Oct', 'Nov'],
    summary: 'Sandstone towers, Bedouin camps and a back-country approach that brings you into Petra over the ridge rather than through the gate.',
    highlights: [
      'Two nights camped among the Wadi Rum towers',
      'Scrambling Jebel Burdah rock bridge',
      'Entering Petra from the high Monastery trail',
      'Bread baked in sand at a Zalabia family camp'
    ],
    itinerary: [
      { title: 'Amman to Dana', note: 'South along the King\'s Highway to the reserve rim.', elev: 1180 },
      { title: 'Dana to Feynan', note: 'Down the wadi through four climate zones.', elev: 340 },
      { title: 'Feynan', note: 'Copper-age smelting sites, goat-herd trails, candlelit lodge.', elev: 320 },
      { title: 'Little Petra to Petra', note: 'The back ridge and the first sight of the Monastery.', elev: 1050 },
      { title: 'Petra', note: 'Siq, Treasury, royal tombs and the High Place of Sacrifice.', elev: 900 },
      { title: 'Wadi Rum', note: 'Into the desert, Jebel Burdah scramble, camp under the towers.', elev: 900 },
      { title: 'Rum to Aqaba, out', note: 'Dawn light on Um Fruth, then the Red Sea.', elev: 20 }
    ],
    included: ['Six nights: lodge, camp and guesthouse', 'Petra two-day pass and Rum reserve fees', 'All meals', 'Bedouin guides in Rum', 'Transfers from Amman'],
    excluded: ['Flights', 'Jordan visa', 'Drinks', 'Travel insurance']
  },
  {
    slug: 'svalbard-pack-ice-sail',
    plate: '05',
    name: 'Svalbard Pack-Ice Sail',
    country: 'Norway',
    region: 'Arctic & North Atlantic',
    terrain: 'ice',
    lat: 78.2232, lng: 15.6267,
    days: 8,
    priceFrom: 7400,
    grade: 3,
    groupMax: 12,
    months: ['Jun', 'Jul', 'Aug'],
    summary: 'North from Longyearbyen aboard a twelve-berth sailing vessel, working the fjords and the ice edge for as far as the season allows.',
    highlights: [
      'Standing watch at the pack-ice edge in full daylight at midnight',
      'Walrus haul-outs on the Forlandet sandbanks',
      'Landing at a nineteenth-century whaling station',
      'Kittiwake cliffs at Alkefjellet, a hundred thousand birds deep'
    ],
    itinerary: [
      { title: 'Longyearbyen', note: 'Board, safety and rifle briefing, sail on the evening tide.', elev: 0 },
      { title: 'Isfjorden', note: 'Glacier fronts and the abandoned Russian settlement.', elev: 0 },
      { title: 'Forlandsundet', note: 'Walrus haul-out, first landing on the tundra.', elev: 30 },
      { title: 'Krossfjorden', note: 'Zodiac work along the calving face of Fjortende Julibreen.', elev: 0 },
      { title: 'North to the ice', note: 'Open water crossing, watches through the bright night.', elev: 0 },
      { title: 'The ice edge', note: 'As far north as conditions allow — bearded seal, bear sign.', elev: 0 },
      { title: 'Hinlopen', note: 'Alkefjellet bird cliffs, then south with the current.', elev: 0 },
      { title: 'Longyearbyen, out', note: 'Dock mid-morning, afternoon flights.', elev: 0 }
    ],
    included: ['Seven nights aboard in shared cabins', 'All meals and the ship\'s crew', 'Expedition leader and armed guide ashore', 'Zodiac landings', 'Boots and float suits'],
    excluded: ['Flights to Longyearbyen', 'Night before departure ashore', 'Alcohol', 'Mandatory evacuation insurance']
  },
  {
    slug: 'toubkal-ascent',
    plate: '06',
    name: 'Mount Toubkal Ascent',
    country: 'Morocco',
    region: 'Africa & Middle East',
    terrain: 'alpine',
    lat: 31.0603, lng: -7.9153,
    days: 6,
    priceFrom: 1690,
    grade: 3,
    groupMax: 12,
    months: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
    summary: 'North Africa\'s highest summit by the Azzaden approach, through Berber villages and walnut terraces rather than the crowded Imlil track.',
    highlights: [
      'The quiet Azzaden valley approach',
      'Summit morning at 4,167 m with the Sahara haze to the south',
      'Tea in a village house at Tacheddirt',
      'Mule-supported walking with local muleteers'
    ],
    itinerary: [
      { title: 'Marrakech to Imlil', note: 'Out of the plain into the walnut terraces.', elev: 1740 },
      { title: 'Azzaden valley', note: 'Over the Tizi Mzik to the far side of the range.', elev: 2200 },
      { title: 'Toubkal refuge', note: 'Long ascent along the Agoundis, then the refuge.', elev: 3200 },
      { title: 'Summit day', note: 'Scree at first light, top by mid-morning, back down.', elev: 4167 },
      { title: 'Tacheddirt', note: 'Traverse east under the ridge to the highest village.', elev: 2300 },
      { title: 'Marrakech, out', note: 'Down through Imlil, back to the city by lunch.', elev: 460 }
    ],
    included: ['Five nights: riad, gîte and mountain refuge', 'Mules and muleteers', 'All meals on the mountain', 'IFMGA-qualified lead guide', 'Marrakech transfers'],
    excluded: ['Flights to Marrakech', 'Crampons in shoulder season', 'City meals', 'Travel insurance']
  },
  {
    slug: 'danube-bend-bicycle',
    plate: '07',
    name: 'The Danube Bend by Bicycle',
    country: 'Hungary & Slovakia',
    region: 'Europe',
    terrain: 'river',
    lat: 47.7944, lng: 18.8598,
    days: 7,
    priceFrom: 2140,
    grade: 1,
    groupMax: 14,
    months: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
    summary: 'Flat riverside riding from Bratislava to Budapest, where the Danube turns south through the hills — short days, long lunches.',
    highlights: [
      'The basilica at Esztergom seen from the far bank',
      'A river ferry crossing with the bikes at Vác',
      'Vineyard lunch above the bend at Visegrád',
      'Arriving into Budapest along the embankment at dusk'
    ],
    itinerary: [
      { title: 'Bratislava', note: 'Bike fit, old town, evening on the river.', elev: 130 },
      { title: 'To Győr', note: 'The Szigetköz side channels and willow flats.', elev: 115 },
      { title: 'To Komárom', note: 'Fortress town on both banks.', elev: 110 },
      { title: 'To Esztergom', note: 'The basilica dome visible for an hour before you reach it.', elev: 105 },
      { title: 'To Visegrád', note: 'The bend itself, citadel above, vineyard lunch.', elev: 320 },
      { title: 'To Szentendre', note: 'Ferry at Vác, then the artists\' town.', elev: 100 },
      { title: 'Into Budapest, out', note: 'Embankment ride to the Chain Bridge, farewell dinner.', elev: 100 }
    ],
    included: ['Six nights three-star and boutique hotels', 'Hybrid or e-bike hire and helmet', 'Luggage transfer daily', 'Breakfasts and four dinners', 'Support vehicle and mechanic'],
    excluded: ['Flights', 'Lunches', 'Museum entry', 'Travel insurance']
  },
  {
    slug: 'namib-sand-sea',
    plate: '08',
    name: 'Namib Sand Sea',
    country: 'Namibia',
    region: 'Africa & Middle East',
    terrain: 'desert',
    lat: -24.7276, lng: 15.3444,
    days: 9,
    priceFrom: 4850,
    grade: 2,
    groupMax: 8,
    months: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    summary: 'The oldest desert on earth, from the dune field at Sossusvlei to the fog coast at Sandwich Harbour, with three nights in the Namib-Rand dark-sky reserve.',
    highlights: [
      'Deadvlei\'s camelthorn skeletons before the tour buses',
      'Sleeping out under a Bortle 1 sky in Namib-Rand',
      'Where the dune field meets the Atlantic at Sandwich Harbour',
      'Tracking desert-adapted oryx with a Nama guide'
    ],
    itinerary: [
      { title: 'Windhoek', note: 'Arrive, brief, night on the highland plateau.', elev: 1700 },
      { title: 'To Namib-Rand', note: 'South over the Spreetshoogte pass into the reserve.', elev: 1100 },
      { title: 'Namib-Rand', note: 'Dune walks, gemsbok, and the darkest sky in Africa.', elev: 1050 },
      { title: 'Namib-Rand', note: 'Nara melon plains and a night sleeping out.', elev: 1080 },
      { title: 'Sesriem', note: 'North to the gate, canyon walk in late light.', elev: 780 },
      { title: 'Sossusvlei', note: 'Dune 45 at dawn, Deadvlei, Big Daddy for the willing.', elev: 600 },
      { title: 'To Swakopmund', note: 'Across the gravel plains, lichen fields, Kuiseb canyon.', elev: 20 },
      { title: 'Sandwich Harbour', note: 'Where dunes drop into the Atlantic; flamingo lagoon.', elev: 5 },
      { title: 'Walvis Bay, out', note: 'Morning flight north or transfer to Windhoek.', elev: 10 }
    ],
    included: ['Eight nights lodge and desert camp', 'All park and reserve fees', 'All meals', '4WD vehicles and driver-guide', 'Sandwich Harbour excursion'],
    excluded: ['International flights', 'Scenic flights over the sand sea', 'Drinks', 'Travel insurance']
  },
  {
    slug: 'druk-path-bhutan',
    plate: '09',
    name: 'The Druk Path, Bhutan',
    country: 'Bhutan',
    region: 'Asia',
    terrain: 'alpine',
    lat: 27.4712, lng: 89.6339,
    days: 10,
    priceFrom: 6200,
    grade: 4,
    groupMax: 8,
    months: ['Apr', 'May', 'Oct', 'Nov'],
    summary: 'The old high route from Paro to Thimphu over five passes and a string of glacial lakes, with dzongs and festival days at either end.',
    highlights: [
      'Camping at Jimilang Tsho with Jomolhari on the skyline',
      'Five passes above 3,900 m in four days',
      'Taktsang, the Tiger\'s Nest, on the last walking day',
      'A working dzong on a festival morning'
    ],
    itinerary: [
      { title: 'Paro', note: 'Arrive by the valley approach, acclimatise, dzong at dusk.', elev: 2280 },
      { title: 'Paro', note: 'Short acclimatisation walk to Zuri Dzong ruins.', elev: 2600 },
      { title: 'Jele Dzong', note: 'Steep first day out of the valley to the ridge fort.', elev: 3480 },
      { title: 'Jangchulakha', note: 'Ridge walking through rhododendron and yak pasture.', elev: 3770 },
      { title: 'Jimilang Tsho', note: 'To the lake known for its giant trout.', elev: 3880 },
      { title: 'Simkotra Tsho', note: 'Past Janetsho, high moorland, stone cairns.', elev: 4110 },
      { title: 'Phajoding to Thimphu', note: 'Over Phume La, then the long drop to the capital.', elev: 4210 },
      { title: 'Thimphu', note: 'Textile academy, archery ground, Tashichho Dzong.', elev: 2330 },
      { title: 'Taktsang', note: 'Back to Paro and up to the Tiger\'s Nest.', elev: 3120 },
      { title: 'Paro, out', note: 'Morning departure over the Himalaya.', elev: 2280 }
    ],
    included: ['Bhutan daily sustainable development fee', 'Nine nights hotel and full-service camp', 'All meals', 'Guide, cook, ponies and handlers', 'Visa processing'],
    excluded: ['Flights to Paro', 'Travel insurance', 'Tips', 'Personal trekking gear']
  },
  {
    slug: 'azores-volcanic-ridges',
    plate: '10',
    name: 'Azores Volcanic Ridges',
    country: 'Portugal',
    region: 'Europe',
    terrain: 'volcanic',
    lat: 38.5714, lng: -28.7000,
    days: 7,
    priceFrom: 2380,
    grade: 3,
    groupMax: 12,
    months: ['May', 'Jun', 'Jul', 'Sep', 'Oct'],
    summary: 'Three islands in the central group — crater rims, lava-field vineyards and the highest point in Portugal, with whales offshore all week.',
    highlights: [
      'Pico by night to reach the summit at sunrise',
      'UNESCO lava-walled vineyards at Criação Velha',
      'The Caldeira rim traverse on Faial',
      'Sperm whales from a converted whaleboat'
    ],
    itinerary: [
      { title: 'Horta, Faial', note: 'Marina paintings, briefing, first look at Pico across the channel.', elev: 30 },
      { title: 'Caldeira traverse', note: 'The full rim of the crater, then Capelinhos ash desert.', elev: 1043 },
      { title: 'To Pico', note: 'Ferry across, lava vineyards and a wine cooperative.', elev: 120 },
      { title: 'Pico summit', note: 'Midnight start, 2,351 m, sunrise over the caldera.', elev: 2351 },
      { title: 'Pico lava coast', note: 'Rest day: whale watching and the old whalers\' museum.', elev: 20 },
      { title: 'São Jorge', note: 'Ferry north, then the fajã descent to Caldeira de Santo Cristo.', elev: 700 },
      { title: 'Horta, out', note: 'Return ferry, afternoon flights from Faial.', elev: 30 }
    ],
    included: ['Six nights guesthouse and quinta', 'All inter-island ferries', 'Whale watching trip', 'Breakfasts and three dinners', 'Mountain guide for Pico'],
    excluded: ['Flights to the Azores', 'Lunches', 'Pico summit registration', 'Travel insurance']
  },
  {
    slug: 'kerala-ghats-backwaters',
    plate: '11',
    name: 'Kerala: Ghats to Backwaters',
    country: 'India',
    region: 'Asia',
    terrain: 'forest',
    lat: 9.9312, lng: 76.2673,
    days: 10,
    priceFrom: 3350,
    grade: 2,
    groupMax: 12,
    months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    summary: 'Down the length of the state from the cardamom hills to the coast — tea estates, a night on a rice barge, and Kathakali in the old Jewish quarter.',
    highlights: [
      'Walking a working tea estate at Munnar before the pickers finish',
      'Shola forest and Nilgiri tahr in Eravikulam',
      'A night aboard a converted rice barge on the backwaters',
      'Chinese fishing nets and a Kathakali performance in Fort Kochi'
    ],
    itinerary: [
      { title: 'Kochi', note: 'Arrive, Fort Kochi at dusk, welcome dinner.', elev: 5 },
      { title: 'Fort Kochi', note: 'Spice warehouses, Mattancherry, evening Kathakali.', elev: 5 },
      { title: 'To Munnar', note: 'Up through rubber and cardamom into the hills.', elev: 1600 },
      { title: 'Munnar', note: 'Estate walk, tea factory, Top Station viewpoint.', elev: 1880 },
      { title: 'Eravikulam', note: 'Shola grassland, tahr, and the high rolling downs.', elev: 2100 },
      { title: 'To Thekkady', note: 'South along the ridge to the Periyar reserve.', elev: 900 },
      { title: 'Periyar', note: 'Dawn bamboo raft on the lake with a tribal guide.', elev: 900 },
      { title: 'To Alleppey', note: 'Down to sea level, board the barge, sunset on the water.', elev: 3 },
      { title: 'Backwaters', note: 'Canoe through the narrow channels and village canals.', elev: 2 },
      { title: 'Kochi, out', note: 'Transfer to the airport for afternoon flights.', elev: 5 }
    ],
    included: ['Nine nights: heritage hotel, estate bungalow and houseboat', 'All internal transport with driver', 'Breakfasts and six dinners', 'Reserve permits and guides', 'Kathakali tickets'],
    excluded: ['International flights', 'India visa', 'Most lunches', 'Travel insurance']
  },
  {
    slug: 'laugavegur-highland-crossing',
    plate: '12',
    name: 'Iceland Highland Crossing',
    country: 'Iceland',
    region: 'Arctic & North Atlantic',
    terrain: 'volcanic',
    lat: 63.9836, lng: -19.0625,
    days: 6,
    priceFrom: 2950,
    grade: 3,
    groupMax: 12,
    months: ['Jul', 'Aug', 'Sep'],
    summary: 'Landmannalaugar to Þórsmörk on foot across rhyolite, obsidian and black sand, with the Fimmvörðuháls extension between two glaciers.',
    highlights: [
      'The rhyolite colour fields above Landmannalaugar',
      'Hot spring soak on the first evening',
      'River crossings on the Emstrur black sands',
      'Fimmvörðuháls between Eyjafjallajökull and Mýrdalsjökull'
    ],
    itinerary: [
      { title: 'Reykjavík to Landmannalaugar', note: 'Highland bus in, hot spring at the source.', elev: 600 },
      { title: 'To Hrafntinnusker', note: 'Steam vents, obsidian, snowfields into August.', elev: 1050 },
      { title: 'To Álftavatn', note: 'Down the escarpment to the lake, first fords.', elev: 540 },
      { title: 'To Emstrur', note: 'Black desert crossing under Mýrdalsjökull.', elev: 500 },
      { title: 'To Þórsmörk', note: 'The Þröngá ford, then birch woods in the valley.', elev: 250 },
      { title: 'Fimmvörðuháls, out', note: 'Between the glaciers, past the 2010 craters, down to Skógar.', elev: 1080 }
    ],
    included: ['Five nights in mountain huts', 'Highland bus transfers both ends', 'All meals on the trail', 'Two guides and a support porter', 'Hut bookings and fees'],
    excluded: ['Flights to Keflavík', 'Nights in Reykjavík', 'Sleeping bag', 'Travel insurance']
  },
  {
    slug: 'ausangate-circuit',
    plate: '13',
    name: 'Ausangate Circuit',
    country: 'Peru',
    region: 'Americas',
    terrain: 'alpine',
    lat: -13.7906, lng: -71.2286,
    days: 8,
    priceFrom: 3120,
    grade: 5,
    groupMax: 8,
    months: ['May', 'Jun', 'Jul', 'Aug', 'Sep'],
    summary: 'A high circuit of the Cusco region\'s holy mountain — four passes over 5,000 m, alpaca herders\' country, and the painted ridge at Vinicunca.',
    highlights: [
      'Four passes above 5,000 m, all of them in one week',
      'Hot springs at Pacchanta on the last night',
      'The mineral stripes of the Vinicunca ridge without the day crowds',
      'Staying with Q\'ero herding families along the route'
    ],
    itinerary: [
      { title: 'Cusco', note: 'Acclimatisation day, San Blas, gear check.', elev: 3400 },
      { title: 'Cusco', note: 'Maras salt pans and Moray to help the altitude.', elev: 3600 },
      { title: 'To Upis', note: 'Drive to Tinki, then walk in below the south face.', elev: 4400 },
      { title: 'Arapa Pass to Pucacocha', note: 'First 4,800 m pass, glacial lakes below.', elev: 4850 },
      { title: 'Palomani Pass', note: 'The high point of the circuit at 5,165 m.', elev: 5165 },
      { title: 'Vinicunca', note: 'Over the painted ridge before the day traffic arrives.', elev: 5030 },
      { title: 'Pacchanta', note: 'Down to the herding village and its hot springs.', elev: 4250 },
      { title: 'Cusco, out', note: 'Walk out to Tinki, drive back, farewell dinner.', elev: 3400 }
    ],
    included: ['Seven nights: hotel, full-service camp and one homestay', 'Horses, arrieros, cook and guide', 'All meals from day three', 'Emergency oxygen and radio', 'Cusco transfers'],
    excluded: ['Flights to Cusco', 'First two lunches and dinners', 'Sleeping bag hire', 'Travel insurance']
  },
  {
    slug: 'mekong-slow-boat',
    plate: '14',
    name: 'Mekong Delta Slow Boat',
    country: 'Vietnam',
    region: 'Asia',
    terrain: 'river',
    lat: 10.0452, lng: 105.7469,
    days: 8,
    priceFrom: 2760,
    grade: 1,
    groupMax: 12,
    months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    summary: 'Down the nine dragons from Saigon to the Cambodian border by sampan and slow boat, sleeping in stilt houses and one converted rice barge.',
    highlights: [
      'Cai Rang floating market at first light, from a sampan',
      'Two nights in family stilt houses on the channels',
      'Cycling the orchard islands at Ben Tre',
      'Cham weaving villages upstream of Chau Doc'
    ],
    itinerary: [
      { title: 'Ho Chi Minh City', note: 'Arrive, Cholon markets, briefing over dinner.', elev: 10 },
      { title: 'To Ben Tre', note: 'South into coconut country, first sampan channels.', elev: 3 },
      { title: 'Ben Tre', note: 'Orchard islands by bicycle, brick kilns, homestay.', elev: 3 },
      { title: 'To Can Tho', note: 'Slow boat downstream, river-front evening.', elev: 2 },
      { title: 'Cai Rang', note: 'Floating market before dawn, then the small canals.', elev: 2 },
      { title: 'To Long Xuyen', note: 'Rice barge upstream through the flood plain.', elev: 3 },
      { title: 'Chau Doc', note: 'Sam Mountain, Cham villages, fish farms under the houses.', elev: 30 },
      { title: 'Back to Saigon, out', note: 'Fast road east, afternoon flights.', elev: 10 }
    ],
    included: ['Seven nights: hotel, two homestays, one barge', 'All boats and transfers', 'Breakfasts, five lunches, four dinners', 'Bicycles at Ben Tre', 'English-speaking delta guide'],
    excluded: ['International flights', 'Vietnam visa', 'Drinks', 'Travel insurance']
  },
  {
    slug: 'alta-via-uno-dolomites',
    plate: '15',
    name: 'Alta Via 1, Dolomites',
    country: 'Italy',
    region: 'Europe',
    terrain: 'alpine',
    lat: 46.5405, lng: 12.1357,
    days: 9,
    priceFrom: 3290,
    grade: 3,
    groupMax: 10,
    months: ['Jun', 'Jul', 'Aug', 'Sep'],
    summary: 'The classic high route from Lago di Braies to the Belluno valley, rifugio to rifugio, through the limestone towers and the Great War tunnels.',
    highlights: [
      'The Fanes plateau in early morning light',
      'Lagazuoi\'s wartime tunnels cut through the mountain',
      'Nine nights of rifugio dinners, none of them the same',
      'Civetta\'s north-west wall, a kilometre of vertical limestone'
    ],
    itinerary: [
      { title: 'Lago di Braies', note: 'Transfer in, lake walk, first climb to Rifugio Biella.', elev: 2327 },
      { title: 'To Fanes', note: 'Across the karst plateau to the Fanes huts.', elev: 2300 },
      { title: 'To Lagazuoi', note: 'Passo Falzarego and up to the ridge hut.', elev: 2752 },
      { title: 'To Nuvolau', note: 'Wartime tunnels down, then the Cinque Torri.', elev: 2575 },
      { title: 'To Città di Fiume', note: 'Under the Pelmo\'s great step.', elev: 1918 },
      { title: 'To Coldai', note: 'Around the head of the valley to the Civetta wall.', elev: 2132 },
      { title: 'To Vazzoler', note: 'The full length of the north-west face.', elev: 1714 },
      { title: 'To Pramperet', note: 'Through the Moiazza gap into quieter country.', elev: 1857 },
      { title: 'To Belluno, out', note: 'Over the Schiara shoulder and down to the valley.', elev: 1600 }
    ],
    included: ['Eight nights half board in rifugi', 'All hut bookings', 'Luggage transfer at two points', 'Mountain guide', 'Transfers from Cortina'],
    excluded: ['Flights to Venice', 'Lunches', 'Via ferrata kit hire', 'Travel insurance']
  },
  {
    slug: 'serengeti-green-season',
    plate: '16',
    name: 'Serengeti Green Season',
    country: 'Tanzania',
    region: 'Africa & Middle East',
    terrain: 'savanna',
    lat: -2.3333, lng: 34.8333,
    days: 8,
    priceFrom: 6850,
    grade: 1,
    groupMax: 6,
    months: ['Jan', 'Feb', 'Mar'],
    summary: 'The short-grass plains in calving season, when half a million wildebeest are born in three weeks and the predators are never far off.',
    highlights: [
      'Calving on the Ndutu short-grass plains',
      'Cheetah hunting in open country with nowhere to hide',
      'Two nights in a mobile camp that moves with the herds',
      'The Ngorongoro crater floor at opening time'
    ],
    itinerary: [
      { title: 'Arusha', note: 'Arrive, coffee farm lunch, briefing.', elev: 1400 },
      { title: 'To Ngorongoro', note: 'Up the rift wall to the crater rim.', elev: 2300 },
      { title: 'Crater floor', note: 'Down at opening, black rhino and the soda lake flamingos.', elev: 1750 },
      { title: 'To Ndutu', note: 'Onto the short-grass plains, mobile camp.', elev: 1600 },
      { title: 'Ndutu', note: 'Calving herds, cheetah on the open ground.', elev: 1600 },
      { title: 'Ndutu', note: 'Full day out with a packed lunch under an acacia.', elev: 1600 },
      { title: 'Seronera', note: 'North into the central Serengeti, leopard country.', elev: 1520 },
      { title: 'Fly out', note: 'Bush strip to Arusha or Kilimanjaro.', elev: 1400 }
    ],
    included: ['Seven nights lodge and mobile tented camp', 'All park and crater fees', 'All meals and soft drinks', 'Private 4WD and driver-guide', 'Internal bush flight'],
    excluded: ['International flights', 'Tanzania visa', 'Balloon flight', 'Travel insurance']
  },
  {
    slug: 'svaneti-towers',
    plate: '17',
    name: 'Svaneti Tower Country',
    country: 'Georgia',
    region: 'Europe',
    terrain: 'alpine',
    lat: 43.0167, lng: 42.7000,
    days: 9,
    priceFrom: 2480,
    grade: 3,
    groupMax: 12,
    months: ['Jun', 'Jul', 'Aug', 'Sep'],
    summary: 'Village to village under the Caucasus wall, through the defensive tower hamlets of Upper Svaneti to Ushguli and the Shkhara glacier.',
    highlights: [
      'Four days walking Mestia to Ushguli, guesthouse to guesthouse',
      'The Shkhara glacier head-wall, 5,193 m straight up',
      'Medieval tower houses still lived in at Chazhashi',
      'Supra dinners with a village toastmaster'
    ],
    itinerary: [
      { title: 'Tbilisi', note: 'Arrive, old town sulphur baths, briefing.', elev: 450 },
      { title: 'To Mestia', note: 'Long drive up the Enguri gorge into the mountains.', elev: 1500 },
      { title: 'Mestia', note: 'Chalaadi glacier walk and the ethnographic museum.', elev: 1700 },
      { title: 'To Zhabeshi', note: 'First walking day along the Mulkhra valley.', elev: 1650 },
      { title: 'To Adishi', note: 'Over the forest pass to a village of nine towers.', elev: 2400 },
      { title: 'To Iprari', note: 'Glacier river ford, then the Chkhutnieri pass.', elev: 2720 },
      { title: 'To Ushguli', note: 'Into Europe\'s highest continuously settled village.', elev: 2100 },
      { title: 'Shkhara glacier', note: 'Up the valley to the head-wall and back.', elev: 2300 },
      { title: 'Tbilisi, out', note: 'Drive down, evening flights.', elev: 450 }
    ],
    included: ['Eight nights guesthouse and family homestay', 'All transport including 4WD transfers', 'Breakfasts and dinners', 'Luggage transfer between villages', 'Local Svan guide'],
    excluded: ['Flights to Tbilisi', 'Lunches', 'Drinks at supra dinners', 'Travel insurance']
  },
  {
    slug: 'baja-sea-of-cortez',
    plate: '18',
    name: 'Sea of Cortez by Kayak',
    country: 'Mexico',
    region: 'Americas',
    terrain: 'coast',
    lat: 24.1426, lng: -110.3128,
    days: 7,
    priceFrom: 2890,
    grade: 2,
    groupMax: 10,
    months: ['Feb', 'Mar', 'Apr', 'Nov'],
    summary: 'Paddling and beach-camping the Espíritu Santo archipelago — Steinbeck\'s "aquarium of the world," with sea lions, whale sharks and nothing else on the beach.',
    highlights: [
      'Snorkelling the sea lion colony at Los Islotes',
      'Five nights camped on empty beaches',
      'Whale sharks in the shallows off La Paz',
      'Bioluminescence in the water on a moonless night'
    ],
    itinerary: [
      { title: 'La Paz', note: 'Arrive, paddle briefing, malecón dinner.', elev: 5 },
      { title: 'To Espíritu Santo', note: 'Boat out, first paddle, camp at Playa Bonanza.', elev: 2 },
      { title: 'North along the coast', note: 'Sea caves and red cliffs, camp at Ensenada Grande.', elev: 2 },
      { title: 'Los Islotes', note: 'Sea lion colony snorkel, layover day.', elev: 2 },
      { title: 'Isla Partida', note: 'Crossing the narrows, mangrove channel walk.', elev: 2 },
      { title: 'South to Candelero', note: 'Long paddle down the lee shore.', elev: 2 },
      { title: 'La Paz, out', note: 'Return crossing, whale sharks if they are in.', elev: 5 }
    ],
    included: ['Six nights: hotel and beach camps', 'Sea kayaks and all paddle gear', 'All meals on the water', 'Two guides and a support panga', 'Marine park fees'],
    excluded: ['Flights to La Paz', 'Sleeping bag hire', 'Alcohol', 'Travel insurance']
  },
  {
    slug: 'cape-wrath-trail-north',
    plate: '19',
    name: 'Cape Wrath Trail: North Section',
    country: 'Scotland',
    region: 'Europe',
    terrain: 'forest',
    lat: 58.6255, lng: -4.9995,
    days: 8,
    priceFrom: 2650,
    grade: 5,
    groupMax: 8,
    months: ['May', 'Jun', 'Sep'],
    summary: 'The last and hardest stretch of Britain\'s toughest long-distance route, from Ullapool to the north-west corner, mostly pathless.',
    highlights: [
      'Sandwood Bay, four miles from the nearest road',
      'Two nights in bothies with no one else in them',
      'Suilven and Stac Pollaidh on the skyline for days',
      'The lighthouse at Cape Wrath and nothing beyond it'
    ],
    itinerary: [
      { title: 'Ullapool', note: 'Kit check, weather brief, harbour night.', elev: 10 },
      { title: 'To Knockdamph', note: 'East out of town, then north on the old drove road.', elev: 260 },
      { title: 'To Oykel Bridge', note: 'River path, then bothy on the moor.', elev: 180 },
      { title: 'To Inchnadamph', note: 'Under Conival, limestone country and caves.', elev: 420 },
      { title: 'To Glendhu', note: 'Bealach walking with Quinag to the west.', elev: 520 },
      { title: 'To Rhiconich', note: 'Pathless bog and lochan ground — the hard day.', elev: 340 },
      { title: 'To Sandwood Bay', note: 'North to the great empty beach, camp behind the dunes.', elev: 60 },
      { title: 'Cape Wrath, out', note: 'The last headland, then the ferry and minibus south.', elev: 120 }
    ],
    included: ['Seven nights: two hotels, two bothies, three wild camps', 'All group camping and cooking gear', 'All meals and resupply drops', 'Two mountain leaders', 'Transfer from Inverness'],
    excluded: ['Travel to Inverness', 'Personal tent and sleeping bag', 'Waterproofs', 'Travel insurance']
  },
  {
    slug: 'cappadocia-valleys',
    plate: '20',
    name: 'Cappadocia Valley Walks',
    country: 'Turkey',
    region: 'Africa & Middle East',
    terrain: 'desert',
    lat: 38.6431, lng: 34.8289,
    days: 6,
    priceFrom: 1980,
    grade: 2,
    groupMax: 14,
    months: ['Apr', 'May', 'Jun', 'Sep', 'Oct'],
    summary: 'Tufa valleys, rock-cut churches and underground cities, walked at ground level rather than seen from a balloon — though the balloon is there if you want it.',
    highlights: [
      'The Ihlara gorge, a green cut through the plateau',
      'Byzantine frescoes in valley churches with no ticket office',
      'Two nights in a restored cave house in Ortahisar',
      'Sunrise over Love Valley from the rim, balloons overhead'
    ],
    itinerary: [
      { title: 'Kayseri to Ortahisar', note: 'Transfer, cave hotel, evening on the rock castle.', elev: 1200 },
      { title: 'Red and Rose valleys', note: 'Rock churches, pigeon houses, apricot orchards.', elev: 1250 },
      { title: 'Ihlara gorge', note: 'The full length of the canyon, lunch by the stream.', elev: 1100 },
      { title: 'Derinkuyu and Soğanlı', note: 'Underground city, then a quiet valley of tombs.', elev: 1350 },
      { title: 'Pigeon and Love valleys', note: 'Uçhisar rim at first light, then down through the fairy chimneys.', elev: 1300 },
      { title: 'Kayseri, out', note: 'Pottery workshop in Avanos, afternoon transfer.', elev: 1050 }
    ],
    included: ['Five nights cave hotels', 'All transfers and site entries', 'Breakfasts and three dinners', 'Local guide throughout', 'Pottery workshop'],
    excluded: ['Flights to Kayseri', 'Balloon flight (bookable, from $240)', 'Lunches', 'Travel insurance']
  },
  {
    slug: 'sri-lanka-hill-country',
    plate: '21',
    name: 'Sri Lanka Hill Country by Rail',
    country: 'Sri Lanka',
    region: 'Asia',
    terrain: 'forest',
    lat: 6.9497, lng: 80.7891,
    days: 9,
    priceFrom: 2740,
    grade: 2,
    groupMax: 12,
    months: ['Jan', 'Feb', 'Mar', 'Jul', 'Aug'],
    summary: 'The colonial rail line up into the tea hills, walking off it at each stop — cloud forest, estate villages, and a dawn on Adam\'s Peak.',
    highlights: [
      'The Kandy to Ella line, still the best train ride in Asia',
      'Adam\'s Peak by night with the pilgrim procession',
      'World\'s End escarpment in Horton Plains at first light',
      'Tea plucking and tasting on a working estate'
    ],
    itinerary: [
      { title: 'Negombo', note: 'Arrive, lagoon fish market, first night on the coast.', elev: 5 },
      { title: 'To Kandy', note: 'Inland by road, Temple of the Tooth at evening puja.', elev: 500 },
      { title: 'Kandy', note: 'Botanic gardens and the Knuckles foothill villages.', elev: 700 },
      { title: 'Rail to Hatton', note: 'The climb begins — tunnels, tea, hairpins.', elev: 1270 },
      { title: 'Adam\'s Peak', note: 'Two-thirty start, 5,500 steps, sunrise shadow.', elev: 2243 },
      { title: 'To Nuwara Eliya', note: 'Estate walk and factory tour, colonial hill station night.', elev: 1890 },
      { title: 'Horton Plains', note: 'Cloud forest at dawn, World\'s End, Baker\'s Falls.', elev: 2100 },
      { title: 'Rail to Ella', note: 'The famous stretch — Nine Arch bridge, Little Adam\'s Peak.', elev: 1040 },
      { title: 'Colombo, out', note: 'Down to the coast and the airport.', elev: 10 }
    ],
    included: ['Eight nights hotel, estate bungalow and guesthouse', 'All rail tickets in reserved class', 'Breakfasts and five dinners', 'Park permits and guides', 'Support vehicle for luggage'],
    excluded: ['International flights', 'Sri Lanka ETA', 'Most lunches', 'Travel insurance']
  },
  {
    slug: 'disko-bay-greenland',
    plate: '22',
    name: 'Disko Bay Ice',
    country: 'Greenland',
    region: 'Arctic & North Atlantic',
    terrain: 'ice',
    lat: 69.2198, lng: -51.0986,
    days: 8,
    priceFrom: 6100,
    grade: 3,
    groupMax: 10,
    months: ['Jun', 'Jul', 'Aug', 'Sep'],
    summary: 'The Ilulissat icefjord and the basalt island across the bay — the fastest-moving glacier outside Antarctica, plus tundra walking and boat work among the bergs.',
    highlights: [
      'The Sermeq Kujalleq calving front, 40 metres a day',
      'Crossing to Disko Island and its basalt terraces',
      'A night at a sheep farm settlement of eleven people',
      'Midnight sun over the icefjord from the Sermermiut ridge'
    ],
    itinerary: [
      { title: 'Ilulissat', note: 'Arrive, the icefjord boardwalk in evening light.', elev: 40 },
      { title: 'Sermermiut', note: 'Full-day walk along the fjord rim to the calving view.', elev: 220 },
      { title: 'Icefjord by boat', note: 'Among the grounded bergs at the mouth of the fjord.', elev: 0 },
      { title: 'To Ilimanaq', note: 'Boat south to the old trading settlement.', elev: 20 },
      { title: 'To Qeqertarsuaq', note: 'Crossing Disko Bay to the basalt island.', elev: 30 },
      { title: 'Disko Island', note: 'Blæsedalen valley, hot springs, whale bones on the beach.', elev: 480 },
      { title: 'Back to Ilulissat', note: 'Return crossing, humpbacks feeding in the bay.', elev: 40 },
      { title: 'Fly out', note: 'Morning departure via Kangerlussuaq or Nuuk.', elev: 40 }
    ],
    included: ['Seven nights hotel and settlement guesthouse', 'All boat crossings and charters', 'Breakfasts and five dinners', 'Greenlandic guide', 'Icefjord permits'],
    excluded: ['Flights to Greenland', 'Lunches', 'Helicopter transfers if weather diverts', 'Travel insurance']
  },
  {
    slug: 'gr20-south-corsica',
    plate: '23',
    name: 'GR20 South, Corsica',
    country: 'France',
    region: 'Europe',
    terrain: 'alpine',
    lat: 42.1000, lng: 9.0500,
    days: 8,
    priceFrom: 2560,
    grade: 4,
    groupMax: 10,
    months: ['Jun', 'Jul', 'Sep'],
    summary: 'The southern half of Europe\'s hardest waymarked trail — granite slabs, high lakes and the Aiguilles de Bavella, finishing at the sea.',
    highlights: [
      'The Bavella needles, red granite against black pine',
      'Swimming in the Cavu river pools on the last day',
      'Refuge nights above the tree line',
      'Monte Incudine, the last two-thousander of the route'
    ],
    itinerary: [
      { title: 'Vizzavona', note: 'Train from Bastia, gear check, refuge night.', elev: 910 },
      { title: 'To Capannelle', note: 'Beech forest, then out onto the open ridge.', elev: 1586 },
      { title: 'To Prati', note: 'Long ridge day with the sea visible on both sides.', elev: 1820 },
      { title: 'To Usciolu', note: 'The arête — granite blocks and scrambling.', elev: 1750 },
      { title: 'To Asinao', note: 'Over Monte Incudine, the highest point of the south.', elev: 2134 },
      { title: 'To Bavella', note: 'Under the needles by the alpine variant.', elev: 1218 },
      { title: 'To Conca', note: 'The last col, then down through maquis to the village.', elev: 1050 },
      { title: 'Porto-Vecchio, out', note: 'Sea swim, farewell lunch, afternoon transfers.', elev: 10 }
    ],
    included: ['Seven nights refuge half board', 'All refuge bookings', 'Mountain guide and assistant', 'Transfers from Bastia and to Porto-Vecchio', 'Trail lunches'],
    excluded: ['Flights to Corsica', 'Nights either end in town', 'Sleeping bag liner', 'Travel insurance']
  },
  {
    slug: 'oaxaca-sierra-norte',
    plate: '24',
    name: 'Oaxaca: Sierra Norte',
    country: 'Mexico',
    region: 'Americas',
    terrain: 'forest',
    lat: 17.3167, lng: -96.4667,
    days: 7,
    priceFrom: 2180,
    grade: 2,
    groupMax: 12,
    months: ['Feb', 'Mar', 'Apr', 'Oct', 'Nov'],
    summary: 'The Pueblos Mancomunados — eight Zapotec villages that run their own cloud-forest trail network — bookended by three days of Oaxaca city markets and mezcal.',
    highlights: [
      'Village-run cabins in the cloud forest at 3,000 m',
      'A mezcal palenque still using a horse-drawn tahona',
      'Monte Albán on the ridge above the valley',
      'Cooking a mole negro with a market cook in Oaxaca'
    ],
    itinerary: [
      { title: 'Oaxaca', note: 'Arrive, Benito Juárez market, welcome dinner.', elev: 1550 },
      { title: 'Oaxaca', note: 'Monte Albán at opening, then a Zapotec weaving village.', elev: 1940 },
      { title: 'To Cuajimoloyas', note: 'Up into the sierra, first walk on the ridge.', elev: 3200 },
      { title: 'To Latuvi', note: 'Down through cloud forest on the old Camino Real.', elev: 2400 },
      { title: 'To Lachatao', note: 'Mining-era churches in half-empty villages.', elev: 2600 },
      { title: 'To Oaxaca', note: 'Walk out to Amatlán, drive back, mezcal palenque.', elev: 1550 },
      { title: 'Oaxaca, out', note: 'Morning cooking class, afternoon flights.', elev: 1550 }
    ],
    included: ['Six nights: city hotel and village cabins', 'All transport including sierra transfers', 'Breakfasts and four dinners', 'Community guides and village fees', 'Cooking class and palenque visit'],
    excluded: ['Flights to Oaxaca', 'Most lunches', 'Mezcal to take home', 'Travel insurance']
  },
  {
    slug: 'fiordland-traverse',
    plate: '25',
    name: 'Fiordland Traverse',
    country: 'New Zealand',
    region: 'Oceania',
    terrain: 'forest',
    lat: -44.9667, lng: 167.9333,
    days: 9,
    priceFrom: 4380,
    grade: 3,
    groupMax: 10,
    months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    summary: 'The Routeburn and Milford tracks back to back, with two days on the water in Doubtful Sound between them.',
    highlights: [
      'Harris Saddle and the Hollyford valley below',
      'Sutherland Falls, 580 metres in three leaps',
      'An overnight boat in Doubtful Sound with the engines off',
      'Mackinnon Pass on a clear day, if you get one'
    ],
    itinerary: [
      { title: 'Queenstown', note: 'Arrive, gear check, lakeside briefing.', elev: 310 },
      { title: 'Routeburn Flats', note: 'Into the beech forest, first hut.', elev: 600 },
      { title: 'Harris Saddle to the Divide', note: 'The high traverse with the Darrans in view.', elev: 1255 },
      { title: 'To Doubtful Sound', note: 'Over Wilmot Pass, board the overnight vessel.', elev: 670 },
      { title: 'Doubtful Sound', note: 'Kayaks at dawn, bottlenose dolphins, back to Manapouri.', elev: 0 },
      { title: 'Milford: Clinton', note: 'Boat up Te Anau, then the valley floor.', elev: 300 },
      { title: 'Mintaro', note: 'Up the Clinton under the avalanche paths.', elev: 600 },
      { title: 'Mackinnon Pass to Dumpling', note: 'The pass, then Sutherland Falls side trip.', elev: 1154 },
      { title: 'Sandfly Point, out', note: 'Down the Arthur to the boat and Milford.', elev: 5 }
    ],
    included: ['Eight nights: hotel, DOC huts and overnight vessel', 'All Great Walk hut bookings', 'All meals on track', 'Two guides', 'Boat and bus transfers'],
    excluded: ['Flights to Queenstown', 'Sleeping bag', 'Pack hire', 'Travel insurance']
  },
  {
    slug: 'accursed-mountains',
    plate: '26',
    name: 'The Accursed Mountains',
    country: 'Albania & Montenegro',
    region: 'Europe',
    terrain: 'alpine',
    lat: 42.4167, lng: 19.8167,
    days: 8,
    priceFrom: 2090,
    grade: 3,
    groupMax: 12,
    months: ['Jun', 'Jul', 'Aug', 'Sep'],
    summary: 'A loop of the Peaks of the Balkans route across two borders — shepherds\' summer huts, karst passes, and the ferry down Lake Koman.',
    highlights: [
      'The Lake Koman ferry through a flooded gorge',
      'Valbona to Theth over the pass, the best day in the Balkans',
      'Shepherds\' summer settlements still in use above 1,800 m',
      'Border crossings on foot with a stamped permit'
    ],
    itinerary: [
      { title: 'Shkodër', note: 'Arrive, lake-front evening, permit check.', elev: 40 },
      { title: 'Koman to Valbona', note: 'The ferry up the gorge, then the valley road.', elev: 950 },
      { title: 'To Theth', note: 'Over the Valbona pass — the classic crossing.', elev: 1795 },
      { title: 'Theth', note: 'The Blue Eye spring and the lock-in tower.', elev: 750 },
      { title: 'To Plav (Montenegro)', note: 'Over the Peja pass and across the border on foot.', elev: 1710 },
      { title: 'To Vusanje', note: 'Down the Grebaje valley under the Karanfili spires.', elev: 1000 },
      { title: 'To Çerem', note: 'Back into Albania by the high shepherd route.', elev: 1560 },
      { title: 'Shkodër, out', note: 'Down the Valbona road, afternoon transfers to Tirana.', elev: 40 }
    ],
    included: ['Seven nights guesthouse and mountain hut', 'Cross-border walking permits', 'Lake Koman ferry', 'Breakfasts and dinners', 'Luggage transfer by 4WD where roads allow'],
    excluded: ['Flights to Tirana or Podgorica', 'Lunches', 'Rakia', 'Travel insurance']
  }
];

/* Departures run in the route's stated season. Prices step up in peak months and
   availability is seeded from the slug so the prototype stays consistent between loads. */
const MONTH_INDEX = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function seedFrom(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function deriveDepartures(trip) {
  const rand = seedFrom(trip.slug);
  const out = [];
  const baseYear = 2026;
  for (const year of [baseYear, baseYear + 1]) {
    trip.months.forEach((m, i) => {
      const month = MONTH_INDEX.indexOf(m);
      const day = 3 + Math.floor(rand() * 22);
      const peak = i === Math.floor(trip.months.length / 2);
      const price = Math.round((trip.priceFrom * (peak ? 1.14 : 1 + rand() * 0.06)) / 10) * 10;
      const spots = Math.max(0, Math.round(rand() * trip.groupMax));
      out.push({
        date: new Date(Date.UTC(year, month, day)),
        price,
        spots,
        peak
      });
    });
  }
  return out.sort((a, b) => a.date - b.date);
}

TRIPS.forEach(t => {
  t.departures = deriveDepartures(t);
  t.itinerary = t.itinerary.map((d, i) => ({ ...d, day: i + 1 }));
});

const REGIONS = [...new Set(TRIPS.map(t => t.region))].sort();
const TERRAINS = [...new Set(TRIPS.map(t => t.terrain))].sort();

const CATALOGUE = {
  count: TRIPS.length,
  latNorth: Math.max(...TRIPS.map(t => t.lat)),
  latSouth: Math.min(...TRIPS.map(t => t.lat)),
  countries: new Set(TRIPS.map(t => t.country)).size
};
