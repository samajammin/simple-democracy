import React from 'react';
import AppForms from './AppForms';
import ContractData from './ContractData';
import AccountProfile from './AccountProfile';
import ElectionStats from './ElectionStats';

import vote from './vote.jpg';

export default ({ accounts }) => (
  <div className="App">
    <div>
      <img src={vote} className="sd-logo" alt="simple-democracy-logo" />
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
        <h1>Election Stats:</h1>
        <ElectionStats />
      </div>
    </div>
  </div>
);
