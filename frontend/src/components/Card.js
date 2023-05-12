import React from "react";
import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import imageEmpty from "../images/empty.png";

function Card (card) {
    const { name, link, owner, _id, likes, onCardClick, onCardLike, onCardDelete } = card;
    const currentUser = useContext(CurrentUserContext);
    const isOwn = owner._id === currentUser._id;
    function handleClick () {
        onCardClick({ name, link });
    }
    function handleLikeClick (e) {
        onCardLike(card, isOwnerLiked());
        e.target.classList.add('element__like-btn_progress')
    }
    function handleDeleteClick () {
        onCardDelete(_id);
    }
    function isOwnerLiked () {
        return likes.some((user) => user._id === currentUser._id);
    }

    return (
        <article className="element" >
            <img src={imageEmpty} alt="" className="element__img" style={{ backgroundImage: `url(${link})` }} onClick={handleClick} />
            <h3 className="element__title">{name}</h3>
            <div className="element__likes">
                <button
                    type="button"
                    className={`element__like-btn ${isOwnerLiked() ? 'element__like-btn_active' : ''}`}
                    onClick={handleLikeClick}
                    title={likes.reduce((sum, current) => `${sum} ${current.name};`, "")} />
                <p className="element__like-count">{likes.length}</p>
            </div>
            {isOwn && <button type="button" className="element__trash-btn" onClick={handleDeleteClick} />}
        </article>
    );
}

export default Card;
