var SimpleDemocracy = artifacts.require('./SimpleDemocracy.sol');

contract('SimpleDemocracy', function(accounts) {
  const creator = accounts[0];
  const admin1 = accounts[1];
  const admin2 = accounts[2];
  const voter1 = accounts[3];
  const voter2 = accounts[4];
  const voter3 = accounts[5];
  const voter4 = accounts[6];

  const candidate1 = accounts[7];
  const candidate2 = accounts[8];
  const candidate3 = accounts[9];

  it('creator can add admins', async () => {
    const democracy = await SimpleDemocracy.deployed();

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
    const democracy = await SimpleDemocracy.deployed();

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
  });

  xit('admin cannot add the same voter more than once', async () => {
    // TODO raise exception
  });

  it('admin can add elections', async () => {
    const democracy = await SimpleDemocracy.deployed();
    const candidates = [candidate1, candidate2, candidate3];

    const electionId = 1;
    await democracy.addElection(candidates);
    assert.equal(
      await democracy.getElectionIsOpen(electionId),
      true,
      'Election 1 should be open'
    );
  });

  it('voters can vote once in elections', async () => {
    const democracy = await SimpleDemocracy.deployed();
    const candidates = [candidate1, candidate2, candidate3];

    const electionId = 1;
    await democracy.addElection(candidates);

    // vote first time success
    assert.equal(
      await democracy.getCandidateVoteCount(electionId, candidate2),
      1
    );
    await democracy.vote(electionId, candidate2, { from: voter1 });
    assert.equal(
      await democracy.getCandidateVoteCount(electionId, candidate2),
      2
    );

    // vote second time raise exception
    // await democracy.vote(electionId, candidate2, { from: voter1 });
    // assert.equal(
    //   await democracy.getCandidateVoteCount(electionId, candidate2),
    //   2
    // );
  });

  xit('voters cannot vote in closed elections', async () => {
    // TODO raise exception
  });

  xit('voters cannot vote for candidates not in the election', async () => {
    // TODO raise exception
  });

  xit('voters cannot vote for candidates not in the election', async () => {
    // TODO raise exception
  });

  xit('admin can close election & winner is established', async () => {});
});
