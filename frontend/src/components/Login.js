import { useState, useEffect } from "react";
import Loading from "./Loading";
import FormAuth from "./FormAuth";

const Login = ({ onLogin, isLoading }) => {
    const [formValues, setFormValues] = useState({ email: '', password: '' })

    useEffect(() => {
        document.title = 'Вход';
    }, []);

    function handleSubmit (e) {
        e.preventDefault();
        if (!formValues.email || !formValues.password) {
            return;
        }
        onLogin(formValues.email, formValues.password);
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
            <h1 className="page__title">Вход</h1>
            <FormAuth onChange={onChange} handleSubmit={handleSubmit} formValues={formValues} autoComplete="current-password" textButton="Войти" />
        </>
    )
}

export default Login