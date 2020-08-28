import React from 'react'
import './Posters.css';
import Poster from '../Poster/Poster.js'
import { BrowserRouter as Router } from 'react-router-dom';

const Posters = (props) => {
  const posters = props.posters

  return (
    <article className="poster-container">
      <Router>
        {posters.map(poster => {
          const ratingMatch = props.userRatings.find(rating => {
            return rating.movie_id === poster.id
          })

          return <Poster
            poster= { poster }
            key={ poster.id }
            userRating={ ratingMatch }
            setMovieView={ props.setMovieView }
          />
        })}
      </Router>
    </article>
  )
}

export default Posters
