import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import asFriendlyError from "@/tools/functions/asFriendlyError";
import inFetch from "@/tools/functions/inFetch";
import queryString from "@/tools/functions/queryString";
import type IFAQ from "@/tools/interfaces/IFAQ";
import type IFriendlyError from "@/tools/interfaces/IFriendlyError";
import type ISubmitQuestionForm from "@/tools/interfaces/ISubmitQuestionForm";
import type ITestOptions from "@/tools/interfaces/ITestOptions";
import { useCallback, useContext, useState } from "react";

//===========================================================================================================================
const defaultErrorState: IFriendlyError = {hasError: false, friendlyErrorMessage: ''};

//===========================================================================================================================
/** Hook used to communicate with the FAQs API Endpoint. */
const useFAQs = (
    /** Indicates which API test options to use. */
    options: ITestOptions = {withDelay: false, withError: false}) => {

    //===========================================================================================================================
    const siteSettings = useContext(SiteSettingsContext);
    const [faqs, setFAQs] = useState<IFAQ[]>();
    const [loadingFAQs, setLoadingFAQs] = useState<boolean>(false);
    const [faqsError, setFAQsError] = useState<IFriendlyError>(defaultErrorState);
    const query = queryString(options);

    //===========================================================================================================================
    /** Loads all FAQ's from the API. */
    const loadFAQs = useCallback(async(
        /** Flag used to indicate that you want the top 10 instead of all. */
        topten: boolean = false) => {
        
        setLoadingFAQs(true);
        setFAQsError(defaultErrorState);

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/faqs${topten ? '/top-ten' : ''}?${query.toString()}`;
            const response = await inFetch(endpoint);

            if (response.ok === false) { throw new Error('Failed to fetch FAQs.'); }

            const data: IFAQ[] = await response.json();
            setFAQs(data);
        } catch (error) {
            setFAQsError(asFriendlyError(error, "Sorry, we are having trouble loading FAQs.'"));
        } finally {
            setLoadingFAQs(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Gets a FAQ by it's ID. */
    const getFAQById = useCallback(async(
        /** FAQ ID */
        id: number): Promise<IFAQ | null> => {
        
        setLoadingFAQs(true);
        setFAQsError(defaultErrorState);

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/faqs/${id}?${query.toString()}`;
            const response = await inFetch(endpoint);

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
    /** Notifies API of a FAQ helpful vote. */
    const castFAQVote = useCallback(async(
        /** FAQ ID */
        id:number,
        /** Vote type */
        voteType: "up" | "down"): Promise<IFriendlyError> => {

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/faqs/${id}/vote/${voteType}?${query.toString()}`;
            const response = await inFetch(endpoint, {method: 'PATCH'});

            if (response.ok === false) { throw new Error('Unable to record vote.'); }

            return defaultErrorState;
        } catch (error) {
            return asFriendlyError(error, 'Sorry, unable to record your vote.');
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Searches FAQs */
    const searchFAQs = useCallback(async(
        /** User search query */
        searchQuery: string) => {

        setLoadingFAQs(true);
        setFAQsError(defaultErrorState);
        try {
            query.append('query', searchQuery);
            const endpoint = `${siteSettings?.webAPIUrl}/faqs/search?${query.toString()}`;
            const response = await inFetch(endpoint);
            
            if (response.ok === false) { throw new Error('Unable to search FAQs'); }

            setFAQs(await response.json());
            return defaultErrorState;
        } catch (error) {
            return asFriendlyError(error, `Sorry, we're having trouble searching the FAQs.`);
        } finally {
            setLoadingFAQs(false);
        }
    }, [query, siteSettings?.webAPIUrl])

    //===========================================================================================================================
    /** Posts a user submitted question for FAQ. */
    const submitFAQ = useCallback(async(
        /** User submitted question. */
        userSubmission: ISubmitQuestionForm) => {

        try {
            const endpoint = `${siteSettings?.webAPIUrl}/faqs`;
            const response = await inFetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: userSubmission.question, email: userSubmission.email })
            });

            if (response.ok === false) { throw new Error('Unable to post question.'); }
            return defaultErrorState;
        } catch (error) {
            return asFriendlyError(error, 'Sorry, but there was a problem submitting the FAQ question.');
        }
    }, [siteSettings?.webAPIUrl])

    //===========================================================================================================================
    return {
        faqs,
        setFAQs,
        loadingFAQs,
        faqsError,
        loadFAQs,
        getFAQById,
        castFAQVote,
        searchFAQs,
        submitFAQ
    }
}

export default useFAQs;