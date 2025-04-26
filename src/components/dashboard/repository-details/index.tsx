import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Star, GitFork, Clock } from 'lucide-react'
import {
  getRepositoryByName,
  getRepositoryLanguages,
} from '@/services/github/repositories'
import { Dictionary } from '@/types/dictionary'
import { Github } from '@/components/icons/github'

type RepositoryDetailsProps = {
  repository: Awaited<ReturnType<typeof getRepositoryByName>>
  languages: Awaited<ReturnType<typeof getRepositoryLanguages>>
  dictionary: Dictionary['dashboardPage']
}

export const RepositoryDetails = ({
  repository,
  languages,
  dictionary,
}: RepositoryDetailsProps) => {
  if (!repository) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{dictionary.repositoryForm.title}</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">
            {dictionary.repositoryForm.repoInfo.name}
          </div>
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Github className="h-4 w-4" />
            <span>{repository.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 space-y-1">
          <div className="text-sm font-medium">
            {dictionary.repositoryForm.repoInfo.description}
          </div>
          <div className="text-muted-foreground text-sm">
            {repository.description !== null && repository.description !== ''
              ? repository.description
              : '-'}
          </div>
        </div>

        {languages && Object.keys(languages).length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">
              {dictionary.repositoryForm.repoInfo.languages}
            </div>
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(languages).map(([lang, percentage]) => (
                <div key={lang} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>{lang}</span>
                    <span>
                      {typeof percentage === 'number'
                        ? percentage.toFixed(1)
                        : percentage}
                      %
                    </span>
                  </div>
                  <Progress value={Number(percentage)} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="text-muted-foreground h-4 w-4" />
            <span>{repository.stargazers_count || 0} stars</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="text-muted-foreground h-4 w-4" />
            <span>{repository.forks_count || 0} forks</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="text-muted-foreground h-4 w-4" />
            <span>
              {repository.updated_at
                ? `Atualizado há ${formatDays(repository.updated_at)} dias`
                : 'Sem informação de atualização'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatDays(dateString: string): number {
  if (!dateString) return 0

  const updatedDate = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - updatedDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}
