import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AuthNavigation = ({ email }) => {
    // не забыть про контекст
    const [authState, setAuthState] = useState({ link: '', anchor: '' });
    let location = useLocation();

    useEffect(() => {
        location.pathname === '/sign-in' && setAuthState({ link: 'sign-up', anchor: 'Регистрация' })
        location.pathname === '/sign-up' && setAuthState({ link: 'sign-in', anchor: 'Войти' })
        location.pathname === '/' && setAuthState({ link: 'sign-out', anchor: 'Выйти' })
    }, [location])
    return (
        <>
            {email && <p className="header__email">{email}</p>}
            <Link to={authState.link} className={`header__link ${location.pathname === '/' && 'header__link_authed'}`}>{authState.anchor}</Link>
        </>
    )
}

export default AuthNavigation