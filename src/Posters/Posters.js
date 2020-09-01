import React from 'react'
import './Posters.css';
import Poster from '../Poster/Poster.js'
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Posters = (props) => {
  const posters = props.posters

  return (
    <article className="poster-container">
        {posters.map(poster => {
          const ratingMatch = props.userRatings.find(rating => {
            return rating.movie_id === poster.id
          })

          return <Poster
              key={ poster.id }
              poster= { poster }
              userRating={ ratingMatch }
              setMovieView={ props.setMovieView }
            />

        })}
    </article>
  )
}

export default Posters
