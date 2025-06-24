import type IProduct from "./dtos/IProduct";
import type ITag from "./dtos/ITag";

/** Defines the props for the color select product page component. */
export default interface IColorSelect {
    /** Current product */
    product: IProduct,
    /** Variable state setter for the selected color. */
    setSelectedColor: React.Dispatch<React.SetStateAction<ITag | undefined>>
}