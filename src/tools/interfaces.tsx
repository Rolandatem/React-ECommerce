import type { ShipType } from "./enums"

export interface IError {
    hasError: boolean,
    friendlyErrorMessage?: string
}
export interface IAPIError {
    message: string,
    exceptionMessage: string,
    stackTrace: string
}

export interface ISiteSettings {
    isMobile: boolean
}

/** 
 * Simple Interface to use when trying to pass className through to a component.
 * Normally used on the top level element/component in the component.
 */
export interface IComponentClass {
    /** className attribute to pass through to component. */
    className: string
}

export interface INewsletterProps {
    joinNewsletter: (e:React.FormEvent<HTMLFormElement>) => void | null,
    email: {
        getter: string | undefined,
        setter: React.Dispatch<React.SetStateAction<string | undefined>>
    }
}

export interface ITrendingProduct {
    id: number,
    sku: string,
    productName: string,
    imageUrl: string,
    stars: number,
    reviews: number,
    colorCount: number,
    description: string,
    salePrice: number,
    originalPrice: number,
    savingsPercentage: number,
    shipType: ShipType
}