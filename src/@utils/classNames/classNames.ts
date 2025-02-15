import type { ClassValue } from './classNames.types'

/**
 * Combines multiple class values into a single string.
 * Handles strings, numbers, arrays, objects, and functions.
 * Filters out falsy values and flattens nested structures.
 * @param args - Class values to combine.
 * @returns A single string of combined class names.
 */
export const classNames = (...args: ClassValue[]): string => {
  return args
    .reduce<string[]>((classes, arg) => {
      if (!arg) {
        return classes
      }

      // Handle strings and numbers
      if (typeof arg === 'string' || typeof arg === 'number') {
        classes.push(String(arg))
      }

      // Handle arrays (flatten nested class values)
      else if (Array.isArray(arg)) {
        classes.push(...classNames(...arg).split(' '))
      }

      // Handle objects (filter by truthy values)
      else if (typeof arg === 'object') {
        classes.push(
          ...Object.entries(arg)
            .filter(([_, value]) => Boolean(value))
            .map(([key, _]) => key),
        )
      }

      // Handle functions (evaluate and process the result)
      else if (typeof arg === 'function') {
        const result = arg()

        if (result) {
          classes.push(...classNames(result).split(' ').filter(Boolean))
        }
      }

      return classes
    }, [])
    .join(' ')
}
