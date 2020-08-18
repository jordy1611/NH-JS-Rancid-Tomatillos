import React, { Component } from 'react';
import Posters from './Posters.js'
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
    <main className="App">
      <header>
        <h1>Rotten Tomatillos</h1>
        <button>Login/Logout</button>
      </header>
      <Posters />
    </main>
  )};
}

export default App;
