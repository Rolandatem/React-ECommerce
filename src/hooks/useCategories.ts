import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import Error404 from "@/tools/exceptions/Error404";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type ICategory from "@/tools/interfaces/ICategory";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ITestOptions from "@/tools/interfaces/ITestOptions";
import { useCallback, useContext, useState } from "react";

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
const defaultErrorState: IFriendlyError = {hasError: false, friendlyErrorMessage: ''};

//===========================================================================================================================
/** Hook for the Category API Endpoint. */
const useCategories = (
    /** Indicates which API test options to use. */
    options: ITestOptions = {withDelay: false, withError: false}) => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const [categories, setCategories] = useState<ICategory[]>([
        {...emptyCategory, id: 1},
        {...emptyCategory, id: 2},
        {...emptyCategory, id: 3}]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
    const [categoriesError, setCategoriesError] = useState<IFriendlyError>({hasError: false});
    const query = queryString(options);

    //===========================================================================================================================
    /** Loads product categories. */
    const loadCategories = useCallback(async() => {
        setLoadingCategories(true);
        setCategoriesError(defaultErrorState);

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/category?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.ok === false) { throw new Error('Failed to fetch Categories.'); }

            let data: ICategory[] = await response.json();

            //--Inject fake 'All Flooring' category.
            data = [{
                id: 0,
                name: 'All Flooring',
                imageUrl: 'categories/all_flooring.webp',
                listPageUrl: 'list/all'                    
            }, ...data];

            setCategories(data);
        } catch (error) {
            setCategoriesError(asFriendlyError(error, `Sorry, we're having trouble loading Categories.`));
        } finally {
            setLoadingCategories(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Get's the category by the category id. */
    const getCategoryById = useCallback(async(
        /** DB ID of the category to get the name of. */
        categoryId: number) => {
        
        try {
            const endpoint = `${siteSettings?.webAPIUrl}/category/${categoryId}?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.status === 404) { throw new Error404(`Category for ID: ${categoryId} does not exist.`); }
            if (response.ok === false) { throw new Error(`Failed to fetch the Category for ID: ${categoryId}`); }

            const category: ICategory = await response.json();
            return category;
        } catch(error) {
            setCategoriesError(asFriendlyError(error, `Sorry but we're unable to get the category.`));
            return undefined;
        }
    }, [query, siteSettings?.webAPIUrl])
    
    //===========================================================================================================================
    return { 
        categories, 
        loadingCategories, 
        categoriesError,
        loadCategories,
        getCategoryById
    }
}

export default useCategories;