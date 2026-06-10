# Examples

`examples/` is the reference usage area of the Oneeloom platform.

Examples show how platform parts may be used together in clear, inspectable, and non-production scenarios.

## Purpose

`examples/` may include reference usage for:

- core module usage;
- integration usage;
- composition scenarios;
- service setup patterns;
- workspace and configuration patterns.

Examples help contributors understand platform usage without replacing architecture documentation, module documentation, service documentation, or source-level contracts.

## Example areas

Example implementations may be added when they clarify a real platform usage pattern.

Each example should have a clear purpose, limited scope, and visible relation to the documented platform model.

## Boundary

`examples/` is an illustrative reference area.

Examples demonstrate usage patterns and do not own platform runtime behavior.

| Concern | Owner |
| --- | --- |
| Reference usage examples | `examples/` |
| Platform architecture model | `docs/architecture/` |
| Platform module behavior | `core/modules/` |
| Shared technical tools | `core/tools/` |
| External technology adapters | `core/integrations/` |
| Runtime assembly and coordination | `core/composition/` |
| Concrete service behavior | `services/` |
| Repository infrastructure | `workspace/` and `scripts/` |
| Environment secrets | Local environment inputs and external secret management |

The role of `examples/` is to clarify platform usage while keeping architecture rules, runtime behavior, contracts, and production configuration in their own responsibility areas.
