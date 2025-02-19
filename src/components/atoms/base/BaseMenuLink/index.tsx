import { MouseEvent, ReactNode } from 'react'

import style from './index.module.scss'

interface BaseMenuLinkProps {
  hasChildren: boolean
  url?: string
  className?: string
  onClick: () => void
  children: ReactNode
}

export const BaseMenuLink = ({
  url,
  className,
  hasChildren = false,
  children,
  onClick,
}: BaseMenuLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!hasChildren) {
      return
    }

    event.preventDefault()
    onClick()
  }
  return (
    <a
      className={`${style.link} ${className}`}
      href={url}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
