import type { EnumTypeOptions } from "../types/EnumTypeOptions";

/**
 * Retrieves all static instances of an enum-ish class as an array, with optional selection, filtering, and sorting.
 *
 * @template T The enum-ish class type.
 * @template R The return type for each value in the result array.
 * @param classWithStatics The enum-ish class with static properties to extract.
 * @param options Optional configuration for selection, filtering, and sorting of output.
 * @returns Array of selected (or raw) enum-ish static values.
 *
 * @example
 * // Basic enum-ish class
 * class ExampleEnum {
 *   constructor(public readonly Key: string, public readonly Text: string) {}
 *   static readonly A = new ExampleEnum("a", "Alpha");
 *   static readonly B = new ExampleEnum("b", "Bravo");
 * }
 *
 * // Get all static instances as an array:
 * const all = getEnumTypeValues(ExampleEnum); // [ExampleEnum.A, ExampleEnum.B]
 *
 * // Get only the Text properties, sorted alphabetically
 * const names = getEnumTypeValues(ExampleEnum, {
 *   valueSelector: e => e.Text,
 *   sorter: (a, b) => a.localeCompare(b)
 * }); // ["Alpha", "Bravo"]
 */
const getEnumTypeValues = <T, R = T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classWithStatics: { new (...args: any[]): T },
  options?: EnumTypeOptions<T, R>
): R[] => {
  const {
    valueSelector = (instance: T) => instance as unknown as R,
    instanceFilter,
    sorter
  } = options || {};

  let results = Object.entries(classWithStatics)
    .filter((entry): entry is [string, T] => {
      const [, value] = entry;
      return value instanceof classWithStatics;
    })
    .filter(([name, instance]) => (instanceFilter ? instanceFilter(instance, name) : true))
    .map(([name, instance]) => valueSelector(instance, name));

  if (sorter) {
    results = results.slice().sort(sorter);
  }
  return results;
}

export default getEnumTypeValues;

/*
======================================
Example usage:

// -- Enum-ish class definition --
class ContactReason {
  constructor(public readonly Key: string, public readonly Text: string) {}
  static readonly ProductQuestion = new ContactReason("product_question", "Product Question");
  static readonly PriceMatching = new ContactReason("price_matching", "Price Matching");
  static readonly Other = new ContactReason("other", "Other");
}

// -- Get all ContactReasons (array of instances) --
const reasons = getEnumTypeValues(ContactReason);
// --> [ContactReason.ProductQuestion, ContactReason.PriceMatching, ContactReason.Other]

// -- Get all Texts, sorted --
const reasonTexts = getEnumTypeValues(ContactReason, {
  valueSelector: r => r.Text,
  sorter: (a, b) => a.localeCompare(b)
});
// --> ["Other", "Price Matching", "Product Question"]
======================================
*/