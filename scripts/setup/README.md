# Setup Scripts

`setup/` contains repository setup scripts used to create repeatable Oneeloom structures.

Setup scripts help keep generated repository structures aligned with the documented platform model.

## Available scripts

| Script | Role |
| --- | --- |
| `create-service.sh` | Creates the standard outer structure for a new Oneeloom service |

## Service structure standard

Oneeloom services must start from the standard service outer structure.

The service creation script is the repository-supported way to create that structure consistently.

The standard service structure is:

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

This structure gives every service a consistent package boundary, TypeScript boundary, source boundary, contract area, config area, test surface, documentation entrypoint, and local environment input file.

The internal `src/` layout may evolve according to the service role, but the outer service boundary must remain aligned with the standard service model.

## `create-service.sh`

`create-service.sh` creates a new service directory under `services/` by default.

The generated service includes:

- `src/`;
- `tests/`;
- `contracts/`;
- `configs/`;
- `package.json`;
- `tsconfig.json`;
- `README.md`;
- local `.env` file;
- empty service entrypoints;
- a smoke test for the service source boundary.

The script keeps repeated service creation predictable and reduces the risk of inconsistent service skeletons across the monorepo.

## Usage

From the repository root:

```bash
./scripts/setup/create-service.sh <service-name>
```

Example:

```bash
./scripts/setup/create-service.sh billing-service
```

This creates:

```text
services/billing-service/
```

A custom services root may also be passed as the second argument:

```bash
./scripts/setup/create-service.sh billing-service services
```

## Service name rules

The service name must use kebab-case.

Valid examples:

```text
billing-service
public-api
notification-service
```

Invalid examples:

```text
BillingService
billing_service
billing service
```

## Generated boundaries

`src/`, `contracts/`, and `configs/` receive empty `index.ts` entrypoints.

`tests/` receives a smoke test that verifies the service source entrypoint can be imported.

These generated files keep the service package boundary active before deeper runtime behavior is added.

## Local environment file

The generated `.env` file is local raw environment input.

It must remain local to the service environment and must not be committed to the repository.

The repository `.gitignore` is expected to exclude `.env` files.

Public examples may use `.env.example` when an example input shape is needed.

## Boundary

`setup/` is a repository setup area.

Setup scripts create repeatable repository structures and do not own service runtime behavior.

| Concern | Owner |
| --- | --- |
| Service skeleton creation | `scripts/setup/create-service.sh` |
| Standard service outer structure | `docs/architecture/service-model.md` |
| Service runtime behavior | `services/<service-name>/src/` |
| Service-local contracts | `services/<service-name>/contracts/` |
| Service-local configs | `services/<service-name>/configs/` |
| Platform module behavior | `core/modules/` |
| Repository infrastructure | `workspace/` |
| Environment secrets | Local environment inputs and external secret management |

The role of `setup/` is to create repeatable repository structures while keeping service runtime behavior, platform behavior, and environment secrets in their own responsibility areas.

## Architecture reference

For the service architecture model, see:

```text
../../docs/architecture/service-model.md
```
