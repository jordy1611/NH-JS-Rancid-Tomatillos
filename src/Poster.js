import React from 'react'

const Poster = (props) => {
  const poster = props.poster
  console.log(poster)
  return (
    <figure className="poster">
      <img src={poster.poster_path} alt={poster.title} />
      <figcaption>{poster.average_rating}</figcaption>
    </figure>
  )
}

export default Poster
