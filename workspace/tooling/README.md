# Tooling

`tooling/` is the workspace area for shared developer and repository support tools.

This directory may contain reusable utilities, helper packages, or tool wrappers that support development workflows across the monorepo.

Workspace tooling helps keep repeated developer operations consistent when they become reusable beyond one script or one package.

## Boundary

`tooling/` supports repository and developer workflows.

Tooling may provide reusable helpers, wrappers, adapters, or internal developer utilities.

| Concern | Owner |
| --- | --- |
| Shared developer tooling | `workspace/tooling/` |
| Operational repository commands | `scripts/` |
| Service runtime behavior | `services/` |
| Platform module behavior | `core/modules/` |
| Runtime orchestration | `core/composition/` |
| Environment secrets | Local environment inputs and external secret management |

The role of `tooling/` is to keep reusable developer support tools visible, shared, and separated from runtime platform behavior.
