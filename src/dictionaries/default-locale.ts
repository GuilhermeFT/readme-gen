const defaultLocaleDict = {
  header: {
    signInButton: 'Entrar',
    navOptions: {
      features: 'Recursos',
      howItWorks: 'Como Funciona',
      faq: 'FAQ',
    },

    callToActionOne: 'Começar Agora',
    callToActionTwo: 'Conectar GitHub',
  },
  loginPage: {
    title: 'Entrar',
    description: 'Acesse sua conta através do GitHub',
    buttonTitle: 'Entrar com Github',
  },

  landingPage: {
    hero: {
      welcomeTo: 'Bem-vindo ao',
      description:
        'Gere automaticamente arquivos README.md profissionais para seus repositórios GitHub',
      callToActionOne: 'Começar Agora',
      callToActionTwo: 'Conectar GitHub',
      sloganOne: 'Pronto em segundos',
      SloganTwo: '100% compatível com GitHub',

      macWindow: {
        fileTitle: 'README.md - ReadmeGen',

        projectName: 'Projeto Incrível',
        projectDescription:
          'Uma descrição incrível do seu projeto gerada automaticamente pelo ReadmeGen.',

        installation: 'Instalação',
        installationDescription: 'npm install projeto-incrivel',

        use: 'Uso',
        useDescription: 'Instruções detalhadas de como usar o',
      },
    },

    whySection: {
      preTitle: 'Por que ReadmeGen?',
      title: 'Crie READMEs impressionantes em minutos',
      description:
        'Nossa ferramenta impulsionada por IA transforma a maneira como você documenta seus projetos',

      cards: [
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

      callToAction: 'Experimentar Agora',
    },

    howItWorks: {
      preTitle: 'Como Funciona',
      title: 'Três passos simples para um README perfeito',
      callToAction: 'Experimentar Agora',
      steps: [
        {
          title: 'Conecte seu GitHub',
          description:
            'Autorize o ReadmeGen a acessar seus repositórios para análise.',
        },
        {
          title: 'Selecione o Repositório',
          description:
            'Escolha o projeto para o qual deseja gerar um README profissional.',
        },
        {
          title: 'Gere e Personalize',
          description:
            'Nossa IA cria um README completo que você pode editar e publicar.',
        },
      ],
    },

    testimonialSection: {
      preTitle: 'Depoimentos',
      title: 'O que nossos usuários dizem',
      description:
        'Desenvolvedores de todo o mundo estão economizando tempo e melhorando seus projetos com o ReadmeGen.',

      testimonials: [
        {
          testimonial:
            '"O ReadmeGen transformou completamente meu fluxo de trabalho. Agora tenho READMEs profissionais em todos os meus projetos sem esforço adicional."',
          user: 'Maria Silva, Desenvolvedora Full Stack',
        },
        {
          testimonial:
            '"Meus projetos de código aberto agora têm documentação de qualidade, o que aumentou significativamente as contribuições da comunidade."',
          user: 'João Pereira, Mantenedor OSS',
        },
      ],
    },

    faqSection: {
      preTitle: 'FAQ',
      title: 'Perguntas Frequentes',

      questions: [
        {
          question: 'O ReadmeGen é gratuito?',
          answer:
            'Sim, oferecemos um plano gratuito que permite gerar READMEs para repositórios públicos. Também temos planos premium com recursos adicionais.',
        },
        {
          question: 'Posso personalizar os READMEs gerados?',
          answer:
            'Absolutamente! Após a geração, você pode editar qualquer parte do README antes de publicá-lo no seu repositório.',
        },
        {
          question: 'O ReadmeGen tem acesso ao meu código?',
          answer:
            'Apenas analisamos metadados do repositório e estrutura de arquivos para gerar o README. Não armazenamos seu código-fonte.',
        },
      ],
    },

    callToActionSection: {
      title: 'Pronto para melhorar seus READMEs?',
      description:
        'Comece a gerar READMEs profissionais em minutos e destaque seus projetos.',
      buttonOne: 'Começar Agora',
      buttonTwo: 'Ver no GitHub',
    },
  },

  footer: {
    copyright: 'Todos os direitos reservados.',
    linkLabels: {
      terms: 'Termos',
      privacy: 'Privacidade',
      contact: 'Contato',
    },
  },

  dashboardPage: {
    header: {
      credits: 'Créditos',
      help: 'Ajuda',
      dropdownItems: {
        profile: 'Perfil',
        settings: 'Configurações',
        logout: 'Sair',
      },
    },

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
      saveOnGithub: 'Salvar no GitHub',

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
      userNotFound: 'Usuário não encontrado',
    },
  },
}

export default defaultLocaleDict
