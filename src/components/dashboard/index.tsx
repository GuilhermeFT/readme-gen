import {
  getRepositoryByName,
  getRepositoryLanguages,
} from '@/services/github/repositories'
import { MarkdownEditor } from './markdown-editor'
import { RepositoryForm } from './repository-form'
import { getDictionary } from '@/dictionaries'
import { Locales } from '@/types/locales'

type DashboardProps = {
  repo: string
  lang: Locales
}

export const DashboardWrapper = async ({ lang, repo }: DashboardProps) => {
  const [repositoryInfo, languages] = await Promise.all([
    getRepositoryByName(repo),
    getRepositoryLanguages(repo),
  ])

  const dictionary = await getDictionary(lang)

  return (
    <>
      <RepositoryForm
        lang={lang}
        repositoryInfo={repositoryInfo}
        languages={languages}
        dictionary={dictionary.dashboardPage}
      />
      <MarkdownEditor dictionary={dictionary.dashboardPage} />
    </>
  )
}
