'use client'

import { TooltipWrapper } from '@/components/tooltip-wrapper'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { CircleHelp } from 'lucide-react'
import { useState } from 'react'

export const ClientSection = () => {
  const [isThumb, setIsThumb] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="repository-visibility"
        className="flex items-center gap-2 font-semibold text-gray-700"
      >
        Gerar imagem de Thumb para o Readme?
        <TooltipWrapper content="Se ativado, nós iremos tirar um print da URL que você disponibilizar logo abaixo. Isso vai ajudar a deixar o seu repositório mais bonito!">
          <CircleHelp className="h-4 w-4 hover:text-zinc-500" />
        </TooltipWrapper>
      </Label>
      <Switch id="airplane-mode" onCheckedChange={(e) => setIsThumb(e)} />

      {isThumb && (
        <div className="ml-4 mt-4 flex flex-col gap-2">
          <Label
            htmlFor="repository-thumb-url"
            className="font-semibold text-gray-700"
          >
            Link do App funcionando
          </Label>
          <Input
            type="url"
            id="repository-thumb-url"
            className="w-full rounded-lg border p-2"
            placeholder="https://example.com/"
          />
        </div>
      )}
    </div>
  )
}
