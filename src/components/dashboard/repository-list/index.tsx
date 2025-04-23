'use client'

import { cn } from '@/lib/utils'
import { Star, GitFork, History, Check } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Github } from '@/components/icons/github'
import { listAuthenticatedUserRepositories } from '@/services/github/repositories/index'

type RepositoryListProps = {
  repositories: Awaited<ReturnType<typeof listAuthenticatedUserRepositories>>
  repoName?: string
  dictionary?: {
    title?: string
    loading?: string
    noRepositories?: string
    selected?: string
  }
  isLoading?: boolean
}

export const RepositoryList = ({
  repositories,
  repoName,
  dictionary,
  isLoading,
}: RepositoryListProps) => {
  console.log('repositories', repositories)

  if (isLoading) {
    return (
      <div className="text-muted-foreground flex items-center justify-center py-8">
        {dictionary?.loading || 'Loading repositories...'}
      </div>
    )
  }

  if (!repositories || repositories.length === 0) {
    return (
      <div className="text-muted-foreground flex items-center justify-center py-8">
        {dictionary?.noRepositories || 'No repositories found'}
      </div>
    )
  }

  return (
    <div className="divide-y">
      {repositories?.map((repo) => {
        const isSelected = repoName === repo.name
        return (
          <Link
            key={repo.id}
            href={`?repo=${repo.name}`}
            className={cn(
              'hover:bg-accent/50 block p-4 transition-colors',
              isSelected && 'bg-accent relative',
            )}
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-1.5">
                <Github className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                <span
                  className={cn(
                    'truncate font-medium',
                    isSelected && 'text-primary',
                  )}
                >
                  {repo.name}
                </span>
                {isSelected && (
                  <Badge
                    variant="secondary"
                    className="ml-auto flex items-center gap-1"
                  >
                    <Check className="h-3 w-3" />
                    <span className="text-xs">
                      {dictionary?.selected || 'Selecionado'}
                    </span>
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground line-clamp-2 text-sm">
                {repo.description || 'No description'}
              </p>

              <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  <span>{repo.stargazers_count || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  <span>{repo.forks_count || 0}</span>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <History className="h-3.5 w-3.5" />
                  <span>{formatDate(repo.updated_at || '')}</span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

function formatDate(dateString: string): string {
  if (!dateString) return ''

  const updatedDate = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - updatedDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'hoje'
  if (diffDays === 1) return 'ontem'
  if (diffDays < 7) return `${diffDays} dias atrás`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`
  return `${Math.floor(diffDays / 365)} anos atrás`
}
