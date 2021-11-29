// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract Drawing is
    OwnableUpgradeable,
    ERC721PresetMinterPauserAutoIdUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdTracker;

    function test() public pure returns (string memory) {
        return StringsUpgradeable.toString(1);
    }

    function test2() public pure returns (string memory) {
        return StringsUpgradeable.toString(2);
    }

    mapping(uint256 => string) private _tokenId_Cid_Map;

    function commitDrawing(address _to, string memory _cid) public {
        _safeMint(_to, _tokenIdTracker.current());
        _tokenId_Cid_Map[_tokenIdTracker.current()] = _cid;
        _tokenIdTracker.increment();
    }
}
