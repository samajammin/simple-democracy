import React from 'react';
import ContractForm from './ContractForm';

export default class VoterForms extends React.Component {
  render() {
    return (
      <div>
        {/* TODO - pass open election options as a dropdown to vote input  */}
        {/* TODO - pass candidate options as a dropdown to vote input */}
        <h3>Vote:</h3>
        <ContractForm
          className="contract-form"
          method="vote"
          account={this.props.account}
        />
      </div>
    );
  }
}
