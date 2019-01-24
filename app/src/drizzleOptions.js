import SimpleDemocracy from './contracts/SimpleDemocracy.json';

const options = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545'
    }
  },
  contracts: [SimpleDemocracy],
  events: {
    // https://github.com/trufflesuite/drizzle#events-object
    SimpleDemocracy: [
      'ElectionCreated',
      'ElectionCandidateAdded',
      'ElectionOpened',
      'ElectionVoteCast',
      'ElectionClosed'
    ]
  },
  polls: {
    accounts: 1500
  }
};

export default options;
