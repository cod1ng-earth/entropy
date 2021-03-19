import React, { useState } from 'react';

const initialArts = () => {
  return [
    {
      artist: '0xa',
      id: 'b44861ea32a51020'
    }
  ]
}
const Arts = () => {
  const [arts, setArts] = useState(initialArts());

  return (
    <div>
      {arts.map((art)=>(
        <ArtPiece art={art} key={art.id} />
      ))}
    </div>
  );
};

export default Arts;
