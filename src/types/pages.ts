import { Locales } from './locales'

export type Pages = {
  params: Promise<{ lang: Locales }>
  searchParams: Promise<{
    repo: string
  }>
}
