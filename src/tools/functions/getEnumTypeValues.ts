/**
 * Extracts a specific property value from all static properties of a class that are instances of that class.
 * You can filter which instances are included and project the output value type.
 * 
 * @param classWithStatics The class to extract static instance properties from.
 * @param valueSelector Function to select the desired property or projection from each instance.
 * @param instanceFilter Optional filter function for which instances to include.
 * @returns An array of the projected values.
 */
const getEnumTypeValues = <T, R>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  classWithStatics: { new (...args: any[]): T },
  valueSelector: (instance: T, name: string) => R,
  instanceFilter?: (instance: T, name: string) => boolean
): R[] => {
  return Object.entries(classWithStatics)
    .filter((entry): entry is [string, T] => {
        const [,value] = entry;
        return value instanceof classWithStatics;
    })
    .filter(([name, instance]) => instanceFilter ? instanceFilter(instance, name) : true)
    .map(([name, instance]) => valueSelector(instance, name));
}

export default getEnumTypeValues;

/*
EXAMPLE USAGE /W ShipType

//--Get all ImageUrl values
const shipTypes = getEnumTypeValues(
    ShipType,
    (props) => props.ImageUrl);
console.log(shipTypes);

//--Get all ImageUrl values, except those whose ImageUrl property contains
//--the characters 'none' in it.
const shipTypes = getEnumTypeValues(
    ShipType,
    (props) => props.ImageUrl,
    (props) => props.ImageUrl.includes('none') == false);
console.log(shipTypes);

//--Get multiple properties
const shipTypes = getEnumTypeValues(
  ShipType,
  (props) => ({value: props.Value, imageUrl: props.ImageUrl }));
console.log(shipTypes);
*/