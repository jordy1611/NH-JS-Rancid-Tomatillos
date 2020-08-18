import React from 'react'

const MovieInfo = (props) => {
  const movie = props.movie.movie;

  console.log(movie);

  return (
    <article>
      <img src={movie.backdrop_path} alt={`${movie.title} backdrop`}></img>
      <h2>{movie.title}</h2>
      <p>Release date: {movie.release_date}</p>
      <p>Overview: {movie.overview}</p>
      <ul>Genres: {movie.genres.map(genre => {
        return <li>{genre}</li>
      })}</ul>
      <p>Budget: {movie.budget}</p>
      <p>Runtime: {movie.runtime} days</p>
      <p>Tagline: {movie.tagline}</p>
      <p>Average Rating: {movie.average_rating}</p>
    </article>
  )
}

export default MovieInfo