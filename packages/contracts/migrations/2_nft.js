const ASimpleNFT = artifacts.require("ASimpleNFT");

module.exports = function (deployer) {
  deployer.deploy(ASimpleNFT);
};
