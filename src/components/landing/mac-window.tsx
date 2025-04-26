import { Dictionary } from '@/types/dictionary'

type MacWindowProps = {
  dict: Dictionary
}

export const MacWindow = ({ dict }: MacWindowProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-background relative aspect-[4/3] w-full max-w-[500px] overflow-hidden rounded-lg border p-2 shadow-xl">
        <div className="bg-muted absolute top-0 right-0 left-0 flex h-8 items-center gap-1.5 rounded-t-lg px-3">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
          <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
          <div className="text-muted-foreground ml-2 text-xs">
            {dict.landingPage.hero.macWindow.fileTitle}
          </div>
        </div>
        <div className="mt-8 p-4 font-mono text-sm">
          <div className="mb-2 text-xl font-bold">
            {dict.landingPage.hero.macWindow.projectName}
          </div>
          <div className="mb-4 flex gap-2">
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-800">
              React
            </span>
            <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">
              Node.js
            </span>
            <span className="rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-800">
              TypeScript
            </span>
          </div>
          <div className="text-muted-foreground mb-2">
            {dict.landingPage.hero.macWindow.projectDescription}
          </div>
          <div className="mb-1 text-lg font-bold">
            {dict.landingPage.hero.macWindow.installation}
          </div>
          <div className="bg-muted mb-2 rounded p-2 text-xs">
            {dict.landingPage.hero.macWindow.installationDescription}
          </div>
          <div className="mb-1 text-lg font-bold">
            {dict.landingPage.hero.macWindow.use}
          </div>
          <div className="text-muted-foreground">
            {dict.landingPage.hero.macWindow.useDescription}
          </div>
        </div>
      </div>
    </div>
  )
}
