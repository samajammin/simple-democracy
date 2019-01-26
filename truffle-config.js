const path = require('path');

const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

const infuraKey = 'MY_PROJECT_ID';
const mnemonic = fs
  .readFileSync('.secret')
  .toString()
  .trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'app/src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/${infuraKey}`
        ),
      network_id: 4, // Rinkeby's id
      gas: 5500000
    }
  }
};
