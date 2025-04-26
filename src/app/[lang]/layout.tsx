import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { Locales } from '@/types/locales'
import { defaultLocale } from '@/middleware'

type RootLayout = Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: Locales }>
}>

const montserrat = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ReadmeGen - Gerador de README.md profissionais',
  description:
    'Gere automaticamente arquivos README.md profissionais para seus repositórios GitHub com a ajuda da IA.',
}

export default async function RootLayout({ children, ...props }: RootLayout) {
  const params = await props.params

  return (
    <html lang={params.lang || defaultLocale}>
      <body
        className={`${montserrat.className} ${montserrat.className} antialiased`}
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
