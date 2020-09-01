import React from 'react';
import { Link, BrowserRouter as Router } from "react-router-dom";
import './Poster.css';
import notFavorite from '../assets/notFavorite.png'
import favorite from '../assets/favorite.png'


const Poster = (props) => {
  const poster = props.poster;
  const averageRating = props.poster.average_rating.toFixed(1);
  const userRating = props.userRating;
  const isFavorited = false
  const rating = (userRating) ? `${averageRating}, ${userRating.rating}` : `${averageRating}`

  return (
    <figure className="poster">
      <figcaption id={poster.id}>
        <p>{rating}</p>
        {isFavorited && userRating &&
          <img src={favorite} className="rating-star" />
        }
        {!isFavorited &&
          <img src={notFavorite} className="rating-star" />
        }
      </figcaption>
      <Link to={`/movies/${poster.id}`}>
        <img className="movie-poster" src={poster.poster_path} alt={poster.title} id={poster.id} onClick={props.setMovieView}/>
      </Link>
    </figure>
  );
}

export default Poster
