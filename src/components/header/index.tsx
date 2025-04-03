import { FileText } from 'lucide-react'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">
            Readme<span className="text-primary">Gen</span>
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary"
          >
            Recursos
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary"
          >
            Como Funciona
          </Link>
          <Link href="#faq" className="text-sm font-medium hover:text-primary">
            FAQ
          </Link>
          <div className="flex items-center gap-2 overflow-hidden rounded-md border">
            <Link
              href="?lang=pt"
              className="bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground"
            >
              PT
            </Link>
            <Link
              href="?lang=en"
              className="px-2.5 py-1.5 text-xs font-medium hover:bg-muted"
            >
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
