// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
//import "@openzeppelin/contracts/utils/introspection/IERC165.sol";

interface IBox is IERC1155 {
    function mint(address to, uint256 id, uint256 amount) external;
    function bunt(address from, uint256 id, uint256 amount) external;
}


