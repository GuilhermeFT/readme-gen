import {
  getRepositoryByName,
  getRepositoryFileContent,
  getRepositoryFolderStructure,
  getRepositoryLanguages,
} from '@/services/github/repositories'
import { MarkdownEditor } from './markdown-editor'
import { RepositoryForm } from './repository-form'
import { getDictionary } from '@/dictionaries'
import { Locales } from '@/types/locales'
import { getUserInfo } from '@/services/github/user'
import { getUserOnDB } from '@/services/faunadb'

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

  console.log(gitReadme)

  return (
    <>
      <RepositoryForm
        lang={lang}
        languages={languages}
        repositoryInfo={repositoryInfo}
        repositoryFiles={repositoryFiles}
        dictionary={dictionary.dashboardPage}
        userDb={userDb || undefined}
        user={user}
      />
      <MarkdownEditor
        dictionary={dictionary.dashboardPage}
        repositoryInfo={repositoryInfo}
        user={user}
        gitReadme={gitReadme}
      />
    </>
  )
}
