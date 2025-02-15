import { ConsoleMockStrategy } from '@strategies/ConsoleMockStrategy'
import { ComposerMenuBuilder } from '@strategies/menu/ComposerMenuBuilder'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { MenuDataItem, MenuStructure } from './ComposerMenuBuilder.types'

const homeItem = { id: 1, name: 'Home', url: '/home' }
const aboutItem = { id: 2, name: 'About', url: '/about' }
const servicesItem = { id: 3, name: 'Services', url: '/services' }
const smartItem = { id: 4, name: 'Smart', url: '/services/smart' } // parent 3
const devItem = { id: 5, name: 'Dev', url: '/services/dev' } // parent 3
const designItem = {
  id: 6,
  name: 'Design',
  url: '/services/design',
} // parent 3
const uxItem = {
  id: 7,
  name: 'UX/UI',
  url: '/services/design/ux-ui',
} // parent 6
const graphicItem = {
  id: 8,
  name: 'Graphic',
  url: '/services/design/graphic',
} // parent 6
const contactItem = { id: 9, name: 'Contact', url: '/contact' }

describe('ComposerMenuBuilder', () => {
  let builder: ComposerMenuBuilder

  beforeEach(() => {
    builder = new ComposerMenuBuilder()
  })

  describe('Menu Structure Construction', () => {
    it('should correctly construct the menu structure with nested items', () => {
      const menuItems: MenuDataItem[] = [
        homeItem,
        aboutItem,
        {
          ...servicesItem,
          children: [
            { ...smartItem, parent: 3 },
            { ...devItem, parent: 3 },
            {
              ...designItem,
              parent: 3,
              children: [
                { ...uxItem, parent: 6 },
                { ...graphicItem, parent: 6 },
              ],
            },
            contactItem,
          ],
        },
      ]

      const expectedMenu: MenuStructure = {
        mainMenuItems: [
          { ...homeItem, hasChildren: false },
          { ...aboutItem, hasChildren: false },
          { ...servicesItem, hasChildren: true },
          { ...contactItem, hasChildren: false },
        ],
        subMenuItems: {
          3: {
            parentItem: { ...servicesItem, hasChildren: true },
            menuItems: [
              { ...smartItem, hasChildren: false },
              { ...devItem, hasChildren: false },
              { ...designItem, hasChildren: true },
            ],
          },
          6: {
            parentItem: { ...designItem, hasChildren: true },
            menuItems: [
              { ...uxItem, hasChildren: false },
              { ...graphicItem, hasChildren: false },
            ],
          },
        },
      }

      const menu = builder.buildMenu(menuItems)
      expect(menu).toEqual(expectedMenu)
    })
  })

  describe('Large Menu Structure Construction', () => {
    beforeEach(() => {
      ConsoleMockStrategy.createSpy('log', false)
    })

    afterEach(() => {
      ConsoleMockStrategy.restoreSpies()
    })

    it('should correctly construct a large menu structure with sampled assertions', () => {
      const generateMenuItems = (): MenuDataItem[] => {
        const menuItems: MenuDataItem[] = []
        for (let i = 1; i <= 1000; i++) {
          menuItems.push({
            id: i,
            name: `Item ${i}`,
            url: `/item-${i}`,
            children:
              i <= 500
                ? [
                    {
                      id: 1000 + i,
                      name: `SubItem ${i}`,
                      url: `/item-${i}/sub-items`,
                      parent: i,
                    },
                  ]
                : [],
          })
        }

        return menuItems
      }
      const menu = builder.buildMenu(generateMenuItems())

      expect(menu.mainMenuItems.length).toBe(1000)
      expect(Object.keys(menu.subMenuItems).length).toBe(500)
      expect(menu.subMenuItems[1].menuItems.length).toBe(1)
    })
  })

  describe('Warning Handling', () => {
    const warningMessages = {
      missingItems:
        'Menu items are missing or not an array. Returning empty menu structure.',
      missingArray:
        'Menu items array are missing. Returning empty menu structure.',
      missingParent:
        'Mismatch: Parent with ID 99 for child item with ID 5 not found.',
      invalidItem:
        'Invalid menuItem detected: An item is invalid and will not be added to the menu structure.',
      duplicateIds:
        'Some IDs are duplicated. The menu structure may be incorrect.',
      invalidItemProperties: (property: string, item: string) =>
        `Invalid or missing '${property}' in menu item: ${item}`,
      duplicateItemId: (id: number) =>
        `Warning: Duplicate ID ${id} found in the source data.`,
      duplicateItem: (id: number) =>
        `Duplicate detected: An item with ID ${id} has already been processed and will not be added again.`,
    }

    beforeEach(() => {
      ConsoleMockStrategy.createSpy('warn')
    })

    afterEach(() => {
      ConsoleMockStrategy.restoreSpies()
    })

    it.each([
      [null, warningMessages.missingItems],
      [undefined, warningMessages.missingItems],
      [[], warningMessages.missingArray],
    ])(
      'should return an empty menu structure and log a warning when menuItems %p',
      (menuItems, expectedWarning) => {
        const menu = builder.buildMenu(menuItems as any)
        const expectedWarnings = [expectedWarning]

        ConsoleMockStrategy.verifyMethodCalls('warn', expectedWarnings)
        expect(menu).toEqual({
          mainMenuItems: [],
          subMenuItems: {},
        })
      },
    )

    it('should warn and exclude menu items with missing or invalid properties', () => {
      const menuItems: MenuDataItem[] = [
        homeItem,
        { id: 2, name: 'About' } as any,
        { name: 'Contact', url: '/contact' } as any,
        { id: 3, url: '/services' } as any,
      ]
      const menu = builder.buildMenu(menuItems)
      const expectedWarnings = [
        warningMessages.invalidItemProperties('url', '{"id":2,"name":"About"}'),
        warningMessages.invalidItem,
        warningMessages.invalidItemProperties(
          'id',
          '{"name":"Contact","url":"/contact"}',
        ),
        warningMessages.invalidItem,
        warningMessages.invalidItemProperties(
          'name',
          '{"id":3,"url":"/services"}',
        ),
        warningMessages.invalidItem,
      ]

      ConsoleMockStrategy.verifyMethodCalls('warn', expectedWarnings)
      expect(menu).toEqual({
        mainMenuItems: [{ ...homeItem, hasChildren: false }],
        subMenuItems: {},
      })
    })

    it('should log warnings and ignore duplicate items', () => {
      const menuItems: MenuDataItem[] = [
        homeItem,
        {
          ...servicesItem,
          children: [
            { ...designItem, parent: 3 },
            { ...uxItem, parent: 3 },
            { ...designItem, parent: 3 },
          ],
        },
        homeItem,
      ]
      const menu = builder.buildMenu(menuItems)
      const expectedWarnings = [
        warningMessages.duplicateItemId(6),
        warningMessages.duplicateItemId(1),
        warningMessages.duplicateIds,
        warningMessages.duplicateItem(1),
        warningMessages.duplicateItem(6),
      ]

      ConsoleMockStrategy.verifyMethodCalls('warn', expectedWarnings)
      expect(menu).toEqual({
        mainMenuItems: [
          { ...homeItem, hasChildren: false },
          { ...servicesItem, hasChildren: true },
        ],
        subMenuItems: {
          3: {
            parentItem: { ...servicesItem, hasChildren: true },
            menuItems: [
              { ...designItem, hasChildren: false },
              { ...uxItem, hasChildren: false },
            ],
          },
        },
      })
    })

    it('should log warnings about inconsistencies and not add items without existing parents', () => {
      const menuItems: MenuDataItem[] = [
        {
          ...servicesItem,
          children: [
            { ...smartItem, parent: 3 },
            { ...devItem, parent: 99 },
          ],
        },
      ]
      const menu = builder.buildMenu(menuItems)
      const expectedWarnings = [warningMessages.missingParent]

      ConsoleMockStrategy.verifyMethodCalls('warn', expectedWarnings)
      expect(menu).toEqual({
        mainMenuItems: [{ ...servicesItem, hasChildren: true }],
        subMenuItems: {
          3: {
            parentItem: { ...servicesItem, hasChildren: true },
            menuItems: [{ ...smartItem, hasChildren: false }],
          },
        },
      })
    })
  })
})
