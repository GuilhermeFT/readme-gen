import { Logo } from '@/components/logo'
import { RepositoryList } from '@/components/dashboard/repository-list'
import { Pages } from '@/types/pages'
import { Suspense } from 'react'
import { RepositoryListSkeleton } from '@/components/dashboard/repository-list/skeleton'
import { DashboardHeader } from '@/components/dashboard/header'

import { DashboardSkeleton } from '@/components/dashboard/skeleton'
import { DashboardWrapper } from '@/components/dashboard'

export default async function Dashboard({ searchParams: { repo } }: Pages) {
  const hasSelectedRepo = Boolean(repo)

  return (
    <div className="grid min-h-screen w-full bg-gradient-to-b from-gray-50 via-white to-gray-100 md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr]">
      {/* Mobile Warning */}
      <div className="fixed z-10 flex h-dvh w-full flex-col items-center justify-center gap-2 bg-white md:hidden">
        <Logo className="text-3xl text-primary" />
        <p className="text-center text-sm text-gray-700">
          Use no computador para uma melhor experiência
        </p>
      </div>

      {/* Sidebar */}
      <aside className="hidden border-r bg-white shadow-md md:block">
        <div className="flex h-full max-h-screen flex-col gap-4">
          {/* Sidebar Header */}
          <div className="flex h-16 items-center justify-between border-b bg-gray-50 px-6">
            <Logo className="text-3xl text-primary" />
          </div>

          {/* Repositories Section */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <p className="border-b bg-gray-100 px-4 py-2 text-center text-sm font-medium text-gray-600">
              Seus Repositórios
            </p>
            <Suspense fallback={<RepositoryListSkeleton />}>
              <div className="flex-1 overflow-y-auto bg-white">
                <RepositoryList repoName={repo} />
              </div>
            </Suspense>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <DashboardHeader />

        {/* Main Section */}
        <main className="grid flex-1 grid-cols-1 gap-6 p-6 xl:grid-cols-[550px_1fr]">
          {hasSelectedRepo ? (
            <Suspense key={repo} fallback={<DashboardSkeleton />}>
              <DashboardWrapper repo={repo} />
            </Suspense>
          ) : (
            <div className="col-span-2 flex items-center justify-center rounded-lg border border-dashed bg-white p-8 shadow-sm">
              <h1 className="text-center text-xl font-medium text-gray-700">
                Selecione um repositório para começar
              </h1>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
