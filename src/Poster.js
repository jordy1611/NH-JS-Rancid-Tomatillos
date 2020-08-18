import React from 'react'
import './Poster.css'

const Poster = (props) => {
  const poster = props.poster
  console.log(poster)
  return (
    <figure className="poster">
      <figcaption>{poster.average_rating}</figcaption>
      <img src={poster.poster_path} alt={poster.title} />
    </figure>
  )
}

export default Poster
