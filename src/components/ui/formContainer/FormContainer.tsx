import React from 'react'

import './FormContainer.scss'

type FormContainerProps = {
  children: React.ReactNode
}

const FormContainer = ({ children }: FormContainerProps) => {
  return <div className="form-container">{children}</div>
}

export default FormContainer
