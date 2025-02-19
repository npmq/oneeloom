import { Children, isValidElement } from 'react'
import type { MenuListProps } from './MenuList.types'

/**
 * Renders a list of menu items.
 * Wraps each child element in an `<li>` and handles invalid elements.
 * @param {MenuListProps} props - The props for the component.
 * @param {ReactElement[]} props.children - The list of menu items to render.
 * @returns `<ul>` element containing the menu items.
 */
export const MenuList = ({ children }: MenuListProps) => {
  return (
    <ul>
      {Children.map(children, child => {
        // Skip and warn if the child is not a valid React element
        if (!isValidElement(child)) {
          console.warn('MenuList: child is not a valid React element', child)
          return null
        }

        // Use the child's key or fallback to undefined
        const key = child.key ?? undefined

        // Wrap the child in an `<li>` element
        return <li key={key}>{child}</li>
      })}
    </ul>
  )
}
