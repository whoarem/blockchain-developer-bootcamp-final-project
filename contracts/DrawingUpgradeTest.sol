// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract DrawingUpgradeTest is
    OwnableUpgradeable,
    ERC721PresetMinterPauserAutoIdUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;
    CountersUpgradeable.Counter private _tokenIdTracker;

    /// @notice Mapping tokenId to ipfs cid of drawing data
    mapping(uint256 => string) private _tokenId_Cid_Map;

    /// @notice Create a token associated with a drawing data on ipfs
    /// @param _to address of token holder
    /// @param _cid drawing data ipfs cid
    function commitDrawing(address _to, string memory _cid) public {
        _safeMint(_to, _tokenIdTracker.current());
        _tokenId_Cid_Map[_tokenIdTracker.current()] = _cid;
        _tokenIdTracker.increment();
    }

    /// @notice Gets every token cid of msg.sender
    function getMyDrawings() public view returns (string[] memory) {
        uint256 myDwgCounts = balanceOf(msg.sender);
        string[] memory myDrawings = new string[](myDwgCounts);

        for (uint256 i = 0; i < myDwgCounts; i++) {
            uint256 _tokenId = tokenOfOwnerByIndex(msg.sender, i);
            myDrawings[i] = _tokenId_Cid_Map[_tokenId];
        }
        return myDrawings;
    }

    /// @notice Upgradeable test
    function test() public view returns (uint256) {
        return 42;
    }
}
