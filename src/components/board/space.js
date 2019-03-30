import React, { Component } from 'react';

export default class Space extends Component {
  renderPlayerIcons() {
    return this.props.players.map((player) => {
      if(player.spaceId === this.props.id) {
        return <img height="20" src={require(`../../icons/${player.icon}.jpeg`)}/>;
      }
    });
  }

  render() {
    return(
      <div className="space">
        <div className={`space-${this.props.type}`}>
          {this.props.name}
        </div>
        <div className="price-footer">
          {this.props.price}
        </div>
        <div className="player-icons">
          {this.renderPlayerIcons()}
        </div>
      </div>
    );
  }
}
