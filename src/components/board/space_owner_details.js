import React from 'react';

export default ({ spaceId, ownerPlayer }) => {
  const owner = ownerPlayer(spaceId);

  if(owner) {
    return(
      <div>
        Owned by: {owner.name}
      </div>
    );
  } else {
    return null;
  }
}
