import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileText, Home, Settings, HelpCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Dictionary } from '@/types/dictionary'

type SidebarContentProps = {
  dictionary?: Dictionary['dashboardPage']['sidebar']
}

export const SidebarContent = ({ dictionary }: SidebarContentProps) => {
  const pathname = usePathname()

  const labels = dictionary || {
    home: 'Início',
    settings: 'Configurações',
    helpSupport: 'Ajuda & Suporte',
  }

  const routes = [
    {
      label: labels.home,
      href: '/dashboard',
      icon: Home,
    },
    {
      label: labels.settings,
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      label: labels.helpSupport,
      href: '/dashboard/help',
      icon: HelpCircle,
    },
  ]

  return (
    <>
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <FileText className="text-primary h-5 w-5" />
          <span>
            Readme<span className="text-primary">Gen</span>
          </span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => {
            const isActive = pathname === route.href
            return (
              <Button
                key={route.href}
                asChild
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'mb-1 justify-start gap-2 px-2',
                  isActive && 'bg-primary text-primary-foreground',
                )}
              >
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
