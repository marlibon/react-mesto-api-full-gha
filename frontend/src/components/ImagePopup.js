import React from "react";
import Popup from './Popup';

function ImagePopup ({ card, isOpen, onClose }) {

    return (
        <Popup name="view-image" isOpen={isOpen} onClose={onClose}>
            <div className="popup__container popup__container_image">
                <button type="button" className="popup__close" onClick={onClose} />
                <figure className="popup__fig">
                    <img className="popup__image" src={card?.link} alt={card?.name} />
                    <figcaption className="popup__description" >{card?.name}</figcaption>
                </figure>
            </div>
        </Popup>
    );
}

export default ImagePopup;