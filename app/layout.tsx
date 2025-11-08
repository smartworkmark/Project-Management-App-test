import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tactical Ops - Kanban Board',
  description: 'Classified task management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-tactical-dark font-mono">
        {children}
      </body>
    </html>
  )
}
