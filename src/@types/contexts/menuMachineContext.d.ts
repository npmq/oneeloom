import { ReactNode } from 'react'

export interface MenuMachineContextType {
  isOpenMenu: boolean
  selectedPath: number[]
  open: () => void
  close: () => void
  selectedCategory: (id: number) => void
  previousLevel: () => void
}

export interface MenuMachineProviderProps {
  children: ReactNode
}
