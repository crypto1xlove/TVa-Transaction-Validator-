// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Validator {
    struct Transaction {
        address sender;
        address receiver;
        uint amount;
        bool isValid;
    }

    mapping(bytes32 => Transaction) public transactions;

    event TransactionAdded(bytes32 txHash, address indexed sender, address indexed receiver, uint amount);
    event TransactionValidated(bytes32 txHash, bool isValid);

    function addTransaction(address receiver, uint amount) public returns (bytes32) {
        bytes32 txHash = keccak256(abi.encodePacked(msg.sender, receiver, amount, block.timestamp));
        transactions[txHash] = Transaction({
            sender: msg.sender,
            receiver: receiver,
            amount: amount,
            isValid: false
        });
        emit TransactionAdded(txHash, msg.sender, receiver, amount);
        return txHash;
    }

    function validateTransaction(bytes32 txHash) public {
        require(transactions[txHash].sender != address(0), "Transaction does not exist");
        transactions[txHash].isValid = true;
        emit TransactionValidated(txHash, true);
    }

    function getTransaction(bytes32 txHash) public view returns (address, address, uint, bool) {
        Transaction memory txData = transactions[txHash];
        return (txData.sender, txData.receiver, txData.amount, txData.isValid);
    }
}
