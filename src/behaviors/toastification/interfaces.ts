import type { ReactNode } from "react";
import type { ToastFunction, ToastVariant } from "./types";

/** Describes the structure of a the toast message behavior. */
export interface IToastMessage {
    /** Unique ID used mainly to filter timed out toasts. */
    id: string,
    /** Optional header used to override the default header by variant. */
    header?: string,
    /** Message to display in the body of the toast. It can be either a string text, or JSX. */
    message: string | ReactNode,
    /** The bootstrap-ish variant to use in the toast. */
    variant: ToastVariant
}

/** Describes the structure of the main toast function and allows the user to specify the type of toast to use. */
export interface IToastAPI {
    /** Informational toast. */
    info: ToastFunction,
    /** Success toast. */
    success: ToastFunction,
    /** Warning toast. */
    warning: ToastFunction,
    /** Error toast. */
    error: ToastFunction
}

/** Describes the structure for the toast provider. */
export interface IToastProvider {
    /** Children JSX under the provider. */
    children?: ReactNode,
    /** Indicates if in mobile mode. */
    isMobile: boolean
}

/** Describes the prop structure for the ToastContainer. */
export default interface IToastContainerProps {
    toasts: IToastMessage[]
    position: 'top-end' | 'bottom-center'
}