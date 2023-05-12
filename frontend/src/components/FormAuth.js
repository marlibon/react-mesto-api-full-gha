const FormAuth = ({ onChange, handleSubmit, formValues, textButton, autoComplete }) => {
    return (
        <form
            noValidate
            name="form_register"
            action="/"
            className="form form_type_auth"
            onSubmit={handleSubmit}
        >
            <input
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="form__input input_theme_dark form__input_email"
                name="email" id="email"
                minLength={2}
                maxLength={40}
                value={formValues.email}
                onChange={onChange}
                required
            />
            <span
                className="form__error email-error"
                id="email-error"
            />
            <input
                type="password"
                autoComplete={autoComplete}
                placeholder="Пароль"
                className="form__input input_theme_dark form__input_password"
                name="password"
                id="password"
                minLength={2}
                maxLength={200}
                value={formValues.password}
                onChange={onChange}
                required
            />
            <span
                className="form__error about-error"
                id="about-error"
            />
            <button
                type="submit"
                name="form__submit"
                className="form__submit form__submit_theme_dark"
            >
                {textButton}
            </button>
        </form>
    )
}
export default FormAuth