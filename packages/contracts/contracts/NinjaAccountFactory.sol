// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "./NinjaAccount.sol";

// import "hardhat/console.sol";

contract NinjaAccountFactory {
    NinjaAccount public immutable accountImplementation;

    constructor(IEntryPoint _entryPoint, SismoVerifier verifier) {
        accountImplementation = new NinjaAccount(_entryPoint, verifier);
    }

    function createAccount(
        uint256 userId,
        bytes16[] memory groupIds,
        uint256 salt
    ) public returns (NinjaAccount) {
        address addr = getAddress(userId, groupIds, salt);
        uint codeSize = addr.code.length;
        if (codeSize > 0) {
            return NinjaAccount(payable(addr));
        }
        return
            NinjaAccount(
                payable(
                    new ERC1967Proxy{salt: bytes32(salt)}(
                        address(accountImplementation),
                        abi.encodeCall(
                            NinjaAccount.initialize,
                            (userId, groupIds)
                        )
                    )
                )
            );
    }

    function getAddress(
        uint256 userId,
        bytes16[] memory groupIds,
        uint256 salt
    ) public view returns (address) {
        return
            Create2.computeAddress(
                bytes32(salt),
                keccak256(
                    abi.encodePacked(
                        type(ERC1967Proxy).creationCode,
                        abi.encode(
                            address(accountImplementation),
                            abi.encodeCall(
                                NinjaAccount.initialize,
                                (userId, groupIds)
                            )
                        )
                    )
                )
            );
    }
}
