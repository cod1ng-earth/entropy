import { injected } from '../../lib/connectors';
import { ReactComponent as MetaMask } from '../../icons/mm-logo.svg'
import Web3 from 'web3';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import Link from './Link';

const HeroAlert = styled.section`
  display: flex;
  margin: auto auto;
  border: 1px solid turquoise;
  color: turquoise;
  border-radius: 1rem;
  width: 80vw;
  min-height: 40vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const ActivateWalletAlert = () => {
  const { activate } = useWeb3React<Web3>();
  
  return <HeroAlert>
    <div style={{ margin: '1rem' }}><MetaMask /></div>
    <div>Please <Link onClick={() => activate(injected)}>connect to a wallet</Link> on the Rinkeby network.</div>
  </HeroAlert>
}

export default ActivateWalletAlert;