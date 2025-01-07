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
}
