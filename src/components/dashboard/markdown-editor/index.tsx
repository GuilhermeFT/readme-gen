'use client'

import { useState } from 'react'
import { MarkdownVisualizer } from './markdown-visualizer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useMarkdown } from '@/stores/markdown'

export const MarkdownEditor = () => {
  const [isPreview, setIsPreview] = useState(true)
  const { markdown, updateMarkdown } = useMarkdown()

  return (
    <div className="mx-auto flex w-full flex-col rounded-lg border bg-gray-50 shadow-sm overflow-hidden">
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
            Preview
          </Button>
          <Button
            onClick={() => setIsPreview(false)}
            variant="outline"
            className={cn(
              'w-24 rounded-bl-none rounded-tl-none',
              !isPreview && 'bg-white',
            )}
          >
            Code
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
    </div>
  )
}
