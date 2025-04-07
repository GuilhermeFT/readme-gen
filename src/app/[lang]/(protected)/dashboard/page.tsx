import { Pages } from '@/types/pages'
import { Suspense } from 'react'
import { DashboardSkeleton } from '@/components/dashboard/skeleton'
import { DashboardWrapper } from '@/components/dashboard'
import { getDictionary } from '@/lib/dictionary'
import { RepositoryList } from '@/components/dashboard/repository-list'
import { MobileRepositoryDrawer } from '@/components/dashboard/repository-list/mobile-drawer'
import DashboardTemplate from '../dashboard-template'

export default async function Dashboard(props: Pages) {
  const searchParams = await props.searchParams
  const { repo } = searchParams
  const params = await props.params
  const { lang } = params

  const hasSelectedRepo = Boolean(repo)
  const dictionary = await getDictionary(lang)

  return (
    <DashboardTemplate dictionary={dictionary} lang={lang} repoName={repo}>
      <main className="flex-1 overflow-auto p-6">
        <div className="mb-4 lg:hidden">
          <Suspense>
            <MobileRepositoryDrawer
              title={
                dictionary.dashboardPage.repositoryList?.title ||
                'Seus Repositórios'
              }
              description={
                dictionary.dashboardPage.yourRepositories ||
                'Escolha um repositório para gerar README'
              }
              buttonLabel={
                dictionary.dashboardPage.repositoryList?.title || 'Repositórios'
              }
            >
              <RepositoryList
                repoName={repo}
                dictionary={dictionary.dashboardPage.repositoryList}
              />
            </MobileRepositoryDrawer>
          </Suspense>
        </div>

        {hasSelectedRepo ? (
          <Suspense key={repo} fallback={<DashboardSkeleton />}>
            <DashboardWrapper repo={repo} lang={lang} />
          </Suspense>
        ) : (
          <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
            <div className="bg-card max-w-md rounded-lg border p-8 text-center shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">
                {dictionary.dashboardPage.selectRepository}
              </h2>
              <p className="text-muted-foreground">
                {dictionary.dashboardPage.selectRepositoryDescription ||
                  'Selecione um repositório da lista para gerar um README personalizado.'}
              </p>
            </div>
          </div>
        )}
      </main>
    </DashboardTemplate>
  )
}
