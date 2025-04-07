import { Card, CardHeader, CardContent } from '@/components/ui/card'

export const RepositoryDetailsSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="bg-muted-foreground/10 h-5 w-40 animate-pulse rounded" />
          <div className="bg-muted-foreground/10 h-8 w-8 animate-pulse rounded-full" />
        </div>
        <div className="bg-muted-foreground/10 mt-1 h-4 w-60 animate-pulse rounded" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="bg-muted-foreground/10 h-4 w-32 animate-pulse rounded" />
          <div className="flex items-center gap-2">
            <div className="bg-muted-foreground/10 h-4 w-4 animate-pulse rounded-full" />
            <div className="bg-muted-foreground/10 h-4 w-40 animate-pulse rounded" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-muted-foreground/10 h-4 w-36 animate-pulse rounded" />
          <div className="bg-muted-foreground/10 h-12 w-full animate-pulse rounded" />
        </div>

        <div className="space-y-3">
          <div className="bg-muted-foreground/10 h-4 w-24 animate-pulse rounded" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <div className="bg-muted-foreground/10 h-3 w-16 animate-pulse rounded" />
                  <div className="bg-muted-foreground/10 h-3 w-8 animate-pulse rounded" />
                </div>
                <div className="bg-muted-foreground/10 h-1.5 w-full animate-pulse rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="bg-muted-foreground/10 h-4 w-4 animate-pulse rounded-full" />
              <div className="bg-muted-foreground/10 h-4 w-16 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
