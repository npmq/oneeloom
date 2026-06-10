# Tools

`tools/` contains supporting technical tools and shared foundations used across the core and services.

Tools provide shared technical support that keeps core layers and services consistent, predictable, and easier to maintain.

## Current tool areas

| Tool | Role |
| --- | --- |
| `report/` | Shared reporting model for structured module reports and issue output |
| `assert/` | Shared assertion helpers and invariant checks |
| `guards/` | Reusable runtime guard helpers |
| `normalization/` | Predictable technical value cleanup |
| `serialization/` | Stable technical output conversion |

## Boundary

`tools/` is the shared technical support layer of the core.

Tools provide reusable technical foundations for modules, integrations, composition, services, and tests.

| Concern | Owner |
| --- | --- |
| Shared technical tools | `core/tools/` |
| Platform module behavior | `core/modules/` |
| External technology adapters | `core/integrations/` |
| Runtime assembly and coordination | `core/composition/` |
| Concrete service behavior | `services/` |

The role of `tools/` is to keep reusable technical support visible, shared, and separated from platform behavior ownership.

## Architecture reference

For the full core structure model, see:

```text
../../docs/architecture/core-structure.md
```
