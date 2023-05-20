// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/samples/callback/TokenCallbackHandler.sol";
import "./SismoVerifier.sol";

import "hardhat/console.sol";

contract NinjaAccount is BaseAccount, TokenCallbackHandler {
    IEntryPoint private immutable _entryPoint;
    SismoVerifier private immutable _sismoVerifier;
    uint256 private immutable _userId; // Sismo User ID

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    receive() external payable {}

    constructor(
        IEntryPoint entryPoint_,
        SismoVerifier sismoVerifier,
        uint256 userId
    ) {
        _entryPoint = entryPoint_;
        _sismoVerifier = sismoVerifier;
        _userId = userId;
    }

    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        _requireFromEntryPoint();
        _call(dest, value, func);
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        _sismoVerifier.verify(userOp.signature);
        return 0;
    }

    function _call(address target, uint256 value, bytes memory data) internal {
        (bool success, bytes memory result) = target.call{value: value}(data);
        if (!success) {
            assembly {
                revert(add(result, 32), mload(result))
            }
        }
    }
}
