import type ITag from "./ITag";

/** Describes the structure of the ProductTagDTO */
export default interface IProductTag {
    /** DB ID */
    id: number,
    /** Tag for the Product */
    tag: ITag
}