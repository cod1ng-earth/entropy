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
  
  const { account, library } = useWeb3React<Web3>();


  useEffect((): void => {
    
    if (account && library) {
      setEntropyFacade(
        new EntopyFacade(library, account, process.env.REACT_APP_CONTRACT_ADDRESS || ''),
      );
    }
  }, [account, library]);

  return {
    entropyFacade,
  };
};

const EntropyProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const entropyFacade = useEntropyProvider();

  return <EntropyContext.Provider value={entropyFacade}>{children}</EntropyContext.Provider>;
};

export { EntropyProvider, useEntropy };
