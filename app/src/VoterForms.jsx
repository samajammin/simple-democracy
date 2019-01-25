import React from 'react';
import { ContractForm } from 'drizzle-react-components';

export default class VoterForms extends React.Component {
  render() {
    return (
      <div>
        TODO - pass open eletion options as a dropdown to vote input
        <h3>Vote:</h3>
        <ContractForm contract="SimpleDemocracy" method="vote" />
        TODO - pass candidate options as a dropdown to vote input
        <h3>getElectionWinner:</h3>
        <ContractForm contract="SimpleDemocracy" method="getElectionWinner" />
        TODO - this should be something we display vs call?
      </div>
    );
  }
}
