import React from 'react';
import Comment from '../Comment/Comment';

const Comments = (props) => {
  return (
    <section>
      <h2>Comments</h2>
      {props.comments.forEach(comment => {
        return <Comment />
      })}
    </section>
  )
}

export default Comments;