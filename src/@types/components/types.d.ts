import type { ComponentType, LazyExoticComponent, ReactNode } from 'react'

export type ComponentItems = {
  name: string
  import: () => Promise<{
    [key: string]: ComponentType
  }>
}

export type LazyComponents = {
  [key: string]: LazyExoticComponent<ComponentType>
}

export type LazyComponentProps = {
  Component: ComponentType
  fallback: ReactNode
}
