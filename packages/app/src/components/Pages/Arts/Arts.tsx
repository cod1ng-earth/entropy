import React, { useCallback, useEffect, useState } from 'react'
import { useAsync } from 'react-async'
import styled from 'styled-components'
import { useEntropy } from '../../../context/Entropy'
import { ReactComponent as And } from '../../../icons/and.svg'
import { ReactComponent as Or } from '../../../icons/or.svg'
import { ReactComponent as Xor } from '../../../icons/xor.svg'
import intToBuffer from '../../../lib/intToBuffer'
import * as Square from '../../../lib/square'
import Matrix from '../../molecules/Matrix/Matrix'
import SimpleMatrix from '../../molecules/SimpleMatrix/SimpleMatrix'

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`

const Filter = styled.div`
  margin-left: 2rem;
  label {
    
  }
  select {
    background: gray;
    width: 200px;
    padding: .2rem;
    font-size: 18px;
    color: white;
    border-radius: 2px;
    
  }
  
`;
const ArtPiece = styled.li<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ isSelected }) => isSelected ? '2px 1px 14px #00ffea' : '0px 0px 2px'};
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

const Arts = () => {
  const [arts, setArts] = useState<Array<{ mx: Square.Square, id: number }>>([])
  const [showActions, setShowActions] = useState(false)
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [composedSquare, setComposedSquare] = useState<Square.Square>([]);
  const [showMyTokens, setShowMyTokens] = useState<boolean>(true);

  const { entropyFacade } = useEntropy();

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

  const fetchAllTokens = async () => {
    if (entropyFacade) {
      const all = await entropyFacade.getAllTokens();
      const allTokens = all.map((num: string, index: number) => {
        const sq = Square.fromBytes(intToBuffer(num));
        return { id: index, mx: sq }
      })
      setArts(allTokens);
    }
  }

  const fetchMyTokens = async () => {
    if (entropyFacade) {
      const all = await entropyFacade.getMyTokens();
      const myTokens = all.map((num: string, index: number) => {
        //const bnId = entropyFacade.idToBn(num);
        //const hx = bnId.toBuffer().toString('hex');
        //const sq = Square.fromBytes(bnId.toBuffer());
        const sq = Square.fromBytes(intToBuffer(num));
        return { id: index, mx: sq }
      });
      setArts(myTokens);
    }
  }

  const fetchTokens = useCallback(async () => {
    if (entropyFacade) {
        return showMyTokens ? fetchMyTokens(): fetchAllTokens();
    }
  }, [showMyTokens, entropyFacade])

  const { isPending: isTokensPending } = useAsync({
    promiseFn: fetchTokens,
  });

  return (
        <>
        <Filter>
          <label>show: </label>
          <select onChange={(e)=> setShowMyTokens(e.target.value === 'my_tokens')}>
            <option value="my_tokens">My tokens</option>
            <option value="all_tokens">All tokens</option>
          </select>
        </Filter>
        <List>
        {isTokensPending
          ? <span>Loading</span>
          : arts.map((art, index) => (
            <ArtPiece isSelected={selected[index]} key={art.id} onClick={() => handleClick(index)}>
              <SimpleMatrix square={art.mx} onClick={() => null} isSelected={false} />
            </ArtPiece>
          ))
        }
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
        {composedSquare.length &&
          <Modal >

            <ModalContent>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
              <Matrix square={composedSquare} isSelectable={false} isMintable={false}/>
            </ModalContent>

          </Modal>
        }
      </List>
    </>
  )
}

export default Arts
