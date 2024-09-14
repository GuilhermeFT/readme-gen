import { Logo } from '@/components/logo'
import { RepositoryList } from '@/components/repository-list'
import { Pages } from '@/types/pages'
import { Suspense } from 'react'

export default async function Dashboard({}: Pages) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr] lg:grid-cols-[340px_1fr]">
      {/* <!-- Sidebar --> */}
      <div className="hidden border-r bg-gray-100 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Logo className="text-2xl" />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <RepositoryList />
          </Suspense>
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <div className="flex flex-col">
        {/* <!-- Header --> */}
        <header className="flex h-14 items-center border-b bg-gray-100 px-4 lg:h-[60px] lg:px-6">
          <span className="text-black"> MENU</span>
        </header>

        {/* <!-- Main Section --> */}
        <main className="flex-1 bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">
              Welcome to your dashboard!
            </h1>
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
              Add Product
            </button>
          </div>

          <div className="mt-6 grid place-items-center rounded-lg border border-dashed p-8 text-center text-gray-600">
            <h3 className="text-2xl font-bold">No products available</h3>
            <p className="mt-2 text-gray-500">
              You can start by adding a new product to your inventory.
            </p>
            <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white">
              Add Product
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
