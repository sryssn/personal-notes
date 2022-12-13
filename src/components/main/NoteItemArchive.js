import React from "react";
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';

function NoteItemArchive({id, title, body, createdAt, showFormattedDate}) {
    return (
        <article className="note-item">
            <h3 className="note-item__title">
                <Link to={`/notes/${id}`}>{title}</Link>
            </h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__body">{parser(body)}</p>
        </article>
    );
}

NoteItemArchive.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    showFormattedDate: PropTypes.func.isRequired,
}

export default NoteItemArchive;