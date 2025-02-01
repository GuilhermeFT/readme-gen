export const RepositoryFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-8 w-full animate-pulse rounded-lg bg-gray-200"></div>
        <div className="h-16 w-full animate-pulse rounded-lg bg-gray-200"></div>
      </div>
    </div>
  )
}
