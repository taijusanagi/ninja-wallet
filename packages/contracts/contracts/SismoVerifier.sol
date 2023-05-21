// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@sismo-core/sismo-connect-solidity/contracts/libs/sismo-connect/SismoConnectLib.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

// @note:
contract SismoVerifier is SismoConnect {
    using SismoConnectHelper for SismoConnectVerifiedResult;
    using Strings for uint256;

    constructor(bytes16 appId) SismoConnect(appId) {}

    function verify(
        bytes memory response
    ) public returns (uint256, bytes memory) {
        SismoConnectVerifiedResult memory result = verify({
            responseBytes: response,
            auth: buildAuth({authType: AuthType.VAULT})
        });
        uint256 vaultId = result.getUserId(AuthType.VAULT);
        bytes memory signedMessage = result.getSignedMessage();
        return (vaultId, signedMessage);
    }
}
