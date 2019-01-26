import React from 'react';
import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';
import ContractData from './ContractData';
class ElectionStats extends React.Component {
  constructor(props, context) {
    super(props);

    const getElectionCount =
      context.drizzle.contracts.SimpleDemocracy.methods.electionCount;
    this.state = { dataKey: getElectionCount.cacheCall() };
  }

  createElectionList = count => {
    let list = [];

    for (let i = 1; i <= count; i++) {
      let children = (
        <div>
          <h3>Election {i}</h3>
          <div>
            Name:{' '}
            <ContractData
              contract="SimpleDemocracy"
              method="getElectionName"
              methodArgs={[i]}
            />
          </div>
          <div>
            Status:{' '}
            <ContractData
              contract="SimpleDemocracy"
              method="getElectionStatus"
              methodArgs={[i]}
            />
          </div>
          <div>
            Candidates:{' '}
            <ContractData
              contract="SimpleDemocracy"
              method="getElectionCandidates"
              methodArgs={[i]}
            />
          </div>
          <div>
            Winner:{' '}
            <ContractData
              contract="SimpleDemocracy"
              method="getElectionWinner"
              methodArgs={[i]}
            />
          </div>
        </div>
      );
      list.push(<div key={i}>{children}</div>);
    }
    return list;
  };

  render() {
    const contract = this.props.contracts.SimpleDemocracy;

    if (!contract.initialized) {
      return <span>Initializing...</span>;
    }

    if (!(this.state.dataKey in contract.electionCount)) {
      return <span>Fetching...</span>;
    }

    let displayData = contract.electionCount[this.state.dataKey].value;

    return (
      <div>
        <h3>Total elections created: {displayData}</h3>
        {this.createElectionList(parseInt(displayData))}
      </div>
    );
  }
}

ElectionStats.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = state => {
  return {
    contracts: state.contracts
  };
};

export default drizzleConnect(ElectionStats, mapStateToProps);
