import React from 'react'
import './Poster.css'

const Poster = (props) => {
  const poster = props.poster;
  const rating = parseInt(props.poster.average_rating);

  return (
    <figure className="poster" onClick={props.displayMovieInfoPage}>
      <figcaption id={poster.id}>{rating}</figcaption>
      <img src={poster.poster_path} alt={poster.title} id={poster.id}/>
    </figure>
  )
}

export default Poster
