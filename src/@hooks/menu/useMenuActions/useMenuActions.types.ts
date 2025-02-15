import {
  addCategoryToNavigationPath,
  closeMenu,
  navigateToNextLevel,
  openMenu,
  removeLastCategoryFromPath,
  toggleMenu,
} from '@redux/slices/menuSlice'
import { vi } from 'vitest'

/**
 * Hook return type for menu actions.
 * Provides handler functions to manage menu state and navigation.
 */
export interface UseMenuActionReturn {
  handleToggleMenuClick: () => void
  handleOpenMenuClick: () => void
  handleCloseMenuClick: () => void
  handleToNextLevelClick: () => void
  handleCategoryClick: (id: CategoryId) => void
  handleRemoveLastCategoryClick: () => void
}

/** Represents a category ID, which can be a number, null, or undefined. */
export type CategoryId = number | null | undefined

/**
 * Interface for checking action functions.
 * Used to validate the presence of specific actions in the result.
 */
export interface ActionFunctionsCheck {
  result: {
    current: Record<string, any>
  }
  actions: string[]
}

/**
 * Interface for checking dispatch calls.
 * Validates if the correct actions are dispatched with the expected payload.
 */
export interface DispatchCallsCheck {
  dispatch: ReturnType<typeof vi.fn>
  actions: {
    action: string
    expectedAction: ExpectedAction
  }[]
  result: {
    current: Record<string, any>
  }
}

/** Represents an expected action type returned by Redux actions. */
type ExpectedAction =
  | ReturnType<typeof toggleMenu>
  | ReturnType<typeof openMenu>
  | ReturnType<typeof closeMenu>
  | ReturnType<typeof navigateToNextLevel>
  | ReturnType<typeof addCategoryToNavigationPath>
  | ReturnType<typeof removeLastCategoryFromPath>
