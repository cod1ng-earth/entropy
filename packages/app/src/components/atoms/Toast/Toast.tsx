import React from 'react'
import styled from 'styled-components'

interface Props {
  appearance: any;
  children: any;
}

const Wrapper = styled.div<{ appearance: string }>`
    background: ${(props) => props?.appearance === 'error' ? '#8d4266' : '#42578d'};
    padding: 1rem;
    border-radius: 2px;
}
`

const Toast = ({ appearance, children }: Props) => {


  return (
    <Wrapper appearance={appearance}>
      {children}
    </Wrapper>
  )
}

export default Toast
