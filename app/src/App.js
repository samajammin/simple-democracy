import React, { Component } from 'react';
import { DrizzleProvider } from 'drizzle-react';
import { LoadingContainer } from 'drizzle-react-components';

import './App.css';

import drizzleOptions from './drizzleOptions';
import DemocracyApp from './DemocracyApp';

class App extends Component {
  render() {
    // TODO bring <LoadingContainer> into project to customize
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <DemocracyApp />
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
