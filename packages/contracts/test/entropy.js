const Entropy = artifacts.require('EntropyNFT');

contract('Entropy', (accounts) => {
  let entropy;
  before(async function () {
    entropy = await Entropy.deployed();
    await entropy.updateBaseURI("http://localhost:3000/token/");
  })
  it('has an initial supply', async () => {
    const supply = await entropy.totalSupply.call();
    assert.equal(
      supply.valueOf(), 64, 'bad initial supply',
    );
  });

  it('can create token uris', async function () {
    const tokenUri = await entropy.tokenURI("1024");
    assert.equal("http://localhost:3000/token/0x0000000000000400.json", tokenUri);
  })

  it('can convert token ids to hex', async function () {
    assert.equal(1 == 2)
  })
});
