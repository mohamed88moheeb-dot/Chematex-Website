/* Meridian — shared behaviour: nav, formatting, trip plates, scroll reveals. */

const money = n => '$' + Math.round(n).toLocaleString('en-US');

const fmtDate = (d, opts) => d.toLocaleDateString('en-GB',
  opts || { day: 'numeric', month: 'short', year: 'numeric' });

const tripBySlug = slug => TRIPS.find(t => t.slug === slug);

function nextDeparture(trip) {
  const now = new Date();
  return trip.departures.find(d => d.date > now && d.spots > 0) || trip.departures[0];
}

/* ---------- trip plate ---------- */
function plateCard(trip, key) {
  const a = document.createElement('a');
  a.className = 'plate reveal';
  a.href = `trip.html?trip=${trip.slug}`;
  a.innerHTML = `
    <div class="plate__art">
      <svg></svg>
      <span class="plate__no">PLATE ${trip.plate}</span>
      <span class="plate__terrain" style="background:${TERRAIN[trip.terrain].tint}">${TERRAIN[trip.terrain].label}</span>
    </div>
    <div class="plate__body">
      <span class="plate__where coord">${trip.country} · ${formatLat(trip.lat)}</span>
      <h3 class="plate__name">${trip.name}</h3>
      <p class="plate__summary">${trip.summary}</p>
      <div class="plate__foot">
        <span class="plate__price"><span>from</span>${money(trip.priceFrom)}</span>
        <span class="plate__meta">
          ${trip.days} days · ${GRADES[trip.grade].label}<br>
          <span class="gauge" role="img" aria-label="Grade ${trip.grade} of 5">${
            [1,2,3,4,5].map(i => `<i${i <= trip.grade ? ' data-on' : ''}></i>`).join('')
          }</span>
        </span>
      </div>
    </div>`;
  drawPlate(a.querySelector('.plate__art svg'), trip, { key });
  return a;
}

/* ---------- scroll reveal ---------- */
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.dataset.seen = ''; obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' })
  : null;

function watchReveals(root = document) {
  const items = root.querySelectorAll('.reveal:not([data-seen])');
  if (!revealObserver) { items.forEach(i => i.dataset.seen = ''); return; }
  items.forEach((item, i) => {
    item.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
    revealObserver.observe(item);
  });
}

/* ---------- booking storage ---------- */
const STORE = 'meridian.booking';
const readBooking = () => { try { return JSON.parse(sessionStorage.getItem(STORE)) || {}; } catch (_) { return {}; } };
const writeBooking = data => { try { sessionStorage.setItem(STORE, JSON.stringify(data)); } catch (_) {} };

/* ---------- chrome ---------- */
function initChrome() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.dataset.open === 'true';
      nav.dataset.open = String(!open);
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.textContent = open ? 'Menu' : 'Close';
    });
  }

  document.querySelectorAll('[data-span]').forEach(node => {
    node.textContent = `${formatLat(CATALOGUE.latNorth)}–${formatLat(CATALOGUE.latSouth)}`;
  });
  document.querySelectorAll('[data-count]').forEach(n => n.textContent = CATALOGUE.count);
  document.querySelectorAll('[data-year]').forEach(n => n.textContent = new Date().getFullYear());

  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  watchReveals();
}

document.addEventListener('DOMContentLoaded', initChrome);
