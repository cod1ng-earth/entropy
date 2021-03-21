import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Square from '../../../lib/square'
// import MatrixDetails from '../../atoms/MatrixDetails/MatrixDetails'
import MatrixTile from '../../atoms/MatrixTile/MatrixTile'
import { Howl } from 'howler'
import { ReactComponent as Play } from '../../../icons/play.svg'
import { ReactComponent as Pause } from '../../../icons/pause.svg'
import { ReactComponent as Eye } from '../../../icons/eye.svg'
import tunes from '../../../dummyData/tunes'
import { Link } from 'react-router-dom'

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Board = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 100px;
`;

const MatrixWrapper = styled.div<{ isSelected: boolean }>`
position: relative;
  border: ${(props) => props.isSelected ? 'solid 2px #27ffe2' : ''}
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
  opacity: 0.2;
  background: #1a5f4e;
  border-radius: 4px;
  transition: all 0.5 ease-in;

  &:hover {
    opacity: 1;
    animation: pulse-black 2s infinite;
  }

  & span {
    display: none;
  }

  & svg {
    margin: 2px;
    fill: white;
    width: 30px;
    height: 30px;
  }

  @keyframes pulse-black {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;

const CustomLink = styled(Link)`
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity: 0.2;
  background: #1a5f4e;
  border-radius: 4px;
  transition: all 0.5 ease-in;

  &:hover {
    opacity: 1;
    animation: pulse-black 2s infinite;
  }

  & span {
    display: none;
  }

  & svg {
    margin: 2px;
    fill: white;
    width: 30px;
    height: 30px;
  }

  @keyframes pulse-black {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  }
`;

const PlayOverlay = styled.div`
  position: absolute;
  left: 20%;
  transform: translate(-20%, -20%);
  top: 20%;
`;

const DetailsOverlay = styled.div`
  position: absolute;
  left: 80%;
  transform: translate(-80%, -80%);
  top: 80%;
`;

interface props {
  onClick(): void;
  square: Square.Square;
  isSelected: boolean;
}

const SimpleMatrix = ({ square, onClick, isSelected }: props) => {
  const [mySquare, setSquare] = useState<Square.Square>(square)
  const [turnedOnTunes, setTurnedOnTunes] = useState<Howl[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const _turnedOnTunes: Howl[] = [];
    mySquare.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile) {
          _turnedOnTunes.push(tunes[x][y])
        }
      })
    })
    setTurnedOnTunes(_turnedOnTunes);

  }, [mySquare])

  const playAll = () => {
    if (turnedOnTunes.length && !isPlaying) {
      turnedOnTunes.forEach(sound => {
        sound.on('end', () => setIsPlaying(false))
        sound.play()
      })
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
    <Board>
      <MatrixWrapper isSelected={isSelected} onClick={onClick} >
        {mySquare.map((row, y) => (
          <Row key={y}>
            {row.map((bit, x) => (
              <MatrixTile key={x} on={bit} tune={tunes[x % 8][y % 8]} sm={true} isSelectable={false} />
            ))}
          </Row>
        ))}
        <PlayOverlay>
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
        </PlayOverlay>
        <DetailsOverlay>
          <CustomLink to={`/token/${Square.toHex(mySquare)}`}>
            <Eye />
          </CustomLink>
        </DetailsOverlay>
      </MatrixWrapper>


    </Board>

  )
}

export default SimpleMatrix
