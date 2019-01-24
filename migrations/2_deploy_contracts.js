const SimpleDemocracy = artifacts.require('SimpleDemocracy');

module.exports = function(deployer) {
  deployer.deploy(SimpleDemocracy);
};
