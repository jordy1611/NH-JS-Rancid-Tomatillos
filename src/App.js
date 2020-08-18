import React, { Component } from 'react';
import Posters from './Posters.js'
import Header from './Header.js'
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
      <Header />
      <Posters posters={this.state.posters}/>
    </main>
  )};
}

export default App;
