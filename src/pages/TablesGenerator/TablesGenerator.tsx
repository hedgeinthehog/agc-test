import { FormProvider } from '@/context/FormContext.tsx'
import { initialPersonDataValues } from '@/helpers/formInitialValues.ts'
import { validatePersonDataForm } from '@/helpers/validation.ts'
import { type PersonData } from '@/types.ts'

import RecordForm from './RecordForm.tsx'
import Tables from './Tables.tsx'
import './TablesGenerator.scss'

const TablesGenerator = () => {
  return (
    <div className="tables-generator">
      <div className="tables-generator__add-record-forms">
        <FormProvider<PersonData>
          initialValues={initialPersonDataValues}
          validate={validatePersonDataForm}
        >
          <div className="tables-generator__add-record-form">
            <RecordForm />
          </div>
          <div className="tables-generator__add-record-form">
            <RecordForm />
          </div>
        </FormProvider>
      </div>

      <Tables />
    </div>
  )
}

export default TablesGenerator
