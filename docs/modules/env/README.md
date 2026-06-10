# Env Model

## Purpose

`env` is not a `.env` loader and not a generic helper around environment variables.

`env` is a **trust boundary**.

Its purpose is to prevent raw configuration input from entering the trusted platform zone until:

- the bootstrap method is validated;
- the bootstrap mode is validated;
- the service-owned env contract is validated;
- the service-owned env config is validated;
- the source plan is resolved;
- final values are validated against schema and policy.

This means that `env` is responsible not for “reading variables”, but for **admitting configuration input into the trusted zone of the platform**.

---

## Package position

`env` is located in:

```text
core/modules/env/
```

The package belongs to `modules/` because it provides a reusable platform capability with its own responsibility zone, contracts, validation rules, policy model, and internal pipeline.

`env` may use shared tools such as `report`, but it remains an autonomous platform module.

---

## Bootstrap-safety boundary

`env` participates in the early service boot process.

Because of that, it must remain bootstrap-safe.

The module must not depend on:

- external integrations;
- runtime-only dependencies;
- final service configuration;
- prime logger initialization;
- or service runtime assembly.

`env` may produce structured reports and trusted output, but it must not require the full runtime to exist before it can validate admission input.

---

## General processing order

The current agreed order of work is:

1. receive the service-owned `env-contract`;
2. receive the service-owned `env-config`;
3. determine how `method` and `mode` must be obtained according to the contract;
4. resolve bootstrap input;
5. build bootstrap decision;
6. continue into one and only one branch: `file`, `process`, or `explicit-plan`.

This order is important.

The module must not start by reading args, process variables, or files blindly.  
It must first know the **service-owned admission rules**.

---

## Contract and config separation

The service env model is split into two outer-layer files:

- `contracts/env-contract.ts`;
- `configs/env-config.ts`.

### `env-contract.ts`

`env-contract.ts` defines:

- allowed bootstrap methods;
- allowed input channels;
- default input channels;
- allowed mode values;
- bootstrap policy;
- shape-related rules;
- schema requirement.

This file answers:

> What is allowed for this service?

### `env-config.ts`

`env-config.ts` defines:

- concrete file mappings;
- concrete process variable names;
- explicit-plan settings;
- mode-specific technical bindings;
- service-owned env bootstrap settings.

This file answers:

> How is this service configured within the allowed contract?

### Important boundary

Contract and config must not be mixed.

The contract must not absorb:

- concrete file paths;
- concrete process variable names;
- explicit plan payload;
- service-specific operational details.

The config must not redefine:

- policy rules;
- bootstrap language;
- or platform defaults that belong to the contract.

Reading `env-config` does not make config values trusted.

`env-config` is interpreted only within the rules allowed by `env-contract`.

---

## Service outer-layer ownership

The agreed service outer-layer placement is:

- `contracts/env-contract.ts`;
- `configs/env-config.ts`.

This separation keeps:

- rules of admission in `contracts/`;
- concrete service-owned configuration in `configs/`.

This follows the broader service structure model:
everything should live in the external layer section where it actually belongs.

---

## Bootstrap methods

For one service run, exactly **one** bootstrap method is allowed.

Current agreed methods:

- `file`;
- `process`;
- `explicit-plan`.

### Meaning of the methods

#### `file`

Configuration input is resolved through file-based sources.

This does not mean “local only”.  
A Kubernetes or containerized runtime may also use `file` if a physical file is mounted and validated through the file-based path.

#### `process`

Configuration input is resolved through process environment variables.

This is typical for:

- containers;
- orchestration;
- CI;
- process-level injection.

#### `explicit-plan`

Configuration input is resolved through a structured explicit bootstrap object.

This is the strictest and most explicit path.  
It is not a free object and must be validated as a controlled contract.

---

## One run = one method

Multiple methods must not be active for one bootstrap run.

The module must not allow:

- mixed methods;
- hidden fallback between methods;
- automatic switching between methods;
- guessing which method should win.

If the input implies more than one method, the result must be:

- reject;
- structured report;
- no fallback.

This is part of the fail-first model.

---

## Unsafe input model

Both `method` and `mode` are **unsafe on input**.

They are not trusted just because they were:

- passed through args;
- passed through process environment;
- passed through a bootstrap object;
- declared by the service;
- or supplied by runtime orchestration.

They become trusted only after validation.

### Validation path

For `method` and `mode`, the module must validate:

- existence;
- channel validity;
- allowance by contract;
- allowance by policy;
- allowed values;
- consistency with actual input shape.

Only after this they become part of a trusted bootstrap decision.

---

## Default input channel

The agreed platform default is:

- `method` default channel = `args`;
- `mode` default channel = `args`.

This is a platform-level choice.

It exists because args are:

- explicit;
- intentional;
- visible in scripts;
- less magical than process input;
- and better aligned with strict startup discipline.

### Important note

`args` are still unsafe.  
They are just the best default channel.

---

## Default args keys

The agreed platform defaults for args are:

- `--env-method`;
- `--env-mode`.

These are fixed as part of the contract model.

The goal is:

- clarity;
- consistency;
- platform-wide readability;
- and avoidance of arbitrary team-specific key names in the default path.

---

## Process channel model

`process` is allowed only as an explicitly enabled alternative channel.

The important rule is:

**there are no platform default process variable names.**

If a service wants to read `method` or `mode` from process environment, it must declare in `env-config`:

- which variable is used for `method`;
- which variable is used for `mode`.

This keeps process input:

- service-owned;
- explicit;
- not hardcoded by the env module;
- not guessed by convention.

The module must never search for “something similar” in process env.

---

## Bootstrap object model

`explicit-plan` / bootstrap object is the most powerful and also the strictest method.

It must not be treated as:

- a free-form object;
- a fallback bucket;
- a partial shortcut;
- or a magic override layer.

It must be:

- fully structured;
- strictly typed;
- validated as a closed shape;
- and checked before any further bootstrap work continues.

### Important rule

The bootstrap object is not inferred.  
It is explicitly passed and explicitly validated.

---

## Method must be explicit

The module must never infer `method` from input shape.

That means:

- no guessing from available fields;
- no hidden “if filePath exists then method=file”;
- no “if process key exists maybe method=process”.

Instead:

- `method` is declared explicitly;
- then shape is checked against the declared method.

This is one of the strongest agreed rules.

---

## Input shape

`shape` means the actual structure of the bootstrap input that was provided.

Examples:

- if method is `file`, the input must contain file-oriented data;
- if method is `process`, the input must contain process-oriented data;
- if method is `explicit-plan`, the input must contain a valid explicit plan.

The module checks that the declared method, allowed method, and actual input shape all match each other.

If they do not match, the result is rejection.

---

## Service contract comes first

The env module must not start by blindly parsing args or process variables.

It must first receive and validate:

- `env-contract`;
- `env-config`.

Only after that may it:

- determine allowed channels;
- determine how to read `method`;
- determine how to read `mode`;
- resolve bootstrap decision.

This rule is one of the most important parts of the current architecture.

---

## File method baseline

For `file`, `mode` alone is not enough.

The file-based path requires:

- `method=file`;
- valid `mode`;
- file strategy defined in `env-config`.

The module must not invent file names or locations by itself.

Instead:

- the service config defines file strategy;
- the module validates that strategy;
- then resolves actual file plan;
- then checks file existence, type, policy, and loading.

---

## Kubernetes and local startup

The architecture must not depend on where the service is running.

The module does not care whether the service was started:

- locally;
- in Docker;
- in Kubernetes;
- in CI.

What matters is:

- which method is declared;
- which channel is used;
- whether it is allowed;
- whether the shape matches;
- and whether the source plan is valid.

This means:

- local startup often becomes `args + file`;
- Kubernetes often becomes `args/process + process` or `args + file`;
- but the module stays the same.

Different environments may use different input forms, but they still pass through one env bootstrap pipeline.

---

## Fail-first behavior

The current model is fail-first in the following sense:

- if method is invalid → reject;
- if method is not allowed for the service → reject;
- if method shape is incomplete → reject;
- if mode is invalid → reject;
- if file/process/plan requirements are missing → reject.

The module must not:

- auto-repair;
- auto-switch methods;
- silently fallback;
- silently merge scenarios.

At the same time, it may still produce an aggregated rejected report for the failing stage.

So the model is:

- fail first on broken stage transitions;
- aggregate details inside the stage where possible.

---

## Trusted output boundary

The env module may produce only one of two high-level outcomes:

- trusted validated environment output;
- or rejected structured report output.

Raw input must not leak into the trusted platform zone.

Rejected output must remain structured, diagnostics-friendly, and secret-safe.

Trusted output must represent values that passed the declared contract, selected method, selected mode, source plan, schema, and policy validation.

---

## Secret-safety

The env module may process sensitive configuration input.

It must not expose unredacted secrets, credentials, tokens, private keys, or sensitive runtime values in reports, errors, logs, summaries, or diagnostics.

When reporting failures, the module should report stable identifiers, paths, keys, stages, and validation reasons instead of raw sensitive values.

This requirement applies to all input methods: `file`, `process`, and `explicit-plan`.

---

## Relation to report

`env` is expected to be one of the first strong users of the shared `report` layer.

When bootstrap fails, the module should produce:

- module-aware report output;
- status-aware report output;
- issue aggregation;
- structured rejection diagnostics.

The env module should not collapse its failure model into raw thrown errors.

`env` may use `report` to describe rejection, but `report` does not decide whether input is admitted.

---

## Relation to error

`env` and `error` are related, but not identical.

`env` should:

- validate;
- resolve;
- admit or reject;
- produce trusted output or rejected report.

The error layer may later:

- wrap;
- represent;
- or throw.

But `env` itself is not the error system.

A rejected env report is not automatically a thrown error.

---

## Internal depth of the module

`env` is not a flat helper.  
It is a deep module with internal layers.

Expected inner flow includes:

- contract reading;
- config reading;
- bootstrap resolution;
- source plan resolution;
- source validation;
- loading;
- schema validation;
- trusted output or rejected report.

This entire layered pipeline still belongs to one module and one responsibility.

---

## Design direction

The current design direction of `env` is:

- strict;
- explicit;
- layered;
- service-owned at the boundary;
- platform-governed through contract language and validation rules;
- and report-oriented on rejection.

This direction is intentionally more demanding than a typical env loader.  
The purpose is to build a platform-grade configuration admission boundary, not a convenience utility.

---

## Fixed working rules

The following rules define the current env module baseline:

- `env` is a trust boundary;
- `env-contract` is received and validated before `env-config`;
- one run allows exactly one bootstrap method;
- bootstrap methods are `file`, `process`, `explicit-plan`;
- `method` and `mode` are unsafe until validated;
- default channel for both is `args`;
- default args keys are `--env-method` and `--env-mode`;
- process variable names are service-owned and defined in config;
- `method` is explicit and never inferred from shape;
- contract and config are separated;
- the module is deep and layered, not flat;
- raw input must not leak into the trusted platform zone;
- rejected reports must remain diagnostics-friendly and secret-safe.

These rules are the current baseline for continued env module design and implementation.
