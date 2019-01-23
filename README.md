# Simple Democracy

Truffle & React dApp for conducting basic elections.

# Under heavy construction. Pardon the dust.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [MetaMask browser extension](https://metamask.io/)

## Installation

```
brew install yarn
```

```
brew install truffle
```

```
brew install ganache-cli ...?
```

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
ganache-cli
```

In addition to spinning up a test network, Ganache also creates 10 addresses w/ 100 ETH each. Copy the Mnemonic output. You'll need to paste this seed phrases into MetaMask in order to control these accounts.

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
