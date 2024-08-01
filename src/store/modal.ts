import type React from 'react'
import { BehaviorSubject } from 'rxjs'

export type ModalState = {
  isOpen: boolean
  content: React.ReactNode | null
}

export const initialState: ModalState = {
  isOpen: false,
  content: null,
}

export const modalState$ = new BehaviorSubject<ModalState>(initialState)

export const openModal = (content: React.ReactNode) => {
  modalState$.next({ isOpen: true, content })
}

export const closeModal = () => {
  modalState$.next({ isOpen: false, content: null })
}
