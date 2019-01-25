pragma solidity ^0.5.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleDemocracy.sol";

contract TestSimpleDemocracy {

    function testItDeploys() public {
        SimpleDemocracy democracy = SimpleDemocracy(DeployedAddresses.SimpleDemocracy());
        Assert.equal(democracy.electionCount(), 0, "Election count should initialize to 0");
    }
}
