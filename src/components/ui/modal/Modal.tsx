import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { CrossIcon } from '@/components/icons'
import { useModal } from '@/context/Modal.tsx'

import './Modal.scss'

const Modal = () => {
  const [{ isOpen, content }, { closeModal }] = useModal()

  const modalRef = useRef<HTMLDialogElement | null>(null)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDialogElement>) {
    if (
      event.target instanceof HTMLDialogElement &&
      modalRef.current &&
      event.target === modalRef.current
    ) {
      closeModal()
    }
  }

  useEffect(() => {
    const currentRef = modalRef.current as HTMLDialogElement | null

    if (currentRef) {
      isOpen ? currentRef.showModal() : currentRef.close()
    }
  }, [isOpen])

  return createPortal(
    <dialog
      ref={modalRef}
      className="modal"
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      <button
        className="modal__close-button"
        aria-label="Close Modal"
        tabIndex={0}
        onClick={() => closeModal()}
      >
        <CrossIcon />
      </button>
      {content}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  )
}
export default Modal
