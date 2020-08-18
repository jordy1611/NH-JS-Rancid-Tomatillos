import React, { Component } from 'react';
import Posters from './Posters.js'
import './App.css';
import sampleMovies from './sampleMovies.js'


class App extends Component {
  constructor() {
    super();
    this.state = {
      posters: sampleMovies
    };
  }

  render() {
    return(
    <main className="App">
      <header>
        <h1>Rotten Tomatillos</h1>
        <button>Login/Logout</button>
      </header>
      <Posters posters={this.state.posters}/>
    </main>
  )};
}

export default App;
