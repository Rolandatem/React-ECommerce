import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import ShipType from "@/tools/enums/ShipType";
import APIError from "@/tools/exceptions/APIError";
import queryString from "@/tools/functions/queryString";
import type IError from "@/tools/interfaces/IError";
import type ITrendingProduct from "@/tools/interfaces/ITrendingProduct";
import type IUseTrendingProductExports from "@/tools/interfaces/IUseTrendingProductExports";
import { useContext, useEffect, useState } from "react"

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
/**
 * Hook used to retrieve trending product information from the API.
 * @param withDelay Optional parameter that allows testing with a 2 second latency. Default false.
 * @param withError Optional parameter that allows testing with an error returned from the API. Default false. 
 */
const useTrendingProducts = ({
        withDelay = false as boolean, 
        withError = false as boolean} = {}): IUseTrendingProductExports => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const [trendingProducts, setTrendingProducts] = useState<ITrendingProduct[]>([
        {...emptyTrendingProduct, id: 1}, 
        {...emptyTrendingProduct, id: 2},
        {...emptyTrendingProduct, id: 3}]);
    const [loadingTrendingProducts, setLoadingTrendingProducts] = useState<boolean>(false);
    const [trendingProductsError, setTrendingProductsError] = useState<IError>({hasError: false})

    //===========================================================================================================================
    useEffect(() => {
        const query = queryString(withDelay, withError);
        const fetchTrendingProducts = async() => {
            setLoadingTrendingProducts(true);
            try {
                await fetch(`${siteSettings?.webAPIUrl}/trendingproducts?${query.toString()}`)
                    .then(async response => {
                        const json = await response.json();
                        if (response.ok === false) {
                            console.log('APIERROR: ', json);
                            throw new APIError(json);
                        }

                        return json;
                    })
                    .then(async json => setTrendingProducts(await swapShipType(json)));
            } catch(error) {
                if (error instanceof APIError === false) {
                    console.log('Unhandled:', error);
                }

                setTrendingProductsError({
                    hasError: true,
                    friendlyErrorMessage: `Sorry, we're having trouble loading the Trending Products.`
                })
            } finally {
                setLoadingTrendingProducts(false);
            }
        }

        fetchTrendingProducts();
    }, [siteSettings?.webAPIUrl, withDelay, withError])

    //===========================================================================================================================
    return { trendingProducts, loadingTrendingProducts, trendingProductsError }
}

export { useTrendingProducts, emptyTrendingProduct };