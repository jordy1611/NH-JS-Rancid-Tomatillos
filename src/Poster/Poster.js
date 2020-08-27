import React from 'react';
import { Link } from "react-router-dom";
import './Poster.css';

const Poster = (props) => {
  const poster = props.poster;
  const averageRating = props.poster.average_rating.toFixed(1);
  const userRating = props.userRating;

  const rating = (userRating) ? `${averageRating}, ${userRating.rating}` : `${averageRating}`

  return (
    <Link to={`/movies/${poster.id}`}>
      <figure className="poster" onClick={props.setMovieView}>
        <figcaption id={poster.id}>{rating}</figcaption>
        <img src={poster.poster_path} alt={poster.title} id={poster.id} />
      </figure>
    </Link>
  );
}

export default Poster
