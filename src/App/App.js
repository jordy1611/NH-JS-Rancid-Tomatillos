import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import Posters from '../Posters/Posters.js';
import Header from '../Header/Header.js';
import Login from '../Login/Login.js';
import MovieInfo from '../MovieInfo/MovieInfo.js';
import dataFetcher from '../dataFetcher';
import './App.css';
import sampleData from '../sampleData'

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

  displayFavorites = () => {
    const favoriteMovies = this.state.posters.filter(poster => {
      return this.state.userFavorites.includes(poster.id)
    })
    // const favoriteMovies = this.state.userFavorites.reduce((favPosters, favorite) => {
    //   favPosters.push(this.state.posters.find(poster => poster.id === favorite.id))
    //   return favPosters
    // }, [])
    console.log('favoriteMovies', favoriteMovies)
    this.setState({ view: 'favorites', favoriteMovies: favoriteMovies })
  }


  toggleUserFavorite = async(event) => {
    console.log('id', event.target.id, typeof(event.target.id))
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
            displayFavorites={this.displayFavorites}
            view={this.state.view}
            currentUser={this.state.currentUser}
            logOut={this.logOut}
          />
          <Route exact path='/' render={() => {
            return <Posters
              posters={this.state.posters}
              setMovieView={this.setMovieView}
              userRatings={this.state.userRatings}
              isCurrentUser={this.isCurrentUser()}
              userFavorites={this.state.userFavorites}
              toggleUserFavorite={this.toggleUserFavorite}
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
            if (this.state.userFavorites.length === 0) {
              return <div className='no-favorites-display'>
                        <h1>There's No Favorite Movies!</h1>
                        <h1>Please Favorite Movies</h1>
                        <h1>By Clicking The # Icon</h1>
                        <h1>To View Them On This Page</h1>
                        <Link to='/'>
                          <button className='no-favorites-button' onClick={this.setHomeView}>
                            Home
                          </button>
                        </Link>
                      </div>
            } else {
            return <Posters
              posters={this.state.favoriteMovies} // favorited poster
              setMovieView={this.setMovieView}  // keep
              userRatings={this.state.userRatings} // keep
              isCurrentUser={this.isCurrentUser()}
              userFavorites={this.state.userFavorites}
              toggleUserFavorite={this.toggleUserFavorite}
            />}}
          }/>
        </main>
      </Router>
  )};
}

export default App;
