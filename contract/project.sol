// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract TalentVerification {
    struct Credential {
        string title;
        string description;
        address issuer;
        address recipient;
        uint256 timestamp;
        bool verified;
    }

    mapping(uint256 => Credential) public credentials;
    uint256 public credentialCount;
    
    event CredentialIssued(uint256 indexed credentialId, address indexed issuer, address indexed recipient);
    event CredentialVerified(uint256 indexed credentialId, address indexed verifier);
    
    function issueCredential(string memory _title, string memory _description, address _recipient) public {
        credentialCount++;
        credentials[credentialCount] = Credential(_title, _description, msg.sender, _recipient, block.timestamp, false);
        emit CredentialIssued(credentialCount, msg.sender, _recipient);
    }
    
    function verifyCredential(uint256 _credentialId) public {
        require(credentials[_credentialId].issuer != address(0), "Credential does not exist");
        require(credentials[_credentialId].verified == false, "Credential already verified");
        credentials[_credentialId].verified = true;
        emit CredentialVerified(_credentialId, msg.sender);
    }
}
