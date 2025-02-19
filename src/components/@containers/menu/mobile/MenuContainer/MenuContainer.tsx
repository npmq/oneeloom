import { BaseMenuLink, BaseSvgIcon } from '@atoms/base'
import { IconCaretGo } from '@atoms/icons/IconCaretGo'
import { MenuList } from '@components/molecules/MenuList'
import { useMenuActions } from '@hooks/menu/useMenuActions'
import type { MenuContainerProps } from './MenuContainer.type'

import style from './MenuContainer.module.scss'

/**
 * A container for rendering a list of menu items.
 * Each item can have a link, a name, and an optional icon if it has children.
 * @param {MenuContainerProps} props - The props for the component.
 * @param {MenuItemStrategy[]} props.menuItems - The list of menu items to render.
 * @returns The rendered menu container.
 */
export const MenuContainer = ({ menuItems }: MenuContainerProps) => {
  const { handleCategoryClick } = useMenuActions()

  return (
    <div className={style.menuContainer}>
      <MenuList>
        {menuItems.map(({ id, name, url, hasChildren }) => (
          <BaseMenuLink
            key={id}
            url={url}
            hasChildren={hasChildren}
            onClick={() => handleCategoryClick(id)}
          >
            <span>{name}</span>
            {hasChildren && (
              <BaseSvgIcon>
                <IconCaretGo />
              </BaseSvgIcon>
            )}
          </BaseMenuLink>
        ))}
      </MenuList>
    </div>
  )
}
