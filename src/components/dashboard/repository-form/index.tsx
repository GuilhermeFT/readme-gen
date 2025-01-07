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

import { useState } from 'react'

import { toast } from 'sonner'
import { useMarkdown } from '@/stores/markdown'
import { generateReadme } from '@/services/generator'
import { Dictionary } from '@/dictionaries/types'
import { Locales } from '@/types/locales'

type RepositoryFormProps = {
  repositoryInfo: Awaited<ReturnType<typeof getRepositoryByName>>
  languages: Awaited<ReturnType<typeof getRepositoryLanguages>>
  dictionary: Dictionary['dashboardPage']
  lang: Locales
}

export const RepositoryForm = ({
  dictionary,
  languages,
  repositoryInfo,
  lang,
}: RepositoryFormProps) => {
  const { updateMarkdown } = useMarkdown()
  const [pending, setPending] = useState(false)
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
          files: [],
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

  return (
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
  )
}
