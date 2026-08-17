/* Meridian — catalogue filtering and sorting. State lives in the URL so a
   filtered view can be shared or bookmarked. */

document.addEventListener('DOMContentLoaded', () => {
  const results = document.getElementById('results');
  const empty = document.getElementById('empty');
  const countEl = document.getElementById('count');
  const form = document.getElementById('filters');
  const sortEl = document.getElementById('sort');

  document.getElementById('span-note').textContent =
    `${formatLat(CATALOGUE.latNorth)} to ${formatLat(CATALOGUE.latSouth)}`;

  /* ---------- build filter controls from the data ---------- */
  const countBy = (key, value) => TRIPS.filter(t => t[key] === value).length;

  function checkGroup(container, name, entries) {
    container.innerHTML = entries.map(e => `
      <label class="check">
        <input type="checkbox" name="${name}" value="${e.value}">
        <span>${e.label}</span>
        <em>${e.count}</em>
      </label>`).join('');
  }

  checkGroup(document.getElementById('f-region'), 'region',
    REGIONS.map(r => ({ value: r, label: r, count: countBy('region', r) })));

  checkGroup(document.getElementById('f-terrain'), 'terrain',
    TERRAINS.map(t => ({ value: t, label: TERRAIN[t].label, count: countBy('terrain', t) })));

  checkGroup(document.getElementById('f-grade'), 'grade',
    [1, 2, 3, 4, 5]
      .filter(g => countBy('grade', g) > 0)
      .map(g => ({ value: g, label: `${g} · ${GRADES[g].label}`, count: countBy('grade', g) })));

  const monthSel = document.getElementById('month');
  MONTH_INDEX.forEach(m => {
    const n = TRIPS.filter(t => t.months.includes(m)).length;
    monthSel.insertAdjacentHTML('beforeend', `<option value="${m}">${m} — ${n} routes</option>`);
  });

  /* ---------- read and write state ---------- */
  function currentState() {
    const data = new FormData(form);
    return {
      q: (data.get('q') || '').toString().trim().toLowerCase(),
      region: data.getAll('region'),
      terrain: data.getAll('terrain'),
      grade: data.getAll('grade').map(Number),
      month: data.get('month') || '',
      price: Number(data.get('price') || 0),
      sort: sortEl.value
    };
  }

  function applyURL() {
    const params = new URLSearchParams(location.search);
    const setChecks = (name) => {
      const wanted = params.getAll(name);
      if (!wanted.length) return;
      form.querySelectorAll(`input[name="${name}"]`).forEach(i => {
        if (wanted.includes(i.value)) i.checked = true;
      });
    };
    setChecks('region'); setChecks('terrain'); setChecks('grade');
    if (params.get('q')) document.getElementById('q').value = params.get('q');
    if (params.get('month')) monthSel.value = params.get('month');
    if (params.get('price')) document.getElementById('price').value = params.get('price');
    if (params.get('sort')) sortEl.value = params.get('sort');
  }

  function pushURL(state) {
    const p = new URLSearchParams();
    state.region.forEach(v => p.append('region', v));
    state.terrain.forEach(v => p.append('terrain', v));
    state.grade.forEach(v => p.append('grade', v));
    if (state.q) p.set('q', state.q);
    if (state.month) p.set('month', state.month);
    if (state.price) p.set('price', state.price);
    if (state.sort !== 'departure') p.set('sort', state.sort);
    const qs = p.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  }

  /* ---------- filter, sort, render ---------- */
  function matches(trip, s) {
    if (s.region.length && !s.region.includes(trip.region)) return false;
    if (s.terrain.length && !s.terrain.includes(trip.terrain)) return false;
    if (s.grade.length && !s.grade.includes(trip.grade)) return false;
    if (s.month && !trip.months.includes(s.month)) return false;
    if (s.price && trip.priceFrom > s.price) return false;
    if (s.q) {
      const hay = [trip.name, trip.country, trip.region, TERRAIN[trip.terrain].label, trip.summary]
        .join(' ').toLowerCase();
      if (!hay.includes(s.q)) return false;
    }
    return true;
  }

  const sorters = {
    'departure': (a, b) => (nextDeparture(a).date) - (nextDeparture(b).date),
    'price-asc': (a, b) => a.priceFrom - b.priceFrom,
    'price-desc': (a, b) => b.priceFrom - a.priceFrom,
    'days': (a, b) => a.days - b.days,
    'grade': (a, b) => a.grade - b.grade,
    'lat': (a, b) => b.lat - a.lat
  };

  function render() {
    const s = currentState();
    pushURL(s);
    const list = TRIPS.filter(t => matches(t, s)).sort(sorters[s.sort]);

    countEl.textContent = list.length;
    results.innerHTML = '';
    list.forEach(t => results.appendChild(plateCard(t, 'cat')));
    empty.hidden = list.length > 0;
    watchReveals(results);
  }

  form.addEventListener('input', render);
  sortEl.addEventListener('change', render);

  function clearAll() {
    form.reset();
    sortEl.value = 'departure';
    render();
    document.getElementById('filters-anchor').scrollIntoView({ block: 'start' });
  }
  document.getElementById('clear').addEventListener('click', clearAll);
  document.getElementById('clear-2').addEventListener('click', clearAll);

  applyURL();
  render();
});
