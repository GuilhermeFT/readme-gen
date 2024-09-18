import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ClientSection } from './client-section'
import { Separator } from '@/components/ui/separator'

export const RepositoryForm = () => {
  return (
    <form action="" className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="repository-name">Nome do repositório</Label>
        <Input
          disabled
          readOnly
          type="text"
          id="repository-name"
          className="w-full rounded-lg border p-2"
          placeholder="Nome do repositório"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="repository-description">Descrição do repositório</Label>
        <Textarea
          disabled
          readOnly
          id="repository-description"
          className="w-full rounded-lg border p-2"
          placeholder="Descrição do repositório"
        ></Textarea>
      </div>

      <Separator className="my-6" />

      <ClientSection />

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="repository-excerpt"
          className="font-semibold text-gray-700"
        >
          Descreva um pouco sobre o repositório
        </Label>
        <Textarea
          id="repository-excerpt"
          className="min-h-40 w-full rounded-lg border p-2"
          placeholder="Este repositório é um projeto open-source que visa..."
        ></Textarea>
      </div>

      <Button type="submit">Criar repositório</Button>
    </form>
  )
}
