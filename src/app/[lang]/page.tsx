import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { getDictionary } from '@/dictionaries'
import { cn } from '@/lib/utils'
import { locales } from '@/middleware'

import { Pages } from '@/types/pages'
import Link from 'next/link'

export default async function Home({ params: { lang } }: Pages) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100">
      {/* Header */}
      <header className="flex w-full items-center justify-between bg-white/80 p-4 backdrop-blur-md lg:px-8">
        <Logo className="text-xl md:text-2xl" />

        <nav className="ml-auto flex items-center gap-4">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-medium transition',
                lang === locale
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-primary',
              )}
            >
              {locale.split('-')[0].toUpperCase()}
            </Link>
          ))}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="mt-10 text-4xl font-extrabold leading-tight text-gray-800 md:text-6xl">
          {dictionary.landingPage.title}
          <Logo className="text-5xl md:text-7xl" />
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
          {dictionary.landingPage.description}
        </p>
        <div className="mt-8">
          <Link href={`/${lang}/login`}>
            <Button size="lg" className="px-6 py-3">
              {dictionary.landingPage.buttonTitle}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 w-full px-4 lg:px-12">
        <h2 className="text-center text-3xl font-bold text-gray-800 md:text-4xl">
          {dictionary.landingPage.featuresTitle}
        </h2>
        <div className="container mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.landingPage.features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg bg-white p-6 shadow-lg transition hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-700">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-white py-8 text-center text-gray-600 shadow-inner">
        <p>© {new Date().getFullYear()} ReadmeGen. All rights reserved.</p>
      </footer>
    </main>
  )
}
