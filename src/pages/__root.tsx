import { createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { importLazyComponents } from '@utils/importLazyComponents'
import { ComponentType, ReactNode, Suspense } from 'react'

type LazyComponentProps = {
  Component: ComponentType
  fallback: ReactNode
}

const { MainLayout } = importLazyComponents

const LazyComponent = ({ Component, fallback }: LazyComponentProps) => {
  return (
    <Suspense fallback={<div>Loading {fallback}...</div>}>
      <Component />
    </Suspense>
  )
}

export const Route = createRootRoute({
  component: () => (
    <>
      <LazyComponent Component={MainLayout} fallback="Layout" />
      <TanStackRouterDevtools />
    </>
  ),
})
