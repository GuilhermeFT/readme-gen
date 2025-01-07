import { marked } from 'marked'

export const MarkdownVisualizer = ({ markdown }: { markdown: string }) => {
  const __html = marked.parse(markdown)

  return (
    <div className="flex-1 bg-white p-4">
      <p
        className="visualizer text-gray-600"
        dangerouslySetInnerHTML={{
          __html,
        }}
      />
    </div>
  )
}
