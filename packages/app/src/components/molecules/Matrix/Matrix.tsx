import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Square from '../../../lib/square'
// import MatrixDetails from '../../atoms/MatrixDetails/MatrixDetails'
import MatrixTile from '../../atoms/MatrixTile/MatrixTile'
import { Howl } from 'howler'
import { ReactComponent as Clear } from '../../../icons/close.svg'
import { ReactComponent as Play } from '../../../icons/play.svg'
import { ReactComponent as Mint } from '../../../icons/diamond.svg'
import { ReactComponent as Pause } from '../../../icons/pause.svg'
import tunes from '../../../dummyData/tunes'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Board = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 400px 40px;
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


interface props {
  square: Square.Square;
  isMintable: boolean;
  isSelectable: boolean;
  onMint?: () => void;
}


const Matrix = ({ square, isSelectable, onMint, isMintable }: props) => {
  const [mySquare, setSquare] = useState<Square.Square>(square)
  const [turnedOnTunes, setTurnedOnTunes] = useState<Howl[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = (x: number, y: number) => {
    if (isSelectable) {
      const nw = [...mySquare]
      nw[y][x] = !mySquare[y][x]
      setSquare(nw)
    }
  }

  useEffect(() => {
    const _turnedOnTunes: Howl[] = [];
    mySquare.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile) {
          _turnedOnTunes.push(tunes[x][y])
        }
      })
    })
    _turnedOnTunes.forEach(sound => sound.load())
    setTurnedOnTunes(_turnedOnTunes);

  }, [mySquare])

  useEffect(() => {
    setSquare(square);
  }, [square])

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

  const clear = () => {
    setSquare(Square.empty(8))
  }
  return (
    <Board>
      <div>
        {mySquare.map((row, y) => (
          <Row key={y}>
            {row.map((bit, x) => (
              <MatrixTile key={x} on={bit} onClick={() => toggle(x, y)} tune={tunes[x % 8][y % 8]} isSelectable={isSelectable}/>
            ))}
          </Row>
        ))}
      </div>
      <Actions>
        {/* <MatrixDetails square={mySquare} /> */}
        {isSelectable &&
          <Button onClick={clear}>
            <Clear />
            <span>Clear</span>
          </Button>
        }
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
        {isMintable &&
          <Button onClick={onMint}>
            <Mint />
            <span>Mint</span>
          </Button>
        }

      </Actions>
    </Board>
  )
}

const defaultProps = {
  isSelectable: true,
  onMint: () => { }
}

Matrix.defaultProps = defaultProps;

export default Matrix
