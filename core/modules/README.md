# Modules

`modules/` contains autonomous platform modules with their own contracts, rules, and responsibility boundaries.

Modules represent platform capabilities with explicit ownership and local rules.

## Current module areas

| Module | Role |
| --- | --- |
| `env/` | Safety-focused module for admitting raw environment input into trusted service configuration |
| `config-creator/` | Module direction for creating trusted service configuration from validated inputs |
| `error/` | Module direction for platform-level error representation and failure modeling |
| `logger/` | Module direction for platform-level logging and structured runtime events |

## Module role

Modules own platform capabilities with their own contracts, rules, and responsibility boundaries.

They provide reusable platform behavior that services can consume through explicit package and contract boundaries.

## Architecture reference

For the full core structure model, see:

```text
../../docs/architecture/core-structure.md
```
