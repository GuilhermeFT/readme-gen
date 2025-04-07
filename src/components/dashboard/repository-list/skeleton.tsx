export const RepositoryListSkeleton = () => {
  return (
    <div className="divide-y">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="p-4">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <div className="bg-muted-foreground/10 h-4 w-4 animate-pulse rounded-full" />
              <div className="bg-muted-foreground/10 h-4 w-32 animate-pulse rounded" />
            </div>
            <div className="bg-muted-foreground/10 h-3 w-4/5 animate-pulse rounded" />
            <div className="flex space-x-4">
              <div className="bg-muted-foreground/10 h-3 w-16 animate-pulse rounded" />
              <div className="bg-muted-foreground/10 h-3 w-16 animate-pulse rounded" />
              <div className="bg-muted-foreground/10 h-3 w-24 animate-pulse rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
