import {
  DayCountInfo,
  DayCountPersistenceService,
} from './AccountDayPersistenceService'

export default class DayCountServiceLocalStorage
  implements DayCountPersistenceService
{
  edit(total: number): DayCountInfo | null {
    const storage = localStorage.getItem('day-counter')
    if (!storage) return null

    const lastDayHeld = JSON.parse(storage).lastDayHeld
    if (!lastDayHeld) return null

    localStorage.setItem('day-counter', JSON.stringify({ total, lastDayHeld }))
    return { total, lastDayHeld }
  }

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
