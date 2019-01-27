const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

let infuraKey;
let mnemonic;
const cliArgs = process.argv;

// only look for '.secret' if deploying to rinkeby
if (cliArgs.includes('rinkeby')) {
  infuraKey = 'MY_PROJECT_ID';
  mnemonic = fs
    .readFileSync('.secret')
    .toString()
    .trim();
}

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
