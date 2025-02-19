import type { MenuItemStrategy } from '@strategies/menu/ComposerMenuBuilder'
import { ReactElement } from 'react'

/**
 * Props for the `MenuList` component.
 * - `children`: An array of React elements representing menu items.
 */
export interface MenuListProps {
  children: ReactElement<MenuItemStrategy>[]
}
