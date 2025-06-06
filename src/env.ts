import { z } from 'zod'

const envSchema = z.object({
  AUTH_SECRET: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),

  OPENAI_API_KEY: z.string(),

  GROQ_API_KEY: z.string(),

  // ABACATE_SECRET_KEY: z.string(),
  // ABACATE_API_URL: z.string(),
  // APP_URL: z.string(),

  // FAUNA_SECRET: z.string(),
  // WEBHOOK_SECRET: z.string(),

  // MERCADO_PAGO_PUBLIC_KEY: z.string(),
  // MERCADO_PAGO_ACCESS_TOKEN: z.string(),
  // MERCADO_PAGO_WEBHOOK_SECRET: z.string(),
})

export const ENV = envSchema.parse(process.env)
