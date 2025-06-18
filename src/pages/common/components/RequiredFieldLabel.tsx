import type IFieldLabel from "@/tools/interfaces/IFieldLabel";

/**
 * Simple component used in the 'label' prop of things like the floating label.
 * All this does is make sure that it can use the default text color for the
 * label, but displays an asterisk with the 'text-danger' class and is
 * reusable.
 */
const RequiredFieldLabel = (props: IFieldLabel) => {
    return (
        <>
            <span>{props.label}</span>
            <span className="text-danger">*</span>
        </>
    )
}

export default RequiredFieldLabel;