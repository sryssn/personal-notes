import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../components/main/SearchBar";
import NotesListArchive from '../components/main/NotesListArchive';
import PropTypes from 'prop-types';
import LocaleContext from "../contexts/LocaleContext";
import Loading from "../components/main/Loading";
import { getArchivedNotes } from '../utils/network-data';

function ArchivesPage({showFormattedDate, keyword, changeSearchParams}) {
    const { locale } = useContext(LocaleContext);
    const [archiveNotes, setArchiveNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function asyncGetArchivedNotes() {
            const archNotes = await getArchivedNotes();
            setArchiveNotes(archNotes.data);
            setLoading(false);
        }
    
        asyncGetArchivedNotes();

        return () => {
            setArchiveNotes(null);
            setLoading(true);
        }
    },[]);

    return (
        <section className="archives-page">
            <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archive Note'}</h2>
            <SearchBar 
                keyword={keyword}
                changeSearchParams={changeSearchParams}
            />
            {loading ? (<Loading />) : (
                <NotesListArchive
                    showFormattedDate={showFormattedDate}
                    archiveNotes={archiveNotes}
                    keyword={keyword}
                />
            )}
        </section>
    );
}

ArchivesPage.propTypes = {
    showFormattedDate: PropTypes.func.isRequired,
    keyword: PropTypes.string,
    changeSearchParams: PropTypes.func,
}

export default ArchivesPage;