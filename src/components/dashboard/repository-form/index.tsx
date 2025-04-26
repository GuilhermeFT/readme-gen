'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  getRepositoryByName,
  getRepositoryLanguages,
} from '@/services/github/repositories'

import { toast } from 'sonner'
import { useMarkdown } from '@/stores/markdown'
import { generateReadme } from '@/services/generator'
import { Locales } from '@/types/locales'
import { getUserInfo } from '@/services/github/user'
import { useRouter } from 'next/navigation'
import { Dictionary } from '@/types/dictionary'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { licenses } from '@/utils/licenses'
import { useFormStore } from '@/stores/form'

type RepositoryFormProps = {
  repositoryInfo: Awaited<ReturnType<typeof getRepositoryByName>>
  languages: Awaited<ReturnType<typeof getRepositoryLanguages>>
  repositoryFiles: string[]
  dictionary: Dictionary['dashboardPage']
  lang: Locales
  user?: Awaited<ReturnType<typeof getUserInfo>>
}

export const RepositoryForm = ({
  dictionary,
  languages,
  repositoryInfo,
  repositoryFiles,
  lang,
  user,
}: RepositoryFormProps) => {
  const { updateMarkdown } = useMarkdown()
  const { setLicense } = useFormStore()
  const router = useRouter()

  const schema = z.object({
    repositoryExcerpt: z
      .string()
      .nonempty(dictionary.messageErrors.excerptRequired),
    language: z.enum(['pt-BR', 'en'] as const),
    license: z.string().min(1, 'Please select a license'),
    includeContribution: z.boolean(),
  })

  type FormValues = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      repositoryExcerpt: '',
      language: lang,
      license: 'mit',
      includeContribution: true,
    },
  })

  const includeContribution = watch('includeContribution')
  const licenseValue = watch('license')

  useEffect(() => {
    setLicense(licenseValue)
  }, [licenseValue, setLicense])

  const onSubmit = async (data: FormValues) => {
    if (!user?.email) {
      toast.error(dictionary.messageErrors.userNotFound)
      return
    }

    try {
      const markdownContent: string | null = await generateReadme({
        lang: data.language,
        repository: {
          owner: repositoryInfo?.owner.login || '',
          languages: Object.keys(languages || {}) || [],
          title: repositoryInfo?.name || '',
          description: data.repositoryExcerpt,
          files: repositoryFiles.slice(0, 15),
          url: repositoryInfo?.html_url || '',
        },
        license: data.license,
        includeContribution: data.includeContribution,
      })

      updateMarkdown(markdownContent || '')

      router.refresh()
    } catch (e) {
      const error = e as Error

      if (error.message.includes('#1')) {
        toast.error(dictionary.messageErrors.errorCodeOne)
      } else {
        toast.error(dictionary.messageErrors.generic)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <Label
          htmlFor="repository-excerpt"
          className="mb-2 font-semibold text-gray-700"
        >
          {dictionary.repositoryForm.repositoryDescriptionLabel}
          <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="repository-excerpt"
          className="min-h-[120px] w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500"
          placeholder={
            dictionary.repositoryForm.repositoryDescriptionPlaceholder
          }
          {...register('repositoryExcerpt')}
        />
        {errors.repositoryExcerpt && (
          <p className="mt-1 text-sm text-red-500">
            {errors.repositoryExcerpt.message}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="language-selector"
          className="mb-2 font-semibold text-gray-700"
        >
          {dictionary.repositoryForm.languageLabel}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          defaultValue={lang}
          onValueChange={(value) => setValue('language', value as Locales)}
        >
          <SelectTrigger id="language-selector" className="w-full">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="pt-BR">Portuguese</SelectItem>
          </SelectContent>
        </Select>
        {errors.language && (
          <p className="mt-1 text-sm text-red-500">{errors.language.message}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="license-selector"
          className="mb-2 font-semibold text-gray-700"
        >
          {dictionary.repositoryForm.licenseLabel}
          <span className="text-red-500">*</span>
        </Label>
        <Select
          defaultValue="mit"
          onValueChange={(value) => setValue('license', value)}
        >
          <SelectTrigger id="license-selector" className="w-full">
            <SelectValue placeholder="Select a license" />
          </SelectTrigger>
          <SelectContent>
            {licenses.map((license) => (
              <SelectItem key={license.value} value={license.value}>
                {license.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.license && (
          <p className="mt-1 text-sm text-red-500">{errors.license.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="include-contribution"
          checked={includeContribution}
          onCheckedChange={(checked) =>
            setValue('includeContribution', checked)
          }
        />
        <Label
          htmlFor="include-contribution"
          className="font-semibold text-gray-700"
        >
          {dictionary.repositoryForm.includeContributionLabel}
        </Label>
      </div>

      <footer className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting} className="self-end">
          {isSubmitting
            ? dictionary.repositoryForm.submittingButton
            : dictionary.repositoryForm.submitButton}
        </Button>
      </footer>
    </form>
  )
}
