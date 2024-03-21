import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'

type DialogEditDayProps = {
  children: ReactNode
  className: string
  total: number
  onSaveDay: (total: number) => void
}

export function DialogEditDay({
  children,
  total,
  className,
  onSaveDay,
}: DialogEditDayProps) {
  const [dayTotal, setDayTotal] = useState<number>()
  const [open, setOpen] = useState(false)

  function handleClickSave() {
    if (dayTotal) onSaveDay(dayTotal)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(className)}>{children}</DialogTrigger>

      <DialogContent className="h-svh sm:h-auto flex flex-col justify-center gap-16 md:gap-12">
        <DialogHeader>
          <DialogTitle className="text-md">
            Editar quantidade de dias realizados.
          </DialogTitle>

          <DialogDescription className="text-xs">
            Você praticou
            <span className="font-bold"> {total} dias </span>
            até o momento.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex flex-col flex-1 gap-3">
            <Input
              onChange={(event) => setDayTotal(+event.target.value)}
              type="number"
            />

            <Button onClick={handleClickSave}>Salvar</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
