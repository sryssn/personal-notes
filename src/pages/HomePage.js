import React, { useContext, useEffect, useState } from "react";
import HomePageAction from "../components/main/HomePageAction";
import NotesListActive from "../components/main/NotesListActive";
import SearchBar from "../components/main/SearchBar";
import PropTypes from 'prop-types';
import LocaleContext from "../contexts/LocaleContext";
import { getActiveNotes } from '../utils/network-data';
import Loading from "../components/main/Loading";

function HomePage({showFormattedDate, navigate, activeNotes, keyword, changeSearchParams, setActiveNotes}) {
    const { locale } = useContext(LocaleContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function asyncGetActiveNotes() {
            const actNotes = await getActiveNotes();
            setActiveNotes(actNotes.data);
            setLoading(false);
        }

        asyncGetActiveNotes();

        return () => {
            setActiveNotes(null);
            setLoading(true);
        }
    },[setActiveNotes]);

    return (
        <section className="homepage">
            <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
            <SearchBar
                keyword={keyword}
                changeSearchParams={changeSearchParams}
            />
            {loading ? (<Loading />) : (
                <NotesListActive 
                    activeNotes={activeNotes}
                    showFormattedDate={showFormattedDate}
                    keyword={keyword}
                />
            )}
            <HomePageAction navigate={navigate} />
        </section>
    );
}

HomePage.propTypes = {
    showFormattedDate: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    activeNotes: PropTypes.func,
    keyword: PropTypes.string,
    changeSearchParams: PropTypes.func,
    setActiveNotes: PropTypes.arrayOf(PropTypes.object)
}

export default HomePage;