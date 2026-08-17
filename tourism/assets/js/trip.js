/* Meridian — route detail page. */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('trip-root');
  const slug = new URLSearchParams(location.search).get('trip');
  const trip = slug && tripBySlug(slug);

  if (!trip) {
    root.innerHTML = `
      <section class="section shell">
        <div class="empty">
          <h3>No route at that address</h3>
          <p>The plate number may have changed. The catalogue has all ${CATALOGUE.count} of them.</p>
          <a class="btn btn--ghost" href="trips.html">Open the catalogue</a>
        </div>
      </section>`;
    return;
  }

  document.title = `${trip.name} — Meridian`;
  document.querySelector('meta[name="description"]').setAttribute('content', trip.summary);

  const now = new Date();
  const open = trip.departures.filter(d => d.date > now);
  const next = open.find(d => d.spots > 0);
  const grade = GRADES[trip.grade];
  const highSeason = trip.months.join(', ');
  const peak = Math.max(...trip.itinerary.map(d => d.elev));

  root.innerHTML = `
  <section class="trip-head">
    <svg class="trip-head__chart"></svg>
    <div class="trip-head__inner">
      <a class="crumb coord" href="trips.html">← Catalogue</a>
      <span class="eyebrow" style="display:block;margin-bottom:.9rem;color:rgba(231,237,238,.55)">
        Plate ${trip.plate} · ${trip.region}
      </span>
      <h1>${trip.name}</h1>
      <div class="trip-head__sub">
        <span>${trip.country}</span>
        <span>${formatCoords(trip.lat, trip.lng)}</span>
        <span>${trip.days} days</span>
        <span>Grade ${trip.grade} · ${grade.label}</span>
        <span>Max ${trip.groupMax}</span>
      </div>
    </div>
  </section>

  <section class="section shell">
    <div class="trip-body">
      <div>
        <dl class="spec">
          <div><dt>Duration</dt><dd>${trip.days} days</dd></div>
          <div><dt>Terrain</dt><dd>${TERRAIN[trip.terrain].label}</dd></div>
          <div><dt>Highest point</dt><dd>${peak.toLocaleString()} m</dd></div>
          <div><dt>Group size</dt><dd>Max ${trip.groupMax}</dd></div>
          <div><dt>Runs in</dt><dd>${highSeason}</dd></div>
          <div><dt>Grade</dt><dd>${trip.grade} of 5</dd></div>
        </dl>

        <div class="prose">
          <p class="lede">${trip.summary}</p>
          <p><strong>${grade.label}.</strong> ${grade.note}</p>

          <h2>What stands out</h2>
          <ul>${trip.highlights.map(h => `<li>${h}</li>`).join('')}</ul>

          <h2>The shape of it</h2>
          <div class="profile">
            <svg class="profile__chart"></svg>
            <div class="profile__caption">
              <span>Elevation, metres</span>
              <span>${trip.days} days · high point ${peak.toLocaleString()} m</span>
            </div>
          </div>

          <h2>Day by day</h2>
          <ol class="days">
            ${trip.itinerary.map(d => `
              <li class="day">
                <span class="day__no">DAY ${String(d.day).padStart(2, '0')}</span>
                <div>
                  <div class="day__title">${d.title}</div>
                  <p class="day__note">${d.note}</p>
                  <span class="day__elev">${d.elev.toLocaleString()} m</span>
                </div>
              </li>`).join('')}
          </ol>

          <h2>Included</h2>
          <ul>${trip.included.map(i => `<li>${i}</li>`).join('')}</ul>

          <h2>Not included</h2>
          <ul>${trip.excluded.map(i => `<li>${i}</li>`).join('')}</ul>
        </div>
      </div>

      <aside class="aside-card">
        <div class="aside-card__head">
          <span class="eyebrow">From</span>
          <div class="aside-card__price">${money(trip.priceFrom)}</div>
          <span class="coord" style="color:var(--ink-45)">per person, ${trip.days} days</span>
        </div>
        <div class="aside-card__body">
          <span class="eyebrow" style="display:block;margin-bottom:.5rem">Departures</span>
          <ul class="departures">
            ${open.slice(0, 5).map(d => `
              <li class="departure">
                <span>
                  <span class="departure__date">${fmtDate(d.date)}</span>
                  ${d.spots > 0
                    ? `<span class="departure__spots" data-low="${d.spots <= 3}">${d.spots} place${d.spots === 1 ? '' : 's'} left</span>`
                    : `<span class="departure__spots">Full — waitlist open</span>`}
                </span>
                <span class="departure__price">${money(d.price)}</span>
              </li>`).join('')}
          </ul>
          ${next
            ? `<a class="btn btn--signal btn--wide" href="book.html?trip=${trip.slug}">Reserve a place</a>`
            : `<a class="btn btn--ghost btn--wide" href="contact.html">Join the waitlist</a>`}
          <p style="margin:.9rem 0 0;font-size:.875rem;color:var(--ink-70)">
            ${next
              ? `Next running ${fmtDate(next.date)}. A 20% deposit holds the place; the balance is due 60 days before departure.`
              : `Every date in this season is full. Tell us which month suits and we will put you on the list for the next release.`}
          </p>
        </div>
      </aside>
    </div>
  </section>

  <section class="section section--tight shell">
    <div class="section-head">
      <div>
        <span class="eyebrow">Also in ${trip.region}</span>
        <h2>Nearby routes</h2>
      </div>
    </div>
    <div class="plate-grid" id="related"></div>
  </section>`;

  drawPlate(root.querySelector('.trip-head__chart'), trip, { key: 'head' });
  drawProfile(root.querySelector('.profile__chart'), trip);

  // Related: same region first, then nearest by latitude.
  const related = TRIPS
    .filter(t => t.slug !== trip.slug)
    .sort((a, b) => {
      const score = t => (t.region === trip.region ? 0 : 1000) + Math.abs(t.lat - trip.lat);
      return score(a) - score(b);
    })
    .slice(0, 3);
  const grid = document.getElementById('related');
  related.forEach(t => grid.appendChild(plateCard(t, 'rel')));

  watchReveals(root);
});
