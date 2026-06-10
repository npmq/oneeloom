import type { ReportIssue } from './report-issue'
import type { ReportStatus } from './report-status'

/**
 * Defines the top-level structured report emitted by a platform module.
 */
export type ModuleReport<TStage extends string = string> = {
  module: string
  status: ReportStatus
  summary: string
  issues: readonly ReportIssue<TStage>[]
}
