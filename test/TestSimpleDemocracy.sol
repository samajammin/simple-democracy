pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleDemocracy.sol";

contract TestSimpleDemocracy {

    // admin cannot add a voter twice
    // admin cannot revoke an admin's status
    
    // voter can only vote once on an election
    // voter cannot vote on a closed election
    // voter cannot vote for a candidate who is not in the election

    // election cannot close without a winner

    // happy path
    // admin creates democracy & adds voters (admins & non-admins)
    // admin opens election, voters vote, admin closes election & winner is established
    
    // address address1 = address(0x163a03002ad0998ab6c50278c0532aed10d544aa);
    // address address2 = address(0x85f2b78400ff7ea514a6658affe5ed3444f80eb0);
    // address address3 = address(0x5845112419c57c69ce1d2be90aeb25c46dee2c87);
    // address address4 = address(0x5512e47dee5b6dcfeef8d640f8a8a5a6f54edd18);
    // address address5 = address(0xe71db9d7971a5721d43d6db520179605b16bbd6c);
    // address address6 = address(0x9c5b9023a98a17f4f0c6b2076183cc178af11679);

    SimpleDemocracy democracy = SimpleDemocracy(DeployedAddresses.SimpleDemocracy());
    
    address owner = address(this);

    function testDeployerIsAdmin() public {
        bool isRegistered = democracy.getRegistration(owner);
        bool isAdmin = democracy.getIsAdmin(owner);
        Assert.equal(isRegistered, true, "Owner should be registered");
        Assert.equal(isAdmin, true, "Owner should be an admin");
    }
}
