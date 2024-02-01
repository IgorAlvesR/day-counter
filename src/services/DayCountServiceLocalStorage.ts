import {
  DayCountPersistenceService,
  DayCountInfo,
} from './AccountDayPersistenceService'

export default class DayCountServiceLocalStorage
  implements DayCountPersistenceService
{
  getAccountInfo(): DayCountInfo {
    const storage = localStorage.getItem('day-counter')

    if (!storage) {
      return {
        total: 0,
        lastDayHeld: null,
      }
    }

    const accountDayInfo = JSON.parse(storage) as DayCountInfo

    return {
      total: accountDayInfo.total,
      lastDayHeld: accountDayInfo.lastDayHeld,
    }
  }

  save(total: number, lastDayHeld: Date): void {
    localStorage.setItem('day-counter', JSON.stringify({ total, lastDayHeld }))
  }
}
