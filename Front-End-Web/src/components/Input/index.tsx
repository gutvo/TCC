import { DivInput, Inputs } from './styles'
import React from 'react'
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  textolabel: string
}

export function Input({ placeholder, textolabel, ...props }: InputProps) {
  return (
    <DivInput>
      <label htmlFor={textolabel}>{textolabel}</label>
      <Inputs placeholder={placeholder} {...props} />
    </DivInput>
  )
}
