import React from 'react';
import {
  // AccountData,
  // ContractData,
  ContractForm
} from 'drizzle-react-components';

export default class AdminForms extends React.Component {
  // constructor() {
  //   this.props = { contract: 'SimpleDemocracy' };
  // }
  render() {
    return (
      <div>
        <h3>registerVoter:</h3>
        <ContractForm
          contract="SimpleDemocracy"
          method="registerVoter"
          labels={['Address', 'isAdmin']}
        />
        <h3>createElection:</h3>
        <ContractForm contract="SimpleDemocracy" method="createElection" />
        TODO: label for isAdmin boolean
        <h3>addElectionCandidate</h3>
        <ContractForm
          contract="SimpleDemocracy"
          method="addElectionCandidate"
        />
        <h3>openElection</h3>
        <ContractForm contract="SimpleDemocracy" method="openElection" />
        <h3>closeElection</h3>
        <ContractForm contract="SimpleDemocracy" method="closeElection" />
      </div>
    );
  }
}
