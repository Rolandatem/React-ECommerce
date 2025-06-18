import type IErroredFieldLabel from "@/tools/interfaces/IErrorFieldLabel";

/**
 * Simple component used in the 'label' prop of things like the floating label.
 * All this does is make sure that it can use the default text color for the
 * label, but displays '--error' with the text-danger' class and is
 * reusable.
 */
const ErroredFieldLabel = (props: IErroredFieldLabel) => {
    return (
        <>
            <span>{props.label}</span>
            <span className="text-danger">
                {
                    props.isError && '--error'
                }
            </span>
        </>
    )
}

export default ErroredFieldLabel;