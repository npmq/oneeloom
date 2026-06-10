# CI

`ci/` is the workspace area for repository-level CI configuration and automation support.

This directory may contain CI definitions, reusable workflow helpers, and automation-related configuration for repository checks, validation, and release support.

## Boundary

`ci/` supports repository automation.

CI configuration belongs to repository workflows and should keep service runtime logic, platform module behavior, and environment secrets outside this area.
