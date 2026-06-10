/**
 * Defines the default CLI argument keys used to resolve env bootstrap values.
 */
export const DEFAULT_BOOTSTRAP_ARG_KEYS = {
  method: '--env-method',
  mode: '--env-mode',
} as const

export type DefaultBootstrapArgKeys = typeof DEFAULT_BOOTSTRAP_ARG_KEYS

// Narrows default bootstrap argument keys to the `method` key.
export type BootstrapMethodArgKey = DefaultBootstrapArgKeys['method']

// Narrows default bootstrap argument keys to the `mode` key.
export type BootstrapModeArgKey = DefaultBootstrapArgKeys['mode']
