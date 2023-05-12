import { useEffect, useState } from 'react';
import { Navigate, Route, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes } from "react-router-dom";

import { api } from "../utils/api";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import imageLoading from "../images/loading.gif";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth';
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import SignOut from './SignOut';
import Loading from './Loading';

function App () {
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [isNotifyPopupOpen, setisNotifyPopupOpen] = useState(false);
  const [statusCompleted, setStatusCompleted] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);
  const [emailAuthedUser, setEmailAuthedUser] = useState('');
  const [futureDeletedCard, setFutureDeletedCard] = useState('');
  const [selectedCard, setSelectedCard] = useState({ name: 'загрузка', link: imageLoading });
  const [currentUser, setСurrentUser] = useState({ name: 'загрузка...', about: 'загрузка...', avatar: imageLoading, _id: '' });
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleCardClick (card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardLike (card, value) {
    api.setLike(card._id, value)
      .then((newCard) => {
        setCards((state) => state.map((oldCard) => oldCard._id === card._id ? newCard : oldCard));
      })
      .catch((error) => console.error(error))
  }

  function handleConfirmCardDelete (_id) {
    setFutureDeletedCard(_id);
    setIsConfirmDeletePopupOpen(true)
  }

  function handleCardDelete (_id) {
    setIsLoading(true);
    api.removeCard(_id)
      .then(() => {
        const newArrCards = cards.filter((item) => item._id !== _id);
        setCards(newArrCards);
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleUpdateUser ({ name, about }) {
    setIsLoading(true);
    api.patchUserInfo(name, about)
      .then(({ name, about, avatar, _id }) => {
        setСurrentUser({ name, about, avatar, _id });
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAddPlaceSubmit ({ title, url }) {
    setIsLoading(true);
    api.addCard(title, url)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar ({ avatar }) {
    setIsLoading(true);
    api.replaceAvatar(avatar)
      .then(({ avatar }) => {
        setСurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleLogin (email, password) {
    setIsLoading(true)
    auth.authorize(email, password)
      .then((data) => {
        if (data.message) {
          setErrorMessage(data.message);
          throw new Error(data.message);
        }
        if (data.token) {
          localStorage.setItem('token', data.token)
          setEmailAuthedUser(email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        setStatusCompleted(false);
        setisNotifyPopupOpen(true);
        console.log(err.message)
      })
      .finally(() => setIsLoading(false))
  }
  function handleRegister (email, password) {
    setIsLoading(true)
    auth.register(email, password)
      .then((res) => {
        if (res.message) {
          setErrorMessage(res.message);
          throw new Error(res.message);
        }
        if (res.error) {
          setErrorMessage(res.error);
          throw new Error(res.error);
        }
        setStatusCompleted(true);
        setisNotifyPopupOpen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        setStatusCompleted(false);
        setisNotifyPopupOpen(true);
        console.log(err);
      })
      .finally(() => setIsLoading(false))
  }
  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setisNotifyPopupOpen(false);
    setSelectedCard({ name: 'загрузка', link: imageLoading });
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCardList()])
        .then(([{ name, about, avatar, _id }, cardsFromServer]) => {
          setСurrentUser({ name, about, avatar, _id });
          setCards(cardsFromServer);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setIsLoadingCards(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !loggedIn) {
      setIsLoading(true)
      auth.checkToken(token)
        .then((data) => {
          setEmailAuthedUser(data.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
          setIsLoading(false);
          setIsLoadingCards(true)
        })
        .catch(err => {
          console.log(err)
          setIsLoading(false);
        })
    }
  }, [loggedIn])

  if (isLoading) return <Loading />;

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={emailAuthedUser} />
        <Routes>
          <Route path="/" element={<ProtectedRoute
            element={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleConfirmCardDelete}
            onLoading={isLoadingCards}
            loggedIn={loggedIn}
          />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} isLoading={isLoading} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} isLoading={isLoading} />} />
          <Route path="/sign-out" element={<SignOut onLoggedIn={setLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
          onCardDelete={handleCardDelete}
          onFutureDeletedCard={futureDeletedCard}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          name="notify"
          isOpen={isNotifyPopupOpen}
          onClose={closeAllPopups}
          statusCompleted={statusCompleted}
          errorMessage={errorMessage}
        />
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
