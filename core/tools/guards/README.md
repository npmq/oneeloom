# Guards

`guards/` is the core tool area for shared runtime guard helpers.

This tool area supports platform code that needs small, reusable checks for narrowing unknown values into safer runtime shapes.

## Purpose

`guards/` may include shared support for:

- primitive value guards;
- object shape guards;
- array and record guards;
- safe narrowing helpers;
- guard-related technical types.

Guard helpers keep runtime narrowing predictable when platform modules, tools, tests, or diagnostics need lightweight checks before deeper validation.

## Boundary

`guards/` is a technical support tool.

It provides reusable helpers for narrowing unknown runtime values into safer technical shapes.

| Concern | Owner |
| --- | --- |
| Runtime guard helpers | `core/tools/guards/` |
| Module validation rules | `core/modules/` |
| Schema validation | Module-owned contracts or validation packages |
| Error representation | `core/modules/error/` |
| Report structure | `core/tools/report/` |
| Service-specific runtime behavior | `services/` |

The role of `guards/` is to support safe runtime narrowing while remaining a shared tool, not a platform module, schema system, or error layer.

## Architecture reference

For the full core structure model, see:

```text
../../../docs/architecture/core-structure.md
```
