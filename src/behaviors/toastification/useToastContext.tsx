import { useContext } from "react";
import { ToastContext } from "./contexts";

/** Toast behavior hook. */
export function useToastContext() {
    const ctx = useContext(ToastContext);
    if (!ctx) { throw new Error('useToastContext must be inside ToastProvider'); }

    return ctx;
}