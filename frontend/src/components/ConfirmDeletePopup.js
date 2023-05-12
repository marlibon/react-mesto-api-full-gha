import React from 'react'
import PopupWithForm from './PopupWithForm'

const ConfirmDeletePopup = (props) => {
    function handleSubmit (e) {
        e.preventDefault();
        props.onCardDelete(props.onFutureDeletedCard)
    }
    return (
        <PopupWithForm name="confirmation" title="Вы уверены?" {...props} textButton="Да" onSubmit={handleSubmit} onStateButton={true} />)
}

export default ConfirmDeletePopup