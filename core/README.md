# Core

`core/` is the open core of the Oneeloom platform.

It contains autonomous modules, supporting tools, integrations, composition areas, contracts, and shared rules required for building consistent services.

The purpose of `core/` is to keep the main platform foundations explicit, reusable, and independent from concrete service implementation.

## Current structure

```text
core/
|- modules/
|- tools/
|- integrations/
|- composition/
`- tests/
```

## Directory roles

| Directory | Role |
| --- | --- |
| `modules/` | Autonomous platform modules with their own contracts, rules, and responsibility boundaries |
| `tools/` | Supporting tools and shared technical foundations used by platform parts |
| `integrations/` | Connection points for external systems and protocols |
| `composition/` | Assembly area for connecting platform parts into controlled runtime flows |
| `tests/` | Shared validation area for core-level behavior |

## Implemented public areas

The current public implementation focuses on two core parts:

```text
core/modules/env/
core/tools/report/
```

### `modules/env`

`env` is a safety-focused module for controlling raw environment input.

It defines how environment input is allowed, checked, and validated before it can enter service configuration.

At the current public stage, the module exposes the bootstrap contract layer. Deeper runtime loading and validation logic will be added later.

### `tools/report`

`report` defines the shared reporting model used by platform modules.

It provides the common structure for report status, issue severity, structured issues, and module-level reports.

## Documented core directions

Some core areas are currently documented as platform directions:

- `composition/` — assembly and runtime coordination;
- `integrations/` — adapters and protocol bridges;
- `modules/logger/` — platform logging module;
- `modules/error/` — platform error module;
- `modules/config-creator/` — service configuration creation module;
- `assert/`, `guards/`, `normalization/`, and `serialization/` — supporting technical tools.

These areas define the intended core structure while implementation grows package by package.

## Boundary

`core/` is the shared platform foundation.

It provides reusable platform capabilities, technical tools, external integration points, composition areas, contracts, and shared rules.

| Concern | Owner |
| --- | --- |
| Platform modules | `core/modules/` |
| Supporting technical tools | `core/tools/` |
| External technology adapters | `core/integrations/` |
| Runtime assembly and coordination | `core/composition/` |
| Core-level validation | `core/tests/` |
| Concrete service behavior | `services/` |
| Repository infrastructure | `workspace/` and `scripts/` |
| Service-local configuration inputs | `services/<service-name>/configs/` and service env boundaries |

The role of `core/` is to provide the reusable platform foundation without becoming a concrete service.

## Architecture reference

For the full core structure model, see:

```text
../docs/architecture/core-structure.md
```
