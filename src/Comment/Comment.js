import React from 'react';

const Comment = (props) => {
  return (
    <div>
      <p>{props.comment.comment}</p>
      <p>{props.comment.author}</p>
    </div>
  )
}

export default Comment;