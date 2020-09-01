import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import dataFetcher from '../dataFetcher';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  

  render() {
    return (
      <section>
        <h2>Comments</h2>
        {this.props.comments.map(comment => {
          return <Comment comment={comment} key={comment.id} />
        })}
        {!this.props.isCurrentUser && (
          <div>Log in to join the conversation!</div>
        )}
        {this.props.isCurrentUser && (
          <form>
            <fieldset>
              <legend>Submit a comment</legend>
              <input id="comment" type="text" placeholder="Thoughts on the movie?" onChange={this.props.updateText} />
              <button type="button" onClick={this.props.postReview}>Submit your comment</button>
            </fieldset>
          </form>
        )}
      </section>
  )}
}

export default Comments;