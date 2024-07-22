import React from 'react'
import './Input.scss'

type InputProps = React.ComponentProps<'input'>

const Input = ({ ...props }: InputProps) => {
  return <input className="input" {...props} />
}
export default Input
