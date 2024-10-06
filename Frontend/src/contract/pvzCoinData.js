const PVZCoinContractABI = require('./PvZCoinContractABI');

const PVZCoin_ABI = Object.values(PVZCoinContractABI);

const pvzCoinData = {
    address: '0x6C4cfBC9C71A757A2599e632f0452936d69F87d4',
    abi: PVZCoin_ABI[0],
}

module.exports = pvzCoinData;