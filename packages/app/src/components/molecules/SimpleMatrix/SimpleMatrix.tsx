import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Square from '../../../lib/square'
// import MatrixDetails from '../../atoms/MatrixDetails/MatrixDetails'
import MatrixTile from '../../atoms/MatrixTile/MatrixTile'
import { Howl } from 'howler'
import { ReactComponent as Play } from '../../../icons/play.svg'
import { ReactComponent as Pause } from '../../../icons/pause.svg'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Board = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 100px 40px;
`;

const MatrixWrapper = styled.div<{ isSelected: boolean }>`
  border: ${(props) => props.isSelected ? 'solid 1px white' : ''}
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

  & svg {
    fill: white;
  }
`;

interface props {
  onClick(): void;
  square: Square.Square;
  tunes: string[][];
  isSelected: boolean;
}

const SimpleMatrix = ({ square, tunes, onClick, isSelected }: props) => {
  const [mySquare, setSquare] = useState<Square.Square>(square)
  const [turnedOnTunes, setTurnedOnTunes] = useState<Howl[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

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
    if (turnedOnTunes.length && !isPlaying) {
      turnedOnTunes.forEach(sound => sound.play())
      setIsPlaying(true);
    }
  }
  const stopAll = () => {
    if (turnedOnTunes.length && isPlaying) {
      setIsPlaying(false);
      turnedOnTunes.forEach(sound => sound.stop())
    }
  }

  return (
    <Board onClick={onClick}>
      <MatrixWrapper isSelected={isSelected}>
        {mySquare.map((row, y) => (
          <Row key={y}>
            {row.map((bit, x) => (
              <MatrixTile key={x} on={bit} tune={tunes[x][y]} sm={true} />
            ))}
          </Row>
        ))}
      </MatrixWrapper>
      <Actions>
        {/* <MatrixDetails square={mySquare} /> */}

        {isPlaying ?
          <Button onClick={stopAll}>
            <Pause />
            <span>Pause</span>
          </Button>
          : <Button onClick={playAll}>
            <Play />
            <span>Play</span>
          </Button>
        }

      </Actions>
    </Board>
  )
}

export default SimpleMatrix
