// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract PlantCoin is ERC20 {
    constructor(uint totalSupply, string memory _name, string memory _symbol) ERC20(_name,_symbol) {
        _mint(msg.sender, totalSupply);
    }
}