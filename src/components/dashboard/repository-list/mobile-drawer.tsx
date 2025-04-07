'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ListFilter } from 'lucide-react'
import { useState } from 'react'

type MobileRepositoryDrawerProps = {
  title?: string
  description?: string
  buttonLabel?: string
  children: React.ReactNode
}

export function MobileRepositoryDrawer({
  title = 'Repositórios',
  description = 'Selecione um repositório',
  buttonLabel = 'Repositórios',
  children,
}: MobileRepositoryDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 lg:hidden">
          <ListFilter className="h-4 w-4" />
          <span>{buttonLabel}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] p-0 sm:w-[400px]">
        <SheetHeader className="border-b p-4">
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="h-[calc(100vh-6rem)] overflow-auto">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
