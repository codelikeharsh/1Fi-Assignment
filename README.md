# 1Fi Marketplace — SDE Intern Assignment

A "1Fi Marketplace" tab added to the Shop page, alongside the existing (intentionally
blank) "Top Brands" and "Nearby Stores" tabs, per the assignment brief.

**Live demo:** [1-fi-assignment-sepia.vercel.app](https://1-fi-assignment-sepia.vercel.app/) — deployed on Vercel so it's viewable without a local setup; jump straight to [/shop](https://1-fi-assignment-sepia.vercel.app/shop) for the Marketplace tab.

## Stack, and why

The assignment asked to match the existing 1Fi app's stack, but didn't provide the
app's source or say what that stack is. Since the shipped app is a Capacitor shell
around a live Next.js site (`app.1fi.in`), I reverse-engineered it via
`chrome://inspect` DevTools on the real Shop page, and matched it here:

- **Next.js (App Router)** + **Tailwind CSS v4** + **shadcn/ui** + **lucide-react**
- **Geist / Geist Mono** fonts (Next.js's own defaults, which happen to match)
- Brand purple `#712CDC`, list-card/tab/skeleton shapes lifted from the real
  Shop page's DOM and from real screenshots

Full research notes, DOM evidence, and design tokens are in
`1Fi_Assignment_Notes.md` (kept alongside this repo).

## Running it

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it redirects straight to `/shop`.

## What's implemented

- **Shop page** (`/shop`) with the three-tab layout. Top Brands / Nearby Stores are
  intentionally blank per the brief. **1Fi Marketplace** is fully built:
  - Product listing with live search (debounced, hits a real API route)
  - Product detail page with variant selection, EMI tenure plans (no-cost, computed
    from the selected variant's price), and a "Proceed" CTA with a confirmation sheet
  - Loading skeletons (`loading.tsx` + list-card skeletons matching the real app's
    `animate-pulse` shapes), a `not-found.tsx`, and an `error.tsx` with retry
- **Mock data layer** (`lib/data/products.ts`) behind real Next.js Route Handlers
  (`app/api/products/**`) — nothing is hardcoded into UI components; product/EMI
  data is fetched, with artificial latency so loading states are actually visible
- Bottom nav (Home / Shop / EMI Dues / Limit / Profile) matching the real app's
  structure; the four tabs outside Shop are simple placeholders since they're out
  of scope for this assignment

## A known gap, called out rather than hidden

The brief references "reference screens" and "exact product/content requirements"
as attached material that was never actually included with the assignment email —
only the 3-page PDF arrived. I flagged this with Vaibhav directly. Absent that
content, the product categories (electronics, travel, auto, jewelry) and the six
mock products in `lib/data/products.ts` are my own reasonable placeholders, chosen
to match the real Shop page's "Top Brands" list and hero art. If the real reference
content turns up, only `lib/data/products.ts` needs to change — everything else
reads from that layer dynamically.
