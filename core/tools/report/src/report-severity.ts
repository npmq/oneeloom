import { createEnum, type EnumValue } from 'zenums'

/**
 * Defines the issue-level severity values supported by report issues.
 */
export const reportSeverityContract = createEnum(['error', 'warning'] as const)

export const REPORT_SEVERITIES = reportSeverityContract.constants

export type ReportSeverity = EnumValue<typeof reportSeverityContract>
