import { cn } from '@/lib/utils'
import { listAuthenticatedUserRepositories } from '@/services/github/repositories'

import Link from 'next/link'

type RepositoryListProps = {
  repoName?: string
}

export const RepositoryList = async ({ repoName }: RepositoryListProps) => {
  const repositories = await listAuthenticatedUserRepositories()

  return (
    <ul className="px-1">
      {repositories?.map((repo) => (
        <li
          key={repo.id}
          className={cn(
            'flex min-h-16 cursor-pointer items-center gap-4 border-b px-4 py-5 hover:bg-gray-100',
            repoName === repo.name &&
              'cursor-default bg-gray-100 after:ml-2 after:font-semibold after:text-primary after:content-[">"]',
          )}
        >
          <Link href={`?repo=${repo.name}`} className="flex-1">
            <h2 className="font-semibold text-zinc-700">{repo.name}</h2>
            <p className="text-zinc-400">
              {repo.description || 'No description'}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
