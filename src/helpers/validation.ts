import { type PersonData } from '@/types.ts'

export const validatePersonDataForm = (values: PersonData) => {
  const errors: Partial<Record<keyof PersonData, string>> = {}

  if (!values.name.trim()) errors.name = 'Name is required'

  if (!values.surname.trim()) errors.surname = 'Surname is required'

  switch (true) {
    case values.age === '':
    case isNaN(<number>values.age):
      errors.age = 'Age must be a valid number'
      break
    case Number(values.age) < 0:
      errors.age = 'Age cannot be negative'
      break
    case Number(values.age) >= 140:
      errors.age = "Person can't be so old"
      break
  }

  if (!values.city) errors.city = 'City is required'

  return errors
}
