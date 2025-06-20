import type IUseListPageLogicArgs from "@/tools/interfaces/IUseListPageLogicArgs";
import { useParams } from "react-router-dom";
import useProducts from "./useProducts";
import { useEffect, useState } from "react";
import type { SelectedListPageTagFilters } from "@/tools/types/SelectedListPageTagFilters";
import type IProduct from "@/tools/interfaces/dtos/IProduct";

const useListPageLogic = ({
    /** Max number of items per page, default 9. */
    maxItemsPerPage = 9}: IUseListPageLogicArgs) => {
    
    //===========================================================================================================================
    const { option } = useParams();
    const { products, loadingProducts, productsError, loadProductsByCategoryId } = useProducts();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedFilters, setSelectedFilters] = useState<SelectedListPageTagFilters>({});

    //===========================================================================================================================
    /** Filters the product list by using the selected filters before paging. */
    const filterProductsByFilters = (
        products: IProduct[], 
        selectedFilters: SelectedListPageTagFilters): IProduct[] => {

        const activeGroups = Object.entries(selectedFilters)
            .filter(([, ids]) => ids.length > 0);
        if (activeGroups.length === 0) { return products; }

        return products.filter(product => {
            //--Product must pass all active filter groups
            return activeGroups.every(([tagTypeIdKey, selectedIds]) => {
                const tagTypeId = Number(tagTypeIdKey);
                if (!selectedIds .length) { return true; }    //--Should not be needed, but safe.
                //--Product matches if any productTag matches an id in this group.
                return product.productTags?.some(pt =>
                    pt.tag.tagType.id === tagTypeId && selectedIds .includes(pt.tag.id)
                )
            })
        })
    }

    //===========================================================================================================================
    //--For this demo, we are assuming the 'option' parameter is a category id.
    const categoryId = option === undefined || option === 'all'
        ? undefined
        : parseInt(option);

    //===========================================================================================================================
    //--Paging related fields.
    const filteredProducts = filterProductsByFilters(products || [], selectedFilters);
    const totalPages = filteredProducts.length > 0
        ? Math.ceil(filteredProducts.length / maxItemsPerPage)
        : 1;
    const startIdx = (currentPage - 1) * maxItemsPerPage;
    const endIdx = startIdx + maxItemsPerPage;
    const productsToShow = filteredProducts.slice(startIdx, endIdx);

    const onGoToFirst = () => setCurrentPage(1);
    const onGoToLast = () => setCurrentPage(totalPages);
    const onGoToPrev = () => setCurrentPage(page => Math.max(1, page - 1));
    const onGoToNext = () => setCurrentPage(page => Math.min(totalPages, page + 1));

    //===========================================================================================================================
    /** Effect that set's the current page back to 1 when any filters are changed. */
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedFilters])

    //===========================================================================================================================
    /** Effect that runs once on mount to load the products based on the category on the page request. */
    useEffect(() => {
        loadProductsByCategoryId(categoryId);
    }, [categoryId, loadProductsByCategoryId])

    //===========================================================================================================================
    return {
        products,
        loadingProducts,
        productsError,
        productsToShow,
        selectedFilters,
        filteredProducts,
        currentPage,
        totalPages,
        setSelectedFilters,
        onGoToFirst,
        onGoToLast,
        onGoToPrev,
        onGoToNext
    };
}

export default useListPageLogic;