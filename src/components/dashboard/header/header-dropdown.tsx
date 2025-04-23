'use client'

import { signOut } from 'next-auth/react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { LogOut } from 'lucide-react'
import { ReactElement } from 'react'
import { getUserInfo } from '@/services/github/user'
import { Dictionary } from '@/types/dictionary'

type HeaderDropdownProps = {
  user: Awaited<ReturnType<typeof getUserInfo>>
  dict: Dictionary['dashboardPage']
  children?: ReactElement
}

export const HeaderDropdown = ({
  dict,
  children,
  user,
}: HeaderDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium">{user?.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/*  <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>{dict.header.dropdownItems.profile}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>{dict.header.dropdownItems.settings}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator /> */}

        <DropdownMenuItem
          onClick={() => {
            signOut()
          }}
          className='[&>svg]:shrink-0" gap-2 [&>svg]:size-4'
        >
          <LogOut />

          {dict.header.dropdownItems.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
