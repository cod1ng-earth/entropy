import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import tunes from '../../../dummyData/tunes'
import * as Square from '../../../lib/square'
import SimpleMatrix from '../../molecules/SimpleMatrix/SimpleMatrix'
import { ReactComponent as And } from '../../../icons/and.svg'
import { ReactComponent as Xor } from '../../../icons/xor.svg'
import { ReactComponent as Or } from '../../../icons/or.svg'
import Matrix from '../../molecules/Matrix/Matrix'

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Filter = styled.div`
  & select {
    background: gray;
    width: 200px;
    font-size: 18px;
    color: white;
    border-radius: 2px;
    margin: 2rem;
  }
  
`;

const ArtPiece = styled.li<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
  box-shadow: ${({ isSelected }) => isSelected ? '3px 3px 7px yellow' : '3px 3px 7px'};
  width: 180px;
  height: 180px;
  background: #00203b;
  margin: 2rem;
`

const Artist = styled.p`
  display: flex;
  margin-top: 15px;
  align-items: baseline;

  & h2 {
    font-size: 18px;
    font-weight: 700;
  }
`

const Price = styled.p`
  display: flex;
  margin-top: 15px;
  align-items: baseline;

  & h2 {
    font-size: 18px;
    font-weight: 700;
  }
`

const Name = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
  position: absolute;
  top: 0;
  left: 0;

  background: none;

  transform-origin: 0 0;
  transform: rotate(90deg);
`

const FabIconList = styled.div`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  display: flex;
  padding: 0.5rem;
  background: gray;
  border-radius: 8px;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  & svg {
    fill: white;
    width: 40px;
    height: 40px;
  }
`

const Modal = styled.div`
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgba(0,0,0,0.75); /* Black w/ opacity */
`;

const ModalContent = styled.div`
background-color: #373737;
margin: 15% auto; /* 15% from the top and centered */
padding: 20px;
border: 1px solid #888;
width: 33%; /* Could be more or less, depending on screen size */
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  `;

const initialArts = () => {
  return [
    {
      artist: '0xa',
      price: '2.05',
      name: 'fuzzy',
      id: 'b44861ea32a51021',
      mx: Square.fromText(`11111111
      01000010
      00111100
      00100100
      00100100
      00111100
      01000010
      10000001`),
    },
    {
      artist: '0xb',
      price: '2.05',
      name: 'dreamy',
      id: 'b44861ea32a51022',
      mx: Square.fromText(`10000001
      01000010
      00000000
      00000000
      00000000
      00000000
      01000010
      10000001`),
    },
    {
      artist: '0xc',
      price: '2.05',
      name: 'shitty',
      id: 'b44861ea32a5143',
      mx: Square.fromText(`10000001
      01000010
      00000001
      00000001
      00000001
      00000001
      01000010
      10000001`),
    },
    {
      artist: '0xd',
      price: '2.05',
      name: 'pulsy',
      id: 'b44861ea32a5153',
      mx: Square.fromText(`00000000
      01000010
      00000001
      01000001
      01000001
      01000001
      01000010
      00000000`),
    },
  ]
}
const Arts = () => {
  const [arts, setArts] = useState(initialArts())
  const [showActions, setShowActions] = useState(false)
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [composedSquare, setComposedSquare] = useState<Square.Square>([]);

  const handleClick = (index: number) => {
    const newSelected = { ...selected, [index]: !selected[index] };
    setSelected(newSelected)
  }

  const handleOperation = (op: Square.Operation): void => {
    const selectedTokens = [];
    for (const item in selected) {

      if (selected[item]) {
        selectedTokens.push(JSON.parse(JSON.stringify(arts[item].mx)));
      }
    }

    setComposedSquare(Square.operate(selectedTokens, op));
    setShowActions(false);
  }

  const closeModal = () => {
    setComposedSquare([]);
    setShowActions(false);
  }

  useEffect(() => {
    let numberOfSelection = 0;
    for (const item in selected) {

      if (selected[item]) {
        numberOfSelection += 1;
      }
    }
    setShowActions(numberOfSelection > 1);
    setComposedSquare([]);

  }, [selected])

  return (
    <React.Fragment>
      <Filter>
        <select>
          <option>All tokens</option>
          <option>My tokens</option>
        </select>
      </Filter>
      <List>
        {arts.map((art, index) => (
          <ArtPiece isSelected={selected[index]} key={art.id} onClick={() => handleClick(index)}>
            <SimpleMatrix key={art.id} square={art.mx} tunes={tunes} onClick={() => null} isSelected={false} />
            <Artist>
              <h2>Artist:&nbsp;</h2>
              <span>{art.artist}</span>
            </Artist>
            <Price>
              <h2>Price&nbsp;</h2>
              <span>Ξ&nbsp;{art.price}</span>
            </Price>
            <Name>{art.name}</Name>
          </ArtPiece>
        ))}
        {showActions && (
          <FabIconList>
            <Button onClick={() => handleOperation(Square.xor)}>
              <Xor />
            </Button>
            <Button onClick={() => handleOperation(Square.and)}>
              <And />
            </Button>
            <Button onClick={() => handleOperation(Square.or)}>
              <Or />
            </Button>
          </FabIconList>
        )}
        {composedSquare.length > 0 &&
          <Modal >


            <ModalContent>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
              <Matrix square={composedSquare} tunes={tunes} isSelectable={false} />
            </ModalContent>

          </Modal>
        }
      </List>
    </React.Fragment>
  )
}

export default Arts
