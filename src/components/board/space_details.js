import React from 'react';

export default ({ spaceId, ownerPlayer, price }) => {
  const owner = ownerPlayer(spaceId);

  if(owner) {
    return(
      <div>
        Owner: {owner.name}
      </div>
    );
  } else {
    return price ? `$${price}` : "";
  }
}
