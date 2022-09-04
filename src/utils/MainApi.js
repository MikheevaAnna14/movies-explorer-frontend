const baseURL = document.location.protocol !== 'https:' ? 'http://api.annamikheeva.movies.nomoredomains.xyz'
  :
  'https://api.annamikheeva.movies.nomoredomains.xyz';

const imgServerUrl = 'https://api.nomoreparties.co';

// const headers = {
//   'Content-Type': 'application/json'
// }

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

// export const authorization = (email, password) => {
//   return fetch(`${baseURL}/signin`, {
//    method: 'POST',
//    credentials: 'include',
//    headers: {
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify({ password, email })
//   })
//   .then((res) => checkResponse(res)) 
// };

export const updateProfile = (userEmail, userName) => {
  console.log('api', userName, userEmail);
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
  .then(this._checkResponse)
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

export const movieSaved = (movie, like) => {
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
    return fetch(`${this._baseUrl}/movies/${movie.id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
      })
    .then(this._checkResponse)
  }
}




// class Api {
//   constructor({ baseURL, headers }) {
//     this.baseURL = baseURL;
//     this.headers = headers;
//   }

//   _checkResponse(res) {
//     if(res.ok) {
//       return res.json()
//     } else {
//       return Promise.reject(res.status)
//     }
//   }





// }
// // export const BaseUrl = document.location.protocol !== 'https:' ? 'http://api.annamikheeva.movies.nomoredomains.xyz'
// //   :
// //   'https://api.annamikheeva.movies.nomoredomains.xyz';


// export const api = new Api ({
//   baseURL: 'https://api.annamikheeva.movies.nomoredomains.xyz',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })