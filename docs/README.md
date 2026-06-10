# Documentation

`docs/` is the main documentation entrypoint for the platform.

Architecture documentation gives the project a shared structural map for implementation, review, and future platform growth.

---

## Documentation structure

```text
docs/
|- README.md
|- adr/
|  `- README.md
|- architecture/
|  |- core-structure.md
|  |- project-model.md
|  |- report-model.md
|  `- service-model.md
|- guides/
|  `- README.md
|- modules/
|  |- env/
|  |  `- README.md
|  `- logger/
|     `- README.md
`- standards/
   `- README.md
```

---

## Documentation areas

| Area | Role | What it contains |
| --- | --- | --- |
| `architecture/` | Platform architecture models | Project structure, core structure, service model, report model, and other platform-level architecture documents |
| `modules/` | Module documentation | Documentation for selected platform modules with their purpose, boundaries, contracts, and design direction |
| `adr/` | Architecture Decision Records | Important architectural decisions, rejected alternatives, trade-offs, reasons, and consequences |
| `guides/` | Practical workflows | Setup flows, usage-oriented explanations, development workflows, service creation steps, and common operational notes |
| `standards/` | Shared project standards | Naming rules, formatting rules, repository conventions, documentation conventions, and consistency rules |

---

## `architecture/`

`architecture/` contains project-level architecture documentation.

This area describes how the platform is structured, how major zones relate to each other, and which architectural rules guide platform growth.

Current architecture documents include:

- `project-model.md` - describes the top-level platform and repository model;
- `core-structure.md` - describes the internal structure and dependency direction of `core/`;
- `service-model.md` - describes the standard service shape and service boundaries;
- `report-model.md` - describes the shared reporting model used primarily by platform modules.

Architecture documentation gives the project a shared structural map for implementation, review, and future platform growth.

---

## `modules/`

`modules/` contains documentation for selected platform modules.

This area is used when a module needs its own model-level documentation beyond local source comments or package README content.

Current module documentation includes:

- `env/README.md` - describes `env` as a trust boundary for admitting raw configuration input into the trusted platform zone;
- `logger/README.md` - describes the logging module, logging boundaries, logger modes, and runtime logging direction.

Module documentation makes each documented module easier to understand by keeping its purpose, boundaries, input/output model, platform relations, and design direction explicit.

---

## `adr/`

`adr/` contains Architecture Decision Records.

This area is used for decisions that affect architecture, boundaries, contracts, dependency direction, or long-term project structure.

ADR documents preserve why important decisions were made.

They may record:

- accepted architectural decisions;
- rejected alternatives;
- trade-offs and constraints;
- reasons behind important structure choices;
- consequences for future development.

ADR documentation keeps architectural reasoning visible after the decision has already been made.

---

## `guides/`

`guides/` contains practical documentation for working with the platform.

This area explains how to apply platform architecture in real development workflows.

Guides may describe:

- setup flows;
- development workflows;
- package usage examples;
- service creation steps;
- testing and validation routines;
- operational notes for common tasks.

Guides connect documented platform structure with everyday development work.

---

## `standards/`

`standards/` contains shared project standards.

This area is used for rules that should stay consistent across packages, modules, services, scripts, and documentation.

Standards may describe:

- naming conventions;
- directory and file conventions;
- formatting rules;
- package conventions;
- documentation conventions;
- testing conventions;
- repository consistency rules.

Standards keep repeated project rules explicit so the platform can grow with consistent structure, naming, formatting, and working practices.

---

## How to use this documentation

Use `docs/` as the entrypoint when you need to understand the platform at different levels.

Start with:

- `architecture/project-model.md` to understand the whole platform structure;
- `architecture/core-structure.md` to understand the open core;
- `architecture/service-model.md` to understand service structure and service boundaries;
- `architecture/report-model.md` to understand the shared report model;
- `modules/env/README.md` and `modules/logger/README.md` to understand selected module models;
- `adr/` to understand why important architectural decisions were made;
- `guides/` for practical workflows;
- `standards/` for shared consistency rules.

This gives contributors a clear reading path through project structure, core architecture, service model, module models, decisions, guides, and standards.

---

## Adding documentation

New documentation should be placed according to the kind of project knowledge it records.

Use:

- `architecture/` for project-level structure, platform models, core structure, service model, and cross-cutting architecture;
- `modules/` for documentation of specific platform modules;
- `adr/` for important decisions and their reasoning;
- `guides/` for practical workflows and usage instructions;
- `standards/` for shared rules that keep project work consistent.

Before adding a document, identify its purpose, expected reader, and relation to existing documentation.

The document location should make future reading, review, and maintenance straightforward.

---

## Boundary

`docs/` records agreed project knowledge and keeps it organized by responsibility.

Architecture documents describe platform structure and architectural intent.

Module documents describe module responsibility, boundaries, and design direction.

ADR documents preserve important decisions and reasoning.

Guides explain practical workflows.

Standards define repeatable consistency rules.

Implementation details, tests, package contracts, and source-level behavior remain owned by their corresponding packages and source code.

---

## Short conclusion

`docs/` is the documentation entrypoint of the platform.

It keeps architecture, module models, decisions, practical guides, and standards organized by responsibility.

This gives the project a clear knowledge map for understanding structure, reviewing decisions, applying standards, and continuing implementation.

Well-structured documentation helps the platform grow with shared context, visible boundaries, and consistent project knowledge.
