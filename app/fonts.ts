import { JetBrains_Mono } from 'next/font/google'

// Using JetBrains Mono as a fallback since TTInterphasesMono woff2 files are not present locally.
// Replace this with localFont when the font files are provided in public/fonts/
export const ttInterphasesMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-tt',
  display: 'swap',
})
