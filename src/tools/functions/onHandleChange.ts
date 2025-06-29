import type { MinimalChangeEvent } from "../types/MinimalChangeEvent";

/**
 * Common state changing handler for (potentially nested) objects in React.
 * Accepts minimal shape: { target: { name, value } }
 *
 * USAGE:
 * Assuming there is a React state change function named setContactForm for a value that
 * implements IContactForm.
 *
 * const onHandleChange = (
 *   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
 * ) => {
 *   onCommonHandleChange<IContactForm>(e, setContactForm);
 * }
 *
 * If you want to change a nested property, set the `name` to dot notation, e.g. `"shipping.firstName"`.
 * The function will immutably update the nested object.
 *
 * @template T The object type of your state.
 * @param e React change event.
 * @param setState The React setState function for your object.
 */
const onCommonHandleChange = <T extends object>(
  e: MinimalChangeEvent,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value, type, checked } = e.target;

  if (typeof name !== 'string' || !name) {
    return;
  }

  /**
   * Recursively and immutably sets a value at the given path in an object.
   */
  function setNestedValue<TObj extends object>(
    obj: TObj,
    path: string[],
    value: unknown
  ): TObj {
    if (path.length === 1) {
      return { ...obj, [path[0]]: value } as TObj;
    }
    const [first, ...rest] = path;
    return {
      ...obj,
      [first]: setNestedValue(
        (obj as Record<string, unknown>)[first] ?? {},
        rest,
        value
      ),
    };
  }

  const parsedValue = type === 'checkbox' ? checked : value;
  const path = name.split('.');
  setState((prev) => setNestedValue(prev, path, parsedValue));
};

export default onCommonHandleChange;