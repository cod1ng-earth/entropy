import React, { useEffect, useState } from 'react'
import * as Square from '../../../lib/square'
import tunes from '../../../dummyData/tunes'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { injected } from '../../../connectors/connectors'
import SimpleMatrix from '../../molecules/SimpleMatrix/SimpleMatrix'
import { ReactComponent as And } from '../../../icons/and.svg'
import { ReactComponent as Xor } from '../../../icons/xor.svg'
import { ReactComponent as Or } from '../../../icons/or.svg'
import { ReactComponent as Clear } from '../../../icons/clear.svg'
import Matrix from '../../molecules/Matrix/Matrix'

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;

  & svg {
    fill: white;
  }
`;

const Headline = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`

const Subtitle = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
`

const Tokens = styled.div`
  display: flex;
  flex-wrap:wrap;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  & svg {
    width: 60px;
    height: 60px;
  }
`;


const Compose = () => {

const mx1 = Square.fromText(`10000001
01000010
00111100
00100100
00100100
00111100
01000010
10000001`)

const mx2 = Square.fromText(`10000001
00000000
00000000
00100100
01000010
01000010
11111111
10000001`)

const mx3 = Square.fromText(`00000000
00000000
00000000
00100100
00000000
00000000
00000000
10000001`)

  const { connector, library, chainId, account, activate, deactivate, active, error } = useWeb3React<Web3>();

  const [tokens] = useState([{mx: mx1, id:1}, {mx:mx2, id:2}, {mx: mx3, id: 3}]);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [showActions, setShowActions] = useState<boolean>(false);
  const [composedSquare, setComposedSquare] = useState<Square.Square>([]);
  const [showClear, setShowClear] = useState<boolean>(false);


  const mint = () => {
    activate(injected);
    // TODO: call mint function
  }

  const handleClick = (index: number) => {
    const newSelected = { ...selected, [index]: !selected[index] };
    setSelected(newSelected)
  }

  const handleOperation = (op: Square.Operation): void => {
    const selectedTokens = [];
    for (const item in selected) {
      
      if (selected[item]) {
        selectedTokens.push(JSON.parse(JSON.stringify(tokens[item].mx)));
      }
    }
    
    setComposedSquare(Square.operate(selectedTokens, op));
    setShowActions(false);
    setShowClear(true);
  }

  const handleClear = () => {
    setComposedSquare([]);
    setShowActions(true);
    setShowClear(false);
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
      setShowClear(false);

    }, [selected])

  return (
    <div>
      <Headline>Compose stuff here</Headline>
      <Subtitle>Blah blah</Subtitle>
      <Tokens>
        {tokens.map((token, index) => (
          <SimpleMatrix key={token.id} square={token.mx} tunes={tunes} onClick={() => handleClick(index)} isSelected={selected[index]} />
        ))}
      </Tokens>
      {showActions &&
        <Actions>
          <Button onClick={() => handleOperation(Square.xor)}>
            <Xor />
          </Button>
          <Button onClick={() => handleOperation(Square.and)}>
            <And />
          </Button>
          <Button onClick={() => handleOperation(Square.or)}>
            <Or />
          </Button>
        </Actions>
      }
      {showClear &&
        <Actions>
          <Button onClick={handleClear}>
            <Clear />
          </Button>
        </Actions>
      }
      {composedSquare.length > 0 && 
        <Matrix square={composedSquare} tunes={tunes} isSelectable={false} />
      }
    </div>
  )
}

export default Compose
