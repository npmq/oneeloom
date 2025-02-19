import type {
  MenuBuilderStrategy,
  MenuDataItem,
  MenuItemStrategy,
  MenuStructure,
  SubMenuItemsStrategy,
} from './ComposerMenuBuilder.types'

export class ComposerMenuBuilder implements MenuBuilderStrategy {
  private mainMenuItems: MenuItemStrategy[] = []
  private subMenuItems: Record<number, SubMenuItemsStrategy> = {}
  private readonly menuItemsMap = new Map<number, MenuItemStrategy>()

  /**
   * Builds the menu structure from the provided menu items.
   * @param menuItems - Array of menu items (`MenuDataItem`).
   * @returns Menu structure (`MenuStructure`).
   */
  buildMenu(menuItems: MenuDataItem[]): MenuStructure {
    if (!this.validateMenuList(menuItems)) {
      return this.constructMenuStructure()
    }

    this.validateUniqueIds(menuItems)

    this.initialize()

    const queue: MenuDataItem[] = [...menuItems]
    this.processQueue(queue)

    return this.constructMenuStructure()
  }

  /**
   * Resets the internal state of the menu builder.
   */
  private initialize() {
    this.mainMenuItems = []
    this.subMenuItems = {}
    this.menuItemsMap.clear()
  }

  /**
   * Validates if the provided menu items are a non-empty array.
   * Logs warnings if validation fails.
   * @param menuItems - Array of menu items to validate.
   * @returns `true` if valid, otherwise `false`.
   */
  private validateMenuList(menuItems: MenuDataItem[]): boolean {
    if (!Array.isArray(menuItems)) {
      console.warn(
        'Menu items are missing or not an array. Returning empty menu structure.',
      )

      return false
    }

    if (!menuItems.length) {
      console.warn(
        'Menu items array are missing. Returning empty menu structure.',
      )

      return false
    }

    return true
  }

  /**
   * Validates that all menu items have unique IDs.
   * Logs warnings for duplicates.
   * @param menuItems - Array of menu items to validate.
   */
  private validateUniqueIds(menuItems: MenuDataItem[]) {
    const ids = new Set<number>()
    let isValid = true

    const traverse = (items: MenuDataItem[]) => {
      for (const item of items) {
        if (ids.has(item.id)) {
          console.warn(
            `Warning: Duplicate ID ${item.id} found in the source data.`,
          )

          isValid = false
        } else {
          ids.add(item.id)
        }

        console.log(
          `Processing item ID: ${item.id}, Name: ${item.name}, URL: ${item.url}`,
        )

        if (item.children?.length) {
          traverse(item.children)
        }
      }
    }

    traverse(menuItems)

    if (!isValid) {
      console.warn(
        'Some IDs are duplicated. The menu structure may be incorrect.',
      )
    }
  }

  /**
   * Validates a single menu item's required properties.
   * Logs warnings if validation fails.
   * @param menuItem - Menu item to validate.
   * @returns `true` if valid, otherwise `false`.
   */
  private validateMenuItem(menuItem: MenuDataItem): boolean {
    const { id, name, url } = menuItem

    if (!id || typeof id !== 'number') {
      console.warn(
        `Invalid or missing 'id' in menu item: ${JSON.stringify(menuItem)}`,
      )

      return false
    }

    if (!name || typeof name !== 'string') {
      console.warn(
        `Invalid or missing 'name' in menu item: ${JSON.stringify(menuItem)}`,
      )

      return false
    }

    if (!url || typeof url !== 'string') {
      console.warn(
        `Invalid or missing 'url' in menu item: ${JSON.stringify(menuItem)}`,
      )

      return false
    }

    return true
  }

  /**
   * Processes the queue of menu items to build the menu structure.
   * @param queue - Array of menu items to process.
   */
  private processQueue(queue: MenuDataItem[]) {
    for (const item of queue) {
      this.handleMenuItem(item, queue)
    }
  }

  /**
   * Handles a single menu item, validating and processing it.
   * @param item - Menu item to process.
   * @param queue - Queue of menu items.
   */
  private handleMenuItem(item: MenuDataItem, queue: MenuDataItem[]) {
    const { id, children = [] } = item

    if (!this.validateMenuItem(item)) {
      console.warn(
        'Invalid menuItem detected: An item is invalid and will not be added to the menu structure.',
      )

      return
    }

    if (!this.menuItemsMap.has(id)) {
      this.processMenuItem(item)

      if (this.hasChildren(children)) {
        queue.push(...children)
      }
    } else {
      console.warn(
        `Duplicate detected: An item with ID ${id} has already been processed and will not be added again.`,
      )
    }
  }

  /**
   * Processes a single menu item, adding it to the main or submenu.
   * @param item - Menu item to process.
   */
  private processMenuItem(item: MenuDataItem) {
    const { id, parent } = item
    const menuItem = this.createMenuItem(item)

    console.log(`Processing menu item: ID=${id}, Parent=${parent}`)

    this.menuItemsMap.set(id, menuItem)

    if (this.hasParent(parent)) {
      console.log(`Adding to submenu: Parent ID=${parent}`)

      return this.addToSubMenu(parent, menuItem)
    }

    console.log(`Adding to main menu: ID=${id}`)
    return this.addToMainMenu(menuItem)
  }

  /**
   * Creates a menu item from the provided data.
   * @param item - Menu data item.
   * @returns Created menu item (`MenuItemStrategy`).
   */
  private createMenuItem(item: MenuDataItem): MenuItemStrategy {
    const { id, name, url, children = [] } = item
    const hasChildren = this.hasChildren(children)

    return { id, name, url, hasChildren }
  }

  /**
   * Checks if a parent ID exists.
   * @param parent - Parent ID to check.
   * @returns `true` if parent exists, otherwise `false`.
   */
  private hasParent(parent?: number) {
    return typeof parent === 'number'
  }

  /**
   * Checks if the provided children array is non-empty.
   * @param children - Array of children items.
   * @returns `true` if children exist, otherwise `false`.
   */
  private hasChildren(children: MenuDataItem[]): boolean {
    return Array.isArray(children) && !!children.length
  }

  /**
   * Adds a menu item to the main menu.
   * @param menuItem - Menu item to add.
   */
  private addToMainMenu(menuItem: MenuItemStrategy) {
    this.mainMenuItems.push(menuItem)
    console.log(
      `Added item to main menu: ID ${menuItem.id}, Name: ${menuItem.name}`,
    )
  }

  /**
   * Adds a menu item to a submenu under the specified parent.
   * Creates the submenu if it doesn't exist.
   * @param parentId - Parent ID for the submenu.
   * @param menuItem - Menu item to add.
   */
  private addToSubMenu(parentId: number, menuItem: MenuItemStrategy) {
    if (!this.subMenuItems[parentId]) {
      const parentItem = this.menuItemsMap.get(parentId)

      if (parentItem) {
        this.subMenuItems[parentId] = { parentItem, menuItems: [] }
        console.log(`Create submenu for parent ID ${parentId}`)
      } else {
        console.warn(
          `Mismatch: Parent with ID ${parentId} for child item with ID ${menuItem.id} not found.`,
        )

        return
      }
    }

    this.subMenuItems[parentId].menuItems.push(menuItem)
    console.log(
      `Added new item to submenu of parent ID ${parentId}: ID ${menuItem.id}, Name: ${menuItem.name}`,
    )
  }

  /**
   * Constructs the final menu structure.
   * @returns Menu structure (`MenuStructure`).
   */
  private constructMenuStructure(): MenuStructure {
    return {
      mainMenuItems: this.mainMenuItems,
      subMenuItems: this.subMenuItems,
    }
  }
}
