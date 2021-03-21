import { useWeb3React } from '@web3-react/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import styled from 'styled-components'
import Web3 from 'web3'
import { useEntropy } from '../../../context/Entropy'
import * as Square from '../../../lib/square'
import Matrix from '../../molecules/Matrix/Matrix'

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
    const square = Square.fromBytes(Buffer.from(id, 'hex'));
    setMx(square);
  }, [id])
  
  return (
    <div>
      <Headline>Entropy 0x{id}</Headline>
      <Matrix square={mx} isMintable={false} isSelectable={false} />
    </div>
  )
}

export default Token
