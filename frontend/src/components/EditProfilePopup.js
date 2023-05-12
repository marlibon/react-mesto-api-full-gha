import React, { useState, useEffect, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = (props) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName (e) {
        setName(e.target.value)
    }

    function handleChangeDecription (e) {
        setDescription(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            textButton="Сохранить"
            {...props}
            onSubmit={handleSubmit}
            onStateButton={false}
        >
            <input
                type="text"
                placeholder="Имя"
                className="form__input form__input_name"
                name="name" id="name"
                minLength={2}
                maxLength={40}
                onChange={handleChangeName}
                value={name}
                required
            />
            <span
                className="form__error name-error"
                id="name-error"
            />
            <input
                type="text"
                placeholder="Род деятельности"
                className="form__input form__input_about"
                name="about"
                id="about"
                minLength={2}
                maxLength={200}
                onChange={handleChangeDecription}
                value={description}
                required
            />
            <span
                className="form__error about-error"
                id="about-error"
            />
        </PopupWithForm>
    )
}

export default EditProfilePopup