# Composition

`composition/` is the core area for assembling existing platform parts into controlled runtime flows.

This area connects already-defined modules, tools, and integrations through explicit assembly and coordination logic.

## Purpose

`composition/` may include shared support for:

- flow definitions;
- assembly entrypoints;
- runtime coordination logic;
- composition-level tests;
- wiring between existing core parts.

Composition keeps runtime assembly visible by connecting existing platform parts without moving their ownership into the assembly layer.

## Boundary

`composition/` is an assembly and coordination area.

It connects existing platform parts into controlled runtime flows.

| Concern | Owner |
| --- | --- |
| Runtime assembly and coordination | `core/composition/` |
| Platform module behavior | `core/modules/` |
| Supporting technical tools | `core/tools/` |
| External technology adapters | `core/integrations/` |
| Concrete service behavior | `services/` |
| Service-specific runtime entrypoints | `services/<service-name>/src/` |

The role of `composition/` is to assemble and coordinate existing platform parts while keeping module behavior, integration internals, and service-specific logic in their own responsibility areas.

## Architecture reference

For the full core structure model, see:

```text
../../docs/architecture/core-structure.md
```
