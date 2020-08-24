import React from 'react'
import './MovieInfo.css'

const MovieInfo = (props) => {
  const movie = props.movie;
  const preventDefault = (e) => {
    e.preventDefault()
  }
  const resetInput = (e) => {
    e.target.value = ''
  }

  return (
    <article className="movie-info">
      <img src={movie.backdrop_path} alt={`${movie.title} backdrop`}></img>
      <h2>{movie.title}</h2>
      <p data-testid='release date'>Release Date: {movie.release_date}</p>
      <p data-testid='overview'>Overview: {movie.overview}</p>
      <ul data-testid='genres'>Genres: {movie.genres.map((genre, index) => {
        return <li key={index}>{genre}</li>
      })}</ul>
      <p data-testid='budget'>Budget: {movie.budget}</p>
      <p data-testid='runtime'>Runtime: {movie.runtime} days</p>
      <p data-testid='tagline'>Tagline: {movie.tagline}</p>
      <p data-testid='average rating'>Average Rating: {movie.average_rating.toFixed(1)}</p>
      <form className="user-rating-form">
        <fieldset className="movie-fieldset">
          <label htmlFor="rating-input">Your Rating:</label>
          <input id="rating-input" list="numbers" min='0' max='10' onKeyDown={preventDefault} onClick={resetInput}></input>
          <datalist id="numbers">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
            <option value="7"></option>
            <option value="8"></option>
            <option value="9"></option>
            <option value="10"></option>
          </datalist>
          <button type="button">Submit</button>
        </fieldset>
      </form>
    </article>
  )
}

export default MovieInfo
