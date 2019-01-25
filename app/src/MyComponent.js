import React from 'react';
import AppForms from './AppForms';
import ContractData from './ContractData';
import AccountProfile from './AccountProfile';

import logo from './logo.png';

export default ({ accounts }) => (
  <div className="App">
    <div>
      <img src={logo} alt="drizzle-logo" />
      <h1>SimpleDemocracy</h1>
      <p>A dApp for conducting basic elections.</p>
    </div>
    <div className="sd-container">
      <div className="section">
        <AppForms account={accounts[0]} />
      </div>
      <div className="section">
        <h1>Your Account Profile:</h1>
        <AccountProfile accountIndex="0" units="ether" precision="3" />
        <h3>Election count: </h3>
        <ContractData contract="SimpleDemocracy" method="electionCount" />
        <div>TODO - only loads on hard refresh....</div>
        <h3>getElectionCandidates:</h3>
        <ContractData
          contract="SimpleDemocracy"
          method="getElectionCandidates"
          methodArgs={[1]}
        />
        TODO - pass candidate options as a dropdown to vote input
        <p>
          <strong>getIsAdmin: </strong>
          <ContractData
            contract="SimpleDemocracy"
            method="getIsAdmin"
            methodArgs={[accounts[0]]}
          />
        </p>
        <p>
          <strong>getRegistration: </strong>
          <ContractData
            contract="SimpleDemocracy"
            method="getRegistration"
            methodArgs={[accounts[0]]}
          />
        </p>
      </div>
    </div>
  </div>
);
