var Figurava = artifacts.require("./Figurava.sol");

module.exports = function(deployer) {
  // initial parameters for smart contract, set baseUri and tokenUri
  deployer.deploy(Figurava, "https://assets.yoursite.com/figures/assets/", "https://assets.yoursite.com/figures/contract/");
};
