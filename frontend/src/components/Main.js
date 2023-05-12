import { useContext, useEffect } from 'react';
import Spinner from "./Spinner";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main ({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, onLoading }) {

  useEffect(() => {
    document.title = 'Mesto: React - Проект по авторизации';
  }, []);

  const { name, about, avatar } = useContext(CurrentUserContext);
  return (
    <main className="main page__content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <img src={avatar} alt="Аватарка профиля" className="profile__avatar" />
            <button type="button" className="profile__avatar-btn" onClick={onEditAvatar} />
          </div>
          <h1 className="profile__title">{name}</h1>
          <p className="profile__subtitle">{about}</p>
          <button type="button" className="profile__edit-btn" onClick={onEditProfile} />
        </div>
        <button type="button" className="profile__add-item-btn" onClick={onAddPlace} />
      </section>
      <section className="elements">
        {onLoading
          ? (<Spinner />)
          : (cards.map(({ _id, ...props }) => <Card onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={_id} _id={_id} {...props} />))
        }
      </section>
    </main>

  );
}

export default Main;
