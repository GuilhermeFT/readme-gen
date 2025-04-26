import { Locales } from '@/types/locales'
import { Dictionary } from '@/types/dictionary'

const dictionaries: {
  [key in Locales]: () => Promise<Dictionary>
} = {
  en: () => import('@/dictionaries/en').then((module) => module.default),
  'pt-BR': () =>
    import('@/dictionaries/default-locale').then((module) => module.default),
}

export const getDictionary = async (locale: Locales) =>
  dictionaries[locale as Locales]()
