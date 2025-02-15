import { ReactNode } from 'react'

interface BaseSvgIconProps {
  height?: number
  width?: number
  fill?: string
  children: ReactNode
}

export const BaseSvgIcon = ({
  height = 24,
  width = 24,
  fill = 'var(--base-fill-color)',
  children,
}: BaseSvgIconProps) => {
  return (
    <svg
      height={height}
      width={width}
      fill={fill}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}
