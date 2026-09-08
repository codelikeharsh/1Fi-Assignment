# 1Fi SDE Intern Assignment — Stack & Design Reference

Derived entirely from the shipped app: `in.onefi.app` APK (Capacitor shell) + the
server-rendered HTML at `https://app.1fi.in/shop`. Deadline: **8 Sep 2026**.

---

## 1. The stack

| Layer | What they use | Evidence |
|---|---|---|
| Shell | **Capacitor** (Ionic team), Cordova compat layer | `capacitor.config.json`, `assets/public/cordova.js` |
| App delivery | **Remote URL**, not bundled | `"server": { "url": "https://app.1fi.in" }` |
| Framework | **Next.js App Router** + React Server Components | `/_next/static/chunks/...`, `self.__next_f.push([...])` RSC payload, `parallelRouterKey`, route group `(public)` |
| Bundler | **Turbopack** | `chunks/turbopack-5b4d77483dc0ea4d.js` |
| React | **19** | `$Sreact.fragment`, RSC streaming |
| Styling | **Tailwind CSS v4** | arbitrary values everywhere, `ring-ring/50`, `dark:bg-input/30`, `aria-invalid:` variants |
| Components | **shadcn/ui** (high confidence) | `data-slot="input"`, `border-input`, `bg-primary`, `text-primary-foreground`, `focus-visible:ring-ring/50` |
| Icons | **lucide-react** | `class="lucide lucide-search"`, `lucide-house`, `lucide-store`, `lucide-receipt-indian-rupee`, `lucide-chart-no-axes-combined`, `lucide-user` |
| Fonts | **Geist + Geist Mono** via `next/font` | `geist_a71539c9-module__T19VSG__variable` on `<body>` |
| Images | `next/image` + CDN | `data-nimg="1"`, `https://cdn.1fi.in/...` |
| Analytics | **PostHog** | `PostHogIdentity` client component |
| Native glue | `CapacitorBackButton`, `CapacitorDeepLinks`, `PwaBootstrap` | RSC module map |

**Bottom line:** this is a Next.js + Tailwind + shadcn/ui **web app**, mobile-first,
wrapped in Capacitor. No Flutter, no React Native, no Dart. Straight into Harsh's
existing React/Vite/Tailwind wheelhouse.

---

## 2. Design tokens (read off the live Shop page)

**Brand**
- Primary purple: `#712CDC` (also `<meta name="theme-color">`)
- Primary hover: `#5b24b5`
- Purple tints: `#f5f0ff` (bg), `#ece5ff` (border), `#ede8ff` (icon circle bg)
- Purple shadow: `rgba(113,44,220,0.06)` / `0.08` / `0.12` / `0.3`
- Neutral shadow: `rgba(20,14,50,0.04)` → `0.12`

**Layout**
- App container: `mx-auto w-full max-w-[500px]` — everything is capped at 500px, mobile-first
- Main: `flex flex-1 flex-col gap-5 px-4 py-4 pb-[calc(5rem+env(safe-area-inset-bottom))]`
- Safe-area insets used throughout (it runs as a native app)

**Typography**
- Section heading: `text-[20px] font-semibold leading-[1.2] tracking-[-0.018em] text-gray-900`
- Card title: `text-lg font-bold tracking-[-0.015em] text-gray-900`
- Body/secondary: `text-[13.5px] leading-[1.45] text-gray-500`
- Tab label: `text-sm font-semibold tracking-[-0.005em]`
- Nav label: `text-[10px] tracking-wide font-medium` (active: `font-bold`)
- Negative letter-spacing on everything — do not skip this, it is very visible

**Components**
- Tab pill group: `flex gap-2 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5`, `role="tablist"`
  - Active tab: `bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]` + a `2.5px × 22px` underline pill at `bottom-1.5`
  - Inactive tab: `text-gray-500 hover:text-gray-700`
- Search field: `flex items-center gap-[10px] h-[46px] rounded-full border border-gray-200 bg-white px-4`, lucide `search` icon at `h-[17px] w-[17px] text-gray-400`
- List card: `flex gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5`, 64px thumb `h-16 w-16 rounded-xl`
- Empty state: `rounded-[20px] border border-zinc-200 bg-white px-6 py-9 text-center shadow-[0_2px_6px_rgba(20,14,50,0.04)]`, 56px icon circle `bg-[#ede8ff] text-[#712CDC]`
- Bottom nav: fixed, `rounded-[28px] bg-white px-1.5 py-1.5`, active item gets a `3px × 32px` top bar + radial purple glow + `drop-shadow` on the icon

**Loading states** — they use skeletons, not spinners:
`animate-pulse` + `bg-zinc-100` / `bg-zinc-200` blocks shaped like the real card
(64px square + three text bars). Match this exactly; the brief grades loading states.

---

## 3. What already exists on /shop

- Page component: `ShopContent` with prop `initialTab: "online"`
- Hero banner: `cdn.1fi.in/banners/shop-page 1536x1024.webp`, pulled up under the tabs
- **Two tabs today: "Top Brands" and "Nearby Stores"** — rendered as `role="tab"` buttons
- Search input: "Search online stores..."
- Empty state: "No matching stores found" / "Try a different store or brand name."

**So the task is literally: add a third tab.** The brief says leave Top Brands and
Nearby Stores blank and fully build "1Fi Marketplace" as the third option.

Routes seen in the bottom nav: `/dashboard`, `/shop`, `/emi-dues`, `/pledged-funds`,
`/profile`, plus `/login`.

**Correction from real screenshots:** the 5 bottom-nav labels are actually
**Home | Shop | EMI Dues | Limit | Profile** — the 4th icon (chart-no-axes-combined)
reads "Limit" on screen, not "pledged-funds" (that's presumably the route behind it,
but the visible label is "Limit").

---

## 3.5 Real screenshots — Top Brands & Nearby Stores (captured 5 Sep)

**The core mechanic — this matters for how Marketplace should read:**
Hero banner copy: *"✦ NO-COST EMIs" / "Shop today, Pay later using Mutual funds." /
"No credit score required. No interest. Backed by your investments."*
This is **not** generic BNPL — EMIs are secured against the user's own mutual fund
holdings (pledged, not a credit line). That's why `/pledged-funds` and `/emi-dues`
are separate nav destinations. Marketplace's "select EMI plan → CTA" step should read
as "backed by your investments," not "credit card EMI," and the CTA likely flows
toward a pledge step rather than a payment gateway.

Hero illustration: 3D-render shopping bag with a phone, laptop, red SUV, and
motorcycle popping out, gold ribbon/confetti accents, on a deep purple gradient.
Rounded bottom corners; the tab pill group floats half-on/half-off the hero's
bottom edge.

**Top Brands tab** (confirms List card + tab specs from §2 exactly):
- Section heading "Top Brands", search placeholder "Search online stores..."
- Cards: 64px rounded-square brand logo + bold brand name + gray secondary line
  `"No-cost EMIs upto N months"` — e.g. Air India (18mo), Apple Premium Reseller
  (24mo), CaratLane (6mo), CGH Earth (24mo), Croma (6mo), EaseMyTrip Holiday/Hotel
  (24mo each), Giva
- No price, no detail page — this tab is a plain directory, not a catalog

**Nearby Stores tab:**
- Search placeholder changes to "Search stores...", section heading gets a
  location filter chip on the right: `"Gurugram ⌄"`
- Cards: logo + bold store name + 2-line gray address + a distance badge
  (light-gray pill, top-right of card, e.g. "1.0 KM", "3.3 KM", "9.0 KM")
- Entries are dealerships/franchises (Pacholi Suzuki, Malwa Honda, Ashoka Suzuki,
  Atelier Forbidden Journeys, Charger On Wheels, TripBouquet) — physical locations,
  not products

**What this means for the Marketplace tab specifically:** Top Brands and Nearby
Stores are both directory/locator patterns with zero pricing or detail pages.
Marketplace is the one tab that has to behave like a real catalog — image, price,
variants, EMI picker, PDP. Category steer, since real product content still hasn't
arrived: electronics (phone/laptop), travel, jewelry, auto — matching both the hero
art and the Top Brands category mix.

---

## 4. Build plan (3 days)

**Setup**
- `npx create-next-app@latest` with App Router + Tailwind, then `npx shadcn@latest init`
- Add Geist + Geist Mono via `next/font`, `lucide-react`, and the `#712CDC` palette as CSS vars
- Recreate the `max-w-[500px]` shell + bottom nav so the page sits in context

**Feature scope (from the brief)**
- Product listing → product detail
- Product image, name, pricing, **variants**
- EMI options/plans, relevant product details
- Select an EMI plan → CTA to proceed
- Data must come from a mock API layer, **not hardcoded in components**

**Suggested structure**
```
app/shop/page.tsx                  # tabs: Top Brands | Nearby Stores | 1Fi Marketplace
app/shop/marketplace/[id]/page.tsx # product detail + EMI selection
components/marketplace/            # ProductCard, VariantPicker, EmiPlanList, ProceedCta
lib/api/products.ts                # fetch layer (mock JSON, artificial latency)
lib/types.ts                       # Product, Variant, EmiPlan
```
- Route handlers under `app/api/products/route.ts` make the "dynamic data" requirement
  concrete and demo-able without a backend
- Loading: `loading.tsx` + skeletons matching their `animate-pulse` shapes
- Error: `error.tsx` + a retry affordance, plus an empty-search state copying theirs

**Graded on:** product understanding, UI/UX consistency, engineering quality,
functionality, data/API handling, attention to detail (responsiveness, loading/error
states, navigation, polish).

---

## 5. Open blocker

The brief references "reference screens provided in this assignment document" (p.1) and
"the exact product/content requirements … in the reference material attached" (p.2).
**Neither is in the PDF** — 3 pages, zero images, and the email carried only that one
attachment. Ask Vaibhav for them; until then, product/EMI content has to be invented,
which is exactly what criterion 5 grades.

## 6. Useful trick

The app is a WebView over a live site, so `chrome://inspect/#devices` (or just
`app.1fi.in` in Chrome) gives full DevTools on the real UI — real class names, spacing,
and the React component tree with React DevTools installed.
