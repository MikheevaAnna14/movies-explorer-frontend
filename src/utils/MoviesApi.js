const checkResponse = (res) => {
  if(res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
}

export const moviesSearch = () => {
  return fetch('https://api.nomoreparties.co/beatfilm-movies', {
    method: 'GET', 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(checkResponse)
}