import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import FormAuth from "./FormAuth";
import Loading from "./Loading";

const Register = ({ onRegister, isLoading }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })

    useEffect(() => {
        document.title = 'Регистрация';
    }, []);

    function handleSubmit (e) {
        e.preventDefault();
        if (!formValues.email || !formValues.password) {
            return;
        }
        onRegister(formValues.email, formValues.password);
        setFormValues({ email: '', password: '' });

    }

    function onChange (e) {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });

    }
    if (isLoading) return <Loading />

    return (
        <>
            <h1 className="page__title">Регистрация</h1>
            <FormAuth onChange={onChange} handleSubmit={handleSubmit} formValues={formValues} autoComplete="new-password" textButton="Зарегистрироваться" />
            <p className="page__hint">
                Уже зарегистрированы?
                <NavLink to="/sign-in" className="page__navigation-link">Войти</NavLink>
            </p>
        </>
    )
}

export default Register