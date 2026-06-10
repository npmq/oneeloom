# Templates

`templates/` is the workspace area for reusable repository templates.

This directory may contain templates for repeatable package, service, documentation, or workspace structures.

Templates help keep generated and repeated project structures consistent across the monorepo.

## Boundary

`templates/` supports repository consistency.

Templates may define repeatable file structures, starter files, placeholders, and documentation skeletons.

| Concern | Owner |
| --- | --- |
| Reusable repository templates | `workspace/templates/` |
| Service runtime behavior | `services/` |
| Platform module behavior | `core/modules/` |
| Runtime orchestration | `core/composition/` |
| Environment secrets | Local environment inputs and external secret management |

The role of `templates/` is to keep repeatable repository structures visible, reusable, and aligned with the shared project model.
