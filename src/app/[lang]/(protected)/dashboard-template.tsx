import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard/header'
import { listAuthenticatedUserRepositories } from '@/services/github/repositories/index'
import { Dictionary } from '@/types/dictionary'
import { Locales } from '@/types/locales'

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
  const repositories = await listAuthenticatedUserRepositories()

  return (
    <>
      <DashboardSidebar
        repositories={repositories}
        repoName={repoName}
        dictionary={dictionary}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader dictionary={dictionary.dashboardPage} lang={lang} />

        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
    </>
  )
}
