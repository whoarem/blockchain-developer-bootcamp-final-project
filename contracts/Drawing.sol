// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

contract Drawing is
    OwnableUpgradeable,
    ERC721PresetMinterPauserAutoIdUpgradeable
{
    function test() public pure returns (string memory) {
        return StringsUpgradeable.toString(1);
    }

    function test2() public pure returns (string memory) {
        return StringsUpgradeable.toString(2);
    }
}
