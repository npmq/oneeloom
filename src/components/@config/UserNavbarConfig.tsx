import { IconBasket } from '@icons/IconBasket'
import { IconCategory } from '@icons/IconCategory'
import { IconFavorite } from '@icons/IconFavorite'
import { IconHome } from '@icons/IconHome'
import { IconUser } from '@icons/IconUser'
import { ReactNode } from 'react'

export interface NavbarItemConfig {
  name: string
  path: string | null
  icon: ReactNode
}

export const UserNavbarConfig: NavbarItemConfig[] = [
  {
    name: 'home',
    path: '/',
    icon: <IconHome />,
  },
  {
    name: 'category',
    path: null,
    icon: <IconCategory />,
  },
  {
    name: 'favorite',
    path: '/favorite',
    icon: <IconFavorite />,
  },
  {
    name: 'basket',
    path: '/basket',
    icon: <IconBasket />,
  },
  {
    name: 'user',
    path: '/lk',
    icon: <IconUser />,
  },
]
