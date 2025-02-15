import { SubMenuItemsStrategy } from '@strategies/menu/ComposerMenuBuilder/ComposerMenuBuilder.types'

/**
 * Props for the MenuSubList component.
 */
export interface MenuSubListProps {
  /** Record of submenu items keyed by parent ID. */
  subMenuItems: Record<number, SubMenuItemsStrategy>
}
