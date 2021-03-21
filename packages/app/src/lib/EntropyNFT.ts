import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import EntropyJson from '@entropy/contracts/build/contracts/EntropyNFT.json';

class EntropyNFTFacade {
  public contract!: Contract;

  private readonly web3: Web3;

  private readonly account: string;

  constructor(web3: Web3, accountAddress: string, contractAddress: string) {
    this.web3 = web3;
    this.account = accountAddress;
    this.contract = this.contractInstance(
      contractAddress,
    );
  }

  private contractInstance( contractAddress: string): Contract {
    return new this.web3.eth.Contract(
      EntropyJson.abi as AbiItem[],
      contractAddress,
      {
        from: this.account,
      },
    );
  }

  public async mintWithTokens(tokens: number[]): Promise<void> {
    let gasEstimate = 2500000;
    try {
      gasEstimate = await this.contract.methods.mintWithTokens(tokens).estimateGas();
      const a = this.contract.methods.mintWithTokens(tokens).send({
        gas: gasEstimate + 1
      });
      console.log(a);
      return a;
    } catch (e) {
      throw e.toString().split('\n')[0];
    }
    
  }

  


  public async getAllTokens(): Promise<number[]> {
    const tokens: number[] = [];
    const balance = await this.contract.methods.totalSupply().call();
    if (balance > 1){
      
      for (let index = 0; index < balance; index++) {
        tokens.push(await this.contract.methods.tokenByIndex(index).call());
      }
    }
    return tokens;
  }

  public async getMyTokens(): Promise<number[]> {
    const tokens: number[] = [];
    const balance = await this.contract.methods.balanceOf(this.account).call();
    if (balance > 1){
      for (let index = 0; index < balance; index++) {
        tokens.push(await this.contract.methods.tokenOfOwnerByIndex(this.account, index).call());
      }
    }
    return tokens;
  }

}

export default EntropyNFTFacade;
