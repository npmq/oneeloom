/**
 * The current state of the menu.
 * - `isOpen`: Whether the menu is open (`true`) or closed (`false`).
 * - `activeLevel`: The current level in the menu hierarchy (e.g., 0 for main, 1 for submenu).
 * - `categories`: The list of category IDs in the current navigation path.
 */
export interface MenuState {
  isOpen: boolean
  activeLevel: number
  categories: number[]
}
