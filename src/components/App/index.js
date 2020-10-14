import React from 'react';
import './App.css';
import Torrents from '../TorrentList';
import Header from '../Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatsPanel from '../StatsPanel';

function App() {
  return (
    <div className="App">
      <Header />
      <StatsPanel />
      <Torrents />
    </div>
  );
}

export default App;
