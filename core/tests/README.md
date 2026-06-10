# Core Tests

`tests/` is the shared core-level test area of the Oneeloom platform.

This area validates core behavior across modules, tools, integrations, and composition scenarios.

## Purpose

`tests/` may include shared support for:

- unit tests for core packages;
- integration tests between core parts;
- shared fixtures;
- shared testing utilities;
- core-level validation scenarios.

Core tests help verify that platform foundations work correctly across package boundaries and remain aligned with the core architecture.

## Boundary

`tests/` is a core validation area.

It provides shared tests, fixtures, and validation support for core-level behavior.

| Concern | Owner |
| --- | --- |
| Core-level validation | `core/tests/` |
| Module implementation | `core/modules/` |
| Tool implementation | `core/tools/` |
| Integration adapters | `core/integrations/` |
| Runtime assembly and coordination | `core/composition/` |
| Concrete service behavior | `services/` |

The role of `tests/` is to validate core behavior while remaining a test area, not a runtime architecture layer.

## Architecture reference

For the full core structure model, see:

```text
../../docs/architecture/core-structure.md
```
