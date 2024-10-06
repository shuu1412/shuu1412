const Contract = require('../models/contract')
require('../db/mongoose');

const HandleUpdateAddressOfCoinUse = async function(newAddess) {
    const contract = await Contract.findOne({ address: `${process.env.CONTRACT_ADDRESS}`});
    contract.addressOfCoinUse = newAddess;
    await contract.save();
}

module.exports = HandleUpdateAddressOfCoinUse;