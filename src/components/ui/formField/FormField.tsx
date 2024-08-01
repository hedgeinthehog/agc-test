import React from 'react'

import './FormField.scss'

type FormFieldProps = {
  children: React.ReactNode
  errorMessage?: string
  touched?: boolean
}

const FormField = ({ children, errorMessage, touched }: FormFieldProps) => {
  return (
    <div className="form-field">
      {children}
      {touched && errorMessage && (
        <span className="form-field__error">{errorMessage}</span>
      )}
    </div>
  )
}

export default FormField
