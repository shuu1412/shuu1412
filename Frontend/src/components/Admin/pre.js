const PVZcontractABI = require('../../PVZcontractABI');
const {ethers, Contract} = require("ethers");
const provider = new ethers.providers.Web3Provider(window.ethereum);

export default provider;