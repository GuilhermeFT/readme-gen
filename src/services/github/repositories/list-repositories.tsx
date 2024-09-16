import { getGitHubInstance } from '..'

export const listAuthenticatedUserRepositories = async () => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const { data } = await octokit.rest.repos.listForAuthenticatedUser()

  return data
}
