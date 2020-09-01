import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Posters from '../Posters/Posters.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import MovieInfo from '../MovieInfo/MovieInfo.js';
import dataFetcher from '../dataFetcher';
import './App.css';
import sampleData from '../sampleData'
import notFavorite from '../assets/notFavorite.png'

class App extends Component {
  constructor() {
    super();
    this.state = {
      posters: [],
      view: 'home',
      movieInfo: {},
      currentUser: {},
      userRatings: [],
      userFavorites: [],
      favoriteMovies: [],
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

  setFavoritesView = () => {
    this.setState({ view: 'favorites'})
  }

  getUserFavorites = async() => {
    try {
      const userFavorites = await dataFetcher.getFavoriteStatuses()
      this.setState({ userFavorites: userFavorites })
    } catch (error) {
      if(error) {
        console.log('no local server for user favorites available')
        this.setState( { userFavorites: null })
      }
    }
  }

  filterFavorites = () => {
    if (this.state.userFavorites !== null) {
    const favoriteMovies = this.state.posters.filter(poster => {
      return this.state.userFavorites.includes(poster.id)
    })
    this.setState({ favoriteMovies: [] })
    this.setState({ favoriteMovies: favoriteMovies }, () => {})
  }
  }


  toggleUserFavorite = async(event) => {
    try {
      const id = parseInt(event.target.id)
      await dataFetcher.postFavoriteStatus(id)
      await this.getUserFavorites(id)
    } catch (error) {
      console.error(error)
    }
  }

  submitRating = async (userRating, movieId) => {
    const rating = {user_id: this.state.currentUser.id, movie_id: movieId, rating: userRating || this.state.movieInfo.average_rating}
    console.log(rating)
    await dataFetcher.submitUserRating(rating);
    const movieInfo = await dataFetcher.getMovieById(movieId)
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

  isMovieRated = (movieId) => {
    if(this.state.userRatings.length > 0) {
      const movieID = parseInt(movieId)
      return this.state.userRatings.some(rating => {
        return rating.movie_id === movieID
      })
    }
  }

  deleteRating = async (movieId) => {
    const movieID = parseInt(movieId)
    const ratingToDelete = this.state.userRatings.find(rating => {
      return rating.movie_id === movieID
    })
    if (ratingToDelete) {
      console.log('there is a rating to delete')
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
            setFavoritesView={this.setFavoritesView}
            filterFavorites={this.filterFavorites}
            view={this.state.view}
            currentUser={this.state.currentUser}
            logOut={this.logOut}
          />
          <Route exact path='/' render={() => {
            return <Posters
              posters={this.state.posters}
              setMovieView={this.setMovieView}
              setFavoritesView={this.setFavoritesView}
              userRatings={this.state.userRatings}
              isCurrentUser={this.isCurrentUser()}
              userFavorites={this.state.userFavorites}
              toggleUserFavorite={this.toggleUserFavorite}
              view={this.state.view}
              filterFavorites={this.filterFavorites}
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
              getUserFavorites={this.getUserFavorites}
            />}
          }/>
          <Route path='/movies/:movieId' render={({ match }) => {
            if (this.state.view === 'home') {
              return <Redirect to='/' />
            }
            return <MovieInfo
              submitRating={this.submitRating}
              isCurrentUser={this.state.currentUser.id ? true : false}
              isRated={this.isMovieRated}
              deleteRating={this.deleteRating}
              displayUserRatings={this.displayUserRatings}
              movieId={match.params.movieId}
              userFavorites={this.state.userFavorites}
              toggleUserFavorite={this.toggleUserFavorite}
            />}
          }/>
          <Route exact path='/favorites' render={() => {
            if (this.state.userFavorites === null) {
              return <h1>NO SERVER TO ACCESS FAVORITES</h1>
            } else if (this.state.userFavorites.length === 0) {
              return <div className='no-favorites-display'>
                        <h1>There's No Favorite Movies!</h1>
                        <h1>Please Favorite Movies</h1>
                        <h1>By Clicking The <img className="no-favorites-icon" src={notFavorite}/> Icon</h1>
                        <h1>To View Them On This Page</h1>
                        <Link to='/'>
                          <button className='no-favorites-button' onClick={this.setHomeView}>
                            Home
                          </button>
                        </Link>
                      </div>
            }  else {
            return <Posters
              posters={this.state.favoriteMovies}
              setMovieView={this.setMovieView}
              userRatings={this.state.userRatings}
              isCurrentUser={this.isCurrentUser()}
              userFavorites={this.state.userFavorites}
              toggleUserFavorite={this.toggleUserFavorite}
              filterFavorites={this.filterFavorites}
              view={this.state.view}
            />}}
          }/>
        </main>
      </Router>
  )};
}

export default App;
