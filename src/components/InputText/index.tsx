import type { UseFormRegisterReturn } from 'react-hook-form'
import type { KeyboardEventHandler } from 'react'

import cx from 'classnames'

interface IInputTextProps {
  id: string
  name?: string
  type: string
  placeholder: string
  register?: UseFormRegisterReturn
  className?: string
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>
  readOnly?: boolean
  value?: string
}

export function InputText({
  id,
  name = id,
  type,
  placeholder,
  className,
  onKeyUp,
  register,
  readOnly = false,
  value = '',
}: IInputTextProps) {
  return (
    <div
      className={cx(
        'flex h-[2.75rem] items-center rounded border border-[#D6E5EA] bg-transparent pt-[0.0625rem] text-[#273E56] transition-all placeholder:text-[#273E56]',
        className,
      )}
    >
      <input
        id={id}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        {...register}
        onKeyUp={onKeyUp}
        readOnly={readOnly}
        className={cx(
          'h-full w-full rounded bg-transparent pl-[1rem] pr-[2.5rem] text-sm text-inherit outline-none placeholder:text-inherit placeholder:opacity-75 ',
          { 'text-text_dark_opacity-75': readOnly },
        )}
        type={type}
      />
    </div>
  )
}
