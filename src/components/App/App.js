import React, { useState } from 'react';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import PopupInfo from '../PopupInfo/PopupInfo';
import Navbar from '../Navbar/Navbar';
import * as api from '../../utils/MainApi';
import * as movieApi from '../../utils/MoviesApi';
import CurrentUserContext from './../../contexts/CurrentUserContext';
import IsLoggedInContext from './../../contexts/IsLoggedInContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


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
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  const [isCheckedSavedMovies, setIsCheckedSavedMovies] = useState(false);
  const [selectSavedMovies, setSelectSavedMovies] = useState([]);
  const [searchComplete, setSearchComplete] = useState(false);

  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => { 
    if(localStorage.getItem('resSearch') === null) {
      return
    } else {
      setMovieSelected(JSON.parse(localStorage.getItem('resSearch')));
      setShortFilms((JSON.parse(localStorage.getItem('resSearch')).filter((film) => {
        return film.duration <= 40
      })) );
    }
    setIsChecked(JSON.parse(localStorage.getItem('checkboxChecked')));
  },[]);

  React.useEffect(() => {
    if (location.pathname.includes('/saved-movies')) {
     setSelectSavedMovies(arraySavedMovies);
     setIsCheckedSavedMovies(false);
    }
   },[location.pathname]);

   React.useEffect(() => {
    if (location.pathname.includes('/saved-movies')) {
      if (isCheckedSavedMovies) {
        setShortSavedMovies(selectSavedMovies.filter((res) => {
          return res.duration <= 40
      }))
    }
   }},[isCheckedSavedMovies]);

  function handleLoginSubmit(email, password) {
    api.login(email, password)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        setIsLoggedIn(true);
        getMoviesCurrentUser();   
        history.push('/movies')
      })
      .catch((err) => {
        setIsOpenPopup(true);
        setPopupInfoIcon(false);
        setPopupMessage(err === 401 ? 'Вы ввели неправильный email или пароль' : 'При авторизации произошла ошибка');
      })
    
  }

  function handleRegisterSubmit(email, password, name) {
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
      });
  }

  function getMoviesCurrentUser() {
    api.getSavedMovies()
      .then((movies) => {
        setArraySavedMovies(movies);        
        if (isCheckedSavedMovies) {
          setShortSavedMovies(movies.filter((res) => {
            return res.duration <= 40
          }))
        }
        })
      .catch((err) => console.log(err));
  }

  function handleClosePopupInfo () {
    setPopupMessage('');
    setIsOpenPopup(false);
    setPopupInfoIcon(false);
  }

  function handleUpdateProfile(userName, userEmail) {
    api.updateProfile(userEmail, userName)
      .then((res) => {
        setCurrentUser(res);
        setPopupMessage('Данные пользователя успешно изменены');
        setPopupInfoIcon(true);
        setIsOpenPopup(true);
      })
      .catch((err) => {
        setPopupMessage('Данные пользователя успешно изменены');
        setPopupInfoIcon(false);
        setIsOpenPopup(true);
        setPopupMessage(err === 409 ? 'Пользователь с таким email уже зарегистрирован' :
          'При обновлении профиля произошла ошибка');
      })
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
    setShortSavedMovies([]);
    setIsCheckedSavedMovies(false);
    localStorage.clear();
    history.push('/');
  }

  function checkShortFilms() {
    console.log('checkShortFilms');
      setShortFilms(movieSelected.filter((film) => {
        return film.duration <= 40
      })) 
  }

  function handleSearchMovies(itemSearch) {
    const check = isChecked;
    const moviesArr = JSON.parse(localStorage.getItem('movies'));
    const resSearch = (moviesArr.filter((movies) => {
      const searchString = [movies.nameRU, movies.nameEN, movies.year, movies.director, movies.country].join(' ');
      return ((searchString).toLowerCase()).includes((itemSearch).toLowerCase());
    }));
    if (check) {
      setShortFilms(resSearch.filter((res) => {
        return res.duration <= 40
      }))
    }
    localStorage.setItem('resSearch', JSON.stringify(resSearch));
    setMovieSelected(resSearch); 
  }

  function handleSearchSubmit(itemSearch) {
    localStorage.setItem('itemSearch', itemSearch);
    setIsLoading(true)
    if(localStorage.getItem('movies') === null) {
      movieApi.moviesSearch()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res))
        }) 
        .then(() => {
          handleSearchMovies(itemSearch)
          setSearchComplete(true);
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    } else {
      handleSearchMovies(itemSearch);
      setIsLoading(false);
    }
  }

  function handleSearchSubmitSavedMovies(itemSearchSavedMovies) {
    setSelectSavedMovies((arraySavedMovies.filter((movies) => {
      const searchString = [movies.nameRU, movies.nameEN, movies.year, movies.director, movies.country].join(' ');
      return ((searchString).toLowerCase()).includes((itemSearchSavedMovies).toLowerCase());
    })));
    if (isCheckedSavedMovies) {
      const resSearchSavedMovies = (arraySavedMovies.filter((movies) => {
        const searchString = [movies.nameRU, movies.nameEN, movies.year, movies.director, movies.country].join(' ');
        return ((searchString).toLowerCase()).includes((itemSearchSavedMovies).toLowerCase());
      }));
      setShortSavedMovies(resSearchSavedMovies.filter((res) => {
        return res.duration <= 40
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
    } else if (selectSavedMovies !== null){
      setShortSavedMovies(selectSavedMovies.filter((movies) => {
        return movies.duration <= 40
      }))
    } else if (arraySavedMovies !== null) {
      setShortSavedMovies(arraySavedMovies.filter((movies) => {
        return movies.duration <= 40
      }))
    }
    return;
  }

  function handleClickMoviesCard(movie, like) {
    const moviesDelete = arraySavedMovies.find((movies) => movies.movieId === movie.id);
    api.movieSaved(movie, like, moviesDelete)
      .then(() => {
        getMoviesCurrentUser()
      })
      .catch((err) => console.log(err));
  }

  function handleClickCardDelete(movie) {
    api.movieDelete(movie)
      .then(() => {
        getMoviesCurrentUser();
        if(selectSavedMovies.length !== 0) {
          setSelectSavedMovies(selectSavedMovies.filter((movies) => {
            return movies._id !== movie._id;
          }));
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
              <Register
                onSubmit={handleRegisterSubmit}
              />
            </Route>
            <Route path="/signin">
              <Login
                onSubmit={handleLoginSubmit}
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
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              isLoggedIn={isLoggedIn}
              onSubmit={handleUpdateProfile}
              onClick={signout}
            />
            <Route path="/navbar">
              <Navbar
                isOpen={true}
                isLoggedIn={isLoggedIn}
              />
            </Route>
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
