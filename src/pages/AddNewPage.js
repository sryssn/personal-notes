import React, { useState } from "react";
import AddNewPageAction from "../components/main/AddNewPageAction";
import AddNewPageInput from "../components/main/AddNewPageInput";
import { addNote } from '../utils/network-data';
import PropTypes from 'prop-types';
import useInput from "../hooks/useInput";

function AddNewPage({navigate}) {
    const [inputTitle, handleTitleChange] = useInput('');
    const [inputBody, setInputBody] = useState('');

    function onBodyChangeEventHandler(event) {
        setInputBody(event.target.innerHTML);
    }

    async function linkToHomePage() {
        await addNote({
            title: inputTitle,
            body: inputBody
        });

        navigate('/');
    }

    return (
        <section className="add-new-page">
            <AddNewPageInput
                onTitleChangeEventHandler={handleTitleChange}
                onBodyChangeEventHandler={onBodyChangeEventHandler}
            />
            <AddNewPageAction
                linkToHomePage={linkToHomePage}
            />
        </section>
    );
}

AddNewPage.propTypes = {
    navigate: PropTypes.func.isRequired
}

export default AddNewPage;