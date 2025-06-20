import type { ListPageFilterType } from "../types/ListPageFilterType";
import type { IFilterOption } from "./IFilterOption";

/** Group of filter options belonging to a single tag type */
export default interface IFilterGroup {
    /** DB ID of the TagType */
    id: number,
    /** Name of the TagType */
    name: string,
    /** Tag values for this type, as filter options */
    options: IFilterOption[],
    /** Filter type for UI and logic: "checkbox" or "radio" */
    filterType: ListPageFilterType
}