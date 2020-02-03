import React from 'react';
import SearchBox from './components/SearchBox';
import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>The Big Movie Database</h2>
      </header>
      <main>
        <SearchBox />
        <Button />
        <p>Add Content here ...</p>
      </main>
    </div>
  );
}

export default App;
