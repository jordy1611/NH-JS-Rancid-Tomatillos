import React from 'react'
import './Posters.css';
import Poster from './Poster.js'

const Posters = (props) => {
  const posters = props.posters
  return (
    <article className="poster-container">
      {
       posters.map(poster => {
         return <Poster poster= { poster } key={poster.id} displayMovieInfoPage={props.displayMovieInfoPage}/>
       })
      }
    </article>

  )
}

export default Posters
