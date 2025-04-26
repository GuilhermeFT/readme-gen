import { ENV } from '@/env'
import Groq from 'groq-sdk'

export const getGroqInstance = () => {
  const groqInstance = new Groq({
    apiKey: ENV.GROQ_API_KEY,
  })

  return groqInstance
}
