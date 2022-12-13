import React from "react";
import { FiCheck } from 'react-icons/fi';
import PropTypes from 'prop-types';

function AddNewPageAction({linkToHomePage}) {
    return (
        <div className="add-new-page__action">
            <button className="action" onClick={linkToHomePage} type="button" title="Simpan"><FiCheck /></button>
        </div>
    );
}

AddNewPageAction.propTypes = {
    linkToHomePage: PropTypes.func,
}

export default AddNewPageAction;