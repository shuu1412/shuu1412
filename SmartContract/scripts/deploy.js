// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
// 	const PlantVsZombiesNFT = await hre.ethers.getContractFactory("PlantVsZombiesNFT");
// 	const plantVSZombiesNFT = await PlantVsZombiesNFT.deploy('PvZNFT','PvZContract',670);
// 	await plantVSZombiesNFT.deployed();
// 	console.log("address", plantVSZombiesNFT.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// PvZCoin

// const hre = require("hardhat");

async function main() {

	const PvZCoin = await hre.ethers.getContractFactory("PlantCoin");
	const pvzCoin = await PvZCoin.deploy(1000000,'PvZCoin','CoinUsePlantvsZombieNFT');
	await pvzCoin.deployed();
	console.log("address", pvzCoin.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});