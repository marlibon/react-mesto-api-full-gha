import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import logo from "../images/header-logo.svg";
import imageMenuOpened from "../images/menu-opened.png";
import imageMenuClosed from "../images/menu-closed.png";

function Header ({ email }) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [locationState, setLocationState] = useState({ home: null, link: '', anchor: '' });
  const { home, link, anchor } = locationState;

  let location = useLocation();

  useEffect(() => {
    location.pathname === '/sign-in' && setLocationState({ home: false, link: 'sign-up', anchor: 'Регистрация' })
    location.pathname === '/sign-up' && setLocationState({ home: false, link: 'sign-in', anchor: 'Войти' })
    location.pathname === '/' && setLocationState({ home: true, link: 'sign-out', anchor: 'Выйти' })
  }, [location])

  function onClickByMenu () {
    setIsMenuOpened(!isMenuOpened)
  }
  return (

    <header className="header">
      {/* главная мобилы */}
      {home && isMenuOpened && (
        <nav className="header__auth_type_mobile">
          {email && <p className="header__email">{email}</p>}
          <Link onClick={() => setIsMenuOpened(false)} to={link} className="header__link header__link_authed">{anchor}</Link>
        </nav>)
      }
      <img src={logo} alt="логотип" className="header__logo" />

      {/* главная ПК */}
      {home && (<nav className="header__auth">
        {email && <p className="header__email">{email}</p>}
        <Link to={link} className="header__link header__link_authed">{anchor}</Link>
      </nav>)}

      {/* не главная мобилы + ПК */}
      {!home && (<nav className="header__auth header__auth_mob-visible">
        <Link to={link} className="header__link">{anchor}</Link>
      </nav>)}

      {/* главная мобилы */}
      {home && (<button type="button" onClick={onClickByMenu} className="header__menu-btn">
        <img src={isMenuOpened ? imageMenuOpened : imageMenuClosed} alt="" />
      </button>)}

    </header>

  );
}

export default Header;
