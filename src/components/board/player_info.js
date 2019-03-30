import React, { Component } from 'react';

export default class PlayerInfo extends Component {
  renderDiceSection() {
    if(this.props.isCurrentPlayer && this.props.lastDiceRoll) {
      return(<div>YOU ROLLED A {this.props.lastDiceRoll}!</div>);
    } else if(this.props.isCurrentPlayer) {
      return(<button onClick={() => this.props.rollDice()}>Roll Dice</button>);
    } else {
      return null;
    }
  }

  render() {
    const playerInfoClass = this.props.isCurrentPlayer ? "player-info active" : "player-info";
    return(
      <div className={playerInfoClass}>
        <img height="40" src={require(`../../icons/${this.props.player.icon}.jpeg`)} />
        <h3>{this.props.player.name}</h3>
        <h5>Wallet: ${this.props.player.wallet.reduce((total, num) => total + num)}</h5>
        {this.renderDiceSection()}
      </div>
    );
  }
}
