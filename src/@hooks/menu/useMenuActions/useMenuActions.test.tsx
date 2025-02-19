import {
  addCategoryToNavigationPath,
  closeMenu,
  navigateToNextLevel,
  openMenu,
  removeLastCategoryFromPath,
  toggleMenu,
} from '@redux/slices/menuSlice'
import { ConsoleMockStrategy } from '@strategies/ConsoleMockStrategy'
import { act, renderHook } from '@testing-library/react'
import * as reactRedux from 'react-redux'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useMenuActions } from '.'
import {
  ActionFunctionsCheck,
  CategoryId,
  DispatchCallsCheck,
} from './useMenuActions.types'

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}))

const checkActionFunctions = ({ result, actions }: ActionFunctionsCheck) => {
  actions.forEach(action => {
    expect(result.current).toHaveProperty(action)
    expect(typeof result.current[action]).toBe('function')
  })
}

const checkDispatchCalls = ({
  dispatch,
  actions,
  result,
}: DispatchCallsCheck) => {
  actions.forEach(({ action, expectedAction }) => {
    result.current[action]()
    expect(dispatch).toHaveBeenCalledWith(expectedAction)
  })

  expect(dispatch).toHaveBeenCalledTimes(actions.length)
}

describe('useMenuActions', () => {
  let dispatch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    dispatch = vi.fn()
    vi.mocked(reactRedux.useDispatch).mockReturnValue(dispatch)
  })

  describe('action functions', () => {
    it('should return all action functions', () => {
      const { result } = renderHook(() => useMenuActions())

      const actions = [
        'handleToggleMenuClick',
        'handleOpenMenuClick',
        'handleCloseMenuClick',
        'handleToNextLevelClick',
        'handleCategoryClick',
        'handleRemoveLastCategoryClick',
      ]

      checkActionFunctions({ result, actions })
    })
  })

  describe('dispatch calls', () => {
    it('should call dispatch with correct actions', () => {
      const { result } = renderHook(() => useMenuActions())

      const actions = [
        {
          action: 'handleToggleMenuClick',
          expectedAction: toggleMenu(),
        },
        {
          action: 'handleOpenMenuClick',
          expectedAction: openMenu(),
        },
        {
          action: 'handleCloseMenuClick',
          expectedAction: closeMenu(),
        },
        {
          action: 'handleToNextLevelClick',
          expectedAction: navigateToNextLevel(),
        },
        {
          action: 'handleRemoveLastCategoryClick',
          expectedAction: removeLastCategoryFromPath(),
        },
      ]

      checkDispatchCalls({ dispatch, actions, result })
    })

    it('should not call dispatch before any action is called', () => {
      renderHook(() => useMenuActions())
      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('handleCategoryClick', () => {
    beforeEach(() => {
      ConsoleMockStrategy.createSpy('warn')
    })

    afterEach(() => {
      ConsoleMockStrategy.restoreSpies()
    })

    it.each([
      { id: 0, expected: addCategoryToNavigationPath(0) },
      { id: 10, expected: addCategoryToNavigationPath(10) },
    ])(
      'should call dispatch with different id: $id for handleCategoryClick',
      ({ id, expected }) => {
        const { result } = renderHook(() => useMenuActions())

        act(() => {
          result.current.handleCategoryClick(id)
        })

        expect(dispatch).toHaveBeenCalledWith(expected)
        expect(dispatch).toHaveBeenCalledTimes(1)
      },
    )

    const warningMessage = (id: CategoryId) => `Invalid category id: ${id}`

    it.each([
      { id: null, expected: warningMessage(null) },
      { id: undefined, expected: warningMessage(undefined) },
    ])(
      'should not call dispatch for invalid id ($expected) and warn',
      ({ id, expected }) => {
        const { result } = renderHook(() => useMenuActions())

        act(() => {
          result.current.handleCategoryClick(id)
        })

        expect(dispatch).not.toHaveBeenCalled()
        ConsoleMockStrategy.verifyMethodCalls('warn', [expected])
      },
    )
  })
})
