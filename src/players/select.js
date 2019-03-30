import React, { Component } from 'react';

export default class PlayerSelect extends Component {
  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.addPlayer(this.refs.playerInput.value);
    this.refs.playerInput.value = '';
  }

  render() {
    if (this.props.initialSetup) {
      return(
        <div>
          <label>Add Player</label>
          <form onSubmit={this.onFormSubmit}>
            <input ref="playerInput" type="text"></input>
            <button type="submit">Add</button>
          </form>
          <ul>
            {this.props.players.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
};
