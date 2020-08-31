import React, { Component } from 'react';
import Comment from '../Comment/Comment';

class Comments extends Component {
  constructor(props) {
    super(props),
    this.comment = ''
  }

  updateText = (e) => {
    this.setState({comment: e.target.value});
  }

  render() {
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
            <input id="comment" type="text" placeholder="Thoughts on the movie?" onChange={this.updateText} />
            <button type="button">Submit your comment</button>
          </fieldset>
        </form>
      )}
    </section>
  }
}

export default Comments;