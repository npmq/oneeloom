import { createEnum, type EnumValue } from 'zenums'

/**
 * Defines the final status values supported by a report container.
 */
export const reportStatusContract = createEnum(['accepted', 'rejected'] as const)

export const REPORT_STATUSES = reportStatusContract.constants

export type ReportStatus = EnumValue<typeof reportStatusContract>
