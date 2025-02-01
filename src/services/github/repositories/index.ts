'use server'

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

export const getRepositoryFileByPath = async (repo: string, path: string) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await octokit.rest.users.getAuthenticated()

  const { data } = await octokit.rest.repos.getContent({
    owner: owner.data.login,
    repo,
    path,
  })

  if (Array.isArray(data)) {
    return data.filter((file) => file.type === 'file')[0]
  }

  if (data.type === 'file') {
    return data
  }

  return null
}

export const saveRepositoryFile = async (
  repo: string,
  path: string,
  content: string,
  message: string,
) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await octokit.rest.users.getAuthenticated()

  const { data: existingFile } = await octokit.rest.repos.getContent({
    owner: owner.data.login,
    repo,
    path,
  })

  const sha = Array.isArray(existingFile) ? null : existingFile.sha

  const { data } = await octokit.rest.repos.createOrUpdateFileContents({
    owner: owner.data.login,
    repo,
    path,
    message,
    content: Buffer.from(content).toString('base64'),
    sha: sha || undefined,
  })

  return data
}

export const getRepositoryFileContent = async (repo: string, path: string) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  try {
    const owner = await octokit.rest.users.getAuthenticated()

    const { data } = await octokit.rest.repos.getContent({
      owner: owner.data.login,
      repo,
      path,
    })

    if (Array.isArray(data)) {
      if (data[0].type === 'file' && data[0].content) {
        return Buffer.from(data[0].content, 'base64').toString('utf-8')
      }

      return null
    }

    if (data.type === 'file' && data.content) {
      return Buffer.from(data.content, 'base64').toString('utf-8')
    }

    return null
  } catch (error) {
    return null
  }
}
