# Simple Democracy

Truffle, Drizzle & React dApp for conducting basic elections on the Ethereum blockchain.

You can interact with the smart contract using a local network (see instructions below) or on the Rinkeby testnet (see [deployed_addresses.txt](./deployed_addresses.txt)).

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

Ensure you have truffle 5. Running `truffle version` should output look something like:

```
Truffle v5.0.1 (core: 5.0.1)
Solidity v0.5.0 (solc-js)
Node v10.13.0
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

#### From project root...

Download dependencies:

```
yarn
```

Fire up your local development blockchain:

```
ganache-cli
```

In addition to spinning up a test network (listening on 127.0.0.1:8545 by default), Ganache also creates 10 addresses, each with a balance of 100 ETH.

Leave this terminal window open and copy the Mnemonic output. You'll need to [paste this seed phrase into MetaMask](https://medium.com/publicaio/how-import-a-wallet-to-your-metamask-account-dcaba25e558d) in order to import and control these accounts.

Compile & deploy the application contracts to the test network:

```
truffle migrate
```

#### From app/ directory...

Download dependencies:

```
yarn
```

Fire up the React application:

```
yarn start
```

The application shoud now be accessible at [http://localhost:3000/](http://localhost:3000/).

Leave this terminal window open.

Paste the Mnemonic from Ganache into MetaMask using the ["import with seed phrase" option](https://medium.com/publicaio/how-import-a-wallet-to-your-metamask-account-dcaba25e558d). From the MetaMask network dropdown, select the private network (Localhost 8545). You should now have control of the generated addresses to sign transactions.

## Using the dApp

This dApp has three user types:

1. Admins
2. Voters
3. Unregistered users

A "user" in the dApp is an Ethereum account address. Users can interact with this dApp through MetaMask.

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

- [Design decisions of this project](./design_pattern_decisions.md)
- [Attack vulnerabilities of this project](./avoiding_common_attacks.md)
- [Truffle Suite](https://www.truffleframework.com/)

## Troubleshooting

There's a known bug when switching between MetaMask accounts and attempting transactions. Inspect your browser console and you'll find this warning:

```
inpage.js:1 MetaMask - RPC Error: Error: WalletMiddleware - Invalid "from" address.
```

There's an [open issue on MetaMask's Github](https://github.com/MetaMask/metamask-extension/issues/5587). Feel free to weigh in :)

In general, if you encounter an issue (e.g. when submitting an input), try refreshing the browser. It should solve the problem.

### Any other problems? Shoot me an email at sbrichards(at)gmail(dot)com
