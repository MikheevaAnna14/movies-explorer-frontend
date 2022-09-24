import isValidURL from "./Validation";

const baseURL = document.location.protocol !== 'https:' ? 'http://api.annamikheeva.movies.nomoredomains.xyz'
  :
  'https://api.annamikheeva.movies.nomoredomains.xyz';

const imgServerUrl = 'https://api.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
}

export const registration = (name, email, password) => {
    return fetch(`${baseURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    })
   .then((res) => checkResponse(res))
}

export const login = (email, password) => {
  return fetch(`${baseURL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => checkResponse(res))
}

export const getCurrentUser = () => {
  return fetch(`${baseURL}/users/me`, {
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => checkResponse(res))
}

export const updateProfile = (userEmail, userName) => {
  return fetch(`${baseURL}/users/me`, {
    method: 'PATCH',
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      email: userEmail
    })
  })
  .then((res) => checkResponse(res))
}

export const signout = () => {
  return fetch(`${baseURL}/signout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
     'Content-Type': 'application/json'
    },
  })
  .then((res) => checkResponse(res)) 
}

export const movieSaved = (movie, like, moviesDelete) => {
  if(!like) {
    return fetch(`${baseURL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        country: movie.country || 'Нет данных',  
        director: movie.director || 'Нет данных',
        duration: movie.duration || 0,
        year: movie.year || 'Нет данных',
        description: movie.description || 'Нет данных',
        image: (`${imgServerUrl}${movie.image.url}`),
        trailerLink: (isValidURL(movie.trailerLink) && movie.trailerLink) || `${baseURL}/*`,
        thumbnail: (`${imgServerUrl}${movie.image.formats.thumbnail.url}`),
        movieId: movie.id,
        nameRU: movie.nameRU || 'Нет данных',
        nameEN: movie.nameEN || 'Нет данных',
      })
    })
    .then((res) => checkResponse(res))
  } else {
    return fetch(`${baseURL}/movies/${moviesDelete._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
      })
    .then(checkResponse)
  }
}

export const movieDelete = (movie) => {
  return fetch(`${baseURL}/movies/${movie._id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
    })
  .then(checkResponse)
}

export const getSavedMovies = () => {
  return fetch(`${baseURL}/movies`, {
    method: 'GET',
    credentials: 'include',
    headers: {
    'Content-Type': 'application/json',
    },
  })
  .then((res) => checkResponse(res)) 
}
