import styled from 'styled-components'

export const Button = styled.button`
    color: turquoise;
    border: 2px solid turquoise;
    padding: .5rem .75rem;
    border-radius: 1.5rem;
    cursor:pointer;
    background: #000;
    transition: all 700ms;
    &:hover {
        background: turquoise;
        color: #333;
    }
`