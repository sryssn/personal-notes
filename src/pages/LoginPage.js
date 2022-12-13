import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import InputLogin from "../components/main/InputLogin";
import LocaleContext from "../contexts/LocaleContext";
import { login } from '../utils/network-data';
import PropTypes from 'prop-types';

function LoginPage({loginSuccess}) {
    const { locale } = useContext(LocaleContext);

    async function onLogin(user) {
        const { error, data } = await login(user);

        if(!error) {
            loginSuccess(data);
        }
    }

    return (
        <section className="login-page">
            <h2>{locale === 'id' ? 'Login ke aplikasi' : 'Log in to app' }</h2>
            <InputLogin login={onLogin} />
            <p><Link to='/register'>{locale === 'id' ? 'Buat Akun Baru' : 'Create New Account'}</Link></p>
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func
}

export default LoginPage;