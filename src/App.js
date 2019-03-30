import React, { Component } from 'react';
import './App.css';
import PlayerSelect from './players/select.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      playerImageNames: ["car", "dog", "hat", "iron", "ship", "shoe", "thimble", "wheelbarrow"],
      players: [],
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  addPlayer(player) {
    let newPlayers = this.state.players;
    newPlayers.push(player);
    this.setState({players: newPlayers});
  }

  startGame() {
    this.setState({gameStarted: true});
  }

  render() {
    return (
      <div className="App">
        <PlayerSelect
          gameStarted={this.state.gameStarted}
          players={this.state.players}
          startGame={this.startGame}
          playerImageNames={this.state.playerImageNames}
          addPlayer={this.addPlayer}
        />
      </div>
    );
  }
}

export default App;
