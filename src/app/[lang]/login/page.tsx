import { Button } from '@/components/ui/button'

import { Github } from '@/components/icons/github'
import { getDictionary } from '@/dictionaries'
import { Pages } from '@/types/pages'

export default async function Login({ params: { lang } }: Pages) {
  const dictionary = await getDictionary(lang)

  return (
    <div className="h-dvh w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex h-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <header className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{dictionary.loginPage.title}</h1>
            <p className="text-pretty text-muted-foreground">
              {dictionary.loginPage.description}
            </p>
          </header>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="group flex w-full items-center justify-center space-x-2"
            >
              <Github className="h-5 w-5 fill-white transition-colors group-hover:fill-black" />
              <span>{dictionary.loginPage.buttonTitle}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <div className="absolute inset-0 left-0 top-0 z-10" />
        <h1 className="pointer-events-none text-center text-5xl font-bold text-muted-foreground">
          <span className="text-primary">Readme</span>
          <span className="text-muted-foreground">Gen</span>
        </h1>
      </div>
    </div>
  )
}
