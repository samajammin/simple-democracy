import React from 'react';
import ContractData from './ContractData';

export default class extends React.Component {
  render() {
    return (
      <div>
        <h3>
          Elections held:{' '}
          <ContractData contract="SimpleDemocracy" method="electionCount" />
        </h3>
        <div>TODO - only loads on hard refresh....</div>
        <h3>getElectionCandidates:</h3>
        <div>TODO - dropdown to select election</div>
        <ContractData
          contract="SimpleDemocracy"
          method="getElectionCandidates"
          methodArgs={[1]}
        />
      </div>
    );
  }
}
