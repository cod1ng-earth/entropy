import React, { useEffect, useState } from 'react'
import * as Square from '../../../lib/square';

interface Props {
  square: Square.Square
}

const MatrixDetails = ({square}: Props) => {
  const [hex, setHex] = useState<string>();
  const [entropy, setEntropy] = useState<Square.Entropy>();

  useEffect(
    () => {
      const bytes = Square.bitsToBytes(Square.toBinArray(square));
      setHex(bytes.toString('hex'));
      setEntropy(Square.entropy(square));
    },
    [square],
  )

  return (
    <div>
      <h1>{hex}</h1>
      <h2>symbols: {entropy?.symbolicEntropy}</h2>
      <h2>dir: {entropy?.sq.x} {entropy?.sq.y}</h2>
    </div>
  )
}

export default MatrixDetails
