import { createEnum, type EnumValue } from 'zenums'

/**
 * Defines the supported input channels for resolving env bootstrap values.
 */
export const inputChannelContract = createEnum(['args', 'process', 'object'] as const)

export const INPUT_CHANNELS = inputChannelContract.constants

export type InputChannel = EnumValue<typeof inputChannelContract>

// Narrows the input channel type to the fixed default args channel.
export type DefaultInputChannel = typeof INPUT_CHANNELS.ARGS

// Override channels are explicit opt-ins in addition to the default args channel.
export type OverrideInputChannel = Exclude<InputChannel, DefaultInputChannel>
