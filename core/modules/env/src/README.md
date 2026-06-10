# Env Source Layout

This directory contains the source code of the `@oneeloom/env` package.

The env source tree grows implementation step by step.

The current public source tree exposes the initial contract layer and keeps future runtime layers documented until their contracts and implementation boundaries are ready.

---

## Current implementation

```text
src/
|- contract/
`- index.ts
```

The current implementation focuses on the bootstrap contract surface.

It defines how a service declares the initial rules for admitting raw environment input into the trusted validation flow.

---

## `contract/`

```text
contract/
|- bootstrap-method.ts
|- contract.ts
|- index.ts
|- input-args.ts
`- input-channel.ts
```

`contract/` defines the initial bootstrap contract surface of the env module.

It is responsible for:

- supported bootstrap methods;
- supported input channels;
- default bootstrap CLI argument keys;
- service-owned env contract shape;
- strict bootstrap policy;
- required schema contract.

The contract layer defines service-owned admission rules, allowed bootstrap methods, input channels, policy, and schema requirements.

Runtime layers use the contract as the source of allowed env behavior.

---

## Contract files

### `bootstrap-method.ts`

Defines the supported bootstrap methods:

- `file`;
- `process`;
- `explicit-plan`.

These methods describe how raw env input may enter the bootstrap validation flow.

### `input-channel.ts`

Defines the supported channels for resolving bootstrap values:

- `args`;
- `process`;
- `object`.

The default channel is fixed to `args`. Other channels are explicit opt-ins through the service contract.

### `input-args.ts`

Defines the default CLI argument keys used to resolve bootstrap values:

- `--env-method`;
- `--env-mode`.

These keys are platform defaults for the strict startup path.

### `contract.ts`

Defines the main env contract shape.

It includes:

- method contract;
- mode contract;
- schema requirement;
- strict bootstrap policy.

The contract is service-owned, but it must follow the platform rules defined by the env module.

### `index.ts`

Re-exports the public contract surface of the `contract/` layer.

It does not contain logic and should remain a clean barrel file.

---

## Documented source directions

The following source layers are documented as future implementation directions:

- `bootstrap/` — resolves method and mode into a bootstrap decision;
- `config/` — describes service-owned technical bindings for env input;
- `init/` — exposes module initialization entrypoints;
- `schema/` — runs schema validation before trusted output is created;
- `source/plan/` — builds source-specific loading plans;
- `source/validation/` — validates source plans before loading;
- `internal/` — contains private implementation details.

These layers will be added when their contracts and implementation boundaries are ready.

---

## Source boundary

The source layer is implementation-driven.

Current source folders reflect implemented module surface and documented implementation direction.

| Concern | Owner |
| --- | --- |
| Bootstrap contract surface | `src/contract/` |
| Runtime bootstrap resolution | future `src/bootstrap/` |
| Service-owned env bindings | future `src/config/` |
| Schema execution | future `src/schema/` |
| Source planning and validation | future `src/source/` |
| Controlled module initialization | future `src/init/` |
| Private implementation details | future `src/internal/` |
| Service-local env files and secrets | service-owned env inputs and external secret management |
| Runtime assembly | `core/composition/` and services |

The role of `src/` is to expose implemented env module layers while keeping future runtime work aligned with explicit contracts and documented boundaries.
