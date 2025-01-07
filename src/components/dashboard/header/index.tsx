import { HeaderAvatar } from './header-avatar'

export const DashboardHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-md lg:h-16 lg:px-6">
      {/* Espaço para título ou navegação futura */}
      <div className="flex flex-1 items-center">
        <h1 className="text-lg font-medium text-gray-700 md:text-xl">
          Painel de Controle
        </h1>
      </div>
      {/* Avatar */}
      <HeaderAvatar />
    </header>
  )
}
