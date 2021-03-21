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

  it('can mint new  tokens ids', async function () {
    const receipt = await entropy.mintWithTokens(["2251799813685248", "72057594037927936"]);
    const logs = receipt.logs[0];
    assert.equal(logs.event, "Transfer");
    const newTokenId = logs.args.tokenId;
    assert.equal("74309393851613184", newTokenId.toString());

    const tokenUri = await entropy.tokenURI("74309393851613184");
    assert.equal(tokenUri, "http://localhost:3000/token/0x0108000000000000.json")
  })

  it('can mint many tokens', async function () {
    const tokenIdx = [10, 20, 30, 40, 50, 60, 42, 17, 32, 8];
    const _ids = tokenIdx.map(async (idx) => {
      const tokenId = await entropy.tokenByIndex(idx)
      return tokenId.toString()
    })

    const ids = await Promise.all(_ids);

    const firstResult = await entropy.mintWithTokens(ids.slice(0, 5));
    const secondResult = await entropy.mintWithTokens(ids.slice(5));

    const firstNewToken = firstResult.logs[0].args.tokenId.toString();
    const secondNewToken = secondResult.logs[0].args.tokenId.toString();

    const combinedRes = await entropy.mintWithTokens([firstNewToken, secondNewToken]);
    const combinedId = combinedRes.logs[0].args.tokenId.toString();
    const combinedUri = await entropy.tokenURI(combinedId);
    assert.equal(combinedId, "2308105813808514304")
    assert.equal(combinedUri, "http://localhost:3000/token/0x20080a0240120500.json");

  })

});
