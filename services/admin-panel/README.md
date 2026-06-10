# Admin Panel

`admin-panel` is the administrative service area of the Oneeloom platform.

This service area is responsible for service-level runtime behavior related to administrative workflows, internal management interfaces, and platform operation screens.

## Service role

`admin-panel` represents the platform area where administrative behavior can grow as an independent service.

It may later own service-local source code, contracts, configs, package boundary, and tests according to the standard Oneeloom service structure.

## Standard service structure

When implemented, this service should follow the standard Oneeloom service structure:

```text
admin-panel/
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

`admin-panel` is a service-level runtime unit.

It owns only administrative behavior that belongs to this service boundary.

| Concern | Owner |
| --- | --- |
| Administrative service behavior | `services/admin-panel/` |
| Service-local contracts | `services/admin-panel/contracts/` |
| Service-local configs | `services/admin-panel/configs/` |
| Shared platform modules | `core/modules/` |
| Shared technical tools | `core/tools/` |
| Runtime assembly patterns | `core/composition/` |
| Repository infrastructure | `workspace/` and `scripts/` |

The role of `admin-panel` is to keep administrative workflows and internal management behavior isolated inside a clear service boundary while shared platform behavior remains in `core/`.

## Architecture reference

For the service architecture model, see:

```text
../../docs/architecture/service-model.md
```
