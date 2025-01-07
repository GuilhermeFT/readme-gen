import { Repository } from '@/types/repositories'
import { generateReadmeWithGpt } from '../gpt'

type GenerateReadmeOptions = {
  hasThumb?: boolean
  repository: Repository
}

export const generateReadme = async (options: GenerateReadmeOptions) => {
  const result = await generateReadmeWithGpt(options.repository)

  return `<h1 align="center">${options.repository.title}</h1>

${result}

## 🤝 Contributing
Contributions to this project are welcome! Please follow these steps:
${options.repository.url ? `1. Clone the repository (\`git clone ${options.repository.url}\`);` : '1. Fork the repository;'}
2. Create a new branch (\`git checkout -b feature/branch\`);
3. Make your changes and commit them (\`git commit -m 'feat: add new feature'\`);
4. Push to the branch (\`git push origin feature/branch\`);
5. Open a Pull Request.

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
`
}
