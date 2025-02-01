import { ENV } from '@/env'
import OpenAI from 'openai'

export const getOpenAiInstance = () => {
  const openAiInstance = new OpenAI({
    apiKey: ENV.OPENAI_API_KEY,
  })

  return openAiInstance
}
