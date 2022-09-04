import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

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

  const history = useHistory();

  React.useEffect(() => { 
    if(localStorage.getItem('resSearch') === null) {
      return
    } else {
      setMovieSelected(JSON.parse(localStorage.getItem('resSearch')));
      setShortFilms((JSON.parse(localStorage.getItem('resSearch')).filter((film) => {
        return film.duration <= 40
      })) )
    }
    setIsChecked(JSON.parse(localStorage.getItem('checkboxChecked')));
    console.log('app json', JSON.parse(localStorage.getItem('checkboxChecked')));
  },[]);

  function handleLoginSubmit(email, password) {
    console.log('applog email pass', email, password);
    api.login(email, password)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email, _id: res._id });
        setIsLoggedIn(true);
        history.push('/movies')
      })
      .catch((err) => {
        console.log(err);
        setIsOpenPopup(true);
        setPopupInfoIcon(false);
        setPopupMessage(err === 401 ? 'Вы ввели неправильный email или пароль' : 'При авторизации произошла ошибка');
      });
  }

  function handleRegisterSubmit(email, password, name) {
    console.log('app reg name, em, pass', name, email, password);
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

  function handleClosePopupInfo () {
    setPopupMessage('');
    setIsOpenPopup(false);
    setPopupInfoIcon(false);
  }

  function handleUpdateProfile(userName, userEmail) {
    console.log('App name, email', userName, userEmail);
    api.updateProfile(userEmail, userName)
      .then((res) => {
        console.log('App res', res);
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
    localStorage.clear();
    history.push('/signin');
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

    if(localStorage.getItem('movies') === null) {
      movieApi.moviesSearch()
        .then((res) => {
          localStorage.setItem('movies', JSON.stringify(res))
        }) 
        .then(() => {
          handleSearchMovies(itemSearch);
        })
        .catch(err => console.log(err));
    } else {
      handleSearchMovies(itemSearch);
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

  function handleClickMoviesCard(movie) {
    console.log('movie', movie);

    // console.log('movie.thumbnail', movie.image.formats.thumbnail.url);
    const like = movie.owner === currentUser._id;
    console.log('movie.owner', movie.owner);
    console.log('currentUser._id', currentUser._id);
    api.movieSaved(movie, like)
      .then((res) => {
        console.log('res', res); 
        if(!like) {
          setArraySavedMovies([res, ...arraySavedMovies]);
          // setIsLike(false);
        } else {setArraySavedMovies(arraySavedMovies.filter(function(movies) {
          return movies !== movie
          }))
        }
      })
      .then(() => {
        console.log('new arraySavedMovies', arraySavedMovies);
      })
      
      
      // .then((arraySavedMovies) => {
      //   arraySavedMovies.filter((movies) => {
      //     movies.id === movie.id)
      //   }
      // })
      .catch((err) => console.log('err', err));
  }

  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some(i => i === currentUser._id);
  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api.changeLikeCardStatus(card._id, !isLiked)
  //     .then((newCard) => {
  //     setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  //     })
  //     .catch(err => console.log("Ошибка:", err))
  // }

  console.log('app movieSelected', movieSelected);
  console.log('app shortFilm', shortFilms);
  console.log('app isChecked', isChecked);

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
            <Route path="/movies">
              <Movies 
                isLoggedIn={isLoggedIn}
                onSubmit={handleSearchSubmit}
                movieSelected={movieSelected}
                shortMovies={shortFilms}
                isChecked={isChecked}
                onClickCheckbox={handleClickCheckbox}
                onClickMoviesCard={handleClickMoviesCard}
                arraySavedMovies={arraySavedMovies}
              />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies 
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
            <Route path="/profile">
              <Profile 
                isLoggedIn={isLoggedIn}
                onSubmit={handleUpdateProfile}
                onClick={signout}
              />
            </Route>
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
