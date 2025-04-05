import { cn } from '@/lib/utils'
import { FileText } from 'lucide-react'

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div
      className={cn(
        'pointer-events-none flex items-center gap-2 text-center font-bold',
        className,
      )}
    >
      <FileText className="text-primary h-[1em] w-[1em]" />
      <span className="font-bold">
        Readme<span className="text-primary">Gen</span>
      </span>
    </div>
  )
}
