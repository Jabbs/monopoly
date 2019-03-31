import React from 'react';

export default ({changeCurrentPlayer, isCurrentPlayer, lastDiceRoll}) => {
  if(isCurrentPlayer && lastDiceRoll) {
    return(
      <div>
        <button onClick={() => changeCurrentPlayer()}>End Turn</button>
      </div>
    );
  } else {
    return null;
  }
}
