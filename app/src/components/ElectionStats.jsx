import React from 'react';
import ContractData from './ContractData';
export default class ElectionStats extends React.Component {
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
    return (
      <div>
        <h3>Total elections created: {this.props.electionCount}</h3>
        {this.createElectionList(parseInt(this.props.electionCount))}
      </div>
    );
  }
}
