'use client'

import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  getRepositoryByName,
  getRepositoryLanguages,
} from '@/services/github/repositories'

import { useState } from 'react'

import { toast } from 'sonner'
import { useMarkdown } from '@/stores/markdown'
import { generateReadme } from '@/services/generator'
import { Locales } from '@/types/locales'
import { getUserOnDB, updateUserOnDB } from '@/services/faunadb'
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from '@/components/ui/dialog'
import { products } from '@/services/products'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUserInfo } from '@/services/github/user'
import { useRouter } from 'next/navigation'
import { createPreference } from '@/services/mercadopago'
import { Dictionary } from '@/types/dictionary'

type RepositoryFormProps = {
  repositoryInfo: Awaited<ReturnType<typeof getRepositoryByName>>
  languages: Awaited<ReturnType<typeof getRepositoryLanguages>>
  repositoryFiles: string[]
  dictionary: Dictionary['dashboardPage']
  lang: Locales
  userDb?: Awaited<ReturnType<typeof getUserOnDB>>
  user?: Awaited<ReturnType<typeof getUserInfo>>
}

export const RepositoryForm = ({
  dictionary,
  languages,
  repositoryInfo,
  repositoryFiles,
  lang,
  userDb,
  user,
}: RepositoryFormProps) => {
  const { updateMarkdown } = useMarkdown()

  const router = useRouter()

  const [pending, setPending] = useState(false)
  const [openBuyModal, setOpenBuyModal] = useState(false)

  /* const [hasThumb, setHasThumb] = useState(false) */

  const schema = z.object({
    repositoryExcerpt: z
      .string()
      .nonempty(dictionary.messageErrors.excerptRequired),
    /* repositoryThumbUrl: hasThumb
      ? z
          .string({
            message: dictionary.messageErrors.thumbRequired,
          })
          .url(dictionary.messageErrors.thumbRequired)
      : z.string().optional().nullable(), */
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setPending(true)

    if (!user?.email) {
      toast.error(dictionary.messageErrors.userNotFound)
      setPending(false)
      return
    }

    if ((userDb?.credit || 0) <= 0) {
      setOpenBuyModal(true)
      setPending(false)
      return
    }

    const form = e.currentTarget

    const formData = new FormData(form)

    const data = {
      repositoryExcerpt: formData.get('repository-excerpt') as string,
      /*  repositoryThumbUrl: formData.get('repository-thumb-url') as string, */
    }

    const parsedData = schema.safeParse(data)

    if (!parsedData.success) {
      parsedData.error.errors.forEach((err) => toast.error(err.message))

      setPending(false)
      return
    }

    try {
      const uDb = await getUserOnDB(user.email)

      if (!uDb) {
        toast.error(dictionary.messageErrors.userNotFound)
        setPending(false)
        return
      }

      if ((uDb?.credit || 0) <= 0) {
        router.refresh()
        setOpenBuyModal(true)
        setPending(false)
        return
      }

      const markdownContent: string | null = await generateReadme({
        lang,
        repository: {
          owner: repositoryInfo?.owner.login || '',
          languages: Object.keys(languages || {}) || [],
          title: repositoryInfo?.name || '',
          description: parsedData.data.repositoryExcerpt,
          files: repositoryFiles.slice(0, 15),
          url: repositoryInfo?.html_url || '',
        },
      })

      updateMarkdown(markdownContent || '')

      await updateUserOnDB({
        email: user.email,
        credit: (userDb?.credit || 0) - 1,
      })

      router.refresh()
    } catch (e) {
      const error = e as Error

      if (error.message.includes('#1')) {
        toast.error(dictionary.messageErrors.errorCodeOne)
      } else {
        toast.error(dictionary.messageErrors.generic)
      }
    }

    setPending(false)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <Label
            htmlFor="repository-excerpt"
            className="mb-2 font-semibold text-gray-700"
          >
            {dictionary.repositoryForm.repositoryDescriptionLabel}
            <span className="text-red-500">*</span>
          </Label>
          <Textarea
            area-required="true"
            id="repository-excerpt"
            name="repository-excerpt"
            className="min-h-[120px] w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={
              dictionary.repositoryForm.repositoryDescriptionPlaceholder
            }
          />
        </div>

        <footer className="flex justify-end gap-2">
          <Button
            type="submit"
            disabled={pending}
            className="self-end bg-gray-700 hover:bg-gray-800"
          >
            {pending
              ? dictionary.repositoryForm.submittingButton
              : dictionary.repositoryForm.submitButton}
          </Button>
        </footer>
      </form>

      <Dialog open={openBuyModal} onOpenChange={() => setOpenBuyModal(false)}>
        <DialogContent className="min-h-96 w-max max-w-5xl bg-white">
          <DialogHeader>
            <DialogTitle>
              {dictionary.repositoryForm.modalBuy.title}
            </DialogTitle>
            <DialogDescription>
              {dictionary.repositoryForm.modalBuy.description}
            </DialogDescription>
          </DialogHeader>

          <div className="m-auto flex gap-4">
            {products.map((product) => (
              <Card
                key={product.externalId}
                className="rounded-lg border shadow-md"
              >
                <CardHeader className="bg-gray-100 p-4">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="hidden text-sm text-gray-600">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-center text-gray-700">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="bg-gray-100 p-4">
                  <Button
                    onClick={async () => {
                      const url = await createPreference({ product, user })

                      if (url) {
                        window.location.href = url
                      }
                    }}
                    className="flex h-auto w-full flex-col py-2"
                  >
                    {dictionary.repositoryForm.modalBuy.buttonBuy}
                    <span>{formatPrice(product.price)}</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
