import React, { useState } from 'react'
import Popup from './Popup';

function PopupWithForm (props) {
  const { name, title, textButton, isOpen, onClose, children, onSubmit, isLoading, onStateButton } = props;
  const [stateButtonSubmit, setStateButtonSubmit] = useState(onStateButton);
  function onChangeValidation (e) {
    const { name, value } = e.target
    const currentInput = e.target;
    const errorContainer = currentInput.nextSibling;
    const form = e.currentTarget;

    if (!currentInput.validity.valid && errorContainer.id === currentInput.id + '-error') {
      errorContainer.style.visibility = "visible"
      errorContainer.textContent = e.target.validationMessage
    } else {
      errorContainer.style.visibility = "hidden"
      errorContainer.textContent = ""

    }
    if ([...form.elements].some(element => element.validity.valid !== true)) {
      setStateButtonSubmit(false)
    } else {
      setStateButtonSubmit(true)
    }
  }
  function handleSubmit (e) {
    setStateButtonSubmit(onStateButton)
    onSubmit(e)
  }
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <h3 className="popup__title">{title}</h3>
        <form
          name={`form_${name}`}
          action="/"
          className={`form form_${name}`}
          onSubmit={handleSubmit}
          onChange={onChangeValidation}
        >
          {children}
          <button
            type="submit"
            name="form__submit"
            className={`form__submit ${!stateButtonSubmit && "form__submit_disable"}`}
            disabled={!stateButtonSubmit}>{isLoading ? "обработка..." : textButton}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
