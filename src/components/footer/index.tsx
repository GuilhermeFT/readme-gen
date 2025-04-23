import { Dictionary } from '@/types/dictionary'
import { FileText } from 'lucide-react'
import Link from 'next/link'

type FooterProps = {
  dict: Dictionary
}

export const Footer = ({ dict }: FooterProps) => {
  return (
    <footer className="bg-background w-full border-t py-6 md:py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <FileText className="text-primary h-5 w-5" />
          <span className="text-lg font-semibold">
            Readme<span className="text-primary">Gen</span>
          </span>
        </div>
        <p className="text-muted-foreground text-center text-sm md:text-left">
          &copy; {new Date().getFullYear()} ReadmeGen. {dict.footer.copyright}
        </p>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            {dict.footer.linkLabels.terms}
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            {dict.footer.linkLabels.privacy}
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            {dict.footer.linkLabels.contact}
          </Link>
        </div>
      </div>
    </footer>
  )
}
