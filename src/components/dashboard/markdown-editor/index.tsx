'use client'

import { useState } from 'react'
import { MarkdownVisualizer } from './markdown-visualizer'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const MarkdownEditor = () => {
  const [isPreview, setIsPreview] = useState(false)

  return (
    <div className="mx-auto flex w-full flex-col rounded-lg border bg-gray-50 shadow-sm">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-gray-100 p-4">
        <span className="text-lg font-semibold text-gray-700">README.md</span>
        <div className="flex">
          <Button
            onClick={() => setIsPreview(false)}
            variant="outline"
            className={cn(
              'w-24 rounded-br-none rounded-tr-none',
              !isPreview && 'bg-white',
            )}
          >
            Code
          </Button>
          <Button
            onClick={() => setIsPreview(true)}
            variant="outline"
            className={cn(
              'w-24 rounded-bl-none rounded-tl-none',
              isPreview && 'bg-white',
            )}
          >
            Preview
          </Button>
        </div>
      </header>

      {!isPreview && (
        <textarea
          className="flex-1 resize-none bg-gray-50 p-4 outline-none"
          placeholder="Write your markdown here..."
        ></textarea>
      )}

      {isPreview && <MarkdownVisualizer />}
    </div>
  )
}
