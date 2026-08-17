import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistPixelSquare } from 'geist/font/pixel'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pixel Style',
  description: 'The tokens, base layer and motion utilities behind Sentinel.',
}

/**
 * The two font variables globals.css is written against.
 *
 * This is the half of the styling that does not live in the stylesheet and is
 * the usual reason it "does not work" when the CSS is copied on its own:
 * `--font-sans` and `--font-pixel` in the `@theme` block point at
 * `--font-geist-sans` and `--font-geist-pixel-square`, and nothing defines
 * those but `next/font` here. Without this file every heading falls back to
 * monospace and the body to the system sans.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistPixelSquare.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}
