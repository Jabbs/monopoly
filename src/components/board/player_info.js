import React, { Component } from 'react';
import ChangeCurrentPlayerAction from './change_current_player_action.js';

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
        <img height="40" src={require(`../../icons/${this.props.player.icon}.jpeg`)} alt="" />
        <h3>{this.props.player.name}</h3>
        <h5>Wallet: ${this.props.player.wallet}</h5>
        {this.renderDiceSection()}
        <ChangeCurrentPlayerAction
          changeCurrentPlayer={this.props.changeCurrentPlayer}
          isCurrentPlayer={this.props.isCurrentPlayer}
          lastDiceRoll={this.props.lastDiceRoll}
        />
      </div>
    );
  }
}
