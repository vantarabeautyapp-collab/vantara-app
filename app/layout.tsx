import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Vantara — Discover. Book. Glow.",
  description: 'Book top-rated salons, barbers, makeup artists, and beauty professionals across Africa. Instant booking, verified professionals, and real reviews.',
  keywords: 'salon booking Africa, barbershop Nairobi, hair salon Kenya, beauty services Africa, book haircut, Vantara',
  openGraph: {
    title: "Vantara — Discover. Book. Glow.",
    description: 'Discover and book premium beauty services across Africa.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vantara — Discover. Book. Glow.',
    description: 'Book premium beauty professionals across Africa.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0A0A0A] text-[#F0EDE8] antialiased">
        {children}
      </body>
    </html>
  )
}
