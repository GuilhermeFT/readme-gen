import { Dictionary } from '@/dictionaries/types'
import { HeaderAvatar } from './header-avatar'
import { locales } from '@/middleware'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Locales } from '@/types/locales'

type DashboardHeaderProps = {
  dictionary: Dictionary['dashboardPage']
  lang: Locales
}

export const DashboardHeader = ({ dictionary, lang }: DashboardHeaderProps) => {
  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b bg-white px-4 shadow-md lg:h-16 lg:px-6">
      <div className="flex flex-1 items-center">
        <h1 className="text-lg font-medium text-gray-700 md:text-xl">
          {dictionary.title}
        </h1>
      </div>

      <nav className="ml-auto flex items-center gap-4">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}/dashboard`}
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

      <HeaderAvatar />
    </header>
  )
}
