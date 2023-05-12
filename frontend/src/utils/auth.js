// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.zagriev.nomoredomains.monster';

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
        .then((res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
        .then((data) => data)
};

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res => res.ok || res.status === 400 ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))

};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res => res.ok || res.status === 401 ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))

};
