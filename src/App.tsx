import AlertConfirm from './components/AlertConfirm'
import CardAccountantInfo from './components/CardAccountantInfo'
import { Button } from './components/ui/button'
import './globals.css'
import { useDayCountInfo } from './hooks/useDayCountInfo'
import DayCountServiceLocalStorage from './services/DayCountServiceLocalStorage'
import { PlusCircle, MinusCircle, Tally5 } from 'lucide-react'

function App() {
  const service = new DayCountServiceLocalStorage()
  const { dayCountInfo, saveDayCountInfo, resetInfoDay } =
    useDayCountInfo(service)

  return (
    <main className="border px-2 md:px-auto py-16 rounded border-slate-200  mt-48 md:mt-12 space-y-12 mx-2 md:mx-auto max-w-4xl flex flex-col items-center">
      <section className="flex flex-col items-center">
        <Tally5 size="50" />
        <h1 className="text-1xl md:text-2xl text-center md:text-start font-bold">
          Dias praticando Ho&apos;oponopono
        </h1>
      </section>

      <section className="space-y-2">
        <CardAccountantInfo
          total={dayCountInfo.total}
          lastDayHeld={dayCountInfo.lastDayHeld}
        />
        <div className="flex gap-2 w-full">
          <Button className="w-full" onClick={saveDayCountInfo}>
            <PlusCircle className="mr-1 h-4 w-4" />
            Adicionar +1
          </Button>

          <AlertConfirm
            title="Deseja realmente zerar as informações ?"
            description="Esta ação é irreversível, seus dados serão perdidos."
            onConfirm={resetInfoDay}
          >
            <Button variant="outline" className="w-full">
              <MinusCircle className="mr-1 h-4 w-4" />
              Zerar
            </Button>
          </AlertConfirm>
        </div>
      </section>
    </main>
  )
}

export default App
