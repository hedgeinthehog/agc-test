import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ArrowDownIcon } from '@/components/icons'
import clsx from 'clsx'

import './Select.scss'

export type SelectOption = {
  value: string
  label: string
}

export type HandleSelectChangeProps = {
  target: { name: string | undefined; value: string }
}

type SelectProps = {
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  label?: string
  id?: string
  name: string
  value: SelectOption | null
  onValueUpdate: (e: HandleSelectChangeProps) => void
  onBlur?: (e: HandleSelectChangeProps) => void
}

const Select = ({
  placeholder,
  disabled,
  options,
  onValueUpdate,
  id,
  name,
  value,
  onBlur,
}: SelectProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)

  const ref = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const ulRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (value) {
      onValueUpdate({
        target: { name, value: value.value },
      })
    }
  }, [value, onValueUpdate, name])

  useEffect(() => {
    const currentRef = ulRef.current as HTMLUListElement | null

    if (dropdownOpen && currentRef && value) {
      (
        currentRef.childNodes[
          options.findIndex((option) => option.value === value.value)
        ] as HTMLLIElement
      ).focus()
    }
  }, [dropdownOpen, value, options])

  const handleClickOutside = useCallback((e: MouseEvent) => {
    const currentRef = ref.current as HTMLDivElement | null

    if (currentRef && !currentRef.contains(e.target as Node)) {
      setDropdownOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleItemClick = (option: SelectOption) => {
    onValueUpdate({
      target: { name, value: option.value },
    })
    setDropdownOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentRef = ulRef.current

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (dropdownOpen && !value && currentRef) {
          (currentRef.childNodes[0] as HTMLLIElement).focus()
          return
        }

        if (!value) {
          break
        }

        if (
          value &&
          options.findIndex((option) => option.value === value.value) ===
            options.length - 1
        ) {
          if (currentRef) {
            (currentRef.childNodes[0] as HTMLLIElement).focus()
          }
          break
        }
        if (value) {
          const nextIndex =
            options.findIndex((option) => option.value === value.value) + 1
          if (currentRef) {
            (currentRef.childNodes[nextIndex] as HTMLLIElement).focus()
          }
          break
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (dropdownOpen && !value && currentRef) {
          const lastIndex = currentRef.childNodes.length - 1
          ;(currentRef.childNodes[lastIndex] as HTMLLIElement).focus()
          break
        }
        if (!value) {
          break
        }
        if (
          value &&
          options.findIndex((option) => option.value === value.value) === 0
        ) {
          if (currentRef) {
            const lastIndex = currentRef.childNodes.length - 1
            ;(currentRef.childNodes[lastIndex] as HTMLLIElement).focus()
          }
          break
        }
        if (value) {
          const prevIndex =
            options.findIndex((option) => option.value === value.value) - 1
          if (currentRef) {
            (currentRef.childNodes[prevIndex] as HTMLLIElement).focus()
          }
        }
        break

      default:
        break
    }
  }

  const collapse = () => {
    const currentRef = buttonRef.current as HTMLButtonElement | null

    setDropdownOpen(false)
    if (currentRef) currentRef.focus()
  }

  const handleBlur = () => {
    setTimeout(() => {
      onBlur?.({ target: { name, value: value?.value || '' } })
    }, 100) // delay the blur event slightly to avoid error flickering
  }

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    option: SelectOption
  ) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (e.currentTarget.nextSibling) {
          (e.currentTarget.nextSibling as HTMLLIElement).focus()
          break
        }
        if (!e.currentTarget.nextSibling) {
          (e.currentTarget.parentNode?.childNodes[0] as HTMLLIElement).focus()
          break
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (e.currentTarget.previousSibling) {
          (e.currentTarget.previousSibling as HTMLLIElement).focus()
          break
        }
        if (!e.currentTarget.previousSibling && e.currentTarget.parentNode) {
          const indexOfLastElement =
            e.currentTarget?.parentNode?.childNodes?.length - 1
          ;(
            e.currentTarget.parentNode?.childNodes[
              indexOfLastElement
            ] as HTMLLIElement
          ).focus()
          break
        }
        break

      case 'Tab':
        e.preventDefault()
        break

      case ' ':
      case 'Enter':
        e.preventDefault()
        handleItemClick(option)
        break

      case 'Escape':
        e.preventDefault()
        collapse()
        break
      default:
        break
    }
  }

  return (
    <div className="select">
      <div ref={ref}>
        <button
          role="combobox"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-controls={`${name}-listbox`}
          aria-label={
            value
              ? options.find((option) => option.value === value.value)?.label
              : `Select ${placeholder}` || 'Please Select'
          }
          disabled={disabled}
          id={id}
          ref={buttonRef}
          onClick={handleClick}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={clsx('select__control', {
            ['select__control--disabled']: disabled,
            ['select__control--menu-is-open']: dropdownOpen,
          })}
        >
          <div
            className={clsx('select__selected-value', {
              ['select__placeholder']: !value,
            })}
          >
            {value
              ? options.find((option) => option.value === value.value)?.label
              : placeholder || 'Please Select'}
          </div>
          <div className="select__indicator">
            <ArrowDownIcon />
          </div>
        </button>

        {dropdownOpen && (
          <ul
            ref={ulRef}
            role="listbox"
            id={`${name}-listbox`}
            className="select__menu"
          >
            {options.map((option: SelectOption) => (
              <li
                role="option"
                aria-selected={value?.value === option.value}
                key={option.value}
                aria-label={option.label}
                tabIndex={dropdownOpen ? 0 : -1}
                className={clsx('select__option', {
                  ['select__option--is-selected']:
                    value?.value === option.value,
                })}
                onClick={() => handleItemClick(option)}
                onKeyDown={(e) => handleOptionKeyDown(e, option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Select
