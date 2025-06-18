import { createContext } from "react";
import type { IToastAPI } from "./interfaces";
import type { ToastContextType } from "./types";

/** Global toast function to use in components. */
export const toast: IToastAPI = {
    info: () => {},
    success: () => {},
    warning: () => {},
    error: () => {}
}

/** Toast behavior context. */
export const ToastContext = createContext<ToastContextType | undefined>(undefined);