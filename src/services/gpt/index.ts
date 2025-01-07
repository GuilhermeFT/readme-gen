'use server'

import { getOpenAiInstance } from '@/lib/openai'
import { Locales } from '@/types/locales'
import { Repository } from '@/types/repositories'

/* const getsFilesToUnderstandProject = async (fileList: string[]) => {
  const response = await openai.chat.completions.create({
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
        )}. Analyze the files and return a list of the most important files to send to another prompt to generate a README.md file. Separate the files with a comma and choose on MAX 1 file.`,
      },
    ],
    model: 'gpt-4o-mini',
  })

  return (
    response.choices[0].message.content
      ?.split(',')
      .map((file) => file.trim()) || []
  )
} */

export const generateReadmeWithGpt = async (
  data: Repository,
  lang: Locales,
) => {
  const openai = getOpenAiInstance()
  //const filesToRead = getsFilesToUnderstandProject(data.files)

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are an expert developer generating a structured README for a GitHub repository based on the provided information.',
      },
      {
        role: 'user',
        content: `The repository is owned by ${data.owner} and is called ${data.title}. The following description is provided: ${data.description}. The repository uses the following languages: ${data.languages.join(', ')}. Please create a professional and detailed README.md file. Use the following exclusively this format:
  
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
    max_tokens: 1100,
  })

  return response.choices[0].message.content
}
