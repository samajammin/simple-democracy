import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminForms from './AdminForms';
import VoterForms from './VoterForms';

/*
  Adapted from
  https://github.com/trufflesuite/drizzle-react-components/blob/master/src/AppForms.js
 */

class AppForms extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;

    // Fetch if account is registered
    this.isRegistered = this.contracts['SimpleDemocracy'].methods[
      'getRegistration'
    ].cacheCall(props.account);
    // Fetch if account is an admin
    this.isAdmin = this.contracts['SimpleDemocracy'].methods[
      'getIsAdmin'
    ].cacheCall(props.account);
  }

  render() {
    // Contract is not yet intialized.
    if (!this.props.contracts['SimpleDemocracy'].initialized) {
      return <span>Initializing...</span>;
    }

    // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
    if (
      !(
        this.isAdmin in this.props.contracts['SimpleDemocracy']['getIsAdmin']
      ) ||
      !(
        this.isRegistered in
        this.props.contracts['SimpleDemocracy']['getRegistration']
      )
    ) {
      return <span>Fetching...</span>;
    }

    // // Show a loading spinner for future updates.
    // var pendingSpinner = this.props.contracts['SimpleDemocracy'].synced
    //   ? ''
    //   : ' 🔄';

    // // Optionally hide loading spinner (EX: ERC20 token symbol).
    // if (this.props.hideIndicator) {
    //   pendingSpinner = '';
    // }

    const isAdmin = this.props.contracts['SimpleDemocracy']['getIsAdmin'][
      this.isAdmin
    ].value;

    const isRegistered = this.props.contracts['SimpleDemocracy'][
      'getRegistration'
    ][this.isAdmin].value;

    if (isAdmin) {
      return (
        <div>
          <h1>Welcome, admin!</h1>
          <h3>Here's a list of actions you can take:</h3>
          <AdminForms />
        </div>
      );
    } else if (isRegistered) {
      return (
        <div>
          <h1>Welcome, voter!</h1>
          <h3>Here's a list of actions you can take:</h3>
          <VoterForms />
        </div>
      );
    } else {
      return (
        <div>
          <h1>Welcome, stranger!</h1>
          <h3>Looks like you're not registered in our system.</h3>
          <h3>I'm afraid there's not much you can do here.</h3>
        </div>
      );
    }
  }
}

AppForms.contextTypes = {
  drizzle: PropTypes.object
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  };
};

export default drizzleConnect(AppForms, mapStateToProps);
