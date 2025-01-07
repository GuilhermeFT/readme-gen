import { Dictionary } from './types'

const en: Dictionary = {
  loginPage: {
    title: 'Login',
    description: 'Access your account through GitHub',
    buttonTitle: 'Login with GitHub',
  },

  landingPage: {
    title: 'Welcome to',
    description:
      'Automatically generate professional README.md files for your GitHub repositories',
    buttonTitle: 'Get Started',
    copyright: 'All rights reserved',

    featuresTitle: 'Why ReadmeGen?',
    features: [
      {
        title: 'Save Time',
        description:
          'Let our tool generate your README files so you can focus on writing code.',
      },
      {
        title: 'Professional Results',
        description:
          'All generated READMEs follow best practices and look great.',
      },
      {
        title: 'Easy to Use',
        description:
          'Just connect your GitHub repository and let the magic happen.',
      },
    ],
  },

  dashboardPage: {
    desktopOnly: 'Use on desktop for a better experience',
    title: 'Dashboard',
    yourRepositories: 'Your Repositories',
    selectRepository: 'Select a repository to get started',

    repositoryForm: {
      title: 'Repository Information',
      repositoryDescriptionLabel: 'Describe your repository',
      repositoryDescriptionPlaceholder:
        'Ex. This repository is a web application that allows users to create and share funny memes.',

      repositoryThumbLabel: 'Add a cover image?',
      repositoryThumbUrlLabel: 'Cover image URL',
      repositoryThumbUrlPlaceholder: 'Ex. https://example.com/image.jpg',
      submitButton: 'Generate README',
      submittingButton: 'Generating README...',

      repoInfo: {
        name: 'Repository Name:',
        description: 'Repository Description:',
        languages: 'Languages',
      },
    },

    markdownEditor: {
      buttonCode: 'Code',
      buttonPreview: 'Preview',
      downloadButton: 'Download README',
      copyButton: 'Copy Markdown',
      downloadSuccess: 'README downloaded successfully!',
      copySuccess: 'Markdown copied successfully!',
    },

    messageErrors: {
      excerptRequired: 'Repository description is required',
      thumbRequired: 'Cover image URL is required',
      generic: 'Something went wrong. Please try again.',
      errorCodeOne: 'We are working on it, please try again later.',
    },
  },
}

export default en
