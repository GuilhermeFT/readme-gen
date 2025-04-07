import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/header'
import { RepositoryList } from '@/components/dashboard/repository-list'
import { RepositoryListSkeleton } from '@/components/dashboard/repository-list/skeleton'
import { Dictionary } from '@/types/dictionary'
import { Locales } from '@/types/locales'
import { Suspense } from 'react'

type DashboardTemplateProps = {
  children: React.ReactNode
  dictionary: Dictionary
  lang: Locales
  repoName?: string
}

export default async function DashboardTemplate({
  children,
  dictionary,
  lang,
  repoName,
}: DashboardTemplateProps) {
  return (
    <div className="bg-background flex h-screen">
      <DashboardSidebar dictionary={dictionary} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader dictionary={dictionary.dashboardPage} lang={lang} />

        <div className="flex flex-1 overflow-hidden">
          {/* Repository List Sidebar - Desktop */}
          <div className="hidden w-[320px] flex-shrink-0 flex-col overflow-hidden border-r lg:flex">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-base font-semibold">
                {dictionary.dashboardPage.repositoryList?.title ||
                  'Seus Repositórios'}
              </h2>
            </div>
            <div className="flex-1 overflow-auto">
              <Suspense fallback={<RepositoryListSkeleton />}>
                <RepositoryList
                  repoName={repoName}
                  dictionary={dictionary.dashboardPage.repositoryList}
                />
              </Suspense>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
