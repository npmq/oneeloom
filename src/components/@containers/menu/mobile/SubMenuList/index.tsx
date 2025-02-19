import { BaseMenuLink, BaseSvgIcon } from '@atoms/base'
import { IconCaretGo } from '@atoms/icons/IconCaretGo'
import { MenuList } from '@components/molecules/MenuList'
import {
  addCategoryToNavigationPath,
  removeLastCategoryFromPath,
} from '@redux/slices/menuSlice'
import { selectCategories } from '@redux/slices/menuSlice/menuSlice.selectors'
import { useDispatch, useSelector } from 'react-redux'
import type { MenuSubListProps } from './types'

import styles from './index.module.scss'

export const SubMenuList = ({ subMenuItems }: MenuSubListProps) => {
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()

  return (
    <>
      {Object.entries(subMenuItems).map(
        ([
          parent,
          {
            parentItem: { name, url, hasChildren },
            menuItems,
          },
        ]) => (
          <div
            key={parent}
            className={`${styles.subMenu} ${categories.includes(Number(parent)) ? styles.open : ''}`}
          >
            <BaseMenuLink
              url={url}
              hasChildren={hasChildren}
              onClick={() => dispatch(removeLastCategoryFromPath())}
            >
              <span>{name}</span>
            </BaseMenuLink>
            <MenuList>
              {menuItems.map(({ id, url, name, hasChildren }) => (
                <BaseMenuLink
                  key={id}
                  url={url}
                  onClick={() => dispatch(addCategoryToNavigationPath(id))}
                  hasChildren={hasChildren}
                >
                  <span>{name}</span>
                  <BaseSvgIcon>
                    <IconCaretGo />
                  </BaseSvgIcon>
                </BaseMenuLink>
              ))}
            </MenuList>
          </div>
        ),
      )}
    </>
  )
}
