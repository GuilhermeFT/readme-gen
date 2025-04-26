'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { locales } from '@/middleware'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type HeaderLanguageProps = {
  lang: string
}

export const HeaderLanguage = ({ lang }: HeaderLanguageProps) => {
  const searchParams = useSearchParams()

  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-md border">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}/dashboard?${searchParams.toString()}`}
        >
          <Button
            variant="ghost"
            className={cn(
              'h-8 cursor-pointer px-2.5 py-1.5 text-xs font-medium',
              lang === locale
                ? 'bg-primary text-primary-foreground'
                : 'hover:text-primary hover:bg-muted',
            )}
          >
            {locale.split('-')[0].toUpperCase()}
          </Button>
        </Link>
      ))}
    </div>
  )
}
