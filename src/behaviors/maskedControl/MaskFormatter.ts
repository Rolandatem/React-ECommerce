/**
 * Masking/formatting function type for use in the mask registry.
 * @param value Raw input
 * @returns Masked/Formatted string
 */
export type MaskFormatter = (value: string) => string;