import { Toast, ToastContainer } from "react-bootstrap";
import type IToastContainerProps from "./interfaces";

/** Converter used to pick the appropriate prime icon image for the variant used. */
const variantToIcon: Record<string, string> = {
    secondary: 'pi pi-info-circle',
    success: 'pi pi-verified',
    warning: 'pi pi-exclamation-circle',
    danger: 'pi pi-times-circle'
}

/** Converter used to pick the appropriate header label for the variant used. */
const variantToHeader: Record<string, string> = {
    secondary: 'Information',
    success: 'Success',
    warning: 'Warning',
    danger: 'Error'
}

/**
 * Toast behavior component.
 * @param IToastContainerProps
 */
const Toaster = ({toasts, position}: IToastContainerProps) => (
    <ToastContainer position={position} className="position-fixed" style={{paddingTop: '60px', zIndex: 9999}}>
        {
            toasts.map(({id, message, header, variant}) => (
                <Toast key={id} bg={variant} animation>
                    <Toast.Header>
                        <span className={`${variantToIcon[variant]} me-2`}></span>
                        <strong className="me-auto">{header ?? variantToHeader[variant]}</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{message}</Toast.Body>
                </Toast>
            ))
        }
    </ToastContainer>
)

export default Toaster;