import React, { useEffect } from 'react'

const Popup = ({ name, isOpen, onClose, children }) => {
    useEffect(() => {
        function handleKeyEsc (e) {
            e.key === 'Escape' && onClose()
        }
        isOpen && document.addEventListener('keydown', handleKeyEsc);

        return () => document.removeEventListener('keydown', handleKeyEsc)
    }, [isOpen])

    function handleClickByOverlay (e) {
        e.currentTarget === e.target && onClose()
    }
    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} onClick={handleClickByOverlay}>
            {children}
        </section>
    )
}

export default Popup