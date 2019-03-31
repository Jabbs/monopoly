import React, { Component } from 'react';
import './App.css';
import Board from './components/board.js'

class App extends Component {
  render() {
    return (
      <div className="monopoly-app">
        <Board />
      </div>
    );
  }
}

export default App;
