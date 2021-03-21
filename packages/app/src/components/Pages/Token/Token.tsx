import React, { useCallback, useEffect, useState } from 'react'
import Matrix from '../../molecules/Matrix/Matrix'
import * as Square from '../../../lib/square'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { injected } from '../../../connectors/connectors'
import { useParams } from 'react-router-dom'
import intToBuffer from '../../../lib/intToBuffer'
import { useEntropy } from '../../../context/Entropy'
import { useToasts } from 'react-toast-notifications';
import { useAsync } from 'react-async';

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


const Token = () => {

  const { activate } = useWeb3React<Web3>();
  const { entropyFacade } = useEntropy();
  const { addToast, removeAllToasts } = useToasts();

  const { id } = useParams<{ id: string }>();

  const [mx, setMx] = useState<Square.Square>([]);


  
  useEffect(() => {
    setMx(Square.fromBytes(intToBuffer(parseInt(id, 16))));
  }, [])
  
  return (
    <div>
      <Headline>Token</Headline>
      <Matrix square={mx} isMintable={false} isSelectable={false} />
    </div>
  )
}

export default Token
