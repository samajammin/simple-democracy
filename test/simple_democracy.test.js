var SimpleDemocracy = artifacts.require('./SimpleDemocracy.sol');
const { shouldFail } = require('openzeppelin-test-helpers');

contract('SimpleDemocracy', function(accounts) {
  const creator = accounts[0];
  const admin1 = accounts[1];
  const admin2 = accounts[2];
  const voter1 = accounts[3];
  const voter2 = accounts[4];
  const voter3 = accounts[5];

  const candidate1 = accounts[7];
  const candidate2 = accounts[8];
  const candidate3 = accounts[9];

  const electionId = 1;

  const invalidElectionId = 11;
  const invalidCandidate = accounts[6];
  const emptyAddress = '0x0000000000000000000000000000000000000000';

  beforeEach(async () => {
    this.democracy = await SimpleDemocracy.deployed();
  });

  it('creator can add admins', async () => {
    assert.equal(
      await democracy.getRegistration(creator),
      true,
      'creator should be registered'
    );
    assert.equal(
      await democracy.getIsAdmin(creator),
      true,
      'creator should be an admin'
    );

    assert.equal(
      await democracy.getRegistration(admin1),
      false,
      'admin1 should not yet be registered'
    );
    assert.equal(
      await democracy.getIsAdmin(admin1),
      false,
      'admin1 should not yet be an admin'
    );

    await democracy.addVoter(admin1, true, { from: creator });

    assert.equal(
      await democracy.getRegistration(admin1),
      true,
      'admin1 should be registered'
    );
    assert.equal(
      await democracy.getIsAdmin(admin1),
      true,
      'admin1 should be an admin'
    );
  });

  it('admin can add voters', async () => {
    assert.equal(
      await democracy.getRegistration(voter1),
      false,
      'voter1 should not yet be registered'
    );

    await democracy.addVoter(voter1, false, { from: admin1 });

    assert.equal(
      await democracy.getRegistration(voter1),
      true,
      'voter1 should be registered'
    );
    assert.equal(
      await democracy.getIsAdmin(voter1),
      false,
      'voter1 should not be an admin'
    );

    await shouldFail.reverting.withMessage(
      democracy.addVoter(voter1, false, { from: admin1 }),
      'Voter already registered.'
    );
  });

  it('voters cannot add voters', async () => {
    await shouldFail.reverting.withMessage(
      democracy.addVoter(voter1, false, { from: voter1 }),
      'Must be an admin.'
    );
  });

  it('admin can add elections', async () => {
    const candidates = [candidate1, candidate2, candidate3];

    await democracy.addElection(candidates, { from: admin1 });
    assert.equal(
      await democracy.getElectionIsOpen(electionId),
      true,
      'Election 1 should be open'
    );
  });

  it('voters can vote once in elections', async () => {
    assert.equal(
      await democracy.getCandidateVoteCount(electionId, candidate2),
      1
    );

    await democracy.vote(electionId, candidate2, { from: voter1 });

    assert.equal(
      await democracy.getCandidateVoteCount(electionId, candidate2),
      2
    );

    await shouldFail.reverting.withMessage(
      democracy.vote(electionId, candidate2, { from: voter1 }),
      'Already voted on this election.'
    );
  });

  it('unregistered voters cannot vote', async () => {
    await shouldFail.reverting.withMessage(
      democracy.vote(electionId, candidate1, { from: voter2 }),
      'Must be a registered voter.'
    );
  });

  it('voters cannot vote for candidates not in the election', async () => {
    await shouldFail.reverting.withMessage(
      democracy.vote(electionId, invalidCandidate, { from: voter1 }),
      'Candidate is not in this election.'
    );
  });

  it('only admin can close election & winner is established', async () => {
    assert.equal(await democracy.getElectionIsOpen(electionId), true);
    assert.equal(await democracy.getElectionWinner(electionId), emptyAddress);

    await shouldFail.reverting.withMessage(
      democracy.closeElection(electionId, { from: voter1 }),
      'Must be an admin.'
    );

    await democracy.closeElection(electionId, { from: admin1 });

    assert.equal(await democracy.getElectionIsOpen(electionId), false);
    assert.equal(await democracy.getElectionWinner(electionId), candidate2);
  });

  it('voters cannot vote in closed elections', async () => {
    assert.equal(await democracy.getElectionIsOpen(electionId), false);
    assert.equal(await democracy.getElectionIsOpen(invalidElectionId), false);

    await shouldFail.reverting.withMessage(
      democracy.vote(electionId, candidate1, { from: voter1 }),
      'Election is closed.'
    );

    await shouldFail.reverting.withMessage(
      democracy.vote(invalidElectionId, candidate1, { from: voter1 }),
      'Election is closed.'
    );
  });
});
