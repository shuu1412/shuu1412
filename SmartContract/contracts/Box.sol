// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "./IBox.sol";

contract Box is ERC1155, IBox {

    address private _addressOfPlantVSZombieNFTContract;

    constructor(address addressOfContract, string memory uri_) ERC1155(uri_) {
        _addressOfPlantVSZombieNFTContract = addressOfContract;
    }

    function mint(address to, uint256 id, uint256 amount) external {
        require(msg.sender == _addressOfPlantVSZombieNFTContract,"Box: not is PlantVsZombieNFTContract");
        _mint(to,id,amount,"");
    }

   function bunt(address from, uint256 id, uint256 amount) external {
        require(msg.sender == _addressOfPlantVSZombieNFTContract,"Box: not is PlantVsZombieNFTContract");
        _mint(from,id,amount,"");
    }
}