import { createEnum, type EnumValue } from 'zenums'

/**
 * Defines the bootstrap methods that may admit raw env input into validation.
 */
export const bootstrapMethodContract = createEnum(['file', 'process', 'explicit-plan'] as const)

export const BOOTSTRAP_METHODS = bootstrapMethodContract.constants

export type BootstrapMethod = EnumValue<typeof bootstrapMethodContract>
