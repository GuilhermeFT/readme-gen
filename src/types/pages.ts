import { Locales } from './locales'

export type Pages = {
  params: { lang: Locales }
  searchParams: {
    repo: string
  }
}
