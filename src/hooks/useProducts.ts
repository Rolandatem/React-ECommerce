import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type IError from "@/tools/interfaces/IError";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type IProduct from "@/tools/interfaces/dtos/IProduct";
import type ITestOptions from "@/tools/interfaces/ITestOptions";
import { useCallback, useContext, useState } from "react";

//===========================================================================================================================
const defaultErrorState: IFriendlyError = {hasError: false, friendlyErrorMessage: ''}

/** Hook for the Product API Endpoint. */
const useProducts = (
    /** Indicates which API test options to use. */
    options: ITestOptions = {withDelay: false, withError: false}) => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false);
    const [productsError, setProductsError] = useState<IError>(defaultErrorState);
    const query = queryString(options);

    //===========================================================================================================================
    /** Loads all products from the API. */
    const loadAllProducts = useCallback(async() => {
            
        setLoadingProducts(true);
        setProductsError(defaultErrorState);

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/product?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.ok === false) { throw new Error('Failed to fetch Products.'); }

            const data = await response.json();
            setProducts(data);
        } catch(error) {
            setProductsError(asFriendlyError(error, `Sorry we're having trouble loading products.`));
        } finally {
            setLoadingProducts(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Gets a product from the API that matches the ID specified. */
    const getProductById = useCallback(async(
        /** Product Id */
        id: number) => {
        
        try {
            const endpoint = `${siteSettings?.webAPIUrl}/product/${id}?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.ok === false) { throw new Error(`Failed to fetch Product ID: ${id}`); }

            const data = await response.json();
            return data;
        } catch (error) {
            return asFriendlyError(error, `Sorry we're having trouble loading that product.`);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Loads all products from the API that match the category id specified. */
    const loadProductsByCategoryId = useCallback(async(
        id?: number) => {

        if (id === undefined) {
            await loadAllProducts();
            return;
        }
        
        setLoadingProducts(true);
        setProductsError(defaultErrorState);
        try {
            const endpoint = `${siteSettings?.webAPIUrl}/product/bycategory/${id}?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.ok === false) { throw new Error(`Failed to fetch Products with Category Id: ${id}`); }

            const data = await response.json();
            setProducts(data);
        } catch (error) {
            setProductsError(asFriendlyError(error, `Sorry, we're having trouble loading products.`));
        } finally {
            setLoadingProducts(false);
        }
    }, [loadAllProducts, query, siteSettings?.webAPIUrl])

    return {
        products,
        loadingProducts,
        productsError,
        loadAllProducts,
        loadProductsByCategoryId,
        getProductById
    }
}

export default useProducts;