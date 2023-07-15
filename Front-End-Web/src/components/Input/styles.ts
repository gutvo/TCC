import styled from 'styled-components'
import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

export const DivInput = styled.div``

export const Inputs = styled.input<InputProps>`
  border-radius: 8px;
  width: 100%;
  font-size: 1.25rem;
  padding-left: 0.25rem;
  line-height: 1.5;
  margin: 0.5rem 0;
`
