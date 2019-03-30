import React, { Component } from 'react';
import './App.css';
import PlayerSelect from './players/select.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialSetup: true,
      players: [],
    };
    this.addPlayer = this.addPlayer.bind(this);
  }

  addPlayer(str) {
    let newPlayers = this.state.players;
    newPlayers.push(str);
    this.setState({players: newPlayers});
  }

  render() {
    return (
      <div className="App">
        <PlayerSelect
          initialSetup={this.state.initialSetup}
          players={this.state.players}
          addPlayer={this.addPlayer}
        />
      </div>
    );
  }
}

export default App;
