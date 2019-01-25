import React, { Component } from 'react';
import ContractForm from './ContractForm';

export default class AdminForms extends Component {
  render() {
    return (
      <div>
        <h3>Register a voter:</h3>
        {/* 
          TODO try something like passing accounts here?
          https://ethereum.stackexchange.com/questions/43707/truffle-drizzle-contractdata-call-keccak256-error

          Or raise issue here?
          https://github.com/trufflesuite/drizzle/issues/76
        */}
        <ContractForm
          contract="SimpleDemocracy"
          method="registerVoter"
          labels={['Address', 'isAdmin']}
        />
        <h3>Create an election:</h3>
        <ContractForm contract="SimpleDemocracy" method="createElection" />
        TODO: label for isAdmin boolean
        <h3>Add a candidate to an election:</h3>
        <ContractForm
          contract="SimpleDemocracy"
          method="addElectionCandidate"
        />
        <h3>Open an election for voting:</h3>
        <ContractForm contract="SimpleDemocracy" method="openElection" />
        <h3>Close an election:</h3>
        <ContractForm contract="SimpleDemocracy" method="closeElection" />
      </div>
    );
  }
}