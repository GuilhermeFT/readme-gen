import OpenAI from 'openai'

export const getOpenAiInstance = () => {
  const openAiInstance = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  return openAiInstance
}
