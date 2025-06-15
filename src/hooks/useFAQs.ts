import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import queryString from "@/tools/functions/queryString";
import type IFAQ from "@/tools/interfaces/IFAQ";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ITestOptions from "@/tools/interfaces/ITestOptions";
import { useCallback, useContext, useMemo, useState } from "react";

//===========================================================================================================================
const defaultErrorState: IFriendlyError = {hasError: false, friendlyErrorMessage: ''};

//===========================================================================================================================
const useFAQs = ({
    withDelay = false,
    withError = false}: ITestOptions = {}) => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const [loadingFAQs, setLoadingFAQs] = useState<boolean>(false);
    const [faqsError, setFAQsError] = useState<IFriendlyError>(defaultErrorState);

    //===========================================================================================================================
    const query = useMemo(() =>
        queryString(withError, withDelay),
        [withDelay, withError]);

    //===========================================================================================================================
    const getFAQs = useCallback(async(
        topten: boolean = false): Promise<IFAQ[]> => {
        
        setLoadingFAQs(true);
        setFAQsError(defaultErrorState);

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/faqs${topten ? '/top-ten' : ''}?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.ok === false) { throw new Error('Failed to fetch FAQs.'); }

            const data: IFAQ[] = await response.json();
            return data;
        } catch (error) {
            setFAQsError(asFriendlyError(error, "Sorry, we are having trouble loading FAQs.'"));
            return []
        } finally {
            setLoadingFAQs(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    const getFAQById = useCallback(async(
        id: number): Promise<IFAQ | null> => {
        
        setLoadingFAQs(true);
        setFAQsError(defaultErrorState);

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/faqs/${id}?${query.toString()}`;
            const response = await fetch(endpoint);

            if (response.ok === false) { throw new Error("Failed to fetch FAQ"); }

            const faq: IFAQ = await response.json();
            return faq;
        } catch (error) {
            setFAQsError(asFriendlyError(error, "Sorry, we are having trouble loading the specified FAQ."));
            return null;
        } finally {
            setLoadingFAQs(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    const castFAQVote = useCallback(async(
        id:number,
        voteType: string): Promise<IFriendlyError> => {

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/faqs/${id}/vote/${voteType}?${query.toString()}`;
            const response = await fetch(endpoint, {method: 'PATCH'});

            if (response.ok === false) { throw new Error('Unable to record vote.'); }

            return defaultErrorState;
        } catch (error) {
            return asFriendlyError(error, 'Sorry, unable to record your vote.');
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    return {
        loadingFAQs,
        faqsError,
        getFAQs,
        getFAQById,
        castFAQVote
    }
}

export default useFAQs;