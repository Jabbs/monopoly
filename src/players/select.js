import React, { Component } from 'react';

export default class PlayerSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {showNotification: false};
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.playerImageNames.forEach((imageName) => {
      const playerName = this.refs[imageName].value;
      if(playerName) this.props.addPlayer({ "icon": imageName, "name": playerName });
    });
    if(this.canSubmitForm()) {
      this.props.startGame();
    } else {
      this.setState({showNotification: true}, () => setTimeout(() => this.setState({showNotification: false}), 2000));
    }
  }

  // when at least 2 players are selected
  canSubmitForm() {
    let count = 0;
    this.props.playerImageNames.forEach((imageName) => {
      if(this.refs[imageName].value) count += 1;
    });
    return count >= 2 ? true : false;
  }

  alertErrorNotification() {
    if(this.state.showNotification) {
      return(<div className="error">Whoops, please select at least 2 players</div>);
    } else {
      return null;
    }
  }

  renderPlayerSetup() {
    const playerSetup = [];
    this.props.playerImageNames.forEach((imageName) => {
      playerSetup.push(<img key={`${imageName}-img`} height="40" src={require(`../icons/${imageName}.jpeg`)} alt="" className="img-responsive" />);
      playerSetup.push(<input key={`${imageName}-input`} ref={imageName} type="text"></input>);
      playerSetup.push(<br key={`${imageName}-br`}></br>);
    });
    return playerSetup;
  }

  render() {
    if(!this.props.gameStarted) {
      return(
        <div>
          <h1>LET'S PLAY MONOPOLY!</h1>
          <h4>Type in your name next to your player icon</h4>
          {this.alertErrorNotification()}
          <form onSubmit={this.onFormSubmit}>
            {this.renderPlayerSetup()}
            <button type="submit">Start Game!</button>
          </form>
        </div>
      );
    } else {
      return(
        <div>
          GAME STARTED!
          <ul>
            {this.props.players.map((p) => <li key={p.icon}>{p.name} - {p.icon}</li>)}
          </ul>
        </div>
      );
    }
  }
};
