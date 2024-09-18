import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

type TooltipProviderProps = {
  children: React.ReactNode
  content: string
}

export const TooltipWrapper = ({ children, content }: TooltipProviderProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger type="button">{children}</TooltipTrigger>
        <TooltipContent className="max-w-56">
          <p className="text-pretty">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
