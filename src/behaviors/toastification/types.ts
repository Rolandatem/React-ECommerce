import type { ReactNode } from "react";

/** Variant options that can be used in a toast. */
export type ToastVariant = 'secondary' |'success' | 'warning' | 'danger';

/** Defines the structure for a toast function. */
export type ToastFunction = (message: string | ReactNode, header?: string) => void;

/** Defines the structure for the ToastContext. */
export type ToastContextType = {
    addToast: (
        message: string | ReactNode,
        variant: ToastVariant,
        header?: string
    ) => void
}