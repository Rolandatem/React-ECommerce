import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import ShipType from "@/tools/enums/ShipType";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type IError from "@/tools/interfaces/IError";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ITestOptions from "@/tools/interfaces/ITestOptions";
import type ITrendingProduct from "@/tools/interfaces/ITrendingProduct";
import { useCallback, useContext, useState } from "react"

/**
 * Iterates through the lsit of products and converts the integer value returned from
 * the API to the local ShipType object. This is because there is no direct conversion
 * from C# enumeration to the local one.
 * NOTE: Disabling warning here because the types don't match but it is necessary
 * to not be type-strict here.
 * @param products List of ITrendingProduct to convert the shipType value for.
 * @returns List of ITrendingProduct's with the converted shipType value.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const swapShipType = async(products: any[]): Promise<ITrendingProduct[]> => {
    return products.map(product => {
        return {
            ...product,
            shipType: ShipType.ConvertToShipType(product.shipType)
        }
    });
}
//===========================================================================================================================

/**
 * An empty ITrendingProduct only used to display visually to the user
 * while the real data is being requested from the API. This makes the
 * page look cleaner instead of flickering.
 */
const emptyTrendingProduct: ITrendingProduct = {
    id: 0,
    sku: '',
    productName: '',
    imageUrl: 'trending/empty.webp',
    stars: 0,
    reviews: 0,
    colorCount: 0,
    description: '\u00A0 '.repeat(100), //--Simulate a 2 line description.
    salePrice: 0,
    originalPrice: 0,
    savingsPercentage: 0,
    shipType: ShipType.None
}

//===========================================================================================================================
const defaultErrorState: IFriendlyError = {hasError: false, friendlyErrorMessage: ''};

//===========================================================================================================================
/** Hook used to communicate with the TrendingOptions API endpoint. */
const useTrendingProducts = (
    /** Indicates which API test options to use. */
    options: ITestOptions = {withDelay: false, withError: false}) => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const [trendingProducts, setTrendingProducts] = useState<ITrendingProduct[]>([
        {...emptyTrendingProduct, id: 1}, 
        {...emptyTrendingProduct, id: 2},
        {...emptyTrendingProduct, id: 3}]);
    const [loadingTrendingProducts, setLoadingTrendingProducts] = useState<boolean>(false);
    const [trendingProductsError, setTrendingProductsError] = useState<IError>({hasError: false})
    const query = queryString(options);

    //===========================================================================================================================
    /** Loads all trending produts. */
    const loadTrendingProducts = useCallback(async() => {
        setLoadingTrendingProducts(true);
        setTrendingProductsError(defaultErrorState);

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/trendingproducts?${query.toString()}`;
            const response = await fetch(endpoint);
            
            if (response.ok === false) { throw new Error('Failed to fetch Trending Products.'); }

            const data: ITrendingProduct[] = await response.json();
            setTrendingProducts(await swapShipType(data));
        } catch (error) {
            setTrendingProductsError(asFriendlyError(error, `Sorry, we're having trouble loading the Trending Products.`));
        } finally {
            setLoadingTrendingProducts(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    return { 
        trendingProducts, 
        loadingTrendingProducts, 
        trendingProductsError,
        loadTrendingProducts
    }
}

export { useTrendingProducts, emptyTrendingProduct };