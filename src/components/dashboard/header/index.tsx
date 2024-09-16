import { HeaderAvatar } from './header-avatar'

export const DashboardHeader = () => {
  return (
    <header className="flex h-14 items-center border-b bg-gray-100 px-4 lg:h-[60px] lg:px-6">
      <div className="flex-1" />
      <HeaderAvatar />
    </header>
  )
}
