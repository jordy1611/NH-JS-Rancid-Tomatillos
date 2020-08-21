import React from 'react'
import './MovieInfo.css'

const MovieInfo = (props) => {
  const movie = props.movie;

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
      <p data-testid='average rating'>Average Rating: {movie.average_rating}</p>
    </article>
  )
}

export default MovieInfo
