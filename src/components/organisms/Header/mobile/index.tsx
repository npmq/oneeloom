import { BaseButton, BaseHeader, BaseSvgIcon } from '@atoms/base'
import { IconMenu } from '@components/atoms/icons/IconMenu'
import { useMenuActions } from '@hooks/menu/useMenuActions'

export const Header = () => {
  const { handleOpenMenuClick } = useMenuActions()

  return (
    <BaseHeader className="flex-between shadow-dark">
      <BaseButton
        className="btn-fixed-size"
        onClick={handleOpenMenuClick}
        aria-label="Open Sidebar"
      >
        <BaseSvgIcon width={28} height={28}>
          <IconMenu />
        </BaseSvgIcon>
      </BaseButton>
      <div>Oneeloom</div>
    </BaseHeader>
  )
}
