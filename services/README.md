# Services

`services/` contains the application layer of the Oneeloom platform.

A service is an independent runtime unit with its own source code, contracts, configs, package boundary, and test surface.

Services consume platform capabilities from `core/` through explicit package and contract boundaries.

## Service map

| Service | Status | Role |
| --- | --- | --- |
| `public-api/` | Public example | Public API service example |
| `admin-panel/` | Documented direction | Administrative service area |
| `auth-service/` | Documented direction | Authentication and identity service area |
| `client-web/` | Documented direction | Client-facing web application area |
| `notification-service/` | Documented direction | Notification service area |

## Service areas

`public-api/` is the public service example included in the repository.

It shows how a service is structured, documented, configured, and connected to the shared platform model.

Other service directories define application areas that belong to the platform service layer.

Their runtime implementation can grow independently inside each service boundary when the corresponding service becomes part of the public implementation scope.

This keeps `services/` useful as an application-layer map without duplicating the full service architecture model.

## Standard service structure

Services follow the standard Oneeloom service structure:

```text
<service-name>/
|- src/
|- tests/
|- contracts/
|- configs/
|- package.json
|- tsconfig.json
|- README.md
`- .env
```

This structure gives every service a consistent outer shape while keeping the internal `src/` layout flexible for the service role.

The `.env` file represents service-local runtime input and must remain local to the service environment.

Public repositories may provide `.env.example` when an example input shape is needed.

## Service creation

New services should be created through the repository service creation script:

```bash
bun run create:service
```

The script is responsible for creating the standard service skeleton and keeping repeated service structure aligned with the documented service model.

Manual changes may still be made after creation, but the initial service boundary should start from the standard structure.

## Service boundary

`services/` is the application layer of the platform.

Services assemble and use platform capabilities, but they do not own shared core behavior.

| Concern | Owner |
| --- | --- |
| Service runtime behavior | `services/<service-name>/` |
| Service-local source code | `services/<service-name>/src/` |
| Service-local contracts | `services/<service-name>/contracts/` |
| Service-local configs | `services/<service-name>/configs/` |
| Service-local tests | `services/<service-name>/tests/` |
| Platform modules | `core/modules/` |
| Shared technical tools | `core/tools/` |
| External technology adapters | `core/integrations/` |
| Runtime assembly patterns | `core/composition/` |
| Repository infrastructure | `workspace/` and `scripts/` |

The role of `services/` is to contain concrete application units while keeping shared platform behavior in `core/`.

## Architecture reference

For the service architecture model, see:

```text
../docs/architecture/service-model.md
```
