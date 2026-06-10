# Scripts

`scripts/` contains operational repository scripts for the Oneeloom monorepo.

These scripts support repeatable repository tasks such as setup, maintenance, checks, validation, and release-related flows.

## Structure

```text
scripts/
|- setup/
`- README.md
```

## Script areas

The implemented scripts area is:

```text
scripts/setup/
```

It contains setup scripts for repeatable repository structure creation.

The service creation script is:

```text
scripts/setup/create-service.sh
```

This script creates the standard outer structure for a new Oneeloom service and keeps generated service skeletons aligned with the documented service model.

## Directory roles

| Directory | Role |
| --- | --- |
| `setup/` | Repository setup scripts for repeatable structure creation |

Additional script areas may be added when the repository has a clear operational need for them.

## Boundary

`scripts/` is an operational repository support area.

Scripts support repository-level tasks and automation.

| Concern | Owner |
| --- | --- |
| Repository scripts | `scripts/` |
| Setup scripts | `scripts/setup/` |
| Service runtime behavior | `services/` |
| Platform module behavior | `core/modules/` |
| Shared technical tools | `core/tools/` |
| Runtime assembly and coordination | `core/composition/` |
| Repository infrastructure | `workspace/` |
| Environment secrets | Local environment inputs and external secret management |

The role of `scripts/` is to support repeatable repository operations without owning service runtime behavior or shared platform behavior.

## Script documentation

| Area | Documentation | Role |
| --- | --- | --- |
| `setup/` | `./setup/README.md` | Setup scripts for repeatable repository structure creation |
