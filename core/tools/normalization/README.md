# Normalization

`normalization/` is the core tool area for shared normalization helpers.

This tool area supports platform code that needs predictable value cleanup before validation, comparison, or structured output.

## Purpose

`normalization/` may include shared support for:

- string normalization helpers;
- key normalization helpers;
- path normalization helpers;
- safe trimming and casing helpers;
- normalization-related technical types.

Normalization helpers keep technical value cleanup predictable when platform modules, tools, tests, or diagnostics need consistent input preparation.

## Boundary

`normalization/` is a technical support tool.

It provides reusable helpers for preparing technical values before validation, comparison, or structured output.

| Concern | Owner |
| --- | --- |
| Normalization helpers | `core/tools/normalization/` |
| Module validation rules | `core/modules/` |
| Report structure | `core/tools/report/` |
| Serialization helpers | `core/tools/serialization/` |
| Service-specific formatting | `services/` |
| Runtime assembly and coordination | `core/composition/` |

The role of `normalization/` is to support predictable technical cleanup while remaining a shared tool, not a platform module or service.

## Architecture reference

For the full core structure model, see:

```text
../../../docs/architecture/core-structure.md
```
