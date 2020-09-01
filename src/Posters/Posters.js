import React from 'react'
import './Posters.css';
import Poster from '../Poster/Poster.js'
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Posters = (props) => {
  const posters = props.posters

  return (
    <article className="poster-container">
        { posters.map(poster => {
          const ratingMatch = props.userRatings.find(rating => {
            return rating.movie_id === poster.id
          })
          const isFavorite = props.userFavorites ? props.userFavorites.some(userFavorite => {
            return userFavorite.id === poster.id
          }) : null
          return <Poster
              key={ poster.id }
              poster= { poster }
              userRating={ ratingMatch }
              setMovieView={ props.setMovieView }
              isCurrentUser={ props.isCurrentUser }
              isFavorite={ isFavorite }
              toggleUserFavorite={ props.toggleUserFavorite }
            />
        })}
    </article>
  )
}

export default Posters
