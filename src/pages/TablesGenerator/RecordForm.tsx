import { useObservableState } from 'observable-hooks'
import React, { useCallback } from 'react'

import {
  Button,
  FormContainer,
  FormField,
  Input,
  Select,
} from '@/components/ui'
import { type HandleSelectChangeProps } from '@/components/ui/select/Select'
import { useFormContext } from '@/context/FormContext.tsx'
import { useModal } from '@/context/Modal'
import { usePeopleTablesContext } from '@/context/PeopleTables'
import { cities } from '@/data'
import { type PersonData } from '@/types'

type RecordFormProps = {
  editFormData?: {
    rowId: string
    tableId: string
  }
}

const RecordForm = ({ editFormData }: RecordFormProps) => {
  const [, { addTableRow, editTableRow }] = usePeopleTablesContext()
  const [, { closeModal }] = useModal()

  const { formState$, formActions, submitButtonDisabled$ } =
    useFormContext<PersonData>()

  const formState = useObservableState(formState$)
  const submitButtonDisabled = useObservableState(submitButtonDisabled$, true)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | HandleSelectChangeProps) => {
      const { name, value } = e.target
      formActions.setValue(name as keyof PersonData, value)
    },
    [formActions]
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement> | HandleSelectChangeProps) => {
      const { name } = e.target
      formActions.setTouched(name as keyof PersonData)
    },
    [formActions]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    formActions.submit((values: PersonData) => {
      if (editFormData) {
        editTableRow({
          tableId: editFormData.tableId,
          rowId: editFormData.rowId,
          updatedRecord: {
            name: values.name,
            surname: values.surname,
            age: Number(values.age),
            city: values.city,
          },
        })
        closeModal()
        return
      }

      addTableRow({
        name: values.name,
        surname: values.surname,
        age: Number(values.age),
        city: values.city,
      })
    })
  }

  if (!formState) {
    return null
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormField
          errorMessage={formState.errors.name}
          touched={formState.touched.name}
        >
          <Input
            name="name"
            placeholder="Name"
            aria-label="Enter name"
            value={formState.values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormField>
        <FormField
          errorMessage={formState.errors.surname}
          touched={formState.touched.surname}
        >
          <Input
            name="surname"
            placeholder="Surname"
            aria-label="Enter surname"
            value={formState.values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormField>
        <FormField
          errorMessage={formState.errors.age}
          touched={formState.touched.age}
        >
          <Input
            name="age"
            placeholder="Age"
            aria-label="Enter age"
            value={formState.values.age}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </FormField>
        <FormField
          errorMessage={formState.errors.city}
          touched={formState.touched.city}
        >
          <Select
            name="city"
            options={cities}
            placeholder="City"
            onValueUpdate={handleChange}
            value={
              cities.find((city) => city.value === formState.values.city) ||
              null
            }
            onBlur={handleBlur}
          />
        </FormField>

        <Button
          variant="large-primary"
          disabled={submitButtonDisabled}
          aria-label="Add record"
        >
          {editFormData ? 'Agree' : 'Add'}
        </Button>
      </form>
    </FormContainer>
  )
}

export default RecordForm
