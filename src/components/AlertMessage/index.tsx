import cx from 'classnames'
import type { IconProps } from 'phosphor-react'

interface IAlertMessageProps {
  message: string
  Icon: React.ComponentType<IconProps>
  className?: string
}

export function AlertMessage({ message, Icon, className }: IAlertMessageProps) {
  return (
    <div className={cx('flex gap-2 rounded text-sm text-red-500', className)}>
      <Icon size={16} weight="fill" />
      {message}
    </div>
  )
}
