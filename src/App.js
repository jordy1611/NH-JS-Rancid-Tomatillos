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
      view: 'home'
    };
  }

  displayLoginPage = () => {
    this.setState({view: 'login'});
  }

  displayHomePage = () => {
    this.setState({view: 'home'});
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
      <Header displayLoginPage={this.displayLoginPage} displayHomePage={this.displayHomePage}/>
      {this.state.view === 'home' &&
        <Posters posters={this.state.posters}/>
      }
      {this.state.view === 'login' &&
        <Login />
      }
      {/* <MovieInfo movie={
          {
            "movie": {
              "id": 620,
              "title": "Ghostbusters",
              "poster_path": "https://image.tmdb.org/t/p/original//h5Qz8J4T8YQnbZzHXM73WVYYVPK.jpg",
              "backdrop_path": "https://image.tmdb.org/t/p/original//c6yfABGVKuB5cjoOwdX4AJMlzUz.jpg",
              "release_date": "1984-06-08",
              "overview": "After losing their academic posts at a prestigious university, a team of parapsychologists goes into business as proton-pack-toting \"ghostbusters\" who exterminate ghouls, hobgoblins and supernatural pests of all stripes. An ad campaign pays off when a knockout cellist hires the squad to purge her swanky digs of demons that appear to be living in her refrigerator.",
              "genres": ["Comedy",
                "Fantasy"
              ],
              "budget": 30000000,
              "revenue": 295212467,
              "runtime": 107,
              "tagline": "They ain't afraid of no ghost.",
              "average_rating": 8
            }
          }
      }/> */}
    </main>
  )};
}

export default App;
