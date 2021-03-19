import React from 'react'
import Matrix from '../../molecules/Matrix/Matrix'
import * as Square from '../../../lib/square'
import tunes from '../../../dummyData/tunes'
import styled from 'styled-components'

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
  return (
    <div>
      <Headline>Entropy</Headline>
      <Subtitle>This will be here until we come up with somthing</Subtitle>
      <Matrix square={mx1} tunes={tunes} />
    </div>
  )
}

export default Create
