import { SelectContainer } from './styles'
import React from 'react'

interface InputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[]
  label: string
}

export function Select({ options, label, ...props }: InputProps) {
  return (
    <SelectContainer>
      <label htmlFor={label}>{label}</label>
      <select {...props}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </SelectContainer>
  )
}
