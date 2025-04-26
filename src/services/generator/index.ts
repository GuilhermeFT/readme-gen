'use server'

import { Repository } from '@/types/repositories'
import { Locales } from '@/types/locales'
import { generateReadmeWithGroq } from '../groq'
import { getLicenseForReadme } from '../licenses'
import { licenses } from '@/utils/licenses'

type GenerateReadmeOptions = {
  lang: Locales
  repository: Repository
  license?: (typeof licenses)[number]['value']
  includeContribution?: boolean
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
  const iaResult = await generateReadmeWithGroq(
    options.repository,
    options.lang,
  )

  let readmeContent = `<h1 align="center">${options.repository.title}</h1>\n\n${iaResult || ''}`

  if (options.includeContribution) {
    readmeContent += `\n\n${getContributingMD(options.lang, options.repository.url)}`
  }

  if (options.license) {
    readmeContent += `\n\n${await getLicenseForReadme(options.license, options.lang)}`
  }

  return readmeContent
}
