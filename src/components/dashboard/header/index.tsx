import { HeaderAvatar } from './header-avatar'

import { Locales } from '@/types/locales'

import { HeaderDropdown } from './header-dropdown'
import { getUserInfo } from '@/services/github/user'
import { Button } from '@/components/ui/button'

import { HeaderLanguage } from './header-language'
import { Dictionary } from '@/types/dictionary'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Menu } from 'lucide-react'

type DashboardHeaderProps = {
  dictionary: Dictionary['dashboardPage']
  lang: Locales
}

export const DashboardHeader = async ({
  dictionary,
  lang,
}: DashboardHeaderProps) => {
  const user = await getUserInfo()

  return (
    <header className="bg-background sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-6">
      <div className="absolute top-3 left-4 z-40 md:hidden">
        <SidebarTrigger>
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SidebarTrigger>
      </div>

      <div className="flex flex-1 items-center justify-end gap-4">
        <div className="flex items-center gap-4">
          {/* <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Ajuda</span>
            </Button>
          </div> */}

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
