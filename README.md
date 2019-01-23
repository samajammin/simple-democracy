# Simple Democracy

Truffle & React dApp for conducting basic elections.

# Under heavy construction. Pardon the dust.

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
git clone <repository-url> this repository
```

```
cd simple-democracy
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

### Running Tests

```
truffle test
```

## Resources

- [Truffle Suite](https://www.truffleframework.com/)
