'use server'

import { mpClient } from '@/lib/mercadopago'
import { Product } from '@/types/products'
import { Preference } from 'mercadopago'
import { getUserInfo } from '../github/user'
import { headers } from 'next/headers'

type CreatePreferenceProps = {
  product: Product
  user?: Awaited<ReturnType<typeof getUserInfo>>
}

export const createPreference = async ({
  product,
  user,
}: CreatePreferenceProps) => {
  const preference = new Preference(mpClient)
  if (!user?.email || !user?.name) {
    return null
  }

  const createdPreference = await preference.create({
    body: {
      external_reference: `${product.externalId}#@#${user.email}`,
      items: [
        {
          id: product.externalId,
          quantity: 1,
          title: product.name,
          unit_price: product.price,
          description: product.description,
        },
      ],
      metadata: {
        user: user.email,
        product: product.externalId,
      },
      payer: {
        email: user.email,
        name: user.name,
      },
      auto_return: 'approved',
      back_urls: {
        success: `${(await headers()).get('origin')}/api/callback/mercadopago/approved`,
        failure: `${(await headers()).get('origin')}/api/callback/mercadopago/failure`,
        pending: `${(await headers()).get('origin')}/api/callback/mercadopago/pending`,
      },
      notification_url: `${(await headers()).get('origin')}/api/callback/mercadopago`,
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'bolbradesco',
          },
          {
            id: 'pec',
          },
        ],
        excluded_payment_types: [
          {
            id: 'credit_card',
          },
          {
            id: 'debit_card',
          },
        ],

        default_payment_method_id: 'pix',
      },
    },
  })

  if (!createdPreference.id) {
    return null
  }

  return createdPreference.init_point
}
