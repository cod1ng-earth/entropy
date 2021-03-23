import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../atoms/Button'
import { injected } from '../../lib/connectors';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import makeBlockie from 'ethereum-blockies-base64';

const Wrapper = styled.div`
  background-color: #1e1e1e;
  display: flex;
  flex-direction: row;
`
const Nav = styled.nav`
  height: 60px;
  display: flex;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;

  @media (min-width: 1280px) {
    margin: 0 auto;
    max-width: 1200px;
  }

  ul {
    padding: 0;
    list-style: none;
    display: flex;
    gap: 15px;
    li:hover {
      color: turquoise;
    }
  }
`
const Account = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Blockie = styled.img`
  position: relative;
  border-radius: 100%;
  max-height: 40px;
  margin: 3px;
`

const NavBar = () => {
  const { pathname } = useLocation()
  const { account, library, activate, chainId } = useWeb3React<Web3>();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (library && account) {
      (async () => {
        const _balance = await library.eth.getBalance(account);
        setBalance(library.utils.fromWei(_balance, 'ether'))
      })()
    }
  }, [library,account]);

  return (
    <Wrapper>
      <Nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/compose">Compose</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
      </ul>
      </Nav>
      <Nav>
        {account
          ? <Account>
              <Blockie src={makeBlockie(account)} />
            <p>{balance}</p>
            </Account>
          : <Button onClick={() => activate(injected)}>connect</Button>
        }
      </Nav>
    </Wrapper>
  )
}

export default NavBar
