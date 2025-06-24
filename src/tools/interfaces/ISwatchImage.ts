/** Defines the structure for the SwatchImage object. */
export default interface ISwatchImage {
    /** Url for the swatch, cleaned out so url won't bomb. */
    url: string,
    /** Original Image name. The uncleaned name of the color so we can compare and find the original tag after selection. */
    originalName: string
}