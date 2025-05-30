'use client'

import { useEffect, useState } from 'react'
import { MarkdownVisualizer } from './markdown-visualizer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMarkdown } from '@/stores/markdown'
import { toast } from 'sonner'
import { saveRepositoryFile } from '@/services/github/repositories'
import { getUserInfo } from '@/services/github/user'
import { getRepositoryByName } from '@/services/github/repositories'
import { useRouter } from 'next/navigation'
import { Copy } from 'lucide-react'
import { Dictionary } from '@/types/dictionary'
import { CommitMessageModal } from '../commit-message-modal'
import { getLicenseFileContent } from '@/services/licenses'
import { useFormStore } from '@/stores/form'

type MarkdownEditorProps = {
  dictionary: Dictionary['dashboardPage']
  user?: Awaited<ReturnType<typeof getUserInfo>>
  repositoryInfo: Awaited<ReturnType<typeof getRepositoryByName>>
  gitReadme: string | null
}

export const MarkdownEditor = ({
  dictionary,
  user,
  repositoryInfo,
  gitReadme,
}: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false)
  const { markdown, updateMarkdown } = useMarkdown()
  const { license } = useFormStore()
  const router = useRouter()

  const hasMarkdown = markdown.length > 10

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown)

    toast.success(dictionary.markdownEditor.copySuccess)
  }

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url

    a.download = 'README.md'

    a.click()

    URL.revokeObjectURL(url)

    a.remove()

    toast.success(dictionary.markdownEditor.downloadSuccess)
  }

  const handleOpenCommitModal = () => {
    setIsCommitModalOpen(true)
  }

  const handleCloseCommitModal = () => {
    setIsCommitModalOpen(false)
  }

  const handleSaveToGithub = async (commitMessage: string) => {
    setIsUploading(true)
    try {
      if (!user || !repositoryInfo) {
        toast.error(dictionary.messageErrors.userNotFound)
        setIsUploading(false)
        return
      }

      // Salvar o README.md
      await saveRepositoryFile(
        repositoryInfo.name,
        'README.md',
        markdown,
        commitMessage,
      )

      // Se tiver licença que não seja 'none', salvar o LICENSE.md
      if (license && license !== 'none') {
        try {
          const licenseContent = await getLicenseFileContent(license)
          if (licenseContent) {
            await saveRepositoryFile(
              repositoryInfo.name,
              'LICENSE.md',
              licenseContent,
              commitMessage,
            )
          }
        } catch (licenseError) {
          console.error('Erro ao salvar licença:', licenseError)
          toast.error('Erro ao salvar arquivo de licença.')
        }
      }

      toast.success('Arquivos salvos no GitHub com sucesso!')
      router.refresh()
    } catch (e) {
      const error = e as Error
      toast.error(error.message)
    }

    setIsUploading(false)
  }

  useEffect(() => {
    if (!gitReadme) {
      updateMarkdown('')
      return
    }

    updateMarkdown(gitReadme)
  }, [gitReadme, updateMarkdown])

  return (
    <div className="mx-auto flex max-h-[86vh] w-full flex-col overflow-hidden rounded-lg border bg-gray-50 shadow-xs">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-gray-100 p-4">
        <span className="text-lg font-semibold text-gray-700">README.md</span>
        <div className="flex">
          <Button
            onClick={() => setIsPreview(true)}
            variant={isPreview ? 'default' : 'outline'}
            className={cn('w-24 rounded-tr-none rounded-br-none')}
          >
            {dictionary.markdownEditor.buttonPreview}
          </Button>
          <Button
            onClick={() => setIsPreview(false)}
            variant={isPreview ? 'outline' : 'default'}
            className={cn('w-24 rounded-tl-none rounded-bl-none')}
          >
            {dictionary.markdownEditor.buttonCode}
          </Button>
        </div>
      </header>

      {!isPreview && (
        <textarea
          value={markdown}
          placeholder="Write your markdown here..."
          onChange={(e) => updateMarkdown(e.target.value)}
          className="flex-1 resize-none bg-gray-50 p-4 text-sm text-gray-700 outline-hidden"
        ></textarea>
      )}

      {isPreview && <MarkdownVisualizer markdown={markdown} />}

      {hasMarkdown && (
        <footer className="flex flex-wrap justify-end gap-2 bg-gray-100 p-2">
          <Button
            variant="outline"
            type="button"
            onClick={handleOpenCommitModal}
            disabled={isUploading}
          >
            {dictionary.repositoryForm.saveOnGithub}
          </Button>

          <Button
            className="rounded-b-lg"
            variant="outline"
            onClick={handleDownload}
          >
            {dictionary.markdownEditor.downloadButton}
          </Button>

          <Button
            className="rounded-b-lg"
            variant="outline"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </footer>
      )}

      <CommitMessageModal
        isOpen={isCommitModalOpen}
        onClose={handleCloseCommitModal}
        onConfirm={handleSaveToGithub}
        defaultMessage="chore: add readme"
      />
    </div>
  )
}
