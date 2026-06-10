# Notification Service

`notification-service` is the notification delivery service area of the Oneeloom platform.

This service area is responsible for service-level runtime behavior related to notifications, delivery workflows, and notification processing boundaries.

## Service role

`notification-service` represents the platform area where notification behavior can grow as an independent service.

It may later own service-local source code, contracts, configs, package boundary, and tests according to the standard Oneeloom service structure.

## Standard service structure

When implemented, this service should follow the standard Oneeloom service structure:

```text
notification-service/
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

`notification-service` is a service-level runtime unit.

It owns only notification behavior that belongs to this service boundary.

| Concern | Owner |
| --- | --- |
| Notification service behavior | `services/notification-service/` |
| Service-local contracts | `services/notification-service/contracts/` |
| Service-local configs | `services/notification-service/configs/` |
| Shared platform modules | `core/modules/` |
| Shared technical tools | `core/tools/` |
| Runtime assembly patterns | `core/composition/` |
| Repository infrastructure | `workspace/` and `scripts/` |

The role of `notification-service` is to keep notification delivery behavior isolated inside a clear service boundary while shared platform behavior remains in `core`.

## Architecture reference

For the service architecture model, see:

```text
../../docs/architecture/service-model.md
```
