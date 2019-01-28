import React, { Component } from 'react';
import ContractForm from './ContractForm';

export default class AdminForms extends Component {
  render() {
    return (
      <div>
        <h3>Register a voter:</h3>
        <ContractForm
          className="contract-form"
          method="registerVoter"
          labels={['Address', 'isAdmin']}
          account={this.props.account}
        />
        <h3>Create an election:</h3>
        <ContractForm
          className="contract-form"
          method="createElection"
          account={this.props.account}
        />
        <h3>Add a candidate to an election:</h3>
        <ContractForm
          className="contract-form"
          method="addElectionCandidate"
          account={this.props.account}
          electionCount={this.props.electionCount}
        />
        <h3>Open an election for voting:</h3>
        <ContractForm
          className="contract-form"
          method="openElection"
          account={this.props.account}
          electionCount={this.props.electionCount}
        />
        <h3>Close an election:</h3>
        <ContractForm
          className="contract-form"
          method="closeElection"
          account={this.props.account}
          electionCount={this.props.electionCount}
        />
      </div>
    );
  }
}
