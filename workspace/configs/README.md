# Workspace Configs

`workspace/configs/` contains shared configuration areas for the Oneeloom monorepo.

These configs keep repository-wide technical rules explicit, reusable, and separated from runtime behavior.

## Current areas

- `typescript/` — shared TypeScript configuration package;
- `biome/` — shared Biome configuration area;
- `cspell/` — shared spelling configuration area.

## Boundary

Workspace configs are technical repository infrastructure.

They provide shared configuration surfaces for packages, services, scripts, documentation, and development tooling.

| Concern | Owner |
| --- | --- |
| Shared technical configuration | `workspace/configs/` |
| Business logic | `services/` or `core/modules/` |
| Service runtime behavior | `services/` |
| Platform module behavior | `core/modules/` |
| Runtime orchestration | `core/composition/` |
| Environment secrets | Local environment inputs and external secret management |

The role of `workspace/configs/` is to keep shared technical configuration visible, reusable, and consistent across the monorepo.
