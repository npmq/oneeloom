# Auth Service

`auth-service` is the authentication and identity service area of the Oneeloom platform.

This service area is responsible for service-level runtime behavior related to authentication, identity, access, and trust boundaries.

## Service role

`auth-service` represents the platform area where authentication and identity behavior can grow as an independent service.

It may later own service-local source code, contracts, configs, package boundary, and tests according to the standard Oneeloom service structure.

## Standard service structure

When implemented, this service should follow the standard Oneeloom service structure:

```text
auth-service/
|- src/
|- tests/
|- contracts/
|- configs/
|- package.json
|- tsconfig.json
|- README.md
`- .env
```

## Boundary

`auth-service` is a service-level runtime unit.

It owns only authentication and identity behavior that belongs to this service boundary.

| Concern | Owner |
| --- | --- |
| Authentication service behavior | `services/auth-service/` |
| Service-local contracts | `services/auth-service/contracts/` |
| Service-local configs | `services/auth-service/configs/` |
| Shared platform modules | `core/modules/` |
| Shared technical tools | `core/tools/` |
| Runtime assembly patterns | `core/composition/` |
| Repository infrastructure | `workspace/` and `scripts/` |

The role of `auth-service` is to keep authentication and identity behavior isolated inside a clear service boundary while shared platform behavior remains in `core/`.

## Architecture reference

For the service architecture model, see:

```text
../../docs/architecture/service-model.md
```
