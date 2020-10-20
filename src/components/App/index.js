import React from 'react';
import './App.css';
import Torrents from '../TorrentTable';
import Header from '../Header/';

function App() {
  return (
    <div className="App">
      <Header />
      <Torrents />
    </div>
  );
}

export default App;
