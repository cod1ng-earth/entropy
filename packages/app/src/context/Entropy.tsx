import React, { useState, useContext, useEffect } from 'react';
import EntopyFacade from '../lib/EntropyNFT';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

interface IEntropyFacade {
  entropyFacade: EntopyFacade | null;
}

const EntropyContext = React.createContext<IEntropyFacade>({
  entropyFacade: null,
});

const useEntropy = (): IEntropyFacade => useContext(EntropyContext);

const useEntropyProvider = (): IEntropyFacade => {
  const [entropyFacade, setEntropyFacade] = useState<EntopyFacade | null>(null);
  const [web3Instance, setWeb3] = useState<Web3|null>(null);
  
  const { connector, account } = useWeb3React<Web3>();


  useEffect(() => {
    (async () => {
      const prov = await connector?.getProvider();
      setWeb3(new Web3(prov));
      console.log('web 3');
      
    })();
  }, [])

  useEffect((): void => {
    
    if (account && web3Instance) {
      console.log('here', web3Instance);
      
      setEntropyFacade(
        new EntopyFacade(web3Instance, account, process.env.REACT_APP_CONTRACT_ADDRESS || ''),
      );
    }
  }, [account, web3Instance]);

  return {
    entropyFacade,
  };
};

const EntropyProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const entropyFacade = useEntropyProvider();

  return <EntropyContext.Provider value={entropyFacade}>{children}</EntropyContext.Provider>;
};

export { EntropyProvider, useEntropy };
