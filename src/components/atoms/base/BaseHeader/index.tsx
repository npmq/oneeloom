import { ReactNode } from 'react'
import styles from './index.module.scss'

interface HeaderProps {
  children: ReactNode
  className?: string
}

export const BaseHeader = ({ children, className }: HeaderProps) => {
  return <header className={`${styles.header} ${className}`}>{children}</header>
}
