import { TooltipWrapper } from '@/components/tooltip-wrapper'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserInfo } from '@/services/github/user'
import { getAvatarFallback } from '@/utils/text'

export const HeaderAvatar = async () => {
  const user = await getUserInfo()

  const avatarFallback = getAvatarFallback(user?.name || user?.login || 'User')

  return (
    <TooltipWrapper content={user?.name || user?.login || 'User'}>
      <Avatar className="ring-primary hover:ring-1">
        <AvatarImage src={user?.avatar_url} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
    </TooltipWrapper>
  )
}
