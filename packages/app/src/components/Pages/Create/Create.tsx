import React, { useEffect } from 'react'
import Matrix from '../../molecules/Matrix/Matrix'
import * as Square from '../../../lib/square'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { injected } from '../../../connectors/connectors'


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

const mx1 = Square.fromText(`10000001
01000010
00111100
00100100
00100100
00111100
01000010
10000001`)

const Create = () => {
  const { activate } = useWeb3React<Web3>();


  const mint = () => {
    activate(injected);
    // TODO: call mint function
  }

  return (
    <div>
      <Headline>Entropy</Headline>
      <Subtitle>Collaboratively mine NFTs for generative arts</Subtitle>
      <Matrix square={mx1} isMintable={true} />
    </div>
  )
}

export default Create
