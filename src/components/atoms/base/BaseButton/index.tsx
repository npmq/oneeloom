import { ReactNode } from 'react'
import styles from './index.module.scss'

interface BaseButtonProps {
  children: ReactNode
  className?: string
  onClick: () => void
}

export const BaseButton = ({
  children,
  className,
  onClick,
}: BaseButtonProps) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </button>
  )
}
