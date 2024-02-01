import {
  DayCountInfo,
  DayCountPersistenceService,
} from '@/services/AccountDayPersistenceService'
import { saveAccountantInfo } from '@/useCases/saveAccountantInfo'
import { useState, useEffect } from 'react'

export function useDayCountInfo(service: DayCountPersistenceService) {
  const [dayCountInfo, setDayCountInfo] = useState<DayCountInfo>({
    total: 0,
    lastDayHeld: null,
  })

  const { lastDayHeld, total } = service.getAccountInfo()

  useEffect(() => {
    setDayCountInfo(() => ({ lastDayHeld, total }))
  }, [lastDayHeld, total])

  const saveDayCountInfo = () => {
    const totalUpdated = dayCountInfo.total + 1
    const dateUpdated = new Date()
    setDayCountInfo({
      total: totalUpdated,
      lastDayHeld: dateUpdated,
    })
    saveAccountantInfo(service, totalUpdated, dateUpdated)
  }

  const resetInfoDay = () => {
    const resetData = { total: 0, lastDayHeld: null }
    saveAccountantInfo(service, resetData.total, resetData.lastDayHeld)
    setDayCountInfo(resetData)
  }

  return {
    saveDayCountInfo,
    resetInfoDay,
    dayCountInfo,
  }
}
