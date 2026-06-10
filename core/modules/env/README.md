# Env Module

`env` is the environment admission module of Oneeloom.

It defines the boundary where raw configuration input is admitted into the trusted platform zone.

The module controls how environment input is declared, allowed, checked, and prepared before it can become part of service configuration.

---

## Current status

The current public implementation contains the initial bootstrap contract layer.

Implemented now:

- bootstrap method contract;
- input channel contract;
- default bootstrap CLI argument keys;
- service-owned env contract shape;
- strict bootstrap policy;
- required schema contract.

Runtime loading, source resolution, schema execution, and rejected report generation are later implementation stages.

---

## Core idea

Raw env input is not trusted.

Before any environment value may become part of service configuration, the platform must know:

- which bootstrap method is used;
- which mode is used;
- which input channel is allowed;
- which schema is required;
- and which strict policy rules must be followed.

This keeps startup explicit and prevents hidden configuration paths.

---

## Bootstrap contract rules

The current contract model fixes these rules:

- `method` is required;
- `mode` is required;
- bootstrap method is never inferred from input shape;
- bootstrap mode is never inferred implicitly;
- mixed bootstrap methods are not allowed;
- fallback between methods is not allowed;
- schema validation is required;
- override input channels must be explicitly allowed.

These rules are intentionally strict because `env` is the first trust boundary for service configuration.

---

## Supported bootstrap methods

The current method contract supports:

- `file`;
- `process`;
- `explicit-plan`.

Only one method may be active for one bootstrap run.

The method must be explicit. It must not be guessed from available fields, existing files, process variables, or object shape.

---

## Input channels

The supported input channels are:

- `args`;
- `process`;
- `object`.

The default input channel is `args`.

Other channels are treated as explicit override channels and must be allowed by the service-owned contract.

This prevents process input or object input from becoming hidden startup behavior by accident.

---

## Default bootstrap CLI keys

The default CLI argument keys are:

```text
--env-method
--env-mode
```

These keys are used to resolve bootstrap `method` and `mode` from the default args channel.

They are part of the platform bootstrap language and exist to keep service startup visible, script-friendly, and predictable.

---

## Layer boundaries

The env module is designed as a layered admission pipeline.

The current public implementation contains only the first layer:

```text
contract/
```

The planned runtime pipeline will be added later through separate internal layers.

Each layer has its own responsibility:

| Layer | Responsibility |
| --- | --- |
| `contract/` | Defines allowed bootstrap methods, input channels, policy, schema requirement, and service-owned contract shape |
| `bootstrap/` | Resolves required bootstrap values such as `method` and `mode` according to the contract |
| `source/plan/` | Builds the source-specific plan for the selected method |
| `source/validation/` | Validates the selected source plan before loading |
| `schema/` | Validates loaded values against the required service schema |
| `init/` | Provides the module entrypoint for controlled initialization |
| `internal/` | Holds private implementation details that are not part of the public package surface |

The contract layer defines service-owned admission rules, allowed bootstrap methods, input channels, policy, and schema requirements.

Runtime layers use the contract as the source of allowed env behavior.

This keeps env admission explicit, testable, and separated from later runtime loading, source resolution, and schema execution.

---

## Source layout

```text
src/
|- contract/
`- index.ts
```

The current implementation intentionally exposes only the contract layer.

Planned runtime layers are described in:

```text
src/README.md
```

---

## Architecture reference

For the full env architecture model, see:

```text
../../../docs/modules/env/README.md
```
