const Square = require('../square');

function erc721MetaData(tokenId) {
  //const square = Square.fromBytes(Buffer.from(id, 'hex'));

  return {
    "name": `Entropy Token #0x${tokenId}`,
    "description": "Entropy tokens let you own the seed for generative art",
    "external_url": `https://entropy.on.fleek.co/#/token/${tokenId}`,
    "image": `https://entropy-elmariachi.vercel.app/image/${tokenId}.png`,
    "attributes": [
      { "trait_type": "KIND", "key": "KIND", value: "Entropy" }
    ]
  }
}

module.exports = (req, res) => {
  const xTokenId = req.query.id;
  const tokenId = xTokenId.substr(2);
  const metaData = erc721MetaData(tokenId)
  res.json(metaData);
}