import React from 'react'
import styled from 'styled-components'
import { Howl } from 'howler'

interface Props {
  on: boolean;
  onClick(): void;
}

const Tile = styled.div<{ on: boolean }>`
  width: 40px;
  height: 40px;
  margin: 2px;
  color: ${(props) => (props.on ? '#333333' : '#DDDDDD')};
  background: ${(props) => (props.on ? '#33ddff' : '#333333')};
`

const MatrixTile = ({on, onClick}: Props) => {
  const sound = new Howl({
    src: ['crabacus/the-open-source-drumkit/raw/master/crash/crash-bell1.wav'],
  })

  const playToggle = () => {
    if (!on) {
      sound.play()
    }
  }

  const handleClick = () => {
    playToggle();
    onClick();
  }

  return (
    <Tile on={on} onClick={handleClick}>
      {on}
    </Tile>
  )
}

export default MatrixTile
