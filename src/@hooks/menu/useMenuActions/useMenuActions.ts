import {
  addCategoryToNavigationPath,
  closeMenu,
  navigateToNextLevel,
  openMenu,
  removeLastCategoryFromPath,
  toggleMenu,
} from '@redux/slices/menuSlice'
import { useDispatch } from 'react-redux'
import type { CategoryId, UseMenuActionReturn } from './useMenuActions.types'

/**
 * Hook for managing menu actions.
 * Provides handler functions to control menu state and navigation.
 * @returns {UseMenuActionReturn} An object with handler functions.
 */
export const useMenuActions = (): UseMenuActionReturn => {
  const dispatch = useDispatch()

  /** Toggles the menu state (open/close). */
  const handleToggleMenuClick = () => {
    dispatch(toggleMenu())
  }

  /** Opens the menu. */
  const handleOpenMenuClick = () => {
    dispatch(openMenu())
  }

  /** Closes the menu. */
  const handleCloseMenuClick = () => {
    dispatch(closeMenu())
  }

  /** Navigates to the next level in the menu hierarchy. */
  const handleToNextLevelClick = () => {
    dispatch(navigateToNextLevel())
  }

  /**
   * Handles category click by its ID.
   * @param {CategoryId} id - The ID of the category. If null or undefined, logs a warning.
   */
  const handleCategoryClick = (id: CategoryId) => {
    if (id == null) {
      console.warn(`Invalid category id: ${id}`)

      return
    }

    dispatch(addCategoryToNavigationPath(id))
  }

  /** Removes the last category from the navigation path. */
  const handleRemoveLastCategoryClick = () => {
    dispatch(removeLastCategoryFromPath())
  }

  return {
    handleToggleMenuClick,
    handleOpenMenuClick,
    handleCloseMenuClick,
    handleToNextLevelClick,
    handleCategoryClick,
    handleRemoveLastCategoryClick,
  }
}
