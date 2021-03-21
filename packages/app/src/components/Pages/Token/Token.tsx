import { useWeb3React } from '@web3-react/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import styled from 'styled-components'
import Web3 from 'web3'
import { useEntropy } from '../../../context/Entropy'
import * as Square from '../../../lib/square'
import Matrix from '../../molecules/Matrix/Matrix'
import { useAsync } from 'react-async';
import { injected } from '../../../connectors/connectors'

const Headline = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
`

const Subtitle = styled.h2`
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
`

const ImageWrapper = styled.div`
  display: grid;
  justify-content: center;
`;
const Image = styled.img`
  width: 400px;
  height: 400px;
`;


const Token = () => {

  const { activate } = useWeb3React<Web3>();
  const { entropyFacade } = useEntropy();
  const { addToast, removeAllToasts } = useToasts();

  const { id } = useParams<{ id: string }>();
  const [bnId, setBnId] = useState<any>();
  const [mx, setMx] = useState<Square.Square>([]);
  const [metadata, setMetadata] = useState<{ fancy_image?: string, image?: string }>({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (entropyFacade) {
      const square = Square.fromBytes(Buffer.from(id, 'hex'));
      const _bnId = entropyFacade.hexToBn(`0x${Square.toHex(square)}`);
      setBnId(_bnId);
      setMx(square);
    }
  }, [id, entropyFacade])

  useEffect(() => {
    if (bnId) {
      (async () => {
          console.log(id);
          //.replace('https://entropy-elmariachi.vercel.app', '')
          let _tokenUri;
          try {
            _tokenUri = await entropyFacade!.getTokenUri(bnId.toString());
          } catch (e) {
            _tokenUri = `https://entropy-elmariachi.vercel.app/token/0x${id}.json`
          }
                    
          console.log(_tokenUri)
          const response = await fetch(_tokenUri)
          const _metadata = await response.json();
          console.log(_metadata);
          setMetadata(_metadata);
      })();
    }
  }, [bnId]);


  const toggle = () => {
    if (Object.keys(metadata).length) {
      const nextPage = page + 1
      setPage(nextPage % 3)
    }
  }

  const { isPending: isWalletPending } = useAsync({
    promiseFn: useCallback(async () => {
      addToast('Please login to your wallet');
      activate(injected);
    }, []),
    onResolve: () => removeAllToasts(),
  });

  // useAsync({
  //   promiseFn: fetchTokenUri,
  // });

  return (
    <div>
      <Headline>Entropy 0x{id}</Headline>
      <Subtitle onClick={toggle}>click here to see the Entropy Art</Subtitle>
      <Subtitle> {bnId?.toString()}</Subtitle>
      {page === 0 &&
        <Matrix square={mx} isMintable={false} isSelectable={false} />
      }
      {page === 1 &&
        <ImageWrapper>
          <Image src={metadata.image} alt="regular" />
        </ImageWrapper>
      }
      {page === 2 &&
        <ImageWrapper>
          <Image src={metadata.fancy_image} alt="fancy" />
        </ImageWrapper>
      }
    </div>
  )
}

export default Token
