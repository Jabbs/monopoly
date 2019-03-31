import React, { Component } from 'react';
import SpaceInfo from '../../constants/space_info.json';
import GameSetup from './game_setup.js'
import PlayerInfo from './player_info.js'
import Space from './space.js'
let _ = require('underscore');
const boardSpaceCount = 21;
const rentAmount = 10;

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      playerImageNames: ["car", "dog", "hat", "iron", "ship", "shoe", "thimble", "wheelbarrow"],
      players: [], // { id: 1, icon: "car", name: "Peter", wallet: 1401, spaceId: 2 }
      turns: [], // { playerId: 1, diceRoll: 4, spaceId: 8, transactionIds: [12, 13] }
      transactions: [], // { sellerId: 3, buyerId: 2, spaceId: 2, amount: 100 };
      lastDiceRoll: null,
      currentPlayerId: null,
      availableHousesCount: 32,
      availableHotelCount: 12,
    };
    this.addPlayer = this.addPlayer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.takeTurn  = this.takeTurn.bind(this);
    this.currentPlayer = this.currentPlayer.bind(this);
    this.buyProperty = this.buyProperty.bind(this);
    this.updatePlayers = this.updatePlayers.bind(this);
    this.changeCurrentPlayer = this.changeCurrentPlayer.bind(this);
    this.spaceOwnerPlayer = this.spaceOwnerPlayer.bind(this);
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

  changeCurrentPlayer() {
    const sortedPlayerIds = this.state.players.map((p) => p.id).sort();
    if(this.state.currentPlayerId === _.last(sortedPlayerIds)) {
      this.setState({currentPlayerId: 1, lastDiceRoll: null});
    } else {
      this.setState({currentPlayerId: this.state.currentPlayerId+1, lastDiceRoll: null});
    }
  }

  createTransaction(sellerId, buyerId, spaceId, amount) {
    let transactions = this.state.transactions;
    const newTransaction = { sellerId: sellerId, buyerId: buyerId, spaceId: spaceId, amount: amount };
    transactions.push(newTransaction);
    this.setState({transactions: transactions});
  }

  buyProperty(spaceId, price) {
    const currentPlayer   = this.currentPlayer();
    const newWalletAmount = currentPlayer.wallet - price;
    this.updatePlayers([{id: this.currentPlayer().id, key: "wallet", value: newWalletAmount}]);
    this.createTransaction(null, this.state.currentPlayerId, spaceId, price)
  }

  // players => [{id: 2, key: "spaceId", value: 2}, {id: 1, key: "wallet", value: 123}]
  updatePlayers(players) {
    let newPlayers = this.state.players;
    players.forEach((player) => {
      let p = this.findPlayer(player.id);
      newPlayers = _.without(newPlayers, p);
      p[player.key] = player.value;
      newPlayers.push(p);
    });
    this.setState({players: _.sortBy(newPlayers, (p) => p.id)});
  }

  addPlayer(id, icon, playerName) {
    let newPlayers = this.state.players;
    let player = {
      id: id,
      icon: icon,
      name: playerName,
      wallet: 1500,
      spaceId: 1,
    };
    newPlayers.push(player);
    this.setState({players: newPlayers});
  }

  spaceOwnerPlayer(spaceId) {
    const lastTransaction = _.last(_.filter(this.state.transactions, (t) => t.spaceId === spaceId));
    if(lastTransaction) {
      return  this.findPlayer(lastTransaction.buyerId);
    } else {
      return null;
    }
  }

  takeTurn() {
    const diceRoll = Math.floor(Math.random()*12)+1;
    const newSpaceId = this.getNewSpaceId(diceRoll);
    const spaceOwnerPlayer = this.spaceOwnerPlayer(newSpaceId);
    const currentPlayer = this.currentPlayer();
    let playerUpdates = [{id: currentPlayer.id, key: "spaceId", value: newSpaceId}];
    // pay rent if property owned by someone other than currentPlayer
    if(spaceOwnerPlayer && spaceOwnerPlayer.id !== currentPlayer.id) {
      playerUpdates.push({id: spaceOwnerPlayer.id, key: "wallet", value: spaceOwnerPlayer.wallet + rentAmount})
      playerUpdates.push({id: currentPlayer.id, key: "wallet", value: currentPlayer.wallet - rentAmount})
    }
    this.updatePlayers(playerUpdates);
    this.setState({lastDiceRoll: diceRoll});
  }

  currentPlayer() {
    return _.find(this.state.players, (p) => p.id === this.state.currentPlayerId);
  }

  findPlayer(playerId) {
    return _.find(this.state.players, (p) => p.id === playerId);
  }

  getNewSpaceId(diceNumber) {
    let newSpaceId = this.currentPlayer().spaceId + diceNumber;
    return newSpaceId > boardSpaceCount ? (newSpaceId - boardSpaceCount) : newSpaceId;
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
            {SpaceInfo.map((s) => <Space key={s.id} id={s.id} name={s.name} type={s.type} players={this.state.players} currentPlayer={this.currentPlayer} transactions={this.state.transactions} buyProperty={this.buyProperty} />)}
          </div>
          <h2>Players</h2>
          <div className="player-info-container">
            {this.state.players.map((player) => <PlayerInfo
                                                  key={player.id}
                                                  isCurrentPlayer={this.state.currentPlayerId === player.id}
                                                  player={player}
                                                  lastDiceRoll={this.state.lastDiceRoll}
                                                  takeTurn={this.takeTurn}
                                                  changeCurrentPlayer={this.changeCurrentPlayer}
                                                />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
