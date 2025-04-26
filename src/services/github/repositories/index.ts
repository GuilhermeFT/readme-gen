'use server'

import { getGitHubInstance } from '@/lib/github'
import { PromiseHandler } from '@/utils/try'

export const getOwner = async () => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const { data, success } = await PromiseHandler(async () =>
    octokit.rest.users.getAuthenticated(),
  )

  if (!success || !data) {
    return null
  }

  return data.data
}

export const listAuthenticatedUserRepositories = async () => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const { data, success } = await PromiseHandler(async () =>
    octokit.rest.repos.listForAuthenticatedUser({
      type: 'all',
    }),
  )

  if (!success) {
    return null
  }

  return data?.data
}

export const getRepositoryLanguages = async (repo: string) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await getOwner()

  if (!owner) {
    return null
  }

  const { data, success } = await PromiseHandler(async () =>
    octokit.rest.repos.listLanguages({
      owner: owner.login,
      repo,
    }),
  )

  if (!success || !data) {
    return null
  }

  const languages = Object.keys(data.data)

  const totalBytes = Object.values(data.data).reduce(
    (acc, value) => acc + value,
    0,
  )

  const languagesData = languages.reduce(
    (acc, language) => {
      const bytes = data.data[language]
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

  const owner = await getOwner()

  if (!owner) {
    return null
  }

  const { data, success } = await PromiseHandler(async () =>
    octokit.rest.repos.get({
      owner: owner.login,
      repo,
    }),
  )

  if (!success || !data) {
    return null
  }

  return data.data
}

export const getRepositoryFolderStructure = async (
  repo: string,
  all?: boolean,
) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await getOwner()

  if (!owner) {
    return null
  }

  const { data, success } = await PromiseHandler(async () =>
    octokit.rest.git.getTree({
      owner: owner.login,
      repo,
      tree_sha: 'HEAD',
      recursive: String(all),
    }),
  )

  if (!success || !data) {
    return null
  }

  return data.data
}

export const getRepositoryFileByPath = async (repo: string, path: string) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  const owner = await getOwner()

  if (!owner) {
    return null
  }

  const { data, success } = await PromiseHandler(async () =>
    octokit.rest.repos.getContent({
      owner: owner.login,
      repo,
      path,
    }),
  )

  if (!success || !data) {
    return null
  }

  if (Array.isArray(data.data)) {
    return data.data.filter((file) => file.type === 'file')[0]
  }

  if (data.data.type === 'file') {
    return data.data
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

  const owner = await getOwner()

  if (!owner) {
    return null
  }

  const { data, success } = await PromiseHandler(async () =>
    octokit.rest.repos.getContent({
      owner: owner.login,
      repo,
      path,
    }),
  )

  if (!success || !data) {
    return null
  }

  const existingFile = data.data

  const sha = Array.isArray(existingFile) ? null : existingFile.sha

  const { data: updatedFile, success: updatedFileSuccess } =
    await PromiseHandler(async () =>
      octokit.rest.repos.createOrUpdateFileContents({
        owner: owner.login,
        repo,
        path,
        message,
        content: Buffer.from(content).toString('base64'),
        sha: sha || undefined,
      }),
    )

  if (!updatedFileSuccess || !updatedFile) {
    return null
  }

  return updatedFile.data
}

export const getRepositoryFileContent = async (repo: string, path: string) => {
  const octokit = await getGitHubInstance()

  if (!octokit) {
    return null
  }

  try {
    const owner = await getOwner()

    if (!owner) {
      return null
    }

    const { data, success } = await PromiseHandler(async () =>
      octokit.rest.repos.getContent({
        owner: owner.login,
        repo,
        path,
      }),
    )

    if (!success || !data) {
      return null
    }

    if (Array.isArray(data.data)) {
      if (data.data[0].type === 'file' && data.data[0].content) {
        return Buffer.from(data.data[0].content, 'base64').toString('utf-8')
      }

      return null
    }

    if (data.data.type === 'file' && data.data.content) {
      return Buffer.from(data.data.content, 'base64').toString('utf-8')
    }

    return null
  } catch (error) {
    return null
  }
}
