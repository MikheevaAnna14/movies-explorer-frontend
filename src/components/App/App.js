import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PopupInfo from '../PopupInfo/PopupInfo';
import * as api from '../../utils/MainApi';
import * as movieApi from '../../utils/MoviesApi';
import CurrentUserContext from './../../contexts/CurrentUserContext';
import IsLoggedInContext from './../../contexts/IsLoggedInContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { shortDuration } from '../../utils/Constants';

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupInfoIcon, setPopupInfoIcon] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [movieSelected, setMovieSelected] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [shortFilms, setShortFilms] = useState([]);
  const [arraySavedMovies, setArraySavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(false);
  const [selectSavedMovies, setSelectSavedMovies] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);
  const [searchSavedMoviesComplete, setSearchSavedMoviesComplete] = useState(false);

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if(JSON.parse(localStorage.getItem('token'))) {
      getCurrentUser();
      setSearchSavedMoviesComplete(false);
    } else return;
  },[]);

  React.useEffect(() => {
    if(localStorage.getItem('resSearch') === null) {
      return
    } else {
      setSearchComplete(true);
      setMovieSelected(JSON.parse(localStorage.getItem('resSearch')));
      setShortFilms((JSON.parse(localStorage.getItem('resSearch')).filter((film) => {
        return film.duration <= shortDuration
      })));
    }
    setIsChecked(JSON.parse(localStorage.getItem('checkboxChecked')));
    setArraySavedMovies(arraySavedMovies);
  },[]);

  React.useEffect(() => {
    if (location.pathname.includes('/saved-movies')) {
      setSelectSavedMovies(arraySavedMovies);
      setIsCheckedSavedMovies(false);
    }
  },[location.pathname]);

  React.useEffect(() => {
    if (location.pathname.includes('/saved-movies')) {
      if (isCheckedSavedMovies && !searchSavedMoviesComplete) {
        if (arraySavedMovies.length !== 0) {
          setShortSavedMovies(arraySavedMovies.filter((movies) => {
            return movies.duration <= shortDuration
          }))
        } else return;
      } else if (isCheckedSavedMovies && searchSavedMoviesComplete) {
        if (selectSavedMovies.length !== 0) {
          setShortSavedMovies(selectSavedMovies.filter((movies) => {
            return movies.duration <= shortDuration
          }))
        } else return; 
      }
    }
  },[isCheckedSavedMovies]);

  function getCurrentUser() {
    api.getCurrentUser()
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
        setIsLoggedIn(true);
        getMoviesCurrentUser();
      })
      .catch((err) => console.log(err))
  }

  function handleLoginSubmit(email, password) {
    setIsLoadingForm(true);
    api.login(email, password)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        setIsLoggedIn(true);
        getMoviesCurrentUser();
        localStorage.setItem('token', JSON.stringify(true));
        history.push('/movies')
      })
      .catch((err) => {
        setIsOpenPopup(true);
        setPopupInfoIcon(false);
        setPopupMessage(err === 401 ? 'Вы ввели неправильный email или пароль' : 'При авторизации произошла ошибка');
      })
      .finally(() => setIsLoadingForm(false))
  }

  function handleRegisterSubmit(email, password, name) {
    setIsLoadingForm(true);
    api.registration(name, email, password)
      .then(() => { 
          setCurrentUser(name, email);
          handleLoginSubmit(email, password)    
        })
      .catch((err) => {
        setIsOpenPopup(true);
        setPopupInfoIcon(false);
        setPopupMessage(err === 400 ? 'Неправильный формат электронной почты' : 
          'Пользователь с таким email уже существует.');
      })
      .finally(() => setIsLoadingForm(false))
  }

  function getMoviesCurrentUser() {
    api.getSavedMovies()
      .then((movies) => {
        setArraySavedMovies(movies);        
      })
      .catch((err) => console.log(err));
  }

  function handleClosePopupInfo () {
    setIsOpenPopup(false);
    setPopupMessage('');
  }

  function handleUpdateProfile(userName, userEmail) {
    setIsLoadingForm(true);
    api.updateProfile(userEmail, userName)
      .then((res) => {
        setCurrentUser(res);
        setPopupMessage('Данные пользователя успешно изменены');
        setPopupInfoIcon(true);
        setIsOpenPopup(true);
      })
      .catch((err) => {
        setPopupInfoIcon(false);
        setIsOpenPopup(true);
        setPopupMessage(err === 409 ? 'Пользователь с таким email уже зарегистрирован' :
          'При обновлении профиля произошла ошибка');
      })
      .finally(() => setIsLoadingForm(false))
  }

  function signout() {
    api.signout();
    setIsLoggedIn(false);
    setCurrentUser({});
    setMovieSelected([]);
    setShortFilms([]);
    setIsChecked(false);
    setArraySavedMovies([]);
    setSearchComplete(false);
    setSearchSavedMoviesComplete(false);
    setShortSavedMovies([]);
    setIsCheckedSavedMovies(false);
    setIsLoading(false);
    setIsLoadingForm(false);
    setSelectSavedMovies([]);
    localStorage.clear();
    history.push('/');
  }

  function checkShortFilms() {
      setShortFilms(movieSelected.filter((film) => {
        return film.duration <= shortDuration
      })) 
  }

  function handleSearchMovies(itemSearch) {
    const check = isChecked;
    const moviesArr = JSON.parse(localStorage.getItem('movies'));
    const resSearch = (moviesArr.filter((movies) => {
      const searchString = [movies.nameRU, movies.nameEN].join(' ');
      return ((searchString).toLowerCase()).includes((itemSearch).toLowerCase());
    }));
    if (check) {
      setShortFilms(resSearch.filter((res) => {
        return res.duration <= shortDuration
      }))
    }
    localStorage.setItem('resSearch', JSON.stringify(resSearch));
    setMovieSelected(resSearch); 
  }

  function handleSearchSubmit(itemSearch) {
    localStorage.setItem('itemSearch', itemSearch);
    setIsLoading(true);
    if(localStorage.getItem('movies') === null) {
      movieApi.moviesSearch()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res))
        }) 
        .then(() => {
          handleSearchMovies(itemSearch)
          setSearchComplete(true);
        })
        .catch((err) => {
          setPopupInfoIcon(false);
          setIsOpenPopup(true);
          setPopupMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
          console.log(err);
        })
        .finally(() => setIsLoading(false))
    } else {
      handleSearchMovies(itemSearch);
      setIsLoading(false);
    }
  }

  function handleSearchSubmitSavedMovies(itemSearchSavedMovies) {
    setSearchSavedMoviesComplete(true);
    setSelectSavedMovies((arraySavedMovies.filter((movies) => {
      const searchString = [movies.nameRU, movies.nameEN].join(' ');
      return ((searchString).toLowerCase()).includes((itemSearchSavedMovies).toLowerCase());
    })));
    if (isCheckedSavedMovies) {
      const resSearchSavedMovies = (arraySavedMovies.filter((movies) => {
        const searchString = [movies.nameRU, movies.nameEN].join(' ');
        return ((searchString).toLowerCase()).includes((itemSearchSavedMovies).toLowerCase());
      }));
      setShortSavedMovies(resSearchSavedMovies.filter((res) => {
        return res.duration <= shortDuration
      }))
    } 
  }

  function handleClickCheckbox(isCheck) {
    setIsChecked(isCheck);
    if (!isCheck) {
      return
    } else if (movieSelected !== null) {
      checkShortFilms();
    }
  }

  function handleClickCheckboxSavedMovies(isCheck) {
    setIsCheckedSavedMovies(isCheck);
    if (!isCheck) {
      return
    } else {
      if (!searchSavedMoviesComplete) {
        setShortSavedMovies(arraySavedMovies.filter((movies) => {
          return movies.duration <= shortDuration
        }))
      } else {
        setShortSavedMovies(selectSavedMovies.filter((movies) => {
          return movies.duration <= shortDuration
        }))
      }       
    } 
  }

  function handleClickMoviesCard(movie, like) {
    const moviesDelete = arraySavedMovies.find((movies) => movies.movieId === movie.id);
    api.movieSaved(movie, like, moviesDelete)
      .then(() => {
        getMoviesCurrentUser();
      })
      .catch((err) => console.log(err));
  }

  function handleClickCardDelete(movie) {
    api.movieDelete(movie)
      .then(() => {
        getMoviesCurrentUser();
        if(selectSavedMovies.length !== 0) {
          if(!isCheckedSavedMovies) {
            setSelectSavedMovies(selectSavedMovies.filter((movies) => {
              return movies._id !== movie._id;
            }))
          } else {
            setSelectSavedMovies(selectSavedMovies.filter((movies) => {
              return movies._id !== movie._id;
            }));
            setShortSavedMovies(shortSavedMovies.filter((movies) => {
              return movies._id !== movie._id;
            }))
          } 
        } else if (arraySavedMovies !== 0) {
          if(!isCheckedSavedMovies) {
            setSelectSavedMovies(arraySavedMovies.filter((movies) => {
              return movies._id !== movie._id;
            }))
          } else {
            setSelectSavedMovies(arraySavedMovies.filter((movies) => {
              return movies._id !== movie._id;
            }));
            setShortSavedMovies(shortSavedMovies.filter((movies) => {
              return movies._id !== movie._id;
            }))
          }
        }
      })
      .catch((err) => console.log(err));
  }

  return(
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <IsLoggedInContext.Provider value={isLoggedIn}>
          <Switch>
            <Route exact path="/" >
              <Main
                isLoggedIn={isLoggedIn}
              />
            </Route>
            <Route path="/signup">
              {isLoggedIn && <Redirect to="/" />}
              <Register
                onSubmit={handleRegisterSubmit}
                isLoadingForm={isLoadingForm}
              />
            </Route>
            <Route path="/signin">
              {isLoggedIn && <Redirect to="/" />}
              <Login
                onSubmit={handleLoginSubmit}
                isLoadingForm={isLoadingForm}
              />
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              isLoggedIn={isLoggedIn}
              onSubmit={handleSearchSubmit}
              movieSelected={movieSelected} 
              shortMovies={shortFilms}
              isChecked={isChecked}
              onClickCheckbox={handleClickCheckbox}
              onClickMoviesCard={handleClickMoviesCard}
              arraySavedMovies={arraySavedMovies}
              isLoading={isLoading}
              searchComplete={searchComplete}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              arraySavedMovies={arraySavedMovies}
              onClickCheckboxSavedMovies={handleClickCheckboxSavedMovies}
              shortSavedMovies={shortSavedMovies}
              isCheckedSavedMovies={isCheckedSavedMovies}
              onSubmitSavedMovies={handleSearchSubmitSavedMovies}
              selectSavedMovies={selectSavedMovies}
              onClickMoviesCardDelete={handleClickCardDelete}
              searchSavedMoviesComplete={searchSavedMoviesComplete}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              isLoggedIn={isLoggedIn}
              onSubmit={handleUpdateProfile}
              onClick={signout}
              isLoadingForm={isLoadingForm}
            />
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <PopupInfo 
            isOpen={isOpenPopup}
            Message={popupMessage}
            onClose={handleClosePopupInfo}
            icon={popupInfoIcon}
          />  
        </IsLoggedInContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
