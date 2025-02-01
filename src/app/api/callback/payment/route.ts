import { NextResponse } from 'next/server'

export const POST = (req: Request) => {
  console.log('Payment callback received:', req.body)

  return NextResponse.json({ message: 'Payment callback received' })
}
