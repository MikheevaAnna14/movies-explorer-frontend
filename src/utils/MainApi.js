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
 }; 

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
}; 


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
        country: movie.country,  
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: (`${imgServerUrl}${movie.image.url}`),
        trailerLink: movie.trailerLink,
        thumbnail: (`${imgServerUrl}${movie.image.formats.thumbnail.url}`),
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
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
};
