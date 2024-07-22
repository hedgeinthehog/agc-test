import React, { useState } from 'react'
import ReactSelect, { Options } from 'react-select'
import './Select.scss'

type SelectProps = {
  options: Options<{ value: string; label: string }>
  placeholder: string
}

const Select = ({ options, placeholder }: SelectProps) => {
  const [selectedOption, setSelectedOption] = useState(null)

  return (
    <div className="App">
      <ReactSelect
        unstyled
        classNamePrefix="select"
        placeholder={placeholder}
        onChange={setSelectedOption}
        options={options}
        isSearchable={false}
      />
    </div>
  )
}

export default Select
