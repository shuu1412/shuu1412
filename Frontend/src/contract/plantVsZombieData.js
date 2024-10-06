const PVZCoinContractABI = require('./PVZcontractABI');

const PVZ_ABI = Object.values(PVZCoinContractABI);
const plantVsZombieData = {
    address: '0xE51a538b7DE2d9A883C01476d285700c4dD12374',
    abi: PVZ_ABI[0],
    imgIPFS:  'http://localhost:8080/ipfs/QmNQV7m6pbx8zLpvvrfGgMW9JmsbAxiGbVXw9bYsh5PsFS',
    addressOfAdmin: '0x7E53B30974EFEd9fc2689980007c363c8550517e',
}

module.exports = plantVsZombieData;