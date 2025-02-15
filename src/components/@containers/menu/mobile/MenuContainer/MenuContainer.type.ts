import type { MenuItemStrategy } from '@strategies/menu/ComposerMenuBuilder/ComposerMenuBuilder.types'

/**
 * Props for the `MenuContainer` component.
 * - `menuItems`: An array of menu items to display in the container.
 */
export interface MenuContainerProps {
  menuItems: MenuItemStrategy[]
}
