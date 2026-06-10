# Report Model

## Purpose

`report` is the shared reporting tool for platform modules.

It defines a common technical shape for module reports when a module needs to return structured validation results, rejection output, aggregated issues, or module-level status.

The main purpose of `report` is to help modules describe validation, rejection, and diagnostic output in an inspectable and diagnostics-friendly format.

`report` is not the error layer, not the logger, and not a runtime decision system. It defines structured report output.

---

## Package position

`report` is located in:

```text
core/tools/report/
```

The package belongs to `tools/` because it provides shared technical support used by platform modules.

It gives modules a common reporting language without making each module invent its own report shape.

---

## Current package structure

```text
core/tools/report/
|- package.json
|- tsconfig.json
`- src/
   |- index.ts
   |- report-status.ts
   |- report-severity.ts
   |- report-issue.ts
   `- module-report.ts
```

---

## Model parts

The current report model consists of four main parts:

| Part | Role |
| --- | --- |
| `ReportStatus` | Final report result that shows whether module output was accepted or rejected |
| `ReportSeverity` | Issue-level severity used to distinguish errors from warnings inside a report |
| `ReportIssue` | Structured diagnostic issue emitted by a module for validation, rejection, or technical feedback |
| `ModuleReport` | Outer report container that groups module identity, final status, summary, and issues |

---

## `ReportStatus`

`ReportStatus` defines the final state of a report.

Current values:

- `accepted`;
- `rejected`.

The status model is binary because it describes the final outcome of the whole report.

Detailed validation state, warnings, and diagnostic context belong to report issues.

Warnings are represented through `ReportIssue.severity`, while `ReportStatus` remains responsible only for the final report outcome.

---

## `ReportSeverity`

`ReportSeverity` defines the severity level of a report issue.

Current values:

- `error`;
- `warning`.

Severity belongs to an individual `ReportIssue`.

It describes how important a specific issue is inside the report, while `ReportStatus` describes the final outcome of the whole report.

This separation keeps the report model clear:

- `ReportStatus` answers whether the report is accepted or rejected;
- `ReportSeverity` describes the importance of each reported issue.

A report may contain warnings as diagnostic context, but warnings do not replace the final report status.

---

## `ReportIssue`

`ReportIssue` defines one structured issue inside a report.

The issue model contains:

- `stage`;
- `code`;
- `message`;
- `severity`;
- optional `source`;
- optional `path`;
- required `details`.

`stage` identifies the module stage where the issue was produced.

`code` identifies the issue code in a deterministic way and may be used by tests, diagnostics, and predictable rejection output.

`message` explains the issue in a readable way.

`details` provides structured technical context so the issue does not collapse into plain text only.

---

## `ModuleReport`

`ModuleReport` defines the outer container of module report output.

The report model contains:

- `module`;
- `status`;
- `summary`;
- `issues`.

`ModuleReport` gives each module one structured report shape for both accepted and rejected results.

It connects the module identity, final report status, human-readable summary, and collected issues into one diagnostics-friendly output.

An accepted report may confirm that module processing completed successfully.

A rejected report may describe why module processing failed and provide the collected issues that explain the rejection.

`ModuleReport` does not decide runtime behavior by itself.

It describes the module result so the caller, composition layer, logger, or error layer can handle that result through their own responsibility boundaries.

---

## Responsibility split

The report tool defines the shared report shape.

The emitting module defines the actual meaning of the report.

This means:

- `report` defines status, severity, issue shape, and report container;
- the module defines its module name, stages, issue codes, messages, and details;
- the module decides when and why a report is produced.

This keeps the report layer reusable while preserving module ownership over module-specific rules.

---

## Module usage

The primary usage of `report` is module-level validation and rejection output.

A module may use reports to describe:

- invalid bootstrap input;
- failed contract validation;
- rejected configuration input;
- invalid source plan;
- aggregated validation issues;
- module processing results.

The `env` module is one of the main users of this model because it requires structured, deterministic, and secret-safe rejection output.

Future modules such as `config-creator`, `logger`, or `error` may also use report output when they need structured module-level diagnostics.

---

## Possible wider usage

Although the primary target is platform modules, the same report shape may later be reused by services or runtime flows when they need aggregated technical output.

This usage should preserve the module-focused responsibility of the report tool and must not turn reports into a general application response format.

The report model should remain a shared technical output shape.

---

## Secret-safety

Report output must be safe to inspect, store, test, and pass to diagnostics.

Report issues must not expose unredacted secrets, credentials, tokens, private keys, raw environment values, or sensitive runtime data.

Modules that emit reports are responsible for sanitizing `message`, `details`, `source`, and `path` before returning report output.

This is especially important for modules that work with environment input, service configuration, runtime diagnostics, or external integration settings.

---

## Behavioral boundary

`report` describes structured output.

It does not decide runtime behavior.

A report may describe that something was accepted or rejected, but the emitting module or runtime flow decides what happens next.

The emitting module is responsible for deciding what data is safe to place into report fields before report output is returned.

`report` should not perform logging, throw errors by itself, recover from failures, sanitize module data automatically, or own runtime policy.

---

## Relation to `error` and `logger`

`report`, `error`, and `logger` have different platform roles.

```text
report  -> describes structured module output
error   -> represents failures and thrown errors
logger  -> emits structured runtime events
```

A report can be logged.

A rejected report can be wrapped into an error.

Creating a report does not mean that logging happened, an error was thrown, or runtime execution was stopped.

---

## Design direction

The report model should remain a shared technical reporting shape for platform modules.

It may later grow with small helpers, builders, or formatters when modules repeatedly need the same reporting support.

Any growth should preserve:

- module-focused output;
- predictable report structure;
- deterministic issue fields;
- diagnostics-friendly details;
- secret-safe report data;
- separation from logging, thrown errors, and runtime policy.

The report tool may help modules build or format report output, but it must not decide what the runtime should do next.

---

## Short conclusion

`report` is the shared reporting tool for platform modules.

It gives modules a common way to describe accepted output, rejected output, and aggregated technical issues.

The main value of `report` is that module output stays structured, readable, diagnostics-friendly, deterministic, and safe to inspect.

A report can later be logged, wrapped into an error, or used by runtime flow, but the report tool itself only describes what happened.

This keeps module reporting clear, reusable, and separated from logging, thrown errors, and runtime decisions.
