'use server'

import { getOpenAiInstance } from '@/lib/openai'
import { Locales } from '@/types/locales'
import { Repository } from '@/types/repositories'
import { getRepositoryFileByPath } from '../github/repositories'

const getsFilesToUnderstandProject = async (fileList: string[]) => {
  const openAi = getOpenAiInstance()

  const response = await openAi.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are an expert developer analyzing the files in a GitHub repository to understand the project structure, dependencies, what it does',
      },
      {
        role: 'user',
        content: `The repository contains the following files: ${fileList.join(
          ', ',
        )}. Analyze the files and return a list of the most important files to send to another prompt to generate a README.md file. Separate the files with a comma and choose on MAX 1 file. Return the list in the format: file1, file2, file3.`,
      },
    ],
    model: 'gpt-4o-mini',
  })

  console.log('getsFilesToUnderstandProject', response)

  return (
    response.choices[0].message.content
      ?.split(',')
      .map((file) => file.trim()) || []
  )
}

export const generateReadmeWithGpt = async (
  data: Repository,
  lang: Locales,
) => {
  const openAi = getOpenAiInstance()
  const filesToRead = await getsFilesToUnderstandProject(data.files)
  const selectedFiles = await getRepositoryFileByPath(
    data.title,
    filesToRead[0],
  )

  console.log('selectedFiles', selectedFiles)

  if (selectedFiles && selectedFiles.content) {
    const decodedContent = Buffer.from(selectedFiles.content, 'base64')
      .toString('utf-8')
      .replaceAll('\n', '')
      .replaceAll('\r', '')
      .trim()

    console.log('filesToRead', decodedContent)

    const response = await openAi.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are an expert developer generating a structured README for a GitHub repository based on the provided information.',
        },
        {
          role: 'user',
          content: `The repository is owned by ${data.owner} and is called ${data.title}. The following description is provided: ${data.description}. The repository uses the following languages: ${data.languages.join(', ')}. The most important file in the repository is ${decodedContent}. Please create a professional and detailed README.md file. Use the following exclusively this format:
  
      ## 🔎 About the project
      Summarize the purpose and features of the project based on the provided description.
  
      ## 🧪 Technologies
      List relevant technologies used in the project, based on dependencies from package.json.
      
      ## 🚀 How to execute
      Provide detailed instructions on how to clone and run the project locally, using commands from the package.json.
      
      Ignore title, and another information that is not related to the README.md file. Translate the README.md file to ${
        lang === 'en' ? 'English' : 'Portuguese'
      }. Don't include the code block in the response.
      `,
        },
      ],
      model: 'gpt-4o-mini',
    })

    console.log('generateReadmeWithGpt', response)

    return response.choices[0].message.content
  } else {
    console.log('selectedFiles or selectedFiles.content is null or undefined')
  }
}
