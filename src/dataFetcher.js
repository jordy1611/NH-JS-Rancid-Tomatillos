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

  async getLoginResponse(credentials) {
    const response = await fetch(
      fetch("https://rancid-tomatillos.herokuapp.com/api/v2/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
    );
    const data = response.json();

    return data;
  }
}

export default dataFetcher;