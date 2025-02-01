import { ENV } from '@/env'
import { updateUserOnDB } from '@/services/faunadb'
import { products } from '@/services/products'
import { Product } from '@/types/products'
import { NextResponse } from 'next/server'

export interface WebhookResponse {
  data: Data
  devMode: boolean
  event: string
}

interface Data {
  billing: Billing
  payment: Payment
}

interface Billing {
  amount: number
  couponsUsed: unknown[]
  customer: Customer
  frequency: string
  id: string
  kind: unknown[]
  paidAmount: number
  products: Product[]
  status: string
}

interface Customer {
  name: string
  cellphone: string
  email: string
  taxId: string
}

interface Payment {
  amount: number
  fee: number
  method: string
}

export const POST = async (req: Request) => {
  const url = new URL(req.url)

  if (url.searchParams.get('webhookSecret') !== ENV.WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = (await req.json()) as WebhookResponse

  console.log('Webhook received:', body)

  const buyedProduct = products.find(
    (product) =>
      product.externalId === body.data.billing.products.at(0)?.externalId,
  )

  if (!buyedProduct) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 })
  }
  console.log(
    'User credit updating',
    body.data.billing.customer.email,
    buyedProduct.credit,
  )

  await updateUserOnDB({
    email: body.data.billing.customer.email,
    credit: buyedProduct.credit,
  })

  console.log('User credit updated')

  return NextResponse.json({ message: 'Payment callback received' })
}
