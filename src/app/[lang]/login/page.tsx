import { Button } from '@/components/ui/button'

import { Github } from '@/components/icons/github'
import { getDictionary } from '@/dictionaries'
import { Pages } from '@/types/pages'
import { auth, signIn } from '@/auth'
import { Logo } from '@/components/logo'
import { redirect } from 'next/navigation'

export default async function Login(props: Pages) {
  const params = await props.params;

  const {
    lang
  } = params;

  const dictionary = await getDictionary(lang)

  const session = await auth()

  if (session) {
    redirect(`/${lang}/dashboard`)
  }

  return (
    <div className="h-dvh w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex h-full items-center justify-center bg-zinc-950 py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <header className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-white">
              {dictionary.loginPage.title}
            </h1>
            <p className="text-pretty text-muted-foreground">
              {dictionary.loginPage.description}
            </p>
          </header>
          <div className="grid gap-4">
            <form
              action={async () => {
                'use server'
                await signIn('github')
              }}
            >
              <Button
                variant="default"
                className="group flex w-full items-center justify-center space-x-2 py-6 text-white"
              >
                <Github className="h-5 w-5 fill-white transition-colors" />
                <span>{dictionary.loginPage.buttonTitle}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-zinc-100 lg:flex lg:items-center lg:justify-center">
        <div className="absolute inset-0 left-0 top-0 z-10" />
        <Logo />
      </div>
    </div>
  )
}
