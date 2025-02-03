import { NextResponse } from 'next/server'

export interface Webhook {
  action: string
  api_version: string
  data: Data
  date_created: string
  id: string
  live_mode: boolean
  type: string
  user_id: number
}

export interface Data {
  id: string
}

export const GET = async (req: Request) => {
  console.log('Webhook received GET', req.url)

  const url = new URL(req.url)
  url.pathname = '/dashboard'

  url.search = ''

  return NextResponse.redirect(url.toString())
}
