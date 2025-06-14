/** 
 * Simple Interface to use when trying to pass className through to a component.
 * Normally used on the top level element/component in the component.
 */
export default interface IComponentClass {
    /** className attribute to pass through to component. */
    className?: string
}