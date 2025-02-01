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

  dashboardPage: {
    desktopOnly: 'Use no desktop para uma melhor experiência',
    title: 'Painel de Controle',
    yourRepositories: 'Seus Repositórios',
    selectRepository: 'Selecione um repositório para começar',

    logout: 'Sair',
    creditLabel: 'Créditos',

    repositoryForm: {
      modalBuy: {
        title: 'Comprar Créditos',
        description:
          'Você não tem créditos suficientes para gerar READMEs. Gostaria de comprar mais?',
        buttonBuy: 'Comprar Créditos',
      },

      title: 'Informações do Repositório',
      repositoryDescriptionLabel: 'Descreva seu repositório',
      repositoryDescriptionPlaceholder:
        'Ex. Este repositório é uma aplicação web que permite ao usuário criar e compartilhar memes engraçados.',

      repositoryThumbLabel: 'Adicionar uma imagem de capa?',
      repositoryThumbUrlLabel: 'URL da imagem de capa',
      repositoryThumbUrlPlaceholder: 'Ex. https://example.com/image.jpg',
      submitButton: 'Gerar README',
      submittingButton: 'Gerando README...',

      repoInfo: {
        name: 'Nome do Repositório:',
        description: 'Descrição do Repositório:',
        languages: 'Linguagens',
      },
    },

    markdownEditor: {
      buttonCode: 'Código',
      buttonPreview: 'Preview',
      downloadButton: 'Baixar README',
      copyButton: 'Copiar Markdown',
      downloadSuccess: 'README baixado com sucesso!',
      copySuccess: 'Markdown copiado com sucesso!',
    },

    messageErrors: {
      excerptRequired: 'A descrição do repositório é obrigatória',
      thumbRequired: 'A URL da imagem de capa é obrigatória',
      generic: 'Algo deu errado. Por favor, tente novamente.',
      errorCodeOne: 'Estamos trabalhando nisso, tente novamente mais tarde.',
      noCredit: 'Você não tem créditos suficientes para gerar READMEs',
    },
  },
}

export default ptBR
