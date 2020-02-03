import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import './App.css';
import Button from './components/Button';
import Axios from 'axios';

const API_KEY = 'ae72f671f1c83585a618619cf3832caf';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie?api_key=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loaded: false,
      searchTerm: 'godfather',
    };
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    Axios(
      `${BASE_URL}${API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=true`,
    ).then(result =>
      this.setState({
        results: result.data.results,
        loaded: true,
      }),
    );
  }

  render() {
    const { loaded, results } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <h2>The Big Movie Database</h2>
        </header>
        <main>
          <div className="search-section">
            <SearchBox />
            <Button />
          </div>
          <div className="results-section">
            {loaded ? (
              results.map(result => (
                <div key={result.id}>
                  <h1>{result.title}</h1>
                </div>
              ))
            ) : (
              <p>Loading ....</p>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
