// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

abstract contract DrawingInterface {
    function getMyDrawings() external view virtual returns (string[] memory);
}

contract DrawingReader is OwnableUpgradeable {
    DrawingInterface DrawingContract;

    function setDrawingContractAddress(address _address) public {
        DrawingContract = DrawingInterface(_address);
    }

    function getMyDrawingsFrom() public view returns (string[] memory) {
        string[] memory myDrawings;
        myDrawings = DrawingContract.getMyDrawings();

        return myDrawings;
    }
}
