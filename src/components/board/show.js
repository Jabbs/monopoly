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
      turns: [], // { playerId: 1, diceRoll: 4, spaceId: 8, transactionIds: [12, 13] }
      transactions: [], // { sellerId: 3, buyerId: 2, spaceId: 2, amount: 100 };
      lastDiceRoll: null,
      currentPlayerId: null,
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.rollDice  = this.rollDice.bind(this);
    this.currentPlayer = this.currentPlayer.bind(this);
    this.buyProperty = this.buyProperty.bind(this);
  }

  // bypasses the game_setup for now
  componentDidMount() {
    this.addPlayer(1, "car", "Peter");
    this.addPlayer(2, "thimble", "Brianna");
    this.addPlayer(3, "iron", "Willie");
    this.addPlayer(4, "ship", "Suzy");
    this.addPlayer(5, "hat", "Bobo");
    this.startGame();
  }

  initialPlayerWallet() {
    return [500,500,100,100,50,50,20,20,20,20,20,20,10,10,10,10,10,5,5,5,5,5,1,1,1,1,1];
  }

  buyProperty(spaceId, price) {
    let transactions = this.state.transactions;
    const newTransaction = { sellerId: null, buyerId: this.state.currentPlayerId, spaceId: spaceId, amount: price };
    transactions.push(newTransaction);
    this.setState({transactions: transactions});
  }

  addPlayer(id, icon, playerName) {
    let newPlayers = this.state.players;
    let player = {
      id: id,
      icon: icon,
      name: playerName,
      wallet: this.initialPlayerWallet(),
      spaceId: 1,
    };
    newPlayers.push(player);
    this.setState({players: newPlayers});
  }

  rollDice() {
    const diceNumber = Math.floor(Math.random()*6)+1;
    this.changeSpaceForCurrentPlayer(diceNumber)
    this.setState({lastDiceRoll: diceNumber});
  }

  currentPlayer() {
    return _.find(this.state.players, (p) => p.id === this.state.currentPlayerId);
  }

  changeSpaceForCurrentPlayer(diceNumber) {
    const newSpaceId = this.getNewSpaceId(diceNumber);
    let currentPlayer = this.currentPlayer();
    let newPlayers = _.without(this.state.players, currentPlayer);
    currentPlayer.spaceId = newSpaceId;
    newPlayers.push(currentPlayer);
    this.setState({players: _.sortBy(newPlayers, (p) => p.id)});
  }

  getNewSpaceId(diceNumber) {
    let newSpaceId = this.currentPlayer().spaceId + diceNumber;
    if(newSpaceId > 10) {
      return newSpaceId - 10;
    } else {
      return newSpaceId;
    }
  }

  startGame() {
    // first turn defaults to player id 1
    const initialPlayer = _.find(this.state.players, (p) => p.id === 1);
    this.setState({gameStarted: true, currentPlayerId: initialPlayer.id});
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
          <h2>Board</h2>
          <div className="spaces-container">
            <Space id={10} name="Connecticut Avenue" type="property" propertyGroup="lightblue" price={120} players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={9} name="Vermont Avenue" type="property" propertyGroup="lightblue" price={100} players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={8} name="Chance" type="chance" players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={7} name="Oriental Avenue" type="property" propertyGroup="lightblue" price={100} players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={6} name="Reading Railroad" type="property" propertyGroup="railroad" price={200} players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={5} name="Income Tax" type="incomeTax" players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={4} name="Baltic Avenue" type="property" propertyGroup="purple" price={60} players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={3} name="Community Chest" type="communityChest" players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={2} name="Mediterranean Avenue" type="property" propertyGroup="purple" price={60} players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
            <Space id={1} name="Pass Go!" type="go" players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />
          </div>
          <h2>Players</h2>
          <div className="player-info-container">
            {this.state.players.map((player) => <PlayerInfo
                                                  key={player.id}
                                                  isCurrentPlayer={this.state.currentPlayerId === player.id}
                                                  player={player}
                                                  lastDiceRoll={this.state.lastDiceRoll}
                                                  rollDice={this.rollDice}
                                                />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
