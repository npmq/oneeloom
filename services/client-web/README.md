# Client Web

`client-web` is the client-facing web application service area of the Oneeloom platform.

This service area is responsible for service-level runtime behavior related to user-facing web interfaces, client application flows, and public web interaction surfaces.

## Service role

`client-web` represents the platform area where client-facing web behavior can grow as an independent service.

It may later own service-local source code, contracts, configs, package boundary, and tests according to the standard Oneeloom service structure.

## Standard service structure

When implemented, this service should follow the standard Oneeloom service structure:

```text
client-web/
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

`client-web` is a service-level runtime unit.

It owns only client-facing web behavior that belongs to this service boundary.

| Concern | Owner |
| --- | --- |
| Client-facing web behavior | `services/client-web/` |
| Service-local contracts | `services/client-web/contracts/` |
| Service-local configs | `services/client-web/configs/` |
| Shared platform modules | `core/modules/` |
| Shared technical tools | `core/tools/` |
| Runtime assembly patterns | `core/composition/` |
| Repository infrastructure | `workspace/` and `scripts/` |

The role of `client-web` is to keep user-facing web behavior isolated inside a clear service boundary while shared platform behavior remains in `core/`.

## Architecture reference

For the service architecture model, see:

```text
../../docs/architecture/service-model.md
```
