/** Describes the structure of a checkout address object. */
export default interface ICheckoutAddress {
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    suiteApt: string,
    city: string,
    state: string,
    zipCode: string,
    phoneNumber: string
}