pragma solidity ^0.5.0;


contract SimpleDemocracy {
    mapping (address => Voter) voters;
    Election[] elections; // better way to index elections?
    uint electionCount;

    struct Voter {
        bool isAdmin;
        bool hasRegistered;
    }

    struct Election {
        bool isOpen;
        address[] candidates;
        mapping (address => uint) voteCounts;
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

    function addVoter(address _address, bool _isAdmin) public isAdmin() {
        require(getRegistration(_address) == false, "Voter already registered.");
        voters[_address] = Voter({ hasRegistered: true, isAdmin: _isAdmin});
    }

    function addElection(address[] memory candidates) public isAdmin() returns (uint) {
        require(candidates.length >= 2, "Elections have a minimum of 2 candidates.");
        require(candidates.length <= 10, "Elections have a maximum of 10 candidates."); 
        Election storage e = elections[electionCount]; // TODO "invalid opcode"
        electionCount++;
        for (uint i = 0; i < candidates.length; i++) {
            e.voteCounts[candidates[i]] = 1;
            e.candidates.push(candidates[i]);
        }
        e.isOpen = true;
    }

    function closeElection(uint electionIdx) public isAdmin() {
        require(elections[electionIdx].isOpen == true, "Election is already closed.");
        Election storage e = elections[electionIdx]; // does this variable assignent work? does it add cost? 
        e.isOpen = false;
        e.winner = e.candidates[0];
        for (uint i = 1; i < e.candidates.length; i++) {
            address candidate = e.candidates[i];
            address leader = e.winner;
            if (e.voteCounts[candidate] > e.voteCounts[leader]) {
                e.winner = candidate;
            }
        }
    }

    function vote(uint electionIdx, address candidate) public isVoter() {
        Election storage e = elections[electionIdx]; // does this variable assignent work? does it add cost? 
        require(e.isOpen == true, "Election is closed.");
        require(e.voteCounts[candidate] > 0, "Candidate is not in this election.");
        require(e.hasVoted[msg.sender] == false, "Already voted on this election.");
        e.hasVoted[msg.sender] = true;
        e.voteCounts[candidate] += 1;
    }

    // VIEWS
    function getRegistration(address _address) public view returns (bool) {
        return voters[_address].hasRegistered;
    }

    function getIsAdmin(address _address) public view returns (bool) {
        return voters[_address].isAdmin;
    }
}
