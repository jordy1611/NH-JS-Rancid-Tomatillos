import React from 'react'
import './MovieInfo.css'
const MovieInfo = (props) => {
  const movie = props.movie;

  return (
    <article className="movie-info">
      <img src={movie.backdrop_path} alt={`${movie.title} backdrop`}></img>
      <h2>{movie.title}</h2>
      <p>Release date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      <ul>Genres: {movie.genres.map((genre, index) => {
        return <li key={index}>{genre}</li>
      })}</ul>
      <p>Budget: {movie.budget}</p>
      <p>Runtime: {movie.runtime} days</p>
      <p>Tagline: {movie.tagline}</p>
      <p>Average Rating: {movie.average_rating}</p>
    </article>
  )
}

export default MovieInfo
