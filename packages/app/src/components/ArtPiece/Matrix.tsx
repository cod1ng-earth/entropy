import {  useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Square from '../../lib/square';
//import EB from './EB';

const Tile = styled.div<{on: boolean}>`
  display: flex;
  padding: 1rem;
  color: ${props => props.on ? '#333333': '#DDDDDD'};
  background: ${props => props.on ? '#33ddff': '#333333'};
`;

const Row = styled.div`
  display: flex;
  width: 80vw;
  padding: 1rem;
  flex-direction: row;
  justify-content: space-evenly;
  
`
const Matrix = ({square}:{square: Square.Square}) => {

  const [mySquare, setSquare] = useState<Square.Square>(square);
  const [hex, setHex] = useState<string>();
  const [entropy, setEntropy] = useState<Square.Entropy>();
  const toggle = (x: number, y: number) => {
    const nw = [...mySquare];
    nw[y][x] = !mySquare[y][x];
    setSquare(nw);
  };

  useEffect(
    () => {
      const bytes = Square.bitsToBytes(Square.toBinArray(mySquare));
      setHex(bytes.toString('hex'));
      setEntropy(Square.entropy(mySquare));
    },
    [mySquare],
  )
  const clear = () => {
    setSquare(Square.empty(8))
  }
  return <div>
    <h1>{hex}</h1>
    <h2>symbols: {entropy?.symbolicEntropy}</h2>
    <h2>dir: {entropy?.sq.x} {entropy?.sq.y}</h2>
    {mySquare.map( (row, y) => 
      <Row>
        {row.map( (bit, x) =>  (
          <Tile on={bit} onClick={() => toggle(x,y)}>
            {bit ? "foo" : "bar"}
          </Tile>
        ))}
      </Row>
    )}
    <button onClick={clear}>clear</button>
  </div>
  
}

export default Matrix;

