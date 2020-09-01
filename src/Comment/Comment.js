import React from 'react';
import './Comment.css'

const Comment = (props) => {
  return (
    <section className="comment">
      <p>{props.comment.author}</p>
      <p>{props.comment.comment}</p>
    </section>
  )
}

export default Comment;