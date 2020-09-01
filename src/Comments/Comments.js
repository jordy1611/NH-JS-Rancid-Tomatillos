import React from 'react';
import Comment from '../Comment/Comment';
import './Comments.css'

const Comments = (props) => {
  return (
    <section>
      <h2>Comments</h2>
      {props.comments.map(comment => {
        return <Comment comment={comment} key={comment.id} />
      })}
      {!props.isCurrentUser && (
        <div className="log-in-cta">Log in to join the conversation!</div>
      )}
      {props.isCurrentUser && (
        <form id="comment-form">
          <fieldset>
            <legend>Submit a comment</legend>
            <textarea id="comment-input" type="text" onChange={props.updateText} value="What do you think of the movie?" />
            <button type="button" onClick={props.postComment} id="comment-submit-button">Submit your comment</button>
          </fieldset>
        </form>
      )}
    </section>
  )
}

export default Comments;