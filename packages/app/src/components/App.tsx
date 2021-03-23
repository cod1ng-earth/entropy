import { useWeb3React } from '@web3-react/core';
import { HashRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './atoms/Button';
import NavBar from './Navigation/NavBar';
import Web3 from 'web3';
import Navigation from './Navigation/Navigation';

const Main = styled.main`
  padding-top: 1rem;
  @media (min-width: 1280px) {
    max-width: 100vw;
  }

  @media (min-width: 1440px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`

function App() {
  
  const { account, active} = useWeb3React<Web3>();
  
  return (
    <HashRouter>
      <NavBar />
      <Main>
        {account && <Navigation />}
      </Main>
    </HashRouter>
  );
}

export default App;
