import { auth } from '@/auth'
import { SidebarProvider } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'

type TemplateProps = {
  children: React.ReactNode
}

export default async function Template({ children }: TemplateProps) {
  const session = await auth()

  if (!session) {
    return redirect('/login')
  }

  return <SidebarProvider>{children}</SidebarProvider>
}
