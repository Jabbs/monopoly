import React, { Component } from 'react';

export default class GameSetup extends Component {
  constructor(props) {
    super(props);
    this.state = {showNotification: false};
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.addPlayers();
    this.canSubmitForm() ? this.props.startGame() : this.displayErrorNotification();
  }

  addPlayers() {
    let id = 1;
    this.props.playerImageNames.forEach((imageName) => {
      const playerName = this.refs[imageName].value;
      if(playerName) {
        this.props.addPlayer(id, imageName, playerName);
        id += 1;
      };
    });
  }

  // when at least 2 players are selected
  canSubmitForm() {
    let count = 0;
    this.props.playerImageNames.forEach((imageName) => {
      if(this.refs[imageName].value) count += 1;
    });
    return count >= 2 ? true : false;
  }

  displayErrorNotification() {
    this.setState({showNotification: true}, () => setTimeout(() => this.setState({showNotification: false}), 2000));
  }

  errorNotification() {
    if(this.state.showNotification) {
      return(<div className="error">Whoops, please select at least 2 players</div>);
    } else {
      return null;
    }
  }

  renderPlayerSetup() {
    const playerSetup = [];
    this.props.playerImageNames.forEach((imageName) => {
      playerSetup.push(<img key={`${imageName}-img`} height="40" src={require(`../../icons/${imageName}.jpeg`)} />);
      playerSetup.push(<input key={`${imageName}-input`} ref={imageName} type="text"></input>);
      playerSetup.push(<br key={`${imageName}-br`}></br>);
    });
    return playerSetup;
  }

  render() {
    if(!this.props.gameStarted) {
      return(
        <div className="game-setup">
          <h1>LET'S PLAY MONOPOLY!</h1>
          <h4>Type in your name next to your preferred player icon</h4>
          {this.errorNotification()}
          <form onSubmit={this.onFormSubmit}>
            {this.renderPlayerSetup()}
            <button type="submit">Start Game!</button>
          </form>
        </div>
      );
    } else {
      return null;
    }
  }
};
