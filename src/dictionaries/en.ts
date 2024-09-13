import { Dictionary } from './types'

const en: Dictionary = {
  loginPage: {
    title: 'Login',
    description: 'Access your account through GitHub',
    buttonTitle: 'Login with Github',
  },

  landingPage: {
    title: 'Welcome to',
    description:
      'Automatically generate professional README.md files for your GitHub repositories',
    buttonTitle: 'Get Started',
    copyright: 'All rights reserved',
    features: [
      {
        title: 'Save Time',
        description:
          'Let our tool generate your README files, so you can focus on writing code.',
      },
      {
        title: 'Professional Results',
        description:
          'All generated READMEs follow best practices and look great.',
      },
      {
        title: 'Easy to Use',
        description:
          'Simply connect your GitHub repo and let the magic happen.',
      },
    ],
  },
}

export default en
