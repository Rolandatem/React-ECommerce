import type IError from "./IError";
import type ITrendingProduct from "./ITrendingProduct";

/** Returned variables from the useTrendingProducts hook. */
export default interface IUseTrendingProductExports {
    /** Array of ITrendingProduct returned from the API. */
    trendingProducts: ITrendingProduct[],
    /** Flag used to determine if the API is currently working to retrieve data. */
    loadingTrendingProducts: boolean,
    /** Contains API error information if any. */
    trendingProductsError: IError
}