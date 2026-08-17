# Pixel Style

The design system behind [Sentinel](https://sentinel-seven-flame.vercel.app): colour
tokens, the type scale, the elevation ladder and about twenty motion utilities, plus a
one-page specimen that renders all of it.

Named for the display face — every heading is Geist Pixel Square, and that one decision
is what the rest of the system is quiet enough to sit behind.

```bash
git clone https://github.com/ksiddharth-noon/pixel-style.git
cd pixel-style
npm install
npm run dev          # http://localhost:3200
```

That's the whole repo. `app/globals.css` is the system; `app/page.tsx` is a specimen
that only exists to show you what the stylesheet means.

---

## The stylesheet is only two-thirds of it

If someone hands you `globals.css` and it doesn't work, it is almost always one of
these three, in this order:

**1. It needs Tailwind CSS v4.** Line 1 is `@import "tailwindcss"` and the tokens live
in a `@theme` block. Neither exists in v3 — under v3 the file is inert. See
[porting](#porting-it-into-your-own-project) below.

**2. The fonts are not in the stylesheet.** `--font-sans` and `--font-pixel` point at
`--font-geist-sans` and `--font-geist-pixel-square`, and nothing defines those except
`next/font` in [`app/layout.tsx`](app/layout.tsx). Copy the CSS without that file and
every heading falls back to monospace.

**3. Most of the look is not in the CSS at all.** The stylesheet defines what
`border-line` and `.u-mark` *mean*; Sentinel's appearance is those meanings applied by
utility classes written on elements in its components. A `<div>` with no classes gets
you the right background and the right body face and nothing else. This is why the
specimen page is here — it is the vocabulary, used.

---

## What's in it

### Colour — `@theme`

| Token | Value | For |
| --- | --- | --- |
| `--color-bg` / `--color-card` | `#ffffff` | page, surface |
| `--color-ink` | `#18191d` | text |
| `--color-muted` | `#76798a` | second place |
| `--color-line` | `#ededec` | hairline |
| `--color-line-strong` | `#e3e3e0` | hairline, up |
| `--color-draft` / `-bg` | `#9a6a12` / `#fbf3e3` | caveat, medium |
| `--color-open` / `-bg` | `#15803d` / `#eaf7ee` | passed, good |
| `--color-closed` / `-bg` | `#76798a` / `#f2f2f1` | dropped, neutral |
| `--color-pick` / `-bg` | `#2f62d8` / `#eff3fd` | **you chose this** |

The one rule worth carrying across: every colour above except `pick` reports something
the system *found* — a verdict, a state. `pick` is the only one that means a person
chose it. Don't mix them, or a ticked checkbox reads as a passing test.

### Type

Body is Geist Sans. Every `h1`–`h6` gets Geist Pixel Square from `@layer base` with no
class needed — and any heading at 20px or under should add `font-sans` to opt back out.
The pixel face is a display face; below that size it turns to mush and reads as a
rendering fault rather than as branding. The layer is what makes the opt-out possible:
unlayered rules outrank every layer, so without it `font-sans` could not win.

### Elevation

`.shadow-raise` · `.shadow-inset-tab` · `.shadow-float` · `.shadow-pop` ·
`.shadow-panel` · `.shadow-dialog` — chosen by *role*, not by size, so the decision at a
call site is "what is this" rather than "how dark". Each is two layers (a tight contact
shadow plus a long ambient one), all of them very light. The border does the work; the
shadow only says which side of it is nearer.

Plain classes rather than `@theme` tokens on purpose: Tailwind generated no `shadow-*`
utilities from a `--shadow-*` block, so every one of them silently computed to `none`.

### Motion

`--ease-out: cubic-bezier(0.23, 1, 0.32, 1)` and a 180ms default duration are set as
Tailwind's defaults, so every `transition-*` utility is already on the house curve
without a class.

The `.u-*` utilities are entrances and gestures: `.u-stagger` (children in sequence),
`.u-fade`, `.u-menu`, `.u-pop`, `.u-rise`, `.u-swap`, `.u-view`, `.u-overlay`,
`.u-modal`, `.u-sheet`, `.u-popover`, `.u-slide`, `.u-dim`, `.u-toast`, `.u-flash`,
`.u-morph-w` / `.u-morph-h`, `.u-track-wave`, `.u-live-bar` / `.u-live-cell`, and
`.u-mark` / `.u-mark-warn` (a highlighter sweeping in behind a phrase).

Every animated utility carries its own `prefers-reduced-motion` block. There is no
blanket `* { animation: none }` — reduced motion is honoured per utility, which means
dropping this stylesheet into an app cannot switch off animations the host owns.

### Two utilities that are load-bearing

- **`.u-circle`** — `corner-shape: superellipse(4)` is set on `*`, so a `rounded-full`
  4px dot renders as a squircle. Anything that must be a true circle (avatar, status
  dot) needs this class. Miss it and small round things look subtly square.
- **`.u-noscrollbar`** — only for scrollers with another affordance (paged arrows, a
  half-visible next card). Hiding the bar on a region whose only affordance *is* the bar
  strands anyone who can't drag.

### Not part of the system

`.hero-dither*`, `.hero-glyphs`, `.device` / `.screen`, `.field-auto`, `.u-morph-run`
and `.u-morph-new-run` are Sentinel-specific — a hero backdrop, a phone frame, two named
page transitions. They're left in so the file matches the app it came from; delete them
when you port it.

The `.device` frame art is **CC BY 3.0** and needs attribution wherever it's used.

---

## Porting it into your own project

### If you're on Next + Tailwind v4

Copy `app/globals.css` and the font wiring in `app/layout.tsx`, and
`npm i geist tailwindcss @tailwindcss/postcss`. That's it.

### If you're on Tailwind v3

The `@theme` block doesn't exist. Move the colours into
`theme.extend.colors` in `tailwind.config.js` and the rest into a plain CSS file after
`@tailwind utilities`. The `@layer base` heading rule becomes `@layer base { }` in
v3's sense, which is a different mechanism with the same name — check the cascade after.

### If you have no Tailwind

The tokens and the `.u-*` / `.shadow-*` classes all still work — they're ordinary CSS.
What you lose is every utility class in the components (`text-[13px]`, `border-line`,
`gap-2.5`), which is most of the actual layout.

---

## Read this before dropping it into an existing app

Five rules in here are deliberately global. In a fresh app that's the point; in an app
that already has a look, each one repaints things you didn't ask it to:

| Rule | What it does to a host app |
| --- | --- |
| `body { background; color; font-family; overflow-x: hidden }` | re-paints and re-types everything. `overflow-x: hidden` also breaks sticky and scroll containers. |
| `@layer base { h1..h6 { font-family: var(--font-pixel) } }` | every heading in the app becomes a pixel display face. |
| `*, *::before, *::after { corner-shape: superellipse(4) }` | every rounded corner in the app changes shape. `corner-shape` doesn't inherit, so the `*` is load-bearing, not lazy. |
| `button, [role=button], summary` + `:active { scale(.97) }` | every button in the app gains a press-scale. |
| `--ease-out` / `--default-transition-*` in `@theme` | overrides Tailwind's own easing utilities app-wide. |

If you want the system on one route only, scope the four selector rules under a wrapper
class (`.sn button`, `.sn :is(h1,h2,h3,h4,h5,h6)`, `.sn, .sn *`, …) and leave the
`@theme` block alone — variables change nothing until something uses them. Then check a
page *outside* that wrapper by diffing `getComputedStyle` on its headings and buttons
before and after. One unscoped selector restyles a whole app silently, and
`corner-shape` is the one that gets missed.

---

Fonts are [Geist](https://vercel.com/font) by Vercel (SIL OFL 1.1).
