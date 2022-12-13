import React, { useContext } from "react";
import PropTypes from 'prop-types';
import LocaleContext from "../../contexts/LocaleContext";

function AddNewPageInput({onTitleChangeEventHandler, onBodyChangeEventHandler}) {
    const { locale } = useContext(LocaleContext);

    return (
        <div className="add-new-page__input">
            <input
                className="add-new-page__input__title"
                onChange={onTitleChangeEventHandler}
                placeholder={locale === 'id' ? 'Judul Catatan' : 'Note Title'}
            ></input>
            <div
                className="add-new-page__input__body"
                contentEditable
                onInput={onBodyChangeEventHandler}
                data-placeholder={locale === 'id' ? 'Konten catatan ...' : 'Note content ...'}
            ></div>
        </div>
    );
}

AddNewPageInput.propTypes = {
    onTitleChangeEventHandler: PropTypes.func,
    onBodyChangeEventHandler: PropTypes.func
}

export default AddNewPageInput;