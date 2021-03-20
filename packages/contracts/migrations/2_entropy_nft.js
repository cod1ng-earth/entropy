require('dotenv-flow').config();

const Entropy = artifacts.require("EntropyNFT");

module.exports = async function (deployer) {
  await deployer.deploy(Entropy, process.env.METADATA_BASEURL).then(async () => {
    const ent = await Entropy.deployed();
    await ent.genesis1();
    await ent.genesis2();
  });
};