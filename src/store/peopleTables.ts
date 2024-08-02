import { BehaviorSubject } from 'rxjs'

import { type PeopleTable, type PersonData } from '@/types.ts'
import { v4 as uuidv4 } from 'uuid'

export const originalTableId: string = uuidv4()

// BehaviorSubject to manage all tables
const tables$ = new BehaviorSubject<PeopleTable[]>([
  { id: originalTableId, data: [] },
])

export const state$ = tables$.asObservable()

// Function to delete a table row from any table
export const deleteTableRow = (tableId: string, rowId: string) => {
  tables$.next(
    tables$.value.map((table) =>
      table.id === tableId
        ? { ...table, data: table.data.filter((record) => record.id !== rowId) }
        : table
    )
  )
}

// Function to add a table row to the first table
export const addTableRow = (data: PersonData) => {
  tables$.next(
    tables$.value.map((table) =>
      table.id === originalTableId
        ? {
            ...table,
            data: [
              ...table.data,
              {
                ...data,
                id: uuidv4(),
              },
            ],
          }
        : table
    )
  )
}

// Function to edit a table row in any table
export const editTableRow = ({
  tableId,
  rowId,
  updatedRecord,
}: {
  tableId: string
  rowId: string
  updatedRecord: PersonData
}) => {
  tables$.next(
    tables$.value.map((table) =>
      table.id === tableId
        ? {
            ...table,
            data: table.data.map((record) =>
              record.id === rowId ? { ...record, ...updatedRecord } : record
            ),
          }
        : table
    )
  )
}

// Function to copy a table
export const copyTable = (tableId: string) => {
  const tableIndex = tables$.value.findIndex((table) => table.id === tableId)
  if (tableIndex !== -1) {
    const tableToCopy = tables$.value[tableIndex]
    const newTable: PeopleTable = {
      id: uuidv4(),
      data: [...tableToCopy.data],
    }
    const newTablesArray = [
      ...tables$.value.slice(0, tableIndex + 1),
      newTable,
      ...tables$.value.slice(tableIndex + 1),
    ]
    tables$.next(newTablesArray)
  }
}

// Function to delete a table
export const deleteTable = (tableId: string) => {
  tables$.next(tables$.value.filter((table) => table.id !== tableId))
}
