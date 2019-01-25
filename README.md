# Simple Democracy

Truffle, Drizzle & React dApp for conducting basic elections.

## Prerequisites

You will need the following properly installed on your computer:

- [Git](https://git-scm.com/)
- [Node.js v8+ LTS](https://nodejs.org/en/)
- [MetaMask browser extension](https://metamask.io/)

## Installation

Install [yarn](https://yarnpkg.com/lang/en/docs/install) (or use NPM if you prefer):

```
brew install yarn
```

Install [Truffle](https://truffleframework.com/truffle):

```
yarn global add truffle
```

Install [Ganache-CLI](https://github.com/trufflesuite/ganache-cli):

```
yarn global add ganache-cli
```

Clone & navigate into the repository:

```
git clone git@github.com:sbrichards/simple-democracy.git && cd simple-democracy
```

## Running / Development

#### From project root

Fire up your local development blockchain:

```
ganache-cli -b 3
```

This will spawn a new blockchain that listens on 127.0.0.1:8545 by default and will mine every 3 seconds. If we didn't specify this, Ganache would mine instantly and we won't be able to simulate the delay it takes for the real blockchain to mine.

In addition to spinning up a test network, Ganache also creates 10 addresses w/ 100 ETH each. Copy the Mnemonic output. You'll need to paste this seed phrases into MetaMask in order to control these accounts.

Leave this terminal window open.

Compile & deploy the application contracts to the test network:

```
truffle migrate
```

#### From app/ directory

Fire up the React application:

```
yarn start
```

The application shoud now be accessible at [http://localhost:3000/](http://localhost:3000/).

Paste the Mnemonic from Ganache into MetaMask. You should now have control of the generated addresses to sign transactions.

## Using the dApp

This dApp has three user types:

1. Admins
2. Voters
3. Unregistered users

A "user" in the dApp is an Ethereum account address. Users can interact with this dApp through MetaMask. See design_decision.md for more info.

Only admins can:

- Register users (i.e. Ethereum account addresses) as admins and/or as voters
- Create elections by submitting a name for the election
- Add candidates (i.e. Ethereum account addresses) to an election
- Open elections, which allow voters to vote on the election
- Close elections, which end voting and calculate a winner

All voters can:

- Vote once for a candidate per open election
- View their admin & registration status
- View election stats

Unregistered users can:

- View their Ethereum address and Ether balance
- Not much else...

Note: the account that deploys the contract (the first account in your local test network) will be automatically registered as an admin.

Elections structs are state machines stored in contract storage - they maintain a status (either "Pending", "Active" or "Closed") representing their lifecycle stage.

- Pending: the election has been created, admins can add candidates to this election and open the election
- Active: the election is open, voters can vote on the election and admins can close the election
- Closed: the election is close, the winner is calculated and no further actions can be taken on the election

## Running Tests

```
truffle test
```

## Resources

- [Truffle Suite](https://www.truffleframework.com/)
