# Config Creator

`config-creator/` is the core module direction for creating trusted service configuration from validated inputs.

This module works after raw environment input has passed through the env admission boundary.

It represents the platform step where validated input models become service-ready configuration.

## Purpose

`config-creator/` may include shared support for:

- config creation rules;
- mode-based config shaping;
- service config builders;
- config validation helpers;
- integration with validated env module output.

Config creation keeps service configuration explicit by separating raw input admission from final service-ready configuration shaping.

## Boundary

`config-creator/` is a configuration creation module.

It creates trusted service configuration from already validated inputs.

| Concern | Owner |
| --- | --- |
| Raw environment admission | `core/modules/env/` |
| Trusted service configuration creation | `core/modules/config-creator/` |
| Service runtime assembly | `core/composition/` and `services/` |
| Service-specific configuration bindings | `services/<service-name>/configs/` |
| Service business behavior | `services/` |

The role of `config-creator/` is to create trusted service configuration while keeping raw input admission, runtime assembly, and service-specific behavior in their own responsibility areas.

## Architecture reference

For the full core structure model, see:

```text
../../../docs/architecture/core-structure.md
```
