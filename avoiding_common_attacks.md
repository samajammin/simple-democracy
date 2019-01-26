# Avoiding Common Attacks

### Sybil attacks

As mentioned in the [design decisions document](./design_pattern_decisions.md), this dApp makes a critical assumption that each registered Ethereum account address corresponds to one person.
In order to protect elections from Sybil attacks, voting is restricted to whitelisted addresses registered in the contract storage as voters.

### Circuit breaker

In the event a bug is discovered post-deploy, the contract owner can freeze the contract, which reverts all future calls to critical functions.

### Poison data

All public functions immediately validate inputs with require statements in order to prevent any unintended side effects.

### Logic bugs

Comprehensive unit tests ensure contract logic behaves as expected.

## Known vulnerabilities

Given time constraints, this dApp was built for simplicity and speed. Here are the known vulnerabilities with the current system design.

### Sybil attacks

Since admins can register an unlimited number of voters, malicious admins could feasibly register any number of addresses they control in order to vote and sway the outcome of any election.
If I had more time to build, I'd consider a multisig for admin transactions, a token-based voting system, or limiting the number of voters any one admin can register in a row.

### Front running

Miners have the ability to manipulate election outcomes. In the mempool they may discover an admin's transaction to close an election in addition to outstanding votes. They could order certain votes below the election-closing transaction, therefore rendering those votes invalid.
If I had more time to build, I'd consider encrypting votes to protect from malicious miners.
