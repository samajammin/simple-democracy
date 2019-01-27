pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SimpleDemocracy is Ownable {
    mapping (address => Voter) voters;
    mapping (uint => Election) elections;
    uint public electionCount;
    bool private frozen = false;

    event ElectionCreated(uint indexed id, string name);
    event ElectionCandidateAdded(uint indexed id, string name, address candidate);
    event ElectionOpened(uint indexed id, string name, address[] candidates);
    event ElectionVoteCast(uint indexed id, string name, address voter, address candidate);
    event ElectionClosed(uint indexed id, string name, address[] candidates, address winner);

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

    modifier revertIfFrozen() {
        require(!frozen, "This contract is frozen.");
        _;
    }

    function toggleFreeze() public onlyOwner() {
        frozen = !frozen;
    }

    /** @notice Registers a Voter struct in the `voters` storage mapping
      * @param voter address of the voter to register
      * @param _isAdmin boolean for if the voter should be registered as an admin
      */
    function registerVoter(address voter, bool _isAdmin) public isAdmin() revertIfFrozen() {
        require(getRegistration(voter) == false, "Voter already registered.");
        voters[voter] = Voter({ hasRegistered: true, isAdmin: _isAdmin});
    }

    /** @notice Creates an Election struct in the `elections` storage mapping
      * @param electionName name of the election to create
      * @return electionID of the election created, used as the key of `elections` mapping
      */
    function createElection(string memory electionName) public isAdmin() returns (uint) {
        require(bytes(electionName).length > 0, "Election must have a name");
        electionCount++;
        Election storage e = elections[electionCount];
        e.name = electionName;
        e.status = ElectionStatus.Pending;
        emit ElectionCreated(electionCount, electionName);
        return electionCount;
    }

    /** @notice Add a candidate to a pending Election
      * @param electionId ID of the election to edit
      * @param candidate address of the candidate to add
      */
    function addElectionCandidate(uint electionId, address candidate) public isAdmin() {
        require(elections[electionId].voteCounts[candidate] == 0, "Candidate has already been added.");
        require(elections[electionId].candidates.length < 10, "Elections must have less than 10 candidates.");
        elections[electionId].voteCounts[candidate] = 1;
        elections[electionId].candidates.push(candidate);
        emit ElectionCandidateAdded(electionId, elections[electionId].name, candidate);
    }

    /** @notice Open an Election to voting
      * @param electionId ID of the election to open
      */
    function openElection(uint electionId) public isAdmin() revertIfFrozen() {
        require(elections[electionId].status == ElectionStatus.Pending, "Election is active or closed.");
        require(elections[electionId].candidates.length > 1, "Elections must have at least 2 candidates.");
        Election storage e = elections[electionId];
        e.status = ElectionStatus.Active;
        emit ElectionOpened(electionId, e.name, e.candidates);
    }

    /** @notice Close an Election to calculate a winning candidate and prevent further voting
      * @param electionId ID of the election to open
      */
    function closeElection(uint electionId) public isAdmin() revertIfFrozen() {
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

    /** @notice Vote in an open Election
      * @param electionId ID of the open election to vote in
      * @param candidate address of the candidate to vote for
      */
    function vote(uint electionId, address candidate) public isVoter() revertIfFrozen() {
        Election storage e = elections[electionId]; // TODO costly to assign storage before checks?
        require(e.status == ElectionStatus.Active, "Election is not active.");
        require(e.voteCounts[candidate] > 0, "Candidate is not in this election.");
        require(e.hasVoted[msg.sender] == false, "Already voted on this election.");
        e.hasVoted[msg.sender] = true;
        e.voteCounts[candidate] += 1;
        emit ElectionVoteCast(electionId, e.name, msg.sender, candidate);
    }

    // VIEWS

    /** @notice Get the registration status of a voter
      * @param _address address of the voter
      * @return boolean representing if the voter hasRegistered
      */
    function getRegistration(address _address) public view returns (bool) {
        return voters[_address].hasRegistered;
    }

    /** @notice Get the admin status of a Voter
      * @param _address address of the Voter
      * @return boolean representing if the Voter isAdmin
      */
    function getIsAdmin(address _address) public view returns (bool) {
        return voters[_address].isAdmin;
    }

    /** @notice Get the name of an Election
      * @param electionId ID of the Election
      * @return name of the Election
      */
    function getElectionName(uint electionId) public view returns (string memory) {
        return elections[electionId].name;
    }
    
    /** @notice Get the candidates of an Election
      * @param electionId ID of the Election
      * @return address array of candidates
      */
    function getElectionCandidates(uint electionId) public view returns (address[] memory) {
        return elections[electionId].candidates;
    }

    /** @notice Get the status of an Election
      * @param electionId ID of the Election
      * @return status of the Election
      */
    function getElectionStatus(uint electionId) public view returns (ElectionStatus) {
        return elections[electionId].status;
    }

    /** @notice Get the winner of an Election
      * @param electionId ID of the Election
      * @return winner of the Election
      */
    function getElectionWinner(uint electionId) public view returns (address) {
        return elections[electionId].winner;
    }

    /** @notice Get the number of votes a candidate has received in an Election
      * @param electionId ID of the Election
      * @param electionId address of the candidate
      * @return number of votes a candidate has received in the Election
      */
    function getCandidateVoteCount(uint electionId, address candidate) public view returns (uint) {
        return elections[electionId].voteCounts[candidate];
    }

    // Fallback function
    function() external {
        revert("Function does not exist.");
    }
}
