import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../../contexts/LocaleContext';

function ProjectTitle() {
    const { locale } = useContext(LocaleContext);

    return (
        <h1>
            <Link to="/" >{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
        </h1>
    );
}

export default ProjectTitle;