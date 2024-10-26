import {
  DayCountInfo,
  DayCountPersistenceService,
} from '@/services/AccountDayPersistenceService'
import { saveAccountantInfo } from '@/useCases/saveAccountantInfo'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import completed from '../assets/completed.wav'

export function useDayCountInfo(service: DayCountPersistenceService) {
  const [dayCountInfo, setDayCountInfo] = useState<DayCountInfo>({
    total: 0,
    lastDayHeld: null,
  })

  useEffect(() => {
    const { lastDayHeld, total } = service.getAccountInfo()
    setDayCountInfo({ lastDayHeld, total })
  }, [service])

  function completedSound() {
    const sound = new Audio(completed)
    sound.volume = 1
    sound.play()
  }

  const onSaveDayCountInfo: () => number | null = () => {
    const totalUpdated = dayCountInfo.total + 1
    const dateUpdated = new Date()

    try {
      saveAccountantInfo(service, totalUpdated, dateUpdated)
      setDayCountInfo({
        total: totalUpdated,
        lastDayHeld: dateUpdated,
      })
      completedSound()
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
    onSaveDayCountInfo,
    setDayCountInfo,
    resetInfoDay,
    dayCountInfo,
  }
}
