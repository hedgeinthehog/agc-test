import { useObservableState } from 'observable-hooks'
import React, { createContext, useContext } from 'react'

import {
  type ModalState,
  closeModal,
  initialState,
  modalState$,
  openModal,
} from '@/store/modal'

type ModalContextType = [
  ModalState,
  {
    openModal: (content: React.ReactNode) => void
    closeModal: () => void
  },
]

const ModalContext = createContext<ModalContextType>([
  initialState,
  {
    openModal: () => {},
    closeModal: () => {},
  },
])

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const modalState = useObservableState(modalState$)

  return (
    <ModalContext.Provider value={[modalState, { openModal, closeModal }]}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
