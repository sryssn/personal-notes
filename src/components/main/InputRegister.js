import React, { useContext } from "react";
import LocaleContext from "../../contexts/LocaleContext";
import useInput from "../../hooks/useInput";
import PropTypes from 'prop-types';

function InputRegister({register}) {
    const { locale } = useContext(LocaleContext);
    const [name, handleNameChange] = useInput('');
    const [email, handleEmailChange] = useInput('');
    const [password, handlePasswordChange] = useInput('');

    function onClickHandler(event) {
        event.preventDefault();
        register({
            name: name,
            email: email,
            password: password,
        });
    }

    return (
        <div className="input-register">
            <label for='name'>{locale === 'id' ? 'Nama' : 'Name'}</label>
            <input type='text' id="name" value={name} onChange={handleNameChange}></input>
            <label for='email'>Email</label>
            <input type='email' id='email' value={email} onChange={handleEmailChange}></input>
            <label for='password'>{locale === 'id' ? 'Kata Sandi' : 'Password'}</label>
            <input type='password' id='password' autoComplete="current-password" value={password} onChange={handlePasswordChange}></input>
            <button type='button' onClick={onClickHandler}>{locale === 'id' ? 'Daftar' : 'Sign Up'}</button>
        </div>
    );
}

InputRegister.propTypes = {
    register: PropTypes.func
}

export default InputRegister;