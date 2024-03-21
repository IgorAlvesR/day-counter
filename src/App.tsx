import { Toaster, toast } from 'sonner'
import AlertConfirm from './components/AlertConfirm'
import CardAccountantInfo from './components/CardAccountantInfo'
import { Button } from './components/ui/button'
import './globals.css'
import { useDayCountInfo } from './hooks/useDayCountInfo'
import DayCountServiceLocalStorage from './services/DayCountServiceLocalStorage'
import { PlusCircle, MinusCircle, Tally5, Pencil } from 'lucide-react'
import ConfettiEffect from './components/Confetti'
import useConfettiActive from './hooks/useConfettiActive'
import { isMultipleOfTen } from './helpers/math'
import { DialogEditDay } from './components/DialogEditDay'
import { editAccountantInfo } from './useCases/saveAccountantInfo'

const service = new DayCountServiceLocalStorage()

function App() {
  const { dayCountInfo, onSaveDayCountInfo, setDayCountInfo, resetInfoDay } =
    useDayCountInfo(service)

  const { confettiActive, handleActiveConfetti } = useConfettiActive()

  function showCongratulations(total: number) {
    if (total && !!isMultipleOfTen(total)) {
      handleActiveConfetti()
      toast.success(
        `Parabéns, você completou ${total} dias praticando Ho'oponopono!`,
        {
          position: 'top-center',
          style: { background: '#009688', color: 'white' },
        },
      )
    }
  }

  function handleAddDay() {
    const total = onSaveDayCountInfo()
    if (!total) return
    showCongratulations(total)
  }

  function handleEditDay(total: number) {
    const countDayInfo = editAccountantInfo(service, total)
    if (!countDayInfo) return null
    setDayCountInfo({
      total: countDayInfo.total,
      lastDayHeld: countDayInfo.lastDayHeld,
    })
    showCongratulations(countDayInfo.total)
  }

  return (
    <main className="md:flex-col flex justify-center md:items-center h-screen mx-2">
      <ConfettiEffect active={confettiActive} />
      <Toaster />

      <div className="w-full sm:border px-2 md:px-auto py-16 rounded sm:border-slate-200 space-y-32 mx-2 md:mx-auto max-w-4xl flex flex-col items-center">
        <section className="flex flex-col items-center">
          <Tally5 size="50" />
          <h1 className="text-2xl md:text-3xl text-center md:text-start font-bold">
            Dias praticando Ho&apos;oponopono
          </h1>
        </section>

        <section className="space-y-24">
          <CardAccountantInfo
            total={dayCountInfo.total}
            lastDayHeld={dayCountInfo.lastDayHeld}
          >
            {dayCountInfo.total > 0 && (
              <DialogEditDay
                total={dayCountInfo.total}
                onSaveDay={handleEditDay}
                className="self-start"
              >
                <Pencil className="w-8 h-8 hover:bg-slate-200 p-2 rounded cursor-pointer transition-all" />
              </DialogEditDay>
            )}
          </CardAccountantInfo>

          <div className="flex gap-2 w-full flex-col">
            <AlertConfirm
              title="Deseja realmente zerar as informações ?"
              description="Esta ação é irreversível, seus dados serão perdidos."
              onConfirm={resetInfoDay}
            >
              <Button variant="outline" className="w-full px-4 py-6">
                <MinusCircle className="mr-1 h-4 w-4" />
                Zerar
              </Button>
            </AlertConfirm>

            <Button
              className="w-full px-4 py-6 min-h-[50px]"
              onClick={handleAddDay}
            >
              <PlusCircle className="mr-1 h-4 w-4" />
              Adicionar +1
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
