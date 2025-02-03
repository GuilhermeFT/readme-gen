import { ENV } from '@/env'
import { MercadoPagoConfig } from 'mercadopago'

export const mpClient = new MercadoPagoConfig({
  accessToken: ENV.MERCADO_PAGO_ACCESS_TOKEN,
})
