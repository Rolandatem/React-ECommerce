/** Defines the structure for the shop by category demo modal. */
export default interface IShopByCategoryDemoModal {
    /** Indicates that the modal should be visible. */
    isVisible: boolean,
    /** Function to set the modal visibility state. */
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}