# TypeScript Configs

`typescript/` contains the shared TypeScript configuration package used by the Oneeloom workspace.

The package provides the common compiler baseline for core packages, services, and workspace tooling.

## Package

```text
@oneeloom/tsconfig
```

The package is private and intended for internal workspace use only.

## Current config surface

The current public config surface is:

```text
@oneeloom/tsconfig/configs/base.json
```

It is used by package-local `tsconfig.json` files through `extends`:

```json
{
  "extends": "@oneeloom/tsconfig/configs/base.json"
}
```

## Base config role

`configs/base.json` defines the shared TypeScript standard for the monorepo.

It currently includes:

- ES2022 target and library baseline;
- ES module output model;
- bundler-oriented module resolution;
- JSON module support;
- verbatim module syntax;
- Bun type support;
- strict type-checking rules;
- no-emit typecheck mode.

## Boundary

This package owns shared TypeScript compiler rules for the workspace.

It provides reusable config files that packages and services can extend through explicit package paths.

Runtime code, service-specific assumptions, package-specific build pipelines, environment configuration, linting, formatting, and spelling rules remain outside this package.

Build-specific or service-specific TypeScript configs may be added later as separate config files when the workspace needs them.

## Current status

The current implementation exposes one shared base config.

Additional configs may be added later when packages or services require shared TypeScript rules beyond the base baseline.
