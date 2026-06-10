# Report Tool

`report` is the shared structured reporting tool of the Oneeloom core.

It defines a common output shape for platform modules when they need to emit validation results, rejection output, aggregated issues, or module-level status information.

`report` is a technical support tool. It is not a logger, not an error system, and not a runtime policy layer.

## Current public status

The current implementation exposes the core report primitives:

- final report status values;
- issue-level severity values;
- structured report issue shape;
- top-level module report container;
- runtime constants and contracts for status and severity values.

The package currently exposes a small flat source structure focused on shared reporting primitives.

## Source layout

```text
src/
|- index.ts
|- module-report.ts
|- report-issue.ts
|- report-severity.ts
`- report-status.ts
```

## Report primitives

### `ReportStatus`

`ReportStatus` defines the final state of a report container.

Current values:

- `accepted`;
- `rejected`.

The status model is binary because it describes the final outcome of the whole report. Warnings are represented through issue severity, while the final report status remains either `accepted` or `rejected`.

### `ReportSeverity`

`ReportSeverity` defines the issue-level severity language used inside report issues.

Current values:

- `error`;
- `warning`.

Severity does not define the final report result. It describes the importance of a single issue.

### `ReportIssue`

`ReportIssue` defines one structured issue emitted inside a module report.

It contains:

- `stage` — module-defined stage where the issue was produced;
- `code` — deterministic issue code;
- `message` — readable diagnostic message;
- `severity` — shared issue-level severity;
- `source` — optional source reference;
- `path` — optional path reference;
- `details` — required diagnostic payload.

`details` is required so report output remains useful for diagnostics, validation, and deterministic rejection output.

### `ModuleReport`

`ModuleReport` defines the top-level structured report emitted by a platform module.

It contains:

- `module` — module identity;
- `status` — final report status;
- `summary` — readable summary;
- `issues` — readonly collection of structured issues.

The issue collection is readonly because a final report is output state, not builder state. Internal builders may collect issues before producing the final report, but the report shape itself should remain stable after creation.

## Boundary

The report tool defines structured output.

It describes report status, issue severity, structured issues, and module report containers.

Runtime behavior, logging, thrown errors, recovery, module-specific issue taxonomies, and runtime diagnostics policy remain owned by the emitting module or the corresponding platform layer.

## Relation to other core parts

```text
report       -> describes structured state and issues
logger       -> outputs events
error        -> models failures and thrown errors
composition  -> decides runtime flow
```

This separation keeps reports reusable, deterministic, and safe to consume across modules.

## Package boundary

The package entrypoint is:

```text
src/index.ts
```

It exports the current public report surface directly because `report` is currently a flat technical tool package.
