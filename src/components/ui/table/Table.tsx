import React from 'react'
import './Table.scss'

const Table = ({ data, columns }) => {
  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__head-row">
          {columns.map((column) => (
            <th className="table__head-cell" key={column.accessor}>
              {column.Header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {data.map((row, rowIndex) => (
          <tr className="table__body-row" key={rowIndex}>
            {columns.map((column) => (
              <td className="table__body-cell" key={column.accessor}>
                {row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
