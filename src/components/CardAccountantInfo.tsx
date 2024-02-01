type CardAccountantInfoProps = {
  total: number
  lastDayHeld: Date | null
}

function CardAccountantInfo({ lastDayHeld, total }: CardAccountantInfoProps) {
  return (
    <>
      <div className="min-w-72 md:min-w-96 flex flex-col rounded border border-slate-200 p-8">
        <p className="text-xs md:text-lg font-medium text-slate-900">
          Total de dias: <span className="font-semibold">{total}</span>
        </p>
        <p className="text-xs md:text-lg font-medium text-slate-800">
          Último dia realizado:
          <span className="font-semibold">
            {lastDayHeld
              ? new Date(lastDayHeld).toLocaleDateString()
              : ' dd/mm/yyyy'}
          </span>
        </p>
      </div>
    </>
  )
}

export default CardAccountantInfo
