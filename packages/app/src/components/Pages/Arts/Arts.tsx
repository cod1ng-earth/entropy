import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Square from '../../../lib/square'
import SimpleMatrix from '../../molecules/SimpleMatrix/SimpleMatrix'
import { ReactComponent as And } from '../../../icons/and.svg'
import { ReactComponent as Xor } from '../../../icons/xor.svg'
import { ReactComponent as Or } from '../../../icons/or.svg'
import Matrix from '../../molecules/Matrix/Matrix'
import { useEntropy } from '../../../context/Entropy'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { injected } from '../../../connectors/connectors'
import { useAsync } from 'react-async'
import { useToasts } from 'react-toast-notifications';
import intToBuffer from '../../../lib/intToBuffer'

const List = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

const Arts = () => {
  const [arts, setArts] = useState<Array<{ mx: Square.Square, id: number }>>([])
  const [showActions, setShowActions] = useState(false)
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [composedSquare, setComposedSquare] = useState<Square.Square>([]);
  const [showMyTokens, setShowMyTokens] = useState<boolean>(true);

  const { activate } = useWeb3React<Web3>();
  const { entropyFacade } = useEntropy();
  const { addToast, removeAllToasts } = useToasts();


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
      const artTokens: any = [];
      const all = await entropyFacade.getAllTokens();
      all.forEach((num: number, index: number) => {
        const sq = Square.fromBytes(intToBuffer(num));

        artTokens.push({ id: index, mx: sq })
      })
      setArts(artTokens);
    }

  }

  const fetchMyTokens = async () => {
    if (entropyFacade) {
      const artTokens: any = [];
      const all = await entropyFacade.getMyTokens();
      all.forEach((num: number, index: number) => {
        const sq = Square.fromBytes(intToBuffer(num));

        artTokens.push({ id: index, mx: sq })
      })
      setArts(artTokens);
    }
  }

  const fetchTokens = useCallback(async () => {
    if (entropyFacade) {
      if (showMyTokens) {
        return fetchMyTokens();
      } else {
        return fetchAllTokens();
      }
    }

  }, [showMyTokens, entropyFacade])

  const { isPending: isWalletPending } = useAsync({
    promiseFn: useCallback(async () => {
      addToast('Please login to your wallet');
      activate(injected);
    }, []),
    onResolve: () => removeAllToasts(),
  });

  const { isPending: isTokensPending } = useAsync({
    promiseFn: fetchTokens,
  });

  return (
    <React.Fragment>
      {isWalletPending && <div>Please login to your wallet</div>}
      {!isWalletPending &&
        <React.Fragment>

          <Filter>
            <select onChange={(e)=> setShowMyTokens(e.target.value === 'my_tokens')}>
              <option value="my_tokens">My tokens</option>
              <option value="all_tokens">All tokens</option>
            </select>
          </Filter>
          <List>
            {isTokensPending && <span>Loading</span>}
            {!isTokensPending && arts.length > 0 &&
              arts.map((art, index) => (
                <ArtPiece isSelected={selected[index]} key={art.id} onClick={() => handleClick(index)}>
                  <SimpleMatrix square={art.mx} onClick={() => null} isSelected={false} />

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
                  <Matrix square={composedSquare} isSelectable={false} />
                </ModalContent>

              </Modal>
            }
          </List>
        </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Arts
