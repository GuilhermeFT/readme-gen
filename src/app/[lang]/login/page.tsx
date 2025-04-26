import { Button } from '@/components/ui/button'

import { Github } from '@/components/icons/github'
import { getDictionary } from '@/lib/dictionary'
import { Pages } from '@/types/pages'
import { auth, signIn } from '@/auth'
import { Logo } from '@/components/logo'
import { redirect } from 'next/navigation'

export default async function Login(props: Pages) {
  const params = await props.params

  const { lang } = params

  const dictionary = await getDictionary(lang)

  const session = await auth()

  if (session) {
    redirect(`/${lang}/dashboard`)
  }

  return (
    <div className="h-dvh w-full">
      <div className="bg-secondary flex h-full items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <header className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{dictionary.loginPage.title}</h1>
            <Logo className="mb-4 justify-center text-3xl" />
            <p className="text-muted-foreground text-pretty">
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
              <Button className="group flex w-full items-center justify-center space-x-2 bg-black py-6 text-white">
                <Github className="h-5 w-5 fill-white transition-colors" />
                <span>{dictionary.loginPage.buttonTitle}</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
