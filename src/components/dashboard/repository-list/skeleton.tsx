export const RepositoryListSkeleton = () => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex min-h-16 items-center gap-4 border-b px-4 py-5"
        >
          <div className="flex w-full flex-col">
            <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
