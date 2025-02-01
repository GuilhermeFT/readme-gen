import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <span
      className={cn(
        'pointer-events-none text-center text-5xl font-bold text-muted-foreground',
        className,
      )}
    >
      <span className="text-primary"> Readme</span>
      <span className="text-muted-foreground">Gen</span>
    </span>
  )
}
