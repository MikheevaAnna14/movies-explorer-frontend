import React from 'react';
import { Route, Switch } from 'react-router-dom';

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


function App() {
  let LoggedIn = false;
  return(
    <div className="page">
      <Switch>
        <Route exact path="/" >
          <Main
            LoggedIn={LoggedIn}
          />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/navbar">
          <Navbar
            isOpen={true} 
          />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      {/* <PopupInfo />    */}
    </div>
  )
}

export default App;
