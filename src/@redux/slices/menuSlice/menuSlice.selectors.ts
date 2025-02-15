import type { RootState } from '@redux/store'
import { createSelector } from '@reduxjs/toolkit'

/**
 * Selects the entire menu state from the Redux store.
 */
const selectMenu = (state: RootState) => state.menu

/**
 * Selects whether the menu is open or closed.
 */
export const selectIsOpen = createSelector(selectMenu, menu => menu.isOpen)

/**
 * Selects the current active level in the menu hierarchy.
 * - 0 for the main menu, 1 for submenu, and so on.
 */
export const selectActiveLevel = createSelector(
  selectMenu,
  menu => menu.activeLevel,
)

/**
 * Selects the list of category IDs in the current navigation path.
 * Represents the path from the main menu to the current submenu.
 */
export const selectCategories = createSelector(
  selectMenu,
  menu => menu.categories,
)
