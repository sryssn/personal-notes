import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdGTranslate, MdLogout, MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import LocaleContext from '../../contexts/LocaleContext';
import ThemeContext from '../../contexts/ThemeContext';
import PropTypes from 'prop-types';

function Navigation({authUser, onLogout, name}) {
    const { locale, toggleLocale } = useContext(LocaleContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    if(authUser === null) {
        return (
            <>
                <button className='toggle-locale' type='button' onClick={toggleLocale}><MdGTranslate /></button>
                <button className='toggle-theme' type='button' onClick={toggleTheme}>{theme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}</button>
            </>
        )
    }

    return (
        <>
            <nav className='navigation'>
                <ul>
                    <li>
                        <Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archives'}</Link>
                    </li>
                </ul>
            </nav>
            <button className='toggle-locale' type='button' onClick={toggleLocale}><MdGTranslate /></button>
            <button className='toggle-theme' type='button' onClick={toggleTheme}>{theme === 'dark' ? <MdOutlineLightMode /> : <MdOutlineNightlight />}</button>
            <button className='button-logout' type='button' onClick={onLogout}><MdLogout />{name}</button>
        </>
    );
}

Navigation.propTypes = {
    authUser: PropTypes.object,
    onLogout: PropTypes.func,
    name: PropTypes.string
}

export default Navigation;