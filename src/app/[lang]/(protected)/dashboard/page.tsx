import { Logo } from '@/components/logo'
import { RepositoryList } from '@/components/dashboard/repository-list'
import { Pages } from '@/types/pages'
import { Suspense } from 'react'
import { RepositoryListSkeleton } from '@/components/dashboard/repository-list/skeleton'
import { DashboardHeader } from '@/components/dashboard/header'

export default async function Dashboard({ searchParams: { repo } }: Pages) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr]">
      <div className="fixed z-10 flex h-dvh w-full flex-col items-center justify-center gap-2 bg-white md:hidden md:opacity-0">
        <Logo className="text-2xl" />
        <p className="text-center text-zinc-900">
          Use no computador para uma melhor experiência
        </p>
      </div>
      {/* <!-- Sidebar --> */}
      <div className="hidden border-r bg-gray-100 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo className="text-2xl" />
          </div>

          <div className="flex flex-1 flex-col overflow-hidden">
            <p className="border-b p-1 text-center text-xs font-semibold text-gray-600">
              Seus Repositórios
            </p>

            <Suspense fallback={<RepositoryListSkeleton />}>
              <div className="flex-1 overflow-y-auto bg-zinc-50">
                <RepositoryList repoName={repo} />
              </div>
            </Suspense>
          </div>
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <div className="flex flex-col">
        {/* <!-- Header --> */}
        <DashboardHeader />

        {/* <!-- Main Section --> */}
        <main className="grid flex-1 grid-cols-1 bg-gray-50 p-4 xl:grid-cols-2">
          <div className="bg-red-400"></div>
          <div className="bg-green-400"></div>
        </main>
      </div>
    </div>
  )
}
