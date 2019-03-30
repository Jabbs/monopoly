import React, { Component } from 'react';
import GameSetup from './game_setup.js'
import PlayerInfo from './player_info.js'
import Space from './space.js'
let _ = require('underscore');

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      playerImageNames: ["car", "dog", "hat", "iron", "ship", "shoe", "thimble", "wheelbarrow"],
      players: [], // { id: 1, icon: "car", name: "Peter", wallet: [500,100,20,20,10,10,5,5,1,1] }
      spaces: this.initializeSpaces(),
      turns: [], // { playerId: 1, diceRoll: 4, spaceId: 8, transactionIds: [12, 13] }
      transactions: [],
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  // bypasses the game_setup for now
  componentDidMount() {
    this.addPlayer(1, "car", "Peter");
    this.addPlayer(2, "thimble", "Jerry");
    this.addPlayer(3, "iron", "Willy");
    this.startGame();
  }

  // id, name, type, propertyGroup, price, ownerPlayerId, playerIds
  initializeSpaces() {
    return([
      {id: 1, name: "Go", type: "go", propertyGroup: null, price: null, ownerPlayerId: null, playerIds: []},
      {id: 2, name: "Mediterranean Avenue", type: "property", propertyGroup: "purple", price: 60, ownerPlayerId: null, playerIds: []},
      {id: 3, name: "Community Chest", type: "communityChest", propertyGroup: null, price: null, ownerPlayerId: null, playerIds: []},
      {id: 4, name: "Baltic Avenue", type: "property", propertyGroup: "purple", price: 60, ownerPlayerId: null, playerIds: []},
      {id: 5, name: "Income Tax", type: "incomeTax", propertyGroup: null, price: null, ownerPlayerId: null, playerIds: []},
      {id: 6, name: "Reading Railroad", type: "property", propertyGroup: "railroad", price: 200, ownerPlayerId: null, playerIds: []},
      {id: 7, name: "Oriental Avenue", type: "property", propertyGroup: "lightblue", price: 100, ownerPlayerId: null, playerIds: []},
      {id: 8, name: "Chance", type: "chance", propertyGroup: null, price: null, ownerPlayerId: null, playerIds: []},
      {id: 9, name: "Vermont Avenue", type: "property", propertyGroup: "lightblue", price: 100, ownerPlayerId: null, playerIds: []},
      {id: 10, name: "Connecticut Avenue", type: "property", propertyGroup: "lightblue", price: 120, ownerPlayerId: null, playerIds: []},
    ]);
  }

  initialPlayerWallet() {
    return [500,500,100,100,50,50,20,20,20,20,20,20,10,10,10,10,10,5,5,5,5,5,1,1,1,1,1];
  }

  addPlayer(id, icon, playerName) {
    let newPlayers = this.state.players;
    let player = {
      id: id,
      icon: icon,
      name: playerName,
      wallet: this.initialPlayerWallet(),
    };
    newPlayers.push(player);
    this.setState({players: newPlayers});
  }

  startGame() {
    // first turn defaults to player id 1
    const initialPlayer = _.find(this.state.players, (p) => p.id === 1);
    this.setState({gameStarted: true, currentPlayer: initialPlayer});
  }

  render() {
    return (
      <div className="App">
        <GameSetup
          gameStarted={this.state.gameStarted}
          players={this.state.players}
          startGame={this.startGame}
          playerImageNames={this.state.playerImageNames}
          addPlayer={this.addPlayer}
        />
        <div className={this.state.gameStarted ? '' : 'hide'}>
          <div className="spaces-container">
            <Space id={1} name="Pass Go!" type="go" />
            <Space id={2} name="Mediterranean Avenue" type="property" propertyGroup="purple" price={60} />
            <Space id={3} name="Community Chest" type="communityChest" />
            <Space id={4} name="Baltic Avenue" type="property" propertyGroup="purple" price={60} />
            <Space id={5} name="Income Tax" type="incomeTax" />
            <Space id={6} name="Reading Railroad" type="property" propertyGroup="railroad" price={200} />
            <Space id={7} name="Oriental Avenue" type="property" propertyGroup="lightblue" price={100} />
            <Space id={8} name="Chance" type="chance" />
            <Space id={9} name="Vermont Avenue" type="property" propertyGroup="lightblue" price={100} />
            <Space id={10} name="Connecticut Avenue" type="property" propertyGroup="lightblue" price={120} />
          </div>
          <div className="player-info-container">
            {this.state.players.map((player) => <PlayerInfo
                                                  isCurrentPlayer={this.state.currentPlayer.id == player.id}
                                                  player={player}
                                                  lastDiceRoll={this.state.lastDiceRoll}
                                                />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
