// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Create2.sol";
import "./NinjaAccount.sol";

import "hardhat/console.sol";

contract NinjaAccountFactory {
    function createAccount(
        IEntryPoint entryPoint,
        SismoVerifier sismoVerifier,
        uint256 userId,
        uint256 salt
    ) public returns (NinjaAccount) {
        return
            new NinjaAccount{salt: bytes32(salt)}(
                entryPoint,
                sismoVerifier,
                userId
            );
    }
}
