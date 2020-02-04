import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import './App.css';
import Axios from 'axios';

const API_KEY = 'ae72f671f1c83585a618619cf3832caf';
const SEARCH_MOVIES = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
const TOP_MOVIES = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      loaded: false,
      searchTerm: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchResults();
  }

  fetchResults() {
    const { searchTerm } = this.state;
    if (searchTerm.length > 1) {
      Axios(
        `${SEARCH_MOVIES}${searchTerm}&page=1&include_adult=true`,
      ).then(result =>
        this.setState({
          results: result.data.results,
          loaded: true,
        }),
      );
    } else {
      Axios(`${TOP_MOVIES}`).then(result =>
        this.setState({
          results: result.data.results,
          loaded: true,
        }),
      );
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.fetchResults();
  }

  onChange(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  render() {
    const { loaded, results } = this.state;
    return (
      <div className="app">
        <header className="app-header">
          <h2 className="tracking-in-expand">
            The Big Movie Database
          </h2>
        </header>
        <main>
          <div className="search-section">
            <SearchBox
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          </div>
          <div className="results-section">
            {loaded ? (
              results.map(result => (
                <div key={result.id}>
                  <h1>{result.title}</h1>
                  <h2 className="result-score">
                    Rating: {result.vote_average}
                  </h2>
                  <p>Release Date: {result.release_date}</p>
                  <p className="result-overview">{result.overview}</p>
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
