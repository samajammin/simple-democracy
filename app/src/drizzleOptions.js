import SimpleStorage from './contracts/SimpleStorage.json';
import ComplexStorage from './contracts/ComplexStorage.json';
import TutorialToken from './contracts/TutorialToken.json';
import SimpleDemocracy from './contracts/SimpleDemocracy.json';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545'
    }
  },
  contracts: [SimpleStorage, ComplexStorage, TutorialToken, SimpleDemocracy],
  events: {
    // TODO add SimpleDemocracy events
    // https://github.com/trufflesuite/drizzle#events-object
    SimpleStorage: ['StorageSet']
  },
  polls: {
    accounts: 1500
  }
};

export default options;
