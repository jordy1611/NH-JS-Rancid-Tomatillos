import React from 'react'
import './Posters.css';
import Poster from './Poster.js'
import Header from './Header.js'

const Posters = (props) => {
  const posters = props.posters
  return (
    <main>
      <article className="poster-container">
        {
        posters.map(poster => {
          return <Poster poster= { poster } key={poster.id} displayMovieInfoPage={props.displayMovieInfoPage}/>
        })
        }
      </article>
    </main>

  )
}

export default Posters
