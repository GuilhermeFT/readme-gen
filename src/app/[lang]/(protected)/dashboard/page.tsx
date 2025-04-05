import { Pages } from '@/types/pages'
import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/header'

import { DashboardSkeleton } from '@/components/dashboard/skeleton'
import { DashboardWrapper } from '@/components/dashboard'
import { getDictionary } from '@/lib/dictionary'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

export default async function Dashboard(props: Pages) {
  const searchParams = await props.searchParams

  const { repo } = searchParams

  const params = await props.params

  const { lang } = params

  const hasSelectedRepo = Boolean(repo)
  const dictionary = await getDictionary(lang)

  return (
    <div className="bg-background flex min-h-screen">
      <DashboardSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader dictionary={dictionary.dashboardPage} lang={lang} />

        {/* Main Section */}
        <main className="grid flex-1 grid-cols-1 gap-6 p-6 xl:grid-cols-[550px_1fr]">
          {hasSelectedRepo ? (
            <Suspense key={repo} fallback={<DashboardSkeleton />}>
              <DashboardWrapper repo={repo} lang={lang} />
            </Suspense>
          ) : (
            <div className="col-span-2 flex items-center justify-center rounded-lg border border-dashed bg-white p-8 shadow-xs">
              <h1 className="text-center text-xl font-medium text-gray-700">
                {dictionary.dashboardPage.selectRepository}
              </h1>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
