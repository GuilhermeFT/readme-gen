import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

type CommitMessageModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: (commitMessage: string) => void
  defaultMessage?: string
}

export function CommitMessageModal({
  isOpen,
  onClose,
  onConfirm,
  defaultMessage = 'chore: add readme and license',
}: CommitMessageModalProps) {
  const [commitMessage, setCommitMessage] = useState(defaultMessage)

  const handleConfirm = () => {
    onConfirm(commitMessage)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mensagem de Commit</DialogTitle>
          <DialogDescription>
            Defina a mensagem de commit para o arquivo README.md e LICENSE.md
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="commit-message" className="col-span-4">
              Mensagem de commit
            </Label>
            <Input
              id="commit-message"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              className="col-span-4"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
