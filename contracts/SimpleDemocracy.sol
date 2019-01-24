pragma solidity ^0.5.0;


contract SimpleDemocracy {
    mapping (address => Voter) voters;
    mapping (uint => Election) elections;
    uint public electionCount;

    event ElectionCreated(uint indexed id, string indexed name);
    event ElectionCandidateAdded(uint indexed id, string indexed name, address candidate);
    event ElectionOpened(uint indexed id, string indexed name, address[] candidates);
    event ElectionVoteCast(uint indexed id, string indexed name, address voter, address candidate);
    event ElectionClosed(uint indexed id, string indexed name, address[] candidates, address winner);

    struct Voter {
        bool isAdmin;
        bool hasRegistered;
    }

    enum ElectionStatus { Pending, Active, Closed }

    struct Election {
        string name; // TODO enfore unique?
        ElectionStatus status;
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

    function registerVoter(address voter, bool _isAdmin) public isAdmin() {
        require(getRegistration(voter) == false, "Voter already registered.");
        voters[voter] = Voter({ hasRegistered: true, isAdmin: _isAdmin});
    }

    function createElection(string memory electionName) public isAdmin() returns (uint) {
        require(bytes(electionName).length > 0, "Election must have a name");
        electionCount++;
        Election storage e = elections[electionCount];
        e.name = electionName;
        e.status = ElectionStatus.Pending;
        emit ElectionCreated(electionCount, electionName);
        return electionCount;
    }

    function addElectionCandidate(uint electionId, address candidate) public isAdmin() {
        require(elections[electionId].voteCounts[candidate] == 0, "Candidate has already been added.");
        elections[electionId].voteCounts[candidate] = 1;
        elections[electionId].candidates.push(candidate);
        emit ElectionCandidateAdded(electionId, elections[electionId].name, candidate);
    }

    function openElection(uint electionId) public isAdmin() {
        require(elections[electionId].status == ElectionStatus.Pending, "Election is active or closed.");
        require(elections[electionId].candidates.length > 1, "Elections must have at least 2 candidates.");
        require(elections[electionId].candidates.length < 10, "Elections must have less than 10 candidates."); 
        Election storage e = elections[electionId];
        e.status = ElectionStatus.Active;
        emit ElectionOpened(electionId, e.name, e.candidates);
    }

    function closeElection(uint electionId) public isAdmin() {
        require(elections[electionId].status == ElectionStatus.Active, "Election is not active.");
        Election storage e = elections[electionId]; // TODO assignment add cost? not necessary... purely for legibility
        e.status = ElectionStatus.Closed;
        e.winner = e.candidates[0]; // TODO better way to deal w/ ties
        for (uint i = 1; i < e.candidates.length; i++) {
            address candidate = e.candidates[i];
            address leader = e.winner;
            if (e.voteCounts[candidate] > e.voteCounts[leader]) {
                e.winner = candidate;
            }
        }
        emit ElectionClosed(electionId, e.name, e.candidates, e.winner);
    }

    function vote(uint electionId, address candidate) public isVoter() {
        Election storage e = elections[electionId]; // TODO constly to assign storage before checks?
        require(e.status == ElectionStatus.Active, "Election is not active.");
        require(e.voteCounts[candidate] > 0, "Candidate is not in this election.");
        require(e.hasVoted[msg.sender] == false, "Already voted on this election.");
        e.hasVoted[msg.sender] = true;
        e.voteCounts[candidate] += 1;
        emit ElectionVoteCast(electionId, e.name, msg.sender, candidate);
    }

    // VIEWS
    function getRegistration(address _address) public view returns (bool) {
        return voters[_address].hasRegistered;
    }

    function getIsAdmin(address _address) public view returns (bool) {
        return voters[_address].isAdmin;
    }

    function getElectionName(uint electionId) public view returns (string memory) {
        return elections[electionId].name;
    }
    
    function getElectionCandidates(uint electionId) public view returns (address[] memory) {
        return elections[electionId].candidates;
    }

    function getElectionStatus(uint electionId) public view returns (ElectionStatus) {
        return elections[electionId].status;
    }

    function getElectionWinner(uint electionId) public view returns (address) {
        return elections[electionId].winner;
    }

    function getCandidateVoteCount(uint electionId, address candidate) public view returns (uint) {
        return elections[electionId].voteCounts[candidate];
    }
}
