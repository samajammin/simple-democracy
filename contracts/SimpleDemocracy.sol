pragma solidity ^0.5.0;


contract SimpleDemocracy {
    mapping (address => Voter) voters;
    Election[] elections;

    struct Voter {
        bool isAdmin;
        bool hasRegistered;
    }

    struct Election {
        bool isOpen;
        mapping (string => uint) voteCounts;
        mapping (address => bool) hasVoted;
        address winner;
    }

    constructor() public {
        voters[msg.sender] = Voter({ isAdmin: true, hasRegistered: true });
    }

    modifier isAdmin() {
        require(voters[msg.sender].isAdmin == true, "Must be an admin.");
        _;
    }

    modifier isVoter() {
        require(voters[msg.sender].hasRegistered == true, "Must be a registered voter.");
        _;
    }

    function getRegistration(address _address) public view returns (bool) {
        return voters[_address].hasRegistered;
    }

    function getIsAdmin(address _address) public view returns (bool) {
        return voters[_address].isAdmin;
    }

    function addVoter(address _address, bool _isAdmin) public isAdmin() {
        require(getRegistration(_address) == false, "Voter already registered.");
        voters[_address] = Voter({ hasRegistered: true, isAdmin: _isAdmin});
    }

    // function addElection(string[] memory candidates) public isAdmin() returns (bool) {
    //     mapping (string => uint) storage _voteCounts; // mappings must be storage variables? whyyy?
    //     mapping (address => bool) storage _hasVoted;
    //     for (uint i = 0; i < candidates.length; i++) {
    //         _voteCounts[candidates[i]] = 1; // set to 1 so we can compare to 0 in vote, avoids int initializing as 0 issue
    //     }
    //     _hasVoted[msg.sender] = false;
    //     elections.push(
    //         Election({ 
    //             isOpen: true,
    //             voteCounts: _voteCounts,
    //             hasVoted: _hasVoted,
    //             winner: address(0) 
    //         })
    //     );
    //     return true;
    // }

    function vote(uint _electionIndex, string memory _candidate) public isVoter() {
        require(elections[_electionIndex].isOpen == true, "Election is closed.");
        require(elections[_electionIndex].voteCounts[_candidate] > 0, "Candidate is not in this election.");
        require(elections[_electionIndex].hasVoted[msg.sender] == false, "Already voted on this election.");
        elections[_electionIndex].hasVoted[msg.sender] = true;
        elections[_electionIndex].voteCounts[_candidate] += 1;
    }

    // TODO what if there's a tie?
    // function closeElection(uint _electionIndex) public isAdmin() returns (bool) {
    //     require(elections[_electionIndex].isOpen == true, "Election is already closed");
    //     elections[_electionIndex].isOpen = false;
    //     // winner = ...map through voteCounts to assign winner
    //         // how to loop through mapping? i.e. what is solidity's map.keys()?
    //     // elections[_electionIndex].winner = ...
    //     return true;
    // }
}
