// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract P2PTransferProject {
    address public owner;
    string public name;

    struct Transaction {
        bytes32 id;
        address payable destination;
        uint256 value;
        uint256 timestamp;
        string reason;
    }
    
    Transaction[] public transactions;

    event TransactionSent(bytes32 indexed id, address indexed destination, uint256 value, string reason, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(string memory _name) payable {
        owner = msg.sender;
        name = _name;
    }

    receive() external payable {}
    function sendTo(address payable _destination, uint256 _amount, string memory _reason) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient contract balance");
        require(_destination != address(0), "Invalid destination address");

        bytes32 txId = keccak256(abi.encodePacked(_destination, _amount, block.timestamp, _reason));

        _destination.transfer(_amount);

        Transaction memory newTx = Transaction({
            id: txId,
            destination: _destination,
            value: _amount,
            timestamp: block.timestamp,
            reason: _reason
        });

        transactions.push(newTx);

        emit TransactionSent(txId, _destination, _amount, _reason, block.timestamp);
    }

    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function setName(string memory _name) external onlyOwner {
        name = _name;
    }

    function getName() external view returns (string memory) {
        return name;
    }

    function getOwner() external view returns (address) {
        return owner;
    }
}