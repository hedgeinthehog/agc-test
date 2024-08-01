import React from 'react'

import clsx from 'clsx'

import './Button.scss'

type ButtonVariants =
  | 'large-primary'
  | 'small-primary'
  | 'link-primary'
  | 'link-warning'
  | 'as-icon'

type ButtonProps = React.ComponentProps<'button'> & {
  children: React.ReactNode
  variant: ButtonVariants
}

const Button = ({ children, variant, ...props }: ButtonProps) => {
  return (
    <button className={clsx('button', `button--${variant}`)} {...props}>
      {children}
    </button>
  )
}
export default Button
