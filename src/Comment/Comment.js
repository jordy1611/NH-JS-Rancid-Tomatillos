import React from 'react';
import './Comment.css'

const Comment = (props) => {
  return (
    <section className="comment">
      <p className="comment-author">{props.comment.author}</p>
      <p className="comment-content">{props.comment.comment}</p>
    </section>
  )
}

export default Comment;