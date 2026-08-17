'use client'

import { useState } from 'react'

/**
 * A specimen, not a copy of the app.
 *
 * The point of this page is that `globals.css` on its own shows a reader
 * nothing: it defines what `border-line` and `.u-mark` mean, and the look of
 * Sentinel is those meanings applied by utility classes written on elements in
 * its components. So this renders the vocabulary directly — every token as a
 * swatch, the type scale, and the motion utilities on things you can press —
 * and then a few patterns built from them, so the relationship between the
 * stylesheet and the result is visible in one scroll.
 *
 * Everything below is written only in utilities the shared stylesheet defines.
 * Nothing here needs the rest of the app.
 */

/* Class names written out, never composed.
 *
 * Tailwind generates utilities by scanning source text for literal class
 * names, so `bg-${name}` produces a string at runtime that has no CSS behind
 * it — the swatch renders blank and nothing warns you. Every class here is a
 * whole word for that reason. */
const INK = [
  { token: 'bg', use: 'page', box: 'bg-bg' },
  { token: 'card', use: 'surface', box: 'bg-card' },
  { token: 'ink', use: 'text', box: 'bg-ink' },
  { token: 'muted', use: 'second place', box: 'bg-muted' },
  { token: 'line', use: 'hairline', box: 'bg-line' },
  { token: 'line-strong', use: 'hairline, up', box: 'bg-line-strong' },
] as const

const STATE = [
  { token: 'draft', use: 'caveat / medium', box: 'bg-draft-bg', text: 'text-draft' },
  { token: 'open', use: 'passed / good', box: 'bg-open-bg', text: 'text-open' },
  { token: 'closed', use: 'dropped / neutral', box: 'bg-closed-bg', text: 'text-closed' },
  { token: 'pick', use: 'you chose this', box: 'bg-pick-bg', text: 'text-pick' },
] as const

export default function Specimen() {
  return (
    <main className="mx-auto max-w-[1120px] px-8 py-16">
      <p className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-muted">
        Sentinel · design tokens
      </p>
      <h1 className="mt-2 text-[38px] font-medium leading-[1.1] tracking-tight [-webkit-text-stroke:0.5px_currentColor] [font-synthesis-weight:none]">
        The styling, on its own
      </h1>
      <p className="mt-3 max-w-[68ch] text-[14px] leading-[1.7] text-muted">
        Everything on this page is drawn with the utilities in{' '}
        <code className="rounded-[5px] bg-black/[0.05] px-1.5 py-0.5 text-[13px]">
          app/globals.css
        </code>{'. '}
        If a colour, a curve or an animation looks right here, it will look the same in
        your app once the stylesheet and the two font variables are in place.
      </p>

      <Section title="Colour" note="Every token in the @theme block.">
        <Group label="Surface and text" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INK.map((t) => (
            <Swatch key={t.token} token={t.token} use={t.use} box={t.box} />
          ))}
        </div>
        {/* Four across under three: the count changes because the group does,
            so the group is named rather than left looking like a slipped grid.
            Each of these tokens is a pair — the tint fills the box, the ink
            colours the label, and the name covers both. */}
        <Group label="State" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STATE.map((t) => (
            <div key={t.token} className="rounded-[14px] border border-line p-4">
              <div className={`h-10 rounded-[8px] ${t.box}`} />
              <p className={`mt-3 text-[13px] font-medium ${t.text}`}>
                --color-{t.token} · -bg
              </p>
              <p className="mt-0.5 text-[12px] text-muted">{t.use}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Type"
        note="Headings take the pixel face from @layer base — no class needed."
      >
        <div className="rounded-[14px] border border-line p-6">
          <h2 className="text-[28px] font-medium leading-none tracking-tight [-webkit-text-stroke:0.5px_currentColor] [font-synthesis-weight:none]">
            Heading, pixel face
          </h2>
          <p className="mt-4 font-sans text-[19px] font-semibold tracking-tight">
            Title, 19px semibold
          </p>
          <p className="mt-2 text-[14px] leading-snug">Body, 14px</p>
          <p className="mt-2 text-[13px] text-muted">Second line, 13px muted</p>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
            Caption, 11px small caps
          </p>
        </div>
      </Section>

      <Section
        title="Motion"
        note="The .u-* utilities. Press them — every one is on the app's own out-curve."
      >
        <Motion />
      </Section>

      <Section title="Patterns" note="The same tokens, assembled.">
        <Patterns />
      </Section>

      <p className="mt-16 border-t border-line pt-6 text-[13px] text-muted">
        Tokens, base layer and motion utilities are shared. The components in Sentinel are
        not in this repo — see the README for what carries over and what does not.
      </p>
    </main>
  )
}

function Section({
  title,
  note,
  children,
}: {
  title: string
  note: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-14">
      {/* `font-sans` because the pixel face is a display face and turns to mush
          under about 20px — the base layer sets it on every h*, and opting back
          out at small sizes is the rule, not an exception. */}
      <h2 className="font-sans text-[19px] font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-[13px] text-muted">{note}</p>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function Group({ label }: { label: string }) {
  return (
    <p className="mb-2.5 mt-7 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted first:mt-0">
      {label}
    </p>
  )
}

function Swatch({ token, use, box }: { token: string; use: string; box: string }) {
  return (
    <div className="rounded-[14px] border border-line p-4">
      <div className={`h-10 rounded-[8px] border border-line ${box}`} />
      <p className="mt-3 text-[13px] font-medium">--color-{token}</p>
      <p className="mt-0.5 text-[12px] text-muted">{use}</p>
    </div>
  )
}

function Motion() {
  const [n, setN] = useState(0)
  return (
    <div className="rounded-[14px] border border-line p-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setN((v) => v + 1)}
          className="rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-white transition hover:opacity-90"
        >
          Replay
        </button>
        <p className="text-[13px] text-muted">
          Buttons take the press-scale from the base layer — hold one down.
        </p>
      </div>

      <div key={n} className="u-stagger mt-5 grid gap-2.5 sm:grid-cols-3">
        {['u-stagger', 'u-fade', 'u-menu'].map((u) => (
          <div key={u} className="rounded-[12px] border border-line px-4 py-3">
            <code className="text-[12.5px] font-medium">.{u}</code>
          </div>
        ))}
      </div>

      <div key={`m${n}`} className="mt-5 flex flex-wrap items-center gap-6">
        <span className="text-[11px] font-semibold uppercase tracking-[0.09em]">
          <span className="u-mark">High confidence</span>
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.09em]">
          <span className="u-mark u-mark-warn">Medium confidence</span>
        </span>
        <span className="u-fade rounded-[10px] border border-line px-3 py-1.5 text-[12.5px] font-medium">
          .u-fade
        </span>
      </div>
    </div>
  )
}

function Patterns() {
  const [on, setOn] = useState(true)
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {/* A record card — the shape the runs list uses. */}
      <div className="rounded-[18px] border border-line bg-card p-5 shadow-raise">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[13px] tabular-nums text-muted">R-482</span>
          <span className="text-[15px] font-medium">Returns · return-create</span>
        </div>
        <div className="mt-2.5 flex items-center gap-2.5">
          <span className="u-circle h-1.5 w-1.5 rounded-full bg-red-500" />
          <span className="text-[13px] font-medium">9 findings</span>
          <span className="ml-auto flex h-7 items-center gap-1.5 rounded-full border border-line px-3 text-[12.5px] font-medium transition hover:border-line-strong hover:bg-black/[0.03]">
            View report →
          </span>
        </div>
        <dl className="mt-4 border-t border-line">
          <div className="grid grid-cols-2 gap-x-4 py-3.5">
            <Fact label="Build">2026.5.20128</Fact>
            <Fact label="Device">iPhone 15 Pro</Fact>
          </div>
          <div className="grid grid-cols-2 gap-x-4 py-3.5 pb-2.5">
            <Fact label="Coverage">AE SA · EN AR</Fact>
            <Fact label="Started by">Kumar Siddharth</Fact>
          </div>
        </dl>
      </div>

      {/* A selectable tile — the shape the plan step uses. */}
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => setOn((v) => !v)}
          className={`group/step grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2.5 rounded-[14px] border px-4 py-4 text-left transition-colors duration-200 ease-out ${
            on
              ? 'border-pick/30 bg-card hover:border-pick/55'
              : 'border-dashed border-line-strong bg-transparent'
          }`}
        >
          <span className="flex-none pt-px text-[12px] font-bold tabular-nums">N03</span>
          <span className="flex min-w-0 items-start gap-3">
            <span
              className={`min-w-0 flex-1 text-[14px] font-medium leading-snug transition-colors duration-200 ease-out ${
                on ? '' : 'text-muted'
              }`}
            >
              Select return reason
            </span>
            <span className="flex h-5 flex-none items-center">
              <span
                className={`grid h-[17px] w-[17px] place-items-center rounded-[5px] border transition-colors duration-200 ease-out ${
                  on
                    ? 'border-pick bg-pick text-white'
                    : 'border-line-strong bg-card group-hover/step:border-muted'
                }`}
              >
                <svg
                  viewBox="0 0 256 256"
                  className={`h-[11px] w-[11px] transition-all duration-200 ease-out ${
                    on ? 'scale-100 opacity-100' : 'scale-[0.4] opacity-0'
                  }`}
                  fill="currentColor"
                >
                  <path d="M232.5 80.5l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183.5 215.5 63.5a12 12 0 0 1 17 17Z" />
                </svg>
              </span>
            </span>
          </span>
        </button>

        <div className="rounded-r-[6px] border-l-[3px] border-l-draft bg-draft-bg/50 px-5 py-4">
          <p className="text-[13px] leading-[1.55] text-ink/75">
            A caveat panel — left accent, tinted surface, ink prose.
          </p>
        </div>

        <div className="rounded-r-[6px] border-l-[3px] border-l-open bg-open-bg/50 px-5 py-4">
          <p className="text-[13px] leading-[1.55] text-ink/75">
            And the same shape when nothing fell short.
          </p>
        </div>
      </div>
    </div>
  )
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 truncate text-[13px] font-medium text-ink/70">{children}</dd>
    </div>
  )
}
