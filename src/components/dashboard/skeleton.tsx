import { MarkdownEditorSkeleton } from './markdown-editor/skeleton'
import { RepositoryFormSkeleton } from './repository-form/skeleton'

export const DashboardSkeleton = () => {
  return (
    <>
      <RepositoryFormSkeleton />
      <MarkdownEditorSkeleton />
    </>
  )
}
