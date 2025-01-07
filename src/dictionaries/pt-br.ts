import { Dictionary } from './types'

const ptBR: Dictionary = {
  loginPage: {
    title: 'Entrar',
    description: 'Acesse sua conta através do GitHub',
    buttonTitle: 'Entrar com Github',
  },

  landingPage: {
    title: 'Bem-vindo ao',
    description:
      'Gere automaticamente arquivos README.md profissionais para seus repositórios GitHub',
    buttonTitle: 'Começar',
    copyright: 'Todos os direitos reservados',

    featuresTitle: 'Por que ReadmeGen?',
    features: [
      {
        title: 'Economize Tempo',
        description:
          'Deixe nossa ferramenta gerar seus arquivos README, para que você possa se concentrar em escrever código.',
      },
      {
        title: 'Resultados Profissionais',
        description:
          'Todos os READMEs gerados seguem as melhores práticas e têm ótima aparência.',
      },
      {
        title: 'Fácil de Usar',
        description:
          'Basta conectar seu repositório GitHub e deixar a mágica acontecer.',
      },
    ],
  },
}

export default ptBR
