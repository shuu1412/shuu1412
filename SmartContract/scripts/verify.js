const { ethers, run, network } = require("hardhat");

const STARTING_PRICE = ethers.BigNumber.from("10");
const MINIMUM_STEP = ethers.BigNumber.from("3");
const HARDHAT_NETWORK_CHAINID = 31337;

async function main() {

    // const contractFactory = await ethers.getContractFactory("PlantVsZombiesNFT");
    // console.log("Deploying contract...");
    // const plantVsZombiesNFT = await contractFactory.deploy('PvZNFT','PvZContract',670);
    // await plantVsZombiesNFT.deployed();
    // console.log("Contract deployed at:", plantVsZombiesNFT.address);

    // if (network.config.chainId !== HARDHAT_NETWORK_CHAINID) {
    //     await plantVsZombiesNFT.deployTransaction.wait(6);
    //     await verify(plantVsZombiesNFT.address, ['PvZNFT','PvZContract',670]);
    // }

    await verify("0x93C9A5320f71aAd317EB887a7086251a41C1Cfc9", ['PvZNFT','PvZContract',670]);

}

async function verify(contractAddress, constructorArgs) {
    console.log("Verifying contract...");

    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: constructorArgs,
        });
    } catch (err) {
        console.log(err);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});