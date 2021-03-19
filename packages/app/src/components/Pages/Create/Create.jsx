import React from 'react'
import Matrix from '../../molecules/Matrix/Matrix'
import * as Square from '../../../lib/square'


const Create = () => {
  const mx1 = Square.fromText(`10000001
01000010
00111100
00100100
00100100
00111100
01000010
10000001`)

  return <Matrix square={mx1} />
}

export default Create
