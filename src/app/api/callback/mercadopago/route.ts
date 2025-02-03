import { mpClient } from '@/lib/mercadopago'
import { updateUserOnDB } from '@/services/faunadb'
import { products } from '@/services/products'
import { Payment } from 'mercadopago'
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

export const POST = async (req: Request) => {
  console.log('Webhook received', req)

  try {
    const body = (await req.json()) as Webhook
    console.log('Webhook body', body)

    if (body.type === 'payment') {
      return handlePayment(body)
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Error processing webhook', error)

    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 400 },
    )
  }
}

const handlePayment = async (webhook: Webhook) => {
  if (webhook.action === 'payment.updated') {
    const paymentId = webhook.data.id
    const payment = new Payment(mpClient)

    const paymentInfo = await payment.get({ id: paymentId })

    const userEmail = paymentInfo.metadata.user
    const productId = paymentInfo.metadata.product

    const buyedProduct = products.find(
      (product) => product.externalId === productId,
    )

    if (!buyedProduct) {
      throw new Error('Product not found')
    }

    await updateUserOnDB({
      email: userEmail,
      credit: buyedProduct?.credit,
    })

    return NextResponse.next()
  }

  return NextResponse.next()
}
