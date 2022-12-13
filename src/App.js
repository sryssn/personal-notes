import React, { useState, useMemo, useEffect } from 'react';
import Navigation from './components/header/Navigation';
import ProjectTitle from './components/header/ProjectTitle';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddNewPage from './pages/AddNewPage';
import ArchivesPage from './pages/ArchivesPage';
import PageNotFound from './components/main/PageNotFound';
import DetailPage from './pages/DetailPage';
import { showFormattedDate } from './utils/index';
import { getUserLogged, putAccessToken } from './utils/network-data';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LocaleContext from './contexts/LocaleContext';
import ThemeContext from './contexts/ThemeContext';

function App() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keywordParams = searchParams.get('keyword');
  const keyword = keywordParams && keywordParams.toLowerCase();
  const [locale, setLocal] = useState(localStorage.getItem('locale') || 'id');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [authUser, setAuthUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [name, setName] = useState('');
  const [activeNotes, setActiveNotes] = useState([]);

  function changeSearchParams(title) {
    setSearchParams({keyword: title.target.value.toLowerCase()});
  }

  function toggleLocale() {
    setLocal((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    })
  }

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale
    }
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme
    }
  }, [theme]);

  useEffect((prevTheme) => {
    if(prevTheme !== theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  },[theme])

  async function onLoginSuccess({accessToken}) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthUser(data);
    setName(data.name);
    navigate('/');
  }
  
  function onLogout() {
    setAuthUser(null);
    putAccessToken('');
    navigate('/');
  }

  useEffect(() => {
    async function asyncGetUserLogged() {
      const { data } = await getUserLogged();
      setAuthUser(data);
      setInitializing(false);
      setName(data.name);
    }

    asyncGetUserLogged()

    return () => {
      setAuthUser(null);
      setName(null);
    }
  }, []);
  
  if(initializing) {
    return null;
  }

  if(authUser === null) {
    return (
      <>
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <ProjectTitle />
              <Navigation authUser={authUser} />
            </header>
            <main>
              <Routes>
                  <Route path='*' element={<LoginPage loginSuccess={onLoginSuccess} />} />
                  <Route path='/register' element={<RegisterPage navigate={navigate} />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </>
    );
  }

  return (
    <>
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <div className="app-container">
            <header>
              <ProjectTitle />
              <Navigation authUser={authUser} onLogout={onLogout} name={name} />
            </header>
            <main>
              <Routes>
                  <Route path='/'
                    element={<HomePage
                                showFormattedDate={showFormattedDate}
                                navigate={navigate}
                                activeNotes={activeNotes}
                                keyword={keyword}
                                changeSearchParams={changeSearchParams}
                                setActiveNotes={setActiveNotes}
                              />}
                  />
                  <Route path='/notes/:id'
                    element={<DetailPage
                                showFormattedDate={showFormattedDate}
                                navigate={navigate}
                                setActiveNotes={setActiveNotes}
                              />}
                  />
                  <Route path='/notes/new'
                    element={<AddNewPage
                                navigate={navigate}
                                setActiveNotes={setActiveNotes}
                              />}
                  />
                  <Route path='/archives'
                    element={<ArchivesPage
                                showFormattedDate={showFormattedDate}
                                keyword={keyword}
                                changeSearchParams={changeSearchParams}
                              />}
                  />
                  <Route path='*'
                    element={<PageNotFound />} />
              </Routes>
            </main>
          </div>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
