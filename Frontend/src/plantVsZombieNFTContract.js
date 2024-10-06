import React from "react";
import {ethers} from "ethers";

const contractAddress = '0x93C9A5320f71aAd317EB887a7086251a41C1Cfc9';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const PVZcontractABI = require('./PVZcontractABI');



const PVZ_ABI = Object.values(PVZcontractABI);
const pvz_abi = PVZ_ABI[0];
const plantVsZombiesNFTContract = new ethers.Contract(contractAddress,pvz_abi,provider);

export default plantVsZombiesNFTContract;