import React, { Component } from 'react';
import Posters from '../Posters/Posters.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import MovieInfo from '../MovieInfo/MovieInfo.js';
import dataFetcher from '../dataFetcher';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posters: [],
      view: 'home',
      movieInfo: {},
      currentUser: {},
      userRatings: []
    };
  }

  displayLoginPage = () => {
    this.setState({view: 'login'});
  }

  displayHomePage = () => {
    this.setState({view: 'home', movieInfo: {}});
    this.displayUserRatings()
  }

  updateCurrentUser = (user = {}) => {
    this.setState({currentUser: user});
  }

  displayMovieInfoPage = async (event) => {
    const id = event.target.id;
    try {
      const movie = await dataFetcher.getMovieById(id);
      this.setState({ movieInfo: movie, view: 'movie' });
    } catch (error) {
      console.error(error);
    }
  }

  submitRating = async (userRating) => {
    const rating = {user_id: this.state.currentUser.id, movie_id: this.state.movieInfo.id, rating: userRating || this.state.movieInfo.average_rating}
    await dataFetcher.submitUserRating(rating);
    this.displayUserRatings();
  }

  displayUserRatings = async () => {
    try {
      if (this.state.currentUser.id) {
        this.setState({ userRatings: [] });
        const id = this.state.currentUser.id;
        const ratings = await dataFetcher.getAllRatings(id);
        this.setState({ userRatings: ratings });
      }
    } catch (error) {
      console.error(error);
    }
  }

  logOut = () => {
    this.setState({view: 'home', currentUser: {}, userRatings: []});
  }

  componentDidMount = async () => {
    try {
      const movies = await dataFetcher.getAllMovies();
      this.setState({ posters: movies });
    } catch (error) {
      console.error(error);
    }
  }

  isMovieRated = () => {
    if(this.state.userRatings.length > 0) {
      return this.state.userRatings.some(rating => rating.movie_id === this.state.movieInfo.id)
    }
  }

  deleteRating = async () => {
    const ratingToDelete = this.state.userRatings.find(rating => rating.movie_id === this.state.movieInfo.id)
    if (ratingToDelete) {
      await dataFetcher.deleteUserRating(ratingToDelete)
      this.displayUserRatings()
    }
  }

  isCurrentUser = () => {
    return (this.state.currentUser.id) ? true : false
  }

  render() {
    return(
    <main className="App">
      <Header
        displayHomePage={this.displayHomePage}
        displayLoginPage={this.displayLoginPage}
        view={this.state.view}
        currentUser={this.state.currentUser}
        logOut={this.logOut}
      />
      {this.state.view === 'home' && <Posters
        posters={this.state.posters}
        displayMovieInfoPage={this.displayMovieInfoPage}
        userRatings={this.state.userRatings}
      />}
      {this.state.view === 'login' && <Login
        displayHomePage={this.displayHomePage}
        updateCurrentUser={this.updateCurrentUser}
        displayUserRatings={this.displayUserRatings}
      />}
      {this.state.view === 'movie' && <MovieInfo
        movie={this.state.movieInfo}
        submitRating={this.submitRating}
        isCurrentUser={this.isCurrentUser()}
        isRated={this.isMovieRated()}
        deleteRating={this.deleteRating}
        displayUserRatings={this.displayUserRatings}
      />}
    </main>
  )};
}

export default App;
