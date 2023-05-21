// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@account-abstraction/contracts/core/BasePaymaster.sol";
import "./NinjaAccount.sol";

contract GitcoinPassportPaymaster is BasePaymaster {
    using UserOperationLib for UserOperation;
    bytes16 public gitcoinPassportUserId;

    constructor(
        IEntryPoint _entryPoint,
        bytes16 _gitcoinPassportUserId
    ) BasePaymaster(_entryPoint) {
        gitcoinPassportUserId = _gitcoinPassportUserId;
    }

    function _validatePaymasterUserOp(
        UserOperation calldata userOp,
        bytes32 userOpHash,
        uint256 maxCost
    ) internal override returns (bytes memory context, uint256 validationData) {
        address account = userOp.getSender();
        NinjaAccount ninjaAccount = NinjaAccount(payable(account));
        require(
            ninjaAccount.isGroupIdIncluded(gitcoinPassportUserId),
            "invalid account"
        );
    }

    function _postOp(
        PostOpMode mode,
        bytes calldata context,
        uint256 actualGasCost
    ) internal override {
        (mode, context, actualGasCost);
    }
}
