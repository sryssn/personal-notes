import React, { useContext } from "react";
import PropTypes from 'prop-types';
import LocaleContext from "../../contexts/LocaleContext";

function SearchBar({keyword, changeSearchParams}) {
    const { locale } = useContext(LocaleContext);
    return (
        <section className="search-bar">
            <input
                type='text'
                value={keyword}
                onChange={changeSearchParams}
                placeholder={locale === 'id' ? "Cari berdasarkan judul ..." : 'Search by title ...'}
            ></input>
        </section>
    );
}

SearchBar.propTypes = {
    keyword: PropTypes.string,
    changeSearchParams: PropTypes.func
}

export default SearchBar;