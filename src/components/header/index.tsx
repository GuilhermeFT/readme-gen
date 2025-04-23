import { cn } from '@/lib/utils'
import { locales } from '@/middleware'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { getDictionary } from '@/lib/dictionary'
import { MobileMenu } from './mobile-menu'
import { Locales } from '@/types/locales'

type HeaderProps = {
  lang: Locales
}

export const Header = async ({ lang }: HeaderProps) => {
  const dict = await getDictionary(lang)

  return (
    <header className="supports-backdrop-filter:bg-background/60 bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="text-primary h-6 w-6" />
          <span className="text-xl font-bold">
            Readme<span className="text-primary">Gen</span>
          </span>
        </div>

        <nav className="flex items-center gap-4">
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="#features"
              className="hover:text-primary text-sm font-medium"
            >
              Recursos
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-primary text-sm font-medium"
            >
              Como Funciona
            </Link>
            <Link
              href="#faq"
              className="hover:text-primary text-sm font-medium"
            >
              FAQ
            </Link>
          </div>

          <div className="flex items-center gap-2 overflow-hidden rounded-md border">
            {locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                className={cn(
                  'bg-muted text-primary-foreground px-2.5 py-1.5 text-xs font-medium',
                  lang === locale
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-primary',
                )}
              >
                {locale.split('-')[0].toUpperCase()}
              </Link>
            ))}
          </div>

          <MobileMenu dict={dict.header} />

          <Link href={`/${lang}/login`}>
            <Button size="sm" className="hidden md:inline-flex">
              Começar Agora
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
