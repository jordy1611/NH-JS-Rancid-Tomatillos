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

  submitRating = (userRating) => {
    const rating = {rating: {user_id: this.state.currentUser.id, movie_id: this.state.movieInfo.id, rating: userRating || this.state.movieInfo.average_rating}}
    console.log('app submit rating', rating)
  }

  displayUserRatings = async () => {
    try {
      if (this.state.currentUser.id) {
        const id = this.state.currentUser.id;
        const ratings = await dataFetcher.getAllRatings(id);
        this.setState({ratings: ratings});
      }
    } catch (error) {
      console.error(error);
    }
  }

  logOut = () => {
    this.setState({currentUser: {}});
  }

  componentDidMount = async () => {
    try {
      const movies = await dataFetcher.getAllMovies();
      this.setState({ posters: movies });
    } catch (error) {
      console.error(error);
    }
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
      />}
      {this.state.view === 'login' && <Login
        displayHomePage={this.displayHomePage}
        updateCurrentUser={this.updateCurrentUser}
      />}
      {this.state.view === 'movie' && <MovieInfo
        movie={this.state.movieInfo}
        submitRating={this.submitRating}
        isCurrentUser={this.state.currentUser.id ? true : false}
      />}
    </main>
  )};
}

export default App;
