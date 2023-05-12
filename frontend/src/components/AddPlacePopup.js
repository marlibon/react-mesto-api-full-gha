import React, { useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = (props) => {
    const { isOpen } = props;
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');

    function handleChangeTitle (e) {
        setTitle(e.target.value)
    }

    function handleChangeUrl (e) {
        setUrl(e.target.value)
    }
    function handleSubmit (e) {
        e.preventDefault();
        props.onAddPlace({
            title,
            url,
        });
    }

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setUrl('');
        }
    }, [isOpen])

    return (
        <PopupWithForm
            name="add-element"
            title="Новое место"
            textButton="Создать"
            {...props}
            onSubmit={handleSubmit}
            onStateButton={false}
        >
            <input
                type="text"
                placeholder="Название"
                className="form__input form__input_title"
                name="title" id="title"
                minLength={2}
                maxLength={30}
                onChange={handleChangeTitle}
                value={title}
                required
            />
            <span
                className="form__error title-error"
                id="title-error"
            />
            <input
                placeholder="Ссылка на картинку"
                className="form__input form__input_url"
                type="url" name="url" id="url"
                onChange={handleChangeUrl}
                value={url}
                required
            />
            <span
                className="form__error url-error"
                id="url-error"
            />
        </PopupWithForm>
    )
}

export default AddPlacePopup