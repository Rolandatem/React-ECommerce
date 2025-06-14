import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import APIError from "@/tools/exceptions/APIError";
import queryString from "@/tools/functions/queryString";
import type ICategory from "@/tools/interfaces/ICategory";
import type IError from "@/tools/interfaces/IError";
import type IUseCategoriesExports from "@/tools/interfaces/IUseCategoriesExports";
import { useContext, useEffect, useState } from "react";

/**
 * An empty category used as a placeholder category visually to the
 * use while waiting on the API response.
 */
const emptyCategory : ICategory = {
    id: 0,
    name: '',
    imageUrl: 'categories/empty.webp',
    listPageUrl: ''
}

//===========================================================================================================================
/** Hook for the Category API Endpoint. */
const useCategories = ({
    withDelay = false as boolean,
    withError = false as boolean} = {}) : IUseCategoriesExports => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const [categories, setCategories] = useState<ICategory[]>([
        {...emptyCategory, id: 1},
        {...emptyCategory, id: 2},
        {...emptyCategory, id: 3}]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [categoriesError, setCategoriesError] = useState<IError>({hasError: false});

    //===========================================================================================================================
    useEffect(() => {
        const query = queryString(withDelay, withError);
        const fetchCategories = async() => {
            setLoadingCategories(true);
            try {
                await fetch (`${siteSettings?.webAPIUrl}/category?${query.toString()}`)
                    .then(async response => {
                        const json = await response.json();
                        if (response.ok == false) {
                            console.log('APIERROR: ', json);
                            throw new APIError(json);
                        }
                        setCategories(json);
                    });
            } catch (error) {
                if (error instanceof APIError === false) {
                    console.log('Unhandled: ', error);
                }

                setCategoriesError({
                    hasError: true,
                    friendlyErrorMessage: `Sorry, we're having trouble loading Categoryies.`
                })
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, [siteSettings?.webAPIUrl, withDelay, withError])
    
    //===========================================================================================================================
    return { categories, loadingCategories, categoriesError }
}

export default useCategories;