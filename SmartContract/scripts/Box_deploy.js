const { ethers, run, network } = require("hardhat");

const STARTING_PRICE = ethers.BigNumber.from("10");
const MINIMUM_STEP = ethers.BigNumber.from("3");
const HARDHAT_NETWORK_CHAINID = 31337;

async function main() {

    const contractFactory = await ethers.getContractFactory("Box");
    console.log("Deploying contract...");
    const box = await contractFactory.deploy('0xE51a538b7DE2d9A883C01476d285700c4dD12374','BoxUsePlantVsZombieUri',);
    await box.deployed();
    console.log("Contract deployed at:", box.address);

    if (network.config.chainId !== HARDHAT_NETWORK_CHAINID) {
        await box.deployTransaction.wait(6);
        await verify(box.address, ['0xE51a538b7DE2d9A883C01476d285700c4dD12374','BoxUsePlantVsZombieUri']);
    }

    //await verify("0x93C9A5320f71aAd317EB887a7086251a41C1Cfc9", ['PvZNFT','PvZContract',670]);

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