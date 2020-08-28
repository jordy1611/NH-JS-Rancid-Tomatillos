import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
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

  setLoginView = () => {
    this.setState({view: 'login'});
  }

  setHomeView = () => {
    this.setState({view: 'home', movieInfo: {}});
    this.displayUserRatings()
  }

  updateCurrentUser = (user = {}) => {
    this.setState({currentUser: user});
  }

  setMovieView = () => {
    this.setState({view: 'movie' });
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
      return this.state.userRatings.some(rating => {
        return rating.movie_id === this.state.movieInfo.id
      })
    }
  }

  deleteRating = async () => {
    const ratingToDelete = this.state.userRatings.find(rating => {
      return rating.movie_id === this.state.movieInfo.id
    })
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
      <Router>
        <main className="App">
          <Header
            setHomeView={this.setHomeView}
            setLoginView={this.setLoginView}
            view={this.state.view}
            currentUser={this.state.currentUser}
            logOut={this.logOut}
          />
          <Route exact path='/' render={() => {
            return <Posters
              posters={this.state.posters}
              setMovieView={this.setMovieView}
              userRatings={this.state.userRatings}
            />}
          }/>
          <Route exact path='/login' render={() => {
            if (this.state.view === 'home') {
              return <Redirect to='/' />
            }
            return <Login
              setHomeView={this.setHomeView}
              updateCurrentUser={this.updateCurrentUser}
              displayUserRatings={this.displayUserRatings}
            />}
          }/>
          <Route path='/movies/:movieId' render={({ match }) => {
            if (this.state.view === 'home') {
              return <Redirect to='/' />
            }
            return <MovieInfo
              submitRating={this.submitRating}
              isCurrentUser={this.state.currentUser.id ? true : false}
              isRated={this.isMovieRated()}
              deleteRating={this.deleteRating}
              displayUserRatings={this.displayUserRatings}
              movieId={match.params.movieId}
            />}
          }/>
        </main>
      </Router>
  )};
}

export default App;
