# Service Model

## Purpose

`services/` contains independent application units built on top of the platform core.

A service owns its application behavior, local package boundary, contracts, configs, source code, and tests.

The service model keeps service creation predictable while allowing each service to evolve according to its real needs.

---

## Service role

A service is a concrete application unit of the platform.

It may represent an HTTP API, web client, admin panel, background worker, bot, notification worker, integration-facing application, or another deployable application area.

Each service is expected to have:

- its own package boundary;
- its own source code;
- its own service-owned contracts;
- its own service-owned configs;
- its own tests;
- its own local documentation;
- and its own runtime entrypoints when implementation is added.

This makes services independent enough to grow separately while keeping their external structure consistent across the repository.

---

## Standard service structure

The current service outer structure is:

```text
services/<service-name>/
|- src/
|- tests/
|- contracts/
|- configs/
|- package.json
|- tsconfig.json
|- README.md
`- .env
```

This structure defines the standard outer shape of a service.

The internal structure of `src/` remains flexible and may reflect the purpose and implementation needs of each concrete service.

---

## Service creation

New services should start from the standard service creation script.

The current setup script is:

```text
scripts/setup/create-service.sh
```

The script creates the baseline service files and folders:

- `src/`;
- `tests/`;
- `contracts/`;
- `configs/`;
- `package.json`;
- `tsconfig.json`;
- `README.md`;
- `.env`;
- empty entrypoint files.

This keeps service creation consistent across the repository and prevents small structural differences between services at the starting point.

After creation, a service may develop according to its purpose, but its initial shape should follow the shared service model.

---

## Structure roles

| Element | Role |
| --- | --- |
| `src/` | Service implementation area |
| `tests/` | Service-level test surface |
| `contracts/` | Service-owned contracts and boundary definitions |
| `configs/` | Service-owned configuration bindings and technical settings |
| `package.json` | Service package boundary, scripts, and dependencies |
| `tsconfig.json` | Service TypeScript configuration |
| `README.md` | Service-local documentation and orientation |
| `.env` | Local raw environment input used through the controlled env/config boundary |

---

## `src/` flexibility

`src/` is the service implementation area.

Its internal structure remains flexible because different services may require different implementation shapes.

A web client, API service, worker, admin panel, or integration-facing service may organize its source code differently according to its purpose.

The shared service rule is that implementation details stay inside `src/`, while service-owned contracts and configs stay in the outer service layers.

---

## Contracts and configs

Services separate boundary rules from concrete configuration bindings:

```text
contracts/
configs/
```

`contracts/` contains service-owned rules, allowed shapes, and boundary definitions.

`configs/` contains service-owned technical bindings, mappings, and configuration settings.

This separation is important for modules such as `env`, where admission rules and concrete configuration inputs must remain distinct.

For example:

```text
contracts/env-contract.ts
configs/env-config.ts
```

The exact files may differ between services, but the placement rule stays stable:

- rules and allowed shapes belong in `contracts/`;
- concrete technical bindings belong in `configs/`.

---

## Package boundary

Each service owns its own `package.json`.

The package file defines:

- the service package name;
- service scripts;
- direct service dependencies;
- workspace package dependencies;
- and the service package boundary.

A service should depend on shared platform packages explicitly, for example:

```json
{
  "dependencies": {
    "@oneeloom/env": "workspace:*",
    "@oneeloom/report": "workspace:*"
  }
}
```

Workspace dependencies keep service wiring explicit and readable.

The service package should clearly show which shared platform packages and external dependencies the service uses.

---

## TypeScript configuration

Each service owns a local `tsconfig.json`.

The local config should extend the shared workspace TypeScript base and include the service-owned areas:

```json
{
  "extends": "@oneeloom/tsconfig/configs/base.json",
  "include": ["src", "tests", "contracts", "configs"]
}
```

The service config may add service-specific compiler settings when implementation requires them.

Shared TypeScript rules stay in the workspace config package, while service-specific compiler needs stay local to the service.

---

## Environment input boundary

Service-local environment input is raw input.

A service may use `.env` files, process environment values, CLI arguments, or explicit bootstrap objects according to its env contract and config.

These inputs must pass through the controlled `env/config` boundary before they become trusted service configuration.

```text
raw input -> env admission -> validated environment model -> service configuration
```

This keeps service configuration explicit, validated, and aligned with the platform trust model.

---

## Runtime assembly

A service should start through an explicit runtime assembly flow.

Runtime assembly connects the service entrypoint with the required platform parts, such as environment admission, configuration creation, logging, reporting, integrations, and service dependencies.

The exact startup shape may differ between service types.

The shared rule is that service startup should remain readable, testable, and aligned with documented platform contracts.

---

## Relation to core

Services use core modules, tools, contracts, integrations, and composition patterns through explicit package and contract boundaries.

`core/` provides shared platform capabilities, safety rules, and reusable technical foundations.

Services use these foundations to build concrete application behavior while keeping service-specific implementation local.

This interaction keeps services flexible in implementation while preserving shared platform rules and predictable integration with the core.

---

## Tests

Each service owns its own test surface.

A new service may start with a smoke test that verifies the service entrypoint remains importable before runtime logic is added.

Example:

```ts
import { describe, expect, test } from 'bun:test'

// Smoke coverage for the service boundary before runtime logic is added.
describe('service entrypoint', () => {
  test('keeps the source entrypoint importable', async () => {
    const module = await import('../src/index')

    expect(module).toBeDefined()
  })
})
```

As implementation grows, service tests may cover runtime setup, config validation, handlers, integration boundaries, and service-specific behavior.

---

## Boundary

`services/` is the application layer of the platform.

Services own concrete application behavior, runtime entrypoints, service-local contracts, service-local configs, package dependencies, and service-specific tests.

The role of `services/` is to host independent application units that use shared platform capabilities through explicit package and contract boundaries.

---

## Service areas

The service tree may contain implemented services and planned service areas.

Current service areas include:

| Service | Role |
| --- | --- |
| `public-api/` | Implemented service skeleton for the public API boundary |
| `auth-service/` | Service area for authentication, identity, and access-control flows |
| `client-web/` | Service area for the client-facing web application |
| `admin-panel/` | Service area for administrative interfaces and internal control surfaces |
| `notification-service/` | Service area for notification delivery and messaging flows |

Service areas may represent different application types: public APIs, authentication services, web clients, administrative interfaces, background workers, notification pipelines, or other platform-facing services.

The service model is intended to support both simple service skeletons and production-grade services that may later handle serious runtime responsibilities, higher load, integrations, and strict operational boundaries.

---

## Design direction

The service model defines a standardized outer shape while keeping implementation details flexible.

A service should be:

- created from the shared service structure;
- owned through its local package boundary;
- explicit about contracts and configs;
- safe around raw environment input;
- testable from the beginning;
- connected to core through package and contract boundaries;
- flexible inside `src/` according to its concrete purpose.

This keeps service creation consistent while allowing different service types to grow according to their real implementation needs.

---

## Short conclusion

A service is an independent application unit built on top of the platform core.

The service model standardizes the outer service shape, keeps package ownership explicit, and preserves clear boundaries for contracts, configs, environment input, tests, and runtime startup.

Inside `src/`, each service remains flexible and may follow the implementation shape required by its concrete purpose.

This allows services to grow into real API, web, worker, admin, integration, or domain-specific applications while staying aligned with shared platform rules, safety boundaries, and documented architecture.
