# Integrations

`integrations/` is the core area for external technology connection points.

This area provides controlled adapters and bridges for working with external systems, protocols, clients, and infrastructure technologies.

## Purpose

`integrations/` may include shared support for:

- HTTP adapters;
- gRPC adapters;
- Kafka adapters;
- Redis adapters;
- external client wrappers;
- protocol-specific integration contracts;
- other external systems required by the platform.

Integrations keep external technology access explicit and isolated behind controlled platform boundaries.

## Boundary

`integrations/` is an external technology boundary.

It provides adapters and bridges for external systems without owning module behavior or service business logic.

| Concern | Owner |
| --- | --- |
| External technology adapters | `core/integrations/` |
| Platform module behavior | `core/modules/` |
| Supporting technical tools | `core/tools/` |
| Runtime assembly and coordination | `core/composition/` |
| Concrete service behavior | `services/` |
| Service-specific integration usage | `services/<service-name>/` |

The role of `integrations/` is to keep external access controlled, explicit, and separated from modules, services, and runtime assembly.

## Architecture reference

For the full core structure model, see:

```text
../../docs/architecture/core-structure.md
```
