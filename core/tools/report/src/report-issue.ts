import type { ReportSeverity } from './report-severity'

/**
 * Defines one structured issue emitted inside a module report.
 */
export type ReportIssue<TStage extends string = string> = {
  stage: TStage
  code: string
  message: string
  severity: ReportSeverity
  source?: string
  path?: string
  details: Readonly<Record<string, unknown>>
}
