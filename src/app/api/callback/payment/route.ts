import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const body = await req.json()
  console.log('Payment callback received:', body)

  return NextResponse.json({ message: 'Payment callback received' })
}
