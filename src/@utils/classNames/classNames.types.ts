/**
 * Represents a value that can be used as a CSS class.
 * Can be a string, number, boolean, `undefined`, `null`, or a more complex structure like `ClassDictionary` or `ClassArray`.
 * Also supports functions that return `ClassValue`.
 */
export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | ClassDictionary
  | ClassArray
  | (() => ClassValue)

/**
 * A dictionary where keys are class names and values are booleans (or `undefined`/`null`).
 * Used to conditionally apply classes based on the truthiness of the value.
 */
interface ClassDictionary {
  [key: string]: boolean | undefined | null
}

/**
 * An array of `ClassValue` elements.
 * Allows nesting of class values, including other `ClassArray` or `ClassDictionary` objects.
 */
interface ClassArray extends Array<ClassValue> {}
