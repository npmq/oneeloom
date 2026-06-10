# Logger Module Model

`logger` is the platform module model for safe, structured runtime logging.

The logger module defines how runtime events are represented, emitted, protected, and routed through explicit logging boundaries.

Its purpose is to make platform and service behavior observable without turning logging into hidden runtime behavior.

## Purpose

`logger` provides the shared logging model for platform modules, services, integrations, and runtime flows.

It is responsible for:

- structured runtime event output;
- log levels and severity rules;
- module, service, source, and stage metadata;
- bootstrap diagnostics;
- bootstrap and validation visibility;
- redaction and secret-safety rules;
- output formatting;
- transport boundaries;
- runtime diagnostics.

`logger` is not a wrapper around `console.log`.

It is a platform logging boundary that keeps runtime events structured, inspectable, and safe to emit.

## Bootstrap logging

`logger` must support logging during platform bootstrap.

This is important because diagnostics may be needed before final service configuration, external integrations, or full runtime composition are available.

Bootstrap logging must remain explicit and safe.

`logger` must not read raw environment input, process variables, `.env` files, or service-local configuration directly.

## Safety model

Logger output must be safe to inspect.

Logging must not expose unredacted secrets, credentials, tokens, private keys, raw environment values, or sensitive runtime data.

Modules and services that emit log events are responsible for passing safe event data into the logger boundary.

The logger module may provide redaction rules, formatting helpers, and policy controls, but it must not become a hidden runtime configuration reader.

## Logging profiles

The logger model is split into two planned profiles:

- `basic`
- `prime`

These profiles describe different logging needs while preserving the same responsibility boundary.

Logging makes runtime events observable, but it does not decide runtime behavior.

### `basic`

`basic` defines the minimal safe logging baseline.

It is intended for:

- bootstrap diagnostics;
- bootstrap visibility;
- development and local service logs;
- simple structured console output;
- low-overhead runtime events.

The `basic` profile should remain safe by default and must not read raw environment input directly.

Its role is to provide a simple and reliable logging foundation before stronger runtime logging policies are needed.

### `prime`

`prime` defines the stronger security-oriented logging profile.

It is intended for:

- production diagnostics;
- stricter redaction rules;
- controlled metadata output;
- transport policies;
- audit-friendly structured events;
- safer handling of sensitive runtime context.

The `prime` profile focuses on stronger safety, clearer policy boundaries, and more controlled observability.

It should provide stronger protection for security-sensitive runtime environments without changing the core responsibility of the logger module.

## Transport model

The logger model supports explicit transport boundaries.

Possible transport directions include:

- console output;
- file output;
- HTTP output;
- external logging systems;
- test or memory output.

Transport support must remain explicit and controlled.

A transport must not introduce hidden business behavior, hidden runtime decisions, or secret leakage.

## Relation to other layers

`logger` is related to `report`, `error`, and `composition`, but it does not replace them.

```text
report       -> describes structured validation or rejection output
error        -> represents failures and thrown errors
logger       -> emits structured runtime events
composition  -> decides runtime flow
```

A report may be logged.

An error may be logged.

A runtime transition may be logged.

But logging does not decide whether the platform continues, rejects input, throws an error, or stops execution.

## Boundary

`logger` must remain a structured logging module.

It must not:

- decide whether runtime execution continues or stops;
- throw errors by itself;
- mutate reports;
- read raw environment input directly;
- contain service-specific business logic;
- hide runtime configuration access;
- replace `report`, `error`, or `composition`.

The role of `logger` is to make runtime events observable, structured, and safe to inspect.
