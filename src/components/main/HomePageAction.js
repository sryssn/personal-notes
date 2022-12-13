import React from "react";
import { FiPlus } from 'react-icons/fi';
import PropTypes from 'prop-types';

function HomePageAction({navigate}) {
    function linkToNewNote() {
        navigate('/notes/new');
    }

    return (
        <div className="homepage__action">
                <button className="action" onClick={linkToNewNote} type="button" title="Tambah">
                    <FiPlus />
                </button>
        </div>
    );
}

HomePageAction.propTypes = {
    navigate: PropTypes.func.isRequired,
}

export default HomePageAction;