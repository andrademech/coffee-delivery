import type { MouseEventHandler } from 'react'
import cx from 'classnames'

export interface IButtonProps {
  children?: React.ReactNode
  htmlType?: 'button' | 'submit' | 'reset'
  width?: string
  color?: 'primary' | 'secondary'
  type?: 'fill' | 'outline' | 'text'
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
}

export function Button({
  children,
  htmlType = 'button',
  width = 'auto',
  onClick,
  className,
  disabled = false,
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      type={htmlType}
      className={cx(
        'h-[2.375rem] rounded px-6 transition-all duration-[400ms] cursor-pointer drop-shadow-soft',
        className,
      )}
      style={{ width }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
