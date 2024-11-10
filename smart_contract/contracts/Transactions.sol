// SPDX-License-Identifier: UNLICENSED
// Copyright (c) 2022-present, Zhenyu Cao <zhenyuc1
// All rights reserved.
pragma solidity ^0.8.4;

contract Transactions{
        uint256 transactionCount;//variable declaration
        event Transfer(address from,address receiver,uint amount,string message, uint256 timestamp, string keyword);//method declaration

        //just like class
        struct TransferStruct{
            //class members
            address sender;
            address receiver;
            uint amount;
            string message;
            uint256 timestamp;
            string keyword;
        }

        TransferStruct[] transactions;

        function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword) public{
            transactionCount+=1;
            transactions.push(TransferStruct(msg.sender,receiver,amount,message,block.timestamp,keyword));

            emit Transfer(msg.sender,receiver,amount,message,block.timestamp,keyword);
        }
        function getAllTransactions() public view returns(TransferStruct[] memory) {
            return transactions;
        }
           function getTransactionCount() public view returns(uint256) {
            return transactionCount;
        }

}
