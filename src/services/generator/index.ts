'use server'

import { Repository } from '@/types/repositories'
import { generateReadmeWithGpt } from '../gpt'
import { Locales } from '@/types/locales'
import { ENV } from '@/env'

type GenerateReadmeOptions = {
  lang: Locales
  hasThumb?: boolean
  repository: Repository
}

const getLicenseMD = (lang: Locales) => {
  if (lang === 'en') {
    return `## License 📄
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.`
  }

  return `## Licença 📄
Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.`
}

const getContributingMD = (lang: Locales, url?: string) => {
  if (lang === 'en') {
    return `## Contributing 🤝
Contributions to this project are welcome! Please follow these steps:
${url ? `1. Clone the repository (\`git clone ${url}\`);` : '1. Fork the repository;'}
2. Create a new branch (\`git checkout -b feature/branch\`);
3. Make your changes and commit them (\`git commit -m 'feat: add new feature'\`);
4. Push to the branch (\`git push origin feature/branch\`);
5. Open a Pull Request.`
  }

  return `## Contribuindo 🤝
Contribuições para este projeto são bem-vindas! Por favor, siga os passos abaixo:
${url ? `1. Clone o repositório (\`git clone ${url}\`);` : '1. Faça um fork do repositório;'}
2. Crie uma nova branch (\`git checkout -b feature/branch\`);
3. Faça suas alterações e as commit (\`git commit -m 'feat: add new feature'\`);
4. Envie para a branch (\`git push origin feature/branch\`);
5. Abra um Pull Request.`
}

export const generateReadme = async (options: GenerateReadmeOptions) => {
  if (!ENV.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is missing. Code: #1')
  }

  const result = await generateReadmeWithGpt(options.repository, options.lang)

  return `<h1 align="center">${options.repository.title}</h1>

${result}

${getContributingMD(options.lang, options.repository.url)}

${getLicenseMD(options.lang)}`
}
