# Public API Service

`public-api` is the public service example of the Oneeloom platform.

It shows how a service is structured, documented, packaged, tested, and connected to the shared platform model.

A service owns its runtime source code, contracts, configs, package boundary, and test surface.

## Service role

`public-api` represents the public API service area.

In the public repository, it is used as a safe service example that demonstrates the standard Oneeloom service boundary without exposing production business logic.

## Implementation scope

The public implementation includes:

- package boundary;
- TypeScript boundary;
- source entrypoint;
- contracts entrypoint;
- configs entrypoint;
- smoke test for the service source boundary.

This keeps the service importable, testable, and aligned with the documented service model while the runtime implementation grows inside the service boundary.

## Service structure

```text
public-api/
|- src/
|- tests/
|- contracts/
|- configs/
|- package.json
|- tsconfig.json
`- README.md
```

## Directory roles

| Directory / file | Role |
| --- | --- |
| `src/` | Runtime implementation area of the service |
| `contracts/` | Service-owned contracts and external-facing definitions |
| `configs/` | Service-owned configuration inputs and config-related structures |
| `tests/` | Service-level validation surface |
| `package.json` | Service package boundary and workspace dependencies |
| `tsconfig.json` | Local TypeScript boundary of the service |

## Package boundary

The service exposes explicit package entrypoints:

```text
.            -> ./src/index.ts
./contracts  -> ./contracts/index.ts
./configs    -> ./configs/index.ts
```

These entrypoints keep service runtime code, contracts, and configuration inputs separated.

## Workspace dependencies

The service depends on core platform packages through workspace dependencies.

This keeps architectural dependencies explicit and avoids relative filesystem imports across package boundaries.

## Test surface

The service test surface verifies that the service boundary remains active and importable.

The initial smoke test protects the source entrypoint before deeper runtime behavior is added.

## Service boundary

`public-api` is a concrete service boundary.

It can use platform modules, tools, integrations, and composition patterns, but it owns only its service-local behavior.

| Concern | Owner |
| --- | --- |
| Service runtime source | `public-api/src/` |
| Service-owned contracts | `public-api/contracts/` |
| Service-owned configs | `public-api/configs/` |
| Service-level tests | `public-api/tests/` |
| Shared platform modules | `core/modules/` |
| Shared technical tools | `core/tools/` |
| External technology adapters | `core/integrations/` |
| Runtime assembly patterns | `core/composition/` |

The role of `public-api` is to demonstrate a clean service boundary while keeping shared platform behavior in `core/`.

## Architecture reference

For the service architecture model, see:

```text
../../docs/architecture/service-model.md
```
