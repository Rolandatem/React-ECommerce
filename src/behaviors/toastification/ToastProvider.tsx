import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { IToastMessage, IToastProvider } from "./interfaces";
import type { ToastVariant } from "./types";
import { toast, ToastContext } from "./contexts";
import Toaster from "./Toaster";

/**
 * Provider for the toast behavior.
 * @param IToastProvider
 */
export const ToastProvider = ({ children, isMobile }: IToastProvider) => {
    const [toasts, setToasts] = useState<IToastMessage[]>([]);

    /** Base toastification function. */
    const addToast = useCallback((
        message: string | ReactNode,
        variant: ToastVariant,
        header?: string) => {

        const id = `${Date.now()}-${Math.random()}`;

        setToasts(prev => [
            ...prev,
            {
                id,
                message,
                header,
                variant
            }
        ]);

        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
    }, [])

    /** Effect used to generate the available variant-specific toasts. */
    useEffect(() => {
        toast.info = (message, options) => addToast(message, 'secondary', options);
        toast.success = (message, options) => addToast(message, 'success', options);
        toast.warning = (message, options) => addToast(message, 'warning', options);
        toast.error = (message, options) => addToast(message, 'danger', options);
    }, [addToast])

    return (
        <ToastContext.Provider value={{addToast}}>
            {children}
            <Toaster toasts={toasts} position={isMobile ? 'bottom-center' : 'top-end'} />
        </ToastContext.Provider>
    )
}

