import React from "react";
import NoteItemArchive from "./NoteItemArchive";
import NotesListEmpty from "./NotesListEmpty";
import PropTypes from 'prop-types';

function NotesListArchive({showFormattedDate, keyword, archiveNotes}) {
    const archiveNotesFilter = archiveNotes.filter((note) => {
                            if(keyword) {
                                return note.title.toLowerCase().includes(keyword.toLowerCase())
                            }
                            return true;
                        })

    if(archiveNotesFilter.length > 0) {
        return (
            <section className="notes-list">
                {
                    archiveNotesFilter.map((note) => (<NoteItemArchive key={note.id} id={note.id} {...note} showFormattedDate={showFormattedDate} />))
                }
            </section>
        )
    } else {
        return (
            <NotesListEmpty />
        )
    }
}

NotesListArchive.propTypes = {
    showFormattedDate: PropTypes.func.isRequired,
    keyword: PropTypes.string,
    archiveNotes: PropTypes.func,
}

export default NotesListArchive;