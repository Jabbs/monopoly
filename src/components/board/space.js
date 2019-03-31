import React, { Component } from 'react';
import SpaceBuyAction from './space_buy_action.js'
import SpaceDetails from './space_details.js'
let _ = require('underscore');

export default class Space extends Component {
  constructor(props) {
    super(props);
    this.propertyAvailable = this.propertyAvailable.bind(this);
    this.ownerPlayer = this.ownerPlayer.bind(this);
  }

  renderPlayerIcons() {
    return this.props.players.map((player) => {
      if(player.spaceId === this.props.id) {
        return <img key={player.icon} height="20" src={require(`../../icons/${player.icon}.jpeg`)} alt="" />;
      } else {
        return null;
      }
    });
  }

  propertyAvailable(spaceId) {
    return _.size(_.filter(this.props.transactions, (t) => t.spaceId === spaceId)) === 0;
  }

  ownerPlayer(spaceId) {
    const lastTransaction = _.last(_.filter(this.props.transactions, (t) => t.spaceId === spaceId));
    return lastTransaction ? _.find(this.props.players, (p) => p.id === lastTransaction.buyerId) : null;
  }

  render() {
    return(
      <div className="space">
        <div className={`space-${this.props.type}`}>
          {this.props.name}
        </div>
        <SpaceDetails
          spaceId={this.props.id}
          ownerPlayer={this.ownerPlayer}
          price={this.props.price}
        />
        <div className="space-actions">
          <SpaceBuyAction
            spaceId={this.props.id}
            spaceType={this.props.type}
            currentPlayer={this.props.currentPlayer}
            propertyAvailable={this.propertyAvailable}
            buyProperty={this.props.buyProperty}
            price={this.props.price}
          />
        </div>
        <div className="player-icons">
          {this.renderPlayerIcons()}
        </div>
      </div>
    );
  }
}
