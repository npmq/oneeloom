import type { BootstrapMethod } from './bootstrap-method'
import type { DefaultInputChannel, OverrideInputChannel } from './input-channel'

/**
 * Defines how a required bootstrap value may be resolved from input channels.
 */
export type BootstrapInputContract = {
  defaultChannel: DefaultInputChannel
  allowedOverrideChannels: readonly OverrideInputChannel[]
}

// Shared shape for required bootstrap values such as method and mode.
type RequiredBootstrapValueContract<TValue extends string> = {
  required: true
  values: readonly TValue[]
  input: BootstrapInputContract
}

export type BootstrapMethodContract = RequiredBootstrapValueContract<BootstrapMethod>

export type BootstrapModeContract<TMode extends string = string> =
  RequiredBootstrapValueContract<TMode>

/**
 * Fixes the strict bootstrap policy used by the env admission boundary.
 */
export const STRICT_BOOTSTRAP_POLICY = {
  allowImplicitMethodInference: false,
  allowImplicitModeInference: false,
  allowMixedMethods: false,
  allowFallbackBetweenMethods: false,
} as const

export type BootstrapPolicyContract = typeof STRICT_BOOTSTRAP_POLICY

/**
 * Requires schema validation before env input may enter the trusted zone.
 */
export const REQUIRED_SCHEMA_CONTRACT = {
  required: true,
} as const

export type SchemaContract = typeof REQUIRED_SCHEMA_CONTRACT

/**
 * Defines the initial service-owned env contract for bootstrap admission.
 */
export type EnvContract<TMode extends string = string> = {
  bootstrap: {
    method: BootstrapMethodContract
    mode: BootstrapModeContract<TMode>
    schema: SchemaContract
    policy: BootstrapPolicyContract
  }
}
