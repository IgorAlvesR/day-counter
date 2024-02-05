import {
  DayCountPersistenceService,
  DayCountInfo,
} from './AccountDayPersistenceService'

export default class DayCountServiceLocalStorage
  implements DayCountPersistenceService
{
  getAccountInfo(): DayCountInfo {
    const storage = localStorage.getItem('day-counter')

    if (!storage || !JSON.parse(storage).lastDayHeld) {
      return {
        total: 0,
        lastDayHeld: null,
      }
    }
    const accountDayInfo = {
      total: JSON.parse(storage).total,
      lastDayHeld: new Date(JSON.parse(storage).lastDayHeld),
    } as DayCountInfo
    return accountDayInfo
  }

  save(total: number, lastDayHeld: Date): void {
    localStorage.setItem('day-counter', JSON.stringify({ total, lastDayHeld }))
  }
}
