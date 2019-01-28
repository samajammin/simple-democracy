import React from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import AppForms from './AppForms';
import AccountProfile from './AccountProfile';
import ElectionStats from './ElectionStats';
import drizzleOptions from '../drizzleOptions';

import vote from '../vote.jpg';

class DemocracyApp extends React.Component {
  constructor(props, context) {
    super(props);

    // fetch election count
    const getElectionCount =
      context.drizzle.contracts.SimpleDemocracy.methods.electionCount;

    this.state = { dataKey: getElectionCount.cacheCall() };

    // add event listeners
    const events = drizzleOptions.events.SimpleDemocracy;
    events.forEach(eventName => {
      this.state[eventName] = {};
      context.drizzle.contracts.SimpleDemocracy.events[eventName]().on(
        'data',
        event => {
          const electionId = event.returnValues.id;
          const message = `${event.event}! Election name: ${
            event.returnValues.name
          } Election ID: ${electionId}`;

          // Catch duplicate events for same transaction
          if (this.state[eventName] === electionId) {
            return;
          } else {
            this.setState({ [eventName]: electionId });
            console.log(message);
            window.alert(message);
          }
        }
      );
      // TODO how to catch transaction error? event only fires when succesful...
      // .on('changed', event => console.log('changed: ', event))
      // .on('error', error => console.log('error: ', error));
    });
  }

  render() {
    const contract = this.props.SimpleDemocracy;

    if (!contract.initialized) {
      return <span>Initializing...</span>;
    }

    if (!(this.state.dataKey in contract.electionCount)) {
      return <span>Fetching...</span>;
    }

    let electionCount = parseInt(
      contract.electionCount[this.state.dataKey].value
    );

    return (
      <div className="App">
        <div>
          <img src={vote} className="sd-logo" alt="simple-democracy-logo" />
          <h1>Simple Democracy</h1>
          <p>
            A dApp for conducting basic elections. It's democracy. Simplified.
          </p>
        </div>
        <div className="sd-container">
          <div className="section">
            <AppForms
              account={this.props.accounts[0]}
              electionCount={electionCount}
            />
          </div>
          <div className="section">
            <h1>Your Account Profile:</h1>
            <AccountProfile accountIndex="0" units="ether" precision="3" />
            <h1>Election Stats:</h1>
            <ElectionStats electionCount={electionCount} />
          </div>
        </div>
      </div>
    );
  }
}

/*
 * Export connected component.
 */

DemocracyApp.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleDemocracy: state.contracts.SimpleDemocracy,
    drizzleStatus: state.drizzleStatus
  };
};

export default drizzleConnect(DemocracyApp, mapStateToProps);
//
