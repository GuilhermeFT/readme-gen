'use server'

import { Locales } from '@/types/locales'
import { Repository } from '@/types/repositories'
import { getRepositoryFileByPath } from '../github/repositories'
import { getGroqInstance } from '@/lib/groq'

const getsFilesToUnderstandProject = async (fileList: string[]) => {
  const groq = getGroqInstance()

  const response = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are an expert developer analyzing the files in a GitHub repository to understand the project structure, dependencies, what it does. The repository contains the following files: ${fileList.join(
          ', ',
        )} Analyze the files and return a list of the most important files. Separate the files with a comma and choose. Return the list in the output format: "file1, file2, file3". Don't explain or add any other text. Only the list of files. MAX 1 file.`,
      },
    ],
    model: 'llama3-8b-8192',
  })

  return (
    response.choices[0].message.content
      ?.split(',')
      .map((file) => file.trim()) || []
  )
}

export const generateReadmeWithGroq = async (
  data: Repository,
  lang: Locales,
) => {
  const groq = getGroqInstance()
  const filesToRead = await getsFilesToUnderstandProject(data.files)
  const selectedFiles = await getRepositoryFileByPath(
    data.title,
    filesToRead[0],
  )

  if (selectedFiles && selectedFiles.content) {
    const decodedContent = Buffer.from(selectedFiles.content, 'base64')
      .toString('utf-8')
      .replaceAll('\n', '')
      .replaceAll('\r', '')
      .trim()

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert developer generating a structured README for a GitHub repository based on the provided information. The repository is owned by ${data.owner} and is called ${data.title}. The following description is provided by the user: ${data.description}. The repository uses the following languages: ${data.languages.join(', ')}. The most important file in the repository is ${decodedContent}. Please create a professional and detailed README.md file. Use the following exclusively this format:
          
      ## 🔎 About the project
      Summarize the purpose and features of the project based on the provided description.
  
      ## 🧪 Technologies
      List relevant technologies used in the project, based on the content of the most important file. Only list the technologies used in the project and the ones that are most relevant to the project.
      
      ## 🚀 How to execute
      Provide detailed instructions on how to clone and run the project locally, using the most important file.
      
      Ignore title, and another information that is not related to the README.md file. Translate the README.md file to ${
        lang === 'en' ? 'English' : 'Portuguese'
      }. Don't include the code block in the response.
      `,
        },
      ],
      model: 'llama3-8b-8192',
    })

    return response.choices[0].message.content
  } else {
    console.log('selectedFiles or selectedFiles.content is null or undefined')
  }
}
