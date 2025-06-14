/**
 * Returns static properties of a class that are instances of that class, optionally filtered via a predicate.
 * 
 * Note: The use of `any[]` in the constructor signature is a TypeScript convention that allows us to safely use `instanceof`
 * without requiring knowledge of constructor arguments. This function does not construct any objects, so it is type-safe.
 * 
 * @param classWithStatics The class to extract static instance properties from.
 * @param instanceFilter Optional function to filter which static properties to include.
 * @returns An array of class instance values.
 */
const getEnumTypes = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classWithStatics: { new (...args: any[]): T },
  instanceFilter?: (instance: T, name: string) => boolean
): T[] => {
  return Object.entries(classWithStatics)
    .filter((entry): entry is [string, T] => {
        const [,value] = entry;
        return value instanceof classWithStatics;
    })
    .filter(([name, instance]) => instanceFilter ? instanceFilter(instance, name) : true)
    .map(([, instance]) => instance);
}

export default getEnumTypes;

/*
EXAMPLE USAGE /W ShipType Enum.

//--Get all ShipType enums.
const shipTypes = getEnumTypes(ShipType);
console.log(shipTypes);

//--Get filtered ShipType enums, except those whose ImageUrl contains
//--the characters 'none' in it.
const shipTypes.getEnumTypes(
    ShipType,
    (props) => props.ImageUrl.includes('none') == false);
*/