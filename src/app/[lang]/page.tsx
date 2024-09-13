import { Button } from '@/components/ui/button'
import { getDictionary } from '@/dictionaries'
import { cn } from '@/lib/utils'
import { locales } from '@/middleware'
import { Pages } from '@/types/pages'
import Link from 'next/link'

export default async function Home({ params: { lang } }: Pages) {
  const dictionary = await getDictionary(lang)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <header className="flex w-full">
        <nav className="ml-auto flex items-center justify-between gap-2 bg-white p-4">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded border-2 text-gray-600 hover:text-gray-800',
                lang === locale
                  ? 'border-primary text-primary'
                  : 'border-gray-200',
              )}
            >
              {locale.split('-')[0]}
            </Link>
          ))}
        </nav>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="mt-10 text-center text-5xl font-bold text-gray-800">
          {dictionary.landingPage.title}
          <span className="pointer-events-none text-center text-5xl font-bold text-muted-foreground">
            <span className="text-primary"> Readme</span>
            <span className="text-muted-foreground">Gen</span>
          </span>
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600">
          {dictionary.landingPage.description}
        </p>

        <div className="mt-8">
          <Link href={`/${lang}/login`}>
            <Button className="" size="lg">
              {dictionary.landingPage.buttonTitle}
            </Button>
          </Link>
        </div>

        <section className="mt-20 w-full text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Why ReadmeGen?
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-8">
            {dictionary.landingPage.features.map((feature) => (
              <div
                key={feature.title}
                className="w-72 rounded-lg bg-white p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-700">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center text-gray-600">
          © {new Date().getFullYear()} readmeGen. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
