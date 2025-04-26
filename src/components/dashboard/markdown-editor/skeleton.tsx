export const MarkdownEditorSkeleton = () => {
  return (
    <div className="mx-auto flex w-full flex-col rounded-lg border shadow-xs">
      <header className="flex items-center justify-between border-b bg-gray-100 p-4">
        <div className="h-6 w-28 animate-pulse rounded bg-gray-200 text-lg font-semibold" />

        <div className="flex">
          <div className="h-8 w-24 animate-pulse rounded-lg rounded-br-none rounded-tr-none bg-gray-200" />
          <div className="h-8 w-24 animate-pulse rounded-lg rounded-bl-none rounded-tl-none bg-gray-200" />
        </div>
      </header>
      <div className="h-full w-full animate-pulse bg-gray-200" />
    </div>
  )
}
