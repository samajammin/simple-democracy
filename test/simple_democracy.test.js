var SimpleDemocracy = artifacts.require('./SimpleDemocracy.sol');

contract('SimpleDemocracy', function(accounts) {
  const creator = accounts[0];
  const admin1 = accounts[1];
  const admin2 = accounts[2];
  const voter1 = accounts[3];
  const voter2 = accounts[4];
  const voter3 = accounts[5];
  const voter4 = accounts[6];
  const voter5 = accounts[7];
  const voter6 = accounts[8];
  const voter7 = accounts[9];

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
});
