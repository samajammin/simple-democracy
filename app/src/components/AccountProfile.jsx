import { drizzleConnect } from 'drizzle-react';
import ContractData from './ContractData';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AccountProfile extends Component {
  constructor(props, context) {
    super(props);

    this.precisionRound = this.precisionRound.bind(this);
  }

  precisionRound(number, precision) {
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
  }

  render() {
    // No accounts found.
    if (Object.keys(this.props.accounts).length === 0) {
      return <span>Initializing...</span>;
    }

    // Get account address and balance.
    const address = this.props.accounts[this.props.accountIndex];
    let balance = this.props.accountBalances[address];
    const units = this.props.units
      ? this.props.units.charAt(0).toUpperCase() + this.props.units.slice(1)
      : 'Wei';

    // Convert to given units.
    if (this.props.units && typeof balance !== 'undefined') {
      balance = this.context.drizzle.web3.utils.fromWei(
        balance,
        this.props.units
      );
    }

    // Adjust to given precision.
    if (this.props.precision) {
      balance = this.precisionRound(balance, this.props.precision);
    }

    return (
      <div>
        <h4>
          <strong>Address:</strong> {address}
        </h4>
        <h4>
          <strong>Balance:</strong> {balance} {units}
        </h4>
        <p>
          <strong>Admin permissions: </strong>
          <ContractData
            contract="SimpleDemocracy"
            method="getIsAdmin"
            methodArgs={[this.props.accounts[this.props.accountIndex]]}
          />
        </p>
        <p>
          <strong>Registered voter: </strong>
          <ContractData
            contract="SimpleDemocracy"
            method="getRegistration"
            methodArgs={[this.props.accounts[this.props.accountIndex]]}
          />
        </p>
      </div>
    );
  }
}

AccountProfile.contextTypes = {
  drizzle: PropTypes.object
};

/*
 * Export connected component.
 */

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    accountBalances: state.accountBalances
  };
};

export default drizzleConnect(AccountProfile, mapStateToProps);
