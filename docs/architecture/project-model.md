# Project Model

## What the platform is

The project is an open-core platform monorepo.

It is built as a **platform**, not as a framework or a single service.  
The repository is divided into clear architectural zones so that:

- the core stays explicit;
- services stay autonomous;
- workspace tooling stays technical;
- documentation stays structured;
- and repository growth remains predictable.

The project is designed for:

- safe-first architecture;
- predictable growth;
- explicit module boundaries;
- documented decisions;
- and long-term maintainability.

---

## Repository model

| Zone | Role | Why it exists |
| --- | --- | --- |
| `core/` | Open core of the platform | Holds reusable platform logic and architectural foundations |
| `services/` | Independent application units | Holds concrete services built on top of the core |
| `workspace/` | Repository and monorepo infrastructure | Holds shared configs, tooling, templates, and CI-related support |
| `docs/` | Architecture and standards documentation | Holds decisions, guides, and project documentation |
| `scripts/` | Operational repository scripts | Holds generators and maintenance flows |
| `examples/` | Reference examples | Holds illustrative examples and usage patterns for future use |
| `.github/` | GitHub platform layer | Holds CI and repository-level GitHub integration when GitHub-specific automation is used |

---

## Top-level structure

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

## Top-level placement rule

Each top-level directory owns a clear repository-level responsibility.

- `core/` contains reusable platform capabilities and shared architectural foundations;
- `services/` contains independent application units;
- `workspace/` contains monorepo infrastructure, shared configs, templates, and tooling;
- `docs/` contains architecture, standards, decisions, guides, and project documentation;
- `scripts/` contains operational repository scripts;
- `examples/` contains reference examples and usage patterns;
- `.github/` contains GitHub-specific repository integration.

A new top-level directory should be added only when it has a clear repository-level responsibility.

---

## ANSI map

```text
+----------------------------------------------------+
|                       PLATFORM                     |
+----------------------------------------------------+

          CORE                         SERVICES
+-----------------------+    +-----------------------+
| autonomous modules    |    | application units     |
| supporting tools      |    | public-api            |
| integrations          |    | auth-service          |
| composition           |    | client-web            |
+-----------------------+    +-----------------------+

        WORKSPACE                        DOCS
+-----------------------+    +-----------------------+
| configs               |    | architecture          |
| tooling               |    | standards             |
| templates             |    | guides                |
| ci                    |    | adr                   |
+-----------------------+    +-----------------------+

         SCRIPTS                       EXAMPLES
+-----------------------+    +-----------------------+
| setup                 |    | modules               |
| checks                |    | integrations          |
| release               |    | composition           |
| maintenance           |    | services              |
+-----------------------+    +-----------------------+
```

---

## Core architectural principles

### 1. The repository is organized by responsibility

Top-level directories are grouped by responsibility and ownership.

A new top-level zone must have a repository-level reason to exist.

### 2. The core is explicit

`core/` is the open core of the platform, built around autonomous modules, shared technical foundations, and safety-first boundaries.

It contains reusable platform capabilities, supporting tools, integrations, and composition areas with clear responsibility boundaries.

### 3. Services are independent application units

`services/` contains independent application units built on top of the core.

Each service owns its source code, contracts, configs, package boundary, and test surface.

Services may implement their own application behavior, but they consume core modules, tools, and contracts through explicit boundaries.

This keeps services flexible in implementation while preserving shared safety rules, platform consistency, and predictable integration with the core.

### 4. Workspace is technical infrastructure

`workspace/` contains repository infrastructure used to keep packages, services, and tooling consistent.

It may provide shared TypeScript configs, formatting presets, templates, CI support, and development tooling.

Workspace packages support the monorepo, but they must not define hidden platform behavior or service runtime logic.

### 5. Documentation defines project knowledge

`docs/` contains project architecture, standards, decisions, guides, and module models.

Documentation records agreed structure and rules so implementation can follow explicit project knowledge.

### 6. Scripts support repository operations

`scripts/` contains operational automation for repository setup, maintenance, checks, and helper workflows.

Scripts may create structure, run repeatable operations, or support development tasks.

Behavior that affects project structure or package usage should remain documented and easy to inspect.

### 7. Examples show reference usage

`examples/` contains reference scenarios and usage patterns.

Examples show how modules, services, integrations, and composition flows can work together in practical scenarios.

Stable architecture, contracts, and rules remain defined in documentation and implementation packages.

---

## Interaction model

### `core` and `services`

- `core/` provides shared platform capabilities, contracts, tools, and foundations for safe and consistent service development.
- `services/` build concrete application behavior on top of the core.
- Each service owns its source code, contracts, configs, package boundary, and tests.
- Services consume core modules and tools through explicit package and contract boundaries.
- Core contracts provide shared rules, while services provide concrete runtime implementation.

### `workspace` and packages

- `workspace/` provides shared configs, templates, and technical support for packages and services.
- Packages connect to workspace tooling through explicit package dependencies and configuration paths.
- Shared workspace packages keep repository tooling consistent across modules, tools, services, and scripts.

### `docs` and implementation

- `docs/` records agreed project structure, rules, decisions, and guides.
- Implementation follows documented boundaries and responsibilities.
- Important project changes should be reflected in documentation.

### `scripts` and repository operations

- `scripts/` provides operational automation for repository setup, checks, release support, and maintenance flows.
- Scripts are executed as explicit repository commands.
- Script behavior that changes project structure or package behavior should be documented in the related README or architecture document.

### `examples` and recommended practices

- `examples/` provides reference scenarios and practical usage patterns.
- Examples show recommended ways to apply platform modules, services, integrations, and composition flows in concrete cases.
- Examples should stay aligned with architecture documents, module contracts, and implementation packages.

---

## Growth model

The platform should grow through explicit packages, services, documentation, and examples.

New repository areas, packages, or modules should be added only when they have:

- clear responsibility;
- explicit ownership;
- documented boundaries;
- a clear purpose inside the platform structure.

Growth must remain contract-driven, responsibility-based, and safety-oriented.

---

## Short conclusion

The project is built as a **clear open-core platform monorepo**.

It is defined by:

- explicit layers;
- strict contracts;
- clear boundaries;
- safety-first design principles;
- autonomous core modules;
- independent services;
- shared workspace infrastructure;
- documented architecture rules;
- and responsibility-based growth.

The repository structure is an integral part of the architecture.

It keeps platform growth organized, predictable, and aligned with clear responsibility boundaries.

Each top-level zone must have a clear purpose in the platform and follow the shared architectural logic.
