import type ITagType from "./ITagType";

/** Describes the structure of the TagDTO */
export default interface ITag {
    /** DB ID */
    id: number,
    /** Tag Name */
    name: string,
    /** TagType of this Tag. */
    tagType: ITagType
}