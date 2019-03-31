import React, { Component } from 'react';

export default class SpaceBuyAction extends Component {
  spaceIsBuyable() {
    const currentPlayer         = this.props.currentPlayer();
    const currentPlayerOnSpace  = currentPlayer && this.props.spaceId === currentPlayer.spaceId;
    const currentPlayerHasEnoughMoney = currentPlayer && currentPlayer.wallet >= this.props.price
    const spaceIsProperty       = this.props.spaceType === "property"
    const spaceIsAvailable      = this.props.propertyAvailable(this.props.spaceId);
    return currentPlayer && currentPlayerOnSpace && currentPlayerHasEnoughMoney && spaceIsProperty && spaceIsAvailable;
  }

  render() {
    if(this.spaceIsBuyable()) {
      return(
        <div>
          <button onClick={() => this.props.buyProperty(this.props.spaceId, this.props.price)}>$ Buy $</button>
        </div>
      );
    } else {
      return null;
    }
  }
}
