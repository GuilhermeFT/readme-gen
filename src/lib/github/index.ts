import { auth } from '@/auth'
import { Octokit } from 'octokit'

export const getGitHubInstance = async (customFetch: typeof fetch = fetch) => {
  const session = await auth()

  if (!session) {
    return null
  }

  const octokit = new Octokit({
    auth: session.accessToken,
    request: {
      fetch: customFetch,
    },
  })

  return octokit
}
