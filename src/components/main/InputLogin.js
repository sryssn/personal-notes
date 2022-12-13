import React, { useContext } from "react";
import LocaleContext from "../../contexts/LocaleContext";
import useInput from "../../hooks/useInput";
import PropTypes from 'prop-types';

function InputLogin({login}) {
    const { locale } = useContext(LocaleContext);
    const [email, handleEmailChange] = useInput('');
    const [password, handlePasswordChange] = useInput('');

    function onClickLoginHandler(event) {
        event.preventDefault();
        login({
            email: email,
            password: password
        });
    }

    return (
        <div className="input-login">
            <label for='email'>Email</label>
            <input type='email' id="email" value={email} onChange={handleEmailChange}></input>
            <label for='password'>{locale === 'id' ? 'Kata Sandi' : 'Password'}</label>
            <input type='password' id='password' value={password} onChange={handlePasswordChange}></input>
            <button type='button' onClick={onClickLoginHandler}>{locale === 'id' ? 'Masuk' : 'Log in'}</button>
        </div>
    );
}

InputLogin.propTypes = {
    login: PropTypes.func,
}

export default InputLogin;