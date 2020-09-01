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

  getAllComments(movieId) {
    return fetch(`http://localhost:3001/api/v1/movies/${movieId}/comments`)
      .then(response => response.json())
      .then(data => data.comments)
      .catch(error => console.error(error));
  },

  submitComment(commentToPost) {
    return fetch(`http://localhost:3001/api/v1/movies/${commentToPost.movieId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentToPost),
    }).then(response => response.json())
      .then(data => console.log('Successful post'))
      .catch(error => console.error(error))
  }
}

export default dataFetcher;
