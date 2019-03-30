import React from 'react';
export default ({ isCurrentPlayer, player, lastDiceRoll }) => {
  const playerInfoClass = isCurrentPlayer ? "player-info active" : "player-info";
  return(
    <div className={playerInfoClass}>
      <img height="40" src={require(`../../icons/${player.icon}.jpeg`)} />
      <h3>{player.name}</h3>
      <h5>Wallet: ${player.wallet.reduce((total, num) => total + num)}</h5>
    </div>
  );
}
