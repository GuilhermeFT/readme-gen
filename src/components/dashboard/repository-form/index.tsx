'use client'

import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  getRepositoryByName,
  getRepositoryLanguages,
} from '@/services/github/repositories'

import { use, useState } from 'react'

import { toast } from 'sonner'
import { useMarkdown } from '@/stores/markdown'
import { generateReadme } from '@/services/generator'
import { Dictionary } from '@/dictionaries/types'
import { Locales } from '@/types/locales'
import { getUserOnDB } from '@/services/faunadb'
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
import { createPayment } from '@/services/abacate'
import { getUserInfo } from '@/services/github/user'

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

    if (userDb?.credit || 0 <= 0) {
      toast.error(dictionary.messageErrors.noCredit)
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
        {/* Repositório: Informações Gerais */}
        <div className="rounded-md border bg-gray-100 p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-medium text-gray-800">
            {dictionary.repositoryForm.title}
          </h2>

          <div className="grid gap-3 text-sm">
            <div className="flex gap-2">
              <p className="font-semibold text-gray-700">
                {dictionary.repositoryForm.repoInfo.name}
              </p>
              <p id="repository-name" className="text-gray-500">
                {repositoryInfo?.name}
              </p>
            </div>
            <div className="flex gap-2">
              <p className="font-semibold text-gray-700">
                {dictionary.repositoryForm.repoInfo.description}
              </p>
              <p id="repository-description" className="text-gray-500">
                {repositoryInfo?.description || 'Sem descrição disponível.'}
              </p>
            </div>
            <div>
              <Label htmlFor="repository-languages">
                {dictionary.repositoryForm.repoInfo.languages}
              </Label>
              <div className="flex gap-4">
                {languages &&
                  Object.entries(languages).map(([language, percentage]) => (
                    <div
                      key={language}
                      className="flex flex-col items-center text-gray-500"
                    >
                      <span className="font-medium">{language}</span>
                      <span className="text-xs">{percentage.toFixed(2)}%</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Seleção de Arquivo */}
        {/* <div>
        <Label
          htmlFor="repository-folder-structure"
          className="mb-2 flex items-center gap-2 font-semibold text-gray-700"
        >
          Selecione o arquivo de dependências
          <span className="text-red-500">*</span>
          <TooltipWrapper content="Selecione o arquivo que contém as dependências do seu projeto, como package.json.">
            <CircleHelp className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </TooltipWrapper>
        </Label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Exemplo: package.json" />
          </SelectTrigger>
          <SelectContent>
            {folderStructure?.tree.map((file) => (
              <SelectItem key={file.path} value={file.path || ''}>
                {file.path}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

        {/* Descrição do Repositório */}
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
            className="min-h-[120px] w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={
              dictionary.repositoryForm.repositoryDescriptionPlaceholder
            }
          />
        </div>

        {/* <div className="flex flex-col gap-2">
        <Label
          htmlFor="repository-visibility"
          className="flex items-center gap-2 font-semibold text-gray-700"
        >
          {dictionary.repositoryForm.repositoryThumbLabel}
          <TooltipWrapper content="Se ativado, nós iremos tirar um print da URL que você disponibilizar logo abaixo. Isso vai ajudar a deixar o seu repositório mais bonito!">
            <CircleHelp className="h-4 w-4 hover:text-zinc-500" />
          </TooltipWrapper>
        </Label>
        <Switch id="airplane-mode" onCheckedChange={(e) => setHasThumb(e)} />

        {hasThumb && (
          <div className="ml-4 mt-4 flex flex-col gap-2">
            <Label
              htmlFor="repository-thumb-url"
              className="font-semibold text-gray-700"
            >
              {dictionary.repositoryForm.repositoryThumbUrlLabel}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              aria-required="true"
              type="url"
              name="repository-thumb-url"
              id="repository-thumb-url"
              className="w-full rounded-lg border p-2"
              placeholder={
                dictionary.repositoryForm.repositoryThumbUrlPlaceholder
              }
            />
          </div>
        )}
      </div> */}

        {/* Botão de Envio */}
        <Button
          type="submit"
          disabled={pending}
          className="self-end bg-gray-700 hover:bg-gray-800"
        >
          {pending
            ? dictionary.repositoryForm.submittingButton
            : dictionary.repositoryForm.submitButton}
        </Button>
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
                      const url = await createPayment({ product, user })

                      if (url) {
                        window.open(url, '_blank')
                        return
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
