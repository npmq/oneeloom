/**
 * Base data structure for a menu item.
 * Includes id, name, url, optional parent id, and children.
 */
export interface MenuDataItem {
  id: number
  name: string
  url: string
  parent?: number
  children?: MenuDataItem[]
}

/**
 * Represents a menu item in the final output structure.
 * Contains id, name, url, and a flag indicating if it has children.
 */
export interface MenuItemStrategy {
  id: number
  name: string
  url: string
  hasChildren: boolean
}

/**
 * Represents a submenu structure with a parent item and its children.
 * Used to organize nested menu items.
 */
export interface SubMenuItemsStrategy {
  parentItem: MenuItemStrategy
  menuItems: MenuItemStrategy[]
}

/**
 * Final structure of the entire menu.
 * Contains main menu items and a map of submenus by parent id.
 */
export interface MenuStructure {
  mainMenuItems: MenuItemStrategy[]
  subMenuItems: Record<number, SubMenuItemsStrategy>
}

/**
 * Strategy for building the menu structure.
 */
export interface MenuBuilderStrategy {
  /**
   * Builds the menu structure from an array of menu items.
   * @param menuItems - Array of menu items (`MenuDataItem`).
   * @returns Menu structure (`MenuStructure`).
   */
  buildMenu(menuItems: MenuDataItem[]): MenuStructure
}
