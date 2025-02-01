export type Dictionary = {
  loginPage: {
    title: string
    description: string
    buttonTitle: string
  }

  landingPage: {
    title: string
    description: string
    buttonTitle: string

    featuresTitle: string
    features: {
      title: string
      description: string
    }[]

    copyright: string
  }

  dashboardPage: {
    desktopOnly: string

    title: string

    yourRepositories: string
    selectRepository: string

    logout: string
    creditLabel: string

    repositoryForm: {
      title: string

      modalBuy: {
        title: string
        description: string
        buttonBuy: string
      }

      repoInfo: {
        name: string
        description: string
        languages: string
      }

      repositoryDescriptionLabel: string
      repositoryDescriptionPlaceholder: string

      repositoryThumbLabel: string
      repositoryThumbUrlLabel: string
      repositoryThumbUrlPlaceholder: string

      submitButton: string
      submittingButton: string
    }

    markdownEditor: {
      buttonPreview: string
      buttonCode: string

      downloadButton: string
      copyButton: string

      downloadSuccess: string
      copySuccess: string
    }

    messageErrors: {
      excerptRequired: string
      thumbRequired: string
      generic: string
      errorCodeOne: string
      noCredit: string
    }
  }
}
