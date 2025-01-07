import { marked } from 'marked'

export const MarkdownVisualizer = ({ markdown }: { markdown: string }) => {
  const __html = marked.parse(markdown)

  return (
    <div className="flex-1 bg-white p-4 w-full overflow-auto">
      <p
        className="visualizer text-gray-600 text-sm"
        dangerouslySetInnerHTML={{
          __html,
        }}
      />
    </div>
  )
}
