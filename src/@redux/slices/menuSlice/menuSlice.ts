import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { MenuState } from './menuSlice.types'

/**
 * The starting state for the menu:
 * - Closed (`isOpen: false`).
 * - At the root level (`activeLevel: 0`).
 * - With an empty navigation path (`categories: []`).
 */
const initialState: MenuState = {
  isOpen: false,
  activeLevel: 0,
  categories: [],
}

/**
 * A slice to manage the menu's state.
 * Handles opening/closing the menu, navigating levels, and managing the category path.
 */
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    /**
     * Switches the menu between open and closed states.
     * If open, it closes; if closed, it opens.
     * @param state - The current menu state.
     */
    toggleMenu(state: Draft<MenuState>) {
      state.isOpen = !state.isOpen
    },

    /**
     * Opens the menu.
     * @param state - The current menu state.
     */
    openMenu(state: Draft<MenuState>) {
      state.isOpen = true
    },

    /**
     * Closes the menu and resets all state to the initial values.
     * @returns The initial menu state.
     */
    closeMenu: () => ({ ...initialState }),

    /**
     * Moves deeper into the menu hierarchy by increasing the active level.
     * @param state - The current menu state.
     */
    navigateToNextLevel(state: Draft<MenuState>) {
      state.activeLevel++
    },

    /**
     * Adds a category ID to the current navigation path.
     * Used when navigating into a submenu.
     * @param state - The current menu state.
     * @param action - The action containing the category ID to add.
     */
    addCategoryToNavigationPath(
      state: Draft<MenuState>,
      action: PayloadAction<number>,
    ) {
      state.categories.push(action.payload)
    },

    /**
     * Removes the last category ID from the navigation path.
     * Used when navigating back from a submenu.
     * @param state - The current menu state.
     */
    removeLastCategoryFromPath(state: Draft<MenuState>) {
      state.categories.pop()
    },
  },
})

export const {
  toggleMenu,
  openMenu,
  closeMenu,
  navigateToNextLevel,
  addCategoryToNavigationPath,
  removeLastCategoryFromPath,
} = menuSlice.actions

export default menuSlice.reducer
