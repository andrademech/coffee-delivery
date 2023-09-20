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
        'flex items-center text-[#273E56] pt-[0.0625rem] placeholder:text-[#273E56] bg-transparent border border-[#D6E5EA] transition-all rounded h-[2.75rem]',
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
          'w-full h-full rounded bg-transparent outline-none text-sm text-inherit pl-[1rem] pr-[2.5rem] placeholder:text-inherit placeholder:opacity-75 ',
          { 'text-text_dark_opacity-75': readOnly },
        )}
        type={type}
      />
    </div>
  )
}
