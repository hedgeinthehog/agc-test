import { useObservableState } from 'observable-hooks'
import React, { useCallback, useMemo } from 'react'

import { CrossIcon } from '@/components/icons'
import { Button, Table } from '@/components/ui'
import { type Columns } from '@/components/ui/table/Table.tsx'
import { FormProvider } from '@/context/FormContext.tsx'
import { useModal } from '@/context/Modal.tsx'
import { usePeopleTablesContext } from '@/context/PeopleTables.tsx'
import { CITIES } from '@/data.ts'
import { validatePersonDataForm } from '@/helpers/validation.ts'
import RecordForm from '@/pages/TablesGenerator/RecordForm.tsx'
import {
  type PeopleTable,
  type PeopleTableRecord,
  type PersonData,
} from '@/types.ts'

const Tables = () => {
  const [
    { state$: tables$, originalTableId },
    { deleteTableRow, copyTable, deleteTable },
  ] = usePeopleTablesContext()

  const tables = useObservableState<PeopleTable[]>(tables$, [])

  const [, { openModal }] = useModal()

  const handleEdit = useCallback(
    ({ tableId, row }: { tableId: string; row: PeopleTableRecord }) => {
      const { id, ...values } = row

      openModal(
        <FormProvider<PersonData>
          initialValues={values}
          validate={validatePersonDataForm}
        >
          <RecordForm editFormData={{ rowId: id, tableId }} />
        </FormProvider>
      )
    },
    [openModal]
  )

  const handleDelete = useCallback(
    ({ tableId, rowId }: { tableId: string; rowId: string }) => {
      deleteTableRow(tableId, rowId)
    },
    [deleteTableRow]
  )

  const handleCopyTable = useCallback(
    (tableId: string) => {
      copyTable(tableId)
    },
    [copyTable]
  )

  const columns: Columns<PeopleTableRecord> = useMemo(
    () => [
      {
        header: 'Name',
        accessor: (row: PeopleTableRecord) => row.name,
        id: 'name',
      },
      {
        header: 'Surname',
        accessor: (row: PeopleTableRecord) => row.surname,
        id: 'surname',
      },
      {
        header: 'Age',
        accessor: (row: PeopleTableRecord) => row.age,
        id: 'age',
      },
      {
        header: 'City',
        accessor: (row: PeopleTableRecord) =>
          CITIES.get(row.city) as React.ReactNode,
        id: 'city',
      },
      {
        header: '',
        accessor: (
          row: PeopleTableRecord,
          tableId: string
        ): React.ReactNode => (
          <div className="table__actions-cell">
            <Button
              variant="link-primary"
              onClick={() => handleEdit({ tableId, row })}
              aria-label="Edit record"
            >
              Edit
            </Button>
            <Button
              variant="link-warning"
              onClick={() => handleDelete({ tableId, rowId: row.id })}
              aria-label="Delete record"
            >
              Delete
            </Button>
          </div>
        ),
        id: 'actions',
      },
    ],
    [handleEdit, handleDelete]
  )

  return (
    <div className="generator-table__wrapper">
      {tables.map((table) => (
        <div key={table.id} className="generator-table">
          <div className="generator-table__controls">
            <Button
              variant="small-primary"
              onClick={() => handleCopyTable(table.id)}
              aria-label="Copy table"
            >
              Copy table
            </Button>
            {table.id !== originalTableId && (
              <Button variant="as-icon" onClick={() => deleteTable(table.id)}>
                <CrossIcon
                  className="generator-table__delete-icon"
                  width={20}
                  height={20}
                  aria-label="Delete table"
                />
              </Button>
            )}
          </div>

          <Table<PeopleTableRecord>
            columns={columns}
            data={table.data}
            tableId={table.id}
          />
        </div>
      ))}
    </div>
  )
}

export default Tables
