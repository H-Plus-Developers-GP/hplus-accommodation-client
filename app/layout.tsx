import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import "@/styles/globals.css"
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hplus Accommodation',
  description: 'Property, Accommodation, House, Apartment, Flat, Land, Real Estate sell, buy and rent in myanmar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
