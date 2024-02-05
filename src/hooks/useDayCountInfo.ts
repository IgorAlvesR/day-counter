import {
  DayCountInfo,
  DayCountPersistenceService,
} from '@/services/AccountDayPersistenceService'
import { saveAccountantInfo } from '@/useCases/saveAccountantInfo'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export function useDayCountInfo(service: DayCountPersistenceService) {
  const [dayCountInfo, setDayCountInfo] = useState<DayCountInfo>({
    total: 0,
    lastDayHeld: null,
  })

  useEffect(() => {
    const { lastDayHeld, total } = service.getAccountInfo()
    setDayCountInfo({ lastDayHeld, total })
  }, [service])

  const saveDayCountInfo: () => number | null = () => {
    const totalUpdated = dayCountInfo.total + 1
    const dateUpdated = new Date()

    try {
      saveAccountantInfo(service, totalUpdated, dateUpdated)
      setDayCountInfo({
        total: totalUpdated,
        lastDayHeld: dateUpdated,
      })
      return totalUpdated
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Ops!', {
          description: error.message,
          closeButton: true,
        })
      }
      return null
    }
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
