let SimpleDemocracy = artifacts.require('./SimpleDemocracy.sol');
const { shouldFail } = require('openzeppelin-test-helpers');

contract('SimpleDemocracy', function(accounts) {
  const creator = accounts[0];
  const admin1 = accounts[1];
  const admin2 = accounts[2]; // TODO remove?
  const voter1 = accounts[3];
  const voter2 = accounts[4];
  const voter3 = accounts[5]; // TODO remove?

  const candidate1 = accounts[7];
  const candidate2 = accounts[8];
  const candidate3 = accounts[9]; // TODO remove?

  const electionId = 1;
  const pendingStatus = 0;
  const activeStatus = 1;
  const closedStatus = 2;

  const invalidId = 11;
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

    await democracy.registerVoter(admin1, true, { from: creator });

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

    await democracy.registerVoter(voter1, false, { from: admin1 });

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
      democracy.registerVoter(voter1, false, { from: admin1 }),
      'Voter already registered.'
    );
  });

  it('admins can freeze and unfreeze the contract', async () => {
    await democracy.toggleFreeze({ from: admin1 });

    await shouldFail.reverting.withMessage(
      democracy.registerVoter(voter3, false, { from: admin1 }),
      'This contract is frozen.'
    );
    assert.equal(
      await democracy.getRegistration(voter3),
      false,
      'voter3 should not be registered'
    );

    await democracy.toggleFreeze({ from: admin1 });

    await democracy.registerVoter(voter3, false, { from: admin1 });
    assert.equal(
      await democracy.getRegistration(voter3),
      true,
      'voter3 should be registered'
    );
  });

  it('voters cannot add voters', async () => {
    await shouldFail.reverting.withMessage(
      democracy.registerVoter(voter1, false, { from: voter1 }),
      'Must be an admin.'
    );
  });

  it('admin can create elections', async () => {
    assert.equal(
      await democracy.getElectionName(electionId),
      '',
      'Election 1 should not exist'
    );

    await democracy.createElection('Our first election', { from: admin1 });

    assert.equal(
      await democracy.getElectionStatus(electionId),
      pendingStatus,
      'Election 1 should be pending'
    );
    assert.equal(
      await democracy.getElectionName(electionId),
      'Our first election',
      'Election 1 should have a name'
    );
  });

  it('voters cannot create elections', async () => {
    await shouldFail.reverting.withMessage(
      democracy.createElection('Invalid election', { from: voter1 }),
      'Must be an admin.'
    );
  });

  it('elections must have a name', async () => {
    await shouldFail.reverting.withMessage(
      democracy.createElection('', { from: admin1 }),
      'Election must have a name.'
    );
  });

  it('admin can add candidates to pending elections', async () => {
    assert.equal(await democracy.getElectionStatus(electionId), pendingStatus);
    assert.equal(
      await democracy.getCandidateVoteCount(electionId, candidate1),
      0
    );

    await democracy.addElectionCandidate(electionId, candidate1);

    assert.equal(
      await democracy.getCandidateVoteCount(electionId, candidate1),
      1
    );

    await shouldFail.reverting.withMessage(
      democracy.addElectionCandidate(electionId, candidate1),
      'Candidate has already been added.'
    );
  });

  it('voters cannot vote in pending elections', async () => {
    assert.equal(await democracy.getElectionStatus(electionId), pendingStatus);
    await shouldFail.reverting.withMessage(
      democracy.vote(electionId, candidate2, { from: voter1 }),
      'Election is not active.'
    );
  });

  it('admin can open elections', async () => {
    assert.equal(await democracy.getElectionStatus(electionId), pendingStatus);

    await shouldFail.reverting.withMessage(
      democracy.openElection(electionId, { from: admin1 }),
      'Elections must have at least 2 candidates.'
    );

    await democracy.addElectionCandidate(electionId, candidate2);
    await democracy.openElection(electionId, { from: admin1 });

    assert.equal(await democracy.getElectionStatus(electionId), activeStatus);
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
    assert.equal(await democracy.getElectionStatus(electionId), activeStatus);
    assert.equal(await democracy.getElectionWinner(electionId), emptyAddress);

    await shouldFail.reverting.withMessage(
      democracy.closeElection(electionId, { from: voter1 }),
      'Must be an admin.'
    );

    await democracy.closeElection(electionId, { from: admin1 });

    assert.equal(await democracy.getElectionStatus(electionId), closedStatus);
    assert.equal(await democracy.getElectionWinner(electionId), candidate2);
  });

  it('voters cannot vote in inactive elections', async () => {
    assert.equal(await democracy.getElectionStatus(electionId), closedStatus);
    assert.equal(await democracy.getElectionStatus(invalidId), pendingStatus);

    await shouldFail.reverting.withMessage(
      democracy.vote(electionId, candidate1, { from: voter1 }),
      'Election is not active.'
    );

    await shouldFail.reverting.withMessage(
      democracy.vote(invalidId, candidate1, { from: voter1 }),
      'Election is not active.'
    );
  });
});
