import { ArrowRight, FileText, Menu } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import Link from 'next/link'
import { Github } from '../icons/github'
import { Dictionary } from '@/types/dictionary'

type MobileMenuProps = {
  dict: Dictionary['header']
}

export const MobileMenu = ({ dict }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] p-6 sm:w-[300px]">
        <SheetTitle className="sr-only">Sidebar</SheetTitle>
        <SheetDescription className="sr-only">Sidebar content</SheetDescription>
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <FileText className="text-primary h-5 w-5" />
            <span className="text-lg font-bold">
              Readme<span className="text-primary">Gen</span>
            </span>
          </div>
          <nav className="flex flex-col gap-4">
            <Link
              href="#features"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              {dict.navOptions.features}
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              {dict.navOptions.howItWorks}
            </Link>
            <Link
              href="#faq"
              className="hover:text-primary text-sm font-medium transition-colors"
            >
              {dict.navOptions.faq}
            </Link>
            <div className="bg-border my-2 h-px" />
            <Button size="sm" className="w-full justify-start gap-2">
              <span className="flex-1">{dict.callToActionOne}</span>{' '}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="w-full justify-start gap-2"
            >
              <Github className="h-4 w-4" />{' '}
              <span className="flex-1">{dict.callToActionTwo}</span>
            </Button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
