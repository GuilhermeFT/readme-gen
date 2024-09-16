import { auth } from '@/auth'
import { Octokit } from 'octokit'

export const getGitHubInstance = async () => {
  const session = await auth()

  if (!session) {
    return null
  }

  const octokit = new Octokit({
    auth: session.accessToken,
  })

  return octokit
}
