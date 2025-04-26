'use client'

import { Dictionary } from '@/types/dictionary'
import { listAuthenticatedUserRepositories } from '@/services/github/repositories/index'
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { RepositoryList } from '../repository-list'

type DashboardSidebarProps = {
  dictionary: Dictionary
  repoName?: string
  repositories: Awaited<ReturnType<typeof listAuthenticatedUserRepositories>>
}

export const DashboardSidebar = ({
  dictionary,
  repoName,
  repositories,
}: DashboardSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <FileText className="text-primary h-5 w-5" />
          <span>
            Readme<span className="text-primary">Gen</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4 py-2">
        <h2 className="text-lg font-semibold">
          {dictionary.dashboardPage.repositoryList.title}
        </h2>
        <RepositoryList
          repositories={repositories}
          repoName={repoName}
          dictionary={dictionary.dashboardPage}
        />
      </SidebarContent>
    </Sidebar>
  )
}
