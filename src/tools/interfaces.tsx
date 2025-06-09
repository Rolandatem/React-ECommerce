import type { ShipType } from "./enums"

/** Basic error response from an API calling tool. */
export interface IError {
    /** Indicates whether an error has occurred. */
    hasError: boolean,

    /** Friendly message suggested from the API caller tool. */
    friendlyErrorMessage?: string
}

/** 
 * Exception details returned from the API when an error occurs. 
 * Values may only be displayed if in Production mode.*/
export interface IAPIError {
    /** Exception message. */
    exceptionMessage: string,

    /** Stack trace for the exception on the API. */
    stackTrace: string
}

/** Various site-wide settings. */
export interface ISiteSettings {
    /** Indicates whether the user is in a mobile sized page. */
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

/**
 * Contains stateful functions passed to children components in the
 * newsletter pipeline.
 * 
 * @param joinNewsletter Function handler to join the newsletter.
 * @param email.getter Signup email value.
 * @param email.setter Function used to update the email stateful object.
 */
export interface INewsletterProps {
    /** Function handler used to join the newsletter. */
    joinNewsletter: (e:React.FormEvent<HTMLFormElement>) => void | null,

    /** React stateful email object container. */
    email: {
        /** Gets the email value. */
        getter: string | undefined,

        /** Function used to update the email value. */
        setter: React.Dispatch<React.SetStateAction<string | undefined>>
    }
}

/** DTO object containing product information relative to trending products information. */
export interface ITrendingProduct {
    /** DB ID */
    id: number,
    //** Product SKU */
    sku: string,
    /** Product Name */
    productName: string,
    /** Product Image URL */
    imageUrl: string,
    /** Star count out of 5 */
    stars: number,
    /** Number of reviews for the product. */
    reviews: number,
    /** Number of colors available for the product. */
    colorCount: number,
    /** Brief product description. */
    description: string,
    /** Site sale price. */
    salePrice: number,
    /** Original price. */
    originalPrice: number,
    /** Whole number representing the savings. */
    savingsPercentage: number,
    /** Shipping type */
    shipType: ShipType
}