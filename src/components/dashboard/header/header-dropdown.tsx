'use client'

import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dictionary } from '@/dictionaries/types'

import { LogOut } from 'lucide-react'
import { ReactElement } from 'react'

type HeaderDropdownProps = {
  dictionary: Dictionary['dashboardPage']
  children?: ReactElement
}

export const HeaderDropdown = ({
  dictionary,
  children,
}: HeaderDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>

      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
        <DropdownMenuItem
          onClick={() => {
            signOut()
          }}
          className='[&>svg]:shrink-0" gap-2 [&>svg]:size-4'
        >
          <LogOut />

          {dictionary.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
