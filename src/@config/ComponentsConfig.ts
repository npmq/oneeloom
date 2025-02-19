import { ComponentItems } from '@typesdefs/components/types'

export const componentsMobile: ComponentItems[] = [
  {
    name: 'MainLayout',
    import: () => import('@layouts/MainLayout/mobile'),
  },
]

export const componentsDesktop: ComponentItems[] = [
  {
    name: 'MainLayout',
    import: () => import('@layouts/MainLayout/desktop'),
  },
]
