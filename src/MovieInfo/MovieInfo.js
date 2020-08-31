import React, { Component } from 'react';
import dataFetcher from '../dataFetcher';
import Comments from '../Comments/Comments';
import './MovieInfo.css';

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props.movie,
      isRated: props.isRated,
      userRating: 0,
      isCurrentUser: props.isCurrentUser
    }
  }

  preventDefault = (e) => {
    e.preventDefault()
  }

  resetInput = (e) => {
    e.target.value = ''
  }

  createRating = (e) => {
    this.setState({userRating: parseInt(e.target.value)})
  }

  rateMovie = (props) => {
    if(this.state.userRating > 0 && this.state.isCurrentUser) {
      console.log(this.state.rated)
      this.props.submitRating(this.state.userRating)
      this.setState( {isRated: true })
    } else {
      console.log('whoops')
    }
  }

  deleteRating = () => {
    this.props.deleteRating()
    this.setState( {isRated: false} )
    this.props.displayUserRatings()
  }

  componentDidMount = async () => {
    const movieData = await dataFetcher.getMovieById(this.props.movieId);
    this.setState({movie: movieData, isRated: this.props.isRated});
  }

  render() {
    if (this.state.movie) {
      return (
        <article className="movie-info">
          <img src={this.state.movie.backdrop_path} alt={`${this.state.movie.title} backdrop`}></img>
          <h2>{this.state.movie.title}</h2>
          <p data-testid='release date'>Release Date: {this.state.movie.release_date}</p>
          <p data-testid='overview'>Overview: {this.state.movie.overview}</p>
          <ul data-testid='genres'>Genres: {this.state.movie.genres.map((genre, index) => {
            return <li key={index}>{genre}</li>
          })}</ul>
          <p data-testid='budget'>Budget: {this.state.movie.budget}</p>
          <p data-testid='runtime'>Runtime: {this.state.movie.runtime} days</p>
          <p data-testid='tagline'>Tagline: {this.state.movie.tagline}</p>
          <p data-testid='average rating'>Average Rating: {this.state.movie.average_rating.toFixed(1)}</p>
            {this.state.isCurrentUser && !this.state.isRated &&
              <form className="user-rating-form">
                <fieldset className="movie-fieldset">
                  <label htmlFor="rating-input">Your Rating:</label>
                  <input id="rating-input" list="numbers" min='0' max='10' onKeyDown={this.preventDefault} onClick={this.resetInput} onChange={this.createRating}></input>
                  <datalist id="numbers">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option value="3"></option>
                    <option value="4"></option>
                    <option value="5"></option>
                    <option value="6"></option>
                    <option value="7"></option>
                    <option value="8"></option>
                    <option value="9"></option>
                    <option value="10"></option>
                  </datalist>
                  <button type="button" onClick={this.rateMovie}>Submit</button>
                </fieldset>
              </form>
            }
          {this.state.isCurrentUser && this.state.isRated &&
            <button onClick={this.deleteRating}>Delete</button>
          }
          <Comments />
        </article>
      )
    } else {
      return(<h1>Loading...</h1>)
    }
  }
}

export default MovieInfo
