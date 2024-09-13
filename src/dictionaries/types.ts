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

    features: {
      title: string
      description: string
    }[]

    copyright: string
  }
}
