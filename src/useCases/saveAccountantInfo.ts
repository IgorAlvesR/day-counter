import { DayCountPersistenceService } from '../services/AccountDayPersistenceService'

export function saveAccountantInfo(
  persistenceService: DayCountPersistenceService,
  total: number,
  lastDayHeld: Date | null,
) {
  persistenceService.save(total, lastDayHeld)
}
