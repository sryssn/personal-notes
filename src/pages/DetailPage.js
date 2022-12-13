import React, { useEffect, useState } from "react";
import DetailPageAction from "../components/main/DetailPageAction";
import { getNote, deleteNote } from '../utils/network-data';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser'
import PageNotFound from "../components/main/PageNotFound";
import Loading from "../components/main/Loading";

function DetailPage({showFormattedDate, navigate, setActiveNotes}) {
    const params = useParams();
    const [note, setNote] = useState();
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const [noteCreatedAt, setNoteCreatedAt] = useState('');
    const [noteArchived, setNoteArchived] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function GetDetailNote() {
            const noteId = await getNote(`${params.id}`);
            const noteData = noteId.data;
            setLoading(false);
            setNote(noteId.data);
            setNoteTitle(noteData.title);
            setNoteBody(noteData.body);
            setNoteArchived(noteData.archived);
            setNoteCreatedAt(noteData.createdAt);
        }

        GetDetailNote();

        return () => {
            setNote(null);
            setNoteTitle(null);
            setNoteBody(null);
            setNoteArchived(null);
            setNoteCreatedAt(null);
            setLoading(true);
        }
    },[params.id]);

    if(loading) {
        return <Loading />
    }

    if(!note) {
        return (
            <PageNotFound />
        );
    }
    
    return (
        <section className="detail-page">
            <h3 className="detail-page__title">{noteTitle}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(noteCreatedAt)}</p>
            <div className="detail-page__body">{parser(noteBody)}</div>
            <DetailPageAction
                id={params.id}
                deleteNote={deleteNote}
                navigate={navigate}
                title={noteTitle}
                archived={noteArchived}
                setActiveNotes={setActiveNotes}
            />
        </section>
    );
}

DetailPage.propTypes = {
    showFormattedDate: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setActiveNotes: PropTypes.arrayOf(PropTypes.object)
}

export default DetailPage;