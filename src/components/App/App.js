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
import CurrentUserContext from './../../contexts/CurrentUserContext';
import IsLoggedInContext from './../../contexts/IsLoggedInContext';


function App() {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupInfoIcon, setPopupInfoIcon] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const history = useHistory();

  console.log('app mm', currentUser);

  // React.useEffect(() => {

  // })

  function handleLoginSubmit(email, password) {
    console.log('applog email pass', email, password);
    api.login(email, password)
      .then((res) => {
        setCurrentUser({ name: res.name, email: res.email });
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
    // setErrorMessage('');
    setIsOpenPopup(false);
    setPopupInfoIcon(false);
  }

  function handleUpdateProfile(name, email) {
    console.log('App name, email', name, email);
    api.updateProfile(name, email)
    console.log('App2', name, email)
      .then((res) => {
        console.log('App res', res)
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
    history.push('/signin');
  }

  

// useEffect(() => {

// })


  
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
