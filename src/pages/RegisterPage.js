import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import InputRegister from "../components/main/InputRegister";
import LocaleContext from "../contexts/LocaleContext";
import { register } from '../utils/network-data';
import PropTypes from 'prop-types';

function RegisterPage({navigate}) {
    const { locale } = useContext(LocaleContext);

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if(!error) {
            navigate('/');
        }
    }

    return (
        <section className="register-page">
            <h2>{locale === 'id' ? 'Buat Akun Baru' : 'Create a New Account'}</h2>
            <InputRegister register={onRegisterHandler} />
            <p><Link to='/'>{locale === 'id' ? 'Sudah memiliki akun?' : 'Already have an account?'}</Link></p>
        </section>
    );
}

RegisterPage.propTypes = {
    navigate: PropTypes.func.isRequired
}

export default RegisterPage;