import React, { useCallback, useEffect, useState } from 'react'
import * as Square from '../../../lib/square'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { injected } from '../../../connectors/connectors'
import SimpleMatrix from '../../molecules/SimpleMatrix/SimpleMatrix'
import { ReactComponent as And } from '../../../icons/and.svg'
import { ReactComponent as Xor } from '../../../icons/xor.svg'
import { ReactComponent as Or } from '../../../icons/or.svg'
import Matrix from '../../molecules/Matrix/Matrix'
import { useEntropy } from '../../../context/Entropy'
import { useAsync } from 'react-async';
import BN from 'bn.js'
import { useToasts } from 'react-toast-notifications';

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
  const [tokens, setTokens] = useState<Array<{ mx: Square.Square, id: number }>>([]);
  const [tokenIds, setTokenIds] = useState<Array<{ tokenId: number, id: number }>>([]);
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [showActions, setShowActions] = useState<boolean>(false);
  const [composedSquare, setComposedSquare] = useState<Square.Square>([]);
  // const [showClear, setShowClear] = useState<boolean>(false);
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const { activate } = useWeb3React<Web3>();
  const { entropyFacade } = useEntropy();
  const { addToast, removeAllToasts } = useToasts();


  const handleMint = async (): Promise<void> => {
    if (entropyFacade) {
      setIsMinting(true);
      const _tokenIds: number[] = [];
      for (const item in selected) {

        if (selected[item]) {
          _tokenIds.push(tokenIds[item].tokenId);
        }
      }
      try {
        await entropyFacade.mintWithTokens(_tokenIds);
      } catch (e) {
        addToast(e, { appearance: 'error' });
      }
      setIsMinting(false);
      handleClear();
      refetchMyTokens();
    }
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
  }

  const handleClear = () => {
    setComposedSquare([]);
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

  const fetchMyTokens = useCallback(async () => {
    if (entropyFacade) {
      const rawTokens: any = [];
      const artTokens: any = [];
      const all = await entropyFacade.getMyTokens();
      all.forEach((num: number, index: number) => {

        const bn = new BN(num, 10);
        let buf;
        try {
          buf = bn.toArrayLike(Buffer, 'le', 8);
        } catch {
          buf = bn.toArrayLike(Buffer, 'le', 16);
        }

        const sq = Square.fromBytes(buf);

        artTokens.push({ id: index, mx: sq })
        rawTokens.push({ id: index, tokenId: num })
      })
      setTokens(artTokens);
      setTokenIds(rawTokens);
    }

  }, [entropyFacade])

  const { isPending: isWalletPending } = useAsync({
    promiseFn: useCallback(async () => {
      addToast('Please login to your wallet');
      activate(injected);
    }, []),
    onResolve: () => removeAllToasts(),
  });

  const { isPending: isTokensPending, reload: refetchMyTokens } = useAsync({
    promiseFn: fetchMyTokens,
  });

  useAsync({
    deferFn: handleMint,
  });

  return (
    <React.Fragment>
      {!isWalletPending &&
        <div>
          <Headline>Compose stuff here</Headline>
          <Subtitle>Blah blah</Subtitle>
          {isTokensPending && <span>Loading...</span>}
          {!isTokensPending && tokens.length > 0 &&
            <Tokens>
              {tokens.map((token, index) => (
                <SimpleMatrix key={token.id} square={token.mx} onClick={() => handleClick(index)} isSelected={selected[index]} />
              ))}
            </Tokens>
          }
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
          {/* {showClear &&
            <Actions>
              <Button onClick={handleClear}>
                <Clear />
              </Button>
            </Actions>
          } */}
          {composedSquare.length > 0 && !isMinting &&
            <Matrix square={composedSquare} isSelectable={false} onMint={handleMint} />
          }
          {isMinting &&
            <span>minting in progress</span>
          }
        </div>
      }
    </React.Fragment>

  )
}

export default Compose
