require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {

	networks: {
		goerli: {
			url: 'https://eth-goerli.g.alchemy.com/v2/jIhX_HzkajAFJKtCWilGOUeNLsdE-42d',
			accounts: [
				'167f6240870f3a9d1afb1173cfd44548df17c673bc690110aa0cfa790185b3d9'
			],
		}
	},

	etherscan: {
		apiKey: 'FHGCS3D9XRAPBV96TAPZVWBVC4BE9HQ7TG',
	},

	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},
}
