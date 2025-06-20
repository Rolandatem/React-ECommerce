import SiteSettingsContext from "@/tools/contexts/SiteSettingsContext";
import { useContext, useEffect, useState } from "react";
import ListPageContents from "./components/ListPageContents";
import SectionLabel from "../common/components/SectionLabel";
import useCategories from "@/hooks/useCategories";
import { useParams } from "react-router-dom";
import NotFound404 from "../NotFound404";
import Error404 from "@/tools/exceptions/Error404";
import ErrorIndicator from "../common/components/ErrorIndicator";
import useTags from "@/hooks/useTags";
import MobileListPageContents from "./components/MobileListPageContents";

/** List Page component. */
const ListPage = () => {
    const { option } = useParams();
    const siteSettings = useContext(SiteSettingsContext);
    const [categoryName, setCategoryName] = useState<string>('');
    const [notFound, setNotFound] = useState<boolean>(false);
    const { getCategoryById, categoriesError } = useCategories();
    const { siteFilterTagTypes, loadSiteFilterTagTypes } = useTags();

    //===========================================================================================================================
    /** Effect that loads site filter tag types on once per mount. */
    useEffect(() => {
        loadSiteFilterTagTypes();
    }, [loadSiteFilterTagTypes])

    //===========================================================================================================================
    /** Effect that loads the category name based on the category id passed in the address. */
    useEffect(() => {
        if (option === undefined) {
            setNotFound(true);
            return;
        } else if (option.toLowerCase() === 'all') {
            setCategoryName('All Flooring');
            return;
        }

        (async() => {
            const category = await getCategoryById(parseInt(option));

            if (category !== undefined) {
                setCategoryName(category.name);
            }
        })();
    }, [getCategoryById, option])

    //===========================================================================================================================
    return (
        <>
            {
                (() => {
                    if (categoriesError.hasError && categoriesError.errorType === Error404) return <NotFound404 />
                    if (categoriesError.hasError) return <ErrorIndicator message={categoriesError.friendlyErrorMessage} />
                    if (notFound) return <NotFound404 />
                    return (
                        <>
                            <SectionLabel label={categoryName} className="mb-3" />
                            {
                                siteSettings?.isMobile
                                    ? <MobileListPageContents siteFilterTagTypes={siteFilterTagTypes} />
                                    : <ListPageContents siteFilterTagTypes={siteFilterTagTypes} />
                            }
                        </>
                    )
                })()
            }
        </>
    )
}

export default ListPage;