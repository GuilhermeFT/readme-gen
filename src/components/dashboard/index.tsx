import {
  getRepositoryByName,
  getRepositoryFileContent,
  getRepositoryFolderStructure,
  getRepositoryLanguages,
} from '@/services/github/repositories'
import { MarkdownEditor } from './markdown-editor'
import { RepositoryForm } from './repository-form'
import { getDictionary } from '@/lib/dictionary'
import { Locales } from '@/types/locales'
import { getUserInfo } from '@/services/github/user'
import { getUserOnDB } from '@/services/faunadb'
import { RepositoryDetails } from './repository-details'
import { RepositoryDetailsSkeleton } from './repository-details/skeleton'
import { RepositoryFormSkeleton } from './repository-form/skeleton'
import { MarkdownEditorSkeleton } from './markdown-editor/skeleton'
import { Suspense } from 'react'

type DashboardProps = {
  repo: string
  lang: Locales
}

const extFilesToIgnore = [
  '.md',
  '.yml',
  '.yaml',
  '.lock',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.webp',
  '.bat',
  '.sh',
  '.jar',
]

export const DashboardWrapper = async ({ lang, repo }: DashboardProps) => {
  const [repositoryInfo, languages, repoTree, user, gitReadme] =
    await Promise.all([
      getRepositoryByName(repo),
      getRepositoryLanguages(repo),
      getRepositoryFolderStructure(repo),
      getUserInfo(),
      getRepositoryFileContent(repo, 'README.md'),
    ])

  const repositoryFiles: string[] =
    repoTree?.tree
      .map((file) => file.path)
      .filter(
        (file): file is string =>
          !!file &&
          file.includes('.') &&
          !extFilesToIgnore.some((ext) => file.endsWith(ext)),
      ) || []

  const dictionary = await getDictionary(lang)
  const userDb = await getUserOnDB(user?.email ?? undefined)

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="space-y-6">
        <Suspense fallback={<RepositoryDetailsSkeleton />}>
          <RepositoryDetails
            repository={repositoryInfo}
            languages={languages}
            dictionary={dictionary.dashboardPage}
          />
        </Suspense>

        <Suspense fallback={<RepositoryFormSkeleton />}>
          <RepositoryForm
            lang={lang}
            languages={languages}
            repositoryInfo={repositoryInfo}
            repositoryFiles={repositoryFiles}
            dictionary={dictionary.dashboardPage}
            userDb={userDb || undefined}
            user={user}
          />
        </Suspense>
      </div>

      <Suspense fallback={<MarkdownEditorSkeleton />}>
        <MarkdownEditor
          dictionary={dictionary.dashboardPage}
          repositoryInfo={repositoryInfo}
          user={user}
          gitReadme={gitReadme}
        />
      </Suspense>
    </div>
  )
}
