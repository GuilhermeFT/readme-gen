import { auth } from '@/auth'
import { Octokit } from 'octokit'

export const getUser = async () => {
  const session = await auth()

  if (!session) {
    return null
  }

  const octokit = new Octokit({
    auth: session.accessToken,
  })

  const {
    data: {},
  } = await octokit.rest.users.getAuthenticated()
}
