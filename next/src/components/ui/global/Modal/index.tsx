import useClickOutside from 'components/hooks/useClickOutside'
import { useModal } from 'components/providers/ModalProvider'
import React from 'react'
import ReactDOM from 'react-dom'


const Modal = () => {
    const { handleModal, modal, modalContent, modalClassName } = useModal()
    const wrapperRef = React.useRef(null)

    useClickOutside(wrapperRef, () => {
        handleModal()
    })

    const handleClose = () => {
        handleModal()
    }

    // @ts-ignore
    const modalContentWithProps = (typeof window !== undefined && modalContent !== null) ? React.cloneElement(modalContent, {
        handleClose
    }) : modalContent

    if (modal) {
        return ReactDOM.createPortal(
            <div
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-center z-[200]"
                style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div
                    ref={wrapperRef}
                    className={`modal-primary ${modalClassName ? modalClassName : ''}`}
                >
                    {modalContentWithProps}
                </div>
            </div>,
            // @ts-ignore
            document.querySelector('#modal-root')
        )
    } else return null
}


export default Modal