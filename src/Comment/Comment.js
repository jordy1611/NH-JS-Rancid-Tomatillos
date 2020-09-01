import React from 'react';
import './Comment.css'

const Comment = (props) => {
  return (
    <section className="comment">
      <p class="comment-author">{props.comment.author}</p>
      <p class="comment-content">{props.comment.comment}</p>
    </section>
  )
}

export default Comment;