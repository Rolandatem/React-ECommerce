/**
 * Options for customizing the output of getEnumTypeValues.
 * @template T The enum-ish class type.
 * @template R The return type for each value in the result array.
 */
export type EnumTypeOptions<T, R = T> = {
  /**
   * Selects a value of type R from an instance and its property name. Defaults to returning the instance itself.
   * @param instance The static instance of the enum-ish class.
   * @param name The static property name.
   */
  valueSelector?: (instance: T, name: string) => R;
  /**
   * Returns true if the instance should be included.
   * @param instance The static instance of the enum-ish class.
   * @param name The static property name.
   */
  instanceFilter?: (instance: T, name: string) => boolean;
  /**
   * Sort function for the result array (Array.prototype.sort comparator).
   * @param a A selected result value.
   * @param b Another selected result value.
   */
  sorter?: (a: R, b: R) => number;
};