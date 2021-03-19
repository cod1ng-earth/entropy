import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Square from '../../../lib/square'
import MatrixDetails from '../../atoms/MatrixDetails/MatrixDetails'
import MatrixTile from '../../atoms/MatrixTile/MatrixTile'
//import EB from './EB';



const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Matrix = ({ square }: { square: Square.Square }) => {
  const [mySquare, setSquare] = useState<Square.Square>(square)

  const toggle = (x: number, y: number) => {
    const nw = [...mySquare]
    nw[y][x] = !mySquare[y][x]
    setSquare(nw)
  }

  const clear = () => {
    setSquare(Square.empty(8))
  }
  return (
    <div>
      <MatrixDetails square={mySquare} />
        {mySquare.map((row, y) => (
          <Row>
            {row.map((bit, x) => (
              <MatrixTile on={bit} onClick={() => toggle(x, y)} />
            ))}
          </Row>
        ))}
      <button onClick={clear}>clear</button>
    </div>
  )
}

export default Matrix
