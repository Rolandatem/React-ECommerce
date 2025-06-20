import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type IProduct from "@/tools/interfaces/dtos/IProduct";
import type IError from "@/tools/interfaces/IError";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ITestOptions from "@/tools/interfaces/ITestOptions";
import { useCallback, useContext, useState } from "react"

//===========================================================================================================================

/**
 * An empty ITrendingProduct only used to display visually to the user
 * while the real data is being requested from the API. This makes the
 * page look cleaner instead of flickering.
 */
const emptyTrendingProduct: IProduct = {
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
    categoryId: 0,
    productTags: [{
        id: 0,
        tag: {
            id: 1,
            name: 'None',
            tagType: {
                id: 1,
                name: 'ShipType'
            }
        }
    }]
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
    const [trendingProducts, setTrendingProducts] = useState<IProduct[]>([
        { ...emptyTrendingProduct, id: 1 },
        { ...emptyTrendingProduct, id: 2 },
        { ...emptyTrendingProduct, id: 3 },
    ]);
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

            const data: IProduct[] = await response.json();
            setTrendingProducts(data);
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