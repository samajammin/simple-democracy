# Project goal

Simple application to allow participants of a network to stack-rank vote on propositions

## V1

Design considerations....
1 address == 1 vote
Making the (unsafe) assumption there's off-chain verification that each person has only one verified address

admins
deployer of contract will be an admin

only admins can...

- register voters
- grant admin permissions to other contracts
- create & open voting on a proposal
- close voting on a proposal

all voters can...

- vote once on a proposal

assumes admins will not be malicious...

voters

who are the entities in this application?

- admins
- voters
- votes
- polls / ballots / propositions
- democracy / community / network
  - maintains whitelist of participants

design considerations....

- state machine for polls? can only vote if open...
- how to represent voters & admins? Voter struct? mapping of address to booleans (isAdmin)?

only admins can create proposals

admins determ

## Backend

## Frontend

Is acccount1 the owner of the contract? If not, need a way to establish one as an admin...

- Display address & voter/admin/unregistered status of current address
- If address is admin, show form to add voters.
- If address is admin, show form to add elections.
- If address is admin && election(s) is open, show button(?) to close elections
- If address is voter && election(s) is open, show radio buttons to select candidate & vote
- List of past elections & the winners

# Future roadmap

## V2

queue for unregistered voters to request registration?

reasonable way to establish how long polls stay open
polls will need additional status (enum?) created, open, closed

## V3

% of network required to participate for a poll to be valid
will need to keep track of voterCount

## V4

1 token == 1 vote
Avoids abuse of potentially 1 attacker having >1 addresses
Allows participants to join without maintaining a whitelist
