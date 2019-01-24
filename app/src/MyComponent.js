import React from 'react';
import AdminForms from './AdminForms';
import VoterForms from './VoterForms';
import ContractData from './ContractData';
import { AccountData, ContractForm } from 'drizzle-react-components';

import logo from './logo.png';

export default ({ accounts }) => (
  <div className="App">
    <div>
      <img src={logo} alt="drizzle-logo" />
      <h1>Drizzle Examples</h1>
      <p>Examples of how to get started with Drizzle in various situations.</p>
    </div>
    <div className="section">
      <h2>SimpleDemocracy</h2>
      <h3>Active Account</h3>
      <AccountData accountIndex="0" units="ether" precision="3" />
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
      TODO - store isAdmin in account state... conditionally show admin forms
      <AdminForms />
      <VoterForms />
    </div>
    <div className="section">
      <h2>SimpleStorage</h2>
      <p>
        This shows a simple ContractData component with no arguments, along with
        a form to set its value.
      </p>
      <p>
        <strong>Stored Value: </strong>
        <ContractData contract="SimpleStorage" method="storedData" />
      </p>
      <ContractForm contract="SimpleStorage" method="set" />
    </div>
    <div className="section">
      <h2>TutorialToken</h2>
      <p>
        Here we have a form with custom, friendly labels. Also note the token
        symbol will not display a loading indicator. We've suppressed it with
        the <code>hideIndicator</code> prop because we know this variable is
        constant.
      </p>
      <p>
        <strong>Total Supply: </strong>
        <ContractData
          contract="TutorialToken"
          method="totalSupply"
          methodArgs={[{ from: accounts[0] }]}
        />{' '}
        <ContractData contract="TutorialToken" method="symbol" hideIndicator />
      </p>
      <p>
        <strong>My Balance: </strong>
        <ContractData
          contract="TutorialToken"
          method="balanceOf"
          methodArgs={[accounts[0]]}
        />
      </p>
      <h3>Send Tokens</h3>
      <ContractForm
        contract="TutorialToken"
        method="transfer"
        labels={['To Address', 'Amount to Send']}
      />
    </div>
    <div className="section">
      <h2>ComplexStorage</h2>
      <p>
        Finally this contract shows data types with additional considerations.
        Note in the code the strings below are converted from bytes to UTF-8
        strings and the device data struct is iterated as a list.
      </p>
      <p>
        <strong>String 1: </strong>
        <ContractData contract="ComplexStorage" method="string1" toUtf8 />
      </p>
      <p>
        <strong>String 2: </strong>
        <ContractData contract="ComplexStorage" method="string2" toUtf8 />
      </p>
      <strong>Single Device Data: </strong>
      <ContractData contract="ComplexStorage" method="singleDD" />
    </div>
  </div>
);
