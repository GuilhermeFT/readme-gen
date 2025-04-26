import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserInfo } from '@/services/github/user'
import { getAvatarFallback } from '@/utils/text'

type HeaderAvatarProps = {
  user: Awaited<ReturnType<typeof getUserInfo>>
}

export const HeaderAvatar = async ({ user }: HeaderAvatarProps) => {
  const avatarFallback = getAvatarFallback(user?.name || user?.login || 'User')

  return (
    <Avatar className="ring-primary hover:ring-1">
      <AvatarImage src={user?.avatar_url} />
      <AvatarFallback>{avatarFallback}</AvatarFallback>
    </Avatar>
  )
}
