/**
 * Minimal event shape for change handlers (name & value only).
 */
export type MinimalChangeEvent = {
  target: {
    name: string;
    value: string;
    type?: string;    // remains compatible with checkboxes etc.
    checked?: boolean;
  }
}