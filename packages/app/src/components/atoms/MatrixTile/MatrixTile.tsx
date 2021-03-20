import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Howl } from 'howler'

interface Props {
  on: boolean;
  onClick?: () => void;
  tune: Howl;
  sm: boolean;
}

const Tile = styled.div<{ on: boolean, sm: boolean }>`
  width: ${(props) => (props.sm ? '8px' : '40px')};
  height: ${(props) => (props.sm ? '8px' : '40px')};
  margin: ${(props) => (props.sm ? '2px' : '5px')};
  border-radius: 2px;
  color: ${(props) => (props.on ? '#333333' : '#DDDDDD')};
  background: ${(props) => (props.on ? '#47dcfc' : '#ffffff')};
  &:hover {
    background: #b6b6b6;
  }
`

const MatrixTile = ({ on, onClick, tune, sm }: Props) => {


  const playToggle = () => {
    if (!on) {
      tune?.play()
    } else {
      tune.stop();
    }
  }

  const handleClick = () => {
    if (onClick) {
      playToggle();
      onClick();
    }
  }

  return (
    <Tile on={on} onClick={handleClick} sm={sm}>
      {on}
    </Tile>
  )
}

const defaultProps = {
  sm: false,
}

MatrixTile.defaultProps = defaultProps;

export default MatrixTile
