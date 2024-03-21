import {
  DayCountInfo,
  DayCountPersistenceService,
} from '../services/AccountDayPersistenceService'

export function saveAccountantInfo(
  persistenceService: DayCountPersistenceService,
  total: number,
  lastDayHeld: Date | null,
) {
  const currentAccountInfo = persistenceService.getAccountInfo()
  const isEqualDate =
    currentAccountInfo.lastDayHeld?.toLocaleDateString() ===
    lastDayHeld?.toLocaleDateString()

  if (isEqualDate) {
    throw new Error('Você já registrou o dia de hoje.')
  }
  persistenceService.save(total, lastDayHeld)
}

export function editAccountantInfo(
  persistenceService: DayCountPersistenceService,
  total: number,
): DayCountInfo | null {
  return persistenceService.edit(total)
}
