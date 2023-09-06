import './globals.css'
import type { Metadata } from 'next'
import { Gruppo, Roboto_Condensed, Rubik_Mono_One } from 'next/font/google'

const inter = Rubik_Mono_One({
	subsets: ['latin'],
	weight: '400'
})

export const metadata: Metadata = {
  title: 'FUDGEU',
  description: 'PERSONAL PORTFOLIO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
