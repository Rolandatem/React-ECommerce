import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type ISiteFilterTagType from "@/tools/interfaces/dtos/ISiteFilterTagType";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ITestOptions from "@/tools/interfaces/ITestOptions";
import { useCallback, useContext, useState } from "react";

/** Hook for the Tags API Endpoint. */
const useTags = (
    /** Indicates which API tests to use. */
    options: ITestOptions = {withDelay: false, withError: false}) => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const query = queryString(options);
    const [siteFilterTagTypes, setSiteFilterTagTypes] = useState<ISiteFilterTagType[]>([]);
    const [loadingSiteFilterTagTypes, setLoadingSiteFilterTagTypes] = useState<boolean>(false);
    const [siteFilterTagTypesError, setSiteFilterTagTypesError] = useState<IFriendlyError>({hasError: false});

    //===========================================================================================================================
    /** Loads all site filter tag types. */
    const loadSiteFilterTagTypes = useCallback(async() => {
        setLoadingSiteFilterTagTypes(true);
        setSiteFilterTagTypesError({hasError: false});

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/tag/sitefiltertagtypes?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.ok === false) { throw new Error('Failed to fetch SiteFilterTagTypes.'); }

            const data = await response.json();
            setSiteFilterTagTypes(data);
        } catch (error) {
            setSiteFilterTagTypesError(asFriendlyError(error, 'Failed to load Site Filter Tag Types.'));
        } finally {
            setLoadingSiteFilterTagTypes(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    return {
        siteFilterTagTypes,
        loadingSiteFilterTagTypes,
        siteFilterTagTypesError,
        loadSiteFilterTagTypes
    }
}

export default useTags;