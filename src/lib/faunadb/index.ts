import { ENV } from '@/env'
import { Client } from 'fauna'

export const faunaClient = new Client({
  secret: ENV.FAUNA_SECRET,
})
