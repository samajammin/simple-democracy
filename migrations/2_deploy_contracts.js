const SimpleDemocracy = artifacts.require('SimpleDemocracy');
const SimpleStorage = artifacts.require('SimpleStorage');
const TutorialToken = artifacts.require('TutorialToken');
const ComplexStorage = artifacts.require('ComplexStorage');

module.exports = function(deployer) {
  deployer.deploy(SimpleDemocracy);
  deployer.deploy(SimpleStorage); // TODO remove
  deployer.deploy(TutorialToken); // TODO remove
  deployer.deploy(ComplexStorage); // TODO remove
};
