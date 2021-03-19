import React, { useState } from 'react';
import {Howl} from 'howler';

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

  return (
    <div className="board">
      {board.map((item)=>(
        <div className="board-item" key={item.id} onClick={playToggle}>{item.id}</div>
      ))}

      
    </div>
  );
};

export default Create;
