import React from "react";
import { MdDeleteOutline, MdArchive, MdUnarchive } from 'react-icons/md';
import { archiveNote, unarchiveNote } from "../../utils/network-data";
import PropTypes from 'prop-types';

function DetailPageAction({id, deleteNote, navigate, archived}) {
    async function onArchiveNote() {
        await archiveNote(id);
        navigate('/');
    }

    async function onActiveNote() {
        await unarchiveNote(id);
        navigate('/archives');
    }

    async function onDeleteNote() {
        await deleteNote(id);

        if(!archived) {
            navigate('/');
        } else {
            navigate('/archives');
        }
    }

    if(!archived) {
        return (
            <div className="detail-page__action">
                <button 
                    className="action"
                    type="button"
                    onClick={onArchiveNote}
                    title="Arsipkan"
                >
                    <MdArchive />
                </button>
                <button
                    className="action"
                    type="button"
                    onClick={onDeleteNote}
                    title="Hapus"
                >
                    <MdDeleteOutline />
                </button>
            </div>
        );
    }

    return (
        <div className="detail-page__action">
            <button 
                className="action"
                type="button"
                onClick={onActiveNote}
                title="Aktifkan"
            >
                <MdUnarchive />
            </button>
            <button
                className="action"
                type="button"
                onClick={onDeleteNote}
                title="Hapus"
            >
                <MdDeleteOutline />
            </button>
        </div>
    );
}

DetailPageAction.propTypes = {
    id: PropTypes.string.isRequired,
    deleteNote: PropTypes.func,
    navigate: PropTypes.func.isRequired,
    archived: PropTypes.bool,
}

export default DetailPageAction;