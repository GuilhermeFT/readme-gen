import {
  getRepositoryByName,
  getRepositoryLanguages,
} from '@/services/github/repositories'
import { MarkdownEditor } from './markdown-editor'
import { RepositoryForm } from './repository-form'

type DashboardProps = {
  repo: string
}

export const DashboardWrapper = async ({ repo }: DashboardProps) => {
  const [repositoryInfo, languages] = await Promise.all([
    getRepositoryByName(repo),
    getRepositoryLanguages(repo),
  ])

  console.log(repositoryInfo)

  return (
    <>
      <RepositoryForm repositoryInfo={repositoryInfo} languages={languages} />
      <MarkdownEditor />
    </>
  )
}
