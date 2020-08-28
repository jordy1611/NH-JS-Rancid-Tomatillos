import React from 'react'
import './Posters.css';
import Poster from '../Poster/Poster.js'
import Header from '../Header/Header.js'

const Posters = (props) => {
  const posters = props.posters
  // const ratings = props.ratings then .find ratings with user_id, if not undefined then poster gets a property.
  // app has information on movieInfo, it can compare ratings vs movieInfo. return a filter of rated movies? or add property to that poster and movieInfo?
  return (
    <article className="poster-container"> {
      posters.map(poster => {
        const ratingMatch = props.userRatings.find(rating => {
          return rating.movie_id === poster.id
        })

        return <Poster
          poster= { poster }
          key={ poster.id }
          userRating={ ratingMatch }
          setMovieView={ props.setMovieView }
        />
      })
    }
    </article>
  )
}

export default Posters
