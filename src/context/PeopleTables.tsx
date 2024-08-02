import React, { createContext, useContext } from 'react'
import type { Observable } from 'rxjs'

import type { PeopleTable, PersonData } from '@/types.ts'

import {
  addTableRow,
  copyTable,
  deleteTable,
  deleteTableRow,
  editTableRow,
  originalTableId,
  state$,
} from '@/store/peopleTables.ts'

type PeopleTablesState = {
  originalTableId: string
  state$: Observable<PeopleTable[]>
}

type PeopleTablesActions = {
  deleteTableRow: (tableId: string, rowId: string) => void
  addTableRow: (data: PersonData) => void
  editTableRow: ({
    tableId,
    rowId,
    updatedRecord,
  }: {
    tableId: string
    rowId: string
    updatedRecord: PersonData
  }) => void
  copyTable: (tableId: string) => void
  deleteTable: (tableId: string) => void
}

export type PeopleTablesContextType = [PeopleTablesState, PeopleTablesActions]

const PeopleTablesContext = createContext<PeopleTablesContextType | undefined>(
  undefined
)

export const PeopleTablesProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <PeopleTablesContext.Provider
      value={[
        { originalTableId, state$ },
        { deleteTableRow, addTableRow, editTableRow, copyTable, deleteTable },
      ]}
    >
      {children}
    </PeopleTablesContext.Provider>
  )
}

export const usePeopleTablesContext = () => {
  const context = useContext(PeopleTablesContext)

  if (!context) {
    throw new Error(
      'usePeopleTablesContext must be used within a PeopleTablesProvider'
    )
  }
  return context
}
