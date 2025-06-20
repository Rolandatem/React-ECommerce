import type IListPageContentsProps from "./IListPageContentsProps";

export default interface IUseListPageLogicArgs {
    siteFilterTagTypes: IListPageContentsProps["siteFilterTagTypes"],
    maxItemsPerPage?: number
}