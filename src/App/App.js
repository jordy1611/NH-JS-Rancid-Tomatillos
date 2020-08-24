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
      currentUser: {}
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
      this.setState({ movieInfo: movie.movie, view: 'movie' });
    } catch (error) {
      console.error(error);
    }
  }

  logOut = () => {
    this.setState({currentUser: {}});
  }

  componentDidMount = async () => {
    try {
      const response = await fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies');
      const data = await response.json();

      this.setState({ posters: data.movies });
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
      />}
    </main>
  )};
}

export default App;
