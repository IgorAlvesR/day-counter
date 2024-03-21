import { ReactNode } from 'react'

type CardAccountantInfoProps = {
  total: number
  lastDayHeld: Date | null
  children: ReactNode
}

function CardAccountantInfo({
  lastDayHeld,
  total,
  children,
}: CardAccountantInfoProps) {
  return (
    <>
      <section className="min-w-72 gap-6 md:min-w-96 flex flex-col rounded border border-slate-200 p-10">
        <div className="flex justify-between items-end">
          <div className="flex flex-col ">
            <span className="text-2xl font-semibold">{total}</span>
            <span className="text-xs font-medium opacity-80">
              Dias seguidos
            </span>
          </div>
          {children}
        </div>

        <div className="flex flex-col">
          <span className="text-2xl font-semibold">
            {lastDayHeld
              ? new Date(lastDayHeld).toLocaleDateString()
              : 'dd/mm/yyyy'}
          </span>

          <span className="text-xs font-medium opacity-80">
            Último dia realizado
          </span>
        </div>
      </section>
    </>
  )
}

export default CardAccountantInfo

/* 

<div className="min-w-72 md:min-w-96 flex flex-col rounded border border-slate-200 p-10">
        <p className="text-md md:text-lg font-medium text-slate-900">
          Total de dias: <span className="text-lg font-semibold">{total}</span>
        </p>
        <p className="text-md md:text-lg font-medium text-slate-800">
          Último dia realizado:
          <span className="text-md font-semibold ml-1">
            {lastDayHeld
              ? new Date(lastDayHeld).toLocaleDateString()
              : 'dd/mm/yyyy'}
          </span>
        </p>
      </div>
*/
