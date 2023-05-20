// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@sismo-core/sismo-connect-solidity/contracts/libs/sismo-connect/SismoConnectLib.sol";

import "hardhat/console.sol";

contract SismoVerifier is SismoConnect {
    constructor(bytes16 appId) SismoConnect(appId) {}

    function verify(
        bytes memory response
    )
        public
        returns (
            // bytes32 userOpHash
            uint256
        )
    {
        verify({
            responseBytes: response,
            auth: buildAuth({authType: AuthType.VAULT})
            // signature: buildSignature({message: abi.encode(userOpHash)})
        });
        return 0;
    }
}
