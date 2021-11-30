## Inheritance and Interfaces 
(Importing and extending contracts and/or using contract interfaces) Inheritances and Interfaces — (note: this is already a requirement in the final project, so you can simply describe which library or interface you use) 

-> Contract `Drawing` inherits **OwnableUpgradeable**, **ERC721PresetMinterPauserAutoIdUpgradeable** from `@openzeppelin/contracts-upgradeable` package. (with `@openzeppelin/hardhat-upgrades` package)

<br/>

## Access Control Design Patterns 
(Restricting access to certain functions using things like Ownable, Role-based Control) 

-> Inherits **OwnableUpgradeable**, **ERC721PresetMinterPauserAutoIdUpgradeable** and can use adequate functions for various purposes.

<br/>

## Upgradable Contracts 
(Ways to update a deployed contract’s logic or data) Upgradable Contracts and Additional Material

-> Inherits **OwnableUpgradeable**, **ERC721PresetMinterPauserAutoIdUpgradeable** and using **CountersUpgradeable**, **StringsUpgradeable** so that the deployed contract can be upgraded by using `@openzeppelin/hardhat-upgrades` package. 

<br/>

## Optimizing Gas 
(Creating more efficient Solidity code)

-> Only keeps ipfs cid for drawing data to reduce storage size.