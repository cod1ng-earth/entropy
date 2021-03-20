import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Square from '../../../lib/square'
// import MatrixDetails from '../../atoms/MatrixDetails/MatrixDetails'
import MatrixTile from '../../atoms/MatrixTile/MatrixTile'
import { Howl } from 'howler'
import { ReactComponent as Clear } from './close.svg'
import { ReactComponent as Play } from './play.svg'
import { ReactComponent as Mint } from './diamond.svg'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Board = styled.div`
  display: flex;
  justify-content: center;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 0.5rem;
  gap: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  & span {
    display: none;

  }

  &:hover {
    & span {
      display: inline;
      margin-left: 5px;
      background: gray;
      padding: 2px;
    }
  }

  & svg {
    fill: white;
  }
`;

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
    mySquare.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile) {
          _turnedOnTunes.push(new Howl({
            src: [tunes[x][y]],
            format: ['wav'],
          }))
        }
      })
    })
    _turnedOnTunes.forEach(sound => sound.load())
    setTurnedOnTunes(_turnedOnTunes);

  }, [mySquare])

  const playAll = () => {
    if (turnedOnTunes.length) {
      turnedOnTunes.forEach(sound => sound.play())
    }
  }

  const clear = () => {
    setSquare(Square.empty(8))
  }
  return (
    <Board>
      <div>
        {mySquare.map((row, y) => (
          <Row key={y}>
            {row.map((bit, x) => (
              <MatrixTile key={x} on={bit} onClick={() => toggle(x, y)} tune={tunes[x][y]} />
            ))}
          </Row>
        ))}
      </div>
      <Actions>
        {/* <MatrixDetails square={mySquare} /> */}
        <Button onClick={clear}>
          <Clear />
          <span>Clear</span>
        </Button>
        <Button onClick={playAll}>
          <Play />
          <span>Play</span>
        </Button>
        <Button onClick={() => null}>
          <Mint />
          <span>Mint</span>
        </Button>
      </Actions>
    </Board>
  )
}

export default Matrix
