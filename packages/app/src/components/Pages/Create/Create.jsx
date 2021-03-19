import React, { useState } from 'react';
import {Howl} from 'howler';
import Matrix from '../../ArtPiece/Matrix';
import * as Square from '../../../lib/square';

const initialBoard = () => {
  const boardArray = [];
  for (let i = 0; i < 8 * 8; i++) {
    boardArray.push({ selected: false, tune: null, id: i });
  }
  return boardArray;
}

const Create = () => {
  const [board, setBoard] = useState(initialBoard());

  const sound = new Howl({
    src: ['crabacus/the-open-source-drumkit/raw/master/crash/crash-bell1.wav']
  });
  
  const playToggle = () => {
      sound.play();
  }

  const mx1 = Square.fromText(`10000001
  01000010
  00111100
  00100100
  00100100
  00111100
  01000010
  10000001`)

  return (
    <div className="board">

      <Matrix  square={mx1} />

      {board.map((item)=>(
        <div className="board-item" key={item.id} onClick={playToggle}>{item.id}</div>
      ))}

      
    </div>
  );
};

export default Create;
