'use client'

import { useState } from 'react'
import { MarkdownVisualizer } from './markdown-visualizer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMarkdown } from '@/stores/markdown'
import { Dictionary } from '@/dictionaries/types'
import { toast } from 'sonner'

type MarkdownEditorProps = {
  dictionary: Dictionary['dashboardPage']
}

export const MarkdownEditor = ({ dictionary }: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(true)
  const { markdown, updateMarkdown } = useMarkdown()

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

  return (
    <div className="mx-auto flex max-h-[86vh] w-full flex-col overflow-hidden rounded-lg border bg-gray-50 shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-gray-100 p-4">
        <span className="text-lg font-semibold text-gray-700">README.md</span>
        <div className="flex">
          <Button
            onClick={() => setIsPreview(true)}
            variant="outline"
            className={cn(
              'w-24 rounded-br-none rounded-tr-none',

              isPreview && 'bg-white',
            )}
          >
            {dictionary.markdownEditor.buttonPreview}
          </Button>
          <Button
            onClick={() => setIsPreview(false)}
            variant="outline"
            className={cn(
              'w-24 rounded-bl-none rounded-tl-none',
              !isPreview && 'bg-white',
            )}
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
          className="flex-1 resize-none bg-gray-50 p-4 text-sm text-gray-700 outline-none"
        ></textarea>
      )}

      {isPreview && <MarkdownVisualizer markdown={markdown} />}

      {hasMarkdown && (
        <footer className="flex justify-end gap-2 bg-gray-100 p-2">
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
            {dictionary.markdownEditor.copyButton}
          </Button>
        </footer>
      )}
    </div>
  )
}
