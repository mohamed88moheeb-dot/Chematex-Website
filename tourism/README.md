# Meridian — tourism platform prototype

A working prototype for a guided-route travel company: a catalogue of 26 routes with
filtering, route detail pages, and a three-step reservation flow.

This is a **separate platform** from the Chematex site in the repository root. It has
its own stylesheet, scripts and pages, and shares nothing with it.

## Running it

Static files, no build step:

```bash
npx serve -p 4300 .     # from the repository root
# then open http://localhost:4300/tourism/
```

Or from this directory: `python3 -m http.server 4300` and open `/`.

## Pages

| File | What it does |
| --- | --- |
| `index.html` | Hero chart plotting all 26 routes by real coordinates, next departures, regions |
| `trips.html` | The catalogue — filter by region, terrain, grade, month and price; six sort orders; filter state is kept in the URL so a view can be shared |
| `trip.html?trip=<slug>` | Route detail: spec table, itinerary drawn as an elevation profile, day-by-day, inclusions, live departures |
| `book.html?trip=<slug>` | Reservation: choose departure → travellers and lead details → review → confirmation with a reference |
| `about.html` | How routes are plotted, staffed and priced; deposit and refund terms |
| `contact.html` | Enquiry form, routed per-route to a lead guide |

## Design

The visual language is built from the subject's own artifacts — nautical and
topographic charts — rather than from stock photography, so the prototype is fully
self-contained. Palette: chart navy `#0A1E2E`, slate chart paper `#E7EDEE`, depth
teal `#1B4B5A`, survey orange `#E4572E` as the single accent, with eight muted
terrain tints. Type: Archivo (wide chart-plate caps), Newsreader (body), Spline Sans
Mono (coordinates and data).

The signature element is a generated **route trace**, appearing at three scales:

1. the chart plate on each catalogue card,
2. the masthead on the route detail page,
3. the day-by-day itinerary, drawn as an actual elevation profile with the high
   point labelled.

All of it is SVG generated at runtime from each route's own coordinates and daily
elevations, plus a slug-seeded PRNG — so a given route always draws the same plate.

Accessibility and responsiveness are covered: keyboard focus is visible throughout,
`prefers-reduced-motion` disables the draw and reveal animations, the profile carries
a text description, and layouts reflow to a single column on mobile with a collapsible
nav.

## Data

`assets/js/data.js` holds the catalogue. Each route carries real coordinates, a
season, a grade, a group ceiling, prices, an itinerary with per-day elevations in
metres, and inclusion/exclusion lists.

Departure dates are **derived** rather than hand-written: `deriveDepartures()` places
one departure in each month of the route's stated season across two years, steps the
price up in peak season, and seeds remaining places from the slug. That keeps
availability consistent between page loads without maintaining 150 rows of dates by
hand. Point this at a real inventory API to make it live.

## What is not real

- Nothing is transmitted. The reservation flow keeps state in `sessionStorage` and
  the confirmation reference is generated locally; the contact form validates and
  confirms without sending.
- No payment step. The review page states the deposit and balance, then stops.
- Company details, guide counts, testimonials and the Edinburgh address are written
  for the prototype.
- Route descriptions and itineraries are plausible and use real places, but they are
  not operational documents — verify before anything is sold against them.

## Next, if this goes further

- Move the catalogue behind an API and make departures real inventory with holds.
- Add payment, and the booking confirmation email the review step promises.
- Per-route pages are currently one template reading a query string; for SEO these
  should be pre-rendered to `/routes/<slug>/` with structured data.
- Photography, when it exists, sits alongside the chart art rather than replacing it —
  the plates are what makes a catalogue of 26 routes scannable.
