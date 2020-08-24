const dataFetcher = {
  async getMovieById(id) {
    const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`);
    const data = await response.json();
    
    return data;
  }
}

export default dataFetcher;