import React from 'react';
import './App.css';
import Torrents from '../TorrentTable';
import Header from '../Header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Torrents />
    </div>
  );
}

export default App;
