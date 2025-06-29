import React, {
    forwardRef,
    useEffect,
    useState,
    type InvalidEvent
} from "react";
import { Form } from "react-bootstrap";
import type { MaskedControlType } from "./MaskedControlType";
import type IMaskedControlProps from "./IMaskedControlProps";

/**
 * Masking/formatting function type for use in the mask registry.
 */
type MaskFormatter = (value: string) => string;

/**
 * Validates expiry in MM/YY format, ensures it's current month or in the future.
 * @param value MM/YY
 * @returns true if valid, false if expired/invalid
 */
const validateExpiry = (value: string): boolean => {
    
    if (!/^\d{2}\/\d{2}$/.test(value)) {
        return false;
    }

    const [mm, yy] = value.split("/").map(Number);
    if (mm < 1 || mm > 12) {
        return false;
    }

    const now = new Date(); // e.g., June 2024
    const fullYear = 2000 + yy;
    const expiry = new Date(fullYear, mm); // first of the month after expiry

    // Today is valid if before the next month's 1st date
    return now < expiry;
}

/**
 * Formats a string as (000) 000-0000.
 */
const formatPhone: MaskFormatter = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (!digits) {
        return "";
    }
    if (digits.length < 4) {
        return `(${digits}`;
    }
    if (digits.length < 7) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

/**
 * Formats a string to MM/YY, auto-inserts '/', and only allows valid months.
 */
const formatExpiry: MaskFormatter = (raw) => {
    // Only digits, max 4
    const digits = raw.replace(/\D/g, "").slice(0, 4);

    if (!digits) return "";
    if (digits.length === 1) {
        // Only allow '0' or '1'
        if (digits !== "0" && digits !== "1") return "";
        return digits;
    }
    if (digits.length === 2) {
        const month = parseInt(digits, 10);
        // Only allow 01-12
        if (month < 1 || month > 12) return digits[0]; // Drop second digit if invalid month
        return `${digits}/`;
    }
    // Length 3 or 4
    const month = parseInt(digits.slice(0, 2), 10);
    if (month < 1 || month > 12) return digits[0]; // Only keep first digit if invalid
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
};

/**
 * Mapping between mask type and their formatters & rules.
 */
const maskRegistry: Record<MaskedControlType, {
    formatter: MaskFormatter;
    pattern: string;
    maxLength: number;
    customValidate?: (value: string) => boolean;
}> = {
    phone: {
        formatter: formatPhone,
        pattern: String.raw`\(\d{3}\) \d{3}-\d{4}`,
        maxLength: 14,
    },
    expiry: {
        formatter: formatExpiry,
        pattern: String.raw`\d{2}/\d{2}`,
        maxLength: 5,
        customValidate: validateExpiry,
    },
};

/**
 * A React-Bootstrap compatible masked input for phone or expiry, easily extensible for new masks.
 * FloatingLabel-friendly and checkValidity()-compatible.
 */
const MaskedControl = forwardRef<HTMLInputElement, IMaskedControlProps>(
    ({ mask, value, onChange, onInvalid, ...props }, ref) => {
        const { formatter, pattern, maxLength, customValidate } = maskRegistry[mask as MaskedControlType];

        // Internal masked value state
        const [internalValue, setInternalValue] = useState<string>(() => formatter(String(value ?? "")));

        // Sync external value to internal formatting if parent value changes
        useEffect(() => {
            setInternalValue(formatter(String(value ?? "")));
        }, [value, formatter]);

        /**
         * Mask the value, update local state, and trigger parent onChange.
         */
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const maskedValue = formatter(e.target.value);
            setInternalValue(maskedValue);

            // --- CUSTOM VALIDATION: Always run on change!
            if (customValidate) {
                const isValid = customValidate(maskedValue);
                if (!isValid) {
                    e.target.setCustomValidity(
                        mask === "expiry"
                            ? "Please enter a valid, non-expired MM/YY date."
                            : "Please enter a valid value."
                    );
                } else {
                    e.target.setCustomValidity("");
                }
            }

            if (onChange) {
                onChange({
                    target: {
                        name: e.target.name,
                        value: maskedValue ?? "",
                        type: e.target.type,
                        checked: (e.target as HTMLInputElement).checked,
                    }
                });
            }
        }

        /**
         * Only allow appropriate key input for the mask.
         */
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            // Always allow navigation & backspace
            if (
                ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Home", "End"].includes(e.key)
            ) {
                return;
            }

            if (mask === "phone") {
                const val = e.currentTarget.value.replace(/\D/g, "");
                // Only allow number keys & up to 10 digits
                if (!/^\d$/.test(e.key) || val.length >= 10) {
                    e.preventDefault();
                }
            }

            if (mask === "expiry") {
                const val = e.currentTarget.value.replace(/\D/g, "");

                // Slash should NEVER be entered manually
                if (e.key === "/") {
                    e.preventDefault();
                    return;
                }

                // Only digits, up to 4
                if (!/^\d$/.test(e.key) || val.length >= 4) {
                    e.preventDefault();
                    return;
                }

                // First digit must be 0 or 1
                if (val.length === 0 && !["0", "1"].includes(e.key)) {
                    e.preventDefault();
                    return;
                }

                // Second digit rules
                if (val.length === 1) {
                    if (val === "0" && !/[1-9]/.test(e.key)) {
                        e.preventDefault();
                        return;
                    }
                    if (val === "1" && !/[0-2]/.test(e.key)) {
                        e.preventDefault();
                        return;
                    }
                }
            }
        };

        /**
         * Custom expiry validation feedback
         */
        const handleInvalid = (e: InvalidEvent<HTMLInputElement>) => {
            if (customValidate) {
                if (!customValidate(e.currentTarget.value)) {
                    e.currentTarget.setCustomValidity(
                        mask === "expiry"
                            ? "Please enter a valid, non-expired MM/YY date."
                            : "Please enter a valid value."
                    );
                } else {
                    e.currentTarget.setCustomValidity("");
                }
            }
            if (onInvalid) {
                onInvalid(e);
            }
        };

        return (
            <Form.Control
                {...props}
                ref={ref}
                inputMode="numeric"
                value={internalValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onInvalid={handleInvalid}
                pattern={pattern}
                maxLength={maxLength}
                autoComplete="off"
            />
        );
    }
);

export default MaskedControl;