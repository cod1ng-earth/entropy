import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Howl } from 'howler'

interface Props {
  on: boolean;
  onClick(): void;
  tune: string;
}

const Tile = styled.div<{ on: boolean }>`
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 2px;
  color: ${(props) => (props.on ? '#333333' : '#DDDDDD')};
  background: ${(props) => (props.on ? '#47dcfc' : '#ffffff')};
  &:hover {
    background: #b6b6b6;
  }
`

const MatrixTile = ({ on, onClick, tune }: Props) => {

  const [sound, setSound] = useState<Howl>();

  useEffect(() => {
    setSound(new Howl({
      src: [tune],
      format: ['wav'],
    }))
  }, [])

  const playToggle = () => {
    if (!on) {
      sound?.play()
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
