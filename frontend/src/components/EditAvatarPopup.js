import React, { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = (props) => {
    const { isOpen } = props;
    const avatar = useRef();

    function handleSubmit (e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatar.current.value
        });
        e.target.reset()
    }
    useEffect(() => {
        if (isOpen) {
            avatar.current.value = '';
        }
    }, [isOpen])

    return (
        <PopupWithForm name="replace-avatar" title="Обновить аватар" onSubmit={handleSubmit} {...props} textButton="Сохранить" onStateButton={false}>
            <input placeholder="Ссылка на картинку" className="form__input form__input_url" type="url" name="url" id="url-avatar" ref={avatar} required />
            <span className="form__error url-avatar-error" id="url-avatar-error" />
        </PopupWithForm>

    )
}

export default EditAvatarPopup