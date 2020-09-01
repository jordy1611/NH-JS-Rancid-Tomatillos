const dataFetcher = {
  async getMovieById(id) {
    const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`);
    const data = await response.json();

    return data.movie;
  },

  async getAllMovies() {
    const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies');
    const data = await response.json();

    return data.movies;
  },

  async getAllRatings(id) {
    const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${id}/ratings`)
    const data = await response.json();

    return data.ratings;
  },

  submitUserRating(rating) {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${rating.user_id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rating)
    })
    .then((response) => response.json())
    .then((response) => console.log('Successful post', response))
  },

  getLoginResponse(credentials) {
    return fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => console.error(error))
  },

  deleteUserRating(rating) {
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${rating.user_id}/ratings/${rating.id}`, {
      method: 'DELETE'
    })
    .then(() => console.log('Successful rating deletion'))
    .catch((error) => console.error(error))
  },

  getFavoriteStatuses() {
    const response = await fetch('http://localhost:3001/api/v1/favorites')
    const data = await response.json()

    return data
  },

  postFavoriteStatus(id) {
    fetch('http://localhost:3001/api/v1/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: id
    })
    .then((response) => response.json())
    .then((data) => {
      return data
    })
    .catch((error) => console.error())

  }
}

export default dataFetcher;
