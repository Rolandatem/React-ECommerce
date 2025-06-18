import type IFieldLabel from "./IFieldLabel";

/** Defines the structure for the errored field label component. */
export default interface IErroredFieldLabel extends IFieldLabel {
    /** Indicates if there is an error. */
    isError: boolean
}