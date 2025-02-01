'use server'

import { ENV } from '@/env'
import { abacateApi } from '@/lib/abacate'
import { Product } from '@/types/products'
import { AxiosError } from 'axios'
import { getUserInfo } from '../github/user'

type CreatePaymentData = {
  product: Product
  user?: Awaited<ReturnType<typeof getUserInfo>>
}

export const createPayment = async ({ product, user }: CreatePaymentData) => {
  const priceToCents = product.price * 100

  if (!user?.email) {
    console.error('User email not found')
    return
  }

  try {
    const { data } = await abacateApi.post('/billing/create', {
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [{ ...product, price: priceToCents }],
      returnUrl: `${ENV.APP_URL}/dashboard`,
      completionUrl: `${ENV.APP_URL}/dashboard`,
      customer: {
        email: user.email,
        name: user.name,
      },
    })

    console.log('Payment created:', data)

    return data.url as string
  } catch (e) {
    const error = e as AxiosError

    console.error(error.response?.data)
  }
}
