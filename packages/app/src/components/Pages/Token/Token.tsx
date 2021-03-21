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

  const [mx, setMx] = useState<Square.Square>([]);
  const [metadata, setMetadata] = useState<{ fancy_image?: string, image?: string }>({});
  const [page, setPage] = useState(0);

  useEffect(() => {
    const square = Square.fromBytes(Buffer.from(id, 'hex'));
    setMx(square);
  }, [id])

  const fetchTokenUri = useCallback(async () => {
    if (entropyFacade) {
      const _tokenUir = await (await entropyFacade.getTokenUri(parseInt(id, 16))).replace('https://entropy-elmariachi.vercel.app', '');
      const response = await fetch(_tokenUir)
      const _metadata = await response.json();

      setMetadata(_metadata);

    }
  }, [entropyFacade])

  const toggle = () => {
    if (Object.keys(metadata).length) {
      const nextPage = page + 1
      // TODO: too see the fancy image, change 2 to 3
      setPage(nextPage % 2)
    }
  }

  const { isPending: isWalletPending } = useAsync({
    promiseFn: useCallback(async () => {
      addToast('Please login to your wallet');
      activate(injected);
    }, []),
    onResolve: () => removeAllToasts(),
  });

  useAsync({
    promiseFn: fetchTokenUri,
  });

  return (
    <div>
      <Headline>Entropy 0x{id}</Headline>
      <Subtitle onClick={toggle}>click here to see the Entropy Art</Subtitle>
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
