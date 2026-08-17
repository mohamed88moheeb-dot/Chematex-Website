/* Meridian — chart art.
   One idea at three scales: a route trace over a contour field.
   Everything is generated from real trip data (coordinates, elevations) plus a
   slug-seeded PRNG, so a given route always draws the same plate. */

const SVG_NS = 'http://www.w3.org/2000/svg';

function rng(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function el(name, attrs, parent) {
  const node = document.createElementNS(SVG_NS, name);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(node);
  return node;
}

/* A closed contour: a circle deformed by three harmonics. Successive rings share
   the harmonics and grow outward, which is what makes them read as one landform. */
function contourPath(cx, cy, radius, harmonics, squash) {
  const pts = [];
  const steps = 96;
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    let r = radius;
    harmonics.forEach(h => { r += Math.sin(a * h.f + h.p) * h.a * radius; });
    pts.push([cx + Math.cos(a) * r * 1.35, cy + Math.sin(a) * r * squash]);
  }
  return 'M' + pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('L') + 'Z';
}

/* ---------- plate art (trip cards and detail mastheads) ---------- */
function drawPlate(svg, trip, opts = {}) {
  const w = 400, h = 250;
  const rand = rng(trip.slug);
  const tint = TERRAIN[trip.terrain].tint;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '';

  const uid = `g-${trip.slug}-${opts.key || 'a'}`;
  const defs = el('defs', {}, svg);
  const grad = el('linearGradient', { id: uid, x1: '0', y1: '0', x2: '.6', y2: '1' }, defs);
  el('stop', { offset: '0', 'stop-color': tint, 'stop-opacity': '.48' }, grad);
  el('stop', { offset: '1', 'stop-color': '#0A1E2E', 'stop-opacity': '1' }, grad);

  el('rect', { width: w, height: h, fill: '#0A1E2E' }, svg);
  el('rect', { width: w, height: h, fill: `url(#${uid})` }, svg);

  // graticule
  const grid = el('g', { stroke: '#E7EDEE', 'stroke-opacity': '.07', 'stroke-width': '.5' }, svg);
  for (let x = 40; x < w; x += 40) el('line', { x1: x, y1: 0, x2: x, y2: h }, grid);
  for (let y = 40; y < h; y += 40) el('line', { x1: 0, y1: y, x2: w, y2: y }, grid);

  // contour field
  const harmonics = [
    { f: 2 + Math.floor(rand() * 3), a: .10 + rand() * .10, p: rand() * 6.28 },
    { f: 4 + Math.floor(rand() * 3), a: .05 + rand() * .07, p: rand() * 6.28 },
    { f: 7 + Math.floor(rand() * 4), a: .02 + rand() * .03, p: rand() * 6.28 }
  ];
  const cx = w * (.3 + rand() * .4);
  const cy = h * (.35 + rand() * .3);
  const squash = .8 + rand() * .5;
  const rings = el('g', { fill: 'none', stroke: '#E7EDEE', 'stroke-width': '.7' }, svg);
  for (let i = 0; i < 11; i++) {
    el('path', {
      d: contourPath(cx, cy, 16 + i * 15, harmonics, squash),
      'stroke-opacity': (0.30 - i * 0.021).toFixed(3)
    }, rings);
  }

  // route trace — the profile of the trip laid across the plate
  const elevs = trip.itinerary.map(d => d.elev);
  const min = Math.min(...elevs), max = Math.max(...elevs);
  const span = Math.max(1, max - min);
  const pad = 46;
  const pts = elevs.map((e, i) => [
    pad + (i / (elevs.length - 1)) * (w - pad * 2),
    h - 52 - ((e - min) / span) * (h * 0.42)
  ]);
  const d = pts.reduce((acc, p, i) => acc + (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1), '');

  el('path', { d, fill: 'none', stroke: '#0A1E2E', 'stroke-opacity': '.5', 'stroke-width': '4', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, svg);
  const line = el('path', {
    d, fill: 'none', stroke: '#E4572E', 'stroke-width': '1.6',
    'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'route-line'
  }, svg);
  try { line.style.setProperty('--len', line.getTotalLength()); } catch (_) { line.style.setProperty('--len', '900'); }

  pts.forEach((p, i) => {
    const last = i === pts.length - 1;
    if (i === 0 || last) {
      el('circle', { cx: p[0], cy: p[1], r: 3.4, fill: '#E4572E' }, svg);
      el('circle', { cx: p[0], cy: p[1], r: 6.5, fill: 'none', stroke: '#E4572E', 'stroke-opacity': '.5', 'stroke-width': '.8' }, svg);
    } else {
      el('circle', { cx: p[0], cy: p[1], r: 1.7, fill: '#E7EDEE', 'fill-opacity': '.75' }, svg);
    }
  });

  // coordinate annotation, bottom left
  const label = el('text', {
    x: 14, y: h - 14, fill: '#E7EDEE', 'fill-opacity': '.55',
    'font-family': "'Spline Sans Mono', monospace", 'font-size': '9', 'letter-spacing': '1.2'
  }, svg);
  label.textContent = formatCoords(trip.lat, trip.lng);
}

/* ---------- itinerary elevation profile (trip detail) ---------- */
function drawProfile(svg, trip) {
  const w = 760, h = 240, padX = 34, padTop = 30, padBottom = 46;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label',
    `Elevation profile: ${trip.days} days from ${trip.itinerary[0].elev} to ${trip.itinerary[trip.itinerary.length - 1].elev} metres.`);
  svg.innerHTML = '';

  const elevs = trip.itinerary.map(d => d.elev);
  const max = Math.max(...elevs);
  const min = Math.min(...elevs);
  const top = max + Math.max(120, (max - min) * 0.18);
  const bottom = Math.max(0, min - Math.max(60, (max - min) * 0.12));
  const scaleY = v => padTop + (1 - (v - bottom) / Math.max(1, top - bottom)) * (h - padTop - padBottom);
  const scaleX = i => padX + (i / Math.max(1, elevs.length - 1)) * (w - padX * 2);

  // horizontal reference lines at rounded elevations
  const stepChoices = [100, 250, 500, 1000, 2000];
  const stepSize = stepChoices.find(s => (top - bottom) / s <= 5) || 2000;
  const grid = el('g', {}, svg);
  for (let v = Math.ceil(bottom / stepSize) * stepSize; v <= top; v += stepSize) {
    el('line', { x1: padX, x2: w - padX, y1: scaleY(v), y2: scaleY(v), stroke: '#0A1E2E', 'stroke-opacity': '.10', 'stroke-width': '.8' }, grid);
    const t = el('text', {
      x: 4, y: scaleY(v) + 3, fill: '#0A1E2E', 'fill-opacity': '.4',
      'font-family': "'Spline Sans Mono', monospace", 'font-size': '8.5'
    }, grid);
    t.textContent = v >= 1000 ? (v / 1000) + 'k' : v;
  }

  const pts = elevs.map((e, i) => [scaleX(i), scaleY(e)]);
  const line = pts.reduce((acc, p, i) => acc + (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1), '');
  const tint = TERRAIN[trip.terrain].tint;

  el('path', { d: `${line}L${pts[pts.length - 1][0]},${h - padBottom}L${pts[0][0]},${h - padBottom}Z`, fill: tint, 'fill-opacity': '.17' }, svg);
  const stroke = el('path', { d: line, fill: 'none', stroke: '#0A1E2E', 'stroke-width': '1.8', 'stroke-linejoin': 'round', class: 'route-line' }, svg);
  try { stroke.style.setProperty('--len', stroke.getTotalLength()); } catch (_) { stroke.style.setProperty('--len', '1400'); }

  el('line', { x1: padX, x2: w - padX, y1: h - padBottom, y2: h - padBottom, stroke: '#0A1E2E', 'stroke-opacity': '.25', 'stroke-width': '.8' }, svg);

  pts.forEach((p, i) => {
    const isPeak = elevs[i] === max;
    el('line', { x1: p[0], x2: p[0], y1: p[1], y2: h - padBottom, stroke: '#0A1E2E', 'stroke-opacity': '.14', 'stroke-width': '.7' }, svg);
    el('circle', { cx: p[0], cy: p[1], r: isPeak ? 4 : 2.6, fill: isPeak ? '#E4572E' : '#0A1E2E' }, svg);
    const dayLabel = el('text', {
      x: p[0], y: h - padBottom + 15, 'text-anchor': 'middle', fill: '#0A1E2E', 'fill-opacity': '.45',
      'font-family': "'Spline Sans Mono', monospace", 'font-size': '9'
    }, svg);
    dayLabel.textContent = i + 1;
    if (isPeak) {
      const peakLabel = el('text', {
        x: p[0], y: p[1] - 10, 'text-anchor': 'middle', fill: '#E4572E',
        'font-family': "'Spline Sans Mono', monospace", 'font-size': '9.5', 'letter-spacing': '.5'
      }, svg);
      peakLabel.textContent = max.toLocaleString() + ' M';
    }
  });

  const axis = el('text', {
    x: w - padX, y: h - 10, 'text-anchor': 'end', fill: '#0A1E2E', 'fill-opacity': '.4',
    'font-family': "'Spline Sans Mono', monospace", 'font-size': '8.5', 'letter-spacing': '1'
  }, svg);
  axis.textContent = 'DAY';
}

/* ---------- hero: the whole catalogue plotted ---------- */
function drawHeroChart(svg, trips) {
  const w = 1440, h = 720;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '';

  const rand = rng('meridian-hero');

  // three overlapping contour landforms as ambient bathymetry
  for (let k = 0; k < 3; k++) {
    const harmonics = [
      { f: 2 + Math.floor(rand() * 3), a: .12 + rand() * .10, p: rand() * 6.28 },
      { f: 5 + Math.floor(rand() * 3), a: .05 + rand() * .05, p: rand() * 6.28 }
    ];
    const cx = w * (.15 + rand() * .7), cy = h * (.2 + rand() * .6);
    const g = el('g', { fill: 'none', stroke: '#E7EDEE', 'stroke-width': '.8' }, svg);
    for (let i = 0; i < 14; i++) {
      el('path', {
        d: contourPath(cx, cy, 24 + i * 26, harmonics, .9),
        'stroke-opacity': (0.13 - i * 0.008).toFixed(3)
      }, g);
    }
  }

  // waypoints in true equirectangular position
  const project = (lat, lng) => [
    ((lng + 180) / 360) * (w - 160) + 80,
    ((90 - lat) / 180) * (h - 140) + 70
  ];

  const marks = el('g', {}, svg);
  trips.forEach((t, i) => {
    const [x, y] = project(t.lat, t.lng);
    const g = el('g', { class: 'pulse' }, marks);
    g.style.animationDelay = (i * 0.11).toFixed(2) + 's';
    el('circle', { cx: x, cy: y, r: 2.5, fill: '#E4572E' }, g);
    el('circle', { cx: x, cy: y, r: 9, fill: 'none', stroke: '#E4572E', 'stroke-opacity': '.35', 'stroke-width': '.7' }, g);
  });

  // equator and the catalogue's latitude limits, labelled
  const lines = el('g', {}, svg);
  [
    { lat: 0, label: 'EQUATOR' },
    { lat: CATALOGUE.latNorth, label: 'NORTHERN LIMIT · ' + formatLat(CATALOGUE.latNorth) },
    { lat: CATALOGUE.latSouth, label: 'SOUTHERN LIMIT · ' + formatLat(CATALOGUE.latSouth) }
  ].forEach(ref => {
    const y = project(ref.lat, 0)[1];
    el('line', {
      x1: 0, x2: w, y1: y, y2: y, stroke: '#E7EDEE', 'stroke-opacity': '.22',
      'stroke-width': '.7', 'stroke-dasharray': '6 8'
    }, lines);
    // Anchored just right of centre: `slice` crops symmetrically from the edges,
    // so anything near the middle of the viewBox stays visible at any aspect ratio.
    const t = el('text', {
      x: w * 0.52, y: y - 8, fill: '#E7EDEE', 'fill-opacity': '.38',
      'font-family': "'Spline Sans Mono', monospace", 'font-size': '10', 'letter-spacing': '2'
    }, lines);
    t.textContent = ref.label;
  });
}

/* ---------- coordinate formatting ---------- */
function formatLat(lat) {
  const d = Math.abs(lat);
  return `${Math.floor(d)}°${String(Math.round((d % 1) * 60)).padStart(2, '0')}′${lat >= 0 ? 'N' : 'S'}`;
}
function formatLng(lng) {
  const d = Math.abs(lng);
  return `${Math.floor(d)}°${String(Math.round((d % 1) * 60)).padStart(2, '0')}′${lng >= 0 ? 'E' : 'W'}`;
}
function formatCoords(lat, lng) {
  return `${formatLat(lat)}  ${formatLng(lng)}`;
}
