import React from 'react'

import './Table.scss'

type Column<T> = {
  id: string
  header: string
  accessor: (row: T, tableId: string) => React.ReactNode
}

export type Columns<T> = Column<T>[]

type TableProps<T> = {
  tableId: string
  columns: Columns<T>
  data: T[]
}

const Table = <T extends { id: string }>({
  data,
  tableId,
  columns,
}: TableProps<T>) => {
  if (!data.length) {
    return (
      <div className="table__empty">
        <p className="table__empty-text">Table has no records yet</p>
      </div>
    )
  }

  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__head-row">
          {columns.map((column) => (
            <th className="table__head-cell" key={column.id}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {data.map((row) => (
          <tr className="table__body-row" key={row.id}>
            {columns.map((column) => (
              <td
                className="table__body-cell"
                key={column.id}
                data-label={column.header}
              >
                {column.accessor(row, tableId)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
