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

  updateText = (e) => {
    this.setState({comment: e.target.value});
  }

  postReview = async () => {
    const commentToPost = {
      comment: this.state.comment,
      author: this.props.currentUser.name,
      movieId: this.props.movie.id,
      id: Date.now()
    }

    await dataFetcher.submitComment(commentToPost);
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
              <input id="comment" type="text" placeholder="Thoughts on the movie?" onChange={this.updateText} />
              <button type="button" onClick={this.postReview}>Submit your comment</button>
            </fieldset>
          </form>
        )}
      </section>
  )}
}

export default Comments;