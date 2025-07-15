// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TestContract {
    address public ownerAddress;
    bytes32[] public testStructKeys;
    string public contractName;

    constructor() {
        ownerAddress = msg.sender;
    }

    struct TestStruct {
        bytes32 hash;
        address payable destinationAddress;
        uint256 value;
        uint256 timestamp;
    }
    mapping(bytes32 => TestStruct) public testStructs;

    modifier onlyOwner() {
        require(msg.sender == ownerAddress, "Only the owner can call this function");
        _;
    }

    function setContractName(string memory _name) public onlyOwner {
        contractName = _name;
    }

    function setTestStruct(
        address payable _destinationAddress,
        uint256 _value,
        uint256 _timestamp
    ) public onlyOwner {
        bytes32 _hash = keccak256(abi.encodePacked(_destinationAddress, _value, _timestamp));
        require(testStructs[_hash].timestamp == 0, "TestStruct already exists");
        testStructs[_hash] = TestStruct({
            hash: _hash,
            destinationAddress: _destinationAddress,
            value: _value,
            timestamp: _timestamp
        });
        testStructKeys.push(_hash);
    }

    function getTestStruct(bytes32 _hash) public view returns (TestStruct memory) {
        return testStructs[_hash];
    }

    function getAllTestStructs()
    public
    view
    returns (
        bytes32[] memory hashes,
        address[] memory destinations,
        uint256[] memory values,
        uint256[] memory timestamps
    )
{
    uint256 len = testStructKeys.length;
    hashes = new bytes32[](len);
    destinations = new address[](len);
    values = new uint256[](len);
    timestamps = new uint256[](len);

    for (uint256 i = 0; i < len; i++) {
        bytes32 key = testStructKeys[i];
        TestStruct storage s = testStructs[key];
        hashes[i] = s.hash;
        destinations[i] = s.destinationAddress;
        values[i] = s.value;
        timestamps[i] = s.timestamp;
    }

    return (hashes, destinations, values, timestamps);
}


}