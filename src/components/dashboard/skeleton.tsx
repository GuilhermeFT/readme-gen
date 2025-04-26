import { MarkdownEditorSkeleton } from './markdown-editor/skeleton'
import { RepositoryFormSkeleton } from './repository-form/skeleton'
import { RepositoryDetailsSkeleton } from './repository-details/skeleton'

export const DashboardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
      <div className="space-y-6">
        <RepositoryDetailsSkeleton />
        <RepositoryFormSkeleton />
      </div>
      <MarkdownEditorSkeleton />
    </div>
  )
}
