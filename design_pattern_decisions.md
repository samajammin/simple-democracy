# Design Pattern Decisions

## Project goal

The primary goal of this project was to build an application to faciliate elections through [plurality voting](https://en.wikipedia.org/wiki/Plurality_voting).

From this simple goal, stemmed a variety of design decisions.

## User permissions and actions

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

All users can:

- View their Ethereum address and Ether balance
- View election stats

Note: the account that deploys the contract (the first account in your local test network) will be automatically registered as an admin.

## Election state machine

Given an the finite lifecycle and clear-cut stages of an election, I implemented Election structs as [state machines](https://en.wikipedia.org/wiki/Finite-state_machine) stored in contract storage. They each maintain a status (either "Pending", "Active" or "Closed") representing their lifecycle stage.

- Pending: the election has been created, admins can add candidates to this election and open the election
- Active: the election is open, voters can vote on the election and admins can close the election
- Closed: the election is close, the winner is calculated and no further actions can be taken on the election

My election flow was inspired in part by this polling system covered in the course:

![Poll](/images/poll-state-machine.png)

## 1 address, 1 vote

A key design decision in a voting system is what determines the ability to vote. [This blog post](https://blog.colony.io/towards-better-ethereum-voting-protocols-7e54cb5a0119/) covers many considerations. While a token-based voting system eliminates the Sybil attack vector, it increases complexity. I decided to design for simplicity and assume admins 1) act honestly and 2) have some form of off-chain verification to ensure each registered Ethereum address corresponds to one person.
See the document on [avoiding common attacks](./avoiding_common_attacks.md) for info on how I attempted to restrict these risks.

## Data structures

The contract data model was driven by the primary goal to limit storage and computation as much as possible but it evolved as I developed and came across certain limitations or behaviors of Solidity.
For example, my `voters` mapping was originally an address to a boolean (to represent isAdmin) but after learning [you cannot check the presence of a key existing in Solidity](https://ethereum.stackexchange.com/questions/13021/how-can-you-figure-out-if-a-certain-key-exists-in-a-mapping-struct-defined-insi) and that all boolean values initialize to false, I adapted to use a Voter struct containing an extra `isRegistered` boolean.

## Gas limits

I also adapted my intial design as I learned more about gas limits. I ended up separating certain functionality to reduce gas limit risk. E.g. the `addElectionCandidate` originally accepted an array of candidates but I refactored to have admins add one at a time after learning the danger of iterating over arrays of undetermined length.

# Future considerations

Here's some features and system designs that are on the roadmap but were out of scope for this first version.

- Build a more enforcable (time-based) way to establish election durations
- Require percentage threshold of network participation for a poll to be considered valid
- Token-based voting system, where 1 token == 1 vote, which eliminated Sybil attack vulnerability and allows participants to join without maintaining a whitelist
- Support a system for [ranked-choice voting](<https://ballotpedia.org/Ranked-choice_voting_(RCV)>)
- Give unregistered voters the ability to request registration and enter a queue for admin approval
