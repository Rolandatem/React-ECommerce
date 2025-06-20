/**
 * Represents the selected filter tag IDs for a list page, grouped by tag type ID.
 * For each tag type, the array contains the selected tag IDs.
 * "Checkbox" groups may have multiple selected IDs.
 * "Radio" groups should have exactly one or zero selected IDs.
 */
export type SelectedListPageTagFilters = {
    /**
     * For "checkbox", could have multiple selected.
     * For "radio", should have exactly one or empty.
     */
    [tagTypeId: number]: number[]
}