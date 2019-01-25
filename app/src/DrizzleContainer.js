import Home from './Home';
import { drizzleConnect } from 'drizzle-react';

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    SimpleDemocracy: state.contracts.SimpleDemocracy,
    drizzleStatus: state.drizzleStatus
  };
};

const DrizzleContainer = drizzleConnect(Home, mapStateToProps);

export default DrizzleContainer;
