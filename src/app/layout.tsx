import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Readme Gen',
  description: 'Generate a README.md file for your project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} ${poppins.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
