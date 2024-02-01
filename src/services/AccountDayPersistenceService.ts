export type DayCountInfo = {
  total: number
  lastDayHeld: Date | null
}

export interface DayCountPersistenceService {
  save(total: number, lastDayHeld: Date | null): void
  getAccountInfo(): DayCountInfo
}
