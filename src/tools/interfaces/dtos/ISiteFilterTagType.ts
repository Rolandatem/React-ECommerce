import type { ListPageFilterType } from "@/tools/types/ListPageFilterType";
import type ITagType from "./ITagType";

/** Defines the structure of a site filter tag type. */
export default interface ISiteFilterTagType {
    /** DB ID */
    id: number,
    /** Tag Type ID */
    tagTypeId: number,
    /** Tag Type */
    tagType: ITagType
    /** Filter Type */
    filterType: ListPageFilterType
}