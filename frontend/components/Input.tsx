import React from 'react'

type InputProps = {
    type?: string
    placeholder: string
    value?: string
    id?: string
    className?: string
    onFocus?: React.FocusEventHandler<HTMLInputElement>
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const Input = ({type, placeholder, value, id, onFocus, className, onChange}: InputProps) => {
  return (
    <input
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        id={id}
        onFocus={onFocus}
        onChange={onChange}
        className={`input p-2 border-green-90 outline-none bg-transparent w-full regular-16 text-gray-90 focus:border-green-90 ${className}`}
    />
  )
}

export default Input