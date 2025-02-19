import { MenuContainer } from '@components/@containers/menu/mobile/MenuContainer'
import { SubMenuList } from '@components/@containers/menu/mobile/SubMenuList'
import { useMenuActions } from '@hooks/menu/useMenuActions'
import { selectIsOpen } from '@redux/slices/menuSlice/menuSlice.selectors'
import { ComposerMenuBuilder } from '@strategies/menu/ComposerMenuBuilder'
import { classNames } from '@utils/classNames/classNames'
import { useSelector } from 'react-redux'

// Тестовый JSON меню категорий -----------------
import { categories } from '../../../JSON/menu.json'
// ----------------------------------------------

import styles from './index.module.scss'

export const Sidebar = () => {
  const composerMenuBuilder = new ComposerMenuBuilder()
  const isOpenMenu = useSelector(selectIsOpen)
  const { handleCloseMenuClick } = useMenuActions()

  const { mainMenuItems, subMenuItems } =
    composerMenuBuilder.buildMenu(categories)

  console.log('Sub Menu =>', subMenuItems)

  const foo = true
  const red = 'active'

  const myClass = classNames(
    'red',
    'bold',
    { [styles.foo]: foo },
    `customTestClass__${red}`,
    foo ? styles.myToggleClassActive : 'myToggleClassDisable',
  )

  return (
    <>
      <button
        className={`overlay ${isOpenMenu ? 'open-overlay' : ''}`}
        onClick={handleCloseMenuClick}
        tabIndex={0}
        aria-label="Close sidebar"
      />
      <div className={`${styles.sidebar} ${isOpenMenu ? styles.open : ''}`}>
        <button onClick={handleCloseMenuClick}>X</button>
        <div className={myClass}>test classNames func !+</div>
        <MenuContainer menuItems={mainMenuItems} />
        <div>-------------------</div>
        <SubMenuList subMenuItems={subMenuItems} />
      </div>
    </>
  )
}
