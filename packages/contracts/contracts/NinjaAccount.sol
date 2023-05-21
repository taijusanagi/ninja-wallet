// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/samples/callback/TokenCallbackHandler.sol";
import "./SismoVerifier.sol";

// import "hardhat/console.sol";

contract NinjaAccount is BaseAccount, TokenCallbackHandler, Initializable {
    IEntryPoint private immutable _entryPoint;
    SismoVerifier private immutable _verifier;

    uint256 public userId; // Sismo User ID
    bytes16[] public groupIds; // Sismo Group IDs

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    receive() external payable {}

    constructor(IEntryPoint entryPoint_, SismoVerifier verifier) {
        _entryPoint = entryPoint_;
        _verifier = verifier;
        _disableInitializers();
    }

    function initialize(
        uint256 _userId,
        bytes16[] memory _groupIds
    ) public virtual initializer {
        userId = _userId;
        groupIds = _groupIds;
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
        (uint256 vaultId, bytes memory signedMessage) = _verifier.verify(
            userOp.signature
        );
        require(vaultId == userId, "invalid vaultId id");
        require(bytes32(signedMessage) == userOpHash, "invalid signed message");
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
