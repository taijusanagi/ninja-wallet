// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@account-abstraction/contracts/core/BaseAccount.sol";
import "@account-abstraction/contracts/samples/callback/TokenCallbackHandler.sol";
import "@sismo-core/sismo-connect-solidity/contracts/libs/SismoLib.sol";

import "hardhat/console.sol";

contract NinjaAccount is BaseAccount, TokenCallbackHandler, Initializable {
    uint256 private _userId; // Sismo User ID
    IEntryPoint private immutable _entryPoint;

    event NinjaAccountInitialized(
        IEntryPoint indexed entryPoint,
        uint256 indexed userId
    );

    function entryPoint() public view virtual override returns (IEntryPoint) {
        return _entryPoint;
    }

    receive() external payable {}

    constructor(IEntryPoint anEntryPoint) {
        _entryPoint = anEntryPoint;
        _disableInitializers();
    }

    function execute(
        address dest,
        uint256 value,
        bytes calldata func
    ) external {
        _requireFromEntryPoint();
        _call(dest, value, func);
    }

    function executeBatch(
        address[] calldata dest,
        bytes[] calldata func
    ) external {
        _requireFromEntryPoint();
        require(dest.length == func.length, "wrong array lengths");
        for (uint256 i = 0; i < dest.length; i++) {
            _call(dest[i], 0, func[i]);
        }
    }

    function initialize(uint256 userId) public virtual initializer {
        _initialize(userId);
    }

    function _initialize(uint256 userId) internal virtual {
        _userId = userId;
        emit NinjaAccountInitialized(_entryPoint, _userId);
    }

    function _validateSignature(
        UserOperation calldata userOp,
        bytes32 userOpHash
    ) internal virtual override returns (uint256 validationData) {
        // TODO: implement Sismo proof verification

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
