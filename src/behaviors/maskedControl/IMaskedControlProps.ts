import type { Form } from "react-bootstrap";
import type { MaskedControlType } from "./MaskedControlType";
import type { ChangeEvent, InvalidEvent } from "react";

/**
 * Props for MaskedControl.
 */
export default interface IMaskedControlProps extends React.ComponentPropsWithoutRef<typeof Form.Control> {
    /** The input mask type (e.g., 'phone', 'expiry'). */
    mask: MaskedControlType;
    /**
     * Called when input changes (with masking & formatting).
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Called when input fails validation.
     */
    onInvalid?: (e: InvalidEvent<HTMLInputElement>) => void;
}