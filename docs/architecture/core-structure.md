# Core Structure

## Purpose of `core/`

`core/` is the open core of the Oneeloom platform.

The core contains reusable platform layers that:

- do not belong to any single service;
- form the shared architectural foundation;
- are used as the base for runtime assembly and further platform growth.

`core/` is the architectural center of Oneeloom and defines the internal structure of platform capabilities, technical tools, integrations, and composition.

---

## Structure of `core/`

```text
core/
|- modules/
|- tools/
|- integrations/
|- composition/
`- tests/
```

---

## Layer model

| Layer | Purpose | Contains |
| --- | --- | --- |
| `modules/` | Platform capabilities | Modules with their own role, contracts, and internal logic |
| `tools/` | Technical support layer | Reusable technical tools and shared contracts |
| `integrations/` | External technology connection points | Adapters and bridges to external systems and technologies |
| `composition/` | Assembly and coordination layer | Runtime assembly, flows, assembly, and orchestration logic |
| `tests/` | Shared core test zone | Unit, integration, and fixture layers for core validation |

---

## Dependency direction

Inside `core/`, dependencies should remain explicit and controlled.

The general dependency model is:

```text
tools          -> lowest shared technical layer
modules        -> platform capabilities built on tools
integrations   -> external adapters and protocol bridges
composition    -> assembly layer for existing parts
tests          -> validation layer
```

The following rules are fixed:

- `tools/` must remain independent from higher layers.
- `tools/` must not depend on `modules/`, `integrations/`, or `composition/`.
- `modules/` may depend on `tools/`.
- `modules/` must not depend on `composition/`.
- `integrations/` may depend on `tools/` and shared contracts.
- `integrations/` must not depend on `composition/`.
- `composition/` may assemble `modules/`, `tools/`, and `integrations/`.
- lower layers must not depend on `composition/`.

This keeps the core stable, testable, and safe to grow.

---

## `modules/`

`modules/` contains platform modules.

In the context of Oneeloom, a module is a reusable platform capability with its own responsibility zone, its own contracts, and its own internal logic.

Current module directions:

- `env/`
- `logger/`
- `error/`
- `config-creator/`

### Modules: layer responsibility

The `modules/` layer is responsible for:

- platform capabilities;
- internal contracts and entrypoints;
- rules and constraints of the specific module;
- local correctness model;
- controlled interaction with other core layers.

### What belongs in a module

A module may include:

- internal logic;
- contracts;
- validation;
- policy rules;
- report generation;
- safe entrypoints;
- internal types and structures.

### What does not belong in `modules/`

`modules/` must not contain:

- random low-level helpers;
- technical utilities without their own platform role;
- service-specific solutions;
- logic that exists only for one adapter or one integration.

### Bootstrap-safe modules

Some modules may participate in the early boot process.

Bootstrap-safe modules must not depend on external integrations or runtime-only dependencies.

For example, early environment validation and basic logging must remain usable before the final service config, external connections, and runtime dependencies are available.

This constraint protects the service boot flow from hidden external dependencies.

---

## `tools/`

`tools/` contains the technical support layer of the core.

This layer is intended for reusable technical units that are not standalone platform modules but still form the shared technical foundation of the core.

Current directions:

- `assert/`
- `guards/`
- `normalization/`
- `serialization/`
- `report/`

### Tools: layer responsibility

The `tools/` layer is responsible for:

- general-purpose technical tools;
- shared low-level contracts;
- supporting structures for modules and other core parts;
- a unified technical base without domain specialization.

### What belongs in `tools/`

`tools/` includes:

- low-level contracts;
- checks;
- technical abstractions;
- shared utilities;
- reusable technical packages.

### What does not belong in `tools/`

`tools/` must not contain:

- modules with their own platform role;
- business-shaped capabilities;
- runtime orchestration;
- external integrations;
- service-specific logic.

### Example: `report/`

The `report/` package belongs to `tools/` because it:

- defines a shared reporting contract;
- is used by different modules;
- provides a unified technical report format;
- is not a standalone platform capability like `env` or `logger`.

`report/` must not decide module behavior, recover from errors, perform logging, or own runtime diagnostics policy.

It only provides shared structures for reporting states, issues, statuses, and severities.

The responsibility split is:

```text
report/       -> describes state
logger/       -> outputs events
error/        -> models failures
composition/  -> decides whether startup continues or stops
```

---

## `integrations/`

`integrations/` contains the external technology connection points of the platform.

This layer is intended for working with external systems and technologies through explicit and controlled adapters.

Current directions:

- `grpc/`
- `kafka/`
- `redis/`
- `http/`

### Layer responsibility

The `integrations/` layer is responsible for:

- adapting external APIs and protocols;
- isolating external technological complexity;
- providing the platform with controlled interfaces for working with external systems.

### What belongs in `integrations/`

`integrations/` includes:

- adapters;
- transport-specific wrappers;
- integration contracts;
- technical bridges to external systems.

### What does not belong in `integrations/`

`integrations/` must not contain:

- service-specific hacks;
- hidden business logic;
- internal module logic;
- composition-level assembly logic.

### Integration boundary

Modules may depend on integrations only when the dependency is part of the module's explicit platform responsibility and is exposed through a controlled contract.

Integrations must not contain module logic.

External technological complexity must remain isolated inside integration adapters and must not leak into service-specific code or core module internals.

---

## `composition/`

`composition/` contains the assembly and coordination layer of the core.

This layer is responsible for the controlled assembly of platform parts and for runtime-oriented coordination.

Current structure:

- `flows/`
- `assembly/`
- `runtime/`
- `tests/`

### Composition: layer responsibility

The `composition/` layer is responsible for:

- assembling platform parts;
- orchestration flows;
- runtime coordination;
- controlled connections between core layers;
- execution-oriented composition.

### Sub-layer roles

- `flows/` - flow models and orchestration sequences
- `assembly/` - assembly points and connection of platform parts
- `runtime/` - runtime-oriented execution logic of composition
- `tests/` - validation of composition scenarios

### Layer boundary

`composition/` is not a module and does not replace modules.

It does not form a standalone platform capability; it coordinates the parts that already exist in the core.

`composition/` connects already-defined contracts and instances.

It must not create hidden contracts, redefine module rules, or move module-specific behavior into the assembly layer.

---

## `tests/`

`core/tests/` contains the shared core test zone.

Current structure:

- `unit/`
- `integration/`
- `fixtures/`

### Tests: layer responsibility

The `tests/` layer is responsible for:

- unit validation of shared core parts;
- integration validation at the core level;
- shared fixtures;
- shared testing support for validating platform layers.

### What belongs in `tests/`

`tests/` includes:

- unit test zones;
- integration test zones;
- shared fixtures;
- shared testing support structures.

### What does not belong in `tests/`

`tests/` must not contain:

- hidden runtime logic;
- a second undocumented composition system;
- logic that belongs in `modules/`, `tools/`, or `composition/`.

---

## Interaction model inside `core/`

### `modules/` and `tools/`

- `modules/` may depend on `tools/`.
- `tools/` support `modules/`.
- `tools/` do not replace modules.

### `modules/` and `integrations/`

- modules may depend on integrations only through controlled and explicit boundaries;
- integrations must not contain module logic;
- bootstrap-safe modules must not depend on external integrations.

### `composition/` and the other layers

- `composition/` assembles `modules/`, `tools/`, and `integrations/`.
- `composition/` coordinates runtime links.
- `composition/` does not replace any of the base layers.
- `composition/` must not redefine contracts owned by modules.

### `tests/` and the core

- `tests/` validates the core layers.
- `tests/` does not form an independent architectural behavior layer.

---

## Placement rule

When adding a new core package, choose the layer by responsibility:

- if it provides a platform capability, place it in `modules/`;
- if it provides reusable technical support, place it in `tools/`;
- if it adapts an external technology, place it in `integrations/`;
- if it assembles existing parts into runtime behavior, place it in `composition/`;
- if it validates core behavior, place it in `tests/`.

A package must not be placed by convenience only.

Its location must match its responsibility, ownership, and dependency direction.

---

## Architectural constraints inside `core/`

The following constraints are fixed inside `core/`:

- platform capabilities are not mixed with technical tools without reason;
- external integrations are not hidden inside modules or services;
- composition does not become an undefined common layer;
- tests do not become a hidden execution environment;
- reports describe state but do not decide behavior;
- bootstrap-safe modules do not depend on runtime-only external integrations;
- lower layers do not depend on `composition/`;
- core layers grow through clear boundaries and explicit ownership of responsibility.

---

## Growth model for `core/`

The growth of `core/` is expected to include:

- new modules;
- new technical tools;
- new integrations;
- richer composition patterns;
- stronger shared contracts and internal rules.

The core must grow through:

- clear addition of new packages;
- agreed contracts;
- fixed layer boundaries;
- documented architectural logic;
- explicit dependency rules.

---

## Short conclusion

`core/` is the open core of the Oneeloom platform.

Its internal structure separates:

- platform modules;
- technical tools;
- external integrations;
- the composition layer;
- and the shared test zone.

This structure fixes the architectural order of the core and defines how the platform must grow inside its center.

Every new core package must be added by responsibility, not by convenience.
