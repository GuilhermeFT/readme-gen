import { HeaderAvatar } from './header-avatar'

import { Locales } from '@/types/locales'

import { HeaderDropdown } from './header-dropdown'
import { getUserInfo } from '@/services/github/user'
import { getUserOnDB } from '@/services/faunadb'
import { Button } from '@/components/ui/button'
import { HelpCircle } from 'lucide-react'

import { HeaderLanguage } from './header-language'
import { Dictionary } from '@/types/dictionary'

type DashboardHeaderProps = {
  dictionary: Dictionary['dashboardPage']
  lang: Locales
}

export const DashboardHeader = async ({
  dictionary,
  lang,
}: DashboardHeaderProps) => {
  const user = await getUserInfo()
  const dbUser = await getUserOnDB(user?.email ?? undefined)

  return (
    <header className="bg-background sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-6">
      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
            <span className="font-medium">Créditos:</span>
            <span>8</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Ajuda</span>
            </Button>
          </div>

          <HeaderLanguage lang={lang} />

          <HeaderDropdown dict={dictionary} user={user}>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <HeaderAvatar user={user} />
            </Button>
          </HeaderDropdown>
        </div>
      </div>
    </header>
  )
}
