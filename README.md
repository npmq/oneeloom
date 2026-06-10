# Oneeloom

**Oneeloom** is an open-core platform monorepo built around explicit architecture, safety-first boundaries, autonomous core modules, independent services, and documented project knowledge.

The project is designed as a platform, not as a framework or a single application.  
Its repository structure separates platform capabilities, services, workspace infrastructure, documentation, scripts, and reference examples into clear responsibility zones.

---

## Platform direction

Oneeloom is built around:

- an explicit open core;
- safety-first module boundaries;
- independent application services;
- shared workspace infrastructure;
- documented architecture rules;
- contract-driven growth;
- predictable repository structure;
- and long-term maintainability.

The project keeps platform logic, service implementation, tooling, and documentation separated so each area can grow without losing clear ownership.

---

## Repository structure

```text
.
|- core/
|- services/
|- workspace/
|- docs/
|- scripts/
|- examples/
|- .github/
|- package.json
|- bun.lock
|- tsconfig.json
|- bunfig.toml
|- biome.json
`- README.md
```

---

## Repository areas

| Area | Role |
| --- | --- |
| `core/` | Open core of the platform with modules, tools, integrations, composition, and shared tests |
| `services/` | Independent application units built on top of the core |
| `workspace/` | Shared repository infrastructure, configs, templates, CI support, and tooling |
| `docs/` | Architecture, module models, decisions, guides, and standards |
| `scripts/` | Operational repository scripts for setup, checks, release support, and maintenance |
| `examples/` | Reference scenarios and usage patterns |
| `.github/` | GitHub-specific repository integration and automation |

---

## Core

`core/` is the open core of the platform.

It contains reusable platform capabilities and shared technical foundations:

- `modules/` for autonomous platform capabilities;
- `tools/` for shared technical support;
- `integrations/` for controlled external technology adapters;
- `composition/` for assembly and coordination flows;
- `tests/` for shared core validation.

Current module directions include:

- `env`;
- `logger`;
- `error`;
- `config-creator`.

Current tool directions include:

- `assert`;
- `guards`;
- `normalization`;
- `serialization`;
- `report`.

See:

```text
docs/architecture/core-structure.md
```

---

## Services

`services/` contains independent application units built on top of the core.

A service owns its source code, package boundary, contracts, configs, tests, local documentation, and runtime entrypoints.

The standard service shape is:

```text
services/<service-name>/
|- src/
|- tests/
|- contracts/
|- configs/
|- package.json
|- tsconfig.json
|- README.md
`- .env
```

Services may represent HTTP APIs, web clients, admin panels, workers, bots, notification pipelines, integration-facing applications, or other deployable application areas.

See:

```text
docs/architecture/service-model.md
```

---

## Workspace

`workspace/` contains shared repository infrastructure.

It supports packages, services, and development workflows through shared configs, templates, CI-related support, and tooling.

Current implemented workspace package:

```text
workspace/configs/typescript/
```

It provides the shared TypeScript base config:

```text
@oneeloom/tsconfig/configs/base.json
```

The workspace layer keeps repository tooling consistent across platform modules, tools, services, scripts, and future packages.

---

## Documentation

`docs/` is the documentation entrypoint of the platform.

It contains:

- `architecture/` for project-level architecture models;
- `modules/` for selected module documentation;
- `adr/` for Architecture Decision Records;
- `guides/` for practical workflows;
- `standards/` for shared project standards.

Start with:

```text
docs/README.md
docs/architecture/project-model.md
docs/architecture/core-structure.md
docs/architecture/service-model.md
docs/architecture/report-model.md
```

---

## Implemented documentation highlights

Current architecture documentation includes:

- Project Model;
- Core Structure;
- Service Model;
- Report Model.

Current module documentation includes:

- Env Model;
- Logger Model.

These documents define the current architectural baseline for platform structure, core layers, service shape, reporting model, environment boundary, and logging direction.

---

## Development baseline

The repository uses:

- Bun for package management and scripts;
- TypeScript for implementation;
- Biome for formatting and linting;
- shared workspace TypeScript configuration;
- explicit package boundaries through workspace packages.

The current repository direction favors clear package ownership, explicit dependencies, safe configuration boundaries, and documented architecture before uncontrolled implementation growth.

---

## Short conclusion

Oneeloom is a safety-oriented open-core platform monorepo.

Its structure separates the open core, independent services, shared workspace infrastructure, documentation, scripts, and examples into clear responsibility zones.

The repository is designed to grow through explicit packages, contracts, documented boundaries, and predictable platform architecture.
