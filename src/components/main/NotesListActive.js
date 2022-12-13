import React from "react";
import NoteItemActive from "./NoteItemActive";
import NotesListEmpty from "./NotesListEmpty";
import PropTypes from 'prop-types';

function NotesListActive({showFormattedDate, keyword, activeNotes}) {
    const notesFilter = activeNotes.filter((note) => {
                            if(keyword) {
                                return note.title.toLowerCase().includes(keyword.toLowerCase())
                            }
                            return true;
                        })

    if(notesFilter.length > 0) {
        return (
            <section className="notes-list">
                {
                    notesFilter.map((note) => (<NoteItemActive key={note.id} id={note.id} {...note} showFormattedDate={showFormattedDate} />))
                }
            </section>
        )
    } else {
        return (
            <NotesListEmpty />
        )
    }
}

NotesListActive.propTypes = {
    showFormattedDate: PropTypes.func.isRequired,
    keyword: PropTypes.string,
    activeNotes: PropTypes.func,
}

export default NotesListActive;