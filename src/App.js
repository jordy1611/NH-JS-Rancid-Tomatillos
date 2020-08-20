import React, { Component } from 'react';
import Posters from './Posters.js'
import Header from './Header.js'
import Login from './Login.js'
import MovieInfo from './MovieInfo.js'
import './App.css';
import sampleMovies from './sampleMovies.js'


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

  displayMovieInfoPage = (event) => {
    const id = event.target.id;
    
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
      .then(response => response.json())
      .then(data => this.setState({movieInfo: data.movie, view: 'movie'}))
      .catch(error => console.error(error))
  }

  logOut = () => {
    this.setState({currentUser: {}})
  }

  componentDidMount() {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => response.json())
      .then(data => this.setState({posters: data.movies}))
      .catch(error => console.error(error))
  }

  render() {
    return(
    <main className="App">
      <Header displayHomePage={this.displayHomePage} displayLoginPage={this.displayLoginPage} view={this.state.view} currentUser={this.state.currentUser} logOut={this.logOut}/>
      {this.state.view === 'home' && <Posters posters={this.state.posters} displayMovieInfoPage={this.displayMovieInfoPage} />}
      {this.state.view === 'login' && <Login login={this.login} displayHomePage={this.displayHomePage} updateCurrentUser={this.updateCurrentUser}/>}
      {this.state.view === 'movie' && <MovieInfo movie={this.state.movieInfo} />}
    </main>
  )};
}

export default App;
