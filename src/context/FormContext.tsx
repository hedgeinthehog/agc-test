import { type ReactNode, createContext, useContext } from 'react'
import { type Observable } from 'rxjs'

import createFormStore, {
  type FormActions,
  type FormState,
  type FormCompatible,
} from '@/store/form'

type FormContextType<T> = {
  formState$: Observable<FormState<T>>
  submitButtonDisabled$: Observable<boolean>
  formActions: FormActions<T>
}

const FormContext = createContext<FormContextType<unknown> | undefined>(
  undefined
)

export const FormProvider = <T extends FormCompatible<T>>({
  initialValues,
  validate,
  children,
}: {
  initialValues: T
  validate: (values: T) => Partial<Record<keyof T, string>>
  children: ReactNode
}) => {
  const formStore = createFormStore<T>(initialValues, validate)

  return (
    <FormContext.Provider value={formStore}>{children}</FormContext.Provider>
  )
}

export const useFormContext = <T extends FormCompatible<T>>() => {
  const context = useContext(FormContext) as FormContextType<T>

  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
