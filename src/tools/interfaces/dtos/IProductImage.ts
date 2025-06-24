import type IImageType from "./IImageType";

/** Describes the structure of the Product Image DTO. */
export default interface IProductImage {
    /** DB ID */
    id: number,
    /** Image Name */
    imageName: string,
    /** Image Type */
    imageType: IImageType
}