import { getGitHubInstance } from '../../../lib/github'

export const listAuthenticatedUserRepositories = async () => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const { data } = await octokit.rest.repos.listForAuthenticatedUser({
    type: 'all',
  })

  return data
}

export const getRepositoryLanguages = async (repo: string) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await octokit.rest.users.getAuthenticated()

  const { data } = await octokit.rest.repos.listLanguages({
    owner: owner.data.login,
    repo,
  })

  const languages = Object.keys(data)

  const totalBytes = Object.values(data).reduce((acc, value) => acc + value, 0)

  const languagesData = languages.reduce(
    (acc, language) => {
      const bytes = data[language]
      const percentage = (bytes / totalBytes) * 100

      if (percentage < 1) {
        acc['Other'] = (acc['Other'] || 0) + percentage

        return acc
      }

      acc[language] = percentage
      return acc
    },
    {} as { [key: string]: number },
  )

  return languagesData
}

export const getRepositoryByName = async (repo: string) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await octokit.rest.users.getAuthenticated()

  const { data } = await octokit.rest.repos.get({
    owner: owner.data.login,
    repo,
  })

  return data
}

export const getRepositoryFolderStructure = async (
  repo: string,
  all?: boolean,
) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await octokit.rest.users.getAuthenticated()

  const { data } = await octokit.rest.git.getTree({
    owner: owner.data.login,
    repo,
    tree_sha: 'HEAD',
    recursive: String(all),
  })

  return data
}
