/* Meridian — reservation flow. Three steps, state kept in sessionStorage so a
   reload during the flow does not lose the departure someone picked.
   Nothing is transmitted: this is a prototype and the confirmation is local. */

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('book-root');
  const params = new URLSearchParams(location.search);
  const trip = tripBySlug(params.get('trip'));

  if (!trip) {
    root.innerHTML = `
      <div class="empty">
        <h3>Pick a route first</h3>
        <p>Reservations start from a route page, where the departure dates are.</p>
        <a class="btn btn--ghost" href="trips.html">Open the catalogue</a>
      </div>`;
    return;
  }

  document.title = `Reserve — ${trip.name} — Meridian`;

  const now = new Date();
  const open = trip.departures.filter(d => d.date > now && d.spots > 0);

  const saved = readBooking();
  const state = {
    step: 1,
    slug: trip.slug,
    departure: saved.slug === trip.slug ? saved.departure ?? null : null,
    travellers: saved.slug === trip.slug ? saved.travellers || 1 : 1,
    singleRoom: saved.slug === trip.slug ? !!saved.singleRoom : false,
    lead: (saved.slug === trip.slug && saved.lead) || { name: '', email: '', phone: '', country: '', notes: '' },
    ref: null
  };

  const SINGLE_SUPPLEMENT = Math.round(trip.priceFrom * 0.18 / 10) * 10;
  const DEPOSIT_RATE = 0.2;

  const chosen = () => (state.departure === null ? null : open[state.departure]);

  function totals() {
    const dep = chosen();
    if (!dep) return { unit: 0, sub: 0, single: 0, total: 0, deposit: 0, balance: 0 };
    const sub = dep.price * state.travellers;
    const single = state.singleRoom ? SINGLE_SUPPLEMENT * state.travellers : 0;
    const total = sub + single;
    const deposit = Math.round(total * DEPOSIT_RATE);
    return { unit: dep.price, sub, single, total, deposit, balance: total - deposit };
  }

  function persist() {
    writeBooking({
      slug: state.slug, departure: state.departure, travellers: state.travellers,
      singleRoom: state.singleRoom, lead: state.lead
    });
  }

  /* ---------- fragments ---------- */
  function stepsBar() {
    const labels = ['Departure', 'Travellers', 'Review'];
    return `<ol class="steps">${labels.map((l, i) => {
      const n = i + 1;
      const s = state.step === n ? 'active' : state.step > n ? 'done' : 'todo';
      return `<li data-state="${s}">${n}. ${l}</li>`;
    }).join('')}</ol>`;
  }

  function summaryCard() {
    const dep = chosen();
    const t = totals();
    return `
      <aside class="aside-card">
        <div class="aside-card__head">
          <span class="eyebrow">Plate ${trip.plate}</span>
          <h3 style="margin:.35rem 0 .5rem">${trip.name}</h3>
          <span class="coord" style="color:var(--ink-45)">${trip.country} · ${trip.days} days · Grade ${trip.grade}</span>
        </div>
        <div class="aside-card__body">
          ${dep ? `
            <div class="summary-line"><span>Departure</span><span>${fmtDate(dep.date)}</span></div>
            <div class="summary-line"><span>${money(t.unit)} × ${state.travellers} traveller${state.travellers === 1 ? '' : 's'}</span><span>${money(t.sub)}</span></div>
            ${t.single ? `<div class="summary-line"><span>Single room supplement</span><span>${money(t.single)}</span></div>` : ''}
            <div class="summary-line summary-line--total"><span>Total</span><span>${money(t.total)}</span></div>
            <div class="summary-line" style="border-bottom:0;padding-top:.6rem">
              <span>Deposit due now (20%)</span><span>${money(t.deposit)}</span>
            </div>
            <div class="summary-line" style="border-bottom:0;padding-top:0">
              <span>Balance, 60 days before</span><span>${money(t.balance)}</span>
            </div>`
          : `<p style="margin:0;color:var(--ink-70);font-size:.9375rem">Choose a departure to see the price.</p>`}
        </div>
      </aside>`;
  }

  /* ---------- steps ---------- */
  function stepDeparture() {
    if (!open.length) {
      return `
        <div class="notice"><strong>Every date this season is full.</strong>
          Tell us the month that suits and we will hold you a place in the next release.</div>
        <a class="btn btn--ghost" href="contact.html">Join the waitlist</a>`;
    }
    return `
      <h2 style="margin-bottom:1rem">Choose a departure</h2>
      <p style="color:var(--ink-70);max-width:52ch">
        Prices vary by month — the middle of the season costs more because that is when
        the route runs best. Places shown are what is actually left.
      </p>
      <div style="margin-top:1.5rem">
        ${open.map((d, i) => `
          <button type="button" class="pick" data-dep="${i}" aria-pressed="${state.departure === i}">
            <span>
              <span class="pick__date">${fmtDate(d.date, { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}</span><br>
              <span class="pick__meta">${d.spots} place${d.spots === 1 ? '' : 's'} left${d.peak ? ' · peak season' : ''}</span>
            </span>
            <span class="pick__price">${money(d.price)}</span>
          </button>`).join('')}
      </div>
      <div style="margin-top:1.75rem;display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="btn btn--signal" id="next" ${state.departure === null ? 'disabled' : ''}>Continue</button>
        <a class="btn btn--ghost" href="trip.html?trip=${trip.slug}">Back to the route</a>
      </div>`;
  }

  function stepTravellers() {
    const dep = chosen();
    const max = Math.min(dep ? dep.spots : trip.groupMax, trip.groupMax);
    const l = state.lead;
    return `
      <h2 style="margin-bottom:1rem">Who is travelling</h2>
      <p style="color:var(--ink-70);max-width:52ch">
        We only need the lead traveller now. Names and passport details for everyone
        else are collected once the deposit clears.
      </p>
      <form id="details" style="margin-top:1.5rem" novalidate>
        <div class="field-row">
          <label class="field">
            <span>Travellers</span>
            <select class="input" name="travellers">
              ${Array.from({ length: max }, (_, i) => i + 1).map(n =>
                `<option value="${n}" ${state.travellers === n ? 'selected' : ''}>${n}</option>`).join('')}
            </select>
          </label>
          <label class="field">
            <span>Rooms</span>
            <select class="input" name="singleRoom">
              <option value="0" ${!state.singleRoom ? 'selected' : ''}>Shared, as allocated</option>
              <option value="1" ${state.singleRoom ? 'selected' : ''}>Single room (+${money(SINGLE_SUPPLEMENT)} each)</option>
            </select>
          </label>
        </div>
        <div class="field-row">
          <label class="field">
            <span>Full name</span>
            <input class="input" name="name" value="${l.name}" autocomplete="name">
          </label>
          <label class="field">
            <span>Email</span>
            <input class="input" name="email" type="email" value="${l.email}" autocomplete="email">
          </label>
        </div>
        <div class="field-row">
          <label class="field">
            <span>Phone</span>
            <input class="input" name="phone" value="${l.phone}" autocomplete="tel">
          </label>
          <label class="field">
            <span>Country of residence</span>
            <input class="input" name="country" value="${l.country}" autocomplete="country-name">
          </label>
        </div>
        <label class="field">
          <span>Anything we should know</span>
          <textarea class="input" name="notes" placeholder="Dietary needs, injuries, who you're travelling with">${l.notes}</textarea>
        </label>
        <div style="margin-top:.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          <button class="btn btn--signal" type="submit">Continue</button>
          <button class="btn btn--ghost" type="button" id="back">Back</button>
        </div>
      </form>`;
  }

  function stepReview() {
    const dep = chosen();
    const t = totals();
    const l = state.lead;
    return `
      <h2 style="margin-bottom:1rem">Check it over</h2>
      <div class="notice">
        <strong>Nothing is charged here.</strong> This is a prototype — confirming
        records the reservation in this browser and shows you the reference.
      </div>
      <dl class="spec" style="margin-bottom:2rem">
        <div><dt>Route</dt><dd>${trip.name}</dd></div>
        <div><dt>Departure</dt><dd>${fmtDate(dep.date)}</dd></div>
        <div><dt>Returns</dt><dd>${fmtDate(new Date(dep.date.getTime() + (trip.days - 1) * 864e5))}</dd></div>
        <div><dt>Travellers</dt><dd>${state.travellers}</dd></div>
        <div><dt>Rooms</dt><dd>${state.singleRoom ? 'Single' : 'Shared'}</dd></div>
        <div><dt>Lead traveller</dt><dd>${l.name}</dd></div>
        <div><dt>Email</dt><dd style="word-break:break-word">${l.email}</dd></div>
        <div><dt>Phone</dt><dd>${l.phone}</dd></div>
      </dl>
      ${l.notes ? `<p style="color:var(--ink-70)"><strong>Your note:</strong> ${l.notes}</p>` : ''}
      <p style="color:var(--ink-70);max-width:56ch">
        The deposit of <strong>${money(t.deposit)}</strong> holds ${state.travellers === 1 ? 'the place' : 'the places'} and is
        refundable in full for fourteen days. The balance of ${money(t.balance)} falls due
        sixty days before departure.
      </p>
      <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
        <button class="btn btn--signal" id="confirm">Confirm reservation</button>
        <button class="btn btn--ghost" type="button" id="back">Back</button>
      </div>`;
  }

  function stepDone() {
    const dep = chosen();
    const t = totals();
    return `
      <div class="receipt" style="max-width:640px;margin-inline:auto">
        <div class="receipt__head">
          <span class="eyebrow" style="color:rgba(231,237,238,.55)">Reservation held</span>
          <div class="receipt__ref">${state.ref}</div>
        </div>
        <div class="receipt__body">
          <h2 style="margin-bottom:.75rem">${trip.name}</h2>
          <p style="color:var(--ink-70)">
            ${fmtDate(dep.date)} · ${trip.days} days · ${state.travellers} traveller${state.travellers === 1 ? '' : 's'}
          </p>
          <div class="summary-line"><span>Total</span><span>${money(t.total)}</span></div>
          <div class="summary-line"><span>Deposit to pay</span><span>${money(t.deposit)}</span></div>
          <p style="margin-top:1.25rem;color:var(--ink-70)">
            In the live product a payment link and the full kit list would reach
            ${state.lead.email} within the hour. Quote the reference above in any reply.
          </p>
          <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1.25rem">
            <a class="btn btn--ghost" href="trips.html">Back to the catalogue</a>
            <a class="btn btn--ghost" href="contact.html">Ask us something</a>
          </div>
        </div>
      </div>`;
  }

  /* ---------- render and wiring ---------- */
  function render() {
    if (state.step === 4) {
      root.innerHTML = stepDone();
      watchReveals(root);
      return;
    }

    const body = state.step === 1 ? stepDeparture()
               : state.step === 2 ? stepTravellers()
               : stepReview();

    root.innerHTML = `
      <a class="crumb coord" href="trip.html?trip=${trip.slug}" style="color:var(--ink-45);text-decoration:none;display:inline-block;margin-bottom:1.5rem">← ${trip.name}</a>
      ${stepsBar()}
      <div class="book-grid">
        <div>${body}</div>
        ${summaryCard()}
      </div>`;

    root.querySelectorAll('[data-dep]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.departure = Number(btn.dataset.dep);
        state.travellers = Math.min(state.travellers, open[state.departure].spots);
        persist();
        render();
      });
    });

    const next = root.querySelector('#next');
    if (next) next.addEventListener('click', () => { state.step = 2; render(); });

    const back = root.querySelector('#back');
    if (back) back.addEventListener('click', () => { state.step -= 1; render(); });

    const form = root.querySelector('#details');
    if (form) {
      form.addEventListener('change', e => {
        if (e.target.name === 'travellers') state.travellers = Number(e.target.value);
        if (e.target.name === 'singleRoom') state.singleRoom = e.target.value === '1';
        if (['name', 'email', 'phone', 'country', 'notes'].includes(e.target.name)) {
          state.lead[e.target.name] = e.target.value;
        }
        persist();
        root.querySelector('.aside-card').outerHTML = summaryCard();
      });

      form.addEventListener('submit', e => {
        e.preventDefault();
        ['name', 'email', 'phone', 'country', 'notes'].forEach(k => {
          state.lead[k] = form.elements[k].value.trim();
        });

        const problems = {};
        if (!state.lead.name) problems.name = 'We need a name for the booking.';
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.lead.email)) problems.email = 'Check the email address.';
        if (state.lead.phone.replace(/\D/g, '').length < 7) problems.phone = 'A number we can reach you on.';

        form.querySelectorAll('.error').forEach(n => n.remove());
        form.querySelectorAll('[aria-invalid]').forEach(n => n.removeAttribute('aria-invalid'));

        const keys = Object.keys(problems);
        if (keys.length) {
          keys.forEach(k => {
            const field = form.elements[k];
            field.setAttribute('aria-invalid', 'true');
            field.insertAdjacentHTML('afterend', `<span class="error">${problems[k]}</span>`);
          });
          form.elements[keys[0]].focus();
          return;
        }

        persist();
        state.step = 3;
        render();
      });
    }

    const confirm = root.querySelector('#confirm');
    if (confirm) {
      confirm.addEventListener('click', () => {
        const dep = chosen();
        state.ref = `MRD-${trip.plate}-${dep.date.getUTCFullYear()}${String(dep.date.getUTCMonth() + 1).padStart(2, '0')}-${
          Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        state.step = 4;
        try { sessionStorage.removeItem(STORE); } catch (_) {}
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  render();
});
