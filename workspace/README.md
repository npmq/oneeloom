# Workspace

`workspace/` contains shared repository infrastructure for the Oneeloom monorepo.

This area supports packages, services, scripts, documentation, and development workflows through shared configs, templates, CI support, and developer tooling.

## Current structure

```text
workspace/
|- configs/
|- ci/
|- templates/
`- tooling/
```

## Directory roles

| Directory | Role |
| --- | --- |
| `configs/` | Shared configuration areas and config packages |
| `ci/` | Repository-level CI configuration and automation support |
| `templates/` | Reusable templates for repeatable project structures |
| `tooling/` | Shared developer tooling and repository support utilities |

## Current implemented area

The current implemented workspace package is:

```text
workspace/configs/typescript/
```

It provides the shared TypeScript base config used by core packages and services:

```text
@oneeloom/tsconfig/configs/base.json
```

Other workspace areas are documented as repository infrastructure zones and may grow when real repository needs appear.

## Boundary

`workspace/` is a repository infrastructure area.

It provides shared technical support for the monorepo.

| Concern | Owner |
| --- | --- |
| Shared repository infrastructure | `workspace/` |
| Shared configuration packages | `workspace/configs/` |
| CI support | `workspace/ci/` |
| Reusable templates | `workspace/templates/` |
| Developer tooling | `workspace/tooling/` |
| Service runtime behavior | `services/` |
| Platform module behavior | `core/modules/` |
| Runtime orchestration | `core/composition/` |
| External integrations | `core/integrations/` |
| Environment secrets | Local environment inputs and external secret management |

The role of `workspace/` is to keep repository infrastructure visible, reusable, and separated from platform runtime behavior.

## Growth model

Workspace infrastructure should grow through explicit technical packages, documented config areas, reusable templates, CI support, and clear developer tooling.

New workspace packages should be added when they provide reusable technical value across multiple parts of the monorepo.

## Architecture reference

For the repository-level workspace role, see:

```text
../docs/architecture/project-model.md
```
