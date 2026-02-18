import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'GBP - Greater Better People',
  description: 'Crowdfunded AI Agent Operations for Social Good',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
