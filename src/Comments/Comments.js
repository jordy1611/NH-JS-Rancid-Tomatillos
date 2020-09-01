import React from 'react';
import Comment from '../Comment/Comment';

const Comments = (props) => {
    return (
      <section>
        <h2>Comments</h2>
        {props.comments.map(comment => {
          return <Comment comment={comment} key={comment.id} />
        })}
        {!props.isCurrentUser && (
          <div>Log in to join the conversation!</div>
        )}
        {props.isCurrentUser && (
          <form>
            <fieldset>
              <legend>Submit a comment</legend>
              <input id="comment" type="text" placeholder="Thoughts on the movie?" onChange={this.props.updateText} />
              <button type="button" onClick={props.postReview}>Submit your comment</button>
            </fieldset>
          </form>
        )}
      </section>
  )
}

export default Comments;