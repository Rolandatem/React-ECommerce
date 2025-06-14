import type ICategory from "./ICategory";
import type IError from "./IError";

/** Defines structure of the exported functions of the useCategories hook. */
export default interface IUseCategoriesExports {
    /** Current loaded categories. */
    categories: ICategory[],
    /** Indicates that the categories are currently loading from the API. */
    loadingCategories: boolean,
    /** Contains error information if the API encountered any. */
    categoriesError: IError
}