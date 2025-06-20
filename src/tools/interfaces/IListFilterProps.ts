import type { SelectedListPageTagFilters } from "../types/SelectedListPageTagFilters";
import type IProduct from "./dtos/IProduct";
import type ISiteFilterTagType from "./dtos/ISiteFilterTagType";

/**
 * Props for the ListFilter component.
 */
export default interface IListFilterProps {
    /** Array of products to analyze and filter. */
    products: IProduct[],

    /** Definitions of which tag types are enabled as filters. */
    siteFilterTagTypes: ISiteFilterTagType[],

    /** Current selected filter tag IDs, grouped by tag type ID. */
    selectedFilters: SelectedListPageTagFilters,

    /**
     * Callback invoked when the filter selection changes.
     * @param selectedFilters - New filter selection state.
     */
    onChange: (selectedFilters: SelectedListPageTagFilters) => void
}