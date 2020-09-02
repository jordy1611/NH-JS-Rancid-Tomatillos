import React from 'react';
import { Link, BrowserRouter as Router } from "react-router-dom";
import './Poster.css';
import notFavorite from '../assets/notFavorite.png'
import favorite from '../assets/favorite.png'


const Poster = (props) => {
  const poster = props.poster;
  const averageRating = props.poster.average_rating.toFixed(1);
  const userRating = props.userRating;
  const rating = (userRating) ? `${averageRating}, ${userRating.rating}` : `${averageRating}`;
  const areFavorites = props.isFavorite !== null;

  return (
    <figure className="poster">
      <figcaption id={poster.id}>
        <p>{rating}</p>
        {areFavorites && props.isFavorite && props.isCurrentUser &&
          <img src={favorite} alt="unfavorite-movie-button" className="rating-star" onClick={(event) => {props.toggleUserFavorite(event); props.filterFavorites()}} id={poster.id}
          />
        }
        {areFavorites && !props.isFavorite && props.isCurrentUser &&
          <img src={notFavorite} alt="favorite-movie-button" className="rating-star" onClick={(event) => {props.toggleUserFavorite(event); props.filterFavorites()}} id={poster.id}/>
        }
      </figcaption>
      <Link to={`/movies/${poster.id}`}>
        <img className="movie-poster" src={poster.poster_path} alt={poster.title} id={poster.id} onClick={props.setMovieView}/>
      </Link>
    </figure>
  );
}

export default Poster
