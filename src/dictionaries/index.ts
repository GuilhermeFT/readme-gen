import { Locales } from '@/types/locales'
import { Dictionary } from './types'

const dictionaries: {
  [key in Locales]: () => Promise<Dictionary>
} = {
  en: () => import('@/dictionaries/en').then((module) => module.default),
  'pt-br': () =>
    import('@/dictionaries/pt-br').then((module) => module.default),
}

export const getDictionary = async (locale: Locales) =>
  dictionaries[locale.toLowerCase() as Locales]()
