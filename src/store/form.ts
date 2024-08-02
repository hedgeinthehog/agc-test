import { BehaviorSubject, type Observable } from 'rxjs'

import { map } from 'rxjs/operators'

export type FormState<T> = {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
}

export type FormActions<T> = {
  setValue: (name: keyof T, value: string) => void
  setTouched: (name: keyof T) => void
  submit: (handleSubmit: (values: T) => void) => void
}

export type FormStore<T> = {
  formState$: Observable<FormState<T>>
  formActions: FormActions<T>
  submitButtonDisabled$: Observable<boolean>
}

export type FormCompatible<T> = {
  [K in keyof T]: T[K] extends string | number | boolean | undefined | null
    ? T[K]
    : never
}

const createFormStore = <T extends FormCompatible<T>>(
  initialValues: T,
  validate: (values: T) => Partial<Record<keyof T, string>>
): FormStore<T> => {
  const initialState: FormState<T> = {
    values: initialValues,
    errors: {},
    touched: {},
  }

  const stateSubject$ = new BehaviorSubject<FormState<T>>(initialState)

  const state$ = stateSubject$.asObservable()

  const setValue = (name: keyof T, value: string) => {
    const currentState = stateSubject$.getValue()
    const updatedValues = { ...currentState.values, [name]: value }
    const errors = validate(updatedValues)

    stateSubject$.next({
      ...currentState,
      values: updatedValues,
      errors,
      touched: { ...currentState.touched, [name]: true },
    })
  }

  const setTouched = (name: keyof T) => {
    const currentState = stateSubject$.getValue()
    stateSubject$.next({
      ...currentState,
      touched: { ...currentState.touched, [name]: true },
    })
  }

  const submit = (handleSubmit: (values: T) => void) => {
    const currentState = stateSubject$.getValue()
    const errors = validate(currentState.values)

    if (Object.keys(errors).length === 0) {
      handleSubmit(currentState.values)
    }

    // Reset the form after submission
    stateSubject$.next(initialState)
  }

  const submitButtonDisabled$ = state$.pipe(
    map((state) => {
      const hasErrors = Object.keys(state.errors).length > 0
      const hasEmptyFields = Object.values(state.values).some(
        (val) => val === ''
      )
      return hasErrors || hasEmptyFields
    })
  )

  return {
    formState$: state$,
    formActions: { setValue, setTouched, submit },
    submitButtonDisabled$,
  }
}

export default createFormStore
