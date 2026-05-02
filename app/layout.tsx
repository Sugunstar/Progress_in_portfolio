import type { Metadata } from 'next'
import { ttInterphasesMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adithya Portfolio',
  description: 'Portfolio of Venkata Sugunadithya Miriyampally',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ttInterphasesMono.variable}>
      <body style={{ margin: 0, overflow: 'hidden', height: '100dvh' }}>
        {children}
      </body>
    </html>
  )
}
