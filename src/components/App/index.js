import React from 'react';
import './App.css';
import Torrents from '../Torrents/';
import Header from '../Header';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../theme';

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <Torrents />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
