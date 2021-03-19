import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Square from '../../../lib/square'
import MatrixDetails from '../../atoms/MatrixDetails/MatrixDetails'
import MatrixTile from '../../atoms/MatrixTile/MatrixTile'
import { Howl } from 'howler'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Matrix = ({ square, tunes }: { square: Square.Square, tunes: string[][] }) => {
  const [mySquare, setSquare] = useState<Square.Square>(square)
  const [turnedOnTunes, setTurnedOnTunes] = useState<Howl[]>([]);

  const toggle = (x: number, y: number) => {
    const nw = [...mySquare]
    nw[y][x] = !mySquare[y][x]
    setSquare(nw)
  }

  useEffect(() => {
    const _turnedOnTunes: Howl[] = [];
    mySquare.forEach((row, y)=>{
      row.forEach((tile, x)=>{
        if (tile){
          _turnedOnTunes.push(new Howl({
            src: [tunes[x][y]],
            format: ['wav'],
          }))
        }
      })
    })
    _turnedOnTunes.forEach(sound=>sound.load())
    setTurnedOnTunes(_turnedOnTunes);

  }, [mySquare])

  const playAll = () => {
    if (turnedOnTunes.length){
      turnedOnTunes.forEach(sound=>sound.play())
    }
  }

  const clear = () => {
    setSquare(Square.empty(8))
  }
  return (
    <div>
      <MatrixDetails square={mySquare} />
        {mySquare.map((row, y) => (
          <Row key={y}>
            {row.map((bit, x) => (
              <MatrixTile key={x} on={bit} onClick={() => toggle(x, y)} tune={tunes[x][y]}/>
            ))}
          </Row>
        ))}
      <button onClick={clear}>clear</button>
      <button onClick={playAll} disabled={!turnedOnTunes.length}>play</button>
    </div>
  )
}

export default Matrix
