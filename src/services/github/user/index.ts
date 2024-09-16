import { getGitHubInstance } from '..'

export const getUserInfo = async () => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const { data } = await octokit.rest.users.getAuthenticated()

  return data
}
