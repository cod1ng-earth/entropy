import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './components/App'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3';
import { EntropyProvider } from './context/Entropy'
import { ToastProvider } from 'react-toast-notifications';
import Toast from './components/atoms/Toast/Toast'

const getLibrary = (provider:any) => {
  return new Web3(provider)
}

const subgraphUri = process.env.REACT_APP_SUBGRAPH_URL

const client = new ApolloClient({
  uri: subgraphUri,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <EntropyProvider>
          <ToastProvider components={{ Toast }} autoDismiss={false} placement='bottom-center'>
            <App />
          </ToastProvider>
        </EntropyProvider>
      </ApolloProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
