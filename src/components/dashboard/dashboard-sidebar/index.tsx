'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useState, useEffect } from 'react'
import { SidebarContent } from './sidebar-content'

type DashboardSidebarProps = {
  dictionary?: {
    dashboardPage?: {
      sidebar?: {
        home: string
        settings: string
        helpSupport: string
      }
    }
  }
}

export const DashboardSidebar = ({ dictionary }: DashboardSidebarProps) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    if (isDesktop) {
      setOpen(false)
    }
  }, [isDesktop])

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="absolute top-3 left-4 z-40 md:hidden">
          <Button variant="outline" size="icon" className="rounded-full">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SheetTitle className="sr-only">Sidebar</SheetTitle>
          <SheetDescription className="sr-only">Sidebar</SheetDescription>
          <SidebarContent dictionary={dictionary?.dashboardPage?.sidebar} />
        </SheetContent>
      </Sheet>

      <aside className="bg-background hidden w-[240px] flex-col border-r md:flex">
        <SidebarContent dictionary={dictionary?.dashboardPage?.sidebar} />
      </aside>
    </>
  )
}
